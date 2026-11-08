import React from 'react';
import { useApp } from '../../context/AppContext';
import { Send, Headphones, X, ShieldCheck, ExternalLink } from 'lucide-react';
import { formatTelegramUrl } from '../../utils/urlHelpers';

export const RegistrationSuccessModal: React.FC = () => {
  const { closeModal, settings, currentUser } = useApp();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      {/* Compact Square Container floating in center of display as commanded */}
      <div className="w-[330px] sm:w-[350px] aspect-square bg-slate-900/95 border border-amber-500/40 rounded-3xl p-5 shadow-2xl flex flex-col justify-between relative text-center">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Header */}
        <div className="pt-1">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-slate-950 mx-auto mb-2 shadow-lg shadow-amber-500/30">
            <ShieldCheck className="w-6 h-6 stroke-[2.3]" />
          </div>
          <h3 className="text-base font-extrabold text-amber-300 leading-tight">
            অফিশিয়াল নোটিফিকেশন
          </h3>
          <p className="text-[11px] text-slate-300 mt-0.5">
            WDRTrustedFinance এ স্বাগতম! (ID: {currentUser?.id || 'WDR'})
          </p>
        </div>

        {/* Center Actions: Telegram Channel & Customer Service Links */}
        <div className="space-y-2.5 my-1">
          {/* Telegram Channel Link */}
          <a
            href={formatTelegramUrl(settings.telegramChannelUrl)}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between p-2.5 rounded-2xl bg-gradient-to-r from-cyan-950/80 to-slate-900 border border-cyan-500/40 text-cyan-200 hover:border-cyan-300 transition-all text-xs font-bold shadow-md"
          >
            <div className="flex items-center gap-2 text-left">
              <div className="w-7 h-7 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                <Send className="w-3.5 h-3.5" />
              </div>
              <div className="truncate">
                <span className="block text-cyan-200 font-bold text-xs truncate">অফিসিয়াল টেলিগ্রাম চ্যানেল</span>
                <span className="text-[9px] text-cyan-400 block">পেমেন্ট প্রুফ ও আপডেট</span>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400 shrink-0 ml-1" />
          </a>

          {/* Customer Service Support Sophia Link */}
          <a
            href={formatTelegramUrl(settings.supportSophiaTelegram)}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between p-2.5 rounded-2xl bg-gradient-to-r from-amber-950/80 to-slate-900 border border-amber-500/40 text-amber-200 hover:border-amber-300 transition-all text-xs font-bold shadow-md"
          >
            <div className="flex items-center gap-2 text-left">
              <div className="w-7 h-7 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                <Headphones className="w-3.5 h-3.5" />
              </div>
              <div className="truncate">
                <span className="block text-amber-200 font-bold text-xs truncate">কাস্টমার সার্ভিস (Sophia)</span>
                <span className="text-[9px] text-amber-400 block">২৪/৭ সরাসরি সহায়তা ডেস্ক</span>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-amber-400 shrink-0 ml-1" />
          </a>
        </div>

        {/* Bottom Dismiss Button */}
        <button
          onClick={closeModal}
          className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 text-slate-950 font-extrabold text-xs shadow-md shadow-amber-500/20 active:scale-98 transition-all"
        >
          বুঝেছি, প্রবেশ করুন
        </button>
      </div>
    </div>
  );
};
