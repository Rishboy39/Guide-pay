'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { GHeader } from '@/components/ui/GHeader';
import { GCard } from '@/components/ui/GCard';
import { GButton } from '@/components/ui/GButton';

const helpTopics = [
  {
    id: 1,
    title: 'How to Send Money',
    description: 'Step-by-step guide to sending money',
    icon: '💵',
  },
  {
    id: 2,
    title: 'Practice Mode',
    description: 'Learn how to use practice mode',
    icon: '🎓',
  },
  {
    id: 3,
    title: 'Family Helper',
    description: 'Get help from a family member',
    icon: '👨‍👩‍👧‍👦',
  },
  {
    id: 4,
    title: 'Contact Support',
    description: 'Talk to a real person',
    icon: '📞',
  },
];

export default function HelpPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-backgroundWhite pt-16 pb-24">
      <GHeader
        title="Help"
        showBack={true}
        onBack={() => router.back()}
      />

      <div className="px-4 py-8 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">📞</div>
          <h1 className="text-4xl font-bold mb-2">We're Here to Help</h1>
          <p className="text-large text-textSecondary">
            Choose a topic or contact support directly
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {helpTopics.map((topic) => (
            <GCard
              key={topic.id}
              variant="default"
              onPress={() => {
                // In real app, this would navigate to topic details
                alert(`Help topic: ${topic.title}`);
              }}
              testID={`help-topic-${topic.id}`}
            >
              <div className="flex items-center gap-4">
                <div className="text-5xl">{topic.icon}</div>
                <div className="flex-1">
                  <h3 className="text-medium font-bold mb-1">{topic.title}</h3>
                  <p className="text-small text-textSecondary">{topic.description}</p>
                </div>
              </div>
            </GCard>
          ))}
        </div>

        <div className="space-y-3">
          <GButton
            label="Call Support"
            onPress={() => {
              // In real app, this would initiate a call
              alert('Calling support...');
            }}
            variant="primary"
            size="large"
            testID="call-support-btn"
          />
          <GButton
            label="Email Support"
            onPress={() => {
              // In real app, this would open email
              window.location.href = 'mailto:support@guidepay.com';
            }}
            variant="secondary"
            size="large"
            testID="email-support-btn"
          />
        </div>
      </div>
    </div>
  );
}

