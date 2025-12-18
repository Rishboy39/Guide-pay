'use client';

import React, { useState } from 'react';

export interface GInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  keyboardType?: 'default' | 'numeric' | 'email' | 'phone';
  error?: string;
  helpText?: string;
  secureTextEntry?: boolean;
  maxLength?: number;
  testID: string;
  className?: string;
}

export const GInput: React.FC<GInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  error,
  helpText,
  secureTextEntry = false,
  maxLength,
  testID,
  className = '',
}) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const inputTypes: Record<string, string> = {
    numeric: 'number',
    email: 'email',
    phone: 'tel',
    default: secureTextEntry ? (showPassword ? 'text' : 'password') : 'text',
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label 
        htmlFor={testID}
        className="text-medium font-bold text-textPrimary"
        aria-required={true}
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={testID}
          type={keyboardType === 'default' ? (secureTextEntry ? (showPassword ? 'text' : 'password') : 'text') : inputTypes[keyboardType]}
          value={value}
          onChange={(e) => onChangeText(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`
            w-full min-h-[56px] px-4 py-3 text-medium rounded-xl border-2
            ${error ? 'border-dangerRed' : 'border-gray-300'}
            focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:border-primaryBlue
            disabled:bg-disabledGray disabled:cursor-not-allowed
          `}
          data-testid={testID}
          aria-label={label}
          aria-invalid={!!error}
          aria-describedby={error ? `${testID}-error` : helpText ? `${testID}-help` : undefined}
        />
        {value && (
          <button
            type="button"
            onClick={() => onChangeText('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-textSecondary hover:text-textPrimary"
            aria-label="Clear input"
          >
            ✕
          </button>
        )}
        {secureTextEntry && value && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-12 top-1/2 -translate-y-1/2 text-textSecondary hover:text-textPrimary"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        )}
      </div>
      {error && (
        <p 
          id={`${testID}-error`}
          className="text-medium text-dangerRed"
          role="alert"
        >
          {error}
        </p>
      )}
      {helpText && !error && (
        <p 
          id={`${testID}-help`}
          className="text-medium text-textSecondary"
        >
          {helpText}
        </p>
      )}
    </div>
  );
};

