import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Lock, AlertTriangle, ShieldCheck } from 'lucide-react';
import { toBengaliNumber, formatTaka } from '../../utils/urlHelpers';

export const WithdrawModal: React.FC = () => {
  const { currentUser, closeModal, requestWithdraw, addToast, settings } = useApp();
  const [amount, setAmount] = useState<number>(settings.minWithdrawAmount);
  const [method, setMethod] = useState<'bKash' | 'Nagad' | 'Rocket' | 'USDT'>('bKash');
  const [accountNumber, setAccountNumber] = useState(currentUser?.walletAddress?.number || '');
  const [pin, setPin] = useState('');

  const isVipLocked = (currentUser?.vipLevel || 0) <= 0;

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    if (isVipLocked) {
      addToast('উত্তলন করতে একটি পেকেজ ক্রয় করুন এবং সফল ভাবে টাকা উত্তলন করে নিন', 'error');
      return;
    }

    if (!accountNumber.trim()) {
      addToast('উইথড্র অ্যাকাউন্ট নম্বর দিন', 'error');
      return;
    }

    if (!pin.trim()) {
      addToast('সিকিউরিটি পিন দিন', 'error');
      return;
    }

    const res = requestWithdraw(amount, method, accountNumber, pin);
    if (res.success) {
      closeModal();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-md bg-slate-900 border border-amber-500/30 rounded-2xl p-5 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-amber-300">টাকা উত্তোলন (Withdraw)</h3>
          </div>
          <button
            onClick={closeModal}
            className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Balance Card */}
        <div className="my-4 p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block">উত্তোলনযোগ্য ব্যালেন্স:</span>
            <span className="text-xl font-extrabold text-amber-400">
              {formatTaka(currentUser?.balance || 0)}
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block">বর্তমান স্ট্যাটাস:</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
              VIP {currentUser?.vipLevel || 0}
            </span>
          </div>
        </div>

        {/* Locked Banner if VIP 0 */}
        {isVipLocked ? (
          <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-500/50 mb-4 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-2 border border-rose-500/40">
              <Lock className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-rose-200 mb-1">উত্তোলন সুবিধা লক আছে!</h4>
            <p className="text-xs text-rose-200 font-semibold leading-relaxed mb-3">
              উত্তলন করতে একটি পেকেজ ক্রয় করুন এবং সফল ভাবে টাকা উত্তলন করে নিন
            </p>
            <button
              onClick={() => {
                closeModal();
                // trigger tab change to VIP view
                window.location.hash = '#vip';
              }}
              type="button"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 active:scale-95"
            >
              ভিআইপি প্যাকেজ দেখুন ও ক্রয় করুন
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 text-xs mb-4">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>আপনার ভিআইপি অ্যাকাউন্ট সক্রিয় রয়েছে। উত্তোলন সুবিধা উন্মুক্ত!</span>
          </div>
        )}

        {/* Withdraw Form */}
        <form onSubmit={handleWithdraw} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              পেমেন্ট মাধ্যম বেছে নিন:
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['bKash', 'Nagad', 'Rocket', 'USDT'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMethod(m)}
                  className={`py-1.5 text-xs font-bold rounded-lg border text-center transition-all ${
                    method === m
                      ? 'bg-amber-500 text-slate-950 border-amber-400'
                      : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  {m === 'bKash' ? 'বিকাশ' : m === 'Nagad' ? 'নগদ' : m === 'Rocket' ? 'রকেট' : 'USDT'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              উত্তোলনের পরিমাণ (টাকা):
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 font-bold">৳</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                min={settings.minWithdrawAmount}
                required
                className="w-full pl-8 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-sm font-semibold focus:outline-none focus:border-amber-500"
              />
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              সর্বনিম্ন উত্তোলন: ৳{toBengaliNumber(settings.minWithdrawAmount)}
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              আপনার {method} অ্যাকাউন্ট নম্বর:
            </label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="01XXXXXXXXX"
              required
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              সিকিউরিটি পিন (Security PIN):
            </label>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="৬ ডিজিটের পিন নম্বর"
              required
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] leading-snug">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>প্রতিদিন সকাল ৯টা থেকে রাত ১০টা পর্যন্ত উত্তোলন রিকোয়েস্ট প্রসেস করা হয়।</span>
          </div>

          <button
            type="submit"
            disabled={isVipLocked}
            className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all ${
              isVipLocked
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                : 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 text-slate-950 shadow-lg shadow-amber-500/20 active:scale-98'
            }`}
          >
            {isVipLocked ? 'উত্তোলন লক (VIP প্রয়োজন)' : 'উত্তোলন নিশ্চিত করুন'}
          </button>
        </form>
      </div>
    </div>
  );
};
