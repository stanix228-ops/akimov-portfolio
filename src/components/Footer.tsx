import React from 'react';
import { ABOUT_DATA } from '../data/projects';
import { ArrowUp, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#121010] border-t border-white/10 py-12 text-zinc-400 text-xs">
      <div className="max-w-[67.5rem] mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left */}
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 p-[1px]">
            <div className="w-full h-full bg-zinc-950 rounded-[7px] flex items-center justify-center font-bold text-cyan-400 font-mono">
              A
            </div>
          </div>
          <div>
            <div className="font-bold text-zinc-200 text-sm">{ABOUT_DATA.name} • {ABOUT_DATA.role}</div>
            <div className="text-[11px] text-zinc-500">{ABOUT_DATA.locationFull}</div>
          </div>
        </div>

        {/* Center */}
        <div className="flex items-center gap-1.5 text-zinc-400">
          <span>Сделано для решения задач бизнеса</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        </div>

        {/* Right / Scroll Top */}
        <div className="flex items-center gap-4">
          <a
            href={ABOUT_DATA.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 font-semibold"
          >
            Telegram: {ABOUT_DATA.telegram}
          </a>
          <span className="text-zinc-600">•</span>
          <button
            onClick={scrollToTop}
            aria-label="Наверх"
            className="p-2.5 rounded-xl bg-zinc-950 border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-colors"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
