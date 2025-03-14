import moment from "moment";
import React from "react"
import TableRoomassignation from "../TableRoomassignation/TableRoomassignation";
import TablePayment from "../TablePayment/TablePayment";
import GuestTable from "../GuestTable/GuesTable";
import TablePaymentInvoinces from "../TablePayment/TablePaymentInvoinces";


const CardDetailReservation =({reservationID,guestName,balanceDetailed,rooms,reservationCheckIn,reservationCheckOut}) =>{

    const Payment = Math.max(balanceDetailed.grandTotal - balanceDetailed.paid, 0);

    return <>
    
    <div className="bg-[#f1f3f4]" >
            <div className="p-4  min-h-screen">
                <header className="flex justify-between items-center mb-4">
                    <div>
                    <h1 className="text-2xl font-bold text-gray-800">Titular Reserva</h1>
                    <h1 className="text-2xl font-bold text-gray-800">{guestName}</h1>
                    <p className="text-gray-500">{reservationID}</p>
                    </div>
                    <div className="flex space-x-2">
                  
                    </div>
                </header>


                
                <div className="bg-white rounded-lg p-4  border-[#3366ff]  border-t-4  " >
                    <header className="flex  justify-between  items-center mb-4">
                                    <div className="flex items-center">
                                        <h1 className="text-2xl  font-medium text-[#3366ff]">Resumen de cuenta</h1>
                                    </div>
                                    <div className="flex space-x-2">
                                
                                    </div>
                        </header>
                        <TableRoomassignation                            
                            rooms={rooms}  />

                        <TablePayment 
                            rooms={rooms} 
                            subTotal={balanceDetailed.subTotal} 
                            reservationCheckIn={reservationCheckIn}
                            reservationCheckOut={reservationCheckOut}
                            additionalItems={balanceDetailed.additionalItems}
                            taxesFees={balanceDetailed.taxesFees}
                            grandTotal={balanceDetailed.grandTotal} 
                            Payment={Payment}/>
                </div>

                <div className="bg-white rounded-lg p-4 mt-9  border-t-4  border-[#3366ff]" >
                    <header className="flex  justify-between  items-center mb-4">
                                    <div className="flex items-center">
                                        <h1 className="text-2xl  font-medium text-[#3366ff]">Factura Electronica de la Dian Enviadas</h1>
                                    </div>
                                    <div className="flex space-x-2">
                                
                                    </div>
                        </header>
                    
                        <TablePaymentInvoinces />
                </div>
    
    


               

             
                <header className="flex  border-t-4 border-[#3366ff] rounded-lg p-4 justify-between mt-20 items-center mb-4">
                    <div className="flex items-center">
                        <h1 className="text-2xl  font-medium text-[#3366ff]">Detalles del huésped</h1>
                    </div>
                    <div className="flex space-x-2">
                
                    </div>
                </header>

                <div className="bg-white rounded-lg p-4 mt-9  border-t-4  border-[#3366ff]" >
                        <header className="flex justify-between items-center mt-8 mb-4">
                            <div>
                            <h1 className="text-2xl font-bold text-gray-800">{guestName}</h1>
                        
                            </div>
                            <div className="flex space-x-2">
                        
                            </div>
                        </header>
                    <GuestTable />
                </div>
            </div>
            </div>
    
    </>

}

export default CardDetailReservation