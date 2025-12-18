'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GHeader } from '@/components/ui/GHeader';
import { GHelpButton } from '@/components/ui/GHelpButton';
import { GBottomNav } from '@/components/ui/GBottomNav';
import { GCard } from '@/components/ui/GCard';
import { GButton } from '@/components/ui/GButton';
import { GInput } from '@/components/ui/GInput';

interface Helper {
  id: string;
  name: string;
  email: string;
  role: 'support' | 'family' | 'custom';
  icon: string;
  description: string;
}

const presetHelpers: Helper[] = [
  {
    id: 'support',
    name: 'Support Agent',
    email: 'support@guidepay.com',
    role: 'support',
    icon: '🆘',
    description: 'Get help from our support team',
  },
  {
    id: 'family',
    name: 'Family Member',
    email: 'family@guidepay.com',
    role: 'family',
    icon: '👨‍👩‍👧‍👦',
    description: 'Contact your family (last resort)',
  },
];

export default function FamilyPage() {
  const router = useRouter();
  const [isCoPilotActive, setIsCoPilotActive] = useState(false);
  const [selectedHelper, setSelectedHelper] = useState<Helper | null>(null);
  const [customEmail, setCustomEmail] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentHelperEmail, setCurrentHelperEmail] = useState('');

  useEffect(() => {
    checkCoPilotStatus();
  }, []);

  const checkCoPilotStatus = async () => {
    try {
      const response = await fetch('/api/copilot/status');
      if (response.ok) {
        const data = await response.json();
        if (data.session && data.session.active) {
          setIsCoPilotActive(true);
          setCurrentHelperEmail(data.session.helperEmail);
        }
      }
    } catch (error) {
      console.error('Error checking co-pilot status:', error);
    }
  };

  const handleRequestCoPilot = async (helperEmail: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/copilot/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ helperEmail }),
      });

      const data = await response.json();
      if (data.success) {
        setIsCoPilotActive(true);
        setCurrentHelperEmail(helperEmail);
      } else {
        alert('Failed to start co-pilot: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error starting co-pilot:', error);
      alert('Failed to start co-pilot. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectHelper = (helper: Helper) => {
    setSelectedHelper(helper);
    handleRequestCoPilot(helper.email);
  };

  const handleCustomEmail = () => {
    if (!customEmail) {
      alert('Please enter an email address');
      return;
    }
    handleRequestCoPilot(customEmail);
  };

  const handleEndCoPilot = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/copilot/end', {
        method: 'POST',
      });

      const data = await response.json();
      if (data.success) {
        setIsCoPilotActive(false);
        setSelectedHelper(null);
        setCurrentHelperEmail('');
        setCustomEmail('');
        setShowEmailInput(false);
      } else {
        alert('Failed to end co-pilot: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error ending co-pilot:', error);
      alert('Failed to end co-pilot. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-backgroundWhite pt-16 pb-24">
      <GHeader
        title="Family Helper"
        showBack={true}
        onBack={() => router.push('/home')}
      />
      <GHelpButton onPress={() => router.push('/help')} />

      <div className="px-4 py-8 max-w-2xl mx-auto">
        {!isCoPilotActive ? (
          <>
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">👨‍👩‍👧‍👦</div>
              <h2 className="text-large font-bold mb-2">Get Help</h2>
              <p className="text-medium text-textSecondary">
                Choose someone to help guide you through any transaction
              </p>
            </div>

            <GCard variant="highlighted" testID="copilot-info" className="mb-6">
              <div className="space-y-3">
                <h3 className="text-medium font-bold">How it works:</h3>
                <ul className="space-y-2 text-medium text-textSecondary">
                  <li>• Your helper sees your screen</li>
                  <li>• They can send visual guidance cues</li>
                  <li>• You stay in control - you press the buttons</li>
                  <li>• They guide, never control</li>
                </ul>
              </div>
            </GCard>

            <div className="space-y-4 mb-6">
              <h3 className="text-medium font-bold mb-3">Choose a Helper</h3>
              
              {/* Preset Helpers */}
              {presetHelpers.map((helper) => (
                <GCard
                  key={helper.id}
                  variant={selectedHelper?.id === helper.id ? 'highlighted' : 'default'}
                  onPress={() => handleSelectHelper(helper)}
                  testID={`helper-${helper.id}`}
                  className="cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">{helper.icon}</div>
                    <div className="flex-1">
                      <h4 className="text-medium font-bold mb-1">{helper.name}</h4>
                      <p className="text-small text-textSecondary">{helper.description}</p>
                    </div>
                    {helper.role === 'family' && (
                      <span className="text-small text-practiceOrange font-bold">Last Resort</span>
                    )}
                  </div>
                </GCard>
              ))}

              {/* Custom Email Option */}
              {!showEmailInput ? (
                <GCard
                  variant="default"
                  onPress={() => setShowEmailInput(true)}
                  testID="custom-email-card"
                  className="cursor-pointer border-2 border-dashed border-gray-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">✉️</div>
                    <div className="flex-1">
                      <h4 className="text-medium font-bold mb-1">Enter Custom Email</h4>
                      <p className="text-small text-textSecondary">Use a different email address</p>
                    </div>
                  </div>
                </GCard>
              ) : (
                <GCard variant="default" testID="email-input-card" className="border-2 border-primaryBlue">
                  <div className="space-y-4">
                    <GInput
                      label="Email address"
                      value={customEmail}
                      onChangeText={setCustomEmail}
                      placeholder="Enter email address"
                      keyboardType="email"
                      testID="custom-email-input"
                    />
                    <div className="flex gap-3">
                      <GButton
                        label="Start Help"
                        onPress={handleCustomEmail}
                        variant="primary"
                        size="medium"
                        testID="start-custom-email-btn"
                        disabled={!customEmail || loading}
                        className="flex-1"
                      />
                      <GButton
                        label="Cancel"
                        onPress={() => {
                          setShowEmailInput(false);
                          setCustomEmail('');
                        }}
                        variant="secondary"
                        size="medium"
                        testID="cancel-email-btn"
                        className="flex-1"
                      />
                    </div>
                  </div>
                </GCard>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">👁️</div>
              <h2 className="text-large font-bold mb-2 text-primaryGreen">
                Co-Pilot Active
              </h2>
              <p className="text-medium text-textSecondary">
                Your family member can now see your screen and guide you
              </p>
            </div>

            <GCard variant="highlighted" testID="copilot-active" className="mb-6">
              <div className="space-y-4">
                <div>
                  <p className="text-medium text-textSecondary">Helper</p>
                  <p className="text-large font-bold">
                    {presetHelpers.find(h => h.email === currentHelperEmail)?.name || currentHelperEmail}
                  </p>
                  <p className="text-small text-textSecondary mt-1">{currentHelperEmail}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primaryGreen rounded-full animate-pulse" />
                  <p className="text-medium text-primaryGreen">Connected</p>
                </div>
              </div>
            </GCard>

            <GCard variant="default" testID="copilot-guidance" className="mb-6">
              <div className="space-y-3">
                <h3 className="text-medium font-bold">Guidance cues will appear here:</h3>
                <div className="bg-gray-100 p-4 rounded-lg min-h-[200px] flex items-center justify-center">
                  <p className="text-medium text-textSecondary">
                    Waiting for guidance from {presetHelpers.find(h => h.email === currentHelperEmail)?.name || currentHelperEmail}...
                  </p>
                </div>
              </div>
            </GCard>

            <GButton
              label={loading ? 'Ending...' : 'End Co-Pilot Session'}
              onPress={handleEndCoPilot}
              variant="danger"
              size="large"
              testID="end-copilot-btn"
              disabled={loading}
            />
          </>
        )}
      </div>

      <GBottomNav currentTab="family" onTabChange={(tab) => {
        if (tab === 'home') router.push('/home');
        else if (tab === 'send') router.push('/send');
        else if (tab === 'practice') router.push('/practice');
      }} />
    </div>
  );
}

