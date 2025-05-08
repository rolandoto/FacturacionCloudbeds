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
import { useState } from "react";

const UseCalendar =() =>{

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const isInRange = (day) => startDate && endDate && (isAfter(day, startDate) && isBefore(day, endDate));
    
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
    
      return {
        handleDateClick,
        goToNextMonth,
        goToPreviousMonth,
        stardateFormat,
        endDateformat,
        days,
        isInRange,
        isSameMonth,
        selectedDate,
        format,
        es,
        isSameDay,
        startDate,
        endDate
      }

}

export default UseCalendar