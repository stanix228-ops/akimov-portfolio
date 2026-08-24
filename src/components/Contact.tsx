import React, { useState } from 'react';
import { ABOUT_DATA } from '../data/projects';
import { Send, Phone, MessageSquare, Copy, Check, Sparkles, MapPin, ArrowUpRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ContactSection: React.FC = () => {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    contact: '',
    projectType: 'ИИ & Автоматизация',
    message: '',
  });

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 75,
      origin: { y: 0.6 },
    });
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden border-b border-white/10">
      {/* Background lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-[67.5rem] mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-cyan-300 text-xs font-semibold mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Прямой контакт</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Давайте обсудим ваш проект
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-3">
            Напишите мне в Telegram или отправьте заявку через форму — отвечу в течение 15 минут и сориентирую по срокам и стоимости.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Direct Contacts */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              
              {/* Telegram Card */}
              <div className="zen-card p-5 rounded-3xl border border-white/10 hover:border-cyan-500/50 transition-all flex items-center justify-between group">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-2xl">
                    <Send className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs text-zinc-400 font-medium">Telegram (Основной канал связи)</div>
                    <div className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {ABOUT_DATA.telegram}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopy(ABOUT_DATA.telegram, 'tg')}
                    title="Скопировать ник"
                    className="p-2 rounded-xl bg-zinc-950 border border-white/10 hover:border-white/20 text-zinc-400 hover:text-white transition-colors"
                  >
                    {copiedType === 'tg' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <a
                    href={ABOUT_DATA.telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Phone / WhatsApp Card */}
              <div className="zen-card p-5 rounded-3xl border border-white/10 hover:border-emerald-500/50 transition-all flex items-center justify-between group">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs text-zinc-400 font-medium">Телефон / WhatsApp</div>
                    <div className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {ABOUT_DATA.phoneDisplay}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopy(ABOUT_DATA.phone, 'phone')}
                    title="Скопировать номер"
                    className="p-2 rounded-xl bg-zinc-950 border border-white/10 hover:border-white/20 text-zinc-400 hover:text-white transition-colors"
                  >
                    {copiedType === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <a
                    href={ABOUT_DATA.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Location Card */}
              <div className="zen-card p-5 rounded-3xl border border-white/10 transition-all flex items-center gap-3.5">
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-2xl">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-zinc-400 font-medium">Локация & Формат работы</div>
                  <div className="text-sm font-bold text-white">
                    {ABOUT_DATA.location} (Удаленно по всему миру)
                  </div>
                </div>
              </div>

            </div>

            {/* Fast start guarantee */}
            <div className="p-5 rounded-3xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
              <div className="flex items-center gap-2 font-bold text-sm mb-1">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Быстрый старт и расчет</span>
              </div>
              <p className="text-xs text-cyan-200/80 leading-relaxed">
                Готов провести онлайн-созвон или обсудить в чате структуру вашего проекта, стек и план разработки в день обращения.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="zen-card p-6 sm:p-8 rounded-3xl border border-white/10">
              
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Заявка успешно отправлена!</h3>
                  <p className="text-sm text-zinc-300 max-w-md mx-auto">
                    Спасибо! Я свяжусь с вами в Telegram или по указанному контакту в течение 15 минут.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-xs font-bold text-zinc-200 rounded-xl transition-colors border border-white/10"
                  >
                    Отправить еще одну заявку
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-bold text-white mb-2">Написать напрямую</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                        Ваше имя / Компания
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Алексей"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                        Telegram или Телефон
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="@username или +7..."
                        value={formState.contact}
                        onChange={(e) => setFormState({ ...formState, contact: e.target.value })}
                        className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Направление проекта
                    </label>
                    <select
                      value={formState.projectType}
                      onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                      className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    >
                      <option value="ИИ & Автоматизация">🤖 ИИ-агенты, AI-консультанты и автоматизация</option>
                      <option value="Telegram-боты">📱 Telegram-бот / Mini App для бизнеса</option>
                      <option value="Разработка сайта под ключ">🌐 Сайт компании / Лендинг / Доставка</option>
                      <option value="Веб-приложение & CRM">💻 Веб-приложение, CRM, Дашборд, SaaS</option>
                      <option value="API & Интеграции">🔗 API, парсинг данных, платежные системы</option>
                      <option value="Редизайн & Ускорение">🛠 Редизайн и оптимизация текущего сайта</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Кратко о задаче
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Опишите ваши цели, примерные сроки или оставьте ссылку на референс..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm py-3.5 rounded-xl transition-all shadow-lg shadow-cyan-500/20 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>Отправить сообщение</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
