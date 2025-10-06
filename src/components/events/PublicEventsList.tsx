
import React from 'react';
import { EventCard } from './EventCard';
import { Event } from '@/types';

interface PublicEventsListProps {
  events: Event[];
  onEventClick: (event: Event) => void;
}

export const PublicEventsList: React.FC<PublicEventsListProps> = ({ 
  events, 
  onEventClick
}) => {
  if (events.length === 0) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          🌍
        </div>
        <h3 className="font-semibold text-lg mb-2">No Public Events</h3>
        <p className="text-muted-foreground max-w-xs mx-auto">
          Check back later for public events in your area
        </p>
      </div>
    );
  }

  // Sort events: promoted events first, then by date
  const sortedEvents = [...events].sort((a, b) => {
    if (a.isPromoted && !b.isPromoted) return -1;
    if (!a.isPromoted && b.isPromoted) return 1;
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return (
    <div className="space-y-3">
      {sortedEvents.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onClick={() => onEventClick(event)}
        />
      ))}
    </div>
  );
};
