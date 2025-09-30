import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Users, Calendar, Filter, Search } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { EventsList } from '@/components/events/EventsList';
import { PublicEventsList } from '@/components/events/PublicEventsList';
import { Event } from '@/types';

interface DashboardProps {
  onCreateEvent: () => void;
  onEventClick: (event: Event) => void;
  myEvents: Event[];
  publicEvents: Event[];
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  onCreateEvent, 
  onEventClick,
  myEvents,
  publicEvents
}) => {
  const { currentUser, events } = useApp();
  const [filter, setFilter] = useState<'my-events' | 'public'>('public');
  const [publicCategory, setPublicCategory] = useState<'all' | 'entertainment' | 'dinner' | 'wellness' | 'other'>('all');
  const [publicSearch, setPublicSearch] = useState('');
  
  const organizedCount = myEvents.filter(event => event.organizerId === currentUser?.id).length;
  const attendingCount = myEvents.filter(event => 
    event.attendees.some(a => a.userId === currentUser?.id && a.status === 'going')
  ).length;

  const myTicketedEvents = events.filter(e => e.organizerId === currentUser?.id && (e.ticketTiers?.length || e.ticketPrice));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
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

      {/* Filter Buttons */}
      <div className="flex items-center gap-2">
        <Filter className="w-5 h-5 text-muted-foreground" />
        <h3 className="font-semibold text-lg">Filter Events</h3>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant={filter === 'my-events' ? 'default' : 'outline'}
          onClick={() => setFilter('my-events')}
          className={filter === 'my-events' ? 'brava-gradient' : ''}
        >
          My Events
        </Button>
        <Button
          variant={filter === 'public' ? 'default' : 'outline'}
          onClick={() => setFilter('public')}
          className={filter === 'public' ? 'brava-gradient' : ''}
        >
          Public Events
        </Button>
      </div>

      {/* Events List */}
      {filter === 'my-events' ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">My Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <EventsList 
              events={myEvents.slice(0, 5)} 
              onEventClick={onEventClick}
              emptyMessage="You have no upcoming events. Why not create one?"
            />
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Discover Public Events</CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Filter className="w-4 h-4" /> Filters
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mb-3">
              <div className="grid grid-cols-4 gap-2">
                {([
                  {key:'all',label:'All'},
                  {key:'entertainment',label:'Entertainment'},
                  {key:'dinner',label:'Dinner'},
                  {key:'wellness',label:'Wellness'},
                ] as const).map(opt => (
                  <Button key={opt.key} variant={publicCategory===opt.key?'default':'outline'} onClick={() => setPublicCategory(opt.key as any)} className={publicCategory===opt.key?'brava-gradient':''}>
                    {opt.label}
                  </Button>
                ))}
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  className="w-full pl-9 pr-3 py-2 border rounded-md text-sm"
                  placeholder="Search public events..."
                  value={publicSearch}
                  onChange={(e)=>setPublicSearch(e.target.value)}
                />
              </div>
            </div>
            {(() => {
              const filtered = publicEvents
                .filter(ev => publicCategory==='all' ? true : (ev.category===publicCategory))
                .filter(ev => ev.name.toLowerCase().includes(publicSearch.toLowerCase()) || (ev.description||'').toLowerCase().includes(publicSearch.toLowerCase()));
            return <PublicEventsList 
              events={filtered} 
              onEventClick={onEventClick}
            />
            })()}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
