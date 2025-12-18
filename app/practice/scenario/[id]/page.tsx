'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { GHeader } from '@/components/ui/GHeader';
import { GHelpButton } from '@/components/ui/GHelpButton';
import { GCard } from '@/components/ui/GCard';
import { GInput } from '@/components/ui/GInput';
import { GButton } from '@/components/ui/GButton';

// Friends list for scenario 1
const friends = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah@example.com', avatar: '👩' },
  { id: '2', name: 'Mike Chen', email: 'mike@example.com', avatar: '👨' },
  { id: '3', name: 'Emily Davis', email: 'emily@example.com', avatar: '👩‍🦰' },
  { id: '4', name: 'Robert Wilson', email: 'robert@example.com', avatar: '👨‍🦱' },
  { id: '5', name: 'Lisa Anderson', email: 'lisa@example.com', avatar: '👩‍🦳' },
];

// Bills for scenario 2
const bills = [
  {
    id: '1',
    company: 'Electric Company',
    amount: 125.50,
    dueDate: 'Dec 20, 2024',
    accountNumber: 'ACC-1234-5678',
    icon: '⚡',
    description: 'Monthly electricity bill',
  },
  {
    id: '2',
    company: 'Water Department',
    amount: 68.25,
    dueDate: 'Dec 22, 2024',
    accountNumber: 'ACC-9876-5432',
    icon: '💧',
    description: 'Water and sewer services',
  },
  {
    id: '3',
    company: 'Internet Provider',
    amount: 79.99,
    dueDate: 'Dec 25, 2024',
    accountNumber: 'ACC-4567-8901',
    icon: '📡',
    description: 'Monthly internet service',
  },
  {
    id: '4',
    company: 'Phone Company',
    amount: 45.00,
    dueDate: 'Dec 18, 2024',
    accountNumber: 'ACC-2345-6789',
    icon: '📱',
    description: 'Mobile phone service',
  },
];

// Products for scenario 3
const products = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 89.99,
    image: '🎧',
    description: 'High-quality noise-canceling headphones',
  },
  {
    id: '2',
    name: 'Coffee Maker',
    price: 129.99,
    image: '☕',
    description: 'Programmable coffee maker with timer',
  },
  {
    id: '3',
    name: 'Reading Lamp',
    price: 34.99,
    image: '💡',
    description: 'Adjustable LED reading lamp',
  },
  {
    id: '4',
    name: 'Garden Tools Set',
    price: 49.99,
    image: '🌿',
    description: 'Complete gardening tool set',
  },
];

export default function PracticeScenarioPage() {
  const router = useRouter();
  const params = useParams();
  const scenarioId = params.id as string;
  const [practiceSessionId, setPracticeSessionId] = useState<string | null>(null);
  
  // Scenario 1: Send Money to Friend
  const [friendStep, setFriendStep] = useState<'select' | 'amount' | 'review' | 'success'>('select');
  const [selectedFriend, setSelectedFriend] = useState<typeof friends[0] | null>(null);
  const [friendAmount, setFriendAmount] = useState('');
  const [friendNote, setFriendNote] = useState('');

  // Scenario 2: Pay Bill
  const [billStep, setBillStep] = useState<'select' | 'review' | 'success'>('select');
  const [selectedBill, setSelectedBill] = useState<typeof bills[0] | null>(null);

  // Scenario 3: Buy Online
  const [shopStep, setShopStep] = useState<'browse' | 'cart' | 'checkout' | 'review' | 'success'>('browse');
  const [cart, setCart] = useState<Array<typeof products[0] & { quantity: number }>>([]);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    zip: '',
  });

  // Start practice session on mount
  useEffect(() => {
    const startPractice = async () => {
      try {
        const response = await fetch('/api/practice/start', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ scenarioId }),
        });
        const data = await response.json();
        if (data.success) {
          setPracticeSessionId(data.session.id);
        }
      } catch (error) {
        console.error('Failed to start practice:', error);
      }
    };
    startPractice();
  }, [scenarioId]);

  const handleCompletePractice = async () => {
    if (practiceSessionId) {
      try {
        await fetch('/api/practice/complete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId: practiceSessionId }),
        });
      } catch (error) {
        console.error('Failed to complete practice:', error);
      }
    }
    router.push('/practice/complete');
  };

  const handleBack = () => {
    if (scenarioId === '1') {
      if (friendStep === 'select') router.push('/practice');
      else if (friendStep === 'amount') setFriendStep('select');
      else if (friendStep === 'review') setFriendStep('amount');
    } else if (scenarioId === '2') {
      if (billStep === 'select') router.push('/practice');
      else if (billStep === 'review') setBillStep('select');
    } else if (scenarioId === '3') {
      if (shopStep === 'browse') router.push('/practice');
      else if (shopStep === 'cart') setShopStep('browse');
      else if (shopStep === 'checkout') setShopStep('cart');
      else if (shopStep === 'review') setShopStep('checkout');
    }
  };

  // Scenario 1: Send Money to Friend
  const renderSendMoneyScenario = () => {
    if (friendStep === 'select') {
      return (
        <div className="space-y-6">
          <h2 className="text-large font-bold mb-4">Choose a Friend</h2>
          <div className="space-y-3">
            {friends.map((friend) => (
              <GCard
                key={friend.id}
                variant={selectedFriend?.id === friend.id ? 'highlighted' : 'default'}
                onPress={() => setSelectedFriend(friend)}
                testID={`friend-${friend.id}`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{friend.avatar}</div>
                  <div className="flex-1">
                    <p className="text-medium font-bold">{friend.name}</p>
                    <p className="text-small text-textSecondary">{friend.email}</p>
                  </div>
                  {selectedFriend?.id === friend.id && (
                    <span className="text-2xl">✓</span>
                  )}
                </div>
              </GCard>
            ))}
          </div>
          <GButton
            label="Continue"
            onPress={() => selectedFriend && setFriendStep('amount')}
            variant="primary"
            size="large"
            testID="continue-friend-btn"
            disabled={!selectedFriend}
          />
        </div>
      );
    }

    if (friendStep === 'amount') {
      return (
        <div className="space-y-6">
          <div className="text-center mb-4">
            <div className="text-5xl mb-2">{selectedFriend?.avatar}</div>
            <p className="text-large font-bold">{selectedFriend?.name}</p>
          </div>
          <GInput
            label="Amount (practice money)"
            value={friendAmount}
            onChangeText={setFriendAmount}
            placeholder="0.00"
            keyboardType="numeric"
            testID="friend-amount-input"
            helpText="This is practice money - not real!"
          />
          {friendAmount && (
            <div className="text-center">
              <p className="text-4xl font-bold text-practiceOrange">
                ${parseFloat(friendAmount).toFixed(2) || '0.00'}
              </p>
            </div>
          )}
          <GInput
            label="Note (optional)"
            value={friendNote}
            onChangeText={setFriendNote}
            placeholder="What is this for?"
            keyboardType="default"
            testID="friend-note-input"
          />
          <div className="flex gap-4">
            <GButton
              label="Back"
              onPress={() => setFriendStep('select')}
              variant="secondary"
              size="large"
              testID="back-friend-btn"
              className="flex-1"
            />
            <GButton
              label="Continue"
              onPress={() => friendAmount && setFriendStep('review')}
              variant="primary"
              size="large"
              testID="continue-amount-btn"
              className="flex-1"
              disabled={!friendAmount || parseFloat(friendAmount) <= 0}
            />
          </div>
        </div>
      );
    }

    if (friendStep === 'review') {
      return (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">✓</div>
            <h2 className="text-large font-bold mb-2">Review Your Payment</h2>
          </div>
          <GCard variant="highlighted" testID="review-card">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="text-5xl">{selectedFriend?.avatar}</div>
                <div>
                  <p className="text-medium text-textSecondary">To</p>
                  <p className="text-large font-bold">{selectedFriend?.name}</p>
                </div>
              </div>
              <div>
                <p className="text-medium text-textSecondary">Amount</p>
                <p className="text-4xl font-bold text-practiceOrange">
                  ${parseFloat(friendAmount).toFixed(2)}
                </p>
                <p className="text-small text-textSecondary mt-2">(Practice money - not real!)</p>
              </div>
              {friendNote && (
                <div>
                  <p className="text-medium text-textSecondary">Note</p>
                  <p className="text-medium font-bold">{friendNote}</p>
                </div>
              )}
            </div>
          </GCard>
          <div className="flex gap-4">
            <GButton
              label="Back"
              onPress={() => setFriendStep('amount')}
              variant="secondary"
              size="large"
              testID="back-review-btn"
              className="flex-1"
            />
            <GButton
              label="Send Payment"
              onPress={() => setFriendStep('success')}
              variant="practice"
              size="large"
              testID="send-friend-btn"
              className="flex-1"
            />
          </div>
        </div>
      );
    }

    if (friendStep === 'success') {
      return (
        <div className="space-y-6 text-center">
          <div className="mb-8">
            <div className="w-32 h-32 bg-primaryGreen rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-6xl">✓</span>
            </div>
            <h2 className="text-4xl font-bold mb-4 text-primaryGreen">Payment Sent!</h2>
            <p className="text-xl text-textSecondary mb-8">
              Practice payment of ${parseFloat(friendAmount).toFixed(2)} to {selectedFriend?.name} completed
            </p>
            <GCard variant="highlighted" testID="success-details" className="max-w-md mx-auto mb-8">
              <div className="space-y-4">
                <div className="flex items-center gap-4 justify-center">
                  <div className="text-5xl">{selectedFriend?.avatar}</div>
                  <div>
                    <p className="text-medium text-textSecondary">To</p>
                    <p className="text-large font-bold">{selectedFriend?.name}</p>
                  </div>
                </div>
                <div>
                  <p className="text-medium text-textSecondary">Amount</p>
                  <p className="text-4xl font-bold text-practiceOrange">
                    ${parseFloat(friendAmount).toFixed(2)}
                  </p>
                </div>
              </div>
            </GCard>
            <GButton
              label="Complete Practice"
              onPress={handleCompletePractice}
              variant="practice"
              size="large"
              testID="complete-practice-btn"
            />
          </div>
        </div>
      );
    }
  };

  // Scenario 2: Pay Bill
  const renderPayBillScenario = () => {
    if (billStep === 'select') {
      return (
        <div className="space-y-6">
          <h2 className="text-large font-bold mb-4">Select a Bill to Pay</h2>
          <div className="space-y-3">
            {bills.map((bill) => (
              <GCard
                key={bill.id}
                variant={selectedBill?.id === bill.id ? 'highlighted' : 'default'}
                onPress={() => setSelectedBill(bill)}
                testID={`bill-${bill.id}`}
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">{bill.icon}</div>
                    <div className="flex-1">
                      <p className="text-medium font-bold">{bill.company}</p>
                      <p className="text-small text-textSecondary">{bill.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-dangerRed">${bill.amount.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between text-small text-textSecondary">
                      <span>Due: {bill.dueDate}</span>
                      <span>Account: {bill.accountNumber}</span>
                    </div>
                  </div>
                </div>
              </GCard>
            ))}
          </div>
          <GButton
            label="Continue"
            onPress={() => selectedBill && setBillStep('review')}
            variant="primary"
            size="large"
            testID="continue-bill-btn"
            disabled={!selectedBill}
          />
        </div>
      );
    }

    if (billStep === 'review') {
      return (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">✓</div>
            <h2 className="text-large font-bold mb-2">Review Your Payment</h2>
          </div>
          <GCard variant="highlighted" testID="review-card">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="text-5xl">{selectedBill?.icon}</div>
                <div>
                  <p className="text-medium text-textSecondary">Bill</p>
                  <p className="text-large font-bold">{selectedBill?.company}</p>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-medium text-textSecondary">Account Number</span>
                  <span className="text-medium font-bold">{selectedBill?.accountNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-medium text-textSecondary">Due Date</span>
                  <span className="text-medium font-bold">{selectedBill?.dueDate}</span>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-medium text-textSecondary">Amount Due</span>
                  <span className="text-4xl font-bold text-practiceOrange">
                    ${selectedBill?.amount.toFixed(2)}
                  </span>
                </div>
                <p className="text-small text-textSecondary mt-2">(Practice money - not real!)</p>
              </div>
            </div>
          </GCard>
          <div className="flex gap-4">
            <GButton
              label="Back"
              onPress={() => setBillStep('select')}
              variant="secondary"
              size="large"
              testID="back-bill-btn"
              className="flex-1"
            />
            <GButton
              label="Pay Bill"
              onPress={() => setBillStep('success')}
              variant="practice"
              size="large"
              testID="pay-bill-btn"
              className="flex-1"
            />
          </div>
        </div>
      );
    }

    if (billStep === 'success') {
      return (
        <div className="space-y-6 text-center">
          <div className="mb-8">
            <div className="w-32 h-32 bg-primaryGreen rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-6xl">✓</span>
            </div>
            <h2 className="text-4xl font-bold mb-4 text-primaryGreen">Bill Paid!</h2>
            <p className="text-xl text-textSecondary mb-8">
              Practice payment of ${selectedBill?.amount.toFixed(2)} to {selectedBill?.company} completed
            </p>
            <GCard variant="highlighted" testID="success-details" className="max-w-md mx-auto mb-8">
              <div className="space-y-4">
                <div className="flex items-center gap-4 justify-center">
                  <div className="text-5xl">{selectedBill?.icon}</div>
                  <div>
                    <p className="text-medium text-textSecondary">Bill</p>
                    <p className="text-large font-bold">{selectedBill?.company}</p>
                  </div>
                </div>
                <div>
                  <p className="text-medium text-textSecondary">Amount Paid</p>
                  <p className="text-4xl font-bold text-practiceOrange">
                    ${selectedBill?.amount.toFixed(2)}
                  </p>
                </div>
              </div>
            </GCard>
            <GButton
              label="Complete Practice"
              onPress={handleCompletePractice}
              variant="practice"
              size="large"
              testID="complete-practice-btn"
            />
          </div>
        </div>
      );
    }
  };

  // Scenario 3: Buy Online
  const renderBuyOnlineScenario = () => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = total * 0.08;
    const shipping = total > 50 ? 0 : 5.99;
    const grandTotal = total + tax + shipping;

    if (shopStep === 'browse') {
      return (
        <div className="space-y-6">
          <h2 className="text-large font-bold mb-4">Browse Products</h2>
          <div className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <GCard
                key={product.id}
                variant="default"
                onPress={() => {
                  const existingItem = cart.find(item => item.id === product.id);
                  if (existingItem) {
                    setCart(cart.map(item => 
                      item.id === product.id 
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                    ));
                  } else {
                    setCart([...cart, { ...product, quantity: 1 }]);
                  }
                }}
                testID={`product-${product.id}`}
                className="cursor-pointer"
              >
                <div className="text-center">
                  <div className="text-6xl mb-3">{product.image}</div>
                  <p className="text-medium font-bold mb-1">{product.name}</p>
                  <p className="text-small text-textSecondary mb-2">{product.description}</p>
                  <p className="text-large font-bold text-primaryGreen">${product.price.toFixed(2)}</p>
                </div>
              </GCard>
            ))}
          </div>
          {cart.length > 0 && (
            <GButton
              label={`View Cart (${cart.length} items)`}
              onPress={() => setShopStep('cart')}
              variant="primary"
              size="large"
              testID="view-cart-btn"
            />
          )}
        </div>
      );
    }

    if (shopStep === 'cart') {
      return (
        <div className="space-y-6">
          <h2 className="text-large font-bold mb-4">Shopping Cart</h2>
          {cart.length === 0 ? (
            <GCard variant="default" testID="empty-cart">
              <p className="text-center text-medium text-textSecondary py-8">
                Your cart is empty
              </p>
            </GCard>
          ) : (
            <>
              <div className="space-y-3">
                {cart.map((item) => (
                  <GCard key={item.id} variant="default" testID={`cart-item-${item.id}`}>
                    <div className="flex items-center gap-4">
                      <div className="text-5xl">{item.image}</div>
                      <div className="flex-1">
                        <p className="text-medium font-bold">{item.name}</p>
                        <p className="text-small text-textSecondary">
                          Quantity: {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-medium font-bold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => {
                            if (item.quantity > 1) {
                              setCart(cart.map(cartItem =>
                                cartItem.id === item.id
                                  ? { ...cartItem, quantity: cartItem.quantity - 1 }
                                  : cartItem
                              ));
                            } else {
                              setCart(cart.filter(cartItem => cartItem.id !== item.id));
                            }
                          }}
                          className="text-small text-dangerRed mt-2"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </GCard>
                ))}
              </div>
              <GCard variant="highlighted" testID="cart-total">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-medium text-textSecondary">Subtotal</span>
                    <span className="text-medium font-bold">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-medium text-textSecondary">Tax (8%)</span>
                    <span className="text-medium font-bold">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-medium text-textSecondary">Shipping</span>
                    <span className="text-medium font-bold">
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="text-large font-bold">Total</span>
                      <span className="text-2xl font-bold text-primaryGreen">
                        ${grandTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </GCard>
              <div className="flex gap-4">
                <GButton
                  label="Continue Shopping"
                  onPress={() => setShopStep('browse')}
                  variant="secondary"
                  size="large"
                  testID="continue-shopping-btn"
                  className="flex-1"
                />
                <GButton
                  label="Checkout"
                  onPress={() => setShopStep('checkout')}
                  variant="primary"
                  size="large"
                  testID="checkout-btn"
                  className="flex-1"
                  disabled={cart.length === 0}
                />
              </div>
            </>
          )}
        </div>
      );
    }

    if (shopStep === 'checkout') {
      return (
        <div className="space-y-6">
          <h2 className="text-large font-bold mb-4">Shipping Information</h2>
          <div className="space-y-4">
            <GInput
              label="Full Name"
              value={shippingInfo.name}
              onChangeText={(text) => setShippingInfo({ ...shippingInfo, name: text })}
              placeholder="Enter your name"
              keyboardType="default"
              testID="shipping-name-input"
            />
            <GInput
              label="Street Address"
              value={shippingInfo.address}
              onChangeText={(text) => setShippingInfo({ ...shippingInfo, address: text })}
              placeholder="Enter street address"
              keyboardType="default"
              testID="shipping-address-input"
            />
            <div className="grid grid-cols-2 gap-4">
              <GInput
                label="City"
                value={shippingInfo.city}
                onChangeText={(text) => setShippingInfo({ ...shippingInfo, city: text })}
                placeholder="Enter city"
                keyboardType="default"
                testID="shipping-city-input"
              />
              <GInput
                label="ZIP Code"
                value={shippingInfo.zip}
                onChangeText={(text) => setShippingInfo({ ...shippingInfo, zip: text })}
                placeholder="12345"
                keyboardType="numeric"
                testID="shipping-zip-input"
              />
            </div>
          </div>
          <GCard variant="default" testID="order-summary" className="mt-6">
            <h3 className="text-medium font-bold mb-3">Order Summary</h3>
            <div className="space-y-2 text-small">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name} × {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-primaryGreen">${grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </GCard>
          <div className="flex gap-4">
            <GButton
              label="Back"
              onPress={() => setShopStep('cart')}
              variant="secondary"
              size="large"
              testID="back-checkout-btn"
              className="flex-1"
            />
            <GButton
              label="Review Order"
              onPress={() => {
                if (shippingInfo.name && shippingInfo.address && shippingInfo.city && shippingInfo.zip) {
                  setShopStep('review');
                } else {
                  alert('Please fill in all shipping information');
                }
              }}
              variant="primary"
              size="large"
              testID="review-order-btn"
              className="flex-1"
            />
          </div>
        </div>
      );
    }

    if (shopStep === 'review') {
      return (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">✓</div>
            <h2 className="text-large font-bold mb-2">Review Your Order</h2>
          </div>
          <GCard variant="highlighted" testID="review-card">
            <div className="space-y-4">
              <div>
                <p className="text-medium text-textSecondary mb-2">Shipping To</p>
                <p className="text-medium font-bold">{shippingInfo.name}</p>
                <p className="text-small text-textSecondary">
                  {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.zip}
                </p>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <p className="text-medium text-textSecondary mb-2">Items</p>
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between mb-2">
                    <span className="text-medium">
                      {item.image} {item.name} × {item.quantity}
                    </span>
                    <span className="text-medium font-bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-medium text-textSecondary">Total</span>
                  <span className="text-4xl font-bold text-practiceOrange">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>
                <p className="text-small text-textSecondary mt-2">(Practice purchase - not real!)</p>
              </div>
            </div>
          </GCard>
          <div className="flex gap-4">
            <GButton
              label="Back"
              onPress={() => setShopStep('checkout')}
              variant="secondary"
              size="large"
              testID="back-review-btn"
              className="flex-1"
            />
            <GButton
              label="Place Order"
              onPress={() => setShopStep('success')}
              variant="practice"
              size="large"
              testID="place-order-btn"
              className="flex-1"
            />
          </div>
        </div>
      );
    }

    if (shopStep === 'success') {
      return (
        <div className="space-y-6 text-center">
          <div className="mb-8">
            <div className="w-32 h-32 bg-primaryGreen rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-6xl">✓</span>
            </div>
            <h2 className="text-4xl font-bold mb-4 text-primaryGreen">Order Placed!</h2>
            <p className="text-xl text-textSecondary mb-8">
              Practice purchase completed successfully
            </p>
            <GCard variant="highlighted" testID="success-details" className="max-w-md mx-auto mb-8">
              <div className="space-y-4">
                <div>
                  <p className="text-medium text-textSecondary">Order Total</p>
                  <p className="text-4xl font-bold text-practiceOrange">
                    ${grandTotal.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-medium text-textSecondary">Items Ordered</p>
                  <p className="text-medium font-bold">{cart.length} item(s)</p>
                </div>
                <div>
                  <p className="text-medium text-textSecondary">Shipping To</p>
                  <p className="text-medium font-bold">{shippingInfo.name}</p>
                </div>
              </div>
            </GCard>
            <GButton
              label="Complete Practice"
              onPress={handleCompletePractice}
              variant="practice"
              size="large"
              testID="complete-practice-btn"
            />
          </div>
        </div>
      );
    }
  };

  const getCurrentStep = () => {
    if (scenarioId === '1') return friendStep;
    if (scenarioId === '2') return billStep;
    if (scenarioId === '3') return shopStep;
    return 'select';
  };

  const getTotalSteps = () => {
    if (scenarioId === '1') return 4; // select, amount, review, success
    if (scenarioId === '2') return 3; // select, review, success
    if (scenarioId === '3') return 5; // browse, cart, checkout, review, success
    return 3;
  };

  const getStepNumber = () => {
    const step = getCurrentStep();
    if (scenarioId === '1') {
      if (step === 'select') return 1;
      if (step === 'amount') return 2;
      if (step === 'review') return 3;
      if (step === 'success') return 4;
    }
    if (scenarioId === '2') {
      if (step === 'select') return 1;
      if (step === 'review') return 2;
      if (step === 'success') return 3;
    }
    if (scenarioId === '3') {
      if (step === 'browse') return 1;
      if (step === 'cart') return 2;
      if (step === 'checkout') return 3;
      if (step === 'review') return 4;
      if (step === 'success') return 5;
    }
    return 1;
  };

  const scenarioTitles: Record<string, string> = {
    '1': 'Send Money to a Friend',
    '2': 'Pay a Bill',
    '3': 'Buy Something Online',
  };

  return (
    <div className="min-h-screen bg-backgroundWhite pt-16 pb-24">
      <GHeader
        title="Practice Mode"
        showBack={true}
        onBack={handleBack}
      />
      <GHelpButton onPress={() => router.push('/help')} />

      <div className="px-4 py-8 max-w-2xl mx-auto">
        {/* Practice Mode Banner */}
        <GCard variant="practice" testID="practice-banner" className="mb-6">
          <div className="text-center">
            <p className="text-medium font-bold mb-2">🎓 Practice Mode</p>
            <p className="text-small text-textSecondary">
              This is practice. No real money will be used.
            </p>
          </div>
        </GCard>

        {/* Scenario Info */}
        <div className="mb-6">
          <h1 className="text-large font-bold mb-2">{scenarioTitles[scenarioId] || 'Practice Scenario'}</h1>
          
          {/* Progress */}
          {getCurrentStep() !== 'success' && (
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-medium font-bold">
                  Step {getStepNumber()} of {getTotalSteps()}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-practiceOrange h-4 rounded-full transition-all duration-300"
                  style={{ width: `${(getStepNumber() / getTotalSteps()) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Step Content */}
        {getCurrentStep() !== 'success' && (
          <GCard variant="highlighted" testID="practice-step-card" className="mb-6">
            <div className="space-y-4">
              {scenarioId === '1' && renderSendMoneyScenario()}
              {scenarioId === '2' && renderPayBillScenario()}
              {scenarioId === '3' && renderBuyOnlineScenario()}
            </div>
          </GCard>
        )}

        {/* Success screens are rendered outside the card */}
        {getCurrentStep() === 'success' && (
          <div>
            {scenarioId === '1' && renderSendMoneyScenario()}
            {scenarioId === '2' && renderPayBillScenario()}
            {scenarioId === '3' && renderBuyOnlineScenario()}
          </div>
        )}

        {/* Navigation - only show if not on success screen */}
        {getCurrentStep() !== 'success' && (
          <div className="flex gap-4">
            {getStepNumber() > 1 && (
              <GButton
                label="Back"
                onPress={handleBack}
                variant="secondary"
                size="large"
                testID="practice-back-btn"
                className="flex-1"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
