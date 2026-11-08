import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Headphones,
  Send,
  MessageSquare,
  ExternalLink,
  ChevronDown,
  ShieldCheck,
  Bot
} from 'lucide-react';
import { formatTelegramUrl, formatWhatsAppUrl } from '../utils/urlHelpers';

export const ServiceView: React.FC = () => {
  const { settings, openModal } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'টাকা রিচার্জ করার পর কতক্ষণে একাউন্টে যোগ হবে?',
      a: 'বিকাশ, নগদ বা রকেটে টাকা পাঠিয়ে TrxID সাবমিট করার পর ৫ থেকে ১৫ মিনিটের মধ্যে অ্যাডমিন ভেরিফাই করে ব্যালেন্সে যোগ করে দেবে।'
    },
    {
      q: 'টাকা উত্তোলনের শর্ত ও নিয়মাবলী কী?',
      a: 'প্ল্যাটফর্মের নিরাপত্তা নিয়ম অনুসারে টাকা উত্তোলন করার জন্য অন্তত একটি ভিআইপি প্যাকেজ (VIP 1+) সক্রিয় থাকতে হবে। সর্বনিম্ন ৫০০ টাকা হলে যেকোনো সময় উত্তোলনের আবেদন করা যাবে।'
    },
    {
      q: 'দৈনিক চেকিং বোনাস কারা পাবেন?',
      a: 'যেসকল সদস্য ভিআইপি প্যাকেজ কিনেছেন তারা প্রতিদিন ২০ টাকা করে দৈনিক চেকিং বোনাস ২৪ ঘণ্টায় একবার ক্লেইম করতে পারবেন।'
    },
    {
      q: 'রেফারেল কমিশন কীভাবে পাওয়া যায়?',
      a: 'আপনার বন্ধুদের রেফারেল লিংক দিলে তারা একাউন্ট খুললে এবং কাজ বা ডিপোজিট করলে ৩ স্তরে কমিশন পাবেন: ১ম স্তরে ২৫%, ২য় স্তরে ৫% এবং ৩য় স্তরে ২% তাৎক্ষণিক কমিশন।'
    }
  ];

  return (
    <div className="space-y-4 pb-20">
      {/* Service Header */}
      <div className="p-4 rounded-3xl bg-gradient-to-br from-amber-600/20 via-slate-900 to-slate-950 border border-amber-500/30 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/30">
            <Headphones className="w-7 h-7 stroke-[2.5]" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-amber-200">
              গ্রাহক সেবা ও সহায়তা কেন্দ্র
            </h2>
            <p className="text-xs text-slate-300">
              ২৪/৭ যেকোনো সমস্যা বা প্রশ্নের জন্য আমাদের সাথে যোগাযোগ করুন
            </p>
          </div>
        </div>
      </div>

      {/* Support Direct Action Cards with proper working redirection */}
      <div className="grid grid-cols-1 gap-3">
        {/* 24/7 Live Chat Desk */}
        <div
          onClick={() => openModal('liveChat')}
          className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 cursor-pointer transition-all shadow-md flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/30 group-hover:scale-105 transition-transform">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <span>২৪/৭ লাইভ চ্যাট সাপোর্ট</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </h3>
              <p className="text-xs text-slate-400">সাপোর্ট অফিসার সোফিয়ার সাথে সরাসরি চ্যাট</p>
            </div>
          </div>
          <span className="px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold">
            শুরু করুন
          </span>
        </div>

        {/* Official Telegram Group */}
        <a
          href={formatTelegramUrl(settings.telegramGroupUrl)}
          target="_blank"
          rel="noreferrer"
          className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition-all shadow-md flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/30 group-hover:scale-105 transition-transform">
              <Send className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <span>অফিসিয়াল টেলিগ্রাম গ্রুপ</span>
              </h3>
              <p className="text-xs text-slate-400">সদস্যদের সক্রিয় কমিউনিটি ও প্রশ্নোত্তর</p>
            </div>
          </div>
          <span className="flex items-center gap-1 text-xs text-cyan-400 font-bold group-hover:underline">
            <span>যুক্ত হন</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </span>
        </a>

        {/* Official Telegram Channel */}
        <a
          href={formatTelegramUrl(settings.telegramChannelUrl)}
          target="_blank"
          rel="noreferrer"
          className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 cursor-pointer transition-all shadow-md flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/30 group-hover:scale-105 transition-transform">
              <Send className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">অফিসিয়াল ব্রডকাস্ট চ্যানেল</h3>
              <p className="text-xs text-slate-400">দৈনিক পেমেন্ট প্রুফ ও নোটিশ বোর্ড</p>
            </div>
          </div>
          <span className="flex items-center gap-1 text-xs text-blue-400 font-bold group-hover:underline">
            <span>সাবস্ক্রাইব</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </span>
        </a>

        {/* WhatsApp Help Desk */}
        {settings.whatsappSupportNumber && (
          <a
            href={formatWhatsAppUrl(settings.whatsappSupportNumber)}
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition-all shadow-md flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/30 group-hover:scale-105 transition-transform">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-100">হোয়াটসঅ্যাপ সাপোর্ট হেল্পডেস্ক</h3>
                <p className="text-xs text-slate-400">জরুরি সহায়তা ও বিকাশ/নগদ ভেরিফিকেশন</p>
              </div>
            </div>
            <span className="flex items-center gap-1 text-xs text-emerald-400 font-bold group-hover:underline">
              <span>মেসেজ দিন</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </span>
          </a>
        )}
      </div>

      {/* Frequently Asked Questions (FAQ) Accordion */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <h3 className="text-xs font-bold text-slate-300">সাধারণ জিজ্ঞাসা (FAQ):</h3>
        <div className="space-y-2">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-3 text-left flex items-center justify-between text-xs font-bold text-slate-200"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform ${
                    openFaq === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-3 pb-3 text-[11px] text-slate-400 leading-relaxed border-t border-slate-850 pt-2">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
