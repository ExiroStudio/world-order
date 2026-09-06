'use client';

import React from 'react';
import { TEAMS_ORDER, TEAM_DEFINITIONS } from '@/lib/gameConfig';
import { CONTINENTS } from '@/lib/board';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-[#262b35] border border-[#c9a13b] rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col p-6 shadow-2xl text-[#eae6da] relative">
        <div className="flex items-center justify-between pb-3 border-b border-[#3a4150]">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#f4ecd8]">
            Aturan Main World Order: Monopoli Ideologi Dunia
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-[#9aa1ad] hover:text-white text-xl p-1 leading-none cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto py-4 space-y-6 text-xs sm:text-sm text-[#eae6da] pr-2">
          {/* Section 1 */}
          <section>
            <h3 className="font-serif font-bold text-[#c9a13b] text-base mb-1.5">
              1. Tujuan & Kondisi Menang
            </h3>
            <p className="text-[#9aa1ad] leading-relaxed">
              4 ideologi besar bersaing memperluas pengaruh dengan membeli
              negara, mengumpulkan uang tunai, dan menjawab pertanyaan
              sejarah/ideologi. Pemenang adalah ideologi dengan{' '}
              <strong className="text-[#eae6da]">total kekayaan tertinggi</strong>{' '}
              (kas + nilai beli seluruh negara yang dimiliki) saat batas ronde (30
              ronde) tercapai, atau jika tersisa satu ideologi yang bertahan tanpa
              bangkrut.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h3 className="font-serif font-bold text-[#c9a13b] text-base mb-1.5">
              2. Alur Giliran (Gerak 2-Arah)
            </h3>
            <ol className="list-decimal pl-5 space-y-1.5 text-[#9aa1ad]">
              <li>Pemain melempar dadu (1–6).</li>
              <li>Muncul 1 pertanyaan pilihan ganda materi sejarah & ideologi dunia.</li>
              <li>
                <strong className="text-emerald-400">Jawaban Benar:</strong> token{' '}
                <strong>maju searah jarum jam</strong> sejumlah mata dadu.
              </li>
              <li>
                <strong className="text-red-400">Jawaban Salah:</strong> token{' '}
                <strong>mundur berlawanan jarum jam</strong> sejumlah mata dadu.
              </li>
            </ol>
          </section>

          {/* Section 3 */}
          <section>
            <h3 className="font-serif font-bold text-[#c9a13b] text-base mb-1.5">
              3. Efek Petak di Papan
            </h3>
            <ul className="list-disc pl-5 space-y-1.5 text-[#9aa1ad]">
              <li>
                <strong className="text-[#eae6da]">Negara Kosong:</strong> Pemain
                dapat membeli seharga yang tertera jika saldo cukup.
              </li>
              <li>
                <strong className="text-[#eae6da]">Negara Milik Lawan:</strong>{' '}
                Wajib membayar sewa dasar (10% harga negara). Jika pemilik
                menguasai <strong>seluruh negara dalam 1 benua</strong>, sewa naik
                menjadi <strong>25%</strong>.
              </li>
              <li>
                <strong className="text-[#eae6da]">Basis Kekuatan:</strong> Jika tiba
                karena maju (benar) dapat <strong>+$150</strong>. Jika tiba karena
                mundur (salah) terkena malus <strong>-$150</strong>.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h3 className="font-serif font-bold text-[#c9a13b] text-base mb-1.5">
              4. Kongres Dunia (Start)
            </h3>
            <ul className="list-disc pl-5 space-y-1.5 text-[#9aa1ad]">
              <li>
                <strong className="text-emerald-400">Lewat/Tiba Searah Jarum Jam:</strong>{' '}
                Mendapat pemasukan = (jumlah negara dimiliki × $50).
              </li>
              <li>
                <strong className="text-red-400">Lewat/Tiba Berlawanan Jarum Jam:</strong>{' '}
                Terkena sanksi — wajib memilih antara:{' '}
                <em>(a) Bayar Upeti $50 ke setiap lawan</em>, atau{' '}
                <em>(b) Jual 1 negara ke bank seharga 50% harga beli</em>.
              </li>
            </ul>
          </section>

          {/* Section 5: Perks */}
          <section>
            <h3 className="font-serif font-bold text-[#c9a13b] text-base mb-1.5">
              5. Perk Khas Tiap Ideologi
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {TEAMS_ORDER.map((id) => {
                const def = TEAM_DEFINITIONS[id];
                return (
                  <div
                    key={id}
                    className="p-2.5 rounded-lg border border-[#3a4150] bg-[#1c1f26]"
                  >
                    <div className="flex items-center gap-1.5 mb-1 font-bold text-[#eae6da]">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: def.colorHex }}
                      />
                      <span>{def.name}</span>
                      <span className="text-[11px] text-[#c9a13b] font-normal">
                        ({def.perkName})
                      </span>
                    </div>
                    <p className="text-[11px] text-[#9aa1ad]">
                      {def.perkDescription}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 6: Continents */}
          <section>
            <h3 className="font-serif font-bold text-[#c9a13b] text-base mb-1.5">
              6. Grup Benua & Set Monopoli
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {Object.values(CONTINENTS).map((c) => (
                <div
                  key={c.id}
                  className="p-2 rounded bg-[#1c1f26] border border-[#3a4150] text-[11px]"
                >
                  <div className="flex items-center gap-1 font-bold mb-1">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: c.color }}
                    />
                    <span>{c.name}</span>
                  </div>
                  <span className="text-[#9aa1ad]">
                    {c.countryTileIds.length} negara
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="pt-3 border-t border-[#3a4150] text-right">
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-5 rounded-xl bg-[#c9a13b] hover:bg-[#deb447] text-[#1c1f26] font-bold text-xs cursor-pointer transition-all"
          >
            Tutup & Mengerti
          </button>
        </div>
      </div>
    </div>
  );
};
