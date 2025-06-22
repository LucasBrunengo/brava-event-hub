import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogPortal, DialogOverlay } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Share2, Users, Send, X, Search } from 'lucide-react';
import { User, Event } from '@/types';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

interface ShareEventModalProps {
  event: Event;
  friends: User[];
  onShare: (selectedFriends: User[], message: string) => void;
  onClose: () => void;
  isOpen: boolean;
  container?: HTMLElement | null;
}

export const ShareEventModal: React.FC<ShareEventModalProps> = ({
  event,
  friends,
  onShare,
  onClose,
  isOpen,
  container
}) => {
  const [selectedFriends, setSelectedFriends] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [customMessage, setCustomMessage] = useState(`Hey! I think you'd love this event: ${event.name}`);
  const [message, setMessage] = useState('');

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    friend.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFriendSelection = (friend: User) => {
    setSelectedFriends(prev => {
      const isSelected = prev.some(f => f.id === friend.id);
      if (isSelected) {
        return prev.filter(f => f.id !== friend.id);
      } else {
        return [...prev, friend];
      }
    });
  };

  const handleShare = () => {
    if (selectedFriends.length > 0) {
      onShare(selectedFriends, message);
      setSelectedFriends([]);
      setCustomMessage(`Hey! I think you'd love this event: ${event.name}`);
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
        <DialogOverlay />
        <DialogContent className="absolute bottom-0 left-0 right-0 h-[90%] w-full flex flex-col rounded-t-2xl border-t bg-white p-0 animate-slide-in-from-bottom">
          <DialogHeader className="flex flex-row items-center justify-between p-4 border-b">
            <DialogTitle className="flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              Share Event
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
                <Label>Select Friends to Invite</Label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {friends.map((friend) => (
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
                        <span className="font-medium">{friend.name}</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t">
            <Button 
              onClick={handleShare}
              disabled={selectedFriends.length === 0}
              className="w-full brava-gradient"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Send Invitations ({selectedFriends.length})
            </Button>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}; 