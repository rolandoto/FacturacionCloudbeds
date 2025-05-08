
import React, { useCallback, useContext, useEffect, useState } from "react"
import Sidebar from "../../Component/Sidebar/Sidebar"
import { useSelector } from "react-redux";
import useCloubesActions from "../../Actions/useCloubesActions";
import AdvanceTable from "../../Component/AdvanceTable/AdvanceTable";
import AutoProvider  from "../../UseContext.js/Autoprovider";
import { Loader, SearchX  } from "lucide-react";
import CalenderTailwindcss from "../../Component/CalenderTailwindcss/CalenderTailwindcss";
import moment from "moment";
import UseCalendar from "../../Hooks/UseCalendar";
import ExportButton from "../../Component/ExportButton/ExportButton";



const Advances =() =>{

  const {stardateFormat,endDateformat,
    goToPreviousMonth,
    goToNextMonth,
    isSameMonth,
    isSameDay,
    startDate,
    endDate,
    handleDateClick,
    days,
    isInRange,
    format,
    selectedDate
  } =UseCalendar()

  const {GetAmmountAdvance} =useCloubesActions()
  const { Advances, LoadingAdvances, ErrorAdvances } = useSelector((state) => state.Cloubeds);
  const {jwt} = useContext(AutoProvider)
  
  const fetchData =  useCallback(async() => {
    await GetAmmountAdvance({ propertyID: jwt?.result?.propertyID,startDate:stardateFormat,endDate:endDateformat});
  },[stardateFormat,endDateformat])


  useEffect(() =>{
    fetchData()
  },[stardateFormat,endDateformat])


      const FillContent=() =>{
        if(LoadingAdvances){
            return <> <div className="flex justify-center items-center h-40">
                  <Loader className="w-8 h-8 animate-spin text-indigo-600" />
                </div></>
        }if(ErrorAdvances){
            return  <div className="flex flex-col items-center justify-center h-40 text-gray-500">
                    <SearchX className="w-8 h-8 mb-2" />
                    <p className="text-sm font-medium">No se encontraron resultados</p>
                  </div>
        }

        const dataFDilter = Advances.map((item) =>{

            const start = moment(item.guestCheckIn);
            const end = moment(item.guestCheckOut);
            const formatted = `${start.format("MMM D")} – ${end.format("D")}`;
        
           return  {
                Valor:item.amount,
                Fecha:item.transactionDateTime,
                Hotel:item.propertyName,
                Metodo_pago:item.category,
                Usuario:item.userName,
                Habitacion:item.roomName,
                Tipo_habitacion:item.roomTypeName,
                Codigo_reserva:item.reservationID,
                Checkin_Cehckout:formatted
           }
        })

        return  <div className="bg-white rounded-lg shadow p-6 w-full mx-auto">
                    <h2 className="text-lg font-medium text-gray-800 mb-6">Anticipos de cloudbeds</h2>
                    <AdvanceTable advances={Advances} />
                    <ExportButton
                    data={dataFDilter}
                    nameContent="Hospedaje" 
                    filename="output.xlsx" />
                </div>
    }

    return <>
          <Sidebar>
          <CalenderTailwindcss 
              selectedDate={selectedDate}
              isSameMonth={isSameMonth}
              isSameDay={isSameDay}
              startDate={startDate}
              endDate={endDate}
              handleDateClick={handleDateClick}
              days={days}
              isInRange={isInRange}
              format={format}
              goToNextMonth={goToNextMonth}
              goToPreviousMonth={goToPreviousMonth}
           />
          {FillContent()}
          </Sidebar>
          </>

}

export default Advances