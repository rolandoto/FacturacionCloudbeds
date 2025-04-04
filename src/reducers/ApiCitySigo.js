import {createSlice} from "@reduxjs/toolkit"

const initialState={
    City:[],
    loading:false,
    error:null, 

    ProductDian:[],
    loadingProductDian:false,
    ErrorProductDian:false,

    ListClient:[],
    loadingClient:false,
    ErrorClient:false,

    Invoince:[],
    LoadingInvoince:false,
    ErrorInvoince:false,

    pdf:[],
    LoadingPdf:false,
    ErrorPdf:false,

    forwardEmail:[],
    loadingforwardEmail:false,
    ErrorForwardEmail:false,


    PaymentSiigo:[],
    loadingPaymentSiigo:false,
    ErrorPaymentSiigo:false,


    InvoinceDianSiigo:[],
    loadingInvoinceDianSiigo:false,
    ErrorInvoinceDianSiigoo:false

}

export const CitySigoSlice = createSlice({
    name:"CitySigoSlice",
    initialState,
    reducers:{
        loadingCitySigo:(state) =>{
            state.loading =true
            state.error = null
        },
        setCitySigo:(state,action) =>{
            state.City =action.payload
            state.loading= false
        },
        setErrorCitySigo:(state,action) =>{
            state.loading = false
            state.error = action.payload
        },


        loadingProductDian:(state) =>{
            state.loadingProductDian =true
            state.ErrorProductDian = false
        },
        setProductDian:(state,action) =>{
            state.ProductDian =action.payload
            state.loadingProductDian= false
        },
        setErrrorProductDian:(state,action) =>{
            state.loadingProductDian = false
            state.ErrorProductDian = true
        },


        loadingClient:(state) =>{
            state.loadingClient =true
            state.ErrorClient = false
           
        },
        setClient:(state,action) =>{
            state.ListClient =action.payload
            state.loadingClient =false
        },
        setErrorClient:(state,action) =>{
            state.loadingClient = false
            state.ErrorClient = true
        },


        loadingInvoince:(state) =>{
            state.LoadingInvoince =true
            state.ErrorInvoince = false
        },
        setInvoince:(state,action) =>{
            state.Invoince =action.payload
            state.LoadingInvoince =false
        },
        setErrorInvoince:(state,action) =>{
            state.LoadingInvoince = false
            state.ErrorInvoince = true
        },



        
        loadingPdf:(state) =>{
            state.LoadingPdf =true
            state.ErrorPdf = false
        },
        setPdf:(state,action) =>{
            state.pdf =action.payload
            state.LoadingPdf =false
        },
        setErrorPdf:(state,action) =>{
            state.LoadingPdf = false
            state.ErrorPdf = true
        },

    
        
        loadingForwardEmail:(state) =>{
            state.loadingforwardEmail =true
            state.ErrorForwardEmail = false
        },
        setForwardEmail:(state,action) =>{
            state.forwardEmail =action.payload
            state.loadingforwardEmail =false
        },
        setErrorForwardEmail:(state,action) =>{
            state.loadingforwardEmail = false
            state.ErrorForwardEmail = true
        },


        loadingPaymentSiigo:(state) =>{
            state.loadingPaymentSiigo =true
            state.ErrorPaymentSiigo = false
        },
        setPaymentSiigo:(state,action) =>{
            state.PaymentSiigo =action.payload
            state.loadingPaymentSiigo =false
        },
        setErrorPaymentSiigo:(state,action) =>{
            state.loadingPaymentSiigo = false
            state.ErrorPaymentSiigo = true
        },



        loadingInvoinceDianSiigo:(state) =>{
            state.loadingInvoinceDianSiigo =true
            state.ErrorInvoinceDianSiigoo = false
        },
        setInvoinceDianSiigo:(state,action) =>{
            state.InvoinceDianSiigo =action.payload
            state.loadingInvoinceDianSiigo =false
        },
        setErrorInvoinceDianSiigo:(state,action) =>{
            state.loadingInvoinceDianSiigo = false
            state.ErrorInvoinceDianSiigoo = true
        }
    }
})

export const {loadingCitySigo,
                setCitySigo,
                setErrorCitySigo,
                loadingProductDian,
                setProductDian,
                setErrrorProductDian,
                loadingClient,
                setClient,
                setErrorClient,
                loadingInvoince,
                setInvoince,
                setErrorInvoince,
                loadingPdf,
                setPdf,
                setErrorPdf,
                loadingForwardEmail,
                setForwardEmail,
                setErrorForwardEmail,
            
                loadingPaymentSiigo,
                setPaymentSiigo,
                setErrorPaymentSiigo,
            
                loadingInvoinceDianSiigo,
                setInvoinceDianSiigo,
                setErrorInvoinceDianSiigo} = CitySigoSlice.actions

export default CitySigoSlice.reducer