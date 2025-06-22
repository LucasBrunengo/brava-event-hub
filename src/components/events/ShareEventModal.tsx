import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Share2, Users, Send, X, Search } from 'lucide-react';
import { User, Event } from '@/types';

interface ShareEventModalProps {
  event: Event;
  friends: User[];
  onShare: (selectedFriends: User[], message: string) => void;
  onClose: () => void;
  isOpen: boolean;
}

export const ShareEventModal: React.FC<ShareEventModalProps> = ({
  event,
  friends,
  onShare,
  onClose,
  isOpen
}) => {
  const [selectedFriends, setSelectedFriends] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [customMessage, setCustomMessage] = useState(`Hey! I think you'd love this event: ${event.name}`);

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
      onShare(selectedFriends, customMessage);
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="absolute bottom-0 w-full h-[80vh] flex flex-col mx-0 p-0">
        <DialogHeader className="flex flex-row items-center justify-between p-4 border-b">
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Share Event
          </DialogTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </DialogHeader>

        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Event Preview */}
          <div className="p-4 border-b bg-gray-50">
            <Card>
              <CardContent className="p-3">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                    {event.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{event.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{event.description}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <span>📅 {new Date(event.date).toLocaleDateString()}</span>
                      <span>📍 {event.location}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Selection Controls */}
          <div className="p-4 border-b">
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search friends..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleSelectAll}>
                  Select All
                </Button>
                <Button variant="outline" size="sm" onClick={handleClearAll}>
                  Clear All
                </Button>
                {selectedFriends.length > 0 && (
                  <Badge className="bg-blue-500 text-white">
                    {selectedFriends.length} selected
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Friends List */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {filteredFriends.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No friends found</p>
                </div>
              ) : (
                filteredFriends.map((friend) => {
                  const isSelected = selectedFriends.some(f => f.id === friend.id);
                  return (
                    <Card
                      key={friend.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        isSelected ? 'ring-2 ring-blue-200 bg-blue-50' : ''
                      }`}
                      onClick={() => toggleFriendSelection(friend)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={friend.avatar} />
                            <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">{friend.name}</h4>
                            <p className="text-xs text-muted-foreground">{friend.email}</p>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            isSelected 
                              ? 'bg-blue-500 border-blue-500' 
                              : 'border-gray-300'
                          }`}>
                            {isSelected && (
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          </div>

          {/* Custom Message and Share Button */}
          <div className="p-4 border-t">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">Custom Message</label>
                <Input
                  placeholder="Add a personal message..."
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                />
              </div>
              <Button 
                className="w-full" 
                onClick={handleShare}
                disabled={selectedFriends.length === 0}
              >
                <Send className="w-4 h-4 mr-2" />
                Share with {selectedFriends.length} friend{selectedFriends.length !== 1 ? 's' : ''}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 