import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import { WelcomeScreen } from '@/components/auth/WelcomeScreen';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { CreateEventForm } from '@/components/events/CreateEventForm';
import { EventDetail } from '@/components/events/EventDetail';
import { ProfilePage } from '@/components/profile/ProfilePage';
import { UserProfile } from '@/components/profile/UserProfile';
import { PastEventDetail } from '@/components/events/PastEventDetail';
import { BottomNav } from '@/components/layout/BottomNav';
import { NotificationsPanel } from '@/components/layout/NotificationsPanel';
import { ChatPanel } from '@/components/layout/ChatPanel';
import { ShareEventModal } from '@/components/events/ShareEventModal';
import { OrganizerAnalyticsModal } from '@/components/dashboard/OrganizerAnalyticsModal';
import { TicketSalesModal } from '@/components/dashboard/TicketSalesModal';
import { VenuesMap } from '@/components/events/VenuesMap';
import { Button } from '@/components/ui/button';
import { Bell, MessageCircle, BarChart3, Banknote } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Event } from '@/types';
import { LoadingScreen } from '@/components/layout/LoadingScreen';
import PhoneFrame from '@/components/layout/PhoneFrame';

type View = 'dashboard' | 'create' | 'profile' | 'event-detail' | 'past-event-detail' | 'map';

const Index = () => {
  const { 
    isAuthenticated, 
    notifications, 
    messages, 
    markNotificationAsRead, 
    sendMessage, 
    markMessageAsRead, 
    events, 
    users,
    currentUser,
    viewedProfile,
    setViewedProfile,
  } = useApp();
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [showTicketSalesModal, setShowTicketSalesModal] = useState(false);
  
  const [isLoading, setIsLoading] = useState(true);
  const portalContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500); // Adjusted for quicker loading
    return () => clearTimeout(timer);
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (viewedProfile) {
    return (
       <PhoneFrame>
        <UserProfile 
          userProfile={viewedProfile}
          onBack={() => setViewedProfile(null)}
        />
      </PhoneFrame>
    )
  }

  if (isLoading) {
    return (
      <PhoneFrame>
        <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      </PhoneFrame>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white min-h-screen">
          <WelcomeScreen />
        </div>
      </div>
    );
  }

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setCurrentView('event-detail');
  };

  const handlePastEventClick = (event: Event) => {
    setSelectedEvent(event);
    setCurrentView('past-event-detail');
  };

  const handleCreateEvent = () => {
    setCurrentView('create');
  };

  const handleEventCreated = () => {
    setCurrentView('dashboard');
  };

  const handleBack = () => {
    setSelectedEvent(null);
    setCurrentView('dashboard');
  };

  const handleTabChange = (tab: 'events' | 'create' | 'profile' | 'map') => {
    if (tab === 'events') {
      setCurrentView('dashboard');
    } else if (tab === 'create') {
      setCurrentView('create');
    } else if (tab === 'profile') {
      setCurrentView('profile');
    } else if (tab === 'map') {
      setCurrentView('map');
    }
  };

  const getActiveTab = (): 'events' | 'create' | 'profile' | 'map' => {
    if (currentView === 'create') return 'create';
    if (currentView === 'profile') return 'profile';
    if (currentView === 'map') return 'map';
    return 'events';
  };

  const myEvents = events.filter(event => {
    const isOrganizer = event.organizerId === currentUser?.id;
    const isAttending = event.attendees.some(a => a.userId === currentUser?.id);
    return isOrganizer || isAttending;
  });

  const publicEvents = events.filter(event => event.isPublic);

  const handleNotificationClick = (notification: any) => {
    setShowNotifications(false);
    if (notification.relatedEventId) {
      const event = events.find(e => e.id === notification.relatedEventId);
      if (event) {
        handleEventClick(event);
      }
    }
  };

  const handleChatEventClick = (eventId: string) => {
    setShowChat(false);
    const event = events.find(e => e.id === eventId);
    if (event) {
      handleEventClick(event);
    }
  };

  const handlePaymentRequest = (amount: number, paymentMethods: string[]) => {
    // Handle payment request - in a real app this would open payment flow
    console.log('Payment request:', amount, paymentMethods);
  };

  const handleShareEvent = (selectedFriends: any[], message: string) => {
    // Send event invitations to selected friends
    selectedFriends.forEach(friend => {
      sendMessage(friend.id, message, 'event_invite', selectedEvent?.id);
    });
  };

  const unreadNotifications = notifications.filter(n => !n.isRead).length;
  const unreadMessages = messages.filter(m => !m.isRead && m.receiverId === currentUser?.id).length;

  return (
    <PhoneFrame>
      <div ref={portalContainerRef} className="flex flex-col h-full bg-white relative w-full max-w-[400px] mx-auto">
        {/* App Header */}
        <div className="flex-shrink-0 flex items-center justify-between p-4 bg-white border-b border-gray-200 z-10">
          <div className="flex items-center gap-2">
            <img src="/brava-logo.png" alt="Brava Logo" className="w-8 h-8" />
            <span className="font-semibold text-lg">Brava</span>
          </div>
          <div className="flex items-center gap-2">
            {/* Show analytics/ticket sales only if user has promoted events */}
            {events.some(e => e.organizerId === currentUser?.id && e.isPromoted && e.ticketTiers?.length) && (
              <>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="relative"
                  onClick={() => setShowAnalyticsModal(true)}
                  title="Organizer Analytics"
                >
                  <BarChart3 className="w-5 h-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="relative"
                  onClick={() => setShowTicketSalesModal(true)}
                  title="Ticket Sales"
                >
                  <Banknote className="w-5 h-5" />
                </Button>
              </>
            )}
            <Button variant="ghost" size="sm" className="relative" onClick={() => setShowNotifications(!showNotifications)}>
              <Bell className="w-5 h-5" />
              {unreadNotifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {unreadNotifications}
                </Badge>
              )}
            </Button>
            <Button variant="ghost" size="sm" className="relative" onClick={() => setShowChat(!showChat)}>
              <MessageCircle className="w-5 h-5" />
              {unreadMessages > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-green-500">
                  {unreadMessages}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto pb-20">
          <div className="p-4">
            {currentView === 'dashboard' && (
              <Dashboard 
                onCreateEvent={handleCreateEvent} 
                onEventClick={handleEventClick}
                myEvents={myEvents}
                publicEvents={publicEvents}
              />
            )}
            {currentView === 'create' && <CreateEventForm onBack={handleBack} onEventCreated={handleEventCreated} />}
            {currentView === 'event-detail' && selectedEvent && (
              <EventDetail 
                event={selectedEvent} 
                onBack={handleBack} 
                onShare={() => setShowShareModal(true)} 
                portalContainer={portalContainerRef.current} 
              />
            )}
            {currentView === 'past-event-detail' && selectedEvent && <PastEventDetail event={selectedEvent} onBack={handleBack} />}
            {currentView === 'profile' && <ProfilePage onPastEventClick={handlePastEventClick} />}
            {currentView === 'map' && <VenuesMap />}
          </div>
        </div>
        
        {/* Bottom Navigation */}
        <div className="flex-shrink-0">
          <BottomNav activeTab={getActiveTab()} onTabChange={handleTabChange} />
        </div>
      </div>

      {/* Overlays - These will now be contained by PhoneFrame's relative parent */}
      {showNotifications && (
        <NotificationsPanel
          notifications={notifications}
          events={events}
          users={users}
          onNotificationClick={handleNotificationClick}
          onMarkAsRead={markNotificationAsRead}
          onClose={() => setShowNotifications(false)}
        />
      )}
      {showChat && (
        <ChatPanel
          messages={messages}
          events={events}
          users={users}
          currentUserId={currentUser?.id || ''}
          onSendMessage={sendMessage}
          onEventClick={handleChatEventClick}
          onPaymentRequest={handlePaymentRequest}
          onClose={() => setShowChat(false)}
        />
      )}

      {/* Dialog Modals - These are portaled so their position is managed by the library */}
      {showShareModal && selectedEvent && (
        <ShareEventModal
          event={selectedEvent}
          friends={users.filter(user => user.id !== currentUser?.id)}
          onShare={handleShareEvent}
          onClose={() => setShowShareModal(false)}
          isOpen={showShareModal}
          container={portalContainerRef.current}
        />
      )}

      {/* Organizer Modals */}
      {showAnalyticsModal && (
        <OrganizerAnalyticsModal
          isOpen={showAnalyticsModal}
          onClose={() => setShowAnalyticsModal(false)}
          ticketedEvents={events.filter(e => e.organizerId === currentUser?.id && (e.ticketTiers?.length || e.ticketPrice))}
        />
      )}

      {showTicketSalesModal && (
        <TicketSalesModal
          isOpen={showTicketSalesModal}
          onClose={() => setShowTicketSalesModal(false)}
          ticketedEvents={events.filter(e => e.organizerId === currentUser?.id && (e.ticketTiers?.length || e.ticketPrice))}
        />
      )}
      
      {/* Premium modal removed */}
    </PhoneFrame>
  );
};

export default Index;
