import React, { useState } from 'react';
import { Scale, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PracticeOption {
  id: string;
  title: string;
  basePrice: string;
  desc: string;
}

const PRACTICES: PracticeOption[] = [
  { id: 'corp', title: 'Корпоративное право & M&A', basePrice: 'от 75 000 ₽', desc: 'Сделки, уставные споры, реструктуризация' },
  { id: 'arbitrage', title: 'Арбитраж и взыскание долгов', basePrice: 'от 90 000 ₽', desc: 'Судебное представительство, защита активов' },
  { id: 'tax', title: 'Налоговый аудит & Споры с ФНС', basePrice: 'от 65 000 ₽', desc: 'Снижение штрафов, защита при проверках' },
  { id: 'contract', title: 'Договорное право & Экспертиза', basePrice: 'от 35 000 ₽', desc: 'Разработка контрактов, минимизация рисков' },
];

export const LawCalculatorDemo: React.FC = () => {
  const [selectedPractice, setSelectedPractice] = useState<string>('arbitrage');
  const [disputeAmount, setDisputeAmount] = useState<number>(3500000);
  const [urgency, setUrgency] = useState<'standard' | 'express'>('standard');
  const [booked, setBooked] = useState(false);

  const selectedItem = PRACTICES.find((p) => p.id === selectedPractice) || PRACTICES[0];

  const estimatedWinChance = Math.min(96, Math.max(78, 85 + (disputeAmount > 5000000 ? 5 : 0)));
  const estimatedDays = urgency === 'express' ? '3–7 дней' : '14–30 дней';

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
    confetti({ particleCount: 70, spread: 70, origin: { y: 0.7 } });
    setTimeout(() => setBooked(false), 4000);
  };

  return (
    <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-4 sm:p-6 text-slate-100 shadow-xl relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-white text-base sm:text-lg">Интерактивный правовой калькулятор</h4>
            <p className="text-xs text-amber-400/90">Расчет перспектив дела и экспресс-запись</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full text-amber-400 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Конфиденциально</span>
        </div>
      </div>

      {/* Select Practice */}
      <div className="my-4">
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
          1. Выберите направление спора:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {PRACTICES.map((practice) => {
            const isSelected = selectedPractice === practice.id;
            return (
              <button
                key={practice.id}
                type="button"
                onClick={() => setSelectedPractice(practice.id)}
                className={`p-3 rounded-xl text-left border transition-all ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-500 text-white shadow-md'
                    : 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:border-slate-600'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-xs sm:text-sm">{practice.title}</span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />}
                </div>
                <div className="text-[11px] text-slate-400">{practice.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dispute Amount Slider */}
      <div className="my-4 bg-slate-800/50 p-4 rounded-xl border border-slate-700/60">
        <div className="flex justify-between items-center text-xs mb-2">
          <span className="text-slate-300 font-semibold uppercase">2. Сумма иска или активов:</span>
          <span className="text-amber-400 font-bold text-sm">{disputeAmount.toLocaleString('ru-RU')} ₽</span>
        </div>
        <input
          type="range"
          min={500000}
          max={20000000}
          step={500000}
          value={disputeAmount}
          onChange={(e) => setDisputeAmount(Number(e.target.value))}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
        />
        <div className="flex justify-between text-[10px] text-slate-500 mt-1">
          <span>500 тыс. ₽</span>
          <span>10 млн. ₽</span>
          <span>20+ млн. ₽</span>
        </div>
      </div>

      {/* Urgency Selector */}
      <div className="my-4 flex items-center gap-3">
        <span className="text-xs text-slate-300 font-semibold uppercase">Срочность:</span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setUrgency('standard')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-colors ${
              urgency === 'standard'
                ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            Стандартный регламент
          </button>
          <button
            type="button"
            onClick={() => setUrgency('express')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-colors ${
              urgency === 'express'
                ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            ⚡ Срочно (до 7 дней)
          </button>
        </div>
      </div>

      {/* Outcome Cards */}
      <div className="grid grid-cols-3 gap-2 my-4">
        <div className="bg-slate-950/60 border border-slate-800 p-2.5 rounded-xl text-center">
          <div className="text-[10px] text-slate-400">Вероятность успеха</div>
          <div className="text-sm sm:text-base font-extrabold text-emerald-400 mt-0.5">~{estimatedWinChance}%</div>
        </div>
        <div className="bg-slate-950/60 border border-slate-800 p-2.5 rounded-xl text-center">
          <div className="text-[10px] text-slate-400">Срок оценки</div>
          <div className="text-sm sm:text-base font-extrabold text-amber-400 mt-0.5">{estimatedDays}</div>
        </div>
        <div className="bg-slate-950/60 border border-slate-800 p-2.5 rounded-xl text-center">
          <div className="text-[10px] text-slate-400">Стоимость ведения</div>
          <div className="text-sm sm:text-base font-extrabold text-white mt-0.5">{selectedItem.basePrice}</div>
        </div>
      </div>

      {/* Consultation Action */}
      <div className="pt-3 border-t border-slate-800">
        {booked ? (
          <div className="bg-emerald-500/15 border border-emerald-500/30 p-3 rounded-xl text-center text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Заявка передана ведущему партнеру практики. Свяжемся в течение 10 минут!</span>
          </div>
        ) : (
          <form onSubmit={handleBook} className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              required
              placeholder="Номер телефона для связи"
              defaultValue="+7 (999) 000-00-00"
              className="bg-slate-800/80 border border-slate-700 text-xs rounded-xl px-3 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500 flex-1"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-amber-500/20 active:scale-95 flex items-center justify-center gap-1.5"
            >
              <span>Запросить стратегию</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
