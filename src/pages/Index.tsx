
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { WelcomeScreen } from '@/components/auth/WelcomeScreen';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { CreateEventForm } from '@/components/events/CreateEventForm';
import { EventDetail } from '@/components/events/EventDetail';
import { ProfilePage } from '@/components/profile/ProfilePage';
import { BottomNav } from '@/components/layout/BottomNav';
import { Event } from '@/types';

type View = 'dashboard' | 'create' | 'profile' | 'event-detail';

const Index = () => {
  const { isAuthenticated } = useApp();
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  if (!isAuthenticated) {
    return (
      <div className="phone-frame">
        <div className="phone-screen">
          <WelcomeScreen />
        </div>
      </div>
    );
  }

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setCurrentView('event-detail');
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
        <div className="pb-20">
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
            
            {currentView === 'profile' && (
              <ProfilePage />
            )}
          </div>
        </div>

        <BottomNav 
          activeTab={getActiveTab()}
          onTabChange={handleTabChange}
        />
      </div>
    </div>
  );
};

export default Index;
