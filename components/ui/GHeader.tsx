'use client';

import React from 'react';

export interface GHeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: {
    icon: React.ReactNode;
    onPress: () => void;
    label: string;
  };
}

export const GHeader: React.FC<GHeaderProps> = ({
  title,
  showBack = false,
  onBack,
  rightAction,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b-2 border-gray-200 z-50 flex items-center justify-between px-4">
      <div className="flex items-center gap-4 flex-1">
        {showBack && onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-medium font-bold text-primaryBlue hover:text-blue-700 min-h-[64px] px-2"
            aria-label="Go back"
          >
            <span>←</span>
            <span>Back</span>
          </button>
        )}
      </div>
      
      <h1 className="text-large font-bold text-center flex-1">
        {title}
      </h1>
      
      <div className="flex items-center justify-end flex-1">
        {rightAction && (
          <button
            onClick={rightAction.onPress}
            className="flex items-center gap-2 text-medium font-bold text-primaryBlue hover:text-blue-700 min-h-[64px] px-2"
            aria-label={rightAction.label}
          >
            {rightAction.icon}
            <span>{rightAction.label}</span>
          </button>
        )}
      </div>
    </header>
  );
};

