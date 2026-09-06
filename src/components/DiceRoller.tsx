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
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 text-center z-10 flex flex-col items-center pointer-events-auto">
      <div className="font-serif tracking-widest text-xs text-[#9aa1ad] mb-2 uppercase font-medium">
        ✦ Lempar Dadu ✦
      </div>

      {/* Die Face */}
      <div className="mb-3 flex items-center justify-center">
        <div
          className={`w-14 h-14 rounded-xl bg-[#2f3540] border-2 border-[#c9a13b] flex items-center justify-center font-mono font-bold text-2xl text-[#eae6da] shadow-lg shadow-black/50 transition-transform ${
            isRolling ? 'rotate-12 scale-110 animate-bounce' : ''
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
        className={`font-semibold text-sm px-6 py-2.5 rounded-lg transition-all duration-200 shadow-md ${
          canRoll
            ? 'bg-[#c9a13b] text-[#1c1f26] hover:bg-[#deb447] active:scale-95 cursor-pointer hover:shadow-lg hover:shadow-[#c9a13b]/20 font-bold'
            : 'bg-[#3a4150] text-[#9aa1ad] opacity-60 cursor-not-allowed'
        }`}
      >
        {isRolling ? 'Mengocok...' : 'Lempar Dadu'}
      </button>

      {/* Turn Indicator */}
      <div className="mt-2 text-xs text-[#9aa1ad] flex items-center gap-1.5">
        <span>Giliran:</span>
        <span
          className="font-bold font-serif"
          style={{ color: currentTeam?.colorHex }}
        >
          {currentTeam?.name}
        </span>
      </div>

      {!isMyTurn && state.phase === 'ROLL' && !state.gameOver && (
        <span className="text-[10px] text-zinc-400 mt-1 italic">
          (Menunggu giliran pemain...)
        </span>
      )}
    </div>
  );
};
