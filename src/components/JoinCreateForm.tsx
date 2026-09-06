'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TEAMS_ORDER, TEAM_DEFINITIONS } from '@/lib/gameConfig';
import { TeamId } from '@/types/game';

export const JoinCreateForm: React.FC = () => {
  const router = useRouter();
  const [tab, setTab] = useState<'join' | 'create'>('create');

  // Create Room State
  const [hostName, setHostName] = useState('');
  const [hostTeam, setHostTeam] = useState<TeamId>('liberalisme');
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState('');

  // Join Room State
  const [joinCode, setJoinCode] = useState('');
  const [joinError, setJoinError] = useState('');

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hostName.trim()) {
      setCreateError('Silakan masukkan nama Anda.');
      return;
    }

    setIsCreating(true);
    setCreateError('');

    try {
      const uid = 'player_' + Math.random().toString(36).substring(2, 9);
      // Store local user identity
      if (typeof window !== 'undefined') {
        localStorage.setItem('wo_uid', uid);
        localStorage.setItem('wo_name', hostName.trim());
      }

      const res = await fetch('/api/room/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hostUid: uid,
          hostName: hostName.trim(),
          hostTeamId: hostTeam,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Gagal membuat room.');
      }

      router.push(`/room/${data.code}`);
    } catch (err: unknown) {
      setCreateError(
        err instanceof Error ? err.message : 'Terjadi kesalahan sistem.'
      );
      setIsCreating(false);
    }
  };

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = joinCode.trim().toUpperCase();
    if (!cleanCode) {
      setJoinError('Silakan masukkan kode room.');
      return;
    }
    router.push(`/room/${cleanCode}`);
  };

  return (
    <div className="bg-[#262b35] border border-[#3a4150] rounded-2xl p-6 shadow-xl max-w-md w-full mx-auto text-[#eae6da]">
      {/* Tabs */}
      <div className="flex border-b border-[#3a4150] mb-5">
        <button
          type="button"
          onClick={() => {
            setTab('create');
            setCreateError('');
          }}
          className={`flex-1 pb-3 font-semibold text-sm transition-colors cursor-pointer border-b-2 ${
            tab === 'create'
              ? 'border-[#c9a13b] text-[#c9a13b]'
              : 'border-transparent text-[#9aa1ad] hover:text-[#eae6da]'
          }`}
        >
          Buat Room Baru
        </button>
        <button
          type="button"
          onClick={() => {
            setTab('join');
            setJoinError('');
          }}
          className={`flex-1 pb-3 font-semibold text-sm transition-colors cursor-pointer border-b-2 ${
            tab === 'join'
              ? 'border-[#c9a13b] text-[#c9a13b]'
              : 'border-transparent text-[#9aa1ad] hover:text-[#eae6da]'
          }`}
        >
          Gabung Room
        </button>
      </div>

      {tab === 'create' ? (
        <form onSubmit={handleCreateRoom} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#9aa1ad] uppercase tracking-wider mb-1.5">
              Nama Pemain (Host):
            </label>
            <input
              type="text"
              value={hostName}
              onChange={(e) => setHostName(e.target.value)}
              placeholder="Contoh: Alexander"
              maxLength={20}
              className="w-full bg-[#1c1f26] border border-[#3a4150] rounded-xl px-3.5 py-2.5 text-sm text-[#eae6da] focus:outline-none focus:border-[#c9a13b] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#9aa1ad] uppercase tracking-wider mb-1.5">
              Pilih Ideologi Anda:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {TEAMS_ORDER.map((id) => {
                const def = TEAM_DEFINITIONS[id];
                const isSelected = hostTeam === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setHostTeam(id)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#c9a13b] bg-[#c9a13b]/15 shadow-sm'
                        : 'border-[#3a4150] bg-[#1c1f26] hover:border-[#9aa1ad]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: def.colorHex }}
                      />
                      <span className="font-bold text-xs text-[#eae6da]">
                        {def.name}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#9aa1ad] block truncate mt-0.5">
                      {def.perkName}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {createError && (
            <div className="p-2.5 rounded-lg bg-red-900/30 border border-red-500/50 text-red-300 text-xs">
              {createError}
            </div>
          )}

          <button
            type="submit"
            disabled={isCreating}
            className="w-full py-3 px-4 rounded-xl bg-[#c9a13b] hover:bg-[#deb447] text-[#1c1f26] font-bold text-sm transition-all shadow-md active:scale-98 cursor-pointer disabled:opacity-50"
          >
            {isCreating ? 'Menyiapkan Room...' : 'Buat Room & Dapatkan Kode'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleJoinRoom} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#9aa1ad] uppercase tracking-wider mb-1.5">
              Kode Room (5 Karakter):
            </label>
            <input
              type="text"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              placeholder="Contoh: K7P9Q"
              maxLength={6}
              className="w-full bg-[#1c1f26] border border-[#3a4150] rounded-xl px-3.5 py-3 text-center tracking-widest font-mono text-lg font-bold text-[#c9a13b] focus:outline-none focus:border-[#c9a13b] transition-colors uppercase"
            />
          </div>

          {joinError && (
            <div className="p-2.5 rounded-lg bg-red-900/30 border border-red-500/50 text-red-300 text-xs">
              {joinError}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-[#c9a13b] hover:bg-[#deb447] text-[#1c1f26] font-bold text-sm transition-all shadow-md active:scale-98 cursor-pointer"
          >
            Gabung Room
          </button>
        </form>
      )}
    </div>
  );
};
