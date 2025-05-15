import { useDispatch } from "react-redux"
import { setEmail, setErrorEmail, setErrorListEmail, setListEmail, setLoadiListEmail, setLoadingEmail } from "../reducers/ApiEmailSlice"
import Httpclient from "../Httpclient"
import { toast } from "sonner"


const  UseGuestEmailActions =() =>{

    const dispatch =  useDispatch()

    const PostSendEmail =async({propertyID,rayEmail}) =>{
        console.log(rayEmail)
        dispatch(setLoadingEmail())
        try {
           const response =   await Httpclient.PostGuestEmail({propertyID,rayEmail})
           if(response){
                    dispatch(setEmail(response)) 
                    toast.success("Todos los correos fueron enviados exitosamente")
           }else{
                    dispatch(setErrorEmail("No se pudieron enviar"))
                    toast.error("error")
           }
        } catch (error) {
                    dispatch(setErrorEmail("no found"))
                    toast.error("Error en la solicitud",error)
        }
    }



    const PostListEmail =async({propertyID}) =>{
    
        dispatch(setLoadiListEmail())
        try {
           const response =   await Httpclient.PostListEmail({propertyID})
           if(response){
                    dispatch(setListEmail(response)) 
                    toast.success("Todos los correos fueron enviados exitosamente")
           }else{
                    dispatch(setErrorListEmail("No se pudieron enviar"))
                    toast.error("error")
           }
        } catch (error) {
                    dispatch(setErrorListEmail("no found"))
                    toast.error("Error en la solicitud",error)
        }
    }

    return {
        PostSendEmail,
        PostListEmail
    }

}

export default UseGuestEmailActions