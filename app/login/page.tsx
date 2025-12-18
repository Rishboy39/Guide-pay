'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GButton } from '@/components/ui/GButton';
import { GInput } from '@/components/ui/GInput';
import { GHeader } from '@/components/ui/GHeader';
import { GCard } from '@/components/ui/GCard';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (data.success) {
        router.push('/home');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'demo@guidepay.com', password: 'demo123' }),
      });

      const data = await response.json();
      if (data.success) {
        router.push('/home');
      } else {
        setError(data.error || 'Demo login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Demo login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-backgroundWhite pt-16 pb-24">
      <GHeader
        title="Sign In"
        showBack={true}
        onBack={() => router.push('/')}
      />

      <div className="max-w-md mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
          <p className="text-large text-textSecondary">
            Sign in to your GuidePay account
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="space-y-4 mb-6">
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
              placeholder="Enter your password"
              keyboardType="default"
              secureTextEntry={true}
              testID="password-input"
            />
          </div>

          {error && (
            <GCard variant="warning" testID="error-card" className="mb-4">
              <p className="text-medium text-dangerRed">{error}</p>
            </GCard>
          )}

          <button
            type="submit"
            className="w-full min-h-[64px] rounded-xl font-bold transition-colors duration-150 flex items-center justify-center gap-2 bg-primaryBlue text-white hover:bg-blue-700 active:bg-blue-800 disabled:bg-disabledGray disabled:text-white disabled:cursor-not-allowed text-large py-5 px-8 mb-4"
            disabled={loading || !email || !password}
            data-testid="login-btn"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Demo Account */}
        <div className="mb-6">
          <GCard variant="highlighted" testID="demo-card">
            <div className="text-center">
              <p className="text-medium font-bold mb-2">Try Demo Account</p>
              <p className="text-small text-textSecondary mb-4">
                Email: demo@guidepay.com<br />
                Password: demo123
              </p>
              <GButton
                label={loading ? 'Loading...' : 'Use Demo Account'}
                onPress={handleDemoLogin}
                variant="secondary"
                size="medium"
                testID="demo-login-btn"
                disabled={loading}
                className="w-full"
              />
            </div>
          </GCard>
        </div>

        <div className="mt-8 text-center">
          <p className="text-medium text-textSecondary">
            Don't have an account?{' '}
            <button
              onClick={() => router.push('/signup')}
              className="text-primaryBlue font-bold hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

