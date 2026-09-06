'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TEAMS_ORDER, TEAM_DEFINITIONS } from '@/lib/gameConfig';
import { JoinCreateForm } from '@/components/JoinCreateForm';
import { RulesModal } from '@/components/RulesModal';

export default function HomePage() {
  const [isRulesOpen, setIsRulesOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-between p-4 sm:p-6 max-w-5xl mx-auto w-full">
      {/* Header / Hero */}
      <header className="text-center pt-6 sm:pt-10 pb-6">
        <div className="inline-block px-3 py-1 rounded-full bg-[#c9a13b]/10 border border-[#c9a13b]/30 text-[#c9a13b] font-mono text-xs font-semibold uppercase tracking-widest mb-3">
          Game Papan Edukasi Sejarah & Geopolitik
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#f4ecd8] tracking-tight mb-1">
          World Order
        </h1>
        <div className="font-serif text-sm sm:text-base text-[#c9a13b] font-medium tracking-wide mb-3">
          Monopoli Ideologi Dunia
        </div>
        <p className="text-sm sm:text-base text-[#9aa1ad] max-w-2xl mx-auto leading-relaxed italic">
          Liberalisme • Komunisme • Fasisme • Kapitalisme — adu wawasan, strategi modal, dan taktik penguasaan wilayah peradaban dunia.
        </p>

        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setIsRulesOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg border border-[#3a4150] bg-[#262b35] text-xs font-medium text-[#eae6da] hover:border-[#c9a13b] hover:text-[#c9a13b] transition-all cursor-pointer"
          >
            <span>📖 Baca Aturan Permainan</span>
          </button>
        </div>
      </header>

      {/* Main Mode Selection */}
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6 items-start">
        {/* Mode 1: Local Pass-and-Play */}
        <div className="bg-[#262b35] border border-[#3a4150] rounded-2xl p-6 shadow-xl flex flex-col justify-between h-full hover:border-[#c9a13b]/60 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider bg-emerald-950/50 px-2.5 py-1 rounded-full border border-emerald-800/60">
                Mode Offline
              </span>
              <span className="text-xs text-[#9aa1ad]">1 Layar Bergantian</span>
            </div>

            <h2 className="font-serif text-2xl font-bold text-[#f4ecd8] mb-2">
              Main Lokal (Pass-and-Play)
            </h2>
            <p className="text-xs sm:text-sm text-[#9aa1ad] leading-relaxed mb-5">
              Ideal untuk presentasi kelompok atau bermain bersama dalam satu
              laptop/HP. Seluruh logika berjalan 100% di browser tanpa koneksi
              internet.
            </p>

            <ul className="text-xs space-y-2 text-[#eae6da] mb-6">
              <li className="flex items-center gap-2">
                <span className="text-[#c9a13b]">✔</span> 4 ideologi siap dimainkan langsung.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#c9a13b]">✔</span> Tanpa login, tanpa database, respon instan.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#c9a13b]">✔</span> Mendukung restart dan reset ronde kapan saja.
              </li>
            </ul>
          </div>

          <Link
            href="/local"
            className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm text-center transition-all shadow-md active:scale-98"
          >
            Mulai Main Lokal Sekarang →
          </Link>
        </div>

        {/* Mode 2: Online Multiplayer */}
        <div className="flex flex-col">
          <JoinCreateForm />
        </div>
      </main>

      {/* Ideology Showcase Cards */}
      <section className="mt-6 pt-6 border-t border-[#3a4150]/60">
        <h3 className="font-serif text-center font-bold text-lg text-[#f4ecd8] mb-4">
          4 Ideologi Besar Dunia & Kekuatan Khasnya
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {TEAMS_ORDER.map((id) => {
            const def = TEAM_DEFINITIONS[id];
            return (
              <div
                key={id}
                style={{
                  background: `linear-gradient(160deg, ${def.colorHex}20 0%, #262b35 70%)`,
                }}
                className="p-3.5 rounded-xl border border-[#3a4150] shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: def.colorHex }}
                    />
                    <h4 className="font-serif font-bold text-sm text-[#eae6da]">
                      {def.name}
                    </h4>
                  </div>
                  <div className="text-[11px] text-[#9aa1ad] mb-2 font-medium">
                    {def.role}
                  </div>
                  <div className="text-[11px] text-[#c9a13b] font-bold mb-1">
                    ✦ {def.perkName}
                  </div>
                  <p className="text-[11px] text-[#eae6da]/80 leading-relaxed">
                    {def.perkDescription}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-xs text-[#9aa1ad] pt-10 pb-4">
        World Order • Monopoli Ideologi Dunia • Next.js App Router Rebuild
      </footer>

      <RulesModal
        isOpen={isRulesOpen}
        onClose={() => setIsRulesOpen(false)}
      />
    </div>
  );
}
