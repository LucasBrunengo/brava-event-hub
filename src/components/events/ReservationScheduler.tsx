import React, { useMemo } from 'react';
import { Venue } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as UICalendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';

interface ReservationSchedulerProps {
  venue: Venue;
  selectedDate: string | null; // YYYY-MM-DD
  selectedTime: string | null; // HH:mm
  onSelect: (date: string, time: string) => void;
}

export const ReservationScheduler: React.FC<ReservationSchedulerProps> = ({ venue, selectedDate, selectedTime, onSelect }) => {
  const availableDates = useMemo(() => new Set((venue.availability || []).map(a => a.date)), [venue.availability]);
  const timesForSelectedDate = useMemo(() => {
    const slot = (venue.availability || []).find(a => a.date === selectedDate);
    return slot ? slot.times : [];
  }, [venue.availability, selectedDate]);

  const handleDateChange = (date: Date | undefined) => {
    if (!date) return;
    const iso = date.toISOString().split('T')[0];
    const times = (venue.availability || []).find(a => a.date === iso)?.times || [];
    if (times.length > 0) {
      onSelect(iso, times[0]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Reserve a date & time</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <UICalendar
          key={`${venue.id}-${selectedDate || 'none'}`}
          mode="single"
          selected={selectedDate ? new Date(selectedDate) : undefined}
          onSelect={handleDateChange}
          defaultMonth={selectedDate ? new Date(selectedDate) : undefined}
          disabled={(date) => !availableDates.has(date.toISOString().split('T')[0])}
        />
        <div className="grid grid-cols-3 gap-2">
          {timesForSelectedDate.map(time => (
            <Button key={time} variant={time === selectedTime ? 'default' : 'outline'} onClick={() => onSelect(selectedDate as string, time)} className="h-10">
              {time}
            </Button>
          ))}
          {timesForSelectedDate.length === 0 && (
            <div className="text-sm text-muted-foreground col-span-3">No times available for selected date.</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReservationScheduler;

