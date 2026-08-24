import React, { useState } from 'react';
import { ShoppingBag, Plus, Minus, CheckCircle, Flame, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DonerModifier {
  id: string;
  name: string;
  price: number;
}

const TOPPINGS: DonerModifier[] = [
  { id: 'cheese', name: '🧀 Сыр Чеддер', price: 60 },
  { id: 'jalapeno', name: '🌶️ Острый Халапеньо', price: 40 },
  { id: 'garlic_sauce', name: '🧄 Фирменный чесночный соус', price: 50 },
  { id: 'double_meat', name: '🥩 Двойное мясо гриль', price: 120 },
];

export const RetroDonerDemo: React.FC = () => {
  const [basePrice] = useState<number>(340);
  const [selectedToppings, setSelectedToppings] = useState<string[]>(['cheese']);
  const [quantity, setQuantity] = useState<number>(1);
  const [ordered, setOrdered] = useState<boolean>(false);

  const toggleTopping = (id: string) => {
    setSelectedToppings((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toppingsTotal = selectedToppings.reduce((sum, id) => {
    const t = TOPPINGS.find((item) => item.id === id);
    return sum + (t ? t.price : 0);
  }, 0);

  const singleItemPrice = basePrice + toppingsTotal;
  const totalPrice = singleItemPrice * quantity;

  const handleCheckout = () => {
    setOrdered(true);
    confetti({ particleCount: 80, spread: 75, origin: { y: 0.7 } });
    setTimeout(() => setOrdered(false), 4000);
  };

  return (
    <div className="bg-slate-900/90 border border-orange-500/30 rounded-2xl p-4 sm:p-6 text-slate-100 shadow-xl relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-orange-500/15 text-orange-400 rounded-lg">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-white text-base sm:text-lg">Retro Doner • Кастомайзер донера</h4>
            <p className="text-xs text-orange-400">Next.js 16 + Zustand + React 19 реактивная корзиной</p>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-orange-500/10 border border-orange-500/30 px-3 py-1 rounded-full text-orange-400 text-xs font-semibold">
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Zustand State</span>
        </div>
      </div>

      {/* Main Item Card */}
      <div className="my-4 bg-slate-950/70 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="text-4xl p-2 bg-slate-800/80 rounded-2xl">🥙</div>
          <div>
            <div className="font-extrabold text-base text-white">Донер «Retro Classic» на углях</div>
            <div className="text-xs text-slate-400">Хрустящий лаваш, сочное мясо, свежие томаты, маринованный лук</div>
            <div className="text-sm font-bold text-orange-400 mt-1">{singleItemPrice} ₽ / шт.</div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="p-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-6 text-center font-bold text-sm text-white">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="p-1 rounded bg-orange-500 text-slate-950 hover:bg-orange-400"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Modifiers selector */}
      <div className="my-4">
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
          Добавить топпинги и соусы (Модификаторы):
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {TOPPINGS.map((top) => {
            const isSelected = selectedToppings.includes(top.id);
            return (
              <button
                key={top.id}
                type="button"
                onClick={() => toggleTopping(top.id)}
                className={`p-3 rounded-xl text-left border transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-orange-500/15 border-orange-500 text-white shadow-sm'
                    : 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:border-slate-600'
                }`}
              >
                <div>
                  <div className="font-semibold text-xs sm:text-sm">{top.name}</div>
                  <div className="text-[11px] text-orange-400">+{top.price} ₽</div>
                </div>
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                    isSelected ? 'bg-orange-500 border-orange-500 text-slate-950' : 'border-slate-600'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Cart Summary & Order Button */}
      <div className="pt-3 border-t border-slate-800">
        {ordered ? (
          <div className="bg-emerald-500/15 border border-emerald-500/30 p-3.5 rounded-xl text-center text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span>Заказ на {totalPrice} ₽ отправлен на кухню! Курьер назначен за 25 минут.</span>
          </div>
        ) : (
          <div className="flex items-center justify-between bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
            <div>
              <div className="text-xs text-slate-400">Итоговая сумма корзины:</div>
              <div className="text-xl font-extrabold text-white">{totalPrice} ₽</div>
            </div>

            <button
              onClick={handleCheckout}
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-extrabold text-xs px-6 py-3 rounded-xl transition-all shadow-lg shadow-orange-500/25 active:scale-95 flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Оформить доставку</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
