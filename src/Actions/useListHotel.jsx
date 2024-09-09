import React from "react";
import { setDollar, setError, setErrorDollar, setHotelList, setLoadingDollar, setLoadingHotelList } from "../reducers/ApiListHotelSlice";
import { toast } from "sonner";
import Httpclient from "../Httpclient";
import { useDispatch } from "react-redux";

const useListHotel =() =>{

    const dispatch =  useDispatch()
    
    const getHotelList =async() =>{
        dispatch(setLoadingHotelList())
        try {
           const response =   await Httpclient.GetListHotel()
           if(response){
                    dispatch(setHotelList(response)) 
                    toast.success("exitoso")
           }else{
                    dispatch(setError("no found"))
                    toast.error("error")
           }
        } catch (error) {
                    dispatch(setError("no found"))
                    toast.error("error el el servicio",error)
        }
    }
    

    const getDollar =async() =>{
        dispatch(setLoadingDollar())
        try {
           const response =   await Httpclient.RatesDollar()
           console.log(response)
           if(response){
                    dispatch(setDollar(response)) 
                    toast.success("exitoso")
           }else{
                    dispatch(setErrorDollar("no found"))
                    toast.error("error")
           }
        } catch (error) {
                    dispatch(setErrorDollar("no found"))
                    toast.error("error el el servicio",error)
        }
    }
    

    return {getHotelList,
            getDollar
    }

}

export default useListHotel