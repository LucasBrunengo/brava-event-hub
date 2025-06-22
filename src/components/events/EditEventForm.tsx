import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Globe, Lock, Users } from 'lucide-react';
import { Event } from '@/types';

interface EditEventFormProps {
  event: Event;
  onBack: () => void;
  onEventUpdated: () => void;
}

export const EditEventForm: React.FC<EditEventFormProps> = ({ event, onBack, onEventUpdated }) => {
  const { updateEvent } = useApp();
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
          </CardHeader>
          <CardContent className="space-y-4">
             <Input placeholder="Event Name" value={eventName} onChange={(e) => setEventName(e.target.value)} required />
            <Textarea placeholder="Event Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            <div className="grid grid-cols-2 gap-4">
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
              <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
            </div>
            <Input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Event Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-md">
              <Label htmlFor="privacy-switch" className="flex items-center gap-2 cursor-pointer">
                <Globe className="w-5 h-5" />
                Public Event
              </Label>
              <div className="relative">
                <Switch
                  id="privacy-switch"
                  checked={isPublic}
                  onCheckedChange={(checked: boolean) => {
                    console.log('Privacy switch changed:', checked);
                    setIsPublic(checked);
                  }}
                />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-md">
              <Label htmlFor="expense-switch" className="flex items-center gap-2 cursor-pointer">
                <Users className="w-5 h-5" />
                Enable Expense Splitting
              </Label>
              <div className="relative">
                <Switch
                  id="expense-switch"
                  checked={hasExpenseSplitting}
                  onCheckedChange={(checked: boolean) => {
                    console.log('Expense switch changed:', checked);
                    setHasExpenseSplitting(checked);
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ticket Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input type="number" placeholder="Ticket Price (€)" value={ticketPrice} onChange={(e) => setTicketPrice(e.target.value)} />
            <Input type="url" placeholder="Ticket URL" value={ticketUrl} onChange={(e) => setTicketUrl(e.target.value)} />
            <Input type="number" placeholder="Discount Percentage (%)" value={discountPercentage} onChange={(e) => setDiscountPercentage(e.target.value)} />
            <div className="flex items-center justify-between p-4 border rounded-md">
              <Label htmlFor="promoted-switch" className="flex items-center gap-2 cursor-pointer">
                <Users className="w-5 h-5" />
                Promote Event
              </Label>
              <div className="relative">
                <Switch
                  id="promoted-switch"
                  checked={isPromoted}
                  onCheckedChange={(checked: boolean) => {
                    console.log('Promoted switch changed:', checked);
                    setIsPromoted(checked);
                  }}
                />
              </div>
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