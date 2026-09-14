'use client';

import React from 'react';
import { TeamId } from '@/types/game';
import { TEAM_DEFINITIONS } from '@/lib/gameConfig';

interface LeaveConsequenceModalProps {
  isOpen: boolean;
  teamId: TeamId;
  countryCount: number;
  penaltyAmount: number;
  wasInQuestionPhase: boolean;
  onDismiss: () => void;
}

export const LeaveConsequenceModal: React.FC<LeaveConsequenceModalProps> = ({
  isOpen,
  teamId,
  countryCount,
  penaltyAmount,
  wasInQuestionPhase,
  onDismiss,
}) => {
  if (!isOpen) return null;

  const team = TEAM_DEFINITIONS[teamId];

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-[#181c25] border-2 border-rose-500/70 rounded-2xl sm:rounded-3xl max-w-md w-full p-5 sm:p-7 shadow-[0_0_50px_rgba(244,63,94,0.3)] text-[#eae6da] relative my-auto">
        {/* Header Badge */}
        <div className="flex items-center justify-between pb-3 border-b border-[#2e3748] mb-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-400">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
            <span>Kelengahan Terdeteksi</span>
          </div>
          <span className="text-[11px] font-mono bg-rose-950/80 border border-rose-800 text-rose-300 px-2.5 py-0.5 rounded-full">
            Sistem Anti-Kecurangan
          </span>
        </div>

        {/* Narrative Consequence Quote */}
        <div className="bg-rose-950/30 border border-rose-500/40 rounded-xl p-4 mb-4 text-center">
          <div className="text-2xl mb-1">🕵️‍♂️ 📉</div>
          <blockquote className="font-serif text-base sm:text-lg font-bold text-rose-200 leading-snug italic">
            &ldquo;Anda meninggalkan permainan, para ideologi mulai mencuri dari anda&rdquo;
          </blockquote>
          <p className="text-[11px] text-[#9aa1ad] mt-2 leading-relaxed">
            Ini bukan sekadar hukuman, melainkan akibat geopolitik dari kekosongan kendali. Ketika Anda berpindah jendela atau aplikasi, rival ideologi Anda langsung memanfaatkan momentum untuk merongrong stabilitas Anda.
          </p>
        </div>

        {/* Impact Breakdown Table */}
        <div className="bg-[#12151c] rounded-xl border border-[#2c3342] p-3.5 space-y-2.5 mb-5 text-xs">
          <div className="flex items-center justify-between text-[#9aa1ad]">
            <span>Ideologi Terdampak:</span>
            <span
              className="font-bold flex items-center gap-1.5"
              style={{ color: team.lightHex }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: team.colorHex }}
              />
              {team.name}
            </span>
          </div>

          <div className="flex items-center justify-between text-[#9aa1ad]">
            <span>Kepemilikan Negara:</span>
            <span className="font-mono font-bold text-[#eae6da]">
              {countryCount > 0 ? `${countryCount} Wilayah Negara` : '0 Wilayah (Tarif Minimum)'}
            </span>
          </div>

          <div className="flex items-center justify-between text-[#9aa1ad]">
            <span>Formula Akibat:</span>
            <span className="font-mono text-[#c9a13b]">
              $100 × {countryCount > 0 ? countryCount : 1}
            </span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#262c38] text-sm">
            <span className="font-semibold text-rose-300">Total Kas Tercuri:</span>
            <span className="font-mono font-bold text-rose-400">
              -${penaltyAmount}
            </span>
          </div>

          {wasInQuestionPhase && (
            <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-500/40 text-amber-200 text-[11px] leading-relaxed">
              ⚠️ <strong>Pertanyaan Dibatalkan:</strong> Karena Anda beralih dari papan permainan saat pertanyaan aktif, jawaban otomatis dinyatakan SALAH dan pion dipaksa mundur.
            </div>
          )}
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={onDismiss}
          className="w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white cursor-pointer active:scale-98 shadow-lg shadow-rose-900/30 transition-all text-center"
        >
          Kembali Mengendalikan Permainan
        </button>
      </div>
    </div>
  );
};
