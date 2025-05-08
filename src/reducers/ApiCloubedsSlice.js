import {createSlice} from "@reduxjs/toolkit"

export const initialState ={
    HotelCloubeds:[],
    loadingGetHotelCloubeds:false,
    errorgetHotelCloubeds:false,

    //Reservation
    HotelCloubedsReservation:[],
    loadingReservationCloubeds:false,
    errorgetReservationcloubeds:false,

    //ReservationRange
    HotelCloubedsReservationRange:[],
    loadingReservationCloubedsRange:false,
    errorgetReservationcloubedsRange:false,

    //Detailreservation
    HotelCloubedsReservationDetail:[],
    loadingReservationDetailCloubeds:false,
    errorgetReservationDetailcloubeds:false,

    //GetReseration
    Reservation:[],
    loadingReservations:false,
    errorgetReservation:false,

    RegisterCloubesd:[],
    loadingRegisterCloubesd:false,
    errorgetRegisterCloubesd:false,
    
    GetRegisterCloubesd:[],
    loadingGetRegisterCloubesd:false,
    errorgetGetRegisterCloubesd:false,

    PostPaymentCloubeds:[],
    loadingPostPaymentCloubeds:false,
    errorPostPaymentCloubeds:false,
    
    GetPaymentCloubeds:[],
    loadingGetPaymentCloubeds:false,
    errorGetPaymentCloubeds:false,

    PostRegisterSigo:[],
    loadingRegisterSigo:false,
    errorRegisterSigo:false,

    Taxesfree:[],
    loadingtaxesFree:false,
    errorTaxesFree:false,

    trasntition:[],
    loadingtrasntition:false,
    errortrasntition:false,

    Advances:[],
    LoadingAdvances:false,
    ErrorAdvances:false,


    GuestTra:[],
    LoadingGuestTra:false,
    ErrorGuestTra:false

}

export const ApiCloubedsSlice = createSlice({
    name:"Cloubeds",
    initialState,
    reducers:{
        setLoadingGetHotelCloubeds:(state) =>{
            state.loadingGetHotelCloubeds=true
            state.errorgetHotelCloubeds= null
        },
        setGetHotelCloubeds:(state,action) =>{
            state.HotelCloubeds =action.payload
            state.loadingGetHotelCloubeds= false
        },
        setErrorGetHotelCloubeds:(state) =>{
            state.loadingGetHotelCloubeds = false
            state.errorgetHotelCloubeds = true
        },

        //ReservationRangeDate
        setLoadingReservationCloubedsRangeDate:(state) =>{
            state.loadingReservationCloubedsRange=true
            state.errorgetReservationcloubedsRange= null
        },
        setGeReservationCloubedsRangeDate:(state,action) =>{
            state.HotelCloubedsReservationRange =action.payload
            state.loadingReservationCloubedsRange= false
        },
        setErrorReservationCloubedsRangeDate:(state) =>{
            state.loadingReservationCloubedsRange = false
            state.errorgetReservationcloubedsRange = true
        },


        //Reservation Cloubeds
        setLoadingReservationCloubeds:(state) =>{
            state.loadingReservationCloubeds=true
            state.errorgetReservationcloubeds= null
        },
        setGeReservationCloubeds:(state,action) =>{
            state.HotelCloubedsReservation =action.payload
            state.loadingReservationCloubeds= false
        },
        setErrorReservationCloubeds:(state) =>{
            state.loadingReservationCloubeds = false
            state.errorgetReservationcloubeds = true
        },

        //DetailReservation
        setLoadingReservationDetailCloubeds:(state) =>{
            state.loadingReservationDetailCloubeds=true
            state.errorgetReservationDetailcloubeds= null
        },
        setGeReservationDetailCloubeds:(state,action) =>{
            state.HotelCloubedsReservationDetail =action.payload
            state.loadingReservationDetailCloubeds= false
        },
        setErrorReservationDetailCloubeds:(state) =>{
            state.loadingReservationDetailCloubeds = false
            state.errorgetReservationDetailcloubeds = true
        },


          //GetReservation
        setLoadingReservation:(state) =>{
            state.loadingReservations=true
            state.errorgetReservation= null
        },
        setReservation:(state,action) =>{
            state.Reservation =action.payload
            state.loadingReservations= false
        },
        setErrorReservation:(state) =>{
            state.loadingReservations = false
            state.errorgetReservation = true
        },

        //Register cloubeds
        setLoadingRegisterCloubesd:(state) =>{
            state.loadingRegisterCloubesd=true
            state.errorgetRegisterCloubesd= null
        },
        setRegisterCloubesd:(state,action) =>{
            state.RegisterCloubesd =action.payload
            state.loadingRegisterCloubesd= false
        },
        setErrorRegisterCloubesd:(state) =>{
            state.loadingRegisterCloubesd = false
            state.errorgetRegisterCloubesd = true
        },



        setLoadingGetRegisterCloubesd:(state) =>{
            state.loadingGetRegisterCloubesd=true
            state.errorgetGetRegisterCloubesd= null
        },
        setGetRegisterCloubesd:(state,action) =>{
            state.GetRegisterCloubesd =action.payload
            state.loadingGetRegisterCloubesd= false
        },
        setErrorGetRegisterCloubesd:(state) =>{
            state.loadingGetRegisterCloubesd = false
            state.errorgetGetRegisterCloubesd = true
        },


        setLoadingPaymentCloubeds:(state) =>{
            state.loadingPostPaymentCloubeds=true
            state.errorPostPaymentCloubeds= null
        },
        setPaymentCloubeds:(state,action) =>{
            state.PostPaymentCloubeds =action.payload
            state.loadingPostPaymentCloubeds= false
        },
        setErrorPaymentCloubeds:(state) =>{
            state.loadingPostPaymentCloubeds = false
            state.errorPostPaymentCloubeds = true
        },



        setLoadingGetPaymentCloubeds:(state) =>{
            state.loadingGetPaymentCloubeds=true
            state.errorGetPaymentCloubeds= null
        },
        setGetPaymentCloubeds:(state,action) =>{
            state.GetPaymentCloubeds =action.payload
            state.loadingGetPaymentCloubeds= false
        },
        setErrorGetPaymentCloubeds:(state) =>{
            state.loadingGetPaymentCloubeds = false
            state.errorGetPaymentCloubeds = true
        },


        setLoadingRegisterSigo:(state) =>{
            state.loadingRegisterSigo=true
            state.errorRegisterSigo= null
        },
        setGetRegisterSigo:(state,action) =>{
            state.PostRegisterSigo =action.payload
            state.loadingRegisterSigo= false
        },
        setErrorRegisterSigo:(state) =>{
            state.loadingRegisterSigo = false
            state.errorRegisterSigo = true
        },

        setTaxesfreeLoading:(state) =>{
            state.loadingtaxesFree=true
            state.errorTaxesFree= null
        },
        setTaxesfree:(state,action) =>{
            state.Taxesfree =action.payload
            state.loadingtaxesFree= false
        },
        setErrorTaxesfree:(state) =>{
            state.loadingtaxesFree = false
            state.errorTaxesFree = true
        },


        setTransitionLoading:(state) =>{
            state.loadingtrasntition=true
            state.errortrasntition= null
        },
        setTransition:(state,action) =>{
            state.trasntition =action.payload
            state.loadingtrasntition= false
        },
        setErrorTransition:(state) =>{
            state.loadingtrasntition = false
            state.errortrasntition = true
        },


        setAdvanceLoading:(state) =>{
            state.LoadingAdvances=true
            state.ErrorAdvances= null
        },
        setAdvance:(state,action) =>{
            state.Advances =action.payload
            state.LoadingAdvances= false
        },
        setErrorAdvance:(state) =>{
            state.LoadingAdvances = false
            state.ErrorAdvances = true
        },

        setGuestTraLoading:(state) =>{
            state.LoadingGuestTra=true
            state.ErrorGuestTra= null
        },
        setGuestTra:(state,action) =>{
            state.GuestTra =action.payload
            state.LoadingGuestTra= false
        },
        setErrorGuestTra:(state) =>{
            state.LoadingGuestTra = false
            state.ErrorGuestTra = true
        },

    }   
})

export const {  setLoadingGetHotelCloubeds,
                setGetHotelCloubeds,
                setErrorGetHotelCloubeds,

                setLoadingReservationCloubeds,
                setGeReservationCloubeds,
                setErrorReservationCloubeds,

                setLoadingReservationDetailCloubeds,
                setGeReservationDetailCloubeds,
                setErrorReservationDetailCloubeds,

                setLoadingReservation,
                setReservation,
                setErrorReservation,

                setLoadingRegisterCloubesd,
                setRegisterCloubesd,
                setErrorRegisterCloubesd,

                setLoadingGetRegisterCloubesd,
                setGetRegisterCloubesd,
                setErrorGetRegisterCloubesd,

                setLoadingPaymentCloubeds,
                setPaymentCloubeds,
                setErrorPaymentCloubeds,

                setLoadingGetPaymentCloubeds,
                setGetPaymentCloubeds,
                setErrorGetPaymentCloubeds,

                setLoadingRegisterSigo,
                setGetRegisterSigo,
                setErrorRegisterSigo,
                
                setTaxesfreeLoading,
                setTaxesfree,
                setErrorTaxesfree,
        
                setLoadingReservationCloubedsRangeDate,
                setGeReservationCloubedsRangeDate,
                setErrorReservationCloubedsRangeDate,

                setTransitionLoading,
                setTransition,
                setErrorTransition,
               
                setAdvanceLoading,
                setAdvance,
                setErrorAdvance,

                setGuestTraLoading,
                setGuestTra,
                setErrorGuestTra

} = ApiCloubedsSlice.actions

export default  ApiCloubedsSlice.reducer