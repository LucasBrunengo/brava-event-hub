import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockVenues } from '@/data/mockData';
import { MapPin, Star, Navigation } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export const VenuesMap: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'restaurant' | 'wellness' | 'entertainment'>('all');
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  
  const filteredVenues = selectedCategory === 'all' 
    ? mockVenues 
    : mockVenues.filter(v => v.category === selectedCategory);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Create map centered on Barcelona
    map.current = L.map(mapContainer.current).setView([41.3851, 2.1734], 13);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map.current);

    // Fix marker icon issue with Leaflet
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  // Update markers when filtered venues change
  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add markers for filtered venues
    filteredVenues.forEach((venue) => {
      // Generate coordinates based on venue location (mock coordinates around Barcelona)
      const lat = 41.3851 + (Math.random() - 0.5) * 0.1;
      const lng = 2.1734 + (Math.random() - 0.5) * 0.1;

      const marker = L.marker([lat, lng]).addTo(map.current!);
      marker.bindPopup(`
        <div class="p-2">
          <h3 class="font-semibold">${venue.name}</h3>
          <p class="text-sm text-muted-foreground">${venue.category}</p>
          <p class="text-sm">${venue.distanceKm} km away</p>
        </div>
      `);
      markersRef.current.push(marker);
    });

    // Adjust map bounds to show all markers
    if (markersRef.current.length > 0) {
      const group = L.featureGroup(markersRef.current);
      map.current.fitBounds(group.getBounds().pad(0.1));
    }
  }, [filteredVenues]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'restaurant': return 'bg-blue-100 text-blue-700';
      case 'wellness': return 'bg-green-100 text-green-700';
      case 'entertainment': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex flex-col bg-gray-50" style={{ height: 'calc(100vh - 140px)' }}>
      <div className="p-4 border-b bg-background shrink-0">
        <h2 className="text-xl font-bold mb-3">Venues Map</h2>
        
        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('all')}
          >
            All
          </Button>
          <Button
            variant={selectedCategory === 'restaurant' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('restaurant')}
          >
            Food
          </Button>
          <Button
            variant={selectedCategory === 'wellness' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('wellness')}
          >
            Wellness
          </Button>
          <Button
            variant={selectedCategory === 'entertainment' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('entertainment')}
          >
            Entertainment
          </Button>
        </div>
      </div>

      {/* Interactive Map */}
      <div ref={mapContainer} className="h-52 border-b shrink-0 flex-none" />

      {/* Venues List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
        {filteredVenues.map((venue) => (
          <Card key={venue.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="flex gap-3">
                {venue.imageUrl && (
                  <div className="w-24 h-24 flex-shrink-0">
                    <img 
                      src={venue.imageUrl} 
                      alt={venue.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 py-3 pr-3 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-sm leading-tight truncate">{venue.name}</h3>
                    {venue.promoted && (
                      <Badge variant="secondary" className="text-xs flex-shrink-0">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>
                  <Badge className={`${getCategoryColor(venue.category)} text-xs mb-2`}>
                    {venue.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                    <Navigation className="w-3 h-3" />
                    <span>{venue.distanceKm} km away</span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1">{venue.address}</p>
                  {venue.cuisines && venue.cuisines.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {venue.cuisines.slice(0, 2).map((cuisine, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {cuisine}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
