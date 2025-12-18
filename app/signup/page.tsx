'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GButton } from '@/components/ui/GButton';
import { GInput } from '@/components/ui/GInput';
import { GHeader } from '@/components/ui/GHeader';
import { GCard } from '@/components/ui/GCard';

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      
      if (data.success) {
        router.push('/home');
      } else {
        setError(data.error || 'Sign up failed');
      }
    } catch (error) {
      console.error('Sign up error:', error);
      setError('Sign up failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-backgroundWhite pt-16 pb-24">
      <GHeader
        title="Sign Up"
        showBack={true}
        onBack={() => router.push('/')}
      />

      <div className="max-w-md mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Create Account</h1>
          <p className="text-large text-textSecondary">
            Sign up to start using GuidePay
          </p>
        </div>

        <form onSubmit={handleSignUp}>
          <div className="space-y-4 mb-6">
            <GInput
              label="Full Name"
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              keyboardType="default"
              testID="name-input"
            />

            <GInput
              label="Email address"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email"
              testID="email-input"
            />

            <GInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter password (min 4 characters)"
              keyboardType="default"
              secureTextEntry={true}
              testID="password-input"
            />

            <GInput
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm your password"
              keyboardType="default"
              secureTextEntry={true}
              testID="confirm-password-input"
            />
          </div>

          {error && (
            <GCard variant="warning" testID="error-card" className="mb-4">
              <p className="text-medium text-dangerRed">{error}</p>
            </GCard>
          )}

          <GButton
            label={loading ? 'Creating Account...' : 'Sign Up'}
            onPress={() => {}}
            variant="primary"
            size="large"
            testID="signup-btn"
            disabled={loading}
            className="w-full"
          />
        </form>

        <div className="mt-8 text-center">
          <p className="text-medium text-textSecondary">
            Already have an account?{' '}
            <button
              onClick={() => router.push('/login')}
              className="text-primaryBlue font-bold hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

