import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { Event } from '@/types';
import { QrCode, MapPin, Calendar, Clock } from 'lucide-react';

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
  ticketData: {
    id: string;
    tierName: string;
    quantity: number;
    qrData: string;
  };
}

export const TicketModal: React.FC<TicketModalProps> = ({ 
  isOpen, 
  onClose, 
  event, 
  ticketData 
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Your Ticket</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Event Details */}
          <Card className="p-4 space-y-3">
            <h3 className="font-bold text-lg">{event.name}</h3>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
                <span>{event.location}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>{event.date}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span>{event.time}</span>
              </div>
            </div>
          </Card>

          {/* Ticket Info */}
          <Card className="p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Ticket Type:</span>
              <span className="font-semibold">{ticketData.tierName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Quantity:</span>
              <span className="font-semibold">{ticketData.quantity}</span>
            </div>
          </Card>

          {/* QR Code */}
          <Card className="p-6 bg-white dark:bg-gray-900">
            <div className="flex flex-col items-center gap-3">
              <div className="w-48 h-48 bg-white border-4 border-gray-200 rounded-lg flex items-center justify-center">
                <QrCode className="w-40 h-40 text-gray-800" />
              </div>
              <p className="text-xs text-center text-muted-foreground break-all px-4">
                {ticketData.qrData}
              </p>
            </div>
          </Card>

          <p className="text-xs text-center text-muted-foreground">
            Show this QR code at the entrance
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
