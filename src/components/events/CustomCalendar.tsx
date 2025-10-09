import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CustomCalendarProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  minDate: Date;
  maxDate: Date;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({
  selectedDate,
  onSelectDate,
  minDate,
  maxDate,
}) => {
  const [currentMonth, setCurrentMonth] = React.useState(
    selectedDate || new Date()
  );

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() - 1);
    setCurrentMonth(newMonth);
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + 1);
    setCurrentMonth(newMonth);
  };

  const handleDateClick = (e: React.MouseEvent, day: number) => {
    e.preventDefault();
    e.stopPropagation();
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    onSelectDate(date);
  };

  const isDateDisabled = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    date.setHours(0, 0, 0, 0);
    return date < minDate || date > maxDate;
  };

  const isDateSelected = (day: number) => {
    if (!selectedDate) return false;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const days = daysInMonth(currentMonth);
  const firstDay = firstDayOfMonth(currentMonth);
  const blanks = Array(firstDay).fill(null);
  const daysArray = Array.from({ length: days }, (_, i) => i + 1);

  return (
    <div className="w-full" onClick={(e) => e.stopPropagation()}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handlePrevMonth}
          className="h-8 w-8 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="font-semibold">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleNextMonth}
          className="h-8 w-8 p-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
          <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1">
        {blanks.map((_, index) => (
          <div key={`blank-${index}`} className="h-9" />
        ))}
        {daysArray.map((day) => {
          const disabled = isDateDisabled(day);
          const selected = isDateSelected(day);
          return (
            <button
              key={day}
              type="button"
              onClick={(e) => !disabled && handleDateClick(e, day)}
              disabled={disabled}
              className={`
                h-9 w-full rounded-md text-sm
                ${disabled ? 'text-muted-foreground/40 cursor-not-allowed' : 'hover:bg-accent cursor-pointer'}
                ${selected ? 'bg-primary text-primary-foreground hover:bg-primary' : ''}
                ${!disabled && !selected ? 'text-foreground' : ''}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CustomCalendar;
