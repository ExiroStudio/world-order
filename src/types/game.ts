export type TeamId = 'liberalisme' | 'komunisme' | 'fasisme' | 'kapitalisme';

export type ContinentId = 'eropa' | 'amerika' | 'asia' | 'dunia_berkembang';

export type TileType = 'start' | 'basis' | 'country';

export interface Tile {
  id: number;
  name: string;
  type: TileType;
  continent?: ContinentId;
  price?: number;
}

export interface TeamDefinition {
  id: TeamId;
  name: string;
  role: string;
  perkName: string;
  perkDescription: string;
  colorHex: string;
  lightHex: string;
}

export interface TeamState {
  id: TeamId;
  name: string;
  role: string;
  colorHex: string;
  cash: number;
  position: number;
  bankrupt: boolean;
  isNeutral: boolean;
}

export interface Question {
  id: number;
  q: string;
  opts: [string, string, string, string];
  correct: number;
  why: string;
}

export type GamePhase = 'ROLL' | 'QUESTION' | 'CHOICE' | 'GAME_OVER';

export interface PendingBuyChoice {
  type: 'BUY';
  teamId: TeamId;
  tileIndex: number;
  price: number;
}

export interface PendingCongressChoice {
  type: 'CONGRESS_PENALTY';
  teamId: TeamId;
  tributeAmountPerOpponent: number;
  ownedCountryIndices: number[];
}

export type PendingChoice = PendingBuyChoice | PendingCongressChoice;

export interface GameLogEntry {
  id: string;
  text: string;
  teamId?: TeamId;
  timestamp: number;
}

export interface GameState {
  turnIndex: number;
  round: number;
  maxRounds: number;
  gameOver: boolean;
  winner: TeamId | 'tie' | null;
  phase: GamePhase;
  teams: Record<TeamId, TeamState>;
  owners: (TeamId | null)[];
  activeDice: number | null;
  currentQuestion: Question | null;
  questionAnswered: {
    chosenIndex: number;
    isCorrect: boolean;
  } | null;
  pendingChoice: PendingChoice | null;
  log: GameLogEntry[];
  usedQuestionIds: number[];
}

export interface RoomPlayer {
  uid: string;
  teamId: TeamId;
  name: string;
  joinedAt: number;
}

export interface RoomDoc {
  code: string;
  createdAt: number;
  status: 'waiting' | 'playing' | 'finished';
  hostUid: string;
  players: RoomPlayer[];
  gameState: GameState;
}

export type ActionType =
  | 'ROLL_DICE'
  | 'ANSWER_QUESTION'
  | 'BUY_COUNTRY'
  | 'CONGRESS_CHOICE';

export interface GameAction {
  type: ActionType;
  teamId: TeamId;
  payload?: {
    chosenIndex?: number;
    buy?: boolean;
    choice?: 'tribute' | 'sell';
    countryIndex?: number;
  };
}
