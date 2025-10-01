import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/context/AppContext';
import { LogOut, Calendar, Users, Clock, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { Event } from '@/types';
import { TicketModal } from './TicketModal';

interface ProfilePageProps {
  onPastEventClick?: (event: Event) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onPastEventClick }) => {
  const { currentUser, events, expenses, logout, myTickets } = useApp();
  const [selectedTicket, setSelectedTicket] = useState<{ event: Event; ticket: any } | null>(null);

  if (!currentUser) return null;

  const organizedEvents = events.filter(event => event.organizerId === currentUser.id);
  const attendedEvents = events.filter(event => 
    event.attendees.some(a => a.userId === currentUser.id && a.status === 'going')
  );

  const netBalances: { [key: string]: { name: string; avatar: string; amount: number } } = {};

  expenses.forEach(expense => {
    const event = events.find(e => e.id === expense.eventId);
    if (!event) return;

    // Helper to initialize a user in the netBalances object
    const ensureUserInBalances = (user: { id: string; name: string; avatar?: string; }) => {
      if (!netBalances[user.id]) {
        netBalances[user.id] = { name: user.name, avatar: user.avatar || '', amount: 0 };
      }
    };

    // Case 1: You paid for others (they owe you)
    if (expense.paidBy === currentUser.id) {
      expense.payments.forEach(payment => {
        if (payment.status === 'pending') {
          const debtor = event.attendees.find(a => a.userId === payment.userId)?.user;
          if (debtor) {
            ensureUserInBalances(debtor);
            netBalances[debtor.id].amount += payment.amount;
          }
        }
      });
    }

    // Case 2: Others paid for you (you owe them)
    const myPayment = expense.payments.find(p => p.userId === currentUser.id);
    if (myPayment && myPayment.status === 'pending' && expense.paidBy !== currentUser.id) {
      const creditor = event.attendees.find(a => a.userId === expense.paidBy)?.user;
      if (creditor) {
        ensureUserInBalances(creditor);
        netBalances[creditor.id].amount -= myPayment.amount;
      }
    }
  });
  
  const totalOwedToMe = Object.values(netBalances).reduce((sum, p) => sum + Math.max(0, p.amount), 0);
  const totalYouOwe = Object.values(netBalances).reduce((sum, p) => sum + Math.abs(Math.min(0, p.amount)), 0);

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

      {/* Financial Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Financial Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-green-600">€{totalOwedToMe.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">Owed to you</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">€{totalYouOwe.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">You owe</p>
            </div>
          </div>
          
          {Object.keys(netBalances).length > 0 && (
            <div className="mt-6 space-y-4">
              <hr/>
              <h4 className="font-medium mb-2">Net Balances:</h4>
              <div className="space-y-2">
                {Object.entries(netBalances)
                  .filter(([_, data]) => Math.abs(data.amount) > 0.01) // Optional: hide zero balances
                  .map(([id, data]) => {
                    const isOwedToYou = data.amount > 0;
                    return (
                      <div key={id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={data.avatar} />
                            <AvatarFallback>{data.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span>{isOwedToYou ? `${data.name} owes you` : `You owe ${data.name}`}</span>
                        </div>
                        <span className={`font-semibold ${isOwedToYou ? 'text-green-600' : 'text-red-600'}`}>
                          €{Math.abs(data.amount).toFixed(2)}
                        </span>
                      </div>
                    );
                })}
              </div>
            </div>
          )}
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

      {/* My Tickets */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">My Tickets</CardTitle>
        </CardHeader>
        <CardContent>
          {(!myTickets || myTickets.length === 0) ? (
            <div className="text-sm text-muted-foreground">No tickets purchased yet.</div>
          ) : (
            <div className="space-y-3">
              {myTickets.map(t => {
                const ev = events.find(e => e.id === t.eventId);
                if (!ev) return null;
                return (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTicket({ event: ev, ticket: t })}
                    className="w-full p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <div className="font-medium">{ev.name}</div>
                        <div className="text-xs text-muted-foreground">{t.tierName} • Qty {t.quantity} • {ev.date} {ev.time}</div>
                      </div>
                      <div className="text-xs bg-black text-white px-3 py-1.5 rounded font-medium">
                        View QR
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Ticket Modal */}
      {selectedTicket && (
        <TicketModal
          isOpen={!!selectedTicket}
          onClose={() => setSelectedTicket(null)}
          event={selectedTicket.event}
        />
      )}

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Payment Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF0s-Zy3zaDYeri6ZW8a5aPPekTUuuhyLOdQ&s" alt="Apple Pay" className="h-8 w-12 object-contain"/>
                <span className="font-medium">Apple Pay</span>
              </div>
              <Badge variant="outline">Connected</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <img src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-100px.png" alt="PayPal" className="h-8 w-12 object-contain"/>
                <span className="font-medium">PayPal</span>
              </div>
              <Button variant="outline" size="sm">Connect</Button>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/2560px-Google_Pay_Logo.svg.png" alt="Google Pay" className="h-8 w-12 object-contain"/>
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
