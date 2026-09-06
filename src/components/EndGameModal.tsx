'use client';

import React from 'react';
import { GameState, TeamId } from '@/types/game';
import { calculateNetWorth } from '@/lib/gameEngine';
import { TEAMS_ORDER } from '@/lib/gameConfig';

interface EndGameModalProps {
  state: GameState;
  onRestart: () => void;
}

const HISTORICAL_NARRATIVES: Record<TeamId, string> = {
  liberalisme:
    'Nilai-nilai kebebasan individu, hak asasi manusia, dan demokrasi berhasil paling banyak memengaruhi dunia dalam permainan ini — mencerminkan bagaimana liberalisme mendasari banyak sistem politik dan ekonomi dunia modern.',
  komunisme:
    'Gagasan kepemilikan kolektif, kesetaraan kelas, dan sentralisasi produksi paling dominan dalam permainan ini — mengingatkan pada puncak era Perang Dingin saat komunisme menguasai sepertiga dunia.',
  fasisme:
    'Ideologi ultranasionalisme, kepatuhan total, dan negara otoriter paling unggul dalam permainan ini — namun dalam panggung sejarah riil, fasisme runtuh menyusul kekalahan total pada Perang Dunia II.',
  kapitalisme:
    'Sistem pasar bebas, kompetisi terbuka, dan inisiatif modal swasta paling mendominasi peta dunia dalam permainan ini — sejalan dengan bagaimana kapitalisme menjadi motor penggerak globalisasi abad ke-21.',
};

export const EndGameModal: React.FC<EndGameModalProps> = ({
  state,
  onRestart,
}) => {
  if (!state.gameOver) return null;

  // Rank active teams by net worth
  const ranked = TEAMS_ORDER.filter(
    (id) => !state.teams[id].isNeutral
  ).map((id) => ({
    team: state.teams[id],
    netWorth: calculateNetWorth(state, id),
    ownedCount: state.owners.filter((o) => o === id).length,
  }));

  ranked.sort((a, b) => b.netWorth - a.netWorth);
  const top = ranked[0];
  const isTie = state.winner === 'tie';

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
      <div className="bg-[#262b35] border border-[#c9a13b] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl text-[#eae6da] text-center relative">
        <div className="font-serif tracking-widest text-xs text-[#c9a13b] mb-2 uppercase font-semibold">
          ✦ Permainan Selesai ✦
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#f4ecd8] mb-3">
          {isTie
            ? 'Hasil Imbang di Puncak Kekuasaan'
            : `${top.team.name} Menguasai Dunia!`}
        </h2>

        {/* Narrative Verdict */}
        <div className="bg-[#1c1f26] rounded-xl p-4 border border-[#3a4150] text-xs text-[#9aa1ad] leading-relaxed text-left mb-6 italic">
          {isTie
            ? 'Dua ideologi atau lebih mengakhiri pertarungan dengan total kekayaan yang seimbang. Keseimbangan kekuasaan dunia tetap terbuka dan cair.'
            : HISTORICAL_NARRATIVES[top.team.id]}
        </div>

        {/* Final Standings */}
        <div className="space-y-2 mb-6 text-left">
          <div className="text-xs font-semibold text-[#9aa1ad] uppercase tracking-wider mb-1">
            Klasemen Akhir Kekayaan:
          </div>
          {ranked.map((item, idx) => (
            <div
              key={item.team.id}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                idx === 0 && !isTie
                  ? 'bg-[#c9a13b]/15 border-[#c9a13b] shadow-md'
                  : 'bg-[#1c1f26] border-[#3a4150]'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-sm w-4 text-[#9aa1ad]">
                  #{idx + 1}
                </span>
                <span
                  className="w-3.5 h-3.5 rounded-full"
                  style={{ backgroundColor: item.team.colorHex }}
                />
                <div>
                  <div className="font-bold text-sm text-[#eae6da]">
                    {item.team.name}
                  </div>
                  <div className="text-[11px] text-[#9aa1ad]">
                    {item.ownedCount} wilayah dikuasai • Kas: ${item.team.cash}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="font-mono font-bold text-base text-emerald-400 block">
                  ${item.netWorth.toLocaleString()}
                </span>
                {item.team.bankrupt && (
                  <span className="text-[10px] text-red-400 font-semibold uppercase">
                    Bangkrut
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={onRestart}
          className="w-full py-3 px-6 rounded-xl bg-[#c9a13b] hover:bg-[#deb447] text-[#1c1f26] font-bold text-sm transition-all shadow-lg active:scale-98 cursor-pointer"
        >
          Main Lagi
        </button>
      </div>
    </div>
  );
};
