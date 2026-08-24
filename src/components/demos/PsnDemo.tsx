import React, { useState } from 'react';
import { Gamepad, ShieldCheck, RefreshCw, CheckCircle2 } from 'lucide-react';

interface AccountItem {
  id: string;
  email: string;
  region: string;
  psPlus: 'Deluxe' | 'Extra' | 'Essential' | 'Expired';
  balance: string;
  status: 'Active' | 'Pending';
}

const INITIAL_ACCOUNTS: AccountItem[] = [
  { id: '1', email: 'alex_tr_01@psn.com', region: 'Turkey 🇹🇷', psPlus: 'Deluxe', balance: '1,250 TRY', status: 'Active' },
  { id: '2', email: 'gamer_us_02@psn.com', region: 'USA 🇺🇸', psPlus: 'Extra', balance: '$45.00 USD', status: 'Active' },
  { id: '3', email: 'shop_uk_03@psn.com', region: 'UK 🇬🇧', psPlus: 'Essential', balance: '£12.50 GBP', status: 'Active' },
];

export const PsnDemo: React.FC = () => {
  const [accounts, setAccounts] = useState<AccountItem[]>(INITIAL_ACCOUNTS);
  const [scanning, setScanning] = useState<boolean>(false);

  const handleRunScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setAccounts((prev) =>
        prev.map((acc) => ({ ...acc, status: 'Active' }))
      );
    }, 1500);
  };

  return (
    <div className="bg-zinc-950 border border-white/10 p-5 rounded-2xl space-y-4 font-mono text-left">
      {/* App Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Gamepad className="w-5 h-5 text-cyan-400" />
          <span className="font-bold text-white text-sm">PSN Account Suite v2.4 • Batch Scanner</span>
        </div>

        <button
          onClick={handleRunScan}
          disabled={scanning}
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${scanning ? 'animate-spin' : ''}`} />
          <span>{scanning ? 'Проверка PSN...' : 'Проверить статусы'}</span>
        </button>
      </div>

      {/* Accounts List */}
      <div className="space-y-2">
        {accounts.map((acc) => (
          <div
            key={acc.id}
            className="bg-zinc-900 border border-white/10 p-3 rounded-xl flex items-center justify-between text-xs"
          >
            <div className="space-y-0.5">
              <div className="font-bold text-white flex items-center gap-2">
                <span>{acc.email}</span>
                <span className="text-[10px] text-zinc-400 bg-zinc-950 px-2 py-0.5 rounded border border-white/10">
                  {acc.region}
                </span>
              </div>
              <div className="text-[11px] text-zinc-400">
                Баланс кошелька: <strong className="text-zinc-200">{acc.balance}</strong>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-[11px] font-bold">
                PS Plus {acc.psPlus}
              </span>

              <div className="flex items-center gap-1 text-emerald-400 font-bold text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>ONLINE</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Security info */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-400">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>Шифрование AES-256 GCM • Sony API Auth Active</span>
        </div>
        <span className="text-cyan-400 font-semibold">Все 3 аккаунта валидны</span>
      </div>
    </div>
  );
};
