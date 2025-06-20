
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';

interface CreateEventFormProps {
  onBack: () => void;
  onEventCreated: () => void;
}

export const CreateEventForm: React.FC<CreateEventFormProps> = ({ onBack, onEventCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    time: '',
    location: '',
    hasExpenseSplitting: false,
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const { createEvent } = useApp();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      hasExpenseSplitting: checked,
    }));
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!formData.name || !formData.description) {
        toast({
          title: 'Missing Information',
          description: 'Please fill in the event name and description.',
          variant: 'destructive',
        });
        return;
      }
    }
    setCurrentStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.date || !formData.time || !formData.location) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      createEvent(formData);
      toast({
        title: 'Event Created!',
        description: 'Your event has been created successfully.',
      });
      onEventCreated();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create event. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Create New Event</h1>
          <p className="text-muted-foreground">Step {currentStep} of 2</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className="brava-gradient h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / 2) * 100}%` }}
        ></div>
      </div>

      <form onSubmit={handleSubmit}>
        {currentStep === 1 ? (
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
              <CardDescription>
                Tell us about your event
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Event Name *</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Beach House Weekend"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Annual summer getaway with the gang! Bring sunscreen and good vibes."
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  required
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <Label>Expense Splitting</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable bill splitting for this event
                  </p>
                </div>
                <Switch
                  checked={formData.hasExpenseSplitting}
                  onCheckedChange={handleSwitchChange}
                />
              </div>

              <Button 
                type="button" 
                onClick={handleNextStep}
                className="w-full brava-gradient hover:opacity-90"
              >
                Continue
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>When & Where</CardTitle>
              <CardDescription>
                Set the date, time, and location
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time *</Label>
                  <Input
                    id="time"
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="Malibu Beach House, CA"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Preview */}
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Event Preview</h4>
                <div className="space-y-1 text-sm">
                  <p><strong>{formData.name}</strong></p>
                  <p className="text-muted-foreground">{formData.description}</p>
                  <p>📅 {formData.date} at {formData.time}</p>
                  <p>📍 {formData.location}</p>
                  {formData.hasExpenseSplitting && (
                    <p>💰 Expense splitting enabled</p>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setCurrentStep(1)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button 
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 brava-gradient hover:opacity-90"
                >
                  {isLoading ? 'Creating...' : 'Create Event'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </form>
    </div>
  );
};
