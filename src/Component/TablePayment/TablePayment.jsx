import { Button } from "@nextui-org/react"
import React, { useCallback, useContext, useEffect, useMemo, useState } from "react"
import useCloubesActions from "../../Actions/useCloubesActions"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import moment from "moment"
import { toast } from "sonner"
import { FaCheck, FaQuestionCircle } from 'react-icons/fa';
import { FaRegSquare } from 'react-icons/fa';
import UseCitySigoActions from "../../Actions/UseCitySigoActions"
import  AutoProvider  from "../../UseContext.js/Autoprovider"
import UseAroundIpoconsumo from "../../Hooks/UseAroundIpoconsumo"
import UseRoundRention from "../../Hooks/UseRoundRention"
import UseRoundRetentionSinIva from "../../Hooks/UseRoundRetentionSinIva"
import { useDebounce } from 'use-debounce';

const TablePayment =({subTotal,additionalItems,taxesFees,grandTotal,Payment,reservationCheckIn,reservationCheckOut}) =>{

    const {id} = useParams()
    const {loadingPostPaymentCloubeds,
        errorPostPaymentCloubeds,
        GetPaymentCloubeds,
        loadingGetPaymentCloubeds,
        errorGetPaymentCloubeds
    } =useSelector((state) => state.Cloubeds)
    const { ListClient,loadingClient,ErrorClient} =useSelector((state) => state.CitySigoSlice)
    const {dian,jwt} = useContext(AutoProvider)



    const  {PostPaymentCloubeds,GetPaymentCloubedsActions,getReservation} = useCloubesActions()
    const  {getProductDian,GetCLientDian} = UseCitySigoActions()

    const {ProductDian,loadingProductDian,ErrorProductDian} =useSelector((state) => state.CitySigoSlice)
    const {Reservation,loadingReservations,errorgetReservation,} =useSelector((state) => state.Cloubeds)

    const [checkedItem1, setCheckedItem1] = useState(false);
    const [checkedItem2, setCheckedItem2] = useState(false);
    const [checkedItem3, setCheckedItem3] = useState(false);
  
    const toggleItem1 = () => setCheckedItem1(!checkedItem1);
    const toggleItem2 = () => setCheckedItem2(!checkedItem2);
    const toggleItem3 = () => setCheckedItem3(!checkedItem3);


    const sumWithInitialMinibar = parseInt(additionalItems)
    const sumWithInitial= parseInt(subTotal)
    
    const totalAmount = sumWithInitial +sumWithInitialMinibar

    const totalPrice= parseInt(subTotal)
    const typeIva=checkedItem3
    const totalRound =  totalPrice / 1.19
    const ValorBase = Math.round(totalRound * 100000) / 100000; // Redondear a 5 decimales
    const valueSTotalProduct =  typeIva ?  ValorBase : totalPrice
    const valuesPayments = typeIva ? totalPrice :totalPrice

    const {SubtotalDianIpoconsumo,TotalPayipoconsumo} =UseAroundIpoconsumo({Price:sumWithInitialMinibar})
    const {SubtotalDian,TotalRetentionDian} =UseRoundRention({Price:sumWithInitial})
    const {SubtotalDianSinIva,TotalRetentionDianSinIva,TotalPaySinIva} =UseRoundRetentionSinIva({Price:sumWithInitial})

    const filteredItems = ProductDian?.filter(item =>{
        return  item.id ==jwt?.result?.dian
      });
  
      const filterItemsExecento = ProductDian?.filter(item =>{
        return  item.code =="6"
      }); 
      
    const resdian = jwt?.result?.RestDian;

    const combinedArray = ProductDian.filter(item => {
        if(resdian?.some(otherItem =>otherItem.Code == item.code)){
            return  item
        }}
    );

    //Consumo
    const itemIvaIpoconsumo = useMemo(() => {
        if(combinedArray.some((item) =>item.taxes)){
          return  combinedArray?.map(item => ({
            code: `${item.code}`,
            description: `${item.name}`,
            quantity: 1,
            price: SubtotalDianIpoconsumo,
            discount: 0.00,
            taxes: [{
              id: item?.taxes[0]?.id || 0
            }]
          }))
        }else{
          return  combinedArray?.map(item => ({
            code: `${item.code}`,
            description: `${item.name}`,
            quantity: 1,
            price: sumWithInitialMinibar,
            discount: 0.00,
          }))
        }}
  , [filteredItems, valueSTotalProduct]);


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
          id: 11451
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
          id: 11451
        }]
      }))
    }
  } , [filteredItems, SubtotalDian])

    //consumo iva
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

    
    const ProductRententionExtra  =  itemRetention.concat(itemIvaIpoconsumo)

    
   
    const validProduct =  typeIva ? itemIva   :itemsExenta
    const ItemIpoconsumo  =  validProduct.concat(itemIvaIpoconsumo)
    const ItemIpoconsumoTotal = totalAmount

    const ValidaIvaRetention = checkedItem1 &&  checkedItem2 && typeIva ?   ProductRententionExtra : ItemIpoconsumo
      
       
    const Retention = checkedItem1 ?   TotalRetentionDian : 0
    const RetentionSinIva = checkedItem1 ?   SubtotalDianSinIva : 0

    const  itemsIva =  checkedItem1 ?  itemRetention :  itemIva
    const itemsinipoconsumo =  typeIva ? itemsIva   :itemsExenta
    const items  = checkedItem2 ? ValidaIvaRetention : itemsinipoconsumo
    const RetentionItem = filteredItems.some((item) =>item.taxes) ?  Retention :  RetentionSinIva 

    const valuePymentIpoconsumo = checkedItem2 ? ItemIpoconsumoTotal : valuesPayments


    const payments =[{
        id: jwt?.result?.id_payment,
        value:valuePymentIpoconsumo,
      }]

    const now = moment().format('YYYY-MM-DD HH:mm:ss');

    const additionalItemsPayment= parseInt(additionalItems)
    const subTotalPayment =    parseInt(subTotal)
    const  taxesFeesPayment= parseInt(taxesFees)

    const totalAdditionalItems =GetPaymentCloubeds.reduce((sum, rate) => {
       return  sum + rate.AdditionalItems
    }, 0);

    const totalSubTotal =GetPaymentCloubeds.reduce((sum, rate) => {
        return  sum + rate.SubTotal
     }, 0);

     const totalTaxesFees =GetPaymentCloubeds.reduce((sum, rate) => {
        return  sum + rate.TaxesFees
     }, 0);

    const DiscountAdditionalItems = Math.max( additionalItemsPayment- totalAdditionalItems, 0);
    const DiscountSubTotal = Math.max( subTotalPayment- totalSubTotal, 0);
    const DiscountTaxesFees = Math.max( taxesFeesPayment -totalTaxesFees, 0);


    const [searchTerm, setSearchTerm] = useState(null); // Inicializar con null

    // Actualizar searchTerm cuando cambie Reservation
    useEffect(() => {
    const customFieldValue = Reservation?.customFields?.length > 0 ? Reservation.customFields[0].customFieldValue : null;
    setSearchTerm(customFieldValue);
    }, [Reservation]);

    // Ejecutar la llamada a la API cuando searchTerm cambie
    useEffect(() => {
    const fetchSearchResults = async () => {
        try {
        if (searchTerm) { // Verificar que searchTerm no sea null o undefined
            await GetCLientDian({ token: dian.access_token, document: searchTerm });
        }
        } catch (error) {
       
        }
    };

    fetchSearchResults();
    }, [searchTerm]); // Dependencia en searchTerm

    const fetData =async() =>{
        await GetPaymentCloubedsActions({id})
        await  getProductDian({token:dian.access_token})
        await getReservation({token:jwt?.result?.TokenCloubeds,propertyID:jwt?.result?.propertyID,reservationID:id})
    }
    useEffect(() =>{
            fetData()
    },[])


    const DateExit = moment().utc().format('YYYY-MM-DD')

    const select = ListClient?.data?.results?.find((item) => item.identification == searchTerm)

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
      seller: 547,
      stamp: {
        send: true
      },
      mail: {
        send: true
      },
      observations:`hospedaje del ${reservationCheckIn} al ${reservationCheckOut}`,
      items,
      payments,
      additional_fields: {}
    };  

    const handleInvoiceSubmission =async() =>{
        if(DiscountSubTotal ==0){
            toast(<div className="text-red-500" >No tiene saldo pendiente</div>)
        }else{
            await  PostPaymentCloubeds({ReservationID:id,
                                        subTotal:subTotalPayment,
                                        taxesFees:taxesFeesPayment,
                                        additionalItems:additionalItemsPayment,
                                        Date:now,
                                        body:response,
                                        token:dian.access_token,
                                        id_user:jwt?.result?.id_user})
        }
    }


    const fillContent =()=>{

    if(loadingClient){
            return <p>cargando .....</p>
    }if(ErrorClient){
            return <p className="text-red-500" >Datos incompletos</p>
    }if(!searchTerm){
        return <p className="text-red-500" >Datos incompletos</p>
    }

    return <>
    <div className="pt-4">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                <thead className="bg-gray-200 text-gray-600">
                    <tr>
                    <td className="py-2 border-gray-400 px-4 text-left">SUB TOTAL</td>
                    <td className="py-2 border-gray-400 px-4 text-left">TIENDA</td>
                    <td className="py-2 border-gray-400 px-4 text-left">EXTRAS</td>
                    <td className="py-2 border-gray-400 px-4 text-left">TOTAL</td>
                    <td className="py-2 border-gray-400 px-4 text-left">SALDO PENDIENTE</td>
        
                    </tr>
                </thead>
                <tbody>
                <tr  className="border-b">
                    <td className="py-2 px-4">${DiscountSubTotal.toLocaleString()}</td>
                    <td className="py-2 px-4">${DiscountAdditionalItems.toLocaleString()}</td>
                    <td className="py-2 px-4">${DiscountTaxesFees.toLocaleString()}</td>
                    <td className="py-2 px-4">${parseInt(grandTotal).toLocaleString()}</td>
                    {Payment == 0 ?  <td className="py-2 px-4 text-black ml-1">${parseInt(Payment).toLocaleString()}</td> :
                    <td className="py-2 px-4 text-red-600 ml-1">${parseInt(Payment).toLocaleString()}</td>   }
                </tr>
            </tbody>
            </table>
        </div> 
        <div className="border mt-4  bg-gray-100">
                <div className="flex justify-between items-center bg-gray-200 p-2 ">
                    <h2 className=" text-gray-700">CUENTAS INTERNAS</h2>
                </div>
                <div className="p-2 bg-white">
                <div className="flex  items-center justify-between">
                    <div className="flex items-center ">
                        <h2>IMPUESTO IVA  19%</h2>
                        <FaQuestionCircle className="text-gray-400 ml-1" />
                    </div>
                    <div onClick={toggleItem3} className="cursor-pointer">
                        {checkedItem3 ? (
                        <FaCheck className="text-blue-500 text-xl" />
                        ) : (
                        <FaRegSquare className="text-gray-500 text-xl" />
                        )}
                    </div>
                    </div>
                    <div className="flex items-center justify-between">
                    <div className="flex mt-2 items-center ">
                        <h2>IMPUESTO RETENCIÓN  3.5%</h2>
                        <FaQuestionCircle className="text-gray-400 ml-1" />
                    </div>
                    <div onClick={toggleItem1} className="cursor-pointer">
                        {checkedItem1 ? (
                        <FaCheck className="text-blue-500 text-xl" />
                        ) : (
                        <FaRegSquare className="text-gray-500 text-xl" />
                        )}
                    </div>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                    <div className="flex items-center ">
                        <h2 >AÑADIR CUENTAS TIENDA</h2>
                        <FaQuestionCircle className="text-gray-400 ml-1" />
                    </div>
                    <div onClick={toggleItem2} className="cursor-pointer">
                        {checkedItem2 ? (
                        <FaCheck className="text-blue-500 text-xl" />
                        ) : (
                        <FaRegSquare className="text-gray-500 text-xl" />
                        )}
                    </div>
                    </div>
                </div>
                </div>
                </div>
        <Button isDisabled={loadingPostPaymentCloubeds}  onClick={handleInvoiceSubmission}   className="bg-[#3366ff]  mt-4 rounded-none text-white px-4 py-2 ">Enviar factura electrónica </Button>
        </>

    }

    return <>{fillContent()}</>

}

export default TablePayment