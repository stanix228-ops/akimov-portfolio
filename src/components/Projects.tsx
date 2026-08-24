import React, { useState } from 'react';
import type { Project } from '../types';
import { ProjectCard } from './ProjectCard';
import { Code2 } from 'lucide-react';

interface ProjectsSectionProps {
  projects: Project[];
  onOpenDetails: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects, onOpenDetails }) => {
  const [filter, setFilter] = useState<'all' | 'ai-saas' | 'telegram-bots' | 'corporate' | 'ecommerce' | 'games-bots-apps'>('all');

  const filteredProjects = projects.filter((p) => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  const categories = [
    { id: 'all', label: `Все кейсы (${projects.length})` },
    { id: 'ai-saas', label: 'ИИ & SaaS' },
    { id: 'telegram-bots', label: 'Telegram & Боты' },
    { id: 'games-bots-apps', label: '🎮 Игры, Сервисы & Боты' },
    { id: 'corporate', label: 'Корпоративные' },
    { id: 'ecommerce', label: 'Доставка & E-Com' },
  ] as const;

  return (
    <section id="projects" className="py-20 relative border-b border-white/10">
      {/* Background ambient */}
      <div className="absolute top-1/2 -left-40 w-80 h-80 bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-[67.5rem] mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-cyan-300 text-xs font-semibold mb-3">
              <Code2 className="w-3.5 h-3.5" />
              <span>Реализованные кейсы</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Проекты и разработанные продукты
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-xl">
              Нажмите на любой проект, чтобы ознакомиться с архитектурой и протестировать живое интерактивное демо прямо в модалке.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-zinc-950/80 border border-white/10 p-1.5 rounded-2xl self-start md:self-auto backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  filter === cat.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenDetails={onOpenDetails}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
