import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogPortal, DialogOverlay } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { User, Users, Send, X, Search } from 'lucide-react';
import { User as UserType, Event } from '@/types';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/hooks/use-toast';

interface InviteFriendsModalProps {
  event: Event;
  onClose: () => void;
  isOpen: boolean;
  container?: HTMLElement | null;
}

export const InviteFriendsModal: React.FC<InviteFriendsModalProps> = ({
  event,
  onClose,
  isOpen,
  container,
}) => {
  const { currentUser, users, inviteFriendsToEvent } = useApp();
  const [selectedFriends, setSelectedFriends] = useState<UserType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState(`Hey! I'd love for you to join my event: ${event.name}`);
  const { toast } = useToast();

  // Filter out current user and friends already attending the event
  const availableFriends = users.filter(friend => 
    friend.id !== currentUser?.id && 
    !event.attendees.some(attendee => attendee.userId === friend.id)
  );

  const filteredFriends = availableFriends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    friend.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFriendSelection = (friend: UserType) => {
    setSelectedFriends(prev => {
      const isSelected = prev.some(f => f.id === friend.id);
      if (isSelected) {
        return prev.filter(f => f.id !== friend.id);
      } else {
        return [...prev, friend];
      }
    });
  };

  const handleInvite = () => {
    if (selectedFriends.length > 0) {
      const friendIds = selectedFriends.map(friend => friend.id);
      inviteFriendsToEvent(event.id, friendIds, message);
      
      toast({
        title: "Invitations Sent!",
        description: `Successfully invited ${selectedFriends.length} friend${selectedFriends.length > 1 ? 's' : ''} to your event.`,
      });
      
      setSelectedFriends([]);
      setMessage(`Hey! I'd love for you to join my event: ${event.name}`);
      onClose();
    }
  };

  const handleSelectAll = () => {
    setSelectedFriends(filteredFriends);
  };

  const handleClearAll = () => {
    setSelectedFriends([]);
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal container={container}>
        <DialogOverlay className="bg-black/60" />
        <DialogContent className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-h-[90%] flex flex-col rounded-2xl border bg-white p-0 shadow-2xl">
          <DialogHeader className="flex flex-row items-center justify-between p-4 border-b">
            <DialogTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Invite Friends to Event
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogHeader>

          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {/* Event Preview */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{event.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>📅 {new Date(event.date).toLocaleDateString()}</span>
                    <span>📍 {event.location}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Search Friends */}
              <div className="space-y-2">
                <Label htmlFor="search">Search Friends</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Search friends by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Message Input */}
              <div className="space-y-2">
                <Label htmlFor="message">Personal Message (Optional)</Label>
                <Textarea
                  id="message"
                  placeholder="Add a personal message to your invitation..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                />
              </div>

              {/* Friends List */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Select Friends to Invite</Label>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleSelectAll}>
                      Select All
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleClearAll}>
                      Clear All
                    </Button>
                  </div>
                </div>
                
                {filteredFriends.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
                    <p className="text-muted-foreground">
                      {searchQuery ? 'No friends found matching your search.' : 'No friends available to invite.'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {filteredFriends.map((friend) => (
                      <div key={friend.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted">
                        <Checkbox
                          id={friend.id}
                          checked={selectedFriends.some(f => f.id === friend.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedFriends([...selectedFriends, friend]);
                            } else {
                              setSelectedFriends(selectedFriends.filter(f => f.id !== friend.id));
                            }
                          }}
                        />
                        <Label htmlFor={friend.id} className="flex items-center gap-3 flex-1 cursor-pointer">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={friend.avatar} />
                            <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <span className="font-medium">{friend.name}</span>
                            <p className="text-xs text-muted-foreground">{friend.email}</p>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="p-4 border-t">
            <Button 
              onClick={handleInvite}
              disabled={selectedFriends.length === 0}
              className="w-full brava-gradient"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Invitations ({selectedFriends.length})
            </Button>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}; 