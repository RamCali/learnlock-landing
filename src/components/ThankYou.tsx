'use client';

import Image from 'next/image';

interface ThankYouProps {
  onClose: () => void;
}

export default function ThankYou({ onClose }: ThankYouProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden animate-slideUp">
        {/* Confetti background effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="confetti-container">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][
                    Math.floor(Math.random() * 5)
                  ],
                }}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative p-8 text-center">
          {/* Celebration Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full p-4 animate-bounce">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              {/* Sparkles */}
              <div className="absolute -top-2 -right-2 text-2xl animate-ping">✨</div>
              <div className="absolute -bottom-1 -left-2 text-xl animate-ping" style={{ animationDelay: '0.2s' }}>🎉</div>
            </div>
          </div>

          {/* Logo and Title */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <Image
              src="/LearnLock_logo.png"
              alt="LearnLock"
              width={36}
              height={36}
              className="rounded-lg"
            />
            <span className="font-bold text-gray-800 text-lg">LearnLock</span>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            You&apos;re on the list!
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for joining our early adopter community.
            We&apos;ll notify you as soon as LearnLock is ready!
          </p>

          {/* What's Next Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6 text-left">
            <p className="font-semibold text-gray-800 mb-2">What&apos;s next?</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">1.</span>
                <span>Check your inbox for a confirmation email</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">2.</span>
                <span>Share LearnLock with other parents</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">3.</span>
                <span>Get early access when we launch!</span>
              </li>
            </ul>
          </div>

          {/* Share Buttons */}
          <div className="flex gap-3 justify-center mb-6">
            <button className="flex items-center gap-2 bg-[#1DA1F2] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1a8cd8] transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              Share
            </button>
            <button className="flex items-center gap-2 bg-[#0077B5] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#006399] transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Share
            </button>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
          >
            Continue Watching
          </button>
        </div>
      </div>
    </div>
  );
}
