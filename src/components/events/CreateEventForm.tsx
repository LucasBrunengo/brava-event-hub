import React, { useState } from 'react';
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
import { User } from '@/types';

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
    const eventData = {
      name: eventName,
      description,
      date,
      time,
      location,
      isPublic,
      attendees: isPublic ? [] : invitedFriends.map(id => users.find(u => u.id === id)).filter(Boolean),
    };
    // createEvent(eventData); // This would be the call to the context
    console.log("Creating event with data:", eventData)
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

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardContent className="p-6 space-y-4">
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

        <Button type="submit" className="w-full">Create Event</Button>
      </form>
    </div>
  );
};
