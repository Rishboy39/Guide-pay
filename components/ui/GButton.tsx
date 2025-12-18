'use client';

import React from 'react';

export interface GButtonProps {
  label: string;
  onPress: () => void;
  variant: 'primary' | 'secondary' | 'danger' | 'practice';
  size: 'large' | 'medium';
  disabled?: boolean;
  icon?: React.ReactNode;
  testID: string;
  className?: string;
}

const variantStyles = {
  primary: 'bg-primaryBlue text-white hover:bg-blue-700 active:bg-blue-800',
  secondary: 'bg-white border-2 border-primaryBlue text-primaryBlue hover:bg-blue-50 active:bg-blue-100',
  danger: 'bg-dangerRed text-white hover:bg-red-700 active:bg-red-800',
  practice: 'bg-practiceOrange text-white hover:bg-orange-600 active:bg-orange-700',
};

const sizeStyles = {
  large: 'text-large py-5 px-8',
  medium: 'text-medium py-5 px-8',
};

export const GButton: React.FC<GButtonProps> = ({
  label,
  onPress,
  variant,
  size,
  disabled = false,
  icon,
  testID,
  className = '',
}) => {
  const baseStyles = 'min-h-[64px] rounded-xl font-bold transition-colors duration-150 flex items-center justify-center gap-2 disabled:bg-disabledGray disabled:text-white disabled:cursor-not-allowed';
  
  return (
    <button
      onClick={onPress}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      data-testid={testID}
      aria-label={label}
      aria-disabled={disabled}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{label}</span>
    </button>
  );
};

