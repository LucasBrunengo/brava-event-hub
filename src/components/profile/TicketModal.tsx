import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Event } from '@/types';
import { Calendar, MapPin, Clock, User } from 'lucide-react';

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
}

export const TicketModal: React.FC<TicketModalProps> = ({ isOpen, onClose, event }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[85vw]">
        <DialogHeader>
          <DialogTitle className="text-center">Event Ticket</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div className="space-y-2 text-center">
            <h3 className="font-bold text-base">{event.name}</h3>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              <span>{event.date}</span>
              <Clock className="w-3 h-3 ml-2" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span className="text-center">{event.location}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <User className="w-3 h-3" />
              <span>by {event.organizer.name}</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border-2 border-purple-200 flex items-center justify-center">
            <div className="text-center">
              <div className="w-28 h-28 mx-auto bg-white rounded-lg flex items-center justify-center shadow-md">
                <svg viewBox="0 0 100 100" className="w-24 h-24">
                  <rect width="100" height="100" fill="white"/>
                  {[...Array(10)].map((_, i) => [...Array(10)].map((_, j) => (
                    <rect key={`${i}-${j}`} x={i*10} y={j*10} width="10" height="10" fill={Math.random()>0.5?"black":"white"}/>
                  )))}
                </svg>
              </div>
              <p className="text-xs text-muted-foreground mt-2 font-medium">Scan at venue entrance</p>
              <p className="text-[10px] text-muted-foreground mt-1">Ticket ID: {event.id.slice(0,8).toUpperCase()}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
