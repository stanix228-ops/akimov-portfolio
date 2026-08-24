import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/projects';
import { Globe, LayoutGrid, Cpu, Bot, Webhook, Sparkles, CheckCircle2, ArrowRight, Layers } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const getIcon = (name: string) => {
    switch (name) {
      case 'Globe': return <Globe className="w-5 h-5" />;
      case 'LayoutGrid': return <LayoutGrid className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'Bot': return <Bot className="w-5 h-5" />;
      case 'Webhook': return <Webhook className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      default: return <Layers className="w-5 h-5" />;
    }
  };

  const filteredServices = activeCategory === 'all'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.id === activeCategory);

  const tabs = [
    { id: 'all', label: `Все услуги (${SERVICES_DATA.length})` },
    { id: 'websites', label: 'Сайты & Лендинги' },
    { id: 'web-apps', label: 'Веб-приложения & CRM' },
    { id: 'ai-automation', label: 'ИИ & Автоматизация' },
    { id: 'telegram-bots', label: 'Telegram-боты' },
    { id: 'integrations', label: 'API & Интеграции' },
  ];

  return (
    <section id="services" className="py-20 relative overflow-hidden border-b border-white/10">
      <div className="max-w-[67.5rem] mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-cyan-300 text-xs font-semibold mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Услуги и форматы сотрудничества</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Что я предлагаю для вашего бизнеса
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-xl">
              От простых лендингов и стильных интернет-магазинов до сложных веб-приложений, Telegram-ботов и умных AI-систем под ключ.
            </p>
          </div>

          {/* Service Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-zinc-950/80 border border-white/10 p-1.5 rounded-2xl self-start md:self-auto backdrop-blur-md">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === tab.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="zen-card p-6 sm:p-7 rounded-3xl border border-white/10 hover:border-cyan-500/50 transition-all hover:-translate-y-1 flex flex-col justify-between group shadow-xl"
            >
              <div>
                {/* Header item */}
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-2xl group-hover:scale-110 transition-transform">
                    {getIcon(service.iconName)}
                  </div>
                  {service.badge && (
                    <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-zinc-950 text-cyan-300 border border-white/10">
                      {service.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* List items */}
                <div className="space-y-2.5 pt-4 border-t border-white/10">
                  {service.items.map((item, idx) => (
                    <div key={idx} className="text-xs text-zinc-300 flex items-start gap-2 leading-snug">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <a
                  href="#contact"
                  className="w-full py-2.5 px-4 rounded-xl bg-zinc-950 hover:bg-cyan-500 hover:text-slate-950 text-zinc-300 border border-white/10 hover:border-cyan-400 text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <span>Заказать разработку</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
