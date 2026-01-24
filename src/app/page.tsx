'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import MathQuestion from '@/components/MathQuestion';
import EmailCapture from '@/components/EmailCapture';
import ThankYou from '@/components/ThankYou';

type Screen = 'question' | 'unlocking' | 'email' | 'thankyou' | 'complete';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('question');
  const [showDemo, setShowDemo] = useState(false);
  const [earnedMinutes, setEarnedMinutes] = useState(5);
  const [videoPaused, setVideoPaused] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Auto-show the question popup after a brief delay and pause video
  useEffect(() => {
    const timer = setTimeout(() => {
      setVideoPaused(true);
      setShowDemo(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Control video playback
  useEffect(() => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      if (videoPaused) {
        iframeRef.current.contentWindow.postMessage(
          '{"event":"command","func":"pauseVideo","args":""}',
          '*'
        );
      } else {
        iframeRef.current.contentWindow.postMessage(
          '{"event":"command","func":"playVideo","args":""}',
          '*'
        );
      }
    }
  }, [videoPaused]);

  const handleCorrectAnswer = (unlockMinutes: number) => {
    setEarnedMinutes(unlockMinutes);
    // Show "unlocking" state - video plays briefly to demonstrate the reward
    setCurrentScreen('unlocking');
    setVideoPaused(false); // Resume video to show the reward experience

    // After 2 seconds, pause again and show email capture
    setTimeout(() => {
      setVideoPaused(true);
      setCurrentScreen('email');
    }, 2000);
  };

  const handleEmailSubmit = (email: string) => {
    console.log('Email submitted:', email);
    setCurrentScreen('thankyou');
  };

  const handleClose = () => {
    setCurrentScreen('complete');
    setVideoPaused(false); // Resume video when complete
  };

  const handleRestart = () => {
    setEarnedMinutes(5);
    setVideoPaused(true);
    setCurrentScreen('question');
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      {/* YouTube Background with API enabled for pause/play control */}
      <div className="youtube-container">
        <iframe
          ref={iframeRef}
          src="https://www.youtube.com/embed/QJI0an6irrA?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&playlist=QJI0an6irrA&enablejsapi=1"
          title="YouTube video background"
          style={{ border: 'none' }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="pointer-events-none"
        />
        <div className="youtube-overlay" />

        {/* Pause overlay when video is paused */}
        {videoPaused && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
            <div className="bg-black/60 rounded-full p-4">
              <svg className="w-16 h-16 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Floating Header */}
      <header className="absolute top-0 left-0 right-0 z-40 p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-4 py-2">
            <Image
              src="/LearnLock_logo.png"
              alt="LearnLock"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="text-white font-semibold">LearnLock Demo</span>
          </div>

          {currentScreen === 'complete' && (
            <button
              onClick={handleRestart}
              className="bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full hover:bg-white/20 transition-colors text-sm font-medium"
            >
              Restart Demo
            </button>
          )}
        </div>
      </header>

      {/* Timer Badge - Shows when complete */}
      {currentScreen === 'complete' && (
        <div className="absolute top-20 right-4 z-40 bg-green-500 text-white px-4 py-2 rounded-full flex items-center gap-2 animate-slideUp">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-semibold">{earnedMinutes}:00 unlocked</span>
        </div>
      )}

      {/* Popups based on current screen */}
      {showDemo && currentScreen === 'question' && (
        <MathQuestion onCorrect={handleCorrectAnswer} />
      )}

      {currentScreen === 'email' && (
        <EmailCapture onSubmit={handleEmailSubmit} />
      )}

      {currentScreen === 'thankyou' && (
        <ThankYou onClose={handleClose} />
      )}

      {/* Complete State - Show unlocked message */}
      {currentScreen === 'complete' && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 text-center animate-slideUp">
            <p className="text-white text-lg font-semibold mb-1">
              Screen time unlocked!
            </p>
            <p className="text-white/70 text-sm">
              This is how LearnLock transforms screen time into learning time
            </p>
          </div>
        </div>
      )}

      {/* Pre-popup state - show waiting indicator */}
      {!showDemo && (
        <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl px-6 py-3 text-center">
            <p className="text-white/90 text-sm font-medium">Video playing...</p>
          </div>
        </div>
      )}

      {/* Unlocking state - brief reward moment */}
      {currentScreen === 'unlocking' && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-40 animate-slideUp">
          <div className="bg-green-500 text-white px-6 py-3 rounded-full flex items-center gap-3 shadow-lg">
            <svg className="w-6 h-6 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
            </svg>
            <span className="font-semibold text-lg">Unlocking {earnedMinutes} minutes...</span>
          </div>
        </div>
      )}
    </main>
  );
}
