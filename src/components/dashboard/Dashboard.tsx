import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Users, Calendar } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { EventsList } from '@/components/events/EventsList';
import { PublicEventsList } from '@/components/events/PublicEventsList';
import { Event } from '@/types';
import { mockEvents } from '@/data/mockData';

interface DashboardProps {
  onCreateEvent: () => void;
  onEventClick: (event: Event) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onCreateEvent, onEventClick }) => {
  const { events, currentUser } = useApp();

  // Filter to show only upcoming events in "My Events" tab
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const upcomingEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate >= today;
  });
  
  const organizedCount = events.filter(event => event.organizerId === currentUser?.id).length;
  const attendingCount = events.filter(event => 
    event.attendees.some(a => a.userId === currentUser?.id && a.status === 'going')
  ).length;
  const publicEvents = mockEvents.filter(event => event.isPublic);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with Background */}
      <div className="relative">
        <div className="absolute inset-0 h-40 brava-gradient rounded-lg opacity-90" />
        <div className="relative z-10 p-4 text-white text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
              <img src="/brava-logo.png" alt="Brava Logo" className="w-8 h-8" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold leading-tight">Brava</h1>
              <p className="text-white/90 text-sm">Event Hub</p>
            </div>
          </div>
          <p className="text-white/90 mb-4 text-sm">Organize events seamlessly with your friends</p>
          
          <Button 
            onClick={onCreateEvent}
            className="bg-white text-purple-600 hover:bg-white/90 font-semibold text-sm px-4 py-2"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Event
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="w-6 h-6 mx-auto mb-2 text-primary" />
            <p className="text-xl font-bold">{organizedCount}</p>
            <p className="text-sm text-muted-foreground">Events Organized</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
            <p className="text-xl font-bold">{attendingCount}</p>
            <p className="text-sm text-muted-foreground">Events Attending</p>
          </CardContent>
        </Card>
      </div>

      {/* Events Tabs */}
      <Tabs defaultValue="private" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="private">My Events</TabsTrigger>
          <TabsTrigger value="public">Public Events</TabsTrigger>
        </TabsList>

        <TabsContent value="private" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingEvents.length > 0 ? (
                <EventsList 
                  events={upcomingEvents} 
                  onEventClick={onEventClick}
                  emptyMessage="No upcoming events planned"
                />
              ) : (
                <div className="text-center py-6">
                  <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    📅
                  </div>
                  <h3 className="font-semibold text-lg mb-2">No Upcoming Events</h3>
                  <p className="text-muted-foreground mb-4">
                    Start organizing your next event with friends!
                  </p>
                  <Button onClick={onCreateEvent} className="brava-gradient">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Event
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="public" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Discover Public Events</CardTitle>
            </CardHeader>
            <CardContent>
              <PublicEventsList 
                events={publicEvents} 
                onEventClick={onEventClick}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
