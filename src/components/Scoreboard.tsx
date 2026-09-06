'use client';

import React from 'react';
import { GameState, TeamId } from '@/types/game';
import { calculateNetWorth } from '@/lib/gameEngine';
import { TEAMS_ORDER } from '@/lib/gameConfig';
import { PerkBadge } from './PerkBadge';

interface ScoreboardProps {
  state: GameState;
  playerTeamId?: TeamId;
}

export const Scoreboard: React.FC<ScoreboardProps> = ({
  state,
  playerTeamId,
}) => {
  const currentTeamId = TEAMS_ORDER[state.turnIndex];

  return (
    <div className="w-full mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {TEAMS_ORDER.map((teamId) => {
          const team = state.teams[teamId];
          const isActive = currentTeamId === teamId && !state.gameOver;
          const isYou = playerTeamId === teamId;
          const netWorth = calculateNetWorth(state, teamId);
          const ownedCount = state.owners.filter((o) => o === teamId).length;

          return (
            <div
              key={teamId}
              style={{
                background: isActive
                  ? `linear-gradient(155deg, ${team.colorHex}30 0%, #151922 65%)`
                  : `linear-gradient(155deg, ${team.colorHex}15 0%, #131720 70%)`,
                borderColor: isActive ? team.colorHex : '#283140',
                boxShadow: isActive
                  ? `0 0 20px ${team.colorHex}30, 0 4px 12px rgba(0,0,0,0.5)`
                  : '0 4px 10px rgba(0,0,0,0.4)',
              }}
              className={`relative rounded-2xl p-4 border backdrop-blur-md transition-all duration-300 ${
                isActive
                  ? 'ring-2 ring-[#c9a13b] -translate-y-1'
                  : 'opacity-90 hover:opacity-100 hover:border-[#3a475c]'
              } ${team.bankrupt ? 'opacity-40 grayscale' : ''}`}
            >
              {/* Turn & Status Badges */}
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {isActive && (
                    <span className="bg-gradient-to-r from-[#c9a13b] to-[#deb447] text-[#14171d] font-bold text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#14171d] animate-ping" />
                      <span>Giliran</span>
                    </span>
                  )}
                  {isYou && (
                    <span className="bg-cyan-600 text-white font-bold text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full shadow-sm">
                      Anda
                    </span>
                  )}
                  {team.isNeutral && (
                    <span className="bg-[#2f3746] text-zinc-300 font-medium text-[10px] px-2 py-0.5 rounded-full border border-white/5">
                      Netral
                    </span>
                  )}
                  {team.bankrupt && (
                    <span className="bg-rose-600 text-white font-bold text-[10px] uppercase px-2 py-0.5 rounded-full">
                      Bangkrut
                    </span>
                  )}
                </div>
                <PerkBadge teamId={teamId} />
              </div>

              {/* Team Name and Role */}
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm border border-white/20"
                  style={{ backgroundColor: team.colorHex }}
                />
                <h3 className="font-serif font-bold text-base text-[#f4ecd8] truncate">
                  {team.name}
                </h3>
              </div>
              <p className="text-[11px] text-[#848d9c] truncate mb-3">
                {team.role}
              </p>

              {/* Financial Stats Grid */}
              <div className="grid grid-cols-2 gap-2 pt-2.5 border-t border-[#232a37]">
                <div>
                  <span className="text-[9.5px] text-[#848d9c] uppercase tracking-wider block font-semibold">
                    Kas Tunai
                  </span>
                  <span
                    className={`font-mono font-bold text-base sm:text-lg leading-tight ${
                      team.cash < 200 ? 'text-amber-400' : 'text-emerald-400'
                    }`}
                  >
                    ${team.cash.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-[9.5px] text-[#848d9c] uppercase tracking-wider block font-semibold">
                    Total Aset
                  </span>
                  <span className="font-mono font-bold text-base sm:text-lg text-[#eae6da] leading-tight">
                    ${netWorth.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Territory Count */}
              <div className="mt-2.5 text-[11.5px] text-[#848d9c] flex items-center justify-between pt-1 border-t border-[#232a37]/50">
                <span className="text-[11px]">Wilayah Dikuasai:</span>
                <span className="font-mono font-bold text-xs text-[#f4ecd8] bg-black/40 px-2.5 py-0.5 rounded-lg border border-white/5">
                  {ownedCount} negara
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
