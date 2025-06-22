import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { X, Crown, TrendingDown, PieChart, Palette, Camera, Sparkles, Headset } from 'lucide-react';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PremiumModal: React.FC<PremiumModalProps> = ({ isOpen, onClose }) => {
  const benefits = [
    {
      icon: <TrendingDown className="w-5 h-5" />,
      title: "Lower payment fees (1.5% vs 2.5%)",
    },
    {
      icon: <PieChart className="w-5 h-5" />,
      title: "Advanced analytics & detailed spending reports",
    },
    {
      icon: <Palette className="w-5 h-5" />,
      title: "Custom event themes & personalization options",
    },
    {
      icon: <Camera className="w-5 h-5" />,
      title: "Enhanced photo storage with unlimited backup",
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "Exclusive venue deals & early bird tickets",
    },
    {
      icon: <Headset className="w-5 h-5" />,
      title: "Priority customer support",
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="absolute bottom-0 left-0 right-0 w-full h-[80vh] flex flex-col mx-0 p-0 max-w-none rounded-t-xl">
        <DialogHeader className="flex flex-row items-center justify-between p-4 border-b bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <DialogTitle className="flex items-center gap-2">
            <Crown className="w-6 h-6" />
            Enhance Your Event Experience
          </DialogTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
            <X className="w-4 h-4" />
          </Button>
        </DialogHeader>

        <div className="flex flex-col h-full overflow-y-auto">
          {/* Hero Section */}
          <div className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Premium Features</h2>
            <p className="text-muted-foreground">
              Unlock exclusive access to the best events in Barcelona with premium benefits.
            </p>
          </div>

          {/* Benefits */}
          <div className="p-6">
            <div className="grid grid-cols-1 gap-4">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-l-4 border-l-purple-500">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                        {benefit.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{benefit.title}</h4>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Pricing Plans */}
          <div className="p-6 border-t">
            <h3 className="text-lg font-semibold mb-4">Pricing</h3>
            <div className="space-y-3">
                <Card className="relative ring-2 ring-purple-500">
                  <Badge className="absolute -top-2 left-4 bg-purple-500 text-white">
                    Best Value
                  </Badge>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">Annual</h4>
                        <div className="flex items-baseline gap-1 mt-1">
                          <span className="text-2xl font-bold">$49.99</span>
                          <span className="text-sm text-muted-foreground">per year</span>
                        </div>
                          <p className="text-xs text-green-600 font-medium mt-1">Save 17%</p>
                      </div>
                      <Button className='bg-purple-500 hover:bg-purple-600' size="sm">
                        Choose Yearly
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card className="relative">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">Monthly</h4>
                        <div className="flex items-baseline gap-1 mt-1">
                          <span className="text-2xl font-bold">$4.99</span>
                          <span className="text-sm text-muted-foreground">per month</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Choose Monthly
                      </Button>
                    </div>
                  </CardContent>
                </Card>
            </div>
          </div>

          {/* Smart Savings */}
          <div className="p-6 border-t bg-gray-50">
            <h3 className="text-lg font-semibold mb-4">Smart Savings</h3>
            <p className="text-sm text-muted-foreground">
              Organize regularly? Save money through reduced payment fees and get exclusive perks!
            </p>
          </div>

          {/* CTA */}
          <div className="p-6 border-t">
            <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
              <Crown className="w-4 h-4 mr-2" />
              Start 7-Day Free Trial
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-2">
              Cancel anytime • All core features stay free
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 