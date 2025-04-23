'use client'
import React, { useState } from 'react';
import { 
  format, 
  addDays, 
  subDays, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay,
  isBefore,
  startOfDay,
  getDay,
  isToday,
  addMonths,
  subMonths,
  lastDayOfMonth,
  addDays as addDaysToDate
} from 'date-fns';

interface DatePickerProps {
  onDateChange: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    onDateChange(date);
    setShowCalendar(false);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  // Get the first day of the month (0-6, where 0 is Sunday)
  const firstDayOfMonth = getDay(startOfMonth(currentMonth));
  
  // Get days from previous month
  const prevMonthDays = eachDayOfInterval({
    start: addDaysToDate(startOfMonth(currentMonth), -firstDayOfMonth),
    end: addDaysToDate(startOfMonth(currentMonth), -1),
  });

  // Get days from next month to fill the grid
  const totalDays = prevMonthDays.length + days.length;
  const remainingDays = 42 - totalDays; // 6 rows * 7 days = 42
  const nextMonthDays = eachDayOfInterval({
    start: addDaysToDate(endOfMonth(currentMonth), 1),
    end: addDaysToDate(endOfMonth(currentMonth), remainingDays),
  });

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleDateChange(subDays(selectedDate, 1))}
          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-white/70"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <button
          onClick={() => setShowCalendar(!showCalendar)}
          className="bg-white/5 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors"
        >
          <span className="text-white/70 text-sm">
            {format(selectedDate, 'EEEE, MMMM d')}
            {isToday(selectedDate) && (
              <span className="ml-2 text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">
                Today
              </span>
            )}
          </span>
        </button>

        <button
          onClick={() => handleDateChange(addDays(selectedDate, 1))}
          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-white/70"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {showCalendar && (
        <div className="absolute right-0 mt-2 bg-gray-900 rounded-lg shadow-lg p-4 w-64">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handlePrevMonth}
              className="p-1 rounded-lg hover:bg-white/5 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-white/70"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <span className="text-white/70 text-sm font-medium">
              {format(currentMonth, 'MMMM yyyy')}
            </span>
            <button
              onClick={handleNextMonth}
              className="p-1 rounded-lg hover:bg-white/5 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-white/70"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
              <div key={day} className="text-center text-xs text-white/50">
                {day}
              </div>
            ))}
            {prevMonthDays.map((day) => {
              const isPast = isBefore(day, startOfDay(new Date()));
              return (
                <button
                  key={day.toString()}
                  onClick={() => !isPast && handleDateChange(day)}
                  className={`
                    p-1 rounded-lg text-sm relative
                    text-white/10
                    ${isPast ? 'cursor-not-allowed' : 'hover:bg-white/5'}
                    transition-colors
                  `}
                  disabled={isPast}
                >
                  {format(day, 'd')}
                </button>
              );
            })}
            {days.map((day) => {
              const isPast = isBefore(day, startOfDay(new Date()));
              const isCurrentDay = isToday(day);
              return (
                <button
                  key={day.toString()}
                  onClick={() => !isPast && handleDateChange(day)}
                  className={`
                    p-1 rounded-lg text-sm relative
                    ${isSameMonth(day, currentMonth) ? 'text-white/70' : 'text-white/30'}
                    ${isSameDay(day, selectedDate) ? 'bg-white/10' : 'hover:bg-white/5'}
                    ${isPast ? 'text-white/10 cursor-not-allowed' : ''}
                    ${isCurrentDay ? 'ring-1 ring-blue-500' : ''}
                    transition-colors
                  `}
                  disabled={isPast}
                >
                  {format(day, 'd')}
                  {isCurrentDay && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full" />
                  )}
                </button>
              );
            })}
            {nextMonthDays.map((day) => {
              const isPast = isBefore(day, startOfDay(new Date()));
              return (
                <button
                  key={day.toString()}
                  onClick={() => !isPast && handleDateChange(day)}
                  className={`
                    p-1 rounded-lg text-sm relative
                    text-white/10
                    ${isPast ? 'cursor-not-allowed' : 'hover:bg-white/5'}
                    transition-colors
                  `}
                  disabled={isPast}
                >
                  {format(day, 'd')}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker; 