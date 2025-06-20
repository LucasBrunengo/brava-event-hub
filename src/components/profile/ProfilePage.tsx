
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/context/AppContext';
import { LogOut, Calendar, Users, DollarSign, Clock } from 'lucide-react';
import { format } from 'date-fns';

export const ProfilePage: React.FC = () => {
  const { currentUser, events, expenses, logout } = useApp();

  if (!currentUser) return null;

  const organizedEvents = events.filter(event => event.organizerId === currentUser.id);
  const attendedEvents = events.filter(event => 
    event.attendees.some(a => a.userId === currentUser.id && a.status === 'going')
  );

  const totalPaid = expenses.reduce((total, expense) => {
    const userPayment = expense.payments.find(p => p.userId === currentUser.id && p.status === 'paid');
    return total + (userPayment?.amount || 0);
  }, 0);

  const totalPending = expenses.reduce((total, expense) => {
    const userPayment = expense.payments.find(p => p.userId === currentUser.id && p.status === 'pending');
    return total + (userPayment?.amount || 0);
  }, 0);

  const recentEvents = [...organizedEvents, ...attendedEvents]
    .filter((event, index, self) => self.findIndex(e => e.id === event.id) === index)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <Avatar className="w-24 h-24 mx-auto">
          <AvatarImage src={currentUser.avatar} />
          <AvatarFallback className="text-2xl">
            {currentUser.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">{currentUser.name}</h1>
          <p className="text-muted-foreground">{currentUser.email}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="w-6 h-6 mx-auto mb-2 text-primary" />
            <p className="text-xl font-bold">{organizedEvents.length}</p>
            <p className="text-sm text-muted-foreground">Events Organized</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
            <p className="text-xl font-bold">{attendedEvents.length}</p>
            <p className="text-sm text-muted-foreground">Events Attended</p>
          </CardContent>
        </Card>
      </div>

      {/* Payment Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Payment Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-green-600">${totalPaid.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">Total Paid</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-600">${totalPending.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Events</CardTitle>
        </CardHeader>
        <CardContent>
          {recentEvents.length === 0 ? (
            <div className="text-center py-6">
              <Calendar className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
              <p className="text-muted-foreground">No recent events</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{event.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{format(new Date(event.date), 'MMM d, yyyy')}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {event.organizerId === currentUser.id && (
                      <Badge variant="outline" className="text-xs">Organizer</Badge>
                    )}
                    <Badge 
                      className={
                        new Date(event.date) > new Date() 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-gray-100 text-gray-800'
                      }
                    >
                      {new Date(event.date) > new Date() ? 'Upcoming' : 'Past'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Payment Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  📱
                </div>
                <span className="font-medium">Apple Pay</span>
              </div>
              <Badge variant="outline">Connected</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  🔵
                </div>
                <span className="font-medium">PayPal</span>
              </div>
              <Button variant="outline" size="sm">Connect</Button>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  🟢
                </div>
                <span className="font-medium">Google Pay</span>
              </div>
              <Button variant="outline" size="sm">Connect</Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Demo mode - payment integrations are simulated
          </p>
        </CardContent>
      </Card>

      {/* Logout */}
      <Card>
        <CardContent className="p-4">
          <Button 
            variant="outline" 
            onClick={logout}
            className="w-full text-red-600 border-red-200 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
