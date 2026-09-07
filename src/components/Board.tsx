'use client';

import React, { useEffect, useRef, useState } from 'react';
import { GameState, TeamId } from '@/types/game';
import { TILES, TOTAL_TILES } from '@/lib/board';
import { TEAMS_ORDER } from '@/lib/gameConfig';
import { Tile } from './Tile';
import { Token } from './Token';
import { DiceRoller } from './DiceRoller';

interface BoardProps {
  state: GameState;
  isMyTurn: boolean;
  onRollDice: () => void;
  lastLandedTileIndex?: number | null;
  onMovingChange?: (isMoving: boolean) => void;
}

export const Board: React.FC<BoardProps> = ({
  state,
  isMyTurn,
  onRollDice,
  lastLandedTileIndex,
  onMovingChange,
}) => {
  const [visualPositions, setVisualPositions] = useState<Record<TeamId, number>>(() => ({
    liberalisme: state.teams.liberalisme.position,
    komunisme: state.teams.komunisme.position,
    fasisme: state.teams.fasisme.position,
    kapitalisme: state.teams.kapitalisme.position,
  }));
  const [isCompactBoard, setIsCompactBoard] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 640px)');
    const syncCompact = () => setIsCompactBoard(mediaQuery.matches);

    syncCompact();
    mediaQuery.addEventListener('change', syncCompact);

    return () => mediaQuery.removeEventListener('change', syncCompact);
  }, []);

  const [hoppingTeamId, setHoppingTeamId] = useState<TeamId | null>(null);
  const [hoppingTileId, setHoppingTileId] = useState<number | null>(null);

  const lastProcessedMoveRef = useRef<number>(0);
  const isAnimatingRef = useRef(false);

  const currentActiveTeamId = TEAMS_ORDER[state.turnIndex];
  const lastMove = state.lastMove;

  // Handle movements from state.lastMove (supports both forward and backward moves)
  useEffect(() => {
    if (!lastMove || lastMove.timestamp === lastProcessedMoveRef.current) {
      return;
    }

    lastProcessedMoveRef.current = lastMove.timestamp;
    const { teamId, from, to, isForward } = lastMove;

    if (from === to) {
      return;
    }

    // Calculate sequential path from 'from' to 'to'
    const steps: number[] = [];
    let curr = from;
    let safety = 0;

    while (curr !== to && safety < TOTAL_TILES) {
      curr = isForward
        ? (curr + 1) % TOTAL_TILES
        : (curr - 1 + TOTAL_TILES) % TOTAL_TILES;
      steps.push(curr);
      safety++;
    }

    if (steps.length === 0) {
      return;
    }

    isAnimatingRef.current = true;
    const kickoffTimeout = setTimeout(() => {
      setHoppingTeamId(teamId);
      onMovingChange?.(true);
    }, 0);

    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex < steps.length) {
        const nextTile = steps[stepIndex];
        setVisualPositions((prev) => ({ ...prev, [teamId]: nextTile }));
        setHoppingTileId(nextTile);
        stepIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          isAnimatingRef.current = false;
          setHoppingTeamId(null);
          setHoppingTileId(null);
          onMovingChange?.(false);
        }, 250);
      }
    }, 180);

    return () => {
      clearTimeout(kickoffTimeout);
      clearInterval(interval);
      isAnimatingRef.current = false;
      onMovingChange?.(false);
    };
  }, [lastMove, onMovingChange]);

  // Sync positions if state changes without lastMove (e.g. game reset)
  useEffect(() => {
    if (isAnimatingRef.current) return;
    const isOutOfSync = TEAMS_ORDER.some(
      (id) => state.teams[id].position !== visualPositions[id]
    );
    if (isOutOfSync && !state.lastMove) {
      const syncTimeout = setTimeout(() => {
        setVisualPositions({
          liberalisme: state.teams.liberalisme.position,
          komunisme: state.teams.komunisme.position,
          fasisme: state.teams.fasisme.position,
          kapitalisme: state.teams.kapitalisme.position,
        });
      }, 0);
      return () => clearTimeout(syncTimeout);
    }
  }, [state.teams, state.lastMove, visualPositions]);

  return (
    <div className="relative w-full max-w-[900px] mx-auto aspect-[1/0.78] sm:aspect-[1/0.74] select-none my-4">
      {/* Board Background Subtle Oval Ring */}
      <div className="absolute inset-[5%] rounded-[48%] border border-[#2f3746]/60 pointer-events-none bg-gradient-to-b from-[#181d26]/40 via-[#13161c]/50 to-[#0e1015]/60" />
      <div className="absolute inset-[15%] rounded-[48%] border border-dashed border-[#c9a13b]/15 pointer-events-none" />

      {/* Tiles */}
      {TILES.map((tile) => {
        const owner = state.owners[tile.id];
        const isCurrentTile = visualPositions[currentActiveTeamId] === tile.id;
        const isPulsing =
          lastLandedTileIndex === tile.id || hoppingTileId === tile.id;

        return (
          <Tile
            key={tile.id}
            tile={tile}
            owner={owner}
            isCurrentPosition={isCurrentTile}
            pulse={isPulsing}
            compact={isCompactBoard}
          />
        );
      })}

      {/* Player Tokens */}
      {TEAMS_ORDER.map((teamId, index) => {
        const team = state.teams[teamId];
        const isHopping = hoppingTeamId === teamId;
        const isCurrentTurn = currentActiveTeamId === teamId;

        return (
          <Token
            key={teamId}
            teamId={teamId}
            position={visualPositions[teamId]}
            index={index}
            isBankrupt={team.bankrupt}
            isHopping={isHopping}
            isCurrentTurn={isCurrentTurn}
            compact={isCompactBoard}
          />
        );
      })}

      {/* Center Hub */}
      <DiceRoller
        state={state}
        isMyTurn={isMyTurn}
        onRoll={onRollDice}
        disabled={hoppingTeamId !== null}
      />
    </div>
  );
};

