'use client';

import React from 'react';

export interface GBottomNavProps {
  currentTab: 'home' | 'send' | 'practice' | 'family';
  onTabChange: (tab: 'home' | 'send' | 'practice' | 'family') => void;
}

const tabs = [
  { id: 'home' as const, label: 'Home', icon: '🏠' },
  { id: 'send' as const, label: 'Send', icon: '💵' },
  { id: 'practice' as const, label: 'Practice', icon: '🎓' },
  { id: 'family' as const, label: 'Family', icon: '👨‍👩‍👧‍👦' },
];

export const GBottomNav: React.FC<GBottomNavProps> = ({
  currentTab,
  onTabChange,
}) => {
  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t-2 border-gray-200 flex items-center justify-around z-50"
      role="navigation"
      aria-label="Main navigation"
    >
      {tabs.map((tab) => {
        const isActive = currentTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex flex-col items-center justify-center gap-1 min-h-[64px] px-4 py-2
              ${isActive ? 'text-primaryBlue font-bold' : 'text-textSecondary'}
              hover:text-primaryBlue transition-colors
            `}
            aria-label={tab.label}
            aria-current={isActive ? 'page' : undefined}
          >
            <span className="text-large">{tab.icon}</span>
            <span className="text-small">{tab.label}</span>
            {isActive && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-primaryBlue" />
            )}
          </button>
        );
      })}
    </nav>
  );
};

