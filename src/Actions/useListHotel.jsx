import React from "react";
import { setError, setHotelList, setLoadingHotelList } from "../reducers/ApiListHotelSlice";
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
    
    return {getHotelList}

}

export default useListHotel