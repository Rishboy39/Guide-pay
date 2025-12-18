'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GHeader } from '@/components/ui/GHeader';
import { GHelpButton } from '@/components/ui/GHelpButton';
import { GBottomNav } from '@/components/ui/GBottomNav';
import { GCard } from '@/components/ui/GCard';
import { GInput } from '@/components/ui/GInput';
import { GButton } from '@/components/ui/GButton';

// Preset recipients for easy selection
const presetRecipients = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah@example.com', avatar: '👩', category: 'friend' },
  { id: '2', name: 'Mike Chen', email: 'mike@example.com', avatar: '👨', category: 'friend' },
  { id: '3', name: 'Emily Davis', email: 'emily@example.com', avatar: '👩‍🦰', category: 'friend' },
  { id: '4', name: 'Electric Company', email: 'billing@electric.com', avatar: '⚡', category: 'bill' },
  { id: '5', name: 'Water Department', email: 'payments@water.gov', avatar: '💧', category: 'bill' },
  { id: '6', name: 'Amazon', email: 'payments@amazon.com', avatar: '📦', category: 'merchant' },
  { id: '7', name: 'John Smith', email: 'john@example.com', avatar: '👨‍🦱', category: 'friend' },
];

export default function SendMoneyPage() {
  const router = useRouter();
  const [step, setStep] = useState<'recipient' | 'amount' | 'review' | 'sending' | 'success'>('recipient');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [sending, setSending] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState<typeof presetRecipients[0] | null>(null);
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleNext = () => {
    if (step === 'recipient' && recipient) {
      setStep('amount');
    } else if (step === 'amount' && amount) {
      setStep('review');
    }
  };

  const handleSend = async () => {
    setSending(true);
    setStep('sending');
    
    try {
      // Simulate sending with a delay for visual effect
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const response = await fetch('/api/transactions/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipient,
          amount: parseFloat(amount),
          note,
          isPractice: false,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setStep('success');
        // Show success for 2 seconds, then redirect to home
        setTimeout(() => {
          router.push('/home');
        }, 2000);
      } else {
        setSending(false);
        setStep('review');
        alert('Failed to send payment: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Send error:', error);
      setSending(false);
      setStep('review');
      alert('Failed to send payment. Please try again.');
    }
  };

  const amountNum = parseFloat(amount) || 0;
  const isLargeAmount = amountNum >= 1000;
  const isCautionAmount = amountNum >= 500;

  return (
    <div className="min-h-screen bg-backgroundWhite pt-16 pb-24">
      <GHeader
        title="Send Money"
        showBack={true}
        onBack={() => {
          if (step === 'recipient') router.push('/home');
          else if (step === 'amount') setStep('recipient');
          else setStep('amount');
        }}
      />
      <GHelpButton onPress={() => router.push('/help')} />

      <div className="px-4 py-8 max-w-2xl mx-auto">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-medium font-bold">
              {step === 'recipient' && 'Step 1 of 3'}
              {step === 'amount' && 'Step 2 of 3'}
              {step === 'review' && 'Step 3 of 3'}
              {(step === 'sending' || step === 'success') && 'Processing...'}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-primaryBlue h-4 rounded-full transition-all duration-300"
              style={{
                width: step === 'recipient' ? '33%' : step === 'amount' ? '66%' : step === 'review' ? '100%' : '100%',
              }}
            />
          </div>
        </div>

        {/* Step 1: Select Recipient */}
        {step === 'recipient' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-large font-bold mb-4">Who are you paying?</h2>
              
              {!showCustomInput ? (
                <>
                  <div className="space-y-3 mb-4">
                    {presetRecipients.map((person) => (
                      <GCard
                        key={person.id}
                        variant={selectedRecipient?.id === person.id ? 'highlighted' : 'default'}
                        onPress={() => {
                          setSelectedRecipient(person);
                          setRecipient(person.name);
                          // Auto-advance to amount step after selection
                          setTimeout(() => {
                            if (person.name) {
                              setStep('amount');
                            }
                          }, 300);
                        }}
                        testID={`recipient-${person.id}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="text-5xl">{person.avatar}</div>
                          <div className="flex-1">
                            <p className="text-medium font-bold">{person.name}</p>
                            <p className="text-small text-textSecondary">{person.email}</p>
                          </div>
                          {selectedRecipient?.id === person.id && (
                            <span className="text-2xl text-primaryGreen">✓</span>
                          )}
                        </div>
                      </GCard>
                    ))}
                  </div>

                  <GCard
                    variant="default"
                    onPress={() => setShowCustomInput(true)}
                    testID="custom-recipient-card"
                    className="border-2 border-dashed border-gray-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-5xl">✉️</div>
                      <div className="flex-1">
                        <p className="text-medium font-bold">Enter Custom Recipient</p>
                        <p className="text-small text-textSecondary">Use a different name or email</p>
                      </div>
                    </div>
                  </GCard>
                </>
              ) : (
                <GCard variant="default" testID="custom-input-card" className="border-2 border-primaryBlue">
                  <div className="space-y-4">
                    <GInput
                      label="Recipient name or email"
                      value={recipient}
                      onChangeText={(text) => {
                        setRecipient(text);
                        setSelectedRecipient(null);
                      }}
                      placeholder="Enter name or email"
                      keyboardType="default"
                      testID="custom-recipient-input"
                    />
                    <div className="flex gap-3">
                      <GButton
                        label="Use This"
                        onPress={() => {
                          if (recipient) {
                            setShowCustomInput(false);
                          }
                        }}
                        variant="primary"
                        size="medium"
                        testID="use-custom-btn"
                        disabled={!recipient}
                        className="flex-1"
                      />
                      <GButton
                        label="Cancel"
                        onPress={() => {
                          setShowCustomInput(false);
                          setRecipient('');
                        }}
                        variant="secondary"
                        size="medium"
                        testID="cancel-custom-btn"
                        className="flex-1"
                      />
                    </div>
                  </div>
                </GCard>
              )}
            </div>

            {!showCustomInput && (
              <GButton
                label="Continue"
                onPress={handleNext}
                variant="primary"
                size="large"
                testID="continue-recipient-btn"
                disabled={!recipient}
              />
            )}
          </div>
        )}

        {/* Step 2: Enter Amount */}
        {step === 'amount' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-large font-bold mb-4">How much?</h2>
              <GInput
                label="Amount"
                value={amount}
                onChangeText={setAmount}
                placeholder="0.00"
                keyboardType="numeric"
                testID="amount-input"
                helpText="Enter the amount you want to send"
              />
              {amount && (
                <div className="mt-4 text-center">
                  <p className="text-4xl font-bold text-primaryGreen">
                    ${parseFloat(amount).toFixed(2) || '0.00'}
                  </p>
                </div>
              )}
            </div>

            {isCautionAmount && (
              <GCard
                variant={isLargeAmount ? 'warning' : 'default'}
                testID="amount-warning-card"
              >
                <p className="text-medium font-bold mb-2">
                  {isLargeAmount ? '⚠️ Large Amount' : '💡 Reminder'}
                </p>
                <p className="text-medium text-textSecondary">
                  {isLargeAmount
                    ? 'This is a large amount. Make sure this is correct before sending.'
                    : 'You usually pay this amount. Double-check before sending.'}
                </p>
              </GCard>
            )}

            <div>
              <GInput
                label="Note (optional)"
                value={note}
                onChangeText={setNote}
                placeholder="What is this payment for?"
                keyboardType="default"
                testID="note-input"
              />
            </div>

            <GButton
              label="Continue"
              onPress={handleNext}
              variant="primary"
              size="large"
              testID="continue-amount-btn"
              disabled={!amount || parseFloat(amount) <= 0}
            />
          </div>
        )}

        {/* Step 3: Review */}
        {step === 'review' && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">✓</div>
              <h2 className="text-large font-bold mb-2">Review Your Payment</h2>
              <p className="text-medium text-textSecondary">
                Please review before sending
              </p>
            </div>

            <GCard variant="highlighted" testID="review-card">
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
                {note && (
                  <div>
                    <p className="text-medium text-textSecondary">Note</p>
                    <p className="text-medium font-bold">{note}</p>
                  </div>
                )}
              </div>
            </GCard>

            <div className="space-y-3">
              <GButton
                label="Send Payment"
                onPress={handleSend}
                variant="primary"
                size="large"
                testID="send-payment-btn"
                disabled={sending}
              />
              <GButton
                label="Go Back"
                onPress={() => setStep('amount')}
                variant="secondary"
                size="large"
                testID="back-review-btn"
                disabled={sending}
              />
            </div>
          </div>
        )}

        {/* Step 4: Sending */}
        {step === 'sending' && (
          <div className="space-y-6 text-center">
            <div className="flex flex-col items-center justify-center min-h-[400px]">
              <div className="relative mb-8">
                <div className="w-24 h-24 border-8 border-primaryBlue border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl">💸</span>
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-4 text-textPrimary">
                Sending Payment...
              </h2>
              <p className="text-xl text-textSecondary">
                Please wait while we process your transaction
              </p>
            </div>
          </div>
        )}

        {/* Step 5: Success */}
        {step === 'success' && (
          <div className="space-y-6 text-center">
            <div className="flex flex-col items-center justify-center min-h-[400px]">
              <div className="mb-8 animate-bounce">
                <div className="w-32 h-32 bg-primaryGreen rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-6xl">✓</span>
                </div>
              </div>
              <h2 className="text-4xl font-bold mb-4 text-primaryGreen">
                Payment Sent!
              </h2>
              <p className="text-xl text-textSecondary mb-8">
                Your payment of ${parseFloat(amount).toFixed(2)} to {recipient} was successful
              </p>
              <GCard variant="highlighted" testID="success-details" className="max-w-md mx-auto">
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
                  {note && (
                    <div>
                      <p className="text-medium text-textSecondary">Note</p>
                      <p className="text-medium font-bold">{note}</p>
                    </div>
                  )}
                </div>
              </GCard>
              <p className="text-medium text-textSecondary mt-8">
                Redirecting to home...
              </p>
            </div>
          </div>
        )}
      </div>

      <GBottomNav currentTab="send" onTabChange={(tab) => {
        if (tab === 'home') router.push('/home');
        else if (tab === 'practice') router.push('/practice');
        else if (tab === 'family') router.push('/family');
      }} />
    </div>
  );
}

