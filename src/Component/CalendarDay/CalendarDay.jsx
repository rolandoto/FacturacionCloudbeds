import { format, isSameMonth, isSameDay } from "date-fns";

export const CalendarDay = ({
  day,
  selectedDate,
  startDate,
  endDate,
  isInRange,
  onClick,
}) => {
  const isCurrentMonth = isSameMonth(day, selectedDate);
  const isSelectedStart = startDate && isSameDay(day, startDate);
  const isSelectedEnd = endDate && isSameDay(day, endDate);
  const isSelectedDay = isSelectedStart || isSelectedEnd;

  const baseClasses = "mx-auto p-8 w-8 h-8 flex items-center justify-center border-b p-2";
  const selectedClasses = isSelectedDay ? "bg-indigo-600 w-10 p-4 rounded-full text-white font-bold" : "";
  const rangeClasses = isInRange(day) ? "bg-gray-100 text-black" : "";
  const currentMonthClasses = isCurrentMonth
    ? "text-gray-700 hover:text-white hover:rounded-full hover:bg-indigo-600"
    : "text-gray-400";

  return (
    <button onClick={() => onClick(day)} className={`${baseClasses} ${selectedClasses} ${rangeClasses} ${currentMonthClasses}`}>
      {format(day, "d")}
    </button>
  );
};