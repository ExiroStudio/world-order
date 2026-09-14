'use client';

import React, { useState } from 'react';
import { GameState, TeamId } from '@/types/game';
import {
  initGameState,
  rollDice,
  answerQuestion,
  executeMove,
  resolveBuyDecision,
  resolveCongressChoice,
  applyLeavePenalty,
  calculateLeavePenalty,
} from '@/lib/gameEngine';
import { TEAMS_ORDER } from '@/lib/gameConfig';
import { Navbar } from '@/components/Navbar';
import { Scoreboard } from '@/components/Scoreboard';
import { Board } from '@/components/Board';
import { QuestionModal } from '@/components/QuestionModal';
import { BuyPrompt } from '@/components/BuyPrompt';
import { CongressChoiceModal } from '@/components/CongressChoiceModal';
import { EndGameModal } from '@/components/EndGameModal';
import { GameLog } from '@/components/GameLog';
import { LeaveConsequenceModal } from '@/components/LeaveConsequenceModal';
import { useAntiCheat } from '@/hooks/useAntiCheat';

export default function LocalGamePage() {
  const [gameState, setGameState] = useState<GameState>(() => initGameState());
  const [lastLandedTileIndex, setLastLandedTileIndex] = useState<number | null>(
    null
  );
  const [isMoving, setIsMoving] = useState(false);
  const [consequenceModal, setConsequenceModal] = useState<{
    isOpen: boolean;
    teamId: TeamId;
    countryCount: number;
    penaltyAmount: number;
    wasInQuestionPhase: boolean;
  }>({
    isOpen: false,
    teamId: 'liberalisme',
    countryCount: 0,
    penaltyAmount: 100,
    wasInQuestionPhase: false,
  });

  useAntiCheat({
    enabled: !gameState.gameOver,
    onLeaveGame: () => {
      const activeTeamId = TEAMS_ORDER[gameState.turnIndex];
      const { countryCount, penaltyAmount } = calculateLeavePenalty(
        gameState,
        activeTeamId
      );
      const wasInQuestion =
        gameState.phase === 'QUESTION' && !gameState.questionAnswered;

      setGameState((prev) => applyLeavePenalty(prev, activeTeamId));
      setConsequenceModal({
        isOpen: true,
        teamId: activeTeamId,
        countryCount,
        penaltyAmount,
        wasInQuestionPhase: wasInQuestion,
      });
    },
  });

  const handleRollDice = () => {
    setGameState((prev) => rollDice(prev));
  };

  const handleAnswerQuestion = (chosenIndex: number) => {
    setGameState((prev) => answerQuestion(prev, chosenIndex));
  };

  const handleExecuteMove = () => {
    setGameState((prev) => {
      const next = executeMove(prev);
      const teamId = TEAMS_ORDER[prev.turnIndex];
      setLastLandedTileIndex(next.teams[teamId].position);
      return next;
    });
  };

  const handleBuyDecision = (buy: boolean) => {
    setGameState((prev) => resolveBuyDecision(prev, buy));
  };

  const handleCongressChoice = (
    choice: 'tribute' | 'sell',
    countryIndex?: number
  ) => {
    setGameState((prev) => resolveCongressChoice(prev, choice, countryIndex));
  };

  const handleRestart = () => {
    setGameState(initGameState());
    setLastLandedTileIndex(null);
    setIsMoving(false);
  };

  return (
    <div className="min-h-screen flex flex-col pb-12 bg-[#0f1217] text-[#eae6da]">
      <Navbar isLocal />

      <main className="w-full max-w-5xl mx-auto px-2 sm:px-4 flex-1 flex flex-col items-center">
        {/* Scoreboard Command Deck */}
        <Scoreboard state={gameState} />

        {/* Board */}
        <Board
          state={gameState}
          isMyTurn={true} // In local mode, anyone at the screen takes the current turn
          onRollDice={handleRollDice}
          lastLandedTileIndex={lastLandedTileIndex}
          onMovingChange={setIsMoving}
        />

        {/* Log Panel */}
        <GameLog logs={gameState.log} />
      </main>

      {/* Interactive Modals */}
      <QuestionModal
        state={gameState}
        isMyTurn={true}
        onAnswer={handleAnswerQuestion}
        onExecuteMove={handleExecuteMove}
      />

      {/* Only display buy prompt and congress modal after pawn movement finishes */}
      {!isMoving && (
        <>
          <BuyPrompt
            state={gameState}
            isMyTurn={true}
            onDecision={handleBuyDecision}
          />

          <CongressChoiceModal
            state={gameState}
            isMyTurn={true}
            onChoice={handleCongressChoice}
          />
        </>
      )}

      <EndGameModal
        state={gameState}
        onRestart={handleRestart}
      />

      <LeaveConsequenceModal
        isOpen={consequenceModal.isOpen}
        teamId={consequenceModal.teamId}
        countryCount={consequenceModal.countryCount}
        penaltyAmount={consequenceModal.penaltyAmount}
        wasInQuestionPhase={consequenceModal.wasInQuestionPhase}
        onDismiss={() =>
          setConsequenceModal((prev) => ({ ...prev, isOpen: false }))
        }
      />
    </div>
  );
}

