
import React from 'react';
import { EventCard } from './EventCard';
import { Event } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useApp } from '@/context/AppContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PublicEventsListProps {
  events: Event[];
  onEventClick: (event: Event) => void;
}

export const PublicEventsList: React.FC<PublicEventsListProps> = ({ 
  events, 
  onEventClick
}) => {
  const { expenses, currentUser } = useApp();

  // Calculate what user owes for public events
  const getOwedAmount = () => {
    return expenses
      .filter(expense => events.some(event => event.id === expense.eventId))
      .reduce((total, expense) => {
        const payment = expense.payments.find(p => p.userId === currentUser?.id && p.status === 'pending');
        return total + (payment?.amount || 0);
      }, 0);
  };

  const getOwedPayments = () => {
    return expenses
      .filter(expense => events.some(event => event.id === expense.eventId))
      .flatMap(expense => 
        expense.payments.filter(p => p.userId === currentUser?.id && p.status === 'pending')
          .map(payment => ({
            ...payment,
            expenseName: expense.name,
            eventName: events.find(e => e.id === expense.eventId)?.name || 'Unknown Event'
          }))
      );
  };

  if (events.length === 0) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          🌍
        </div>
        <h3 className="font-semibold text-lg mb-2">No Public Events</h3>
        <p className="text-muted-foreground max-w-xs mx-auto">
          Check back later for public events in your area
        </p>
      </div>
    );
  }

  return (
    <Tabs defaultValue="events" className="space-y-4">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="events">Events</TabsTrigger>
        <TabsTrigger value="payments">
          Payments {getOwedAmount() > 0 && `($${getOwedAmount().toFixed(2)})`}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="events" className="space-y-3">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onClick={() => onEventClick(event)}
          />
        ))}
      </TabsContent>

      <TabsContent value="payments">
        {getOwedPayments().length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                💳
              </div>
              <h3 className="font-semibold mb-2">No Pending Payments</h3>
              <p className="text-muted-foreground text-sm">
                You're all caught up with public event payments
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Total Owed: ${getOwedAmount().toFixed(2)}</CardTitle>
              </CardHeader>
            </Card>
            
            {getOwedPayments().map((payment) => (
              <Card key={payment.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{payment.expenseName}</h4>
                      <p className="text-sm text-muted-foreground">{payment.eventName}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${payment.amount.toFixed(2)}</p>
                      <Badge className="bg-orange-100 text-orange-800">
                        Pending
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};
