import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Event } from '@/types';

interface SellTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
  onConfirm: () => void;
}

export const SellTicketModal: React.FC<SellTicketModalProps> = ({ 
  isOpen, 
  onClose, 
  event,
  onConfirm 
}) => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  
  const currentPrice = event.ticketTiers?.[0]?.price || event.ticketPrice || 0;
  const commission = currentPrice * 0.03;
  const youReceive = currentPrice - commission;

  const handleConfirmSale = () => {
    if (acceptedTerms) {
      onConfirm();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[85vw]">
        <DialogHeader>
          <DialogTitle className="text-center">Sell Your Ticket</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <Alert className="border-purple-200 bg-purple-50">
            <AlertCircle className="h-4 w-4 text-purple-600" />
            <AlertDescription className="text-purple-900 font-semibold">
              Brava takes a 3% commission on all ticket resales
            </AlertDescription>
          </Alert>

          <div className="bg-muted p-4 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Current Ticket Price:</span>
              <span className="font-semibold">€{currentPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Brava Commission (3%):</span>
              <span className="text-red-600">-€{commission.toFixed(2)}</span>
            </div>
            <div className="border-t pt-2 flex justify-between">
              <span className="font-semibold">You Receive:</span>
              <span className="font-bold text-green-600">€{youReceive.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="terms" 
                checked={acceptedTerms}
                onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
              />
              <Label 
                htmlFor="terms" 
                className="text-xs leading-relaxed cursor-pointer"
              >
                I understand and accept that:
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>This ticket will be sold at the current release price</li>
                  <li>Brava will deduct a 3% commission</li>
                  <li>The sale is final and cannot be reversed</li>
                  <li>I will receive payment within 24-48 hours after the buyer's purchase</li>
                </ul>
              </Label>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmSale}
              disabled={!acceptedTerms}
              className="flex-1 bg-purple-600 hover:bg-purple-700"
            >
              Confirm Sale
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
