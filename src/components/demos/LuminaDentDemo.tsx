import React, { useState } from 'react';
import { Clock, CheckCircle2, Sparkles, Shield, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ServiceOption {
  id: string;
  name: string;
  price: string;
  duration: string;
  tag: string;
}

const SERVICES: ServiceOption[] = [
  { id: '3d-scan', name: '3D-диагностика & Цифровой скан челюсти', price: 'Бесплатно', duration: '30 мин', tag: '3D Tech' },
  { id: 'implant', name: 'Имплантация Nobel Biocare под ключ', price: 'от 38 000 ₽', duration: '60 мин', tag: 'Хирургия' },
  { id: 'veneers', name: 'Керамические виниры E-Max (1 ед.)', price: 'от 26 000 ₽', duration: '45 мин', tag: 'Эстетика' },
  { id: 'cleanse', name: 'Комплексная гигиена AirFlow + фторирование', price: 'от 4 500 ₽', duration: '40 мин', tag: 'Профилактика' },
];

export const LuminaDentDemo: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>('3d-scan');
  const [selectedTime, setSelectedTime] = useState<string>('14:30');
  const [view3D, setView3D] = useState<'front' | 'scan' | 'xray'>('front');
  const [booked, setBooked] = useState(false);

  const activeService = SERVICES.find((s) => s.id === selectedService) || SERVICES[0];

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
    confetti({ particleCount: 70, spread: 70, origin: { y: 0.7 } });
    setTimeout(() => setBooked(false), 4500);
  };

  return (
    <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-4 sm:p-6 text-slate-100 shadow-xl relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-cyan-500/15 text-cyan-400 rounded-lg">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-white text-base sm:text-lg">Lumina Dent • 3D Онлайн-запись</h4>
            <p className="text-xs text-cyan-400">Симуляция интерактивного 3D-моделирования и бронирования</p>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full text-emerald-400 text-xs font-semibold">
          <Shield className="w-3.5 h-3.5" />
          <span>Next.js 16 + Three.js</span>
        </div>
      </div>

      {/* 3D Visualization Simulator */}
      <div className="my-4 bg-slate-950/80 p-4 rounded-2xl border border-slate-800 relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-cyan-400" />
            Интерактивный 3D-рендер челюсти:
          </span>
          <div className="flex gap-1.5">
            {(['front', 'scan', 'xray'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setView3D(mode)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors ${
                  view3D === mode
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {mode === 'front' ? '3D View' : mode === 'scan' ? 'Скан эмали' : 'Рентген'}
              </button>
            ))}
          </div>
        </div>

        <div className="h-28 bg-gradient-to-b from-slate-900 to-cyan-950/30 rounded-xl border border-cyan-500/20 flex items-center justify-center relative">
          <div className="text-center">
            <div className="text-3xl animate-bounce">
              {view3D === 'front' ? '🦷' : view3D === 'scan' ? '✨🦷✨' : '🔬'}
            </div>
            <div className="text-[11px] font-mono text-cyan-300 mt-1">
              {view3D === 'front' && '3D Модель активна • Рендеринг WebGL 60 FPS'}
              {view3D === 'scan' && 'Карта микрорельефа зуба • Точность сканирования 5 мкм'}
              {view3D === 'xray' && 'Цифровой рентген-слой • Корневые каналы проверены'}
            </div>
          </div>
        </div>
      </div>

      {/* Service Selector */}
      <div className="my-4">
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
          Выберите стоматологическую услугу:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SERVICES.map((srv) => {
            const isSelected = selectedService === srv.id;
            return (
              <button
                key={srv.id}
                type="button"
                onClick={() => setSelectedService(srv.id)}
                className={`p-3 rounded-xl text-left border transition-all ${
                  isSelected
                    ? 'bg-cyan-500/15 border-cyan-500 text-white shadow-md'
                    : 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:border-slate-600'
                }`}
              >
                <div className="flex justify-between items-center mb-0.5">
                  <span className="font-bold text-xs sm:text-sm">{srv.name}</span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />}
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                  <span className="text-cyan-300 font-semibold">{srv.price}</span>
                  <span className="font-mono bg-slate-900 px-1.5 py-0.5 rounded">{srv.duration}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slot Picker */}
      <div className="my-4 flex items-center gap-2">
        <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
        <span className="text-xs text-slate-300 font-semibold">Свободное время:</span>
        <div className="flex gap-1.5 overflow-x-auto">
          {['10:00', '12:30', '14:30', '16:00', '18:15'].map((time) => (
            <button
              key={time}
              type="button"
              onClick={() => setSelectedTime(time)}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                selectedTime === time
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-800 border border-slate-700 text-slate-300'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Booking Form */}
      <div className="pt-3 border-t border-slate-800">
        {booked ? (
          <div className="bg-emerald-500/15 border border-emerald-500/30 p-3.5 rounded-xl text-center text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Запись подтверждена на {selectedTime}! SMS с кодом и напоминанием отправлено.</span>
          </div>
        ) : (
          <form onSubmit={handleBook} className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              required
              placeholder="Имя и телефон для записи"
              defaultValue="+7 (999) 123-45-67"
              className="bg-slate-800/80 border border-slate-700 text-xs rounded-xl px-3 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 flex-1"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-cyan-500/20 active:scale-95 flex items-center justify-center gap-1.5"
            >
              <span>Забронировать визит ({activeService.price})</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
