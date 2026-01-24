'use client';

import { useState } from 'react';
import Image from 'next/image';

interface MathQuestionProps {
  onCorrect: (unlockMinutes: number) => void;
}

interface AnswerOption {
  value: number;
  label: string;
  disabled: boolean;
}

export default function MathQuestion({ onCorrect }: MathQuestionProps) {
  const num1 = 7;
  const num2 = 5;
  const correctAnswer = num1 + num2;

  const [answers, setAnswers] = useState<AnswerOption[]>([
    { value: 10, label: '10', disabled: false },
    { value: 12, label: '12', disabled: false },
    { value: 14, label: '14', disabled: false },
    { value: 11, label: '11', disabled: false },
  ]);

  const [shake, setShake] = useState(false);
  const [unlockMinutes, setUnlockMinutes] = useState(5);
  const [showPenalty, setShowPenalty] = useState(false);

  const handleAnswer = (selectedValue: number) => {
    if (selectedValue === correctAnswer) {
      onCorrect(unlockMinutes);
    } else {
      // Reduce unlock time
      const newUnlockTime = Math.max(1, unlockMinutes - 1);
      setUnlockMinutes(newUnlockTime);

      // Show penalty animation
      setShowPenalty(true);
      setTimeout(() => setShowPenalty(false), 1000);

      // Disable the wrong answer
      setAnswers(prev =>
        prev.map(ans =>
          ans.value === selectedValue ? { ...ans, disabled: true } : ans
        )
      );

      // Trigger shake animation
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const getTimerColor = () => {
    if (unlockMinutes >= 4) return 'from-green-500 to-emerald-500';
    if (unlockMinutes >= 3) return 'from-yellow-500 to-amber-500';
    if (unlockMinutes >= 2) return 'from-orange-500 to-orange-600';
    return 'from-red-500 to-red-600';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        className={`relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-transform ${
          shake ? 'animate-shake' : ''
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/LearnLock_logo.png"
                alt="LearnLock"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <div>
                <h2 className="text-white font-bold text-lg">LearnLock</h2>
                <p className="text-blue-100 text-sm">Answer to continue watching</p>
              </div>
            </div>
          </div>
        </div>

        {/* Unlock Time Display */}
        <div className="px-6 pt-4">
          <div className={`relative bg-gradient-to-r ${getTimerColor()} rounded-xl p-4 text-white`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">Unlock Time</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-3xl font-bold">{unlockMinutes}</span>
                <span className="text-lg">min</span>
              </div>
            </div>

            {/* Time indicator dots */}
            <div className="flex gap-1.5 mt-3">
              {[1, 2, 3, 4, 5].map((dot) => (
                <div
                  key={dot}
                  className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                    dot <= unlockMinutes
                      ? 'bg-white'
                      : 'bg-white/30'
                  }`}
                />
              ))}
            </div>

            {/* Penalty animation */}
            {showPenalty && (
              <div className="absolute -top-2 -right-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold animate-bounce shadow-lg">
                -1 min
              </div>
            )}
          </div>

          <p className="text-center text-gray-500 text-xs mt-2">
            Wrong answers reduce your unlock time
          </p>
        </div>

        {/* Question */}
        <div className="p-6 pt-4">
          <div className="text-center mb-6">
            <p className="text-gray-500 text-sm mb-2">Math Question</p>
            <div className="bg-gray-50 rounded-xl py-6 px-4">
              <p className="text-4xl font-bold text-gray-800">
                {num1} + {num2} = ?
              </p>
            </div>
          </div>

          {/* Answer Options */}
          <div className="grid grid-cols-2 gap-3">
            {answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(answer.value)}
                disabled={answer.disabled}
                className={`py-4 px-6 rounded-xl text-xl font-semibold transition-all duration-200 ${
                  answer.disabled
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed line-through'
                    : 'bg-blue-50 text-blue-700 hover:bg-blue-100 hover:scale-105 active:scale-95 border-2 border-transparent hover:border-blue-300'
                }`}
              >
                {answer.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
