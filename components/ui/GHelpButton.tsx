'use client';

import React from 'react';

export interface GHelpButtonProps {
  onPress: () => void;
}

export const GHelpButton: React.FC<GHelpButtonProps> = ({ onPress }) => {
  return (
    <button
      onClick={onPress}
      className="fixed top-4 right-4 w-16 h-16 bg-dangerRed text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 active:bg-red-800 z-50 transition-colors"
      aria-label="Get help"
      title="Help"
    >
      <span className="text-large">📞</span>
      <span className="sr-only">Help</span>
    </button>
  );
};

