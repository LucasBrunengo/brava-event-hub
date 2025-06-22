import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { WelcomeScreen } from '@/components/auth/WelcomeScreen';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { CreateEventForm } from '@/components/events/CreateEventForm';
import { EventDetail } from '@/components/events/EventDetail';
import { ProfilePage } from '@/components/profile/ProfilePage';
import { PastEventDetail } from '@/components/events/PastEventDetail';
import { BottomNav } from '@/components/layout/BottomNav';
import { NotificationsPanel } from '@/components/layout/NotificationsPanel';
import { ChatPanel } from '@/components/layout/ChatPanel';
import { Button } from '@/components/ui/button';
import { Bell, MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Event } from '@/types';

type View = 'dashboard' | 'create' | 'profile' | 'event-detail' | 'past-event-detail';

const Index = () => {
  const { isAuthenticated, notifications, messages, markNotificationAsRead, sendMessage, markMessageAsRead, events, users } = useApp();
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showChat, setShowChat] = useState(false);

  console.log('Index component rendered - isAuthenticated:', isAuthenticated);
  console.log('WelcomeScreen component:', WelcomeScreen);

  if (!isAuthenticated) {
    console.log('Rendering WelcomeScreen');
    return (
      <div className="min-h-screen w-full bg-gray-50">
        <div className="max-w-md mx-auto bg-white min-h-screen">
          <WelcomeScreen />
        </div>
      </div>
    );
  }

  console.log('Rendering authenticated content, currentView:', currentView);

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

  const handleTabChange = (tab: 'events' | 'create' | 'profile') => {
    if (tab === 'events') {
      setCurrentView('dashboard');
    } else if (tab === 'create') {
      setCurrentView('create');
    } else if (tab === 'profile') {
      setCurrentView('profile');
    }
  };

  const getActiveTab = (): 'events' | 'create' | 'profile' => {
    if (currentView === 'create') return 'create';
    if (currentView === 'profile') return 'profile';
    return 'events';
  };

  const handleNotificationClick = (notification: any) => {
    if (notification.relatedEventId) {
      const event = events.find(e => e.id === notification.relatedEventId);
      if (event) {
        handleEventClick(event);
      }
    }
  };

  const handleChatEventClick = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      handleEventClick(event);
    }
  };

  const handlePaymentRequest = (amount: number, paymentMethods: string[]) => {
    // Handle payment request - in a real app this would open payment flow
    console.log('Payment request:', amount, paymentMethods);
  };

  const unreadNotifications = notifications.filter(n => !n.isRead).length;
  const unreadMessages = messages.filter(m => !m.isRead && m.senderId !== '1').length;

  return (
    <div className="w-full bg-gray-50 h-full">
      <div className="w-full bg-white h-full">
        <div className="flex flex-col h-full relative">
          {/* Header with notifications and chat */}
          <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="font-semibold text-lg">Brava</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="relative" onClick={() => setShowNotifications(true)}>
                <Bell className="w-5 h-5" />
                {unreadNotifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {unreadNotifications}
                  </Badge>
                )}
              </Button>
              <Button variant="ghost" size="sm" className="relative" onClick={() => setShowChat(true)}>
                <MessageCircle className="w-5 h-5" />
                {unreadMessages > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-green-500">
                    {unreadMessages}
                  </Badge>
                )}
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pb-20">
            <div className="p-4">
              {currentView === 'dashboard' && (
                <Dashboard 
                  onCreateEvent={handleCreateEvent}
                  onEventClick={handleEventClick}
                />
              )}
              
              {currentView === 'create' && (
                <CreateEventForm 
                  onBack={handleBack}
                  onEventCreated={handleEventCreated}
                />
              )}
              
              {currentView === 'event-detail' && selectedEvent && (
                <EventDetail 
                  event={selectedEvent}
                  onBack={handleBack}
                />
              )}
              
              {currentView === 'past-event-detail' && selectedEvent && (
                <PastEventDetail 
                  event={selectedEvent}
                  onBack={handleBack}
                />
              )}
              
              {currentView === 'profile' && (
                <ProfilePage onPastEventClick={handlePastEventClick} />
              )}
            </div>
          </div>

          <BottomNav 
            activeTab={getActiveTab()}
            onTabChange={handleTabChange}
          />

          {/* Notifications Panel */}
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

          {/* Chat Panel */}
          {showChat && (
            <ChatPanel
              messages={messages}
              events={events}
              users={users}
              currentUserId="1"
              onSendMessage={sendMessage}
              onEventClick={handleChatEventClick}
              onPaymentRequest={handlePaymentRequest}
              onClose={() => setShowChat(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
