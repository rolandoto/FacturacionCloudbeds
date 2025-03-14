import React, { useCallback, useContext, useEffect, useState } from "react";
import Header from "../../Component/Header/Header";
import useCloubesActions from "../../Actions/useCloubesActions";
import  AutoProvider  from "../../UseContext.js/Autoprovider";
import { useSelector } from "react-redux";
import {DateRangePicker} from "@nextui-org/react";
import moment from "moment";
import {parseDate} from "@internationalized/date";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";



const Reservation =() =>{

    const {getReservationCloubedsRangeDate} = useCloubesActions()
    const {HotelCloubedsReservationRange,loadingReservationCloubedsRange,errorgetReservationcloubedsRange} =useSelector((state) => state.Cloubeds)
    const {jwt} = useContext(AutoProvider)
    const navigate = useNavigate();



    const [searchTerm, setSearchTerm] = useState();


     const [dates, setDates] = useState({
      start: moment().format("YYYY-MM-DD"), // Today's date
      end: moment().format("YYYY-MM-DD"),   // Today's date
     
    });

   
    const [debouncedSearchTerm] = useDebounce(searchTerm, 200); // 500ms de retraso
  
    const fetchSearchResults = useCallback(async () => {
      try {
        if (debouncedSearchTerm ||dates) {
          await getReservationCloubedsRangeDate({token:jwt?.result?.TokenCloubeds,propertyID:jwt?.result?.propertyID,start:dates.start,end:dates.end,search:debouncedSearchTerm})
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }, [debouncedSearchTerm,dates]); // Dependencia para el useCallback
    

  
    useEffect(() =>{
      fetchSearchResults()
  },[fetchSearchResults,dates])

  const handleNextReservation = (reservationID) => {
    if (!reservationID) {
        console.error('Reservation ID is missing');
        return;
    }
    navigate(`/reservation/${reservationID}`);
};  


const handleChangeDate = useCallback((event) => {
  const { value } = event.target;
  setSearchTerm(value);
  
}, []); 


  const handleChange = (e) => {
    setDates({
      ...dates,
      [e.target.name]: e.target.value,
    });
  };
      const fillContent =()=>{
        if(loadingReservationCloubedsRange){
          return <p>Cargando</p>
        }
        if(errorgetReservationcloubedsRange){
          return <p>Error </p>
      }

      return <div className="grid grid-cols-4 gap-4 "  >
              {HotelCloubedsReservationRange.map((reserva, index) => (
                <div key={index} className="border bg-white  border-t-4  border-[#3366ff] rounded-lg p-4 flex cursor-pointer justify-between items-center" onClick={() => handleNextReservation(reserva.reservationID)}>
                  <div> 
                    <h3 className="font-semibold">{reserva.guestName}</h3>
                    <p className="text-sm text-gray-600">ID {reserva.reservationID}</p>
                  </div>

                  <div className="flex flex-block" >
                      <span className="px-3 py-1  text-gray-800 rounded-lg text-sm">
                        <span className={` ${reserva.status === "checked_out" && "status-dot" }
                                            ${reserva.status === "confirmed" && "status-dot-conirmed" }
                                            ${reserva.status === "canceled" && "status-dot-Cancel" }
                                            ${reserva.status === "not_confirmed" && "status-dot-not-confirmed" }
                                            ${reserva.status === "no_show" && "status-dot-not-show" }
                                            ${reserva.status === "checked_in" && "status-dot" }`}></span>
                        <span className="text-[10px] truncate">
                                            {reserva.status === "checked_in" && "Hospedado"}
                                            {reserva.status === "checked_out" && "Checked Out"}
                                            {reserva.status === "no_show" && "No show"}
                                            {reserva.status === "confirmed" && "Confirmado"}
                                            {reserva.status === "canceled" && "Cancelada"}
                                            {reserva.status === "not_confirmed" && "Confirmación pendiente"}
                        </span>
                      </span>
                      {reserva.facturado 
                        ?
                        <span className="px-2 py-1 bg-green-200 text-[10px] rounded-lg">Facturado</span>
                        :<span className="px-2 py-1 text-[10px] bg-gray-200 rounded-lg">No facturado</span>
                      }
                  </div>
                
                </div>
                
              ))}
            </div>
            }


    return (<>
            <div className=" flex justify-between items-center bg-gray-100 p-4">
                <Header/>
            </div>
            <div className="p-6 max-w-full mx-auto">
           

            <div className="flex p-4 w-full flex-wrap md:flex-nowrap gap-4">
           
                </div>


            <h2 className="text-xl font-semibold mb-4">Facturar reservas</h2>
            <div className="flex gap-4 mb-4">
              <input  type="date" 
                      name="start"
                      value={dates.start}
                      onChange={handleChange} 
                      className="border p-2 rounded-lg" />

              <input  type="date"  
                      name="end"
                      value={dates.end}
                      onChange={handleChange} 
                      className="border p-2 rounded-lg" />

              <input type="text" 
              name="ReservationByID"
              onChange={handleChangeDate}
           
              placeholder="Buscar por nombre o ID" className="border p-2 flex-1 rounded-lg" />
            </div>


            <div className="flex gap-4 text-sm mb-4">
              <span className="px-2 py-1 bg-gray-200 rounded-lg">No facturado</span>
              <span className="px-2 py-1 bg-green-200 rounded-lg">Facturado</span>
              <span className="px-2 py-1 bg-blue-200 rounded-lg">En proceso</span>
            </div>

            {/* Lista de reservas */}
            
          {fillContent()}
   
    </div>
        </>)

}   

export default Reservation