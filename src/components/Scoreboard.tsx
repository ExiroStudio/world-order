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
                background: `linear-gradient(155deg, ${team.colorHex}25 0%, #262b35 70%)`,
                borderColor: isActive ? '#c9a13b' : '#3a4150',
              }}
              className={`relative rounded-xl p-3.5 border transition-all duration-300 ${
                isActive
                  ? 'ring-2 ring-[#c9a13b] shadow-lg shadow-[#c9a13b]/20 -translate-y-1'
                  : 'opacity-90'
              } ${team.bankrupt ? 'opacity-40 grayscale' : ''}`}
            >
              {/* Turn & Status Badges */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {isActive && (
                    <span className="bg-[#c9a13b] text-[#1c1f26] font-bold text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full animate-pulse">
                      Giliran
                    </span>
                  )}
                  {isYou && (
                    <span className="bg-[#3b82f6] text-white font-bold text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full">
                      Anda
                    </span>
                  )}
                  {team.isNeutral && (
                    <span className="bg-[#4b5563] text-zinc-300 font-medium text-[10px] px-2 py-0.5 rounded-full">
                      Netral (tidak dimainkan)
                    </span>
                  )}
                  {team.bankrupt && (
                    <span className="bg-[#ef4444] text-white font-bold text-[10px] uppercase px-2 py-0.5 rounded-full">
                      Bangkrut
                    </span>
                  )}
                </div>
                <PerkBadge teamId={teamId} />
              </div>

              {/* Team Name and Role */}
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                  style={{ backgroundColor: team.colorHex }}
                />
                <h3 className="font-serif font-bold text-base text-[#eae6da] truncate">
                  {team.name}
                </h3>
              </div>
              <p className="text-[11px] text-[#9aa1ad] truncate mb-3">
                {team.role}
              </p>

              {/* Financial Stats */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#3a4150]/60">
                <div>
                  <span className="text-[10px] text-[#9aa1ad] uppercase tracking-wide block">
                    Kas Tunai
                  </span>
                  <span
                    className={`font-mono font-bold text-lg leading-tight ${
                      team.cash < 200 ? 'text-amber-400' : 'text-emerald-400'
                    }`}
                  >
                    ${team.cash.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#9aa1ad] uppercase tracking-wide block">
                    Kekayaan Total
                  </span>
                  <span className="font-mono font-bold text-lg text-[#eae6da] leading-tight">
                    ${netWorth.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Territory Count */}
              <div className="mt-2 text-[11.5px] text-[#9aa1ad] flex items-center justify-between">
                <span>Wilayah Dikuasai:</span>
                <span className="font-semibold text-[#eae6da] bg-[#1c1f26]/60 px-2 py-0.5 rounded border border-[#3a4150]/40">
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
