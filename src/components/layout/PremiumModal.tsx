import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { X, Crown, TrendingDown, PieChart, Palette, Camera, Sparkles, Headset, Users, Calendar } from 'lucide-react';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PremiumModal: React.FC<PremiumModalProps> = ({ isOpen, onClose }) => {
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
      <DialogContent className="fixed inset-4 z-50 w-auto h-auto max-h-[80vh] flex flex-col mx-0 p-0 max-w-none rounded-2xl border-0">
        <DialogHeader className="flex flex-row items-center justify-between p-4 border-b bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <DialogTitle className="flex items-center gap-2">
            <Crown className="w-5 h-5" />
            Premium Features
          </DialogTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
            <X className="w-4 h-4" />
          </Button>
        </DialogHeader>

        <div className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Unlock Premium Features</h2>
              <p className="text-muted-foreground">
                Get exclusive access to advanced event management tools and premium features.
              </p>
            </div>

            <div className="grid gap-4">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-l-4 border-l-purple-500">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        {benefit.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{benefit.title}</h3>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center space-y-4">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">€9.99</p>
                <p className="text-sm text-muted-foreground">per month</p>
              </div>
              
              <Button className="w-full brava-gradient text-white font-semibold py-3">
                <Crown className="w-4 h-4 mr-2" />
                Upgrade to Premium
              </Button>
              
              <p className="text-xs text-muted-foreground">
                Cancel anytime. 7-day free trial included.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 