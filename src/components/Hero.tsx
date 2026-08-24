import React from 'react';
import { ABOUT_DATA, PROJECTS } from '../data/projects';
import { Send, ArrowRight, Sparkles } from 'lucide-react';
import { TerminalHero } from './TerminalHero';

interface HeroProps {
  onOpenProjectModal?: (project: any) => void;
}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <section className="relative min-h-[90vh] pt-32 pb-16 flex items-center justify-center overflow-hidden border-b border-white/10">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-violet-500/10 blur-[160px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-[67.5rem] mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* LEFT SIDE: Description & Positioning (5 cols) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-cyan-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>{ABOUT_DATA.name} • {ABOUT_DATA.role}</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
              Создаю современные <br />
              <span className="gradient-text-cyan">сайты, веб-приложения</span> <br />
              и ИИ-автоматизацию
            </h1>

            {/* Positioning Subtitle */}
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
              {ABOUT_DATA.positioning} Разрабатываю продуктовые интерфейсы на <strong className="text-white">React 19 & Next.js 16</strong>, внедряю <strong className="text-cyan-300">Gemini AI</strong>, Telegram-ботов и парсеры под ключ.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={ABOUT_DATA.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all shadow-lg shadow-cyan-500/20 active:scale-95 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Заказать в Telegram</span>
              </a>

              <a
                href="#roi-calculator"
                className="bg-white/[0.06] hover:bg-white/10 border border-white/10 text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-xl transition-all active:scale-95 flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Расчет ROI</span>
              </a>

              <a
                href="#projects"
                className="text-xs text-zinc-400 hover:text-white font-medium px-2 py-3 flex items-center gap-1 transition-colors"
              >
                <span>Кейсы ({PROJECTS.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* RIGHT SIDE: Interactive Animated Code Terminal replacing image carousel (7 cols) */}
          <div className="lg:col-span-7 w-full">
            <TerminalHero />
          </div>

        </div>

        {/* TRUST STATS COUNTER BAR - PLACED IN THE MIDDLE OF THE HERO SECTION (FULL WIDTH CENTERED) */}
        <div className="mt-12 pt-6 border-t border-white/10 w-full max-w-4xl mx-auto">
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 sm:p-5 grid grid-cols-3 gap-3 text-center w-full shadow-lg">
            <div className="border-r border-white/10 pr-3">
              <div className="text-xl sm:text-3xl font-extrabold text-white font-mono">2+ года</div>
              <div className="text-xs text-zinc-400 mt-1 font-medium">Опыта кодинга</div>
            </div>
            <div className="border-r border-white/10 px-3">
              <div className="text-xl sm:text-3xl font-extrabold text-cyan-400 font-mono">6 кейсов</div>
              <div className="text-xs text-zinc-400 mt-1 font-medium">В портфолио</div>
            </div>
            <div className="pl-3">
              <div className="text-xl sm:text-3xl font-extrabold text-emerald-400 font-mono">100%</div>
              <div className="text-xs text-zinc-400 mt-1 font-medium">Mobile-First</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
