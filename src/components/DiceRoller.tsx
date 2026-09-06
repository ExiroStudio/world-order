'use client';

import React, { useState } from 'react';
import { GameState } from '@/types/game';
import { TEAMS_ORDER } from '@/lib/gameConfig';

interface DiceRollerProps {
  state: GameState;
  isMyTurn: boolean;
  onRoll: () => void;
  disabled?: boolean;
}

export const DiceRoller: React.FC<DiceRollerProps> = ({
  state,
  isMyTurn,
  onRoll,
  disabled = false,
}) => {
  const [isRolling, setIsRolling] = useState(false);
  const [displayValue, setDisplayValue] = useState<number | string>(
    state.activeDice || '?'
  );

  const currentTeam = state.teams[TEAMS_ORDER[state.turnIndex]];
  const canRoll =
    state.phase === 'ROLL' && !state.gameOver && isMyTurn && !disabled && !isRolling;

  const handleRollClick = () => {
    if (!canRoll) return;

    setIsRolling(true);
    let ticks = 0;
    const interval = setInterval(() => {
      setDisplayValue(Math.floor(Math.random() * 6) + 1);
      ticks++;
      if (ticks > 7) {
        clearInterval(interval);
        setIsRolling(false);
        onRoll();
      }
    }, 60);
  };

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 text-center z-20 flex flex-col items-center pointer-events-auto">
      <div className="bg-[#151922]/90 border border-[#2e3748] backdrop-blur-md p-4 rounded-2xl shadow-2xl w-full flex flex-col items-center">
        {/* Header Eyebrow */}
        <div className="text-[10px] font-bold text-[#c9a13b] uppercase tracking-widest mb-2.5 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c9a13b] animate-ping" />
          <span>Konsol Komando Dadu</span>
        </div>

        {/* Die Face */}
        <div className="mb-3 flex items-center justify-center">
          <div
            className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2a3240] to-[#1a1f29] border-2 border-[#c9a13b] flex items-center justify-center font-mono font-bold text-2xl text-[#f4ecd8] shadow-[0_0_20px_rgba(0,0,0,0.8)] transition-all ${
              isRolling ? 'rotate-45 scale-110 shadow-[0_0_25px_rgba(201,161,59,0.5)]' : ''
            }`}
          >
            {state.activeDice && !isRolling ? state.activeDice : displayValue}
          </div>
        </div>

        {/* Roll Button */}
        <button
          type="button"
          disabled={!canRoll}
          onClick={handleRollClick}
          className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md ${
            canRoll
              ? 'bg-gradient-to-r from-[#c9a13b] to-[#deb447] text-[#14171d] hover:brightness-110 active:scale-98 cursor-pointer shadow-[0_0_15px_rgba(201,161,59,0.4)]'
              : 'bg-[#262c37] border border-[#373f4e] text-[#848d9c] cursor-not-allowed opacity-60'
          }`}
        >
          {isRolling ? 'Mengocok Dadu...' : canRoll ? 'Lempar Dadu' : 'Menunggu Giliran'}
        </button>

        {/* Turn Status Pill */}
        <div className="mt-3 w-full pt-2.5 border-t border-[#2a3240] flex items-center justify-between text-xs">
          <span className="text-[11px] text-[#848d9c]">Giliran Aktif:</span>
          <div className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: currentTeam?.colorHex }}
            />
            <span
              className="font-bold text-[11px]"
              style={{ color: currentTeam?.colorHex }}
            >
              {currentTeam?.name}
            </span>
          </div>
        </div>

        {!isMyTurn && state.phase === 'ROLL' && !state.gameOver && (
          <span className="text-[10px] text-zinc-400 mt-1 italic">
            (Menunggu {currentTeam?.name} melempar dadu...)
          </span>
        )}
      </div>
    </div>
  );
};
