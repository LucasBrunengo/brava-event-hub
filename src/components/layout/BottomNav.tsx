import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Plus, User, Map } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'events' | 'create' | 'profile' | 'map';
  onTabChange: (tab: 'events' | 'create' | 'profile' | 'map') => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around items-center">
        <Button
          variant={activeTab === 'events' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onTabChange('events')}
          className="flex flex-col items-center gap-1 h-auto py-2"
        >
          <Calendar className="w-5 h-5" />
          <span className="text-xs">Events</span>
        </Button>
        
        <Button
          variant={activeTab === 'create' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onTabChange('create')}
          className="flex flex-col items-center gap-1 h-auto py-2"
        >
          <Plus className="w-5 h-5" />
          <span className="text-xs">Create</span>
        </Button>
        
        <Button
          variant={activeTab === 'map' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onTabChange('map')}
          className="flex flex-col items-center gap-1 h-auto py-2"
        >
          <Map className="w-5 h-5" />
          <span className="text-xs">Map</span>
        </Button>
        
        <Button
          variant={activeTab === 'profile' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onTabChange('profile')}
          className="flex flex-col items-center gap-1 h-auto py-2"
        >
          <User className="w-5 h-5" />
          <span className="text-xs">Profile</span>
        </Button>
      </div>
    </div>
  );
};
