import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Navigation } from 'lucide-react';

interface EventMapProps {
  location: string;
  address?: string;
}

export const EventMap: React.FC<EventMapProps> = ({ location, address }) => {
  // Generate a simple map using OpenStreetMap tiles
  const getMapUrl = (location: string) => {
    // Encode the location for the URL
    const encodedLocation = encodeURIComponent(location);
    // Use OpenStreetMap with a simple tile server
    return `https://tile.openstreetmap.org/13/4096/2724.png`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <MapPin className="w-5 h-5" />
          Location
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Map Placeholder */}
        <div className="relative w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-blue-500 mx-auto mb-2" />
              <p className="font-medium text-gray-700">{location}</p>
              {address && (
                <p className="text-sm text-gray-600 mt-1">{address}</p>
              )}
            </div>
          </div>
          
          {/* Map Grid Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-8 grid-rows-6 h-full">
              {Array.from({ length: 48 }).map((_, i) => (
                <div key={i} className="border border-gray-300"></div>
              ))}
            </div>
          </div>
          
          {/* Location Pin */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-500 mx-auto mt-1"></div>
          </div>
        </div>

        {/* Location Details */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="font-medium">{location}</span>
          </div>
          {address && (
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">{address}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
            Get Directions
          </button>
          <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
            Share Location
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
