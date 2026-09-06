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
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-[#262b35] border border-[#c9a13b] rounded-2xl max-w-md w-full p-6 shadow-2xl text-[#eae6da] relative">
        <div className="text-xs font-bold text-[#c9a13b] uppercase tracking-wider mb-2">
          Peluang Ekspansi Wilayah
        </div>

        <h3 className="font-serif text-2xl font-bold text-[#f4ecd8] mb-1">
          {tile.name}
        </h3>

        {continent && (
          <div className="flex items-center gap-1.5 mb-4">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: continent.color }}
            />
            <span className="text-xs text-[#9aa1ad]">
              Benua: {continent.name}
            </span>
          </div>
        )}

        <div className="bg-[#1c1f26] rounded-xl p-4 border border-[#3a4150] space-y-2.5 mb-5">
          <div className="flex justify-between text-sm">
            <span className="text-[#9aa1ad]">Harga Normal:</span>
            <span className="font-mono text-[#eae6da]">${tile.price}</span>
          </div>

          {isDiscounted && (
            <div className="flex justify-between text-sm text-amber-400">
              <span>Diskon Kolektivisasi (20%):</span>
              <span className="font-mono">
                -${(tile.price || 0) - choice.price}
              </span>
            </div>
          )}

          <div className="flex justify-between text-sm font-semibold border-t border-[#3a4150] pt-2">
            <span>Harga yang Harus Dibayar:</span>
            <span className="font-mono text-emerald-400 text-base">
              ${choice.price}
            </span>
          </div>

          <div className="flex justify-between text-xs text-[#9aa1ad] pt-1">
            <span>Sisa Kas Setelah Pembelian:</span>
            <span className="font-mono text-[#eae6da]">
              ${team.cash - choice.price}
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            disabled={!isMyTurn}
            onClick={() => onDecision(false)}
            className="flex-1 py-2.5 px-4 rounded-xl border border-[#3a4150] text-[#9aa1ad] hover:text-[#eae6da] hover:bg-[#2f3540] font-semibold text-sm transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Lewati
          </button>
          <button
            type="button"
            disabled={!isMyTurn}
            onClick={() => onDecision(true)}
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#c9a13b] text-[#1c1f26] hover:bg-[#deb447] font-bold text-sm transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Beli Wilayah
          </button>
        </div>

        {!isMyTurn && (
          <div className="mt-3 text-center text-xs text-[#9aa1ad] italic">
            Menunggu keputusan {team.name}...
          </div>
        )}
      </div>
    </div>
  );
};
