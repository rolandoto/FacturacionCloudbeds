import React, { useCallback, useContext, useEffect, useMemo, useState } from "react"
import useCloubesActions from "../../Actions/useCloubesActions"
import { useSelector } from "react-redux"
import  AutoProvider  from "../../UseContext.js/Autoprovider"
import { useParams } from "react-router-dom"
import UseDocument from "../../Hooks/UseDocument"
import { Button } from "@nextui-org/react"
import calcularDV from "../../Hooks/useDiv"
import UseCitySigoActions from "../../Actions/UseCitySigoActions"
import useValidationFormDetailReservatioon from "../../Hooks/useValidationFormDetailReservatioon"
import { Toaster } from "sonner"

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
  
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
  
      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);
  
    return debouncedValue;
  }

const GuestTable =() =>{

    const {id} =useParams()
    const {getReservation,PostRegisterCloubeds,getRegisterCloubeds,PostRegisterSigoCloudbeds} = useCloubesActions()
    const {document} =UseDocument()
    const {getCitySigo} = UseCitySigoActions()
    const {Reservation,loadingReservations,errorgetReservation,
        GetRegisterCloubesd,
        loadingGetRegisterCloubesd,
        errorgetGetRegisterCloubesd,
        loadingRegisterSigo,
        loadingRegisterCloubesd
    } =useSelector((state) => state.Cloubeds)


     const {jwt,dian} = useContext(AutoProvider)
     const validate = useValidationFormDetailReservatioon();
     const {City,
        error,loading}= useSelector((state) => state.CitySigoSlice)
    
    const [formErrors, setFormErrors] = useState({});
    const [showDropdown, setShowDropdown] = useState(false);


    //Search
    const [searchTerm, setSearchTerm] = useState();
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    //get
     const fetData =async() =>{
        await getReservation({token:jwt?.result?.TokenCloubeds,propertyID:jwt?.result?.propertyID,reservationID:id})
        await getCitySigo()
        await getRegisterCloubeds({id:id})
    }

    useEffect(() =>{
        fetData()
    },[])


      const customFieldValue = Reservation?.customFields?.length > 0 ? Reservation.customFields[0].customFieldValue : null;
      const record = GetRegisterCloubesd.find(item => item?.ReservationID === id);
 
      
      const handleChangeCity = useCallback((e) => {
        setSearchTerm(e.target.value);
        setShowDropdown(true);
    }, []);
    

    const [formValues, setFormValues] = useState({
        tipoDocument: '',
        name: '',
        lastname: '',
        document: '',
        email: '',
        city: "" ,
        address: '',
      });



     // Sincroniza formValues cuando Reservation, ciudad, o customFieldValue cambian
  useEffect(() => {
    setFormValues({
        tipoDocument:  record?.ID_Tipo_documento || '',
        name: Reservation?.firstName || '',
        lastname: Reservation?.lastName || '',
        document: customFieldValue ?? '',
        email: Reservation?.email ?? '',
        city:parseInt( record?.ID_city) || '',
        address: Reservation?.address || '',
    });
    setSearchTerm(record?.City)
  }, [Reservation,record]);



    const dv = calcularDV(formValues.document);

    const typeCityName = City?.find(index =>  index?.ID ==formValues?.city )
    const docu = document?.find(index =>  index?.ID == formValues?.tipoDocument)
    const person = (docu?.ID_document_dian === 31 || docu?.ID_document_dian === 50) ? "Company" : "Person";


    const validDefinidName = person =="Company" ?  
    [ [
        `${formValues.name,formValues.lastname}`
    ].join("")] : 
    [
        formValues.name,
        formValues.lastname
    ] 



    const body = {
        "type": "Customer",
        "person_type":`${person}`,
        "id_type": `${docu?.ID_document_dian}`,
        "identification": formValues.document,
        "check_digit":`${dv}`,
        "name":validDefinidName ,
        "commercial_name": formValues.name,
        "branch_office": 0,
        "active": true,
        "vat_responsible": false,
        "fiscal_responsibilities": [
          {
            "code": "R-99-PN"
          }
        ],
        "address": {
          "address":formValues.address,
          "city": {
            "country_code": typeCityName?.Code_country,
            "state_code":  typeCityName?.Code_state,
            "city_code": typeCityName?.Code_city
          },
          "postal_code":typeCityName?.Code_city
        },
        "phones": [
          {
            "indicative": "00",
            "number": "00",
            "extension": "00"
          }
        ],
        "contacts": [
          {
            "first_name":   formValues.name,
            "last_name":     formValues.lastname,
            "email":formValues?.email,
            "phone": {
              "indicative": "0",
              "number": "0",
              "extension": "0"
            }
          }
        ]
      }

      const handleSubmit = async(e) => {
        e.preventDefault();
        const errors = validate(formValues);
        setFormErrors(errors);
        if (Object.keys(errors).length === 0){
            await PostRegisterCloubeds({ID_Tipo_documento:formValues.tipoDocument,ID_city:formValues.city,ReservationID:id,token:dian.access_token,body})
          }
      };
   
    const filteredCities = useMemo(() => {
        return City.filter(city =>
            city.City.toLowerCase().includes(debouncedSearchTerm?.toLowerCase() ?? '') ||
            city.Country.toLowerCase().includes(debouncedSearchTerm?.toLowerCase() ?? '')
        );
    }, [debouncedSearchTerm, City]);

      const handleCityClick = useCallback((city) => {
        setSearchTerm(city.City);
        setFormValues(prevValues => ({
            ...prevValues,
            city: city.ID
        }));
        setShowDropdown(false);
    }, []);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
          ...formValues,
          [name]: value,
        });
    };

    const fillContent =()=>{
        if(loadingReservations){
          return <p>Cargando</p>
        }
        if(errorgetReservation){
          return <p>Error </p>
      }
       

      return  <form className="p-6 max-w-3xl rounded-md space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">

                <label className="block col-span-2">
                <span className="text-gray-700">Tipo documento</span>
                {formErrors.tipoDocument && <p className="text-red-500 text-xs">{formErrors.tipoDocument}</p>}
                <select
                    name="tipoDocument"
                    value={formValues.tipoDocument}
                    onChange={handleChange}
                    
                    className="pt-2 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 border-black peer"
                > 
                        <option value=""></option>
                    {document?.map((category) => (
                    <option value={category.ID} key={category.ID}>
                        {category.nombre}
                    </option>
                    ))}
                </select>
                </label>

                
                <label className="block col-span-2">
                <span className="text-gray-700">Nombre /Nombre empresa</span>
                {formErrors.name && <p className="text-red-500 text-xs">{formErrors.name}</p>}
                <input
                    type="text"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                  
                    className="pt-2 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 border-black peer"
                
                />
                  
                </label>

                <label className="block col-span-2">
                <span className="text-black">Apellido/Nombre empresa</span>
                {formErrors.lastname && <p className="text-red-500 text-xs">{formErrors.lastname}</p>}
                <input
                    type="text"
                    name="lastname"
                    onChange={handleChange}
                    value={formValues.lastname}
                
                    className="pt-2 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 border-black"
                />
               
                </label>

                <label className="block col-span-2">
                <span className="text-black">Documento/NIT</span>
                {formErrors.document && <p className="text-red-500 text-xs">{formErrors.document}</p>}
                <input
                    type="text"
                    name="document"
                    value={formValues.document}
                 
                    onChange={handleChange}
                    className="pt-2 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 border-black"
                />
              
                </label>

                <label className="block col-span-2">
                <span className="text-black">Div</span>
                <input
                    type="number"
                    name="div"
                    value={dv}
                    onChange={handleChange}
                    disabled={true}
                    className="pt-2 pb-2 block w-full text-black px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 border-black"
                />
                </label>

                <label className="block col-span-2">
                <span className="text-gray-700">Correos</span>
                {formErrors.email && <p className="text-red-500 text-xs">{formErrors.email}</p>}
                <input
                    type="text"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    className="pt-2 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 border-black"
                />
                
                </label>
                <label className="block col-span-2">
                     <span className="text-gray-700">Ciudad</span>
                     {formErrors.city && <p className="text-red-500 text-xs">{formErrors.city}</p>}
                                <input
                                    type="text"
                                    
                                    value={searchTerm}
                                    onChange={handleChangeCity}
                                    defaultValue={""}
                                    className="pt-2 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 border-black peer"
                                />
                                {showDropdown && filteredCities.length > 0 && (
                                    <ul className="mt-2 max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg">
                                    {filteredCities.map(category => (
                                        <li
                                        key={category.ID}
                                        className="p-2 cursor-pointer hover:bg-gray-200"
                                        onClick={() => handleCityClick(category)}
                                        >
                                        {category.Country} - {category.City}
                                        </li>
                                    ))}
                                    </ul>
                                )}
                </label>

              

                <label className="block col-span-2">
                <span className="text-gray-700">Dirección</span>
                <input
                    type="text"
                    name="address"
                    value={formValues.address}
                    onChange={handleChange}
                    className="pt-2 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 border-black peer"
                />
                </label>
            </div>
            
            <div className="flex items-center justify-between">
                    <Button   type="submit" color="primary" isLoading={loadingRegisterCloubesd}  className="rounded-none text-white px-4 py-2 ">{loadingRegisterCloubesd ? "....cargando" :"Guardar" } </Button>
            </div>

            </form>
            }

    return <>
            <Toaster position="bottom-right"  richColors   />  
             {fillContent()}
            </>

}

export default GuestTable