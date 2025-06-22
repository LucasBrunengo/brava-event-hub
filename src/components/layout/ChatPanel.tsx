import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { MessageCircle, Calendar, CreditCard, Send, X, ExternalLink, ArrowLeft } from 'lucide-react';
import { Message, Event, User } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

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
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const { toast } = useToast();

  // Group messages by conversation
  const conversations = messages.reduce((acc, message) => {
    const otherUserId = message.senderId === currentUserId ? message.receiverId : message.senderId;
    if (!acc[otherUserId]) {
      acc[otherUserId] = [];
    }
    acc[otherUserId].push(message);
    return acc;
  }, {} as Record<string, Message[]>);

  const getOtherUser = (userId: string) => {
    return users.find(user => user.id === userId);
  };

  const getEvent = (eventId?: string) => {
    return events.find(event => event.id === eventId);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      onSendMessage(selectedChat, newMessage.trim());
      setNewMessage('');
    }
  };

  const handlePayment = (amount: number, paymentMethods: string[]) => {
    onPaymentRequest(amount, paymentMethods);
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
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => {
                      onEventClick(event.id);
                      onClose(); // Close the chat panel
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
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Amount Owed:</span>
                      <span className="text-lg font-bold text-green-600">€{message.amount}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      Tap to pay with your preferred method
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {message.paymentMethods?.map((method) => (
                        <Button
                          key={method}
                          size="sm"
                          variant="outline"
                          className="text-xs h-8"
                          onClick={() => handlePayment(message.amount!, message.paymentMethods!)}
                        >
                          {method}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );

      default:
        return <p className="text-sm">{message.content}</p>;
    }
  };

  return (
    <div className="absolute inset-0 z-30 bg-white flex flex-col animate-slide-in-from-right">
      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between p-4 bg-white border-b border-gray-200">
        {selectedChat ? (
          <>
            <DialogTitle className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setSelectedChat(null)}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              {getOtherUser(selectedChat)?.name || 'Chat'}
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </>
        ) : (
          <>
            <DialogTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Messages
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {selectedChat ? (
          conversations[selectedChat]?.map((message) => {
            const sender = getOtherUser(message.senderId);
            if (!sender) return null; // Defend against missing sender

            return (
              <div
                key={message.id}
                className={`flex ${message.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${message.senderId === currentUserId ? 'order-2' : 'order-1'}`}>
                  {renderMessageContent(message)}
                  <span className="text-xs text-muted-foreground mt-1 block">
                    {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                  </span>
                </div>
                {message.senderId !== currentUserId && (
                  <Avatar className="w-6 h-6 ml-2 order-1">
                    <AvatarImage src={sender.avatar} />
                    <AvatarFallback className="text-xs">{sender.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
              </div>
            );
          })
        ) : (
          <>
            {Object.entries(conversations).map(([userId, userMessages]) => {
              const user = getOtherUser(userId);
              if (!user) return null; // Safely skip rendering if user not found

              const lastMessage = userMessages[userMessages.length - 1];
              const unreadCount = userMessages.filter(m => !m.isRead && m.senderId !== currentUserId).length;

              return (
                <Card
                  key={userId}
                  className="cursor-pointer transition-all hover:shadow-md"
                  onClick={() => setSelectedChat(userId)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name?.charAt(0) || '?'}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-sm">{user.name}</h4>
                          {unreadCount > 0 && (
                            <Badge className="bg-green-500 text-white text-xs">
                              {unreadCount}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {lastMessage.content}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(lastMessage.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </>
        )}
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button size="sm" onClick={handleSendMessage} disabled={!newMessage.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}; 