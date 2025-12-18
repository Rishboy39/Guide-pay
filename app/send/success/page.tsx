'use client';

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { GButton } from '@/components/ui/GButton';
import { GCard } from '@/components/ui/GCard';

function SendSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const recipient = searchParams.get('recipient') || 'Recipient';
  const amount = searchParams.get('amount') || '0.00';

  return (
    <div className="min-h-screen bg-backgroundWhite flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="text-8xl mb-6">✅</div>
        <h1 className="text-4xl font-bold mb-4 text-primaryGreen">
          Payment Sent!
        </h1>
        <p className="text-large text-textSecondary mb-8">
          Your payment has been sent successfully
        </p>

        <GCard variant="highlighted" testID="success-details" className="mb-8">
          <div className="space-y-4">
            <div>
              <p className="text-medium text-textSecondary">To</p>
              <p className="text-large font-bold">{recipient}</p>
            </div>
            <div>
              <p className="text-medium text-textSecondary">Amount</p>
              <p className="text-4xl font-bold text-primaryGreen">
                ${parseFloat(amount).toFixed(2)}
              </p>
            </div>
          </div>
        </GCard>

        <div className="space-y-3">
          <GButton
            label="View Receipt"
            onPress={() => router.push('/home')}
            variant="primary"
            size="large"
            testID="view-receipt-btn"
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

export default function SendSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SendSuccessContent />
    </Suspense>
  );
}

