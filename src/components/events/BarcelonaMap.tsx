import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, ExternalLink } from 'lucide-react';

interface BarcelonaMapProps {
  location: string;
  eventName: string;
}

export const BarcelonaMap: React.FC<BarcelonaMapProps> = ({ location, eventName }) => {
  const encodedLocation = encodeURIComponent(`${location}, Barcelona, Spain`);
  const encodedQuery = encodeURIComponent(`${eventName} ${location} Barcelona`);
  
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
  const appleMapsUrl = `http://maps.apple.com/?q=${encodedLocation}`;

  // Barcelona coordinates for different areas
  const getBarcelonaCoordinates = (location: string) => {
    const locations: { [key: string]: { lat: number; lng: number } } = {
      'sagrada familia': { lat: 41.4036, lng: 2.1744 },
      'park güell': { lat: 41.4145, lng: 2.1527 },
      'gothic quarter': { lat: 41.3829, lng: 2.1764 },
      'las ramblas': { lat: 41.3781, lng: 2.1751 },
      'barceloneta beach': { lat: 41.3755, lng: 2.1838 },
      'camp nou': { lat: 41.3809, lng: 2.1228 },
      'plaça catalunya': { lat: 41.3870, lng: 2.1700 },
      'eixample': { lat: 41.3888, lng: 2.1590 },
      'gracia': { lat: 41.4036, lng: 2.1588 }
    };
    
    const key = location.toLowerCase();
    return locations[key] || { lat: 41.3851, lng: 2.1734 }; // Default to Barcelona center
  };

  const coords = getBarcelonaCoordinates(location);

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <h3 className="font-semibold">Location in Barcelona</h3>
        </div>
        
        {/* Real Barcelona map using Google Maps Static API */}
        <div className="w-full h-40 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg mb-3 relative overflow-hidden">
          <iframe
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dw901NfPPvBAPY&q=${encodedLocation}&zoom=15&maptype=roadmap`}
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: '8px' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg"
          />
          <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm rounded px-2 py-1 text-xs font-medium">
            📍 {location}, Barcelona
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(googleMapsUrl, '_blank')}
            className="flex items-center gap-2"
          >
            <img 
              src="https://developers.google.com/static/maps/images/maps_logo_2x.png" 
              alt="Google Maps" 
              className="w-4 h-4 object-contain"
            />
            Google Maps
            <ExternalLink className="w-3 h-3" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(appleMapsUrl, '_blank')}
            className="flex items-center gap-2"
          >
            <img 
              src="https://developer.apple.com/design/human-interface-guidelines/technologies/maps/images/maps-app-icon_2x.png" 
              alt="Apple Maps" 
              className="w-4 h-4 object-contain"
            />
            Apple Maps
            <ExternalLink className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
