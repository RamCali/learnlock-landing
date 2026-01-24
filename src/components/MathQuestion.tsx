'use client';

import { useState } from 'react';
import Image from 'next/image';

interface MathQuestionProps {
  onCorrect: () => void;
}

interface AnswerOption {
  value: number;
  label: string;
  disabled: boolean;
}

export default function MathQuestion({ onCorrect }: MathQuestionProps) {
  // Generate a simple math problem
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

  const handleAnswer = (selectedValue: number) => {
    if (selectedValue === correctAnswer) {
      onCorrect();
    } else {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        className={`relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-transform ${
          shake ? 'animate-shake' : ''
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
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

        {/* Question */}
        <div className="p-6">
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

          {/* Hint text */}
          <p className="text-center text-gray-400 text-sm mt-4">
            Wrong answers will be eliminated
          </p>
        </div>
      </div>
    </div>
  );
}
