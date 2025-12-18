'use client';

import React, { useState, useEffect } from 'react';
import { GHeader } from '@/components/ui/GHeader';
import { GHelpButton } from '@/components/ui/GHelpButton';
import { GBottomNav } from '@/components/ui/GBottomNav';
import { GCard } from '@/components/ui/GCard';
import { GButton } from '@/components/ui/GButton';
import { useRouter } from 'next/navigation';

interface Transaction {
  id: string;
  recipient: string;
  amount: number;
  date: string;
  type: string;
}

export default function HomePage() {
  const router = useRouter();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
    
    // Reload data when page becomes visible (user navigates back)
    const handleFocus = () => {
      loadData();
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const loadData = async () => {
    try {
      // Load user data
      const userResponse = await fetch('/api/auth/me');
      if (userResponse.ok) {
        const userData = await userResponse.json();
        setBalance(userData.user.balance);
      }

      // Load transactions
      const txResponse = await fetch('/api/transactions/list');
      if (txResponse.ok) {
        const txData = await txResponse.json();
        setTransactions(txData.transactions.slice(0, 3)); // Show only recent 3
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const handleHelp = () => {
    router.push('/help');
  };

  return (
    <div className="min-h-screen bg-backgroundWhite pt-16 pb-24">
      <GHeader
        title="Home"
        rightAction={{
          icon: <span>📞</span>,
          onPress: handleHelp,
          label: 'Help',
        }}
      />
      <GHelpButton onPress={handleHelp} />

      <div className="px-4 py-8 max-w-2xl mx-auto">
        {/* Balance Card */}
        <GCard variant="highlighted" testID="balance-card" className="mb-6">
          <div className="text-center">
            <p className="text-medium text-textSecondary mb-2">Your Balance</p>
            <p className="text-5xl font-bold text-primaryGreen mb-4">
              {loading ? 'Loading...' : `$${balance.toFixed(2)}`}
            </p>
            <div className="flex gap-4">
              <GButton
                label="Send Money"
                onPress={() => router.push('/send')}
                variant="primary"
                size="medium"
                testID="send-money-btn"
                className="flex-1"
              />
              <GButton
                label="Practice"
                onPress={() => router.push('/practice')}
                variant="practice"
                size="medium"
                testID="practice-btn"
                className="flex-1"
              />
            </div>
          </div>
        </GCard>

        {/* Recent Activity */}
        <div className="mb-6">
          <h2 className="text-large font-bold mb-4">Recent Activity</h2>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {loading ? (
              <div className="p-8 text-center">
                <p className="text-medium text-textSecondary">Loading transactions...</p>
              </div>
            ) : transactions.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-medium text-textSecondary">No transactions yet</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {transactions.map((transaction, index) => (
                  <button
                    key={transaction.id}
                    onClick={() => router.push(`/transaction/${transaction.id}`)}
                    className="w-full px-6 py-5 hover:bg-gray-50 transition-colors flex items-center justify-between group"
                    data-testid={`transaction-${transaction.id}`}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl flex-shrink-0">
                        {transaction.recipient.includes('Company') || transaction.recipient.includes('Department') 
                          ? '🏢' 
                          : transaction.recipient.includes('Amazon')
                          ? '📦'
                          : '👤'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-medium font-bold text-left truncate">{transaction.recipient}</p>
                        <p className="text-small text-textSecondary text-left">{formatDate(transaction.date)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-medium font-bold text-dangerRed">
                          -${transaction.amount.toFixed(2)}
                        </p>
                      </div>
                      <span className="text-primaryBlue opacity-0 group-hover:opacity-100 transition-opacity">
                        →
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-large font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <GCard
              variant="default"
              onPress={() => router.push('/family')}
              testID="family-card"
            >
              <div className="text-center">
                <div className="text-4xl mb-2">👨‍👩‍👧‍👦</div>
                <p className="text-medium font-bold">Family Helper</p>
              </div>
            </GCard>
            <GCard
              variant="default"
              onPress={() => router.push('/settings')}
              testID="settings-card"
            >
              <div className="text-center">
                <div className="text-4xl mb-2">⚙️</div>
                <p className="text-medium font-bold">Settings</p>
              </div>
            </GCard>
          </div>
        </div>
      </div>

      <GBottomNav currentTab="home" onTabChange={(tab) => {
        if (tab === 'send') router.push('/send');
        else if (tab === 'practice') router.push('/practice');
        else if (tab === 'family') router.push('/family');
        else router.push('/home');
      }} />
    </div>
  );
}

