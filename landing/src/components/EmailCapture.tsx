'use client';

import { useState } from 'react';
import Image from 'next/image';

interface EmailCaptureProps {
  onSubmit: (email: string) => void;
}

export default function EmailCapture({ onSubmit }: EmailCaptureProps) {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setIsValid(false);
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit to our API route which handles ConvertKit
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, firstName }),
      });

      if (!response.ok) {
        const data = await response.json();
        console.error('Subscribe error:', data);
      }

      onSubmit(email);
    } catch (err) {
      console.error('Subscribe error:', err);
      // Still proceed to thank you screen
      onSubmit(email);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden animate-slideUp">
        {/* Content */}
        <div className="p-6 pt-8">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Image
                src="/LearnLock_logo.png"
                alt="LearnLock"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="font-bold text-gray-800">LearnLock</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Would you like to turn your child&apos;s Screen Time into Learning Time?
            </h3>
            <p className="text-gray-600 text-sm">
              Transform your child&apos;s screen time into learning time.
              Get early access and special pricing when we launch.
            </p>
          </div>

          {/* Benefits */}
          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Math &amp; vocabulary questions while browsing</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Works on YouTube, websites &amp; more</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Parent dashboard with progress tracking</span>
              </li>
            </ul>
          </div>

          {/* Email Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                disabled={isSubmitting}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400 border-gray-200 focus:border-blue-500 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setIsValid(true);
                  setError('');
                }}
                placeholder="Enter your email"
                disabled={isSubmitting}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400 ${
                  isValid && !error
                    ? 'border-gray-200 focus:border-blue-500'
                    : 'border-red-400 bg-red-50'
                } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              />
              {!isValid && (
                <p className="text-red-500 text-sm mt-1">Please enter a valid email</p>
              )}
              {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg ${
                isSubmitting
                  ? 'opacity-70 cursor-not-allowed'
                  : 'hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Joining...
                </span>
              ) : (
                'Get Early Access'
              )}
            </button>
          </form>

          <p className="text-center text-gray-400 text-xs mt-4">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  );
}
