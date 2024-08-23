import React, { useContext, useEffect, useState } from "react";
import Header from "../../Component/Header/Header";
import useCloubesActions from "../../Actions/useCloubesActions";
import  AutoProvider  from "../../UseContext.js/Autoprovider";
import { useSelector } from "react-redux";
import {DateRangePicker} from "@nextui-org/react";
import moment from "moment";
import {parseDate} from "@internationalized/date";
import { useNavigate } from "react-router-dom";


const formatDateRange = (dateRange) => {
    const { start, end } = dateRange;
  
    const formatDate = (date) => {
      const year = date.year;
      const month = String(date.month).padStart(2, '0');
      const day = String(date.day).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
  
    return {start:formatDate(start),
            end:formatDate(end)
    } 
  };

const Reservation =() =>{

    const {getReservationCloubeds} = useCloubesActions()
    const {HotelCloubedsReservation,loadingReservationCloubeds,errorgetReservationcloubeds
    } =useSelector((state) => state.Cloubeds)
     const {jwt} = useContext(AutoProvider)

    const fetData =async() =>{
        await getReservationCloubeds({token:jwt?.result?.TokenCloubeds,propertyID:jwt?.result?.propertyID})
    }

    useEffect(() =>{
        fetData()
    },[])
    

    const today = moment().format('YYYY-MM-DD');
 
    const tomorrow = moment().add(1, 'days').format('YYYY-MM-DD');
   

    const [value, setValue] = useState({
        start: parseDate(today),
        end: parseDate(tomorrow),
    });

      const formattedDateRange = formatDateRange(value);

      const navigate = useNavigate();

    
	const filtrarPorFechas = ( fechaDesde, fechaHasta) => {
		// Convertir las fechas de rango a objetos moment y ajustar el formato
		const startDate = moment(fechaDesde).startOf('day');
		const endDate = moment(fechaHasta).endOf('day');
	
		// Filtrar los elementos dentro del rango de fechas
		return HotelCloubedsReservation.filter((elemento) => {
			const fechaInicio = moment(elemento.startDate).utc();
			const fechaFin = moment(elemento.endDate).utc();
	
			// Verificar si el elemento está dentro del rango de fechas
			return (
				(fechaInicio.isBetween(startDate, endDate, null, '[]')) ||
				(fechaFin.isBetween(startDate, endDate, null, '[]')) ||
				(fechaInicio.isBefore(startDate) && fechaFin.isAfter(endDate))
			);
		});
	};

	const resultados = filtrarPorFechas( formattedDateRange.start, formattedDateRange.end);
  
    const fillContent =()=>{
        if(loadingReservationCloubeds){
          return <p>Cargando</p>
        }
        if(errorgetReservationcloubeds){
          return <p>Error </p>
      }

      return <>  {resultados.map((event, index) => {
                    console.log(event)
                    const goToReservation = () => {
                        navigate(`/reservation/${event.reservationID}`);
                    };
        
                    if(event.status =="checked_out"){
                        return <div 
                                        onClick={goToReservation}
                                    className=" bg-[#9a9e9f] relative cursor-pointer text-white p-2 rounded-md"
                                        key={index}>
                                            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full"></span> 
                                        {event.guestName}
                                        <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full"></span>
                                        </div>
                    }else  if(event.status =="checked_in"){
                        return <div 
                                    onClick={goToReservation}
                                    className=" bg-[#45b16d] cursor-pointer relative text-white p-2 rounded-md"
                                        key={index}>
                                            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full"></span> 
                                        {event.guestName}
                                        <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full"></span>
                                        </div>
                                }

                }
                  
    )}</>
    }

    return (<>
            <div className=" flex justify-between items-center bg-gray-100 p-4">
                <Header/>
            </div>
            <div className="flex p-4 w-full flex-wrap md:flex-nowrap gap-4">
            <DateRangePicker
                defaultValue={{
                    start: parseDate("2024-04-01"),
                    end: parseDate("2024-04-08"),
                  }}
                variant="flat"
                color="success"
                label="Busca tu  reserva para facturar"
                value={value}
                onChange={setValue}
                visibleMonths={2}
                />
                </div>
            <div className="grid p-4 grid-cols-5 gap-5">
           
               {fillContent()}
            </div>
        </>)

}   

export default Reservation