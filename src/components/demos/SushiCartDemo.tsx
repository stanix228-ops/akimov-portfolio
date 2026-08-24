import React, { useState } from 'react';
import { Plus, Minus, ShoppingBag, CheckCircle, Tag, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  image: string;
  pieces: string;
}

const MENU_ITEMS: MenuItem[] = [
  { id: 1, name: 'Филадельфия с лососем', price: 690, pieces: '8 шт • 280г', image: '🍣' },
  { id: 2, name: 'Калифорния в тобико', price: 580, pieces: '8 шт • 260г', image: '🍱' },
  { id: 3, name: 'Запеченный угорь спайси', price: 720, pieces: '8 шт • 300г', image: '🔥' },
  { id: 4, name: 'Сет «Токио Премиум»', price: 1890, pieces: '24 шт • 850г', image: '🍱' },
];

const FREE_DELIVERY_THRESHOLD = 1500;

export const SushiCartDemo: React.FC = () => {
  const [cart, setCart] = useState<{ [id: number]: number }>({ 1: 1 });
  const [promo, setPromo] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const addToCart = (id: number) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => {
      const next = { ...prev };
      if (next[id] > 1) {
        next[id] -= 1;
      } else {
        delete next[id];
      }
      return next;
    });
  };

  const subtotal = Object.entries(cart).reduce((sum, [id, count]) => {
    const item = MENU_ITEMS.find((i) => i.id === Number(id));
    return sum + (item ? item.price * count : 0);
  }, 0);

  const discount = discountApplied ? Math.round(subtotal * 0.15) : 0;
  const total = Math.max(0, subtotal - discount);
  const progressToFreeDelivery = Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100);
  const remainingForFree = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promo.trim().toUpperCase() === 'VIBE' || promo.trim().toUpperCase() === 'VIBE2026' || promo.trim().length > 0) {
      setDiscountApplied(true);
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
    }
  };

  const handleOrder = () => {
    setOrderSuccess(true);
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    setTimeout(() => setOrderSuccess(false), 4000);
  };

  const totalItemsCount = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div className="bg-slate-900/90 border border-orange-500/30 rounded-2xl p-4 sm:p-6 text-slate-100 shadow-xl relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🍣</span>
          <div>
            <h4 className="font-bold text-white text-base sm:text-lg">Интерактивное демо корзины</h4>
            <p className="text-xs text-orange-400">Попробуй добавить роллы и применить промокод VIBE</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 px-3 py-1.5 rounded-full text-orange-400 text-xs font-semibold">
          <ShoppingBag className="w-4 h-4" />
          <span>{totalItemsCount} в корзине</span>
        </div>
      </div>

      {/* Free Delivery Bar */}
      <div className="my-4 bg-slate-800/80 p-3 rounded-xl border border-slate-700/50">
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-slate-300 font-medium">
            {remainingForFree > 0
              ? `До бесплатной доставки еще ${remainingForFree} ₽`
              : '🎉 Ура! Бесплатная доставка активна!'}
          </span>
          <span className="text-orange-400 font-bold">{Math.round(progressToFreeDelivery)}%</span>
        </div>
        <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-300 rounded-full"
            style={{ width: `${progressToFreeDelivery}%` }}
          />
        </div>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
        {MENU_ITEMS.map((item) => {
          const inCartCount = cart[item.id] || 0;
          return (
            <div
              key={item.id}
              className="bg-slate-800/50 border border-slate-700/60 p-3 rounded-xl flex items-center justify-between hover:border-orange-500/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl p-2 bg-slate-700/50 rounded-lg">{item.image}</span>
                <div>
                  <div className="font-semibold text-sm text-white">{item.name}</div>
                  <div className="text-xs text-slate-400">{item.pieces}</div>
                  <div className="text-sm font-bold text-orange-400 mt-0.5">{item.price} ₽</div>
                </div>
              </div>

              <div>
                {inCartCount === 0 ? (
                  <button
                    onClick={() => addToCart(item.id)}
                    className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-lg transition-transform active:scale-95 flex items-center gap-1 text-xs font-bold"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Купить</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-1.5 bg-slate-700/80 p-1 rounded-lg border border-slate-600">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="w-6 h-6 flex items-center justify-center bg-slate-800 text-slate-200 hover:bg-slate-900 rounded"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-5 text-center text-xs font-bold text-white">{inCartCount}</span>
                    <button
                      onClick={() => addToCart(item.id)}
                      className="w-6 h-6 flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white rounded"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Promo & Total */}
      <div className="pt-3 border-t border-slate-800 space-y-3">
        <form onSubmit={handleApplyPromo} className="flex gap-2">
          <div className="relative flex-1">
            <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Промокод (введи VIBE)"
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              className="w-full bg-slate-800/80 border border-slate-700 text-xs rounded-xl pl-9 pr-3 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500"
            />
          </div>
          <button
            type="submit"
            className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-orange-400 text-xs font-bold px-3 py-2 rounded-xl transition-colors flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Применить
          </button>
        </form>

        {discountApplied && (
          <div className="text-xs text-emerald-400 flex items-center gap-1.5 bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
            <CheckCircle className="w-4 h-4" />
            <span>Скидка 15% по промокоду успешно применена (-{discount} ₽)</span>
          </div>
        )}

        <div className="flex items-center justify-between bg-slate-950/60 p-3 rounded-xl border border-slate-800">
          <div>
            <div className="text-xs text-slate-400">Итоговая стоимость:</div>
            <div className="text-xl font-extrabold text-white">
              {total} ₽ {discountApplied && <span className="text-xs line-through text-slate-500 ml-1.5">{subtotal} ₽</span>}
            </div>
          </div>

          <button
            disabled={totalItemsCount === 0 || orderSuccess}
            onClick={handleOrder}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
              orderSuccess
                ? 'bg-emerald-500 text-white'
                : totalItemsCount > 0
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg shadow-orange-500/25 active:scale-95'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            {orderSuccess ? (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Заказ принят!</span>
              </>
            ) : (
              <>
                <span>Оформить заказ</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
