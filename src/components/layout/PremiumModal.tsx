import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogPortal, DialogOverlay } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { X, Crown, TrendingDown, PieChart, Palette, Camera, Sparkles, Headset, Users, Calendar } from 'lucide-react';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  container?: HTMLElement | null;
}

export const PremiumModal: React.FC<PremiumModalProps> = ({ isOpen, onClose, container }) => {
  if (!isOpen) return null;

  const benefits = [
    {
      icon: <Users className="w-4 h-4 text-purple-600" />,
      title: "Unlimited Guest Lists",
      description: "Invite as many people as you want to your events"
    },
    {
      icon: <Calendar className="w-4 h-4 text-purple-600" />,
      title: "Advanced Scheduling",
      description: "Get priority access to popular venues and dates"
    },
    {
      icon: <Crown className="w-4 h-4 text-purple-600" />,
      title: "Premium Support",
      description: "24/7 customer support for all your event needs"
    },
    {
      icon: <Users className="w-4 h-4 text-purple-600" />,
      title: "Analytics Dashboard",
      description: "Track attendance and engagement metrics"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal container={container}>
        <DialogOverlay className="bg-black/60" />
        <DialogContent className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-h-[90%] flex flex-col rounded-2xl border bg-white p-0 shadow-2xl">
          <DialogHeader className="p-4 border-b flex flex-row justify-between items-center">
            <DialogTitle className="text-center text-lg font-bold flex-1">Unlock Brava Premium+</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6">
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          <div className="p-6 overflow-y-auto">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold">Unlock Premium Features</h3>
              <p className="text-muted-foreground mt-2">Get exclusive access to advanced event management tools and premium features.</p>
            </div>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <Card key={index} className="flex items-center p-4">
                  <div className="mr-4 text-primary">{benefit.icon}</div>
                  <div>
                    <h4 className="font-semibold">{benefit.title}</h4>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </Card>
              ))}
            </div>
            <Card className="mt-6 bg-muted/50 p-6 text-center">
              <p className="text-3xl font-bold text-primary">€9.99</p>
              <p className="text-muted-foreground">per month</p>
            </Card>
          </div>
          <div className="p-4 border-t">
            <Button className="w-full brava-gradient">
              <Crown className="w-4 h-4 mr-2" />
              Upgrade to Premium
            </Button>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}; 