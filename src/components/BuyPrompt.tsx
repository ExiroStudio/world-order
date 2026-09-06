'use client';

import React from 'react';
import { GameState, PendingBuyChoice } from '@/types/game';
import { TILES, CONTINENTS } from '@/lib/board';

interface BuyPromptProps {
  state: GameState;
  isMyTurn: boolean;
  onDecision: (buy: boolean) => void;
}

export const BuyPrompt: React.FC<BuyPromptProps> = ({
  state,
  isMyTurn,
  onDecision,
}) => {
  const isOpen = state.phase === 'CHOICE' && state.pendingChoice?.type === 'BUY';
  if (!isOpen) return null;

  const choice = state.pendingChoice as PendingBuyChoice;
  const team = state.teams[choice.teamId];
  const tile = TILES[choice.tileIndex];
  const continent = tile.continent ? CONTINENTS[tile.continent] : null;
  const isDiscounted = choice.price < (tile.price || 0);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-[#151922]/95 border border-[#333d4e] rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl text-[#eae6da] relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-[#252c38]">
          <div className="text-xs font-bold text-[#c9a13b] uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#c9a13b] animate-ping" />
            <span>Peluang Ekspansi Wilayah</span>
          </div>
          {continent && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 border border-white/10 text-xs">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: continent.color }}
              />
              <span className="font-semibold text-[11px] text-zinc-300">
                {continent.name}
              </span>
            </div>
          )}
        </div>

        {/* Territory Title */}
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#f4ecd8] mb-4">
          {tile.name}
        </h3>

        {/* Financial Breakdown Card */}
        <div className="bg-[#1c222c] rounded-2xl p-4 border border-[#2b3342] space-y-2.5 mb-5 shadow-inner">
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-[#848d9c]">Harga Wilayah Normal:</span>
            <span className="font-mono text-[#eae6da] font-semibold">${tile.price}</span>
          </div>

          {isDiscounted && (
            <div className="flex justify-between text-xs sm:text-sm text-amber-400 font-medium">
              <span>Diskon Kolektivisasi (20%):</span>
              <span className="font-mono">
                -${(tile.price || 0) - choice.price}
              </span>
            </div>
          )}

          <div className="flex justify-between text-sm sm:text-base font-bold border-t border-[#2b3342] pt-2.5">
            <span className="text-[#eae6da]">Harga Final Akuisisi:</span>
            <span className="font-mono text-emerald-400 text-lg">
              ${choice.price}
            </span>
          </div>

          <div className="flex justify-between text-xs text-[#848d9c] pt-1">
            <span>Sisa Kas {team.name}:</span>
            <span className="font-mono text-[#eae6da]">
              ${team.cash} ➔ ${team.cash - choice.price}
            </span>
          </div>
        </div>

        {/* Action Buttons Deck */}
        <div className="flex gap-3">
          <button
            type="button"
            disabled={!isMyTurn}
            onClick={() => onDecision(false)}
            className="flex-1 py-3 px-4 rounded-xl border border-[#333d4e] bg-[#1d232e] text-[#848d9c] hover:text-[#eae6da] hover:bg-[#252c3a] font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Lewati
          </button>
          <button
            type="button"
            disabled={!isMyTurn}
            onClick={() => onDecision(true)}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#c9a13b] to-[#deb447] text-[#14171d] hover:brightness-110 font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(201,161,59,0.35)] active:scale-98 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Beli Wilayah
          </button>
        </div>

        {!isMyTurn && (
          <div className="mt-3 text-center text-xs text-[#848d9c] italic">
            Menunggu keputusan {team.name}...
          </div>
        )}
      </div>
    </div>
  );
};
