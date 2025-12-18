'use client';

import React from 'react';

export interface GCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'highlighted' | 'warning' | 'practice';
  onPress?: () => void;
  testID: string;
  className?: string;
}

const variantStyles = {
  default: 'bg-white border-gray-200',
  highlighted: 'bg-blue-50 border-primaryBlue',
  warning: 'bg-red-50 border-dangerRed',
  practice: 'bg-orange-50 border-practiceOrange',
};

export const GCard: React.FC<GCardProps> = ({
  children,
  variant = 'default',
  onPress,
  testID,
  className = '',
}) => {
  const baseStyles = 'p-4 rounded-xl border-2 shadow-sm';
  const interactiveStyles = onPress ? 'cursor-pointer hover:shadow-md transition-shadow' : '';

  const Component = onPress ? 'button' : 'div';
  
  return (
    <Component
      onClick={onPress}
      className={`${baseStyles} ${variantStyles[variant]} ${interactiveStyles} ${className}`}
      data-testid={testID}
      aria-label={onPress ? 'Card button' : undefined}
    >
      {children}
      {onPress && (
        <div className="flex justify-end mt-2">
          <span className="text-primaryBlue text-large">→</span>
        </div>
      )}
    </Component>
  );
};

