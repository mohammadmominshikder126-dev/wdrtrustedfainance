import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Zap,
  Lock,
  CheckCircle2,
  AlertCircle,
  ShoppingBag,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { formatTaka, toBengaliNumber } from '../utils/urlHelpers';
import { DEMO_TASK_ITEMS } from '../data/mockData';

interface TaskViewProps {
  onTabChange: (tab: string) => void;
}

export const TaskView: React.FC<TaskViewProps> = ({ onTabChange }) => {
  const { currentUser, vipPackages, submitTask, addToast } = useApp();
  const [matchingIndex, setMatchingIndex] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const currentVip = vipPackages.find((v) => v.level === (currentUser?.vipLevel || 0));
  const isVipLocked = (currentUser?.vipLevel || 0) <= 0;

  // Task quota check
  const completedToday = currentUser?.tasksCompletedToday || 0;
  const maxTasks = 2; // Fixed: 2 tasks per 24 hours
  const remainingTasks = Math.max(0, maxTasks - completedToday);

  const handleStartTask = (taskIndex: number) => {
    if (isVipLocked) {
      addToast('টাস্ক সম্পন্ন করতে একটি ভিআইপি প্যাকেজ সক্রিয় করুন।', 'error');
      return;
    }

    if (remainingTasks <= 0) {
      addToast('আজকের নির্ধারিত ২টি টাস্ক ইতিমধ্যে সম্পন্ন হয়েছে! পরবর্তী টাস্ক ২৪ ঘণ্টা পর আনলক হবে।', 'info');
      return;
    }

    setMatchingIndex(taskIndex);
    setIsProcessing(true);

    // Simulate merchant order matching & submission animation
    setTimeout(() => {
      const targetTask = DEMO_TASK_ITEMS[taskIndex % DEMO_TASK_ITEMS.length];
      const res = submitTask(targetTask.id);
      setIsProcessing(false);
      setMatchingIndex(null);
    }, 1800);
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Header Banner */}
      <div className="p-4 rounded-3xl bg-gradient-to-br from-amber-600/20 via-slate-900 to-slate-950 border border-amber-500/30 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/30 ring-2 ring-amber-300/40">
              <Zap className="w-7 h-7 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-lg font-black text-amber-200">ক্লাউড টাস্ক সেন্টার</h2>
              <span className="text-xs text-slate-400">অর্ডার ম্যাচিং ও দৈনিক ইনকাম</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 block font-medium">বর্তমান লেভেল</span>
            <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold font-mono">
              VIP {currentUser?.vipLevel || 0}
            </span>
          </div>
        </div>

        {/* 2 Tasks Progress Bar */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-400">দৈনিক কাজের কোটা: </span>
            <span className="font-extrabold text-amber-400">
              {toBengaliNumber(completedToday)} / {toBengaliNumber(maxTasks)} টি সম্পন্ন
            </span>
          </div>
          <div className="text-right">
            <span className="text-slate-400">টাস্ক প্রতি লাভ: </span>
            <span className="font-extrabold text-emerald-400">
              {currentVip?.perTaskProfit ? formatTaka(currentVip.perTaskProfit) : '৳০'}
            </span>
          </div>
        </div>
      </div>

      {/* Locked Warning for VIP 0 */}
      {isVipLocked ? (
        <div className="p-5 rounded-2xl bg-rose-950/60 border border-rose-500/50 text-center">
          <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-2 border border-rose-500/40">
            <Lock className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-rose-200 mb-1">ভিআইপি প্যাকেজ প্রয়োজন!</h4>
          <p className="text-xs text-rose-300 leading-relaxed mb-4">
            টাস্ক সম্পন্ন করতে এবং প্রতিদিন নিশ্চিত ইনকাম করতে অন্তত একটি ভিআইপি প্যাকেজ কিনুন।
          </p>
          <button
            onClick={() => onTabChange('vip')}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/20 active:scale-95"
          >
            ভিআইপি প্যাকেজসমূহ দেখুন
          </button>
        </div>
      ) : remainingTasks <= 0 ? (
        <div className="p-5 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2 border border-emerald-500/40">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-emerald-200 mb-1">
            আজকের সকল টাস্ক সফলভাবে সম্পন্ন হয়েছে!
          </h4>
          <p className="text-xs text-emerald-300 leading-relaxed mb-1">
            আপনার দৈনিক ২টি টাস্ক সম্পন্ন হয়েছে এবং সম্পূর্ণ দৈনিক মুনাফা একাউন্টে যুক্ত হয়েছে।
          </p>
          <span className="text-[11px] text-amber-400 font-semibold flex items-center justify-center gap-1 mt-2">
            <Clock className="w-3.5 h-3.5" /> পরবর্তী টাস্ক আগামী ২৪ ঘণ্টা পর আনলক হবে
          </span>
        </div>
      ) : null}

      {/* Task Matching Cards */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-300 px-1">
          উপলব্ধ মার্চেন্ট অর্ডার টাস্ক ({toBengaliNumber(remainingTasks)} টি বাকি):
        </h3>

        {DEMO_TASK_ITEMS.slice(0, 2).map((item, idx) => {
          const isDone = completedToday > idx;
          const isCurrentMatching = matchingIndex === idx && isProcessing;

          return (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border transition-all ${
                isDone
                  ? 'bg-slate-950/60 border-slate-800 opacity-60'
                  : 'bg-slate-900 border-slate-850 hover:border-amber-500/40 shadow-lg'
              }`}
            >
              <div className="flex gap-3 items-center">
                <img
                  src={item.productImage}
                  alt={item.productName}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-xl object-cover border border-slate-800 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-[11px] text-amber-400 font-semibold mb-0.5">
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{item.merchantName}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-200 truncate mb-1">
                    {item.productName}
                  </h4>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 text-[11px]">
                      অর্ডার মূল্য: ৳{toBengaliNumber(item.orderPrice)}
                    </span>
                    <span className="text-emerald-400 font-bold">
                      কমিশন: {currentVip?.perTaskProfit ? formatTaka(currentVip.perTaskProfit) : '৳০'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-3 pt-2.5 border-t border-slate-850">
                {isDone ? (
                  <button
                    disabled
                    className="w-full py-2 rounded-xl bg-slate-800 text-slate-500 font-bold text-xs flex items-center justify-center gap-1.5 cursor-not-allowed"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>টাস্ক {toBengaliNumber(idx + 1)} সম্পন্ন হয়েছে</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleStartTask(idx)}
                    disabled={isVipLocked || isProcessing}
                    className={`w-full py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-98 ${
                      isCurrentMatching
                        ? 'bg-amber-600 text-slate-950 animate-pulse'
                        : isVipLocked
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                        : 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 text-slate-950 shadow-amber-500/20'
                    }`}
                  >
                    {isCurrentMatching ? (
                      <>
                        <Sparkles className="w-4 h-4 animate-spin" />
                        <span>ক্লাউড মার্চেন্ট অর্ডার ম্যাচিং হচ্ছে...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4" />
                        <span>
                          {isVipLocked ? 'লক (VIP প্রয়োজন)' : `টাস্ক ${toBengaliNumber(idx + 1)} সম্পন্ন করুন`}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Exact Task Rules Box as commanded by user */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/30 text-xs text-slate-300 leading-relaxed space-y-2">
        <h4 className="font-extrabold text-amber-300 text-sm flex items-center gap-1.5">
          <AlertCircle className="w-4 h-4 text-amber-400" />
          <span>টাস্ক নিয়মাবলী:</span>
        </h4>
        <p className="font-medium text-slate-200">
          প্রতিটি ভিআইপি সদস্যরা ২৪ ঘণ্টায় নির্ধারিত ২টি টাস্ক পাবে
        </p>
        <ul className="space-y-1.5 pl-1 text-[11px] text-slate-300">
          <li className="flex items-start gap-1.5">
            <span className="text-amber-400 font-bold">•</span>
            <span>প্রতিটি টাস্ক সফলভাবে সম্পন্ন করার সাথে সাথে স্বয়ংক্রিয়ভাবে আপনার ইনকাম বালেন্স এ যোগ হবে।</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-amber-400 font-bold">•</span>
            <span>উচ্চতর ভিআইপি প্যাকেজে ক্রয় করলে টাস্ক প্রতি ইনকাম বহুগুণ বৃদ্ধি পায়।</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
