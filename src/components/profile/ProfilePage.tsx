import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/context/AppContext';
import { LogOut, Calendar, Users, Clock, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { Event } from '@/types';

interface ProfilePageProps {
  onPastEventClick?: (event: Event) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onPastEventClick }) => {
  const { currentUser, events, expenses, logout } = useApp();

  if (!currentUser) return null;

  const organizedEvents = events.filter(event => event.organizerId === currentUser.id);
  const attendedEvents = events.filter(event => 
    event.attendees.some(a => a.userId === currentUser.id && a.status === 'going')
  );

  const totalOwedToMe = expenses.reduce((total, expense) => {
    if (expense.paidBy === currentUser.id) {
      return total + expense.payments
        .filter(p => p.userId !== currentUser.id && p.status === 'pending')
        .reduce((sum, p) => sum + p.amount, 0);
    }
    return total;
  }, 0);

  const recentEvents = [...organizedEvents, ...attendedEvents]
    .filter((event, index, self) => self.findIndex(e => e.id === event.id) === index)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const pastEvents = recentEvents.filter(event => new Date(event.date) < new Date());

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with Background */}
      <div className="relative">
        <div 
          className="absolute inset-0 h-32 bg-gradient-to-br from-purple-500 via-blue-500 to-purple-600 rounded-lg opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=200&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="relative z-10 text-center space-y-4 pt-8 pb-6">
          <Avatar className="w-24 h-24 mx-auto border-4 border-white shadow-lg">
            <AvatarImage src={currentUser.avatar} />
            <AvatarFallback className="text-2xl bg-white">
              {currentUser.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{currentUser.name}</h1>
            <p className="text-muted-foreground">{currentUser.email}</p>
          </div>
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

      {/* Money Owed To Me */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Financial Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">${totalOwedToMe.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">Friends owe you</p>
          </div>
        </CardContent>
      </Card>

      {/* Past Events - Clickable */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Past Events</CardTitle>
        </CardHeader>
        <CardContent>
          {pastEvents.length === 0 ? (
            <div className="text-center py-6">
              <Calendar className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
              <p className="text-muted-foreground">No past events</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pastEvents.map((event) => (
                <div 
                  key={event.id} 
                  className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => onPastEventClick?.(event)}
                >
                  <div className="flex-1">
                    <h4 className="font-medium">{event.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{format(new Date(event.date), 'MMM d, yyyy')}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      📸 Click to see photos & who attended
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {event.organizerId === currentUser.id && (
                      <Badge variant="outline" className="text-xs">Organizer</Badge>
                    )}
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
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
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                  <path d="M8.34,21.92,6.42,12.83a2,2,0,0,1,1.92-2.58H15.66a2,2,0,0,1,1.92,2.58l-1.92,9.09a1.5,1.5,0,0,1-1.42,1.08H9.76A1.5,1.5,0,0,1,8.34,21.92Z"></path>
                  <path d="M15.42,10.25a2,2,0,0,0-2-1.75,2.46,2.46,0,0,0-2.5,2.25,2.46,2.46,0,0,0,2.5,2.25,2,2,0,0,0,2-1.75" style={{fill: "black"}}></path>
                  <path d="M12,4.5A2.5,2.5,0,0,0,9.5,2,4,4,0,0,0,8.5,4.5"></path>
                </svg>
                <span className="font-medium">Apple Pay</span>
              </div>
              <Badge variant="outline">Connected</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                  <path d="M8.34,21.92,6.42,12.83a2,2,0,0,1,1.92-2.58H15.66a2,2,0,0,1,1.92,2.58l-1.92,9.09a1.5,1.5,0,0,1-1.42,1.08H9.76A1.5,1.5,0,0,1,8.34,21.92Z"></path>
                  <path d="M15.42,10.25a2,2,0,0,0-2-1.75,2.46,2.46,0,0,0-2.5,2.25,2.46,2.46,0,0,0,2.5,2.25,2,2,0,0,0,2-1.75"></path>
                  <path d="M12,4.5A2.5,2.5,0,0,0,9.5,2,4,4,0,0,0,8.5,4.5"></path>
                </svg>
                <span className="font-medium">PayPal</span>
              </div>
              <Button variant="outline" size="sm">Connect</Button>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                  <path d="M8.34,21.92,6.42,12.83a2,2,0,0,1,1.92-2.58H15.66a2,2,0,0,1,1.92,2.58l-1.92,9.09a1.5,1.5,0,0,1-1.42,1.08H9.76A1.5,1.5,0,0,1,8.34,21.92Z"></path>
                  <path d="M15.42,10.25a2,2,0,0,0-2-1.75,2.46,2.46,0,0,0-2.5,2.25,2.46,2.46,0,0,0,2.5,2.25,2,2,0,0,0,2-1.75"></path>
                  <path d="M12,4.5A2.5,2.5,0,0,0,9.5,2,4,4,0,0,0,8.5,4.5"></path>
                </svg>
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
