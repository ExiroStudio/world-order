'use client';

import React from 'react';
import { GameState } from '@/types/game';
import { TILES } from '@/lib/board';
import { TEAMS_ORDER } from '@/lib/gameConfig';
import { Tile } from './Tile';
import { Token } from './Token';
import { DiceRoller } from './DiceRoller';

interface BoardProps {
  state: GameState;
  isMyTurn: boolean;
  onRollDice: () => void;
  lastLandedTileIndex?: number | null;
}

export const Board: React.FC<BoardProps> = ({
  state,
  isMyTurn,
  onRollDice,
  lastLandedTileIndex,
}) => {
  const currentTeam = state.teams[TEAMS_ORDER[state.turnIndex]];

  return (
    <div className="relative w-full max-w-[880px] mx-auto aspect-[1/0.78] sm:aspect-[1/0.74] select-none my-4">
      {/* Board Background Subtle Oval Ring */}
      <div className="absolute inset-[6%] rounded-[48%] border border-[#3a4150]/40 pointer-events-none bg-gradient-to-b from-[#262b35]/20 to-[#1c1f26]/40 shadow-inner" />

      {/* Tiles */}
      {TILES.map((tile) => {
        const owner = state.owners[tile.id];
        const isCurrentTile = currentTeam?.position === tile.id;
        const isPulsing = lastLandedTileIndex === tile.id;

        return (
          <Tile
            key={tile.id}
            tile={tile}
            owner={owner}
            isCurrentPosition={isCurrentTile}
            pulse={isPulsing}
          />
        );
      })}

      {/* Player Tokens */}
      {TEAMS_ORDER.map((teamId, index) => {
        const team = state.teams[teamId];
        return (
          <Token
            key={teamId}
            teamId={teamId}
            position={team.position}
            index={index}
            isBankrupt={team.bankrupt}
          />
        );
      })}

      {/* Center Hub */}
      <DiceRoller
        state={state}
        isMyTurn={isMyTurn}
        onRoll={onRollDice}
      />
    </div>
  );
};
