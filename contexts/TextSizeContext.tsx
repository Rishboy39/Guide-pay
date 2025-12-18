'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type TextSize = 'default' | 'larger' | 'largest';

interface TextSizeContextType {
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
}

const TextSizeContext = createContext<TextSizeContextType | undefined>(undefined);

export function TextSizeProvider({ children }: { children: React.ReactNode }) {
  const [textSize, setTextSizeState] = useState<TextSize>('default');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load from localStorage on mount
    const saved = localStorage.getItem('guidepay_textSize') as TextSize;
    if (saved && ['default', 'larger', 'largest'].includes(saved)) {
      setTextSizeState(saved);
      // Apply immediately to prevent flash
      document.documentElement.setAttribute('data-text-size', saved);
    } else {
      // Set default
      document.documentElement.setAttribute('data-text-size', 'default');
    }
    setMounted(true);
  }, []);

  const setTextSize = (size: TextSize) => {
    setTextSizeState(size);
    localStorage.setItem('guidepay_textSize', size);
    // Apply to document root for CSS variables immediately
    document.documentElement.setAttribute('data-text-size', size);
  };

  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute('data-text-size', textSize);
    }
  }, [textSize, mounted]);

  return (
    <TextSizeContext.Provider value={{ textSize, setTextSize }}>
      {children}
    </TextSizeContext.Provider>
  );
}

export function useTextSize() {
  const context = useContext(TextSizeContext);
  if (context === undefined) {
    throw new Error('useTextSize must be used within a TextSizeProvider');
  }
  return context;
}

