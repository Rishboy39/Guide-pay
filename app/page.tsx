'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { GButton } from '@/components/ui/GButton';
import { APP_NAME, TAGLINE } from '@/shared/constants';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative px-4 py-24 md:py-32 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primaryBlue opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primaryGreen opacity-10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div className="text-center md:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm mb-6 border border-gray-200">
                <span className="text-2xl">✨</span>
                <span className="text-medium font-bold text-textPrimary">Trusted by families nationwide</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primaryGreen via-primaryBlue to-primaryGreen bg-clip-text text-transparent leading-tight">
                {APP_NAME}
              </h1>
              
              <p className="text-2xl md:text-3xl font-bold text-textPrimary mb-6 max-w-2xl mx-auto md:mx-0">
                {TAGLINE}
              </p>
              
              <p className="text-xl text-textSecondary mb-12 max-w-2xl mx-auto md:mx-0 leading-relaxed">
                The smart way to handle money online. Whether you&apos;re paying bills, shopping, or managing finances, 
                GuidePay makes it simple, safe, and stress-free.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center mb-12">
                <GButton
                  label="Get Started Free"
                  onPress={() => router.push('/signup')}
                  variant="primary"
                  size="large"
                  testID="sign-up-btn"
                  className="shadow-lg hover:shadow-xl transition-shadow"
                />
                <GButton
                  label="Sign In"
                  onPress={() => router.push('/login')}
                  variant="secondary"
                  size="large"
                  testID="sign-in-btn"
                  className="shadow-md hover:shadow-lg transition-shadow"
                />
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap justify-center md:justify-start gap-8 text-medium text-textSecondary">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🔒</span>
                  <span>Secure & Private</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⚡</span>
                  <span>Easy to Use</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">👨‍👩‍👧‍👦</span>
                  <span>Family Friendly</span>
                </div>
              </div>
            </div>

            {/* Right side - Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/hero-image.png"
                  alt="GuidePay helps families manage online payments together"
                  className="w-full h-auto object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primaryGreen/20 to-transparent pointer-events-none rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="px-4 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-textPrimary">
              Everything you need, all in one place
            </h2>
            <p className="text-xl text-textSecondary max-w-2xl mx-auto">
              Powerful features designed to make online payments simple and secure
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100">
              <div className="text-6xl mb-6">🌐</div>
              <h3 className="text-2xl font-bold mb-3 text-textPrimary">Works Everywhere</h3>
              <p className="text-lg text-textSecondary leading-relaxed">
                Use GuidePay on any website or app - from your bank to Amazon, utilities to Medicare. 
                No matter where you shop or pay, we&apos;ve got you covered.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100">
              <div className="text-6xl mb-6">👨‍👩‍👧‍👦</div>
              <h3 className="text-2xl font-bold mb-3 text-textPrimary">Family Support</h3>
              <p className="text-lg text-textSecondary leading-relaxed">
                Get real-time help from family members. They can guide you through any transaction 
                while you stay in complete control.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100">
              <div className="text-6xl mb-6">🎓</div>
              <h3 className="text-2xl font-bold mb-3 text-textPrimary">Practice First</h3>
              <p className="text-lg text-textSecondary leading-relaxed">
                Learn at your own pace with practice mode. Try transactions with fake money 
                until you feel confident, then go live.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Differentiators */}
      <section className="px-4 py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-textPrimary">
              Designed with you in mind
            </h2>
            <p className="text-xl text-textSecondary max-w-2xl mx-auto">
              Every feature built to give you confidence and independence
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-primaryBlue">
              <div className="flex items-start gap-4">
                <span className="text-4xl flex-shrink-0">🔒</span>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-textPrimary">Stable & Reliable</h3>
                  <p className="text-lg text-textSecondary">
                    Our interface stays consistent. No surprise changes or confusing updates - 
                    once you learn it, you know it.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-primaryGreen">
              <div className="flex items-start gap-4">
                <span className="text-4xl flex-shrink-0">👆</span>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-textPrimary">You&apos;re in Charge</h3>
                  <p className="text-lg text-textSecondary">
                    You make every decision and press every button. Family members guide and support, 
                    but you&apos;re always in control.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-practiceOrange">
              <div className="flex items-start gap-4">
                <span className="text-4xl flex-shrink-0">💳</span>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-textPrimary">Family Covers Cost</h3>
                  <p className="text-lg text-textSecondary">
                    Your family member handles the subscription. You focus on using the app, 
                    they handle the billing.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-primaryBlue">
              <div className="flex items-start gap-4">
                <span className="text-4xl flex-shrink-0">♿</span>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-textPrimary">Easy to Read & Use</h3>
                  <p className="text-lg text-textSecondary">
                    Large, clear text. Big, easy-to-tap buttons. High contrast colors. 
                    Everything designed for comfort and clarity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 bg-gradient-to-r from-primaryGreen via-primaryBlue to-primaryGreen text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to take control?
          </h2>
          <p className="text-xl md:text-2xl mb-10 opacity-95 leading-relaxed">
            Join thousands of families who trust GuidePay for safe, simple online payments. 
            Start your free trial today - no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <GButton
              label="Start Free Trial"
              onPress={() => router.push('/signup')}
              variant="secondary"
              size="large"
              testID="cta-trial-btn"
              className="shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105"
            />
            <button
              onClick={() => router.push('/login')}
              className="text-xl font-bold underline hover:no-underline transition-all"
            >
              Already have an account? Sign in →
            </button>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-lg opacity-90">
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>No credit card needed</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-12 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-primaryGreen">{APP_NAME}</h3>
              <p className="text-gray-400 leading-relaxed">
                Making online payments simple, safe, and accessible for everyone.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button onClick={() => router.push('/signup')} className="hover:text-white transition-colors">
                    Sign Up
                  </button>
                </li>
                <li>
                  <button onClick={() => router.push('/login')} className="hover:text-white transition-colors">
                    Sign In
                  </button>
                </li>
                <li>
                  <button onClick={() => router.push('/help')} className="hover:text-white transition-colors">
                    Help & Support
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Contact</h4>
              <p className="text-gray-400">
                Need help? We&apos;re here for you.
              </p>
              <p className="text-gray-400 mt-2">
                support@guidepay.com
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
            <p>© 2024 {APP_NAME}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
