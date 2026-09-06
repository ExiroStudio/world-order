'use client';

import React, { useState } from 'react';
import { GameState } from '@/types/game';
import { TEAMS_ORDER } from '@/lib/gameConfig';

interface QuestionModalProps {
  state: GameState;
  isMyTurn: boolean;
  onAnswer: (chosenIndex: number) => void;
  onExecuteMove: () => void;
}

export const QuestionModal: React.FC<QuestionModalProps> = ({
  state,
  isMyTurn,
  onAnswer,
  onExecuteMove,
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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-[#151922]/95 border border-[#333d4e] rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl text-[#eae6da] relative">
        {/* Eyebrow / Dossier Header */}
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-[#252c38]">
          <div className="text-xs font-bold text-[#c9a13b] tracking-wider uppercase flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full shadow-sm"
              style={{ backgroundColor: currentTeam.colorHex }}
            />
            <span className="font-mono">Pertanyaan Ideologi — {currentTeam.name}</span>
          </div>
          <span className="text-xs font-mono bg-[#1d222c] border border-[#333d4e] px-2.5 py-1 rounded-lg text-[#c9a13b] font-bold">
            🎲 Dadu: {state.activeDice}
          </span>
        </div>

        {/* Question Text */}
        <h3 className="font-serif text-lg sm:text-xl font-bold leading-snug mb-5 text-[#f4ecd8]">
          {question.q}
        </h3>

        {/* Options Deck */}
        <div className="space-y-2.5 mb-5">
          {question.opts.map((opt, idx) => {
            const hasAnswered = answered !== null || selectedIdx !== null;
            const isCorrectOption = idx === question.correct;
            const isChosen =
              answered !== null
                ? answered.chosenIndex === idx
                : selectedIdx === idx;

            let btnClasses =
              'w-full text-left p-3.5 rounded-xl border font-medium text-xs sm:text-sm transition-all duration-200';

            if (!hasAnswered) {
              btnClasses += isMyTurn
                ? ' bg-[#1d232e] border-[#2e3748] text-[#eae6da] hover:bg-[#252c3a] hover:border-[#c9a13b]/70 hover:scale-[1.01] cursor-pointer active:scale-[0.99] shadow-sm'
                : ' bg-[#1a1f29]/70 border-[#2a3240] text-[#7d8695] cursor-not-allowed';
            } else {
              if (isCorrectOption) {
                btnClasses +=
                  ' bg-emerald-950/70 border-emerald-500 text-emerald-200 font-semibold ring-2 ring-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]';
              } else if (isChosen && !isCorrectOption) {
                btnClasses +=
                  ' bg-rose-950/70 border-rose-500 text-rose-200 font-semibold ring-1 ring-rose-500/50';
              } else {
                btnClasses += ' bg-[#151922]/50 border-[#2a3240]/40 text-[#606977] opacity-60';
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
                <div className="flex items-start gap-3">
                  <span
                    className={`font-mono text-xs px-1.5 py-0.5 rounded ${
                      hasAnswered && isCorrectOption
                        ? 'bg-emerald-500 text-black font-bold'
                        : hasAnswered && isChosen && !isCorrectOption
                        ? 'bg-rose-500 text-white font-bold'
                        : 'bg-[#151922] text-[#c9a13b] border border-[#333d4e]'
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1 leading-snug">{opt}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Educational Feedback Result & Hint Deck */}
        {answered && (
          <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Status Hint Banner */}
            <div
              className={`p-4 rounded-2xl border ${
                answered.isCorrect
                  ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200'
                  : 'bg-rose-950/40 border-rose-500/60 text-rose-200'
              }`}
            >
              <div className="flex items-center justify-between font-bold text-sm mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-base">
                    {answered.isCorrect ? '🎯' : '❌'}
                  </span>
                  <span>
                    {answered.isCorrect ? 'Jawaban Benar!' : 'Jawaban Salah!'}
                  </span>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-black/40 border border-current">
                  {answered.isCorrect
                    ? `Maju +${state.activeDice} Petak`
                    : `Mundur -${state.activeDice} Petak`}
                </span>
              </div>

              {/* Property Permission Status */}
              <div className="text-xs flex items-center gap-1.5 font-medium py-1 px-2 rounded-lg bg-black/30 border border-white/5 mb-2">
                <span>{answered.isCorrect ? '🏛️' : '⛔'}</span>
                <span>
                  {answered.isCorrect
                    ? 'Berhak membeli wilayah jika mendarat di negara netral.'
                    : 'Hanya melewati wilayah. TIDAK DIIZINKAN membeli properti!'}
                </span>
              </div>

              {/* Explanation Why */}
              <div className="text-[11.5px] opacity-90 leading-relaxed pt-1 border-t border-white/10">
                <span className="font-bold">Penjelasan: </span>
                {question.why}
              </div>
            </div>

            {/* Action Continue Button */}
            {isMyTurn ? (
              <button
                type="button"
                onClick={onExecuteMove}
                className="w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#c9a13b] to-[#deb447] text-[#14171d] hover:brightness-110 active:scale-98 cursor-pointer shadow-[0_0_20px_rgba(201,161,59,0.4)] transition-all flex items-center justify-center gap-2"
              >
                <span>Lanjutkan Perjalanan</span>
                <span className="text-base">➔</span>
              </button>
            ) : (
              <div className="text-center py-2 text-xs text-[#848d9c] italic font-medium">
                Menunggu {currentTeam.name} melanjutkan langkah...
              </div>
            )}
          </div>
        )}

        {!isMyTurn && !answered && (
          <div className="mt-3 text-center text-xs text-[#848d9c] italic">
            Menunggu {currentTeam.name} menjawab pertanyaan...
          </div>
        )}
      </div>
    </div>
  );
};
