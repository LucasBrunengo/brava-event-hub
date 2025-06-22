import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { MessageCircle, Calendar, CreditCard, Send, X, ExternalLink, ArrowLeft } from 'lucide-react';
import { Message, Event, User } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { useApp } from '@/context/AppContext';

interface ChatPanelProps {
  messages: Message[];
  events: Event[];
  users: User[];
  currentUserId: string;
  onSendMessage: (receiverId: string, content: string) => void;
  onEventClick: (eventId: string) => void;
  onPaymentRequest: (amount: number, paymentMethods: string[]) => void;
  onClose: () => void;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({
  messages,
  events,
  users,
  currentUserId,
  onSendMessage,
  onEventClick,
  onPaymentRequest,
  onClose
}) => {
  const { setViewedProfile } = useApp();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const getOtherUser = (userId: string): User | undefined => {
    return users.find(user => user.id === userId);
  };

  const getEvent = (eventId?: string): Event | undefined => {
    if (!eventId) return undefined;
    return events.find(event => event.id === eventId);
  };

  const handleUserClick = (user: User) => {
    setViewedProfile(user);
  };
  
  // 1. Defensively group messages, ignoring any that are malformed.
  const conversations = messages.reduce((acc, message) => {
    const otherUserId = message.senderId === currentUserId ? message.receiverId : message.senderId;
    if (otherUserId && typeof otherUserId === 'string') {
      if (!acc[otherUserId]) {
        acc[otherUserId] = [];
      }
      acc[otherUserId].push(message);
    }
    return acc;
  }, {} as Record<string, Message[]>);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      onSendMessage(selectedChat, newMessage.trim());
      setNewMessage('');
    }
  };
  
  const renderMessageContent = (message: Message) => {
    switch (message.type) {
      case 'event_invite':
        const event = getEvent(message.eventId);
        return (
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span className="font-semibold text-sm">Event Invitation</span>
              </div>
              <p className="text-sm mb-3">{message.content}</p>
              {event && (
                <div className="space-y-2">
                  <div className="bg-white p-2 rounded border">
                    <h4 className="font-medium text-sm">{event.name}</h4>
                    <p className="text-xs text-muted-foreground">{event.description}</p>
                  </div>
                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => {
                      onEventClick(event.id);
                      onClose();
                    }}
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    View Event
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 'payment_request':
        return (
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-4 h-4 text-green-500" />
                <span className="font-semibold text-sm">Payment Request</span>
              </div>
              <p className="text-sm mb-3">{message.content}</p>
              {message.amount && message.senderId !== currentUserId && (
                 <Button size="sm" onClick={() => onPaymentRequest(message.amount!, message.paymentMethods || [])}>
                    Pay €{message.amount}
                  </Button>
              )}
            </CardContent>
          </Card>
        );

      default:
        return <p className="text-sm">{message.content}</p>;
    }
  };

  const selectedUserName = selectedChat ? (getOtherUser(selectedChat)?.name || 'Chat') : 'Messages';

  return (
    <div className="absolute inset-0 z-30 bg-white flex flex-col animate-slide-in-from-right">
      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between p-4 bg-white border-b">
        <div className="flex items-center gap-2">
          {selectedChat ? (
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelectedChat(null)}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
          ) : (
            <MessageCircle className="w-5 h-5" />
          )}
          <h2 className="font-semibold text-lg">{selectedUserName}</h2>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Body */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {selectedChat ? (
          // Individual Chat View
          (conversations[selectedChat] || []).map((message) => {
            const sender = getOtherUser(message.senderId);
            if (!sender) return null; // Defensive check

            return (
              <div
                key={message.id}
                className={`flex gap-2 ${message.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
              >
                {message.senderId !== currentUserId && (
                  <button onClick={() => handleUserClick(sender)}>
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={sender.avatar} />
                      <AvatarFallback>{sender.name?.charAt(0) || '?'}</AvatarFallback>
                    </Avatar>
                  </button>
                )}
                 <div className={`max-w-[80%] p-3 rounded-lg ${message.senderId === currentUserId ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
                    {renderMessageContent(message)}
                    <span className="text-xs opacity-70 mt-1 block">
                      {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                    </span>
                 </div>
              </div>
            );
          })
        ) : (
          // Conversation List View
          Object.entries(conversations).map(([userId, userMessages]) => {
            const user = getOtherUser(userId);
            if (!user) return null;

            const lastMessage = userMessages.length > 0 ? userMessages[userMessages.length - 1] : null;
            const unreadCount = userMessages.filter(m => !m.isRead && m.senderId !== currentUserId).length;

            return (
              <Card
                key={userId}
                className="cursor-pointer transition-all hover:shadow-md"
                onClick={() => setSelectedChat(userId)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <button onClick={(e) => { e.stopPropagation(); handleUserClick(user); }}>
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name?.charAt(0) || '?'}</AvatarFallback>
                      </Avatar>
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-sm">{user.name || 'Unknown User'}</h4>
                        {unreadCount > 0 && (
                          <Badge className="bg-green-500 text-white text-xs">{unreadCount}</Badge>
                        )}
                      </div>
                      {lastMessage ? (
                        <>
                          <p className="text-sm text-muted-foreground truncate">{lastMessage.content}</p>
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(lastMessage.createdAt), { addSuffix: true })}
                          </span>
                        </>
                      ) : (
                        <p className="text-sm text-muted-foreground italic">No messages yet.</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Footer */}
      {selectedChat && (
        <div className="p-4 border-t bg-white">
          <div className="flex gap-2">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}; 