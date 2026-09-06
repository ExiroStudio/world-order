import { isContinentMonopolized, TILES, TOTAL_TILES } from './board';
import { GAME_CONFIG, TEAM_DEFINITIONS, TEAMS_ORDER } from './gameConfig';
import { getRandomQuestion } from './questions';
import {
  GameAction,
  GameLogEntry,
  GameState,
  PendingBuyChoice,
  PendingCongressChoice,
  TeamId,
  TeamState,
} from '@/types/game';

function createLog(text: string, teamId?: TeamId): GameLogEntry {
  return {
    id: Math.random().toString(36).substring(2, 9),
    text,
    teamId,
    timestamp: Date.now(),
  };
}

export function calculateNetWorth(state: GameState, teamId: TeamId): number {
  const team = state.teams[teamId];
  if (!team || team.bankrupt) return 0;
  let countryValue = 0;
  state.owners.forEach((owner, idx) => {
    if (owner === teamId && TILES[idx].price) {
      countryValue += TILES[idx].price!;
    }
  });
  return team.cash + countryValue;
}

export function initGameState(options?: {
  activeTeamIds?: TeamId[];
  maxRounds?: number;
}): GameState {
  const activeTeamIds = options?.activeTeamIds || [...TEAMS_ORDER];
  const maxRounds = options?.maxRounds || GAME_CONFIG.MAX_ROUNDS;

  const teams = {} as Record<TeamId, TeamState>;
  TEAMS_ORDER.forEach((id) => {
    const def = TEAM_DEFINITIONS[id];
    teams[id] = {
      id,
      name: def.name,
      role: def.role,
      colorHex: def.colorHex,
      cash: GAME_CONFIG.STARTING_CASH,
      position: 0,
      bankrupt: false,
      isNeutral: !activeTeamIds.includes(id),
    };
  });

  // Turn index starts with the first non-neutral team
  let firstTurnIndex = TEAMS_ORDER.findIndex((id) => activeTeamIds.includes(id));
  if (firstTurnIndex === -1) firstTurnIndex = 0;

  const firstTeam = teams[TEAMS_ORDER[firstTurnIndex]];

  return {
    turnIndex: firstTurnIndex,
    round: 1,
    maxRounds,
    gameOver: false,
    winner: null,
    phase: 'ROLL',
    teams,
    owners: new Array(TOTAL_TILES).fill(null),
    activeDice: null,
    currentQuestion: null,
    questionAnswered: null,
    pendingChoice: null,
    log: [
      createLog(
        `Permainan dimulai. Giliran pertama: ${firstTeam.name}.`,
        firstTeam.id
      ),
    ],
    usedQuestionIds: [],
  };
}

function getActivePlayableTeams(state: GameState): TeamState[] {
  return TEAMS_ORDER.map((id) => state.teams[id]).filter(
    (t) => !t.bankrupt && !t.isNeutral
  );
}

function handleBankruptcyCheck(
  state: GameState,
  debtorId: TeamId
): { wasBankrupt: boolean } {
  const debtor = state.teams[debtorId];
  if (debtor.cash >= 0) return { wasBankrupt: false };

  // Need to liquidate countries until cash >= 0 or no countries left
  while (debtor.cash < 0) {
    // Find all owned countries
    const ownedIndices: number[] = [];
    state.owners.forEach((owner, idx) => {
      if (owner === debtorId) ownedIndices.push(idx);
    });

    if (ownedIndices.length === 0) {
      // Insolvent with no assets remaining -> bankrupt!
      debtor.bankrupt = true;
      debtor.cash = 0;
      state.log.unshift(
        createLog(
          `⚠️ ${debtor.name} kehabisan seluruh aset dan resmi BANGKRUT! Tersisih dari permainan.`,
          debtorId
        )
      );
      return { wasBankrupt: true };
    }

    // Sell the cheapest country first
    ownedIndices.sort((a, b) => (TILES[a].price || 0) - (TILES[b].price || 0));
    const toSellIdx = ownedIndices[0];
    const tile = TILES[toSellIdx];
    const refund = Math.round((tile.price || 0) * GAME_CONFIG.COUNTRY_SELL_RATIO);

    debtor.cash += refund;
    state.owners[toSellIdx] = null;
    state.log.unshift(
      createLog(
        `🏛️ Jual paksa aset: ${debtor.name} terpaksa menjual ${tile.name} ke bank seharga $${refund} untuk membayar hutang.`,
        debtorId
      )
    );
  }

  return { wasBankrupt: false };
}

function checkGameOver(state: GameState): boolean {
  const activeTeams = getActivePlayableTeams(state);

  // Victory by elimination
  if (activeTeams.length <= 1) {
    state.gameOver = true;
    state.phase = 'GAME_OVER';
    state.winner = activeTeams.length === 1 ? activeTeams[0].id : null;
    const winnerName = activeTeams.length === 1 ? activeTeams[0].name : 'Tidak ada';
    state.log.unshift(
      createLog(`🏆 Permainan selesai! ${winnerName} menjadi pemenang tunggal yang bertahan!`)
    );
    return true;
  }

  // Victory by round limit
  if (state.round > state.maxRounds) {
    state.gameOver = true;
    state.phase = 'GAME_OVER';

    let highestWealth = -Infinity;
    let topTeamId: TeamId | null = null;
    let isTie = false;

    activeTeams.forEach((t) => {
      const wealth = calculateNetWorth(state, t.id);
      if (wealth > highestWealth) {
        highestWealth = wealth;
        topTeamId = t.id;
        isTie = false;
      } else if (wealth === highestWealth) {
        isTie = true;
      }
    });

    state.winner = isTie ? 'tie' : topTeamId;
    state.log.unshift(
      createLog(
        isTie
          ? `🏁 Batas ronde tercapai (${state.maxRounds} ronde). Hasil imbang di puncak kekayaan!`
          : `🏁 Batas ronde tercapai (${state.maxRounds} ronde). Pemenang: ${state.teams[topTeamId!].name} dengan total kekayaan $${highestWealth}!`
      )
    );
    return true;
  }

  return false;
}

function advanceTurn(state: GameState): GameState {
  if (checkGameOver(state)) {
    return state;
  }

  let nextIndex = state.turnIndex;

  for (let i = 0; i < TEAMS_ORDER.length; i++) {
    nextIndex = (nextIndex + 1) % TEAMS_ORDER.length;
    if (nextIndex === 0) {
      state.round++;
    }
    const candidate = state.teams[TEAMS_ORDER[nextIndex]];
    if (!candidate.bankrupt && !candidate.isNeutral) {
      break;
    }
  }

  if (checkGameOver(state)) {
    return state;
  }

  state.turnIndex = nextIndex;
  state.phase = 'ROLL';
  state.activeDice = null;
  state.currentQuestion = null;
  state.questionAnswered = null;
  state.pendingChoice = null;

  const currentTeam = state.teams[TEAMS_ORDER[state.turnIndex]];
  state.log.unshift(
    createLog(`Giliran giliran ${currentTeam.name}.`, currentTeam.id)
  );

  return state;
}

export function rollDice(state: GameState, forcedDice?: number): GameState {
  if (state.phase !== 'ROLL' || state.gameOver) return state;

  const newState = structuredClone(state);
  const currentTeam = newState.teams[TEAMS_ORDER[newState.turnIndex]];

  const dice = forcedDice || Math.floor(Math.random() * 6) + 1;
  const question = getRandomQuestion(newState.usedQuestionIds);

  newState.activeDice = dice;
  newState.currentQuestion = question;
  newState.phase = 'QUESTION';
  newState.questionAnswered = null;
  newState.pendingChoice = null;

  newState.log.unshift(
    createLog(
      `🎲 ${currentTeam.name} melempar dadu dan mendapatkan angka ${dice}. Menjawab pertanyaan...`,
      currentTeam.id
    )
  );

  return newState;
}

export function answerQuestion(
  state: GameState,
  chosenIndex: number
): GameState {
  if (state.phase !== 'QUESTION' || !state.currentQuestion || state.gameOver) {
    return state;
  }

  const newState = structuredClone(state);
  const q = newState.currentQuestion;
  if (!q) return state;

  const currentTeamId = TEAMS_ORDER[newState.turnIndex];
  const currentTeam = newState.teams[currentTeamId];
  const isCorrect = chosenIndex === q.correct;

  newState.usedQuestionIds.push(q.id);
  newState.questionAnswered = { chosenIndex, isCorrect };

  const rollValue = newState.activeDice || 1;
  const beforePos = currentTeam.position;

  let passedCongressClockwise = false;
  let passedCongressCounterClockwise = false;
  let newPos: number;

  if (isCorrect) {
    // Move forward (clockwise)
    newPos = (beforePos + rollValue) % TOTAL_TILES;
    if (beforePos + rollValue >= TOTAL_TILES) {
      passedCongressClockwise = true;
    }
    newState.log.unshift(
      createLog(
        `✔ ${currentTeam.name} menjawab BENAR! Maju ${rollValue} langkah ke ${TILES[newPos].name}.`,
        currentTeamId
      )
    );
  } else {
    // Move backward (counter-clockwise)
    newPos = (beforePos - rollValue) % TOTAL_TILES;
    if (newPos < 0) newPos += TOTAL_TILES;
    if (beforePos - rollValue <= 0) {
      passedCongressCounterClockwise = true;
    }
    newState.log.unshift(
      createLog(
        `✘ ${currentTeam.name} menjawab SALAH! Mundur ${rollValue} langkah ke ${TILES[newPos].name}. (${q.why})`,
        currentTeamId
      )
    );
  }

  currentTeam.position = newPos;

  // 1. Resolve Congress Pass / Land
  if (passedCongressClockwise) {
    // Income = owned countries * 50
    let ownedCount = 0;
    newState.owners.forEach((o) => {
      if (o === currentTeamId) ownedCount++;
    });
    let income = ownedCount * GAME_CONFIG.CONGRESS_INCOME_PER_COUNTRY;

    // Kapitalisme perk: +25% extra Congress income
    if (currentTeamId === 'kapitalisme' && income > 0) {
      income = Math.round(income * GAME_CONFIG.KAPITALISME_CONGRESS_BONUS_MULT);
      newState.log.unshift(
        createLog(
          `✨ [Perk Profit Maksimal] Kapitalisme mendapat +25% ekstra dari Kongres Dunia!`,
          currentTeamId
        )
      );
    }

    currentTeam.cash += income;
    newState.log.unshift(
      createLog(
        `🏛️ Melewati Kongres Dunia dari arah benar: ${currentTeam.name} memperoleh pemasukan +$${income} (${ownedCount} negara dikuasai).`,
        currentTeamId
      )
    );
  }

  if (passedCongressCounterClockwise) {
    // Penalty from wrong direction: Choose (a) Upeti or (b) Sell 1 country
    const ownedIndices: number[] = [];
    newState.owners.forEach((o, idx) => {
      if (o === currentTeamId) ownedIndices.push(idx);
    });

    let tributePerOpponent = GAME_CONFIG.CONGRESS_PENALTY_TRIBUTE_PER_OPPONENT;
    // Fasisme perk: pays half penalty
    if (currentTeamId === 'fasisme') {
      tributePerOpponent = Math.round(
        tributePerOpponent * GAME_CONFIG.FASISME_PENALTY_DISCOUNT
      );
    }

    if (ownedIndices.length > 0) {
      // Must choose between paying tribute or selling a country
      const congressChoice: PendingCongressChoice = {
        type: 'CONGRESS_PENALTY',
        teamId: currentTeamId,
        tributeAmountPerOpponent: tributePerOpponent,
        ownedCountryIndices: ownedIndices,
      };
      newState.phase = 'CHOICE';
      newState.pendingChoice = congressChoice;
      newState.log.unshift(
        createLog(
          `⚠️ Melewati Kongres Dunia dari arah mundur: ${currentTeam.name} wajib memilih bayar upeti atau menjual 1 negara!`,
          currentTeamId
        )
      );
      return newState;
    } else {
      // No countries owned -> automatically pay tribute
      const opponents = getActivePlayableTeams(newState).filter(
        (t) => t.id !== currentTeamId
      );
      const totalTribute = tributePerOpponent * opponents.length;
      currentTeam.cash -= totalTribute;
      opponents.forEach((op) => {
        op.cash += tributePerOpponent;
      });

      newState.log.unshift(
        createLog(
          `🏛️ Melewati Kongres Dunia mundur tanpa memiliki negara: ${currentTeam.name} membayar upeti $${tributePerOpponent} ke setiap lawan (Total -$${totalTribute}).`,
          currentTeamId
        )
      );

      handleBankruptcyCheck(newState, currentTeamId);
      if (newState.teams[currentTeamId].bankrupt) {
        return advanceTurn(newState);
      }
    }
  }

  // 2. Resolve Landing on Tile
  return resolveLandingTile(newState, newPos, isCorrect);
}

function resolveLandingTile(
  state: GameState,
  tileIndex: number,
  isCorrect: boolean
): GameState {
  const currentTeamId = TEAMS_ORDER[state.turnIndex];
  const currentTeam = state.teams[currentTeamId];
  const tile = TILES[tileIndex];

  if (tile.type === 'start') {
    // Already handled in congress pass check
    return advanceTurn(state);
  }

  if (tile.type === 'basis') {
    if (isCorrect) {
      currentTeam.cash += GAME_CONFIG.BASIS_BONUS;
      state.log.unshift(
        createLog(
          `⚡ Mendarat di ${tile.name} (Basis Kekuatan): Konsolidasi kekuatan berhasil! +$${GAME_CONFIG.BASIS_BONUS}.`,
          currentTeamId
        )
      );
    } else {
      let malus = GAME_CONFIG.BASIS_MALUS;
      if (currentTeamId === 'fasisme') {
        malus = Math.round(malus * GAME_CONFIG.FASISME_PENALTY_DISCOUNT);
        state.log.unshift(
          createLog(
            `✨ [Perk Ekspansi Paksa] Fasisme hanya terkena setengah malus Basis Kekuatan (-$${malus})!`,
            currentTeamId
          )
        );
      }
      currentTeam.cash -= malus;
      state.log.unshift(
        createLog(
          `💥 Terjebak mundur di ${tile.name} (Basis Kekuatan): Terjadi gejolak internal! -$${malus}.`,
          currentTeamId
        )
      );
      handleBankruptcyCheck(state, currentTeamId);
    }
    return advanceTurn(state);
  }

  if (tile.type === 'country') {
    const owner = state.owners[tileIndex];

    if (owner === null) {
      // Country is unowned
      const normalPrice = tile.price || 100;
      let buyPrice = normalPrice;

      // Komunisme perk: 20% discount
      if (currentTeamId === 'komunisme') {
        buyPrice = Math.round(
          normalPrice * (1 - GAME_CONFIG.KOMUNISME_PURCHASE_DISCOUNT)
        );
      }

      if (currentTeam.cash >= buyPrice) {
        // Player has enough cash -> prompt buy decision
        const buyChoice: PendingBuyChoice = {
          type: 'BUY',
          teamId: currentTeamId,
          tileIndex,
          price: buyPrice,
        };
        state.phase = 'CHOICE';
        state.pendingChoice = buyChoice;
        return state;
      } else {
        state.log.unshift(
          createLog(
            `Dana ${currentTeam.name} ($${currentTeam.cash}) tidak mencukupi untuk membeli ${tile.name} ($${buyPrice}).`,
            currentTeamId
          )
        );
        return advanceTurn(state);
      }
    } else if (owner === currentTeamId) {
      state.log.unshift(
        createLog(
          `Mendarat di ${tile.name}, wilayah milik sendiri yang aman.`,
          currentTeamId
        )
      );
      return advanceTurn(state);
    } else {
      // Owned by an opponent -> pay rent!
      const ownerTeam = state.teams[owner];
      const isMonopolized = tile.continent
        ? isContinentMonopolized(state.owners, tile.continent, owner)
        : false;

      const rentRate = isMonopolized
        ? GAME_CONFIG.CONTINENT_SET_RENT_PERCENT
        : GAME_CONFIG.BASE_RENT_PERCENT;

      const rentAmount = Math.round((tile.price || 100) * rentRate);

      currentTeam.cash -= rentAmount;
      ownerTeam.cash += rentAmount;

      const bonusMsg = isMonopolized
        ? ` (Bonus Monopoli Benua ${tile.continent!.toUpperCase()} 25%)`
        : ' (10%)';

      state.log.unshift(
        createLog(
          `💸 ${currentTeam.name} membayar sewa $${rentAmount}${bonusMsg} ke ${ownerTeam.name} di ${tile.name}.`,
          currentTeamId
        )
      );

      // Liberalisme perk: gets +$20 from bank when an opponent lands on their country
      if (owner === 'liberalisme') {
        ownerTeam.cash += GAME_CONFIG.LIBERALISME_VISIT_BONUS;
        state.log.unshift(
          createLog(
            `✨ [Perk Pasar Bebas] Liberalisme menerima tambahan +$${GAME_CONFIG.LIBERALISME_VISIT_BONUS} dari kas atas kunjungan pihak lain ke ${tile.name}!`,
            'liberalisme'
          )
        );
      }

      handleBankruptcyCheck(state, currentTeamId);
      return advanceTurn(state);
    }
  }

  return advanceTurn(state);
}

export function resolveBuyDecision(
  state: GameState,
  buy: boolean
): GameState {
  if (state.phase !== 'CHOICE' || state.pendingChoice?.type !== 'BUY') {
    return state;
  }

  const newState = structuredClone(state);
  const choice = newState.pendingChoice as PendingBuyChoice;
  const team = newState.teams[choice.teamId];
  const tile = TILES[choice.tileIndex];

  if (buy && team.cash >= choice.price) {
    team.cash -= choice.price;
    newState.owners[choice.tileIndex] = choice.teamId;
    const discountMsg =
      choice.teamId === 'komunisme' ? ' [Diskon Kolektivisasi 20%]' : '';
    newState.log.unshift(
      createLog(
        `🚩 ${team.name} resmi membeli wilayah ${tile.name} seharga $${choice.price}${discountMsg}!`,
        choice.teamId
      )
    );
  } else {
    newState.log.unshift(
      createLog(
        `${team.name} memutuskan untuk melewati pembelian ${tile.name}.`,
        choice.teamId
      )
    );
  }

  newState.pendingChoice = null;
  return advanceTurn(newState);
}

export function resolveCongressChoice(
  state: GameState,
  choice: 'tribute' | 'sell',
  countryIndex?: number
): GameState {
  if (
    state.phase !== 'CHOICE' ||
    state.pendingChoice?.type !== 'CONGRESS_PENALTY'
  ) {
    return state;
  }

  const newState = structuredClone(state);
  const pending = newState.pendingChoice as PendingCongressChoice;
  const team = newState.teams[pending.teamId];

  if (choice === 'tribute') {
    const opponents = getActivePlayableTeams(newState).filter(
      (t) => t.id !== pending.teamId
    );
    const totalTribute = pending.tributeAmountPerOpponent * opponents.length;
    team.cash -= totalTribute;
    opponents.forEach((op) => {
      op.cash += pending.tributeAmountPerOpponent;
    });

    const perkNotice =
      pending.teamId === 'fasisme' ? ' [Perk Ekspansi Paksa -50%]' : '';
    newState.log.unshift(
      createLog(
        `🏛️ Upeti Kongres: ${team.name} membayar $${pending.tributeAmountPerOpponent} ke setiap lawan (Total -$${totalTribute})${perkNotice}.`,
        pending.teamId
      )
    );

    handleBankruptcyCheck(newState, pending.teamId);
  } else if (choice === 'sell' && countryIndex != null) {
    const tile = TILES[countryIndex];
    if (newState.owners[countryIndex] === pending.teamId && tile.price) {
      const refund = Math.round(tile.price * GAME_CONFIG.COUNTRY_SELL_RATIO);
      team.cash += refund;
      newState.owners[countryIndex] = null;
      newState.log.unshift(
        createLog(
          `🏛️ Menjual Aset Kongres: ${team.name} menjual kembali ${tile.name} ke bank dan menerima kompensasi +$${refund}.`,
          pending.teamId
        )
      );
    }
  }

  newState.pendingChoice = null;

  if (team.bankrupt) {
    return advanceTurn(newState);
  }

  // After congress penalty is resolved, resolve the tile they landed on
  const landedTilePos = team.position;
  const isCorrect = newState.questionAnswered?.isCorrect || false;
  return resolveLandingTile(newState, landedTilePos, isCorrect);
}

export function processGameAction(
  state: GameState,
  action: GameAction
): GameState {
  const currentTeamId = TEAMS_ORDER[state.turnIndex];

  // Turn enforcement: only active team can act unless game is already over
  if (state.gameOver) return state;

  switch (action.type) {
    case 'ROLL_DICE': {
      if (action.teamId !== currentTeamId) return state;
      return rollDice(state);
    }
    case 'ANSWER_QUESTION': {
      if (action.teamId !== currentTeamId) return state;
      if (action.payload?.chosenIndex == null) return state;
      return answerQuestion(state, action.payload.chosenIndex);
    }
    case 'BUY_COUNTRY': {
      if (action.teamId !== currentTeamId) return state;
      return resolveBuyDecision(state, !!action.payload?.buy);
    }
    case 'CONGRESS_CHOICE': {
      if (action.teamId !== currentTeamId) return state;
      if (!action.payload?.choice) return state;
      return resolveCongressChoice(
        state,
        action.payload.choice,
        action.payload.countryIndex
      );
    }
    default:
      return state;
  }
}
