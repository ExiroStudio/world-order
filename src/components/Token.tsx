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
}

const TOKEN_OFFSETS: Record<TeamId, [number, number]> = {
  liberalisme: [-9, -9],
  komunisme: [9, -9],
  fasisme: [-9, 9],
  kapitalisme: [9, 9],
};

export const Token: React.FC<TokenProps> = ({
  teamId,
  position,
  isBankrupt,
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
      }}
      className="absolute w-5 h-5 rounded-full border-2 border-[#f4ecd8] shadow-lg shadow-black/70 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out z-20 flex items-center justify-center cursor-pointer hover:scale-125"
    >
      <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
    </div>
  );
};
