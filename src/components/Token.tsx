'use client';

import React from 'react';
import { TeamId } from '@/types/game';
import { calculateTileCoordinates } from '@/lib/board';
import { TEAM_DEFINITIONS } from '@/lib/gameConfig';

interface TokenProps {
  teamId: TeamId;
  position: number;
  index: number;
  isBankrupt?: boolean;
  isHopping?: boolean;
  isCurrentTurn?: boolean;
}

const TOKEN_OFFSETS: Record<TeamId, [number, number]> = {
  liberalisme: [-11, -11],
  komunisme: [11, -11],
  fasisme: [-11, 11],
  kapitalisme: [11, 11],
};

export const Token: React.FC<TokenProps> = ({
  teamId,
  position,
  isBankrupt,
  isHopping = false,
  isCurrentTurn = false,
}) => {
  if (isBankrupt) return null;

  const coords = calculateTileCoordinates(position);
  const [offsetX, offsetY] = TOKEN_OFFSETS[teamId];
  const def = TEAM_DEFINITIONS[teamId];

  return (
    <div
      title={`${def.name} di petak ${position}`}
      style={{
        left: `calc(${coords.x}% + ${offsetX}px)`,
        top: `calc(${coords.y}% + ${offsetY}px)`,
        backgroundColor: def.colorHex,
        boxShadow: isHopping
          ? `0 0 16px ${def.colorHex}, 0 0 6px white`
          : isCurrentTurn
          ? `0 0 10px ${def.colorHex}`
          : '0 3px 6px rgba(0,0,0,0.6)',
      }}
      className={`absolute w-6 h-6 rounded-full border-2 border-[#f4ecd8] transform -translate-x-1/2 -translate-y-1/2 z-40 flex items-center justify-center cursor-pointer transition-[left,top,transform] duration-150 ease-out ${
        isHopping ? '-translate-y-3 scale-125' : 'hover:scale-110'
      } ${isCurrentTurn && !isHopping ? 'ring-2 ring-white/80' : ''}`}
    >
      <div className="w-2 h-2 rounded-full bg-white/90 shadow-sm" />
    </div>
  );
};

