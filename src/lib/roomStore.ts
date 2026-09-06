import {
  doc,
  getDoc,
  runTransaction,
  setDoc,
} from 'firebase/firestore';
import { db } from './firebase';
import { initGameState, processGameAction } from './gameEngine';
import { TEAMS_ORDER } from './gameConfig';
import { GameAction, RoomDoc, RoomPlayer, TeamId } from '@/types/game';

const ROOMS_COLLECTION = 'rooms';

export async function createRoom(
  code: string,
  hostUid: string,
  hostName: string,
  hostTeamId: TeamId
): Promise<RoomDoc> {
  const roomRef = doc(db, ROOMS_COLLECTION, code);
  const existing = await getDoc(roomRef);
  if (existing.exists()) {
    throw new Error('Kode room sudah digunakan. Silakan coba lagi.');
  }

  const initialPlayer: RoomPlayer = {
    uid: hostUid,
    name: hostName,
    teamId: hostTeamId,
    joinedAt: Date.now(),
  };

  const initialGameState = initGameState({
    activeTeamIds: [hostTeamId],
  });

  const roomData: RoomDoc = {
    code,
    createdAt: Date.now(),
    status: 'waiting',
    hostUid,
    players: [initialPlayer],
    gameState: initialGameState,
  };

  await setDoc(roomRef, roomData);
  return roomData;
}

export async function getRoom(code: string): Promise<RoomDoc | null> {
  const roomRef = doc(db, ROOMS_COLLECTION, code);
  const snapshot = await getDoc(roomRef);
  if (!snapshot.exists()) return null;
  return snapshot.data() as RoomDoc;
}

export async function joinRoom(
  code: string,
  player: { uid: string; name: string; teamId: TeamId }
): Promise<RoomDoc> {
  const roomRef = doc(db, ROOMS_COLLECTION, code);

  return await runTransaction(db, async (transaction) => {
    const snapshot = await transaction.get(roomRef);
    if (!snapshot.exists()) {
      throw new Error('Room tidak ditemukan.');
    }

    const room = snapshot.data() as RoomDoc;
    if (room.status !== 'waiting') {
      throw new Error('Permainan sudah dimulai atau telah selesai.');
    }

    // Check if player already joined with a different team or exists
    const existingIndex = room.players.findIndex((p) => p.uid === player.uid);
    const teamTakenByOther = room.players.some(
      (p) => p.teamId === player.teamId && p.uid !== player.uid
    );

    if (teamTakenByOther) {
      throw new Error('Ideologi ini sudah dipilih pemain lain.');
    }

    if (existingIndex >= 0) {
      // Update team/name
      room.players[existingIndex].teamId = player.teamId;
      room.players[existingIndex].name = player.name;
    } else {
      if (room.players.length >= 4) {
        throw new Error('Room sudah penuh (maksimal 4 pemain).');
      }
      room.players.push({
        uid: player.uid,
        name: player.name,
        teamId: player.teamId,
        joinedAt: Date.now(),
      });
    }

    // Mark active ideologies
    const activeTeamIds = room.players.map((p) => p.teamId);
    TEAMS_ORDER.forEach((id) => {
      if (room.gameState.teams[id]) {
        room.gameState.teams[id].isNeutral = !activeTeamIds.includes(id);
      }
    });

    transaction.set(roomRef, room);
    return room;
  });
}

export async function startGame(code: string, hostUid: string): Promise<RoomDoc> {
  const roomRef = doc(db, ROOMS_COLLECTION, code);

  return await runTransaction(db, async (transaction) => {
    const snapshot = await transaction.get(roomRef);
    if (!snapshot.exists()) {
      throw new Error('Room tidak ditemukan.');
    }

    const room = snapshot.data() as RoomDoc;
    if (room.hostUid !== hostUid) {
      throw new Error('Hanya host room yang dapat memulai permainan.');
    }

    if (room.players.length < 2) {
      throw new Error('Minimal 2 pemain diperlukan untuk memulai permainan.');
    }

    const activeTeamIds = room.players.map((p) => p.teamId);

    // Unclaimed ideologies become neutral
    TEAMS_ORDER.forEach((id) => {
      if (room.gameState.teams[id]) {
        room.gameState.teams[id].isNeutral = !activeTeamIds.includes(id);
      }
    });

    // Start with the first active team
    let firstTurnIndex = TEAMS_ORDER.findIndex((id) =>
      activeTeamIds.includes(id)
    );
    if (firstTurnIndex === -1) firstTurnIndex = 0;

    room.gameState.turnIndex = firstTurnIndex;
    room.gameState.phase = 'ROLL';
    room.status = 'playing';

    transaction.set(roomRef, room);
    return room;
  });
}

export async function executeAction(
  code: string,
  playerUid: string,
  action: GameAction
): Promise<RoomDoc> {
  const roomRef = doc(db, ROOMS_COLLECTION, code);

  return await runTransaction(db, async (transaction) => {
    const snapshot = await transaction.get(roomRef);
    if (!snapshot.exists()) {
      throw new Error('Room tidak ditemukan.');
    }

    const room = snapshot.data() as RoomDoc;
    if (room.status !== 'playing') {
      throw new Error('Permainan belum dimulai atau telah berakhir.');
    }

    const player = room.players.find((p) => p.uid === playerUid);
    if (!player) {
      throw new Error('Pemain tidak terdaftar dalam room ini.');
    }

    if (player.teamId !== action.teamId) {
      throw new Error('Aksi tidak valid untuk tim Anda.');
    }

    const activeTeamId = TEAMS_ORDER[room.gameState.turnIndex];
    if (activeTeamId !== action.teamId) {
      throw new Error('Bukan giliran ideologi Anda.');
    }

    // Execute through pure engine
    const nextState = processGameAction(room.gameState, action);
    room.gameState = nextState;

    if (nextState.gameOver) {
      room.status = 'finished';
    }

    transaction.set(roomRef, room);
    return room;
  });
}
