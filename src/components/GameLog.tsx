'use client';

import React from 'react';
import { GameLogEntry } from '@/types/game';
import { TEAM_DEFINITIONS } from '@/lib/gameConfig';

interface GameLogProps {
  logs: GameLogEntry[];
}

export const GameLog: React.FC<GameLogProps> = ({ logs }) => {
  return (
    <div className="w-full max-w-[900px] mx-auto mt-4 bg-[#151922]/90 border border-[#2e3748] backdrop-blur-md rounded-2xl p-4 text-xs shadow-xl">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#252c38]">
        <div className="flex items-center gap-2 font-bold text-[#c9a13b] tracking-wider uppercase text-[11px]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c9a13b] animate-ping" />
          <span>Catatan Peristiwa Dunia</span>
        </div>
        <span className="text-[10px] font-mono text-[#848d9c] bg-black/30 px-2 py-0.5 rounded-md border border-white/5">
          {logs.length} entri riwayat
        </span>
      </div>

      <div className="max-h-36 overflow-y-auto space-y-2 pr-1 font-sans">
        {logs.map((entry) => {
          const teamDef = entry.teamId ? TEAM_DEFINITIONS[entry.teamId] : null;

          return (
            <div
              key={entry.id}
              className="text-[#d8dfea] leading-relaxed flex items-start gap-2.5 border-b border-[#232a37]/50 pb-1.5 last:border-b-0"
            >
              {teamDef && (
                <span
                  className="w-2 h-2 rounded-full shrink-0 mt-1 shadow-sm"
                  style={{ backgroundColor: teamDef.colorHex }}
                />
              )}
              <span className="flex-1 text-[11px] sm:text-xs">{entry.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

