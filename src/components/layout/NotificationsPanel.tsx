import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, Calendar, MessageCircle, CreditCard, Clock, X, ExternalLink } from 'lucide-react';
import { Notification, Event, User } from '@/types';
import { formatDistanceToNow } from 'date-fns';

interface NotificationsPanelProps {
  notifications: Notification[];
  events: Event[];
  users: User[];
  onNotificationClick: (notification: Notification) => void;
  onMarkAsRead: (notificationId: string) => void;
  onClose: () => void;
}

export const NotificationsPanel: React.FC<NotificationsPanelProps> = ({
  notifications,
  events,
  users,
  onNotificationClick,
  onMarkAsRead,
  onClose
}) => {
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'event_invite':
        return <Calendar className="w-4 h-4 text-blue-500" />;
      case 'payment_request':
        return <CreditCard className="w-4 h-4 text-green-500" />;
      case 'message':
        return <MessageCircle className="w-4 h-4 text-purple-500" />;
      case 'reminder':
        return <Clock className="w-4 h-4 text-orange-500" />;
      default:
        return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'event_invite':
        return 'border-l-blue-500 bg-blue-50';
      case 'payment_request':
        return 'border-l-green-500 bg-green-50';
      case 'message':
        return 'border-l-purple-500 bg-purple-50';
      case 'reminder':
        return 'border-l-orange-500 bg-orange-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
    onMarkAsRead(notification.id);
    onNotificationClick(notification);
  };

  const getRelatedEvent = (eventId?: string) => {
    return events.find(event => event.id === eventId);
  };

  const getRelatedUser = (userId?: string) => {
    return users.find(user => user.id === userId);
  };

  const getEventName = (eventId: string) => {
    return events.find(e => e.id === eventId)?.name || 'an event';
  };

  const getUserName = (userId: string) => {
    return users.find(u => u.id === userId)?.name || 'Someone';
  };

  return (
    <div className="absolute inset-0 bg-white z-30 flex flex-col animate-slide-in-from-right">
      <div className="flex-shrink-0 flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Notifications
        </h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="text-center py-20">
            <Bell className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold">No new notifications</h3>
            <p className="text-muted-foreground">You're all caught up!</p>
          </div>
        ) : (
          <div className="space-y-2 p-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg cursor-pointer transition-colors ${
                  notification.isRead ? 'bg-gray-50' : 'bg-blue-50 hover:bg-blue-100'
                }`}
                onClick={() => {
                  if (!notification.isRead) {
                    onMarkAsRead(notification.id);
                  }
                  onNotificationClick(notification);
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center">
                    {notification.type === 'event_invite' && <Calendar className="w-4 h-4 text-blue-600" />}
                    {notification.type === 'payment_request' && <CreditCard className="w-4 h-4 text-blue-600" />}
                    {notification.type === 'message' && <MessageCircle className="w-4 h-4 text-blue-600" />}
                    {notification.type === 'reminder' && <Clock className="w-4 h-4 text-blue-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{notification.title}</p>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                    <span className="text-xs text-muted-foreground mt-1">
                      {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  {!notification.isRead && (
                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full self-center" />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Notification Detail Modal */}
      {selectedNotification && (
        <div className="absolute inset-0 z-40 bg-white flex flex-col">
          <div className="flex-shrink-0 flex items-center justify-between p-4 border-b">
            <h2 className="flex items-center gap-2 font-semibold">
              <button onClick={() => setSelectedNotification(null)} className="mr-2">
                <X className="w-4 h-4" />
              </button>
              {selectedNotification.title}
            </h2>
            {getNotificationIcon(selectedNotification.type)}
          </div>
          <div className="flex-1 space-y-4 p-4 overflow-y-auto">
            <p className="text-muted-foreground">{selectedNotification.message}</p>
            
            {selectedNotification.relatedEventId && (
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">Related Event</h4>
                  {(() => {
                    const event = getRelatedEvent(selectedNotification.relatedEventId);
                    return event ? (
                      <div className="space-y-2">
                        <h5 className="font-medium text-sm">{event.name}</h5>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        <Button className="w-full" size="sm">
                          View Event Details
                        </Button>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">Event not found</p>
                    );
                  })()}
                </CardContent>
              </Card>
            )}

            {selectedNotification.relatedUserId && (
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">From</h4>
                  {(() => {
                    const user = getRelatedUser(selectedNotification.relatedUserId);
                    return user ? (
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">User not found</p>
                    );
                  })()}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}; 