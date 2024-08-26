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



   /* const today = moment().format('YYYY-MM-DD');
 
    const tomorrow = moment().add(1, 'days').format('YYYY-MM-DD');
   

    const [value, setValue] = useState({
        start: parseDate(today),
        end: parseDate(tomorrow),
    });

      const formattedDateRange = formatDateRange(value);

      const navigate = useNavigate();
*/
    
/*	const filtrarPorFechas = ( fechaDesde, fechaHasta) => {
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
	};*/

	//const resultados = filtrarPorFechas( formattedDateRange.start, formattedDateRange.end);
    /*
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

    */


    return (<>
            <div className=" flex justify-between items-center bg-gray-100 p-4">
                <Header/>
            </div>
    
            <div className="min-h-screen flex items-center justify-center ">
                    <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
                    <div className="text-center">
                        <img
                        className="mx-auto h-12 w-auto"
                        src="https://hotels.cloudbeds.com/assets/home/images/cloudbeds_nebula_logo.png"
                        alt="Cloudbeds Logo"
                        />
                        <h2 className="mt-6 text-center text-1xl  text-gray-900">
                        Bienvenido al sistema de facturación electrónica de Cloudbeds.
                        </h2>
                    </div>
                    </div>
                
            </div>
        </>)

}   

export default Reservation