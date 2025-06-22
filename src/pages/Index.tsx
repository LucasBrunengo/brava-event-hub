import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { WelcomeScreen } from '@/components/auth/WelcomeScreen';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { CreateEventForm } from '@/components/events/CreateEventForm';
import { EventDetail } from '@/components/events/EventDetail';
import { ProfilePage } from '@/components/profile/ProfilePage';
import { PastEventDetail } from '@/components/events/PastEventDetail';
import { BottomNav } from '@/components/layout/BottomNav';
import { Event } from '@/types';

type View = 'dashboard' | 'create' | 'profile' | 'event-detail' | 'past-event-detail';

const Index = () => {
  const { isAuthenticated } = useApp();
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  console.log('Index component rendered - isAuthenticated:', isAuthenticated);

  if (!isAuthenticated) {
    console.log('Rendering WelcomeScreen');
    return (
      <div className="phone-frame">
        <div className="phone-screen">
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

  return (
    <div className="phone-frame">
      <div className="phone-screen">
        <div className="flex flex-col h-full relative z-10">
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
        </div>
      </div>
    </div>
  );
};

export default Index;
