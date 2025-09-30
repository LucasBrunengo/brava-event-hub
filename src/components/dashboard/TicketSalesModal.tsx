import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Event } from '@/types';
import { Ticket, Calendar, Users } from 'lucide-react';

interface TicketSalesModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketedEvents: Event[];
}

export const TicketSalesModal: React.FC<TicketSalesModalProps> = ({ 
  isOpen, 
  onClose, 
  ticketedEvents 
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ticket Sales Overview</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {ticketedEvents.length === 0 ? (
            <div className="text-center py-8">
              <Ticket className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
              <p className="text-muted-foreground">No ticketed events yet</p>
            </div>
          ) : (
            ticketedEvents.map(event => {
              const totalRevenue = event.ticketTiers?.reduce((sum, tier) => sum + (tier.sold * tier.price), 0) || 0;
              const totalSold = event.ticketTiers?.reduce((sum, tier) => sum + tier.sold, 0) || 0;
              const totalAvailable = event.ticketTiers?.reduce((sum, tier) => sum + tier.quantity, 0) || 0;

              return (
                <Card key={event.id}>
                  <CardContent className="p-4 space-y-3">
                    <div>
                      <h3 className="font-bold">{event.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <Calendar className="w-3 h-3" />
                        <span>{event.date} at {event.time}</span>
                      </div>
                    </div>

                    {/* Overall Stats */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 bg-muted rounded-lg text-center">
                        <p className="text-lg font-bold text-green-600">€{totalRevenue.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">Revenue</p>
                      </div>
                      <div className="p-2 bg-muted rounded-lg text-center">
                        <p className="text-lg font-bold">{totalSold} / {totalAvailable}</p>
                        <p className="text-xs text-muted-foreground">Tickets Sold</p>
                      </div>
                    </div>

                    {/* Tier Breakdown */}
                    {event.ticketTiers && (
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground">Ticket Tiers</p>
                        {event.ticketTiers.map(tier => {
                          const remaining = tier.quantity - tier.sold;
                          const soldPercentage = (tier.sold / tier.quantity) * 100;

                          return (
                            <div key={tier.id} className="p-2 border rounded-lg space-y-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="text-sm font-medium">{tier.name}</p>
                                  <p className="text-xs text-muted-foreground">€{tier.price.toFixed(2)} each</p>
                                </div>
                                <Badge variant={remaining > 0 ? 'default' : 'secondary'} className="text-xs">
                                  {remaining > 0 ? `${remaining} left` : 'Sold Out'}
                                </Badge>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">Sold: {tier.sold} / {tier.quantity}</span>
                                <span className="font-medium text-green-600">€{(tier.sold * tier.price).toFixed(2)}</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div 
                                  className="bg-primary h-1.5 rounded-full transition-all"
                                  style={{ width: `${soldPercentage}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
