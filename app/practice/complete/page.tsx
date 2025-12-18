'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { GButton } from '@/components/ui/GButton';
import { GCard } from '@/components/ui/GCard';

export default function PracticeCompletePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-backgroundWhite flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="text-8xl mb-6">🎉</div>
        <h1 className="text-4xl font-bold mb-4 text-practiceOrange">
          Practice Complete!
        </h1>
        <p className="text-large text-textSecondary mb-8">
          Great job! You've completed the practice scenario.
        </p>

        <GCard variant="practice" testID="practice-complete-card" className="mb-8">
          <div className="space-y-4">
            <p className="text-medium font-bold">What you learned:</p>
            <ul className="text-medium text-textSecondary text-left space-y-2">
              <li>✓ How to enter recipient information</li>
              <li>✓ How to enter an amount</li>
              <li>✓ How to review before sending</li>
            </ul>
          </div>
        </GCard>

        <div className="space-y-3">
          <GButton
            label="Practice Again"
            onPress={() => router.push('/practice')}
            variant="practice"
            size="large"
            testID="practice-again-btn"
          />
          <GButton
            label="Back to Home"
            onPress={() => router.push('/home')}
            variant="secondary"
            size="large"
            testID="home-btn"
          />
        </div>
      </div>
    </div>
  );
}

