'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GHeader } from '@/components/ui/GHeader';
import { GHelpButton } from '@/components/ui/GHelpButton';
import { GBottomNav } from '@/components/ui/GBottomNav';
import { GCard } from '@/components/ui/GCard';
import { GButton } from '@/components/ui/GButton';

const practiceScenarios = [
  {
    id: 1,
    title: 'Send Money to a Friend',
    description: 'Practice sending money to someone you know',
    icon: '👤',
  },
  {
    id: 2,
    title: 'Pay a Bill',
    description: 'Practice paying a utility bill',
    icon: '💡',
  },
  {
    id: 3,
    title: 'Buy Something Online',
    description: 'Practice making an online purchase',
    icon: '🛒',
  },
];

export default function PracticePage() {
  const router = useRouter();
  const [selectedScenario, setSelectedScenario] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-backgroundWhite pt-16 pb-24">
      <GHeader
        title="Practice Mode"
        showBack={true}
        onBack={() => router.push('/home')}
      />
      <GHelpButton onPress={() => router.push('/help')} />

      <div className="px-4 py-8 max-w-2xl mx-auto">
        {/* Practice Mode Banner */}
        <GCard variant="practice" testID="practice-banner" className="mb-6">
          <div className="text-center">
            <div className="text-5xl mb-3">🎓</div>
            <h2 className="text-large font-bold mb-2">Practice Mode</h2>
            <p className="text-medium text-textSecondary">
              This is practice mode. No real money will be used. 
              Practice as much as you want!
            </p>
          </div>
        </GCard>

        <h2 className="text-large font-bold mb-4">Choose a Practice Scenario</h2>
        <div className="space-y-4 mb-6">
          {practiceScenarios.map((scenario) => (
            <GCard
              key={scenario.id}
              variant={selectedScenario === scenario.id ? 'highlighted' : 'default'}
              onPress={() => setSelectedScenario(scenario.id)}
              testID={`scenario-${scenario.id}`}
            >
              <div className="flex items-center gap-4">
                <div className="text-5xl">{scenario.icon}</div>
                <div className="flex-1">
                  <h3 className="text-medium font-bold mb-1">{scenario.title}</h3>
                  <p className="text-small text-textSecondary">{scenario.description}</p>
                </div>
              </div>
            </GCard>
          ))}
        </div>

        <GButton
          label="Start Practice"
          onPress={() => {
            if (selectedScenario) {
              router.push(`/practice/scenario/${selectedScenario}`);
            }
          }}
          variant="practice"
          size="large"
          testID="start-practice-btn"
          disabled={!selectedScenario}
        />

        {/* Practice Tips */}
        <div className="mt-8">
          <h3 className="text-medium font-bold mb-3">Practice Tips</h3>
          <GCard variant="default" testID="practice-tips">
            <ul className="space-y-2 text-medium text-textSecondary">
              <li>• Take your time - there's no rush</li>
              <li>• Try each step slowly</li>
              <li>• Practice as many times as you want</li>
              <li>• Ask for help if you get stuck</li>
            </ul>
          </GCard>
        </div>
      </div>

      <GBottomNav currentTab="practice" onTabChange={(tab) => {
        if (tab === 'home') router.push('/home');
        else if (tab === 'send') router.push('/send');
        else if (tab === 'family') router.push('/family');
      }} />
    </div>
  );
}

