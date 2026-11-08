import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Copy, Check, Share2, Users, ArrowUpRight, TrendingUp, Layers } from 'lucide-react';
import { toBengaliNumber, formatTaka } from '../../utils/urlHelpers';

export const TeamInviteModal: React.FC = () => {
  const { closeModal, currentUser, teamMembers, addToast } = useApp();
  const [activeLevel, setActiveLevel] = useState<1 | 2 | 3>(1);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Direct registration link format: ?invite=CODE&tab=register
  const inviteCode = currentUser?.inviteCode || 'WDR9922';
  const origin = window.location.origin;
  const inviteUrl = `${origin}/?invite=${inviteCode}&tab=register`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopiedLink(true);
    addToast('রেফারেল লিংক কপি হয়েছে!', 'success');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(inviteCode);
    setCopiedCode(true);
    addToast('ইনভাইটেশন কোড কপি হয়েছে!', 'success');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const text = `🎉 WDRTrustedFinance এ যোগ দিন এবং একাউন্ট করলেই ফ্রি ৳১০০ ওয়েলকাম বোনাস নিন! প্রতিদিন ২টি টাস্ক ও বিকাশ/নগদে ১০০% নিশ্চয়তায় উইথড্র নিন। রেফারেল লিংক: ${inviteUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleShareTelegram = () => {
    const text = `🎉 WDRTrustedFinance - রেজিস্ট্রেশন করলেই ৳১০০ বোনাস! জয়েন করুন: ${inviteUrl}`;
    window.open(`https://t.me/share/url?url=${encodeURIComponent(inviteUrl)}&text=${encodeURIComponent(text)}`, '_blank');
  };

  // Filter members by level
  const filteredMembers = teamMembers.filter((m) => m.level === activeLevel);

  // Totals
  const totalDepositForLevel = filteredMembers.reduce((sum, m) => sum + m.totalDeposit, 0);
  const totalWithdrawForLevel = filteredMembers.reduce((sum, m) => sum + m.totalWithdraw, 0);
  const totalCommissionForLevel = filteredMembers.reduce((sum, m) => sum + m.commissionEarned, 0);

  const levelPercent = activeLevel === 1 ? '২৫%' : activeLevel === 2 ? '৫%' : '২%';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-md bg-slate-900 border border-amber-500/30 rounded-3xl p-5 shadow-2xl max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-amber-300">টিম ও রেফারেল সেন্টার</h3>
              <span className="text-[11px] text-slate-400">মোট রেফার মেম্বার: {toBengaliNumber(teamMembers.length)} জন</span>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Invite Link & Code Card */}
        <div className="my-4 p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-slate-950 to-slate-900 border border-amber-500/30">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-xs text-slate-400 block">আপনার ইনভাইটেশন কোড:</span>
              <span className="text-xl font-black text-amber-300 font-mono tracking-wider">{inviteCode}</span>
            </div>
            <button
              onClick={handleCopyCode}
              type="button"
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-bold border border-amber-500/30"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'কপি' : 'কোড কপি'}</span>
            </button>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs text-slate-400 block">রেফারেল লিংক (ক্লিক করলে সরাসরি রেজিস্ট্রেশন):</span>
            <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-950 border border-slate-800">
              <input
                type="text"
                readOnly
                value={inviteUrl}
                className="flex-1 bg-transparent text-[11px] text-amber-200/90 font-mono truncate focus:outline-none"
              />
              <button
                onClick={handleCopyLink}
                className="px-2.5 py-1 rounded-md bg-amber-500 text-slate-950 text-xs font-bold shrink-0 hover:bg-amber-400"
              >
                {copiedLink ? 'কপি হয়েছে' : 'লিংক কপি'}
              </button>
            </div>
          </div>

          {/* Social Share Buttons */}
          <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-800">
            <button
              onClick={handleShareWhatsApp}
              className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/70 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition-all"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>WhatsApp শেয়ার</span>
            </button>
            <button
              onClick={handleShareTelegram}
              className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-cyan-950/70 hover:bg-cyan-900/70 text-cyan-300 border border-cyan-500/30 text-xs font-bold transition-all"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Telegram শেয়ার</span>
            </button>
          </div>
        </div>

        {/* 3 Level Commission Info Box as Commanded */}
        <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 mb-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 mb-2">
            <TrendingUp className="w-4 h-4" />
            <span>৩ স্তরের আকর্ষণীয় রেফারেল কমিশন হার:</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <span className="text-[10px] text-slate-400 block">১ম স্তর (সরাসরি)</span>
              <span className="text-base font-extrabold text-amber-400">২৫%</span>
            </div>
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <span className="text-[10px] text-slate-400 block">২য় স্তর (টিম)</span>
              <span className="text-base font-extrabold text-amber-400">৫%</span>
            </div>
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <span className="text-[10px] text-slate-400 block">৩য় স্তর (নেটওয়ার্ক)</span>
              <span className="text-base font-extrabold text-amber-400">২%</span>
            </div>
          </div>
        </div>

        {/* 3 Level Tabs to Inspect Level Members as Commanded */}
        <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800 mb-3">
          {([1, 2, 3] as const).map((lvl) => {
            const count = teamMembers.filter((m) => m.level === lvl).length;
            return (
              <button
                key={lvl}
                onClick={() => setActiveLevel(lvl)}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeLevel === lvl
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                লেভেল {toBengaliNumber(lvl)} ({toBengaliNumber(count)})
              </button>
            );
          })}
        </div>

        {/* Level Stats Summary as Commanded (Total Deposit, Total Withdraw, Total Members) */}
        <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-950/80 border border-slate-800 mb-3 text-center">
          <div>
            <span className="text-[10px] text-slate-400 block">সদস্য সংখ্যা</span>
            <span className="text-xs font-extrabold text-slate-100">
              {toBengaliNumber(filteredMembers.length)} জন
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block">মোট ডিপোজিট</span>
            <span className="text-xs font-extrabold text-emerald-400">
              {formatTaka(totalDepositForLevel)}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block">মোট উত্তোলন</span>
            <span className="text-xs font-extrabold text-rose-400">
              {formatTaka(totalWithdrawForLevel)}
            </span>
          </div>
        </div>

        {/* Member List Details */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 px-1">
            <span>লেভেল {toBengaliNumber(activeLevel)} এর সদস্য তালিকা ({levelPercent} কমিশন)</span>
            <span>অর্জিত কমিশন: {formatTaka(totalCommissionForLevel)}</span>
          </div>

          {filteredMembers.length === 0 ? (
            <div className="p-6 text-center rounded-2xl bg-slate-950/40 border border-slate-800">
              <Layers className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-xs text-slate-400">এই লেভেলে এখনো কোনো সদস্য যোগ দেননি।</p>
              <p className="text-[11px] text-amber-400 mt-1">আপনার রেফারেল লিংক শেয়ার করে টিম তৈরি করুন!</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-bold text-slate-200">{member.phone}</span>
                      <span className="px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-bold">
                        VIP {member.vipLevel}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500">যোগদান: {member.joinedAt}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] text-emerald-400 font-bold block">
                      ডিপোজিট: {formatTaka(member.totalDeposit)}
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      উত্তোলন: {formatTaka(member.totalWithdraw)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
