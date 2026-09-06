'use client';

import React, { useEffect, useState, use, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { RoomDoc, TeamId, GameAction } from '@/types/game';
import { TEAMS_ORDER, TEAM_DEFINITIONS } from '@/lib/gameConfig';
import { sanitizeRoomCode } from '@/lib/roomCode';
import { Navbar } from '@/components/Navbar';
import { Scoreboard } from '@/components/Scoreboard';
import { Board } from '@/components/Board';
import { QuestionModal } from '@/components/QuestionModal';
import { BuyPrompt } from '@/components/BuyPrompt';
import { CongressChoiceModal } from '@/components/CongressChoiceModal';
import { EndGameModal } from '@/components/EndGameModal';
import { GameLog } from '@/components/GameLog';

function subscribeStorage(callback: () => void) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

function getStoredUid(): string {
  if (typeof window === 'undefined') return '';
  let uid = localStorage.getItem('wo_uid');
  if (!uid) {
    uid = 'player_' + Math.random().toString(36).substring(2, 9);
    localStorage.setItem('wo_uid', uid);
  }
  return uid;
}

function getStoredName(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem('wo_name') || '';
}

export default function RoomPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const resolvedParams = use(params);
  const rawCode = resolvedParams.code;
  const roomCode = sanitizeRoomCode(rawCode);
  const router = useRouter();

  const [room, setRoom] = useState<RoomDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Local player identification via external store
  const playerUid = useSyncExternalStore(subscribeStorage, getStoredUid, () => '');
  const storedName = useSyncExternalStore(subscribeStorage, getStoredName, () => '');
  const [playerName, setPlayerName] = useState<string>('');
  const [selectedTeam, setSelectedTeam] = useState<TeamId>('liberalisme');
  const [isJoining, setIsJoining] = useState(false);
  const [copied, setCopied] = useState(false);

  // Initialize playerName once when storedName is loaded
  const [hasSyncedName, setHasSyncedName] = useState(false);
  if (!hasSyncedName && storedName) {
    setHasSyncedName(true);
    setPlayerName(storedName);
  }

  // Subscribe to Firestore room document
  useEffect(() => {
    if (!roomCode) return;

    const roomRef = doc(db, 'rooms', roomCode);
    const unsubscribe = onSnapshot(
      roomRef,
      (snapshot) => {
        setLoading(false);
        if (snapshot.exists()) {
          const data = snapshot.data() as RoomDoc;
          setRoom(data);
          setError(null);
        } else {
          setError('Room dengan kode ini tidak ditemukan.');
        }
      },
      (err) => {
        setLoading(false);
        setError('Gagal menghubungkan ke server room: ' + err.message);
      }
    );

    return () => unsubscribe();
  }, [roomCode]);

  // Copy room link
  const handleCopyCode = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(roomCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Join Room with chosen ideology
  const handleJoinLobby = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) {
      setError('Masukkan nama Anda terlebih dahulu.');
      return;
    }

    setIsJoining(true);
    setError(null);

    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('wo_name', playerName.trim());
      }

      const res = await fetch(`/api/room/${roomCode}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: playerUid,
          name: playerName.trim(),
          teamId: selectedTeam,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Gagal memilih ideologi.');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan.');
    } finally {
      setIsJoining(false);
    }
  };

  // Host starts game (active when >= 2 players have joined)
  const handleStartGame = async () => {
    try {
      setError(null);
      const res = await fetch(`/api/room/${roomCode}/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hostUid: playerUid }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Gagal memulai permainan.');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan.');
    }
  };

  // Dispatch game action to single arbiter API
  const dispatchAction = async (action: GameAction) => {
    try {
      await fetch(`/api/room/${roomCode}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerUid, action }),
      });
    } catch {
      // Ignored network retry
    }
  };

  // Current player info
  const myPlayerRecord = room?.players.find((p) => p.uid === playerUid);
  const myTeamId = myPlayerRecord?.teamId;
  const isHost = room?.hostUid === playerUid;

  // Turn verification
  const currentActiveTeamId = room?.gameState
    ? TEAMS_ORDER[room.gameState.turnIndex]
    : null;
  const isMyTurn = myTeamId != null && myTeamId === currentActiveTeamId;

  // Track movement pulse derived from game state
  const lastLandedTileIndex =
    room?.gameState && currentActiveTeamId
      ? room.gameState.teams[currentActiveTeamId].position
      : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1c1f26] flex items-center justify-center text-[#eae6da]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-[#c9a13b] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-medium text-[#9aa1ad]">
            Menghubungkan ke Room {roomCode}...
          </p>
        </div>
      </div>
    );
  }

  if (error && !room) {
    return (
      <div className="min-h-screen bg-[#1c1f26] flex items-center justify-center p-4 text-[#eae6da]">
        <div className="bg-[#262b35] border border-red-500/50 rounded-2xl p-6 max-w-md w-full text-center space-y-4 shadow-xl">
          <div className="text-3xl">⚠️</div>
          <h2 className="font-serif text-xl font-bold text-red-300">
            Terjadi Kesalahan
          </h2>
          <p className="text-xs text-[#9aa1ad]">{error}</p>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="w-full py-2.5 px-4 rounded-xl bg-[#3a4150] hover:bg-[#4b5563] text-white text-xs font-semibold"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  if (!room) return null;

  // ----------------------------------------------------
  // LOBBY VIEW (status === 'waiting')
  // ----------------------------------------------------
  if (room.status === 'waiting') {
    const playerCount = room.players.length;
    const canStart = isHost && playerCount >= 2;

    return (
      <div className="min-h-screen flex flex-col bg-[#1c1f26] text-[#eae6da] pb-12">
        <Navbar roomCode={roomCode} />

        <main className="w-full max-w-2xl mx-auto px-4 mt-6">
          <div className="bg-[#262b35] border border-[#3a4150] rounded-2xl p-6 shadow-xl">
            {/* Header info */}
            <div className="text-center mb-6 pb-5 border-b border-[#3a4150]">
              <div className="text-xs font-bold text-[#c9a13b] uppercase tracking-wider mb-1">
                Lobi Permainan Online
              </div>
              <h2 className="font-serif text-3xl font-bold text-[#f4ecd8] mb-2">
                Room: <span className="font-mono text-[#c9a13b]">{roomCode}</span>
              </h2>

              <div className="flex items-center justify-center gap-2 mt-3">
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#3a4150] bg-[#1c1f26] text-xs font-mono text-[#eae6da] hover:border-[#c9a13b] transition-colors cursor-pointer"
                >
                  <span>{copied ? '✔ Tersalin!' : '📋 Salin Kode Room'}</span>
                </button>
              </div>
            </div>

            {/* Ideology Slots */}
            <div className="space-y-3 mb-6">
              <div className="text-xs font-semibold text-[#9aa1ad] uppercase tracking-wider">
                Slot Pemain Ideologi ({playerCount}/4 Pemain):
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {TEAMS_ORDER.map((id) => {
                  const def = TEAM_DEFINITIONS[id];
                  const occupant = room.players.find((p) => p.teamId === id);
                  const isMine = myTeamId === id;

                  return (
                    <div
                      key={id}
                      className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                        occupant
                          ? isMine
                            ? 'border-[#c9a13b] bg-[#c9a13b]/15 shadow-sm'
                            : 'border-[#3a4150] bg-[#1c1f26]'
                          : 'border-dashed border-[#3a4150] bg-[#1c1f26]/40 opacity-75'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-3.5 h-3.5 rounded-full shrink-0"
                          style={{ backgroundColor: def.colorHex }}
                        />
                        <div>
                          <div className="font-bold text-xs text-[#eae6da]">
                            {def.name}
                          </div>
                          <div className="text-[10px] text-[#9aa1ad]">
                            {def.perkName}
                          </div>
                        </div>
                      </div>

                      <div>
                        {occupant ? (
                          <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                            {occupant.name} {isMine && '(Anda)'}
                          </span>
                        ) : (
                          <span className="text-[11px] text-zinc-500 italic">
                            Netral (kosong)
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Join Ideology Form if not yet joined */}
            {!myPlayerRecord ? (
              <form
                onSubmit={handleJoinLobby}
                className="bg-[#1c1f26] p-4 rounded-xl border border-[#3a4150] space-y-3 mb-5"
              >
                <div className="text-xs font-bold text-[#c9a13b] uppercase">
                  Pilih Ideologi Anda
                </div>

                <div>
                  <label className="block text-[11px] text-[#9aa1ad] mb-1">
                    Nama Pemain:
                  </label>
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="Nama Anda"
                    maxLength={20}
                    className="w-full bg-[#262b35] border border-[#3a4150] rounded-lg px-3 py-2 text-xs text-[#eae6da] focus:outline-none focus:border-[#c9a13b]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-[#9aa1ad] mb-1">
                    Ideologi yang Masih Tersedia:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {TEAMS_ORDER.map((id) => {
                      const def = TEAM_DEFINITIONS[id];
                      const isTaken = room.players.some((p) => p.teamId === id);
                      const isSelected = selectedTeam === id;

                      return (
                        <button
                          key={id}
                          type="button"
                          disabled={isTaken}
                          onClick={() => setSelectedTeam(id)}
                          className={`p-2 rounded-lg border text-left text-xs transition-all ${
                            isTaken
                              ? 'opacity-30 cursor-not-allowed border-[#3a4150]'
                              : isSelected
                              ? 'border-[#c9a13b] bg-[#c9a13b]/20 text-white font-bold'
                              : 'border-[#3a4150] bg-[#262b35] hover:border-[#9aa1ad] cursor-pointer'
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: def.colorHex }}
                            />
                            <span>{def.name}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isJoining}
                  className="w-full py-2.5 px-4 rounded-lg bg-[#c9a13b] hover:bg-[#deb447] text-[#1c1f26] font-bold text-xs transition-all cursor-pointer disabled:opacity-50"
                >
                  {isJoining ? 'Mengonfirmasi...' : 'Pilih Ideologi Ini'}
                </button>
              </form>
            ) : (
              <div className="p-3.5 rounded-xl bg-[#1c1f26] border border-[#c9a13b]/50 text-xs text-center mb-5 text-[#eae6da]">
                Anda telah memilih{' '}
                <strong className="text-[#c9a13b]">
                  {TEAM_DEFINITIONS[myTeamId!].name}
                </strong>
                . Menunggu host memulai permainan.
              </div>
            )}

            {/* Host Start Game Controls */}
            {isHost ? (
              <div className="space-y-2 text-center">
                <button
                  type="button"
                  disabled={!canStart}
                  onClick={handleStartGame}
                  className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm transition-all shadow-md ${
                    canStart
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer active:scale-98'
                      : 'bg-[#3a4150] text-[#9aa1ad] opacity-50 cursor-not-allowed'
                  }`}
                >
                  {playerCount < 2
                    ? 'Menunggu Pemain Lain (Minimal 2 Pemain)'
                    : `Mulai Permainan (${playerCount} Pemain Aktif)`}
                </button>
                <div className="text-[11px] text-[#9aa1ad]">
                  Ideologi yang tidak dipilih pemain akan otomatis menjadi
                  &quot;Netral&quot; dan giliran-nya dilewati.
                </div>
              </div>
            ) : (
              <div className="text-center text-xs text-[#9aa1ad] italic">
                Hanya Host yang dapat memulai permainan ketika sudah ada minimal 2
                pemain.
              </div>
            )}

            {error && (
              <div className="mt-4 p-2.5 rounded-lg bg-red-900/30 border border-red-500/50 text-red-300 text-xs text-center">
                {error}
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  // ----------------------------------------------------
  // ACTIVE GAMEPLAY VIEW (status === 'playing' or 'finished')
  // ----------------------------------------------------
  return (
    <div className="min-h-screen flex flex-col pb-12 bg-[#1c1f26] text-[#eae6da]">
      <Navbar roomCode={roomCode} />

      <main className="w-full max-w-5xl mx-auto px-4 flex-1 flex flex-col items-center">
        {/* Scoreboard */}
        <Scoreboard
          state={room.gameState}
          playerTeamId={myTeamId}
        />

        {/* Board */}
        <Board
          state={room.gameState}
          isMyTurn={isMyTurn}
          onRollDice={() => {
            if (myTeamId) {
              dispatchAction({ type: 'ROLL_DICE', teamId: myTeamId });
            }
          }}
          lastLandedTileIndex={lastLandedTileIndex}
        />

        {/* History Log */}
        <GameLog logs={room.gameState.log} />
      </main>

      {/* Interactive Modals */}
      <QuestionModal
        state={room.gameState}
        isMyTurn={isMyTurn}
        onAnswer={(chosenIndex) => {
          if (myTeamId) {
            dispatchAction({
              type: 'ANSWER_QUESTION',
              teamId: myTeamId,
              payload: { chosenIndex },
            });
          }
        }}
      />

      <BuyPrompt
        state={room.gameState}
        isMyTurn={isMyTurn}
        onDecision={(buy) => {
          if (myTeamId) {
            dispatchAction({
              type: 'BUY_COUNTRY',
              teamId: myTeamId,
              payload: { buy },
            });
          }
        }}
      />

      <CongressChoiceModal
        state={room.gameState}
        isMyTurn={isMyTurn}
        onChoice={(choice, countryIndex) => {
          if (myTeamId) {
            dispatchAction({
              type: 'CONGRESS_CHOICE',
              teamId: myTeamId,
              payload: { choice, countryIndex },
            });
          }
        }}
      />

      <EndGameModal
        state={room.gameState}
        onRestart={() => {
          router.push('/');
        }}
      />
    </div>
  );
}
