
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, ExternalLink } from 'lucide-react';

interface EventMapProps {
  location: string;
  eventName: string;
}

export const EventMap: React.FC<EventMapProps> = ({ location, eventName }) => {
  const encodedLocation = encodeURIComponent(location);
  const encodedQuery = encodeURIComponent(`${eventName} ${location}`);
  
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
  const appleMapsUrl = `http://maps.apple.com/?q=${encodedLocation}`;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <h3 className="font-semibold">Location</h3>
        </div>
        
        {/* Mock map placeholder */}
        <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg mb-3 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>
          </div>
          <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm rounded px-2 py-1 text-xs font-medium">
            {location}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(googleMapsUrl, '_blank')}
            className="flex items-center gap-2"
          >
            <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-green-500 rounded-sm flex items-center justify-center text-white text-xs font-bold">
              G
            </div>
            Google Maps
            <ExternalLink className="w-3 h-3" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(appleMapsUrl, '_blank')}
            className="flex items-center gap-2"
          >
            <div className="w-4 h-4 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-sm flex items-center justify-center text-white text-xs font-bold">
              
            </div>
            Apple Maps
            <ExternalLink className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
