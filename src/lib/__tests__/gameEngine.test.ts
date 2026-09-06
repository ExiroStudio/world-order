import { describe, it, expect } from 'bun:test';
import {
  initGameState,
  rollDice,
  answerQuestion,
  resolveBuyDecision,
  calculateNetWorth,
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

  it('should move forward clockwise when question is answered correctly', () => {
    const state = initGameState();
    const rolled = rollDice(state, 3);
    const correctIdx = rolled.currentQuestion!.correct;

    const answered = answerQuestion(rolled, correctIdx);
    const team = answered.teams[TEAMS_ORDER[state.turnIndex]];

    expect(answered.questionAnswered?.isCorrect).toBe(true);
    expect(team.position).toBe(3); // Tile 3: Prancis
  });

  it('should move backward counter-clockwise when question is answered incorrectly', () => {
    const state = initGameState();
    // Start at position 5 (Italia)
    state.teams.liberalisme.position = 5;

    const rolled = rollDice(state, 2);
    const wrongIdx = (rolled.currentQuestion!.correct + 1) % 4;

    const answered = answerQuestion(rolled, wrongIdx);
    const team = answered.teams.liberalisme;

    expect(answered.questionAnswered?.isCorrect).toBe(false);
    expect(team.position).toBe(3); // 5 - 2 = 3
  });

  it('should apply Komunisme 20% Kolektivisasi discount on country purchase', () => {
    const state = initGameState();
    state.turnIndex = 1; // Komunisme
    state.teams.komunisme.position = 0;

    const rolled = rollDice(state, 1); // Land on Britania Raya ($140)
    const correctIdx = rolled.currentQuestion!.correct;
    const answered = answerQuestion(rolled, correctIdx);

    expect(answered.phase).toBe('CHOICE');
    expect(answered.pendingChoice?.type).toBe('BUY');

    if (answered.pendingChoice?.type === 'BUY') {
      const normalPrice = TILES[1].price!; // 140
      const expectedDiscounted = Math.round(normalPrice * 0.8); // 112
      expect(answered.pendingChoice.price).toBe(expectedDiscounted);

      // Buy it
      const afterBuy = resolveBuyDecision(answered, true);
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
    expect(answered.teams.liberalisme.cash).toBe(
      GAME_CONFIG.STARTING_CASH + GAME_CONFIG.BASIS_BONUS
    );

    // Test Fasisme perk on Basis malus (-50% penalty = -75 instead of -150)
    const stateFasisme = initGameState();
    stateFasisme.turnIndex = 2; // Fasisme
    stateFasisme.teams.fasisme.position = 6;

    const rolledFas = rollDice(stateFasisme, 2); // 6 - 2 = 4 (Jerman) counter-clockwise
    const wrongIdx = (rolledFas.currentQuestion!.correct + 1) % 4;
    const answeredFas = answerQuestion(rolledFas, wrongIdx);

    const expectedMalus = Math.round(
      GAME_CONFIG.BASIS_MALUS * GAME_CONFIG.FASISME_PENALTY_DISCOUNT
    );
    expect(answeredFas.teams.fasisme.cash).toBe(
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

    const expectedRent = Math.round(180 * 0.1); // $18
    expect(answered.teams.kapitalisme.cash).toBe(
      GAME_CONFIG.STARTING_CASH - expectedRent
    );
    expect(answered.teams.liberalisme.cash).toBe(
      GAME_CONFIG.STARTING_CASH + expectedRent + GAME_CONFIG.LIBERALISME_VISIT_BONUS
    );
  });
});
