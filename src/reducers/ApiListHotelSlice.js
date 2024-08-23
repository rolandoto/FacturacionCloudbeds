import {createSlice} from "@reduxjs/toolkit"

export const initialState ={
    HotelList:[],
    loadingHotelListo:false,
    errorHotelList:false
}

export const ApiListHotelSlice = createSlice({
    name:"HotelListHotel",
    initialState,
    reducers:{
        setLoadingHotelList:(state) =>{
            state.loadingHotelListo=true
            state.errorHotelList= null
        },
        setHotelList:(state,action) =>{
            state.HotelList =action.payload
            state.loadingHotelListo= false
        },
        setError:(state) =>{
            state.loadingHotelListo = false
            state.errorHotelList = true
        },
    }   
})

export const {  setLoadingHotelList,
                setHotelList,
                setError
} = ApiListHotelSlice.actions

export default  ApiListHotelSlice.reducer