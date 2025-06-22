import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogPortal, DialogOverlay } from '@/components/ui/dialog';
import { X, Crown, TrendingDown, PieChart, Palette, Camera, Sparkles, Headset } from 'lucide-react';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  container?: HTMLElement | null;
}

const features = [
  {
    icon: <TrendingDown className="w-5 h-5 text-primary" />,
    name: 'Lower payment fees',
    description: '1.5% vs 2.5% on transactions'
  },
  {
    icon: <PieChart className="w-5 h-5 text-primary" />,
    name: 'Advanced analytics',
    description: 'Detailed spending reports & insights'
  },
  {
    icon: <Palette className="w-5 h-5 text-primary" />,
    name: 'Custom event themes',
    description: 'Personalization options for your events'
  },
  {
    icon: <Camera className="w-5 h-5 text-primary" />,
    name: 'Enhanced photo storage',
    description: 'Unlimited backup for all your memories'
  },
  {
    icon: <Sparkles className="w-5 h-5 text-primary" />,
    name: 'Exclusive venue deals',
    description: 'Early bird tickets and special offers'
  },
  {
    icon: <Headset className="w-5 h-5 text-primary" />,
    name: 'Priority customer support',
    description: 'Get help whenever you need it'
  }
];

export const PremiumModal: React.FC<PremiumModalProps> = ({ isOpen, onClose, container }) => {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal container={container}>
        <DialogOverlay className="bg-black/60" />
        <DialogContent className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-h-[90%] flex flex-col rounded-2xl border bg-white p-0 shadow-2xl">
          <DialogHeader className="p-4 border-b flex flex-row justify-between items-center">
            <DialogTitle className="text-center text-lg font-bold flex-1">Enhance Your Event Experience</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6">
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          <div className="p-6 overflow-y-auto">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold">✨ Premium Features</h3>
            </div>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <Card key={index} className="flex items-center p-3">
                  <div className="mr-4 text-primary">{feature.icon}</div>
                  <div>
                    <h4 className="font-semibold text-sm">{feature.name}</h4>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="text-center my-6">
              <h3 className="text-xl font-bold">💰 Pricing</h3>
              <p className="text-muted-foreground mt-2">$4.99/month or $49.99/year (Save 17%)</p>
            </div>

            <Card className="mt-4 bg-muted/50 p-4 text-center">
              <h4 className="font-bold">🎯 Smart Savings</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Organize regularly? Save money through reduced payment fees + get exclusive perks!
              </p>
            </Card>
          </div>
          <div className="p-4 border-t space-y-2">
            <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
              Start 7-Day Free Trial
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button className="w-full brava-gradient">
                Choose Monthly - $4.99
              </Button>
              <Button className="w-full brava-gradient">
                Choose Yearly - $49.99
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center pt-2">
              Cancel anytime • All core features stay free
            </p>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}; 