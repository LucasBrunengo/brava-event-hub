import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Calendar, MapPin, User, Ticket, Euro, Edit, Share2 } from 'lucide-react';
import { Event, User as UserType } from '@/types';
import { useApp } from '@/context/AppContext';
import { format, formatDistanceToNow } from 'date-fns';
import { ExpenseSection } from './ExpenseSection';
import { CommentSection } from './CommentSection';
import { EventMap } from './EventMap';
import { PhotoGallery } from './PhotoGallery';
import { EditEventForm } from './EditEventForm';
import { InviteFriendsModal } from './InviteFriendsModal';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogPortal, DialogOverlay } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { QuickPay } from './QuickPay';
import { useApp } from '@/context/AppContext';

interface EventDetailProps {
  event: Event;
  onBack: () => void;
  onShare: () => void;
  portalContainer?: HTMLElement | null;
}

export const EventDetail: React.FC<EventDetailProps> = ({ event, onBack, onShare, portalContainer }) => {
  const { currentUser, setViewedProfile, purchaseTickets } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [ticketType, setTicketType] = useState<'general' | 'vip'>('general');

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

  const handleInviteFriends = () => {
    setShowInviteModal(true);
  };

  const handleUserClick = (user: UserType) => {
    setViewedProfile(user);
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

  const getSelectedTicketPrice = () => {
    if (event.ticketTiers && event.ticketTiers.length > 0) {
      const tier = event.ticketTiers.find(t => (ticketType === 'vip' ? t.id === 'first' : t.id === 'early')) || event.ticketTiers[0];
      return tier.price;
    }
    const base = event.isPromoted && event.discountPercentage ? (getDiscountedPrice() || 0) : (event.ticketPrice || 0);
    const multiplier = ticketType === 'vip' ? 2 : 1;
    return base * multiplier;
  };

  const totalPrice = () => {
    return getSelectedTicketPrice() * ticketQuantity;
  };

  const handlePurchase = () => {
    // Demo purchase flow
    setShowPurchaseModal(false);
    setDisplayRsvpStatus('going');
    if (purchaseTickets) {
      const tierId = event.ticketTiers && event.ticketTiers.length > 0 ? (ticketType === 'vip' ? 'first' : 'early') : 'first';
      purchaseTickets(event.id, tierId, ticketQuantity);
    }
  };

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
              📈 Analytics
            </Button>
            <Button variant="outline" size="sm">
              💲 {event.soldTickets || 0}
            </Button>
            <Button variant="outline" size="sm" onClick={handleInviteFriends}>
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

      {/* Invite Friends Modal */}
      <InviteFriendsModal
        event={event}
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        container={portalContainer}
      />

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
                    onClick={() => handleUserClick(event.organizer)}
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

              {(event.ticketPrice || (event.ticketTiers && event.ticketTiers.length)) && (
                <Button 
                  onClick={() => setShowPurchaseModal(true)}
                  className="w-full brava-gradient"
                >
                  <Ticket className="w-4 h-4 mr-2" />
                  Buy Tickets in App
                  {event.ticketTiers && event.ticketTiers.length
                    ? ` - from €${Math.min(...event.ticketTiers.map(t => t.price)).toFixed(2)}`
                    : ` - €${(event.isPromoted && event.discountPercentage ? getDiscountedPrice() : event.ticketPrice)?.toFixed(2)}`}
                </Button>
              )}
          </div>
        </CardContent>
      </Card>

      {/* Purchase Tickets Modal */}
      <Dialog open={showPurchaseModal} onOpenChange={setShowPurchaseModal}>
        <DialogPortal container={portalContainer}>
          <DialogOverlay className="bg-black/60" />
          <DialogContent className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-h-[90%] flex flex-col rounded-2xl border bg-white p-0 shadow-2xl">
            <DialogHeader className="p-4 border-b">
              <DialogTitle className="text-lg">Buy Tickets</DialogTitle>
            </DialogHeader>
            <div className="p-4 space-y-4">
              {event.ticketTiers && event.ticketTiers.length > 0 ? (
                <div className="space-y-2">
                  {event.ticketTiers.map(t => {
                    const soldOut = t.sold >= t.quantity;
                    return (
                      <Button key={t.id} variant="outline" disabled={soldOut} className={`w-full justify-between ${soldOut ? 'opacity-60' : ''}`} onClick={() => setTicketType(t.id === 'first' ? 'vip' : 'general')}>
                        <span>{t.name}</span>
                        <span>€{t.price.toFixed(2)} {soldOut && '(Sold out)'}</span>
                      </Button>
                    );
                  })}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Button variant={ticketType === 'general' ? 'default' : 'outline'} onClick={() => setTicketType('general')}>Early Bird</Button>
                  <Button variant={ticketType === 'vip' ? 'default' : 'outline'} onClick={() => setTicketType('vip')}>First Release</Button>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input id="quantity" type="number" min={1} max={8} value={ticketQuantity} onChange={(e) => setTicketQuantity(Math.max(1, Math.min(8, Number(e.target.value))))} />
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                <span>Total</span>
                <span className="font-semibold">€{totalPrice().toFixed(2)}</span>
              </div>
              <QuickPay />
              <Button className="w-full brava-gradient" onClick={handlePurchase}>Confirm Purchase</Button>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>

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
                     <button key={attendee.userId} onClick={() => handleUserClick(attendee.user)}>
                      <Avatar className="inline-block h-8 w-8 rounded-full ring-2 ring-white">
                        <AvatarImage src={attendee.user.avatar} />
                        <AvatarFallback>{attendee.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </button>
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
                  <div 
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => handleUserClick(attendee.user)}
                  >
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
      
      {/* Comments and Expenses */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          {event.hasExpenseSplitting && (
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
          )}
          <TabsTrigger value="comments">Comments</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
           <PhotoGallery 
             photos={event.photos || []} 
             attendees={event.attendees.map(a => a.user)}
             eventId={event.id}
             portalContainer={portalContainer}
           />
           <EventMap location={event.location} />
        </TabsContent>
        {event.hasExpenseSplitting && (
          <TabsContent value="expenses">
            <ExpenseSection event={event} portalContainer={portalContainer} />
          </TabsContent>
        )}
        <TabsContent value="comments">
          <CommentSection eventId={event.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}; 