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
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-full w-full h-[80vh] flex flex-col mx-0 p-0">
        {!selectedChat ? (
          // Conversations List
          <>
            <DialogHeader className="flex flex-row items-center justify-between p-4 border-b">
              <DialogTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Messages
              </DialogTitle>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto space-y-1 p-4">
              {Object.entries(conversations).map(([userId, userMessages]) => {
                const user = getOtherUser(userId);
                const lastMessage = userMessages[userMessages.length - 1];
                const unreadCount = userMessages.filter(m => !m.isRead && m.senderId !== currentUserId).length;

                return (
                  <Card
                    key={userId}
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setSelectedChat(userId)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={user?.avatar} />
                          <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-sm">{user?.name}</h4>
                            {unreadCount > 0 && (
                              <Badge className="bg-blue-500 text-white text-xs">{unreadCount}</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {lastMessage.content.substring(0, 50)}...
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
            </div>
          </>
        ) : (
          // Individual Chat
          <>
            <DialogHeader className="flex flex-row items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" onClick={() => setSelectedChat(null)}>
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <Avatar className="w-8 h-8">
                  <AvatarImage src={getOtherUser(selectedChat)?.avatar} />
                  <AvatarFallback>{getOtherUser(selectedChat)?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <DialogTitle className="text-base">{getOtherUser(selectedChat)?.name}</DialogTitle>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {conversations[selectedChat]?.map((message) => (
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
                      <AvatarImage src={message.sender.avatar} />
                      <AvatarFallback className="text-xs">{message.sender.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
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
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}; 