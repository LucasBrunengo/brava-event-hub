import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

interface EventMapProps {
  location: string;
}

const locationCoordinates: Record<string, { lat: number; lon: number; zoom: number }> = {
  'Barceloneta Beach': { lat: 41.3784, lon: 2.1883, zoom: 15 },
  'Parc del Fòrum': { lat: 41.4125, lon: 2.2200, zoom: 16 },
  'Gothic Quarter, Barcelona': { lat: 41.3825, lon: 2.1764, zoom: 16 },
  'Sutton Club, Barcelona': { lat: 41.3960, lon: 2.1485, zoom: 17 },
  'Nova Icaria Beach': { lat: 41.3934, lon: 2.2023, zoom: 16 },
  'Palau Sant Jordi': { lat: 41.3639, lon: 2.1528, zoom: 16 },
  'Razzmatazz Club': { lat: 41.4036, lon: 2.1913, zoom: 17 },
  'Fira Barcelona': { lat: 41.3738, lon: 2.1498, zoom: 15 },
  'Secret Location (revealed 24h before)': { lat: 41.3874, lon: 2.1686, zoom: 14 } // Centered on Barcelona
};

export const EventMap: React.FC<EventMapProps> = ({ location }) => {
  const coords = locationCoordinates[location] || locationCoordinates['Secret Location (revealed 24h before)'];
  const bbox = `${coords.lon - 0.01},${coords.lat - 0.01},${coords.lon + 0.01},${coords.lat + 0.01}`;
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${coords.lat},${coords.lon}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <MapPin className="w-5 h-5" />
          Location
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-64 rounded-lg overflow-hidden border">
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            src={mapUrl}
          ></iframe>
        </div>
        <p className="text-center mt-2 text-muted-foreground">{location}</p>
      </CardContent>
    </Card>
  );
};
