'use client';

import React, { useState } from 'react';
import { GameState } from '@/types/game';
import {
  initGameState,
  rollDice,
  answerQuestion,
  executeMove,
  resolveBuyDecision,
  resolveCongressChoice,
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

export default function LocalGamePage() {
  const [gameState, setGameState] = useState<GameState>(() => initGameState());
  const [lastLandedTileIndex, setLastLandedTileIndex] = useState<number | null>(
    null
  );
  const [isMoving, setIsMoving] = useState(false);

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

      <main className="w-full max-w-5xl mx-auto px-4 flex-1 flex flex-col items-center">
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
    </div>
  );
}

