import React from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  CreditCard,
  History,
  Users,
  ShieldCheck,
  Smartphone,
  LogOut,
  Copy,
  ChevronRight,
  Sparkles,
  Award
} from 'lucide-react';
import { formatTaka, toBengaliNumber } from '../utils/urlHelpers';

interface AccountViewProps {
  onTabChange: (tab: string) => void;
}

export const AccountView: React.FC<AccountViewProps> = ({ onTabChange }) => {
  const { currentUser, logout, openModal, addToast, teamMembers } = useApp();

  const handleCopyId = () => {
    if (currentUser?.id) {
      navigator.clipboard.writeText(currentUser.id);
      addToast('ইউজার আইডি কপি হয়েছে!', 'success');
    }
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Profile Card Header */}
      <div className="p-4 rounded-3xl bg-gradient-to-br from-amber-600/30 via-slate-900 to-slate-950 border border-amber-500/40 shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-slate-950 shadow-xl shadow-amber-500/30 ring-2 ring-amber-300/40">
            <User className="w-8 h-8 stroke-[2.3]" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-base font-extrabold text-white font-mono">
                {currentUser?.phone || '01XXXXXXXXX'}
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black">
                VIP {toBengaliNumber(currentUser?.vipLevel || 0)}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-mono">ID: {currentUser?.id}</span>
              <button
                onClick={handleCopyId}
                className="text-amber-400 hover:text-amber-300 p-0.5 rounded"
                title="কপি করুন"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Financial Highlights */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3.5 border-t border-slate-800 text-center">
          <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">মোট ব্যালেন্স</span>
            <span className="text-xs font-black text-amber-300">
              {formatTaka(currentUser?.balance || 0)}
            </span>
          </div>

          <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">আজকের আয়</span>
            <span className="text-xs font-black text-emerald-400">
              +{formatTaka(currentUser?.todayProfit || 0)}
            </span>
          </div>

          <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">টিম কমিশন</span>
            <span className="text-xs font-black text-amber-400">
              {formatTaka(
                teamMembers.reduce((sum, m) => sum + m.commissionEarned, 0)
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Main Account Action Links */}
      <div className="p-2 rounded-2xl bg-slate-900 border border-slate-800 divide-y divide-slate-850">
        {/* Team Center with live member count */}
        <button
          onClick={() => openModal('teamInvite')}
          className="w-full p-3 flex items-center justify-between text-left hover:bg-slate-850/50 rounded-xl transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-200 block">টিম ও রেফারেল সেন্টার</span>
              <span className="text-[10px] text-slate-400">৩ স্তরের কমিশন (২৫%, ৫%, ২%)</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold">
              {toBengaliNumber(teamMembers.length)} জন
            </span>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </div>
        </button>

        {/* Financial Records */}
        <button
          onClick={() => openModal('financialRecords')}
          className="w-full p-3 flex items-center justify-between text-left hover:bg-slate-850/50 rounded-xl transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
              <History className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-200 block">আর্থিক লেনদেনের খতিয়ান</span>
              <span className="text-[10px] text-slate-400">রিচার্জ, উত্তোলন ও বোনাস রেকর্ড</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500" />
        </button>

        {/* Bind Withdrawal Account */}
        <button
          onClick={() => openModal('bindWallet')}
          className="w-full p-3 flex items-center justify-between text-left hover:bg-slate-850/50 rounded-xl transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-200 block">উইথড্র অ্যাকাউন্ট বাঁধুন</span>
              <span className="text-[10px] text-slate-400">
                {currentUser?.walletAddress?.number
                  ? `${currentUser.walletAddress.method} (${currentUser.walletAddress.number})`
                  : 'বিকাশ, নগদ, রকেট ওয়ালেট ও পিন সেভ করুন'}
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500" />
        </button>

        {/* VIP Packages Hall */}
        <button
          onClick={() => onTabChange('vip')}
          className="w-full p-3 flex items-center justify-between text-left hover:bg-slate-850/50 rounded-xl transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-yellow-500/10 text-yellow-400 flex items-center justify-center border border-yellow-500/20">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-200 block">ভিআইপি প্যাকেজ আপগ্রেড</span>
              <span className="text-[10px] text-slate-400">উচ্চতর প্ল্যানে দৈনিক বেশি আয়</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500" />
        </button>

        {/* Download App */}
        <button
          onClick={() => openModal('downloadApp')}
          className="w-full p-3 flex items-center justify-between text-left hover:bg-slate-850/50 rounded-xl transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-200 block">অফিশিয়াল অ্যাপ ডাউনলোড</span>
              <span className="text-[10px] text-slate-400">অ্যান্ড্রয়েড APK সরাসরি ইনস্টল করুন</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500" />
        </button>
      </div>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="w-full py-3 rounded-2xl bg-slate-900 border border-rose-500/30 text-rose-400 hover:bg-rose-950/30 font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-98"
      >
        <LogOut className="w-4 h-4" />
        <span>অ্যাকাউন্ট থেকে লগআউট করুন</span>
      </button>

      {/* Secret Admin link footnote (subtle and unobtrusive) */}
      <div className="text-center pt-2">
        <a
          href="#admin"
          className="text-[10px] text-slate-600 hover:text-amber-500/60 transition-colors"
        >
          মাস্টার কন্ট্রোল
        </a>
      </div>
    </div>
  );
};
