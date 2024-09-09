import {createSlice} from "@reduxjs/toolkit"

export const initialState ={
    HotelList:[],
    loadingHotelListo:false,
    errorHotelList:false,

    Dollar:[],
    loadingDollar:false,
    ErrorDollar:false
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


        setLoadingDollar:(state) =>{
            state.Dollar=true
            state.ErrorDollar= null
        },
        setDollar:(state,action) =>{
            state.Dollar =action.payload
            state.loadingDollar= false
        },
        setErrorDollar:(state) =>{
            state.loadingDollar = false
            state.ErrorDollar = true
        },
    }   
})

export const {  setLoadingHotelList,
                setHotelList,
                setError,
                setLoadingDollar,
                setDollar,
                setErrorDollar
} = ApiListHotelSlice.actions

export default  ApiListHotelSlice.reducer