
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useApp } from '@/context/AppContext';
import { EventsList } from '../events/EventsList';
import { Event } from '@/types';
import { Plus, Calendar, Users, DollarSign } from 'lucide-react';

interface DashboardProps {
  onCreateEvent: () => void;
  onEventClick: (event: Event) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onCreateEvent, onEventClick }) => {
  const { currentUser, events, expenses } = useApp();
  const [activeTab, setActiveTab] = useState('upcoming');

  if (!currentUser) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate >= today;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const pastEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate < today;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const organizedEvents = events.filter(event => event.organizerId === currentUser.id);
  const totalFriends = new Set(events.flatMap(event => 
    event.attendees.map(attendee => attendee.userId)
  )).size - 1; // Subtract 1 for current user

  const totalSaved = expenses.reduce((total, expense) => {
    const userPayment = expense.payments.find(p => p.userId === currentUser.id);
    return total + (userPayment?.amount || 0);
  }, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={currentUser.avatar} />
            <AvatarFallback className="text-lg">
              {currentUser.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {currentUser.name.split(' ')[0]}!</h1>
            <p className="text-muted-foreground">Ready to organize your next event?</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="w-6 h-6 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">{organizedEvents.length}</p>
            <p className="text-sm text-muted-foreground">Events Organized</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">{totalFriends}</p>
            <p className="text-sm text-muted-foreground">Friends Connected</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <DollarSign className="w-6 h-6 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">${totalSaved.toFixed(0)}</p>
            <p className="text-sm text-muted-foreground">Total Coordinated</p>
          </CardContent>
        </Card>
      </div>

      {/* Create Event CTA */}
      <Card className="brava-gradient text-white overflow-hidden relative">
        <CardContent className="p-6">
          <div className="relative z-10">
            <h3 className="text-xl font-semibold mb-2">Got plans brewing?</h3>
            <p className="text-white/90 mb-4">
              Skip the group chat chaos and organize your next event properly.
            </p>
            <Button 
              onClick={onCreateEvent}
              className="bg-white text-primary hover:bg-white/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Event
            </Button>
          </div>
          <div className="absolute -right-8 -bottom-8 text-white/10 text-8xl">
            🎉
          </div>
        </CardContent>
      </Card>

      {/* Events Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">
            Upcoming ({upcomingEvents.length})
          </TabsTrigger>
          <TabsTrigger value="past">
            Past ({pastEvents.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          <EventsList
            events={upcomingEvents}
            onEventClick={onEventClick}
            emptyMessage="No upcoming events. Create one to get started!"
          />
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          <EventsList
            events={pastEvents}
            onEventClick={onEventClick}
            emptyMessage="No past events yet."
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
