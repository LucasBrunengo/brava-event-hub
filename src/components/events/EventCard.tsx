import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, User, Clock, Tag, Euro } from 'lucide-react';
import { Event } from '@/types';
import { format } from 'date-fns';
import { useApp } from '@/context/AppContext';

interface EventCardProps {
  event: Event;
  onClick: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  const { currentUser } = useApp();
  const eventDate = new Date(event.date);
  const goingCount = event.attendees.filter(a => a.status === 'going').length;
  const maybeCount = event.attendees.filter(a => a.status === 'maybe').length;

  // For public events, use totalAttendees if available, otherwise use actual attendees count
  const displayGoingCount = event.isPublic && event.totalAttendees ? event.totalAttendees : goingCount;

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

  const getDiscountedPrice = () => {
    if (!event.ticketPrice || !event.discountPercentage) return event.ticketPrice;
    return event.ticketPrice * (1 - event.discountPercentage / 100);
  };

  const getBorderColor = () => {
    // My events (I'm the organizer) - purple
    if (event.organizerId === currentUser?.id) return 'border-purple-500 border-2';
    // Public events - blue
    if (event.isPublic) return 'border-blue-500 border-2';
    // Private events by friends - green
    if (!event.isPublic && event.organizerId !== currentUser?.id) return 'border-green-500 border-2';
    return '';
  };

  return (
    <Card 
      className={`cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02] animate-fade-in ${getBorderColor()}`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        {/* Banner space for customization */}
        {(event.customBanner || event.isPublic || !event.isPublic) && (
          <div className="mb-3 -mx-4 -mt-4 h-32 rounded-t-lg overflow-hidden">
            {event.customBanner ? (
              <img src={event.customBanner} alt="Event banner" className="w-full h-full object-cover object-top" />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 opacity-20" />
            )}
          </div>
        )}
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-lg text-foreground">{event.name}</h3>
            </div>
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

          {event.isPublic && event.ticketPrice && (
            <div className="flex items-center gap-2 text-sm">
              <Euro className="w-4 h-4 text-muted-foreground" />
              <div className="flex items-center gap-2">
                {event.isPromoted && event.discountPercentage ? (
                  <>
                    <span className="line-through text-muted-foreground">€{event.ticketPrice.toFixed(2)}</span>
                    <span className="font-semibold text-green-600">€{getDiscountedPrice()?.toFixed(2)}</span>
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      -{event.discountPercentage}% OFF
                    </Badge>
                  </>
                ) : (
                  <span className="font-semibold">€{event.ticketPrice.toFixed(2)}</span>
                )}
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="w-4 h-4" />
            <span>by {event.organizer.name}</span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-4 text-sm">
            <span className="text-green-600 font-medium">{displayGoingCount} Going</span>
            {maybeCount > 0 && (
              <span className="text-yellow-600">{maybeCount} Maybe</span>
            )}
          </div>
          
          <div className="flex gap-2">
            {!event.isPublic && event.hasExpenseSplitting && (
              <Badge variant="outline" className="text-xs">
                💰 Split Bills
              </Badge>
            )}
            {event.isPublic && event.isPromoted && (
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                Promoted
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
