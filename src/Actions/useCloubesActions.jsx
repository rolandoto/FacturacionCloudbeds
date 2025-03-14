import React from "react";
import { setLoadingGetHotelCloubeds,
            setGetHotelCloubeds,
            setErrorGetHotelCloubeds ,
            setLoadingReservationCloubeds,
            setGeReservationCloubeds,
            setErrorReservationCloubeds,
            setLoadingReservationDetailCloubeds,
            setGeReservationDetailCloubeds,
            setErrorReservationDetailCloubeds,
            setLoadingReservation,
            setReservation,
            setErrorReservation,
            setLoadingRegisterCloubesd,
            setRegisterCloubesd,
            setErrorRegisterCloubesd,
            setLoadingGetRegisterCloubesd,
            setGetRegisterCloubesd,
            setErrorGetRegisterCloubesd,
            setLoadingPaymentCloubeds,
            setPaymentCloubeds,
            setErrorPaymentCloubeds,
            setGetPaymentCloubeds,
            setLoadingGetPaymentCloubeds,
            setErrorGetPaymentCloubeds,
            setLoadingRegisterSigo,
            setGetRegisterSigo,
            setErrorRegisterSigo,
            setTaxesfreeLoading,
            setTaxesfree,
            setErrorTaxesfree,
            setLoadingReservationCloubedsRangeDate,
            setGeReservationCloubedsRangeDate,
            setErrorReservationCloubedsRangeDate} from "../reducers/ApiCloubedsSlice";
import { toast } from "sonner";
import Httpclient from "../Httpclient";
import { useDispatch } from "react-redux";

const useCloubesActions =() =>{

    const dispatch =  useDispatch()
    
    const getHotelCloubeds =async({token,propertyID}) =>{
            dispatch(setLoadingGetHotelCloubeds())
        try {
           const response =   await Httpclient.PostGetHotelCloudbeds({token,propertyID})
      
           if(response){
                    dispatch(setGetHotelCloubeds(response)) 
                    toast.success("exitoso")
           }else{
                    dispatch(setErrorGetHotelCloubeds("no found"))
                    toast.error("error")
           }
        } catch (error) {
                    dispatch(setErrorGetHotelCloubeds("no found"))
                    toast.error("error el el servicio",error)
        }
    }
    

    const getReservationCloubeds =async({token,propertyID,search}) =>{
        dispatch(setLoadingReservationCloubeds())
        try {
            const response =  await Httpclient.PostGetReservationBypropertyID({token,propertyID,search})
        
            if(response){
                    dispatch(setGeReservationCloubeds(response)) 
                        
            }else{
                    dispatch(setErrorReservationCloubeds("no found"))
                        
            }
        } catch (error) {
                    dispatch(setErrorReservationCloubeds("no found"))
        }
    }
    
    const getReservationCloubedsRangeDate =async({token,propertyID,start,end,search}) =>{
        dispatch(setLoadingReservationCloubedsRangeDate())
        try {
            const response =  await Httpclient.GetReservationBypropertyRangeDate({token,propertyID,start,end,search})
        
            if(response){
                    dispatch(setGeReservationCloubedsRangeDate(response)) 
                        
            }else{
                    dispatch(setErrorReservationCloubedsRangeDate("no found"))
                        
            }
        } catch (error) {
                    dispatch(setErrorReservationCloubedsRangeDate("no found"))
        }
    }

    
    const getReservationDetailCloubeds =async({token,propertyID,reservationID}) =>{
        dispatch(setLoadingReservationDetailCloubeds())
            try {
                const response =   await Httpclient.GetReservationDetailBypropertyID({token,propertyID,reservationID})
             
                if(response){
                            dispatch(setGeReservationDetailCloubeds(response)) 
                          
                }else{
                            dispatch(setErrorReservationDetailCloubeds("no found"))
                            
                }
                } catch (error) {
                            dispatch(setErrorReservationDetailCloubeds("no found"))
                      
            }
    }


    const getReservation =async({token,propertyID,reservationID}) =>{
        dispatch(setLoadingReservation())
            try {
                const response =   await Httpclient.GetReservation({token,propertyID,reservationID})
              
                if(response){
                            dispatch(setReservation(response)) 
                            
                }else{
                            dispatch(setErrorReservation("no found"))
                            toast.error("error")
                }
                } catch (error) {
                            dispatch(setErrorReservation("no found"))
                        toast.error("error el el servicio getReservation",error)
            }
    }


    const PostRegisterCloubeds =async({ID_Tipo_documento,ID_city,ReservationID,token,body}) =>{
        dispatch(setLoadingRegisterCloubesd())
        
            try {
                const response =   await Httpclient.PostRegisterCloubeds({ID_Tipo_documento,ID_city,ReservationID,token,body})
                window.location.reload()  
                if(response){
                            dispatch(setRegisterCloubesd(response)) 
                            toast(<div className="text-green-500" >Se registro </div>)
                }else{
                            dispatch(setErrorRegisterCloubesd("no found"))
                            toast(<div className="text-red-500" >Error  registro</div>)
                }
                } catch (error) {
                            dispatch(setErrorRegisterCloubesd("no found"))
                            toast(<div className="text-red-500" >Error  registro</div>)
            }
    }


    const getRegisterCloubeds =async({id}) =>{
        dispatch(setLoadingGetRegisterCloubesd())
          
            try {
                const response = await Httpclient.GetRegisterCloubes({id})

     
                if(response){
                            dispatch(setGetRegisterCloubesd(response)) 
                          
                }else{
                            dispatch(setErrorGetRegisterCloubesd("no found"))
                           
                }
                } catch (error) {
                            dispatch(setErrorGetRegisterCloubesd("no found"))
                       
            }
    }


    const PostPaymentCloubeds =async({ReservationID,subTotal,taxesFees,additionalItems,Date,body,token,id_user,propertyID,tokenCloudbes}) =>{
        dispatch(setLoadingPaymentCloubeds())
          
            try {
                const response = await Httpclient.PostPaymentCloubeds({ReservationID,subTotal,taxesFees,additionalItems,Date,body,token,id_user,propertyID,tokenCloudbes})
                
                if(response){
                    window.location.reload()
                    dispatch(setPaymentCloubeds(response)) 
                    toast(<div className="text-green-500" >Se enviado correctamente la factura</div>)

                }else{
                            dispatch(setErrorPaymentCloubeds("no found"))
                            toast(<div className="text-red-500" >Error al enviar la factura</div>)
                }
                } catch (error) {
                            dispatch(setErrorPaymentCloubeds("no found"))
                            toast(<div className="text-red-500" >Error al enviar la factura</div>)
            }
    }




    const GetPaymentCloubedsActions =async({id}) =>{
        dispatch(setLoadingGetPaymentCloubeds())
          
            try {
                const response = await Httpclient.GetPaymentCloubeds({id})

     
                if(response){
                            dispatch(setGetPaymentCloubeds(response)) 
                          
                }else{
                            dispatch(setErrorGetPaymentCloubeds("no found"))
                          
                }
                } catch (error) {
                            dispatch(setErrorGetPaymentCloubeds("no found"))
                       
            }
    }





    const PostRegisterSigoCloudbeds =async({token,body}) =>{
        dispatch(setLoadingRegisterSigo())
          
            try {
                const response = await Httpclient.PostRegisterSigoCloudbeds({token,body})

                if(response){
                            dispatch(setGetRegisterSigo(response)) 
                           
                            toast(<div className="text-green-500" >Se registro </div>)
                            window.location.reload()

                }else{
                            dispatch(setErrorRegisterSigo("no found"))
                            toast(<div className="text-red-500" >Error  registro</div>)
                }
                } catch (error) {
                            dispatch(setErrorRegisterSigo("no found"))
                            toast(<div className="text-red-500" >Error  registro</div>)
            }
    }



    const GetTaxesFree =async({token,propertyID}) =>{
        dispatch(setTaxesfreeLoading())
          
            try {
                const response = await Httpclient.Gettaxesfree({token,propertyID})

                if(response){
                            dispatch(setTaxesfree(response)) 
                           
                            toast(<div className="text-green-500" >Se registro </div>)

                }else{
                            dispatch(setErrorTaxesfree("no found"))
                            toast(<div className="text-red-500" >Error  registro</div>)
                }
                } catch (error) {
                            dispatch(setErrorTaxesfree("no found"))
                            toast(<div className="text-red-500" >Error  registro</div>)
            }
    }




    return {getHotelCloubeds,
        getReservationCloubeds,
        getReservationDetailCloubeds,
        getReservation,
        PostRegisterCloubeds,
        getRegisterCloubeds,
        PostPaymentCloubeds,
        GetPaymentCloubedsActions,
        PostRegisterSigoCloudbeds,
        dispatch,
        GetTaxesFree,
        getReservationCloubedsRangeDate
    }

}

export default useCloubesActions