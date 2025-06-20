
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Calendar, MapPin, User, MessageSquare } from 'lucide-react';
import { Event } from '@/types';
import { useApp } from '@/context/AppContext';
import { format } from 'date-fns';
import { ExpenseSection } from './ExpenseSection';
import { CommentSection } from './CommentSection';

interface EventDetailProps {
  event: Event;
  onBack: () => void;
}

export const EventDetail: React.FC<EventDetailProps> = ({ event, onBack }) => {
  const { currentUser, updateEventRSVP } = useApp();
  const [isUpdatingRSVP, setIsUpdatingRSVP] = useState(false);

  const currentUserAttendee = event.attendees.find(a => a.userId === currentUser?.id);
  const currentStatus = currentUserAttendee?.status || null;

  const goingCount = event.attendees.filter(a => a.status === 'going').length;
  const maybeCount = event.attendees.filter(a => a.status === 'maybe').length;
  const notGoingCount = event.attendees.filter(a => a.status === 'not-going').length;

  const handleRSVP = async (status: 'going' | 'maybe' | 'not-going') => {
    if (!currentUser) return;
    
    setIsUpdatingRSVP(true);
    try {
      updateEventRSVP(event.id, status);
    } finally {
      setIsUpdatingRSVP(false);
    }
  };

  const getStatusButtonClass = (status: 'going' | 'maybe' | 'not-going') => {
    if (currentStatus === status) {
      switch (status) {
        case 'going': return 'bg-green-500 text-white hover:bg-green-600';
        case 'maybe': return 'bg-yellow-500 text-white hover:bg-yellow-600';
        case 'not-going': return 'bg-red-500 text-white hover:bg-red-600';
      }
    }
    return 'bg-muted hover:bg-muted/80';
  };

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{event.name}</h1>
          <p className="text-muted-foreground">Organized by {event.organizer.name}</p>
        </div>
      </div>

      {/* Event Info */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <p className="text-foreground">{event.description}</p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{format(new Date(event.date), 'EEEE, MMMM d, yyyy')} at {event.time}</span>
              </div>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{event.location}</span>
              </div>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="w-4 h-4" />
                <span>Organized by {event.organizer.name}</span>
              </div>
            </div>

            {event.hasExpenseSplitting && (
              <Badge variant="outline" className="w-fit">
                💰 Expense splitting enabled
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* RSVP Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Response</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            <Button
              onClick={() => handleRSVP('going')}
              disabled={isUpdatingRSVP}
              className={getStatusButtonClass('going')}
              size="sm"
            >
              Going ({goingCount})
            </Button>
            <Button
              onClick={() => handleRSVP('maybe')}
              disabled={isUpdatingRSVP}
              className={getStatusButtonClass('maybe')}
              size="sm"
            >
              Maybe ({maybeCount})
            </Button>
            <Button
              onClick={() => handleRSVP('not-going')}
              disabled={isUpdatingRSVP}
              className={getStatusButtonClass('not-going')}
              size="sm"
            >
              Can't Go ({notGoingCount})
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Attendees */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Attendees ({event.attendees.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {event.attendees.map((attendee) => (
              <div key={attendee.userId} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={attendee.user.avatar} />
                    <AvatarFallback>
                      {attendee.user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{attendee.user.name}</span>
                  {event.organizerId === attendee.userId && (
                    <Badge variant="outline" className="text-xs">Organizer</Badge>
                  )}
                </div>
                <Badge 
                  className={
                    attendee.status === 'going' ? 'bg-green-100 text-green-800' :
                    attendee.status === 'maybe' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }
                >
                  {attendee.status === 'going' ? 'Going' : 
                   attendee.status === 'maybe' ? 'Maybe' : 'Not Going'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Expenses, Photos, Comments */}
      <Tabs defaultValue="comments" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="comments">
            <MessageSquare className="w-4 h-4 mr-2" />
            Comments
          </TabsTrigger>
          {event.hasExpenseSplitting && (
            <TabsTrigger value="expenses">💰 Expenses</TabsTrigger>
          )}
          <TabsTrigger value="photos">📷 Photos</TabsTrigger>
        </TabsList>

        <TabsContent value="comments">
          <CommentSection eventId={event.id} />
        </TabsContent>

        {event.hasExpenseSplitting && (
          <TabsContent value="expenses">
            <ExpenseSection event={event} />
          </TabsContent>
        )}

        <TabsContent value="photos">
          <Card>
            <CardContent className="p-6">
              {event.photos && event.photos.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {event.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Event photo ${index + 1}`}
                      className="aspect-square object-cover rounded-lg"
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    📷
                  </div>
                  <h3 className="font-semibold mb-2">No Photos Yet</h3>
                  <p className="text-muted-foreground text-sm">
                    Photos from the event will appear here
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
