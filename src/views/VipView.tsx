import React from 'react';
import { useApp } from '../context/AppContext';
import { Award, Check, Zap, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { toBengaliNumber } from '../utils/urlHelpers';

interface VipViewProps {
  onTabChange: (tab: string) => void;
}

export const VipView: React.FC<VipViewProps> = ({ onTabChange }) => {
  const { currentUser, vipPackages, buyVipPackage, openModal } = useApp();

  const handleBuy = (level: number) => {
    const pkg = vipPackages.find((p) => p.level === level);
    if (!pkg) return;

    if ((currentUser?.balance || 0) < pkg.price) {
      openModal('recharge');
      return;
    }

    buyVipPackage(level);
  };

  return (
    <div className="space-y-4 pb-20">
      {/* VIP Hall Header */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-amber-600/20 via-slate-900 to-amber-950/30 border border-amber-500/30 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/30">
            <Award className="w-7 h-7 stroke-[2.5]" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-amber-200">
              ভিআইপি মেম্বারশিপ হল
            </h2>
            <p className="text-xs text-slate-300">
              উচ্চতর ভিআইপি প্যাকেজে আপগ্রেড করুন ও প্রতিদিনের আয় বহুগুণ বাড়ান
            </p>
          </div>
        </div>
      </div>

      {/* Package Cards List (With Bengali Numbers and Elder-Friendly Copy as commanded) */}
      <div className="space-y-3.5">
        {vipPackages.filter((p) => p.level > 0).map((pkg) => {
          const isCurrent = (currentUser?.vipLevel || 0) === pkg.level;
          const isHigher = (currentUser?.vipLevel || 0) > pkg.level;

          return (
            <div
              key={pkg.level}
              className={`p-4 rounded-3xl border transition-all duration-200 relative overflow-hidden shadow-xl ${
                isCurrent
                  ? 'bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 border-amber-400 ring-2 ring-amber-500/20'
                  : 'bg-slate-900 border-slate-800 hover:border-amber-500/40'
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-xl bg-amber-500 text-slate-950 font-black text-xs shadow-md shadow-amber-500/20">
                    ভিআইপি {toBengaliNumber(pkg.level)}
                  </span>
                  <h3 className="text-sm font-bold text-slate-100">{pkg.titleBn}</h3>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block font-medium">প্যাকেজের মূল্য</span>
                  <span className="text-base font-extrabold text-amber-400 font-mono">
                    {pkg.priceBn}
                  </span>
                </div>
              </div>

              {/* Package Details Grid (Bengali text and numbers) */}
              <div className="grid grid-cols-3 gap-2 my-3.5 text-center">
                <div className="p-2 rounded-2xl bg-slate-950/70 border border-slate-850">
                  <span className="text-[10px] text-slate-400 block mb-0.5">প্রতিদিনের কাজ</span>
                  <span className="text-xs font-bold text-slate-200 flex items-center justify-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    {toBengaliNumber(pkg.dailyTasks)} টি কাজ
                  </span>
                </div>

                <div className="p-2 rounded-2xl bg-slate-950/70 border border-slate-850">
                  <span className="text-[10px] text-slate-400 block mb-0.5">প্রতিদিনের মোট লাভ</span>
                  <span className="text-xs font-extrabold text-emerald-400">
                    +{pkg.dailyProfitBn}
                  </span>
                </div>

                <div className="p-2 rounded-2xl bg-slate-950/70 border border-slate-850">
                  <span className="text-[10px] text-slate-400 block mb-0.5">প্যাকেজের মেয়াদ</span>
                  <span className="text-xs font-bold text-slate-200 flex items-center justify-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    {pkg.validityBn}
                  </span>
                </div>
              </div>

              {/* Simple Clear Description */}
              <p className="text-xs text-amber-200/90 font-medium bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20 mb-3.5">
                {pkg.descriptionBn}
              </p>

              {/* Action Button */}
              {isCurrent ? (
                <div className="w-full py-2.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>বর্তমানে এই প্যাকেজটি চালু আছে</span>
                </div>
              ) : (
                <button
                  onClick={() => handleBuy(pkg.level)}
                  className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/25 active:scale-98 transition-all flex items-center justify-center gap-2"
                >
                  <Award className="w-4 h-4" />
                  <span>এখনই কিনুন ({pkg.priceBn})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Trust Notice */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center text-xs text-slate-400 space-y-1">
        <p className="font-semibold text-slate-300 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>১০০% সুরক্ষিত ও নির্ভরযোগ্য ইনভেস্টমেন্ট সিস্টেম</span>
        </p>
        <p className="text-[11px] leading-relaxed">
          যেকোনো প্যাকেজ সক্রিয় করার সাথে সাথে আপনার উত্তোলন সুবিধা আজীবনের জন্য উন্মুক্ত হয়ে যাবে।
        </p>
      </div>
    </div>
  );
};
