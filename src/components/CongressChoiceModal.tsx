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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-[#262b35] border border-red-500/70 rounded-2xl max-w-lg w-full p-6 shadow-2xl text-[#eae6da] relative">
        <div className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <span>⚠️ Sanksi Kongres Dunia (Gerak Mundur)</span>
        </div>

        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#f4ecd8] mb-2">
          Pilihan Pertanggungjawaban
        </h3>

        <p className="text-xs text-[#9aa1ad] leading-relaxed mb-5">
          {team.name} melewati Kongres Dunia akibat jawaban salah. Sesuai
          konstitusi dunia, Anda wajib memilih salah satu opsi berikut:
        </p>

        {/* Option A: Tribute */}
        <div className="p-4 rounded-xl bg-[#1c1f26] border border-[#3a4150] mb-4 hover:border-[#c9a13b]/50 transition-colors">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h4 className="font-bold text-sm text-[#eae6da]">
                Opsi A: Bayar Upeti Diplomatik
              </h4>
              <p className="text-xs text-[#9aa1ad] mt-0.5">
                Bayar ${pending.tributeAmountPerOpponent} ke setiap dari{' '}
                {activeOpponents.length} ideologi lawan.
              </p>
            </div>
            <span className="font-mono font-bold text-red-400 text-sm">
              -${totalTribute}
            </span>
          </div>

          {team.id === 'fasisme' && (
            <div className="text-[11px] text-amber-400 mb-2">
              ✦ Perk Ekspansi Paksa: Anda hanya membayar 50% upeti normal!
            </div>
          )}

          <button
            type="button"
            disabled={!isMyTurn}
            onClick={() => onChoice('tribute')}
            className="w-full mt-2 py-2 px-4 rounded-lg bg-[#3a4150] hover:bg-[#4b5563] text-white font-semibold text-xs transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Pilih Bayar Upeti (${totalTribute})
          </button>
        </div>

        {/* Option B: Sell Country */}
        <div className="p-4 rounded-xl bg-[#1c1f26] border border-[#3a4150]">
          <h4 className="font-bold text-sm text-[#eae6da] mb-1">
            Opsi B: Lepas / Jual 1 Negara ke Bank
          </h4>
          <p className="text-xs text-[#9aa1ad] mb-3">
            Pilih 1 wilayah untuk dikembalikan ke bank. Anda akan menerima
            kompensasi 50% dari harga beli.
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
                  className={`w-full text-left p-2 rounded-lg border text-xs flex items-center justify-between transition-colors ${
                    isSelected
                      ? 'bg-[#c9a13b]/20 border-[#c9a13b] text-[#eae6da]'
                      : 'bg-[#262b35] border-[#3a4150] text-[#9aa1ad] hover:text-[#eae6da]'
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
            className="w-full py-2 px-4 rounded-lg bg-[#c9a13b] hover:bg-[#deb447] text-[#1c1f26] font-bold text-xs transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
          >
            Lepas Wilayah Terpilih
          </button>
        </div>

        {!isMyTurn && (
          <div className="mt-4 text-center text-xs text-[#9aa1ad] italic">
            Menunggu {team.name} menentukan pilihan...
          </div>
        )}
      </div>
    </div>
  );
};
