import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Calendar, Clock, MapPin, Users, Globe, Lock, Search, PartyPopper, Salad, Dumbbell, Sparkles } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { User, Venue } from '@/types';
import { mockVenues } from '@/data/mockData';
import ReservationScheduler from './ReservationScheduler';

interface CreateEventFormProps {
  onBack: () => void;
  onEventCreated: () => void;
}

export const CreateEventForm: React.FC<CreateEventFormProps> = ({ onBack, onEventCreated }) => {
  const { currentUser, createEvent, users } = useApp();
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [invitedFriends, setInvitedFriends] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [reasonSelected, setReasonSelected] = useState<null | 'entertainment' | 'wellness' | 'dinner' | 'custom'>(null);
  const [entertainmentSub, setEntertainmentSub] = useState<'bars' | 'karaoke' | 'clubs' | null>(null);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [reservationDate, setReservationDate] = useState<string | null>(null);
  const [reservationTime, setReservationTime] = useState<string | null>(null);
  const [promotePublic, setPromotePublic] = useState(false);
  const [publicFeePaid, setPublicFeePaid] = useState(false);
  const [ticketPriceInput, setTicketPriceInput] = useState<string>('');
  const [ticketTotalQty, setTicketTotalQty] = useState<string>('');
  const [tierEarlyQty, setTierEarlyQty] = useState<string>('');
  const [tierFirstQty, setTierFirstQty] = useState<string>('');

  const { toast } = useToast();

  const friends = users.filter(user => user.id !== currentUser?.id);
  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleFriend = (friendId: string) => {
    setInvitedFriends(prev =>
      prev.includes(friendId)
        ? prev.filter(id => id !== friendId)
        : [...prev, friendId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tiers = [
      tierEarlyQty ? { id: 'early', name: 'Early Bird', price: ticketPriceInput ? Number(ticketPriceInput) * 0.8 : 0, quantity: Number(tierEarlyQty), sold: 0 } : null,
      tierFirstQty ? { id: 'first', name: 'First Release', price: ticketPriceInput ? Number(ticketPriceInput) : 0, quantity: Number(tierFirstQty), sold: 0 } : null,
    ].filter(Boolean) as any[];

    const eventData: any = {
      category: reasonSelected || 'custom',
      subcategory: entertainmentSub || undefined,
      venueId: selectedVenue?.id,
      name: eventName,
      description,
      date: reservationDate || date,
      time: reservationTime || time,
      location,
      isPublic,
      isPromoted: isPublic ? promotePublic : false,
      ticketPrice: ticketPriceInput ? Number(ticketPriceInput) : undefined,
      totalTickets: ticketTotalQty ? Number(ticketTotalQty) : undefined,
      ticketTiers: tiers,
      attendees: isPublic ? [] : invitedFriends.map(id => users.find(u => u.id === id)).filter(Boolean),
    };
    createEvent(eventData);
    onEventCreated();
  };

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Create New Event</h1>
        </div>
      </div>

      {/* Step 1: Reason selection */}
      {!reasonSelected && (
        <Card>
          <CardHeader>
            <CardTitle>Whats the reason for the event?</CardTitle>
            <CardDescription>Choose a category to tailor the flow.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center" onClick={() => setReasonSelected('entertainment')}>
                <PartyPopper className="w-5 h-5 mb-1" />
                Entertainment
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center" onClick={() => setReasonSelected('wellness')}>
                <Dumbbell className="w-5 h-5 mb-1" />
                Wellness
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center" onClick={() => setReasonSelected('dinner')}>
                <Salad className="w-5 h-5 mb-1" />
                Dinner
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center" onClick={() => setReasonSelected('custom')}>
                <Sparkles className="w-5 h-5 mb-1" />
                Custom
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {reasonSelected && (
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
              <CardDescription>Selected category: {reasonSelected.charAt(0).toUpperCase() + reasonSelected.slice(1)}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-2 mb-4">
                <Button type="button" variant="ghost" size="sm" onClick={() => setReasonSelected(null)}>
                  Change category
                </Button>
              </div>
              {reasonSelected === 'entertainment' && (
                <div className="space-y-2">
                  <Label>Choose subcategory</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: 'bars', label: 'Bars' },
                      { key: 'karaoke', label: 'Karaoke' },
                      { key: 'clubs', label: 'Clubs' },
                    ].map(opt => (
                      <Button key={opt.key} type="button" variant={entertainmentSub === (opt.key as any) ? 'default' : 'outline'} onClick={() => setEntertainmentSub(opt.key as any)}>
                        {opt.label}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              {(reasonSelected === 'dinner' || reasonSelected === 'wellness') && (
                <div className="space-y-3">
                  <Label>Select a venue</Label>
                  <Input placeholder={reasonSelected === 'dinner' ? 'Search restaurants...' : 'Search wellness centers...'} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                  <div className="grid grid-cols-1 gap-3 max-h-56 overflow-y-auto">
                    {mockVenues
                      .filter(v => (reasonSelected === 'dinner' ? v.category === 'restaurant' : v.category === 'wellness'))
                      .filter(v => v.name.toLowerCase().includes(searchQuery.toLowerCase()) || (v.cuisines || []).some(c => c.toLowerCase().includes(searchQuery.toLowerCase())))
                      .sort((a,b) => (b.promoted === true ? 1 : 0) - (a.promoted === true ? 1 : 0) || (a.distanceKm || 0) - (b.distanceKm || 0))
                      .map(v => (
                        <button key={v.id} type="button" onClick={() => { setSelectedVenue(v); setLocation(v.address); setEventName(v.name); }} className={`w-full text-left border rounded-xl p-4 hover:bg-muted transition ${selectedVenue?.id === v.id ? 'ring-2 ring-purple-500 shadow-lg' : ''}`}>
                          <div className="flex items-center gap-3">
                            {v.imageUrl && (<img src={v.imageUrl} alt={v.name} className="w-16 h-16 object-cover rounded" />)}
                            <div>
                              <div className="font-semibold">{v.name}</div>
                              <div className="text-xs text-muted-foreground">{v.address}</div>
                              {v.cuisines && <div className="text-xs mt-1">{v.cuisines.join(', ')}</div>}
                              <div className="text-xs mt-1 flex items-center gap-2">
                                {typeof v.distanceKm === 'number' && <span>{v.distanceKm.toFixed(1)} km</span>}
                                {v.promoted && <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded">Promoted</span>}
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                  </div>
                  {selectedVenue?.hasReservations && (
                    <div className="space-y-3">
                      <div className="text-xs text-muted-foreground">This venue supports free reservations in-app.</div>
                      <ReservationScheduler
                        venue={selectedVenue}
                        selectedDate={reservationDate}
                        selectedTime={reservationTime}
                        onSelect={(d, t) => { setReservationDate(d); setReservationTime(t); setDate(d); setTime(t); }}
                      />
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}
        <Card>
          <CardContent className="p-6 space-y-4">
            <Input placeholder="Event Name" value={eventName} onChange={(e) => setEventName(e.target.value)} required />
            <Textarea placeholder="Event Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            <div className="grid grid-cols-2 gap-4">
              <Input type="date" value={reservationDate || date} onChange={(e) => { setDate(e.target.value); setReservationDate(e.target.value); }} required />
              <Input type="time" value={reservationTime || time} onChange={(e) => { setTime(e.target.value); setReservationTime(e.target.value); }} required />
            </div>
            <Input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Event Privacy</CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="flex items-center justify-between space-x-4 rounded-md border p-4 cursor-pointer"
              onClick={() => setIsPublic(!isPublic)}
            >
              <div className="flex items-center space-x-2">
                <Globe className={`w-5 h-5 ${isPublic ? 'text-blue-500' : 'text-muted-foreground'}`} />
                <Label htmlFor="privacy-switch">Public</Label>
              </div>
              <div className="relative">
                <Switch
                  id="privacy-switch"
                  checked={isPublic}
                  onCheckedChange={setIsPublic}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Lock className={`w-5 h-5 ${!isPublic ? 'text-blue-500' : 'text-muted-foreground'}`} />
                <Label htmlFor="privacy-switch">Private</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {!isPublic && (
          <Card>
            <CardHeader>
              <CardTitle>Invite Friends</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search friends..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {filteredFriends.map(friend => (
                  <div 
                    key={friend.id} 
                    className="flex items-center justify-between p-2 rounded-md hover:bg-muted cursor-pointer"
                    onClick={() => handleToggleFriend(friend.id)}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={friend.avatar} />
                        <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{friend.name}</span>
                    </div>
                    <Checkbox
                      checked={invitedFriends.includes(friend.id)}
                      onCheckedChange={() => handleToggleFriend(friend.id)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {isPublic && (
          <Card>
            <CardHeader>
              <CardTitle>Public Event Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 rounded-md border bg-muted/30">
                <div className="font-medium">One-time publishing fee: €30</div>
                <div className="text-sm text-muted-foreground">Optional promotion for extra visibility: +€10</div>
                <div className="flex items-center gap-2 mt-2">
                  <Switch id="promote" checked={promotePublic} onCheckedChange={setPromotePublic} />
                  <Label htmlFor="promote">Add promotion</Label>
                </div>
                <div className="mt-3">
                  <Button type="button" className="w-full" onClick={() => setPublicFeePaid(true)}>
                    Pay €{promotePublic ? 40 : 30} now
                  </Button>
                </div>
              </div>
              {publicFeePaid && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Base Ticket Price (€)</Label>
                      <Input type="number" min="0" step="0.01" value={ticketPriceInput} onChange={(e) => setTicketPriceInput(e.target.value)} />
                    </div>
                    <div>
                      <Label>Total Tickets</Label>
                      <Input type="number" min="0" value={ticketTotalQty} onChange={(e) => setTicketTotalQty(e.target.value)} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Early Bird Qty</Label>
                      <Input type="number" min="0" value={tierEarlyQty} onChange={(e) => setTierEarlyQty(e.target.value)} />
                    </div>
                    <div>
                      <Label>First Release Qty</Label>
                      <Input type="number" min="0" value={tierFirstQty} onChange={(e) => setTierFirstQty(e.target.value)} />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <Button type="submit" className="w-full">Create Event</Button>
      </form>
    </div>
  );
};
