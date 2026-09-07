'use client';

import React, { useState } from 'react';
import { GameState, PendingCongressChoice } from '@/types/game';
import { TILES } from '@/lib/board';
import { GAME_CONFIG, TEAMS_ORDER } from '@/lib/gameConfig';

interface CongressChoiceModalProps {
  state: GameState;
  isMyTurn: boolean;
  onChoice: (choice: 'tribute' | 'sell', countryIndex?: number) => void;
}

export const CongressChoiceModal: React.FC<CongressChoiceModalProps> = ({
  state,
  isMyTurn,
  onChoice,
}) => {
  const [selectedCountryIdx, setSelectedCountryIdx] = useState<number | null>(
    null
  );

  const isOpen =
    state.phase === 'CHOICE' &&
    state.pendingChoice?.type === 'CONGRESS_PENALTY';

  if (!isOpen) return null;

  const pending = state.pendingChoice as PendingCongressChoice;
  const team = state.teams[pending.teamId];
  const activeOpponents = TEAMS_ORDER.filter(
    (id) =>
      id !== pending.teamId &&
      !state.teams[id].bankrupt &&
      !state.teams[id].isNeutral
  );
  const totalTribute =
    pending.tributeAmountPerOpponent * activeOpponents.length;

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 z-50 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#151922]/95 border border-rose-500/50 rounded-2xl sm:rounded-3xl max-w-lg w-full p-4 sm:p-6 shadow-2xl text-[#eae6da] relative my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-[#252c38] shrink-0">
          <div className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span>Sanksi Konstitusi Kongres Dunia</span>
          </div>
          <span className="text-xs font-mono bg-rose-950/50 border border-rose-500/40 text-rose-300 px-2 py-0.5 rounded-md">
            Gerak Mundur
          </span>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto overscroll-contain pr-1 min-h-0 space-y-4">
          <div>
            <h3 className="font-serif text-lg sm:text-2xl font-bold text-[#f4ecd8] mb-1">
              Pilihan Pertanggungjawaban
            </h3>
            <p className="text-xs text-[#848d9c] leading-relaxed">
              {team.name} melewati Kongres Dunia akibat jawaban salah. Pilih salah satu klausul penyelesaian berikut:
            </p>
          </div>

          {/* Option A: Tribute Deck */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#1a202c] border border-[#2b3546] hover:border-[#c9a13b]/60 transition-colors shadow-sm">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h4 className="font-bold text-sm text-[#f4ecd8]">
                  Klausul A: Bayar Upeti Diplomatik
                </h4>
                <p className="text-xs text-[#848d9c] mt-0.5 leading-snug">
                  Bayar ${pending.tributeAmountPerOpponent} ke masing-masing dari{' '}
                  {activeOpponents.length} ideologi lawan aktif.
                </p>
              </div>
              <span className="font-mono font-bold text-rose-400 text-sm bg-black/40 px-2 py-0.5 rounded-lg border border-rose-500/30 shrink-0">
                -${totalTribute}
              </span>
            </div>

            {team.id === 'fasisme' && (
              <div className="text-[11px] text-amber-400 my-1.5 font-medium">
                ✦ Perk Ekspansi Paksa: Hanya menanggung 50% upeti normal!
              </div>
            )}

            <button
              type="button"
              disabled={!isMyTurn}
              onClick={() => onChoice('tribute')}
              className="w-full mt-2 py-2.5 px-4 rounded-xl bg-[#262e3d] hover:bg-[#323d50] border border-[#3b475c] text-white font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Pilih Bayar Upeti (${totalTribute})
            </button>
          </div>

          {/* Option B: Sell Country Deck */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#1a202c] border border-[#2b3546] shadow-sm">
            <h4 className="font-bold text-sm text-[#f4ecd8] mb-1">
              Klausul B: Lepas / Jual 1 Wilayah ke Bank
            </h4>
            <p className="text-xs text-[#848d9c] mb-3 leading-snug">
              Kembalikan 1 negara yang dikuasai untuk menerima dana likuidasi 50%.
            </p>

            <div className="max-h-36 overflow-y-auto space-y-1.5 mb-3 pr-1">
              {pending.ownedCountryIndices.map((idx) => {
                const tile = TILES[idx];
                const refund = Math.round(
                  (tile.price || 0) * GAME_CONFIG.COUNTRY_SELL_RATIO
                );
                const isSelected = selectedCountryIdx === idx;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedCountryIdx(idx)}
                    className={`w-full text-left p-2.5 rounded-xl border text-xs flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'bg-[#c9a13b]/20 border-[#c9a13b] text-[#f4ecd8] shadow-sm'
                        : 'bg-[#151922] border-[#2b3546] text-[#848d9c] hover:text-[#eae6da] hover:border-[#3a475c]'
                    }`}
                  >
                    <span className="font-medium">{tile.name}</span>
                    <span className="font-mono text-emerald-400 font-bold">
                      +${refund}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              disabled={!isMyTurn || selectedCountryIdx === null}
              onClick={() =>
                selectedCountryIdx !== null &&
                onChoice('sell', selectedCountryIdx)
              }
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#c9a13b] to-[#deb447] text-[#14171d] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed shadow-md"
            >
              Lepas Wilayah Terpilih
            </button>
          </div>
        </div>

        {!isMyTurn && (
          <div className="shrink-0 pt-3 border-t border-[#252c38] text-center text-xs text-[#848d9c] italic">
            Menunggu {team.name} menentukan pilihan...
          </div>
        )}
      </div>
    </div>
  );
};
