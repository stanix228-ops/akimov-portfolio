import React from 'react';
import { SKILL_CATEGORIES } from '../data/projects';
import { Code2, Server, BrainCircuit, Wrench, CheckCircle2, Cpu } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Code2': return <Code2 className="w-5 h-5" />;
      case 'Server': return <Server className="w-5 h-5" />;
      case 'BrainCircuit': return <BrainCircuit className="w-5 h-5" />;
      case 'Wrench': return <Wrench className="w-5 h-5" />;
      default: return <Cpu className="w-5 h-5" />;
    }
  };

  return (
    <section id="skills" className="py-20 relative border-b border-white/10">
      <div className="max-w-[67.5rem] mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-cyan-300 text-xs font-semibold mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Технологический стек</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Инструменты & Компетенции
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-3">
            Современный стек для разработки масштабируемых веб-приложений, интеграции AI и автоматизации бизнес-процессов.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILL_CATEGORIES.map((category, idx) => {
            const colors = [
              { text: 'text-cyan-300', bg: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' },
              { text: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' },
              { text: 'text-violet-400', bg: 'bg-violet-500/10 border-violet-500/20 text-violet-400' },
              { text: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20 text-amber-400' },
            ];
            const activeColor = colors[idx % colors.length];

            return (
              <div
                key={category.title}
                className="zen-card p-6 rounded-3xl border border-white/10 flex flex-col justify-between hover:border-white/20 transition-colors shadow-lg"
              >
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-2.5 rounded-xl border ${activeColor.bg}`}>
                      {getIcon(category.iconName)}
                    </div>
                    <h3 className={`text-base font-bold ${activeColor.text}`}>{category.title}</h3>
                  </div>

                  <div className="space-y-3.5">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="bg-zinc-950 border border-white/10 p-3 rounded-2xl transition-colors"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-xs sm:text-sm text-white">{skill.name}</span>
                          <span className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-white/10">
                            {skill.level}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 leading-snug">{skill.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-[11px] text-zinc-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Актуальные production-практики</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
