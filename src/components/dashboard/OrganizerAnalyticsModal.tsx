import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Event } from '@/types';
import { TrendingUp, Users, DollarSign, Ticket } from 'lucide-react';

interface OrganizerAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketedEvents: Event[];
}

export const OrganizerAnalyticsModal: React.FC<OrganizerAnalyticsModalProps> = ({ 
  isOpen, 
  onClose, 
  ticketedEvents 
}) => {
  const totalRevenue = ticketedEvents.reduce((sum, event) => {
    if (event.ticketTiers) {
      return sum + event.ticketTiers.reduce((tierSum, tier) => tierSum + (tier.sold * tier.price), 0);
    }
    return sum;
  }, 0);

  const totalTicketsSold = ticketedEvents.reduce((sum, event) => {
    if (event.ticketTiers) {
      return sum + event.ticketTiers.reduce((tierSum, tier) => tierSum + tier.sold, 0);
    }
    return sum;
  }, 0);

  const averageTicketPrice = totalTicketsSold > 0 ? totalRevenue / totalTicketsSold : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Organizer Analytics</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <Card>
              <CardContent className="p-4 text-center">
                <DollarSign className="w-6 h-6 mx-auto mb-2 text-green-600" />
                <p className="text-2xl font-bold">€{totalRevenue.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">Total Revenue</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Ticket className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <p className="text-2xl font-bold">{totalTicketsSold}</p>
                <p className="text-xs text-muted-foreground">Tickets Sold</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                <p className="text-2xl font-bold">€{averageTicketPrice.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">Avg Price</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Users className="w-6 h-6 mx-auto mb-2 text-orange-600" />
                <p className="text-2xl font-bold">{ticketedEvents.length}</p>
                <p className="text-xs text-muted-foreground">Events</p>
              </CardContent>
            </Card>
          </div>

          {/* Event Breakdown */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Event Performance</h3>
              <div className="space-y-3">
                {ticketedEvents.map(event => {
                  const eventRevenue = event.ticketTiers?.reduce((sum, tier) => sum + (tier.sold * tier.price), 0) || 0;
                  const eventSold = event.ticketTiers?.reduce((sum, tier) => sum + tier.sold, 0) || 0;
                  const eventTotal = event.ticketTiers?.reduce((sum, tier) => sum + tier.quantity, 0) || 0;
                  const sellRate = eventTotal > 0 ? (eventSold / eventTotal * 100) : 0;

                  return (
                    <div key={event.id} className="p-3 border rounded-lg space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-sm">{event.name}</p>
                          <p className="text-xs text-muted-foreground">{event.date}</p>
                        </div>
                        <p className="font-bold text-green-600">€{eventRevenue.toFixed(2)}</p>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">{eventSold} / {eventTotal} tickets sold</span>
                        <span className={`font-medium ${sellRate > 75 ? 'text-green-600' : sellRate > 50 ? 'text-orange-600' : 'text-red-600'}`}>
                          {sellRate.toFixed(0)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${sellRate > 75 ? 'bg-green-600' : sellRate > 50 ? 'bg-orange-600' : 'bg-red-600'}`}
                          style={{ width: `${sellRate}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
