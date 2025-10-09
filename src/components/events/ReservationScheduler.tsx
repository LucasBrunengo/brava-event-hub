import React, { useState, useMemo } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import { Venue } from '@/types';
import { generateWeekAvailability } from '@/data/generateWeekAvailability';

interface ReservationSchedulerProps {
  venue: Venue;
  selectedDate: string | null;
  selectedTime: string | null;
  onSelect: (date: string, time: string) => void;
}

const ReservationScheduler: React.FC<ReservationSchedulerProps> = ({
  venue,
  selectedDate,
  selectedTime,
  onSelect,
}) => {
  const [date, setDate] = useState<Date | undefined>(selectedDate ? new Date(selectedDate) : undefined);
  
  // Memoize week availability so it doesn't change on every render
  const weekAvailability = useMemo(() => generateWeekAvailability(), []);

  const getAvailableTimesForDate = (dateToCheck: Date): string[] => {
    const dateStr = dateToCheck.toISOString().split('T')[0];
    const dayAvailability = weekAvailability.find(a => a.date === dateStr);
    return dayAvailability?.times || [];
  };

  const availableTimes = date ? getAvailableTimesForDate(date) : [];

  const handleDateSelect = (newDate: Date | undefined) => {
    if (!newDate) return;
    setDate(newDate);
    // Don't auto-select time, just show available times
  };

  const handleTimeSelect = (time: string) => {
    if (date) {
      onSelect(date.toISOString().split('T')[0], time);
    }
  };

  return (
    <Card onClick={(e) => e.stopPropagation()}>
      <CardContent className="p-4 space-y-3">
        <p className="text-sm font-medium">Select Date & Time</p>
        <div 
          className="border rounded-lg overflow-hidden bg-background"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            className="w-full pointer-events-auto"
            disabled={(checkDate) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              const oneWeekFromNow = new Date(today);
              oneWeekFromNow.setDate(today.getDate() + 7);
              return checkDate < today || checkDate > oneWeekFromNow;
            }}
          />
        </div>

        {date && availableTimes.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Available Times for {date.toLocaleDateString()}</p>
            <div className="grid grid-cols-3 gap-2">
              {availableTimes.map((time) => (
                <Button
                  key={time}
                  type="button"
                  variant={selectedTime === time ? 'default' : 'outline'}
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleTimeSelect(time);
                  }}
                  className="text-xs h-9"
                >
                  <Clock className="w-3 h-3 mr-1" />
                  {time}
                </Button>
              ))}
            </div>
          </div>
        )}

        {date && availableTimes.length === 0 && (
          <div className="text-sm text-muted-foreground text-center py-2">
            No available time slots for this date. Please select another date.
          </div>
        )}
        
        {!date && (
          <div className="text-sm text-muted-foreground text-center py-2">
            Please select a date to see available times
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReservationScheduler;

