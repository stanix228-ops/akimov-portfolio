import React, { useState } from 'react';
import { Gamepad2, Zap, Trophy, Timer, Play } from 'lucide-react';
import confetti from 'canvas-confetti';

export const FoodRushDemo: React.FC = () => {
  const [score, setScore] = useState<number>(1250);
  const [streak, setStreak] = useState<number>(3);
  const [deliveries, setDeliveries] = useState<number>(12);
  const [nitroActive, setNitroActive] = useState<boolean>(false);

  const handleDeliver = () => {
    const points = nitroActive ? 300 : 150;
    setScore((prev) => prev + points);
    setStreak((prev) => prev + 1);
    setDeliveries((prev) => prev + 1);
    if ((streak + 1) % 5 === 0) {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    }
  };

  const handleActivateNitro = () => {
    setNitroActive(true);
    setTimeout(() => setNitroActive(false), 3000);
  };

  return (
    <div className="bg-zinc-950 border border-white/10 p-5 rounded-2xl space-y-4 font-mono">
      {/* Game Header Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Gamepad2 className="w-5 h-5 text-orange-400" />
          <span className="font-bold text-white text-sm">FoodRush Engine v1.3 • Mini Playtest</span>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="text-zinc-400 flex items-center gap-1">
            <Timer className="w-3.5 h-3.5 text-cyan-400" />
            <span>01:45</span>
          </span>
          <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 text-[11px] font-bold">
            60 FPS
          </span>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="bg-zinc-900 border border-white/10 p-2.5 rounded-xl">
          <div className="text-[10px] text-zinc-400 uppercase">Очки Score</div>
          <div className="text-lg font-bold text-orange-400 mt-0.5">{score.toLocaleString()}</div>
        </div>
        <div className="bg-zinc-900 border border-white/10 p-2.5 rounded-xl">
          <div className="text-[10px] text-zinc-400 uppercase">Комбо-Streak</div>
          <div className="text-lg font-bold text-cyan-300 mt-0.5">x{streak}</div>
        </div>
        <div className="bg-zinc-900 border border-white/10 p-2.5 rounded-xl">
          <div className="text-[10px] text-zinc-400 uppercase">Доставок</div>
          <div className="text-lg font-bold text-emerald-400 mt-0.5">{deliveries}</div>
        </div>
      </div>

      {/* Interactive Play Canvas Simulation */}
      <div className="relative aspect-[21/9] bg-zinc-900/90 border border-white/10 rounded-xl overflow-hidden p-4 flex flex-col justify-between items-center text-center">
        <div className="flex justify-between w-full text-xs text-zinc-400">
          <span>Сектор: Neo-Tokyo Sector 7</span>
          <span className={nitroActive ? 'text-amber-400 font-bold animate-pulse' : 'text-zinc-500'}>
            {nitroActive ? '⚡ NITRO SPEED BOOST ACTIVE 2.5x' : 'Скорость: 110 км/ч'}
          </span>
        </div>

        <div className="space-y-1 my-2">
          <div className="text-sm font-bold text-white flex items-center justify-center gap-2">
            <span>📦 Заказ #208: Рамен + Запеченный Сет</span>
            <span className="text-xs text-emerald-400">Готов к доставке</span>
          </div>
          <p className="text-xs text-zinc-400">Нажмите «Доставить заказ», чтобы начислить комбинацию очков</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleDeliver}
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-lg transition-all active:scale-95 flex items-center gap-1.5"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>Доставить заказ (+{nitroActive ? '300' : '150'})</span>
          </button>

          <button
            onClick={handleActivateNitro}
            disabled={nitroActive}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              nitroActive
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 cursor-not-allowed'
                : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-white/10 active:scale-95'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span>{nitroActive ? 'Нитро включено!' : 'Нитро Буст'}</span>
          </button>
        </div>
      </div>

      <div className="text-[11px] text-zinc-400 flex items-center gap-1.5">
        <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span>Таблица лидеров и рекордов синхронизируется в реальном времени</span>
      </div>
    </div>
  );
};
