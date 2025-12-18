'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GButton } from '@/components/ui/GButton';
import { GInput } from '@/components/ui/GInput';
import { GHeader } from '@/components/ui/GHeader';
import { GCard } from '@/components/ui/GCard';
import { useTextSize } from '@/contexts/TextSizeContext';

const onboardingSteps = [
  {
    step: 1,
    title: 'Welcome to GuidePay',
    content: "We're here to help you handle money safely online",
    visual: '👋',
  },
  {
    step: 2,
    title: "Let's make text easier to read",
    content: 'Choose the size that is comfortable for you',
    visual: '📖',
  },
  {
    step: 3,
    title: 'Set up quick sign-in',
    content: 'Use your face or fingerprint to sign in securely',
    visual: '🔐',
  },
  {
    step: 4,
    title: 'Invite a family helper',
    content: 'A family member can help guide you when you need it',
    visual: '👨‍👩‍👧‍👦',
  },
  {
    step: 5,
    title: "Let's practice first",
    content: 'Try sending fake money to learn how it works',
    visual: '🎓',
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { textSize, setTextSize } = useTextSize();
  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState('');

  const handleNext = async () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding - create account if email provided
      if (email) {
        try {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, name: email.split('@')[0] }),
          });
          const data = await response.json();
          if (data.success) {
            router.push('/home');
          } else {
            alert('Failed to create account: ' + (data.error || 'Unknown error'));
          }
        } catch (error) {
          console.error('Onboarding error:', error);
          alert('Failed to create account. Please try again.');
        }
      } else {
        router.push('/home');
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      router.push('/');
    }
  };

  const renderStepContent = () => {
    const step = onboardingSteps[currentStep];

    switch (currentStep) {
      case 0:
        return (
          <div className="text-center">
            <div className="text-8xl mb-8">{step.visual}</div>
            <h2 className="text-4xl font-bold mb-4">{step.title}</h2>
            <p className="text-large text-textSecondary mb-8">{step.content}</p>
          </div>
        );

      case 1:
        return (
          <div className="text-center">
            <div className="text-8xl mb-8">{step.visual}</div>
            <h2 className="text-4xl font-bold mb-4">{step.title}</h2>
            <p className="text-large text-textSecondary mb-8">{step.content}</p>
            <div className="flex flex-col gap-4 max-w-md mx-auto">
              <GCard
                variant={textSize === 'default' ? 'highlighted' : 'default'}
                onPress={() => setTextSize('default')}
                testID="text-size-default"
              >
                <div className="text-center" data-text-size-preview="default">
                  <p className="text-medium font-bold mb-2">Default</p>
                  <p className="text-medium">This is how text looks at default size</p>
                </div>
              </GCard>
              <GCard
                variant={textSize === 'larger' ? 'highlighted' : 'default'}
                onPress={() => setTextSize('larger')}
                testID="text-size-larger"
              >
                <div className="text-center" data-text-size-preview="larger">
                  <p className="text-medium font-bold mb-2">Larger</p>
                  <p className="text-medium">This is how text looks at larger size</p>
                </div>
              </GCard>
              <GCard
                variant={textSize === 'largest' ? 'highlighted' : 'default'}
                onPress={() => setTextSize('largest')}
                testID="text-size-largest"
              >
                <div className="text-center" data-text-size-preview="largest">
                  <p className="text-medium font-bold mb-2">Largest</p>
                  <p className="text-medium">This is how text looks at largest size</p>
                </div>
              </GCard>
            </div>
            <p className="text-center text-medium text-textSecondary mt-4">
              Select a size above to see how it looks. The change applies immediately!
            </p>
          </div>
        );

      case 2:
        return (
          <div className="text-center">
            <div className="text-8xl mb-8">{step.visual}</div>
            <h2 className="text-4xl font-bold mb-4">{step.title}</h2>
            <p className="text-large text-textSecondary mb-8">{step.content}</p>
            <div className="max-w-md mx-auto">
              <GButton
                label="Set up Face ID / Fingerprint"
                onPress={() => {
                  // In real app, this would trigger biometric setup
                  handleNext();
                }}
                variant="primary"
                size="large"
                testID="biometric-setup-btn"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="text-center">
            <div className="text-8xl mb-8">{step.visual}</div>
            <h2 className="text-4xl font-bold mb-4">{step.title}</h2>
            <p className="text-large text-textSecondary mb-8">{step.content}</p>
            <div className="max-w-md mx-auto space-y-4">
              <GInput
                label="Family member email"
                value={email}
                onChangeText={setEmail}
                placeholder="Enter email address"
                keyboardType="email"
                testID="family-email-input"
              />
              <div className="flex gap-4">
                <GButton
                  label="Invite someone"
                  onPress={handleNext}
                  variant="primary"
                  size="large"
                  testID="invite-btn"
                  className="flex-1"
                />
                <GButton
                  label="I'll do this later"
                  onPress={handleNext}
                  variant="secondary"
                  size="large"
                  testID="skip-invite-btn"
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="text-center">
            <div className="text-8xl mb-8">{step.visual}</div>
            <h2 className="text-4xl font-bold mb-4">{step.title}</h2>
            <p className="text-large text-textSecondary mb-8">{step.content}</p>
            <div className="max-w-md mx-auto">
              <GButton
                label="Start practicing"
                onPress={handleNext}
                variant="practice"
                size="large"
                testID="start-practice-btn"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-backgroundWhite pt-16 pb-24">
      <GHeader
        title=""
        showBack={currentStep > 0}
        onBack={handleBack}
      />
      
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-medium font-bold">
              Step {currentStep + 1} of {onboardingSteps.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-primaryBlue h-4 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / onboardingSteps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step content */}
        <div className="min-h-[400px] flex items-center justify-center">
          {renderStepContent()}
        </div>

        {/* Navigation buttons */}
        <div className="mt-8 flex gap-4">
          {currentStep > 0 && (
            <GButton
              label="Back"
              onPress={handleBack}
              variant="secondary"
              size="large"
              testID="back-btn"
              className="flex-1"
            />
          )}
          <GButton
            label={currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Next'}
            onPress={handleNext}
            variant="primary"
            size="large"
            testID="next-btn"
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
}

