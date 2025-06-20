
import React from 'react';
import { EventCard } from './EventCard';
import { Event } from '@/types';

interface EventsListProps {
  events: Event[];
  onEventClick: (event: Event) => void;
  emptyMessage?: string;
}

export const EventsList: React.FC<EventsListProps> = ({ 
  events, 
  onEventClick, 
  emptyMessage = "No events found" 
}) => {
  if (events.length === 0) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          📅
        </div>
        <h3 className="font-semibold text-lg mb-2">No Events Yet</h3>
        <p className="text-muted-foreground max-w-xs mx-auto">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onClick={() => onEventClick(event)}
        />
      ))}
    </div>
  );
};
