import React, { useState } from 'react';
import { FileText, Bot, Sparkles, Download } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Message {
  sender: 'user' | 'bot';
  text: string;
  docReady?: boolean;
  docTitle?: string;
  time: string;
}

export const NakaioDemo: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: '👋 Привет! Я AI-ассистент платформы Nakaio. Готов автоматически обработать заказ или сгенерировать юридический документ.',
      time: '14:20',
    },
  ]);
  const [generating, setGenerating] = useState(false);

  const handleAction = (docType: string) => {
    if (generating) return;

    const userMsg: Message = {
      sender: 'user',
      text: `Сгенерировать: ${docType}`,
      time: '14:21',
    };

    setMessages((prev) => [...prev, userMsg]);
    setGenerating(true);

    setTimeout(() => {
      const botMsg: Message = {
        sender: 'bot',
        text: `✅ Готово! Документ «${docType}» успешно сформирован на основе данных клиента и внесен в CRM со статусом [IN PRODUCTION].`,
        docReady: true,
        docTitle: `${docType}_Nakaio_Generated.pdf`,
        time: '14:21',
      };
      setMessages((prev) => [...prev, botMsg]);
      setGenerating(false);
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.8 } });
    }, 1200);
  };

  return (
    <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-4 sm:p-6 text-slate-100 shadow-xl relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-emerald-500/15 text-emerald-400 rounded-lg">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-white text-base sm:text-lg">Nakaio • Telegram Bot & AI Workflow</h4>
            <p className="text-xs text-emerald-400">Симуляция генерации документов и автообработки заказов</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full text-emerald-400 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Bot Online</span>
        </div>
      </div>

      {/* Chat messages viewport */}
      <div className="my-4 bg-slate-950/80 border border-slate-800 rounded-2xl p-4 min-h-[220px] max-h-[280px] overflow-y-auto space-y-3 font-sans">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} animate-in fade-in`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-emerald-600 text-white rounded-tr-none'
                  : 'bg-slate-800/90 border border-slate-700 text-slate-200 rounded-tl-none'
              }`}
            >
              <div className="mb-1">{msg.text}</div>

              {msg.docReady && (
                <div className="mt-2.5 pt-2.5 border-t border-slate-700/80 bg-slate-900/80 p-2.5 rounded-xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <div className="font-bold text-[11px] text-white">{msg.docTitle}</div>
                      <div className="text-[10px] text-slate-400">PDF • 142 KB • ЭЦП прикреплена</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => alert('Демо-файл успешно сформирован!')}
                    className="p-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-lg transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <div className="text-[9px] text-slate-400 text-right mt-1 font-mono">{msg.time}</div>
            </div>
          </div>
        ))}

        {generating && (
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-slate-900/60 p-2 rounded-xl border border-slate-800 w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Nakaio AI составляет документ и передает в CRM...</span>
          </div>
        )}
      </div>

      {/* Quick Action Prompt Buttons */}
      <div className="pt-2 border-t border-slate-800">
        <div className="text-[11px] font-semibold text-slate-400 mb-2">Нажмите быструю команду боту:</div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={generating}
            onClick={() => handleAction('Договор оказания услуг IT-разработки')}
            className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs px-3 py-2 rounded-xl transition-all active:scale-95 flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span>Договор оказания услуг</span>
          </button>
          <button
            type="button"
            disabled={generating}
            onClick={() => handleAction('Счет-фактура и акт приема-передачи')}
            className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs px-3 py-2 rounded-xl transition-all active:scale-95 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Счет-фактура и Акт</span>
          </button>
        </div>
      </div>
    </div>
  );
};
