import React from 'react';
import type { Project } from '../types';
import { ArrowRight, Sparkles } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

interface ProjectCardProps {
  project: Project;
  onOpenDetails: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenDetails }) => {
  return (
    <div
      onClick={() => onOpenDetails(project)}
      className="group cursor-pointer zen-card overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
    >
      {/* Image Preview Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
        <img
          src={getAssetUrl(project.image)}
          alt={project.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent opacity-85" />
        
        {/* Category & Badge */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-lg text-xs font-bold bg-zinc-900/90 border border-white/20 text-white backdrop-blur-md">
            {project.categoryLabel}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <span className="text-xs font-mono-code text-zinc-300 bg-zinc-950/90 px-2.5 py-1 rounded-lg border border-white/10">
            {project.badge}
          </span>
          <span className="text-xs font-bold text-cyan-300 bg-cyan-950/90 border border-cyan-500/40 px-2.5 py-1 rounded-lg flex items-center gap-1 backdrop-blur-sm">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>Интерактивный тест-драйв</span>
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
            {project.title}
          </h3>

          <p className="text-xs sm:text-sm text-zinc-300 mb-5 leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 gap-2 mb-5">
            {project.metrics.slice(0, 2).map((metric, idx) => (
              <div key={idx} className="bg-zinc-950/80 border border-white/10 p-2.5 rounded-xl">
                <div className="text-[10px] text-zinc-400 font-medium">{metric.label}</div>
                <div className="text-sm font-bold text-white mt-0.5 font-mono-code">{metric.value}</div>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tags.slice(0, 5).map((tag, idx) => (
              <span
                key={idx}
                className="text-[11px] font-medium bg-zinc-900/90 text-zinc-300 px-2.5 py-1 rounded-lg border border-white/10 font-mono-code"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 5 && (
              <span className="text-[11px] font-mono-code text-zinc-400 px-2 py-1 bg-zinc-900 rounded-lg border border-white/10">
                +{project.tags.length - 5}
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-white">
          <span className="group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
            <span>Изучить архитектуру и решение</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
          <span className="text-zinc-500 text-[11px] group-hover:text-zinc-400">Детали</span>
        </div>
      </div>
    </div>
  );
};
