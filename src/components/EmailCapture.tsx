'use client';

import { useState } from 'react';
import Image from 'next/image';

interface EmailCaptureProps {
  onSubmit: (email: string) => void;
}

export default function EmailCapture({ onSubmit }: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      onSubmit(email);
    } else {
      setIsValid(false);
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
                }}
                placeholder="Enter your email"
                className={`w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isValid
                    ? 'border-gray-200 focus:border-blue-500'
                    : 'border-red-400 bg-red-50'
                }`}
              />
              {!isValid && (
                <p className="text-red-500 text-sm mt-1">Please enter a valid email</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            >
              Get Early Access
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
