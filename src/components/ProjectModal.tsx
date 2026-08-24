import React, { useEffect } from 'react';
import type { Project } from '../types';
import { X, CheckCircle2, AlertCircle, Layers, Send, Sparkles, Code2, Trophy } from 'lucide-react';
import { LuminaDentDemo } from './demos/LuminaDentDemo';
import { RetroDonerDemo } from './demos/RetroDonerDemo';
import { NexoraDemo } from './demos/NexoraDemo';
import { NakaioDemo } from './demos/NakaioDemo';
import { LawCalculatorDemo } from './demos/LawCalculatorDemo';
import { TwoGisDemo } from './demos/TwoGisDemo';
import { FoodRushDemo } from './demos/FoodRushDemo';
import { PsnDemo } from './demos/PsnDemo';
import { getAssetUrl } from '../utils/assets';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity animate-in fade-in"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-zinc-950 border border-white/15 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200 text-white">
        
        {/* Sticky Modal Header */}
        <div className="sticky top-0 bg-zinc-950/95 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono-code font-semibold px-2.5 py-1 rounded-md bg-zinc-900 text-cyan-300 border border-white/10">
              {project.badge}
            </span>
            <span className="text-xs text-zinc-500 hidden sm:inline">•</span>
            <span className="text-xs text-zinc-300 font-medium hidden sm:inline">{project.categoryLabel}</span>
          </div>

          <button
            onClick={onClose}
            aria-label="Закрыть окно"
            className="p-2 rounded-full bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          
          {/* Main Visual Image Banner */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video w-full bg-zinc-900">
            <img
              src={getAssetUrl(project.image)}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">{project.title}</h2>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl">{project.subtitle}</p>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {project.metrics.map((metric, idx) => (
              <div key={idx} className="bg-zinc-900/90 border border-white/10 p-3.5 rounded-2xl text-center">
                <div className="text-xs text-zinc-400 font-medium">{metric.label}</div>
                <div className="text-lg sm:text-xl font-extrabold text-cyan-300 mt-1 font-mono-code">{metric.value}</div>
              </div>
            ))}
          </div>

          {/* Interactive Feature Demo Component */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <h3 className="text-base sm:text-lg font-bold text-white">Интерактивный тест-драйв механики</h3>
            </div>
            {project.interactiveType === 'lumina-interactive' && <LuminaDentDemo />}
            {project.interactiveType === 'doner-customizer' && <RetroDonerDemo />}
            {project.interactiveType === 'nexora-lead-scoring' && <NexoraDemo />}
            {project.interactiveType === 'nakaio-doc-generator' && <NakaioDemo />}
            {project.interactiveType === 'law-calculator' && <LawCalculatorDemo />}
            {project.interactiveType === 'twogis-lead-scraper' && <TwoGisDemo />}
            {project.interactiveType === 'foodrush-game' && <FoodRushDemo />}
            {project.interactiveType === 'psn-manager-demo' && <PsnDemo />}
          </div>

          {/* Business Outcomes Section */}
          {project.businessResult && project.businessResult.length > 0 && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-2xl space-y-3">
              <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-emerald-400" />
                <span>Результат для бизнеса и клиента</span>
              </h3>
              <div className="space-y-2">
                {project.businessResult.map((res, idx) => (
                  <div key={idx} className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
                    {res}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* About & Problem Solution */}
          <div className="bg-zinc-900/80 border border-white/10 p-6 rounded-2xl space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Code2 className="w-4 h-4 text-cyan-400" />
              <span>О задаче и архитектурном решении</span>
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed">{project.fullDescription}</p>
          </div>

          {/* Key Features */}
          <div>
            <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Что было сделано (Реализованный функционал)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.features.map((feat, idx) => (
                <div key={idx} className="bg-zinc-900/80 border border-white/10 p-3 rounded-xl text-xs text-zinc-300 flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Engineering Challenges */}
          <div>
            <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <span>Сложные инженерные задачи и оптимизация</span>
            </h3>
            <div className="space-y-2">
              {project.challenges.map((challenge, idx) => (
                <div key={idx} className="bg-zinc-900/70 border border-white/10 p-3.5 rounded-xl text-xs text-zinc-300">
                  {challenge}
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-violet-400" />
              <span>Использованный стек технологий</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <div
                  key={idx}
                  className="bg-zinc-900 border border-white/10 px-3 py-1.5 rounded-xl flex items-center gap-2 font-mono-code"
                >
                  <span className="text-xs font-bold text-white">{tech.name}</span>
                  <span className="text-[10px] text-zinc-400 bg-zinc-950 px-1.5 py-0.5 rounded border border-white/5">
                    {tech.category}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer CTA */}
        <div className="sticky bottom-0 bg-zinc-950/95 backdrop-blur-md border-t border-white/10 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-zinc-400 hover:text-white px-4 py-2"
          >
            Закрыть окно
          </button>

          <a
            href="#contact"
            onClick={onClose}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-95 transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Заказать подобный проект</span>
          </a>
        </div>
      </div>
    </div>
  );
};
