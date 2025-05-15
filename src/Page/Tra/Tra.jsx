import React, { useCallback, useContext, useEffect } from "react"
import Sidebar from "../../Component/Sidebar/Sidebar"
import UseCalendar from "../../Hooks/UseCalendar"
import CalenderTailwindcss from "../../Component/CalenderTailwindcss/CalenderTailwindcss"
import  AutoProvider  from "../../UseContext.js/Autoprovider"
import useCloubesActions from "../../Actions/useCloubesActions"
import { useSelector } from "react-redux"
import { Loader, SearchX  } from "lucide-react";
import TraTable from "../../Component/TraTable/TraTable"
import ExportButton from "../../Component/ExportButton/ExportButton"
import moment from "moment"

const Tra =() => {
    const {
        endDate,
        endDateformat,
        format,
        goToNextMonth,
        goToPreviousMonth,
        handleDateClick,
        isInRange,
        isSameDay,
        isSameMonth,
        selectedDate,
        startDate,
        stardateFormat,
        days,
      } = UseCalendar();

      const {jwt} = useContext(AutoProvider)
      const {PostGuestTraCloudbeds} =useCloubesActions()
      const { GuestTra, LoadingGuestTra, ErrorGuestTra } = useSelector((state) => state.Cloubeds);

      const fetchData =useCallback(async() => {
        await PostGuestTraCloudbeds({propertyID:jwt?.result?.propertyID,startDate:stardateFormat,endDate:endDateformat});
      },[stardateFormat,endDateformat])
    
      useEffect(() =>{
        fetchData()
      },[stardateFormat,endDateformat])
    
      
  
      const FillContent=() =>{
        if(LoadingGuestTra){
            return <> <div className="flex justify-center items-center h-40">
                  <Loader className="w-8 h-8 animate-spin text-indigo-600" />
                </div></>
        }if(ErrorGuestTra){
            return  <div className="flex flex-col items-center justify-center h-40 text-gray-500">
                    <SearchX className="w-8 h-8 mb-2" />
                    <p className="text-sm font-medium">No se encontraron resultados</p>
                  </div>
        
        }

        const dataFDilter = GuestTra.map((item) =>{

            const Date = moment(item.date).utc().format('YYYY-MM-DD HH:mm')
           
           return  {
                Codigo:item.Codigo_tra,
                Nombre:item.guestName,
                Codigo_reserva:item.reservationID,
                Hotel:item.name,
                Habitacion:Date,
           }
        })

        return  <div className="bg-white rounded-lg shadow p-6 w-full mx-auto">
                    <h2 className="text-lg font-medium text-gray-800 mb-6">Tarjeta alojamiento</h2>
                    <TraTable GuestTra={GuestTra} />
                    <ExportButton
                    data={dataFDilter}
                    nameContent="Hospedaje" 
                    filename="output.xlsx" />
                </div>
    }


    return  <>
   
        <Sidebar>
        <CalenderTailwindcss
                days={days}
                endDate={endDate}
                endDateformat={endDateformat}
                format={format}
                goToNextMonth={goToNextMonth}
                goToPreviousMonth={goToPreviousMonth}
                handleDateClick={handleDateClick}
                isInRange={isInRange}
                isSameDay={isSameDay}
                isSameMonth={isSameMonth}
                selectedDate={selectedDate}
                startDate={startDate}
                stardateFormat={stardateFormat}
        />
        {FillContent()}
        </Sidebar>
        </>
}

export default Tra