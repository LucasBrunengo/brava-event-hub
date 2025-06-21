
import React from 'react';
import { Calendar, User, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomNavProps {
  activeTab: 'events' | 'create' | 'profile';
  onTabChange: (tab: 'events' | 'create' | 'profile') => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'events' as const, label: 'Events', icon: Calendar },
    { id: 'create' as const, label: 'Create', icon: Plus },
    { id: 'profile' as const, label: 'Profile', icon: User },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-border">
      <div className="px-4 py-2 safe-area-bottom">
        <nav className="flex justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const isCreate = tab.id === 'create';

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  'flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-200',
                  isCreate
                    ? 'brava-gradient text-white shadow-lg hover:scale-105'
                    : isActive
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Icon className={cn('w-5 h-5', isCreate && 'w-6 h-6')} />
                <span
                  className={cn(
                    'text-xs font-medium',
                    isCreate ? 'text-white' : isActive ? 'text-primary' : 'text-muted-foreground'
                  )}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
