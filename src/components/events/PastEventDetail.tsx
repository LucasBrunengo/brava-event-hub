
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Calendar, MapPin, User, Camera, Users } from 'lucide-react';
import { Event } from '@/types';
import { format } from 'date-fns';
import { BarcelonaMap } from './BarcelonaMap';

interface PastEventDetailProps {
  event: Event;
  onBack: () => void;
}

export const PastEventDetail: React.FC<PastEventDetailProps> = ({ event, onBack }) => {
  const whoWent = event.attendees.filter(a => a.status === 'going');
  
  const eventPhotos = event.photos || [
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=300&fit=crop'
  ];

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{event.name}</h1>
          <p className="text-muted-foreground">Organized by {event.organizer.name}</p>
        </div>
        <Badge className="bg-gray-100 text-gray-800">
          Past Event
        </Badge>
      </div>

      {/* Event Info */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <p className="text-foreground">{event.description}</p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{format(new Date(event.date), 'EEEE, MMMM d, yyyy')} at {event.time}</span>
              </div>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{event.location}</span>
              </div>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="w-4 h-4" />
                <span>Organized by {event.organizer.name}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Map */}
      <BarcelonaMap location={event.location} eventName={event.name} />

      {/* Who Went */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="w-5 h-5" />
            Who Went ({whoWent.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {whoWent.map((attendee) => (
              <div key={attendee.userId} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={attendee.user.avatar} />
                    <AvatarFallback>
                      {attendee.user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{attendee.user.name}</span>
                      {event.organizerId === attendee.userId && (
                        <Badge variant="outline" className="text-xs">Organizer</Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Had a great time! 🎉
                    </div>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  Attended
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Event Photos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Event Photos ({eventPhotos.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {eventPhotos.map((photo, index) => (
              <div key={index} className="relative group">
                <img
                  src={photo}
                  alt={`${event.name} photo ${index + 1}`}
                  className="aspect-square object-cover rounded-lg transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-lg" />
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              📸 Memories from {format(new Date(event.date), 'MMM d, yyyy')}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
