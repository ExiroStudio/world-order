'use client';

import React from 'react';
import { Tile as TileType, TeamId } from '@/types/game';
import { calculateTileCoordinates, CONTINENTS } from '@/lib/board';
import { TEAM_DEFINITIONS } from '@/lib/gameConfig';

interface TileProps {
  tile: TileType;
  owner: TeamId | null;
  isCurrentPosition?: boolean;
  pulse?: boolean;
}

export const Tile: React.FC<TileProps> = ({
  tile,
  owner,
  isCurrentPosition = false,
  pulse = false,
}) => {
  const coords = calculateTileCoordinates(tile.id);
  const ownerDef = owner ? TEAM_DEFINITIONS[owner] : null;
  const continentDef = tile.continent ? CONTINENTS[tile.continent] : null;

  let bgClass = 'bg-[#262b35] border-[#3a4150] text-[#eae6da]';
  const customStyle: React.CSSProperties = {
    left: `${coords.x}%`,
    top: `${coords.y}%`,
  };

  if (tile.type === 'start') {
    bgClass = 'bg-[#c9a13b] border-[#c9a13b] text-[#1c1f26] font-bold';
  } else if (tile.type === 'basis') {
    bgClass = 'bg-[#3a3320] border-[#c9a13b]/70 text-[#f4ecd8]';
  } else if (ownerDef) {
    bgClass = 'text-white border-white/30';
    customStyle.background = `linear-gradient(135deg, ${ownerDef.lightHex}, ${ownerDef.colorHex})`;
  }

  return (
    <div
      style={customStyle}
      className={`absolute w-[98px] -translate-x-1/2 -translate-y-1/2 rounded-lg p-1.5 text-center text-[10px] leading-tight border transition-all duration-300 z-10 select-none shadow-md ${bgClass} ${
        pulse ? 'ring-4 ring-[#c9a13b] scale-105 shadow-xl' : ''
      } ${isCurrentPosition ? 'border-[#c9a13b] ring-2 ring-[#c9a13b]/50' : ''}`}
    >
      {/* Continent indicator for countries */}
      {continentDef && (
        <div className="flex items-center justify-between mb-0.5 px-0.5">
          <span
            className="w-1.5 h-1.5 rounded-full inline-block"
            style={{ backgroundColor: continentDef.color }}
            title={`Benua: ${continentDef.name}`}
          />
          <span className="text-[8px] opacity-75 font-mono">
            ${tile.price}
          </span>
        </div>
      )}

      {/* Tile Name */}
      <div className="font-semibold line-clamp-2 leading-tight">
        {tile.type === 'start' ? `★ ${tile.name}` : tile.name}
      </div>

      {/* Basis Tag */}
      {tile.type === 'basis' && (
        <div className="text-[8px] text-[#c9a13b] font-medium tracking-tight mt-0.5 uppercase">
          Basis Kekuatan
        </div>
      )}

      {/* Owner Badge */}
      {ownerDef && (
        <div className="text-[8px] font-bold mt-0.5 opacity-90 truncate">
          ● {ownerDef.name}
        </div>
      )}
    </div>
  );
};
