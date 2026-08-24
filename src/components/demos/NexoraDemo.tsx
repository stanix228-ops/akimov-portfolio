import React, { useState } from 'react';
import { Sparkles, Cpu, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CompanyPreset {
  name: string;
  industry: string;
  revenue: string;
  score: number;
  matchGrade: string;
  decisionMaker: string;
  aiPitch: string;
}

const PRESETS: CompanyPreset[] = [
  {
    name: 'Fintech Solutions Ltd',
    industry: 'Финтех & Платежи',
    revenue: '$45M+ / год',
    score: 98,
    matchGrade: 'A+ (Горячий лид)',
    decisionMaker: 'Алексей Морозов (CTO & Head of Product)',
    aiPitch: 'Здравствуйте, Алексей! Заметили, что ваша платформа обрабатывает высокий поток транзакций. Наше решение позволяет автоматизировать комплаенс и сократить ручной разбор заявок на 65% через AI-пайплайн.',
  },
  {
    name: 'TechWave Logistics',
    industry: 'Логистика & Supply Chain',
    revenue: '$28M+ / год',
    score: 94,
    matchGrade: 'A (Высокий потенциал)',
    decisionMaker: 'Елена Соколова (COO)',
    aiPitch: 'Елена, добрый день! Мы изучили маршрутные процессы TechWave и подготовили AI-модель для автоматического распределения заказов и генерации путевых листов в Telegram.',
  },
  {
    name: 'CyberGuard Enterprise',
    industry: 'Кибербезопасность & B2B SaaS',
    revenue: '$80M+ / год',
    score: 96,
    matchGrade: 'A+ (Ключевой клиент)',
    decisionMaker: 'Дмитрий Волков (VP of Sales)',
    aiPitch: 'Дмитрий, приветствуем! Nexora AI автоматически обогатила профили ваших целевых Enterprise-клиентов и подготовила персонализированную цепочку писем с конверсией в ответ от 28%.',
  },
];

export const NexoraDemo: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);
  const [copied, setCopied] = useState(false);

  const activeCompany = PRESETS[selectedIdx];

  const handleRunAnalysis = (idx: number) => {
    setSelectedIdx(idx);
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    }, 900);
  };

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(activeCompany.aiPitch);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-4 sm:p-6 text-slate-100 shadow-xl relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-cyan-500/15 text-cyan-400 rounded-lg">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-white text-base sm:text-lg">Nexora AI • Симулятор скоринга и обогащения</h4>
            <p className="text-xs text-cyan-400">Тест алгоритма поиска компаний и генерации B2B-офферов</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full text-cyan-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Engine 3.0</span>
        </div>
      </div>

      {/* Preset Selector */}
      <div className="my-4">
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
          Выберите целевую компанию для анализа:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {PRESETS.map((preset, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <button
                key={preset.name}
                type="button"
                onClick={() => handleRunAnalysis(idx)}
                className={`p-3 rounded-xl text-left border transition-all ${
                  isSelected
                    ? 'bg-cyan-500/15 border-cyan-500 text-white shadow-md'
                    : 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:border-slate-600'
                }`}
              >
                <div className="font-bold text-xs sm:text-sm text-white mb-0.5">{preset.name}</div>
                <div className="text-[11px] text-cyan-400 font-mono">{preset.industry}</div>
                <div className="text-[10px] text-slate-400 mt-1">{preset.revenue}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Analysis Result Card */}
      {analyzing ? (
        <div className="py-10 bg-slate-950/60 rounded-2xl border border-slate-800 flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          <div className="text-xs font-mono text-cyan-300 animate-pulse">
            Сбор открытых данных → AI-скоринг потребностей → Формирование питча...
          </div>
        </div>
      ) : (
        <div className="space-y-4 animate-in fade-in duration-300">
          {/* Metrics bar */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl text-center">
              <div className="text-[10px] text-slate-400 font-medium">AI Match Score</div>
              <div className="text-lg sm:text-xl font-extrabold text-cyan-400 mt-0.5">{activeCompany.score}%</div>
            </div>
            <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl text-center">
              <div className="text-[10px] text-slate-400 font-medium">Квалификация лида</div>
              <div className="text-xs sm:text-sm font-bold text-emerald-400 mt-1">{activeCompany.matchGrade}</div>
            </div>
            <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl text-center">
              <div className="text-[10px] text-slate-400 font-medium">Выручка компании</div>
              <div className="text-xs sm:text-sm font-bold text-white mt-1">{activeCompany.revenue}</div>
            </div>
          </div>

          {/* Decision maker info */}
          <div className="bg-slate-800/60 border border-slate-700/70 p-3.5 rounded-xl flex items-center justify-between gap-2">
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Найденное ЛПР (Decision Maker):</div>
              <div className="text-xs sm:text-sm font-bold text-white mt-0.5">{activeCompany.decisionMaker}</div>
            </div>
            <span className="text-[10px] font-mono px-2 py-1 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 rounded-md">
              ✓ Verified Contact
            </span>
          </div>

          {/* AI generated outreach pitch */}
          <div className="bg-slate-950/80 border border-cyan-500/20 p-4 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Сгенерированный AI-питч для первого контакта:
              </span>
              <button
                onClick={handleCopyPitch}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Скопировано!' : 'Копировать'}</span>
              </button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed italic bg-slate-900/90 p-3 rounded-lg border border-slate-800 font-mono">
              "{activeCompany.aiPitch}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
