'use client';

import { useState } from 'react';
import Image from 'next/image';

const CONVERTKIT_FORM_ID = '66f5eff770';

interface EmailCaptureProps {
  onSubmit: (email: string) => void;
}

export default function EmailCapture({ onSubmit }: EmailCaptureProps) {
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
      // Submit to ConvertKit
      const response = await fetch(
        `https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            api_key: process.env.NEXT_PUBLIC_CONVERTKIT_API_KEY,
            email: email,
          }),
        }
      );

      if (!response.ok) {
        // Fallback: try the form action endpoint
        const formData = new FormData();
        formData.append('email_address', email);

        await fetch(
          `https://app.convertkit.com/forms/${CONVERTKIT_FORM_ID}/subscriptions`,
          {
            method: 'POST',
            body: formData,
            mode: 'no-cors', // ConvertKit doesn't support CORS for this endpoint
          }
        );
      }

      onSubmit(email);
    } catch (err) {
      console.error('ConvertKit error:', err);
      // Still proceed even if there's an error (no-cors mode doesn't return response)
      onSubmit(email);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden animate-slideUp">
        {/* Success Badge */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-b-lg text-sm font-semibold">
          Correct Answer!
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 rounded-full p-3">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h2 className="text-white font-bold text-2xl mb-2">Great Job!</h2>
          <p className="text-green-100">You&apos;ve unlocked 5 more minutes of screen time</p>
        </div>

        {/* Content */}
        <div className="p-6">
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
              Be an Early Adopter!
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
                className={`w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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
