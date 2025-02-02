import  React from "react"
import { PiUsersThin } from "react-icons/pi";

const TableRoomassignation =({rooms}) =>{

    
    return <>
                <div >
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white">
                                <thead className="bg-gray-200 text-gray-600">
                                    <tr>
                                    <td className="py-2 border-gray-400 px-4 text-left">ID DE LA RESERVA</td>
                                    <td className="py-2 border-r-1 border-gray-400 px-4 text-left">CATEGORÍA</td>
                                    <td className="py-2 border-r-1 border-gray-400 px-4 text-left">ASIGNACIÓN</td>
                                    <td className="py-2 border-r-1 border-gray-400 px-4 text-left">HUÉSPED</td>
                                    <td className="py-2 border-r-1 border-gray-400 px-4 text-left">LLEGADA/SALIDA</td>
                                    <td className="py-2 border-r-1 border-gray-400 px-4 text-left">HUÉSPEDES</td>
                                    <td className="py-2 border-r-1 border-gray-400 px-4 text-left">NOCHES</td>
                                    <td className="py-2 border-r-1 border-gray-400 px-4 text-left">TOTAL</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rooms.map((reservation, index) => {
                                        const checkInDate = new Date(reservation.roomCheckIn);
                                        const checkOutDate = new Date(reservation.roomCheckOut);
                                        
                                        // Calcular la diferencia en milisegundos
                                        const differenceInTime = checkOutDate - checkInDate;
                                        
                                        // Convertir la diferencia a días
                                        const differenceInDays = differenceInTime / (1000 * 3600 * 24);
                                
                                        const total = Object.values(reservation.detailedRoomRates).reduce((sum, rate) => sum + rate, 0);
                        
                                return <tr key={index} className="border-b">
                                        <td className="py-2 px-4">{reservation.subReservationID}</td>
                                        <td className="py-2 px-4">{reservation.roomTypeName}</td>
                                        <td className="py-2 px-4 flex items-center">
                                        {reservation.roomName}
                                        <span className="text-red-600 ml-1">*</span>
                                    
                                        </td>
                                        <td className="py-2 px-4">
                                        
                                            {reservation.guestName}
                                        
                                        </td>
                                        <td className="py-2 px-4">{reservation.roomCheckIn} - {reservation.roomCheckOut} </td>
                                        <td className="py-2 px-4 flex items-center">
                                        <span className="flex items-center">
                                        <PiUsersThin fontSize={25} />
                                            {reservation.adults}
                                        </span>
                                        <span className="flex items-center ml-4">
                                        <PiUsersThin fontSize={20} />
                                            {reservation.children}
                                        </span>
                                        </td>
                                    
                                        <td className="py-2 px-4">{differenceInDays}</td>
                                        <td className="py-2 px-4">${parseInt(total).toLocaleString()}</td>
                                    
                                    </tr>
                                    })}
                                </tbody>
                                </table>
                            </div>
                        </div>
    
            </>

}

export default  TableRoomassignation