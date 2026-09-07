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
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center pointer-events-auto">
      <div className="mb-1.5 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.14em] text-[#d7d2c6]">
        <span
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: currentTeam?.colorHex }}
        />
        <span>{currentTeam?.name}</span>
      </div>

      <button
        type="button"
        disabled={!canRoll}
        onClick={handleRollClick}
        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-2 border-[#c9a13b] bg-gradient-to-br from-[#2a3240] to-[#1a1f29] flex items-center justify-center font-mono font-bold text-xl sm:text-2xl text-[#f4ecd8] shadow-[0_0_18px_rgba(0,0,0,0.7)] transition-all ${
          isRolling ? 'rotate-45 scale-110 shadow-[0_0_25px_rgba(201,161,59,0.5)]' : ''
        } ${
          canRoll
            ? 'cursor-pointer hover:brightness-110 active:scale-95'
            : 'cursor-not-allowed opacity-75'
        }`}
      >
        {state.activeDice && !isRolling ? state.activeDice : displayValue}
      </button>

      <div className="mt-1.5 text-[9px] uppercase tracking-[0.12em] text-[#9aa1ad]">
        {isRolling ? 'Mengocok...' : canRoll ? 'Lempar dadu' : 'Menunggu'}
      </div>
    </div>
  );
};
