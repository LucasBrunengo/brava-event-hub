
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, User, Clock } from 'lucide-react';
import { Event } from '@/types';
import { format } from 'date-fns';

interface EventCardProps {
  event: Event;
  onClick: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  const eventDate = new Date(event.date);
  const goingCount = event.attendees.filter(a => a.status === 'going').length;
  const maybeCount = event.attendees.filter(a => a.status === 'maybe').length;

  const getStatusColor = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    eventDate.setHours(0, 0, 0, 0);
    
    if (eventDate < today) return 'bg-muted text-muted-foreground';
    if (eventDate.getTime() === today.getTime()) return 'bg-green-100 text-green-800';
    return 'bg-blue-100 text-blue-800';
  };

  const getStatusText = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    eventDate.setHours(0, 0, 0, 0);
    
    if (eventDate < today) return 'Past Event';
    if (eventDate.getTime() === today.getTime()) return 'Today';
    return 'Upcoming';
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02] animate-fade-in"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-foreground mb-1">{event.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
          </div>
          <Badge className={getStatusColor()}>
            {getStatusText()}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{format(eventDate, 'MMM d, yyyy')}</span>
            <Clock className="w-4 h-4 ml-2" />
            <span>{event.time}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="truncate">{event.location}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="w-4 h-4" />
            <span>by {event.organizer.name}</span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-4 text-sm">
            <span className="text-green-600 font-medium">{goingCount} Going</span>
            {maybeCount > 0 && (
              <span className="text-yellow-600">{maybeCount} Maybe</span>
            )}
          </div>
          
          {event.hasExpenseSplitting && (
            <Badge variant="outline" className="text-xs">
              💰 Split Bills
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
