import React, { useState } from 'react';
import { Database, Play, CheckCircle2, MessageSquare, Download } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ScrapedOrg {
  id: number;
  name: string;
  category: string;
  phone: string;
  rating: string;
  verifiedWhatsApp: boolean;
}

const ORGS: ScrapedOrg[] = [
  { id: 1, name: 'АвтоТехЦентр «Премиум Моторс»', category: 'Автосервисы & СТО', phone: '+7 (771) 902-11-22', rating: '4.9 ★ (120 отзывов)', verifiedWhatsApp: true },
  { id: 2, name: 'Стоматология «Дент-Мастер»', category: 'Медицина & Стоматологии', phone: '+7 (775) 431-88-90', rating: '4.8 ★ (85 отзывов)', verifiedWhatsApp: true },
  { id: 3, name: 'Ресторан «Чайхона & Гриль»', category: 'Кафе & Рестораны', phone: '+7 (701) 554-32-10', rating: '4.7 ★ (210 отзывов)', verifiedWhatsApp: true },
  { id: 4, name: 'СтройКомплект Поставка', category: 'Строительные материалы', phone: '+7 (777) 811-00-44', rating: '4.6 ★ (45 отзывов)', verifiedWhatsApp: true },
];

export const TwoGisDemo: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>('Астана');
  const [scraping, setScraping] = useState<boolean>(false);
  const [scrapedData] = useState<ScrapedOrg[]>(ORGS);
  const [sentWhatsapp, setSentWhatsapp] = useState<number[]>([]);

  const handleStartScrape = () => {
    setScraping(true);
    setTimeout(() => {
      setScraping(false);
      confetti({ particleCount: 60, spread: 65, origin: { y: 0.7 } });
    }, 1100);
  };

  const handleSendWA = (id: number) => {
    setSentWhatsapp((prev) => [...prev, id]);
  };

  return (
    <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-4 sm:p-6 text-slate-100 shadow-xl relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-emerald-500/15 text-emerald-400 rounded-lg">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-white text-base sm:text-lg">2GIS Web • Парсер B2B-баз & WhatsApp</h4>
            <p className="text-xs text-emerald-400">Playwright + Express + WhatsApp-Web.js автоматизация</p>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full text-emerald-400 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Playwright Active</span>
        </div>
      </div>

      {/* Control bar */}
      <div className="my-4 flex flex-wrap items-center justify-between gap-3 bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold">Город:</span>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="bg-slate-800 text-xs text-white border border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-500"
          >
            <option value="Астана">Астана (Казахстан)</option>
            <option value="Алматы">Алматы (Казахстан)</option>
            <option value="Москва">Москва (Россия)</option>
          </select>
        </div>

        <button
          onClick={handleStartScrape}
          disabled={scraping}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs px-4 py-2 rounded-xl transition-all shadow-md shadow-emerald-500/20 active:scale-95 flex items-center gap-1.5"
        >
          {scraping ? (
            <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-current" />
          )}
          <span>{scraping ? 'Парсинг 2GIS...' : 'Запустить сбор организаций'}</span>
        </button>
      </div>

      {/* Extracted Leads Table */}
      <div className="my-4 space-y-2 max-h-[240px] overflow-y-auto pr-1">
        {scrapedData.map((org) => {
          const isSent = sentWhatsapp.includes(org.id);
          return (
            <div
              key={org.id}
              className="bg-slate-800/50 border border-slate-700/70 p-3 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 hover:border-emerald-500/40 transition-colors"
            >
              <div>
                <div className="font-bold text-xs sm:text-sm text-white flex items-center gap-1.5">
                  <span>{org.name}</span>
                  <span className="text-[10px] text-amber-400 font-mono">{org.rating}</span>
                </div>
                <div className="text-[11px] text-slate-400">{org.category} • <span className="text-emerald-400 font-mono">{org.phone}</span></div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSendWA(org.id)}
                  disabled={isSent}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                    isSent
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-slate-700 hover:bg-emerald-600 text-white active:scale-95'
                  }`}
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>{isSent ? 'Отправлено ✓' : 'WhatsApp КП'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Export status */}
      <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1 text-emerald-400">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Собрано 150+ организаций с прямыми номерами</span>
        </span>
        <button
          type="button"
          onClick={() => alert('База 2GIS выгружена в Excel (демо)!')}
          className="text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-1"
        >
          <Download className="w-3 h-3" />
          <span>Скачать .xlsx</span>
        </button>
      </div>
    </div>
  );
};
