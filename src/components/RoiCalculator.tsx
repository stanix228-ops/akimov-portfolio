import React, { useState } from 'react';
import { Calculator, TrendingUp, Clock, DollarSign, Send, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface NicheConfig {
  id: string;
  name: string;
  avgOrderValue: number;
  avgGrowthPercent: number;
  hoursSavedPerMonth: number;
  icon: string;
}

const NICHES: NicheConfig[] = [
  { id: 'delivery', name: 'Ресторан / Доставка еды', avgOrderValue: 1200, avgGrowthPercent: 38, hoursSavedPerMonth: 85, icon: '🍱' },
  { id: 'clinic', name: 'Медицинская клиника / Стоматология', avgOrderValue: 8500, avgGrowthPercent: 45, hoursSavedPerMonth: 120, icon: '🦷' },
  { id: 'legal', name: 'Юридическая / Консалтинговая компания', avgOrderValue: 45000, avgGrowthPercent: 52, hoursSavedPerMonth: 140, icon: '⚖️' },
  { id: 'b2b_saas', name: 'B2B Услуги / AI Лидогенерация / SaaS', avgOrderValue: 35000, avgGrowthPercent: 60, hoursSavedPerMonth: 180, icon: '🎯' },
];

export const RoiCalculator: React.FC = () => {
  const [selectedNiche, setSelectedNiche] = useState<string>('delivery');
  const [currentMonthlyOrders, setCurrentMonthlyOrders] = useState<number>(350);

  const activeNiche = NICHES.find((n) => n.id === selectedNiche) || NICHES[0];

  // Calculations
  const currentMonthlyRevenue = currentMonthlyOrders * activeNiche.avgOrderValue;
  const estimatedNewRevenue = Math.round(currentMonthlyRevenue * (1 + activeNiche.avgGrowthPercent / 100));
  const estimatedRevenueGain = estimatedNewRevenue - currentMonthlyRevenue;

  const handleCalculate = () => {
    confetti({ particleCount: 75, spread: 70, origin: { y: 0.7 } });
  };

  const getTelegramCalcUrl = () => {
    const text = encodeURIComponent(
      `Привет, Ak1mOFF! Рассчитал окупаемость на сайте: ниша "${activeNiche.name}", текущие объемы ${currentMonthlyOrders} заявок/мес. Хочу обсудить разработку проекта!`
    );
    return `https://t.me/Tradovex?text=${text}`;
  };

  return (
    <section id="roi-calculator" className="py-20 relative overflow-hidden border-b border-white/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-[67.5rem] mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-cyan-300 text-xs font-semibold mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Калькулятор ROI & Окупаемости</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Рассчитайте потенциальный <span className="gradient-text-cyan">рост вашего бизнеса</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-3 leading-relaxed">
            Узнайте, насколько вырастут ваши заявки, конверсия и экономия времени после внедрения наших Full-Stack решений и AI-автоматизации.
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="max-w-4xl mx-auto zen-card p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl relative">
          
          {/* Niche Selector */}
          <div className="mb-8">
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-3">
              1. Выберите вашу нишу:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {NICHES.map((niche) => {
                const isSelected = selectedNiche === niche.id;
                return (
                  <button
                    key={niche.id}
                    type="button"
                    onClick={() => {
                      setSelectedNiche(niche.id);
                    }}
                    className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-cyan-500/15 border-cyan-500 text-white shadow-lg shadow-cyan-500/10'
                        : 'bg-zinc-950 border-white/10 text-zinc-300 hover:border-white/20'
                    }`}
                  >
                    <div className="text-2xl mb-2">{niche.icon}</div>
                    <div className="font-bold text-xs sm:text-sm leading-snug">{niche.name}</div>
                    <div className="text-[10px] text-cyan-300 font-mono mt-2">
                      Прогноз роста: +{niche.avgGrowthPercent}%
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Slider for Current Monthly Orders/Leads */}
          <div className="mb-8 bg-zinc-950 p-5 sm:p-6 rounded-2xl border border-white/10">
            <div className="flex justify-between items-center text-xs sm:text-sm mb-3">
              <span className="text-zinc-300 font-semibold uppercase">2. Текущее кол-во заявок / заказов в месяц:</span>
              <span className="text-cyan-300 font-extrabold text-lg sm:text-xl font-mono">{currentMonthlyOrders} шт.</span>
            </div>
            <input
              type="range"
              min={50}
              max={2000}
              step={50}
              value={currentMonthlyOrders}
              onChange={(e) => {
                setCurrentMonthlyOrders(Number(e.target.value));
              }}
              className="w-full h-2.5 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[11px] text-zinc-500 mt-2 font-mono">
              <span>50 заказов/мес</span>
              <span>1 000 заказов/мес</span>
              <span>2 000+ заказов/мес</span>
            </div>
          </div>

          {/* Forecast Outcome Box */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-zinc-950 border border-white/10 p-4 rounded-2xl text-center">
              <div className="flex items-center justify-center gap-1.5 text-xs text-zinc-400 font-medium mb-1">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>Прогноз роста конверсии</span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1 font-mono">
                +{activeNiche.avgGrowthPercent}%
              </div>
              <div className="text-[10px] text-zinc-500 mt-1">За счет UX & AI-автоматизации</div>
            </div>

            <div className="bg-zinc-950 border border-white/10 p-4 rounded-2xl text-center">
              <div className="flex items-center justify-center gap-1.5 text-xs text-zinc-400 font-medium mb-1">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Экономия времени рутины</span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-300 mt-1 font-mono">
                ~{activeNiche.hoursSavedPerMonth} ч / мес
              </div>
              <div className="text-[10px] text-zinc-500 mt-1">Автовыписка документов & боты</div>
            </div>

            <div className="bg-zinc-950 border border-white/10 p-4 rounded-2xl text-center">
              <div className="flex items-center justify-center gap-1.5 text-xs text-zinc-400 font-medium mb-1">
                <DollarSign className="w-4 h-4 text-amber-400" />
                <span>Прирост выручки / мес</span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 mt-1 font-mono">
                +{estimatedRevenueGain.toLocaleString('ru-RU')} ₽
              </div>
              <div className="text-[10px] text-zinc-500 mt-1">Дополнительный коммерческий эффект</div>
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Расчет основан на метриках реальных кейсов нашей разработки</span>
            </div>

            <a
              href={getTelegramCalcUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleCalculate}
              className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-cyan-500/20 active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Обсудить окупаемость в Telegram</span>
              <Send className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
