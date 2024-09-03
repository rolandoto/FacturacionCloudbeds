import React, { useContext, useEffect } from "react"
import Header from "../../Component/Header/Header"
import { useParams } from "react-router-dom"
import useCloubesActions from "../../Actions/useCloubesActions"
import  AutoProvider  from "../../UseContext.js/Autoprovider"
import { useSelector } from "react-redux"
import CardDetailReservation from "../../Component/CardDetailReservation/CardDetailReservation"
import { Footer } from "../../Component/Footer/Footer"
import { Toaster } from "sonner"

const DetailReservation =() =>{
  
   const {id} =useParams()
    const {getReservationDetailCloubeds,dispatch} = useCloubesActions()
    const {HotelCloubedsReservationDetail,loadingReservationDetailCloubeds,errorgetReservationDetailcloubeds
    } =useSelector((state) => state.Cloubeds)
     const {jwt} = useContext(AutoProvider)

   const fetData =async() =>{
        await getReservationDetailCloubeds({token:jwt?.result?.TokenCloubeds,propertyID:jwt?.result?.propertyID,reservationID:id})
    }

    useEffect(() =>{
        fetData()
    },[id])

    const fillContent =()=>{
        if(loadingReservationDetailCloubeds){
          return <p>Cargando</p>
        }
        if(errorgetReservationDetailcloubeds){
          return <p>Error </p>
      }

      return <> {HotelCloubedsReservationDetail.map((item,index) =><CardDetailReservation key={index} {...item} />)} </>
    }

    return (<>
               <div className=" flex justify-between bg-gray-100  items-center  p-4">
                <Header/>
                <Toaster richColors  />
                 </div>
                {fillContent()}
                <Footer />
            </>)

}
export default DetailReservation