'use client';

import React from 'react';
import { GameLogEntry } from '@/types/game';
import { TEAM_DEFINITIONS } from '@/lib/gameConfig';

interface GameLogProps {
  logs: GameLogEntry[];
}

export const GameLog: React.FC<GameLogProps> = ({ logs }) => {
  return (
    <div className="w-full max-w-[880px] mx-auto mt-4 bg-[#262b35] border border-[#3a4150] rounded-xl p-3 sm:p-4 text-xs">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#3a4150]">
        <span className="font-serif font-bold text-[#c9a13b] tracking-wider uppercase text-[11px]">
          Catatan Peristiwa Dunia
        </span>
        <span className="text-[10px] text-[#9aa1ad]">
          {logs.length} entri riwayat
        </span>
      </div>

      <div className="max-h-36 overflow-y-auto space-y-2 pr-1 font-sans">
        {logs.map((entry) => {
          const teamDef = entry.teamId ? TEAM_DEFINITIONS[entry.teamId] : null;

          return (
            <div
              key={entry.id}
              className="text-[#eae6da] leading-relaxed flex items-start gap-2 border-b border-[#3a4150]/30 pb-1.5 last:border-b-0"
            >
              {teamDef && (
                <span
                  className="w-2 h-2 rounded-full shrink-0 mt-1.5 shadow-sm"
                  style={{ backgroundColor: teamDef.colorHex }}
                />
              )}
              <span className="flex-1 text-[11.5px]">{entry.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
