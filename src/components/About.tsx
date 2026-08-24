import React from 'react';
import { ABOUT_DATA, STRONG_POINTS } from '../data/projects';
import { Workflow, BrainCircuit, Target, Zap, Boxes, Sparkles, CheckCircle2, UserCheck } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Workflow': return <Workflow className="w-5 h-5" />;
      case 'BrainCircuit': return <BrainCircuit className="w-5 h-5" />;
      case 'Target': return <Target className="w-5 h-5" />;
      case 'Zap': return <Zap className="w-5 h-5" />;
      case 'Boxes': return <Boxes className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section id="about" className="py-20 relative overflow-hidden border-b border-white/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-violet-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[67.5rem] mx-auto px-4 sm:px-6">
        
        {/* Top Header */}
        <div className="mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-cyan-300 text-xs font-semibold mb-3">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Обо мне & Подход</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Создаю не просто сайты, а <span className="gradient-text-cyan">цифровые продукты</span> для роста бизнеса
            </h2>
          </div>
        </div>

        {/* Story & Philosophy Card */}
        <div className="zen-card p-6 sm:p-10 rounded-3xl border border-white/10 mb-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Философия и экспертиза</span>
              </div>
              <p className="text-base sm:text-lg text-zinc-200 leading-relaxed font-normal">
                {ABOUT_DATA.bio}
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs font-medium text-zinc-300">
                <span className="bg-zinc-950/80 border border-white/10 px-3 py-1.5 rounded-xl">
                  🚀 Более 2 лет коммерческой практики
                </span>
                <span className="bg-zinc-950/80 border border-white/10 px-3 py-1.5 rounded-xl">
                  🤖 Практический опыт внедрения LLM и ботов
                </span>
                <span className="bg-zinc-950/80 border border-white/10 px-3 py-1.5 rounded-xl">
                  🌐 Full-Stack: Frontend + Backend + AI
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <div className="bg-zinc-950/80 border border-white/10 p-5 rounded-2xl text-center">
                <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  2+ года
                </div>
                <div className="text-xs text-zinc-400 mt-1 font-medium">Практического опыта разработки</div>
              </div>

              <div className="bg-zinc-950/80 border border-white/10 p-5 rounded-2xl text-center">
                <div className="text-3xl font-extrabold text-emerald-400">
                  End-to-End
                </div>
                <div className="text-xs text-zinc-400 mt-1 font-medium">От идеи до запуска и ведения</div>
              </div>
            </div>

          </div>
        </div>

        {/* 5 Strong Points Grid */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="text-2xl font-bold text-white">Мои ключевые сильные стороны</h3>
            <p className="text-xs text-zinc-400 mt-1.5">Почему клиенты и команды доверяют мне свои ключевые проекты</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {STRONG_POINTS.map((point, idx) => (
              <div
                key={idx}
                className="zen-card p-6 rounded-3xl border border-white/10 hover:border-cyan-500/40 transition-all hover:-translate-y-1 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    {getIcon(point.iconName)}
                  </div>
                  <h4 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {point.title}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {point.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-1.5 text-[11px] text-cyan-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Проверено на реальных проектах</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
