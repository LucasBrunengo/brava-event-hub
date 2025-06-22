import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Calendar, Clock, MapPin, Users, Globe, Lock, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { User, Event } from '@/types';

interface EditEventFormProps {
  event: Event;
  onBack: () => void;
  onEventUpdated: () => void;
}

export const EditEventForm: React.FC<EditEventFormProps> = ({ event, onBack, onEventUpdated }) => {
  const { currentUser, updateEvent, users } = useApp();
  const [eventName, setEventName] = useState(event.name);
  const [description, setDescription] = useState(event.description);
  const [date, setDate] = useState(event.date);
  const [time, setTime] = useState(event.time);
  const [location, setLocation] = useState(event.location);
  const [isPublic, setIsPublic] = useState(event.isPublic || false);
  const [hasExpenseSplitting, setHasExpenseSplitting] = useState(event.hasExpenseSplitting);
  const [ticketPrice, setTicketPrice] = useState(event.ticketPrice?.toString() || '');
  const [ticketUrl, setTicketUrl] = useState(event.ticketUrl || '');
  const [discountPercentage, setDiscountPercentage] = useState(event.discountPercentage?.toString() || '');
  const [isPromoted, setIsPromoted] = useState(event.isPromoted || false);

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const eventData = {
      name: eventName,
      description,
      date,
      time,
      location,
      isPublic,
      hasExpenseSplitting,
      ticketPrice: ticketPrice ? parseFloat(ticketPrice) : undefined,
      ticketUrl: ticketUrl || undefined,
      discountPercentage: discountPercentage ? parseFloat(discountPercentage) : undefined,
      isPromoted,
    };

    updateEvent(event.id, eventData);
    
    toast({
      title: "Event Updated",
      description: "Your event has been successfully updated.",
    });
    
    onEventUpdated();
  };

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Edit Event</h1>
          <p className="text-muted-foreground">Update your event details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
            <CardDescription>Update the basic information about your event</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="eventName">Event Name</Label>
              <Input 
                id="eventName"
                placeholder="Event Name" 
                value={eventName} 
                onChange={(e) => setEventName(e.target.value)} 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description"
                placeholder="Event Description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                required 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input 
                  id="date"
                  type="date" 
                  value={date} 
                  onChange={(e) => setDate(e.target.value)} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input 
                  id="time"
                  type="time" 
                  value={time} 
                  onChange={(e) => setTime(e.target.value)} 
                  required 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location"
                placeholder="Location" 
                value={location} 
                onChange={(e) => setLocation(e.target.value)} 
                required 
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Event Settings</CardTitle>
            <CardDescription>Configure privacy and additional options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div 
              className="flex items-center justify-between space-x-4 rounded-md border p-4 cursor-pointer"
              onClick={() => setIsPublic(!isPublic)}
            >
              <div className="flex items-center space-x-2">
                <Globe className={`w-5 h-5 ${isPublic ? 'text-blue-500' : 'text-muted-foreground'}`} />
                <Label htmlFor="privacy-switch">Public Event</Label>
              </div>
              <Switch
                id="privacy-switch"
                checked={isPublic}
                onCheckedChange={setIsPublic}
              />
              <div className="flex items-center space-x-2">
                <Lock className={`w-5 h-5 ${!isPublic ? 'text-blue-500' : 'text-muted-foreground'}`} />
                <Label htmlFor="privacy-switch">Private Event</Label>
              </div>
            </div>

            <div 
              className="flex items-center justify-between space-x-4 rounded-md border p-4 cursor-pointer"
              onClick={() => setHasExpenseSplitting(!hasExpenseSplitting)}
            >
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-muted-foreground" />
                <Label htmlFor="expense-switch">Enable Expense Splitting</Label>
              </div>
              <Switch
                id="expense-switch"
                checked={hasExpenseSplitting}
                onCheckedChange={setHasExpenseSplitting}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ticket Information</CardTitle>
            <CardDescription>Add ticket details if applicable</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ticketPrice">Ticket Price (€)</Label>
              <Input 
                id="ticketPrice"
                type="number" 
                step="0.01" 
                placeholder="0.00" 
                value={ticketPrice} 
                onChange={(e) => setTicketPrice(e.target.value)} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ticketUrl">Ticket URL</Label>
              <Input 
                id="ticketUrl"
                type="url" 
                placeholder="https://..." 
                value={ticketUrl} 
                onChange={(e) => setTicketUrl(e.target.value)} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="discountPercentage">Discount Percentage (%)</Label>
              <Input 
                id="discountPercentage"
                type="number" 
                min="0" 
                max="100" 
                placeholder="0" 
                value={discountPercentage} 
                onChange={(e) => setDiscountPercentage(e.target.value)} 
              />
            </div>
            
            <div 
              className="flex items-center justify-between space-x-4 rounded-md border p-4 cursor-pointer"
              onClick={() => setIsPromoted(!isPromoted)}
            >
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-muted-foreground" />
                <Label htmlFor="promoted-switch">Promote Event</Label>
              </div>
              <Switch
                id="promoted-switch"
                checked={isPromoted}
                onCheckedChange={setIsPromoted}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button type="button" variant="outline" onClick={onBack} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" className="flex-1 brava-gradient">
            Update Event
          </Button>
        </div>
      </form>
    </div>
  );
}; 