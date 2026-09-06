'use client';

import React, { useState } from 'react';
import { TeamId } from '@/types/game';
import { TEAM_DEFINITIONS } from '@/lib/gameConfig';

interface PerkBadgeProps {
  teamId: TeamId;
  showDetails?: boolean;
}

export const PerkBadge: React.FC<PerkBadgeProps> = ({
  teamId,
  showDetails = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const def = TEAM_DEFINITIONS[teamId];

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsHovered(!isHovered)}
        className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#2f3540] border border-[#3a4150] text-[#c9a13b] hover:border-[#c9a13b] transition-colors"
      >
        <span className="text-[10px]">✦</span>
        <span>{def.perkName}</span>
      </button>

      {(isHovered || showDetails) && (
        <div className="absolute left-0 bottom-full mb-2 w-60 z-30 p-2.5 bg-[#262b35] border border-[#c9a13b] rounded-lg shadow-2xl text-xs text-[#eae6da] pointer-events-none">
          <div className="font-bold text-[#c9a13b] mb-1 flex items-center gap-1">
            <span>Perk: {def.perkName}</span>
          </div>
          <div className="text-[#9aa1ad] leading-relaxed">
            {def.perkDescription}
          </div>
        </div>
      )}
    </div>
  );
};
