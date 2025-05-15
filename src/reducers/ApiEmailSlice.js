import {createSlice} from "@reduxjs/toolkit"

export const initialState ={
    sendEmail:[],
    loadingsendEmail:false,
    errorsendEmail:false,

    //List emamil
    ListEmail:[],
    LoadingListEmail:false,
    ErrorListEmail:false
    
}

export const ApiEmailSlice = createSlice({
    name:"EmailSlice",
    initialState,
    reducers:{
        setLoadingEmail:(state) =>{
            state.loadingsendEmail=true
            state.errorsendEmail= null
        },
        setEmail:(state,action) =>{
            state.sendEmail =action.payload
            state.loadingsendEmail= false
        },
        setErrorEmail:(state) =>{
            state.loadingsendEmail = false
            state.errorsendEmail = true
        },



        setLoadiListEmail:(state) =>{
            state.LoadingListEmail=true
            state.ErrorListEmail= null
        },
        setListEmail:(state,action) =>{
            state.ListEmail =action.payload
            state.LoadingListEmail= false
        },
        setErrorListEmail:(state) =>{
            state.LoadingListEmail = false
            state.ErrorListEmail = true
        },


        
    }   
})

export const {  
    setLoadingEmail,
    setEmail,
    setErrorEmail,

    setLoadiListEmail,
    setListEmail,
    setErrorListEmail
} = ApiEmailSlice.actions


export default  ApiEmailSlice.reducer