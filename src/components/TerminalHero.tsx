import React, { useState, useEffect } from 'react';
import { Terminal, RotateCcw, CheckCircle2, ShieldCheck, Activity, Cpu, Code2 } from 'lucide-react';

interface CodeSnippet {
  id: string;
  command: string;
  logs: { text: string; type: 'info' | 'success' | 'warning' | 'highlight' }[];
  result: string;
}

const SNIPPETS: CodeSnippet[] = [
  {
    id: 'nakaio',
    command: 'ak1moff.deployAI({ project: "Nakaio AI", model: "Gemini 2.5 Flash" });',
    logs: [
      { text: '[SYSTEM] Initializing Gemini AI Agent Orchestrator pipeline...', type: 'info' },
      { text: '[PDF_ENGINE] Compiling DOCX & PDF generator pipeline engine...', type: 'info' },
      { text: '[TELEGRAM] Hooking aiogram v3 bot webhook listener on port 443...', type: 'info' },
      { text: '[CRM_SYNC] PostgreSQL connection pool active (2ms latency)', type: 'highlight' },
      { text: '[SECURITY] Encrypting user tokens with AES-256 GCM cipher...', type: 'info' },
      { text: '[AI_MODEL] Quantized Gemini Flash weights loaded (0.4s warmup)', type: 'info' },
      { text: '[SYSTEM_CHECK] Health status: 100% operational | 0 errors', type: 'highlight' },
    ],
    result: '✔ DEPLOYED: Nakaio AI Telegram Ecosystem is live! (PDF generation < 8s)',
  },
  {
    id: 'twogis',
    command: 'ak1moff.runParser({ target: "2GIS Web", output: "WhatsApp Web" });',
    logs: [
      { text: '[PLAYWRIGHT] Launching Chromium Headless browser cluster...', type: 'info' },
      { text: '[SCRAPER] Extracting leads: Astana & Almaty (420 contacts found)', type: 'info' },
      { text: '[WA_GATEWAY] Establishing WhatsApp Web session token auth...', type: 'info' },
      { text: '[AUTOMATION] Dispatching targeted lead notifications via Queue...', type: 'highlight' },
      { text: '[ANALYTICS] Delivery status: 99.4% confirmed inbox rate', type: 'info' },
      { text: '[DATABASE] Storing lead profiles to PostgreSQL table...', type: 'info' },
      { text: '[AUTO_RESPONSE] Auto-responder trigger active for incoming replies', type: 'highlight' },
    ],
    result: '✔ SUCCESS: 420 leads processed & notified automatically.',
  },
  {
    id: 'lumina',
    command: 'ak1moff.build3D({ tech: "Next.js 16 + React 19 + Three.js" });',
    logs: [
      { text: '[NEXT16] Compiling Server Actions & App Router routes...', type: 'info' },
      { text: '[THREE_JS] Pre-loading 3D GLTF Dental Mesh assets & textures...', type: 'info' },
      { text: '[PERF_OPT] WebGL Shaders compiled with 60 FPS target render loop...', type: 'highlight' },
      { text: '[SEO_OPTIM] Pre-rendering static HTML pages for Google indexing...', type: 'info' },
      { text: '[ZUSTAND] Global state store initialized with persistent storage', type: 'info' },
      { text: '[VERCEL_EDGE] Deployed to global CDN edge nodes (12ms TTFB)', type: 'highlight' },
    ],
    result: '✔ RENDER: Lumina Dent 3D Interactive Portal live on Production.',
  },
];

export const TerminalHero: React.FC = () => {
  const [snippetIndex, setSnippetIndex] = useState<number>(0);
  const [displayedCommand, setDisplayedCommand] = useState<string>('');
  const [logIndex, setLogIndex] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(true);

  const currentSnippet = SNIPPETS[snippetIndex];

  // Typing effect for command
  useEffect(() => {
    setDisplayedCommand('');
    setLogIndex(0);
    setShowResult(false);
    setIsTyping(true);

    let charIdx = 0;
    const fullCommand = currentSnippet.command;

    const timer = setInterval(() => {
      if (charIdx < fullCommand.length) {
        setDisplayedCommand(fullCommand.slice(0, charIdx + 1));
        charIdx++;
      } else {
        clearInterval(timer);
        setIsTyping(false);
      }
    }, 25);

    return () => clearInterval(timer);
  }, [snippetIndex]);

  // Sequential log printing after command typed
  useEffect(() => {
    if (isTyping) return;

    if (logIndex < currentSnippet.logs.length) {
      const logTimer = setTimeout(() => {
        setLogIndex((prev) => prev + 1);
      }, 300);
      return () => clearTimeout(logTimer);
    } else {
      const resultTimer = setTimeout(() => {
        setShowResult(true);
      }, 400);
      return () => clearTimeout(resultTimer);
    }
  }, [isTyping, logIndex, currentSnippet]);

  // Auto loop next snippet after result shown
  useEffect(() => {
    if (!showResult) return;
    const loopTimer = setTimeout(() => {
      setSnippetIndex((prev) => (prev + 1) % SNIPPETS.length);
    }, 5000);
    return () => clearTimeout(loopTimer);
  }, [showResult]);

  return (
    <div className="w-full zen-card rounded-3xl border border-white/15 shadow-2xl overflow-hidden font-mono text-left my-2">
      {/* Terminal Window Header Bar */}
      <div className="bg-zinc-950 px-5 py-4 border-b border-white/15 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-3.5 h-3.5 rounded-full bg-rose-500/80" />
          <div className="w-3.5 h-3.5 rounded-full bg-amber-500/80" />
          <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/80" />
          <span className="text-xs text-zinc-300 font-bold ml-2.5 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>ak1moff-cli — bash</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full flex items-center gap-1.5 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>LIVE AGENT</span>
          </span>

          <button
            onClick={() => setSnippetIndex((prev) => (prev + 1) % SNIPPETS.length)}
            title="Сменить команду"
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 border border-white/10 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Terminal Code Body - LARGER & TALLER DIMENSIONS min-h-[460px] */}
      <div className="p-6 sm:p-8 bg-[#0b0a0a] text-sm space-y-4 min-h-[460px] sm:min-h-[500px] text-zinc-200 flex flex-col justify-between">
        
        <div className="space-y-4">
          {/* Environment Status Indicator Bar */}
          <div className="flex items-center justify-between text-xs text-zinc-400 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span className="font-semibold text-zinc-300">Node.js v22.4 • Vercel Edge Cluster</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>RAM: 142MB | CPU: 1.2% | Latency: 2ms</span>
            </div>
          </div>

          {/* Command Line Prompt */}
          <div className="flex items-start gap-2.5 flex-wrap text-sm sm:text-base text-cyan-300 font-bold pt-2">
            <span className="text-emerald-400 shrink-0">ak1moff@opencode-zen:~$</span>
            <span className="text-zinc-100 break-all">{displayedCommand}</span>
            {isTyping && <span className="w-2.5 h-5 bg-cyan-400 inline-block animate-pulse shrink-0" />}
          </div>

          {/* Printed Logs */}
          <div className="space-y-2.5 pt-2">
            {currentSnippet.logs.slice(0, logIndex).map((log, i) => (
              <div
                key={i}
                className={`text-xs sm:text-sm leading-relaxed transition-opacity duration-300 flex items-start gap-2.5 ${
                  log.type === 'highlight'
                    ? 'text-cyan-300 font-bold'
                    : log.type === 'warning'
                    ? 'text-amber-300'
                    : 'text-zinc-400'
                }`}
              >
                <Code2 className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
                <span>{log.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Final Result Success Banner */}
        {showResult && (
          <div className="pt-4">
            <div className="inline-flex items-center gap-2.5 bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold animate-in fade-in zoom-in-95 duration-300 shadow-xl w-full">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>{currentSnippet.result}</span>
            </div>
          </div>
        )}

      </div>

      {/* Snippet Switcher Footer Bar */}
      <div className="bg-zinc-950 px-6 py-3.5 border-t border-white/15 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 text-zinc-400 font-medium">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>Симуляция стека разработки:</span>
        </div>

        <div className="flex items-center gap-2">
          {SNIPPETS.map((snip, idx) => (
            <button
              key={snip.id}
              onClick={() => setSnippetIndex(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                snippetIndex === idx
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-md'
                  : 'bg-white/5 text-zinc-400 hover:text-white border border-white/10'
              }`}
            >
              Snippet 0{idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
