import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Calendar, MapPin, User, MessageSquare, ExternalLink, Ticket, Euro, Edit, Share2, Heart, MessageCircle } from 'lucide-react';
import { Event, UserProfile as UserProfileType } from '@/types';
import { useApp } from '@/context/AppContext';
import { format, formatDistanceToNow } from 'date-fns';
import { ExpenseSection } from './ExpenseSection';
import { CommentSection } from './CommentSection';
import { EventMap } from './EventMap';
import { PhotoGallery } from './PhotoGallery';
import { UserProfile } from '../profile/UserProfile';
import { QuickPay } from './QuickPay';
import { EditEventForm } from './EditEventForm';

interface EventDetailProps {
  event: Event;
  onBack: () => void;
  onShare?: () => void;
}

export const EventDetail: React.FC<EventDetailProps> = ({ event, onBack, onShare }) => {
  const { currentUser, events } = useApp();
  const [showUserProfile, setShowUserProfile] = useState<UserProfileType | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const currentUserAttendee = event.attendees.find(a => a.userId === currentUser?.id);
  const [displayRsvpStatus, setDisplayRsvpStatus] = useState(currentUserAttendee?.status || null);

  const goingCount = event.attendees.filter(a => a.status === 'going').length;
  const maybeCount = event.attendees.filter(a => a.status === 'maybe').length;
  const notGoingCount = event.attendees.filter(a => a.status === 'not-going').length;

  const handleRSVP = (status: 'going' | 'maybe' | 'not-going') => {
    setDisplayRsvpStatus(status);
  };

  const handleEditEvent = () => {
    setIsEditing(true);
  };

  const handleEventUpdated = () => {
    setIsEditing(false);
  };

  const handleOrganizerClick = () => {
    // Create mock user profile data
    const sharedEvents = events.filter(e => 
      e.attendees.some(a => a.userId === currentUser?.id && a.status === 'going') &&
      e.attendees.some(a => a.userId === event.organizerId && a.status === 'going')
    );

    const userProfile: UserProfileType = {
      user: event.organizer,
      mutualFriends: Math.floor(Math.random() * 15) + 1,
      sharedEvents,
      sharedPhotos: [],
      friendship: {
        id: 'friendship-1',
        userId1: currentUser?.id || '',
        userId2: event.organizerId,
        status: 'accepted',
        createdAt: new Date().toISOString(),
        sharedEvents: sharedEvents.map(e => e.id)
      }
    };

    setShowUserProfile(userProfile);
  };

  const getStatusButtonClass = (status: 'going' | 'maybe' | 'not-going') => {
    if (displayRsvpStatus === status) {
      switch (status) {
        case 'going': return 'bg-green-500 text-white hover:bg-green-600 border-green-500 shadow-lg';
        case 'maybe': return 'bg-yellow-500 text-white hover:bg-yellow-600 border-yellow-500 shadow-lg';
        case 'not-going': return 'bg-red-500 text-white hover:bg-red-600 border-red-500 shadow-lg';
      }
    }
    return 'bg-muted hover:bg-muted/80 border border-gray-300';
  };

  const getDiscountedPrice = () => {
    if (!event.ticketPrice || !event.discountPercentage) return event.ticketPrice;
    return event.ticketPrice * (1 - event.discountPercentage / 100);
  };

  if (showUserProfile) {
    return (
      <UserProfile 
        userProfile={showUserProfile} 
        onBack={() => setShowUserProfile(null)} 
      />
    );
  }

  if (isEditing) {
    return (
      <EditEventForm 
        event={event}
        onBack={() => setIsEditing(false)}
        onEventUpdated={handleEventUpdated}
      />
    );
  }

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Back Button */}
      <div className="flex items-center">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
      </div>

      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold">{event.name}</h1>
      </div>
      
      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-2">
        {currentUser?.id === event.organizerId && (
          <>
            <Button variant="outline" size="sm" onClick={handleEditEvent}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Event
            </Button>
            <Button variant="outline" size="sm">
              <User className="w-4 h-4 mr-2" />
              Invite Friends
            </Button>
          </>
        )}
        {onShare && (
          <Button variant="outline" size="sm" onClick={onShare}>
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        )}
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
                <span>
                  Organized by{' '}
                  <button 
                    onClick={handleOrganizerClick}
                    className="text-primary hover:underline font-medium"
                  >
                    {event.organizer.name}
                  </button>
                </span>
              </div>

              {event.ticketPrice && (
                <div className="flex items-center gap-2">
                  <Euro className="w-4 h-4 text-muted-foreground" />
                  <div className="flex items-center gap-2">
                    {event.isPromoted && event.discountPercentage ? (
                      <>
                        <span className="line-through text-muted-foreground">€{event.ticketPrice.toFixed(2)}</span>
                        <span className="font-semibold text-green-600 text-lg">€{getDiscountedPrice()?.toFixed(2)}</span>
                        <Badge className="bg-green-100 text-green-800">
                          -{event.discountPercentage}% OFF
                        </Badge>
                      </>
                    ) : (
                      <span className="font-semibold text-lg">€{event.ticketPrice.toFixed(2)}</span>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {!event.isPublic && event.hasExpenseSplitting && (
                <Badge variant="outline">
                  💰 Expense splitting enabled
                </Badge>
              )}
            </div>

            {event.ticketUrl && (
              <Button 
                onClick={() => window.open(event.ticketUrl, '_blank')}
                className="w-full brava-gradient"
              >
                <Ticket className="w-4 h-4 mr-2" />
                Buy Tickets
                {event.ticketPrice && ` - €${event.isPromoted && event.discountPercentage ? getDiscountedPrice()?.toFixed(2) : event.ticketPrice?.toFixed(2)}`}
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            )}

            {/* Quick Pay for public events with ticket prices */}
            {event.isPublic && event.ticketPrice && (
              <div className="mt-4">
                <QuickPay />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Map */}
      <EventMap location={event.location} />

      {/* RSVP Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Response</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            <Button
              onClick={() => handleRSVP('going')}
              className={`${getStatusButtonClass('going')} h-12 font-semibold transition-all duration-200`}
              size="lg"
            >
              Going ({goingCount})
            </Button>
            <Button
              onClick={() => handleRSVP('maybe')}
              className={`${getStatusButtonClass('maybe')} h-12 font-semibold transition-all duration-200`}
              size="lg"
            >
              Maybe ({maybeCount})
            </Button>
            <Button
              onClick={() => handleRSVP('not-going')}
              className={`${getStatusButtonClass('not-going')} h-12 font-semibold transition-all duration-200`}
              size="lg"
            >
              Can't Go ({notGoingCount})
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Attendees */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Attendees ({event.isPublic && event.totalAttendees ? event.totalAttendees : event.attendees.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {event.isPublic && event.totalAttendees ? (
              <div className="flex items-center">
                <div className="flex -space-x-2 overflow-hidden">
                  {event.attendees.slice(0, 5).map(attendee => (
                    <Avatar key={attendee.userId} className="inline-block h-8 w-8 rounded-full ring-2 ring-white">
                      <AvatarImage src={attendee.user.avatar} />
                      <AvatarFallback>{attendee.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                {event.totalAttendees > 5 && (
                  <p className="ml-3 text-sm font-medium text-muted-foreground">
                    +{event.totalAttendees - 5} others are going
                  </p>
                )}
              </div>
            ) : (
              event.attendees.map((attendee) => (
                <div key={attendee.userId} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={attendee.user.avatar} />
                      <AvatarFallback>
                        {attendee.user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{attendee.user.name}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Responded: {formatDistanceToNow(new Date(attendee.joinedAt), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!event.isPublic && attendee.ticketStatus && (
                      <Badge 
                        variant={
                          attendee.ticketStatus === 'purchased' ? 'default' :
                          attendee.ticketStatus === 'pending' ? 'secondary' :
                          'outline'
                        }
                        className={`text-xs px-2 py-0.5 ${
                          attendee.ticketStatus === 'purchased' ? 'bg-green-500 text-white' : ''
                        }`}
                      >
                        {attendee.ticketStatus === 'purchased' && <Ticket className="w-2.5 h-2.5 mr-1" />}
                        {attendee.ticketStatus.charAt(0).toUpperCase() + attendee.ticketStatus.slice(1)}
                      </Badge>
                    )}
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
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Photo Gallery */}
      <PhotoGallery 
        photos={event.photos || []} 
        attendees={event.attendees.map(a => a.user)}
        eventId={event.id}
      />

      {/* Comments and Expenses */}
      <Tabs defaultValue="comments" className="space-y-4">
        <TabsList className={`grid w-full ${!event.isPublic && event.hasExpenseSplitting ? 'grid-cols-2' : 'grid-cols-1'}`}>
          <TabsTrigger value="comments">
            <MessageSquare className="w-4 h-4 mr-2" />
            Comments
          </TabsTrigger>
          {!event.isPublic && event.hasExpenseSplitting && (
            <TabsTrigger value="expenses">💰 Expenses</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="comments">
          <CommentSection eventId={event.id} />
        </TabsContent>

        {!event.isPublic && event.hasExpenseSplitting && (
          <TabsContent value="expenses">
            <ExpenseSection event={event} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};
