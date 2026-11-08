import React, { useState } from 'react';
import {
  HelpCircle,
  ArrowDownLeft,
  ArrowUpRight,
  ShieldCheck,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  Lock,
  Headphones,
  Zap,
  Users
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface FAQViewProps {
  onTabChange?: (tab: string) => void;
}

export const FAQView: React.FC<FAQViewProps> = ({ onTabChange }) => {
  const { openModal, settings } = useApp();
  const [activeCategory, setActiveCategory] = useState<'all' | 'deposit' | 'withdraw'>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqItems = [
    {
      id: 1,
      category: 'deposit',
      q: 'বিকাশ দিয়ে কীভাবে রিচার্জ বা ডিপোজিট করব?',
      a: 'বিকাশ এ ক্যাশ আউট নয়, শুধু সেন্ড মানি (Send Money) করবেন। রিচার্জ পেজে দেওয়া বিকাশ পার্সোনাল নম্বরটি কপি করে আপনার বিকাশ অ্যাপের Send Money অপশনে গিয়ে নির্ধারিত পরিমাণ টাকা পাঠান। এরপর প্রাপ্ত ১০ সংখ্যার TrxID কপি করে রিচার্জ ফর্মে বসিয়ে সাবমিট করুন। ৫-১৫ মিনিটের মধ্যে আপনার অ্যাকাউন্টে ব্যালেন্স যুক্ত হবে।'
    },
    {
      id: 2,
      category: 'deposit',
      q: 'নগদ ও রকেট দিয়ে কীভাবে ডিপোজিট সম্পন্ন করব?',
      a: 'নগদ ও রকেটের ক্ষেত্রে দেওয়া নম্বরে Cash Out বা Send Money করে প্রাপ্ত Transaction ID (TrxID) এবং আপনার যে নম্বর থেকে টাকা পাঠিয়েছেন তা রিচার্জ ফর্মে লিখে জমা দিন। অ্যাডমিন যাচাই করে দ্রুত ব্যালেন্স অনুমোদন করে দেবে।'
    },
    {
      id: 3,
      category: 'deposit',
      q: 'সর্বনিম্ন কত টাকা রিচার্জ করা যায়?',
      a: 'প্ল্যাটফর্মে সর্বনিম্ন রিচার্জ পরিমাণ ৩০০ টাকা। তবে ভিআইপি প্যাকেজ কেনার জন্য সংশ্লিষ্ট প্যাকেজের মূল্য (যেমন VIP 1 এর জন্য ১,০০০ টাকা) একাউন্টে থাকতে হবে।'
    },
    {
      id: 4,
      category: 'withdraw',
      q: 'টাকা উত্তোলন (Withdraw) করার প্রধান শর্ত কী?',
      a: 'প্ল্যাটফর্মের নিরাপত্তা ও আর্থিক নীতি অনুযায়ী রিচার্জ না করা অব্দি কেউ টাকা উত্তোলন করতে পারবে না। উত্তোলন করতে হলে অবশ্যই একটি ভিআইপি প্যাকেজ (VIP 1 বা উচ্চতর) ক্রয় করতে হবে। প্যাকেজ সক্রিয় থাকলে যেকেউ যেকোনো সময় সরাসরি বিকাশ, নগদ বা রকেটে টাকা তুলে নিতে পারবেন।'
    },
    {
      id: 5,
      category: 'withdraw',
      q: 'উত্তোলনের আবেদন করার পর কতক্ষণে টাকা পাওয়া যায়?',
      a: 'উত্তোলন আবেদন করার পর সাধারণত ৫ থেকে ৩০ মিনিটের মধ্যে অ্যাডমিন টিম পেমেন্ট ট্রান্সফার সম্পন্ন করে। প্রতিদিন সকাল ৯:০০ টা থেকে রাত ১০:০০ টা পর্যন্ত উত্তোলন সেবা সক্রিয় থাকে।'
    },
    {
      id: 6,
      category: 'withdraw',
      q: 'সর্বনিম্ন কত টাকা উত্তোলন করা যায় এবং কোনো চার্জ আছে কি?',
      a: `প্ল্যাটফর্মে সর্বনিম্ন উত্তোলনের পরিমাণ ৫০০ টাকা। সফলভাবে পেমেন্ট সরাসরি আপনার অ্যাকাউন্টে কোনো হিডেন ফি ছাড়া পৌঁছে যায়।`
    },
    {
      id: 7,
      category: 'deposit',
      q: 'রিচার্জের টাকা যদি ১৫ মিনিটেও জমা না হয় তবে করণীয় কী?',
      a: 'যদি কোনো কারণে বিলম্ব হয়, সাথে সাথে আমাদের ২৪/৭ লাইভ চ্যাটে অথবা অফিসিয়াল টেলিগ্রাম সাপোর্ট এজেন্ট (সোফিয়া)-এর সাথে যোগাযোগ করে আপনার TrxID ও প্রেরক নম্বরটি দিন। অফিসার সাথে সাথে ম্যানুয়ালি ব্যালেন্স যোগ করে দেবেন।'
    },
    {
      id: 8,
      category: 'withdraw',
      q: 'উইথড্র অ্যাকাউন্ট বা ওয়ালেট নম্বর কীভাবে বাঁধব?',
      a: 'আপনার "আমার (Account)" পেজে গিয়ে "উইথড্র অ্যাকাউন্ট বাঁধুন" অপশনে ক্লিক করুন। আপনার বিকাশ, নগদ বা রকেট নম্বর এবং একটি ৬ ডিজিটের সিকিউরিটি পিন সেট করে সেভ করে রাখুন। এতে প্রতিবার উত্তোলনের সময় আর নম্বর টাইপ করতে হবে না।'
    }
  ];

  const filteredFaqs = faqItems.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <div className="space-y-4 pb-20 animate-in fade-in">
      {/* Header Banner */}
      <div className="p-4 rounded-3xl bg-gradient-to-br from-amber-600/25 via-slate-900 to-slate-950 border border-amber-500/30 shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/30">
            <HelpCircle className="w-7 h-7 stroke-[2.4]" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-amber-200">
              প্রশ্নোত্তর ও সহায়িকা (FAQ)
            </h2>
            <p className="text-xs text-slate-300">
              ডিপোজিট ও টাকা উত্তোলন সংক্রান্ত সাধারণ প্রশ্নের সমাধান
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex p-1 bg-slate-900 rounded-2xl border border-slate-800">
        <button
          onClick={() => setActiveCategory('all')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            activeCategory === 'all'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          সকল প্রশ্ন ({faqItems.length})
        </button>
        <button
          onClick={() => setActiveCategory('deposit')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1 transition-all ${
            activeCategory === 'deposit'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ArrowDownLeft className="w-3.5 h-3.5" />
          <span>রিচার্জ / ডিপোজিট</span>
        </button>
        <button
          onClick={() => setActiveCategory('withdraw')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1 transition-all ${
            activeCategory === 'withdraw'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ArrowUpRight className="w-3.5 h-3.5" />
          <span>টাকা উত্তোলন</span>
        </button>
      </div>

      {/* Crucial Guidelines Notice Card */}
      <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-amber-500/30 space-y-2">
        <div className="flex items-center gap-2 text-amber-300 text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
          <span>বিশেষ আর্থিক সতর্কতা ও নিয়মাবলী:</span>
        </div>
        <ul className="text-[11px] text-slate-300 space-y-1.5 pl-1 leading-relaxed">
          <li className="flex items-start gap-1.5">
            <span className="text-amber-400 font-bold">•</span>
            <span><strong className="text-amber-300">বিকাশ পেমেন্ট:</strong> বিকাশ এ ক্যাশ আউট করবেন না, শুধুমাত্র সেন্ড মানি (Send Money) করবেন।</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-amber-400 font-bold">•</span>
            <span><strong className="text-amber-300">উত্তোলনের নিয়ম:</strong> উত্তলন করতে একটি পেকেজ ক্রয় করুন এবং সফল ভাবে টাকা উত্তলন করে নিন। রিচার্জ না করা পর্যন্ত উত্তোলন লক থাকে।</span>
          </li>
        </ul>
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-2.5">
        {filteredFaqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={faq.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'bg-slate-900 border-amber-500/40 shadow-lg'
                  : 'bg-slate-950 border-slate-850 hover:border-slate-750'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full p-3.5 text-left flex items-start justify-between gap-3 text-xs sm:text-sm font-bold text-slate-200"
              >
                <div className="flex items-start gap-2.5">
                  <span className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] shrink-0 mt-0.5 ${
                    faq.category === 'deposit'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  }`}>
                    {faq.category === 'deposit' ? 'IN' : 'OUT'}
                  </span>
                  <span className="leading-snug">{faq.q}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 mt-1 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-amber-400' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 pb-3.5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/80">
                  <p className="bg-slate-950/60 p-3 rounded-xl border border-slate-850">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Action Footer */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-3">
        <p className="text-xs text-slate-300">
          আপনার প্রশ্নের উত্তর খুঁজে পাননি? আমাদের সাপোর্ট ডেস্কে কথা বলুন।
        </p>
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => openModal('liveChat')}
            className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md hover:bg-amber-400 active:scale-95 transition-transform"
          >
            <Headphones className="w-4 h-4" />
            <span>লাইভ চ্যাট সাপোর্ট</span>
          </button>
          <button
            onClick={() => openModal('recharge')}
            className="px-4 py-2 rounded-xl bg-slate-800 text-amber-300 border border-amber-500/30 font-bold text-xs flex items-center gap-1.5 hover:bg-slate-750 active:scale-95 transition-transform"
          >
            <ArrowDownLeft className="w-4 h-4" />
            <span>এখনই রিচার্জ করুন</span>
          </button>
        </div>
      </div>
    </div>
  );
};
