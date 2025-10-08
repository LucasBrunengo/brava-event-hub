import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockVenues } from '@/data/mockData';
import { MapPin, Star, Navigation } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const VenuesMap: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'restaurant' | 'wellness' | 'entertainment'>('all');
  
  const filteredVenues = selectedCategory === 'all' 
    ? mockVenues 
    : mockVenues.filter(v => v.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'restaurant': return 'bg-blue-100 text-blue-700';
      case 'wellness': return 'bg-green-100 text-green-700';
      case 'entertainment': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex flex-col bg-gray-50 h-full">
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

      {/* Map Placeholder */}
      <div className="relative h-48 bg-muted border-b shrink-0">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-2">
            <MapPin className="w-12 h-12 mx-auto text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Interactive Map</p>
            <p className="text-xs text-muted-foreground">{filteredVenues.length} venues nearby</p>
          </div>
        </div>
        {/* Simulated pins */}
        <div className="absolute top-12 left-16 w-6 h-6 bg-primary rounded-full border-3 border-white shadow-lg animate-bounce" />
        <div className="absolute top-20 right-24 w-6 h-6 bg-primary rounded-full border-3 border-white shadow-lg" />
        <div className="absolute bottom-8 left-1/3 w-6 h-6 bg-primary rounded-full border-3 border-white shadow-lg" />
      </div>

      {/* Venues List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
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
