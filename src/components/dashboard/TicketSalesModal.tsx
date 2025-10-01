import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Event } from '@/types';
import { Ticket, TrendingUp, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TicketSalesModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketedEvents: Event[];
}

export const TicketSalesModal: React.FC<TicketSalesModalProps> = ({
  isOpen,
  onClose,
  ticketedEvents,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[85vw] max-h-[70vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ticket Sales Overview</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          {ticketedEvents.map(event => {
            const totalRevenue = event.ticketTiers?.reduce((sum, t) => sum + (t.sold * t.price), 0) || 0;
            const totalSold = event.ticketTiers?.reduce((sum, t) => sum + t.sold, 0) || 0;
            const totalAvailable = event.ticketTiers?.reduce((sum, t) => sum + t.quantity, 0) || 0;
            
            return (
              <Card key={event.id}>
                <CardContent className="p-3 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-sm">{event.name}</p>
                      <p className="text-xs text-muted-foreground">{event.date} at {event.time}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">€{totalRevenue.toFixed(2)}</Badge>
                  </div>
                  
                  <div className="space-y-1">
                    {event.ticketTiers?.map(tier => (
                      <div key={tier.id} className="flex justify-between items-center p-2 bg-muted/30 rounded">
                        <div className="flex items-center gap-2">
                          <Ticket className="w-3 h-3 text-purple-600" />
                          <span className="text-xs font-medium">{tier.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs">{tier.sold}/{tier.quantity}</span>
                          <span className="text-xs font-semibold text-purple-600">€{tier.price.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 border-t">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>Last sale: 2h ago</span>
                    </div>
                    <div className="flex items-center gap-1 text-green-600">
                      <TrendingUp className="w-3 h-3" />
                      <span>+{Math.floor(Math.random() * 5) + 1} today</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          
          {ticketedEvents.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">No ticket sales yet</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
