import moment from "moment";
import React, { useContext, useEffect } from "react"
import TableRoomassignation from "../TableRoomassignation/TableRoomassignation";
import TablePayment from "../TablePayment/TablePayment";
import GuestTable from "../GuestTable/GuesTable";
import TablePaymentInvoinces from "../TablePayment/TablePaymentInvoinces";
import { useSelector } from "react-redux";
import useCloubesActions from "../../Actions/useCloubesActions";
import  AutoProvider from "../../UseContext.js/Autoprovider";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";


const CardDetailReservation =({reservationID,guestName,balanceDetailed,rooms,reservationCheckIn,reservationCheckOut}) =>{

    const Payment = Math.max(balanceDetailed.grandTotal - balanceDetailed.paid, 0);
    const {GetTransition} = useCloubesActions()
    const {jwt} = useContext(AutoProvider)
    const {id} =useParams()
    const {trasntition,loadingtrasntition,errortrasntition} =useSelector((state) => state.Cloubeds)

    const fetData =async() =>{
        await  await GetTransition({token:jwt?.result?.TokenCloubeds,reservationID:id})
    }

    useEffect(() =>{
        fetData()
    },[])

    const fillContent =()=>{
        if(loadingtrasntition){
          return <Loading />
        }
        if(errortrasntition){
          return <p>Error </p>
      }

      return <> <h1>Cargo sujetivamente</h1> </>
    }
   

    return <>
            <div className="bg-[#f1f3f4] min-h-screen p-4">
         
            <header className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Titular Reserva</h1>
                    <h1 className="text-2xl font-bold text-gray-800">{guestName}</h1>
                    <p className="text-gray-500">{reservationID}</p>
                </div>
            </header>

            <section className="bg-white rounded-lg p-4 border-t-4 border-[#3366ff] mb-9">
                <header className="mb-4">
                    <h1 className="text-2xl font-medium text-[#3366ff]">Resumen de cuenta</h1>
                </header>
                <TableRoomassignation rooms={rooms} />
                <TablePayment 
                    rooms={rooms} 
                    subTotal={balanceDetailed.subTotal} 
                    reservationCheckIn={reservationCheckIn}
                    reservationCheckOut={reservationCheckOut}
                    additionalItems={balanceDetailed.additionalItems}
                    taxesFees={balanceDetailed.taxesFees}
                    grandTotal={balanceDetailed.grandTotal} 
                    Payment={Payment}
                />
            </section>

            {fillContent()}
            <section className="bg-white rounded-lg p-4 border-t-4 border-[#3366ff] mb-9">
                <header className="mb-4">
                    <h1 className="text-2xl font-medium text-[#3366ff]">Factura Electrónica de la Dian Enviadas</h1>
                </header>
                <TablePaymentInvoinces />
            </section>

            <section className="border-t-4 border-[#3366ff] rounded-lg p-4 mt-20">
                <header className="mb-4">
                    <h1 className="text-2xl font-medium text-[#3366ff]">Detalles del huésped</h1>
                </header>
            </section>

            <section className="bg-white rounded-lg p-4 border-t-4 border-[#3366ff]">
                <header className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold text-gray-800">{guestName}</h1>
                </header>
                <GuestTable />
            </section>
        </div>
            </>

}

export default CardDetailReservation