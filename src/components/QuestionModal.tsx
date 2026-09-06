'use client';

import React, { useState } from 'react';
import { GameState } from '@/types/game';
import { TEAMS_ORDER } from '@/lib/gameConfig';

interface QuestionModalProps {
  state: GameState;
  isMyTurn: boolean;
  onAnswer: (chosenIndex: number) => void;
}

export const QuestionModal: React.FC<QuestionModalProps> = ({
  state,
  isMyTurn,
  onAnswer,
}) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [prevQuestionId, setPrevQuestionId] = useState<number | undefined>(
    state.currentQuestion?.id
  );

  const isOpen = state.phase === 'QUESTION' && !!state.currentQuestion;
  const question = state.currentQuestion;
  const currentTeam = state.teams[TEAMS_ORDER[state.turnIndex]];
  const answered = state.questionAnswered;

  // Reset local selection when question changes during render
  if (question?.id !== prevQuestionId) {
    setPrevQuestionId(question?.id);
    setSelectedIdx(null);
  }

  if (!isOpen || !question) return null;

  const handleOptionClick = (index: number) => {
    if (!isMyTurn || selectedIdx !== null || answered !== null) return;
    setSelectedIdx(index);
    onAnswer(index);
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-[#262b35] border border-[#3a4150] rounded-2xl max-w-lg w-full p-6 shadow-2xl text-[#eae6da] relative">
        {/* Eyebrow */}
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs font-bold text-[#c9a13b] tracking-wider uppercase flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: currentTeam.colorHex }}
            />
            <span>Pertanyaan — {currentTeam.name}</span>
          </div>
          <span className="text-xs font-mono bg-[#1c1f26] border border-[#3a4150] px-2 py-0.5 rounded text-[#9aa1ad]">
            Dadu: {state.activeDice}
          </span>
        </div>

        {/* Question Text */}
        <h3 className="font-serif text-lg sm:text-xl font-bold leading-snug mb-5 text-[#f4ecd8]">
          {question.q}
        </h3>

        {/* Options */}
        <div className="space-y-2.5 mb-4">
          {question.opts.map((opt, idx) => {
            const hasAnswered = answered !== null || selectedIdx !== null;
            const isCorrectOption = idx === question.correct;
            const isChosen =
              answered !== null
                ? answered.chosenIndex === idx
                : selectedIdx === idx;

            let btnClasses =
              'w-full text-left p-3.5 rounded-xl border font-medium text-sm transition-all duration-200';

            if (!hasAnswered) {
              btnClasses += isMyTurn
                ? ' bg-[#2f3540] border-[#3a4150] text-[#eae6da] hover:bg-[#39404d] hover:border-[#c9a13b]/60 cursor-pointer active:scale-[0.99]'
                : ' bg-[#2f3540]/60 border-[#3a4150] text-[#9aa1ad] cursor-not-allowed';
            } else {
              if (isCorrectOption) {
                btnClasses +=
                  ' bg-[#1b432e] border-emerald-500 text-emerald-100 font-semibold ring-1 ring-emerald-500';
              } else if (isChosen && !isCorrectOption) {
                btnClasses +=
                  ' bg-[#4d1f24] border-red-500 text-red-100 font-semibold';
              } else {
                btnClasses += ' bg-[#1c1f26]/50 border-[#3a4150]/40 text-[#9aa1ad]/60';
              }
            }

            return (
              <button
                key={idx}
                type="button"
                disabled={!isMyTurn || hasAnswered}
                onClick={() => handleOptionClick(idx)}
                className={btnClasses}
              >
                <div className="flex items-start gap-2.5">
                  <span className="font-mono text-xs opacity-60 mt-0.5">
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  <span className="flex-1">{opt}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Educational Feedback Result */}
        {answered && (
          <div className="p-3.5 rounded-xl bg-[#1c1f26] border border-[#3a4150] text-xs leading-relaxed text-[#9aa1ad] animate-in fade-in duration-300">
            <div className="font-bold mb-1 flex items-center gap-1.5">
              {answered.isCorrect ? (
                <span className="text-emerald-400">✔ Jawaban Benar!</span>
              ) : (
                <span className="text-red-400">✘ Jawaban Salah.</span>
              )}
            </div>
            <div>{question.why}</div>
          </div>
        )}

        {!isMyTurn && !answered && (
          <div className="mt-3 text-center text-xs text-[#9aa1ad] italic">
            Menunggu {currentTeam.name} menjawab pertanyaan...
          </div>
        )}
      </div>
    </div>
  );
};
