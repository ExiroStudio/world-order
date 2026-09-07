'use client';

import React from 'react';
import { TeamId } from '@/types/game';
import { calculateSquareCoordinates } from '@/lib/board';
import { TEAM_DEFINITIONS } from '@/lib/gameConfig';

interface TokenProps {
  teamId: TeamId;
  position: number;
  index: number;
  isBankrupt?: boolean;
  isHopping?: boolean;
  isCurrentTurn?: boolean;
}

const SQ_OFFSETS: Record<TeamId, [number, number]> = {
  liberalisme: [-5, -5],
  komunisme: [5, -5],
  fasisme: [-5, 5],
  kapitalisme: [5, 5],
};

const LG_OFFSETS: Record<TeamId, [number, number]> = {
  liberalisme: [-12, -12],
  komunisme: [12, -12],
  fasisme: [-12, 12],
  kapitalisme: [12, 12],
};

export const Token: React.FC<TokenProps> = ({
  teamId,
  position,
  isBankrupt,
  isHopping = false,
  isCurrentTurn = false,
}) => {
  if (isBankrupt) return null;

  const coords = calculateSquareCoordinates(position);
  const def = TEAM_DEFINITIONS[teamId];

  const customStyle: React.CSSProperties = {
    ['--tok-x' as string]: `${coords.x}%`,
    ['--tok-y' as string]: `${coords.y}%`,
    ['--tok-ox' as string]: `${SQ_OFFSETS[teamId][0]}px`,
    ['--tok-oy' as string]: `${SQ_OFFSETS[teamId][1]}px`,
    ['--tok-ox-lg' as string]: `${LG_OFFSETS[teamId][0]}px`,
    ['--tok-oy-lg' as string]: `${LG_OFFSETS[teamId][1]}px`,
    backgroundColor: def.colorHex,
    boxShadow: isHopping
      ? `0 0 16px ${def.colorHex}, 0 0 6px white`
      : isCurrentTurn
      ? `0 0 10px ${def.colorHex}`
      : '0 2px 5px rgba(0,0,0,0.6)',
  };

  return (
    <div
      title={`${def.name} di petak ${position}`}
      style={customStyle}
      className={`board-token absolute w-4 h-4 min-[390px]:w-5 min-[390px]:h-5 sm:w-6 sm:h-6 rounded-full border-2 border-[#f4ecd8] transform -translate-x-1/2 -translate-y-1/2 z-40 flex items-center justify-center cursor-pointer transition-[left,top,transform] duration-150 ease-out ${
        isHopping ? '-translate-y-2 scale-125' : 'hover:scale-110'
      } ${isCurrentTurn && !isHopping ? 'ring-2 ring-white/80' : ''}`}
    >
      <div className="w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-white/90 shadow-sm" />
    </div>
  );
};


