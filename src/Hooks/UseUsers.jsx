import  { useCallback, useContext, useState } from "react"
import  AutoProvider from "../UseContext.js/Autoprovider"
import Httpclient from "../Httpclient/index"

const UseUsers =() =>{

    const {jwt,setJwt,setDian} = useContext(AutoProvider)
    const [state,setState] = useState({loading:false,error:false})
    
    const login = useCallback(({username,password,hotel}) =>{
        setState({loading:true,error:false})
        Httpclient.PostAutenticationDian().then(e =>{
            setDian(e)
         
            localStorage.setItem('tokenDian',JSON.stringify(e))
        }).catch((e) =>{
         
        })
        Httpclient.LoginService({username,password,hotel}).then(index =>{
            localStorage.setItem('jwt',JSON.stringify(index))
            setJwt(index)
            setState({loading:true,error:false})   
        }).catch((e) =>{
           
            setState({loading:false,error:true})
        })
    },[setJwt])

    return  {
        login,
        isLogin:Boolean(jwt),
        isLoading:state.loading,
        isError:state.error,
    }

}

export default  UseUsers