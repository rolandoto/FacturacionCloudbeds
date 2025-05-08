import React from "react"

import RowCalender from "../RowCalender/RowCalender";
import CalendarHeader from "../CalendarHeader/CalendarHeader";
import { CalendarDay } from "../CalendarDay/CalendarDay";

const CalenderTailwindcss =({selectedDate,goToNextMonth,goToPreviousMonth,startDate,endDate,handleDateClick,days,isInRange,format}) =>{

    return <>
            <div className="max-w-7xl mx-auto p-6 bg-white">
                <CalendarHeader selectedDate={selectedDate} onNext={goToNextMonth} onPrev={goToPreviousMonth} />
                <RowCalender   />
                <div className="grid grid-cols-7 rounded-lg text-center text-sm">
                    {days.map((day, idx) => (
                        <CalendarDay
                        key={idx}
                        day={day}
                        selectedDate={selectedDate}
                        startDate={startDate}
                        endDate={endDate}
                        isInRange={isInRange}
                        onClick={handleDateClick}
                        />
                    ))}
                    </div>
              </div>      
            </>
}
export default CalenderTailwindcss