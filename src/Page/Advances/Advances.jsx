
import React, { useCallback, useContext, useEffect, useRef, useState } from "react"
import Sidebar from "../../Component/Sidebar/Sidebar"
import { useSelector } from "react-redux";
import useCloubesActions from "../../Actions/useCloubesActions";
import AdvanceTable from "../../Component/AdvanceTable/AdvanceTable";
import AutoProvider  from "../../UseContext.js/Autoprovider";
import * as XLSX from 'xlsx';
import { FileSpreadsheet,ChevronLeft,ChevronRight, Loader, SearchX  } from "lucide-react";
import moment from "moment";
import "moment/locale/es"; 
import { es } from "date-fns/locale";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  isBefore,
  isAfter,
  addMonths,
  subMonths,
  format,
} from "date-fns";


const Advances =() =>{
  
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const startMonth = startOfMonth(selectedDate);
  const endMonth = endOfMonth(selectedDate);
  const start = startOfWeek(startMonth, { weekStartsOn: 1 });
  const end = endOfWeek(endMonth, { weekStartsOn: 1 });

  const stardateFormat =  moment(startDate).utc().format('YYYY-MM-DD')
  const endDateformat =   moment(endDate).utc().format('YYYY-MM-DD')

  const days = [];
  let current = start;
  while (current <= end) {
    days.push(current);
    current = addDays(current, 1);
  }

  const goToPreviousMonth = () => {
    setSelectedDate((prev) => subMonths(prev, 1));
  };

  const goToNextMonth = () => {
    setSelectedDate((prev) => addMonths(prev, 1));
  };

  const fetchData =  useCallback(async() => {
    await GetAmmountAdvance({ propertyID: jwt?.result?.propertyID,startDate:stardateFormat,endDate:endDateformat});
  },[stardateFormat,endDateformat])


  useEffect(() =>{
    fetchData()
  },[stardateFormat,endDateformat])

  const handleDateClick = (day) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day);
      setEndDate(null);
    
    } else if (isBefore(day, startDate)) {
      setEndDate(startDate);
      setStartDate(day);
    
    } else {
      setEndDate(day);
    }
  };


  const isInRange = (day) =>
    startDate &&
    endDate &&
    (isAfter(day, startDate) && isBefore(day, endDate));



    const ExportButton = ({ data, filename }) => {
      const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
        XLSX.writeFile(wb, filename);
      };
    
      return (
        <button 
          onClick={exportToExcel}
          className="mt-2 flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          <FileSpreadsheet className="w-5 h-5" />
          Exportar Excel
        </button>
      );
    };

    const {GetAmmountAdvance} =useCloubesActions()
    const { Advances, LoadingAdvances, ErrorAdvances } = useSelector((state) => state.Cloubeds);
    const {jwt} = useContext(AutoProvider)

     
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
                    <div className="max-w-7xl mx-auto p-6  bg-white  ">
                        <div className="flex justify-between items-center mb-4">
                            <button
                            className="text-xl font-bold" onClick={goToPreviousMonth } >
                            <ChevronLeft />
                            </button>
                            <div className="text-center font-semibold text-lg">
                            {format(selectedDate, "MMMM yyyy",{locale:es}).toUpperCase()}
                            </div>
                            <button
                            onClick={goToNextMonth }
                            className="text-xl font-bold"
                            >
                            <ChevronRight/>
                            </button>
                        </div>
                    <div className="grid grid-cols-7 gap-2 text-center text-sm text-gray-500 mb-2">
                        <div>L</div><div>M</div><div>X</div><div>J</div><div>V</div><div>S</div><div>D</div>
                    </div>
                    <div className="grid grid-cols-7    rounded-lg  text-center text-sm">
                        {days.map((day, idx) => {
                            const isCurrentMonth = isSameMonth(day, selectedDate);
                            const isSelectedStart = startDate && isSameDay(day, startDate);
                            const isSelectedEnd = endDate && isSameDay(day, endDate);
                            return (
                              <button
                              key={idx}
                              onClick={() => handleDateClick(day)}
                              className={`
                                p-8 w-8 h-8  border-b gap-10 mx-auto flex items-center justify-center
                                ${isSelectedStart || isSelectedEnd ? "bg-indigo-600 p-4 w-10 rounded-full text-white font-bold" : ""}
                                ${isInRange(day) ? "bg-gray-100 text-black" : ""}
                                ${!isCurrentMonth ? "text-gray-400" : "text-gray-700  p-8 w-5 h-5 hover:text-white hover:rounded-full hover:bg-indigo-600"}
                              `}>
                              {format(day, "d")}
                            </button>
                            );
                        })}
                        </div>
                    </div>
            {FillContent()}
            </Sidebar>
        </>

}

export default Advances