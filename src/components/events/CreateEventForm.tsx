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
import { PaymentConfirmation } from './PaymentConfirmation';

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
  const [reasonSelected, setReasonSelected] = useState<null | 'entertainment' | 'wellness' | 'food' | 'custom'>(null);
  const [entertainmentSub, setEntertainmentSub] = useState<'bars' | 'karaoke' | 'clubs' | null>(null);
  const [wellnessSub, setWellnessSub] = useState<'gym' | 'yoga' | 'barre' | 'spa' | null>(null);
  const [cuisineFilter, setCuisineFilter] = useState<string | null>(null);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [reservationDate, setReservationDate] = useState<string | null>(null);
  const [reservationTime, setReservationTime] = useState<string | null>(null);
  const [numPeople, setNumPeople] = useState<number>(2);
  const [promotePublic, setPromotePublic] = useState(false);
  const [publicFeePaid, setPublicFeePaid] = useState(false);
  const [ticketPriceInput, setTicketPriceInput] = useState<string>('');
  const [ticketTotalQty, setTicketTotalQty] = useState<string>('');
  const [releases, setReleases] = useState<Array<{id: string, name: string, price: string, quantity: string, date: string, time: string}>>([]);
  const [showPaymentConfirm, setShowPaymentConfirm] = useState(false);

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
    const tiers = releases.map(r => ({
      id: r.id,
      name: r.name,
      price: Number(r.price),
      quantity: Number(r.quantity),
      sold: Math.floor(Math.random() * Number(r.quantity) * 0.3), // Mock some sales
      releaseDate: r.date,
      releaseTime: r.time
    }));

    const eventData: any = {
      category: reasonSelected || 'custom',
      subcategory: entertainmentSub || undefined,
      venueId: selectedVenue?.id,
      name: eventName,
      description,
      date: reservationDate || date,
      time: reservationTime || time,
      location,
      isPublic: reasonSelected === 'custom' ? isPublic : false,
      isPromoted: isPublic && reasonSelected === 'custom' ? promotePublic : false,
      ticketPrice: releases.length > 0 ? Number(releases[0].price) : (ticketPriceInput ? Number(ticketPriceInput) : undefined),
      totalTickets: releases.reduce((sum, r) => sum + Number(r.quantity), 0) || (ticketTotalQty ? Number(ticketTotalQty) : undefined),
      ticketTiers: tiers.length > 0 ? tiers : undefined,
      attendees: isPublic ? [] : invitedFriends.map(id => users.find(u => u.id === id)).filter(Boolean),
    };
    createEvent(eventData);
    onEventCreated();
  };

  const addRelease = () => {
    if (releases.length < 5) {
      setReleases([...releases, {
        id: `release-${Date.now()}`,
        name: `Release ${releases.length + 1}`,
        price: '',
        quantity: '',
        date: '',
        time: ''
      }]);
    }
  };

  const removeRelease = (id: string) => {
    setReleases(releases.filter(r => r.id !== id));
  };

  const updateRelease = (id: string, field: string, value: string) => {
    setReleases(releases.map(r => r.id === id ? {...r, [field]: value} : r));
  };

  const handlePayClick = () => {
    setShowPaymentConfirm(true);
    setTimeout(() => {
      setPublicFeePaid(true);
      setTimeout(() => setShowPaymentConfirm(false), 2000);
    }, 1500);
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
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center border-2 hover:border-primary hover:bg-primary/5" onClick={() => setReasonSelected('entertainment')}>
                <PartyPopper className="w-5 h-5 mb-1 text-primary" />
                <span className="font-medium">Entertainment</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center border-2 hover:border-primary hover:bg-primary/5" onClick={() => setReasonSelected('wellness')}>
                <Dumbbell className="w-5 h-5 mb-1 text-primary" />
                <span className="font-medium">Wellness</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center border-2 hover:border-primary hover:bg-primary/5" onClick={() => setReasonSelected('food')}>
                <Salad className="w-5 h-5 mb-1 text-primary" />
                <span className="font-medium">Food</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center border-2 hover:border-primary hover:bg-primary/5" onClick={() => setReasonSelected('custom')}>
                <Sparkles className="w-5 h-5 mb-1 text-primary" />
                <span className="font-medium">Custom</span>
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
                <Button type="button" variant="outline" size="sm" onClick={() => setReasonSelected(null)} className="shadow-md">
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
                  {entertainmentSub && (
                    <div className="space-y-3 pt-2">
                      <Label>Recommended {entertainmentSub}</Label>
                      <div className="grid grid-cols-1 gap-3 max-h-56 overflow-y-auto">
                        {mockVenues
                          .filter(v => v.category === 'entertainment' && v.tags?.includes(entertainmentSub))
                          .sort((a,b) => (b.promoted === true ? 1 : 0) - (a.promoted === true ? 1 : 0) || (a.distanceKm || 0) - (b.distanceKm || 0))
                          .map(v => (
                            <button key={v.id} type="button" onClick={() => { setSelectedVenue(v); setLocation(v.address); setEventName(v.name); }} className={`w-full text-left border rounded-xl p-4 hover:bg-muted transition ${selectedVenue?.id === v.id ? 'ring-2 ring-purple-500 shadow-lg' : ''}`}>
                              <div className="flex items-center gap-3">
                                {v.imageUrl && (<img src={v.imageUrl} alt={v.name} className="w-16 h-16 object-cover rounded" />)}
                                <div>
                                  <div className="font-semibold">{v.name}</div>
                                  <div className="text-xs text-muted-foreground">{v.address}</div>
                                  <div className="text-xs mt-1 flex items-center gap-2">
                                    {typeof v.distanceKm === 'number' && <span>{v.distanceKm.toFixed(1)} km</span>}
                                    {v.promoted && <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded">Promoted</span>}
                                  </div>
                                </div>
                              </div>
                            </button>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {(reasonSelected === 'food' || reasonSelected === 'wellness') && (
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label className="text-base font-semibold">Select a Venue</Label>
                    {reasonSelected === 'food' && (
                      <div className="flex flex-wrap gap-2">
                        {['Italian','Japanese','Spanish','Vegan','Steakhouse','Healthy','Seafood','Asian','Fine Dining'].map(c => (
                          <Button key={c} type="button" size="sm" variant={cuisineFilter===c?'default':'outline'} onClick={() => setCuisineFilter(cuisineFilter===c?null:c)} className="text-xs px-2 py-1 h-auto">{c}</Button>
                        ))}
                      </div>
                    )}
                    {reasonSelected === 'wellness' && (
                      <div className="flex flex-wrap gap-2">
                        {[
                          {key:'gym',label:'Gym'},
                          {key:'yoga',label:'Yoga'},
                          {key:'barre',label:'Barre'},
                          {key:'spa',label:'Spa'}
                        ].map(o => (
                          <Button key={o.key} type="button" size="sm" variant={wellnessSub===o.key as any?'default':'outline'} onClick={() => setWellnessSub(wellnessSub===o.key as any?null:o.key as any)} className="text-xs px-2 py-1 h-auto">{o.label}</Button>
                        ))}
                      </div>
                    )}
                  </div>
                  <Input placeholder={reasonSelected === 'food' ? 'Search restaurants...' : 'Search wellness centers...'} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                  <div className="grid grid-cols-1 gap-3 max-h-56 overflow-y-auto">
                    {mockVenues
                      .filter(v => (reasonSelected === 'food' ? v.category === 'restaurant' : v.category === 'wellness'))
                      .filter(v => reasonSelected==='food' ? (!cuisineFilter || (v.cuisines||[]).some(c => c.toLowerCase().includes(cuisineFilter.toLowerCase()))) : (!wellnessSub || (v.tags||[]).includes(wellnessSub)))
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
                      {reasonSelected === 'food' && (
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Number of People</Label>
                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                              <Button
                                key={n}
                                type="button"
                                size="sm"
                                variant={numPeople === n ? 'default' : 'outline'}
                                onClick={() => setNumPeople(n)}
                                className="w-10 h-10 p-0"
                              >
                                {n}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                      <ReservationScheduler
                        venue={selectedVenue}
                        selectedDate={reservationDate}
                        selectedTime={reservationTime}
                        onSelect={(d, t) => { setReservationDate(d); setReservationTime(t); setDate(d); setTime(t); }}
                      />
                      {reservationDate && reservationTime && reasonSelected === 'wellness' && (
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Available Classes</Label>
                          <div className="grid grid-cols-2 gap-2">
                            {(['Functional Training','HIIT','Yoga Flow','Barre Intro','Spin Class','Pilates','Body Pump','Stretching'] as string[]).map((cls, idx) => (
                              <Button key={idx} type="button" variant="outline" className="p-2 text-xs h-auto flex flex-col items-center gap-1">
                                <span className="font-medium">{cls}</span>
                                <span className="text-[10px] text-muted-foreground">{reservationTime}</span>
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}
        <Card>
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Event Name" value={eventName} onChange={(e) => setEventName(e.target.value)} required />
            <Textarea placeholder="Event Description (optional)" value={description} onChange={(e) => setDescription(e.target.value)} />
            {reasonSelected === 'custom' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <Input type="date" value={reservationDate || date} onChange={(e) => { setDate(e.target.value); setReservationDate(e.target.value); }} required />
                  <Input type="time" value={reservationTime || time} onChange={(e) => { setTime(e.target.value); setReservationTime(e.target.value); }} required />
                </div>
                <Input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
              </>
            )}
            {reasonSelected === 'food' && !reservationDate && (
              <div className="space-y-2">
                <Label>Number of People</Label>
                <Input 
                  type="number" 
                  min="1" 
                  max="20" 
                  value={numPeople} 
                  onChange={(e) => setNumPeople(Number(e.target.value))} 
                  placeholder="How many people?"
                />
              </div>
            )}
            {(reasonSelected === 'food' || reasonSelected === 'wellness') && !reservationDate && (
              <div className="text-sm text-muted-foreground">
                Please select a venue and time from the calendar above
              </div>
            )}
          </CardContent>
        </Card>
        
        {reasonSelected === 'custom' && (
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
                <Lock className={`w-5 h-5 ${!isPublic ? 'text-blue-500' : 'text-muted-foreground'}`} />
                <Label htmlFor="privacy-switch">Private</Label>
              </div>
              <div className="relative">
                <Switch
                  id="privacy-switch"
                  checked={isPublic}
                  onCheckedChange={setIsPublic}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Globe className={`w-5 h-5 ${isPublic ? 'text-blue-500' : 'text-muted-foreground'}`} />
                <Label htmlFor="privacy-switch">Public</Label>
              </div>
            </div>
          </CardContent>
        </Card>
        )}
        
        {/* Invite Friends Section */}
        {((!isPublic && reasonSelected === 'custom') || (reasonSelected === 'food' || reasonSelected === 'wellness' || reasonSelected === 'entertainment')) && (
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
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {isPublic && reasonSelected === 'custom' && (
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
                  <Button type="button" className="w-full" onClick={handlePayClick}>
                    Pay €{promotePublic ? 40 : 30} now
                  </Button>
                </div>
              </div>
              {publicFeePaid && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="font-semibold">Ticket Releases (up to 5)</Label>
                    {releases.length < 5 && (
                      <Button type="button" size="sm" variant="outline" onClick={addRelease}>
                        + Add Release
                      </Button>
                    )}
                  </div>
                  
                  {releases.map((release, idx) => (
                    <Card key={release.id} className="p-3">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Input 
                            placeholder="Release name" 
                            value={release.name} 
                            onChange={(e) => updateRelease(release.id, 'name', e.target.value)}
                            className="text-sm"
                          />
                          <Button type="button" size="sm" variant="ghost" onClick={() => removeRelease(release.id)} className="ml-2">
                            ✕
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label className="text-xs">Price (€)</Label>
                            <Input 
                              type="number" 
                              min="0" 
                              step="0.01" 
                              placeholder="0.00"
                              value={release.price} 
                              onChange={(e) => updateRelease(release.id, 'price', e.target.value)}
                              className="text-sm"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Quantity</Label>
                            <Input 
                              type="number" 
                              min="0" 
                              placeholder="0"
                              value={release.quantity} 
                              onChange={(e) => updateRelease(release.id, 'quantity', e.target.value)}
                              className="text-sm"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label className="text-xs">Release Date</Label>
                            <Input 
                              type="date" 
                              value={release.date} 
                              onChange={(e) => updateRelease(release.id, 'date', e.target.value)}
                              className="text-sm"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Release Time</Label>
                            <Input 
                              type="time" 
                              value={release.time} 
                              onChange={(e) => updateRelease(release.id, 'time', e.target.value)}
                              className="text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                  
                  {releases.length === 0 && (
                    <p className="text-xs text-muted-foreground text-center py-2">
                      Add ticket releases with different prices and dates
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <Button type="submit" className="w-full">Create Event</Button>
      </form>

      <PaymentConfirmation isVisible={showPaymentConfirm} />
    </div>
  );
};
