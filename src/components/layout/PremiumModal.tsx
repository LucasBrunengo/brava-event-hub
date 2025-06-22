import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { X, Star, Crown, Zap, Shield, Gift, Users, Calendar, MapPin } from 'lucide-react';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PremiumModal: React.FC<PremiumModalProps> = ({ isOpen, onClose }) => {
  const benefits = [
    {
      icon: <Crown className="w-5 h-5" />,
      title: "Premium Events",
      description: "Access to exclusive events and early bird tickets"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Priority Booking",
      description: "Skip the queue and book tickets before anyone else"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Secure Payments",
      description: "Advanced fraud protection and secure transactions"
    },
    {
      icon: <Gift className="w-5 h-5" />,
      title: "Exclusive Rewards",
      description: "Get cashback and rewards on every purchase"
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "VIP Support",
      description: "24/7 dedicated customer support"
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      title: "Advanced Analytics",
      description: "Track your spending and event history"
    }
  ];

  const plans = [
    {
      name: "Monthly",
      price: "€9.99",
      period: "per month",
      popular: false,
      savings: null
    },
    {
      name: "Annual",
      price: "€99.99",
      period: "per year",
      popular: true,
      savings: "Save €19.89"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-full w-full max-h-[80vh] overflow-hidden mx-0 p-0">
        <DialogHeader className="flex flex-row items-center justify-between p-4 border-b bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <DialogTitle className="flex items-center gap-2">
            <Crown className="w-6 h-6" />
            Brava Premium
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
            <h2 className="text-2xl font-bold mb-2">Unlock Premium Features</h2>
            <p className="text-muted-foreground">
              Get exclusive access to the best events in Barcelona with premium benefits
            </p>
          </div>

          {/* Benefits */}
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Premium Benefits</h3>
            <div className="grid grid-cols-1 gap-4">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-l-4 border-l-purple-500">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                        {benefit.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{benefit.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{benefit.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Pricing Plans */}
          <div className="p-6 border-t">
            <h3 className="text-lg font-semibold mb-4">Choose Your Plan</h3>
            <div className="space-y-3">
              {plans.map((plan, index) => (
                <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-purple-500' : ''}`}>
                  {plan.popular && (
                    <Badge className="absolute -top-2 left-4 bg-purple-500 text-white">
                      Most Popular
                    </Badge>
                  )}
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{plan.name}</h4>
                        <div className="flex items-baseline gap-1 mt-1">
                          <span className="text-2xl font-bold">{plan.price}</span>
                          <span className="text-sm text-muted-foreground">{plan.period}</span>
                        </div>
                        {plan.savings && (
                          <p className="text-xs text-green-600 font-medium mt-1">{plan.savings}</p>
                        )}
                      </div>
                      <Button 
                        className={plan.popular ? 'bg-purple-500 hover:bg-purple-600' : ''}
                        size="sm"
                      >
                        {plan.popular ? 'Get Premium' : 'Choose Plan'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Features Comparison */}
          <div className="p-6 border-t bg-gray-50">
            <h3 className="text-lg font-semibold mb-4">What's Included</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Event Discovery</span>
                <div className="flex gap-2">
                  <span className="text-xs text-muted-foreground">Free</span>
                  <Star className="w-4 h-4 text-purple-500" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Priority Booking</span>
                <div className="flex gap-2">
                  <span className="text-xs text-muted-foreground">Free</span>
                  <Star className="w-4 h-4 text-purple-500" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Exclusive Events</span>
                <div className="flex gap-2">
                  <span className="text-xs text-muted-foreground">Free</span>
                  <Star className="w-4 h-4 text-purple-500" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Cashback Rewards</span>
                <div className="flex gap-2">
                  <span className="text-xs text-muted-foreground">Free</span>
                  <Star className="w-4 h-4 text-purple-500" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">VIP Support</span>
                <div className="flex gap-2">
                  <span className="text-xs text-muted-foreground">Free</span>
                  <Star className="w-4 h-4 text-purple-500" />
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="p-6 border-t">
            <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
              <Crown className="w-4 h-4 mr-2" />
              Start Premium Trial
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-2">
              7-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 