'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GHeader } from '@/components/ui/GHeader';
import { GCard } from '@/components/ui/GCard';
import { GButton } from '@/components/ui/GButton';
import { useTextSize } from '@/contexts/TextSizeContext';

export default function SettingsPage() {
  const router = useRouter();
  const { textSize, setTextSize } = useTextSize();
  const [highContrast, setHighContrast] = useState(false);

  return (
    <div className="min-h-screen bg-backgroundWhite pt-16 pb-24">
      <GHeader
        title="Settings"
        showBack={true}
        onBack={() => router.push('/home')}
      />

      <div className="px-4 py-8 max-w-2xl mx-auto">
        {/* Text Size */}
        <div className="mb-6">
          <h2 className="text-large font-bold mb-4">Text Size</h2>
          <div className="space-y-3">
            <GCard
              variant={textSize === 'default' ? 'highlighted' : 'default'}
              onPress={() => setTextSize('default')}
              testID="text-size-default"
            >
              <div className="text-center">
                <p className="text-medium font-bold mb-2">Default</p>
                <p className="text-medium">This is default text size</p>
              </div>
            </GCard>
            <GCard
              variant={textSize === 'larger' ? 'highlighted' : 'default'}
              onPress={() => setTextSize('larger')}
              testID="text-size-larger"
            >
              <div className="text-center">
                <p className="text-2xl font-bold mb-2">Larger</p>
                <p className="text-xl">This is larger text size</p>
              </div>
            </GCard>
            <GCard
              variant={textSize === 'largest' ? 'highlighted' : 'default'}
              onPress={() => setTextSize('largest')}
              testID="text-size-largest"
            >
              <div className="text-center">
                <p className="text-3xl font-bold mb-2">Largest</p>
                <p className="text-2xl">This is largest text size</p>
              </div>
            </GCard>
          </div>
        </div>

        {/* Display Settings */}
        <div className="mb-6">
          <h2 className="text-large font-bold mb-4">Display</h2>
          <GCard variant="default" testID="high-contrast-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-medium font-bold">High Contrast</p>
                <p className="text-small text-textSecondary">
                  Makes text easier to read
                </p>
              </div>
              <button
                onClick={() => setHighContrast(!highContrast)}
                className={`w-16 h-8 rounded-full transition-colors ${
                  highContrast ? 'bg-primaryBlue' : 'bg-gray-300'
                }`}
                aria-label="Toggle high contrast"
              >
                <div
                  className={`w-7 h-7 bg-white rounded-full transition-transform ${
                    highContrast ? 'translate-x-8' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </GCard>
        </div>

        {/* Account Settings */}
        <div className="mb-6">
          <h2 className="text-large font-bold mb-4">Account</h2>
          <div className="space-y-3">
            <GCard
              variant="default"
              onPress={() => alert('Edit profile')}
              testID="edit-profile-card"
            >
              <div className="flex items-center justify-between">
                <p className="text-medium font-bold">Edit Profile</p>
                <span>→</span>
              </div>
            </GCard>
            <GCard
              variant="default"
              onPress={() => alert('Change password')}
              testID="change-password-card"
            >
              <div className="flex items-center justify-between">
                <p className="text-medium font-bold">Change Password</p>
                <span>→</span>
              </div>
            </GCard>
          </div>
        </div>

        {/* Sign Out */}
        <GButton
          label="Sign Out"
          onPress={async () => {
            if (confirm('Are you sure you want to sign out?')) {
              try {
                await fetch('/api/auth/logout', { method: 'POST' });
                router.push('/login');
              } catch (error) {
                console.error('Logout error:', error);
                router.push('/login');
              }
            }
          }}
          variant="danger"
          size="large"
          testID="sign-out-btn"
        />
      </div>
    </div>
  );
}

