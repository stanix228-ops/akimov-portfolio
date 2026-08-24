import React from 'react';
import { PROCESS_STEPS } from '../data/projects';
import { Compass, Palette, Code, Rocket, ArrowRight } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Compass': return <Compass className="w-5 h-5" />;
      case 'Palette': return <Palette className="w-5 h-5" />;
      case 'Code': return <Code className="w-5 h-5" />;
      case 'Rocket': return <Rocket className="w-5 h-5" />;
      default: return <Compass className="w-5 h-5" />;
    }
  };

  return (
    <section id="process" className="py-20 relative border-b border-white/10">
      <div className="max-w-[67.5rem] mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-cyan-300 text-xs font-semibold mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Прозрачный процесс</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Как строится работа над проектом
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">
            Четкие и понятные шаги от первого созвона до рабочего продакшена без срыва сроков.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="zen-card p-6 rounded-3xl border border-white/10 flex flex-col justify-between hover:border-cyan-500/40 transition-all hover:-translate-y-1 relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-mono font-extrabold text-zinc-600 group-hover:text-cyan-400 transition-colors">
                    {step.step}
                  </span>
                  <div className="p-2.5 rounded-xl bg-zinc-950 border border-white/10 text-cyan-400 group-hover:border-cyan-500/30 transition-colors">
                    {getIcon(step.iconName)}
                  </div>
                </div>

                <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs text-zinc-400 mb-5 leading-relaxed">
                  {step.description}
                </p>

                <div className="space-y-2 pt-4 border-t border-white/10">
                  {step.details.map((detail, dIdx) => (
                    <div key={dIdx} className="text-[11px] text-zinc-300 flex items-start gap-2">
                      <span className="text-cyan-400 font-bold shrink-0">•</span>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {idx < PROCESS_STEPS.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-zinc-600">
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
