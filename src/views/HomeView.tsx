import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  UserPlus,
  CalendarCheck,
  Smartphone,
  Send,
  Zap,
  TrendingUp,
  Volume2,
  ChevronRight,
  ShieldCheck,
  Award
} from 'lucide-react';
import { formatTaka, toBengaliNumber, formatTelegramUrl } from '../utils/urlHelpers';
import { SAMPLE_LIVE_PAYOUTS } from '../data/mockData';
import { BannerSlider } from '../components/BannerSlider';

interface HomeViewProps {
  onTabChange: (tab: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onTabChange }) => {
  const {
    currentUser,
    settings,
    vipPackages,
    teamMembers,
    openModal,
    claimDailyCheckin
  } = useApp();

  const handleTelegramClick = () => {
    window.open(formatTelegramUrl(settings.telegramGroupUrl), '_blank');
  };

  const handleCheckinClick = () => {
    claimDailyCheckin();
  };

  // Count joined members for quick counter badge
  const joinedCount = teamMembers.length;

  return (
    <div className="space-y-4 pb-20">
      {/* 1. Dynamic Auto-moving Premium Banner Slider */}
      <BannerSlider />

      {/* 2. Live Notice Marquee Ticker */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/90 border border-amber-500/20 text-xs shadow-inner overflow-hidden">
        <div className="flex items-center gap-1 text-amber-400 font-bold shrink-0">
          <Volume2 className="w-4 h-4" />
          <span className="hidden xs:inline">নোটিশ:</span>
        </div>
        <div className="overflow-hidden relative w-full whitespace-nowrap">
          <div className="inline-block animate-marquee text-amber-200/90 font-medium">
            {settings.marqueeNotice}
          </div>
        </div>
      </div>

      {/* 3. Main Financial Balance Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/40 border border-amber-500/30 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 border border-amber-500/30">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block font-medium">মোট উপলব্ধ ব্যালেন্স</span>
              <span className="text-2xl font-black text-amber-300 tracking-tight">
                {formatTaka(currentUser?.balance || 0)}
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block font-medium">আজকের লাভ</span>
            <span className="text-sm font-extrabold text-emerald-400">
              +{formatTaka(currentUser?.todayProfit || 0)}
            </span>
          </div>
        </div>

        {/* Deposit & Withdraw Quick Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-3 pt-1">
          <button
            onClick={() => openModal('recharge')}
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 active:scale-98 transition-all"
          >
            <ArrowDownLeft className="w-4 h-4 stroke-[2.5]" />
            <span>টাকা রিচার্জ করুন</span>
          </button>

          <button
            onClick={() => openModal('withdraw')}
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-amber-300 border border-amber-500/30 font-bold text-xs sm:text-sm shadow-md active:scale-98 transition-all"
          >
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            <span>টাকা উত্তোলন (Withdraw)</span>
          </button>
        </div>
      </div>

      {/* 4. Quick Action Grid (With live joined count on Invite icon) */}
      <div className="grid grid-cols-4 gap-2.5">
        {/* Deposit */}
        <button
          onClick={() => openModal('recharge')}
          className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-center transition-all active:scale-95"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-1.5 border border-emerald-500/20">
            <ArrowDownLeft className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-200">রিচার্জ</span>
        </button>

        {/* Withdraw */}
        <button
          onClick={() => openModal('withdraw')}
          className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-center transition-all active:scale-95"
        >
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-1.5 border border-rose-500/20">
            <ArrowUpRight className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-200">উত্তোলন</span>
        </button>

        {/* Invite with Live Joined Count Badge as commanded */}
        <button
          onClick={() => openModal('teamInvite')}
          className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900 border border-amber-500/40 hover:border-amber-500 text-center transition-all active:scale-95 relative"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-1.5 border border-amber-500/30">
            <UserPlus className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-200">আমন্ত্রণ</span>
          {/* Joined Badge */}
          <span className="absolute -top-1.5 -right-1 px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black shadow-md shadow-amber-500/40 border border-amber-300">
            {toBengaliNumber(joinedCount)} জন
          </span>
        </button>

        {/* Daily Checking Bonus */}
        <button
          onClick={handleCheckinClick}
          className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-center transition-all active:scale-95"
        >
          <div className="w-10 h-10 rounded-xl bg-yellow-500/10 text-yellow-400 flex items-center justify-center mb-1.5 border border-yellow-500/20">
            <CalendarCheck className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-200">চেকিং (৳২০)</span>
        </button>

        {/* App Download */}
        <button
          onClick={() => openModal('downloadApp')}
          className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-center transition-all active:scale-95"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-1.5 border border-blue-500/20">
            <Smartphone className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-200">অ্যাপ ডাউনলোড</span>
        </button>

        {/* Official Telegram Group */}
        <button
          onClick={handleTelegramClick}
          className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-center transition-all active:scale-95"
        >
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-1.5 border border-cyan-500/20">
            <Send className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-200">টেলিগ্রাম</span>
        </button>

        {/* Start Tasks */}
        <button
          onClick={() => onTabChange('task')}
          className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-center transition-all active:scale-95"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-1.5 border border-purple-500/20">
            <Zap className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-200">টাস্ক সেন্টার</span>
        </button>

        {/* VIP Hall */}
        <button
          onClick={() => onTabChange('vip')}
          className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-center transition-all active:scale-95"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-1.5 border border-amber-500/20">
            <Award className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-200">ভিআইপি হল</span>
        </button>
      </div>

      {/* 5. VIP Hall Showcase (With pure Bengali numbers and descriptions for elders) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold text-amber-200">ভিআইপি ইনভেস্টমেন্ট হল</h3>
          </div>
          <button
            onClick={() => onTabChange('vip')}
            className="flex items-center text-xs text-amber-400 font-semibold hover:underline"
          >
            <span>সকল প্ল্যান</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {vipPackages.filter((p) => p.level > 0).map((pkg) => (
            <div
              key={pkg.level}
              onClick={() => onTabChange('vip')}
              className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 cursor-pointer transition-all shadow-md group relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  ভিআইপি {toBengaliNumber(pkg.level)}
                </span>
                <span className="text-xs text-emerald-400 font-bold">
                  {pkg.dailyProfitBn}/দিন
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-200 mb-1">{pkg.titleBn}</h4>
              <div className="text-[11px] text-slate-400 mb-2">
                মূল্য: <span className="font-bold text-amber-400">{pkg.priceBn}</span>
              </div>
              <div className="text-[10px] text-slate-400">
                প্রতিদিন ২টি কাজ | প্রতি কাজে {pkg.perTaskProfitBn}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Live Member Withdrawal Records (Smooth Vertical Moving Animation as commanded) */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl overflow-hidden">
        <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <h4 className="text-xs font-bold text-slate-200">সদস্যদের সাম্প্রতিক লাইভ উত্তোলন</h4>
          </div>
          <span className="text-[10px] text-emerald-400 font-semibold">রিয়েল-টাইম পেমেন্ট</span>
        </div>

        {/* Animated Moving Payout Container */}
        <div className="relative h-44 overflow-hidden">
          <div className="animate-scroll-payout space-y-2">
            {/* Render 2 sets to make the infinite vertical loop seamless */}
            {[...SAMPLE_LIVE_PAYOUTS, ...SAMPLE_LIVE_PAYOUTS].map((payout, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded-xl bg-slate-950/70 border border-slate-850 text-xs"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px] font-bold">
                    {payout.method === 'bKash' ? 'বিকাশ' : payout.method === 'Nagad' ? 'নগদ' : 'USDT'}
                  </div>
                  <div>
                    <span className="font-mono text-slate-300 font-bold block">{payout.phone}</span>
                    <span className="text-[9px] text-slate-500">{payout.time}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-black text-emerald-400">
                    +{formatTaka(payout.amount)}
                  </span>
                  <span className="text-[9px] text-emerald-500 block font-medium">সফলভাবে পেইড</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 7. Partner & Security Trust Badges */}
      <div className="pt-2 text-center text-slate-500 text-xs">
        <p className="text-[11px] font-medium text-slate-400 mb-2">অনুমোদিত পেমেন্ট ও পার্টনার ব্র্যান্ডস</p>
        <div className="flex flex-wrap items-center justify-center gap-3 text-slate-400 text-xs font-semibold">
          <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800">bKash Agent</span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800">Nagad Merchant</span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800">Rocket Pay</span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800">Binance TRC20</span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800">Daraz Cloud</span>
        </div>
        <p className="text-[10px] text-slate-600 mt-3">
          © 2026 WDRTrustedFinance. সকল স্বত্ব সংরক্ষিত।
        </p>
      </div>
    </div>
  );
};
