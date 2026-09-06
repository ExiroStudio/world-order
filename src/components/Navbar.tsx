'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { RulesModal } from './RulesModal';

interface NavbarProps {
  roomCode?: string;
  isLocal?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ roomCode, isLocal }) => {
  const [isRulesOpen, setIsRulesOpen] = useState(false);

  return (
    <>
      <header className="w-full flex items-center justify-between py-4 mb-3 border-b border-[#3a4150]/60 max-w-5xl mx-auto px-4">
        <div>
          <Link href="/" className="group inline-block">
            <h1 className="font-serif font-bold text-xl sm:text-2xl text-[#eae6da] group-hover:text-[#c9a13b] transition-colors flex items-center gap-2">
              <span>World Order</span>
              {isLocal && (
                <span className="text-[10px] font-sans font-semibold uppercase bg-[#3a4150] text-[#c9a13b] px-2 py-0.5 rounded-full">
                  Lokal
                </span>
              )}
              {roomCode && (
                <span className="text-[10px] font-mono font-semibold uppercase bg-[#c9a13b]/20 text-[#c9a13b] border border-[#c9a13b]/40 px-2 py-0.5 rounded-full">
                  Room: {roomCode}
                </span>
              )}
            </h1>
          </Link>
          <div className="text-xs text-[#9aa1ad] italic hidden sm:block">
            Monopoli Ideologi Dunia • Liberalisme, Komunisme, Fasisme, Kapitalisme
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsRulesOpen(true)}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#3a4150] bg-[#262b35] text-[#eae6da] hover:border-[#c9a13b] hover:text-[#c9a13b] transition-all cursor-pointer shadow-sm"
          >
            📖 Panduan Main
          </button>
        </div>
      </header>

      <RulesModal
        isOpen={isRulesOpen}
        onClose={() => setIsRulesOpen(false)}
      />
    </>
  );
};
