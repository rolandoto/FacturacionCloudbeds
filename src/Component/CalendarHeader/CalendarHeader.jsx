import React from "react"
import {ChevronLeft,ChevronRight} from "lucide-react";
import {format} from "date-fns";
import { es } from "date-fns/locale";

const CalendarHeader = ({ selectedDate, onPrev, onNext }) => (
    <div className="flex justify-between items-center mb-4">
        <button className="text-xl font-bold" onClick={onPrev}>
          <ChevronLeft />
        </button>
        <div className="text-center font-semibold text-lg">
          {format(selectedDate, "MMMM yyyy", { locale: es })}
        </div>
        <button className="text-xl font-bold" onClick={onNext}>
          <ChevronRight />
        </button>
      </div>
  );    

export default CalendarHeader
