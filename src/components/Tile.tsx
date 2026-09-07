'use client';

import React from 'react';
import { Tile as TileType, TeamId } from '@/types/game';
import { calculateSquareCoordinates, CONTINENTS } from '@/lib/board';
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
  const coords = calculateSquareCoordinates(tile.id);
  const ownerDef = owner ? TEAM_DEFINITIONS[owner] : null;
  const continentDef = tile.continent ? CONTINENTS[tile.continent] : null;

  const customStyle: React.CSSProperties = {
    ['--tile-x' as string]: `${coords.x}%`,
    ['--tile-y' as string]: `${coords.y}%`,
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
      className={`board-tile absolute -translate-x-1/2 -translate-y-1/2 rounded-lg sm:rounded-xl p-1 min-[390px]:p-1.5 sm:p-2 text-center leading-tight border transition-transform duration-150 z-10 select-none shadow-md ${bgClasses} w-[15.2%] h-[15.2%] flex flex-col justify-between overflow-hidden ${
        pulse
          ? 'ring-2 ring-[#c9a13b] scale-105 z-30 shadow-[0_0_16px_rgba(201,161,59,0.6)]'
          : ''
      } ${
        isCurrentPosition && !pulse
          ? 'border-[#c9a13b]/80 ring-1 ring-[#c9a13b]/40'
          : ''
      }`}
    >
      {/* Continent Header Bar for Countries */}
      {continentDef && (
        <div className="flex items-center justify-between mb-0.5 sm:mb-1 px-1 py-0.5 rounded bg-black/40 border border-white/10 shrink-0">
          <div className="flex items-center gap-1 min-w-0">
            <span
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shadow-sm shrink-0"
              style={{ backgroundColor: continentDef.color }}
              title={`Benua: ${continentDef.name}`}
            />
            <span className="text-[7.5px] min-[390px]:text-[8.5px] sm:text-[9.5px] uppercase tracking-wider text-zinc-300 font-bold truncate">
              {continentDef.name.slice(0, 3)}
            </span>
          </div>
          <span className="text-[8px] min-[390px]:text-[9px] sm:text-[10px] md:text-[11px] text-[#c9a13b] font-mono font-bold shrink-0">
            ${tile.price}
          </span>
        </div>
      )}

      {/* Start Banner */}
      {tile.type === 'start' && (
        <div className="text-[7.5px] min-[390px]:text-[8.5px] sm:text-[9.5px] uppercase tracking-wider mb-0.5 opacity-90 font-bold shrink-0 flex items-center justify-center gap-1">
          <span>🏛️</span>
          <span>KONGRES</span>
        </div>
      )}

      {/* Tile Name */}
      <div className="my-auto py-0.5">
        <div className="font-bold line-clamp-2 leading-tight tracking-tight text-[8px] min-[390px]:text-[9.5px] sm:text-[11px] md:text-[12.5px]">
          {tile.type === 'start' ? 'DUNIA' : tile.name}
        </div>
      </div>

      {/* Basis Tag */}
      {tile.type === 'basis' && (
        <div className="text-[7.5px] min-[390px]:text-[8.5px] sm:text-[9.5px] text-[#c9a13b] font-bold tracking-wider uppercase bg-black/40 py-0.5 px-1 rounded flex items-center justify-center gap-1 shrink-0">
          <span>⚡</span>
          <span>Basis</span>
        </div>
      )}

      {/* Owner Badge */}
      {ownerDef && (
        <div className="mt-0.5 sm:mt-1 px-1 py-0.5 rounded bg-black/60 text-[7.5px] min-[390px]:text-[8.5px] sm:text-[9.5px] font-bold uppercase tracking-wider truncate flex items-center justify-center gap-1 shrink-0">
          <span
            className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shrink-0"
            style={{ backgroundColor: ownerDef.lightHex }}
          />
          <span className="truncate">{ownerDef.name.slice(0, 7)}</span>
        </div>
      )}
    </div>
  );
};
