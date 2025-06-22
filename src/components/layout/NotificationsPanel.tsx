import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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

  return (
    <>
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="absolute bottom-0 w-full h-[80vh] flex flex-col mx-0 p-0">
          <DialogHeader className="flex flex-row items-center justify-between p-4 border-b">
            <DialogTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto space-y-2 p-4">
            {notifications.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    !notification.isRead ? 'ring-2 ring-blue-200' : ''
                  } ${getNotificationColor(notification.type)}`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-sm">{notification.title}</h4>
                          {!notification.isRead && (
                            <Badge className="bg-blue-500 text-white text-xs">New</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                          </span>
                          {notification.relatedEventId && (
                            <Button variant="ghost" size="sm" className="h-6 px-2">
                              <ExternalLink className="w-3 h-3 mr-1" />
                              View Event
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Notification Detail Modal */}
      {selectedNotification && (
        <Dialog open={!!selectedNotification} onOpenChange={() => setSelectedNotification(null)}>
          <DialogContent className="max-w-full w-full max-h-[80vh] overflow-hidden mx-0 p-0">
            <DialogHeader className="flex flex-row items-center justify-between p-4 border-b">
              <DialogTitle className="flex items-center gap-2">
                {getNotificationIcon(selectedNotification.type)}
                {selectedNotification.title}
              </DialogTitle>
              <Button variant="ghost" size="sm" onClick={() => setSelectedNotification(null)}>
                <X className="w-4 h-4" />
              </Button>
            </DialogHeader>
            <div className="space-y-4 p-4 max-h-96 overflow-y-auto">
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
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}; 