import React, { useCallback, useContext, useEffect, useMemo, useState } from "react"
import useCloubesActions from "../../Actions/useCloubesActions"
import { useSelector } from "react-redux"
import  AutoProvider  from "../../UseContext.js/Autoprovider"
import { useParams } from "react-router-dom"
import UseDocument from "../../Hooks/UseDocument"
import calcularDV from "../../Hooks/useDiv"
import UseCitySigoActions from "../../Actions/UseCitySigoActions"
import useValidationFormDetailReservatioon from "../../Hooks/useValidationFormDetailReservatioon"
import { Toaster } from "sonner"
import { motion } from 'framer-motion';
import { Button } from "@nextui-org/react"
import StepOne from "../../Component/SteOne/StepOne"
import StepTwo from "../../Component/SteOne/StepTwo"
import moment from "moment"
import UseAroundIpoconsumo from "../../Hooks/UseAroundIpoconsumo"
import UseRoundRetention from "../../Hooks/UseRoundRention"
import UseRoundRetentionSinIva from "../../Hooks/UseRoundRetentionSinIva"
import InvoinceDian from "../../Component/InvoinceDian/InvoinceDian"



const numberWithCommas = (event) => {
    // Verificar si el evento no es un número o es negativo
    if (isNaN(event) || event < 0) {
      // Si es así, devolver una cadena vacía o un mensaje de error, según tu preferencia
      return '';
    }
  
    // Convertir el valor a una cadena de texto
    const stringValue = event.toString();
    // Eliminar todos los caracteres que no sean dígitos
    const intValue = parseInt(stringValue.replace(/[^\d]/g, ''), 10);
    // Formatear el número con separadores de miles
    const formattedValue = intValue.toLocaleString('es-CO');
    return formattedValue;
  };


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

const InvoinceRelax =() =>{

  const  {PostPaymentCloubeds,GetPaymentCloubedsActions,getReservation,dispatch,GetTaxesFree} = useCloubesActions()
  const {dian,jwt} = useContext(AutoProvider)
    

  const [checkboxes, setCheckboxes] = useState({
    iva: { checked: false},
    retencion: { checked: false},

  });

    const {id} =useParams()
    const {PostRegisterCloubeds,getRegisterCloubeds,
            currentStep,
            setCurrentStep,
            animationDirection, 
            setAnimationDirection,
        nextStep} = useCloubesActions()
    const {document} =UseDocument()
    const {getCitySigo,GetCLientDian,getProductDian,PostTypePayment,PostInvoinceDian} = UseCitySigoActions()
    const {} =useSelector((state) => state.CitySigoSlice)

    const { ListClient,loadingClient,ErrorClient,ProductDian,loadingProductDian,ErrorProductDian} =useSelector((state) => state.CitySigoSlice)

    const {
      loadingPostPaymentCloubeds,
        errorgetGetRegisterCloubesd,
        loadingRegisterSigo,
        loadingRegisterCloubesd
    } =useSelector((state) => state.Cloubeds)


    const prevStep = () => {
      if (currentStep > 1) {
        setAnimationDirection('backward');
        setCurrentStep(currentStep - 1);
      }
    };
    
    
    const confirmPolicy = () => {
      nextStep();
    };
    
    // Animation variants
    const containerVariants = {
      hidden: (direction) => ({
        x: direction === 'forward' ? 300 : -300,
        opacity: 0
      }),
      visible: {
        x: 0,
        opacity: 1,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 30
        }
      },
      exit: (direction) => ({
        x: direction === 'forward' ? -300 : 300,
        opacity: 0,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 30
        }
      })
    };
    const DateExit = moment().utc().format('YYYY-MM-DD')

    const fetData =async() =>{
      await  getProductDian({token:dian.access_token})
      await getCitySigo()
      await PostTypePayment({token:dian.access_token})
      await PostInvoinceDian({fecha:DateExit})
  }


  const filteredItems = ProductDian?.filter(item =>{
    return  item.id ==jwt?.result?.dian
  });

  const filterItemsExecento = ProductDian?.filter(item =>{
    return  item.code =="06"
  }); 


    useEffect(() =>{
            fetData()
    },[])

     const validate = useValidationFormDetailReservatioon();
     const {City,
        error,loading,PaymentSiigo,InvoinceDianSiigo}= useSelector((state) => state.CitySigoSlice)
      
   
    const [formErrors, setFormErrors] = useState({});
    const [showDropdown, setShowDropdown] = useState(false);

    //Search
    const [searchTerm, setSearchTerm] = useState();
    const debouncedSearchTerm = useDebounce(searchTerm, 300);    

    useEffect(() =>{
        fetData()
    },[])


    
    const [generalValue, setGeneralValue] = useState("");
    const cleanedPrice = generalValue.replace(/\./g, '');

   

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


    const totalPrice=cleanedPrice
    const totalRound =  totalPrice / 1.19
    const ValorBase = Math.round(totalRound * 100000) / 100000; // Redondear a 5 decimales
    const valueSTotalProduct =  checkboxes.iva ?  ValorBase : totalPrice

    const {SubtotalDian,TotalRetentionDian} =UseRoundRetention({Price:totalPrice})
    const {SubtotalDianSinIva,TotalRetentionDianSinIva,TotalPaySinIva} =UseRoundRetentionSinIva({Price:totalPrice})

  
    const itemRetention = useMemo(() => {
      if(filteredItems.some((item) =>item.taxes)){
        return   filteredItems?.map(item => ({
          code: `${item.code}`,
          description: `${item.name}`,
          quantity: 1,
          price:SubtotalDian,
          discount: 0.00,
          taxes: [{
            id: item?.taxes[0]?.id || 0
          }, {
            id: 1035
          }]
        }))
      }else{
        return   filteredItems?.map(item => ({
          code: `${item.code}`,
          description: `${item.name}`,
          quantity: 1,
          price: SubtotalDianSinIva,
          discount: 0.00,
          taxes: [{
            id: 1035
          }]
        }))
      }
    } , [filteredItems, SubtotalDian])
    
    const itemIva = useMemo(() => {
      if(filteredItems.some((item) =>item.taxes)){
        return  filteredItems?.map(item => ({
          code: `${item.code}`,
          description: `${item.name}`,
          quantity: 1,
          price: valueSTotalProduct,
          discount: 0.00,
          taxes: [{
            id: item?.taxes[0]?.id || 0
          }]
        }))
      }else{
        return  filteredItems?.map(item => ({
          code: `${item.code}`,
          description: `${item.name}`,
          quantity: 1,
          price: totalPrice,
          discount: 0.00,
        }))
      }}
  , [filteredItems,valueSTotalProduct]);


  const itemsExenta = useMemo(() => {
    if(filteredItems.some((item) =>item.taxes)){
      return  filterItemsExecento?.map(item => ({
        code: `${item.code}`,
        description: `${item.name}`,
        quantity: 1,
        price: totalPrice,
        discount: 0.00,
        taxes: [{
          id: item?.taxes[0]?.id || 0
        }]
      }))
    }else{
      return  filteredItems?.map(item => ({
        code: `${item.code}`,
        description: `${item.name}`,
        quantity: 1,
        price: totalPrice,
        discount: 0.00,
      }))
    }
  }, [filterItemsExecento, totalPrice]);


  const items = checkboxes.iva.checked && checkboxes.retencion.checked
  ? itemRetention : (checkboxes.iva.checked ? itemIva : itemsExenta);


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
            await PostRegisterCloubeds({ID_Tipo_documento:formValues.tipoDocument,ID_city:formValues.city,ReservationID:formValues.document,token:dian.access_token,body})
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



      const handleCheckboxChange = (name) => {
        setCheckboxes((prev) => ({
          ...prev,
          [name]: { ...prev[name], checked: !prev[name].checked },
        }));
      };
    
      

        // Ejecutar la llamada a la API cuando searchTerm cambie
    useEffect(() => {
      const fetchSearchResults = async () => {
          try {
          if (searchTerm) { // Verificar que searchTerm no sea null o undefined
              await GetCLientDian({ token: dian.access_token, document: formValues.document });
          }
          } catch (error) {
         
          }
      };
  
      fetchSearchResults();
      }, [searchTerm,formValues]); // Dependencia en searchTerm

      const select = ListClient?.data?.results?.find((item) => item.identification == formValues.document)
  

      const [valPayments, setvalPayments] = useState([
        { id:"", value:("").replace(/\./g, '')}
      ]);

      const payments = valPayments.map((payment) => ({
        id: payment.id,
        value: parseInt(payment.value)
      }));

      const totalReduce= payments.reduce((acum,value) =>{
        return acum+ value.value
      },0)


    const response= {
          document: {
            id: jwt?.result?.id_document
          },
          date: DateExit,
          customer: {
            person_type: select?.person_type,
            id_type: select?.id_type?.code,
            identification:select?.identification,
            branch_office: 0,
            name: select?.name,
            address: {
              address:select?.address,
              city: {
                country_code:select?.address?.city?.country_code,
                state_code:select?.address?.city?.state_code,
                city_code:select?.address?.city?.city_code,
              },
              postal_code: select?.postal_code
            },
            phones:select?.phones,
          contacts:select?.contacts
          },
          seller: 50,
          stamp: {
            send: false
          },
          mail: {
            send: true
          },
          observations:`hospedaje`,
          items,
          payments,
          additional_fields: {}
        };  

 
     

        // Agregar un nuevo método de pago
        const addPayment = () => {
          setvalPayments([...valPayments, { id: null, value:0 }]);
        };
      
        // Actualizar un método de pago específico
        const updatePayment = (index, field, value) => {
          const updatedPayments = [...valPayments];
          updatedPayments[index][field] = value;
  
          setvalPayments(updatedPayments);
        };
      
        // Eliminar un método de pago
        const removePayment = (index) => {
        
          const updatedPayments = valPayments.filter((_, i) => i !== index);
          setvalPayments(updatedPayments);
        };
      

        const now = moment().format('YYYY-MM-DD HH:mm:ss');
        const handleInvoiceSubmission =async() =>{
              await  PostPaymentCloubeds({ReservationID:formValues.document,
                                          subTotal:totalPrice,
                                          taxesFees:0,
                                          additionalItems:0,
                                          Date:now,
                                          propertyID:jwt?.result?.propertyID,
                                          tokenCloudbes:jwt?.result?.TokenCloubeds,
                                          body:response,
                                          token:dian.access_token,
                                          id_user:jwt?.result?.id_user})
          
       }

     
    return <>

        <div className="bg-gray-100 min-h-screen">
        <Toaster   />

    
        <div className="max-w-7xl mx-auto p-6 font-sans">
  <h1 className="text-3xl font-bold mb-6 text-gray-900">Confirma y paga</h1>

  {/* Layout de 2 columnas */}
  <div className="flex flex-col lg:flex-row gap-6">
    
    {/* Columna izquierda: Formulario de pasos */}
    <div className="flex-1 space-y-6">

      {/* Step One */}
      <StepOne
        currentStep={currentStep}
        animationDirection={animationDirection}
        containerVariants={containerVariants}
        handleSubmit={handleSubmit}
        formErrors={formErrors}
        formValues={formValues}
        setCurrentStep={setCurrentStep}
        handleChange={handleChange}
        filteredCities={filteredCities}
        dv={dv}
        document={document}
        searchTerm={searchTerm}
        handleChangeCity={handleChangeCity}
        showDropdown={showDropdown}
        handleCityClick={handleCityClick}
        loadingRegisterCloubesd={loadingRegisterCloubesd}
      />

      {/* Step Two */}
      <StepTwo
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        prevStep={prevStep}
        animationDirection={animationDirection}
        containerVariants={containerVariants}
        generalValue={generalValue}
        setGeneralValue={setGeneralValue}
        numberWithCommas={numberWithCommas}
        handleCheckboxChange={handleCheckboxChange}
        checkboxes={checkboxes}
        confirmPolicy={confirmPolicy}
      />

      {/* Step Three */}
      {currentStep === 3 && (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4">
            <h2 className="font-medium text-lg text-gray-900 mb-3">3. Enviar factura electrónica</h2>

            <motion.div
              key={`step-3-${currentStep}`}
              custom={animationDirection}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
            >
              <h2 className="text-lg font-bold mb-3">Formas de Pago</h2>

              {valPayments.map((payment, index) => (
                <div key={index} className="mb-4 p-3 border rounded-lg shadow-sm">
                  <label className="block text-gray-700 font-medium mb-2">Método de Pago</label>
                  <select
                    className="w-full border border-gray-300 p-2 rounded-lg"
                    value={payment.id}
                    onChange={(e) => updatePayment(index, "id", e.target.value)}
                  >
                    <option value="">Seleccione un método</option>
                    {PaymentSiigo.map((method) => (
                      <option key={method.id} value={method.id}>
                        {method.name}
                      </option>
                    ))}
                  </select>

                  <label className="block text-gray-700 font-medium mt-2 mb-2">Valor del Pago</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 p-2 rounded-lg"
                    placeholder="Ingrese el monto"
                    value={numberWithCommas(payment.value)}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/\./g, "").replace(/,/g, "");
                      if (!isNaN(rawValue)) {
                        updatePayment(index, "value", rawValue);
                      }
                    }}
                  />

                  {valPayments.length > 1 && (
                    <button
                      className="text-red-500 mt-2 text-sm"
                      onClick={() => removePayment(index)}
                    >
                      Eliminar forma de pago
                    </button>
                  )}
                </div>
              ))}

              <button
                className="w-full border border-gray-400 py-2 rounded-lg font-medium text-gray-700 mt-2 hover:bg-gray-50 transition"
                onClick={addPayment}
              >
                + Agregar otra forma de pago
              </button>

              <Button
                isDisabled={
                  loadingPostPaymentCloubeds ||
                  parseInt(totalReduce) !== parseInt(cleanedPrice)
                }
                onClick={handleInvoiceSubmission}
                className="w-full bg-black text-white py-3 rounded-lg font-medium flex items-center justify-center transform transition hover:scale-105 mt-4"
              >
                <span>Enviar factura electrónica</span>
              </Button>

              <div className="mt-4 flex justify-start">
                <button
                  className="border border-gray-300 px-6 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
                  onClick={prevStep}
                >
                  Volver
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Indicador de pasos */}
      <div className="flex justify-center mt-6">
        <div className="flex space-x-2">
          {[1, 2, 3].map((step) => (
            <motion.div
              key={step}
              className={`h-2 rounded-full ${currentStep >= step ? "bg-black" : "bg-gray-300"}`}
              initial={{ width: "20px" }}
              animate={{
                width: currentStep === step ? "40px" : "20px",
                transition: { duration: 0.3 },
              }}
            />
          ))}
        </div>
      </div>
    </div>

    
    <InvoinceDian facturas={InvoinceDianSiigo} />

  </div>
</div>

     </div>

            </>
}

export default InvoinceRelax