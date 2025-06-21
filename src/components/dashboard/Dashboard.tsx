
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Users, Calendar } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { EventsList } from '@/components/events/EventsList';
import { PublicEventsList } from '@/components/events/PublicEventsList';
import { Event } from '@/types';
import { mockPublicEvents } from '@/data/mockData';

interface DashboardProps {
  onCreateEvent: () => void;
  onEventClick: (event: Event) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onCreateEvent, onEventClick }) => {
  const { events, currentUser } = useApp();

  const upcomingEvents = events.filter(event => new Date(event.date) >= new Date());
  const pastEvents = events.filter(event => new Date(event.date) < new Date());
  const organizedCount = events.filter(event => event.organizerId === currentUser?.id).length;
  const attendingCount = events.filter(event => 
    event.attendees.some(a => a.userId === currentUser?.id && a.status === 'going')
  ).length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with Background */}
      <div className="relative">
        <div 
          className="absolute inset-0 h-48 bg-gradient-to-br from-purple-500 via-blue-500 to-purple-600 rounded-lg opacity-90"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=300&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'overlay'
          }}
        />
        <div className="relative z-10 p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome to Brava</h1>
          <p className="text-white/90 mb-6">Organize events without the WhatsApp chaos</p>
          
          <Button 
            onClick={onCreateEvent}
            className="bg-white text-purple-600 hover:bg-white/90 font-semibold"
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
          {upcomingEvents.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <EventsList 
                  events={upcomingEvents} 
                  onEventClick={onEventClick}
                  emptyMessage="No upcoming events planned"
                />
              </CardContent>
            </Card>
          )}

          {pastEvents.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Past Events</CardTitle>
              </CardHeader>
              <CardContent>
                <EventsList 
                  events={pastEvents} 
                  onEventClick={onEventClick}
                  emptyMessage="No past events"
                />
              </CardContent>
            </Card>
          )}

          {events.length === 0 && (
            <Card>
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  📅
                </div>
                <h3 className="font-semibold text-lg mb-2">No Events Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start organizing your first event and say goodbye to WhatsApp chaos!
                </p>
                <Button onClick={onCreateEvent} className="brava-gradient">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Event
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="public" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Discover Public Events</CardTitle>
            </CardHeader>
            <CardContent>
              <PublicEventsList 
                events={mockPublicEvents} 
                onEventClick={onEventClick}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
