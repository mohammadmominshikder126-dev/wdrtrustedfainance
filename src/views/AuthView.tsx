import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Eye, EyeOff, ShieldCheck, Gift } from 'lucide-react';

export const AuthView: React.FC = () => {
  const { login, register, addToast } = useApp();

  // Read URL query params: e.g. ?invite=CODE&tab=register
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [inviteCode, setInviteCode] = useState('WDR9922');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const inv = params.get('invite');
    const urlTab = params.get('tab');

    if (inv) {
      setInviteCode(inv.toUpperCase());
    }

    // Direct redirection to registration if ?tab=register or invite link
    if (urlTab === 'register' || inv) {
      setTab('register');
    }
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) {
      addToast('মোবাইল নম্বর দিন', 'error');
      return;
    }
    if (!password.trim()) {
      addToast('পাসওয়ার্ড দিন', 'error');
      return;
    }

    login(phone, password);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim() || phone.length < 10) {
      addToast('সঠিক মোবাইল নম্বর দিন (যেমন: 018XXXXXXXX)', 'error');
      return;
    }
    if (password.length < 6) {
      addToast('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে', 'error');
      return;
    }
    if (password !== confirmPassword) {
      addToast('পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড মিলছে না', 'error');
      return;
    }
    if (!agreeTerms) {
      addToast('ব্যবহারের শর্তাবলীতে সম্মতি দিন', 'error');
      return;
    }

    register(phone, password, inviteCode);
  };

  const handleQuickDemoLogin = () => {
    login('01899112233', '123456');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-amber-500/30 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        {/* Brand Lockup */}
        <div className="text-center mb-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-slate-950 mx-auto mb-3 shadow-xl shadow-amber-500/30 ring-2 ring-amber-300/40">
            <ShieldCheck className="w-8 h-8 stroke-[2.3]" />
          </div>
          <h1 className="text-xl font-black bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
            WDRTrustedFinance
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            বিশ্বস্ত অনলাইন ক্লাউড আর্নিং ও ইনভেস্টমেন্ট প্ল্যাটফর্ম
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 bg-slate-950 rounded-2xl border border-slate-800 mb-5">
          <button
            type="button"
            onClick={() => setTab('login')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              tab === 'login'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            লগইন (Login)
          </button>
          <button
            type="button"
            onClick={() => setTab('register')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              tab === 'register'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            নিবন্ধন (Register)
          </button>
        </div>

        {/* 100 Taka Welcome Banner on Register Mode */}
        {tab === 'register' && (
          <div className="mb-4 p-3 rounded-2xl bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-slate-900 border border-amber-500/40 flex items-center gap-2.5 text-xs text-amber-200 animate-in fade-in">
            <Gift className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <span className="font-extrabold text-amber-300 block">ওয়েলকাম বোনাস অফার:</span>
              <span>একাউন্ট করলেই সাথে সাথে ১০০ টাকা বোনাস একাউন্টে যোগ হবে!</span>
            </div>
          </div>
        )}

        {/* Login Form */}
        {tab === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                মোবাইল নম্বর:
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-bold font-mono">
                  +880
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  required
                  className="w-full pl-14 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-sm font-mono focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                পাসওয়ার্ড:
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="পাসওয়ার্ড লিখুন"
                  required
                  className="w-full px-3 py-2 pr-10 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-amber-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/20 active:scale-98 transition-transform"
            >
              লগইন করুন
            </button>

            {/* Quick Demo Access */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-amber-300 border border-amber-500/30 text-xs font-bold transition-all"
              >
                ১ ক্লিকে ডেমো টেস্ট একাউন্টে প্রবেশ
              </button>
            </div>
          </form>
        ) : (
          /* Registration Form: Clean, direct password registration without OTP */
          <form onSubmit={handleRegisterSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                মোবাইল নম্বর (১টি নম্বরে ১টি একাউন্ট):
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-bold font-mono">
                  +880
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  required
                  className="w-full pl-14 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-sm font-mono focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                লগইন পাসওয়ার্ড:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="কমপক্ষে ৬ ডিজিটের পাসওয়ার্ড"
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                কনফার্ম পাসওয়ার্ড:
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="আবারও পাসওয়ার্ড লিখুন"
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                আমন্ত্রণ কোড (Invitation Code):
              </label>
              <input
                type="text"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                placeholder="ইনভাইট কোড"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-amber-300 text-sm font-mono font-bold focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex items-center gap-2 pt-1 text-xs text-slate-300">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 rounded text-amber-500 bg-slate-950 border-slate-700"
              />
              <label htmlFor="terms">আমি প্ল্যাটফর্মের ব্যবহারের শর্তাবলীতে সম্মত</label>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/20 active:scale-98 transition-transform"
            >
              রেজিস্ট্রেশন সম্পন্ন করুন (৳১০০ বোনাস পান)
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
