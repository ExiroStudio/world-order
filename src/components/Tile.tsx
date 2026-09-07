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
  compact?: boolean;
}

export const Tile: React.FC<TileProps> = ({
  tile,
  owner,
  isCurrentPosition = false,
  pulse = false,
  compact = false,
}) => {
  const coords = calculateTileCoordinates(tile.id, undefined, compact);
  const ownerDef = owner ? TEAM_DEFINITIONS[owner] : null;
  const continentDef = tile.continent ? CONTINENTS[tile.continent] : null;

  const customStyle: React.CSSProperties = {
    left: `${coords.x}%`,
    top: `${coords.y}%`,
    width: 'clamp(44px, 11vw, 100px)',
  };

  let bgClasses = 'bg-[#181d26] border-[#2f3746] text-[#eae6da]';

  if (tile.type === 'start') {
    bgClasses =
      'bg-gradient-to-br from-[#c9a13b] to-[#997723] border-[#f4ecd8]/60 text-[#14171d] font-bold shadow-md';
  } else if (tile.type === 'basis') {
    bgClasses =
      'bg-gradient-to-br from-[#2a2416] to-[#1c1810] border-[#c9a13b]/60 text-[#f4ecd8] shadow-md';
  } else if (ownerDef) {
    bgClasses = 'text-white border-white/40 shadow-md';
    customStyle.background = `linear-gradient(135deg, ${ownerDef.lightHex}ee, ${ownerDef.colorHex}dd)`;
  }

  return (
    <div
      style={customStyle}
      className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-xl p-1.5 text-center text-[clamp(7px,2vw,10px)] leading-tight border transition-transform duration-150 z-10 select-none shadow-md ${bgClasses} ${
        pulse
          ? 'ring-2 ring-[#c9a13b] scale-105 z-30'
          : ''
      } ${
        isCurrentPosition && !pulse
          ? 'border-[#c9a13b]/80 ring-1 ring-[#c9a13b]/40'
          : ''
      }`}
    >
      {/* Continent Header Bar for Countries */}
      {continentDef && (
        <div className="flex items-center justify-between mb-1 px-1 py-0.5 rounded-md bg-black/30 border border-white/5">
          <div className="flex items-center gap-1">
            <span
              className="w-1.5 h-1.5 rounded-full shadow-sm"
              style={{ backgroundColor: continentDef.color }}
              title={`Benua: ${continentDef.name}`}
            />
            <span className="text-[clamp(6px,1.5vw,7.5px)] uppercase tracking-wider text-zinc-300 font-semibold truncate max-w-[42px]">
              {continentDef.name.slice(0, 5)}
            </span>
          </div>
          <span className="text-[clamp(6px,1.6vw,8px)] text-[#c9a13b] font-mono font-bold">
            ${tile.price}
          </span>
        </div>
      )}

      {/* Start Banner */}
      {tile.type === 'start' && (
        <div className="text-[clamp(6px,1.6vw,8px)] uppercase tracking-wider mb-0.5 opacity-80">
          Kongres Dunia
        </div>
      )}

      {/* Tile Name */}
      <div className="font-semibold line-clamp-2 leading-tight tracking-tight text-[clamp(7px,1.9vw,10.5px)]">
        {tile.type === 'start' ? `★ ${tile.name}` : tile.name}
      </div>

      {/* Basis Tag */}
      {tile.type === 'basis' && (
        <div className="text-[clamp(6px,1.5vw,7.5px)] text-[#c9a13b] font-bold tracking-wider mt-0.5 uppercase bg-black/40 py-0.5 rounded">
          ⚡ Basis Kekuatan
        </div>
      )}

      {/* Owner Badge */}
      {ownerDef && (
        <div className="mt-1 px-1 py-0.5 rounded bg-black/40 text-[clamp(6px,1.5vw,7.5px)] font-bold uppercase tracking-wider truncate flex items-center justify-center gap-1">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: ownerDef.lightHex }}
          />
          <span>{ownerDef.name}</span>
        </div>
      )}
    </div>
  );
};
