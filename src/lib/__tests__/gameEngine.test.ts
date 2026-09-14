import { describe, it, expect } from 'bun:test';
import {
  initGameState,
  rollDice,
  answerQuestion,
  executeMove,
  resolveBuyDecision,
  calculateNetWorth,
  countOwnedCountries,
  calculateLeavePenalty,
  applyLeavePenalty,
  processGameAction,
} from '../gameEngine';
import { GAME_CONFIG, TEAMS_ORDER } from '../gameConfig';
import { TILES } from '../board';

describe('World Order - Game Engine', () => {
  it('should initialize state correctly with 4 teams', () => {
    const state = initGameState();
    expect(state.round).toBe(1);
    expect(state.turnIndex).toBe(0); // Liberalisme
    expect(state.phase).toBe('ROLL');
    expect(state.gameOver).toBe(false);

    TEAMS_ORDER.forEach((id) => {
      const team = state.teams[id];
      expect(team.cash).toBe(GAME_CONFIG.STARTING_CASH);
      expect(team.position).toBe(0);
      expect(team.bankrupt).toBe(false);
      expect(team.isNeutral).toBe(false);
    });
  });

  it('should support starting with neutral ideologies when < 4 players', () => {
    const state = initGameState({ activeTeamIds: ['liberalisme', 'komunisme'] });
    expect(state.teams.liberalisme.isNeutral).toBe(false);
    expect(state.teams.komunisme.isNeutral).toBe(false);
    expect(state.teams.fasisme.isNeutral).toBe(true);
    expect(state.teams.kapitalisme.isNeutral).toBe(true);
  });

  it('should roll dice and transition to QUESTION phase', () => {
    const state = initGameState();
    const rolled = rollDice(state, 4);

    expect(rolled.phase).toBe('QUESTION');
    expect(rolled.activeDice).toBe(4);
    expect(rolled.currentQuestion).not.toBeNull();
  });

  it('should stage answer without moving immediately, then move forward clockwise on executeMove when correct', () => {
    const state = initGameState();
    const rolled = rollDice(state, 3);
    const correctIdx = rolled.currentQuestion!.correct;

    const answered = answerQuestion(rolled, correctIdx);
    const teamBeforeMove = answered.teams[TEAMS_ORDER[state.turnIndex]];

    expect(answered.questionAnswered?.isCorrect).toBe(true);
    expect(teamBeforeMove.position).toBe(0); // Has NOT moved yet!

    const moved = executeMove(answered);
    const teamAfterMove = moved.teams[TEAMS_ORDER[state.turnIndex]];
    expect(teamAfterMove.position).toBe(3); // Moved to Tile 3: Prancis
  });

  it('should move backward counter-clockwise when question is answered incorrectly', () => {
    const state = initGameState();
    // Start at position 5 (Italia)
    state.teams.liberalisme.position = 5;

    const rolled = rollDice(state, 2);
    const wrongIdx = (rolled.currentQuestion!.correct + 1) % 4;

    const answered = answerQuestion(rolled, wrongIdx);
    expect(answered.questionAnswered?.isCorrect).toBe(false);
    expect(answered.teams.liberalisme.position).toBe(5); // Still at 5 before executeMove

    const moved = executeMove(answered);
    const team = moved.teams.liberalisme;
    expect(team.position).toBe(3); // 5 - 2 = 3
  });

  it('should NOT allow buying unowned country if answered incorrectly (only passes)', () => {
    const state = initGameState();
    state.teams.liberalisme.position = 0;

    const rolled = rollDice(state, 1); // Tile 1: Britania Raya (unowned)
    const wrongIdx = (rolled.currentQuestion!.correct + 1) % 4;

    const answered = answerQuestion(rolled, wrongIdx);
    const moved = executeMove(answered);

    // Should NOT transition to CHOICE for buying
    expect(moved.phase).not.toBe('CHOICE');
    expect(moved.pendingChoice).toBeNull();
    // Turn advances to next player
    expect(moved.turnIndex).toBe(1);
    expect(moved.owners[1]).toBeNull();
  });

  it('should apply Komunisme 20% Kolektivisasi discount on country purchase when answered correctly', () => {
    const state = initGameState();
    state.turnIndex = 1; // Komunisme
    state.teams.komunisme.position = 0;

    const rolled = rollDice(state, 1); // Land on Britania Raya ($140)
    const correctIdx = rolled.currentQuestion!.correct;
    const answered = answerQuestion(rolled, correctIdx);
    const moved = executeMove(answered);

    expect(moved.phase).toBe('CHOICE');
    expect(moved.pendingChoice?.type).toBe('BUY');

    if (moved.pendingChoice?.type === 'BUY') {
      const normalPrice = TILES[1].price!; // 140
      const expectedDiscounted = Math.round(normalPrice * 0.8); // 112
      expect(moved.pendingChoice.price).toBe(expectedDiscounted);

      // Buy it
      const afterBuy = resolveBuyDecision(moved, true);
      expect(afterBuy.owners[1]).toBe('komunisme');
      expect(afterBuy.teams.komunisme.cash).toBe(
        GAME_CONFIG.STARTING_CASH - expectedDiscounted
      );
    }
  });

  it('should apply Basis Kekuatan bonus (+150) on correct answer and malus (-150) on wrong answer', () => {
    // Basis tile is 4 (Jerman)
    const state = initGameState();
    state.teams.liberalisme.position = 1;

    // Roll 3 -> lands on 4 (Jerman) with correct answer
    const rolled = rollDice(state, 3);
    const answered = answerQuestion(rolled, rolled.currentQuestion!.correct);
    const moved = executeMove(answered);
    expect(moved.teams.liberalisme.cash).toBe(
      GAME_CONFIG.STARTING_CASH + GAME_CONFIG.BASIS_BONUS
    );

    // Test Fasisme perk on Basis malus (-50% penalty = -75 instead of -150)
    const stateFasisme = initGameState();
    stateFasisme.turnIndex = 2; // Fasisme
    stateFasisme.teams.fasisme.position = 6;

    const rolledFas = rollDice(stateFasisme, 2); // 6 - 2 = 4 (Jerman) counter-clockwise
    const wrongIdx = (rolledFas.currentQuestion!.correct + 1) % 4;
    const answeredFas = answerQuestion(rolledFas, wrongIdx);
    const movedFas = executeMove(answeredFas);

    const expectedMalus = Math.round(
      GAME_CONFIG.BASIS_MALUS * GAME_CONFIG.FASISME_PENALTY_DISCOUNT
    );
    expect(movedFas.teams.fasisme.cash).toBe(
      GAME_CONFIG.STARTING_CASH - expectedMalus
    );
  });

  it('should calculate net worth properly with owned country prices', () => {
    const state = initGameState();
    state.owners[1] = 'liberalisme'; // Britania Raya ($140)
    state.owners[2] = 'liberalisme'; // Amerika Serikat ($260)

    const netWorth = calculateNetWorth(state, 'liberalisme');
    expect(netWorth).toBe(GAME_CONFIG.STARTING_CASH + 140 + 260);
  });

  it('should pay 10% base rent and award Liberalisme +$20 visit perk', () => {
    const state = initGameState();
    state.owners[5] = 'liberalisme'; // Italia ($180)
    state.turnIndex = 3; // Kapitalisme
    state.teams.kapitalisme.position = 3;

    // Roll 2 -> lands on 5 (Italia, owned by Liberalisme)
    const rolled = rollDice(state, 2);
    const answered = answerQuestion(rolled, rolled.currentQuestion!.correct);
    const moved = executeMove(answered);

    const expectedRent = Math.round(180 * 0.1); // $18
    expect(moved.teams.kapitalisme.cash).toBe(
      GAME_CONFIG.STARTING_CASH - expectedRent
    );
    expect(moved.teams.liberalisme.cash).toBe(
      GAME_CONFIG.STARTING_CASH + expectedRent + GAME_CONFIG.LIBERALISME_VISIT_BONUS
    );
  });

  describe('Anti-Cheat - Akibat Meninggalkan Permainan', () => {
    it('should count only owned countries (not basis tiles)', () => {
      const state = initGameState();
      expect(countOwnedCountries(state, 'liberalisme')).toBe(0);

      // Tile 1 is country (Britania Raya), Tile 3 is country (Prancis)
      state.owners[1] = 'liberalisme';
      state.owners[3] = 'liberalisme';
      expect(countOwnedCountries(state, 'liberalisme')).toBe(2);

      // Tile 4 is basis (Jerman) - should NOT count
      state.owners[4] = 'liberalisme';
      expect(countOwnedCountries(state, 'liberalisme')).toBe(2);
    });

    it('should calculate penalty of 100 x owned countries or min 100 if zero', () => {
      const state = initGameState();
      // 0 countries -> minimum 100
      const p0 = calculateLeavePenalty(state, 'liberalisme');
      expect(p0.countryCount).toBe(0);
      expect(p0.penaltyAmount).toBe(100);

      // 3 countries -> 300
      state.owners[1] = 'liberalisme';
      state.owners[2] = 'liberalisme';
      state.owners[3] = 'liberalisme';
      const p3 = calculateLeavePenalty(state, 'liberalisme');
      expect(p3.countryCount).toBe(3);
      expect(p3.penaltyAmount).toBe(300);
    });

    it('should deduct penalty from player and distribute stolen money to rival ideologies', () => {
      const state = initGameState();
      state.turnIndex = 0; // Liberalisme
      // Give Liberalisme 2 countries ($200 penalty)
      state.owners[1] = 'liberalisme';
      state.owners[2] = 'liberalisme';

      const initialOpponentCash = state.teams.komunisme.cash; // 1500
      const penalized = applyLeavePenalty(state, 'liberalisme');

      // Liberalisme loses 200
      expect(penalized.teams.liberalisme.cash).toBe(GAME_CONFIG.STARTING_CASH - 200);

      // 3 active opponents (komunisme, fasisme, kapitalisme) share 200 // 3 = 66 each
      const expectedShare = Math.floor(200 / 3);
      expect(penalized.teams.komunisme.cash).toBe(initialOpponentCash + expectedShare);
      expect(penalized.teams.fasisme.cash).toBe(initialOpponentCash + expectedShare);
      expect(penalized.teams.kapitalisme.cash).toBe(initialOpponentCash + expectedShare);

      // Check log wording: "Anda meninggalkan permainan, para ideologi mulai mencuri dari anda"
      expect(penalized.log[0].text).toContain(
        'Anda meninggalkan permainan, para ideologi mulai mencuri dari anda'
      );
    });

    it('should cancel and fail question if player leaves during QUESTION phase', () => {
      const state = initGameState();
      const rolled = rollDice(state, 3);
      expect(rolled.phase).toBe('QUESTION');
      expect(rolled.questionAnswered).toBeNull();

      const penalized = applyLeavePenalty(rolled, 'liberalisme');
      expect(penalized.questionAnswered).not.toBeNull();
      expect(penalized.questionAnswered?.isCorrect).toBe(false);
      expect(penalized.questionAnswered?.chosenIndex).toBe(-1);

      // Moving pawn afterwards will force moving backwards because isCorrect is false
      const moved = executeMove(penalized);
      // Position 0 - 3 (wrapped) = 17
      expect(moved.teams.liberalisme.position).toBe((0 - 3 + 20) % 20);
    });

    it('should process LEAVE_PENALTY action via processGameAction', () => {
      const state = initGameState();
      state.turnIndex = 0; // Liberalisme

      const updated = processGameAction(state, {
        type: 'LEAVE_PENALTY',
        teamId: 'liberalisme',
      });

      expect(updated.teams.liberalisme.cash).toBe(GAME_CONFIG.STARTING_CASH - 100);
      expect(updated.log[0].text).toContain('para ideologi mulai mencuri dari anda');
    });
  });
});
