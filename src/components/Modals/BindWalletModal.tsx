import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, CreditCard, ShieldCheck } from 'lucide-react';

export const BindWalletModal: React.FC = () => {
  const { closeModal, currentUser, bindWallet, addToast } = useApp();
  const [method, setMethod] = useState<'bKash' | 'Nagad' | 'Rocket' | 'USDT'>(
    currentUser?.walletAddress?.method || 'bKash'
  );
  const [number, setNumber] = useState(currentUser?.walletAddress?.number || '');
  const [pin, setPin] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!number.trim()) {
      addToast('সঠিক ওয়ালেট বা মোবাইল নম্বর দিন', 'error');
      return;
    }
    if (!pin || pin.length < 4) {
      addToast('কমপক্ষে ৪ থেকে ৬ ডিজিটের সিকিউরিটি পিন দিন', 'error');
      return;
    }

    bindWallet(method, number, pin);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-md bg-slate-900 border border-amber-500/30 rounded-2xl p-5 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-amber-300">উইথড্র অ্যাকাউন্ট বাঁধুন</h3>
          </div>
          <button
            onClick={closeModal}
            className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              ওয়ালেট মেথড সিলেক্ট করুন:
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['bKash', 'Nagad', 'Rocket', 'USDT'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMethod(m)}
                  className={`py-1.5 text-xs font-bold rounded-lg border text-center transition-all ${
                    method === m
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
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
              আপনার {method} নম্বর বা ওয়ালেট এড্রেস:
            </label>
            <input
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder={method === 'USDT' ? 'TRC20 Wallet Address' : '01XXXXXXXXX'}
              required
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              উইথড্র সিকিউরিটি পিন (৬ ডিজিট):
            </label>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="গোপন পিন লিখুন"
              maxLength={6}
              required
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-emerald-300 text-xs">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>একবার অ্যাকাউন্ট বাঁধলে উত্তোলনের সময় বারবার নম্বর টাইপ করতে হবে না।</span>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 active:scale-98"
          >
            অ্যাকাউন্ট সেভ করুন
          </button>
        </form>
      </div>
    </div>
  );
};
