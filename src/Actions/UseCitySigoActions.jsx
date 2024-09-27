import { useDispatch } from "react-redux"
import Httpclient from "../Httpclient"
import { loadingCitySigo, loadingClient, loadingForwardEmail, loadingInvoince, loadingPdf, loadingProductDian, setCitySigo, setClient, setErrorCitySigo, setErrorClient, setErrorForwardEmail, setErrorInvoince, setErrorPdf, setErrrorProductDian, setForwardEmail, setInvoince, setPdf, setProductDian } from "../reducers/ApiCitySigo"
import { toast } from "sonner"

const UseCitySigoActions =() =>{

    const dispatch = useDispatch()

    const getCitySigo= async() =>{
        dispatch(loadingCitySigo())
        try {
            const response  = await Httpclient.GetCitySigo()
            if(response){
                dispatch(setCitySigo(response))
            }else{
                dispatch(setErrorCitySigo("get with was found"))
            }
        } catch (error) {
            dispatch(setErrorCitySigo("get with was found"))
        }
    }


    const getProductDian= async({token}) =>{
        dispatch(loadingProductDian())
        try {
            const response  = await Httpclient.GetProducts({token})
            if(response){
                dispatch(setProductDian(response))
            }else{
                dispatch(setErrrorProductDian("get with was found"))
            }
        } catch (error) {
            dispatch(setErrrorProductDian("get with was found"))
        }
    }


       
    const GetCLientDian =async({token,document}) =>{

        dispatch(loadingClient())
        try {
            const response =  await  Httpclient.GetLisClienteDian({token,document})
          
            if(response){
                dispatch(setClient(response))
            }else{
                dispatch(setErrorClient("no found"))
            }
        } catch (error) {
            dispatch(setErrorClient("no found")) 
          
        }
    }


    const GetInvoince =async({id}) =>{
        dispatch(loadingInvoince())
        try {
            const response =  await  Httpclient.GetInvoincesByReservationDian({id})
          
            if(response){
                dispatch(setInvoince(response))
            }else{
                dispatch(setErrorInvoince("no found"))
            }
        } catch (error) {
            dispatch(setErrorInvoince("no found")) 
          
        }
    }


    const getPdfSigo =async({token,id}) =>{
        dispatch(loadingPdf())
        try {
            const response =  await  Httpclient.GetSalesInvoice({token,id})
        
            if(response.Status !==500){
                dispatch(setPdf(response))
                return response
            }else{
               
               dispatch(setErrorPdf("error no found"))
            }
        } catch (error) {
            dispatch(setErrorPdf("error no found"))
        }
    }


    const PostForwardEmail =async({token,id,Email_to,Copy_to}) =>{
        dispatch(loadingForwardEmail())
        try {
            const response =  await  Httpclient.PostForwardEmail({token,id,Email_to,Copy_to})
           
            if(response){
                dispatch(setForwardEmail(response))
                toast.success('EL CORREO SE ENVIÓ EXITOSAMENTE.')
            }else{
               dispatch(setErrorForwardEmail("error no found"))
               toast.error('ERROR EN EL ENVIÓ EL CORREO')
            }
        } catch (error) {
         
            dispatch(setErrorForwardEmail("error no found"))
            toast.info('ERROR EN EL ENVIÓ EL CORREO')
        }
    }

    return {
        getCitySigo,
        getProductDian,
        GetCLientDian,
        GetInvoince,
        getPdfSigo,
        PostForwardEmail
    }

}

export default UseCitySigoActions