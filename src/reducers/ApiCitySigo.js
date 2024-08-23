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
    ErrorPdf:false

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
                setErrorPdf} = CitySigoSlice.actions

export default CitySigoSlice.reducer