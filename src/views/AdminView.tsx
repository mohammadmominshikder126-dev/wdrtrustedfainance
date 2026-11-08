import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  CreditCard,
  Image,
  Users,
  Send,
  CheckCircle2,
  XCircle,
  Plus,
  Trash2,
  ExternalLink,
  Edit,
  DollarSign,
  AlertTriangle,
  Lock,
  LogOut,
  Save,
  MessageSquare,
  SendHorizontal,
  Award
} from 'lucide-react';
import { formatTaka, toBengaliNumber, formatTelegramUrl, formatWhatsAppUrl } from '../utils/urlHelpers';

export const AdminView: React.FC = () => {
  const {
    isAdminAuthenticated,
    adminLogin,
    adminLogout,
    settings,
    updateSettings,
    paymentGateways,
    updatePaymentGateways,
    banners,
    updateBanners,
    vipPackages,
    updateVipPackages,
    transactions,
    approveTransaction,
    rejectTransaction,
    allUsers,
    adjustUserBalance,
    setUserExactBalance,
    setUserVipLevel,
    resetUserTasks,
    toggleUserBan,
    addNewUserByAdmin,
    chatMessages,
    sendAdminChatMessage,
    clearChatHistory,
    addToast
  } = useApp();

  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'payments' | 'packages' | 'banners' | 'users' | 'links' | 'approvals' | 'chat' | 'settings'>('payments');
  const [adminReplyText, setAdminReplyText] = useState('');
  const [includeLinksInReply, setIncludeLinksInReply] = useState(false);

  // Form states for settings
  const [siteName, setSiteName] = useState(settings.siteName);
  const [marqueeNotice, setMarqueeNotice] = useState(settings.marqueeNotice);
  const [telegramGroup, setTelegramGroup] = useState(settings.telegramGroupUrl);
  const [telegramChannel, setTelegramChannel] = useState(settings.telegramChannelUrl);
  const [sophiaTelegram, setSophiaTelegram] = useState(settings.supportSophiaTelegram);
  const [whatsappNumber, setWhatsappNumber] = useState(settings.whatsappSupportNumber);

  // New User Form State
  const [newUserPhone, setNewUserPhone] = useState('');
  const [newUserBalance, setNewUserBalance] = useState(500);
  const [newUserVip, setNewUserVip] = useState(1);

  // User Exact Balance State for inline editing
  const [editingBalanceUserId, setEditingBalanceUserId] = useState<string | null>(null);
  const [exactBalanceInput, setExactBalanceInput] = useState<number>(0);

  // Gateway form state
  const [localGateways, setLocalGateways] = useState(paymentGateways);

  React.useEffect(() => {
    setLocalGateways(paymentGateways);
  }, [paymentGateways]);

  // Banner form state
  const [localBanners, setLocalBanners] = useState(banners);
  const [newBannerTitle, setNewBannerTitle] = useState('');
  const [newBannerSubtitle, setNewBannerSubtitle] = useState('');
  const [newBannerTag, setNewBannerTag] = useState('HOT');
  const [newBannerImg, setNewBannerImg] = useState('');

  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-sm bg-slate-900 border border-amber-500/40 rounded-3xl p-6 shadow-2xl text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-slate-950 mx-auto mb-4 shadow-xl shadow-amber-500/30">
            <Lock className="w-8 h-8" />
          </div>

          <h2 className="text-lg font-black text-amber-300 mb-1">
            মাস্টার অ্যাডমিন কন্ট্রোল প্যানেল
          </h2>
          <p className="text-xs text-slate-400 mb-5">
            সাইটের ডিপোজিট নম্বর, ব্যানার ও ইউজার নিয়ন্ত্রণ করতে অ্যাডমিন পাসওয়ার্ড দিন
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              adminLogin(password);
            }}
            className="space-y-3"
          >
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="অ্যাডমিন পাসওয়ার্ড (admin123)"
              className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-amber-500"
            />

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 active:scale-98"
            >
              অ্যাডমিন প্রবেশ
            </button>
          </form>

          <button
            onClick={() => adminLogin('admin123')}
            className="mt-3 text-xs text-amber-400 underline hover:text-amber-300"
          >
            1-Click Test Admin Login
          </button>
        </div>
      </div>
    );
  }

  const handleSaveSettings = () => {
    updateSettings({
      siteName,
      marqueeNotice,
      telegramGroupUrl: telegramGroup,
      telegramChannelUrl: telegramChannel,
      supportSophiaTelegram: sophiaTelegram,
      whatsappSupportNumber: whatsappNumber
    });
  };

  const handleSaveGateways = () => {
    updatePaymentGateways(localGateways);
  };

  const handleAddBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBannerImg.trim()) {
      addToast('ছবির লিঙ্ক বা URL দিন', 'error');
      return;
    }
    const newBanner = {
      id: 'b_' + Date.now(),
      title: newBannerTitle || 'নতুন প্রমোশনাল অফার',
      subtitle: newBannerSubtitle || 'WDRTrustedFinance অফিশিয়াল আপডেট',
      tag: newBannerTag,
      imageUrl: newBannerImg
    };
    const updated = [newBanner, ...localBanners];
    setLocalBanners(updated);
    updateBanners(updated);
    setNewBannerImg('');
    setNewBannerTitle('');
    setNewBannerSubtitle('');
  };

  const handleDeleteBanner = (id: string) => {
    const updated = localBanners.filter((b) => b.id !== id);
    setLocalBanners(updated);
    updateBanners(updated);
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserPhone.trim()) {
      addToast('মোবাইল নম্বর দিন', 'error');
      return;
    }
    addNewUserByAdmin(newUserPhone, newUserBalance, newUserVip);
    setNewUserPhone('');
  };

  const pendingTransactions = transactions.filter((t) => t.status === 'pending');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-3 sm:p-6 pb-24">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Header */}
        <div className="p-4 rounded-3xl bg-slate-900 border border-amber-500/30 flex flex-wrap items-center justify-between gap-3 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-black">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black text-amber-300">
                WDRTrustedFinance মাস্টার অ্যাডমিন প্যানেল
              </h1>
              <span className="text-xs text-slate-400">
                মোট রেজিস্টার্ড ইউজার: {allUsers.length} জন | পেন্ডিং রিকোয়েস্ট: {pendingTransactions.length} টি
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#"
              className="px-3 py-1.5 rounded-xl bg-slate-800 text-amber-300 border border-slate-700 text-xs font-bold hover:bg-slate-750"
            >
              ইউজার ভিউতে যান
            </a>
            <button
              onClick={adminLogout}
              className="px-3 py-1.5 rounded-xl bg-rose-950/70 text-rose-300 border border-rose-500/40 text-xs font-bold hover:bg-rose-900/50 flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>লগআউট</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1.5 overflow-x-auto p-1 bg-slate-900 rounded-2xl border border-slate-800">
          {[
            { id: 'payments', label: 'পেমেন্ট গেটওয়ে / ডিপোজিট নম্বর', icon: CreditCard },
            { id: 'packages', label: `প্যাকেজ কন্ট্রোল (${vipPackages.filter(p => p.level > 0).length}টি)`, icon: Award },
            { id: 'approvals', label: `আবেদন অনুমোদন (${pendingTransactions.length})`, icon: CheckCircle2 },
            { id: 'chat', label: `লাইভ চ্যাট হেল্পডেস্ক (${chatMessages.filter(m => m.sender === 'user').length})`, icon: MessageSquare },
            { id: 'banners', label: 'ছবি ও ব্যানার পরিবর্তন', icon: Image },
            { id: 'users', label: 'ইউজার লিস্ট ও ব্যালেন্স', icon: Users },
            { id: 'links', label: 'টেলিগ্রাম ও কন্টাক্ট লিংক', icon: Send },
            { id: 'settings', label: 'মারকুই ও সাধারণ সেটিংস', icon: Save }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: Payment Gateways (bKash/Nagad/Rocket/USDT Numbers) */}
        {activeTab === 'payments' && (
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-amber-300">
                  ডিপোজিট ও রিচার্জ নম্বর পরিবর্তন করুন
                </h3>
                <p className="text-xs text-slate-400">
                  এখানে নম্বর পরিবর্তন করে সেভ করলেই সাইটের সাধারণ ইউজারদের কাছে নতুন নম্বরটি প্রদর্শিত হবে।
                </p>
              </div>
              <button
                onClick={handleSaveGateways}
                className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-md hover:bg-amber-400 flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>সকল নম্বর সেভ করুন</span>
              </button>
            </div>

            <div className="space-y-3.5">
              {localGateways.map((gw, idx) => (
                <div
                  key={gw.method}
                  className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-amber-400">{gw.title}</span>
                    <label className="flex items-center gap-2 text-xs text-slate-300">
                      <input
                        type="checkbox"
                        checked={gw.isActive}
                        onChange={(e) => {
                          const updated = [...localGateways];
                          updated[idx].isActive = e.target.checked;
                          setLocalGateways(updated);
                        }}
                        className="rounded text-amber-500"
                      />
                      <span>সক্রিয় (Active)</span>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-0.5">
                        {gw.method} এজেন্ট/মার্চেন্ট নম্বর:
                      </label>
                      <input
                        type="text"
                        value={gw.number}
                        onChange={(e) => {
                          const updated = [...localGateways];
                          updated[idx].number = e.target.value;
                          setLocalGateways(updated);
                        }}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-xs font-mono font-bold focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-0.5">
                        ইউজারদের জন্য নির্দেশনা:
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={gw.instructions}
                          onChange={(e) => {
                            const updated = [...localGateways];
                            updated[idx].instructions = e.target.value;
                            setLocalGateways(updated);
                          }}
                          className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-xs focus:border-amber-500"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            updatePaymentGateways(localGateways);
                            addToast(`${gw.title} এর তথ্য ও নম্বর সংরক্ষিত হয়েছে!`, 'success');
                          }}
                          className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-bold shrink-0 flex items-center gap-1"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>সেভ</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: Packages Management & Creation */}
        {activeTab === 'packages' && (
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-amber-300">
                  ভিআইপি প্যাকেজ কন্ট্রোল ও মূল্য নির্ধারণ
                </h3>
                <p className="text-xs text-slate-400">
                  বর্তমান ৪টি প্যাকেজ (৩০০, ৮০০, ১২০০, ১৫০০ টাকা) পরিচালনা করুন এবং প্রয়োজনমতো যেকোনো প্যাকেজ যোগ/সম্পাদনা করুন।
                </p>
              </div>
              <button
                onClick={() => {
                  updateVipPackages(vipPackages);
                  addToast('প্যাকেজ সেটিংস সফলভাবে সেভ হয়েছে!', 'success');
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-md hover:bg-amber-400 flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>সকল প্যাকেজ সেভ করুন</span>
              </button>
            </div>

            {/* List of active packages */}
            <div className="space-y-3">
              {vipPackages.filter((p) => p.level > 0).map((pkg) => (
                <div
                  key={pkg.level}
                  className="p-4 rounded-2xl bg-slate-950 border border-amber-500/20 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-xl bg-amber-500 text-slate-950 text-xs font-black">
                      {pkg.name} ({pkg.priceBn})
                    </span>
                    <span className="text-xs font-extrabold text-emerald-400">
                      দৈনিক লাভ: {pkg.dailyProfitBn} (প্রতি কাজে {pkg.perTaskProfitBn})
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">
                        প্যাকেজের টাইটেল:
                      </label>
                      <input
                        type="text"
                        value={pkg.titleBn}
                        onChange={(e) => {
                          const updated = vipPackages.map((p) =>
                            p.level === pkg.level ? { ...p, titleBn: e.target.value } : p
                          );
                          updateVipPackages(updated);
                        }}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-xs focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">
                        প্যাকেজের মূল্য (টাকা):
                      </label>
                      <input
                        type="number"
                        value={pkg.price}
                        onChange={(e) => {
                          const newPrice = Number(e.target.value);
                          const updated = vipPackages.map((p) =>
                            p.level === pkg.level
                              ? { ...p, price: newPrice, priceBn: `৳${toBengaliNumber(newPrice)}` }
                              : p
                          );
                          updateVipPackages(updated);
                        }}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-xs font-mono font-bold focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">
                        প্রতিদিনের মোট লাভ (টাকা):
                      </label>
                      <input
                        type="number"
                        value={pkg.dailyProfit}
                        onChange={(e) => {
                          const newProfit = Number(e.target.value);
                          const perTask = Math.floor(newProfit / 2);
                          const updated = vipPackages.map((p) =>
                            p.level === pkg.level
                              ? {
                                  ...p,
                                  dailyProfit: newProfit,
                                  dailyProfitBn: `৳${toBengaliNumber(newProfit)}`,
                                  perTaskProfit: perTask,
                                  perTaskProfitBn: `৳${toBengaliNumber(perTask)}`,
                                  descriptionBn: `প্রতিদিন ২টি কাজ | প্রতি কাজে ${toBengaliNumber(perTask)} টাকা লাভ | প্রতিদিন মোট আয় ${toBengaliNumber(newProfit)} টাকা`
                                }
                              : p
                          );
                          updateVipPackages(updated);
                        }}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-xs font-mono font-bold focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: Banners & Images Management */}
        {activeTab === 'banners' && (
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
            <div>
              <h3 className="text-sm font-bold text-amber-300">হোম পেজ ব্যানার ও ছবি কন্ট্রোল</h3>
              <p className="text-xs text-slate-400">
                যেকোনো ছবির সরাসরি লিংক পেস্ট করে সাইটের ব্যানার হিসেবে সেট করুন।
              </p>
            </div>

            {/* Add New Banner Form */}
            <form onSubmit={handleAddBanner} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-200">নতুন ব্যানার যুক্ত করুন:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  value={newBannerTitle}
                  onChange={(e) => setNewBannerTitle(e.target.value)}
                  placeholder="ব্যানার টাইটেল (যেমন: বিশেষ অফার)"
                  className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-xs focus:border-amber-500"
                />
                <input
                  type="text"
                  value={newBannerSubtitle}
                  onChange={(e) => setNewBannerSubtitle(e.target.value)}
                  placeholder="সাবটাইটেল / বিবরণ"
                  className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-xs focus:border-amber-500"
                />
                <input
                  type="text"
                  value={newBannerImg}
                  onChange={(e) => setNewBannerImg(e.target.value)}
                  placeholder="ছবির সরাসরি লিঙ্ক (Image URL)"
                  required
                  className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-xs focus:border-amber-500"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow hover:bg-amber-400 flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>ব্যানার যোগ করুন</span>
              </button>
            </form>

            {/* Existing Banners */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-300">বর্তমান সক্রিয় ব্যানারসমূহ:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {localBanners.map((b) => (
                  <div
                    key={b.id}
                    className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 overflow-hidden"
                  >
                    <div className="aspect-[16/8] rounded-xl overflow-hidden bg-slate-900 border border-slate-800 relative">
                      <img
                        src={b.imageUrl}
                        alt={b.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-amber-500 text-slate-950 text-[10px] font-black">
                        {b.tag}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-xs font-bold text-slate-200">{b.title}</h5>
                        <p className="text-[10px] text-slate-400 truncate max-w-xs">{b.subtitle}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteBanner(b.id)}
                        className="p-1.5 rounded-lg bg-rose-950/60 text-rose-400 hover:bg-rose-900/60"
                        title="মুছে ফেলুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Approvals (Deposits & Withdrawals) */}
        {activeTab === 'approvals' && (
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-amber-300">
                পেন্ডিং ডিপোজিট ও উত্তোলন অনুমোদন (Approvals)
              </h3>
              <p className="text-xs text-slate-400">
                ইউজারদের প্রেরিত TrxID যাচাই করে ১ ক্লিকে ব্যালেন্স অনুমোদন করুন।
              </p>
            </div>

            {pendingTransactions.length === 0 ? (
              <div className="py-10 text-center text-slate-500 text-xs">
                কোনো পেন্ডিং আবেদন নেই। সকল লেনদেন সম্পন্ন হয়েছে।
              </div>
            ) : (
              <div className="space-y-2.5">
                {pendingTransactions.map((trx) => (
                  <div
                    key={trx.id}
                    className="p-3.5 rounded-2xl bg-slate-950 border border-amber-500/20 flex flex-wrap items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                            trx.type === 'deposit'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          }`}
                        >
                          {trx.type === 'deposit' ? 'ডিপোজিট / রিচার্জ' : 'উত্তোলন / ক্যাশআউট'}
                        </span>
                        <span className="font-mono text-xs font-bold text-amber-200">
                          {trx.phone}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1">
                        পরিমাণ: <span className="text-amber-400 font-bold">{formatTaka(trx.amount)}</span> | মাধ্যম: {trx.method}
                      </p>
                      {trx.trxId && (
                        <p className="text-[11px] font-mono text-cyan-300">
                          TrxID: {trx.trxId} (প্রেরক: {trx.accountNumber})
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => approveTransaction(trx.id)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shadow"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>অনুমোদন করুন (Approve)</span>
                      </button>

                      <button
                        onClick={() => rejectTransaction(trx.id)}
                        className="px-3 py-1.5 rounded-xl bg-rose-950 text-rose-300 border border-rose-600/50 hover:bg-rose-900/60 font-bold text-xs flex items-center gap-1"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>বাতিল (Reject)</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: Users Management & Balance Adjust */}
        {activeTab === 'users' && (
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-amber-300">ব্যবহারকারী তালিকা ও ব্যালেন্স নিয়ন্ত্রণ</h3>
              <p className="text-xs text-slate-400">
                যেকোনো ইউজারের ব্যালেন্স যোগ/বিয়োগ করুন অথবা অসাধু কোনো ইউজারকে ব্যান করুন।
              </p>
            </div>

            {/* Quick Admin User Creator */}
            <form onSubmit={handleCreateUser} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-wrap gap-2 items-center text-xs">
              <span className="font-bold text-slate-300">নতুন ইউজার যোগ করুন:</span>
              <input
                type="text"
                placeholder="মোবাইল নম্বর"
                value={newUserPhone}
                onChange={(e) => setNewUserPhone(e.target.value)}
                className="px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-xs"
              />
              <input
                type="number"
                placeholder="ব্যালেন্স"
                value={newUserBalance}
                onChange={(e) => setNewUserBalance(Number(e.target.value))}
                className="w-24 px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-xs"
              />
              <select
                value={newUserVip}
                onChange={(e) => setNewUserVip(Number(e.target.value))}
                className="px-2 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-xs"
              >
                <option value={0}>VIP 0</option>
                <option value={1}>VIP 1</option>
                <option value={2}>VIP 2</option>
                <option value={3}>VIP 3</option>
              </select>
              <button
                type="submit"
                className="px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400"
              >
                ইউজার তৈরি
              </button>
            </form>

            {/* User List with Full Admin Control */}
            <div className="space-y-3">
              {allUsers.map((u) => (
                <div
                  key={u.id}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-900 pb-2.5">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-100 text-sm">{u.phone}</span>
                        <span className="px-2 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-black">
                          VIP {u.vipLevel}
                        </span>
                        {u.isBanned && (
                          <span className="px-2 py-0.5 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/40 text-[11px] font-bold">
                            BANNED
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                        ID: {u.id} | রেফার কোড: <span className="text-amber-400 font-bold">{u.inviteCode}</span> | ইনভাইটকারী: <span className="text-cyan-400 font-bold">{u.invitedBy || 'নেই'}</span> | যোগদান: {new Date(u.createdAt).toLocaleDateString('bn-BD')}
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">বর্তমান মূল ব্যালেন্স:</span>
                      <span className="text-amber-300 font-extrabold text-base">
                        {formatTaka(u.balance)}
                      </span>
                    </div>
                  </div>

                  {/* Admin User Control Actions Bar */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-1 items-center">
                    {/* VIP Level Control */}
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">ভিআইপি প্যাকেজ পরিবর্তন:</label>
                      <select
                        value={u.vipLevel}
                        onChange={(e) => setUserVipLevel(u.id, Number(e.target.value))}
                        className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-amber-300 font-bold text-xs focus:border-amber-500"
                      >
                        <option value={0}>VIP 0 (ফ্রি ট্রায়াল)</option>
                        <option value={1}>VIP 1 (৳৩০০ প্যাকেজ)</option>
                        <option value={2}>VIP 2 (৳৮০০ প্যাকেজ)</option>
                        <option value={3}>VIP 3 (৳১২০০ প্যাকেজ)</option>
                        <option value={4}>VIP 4 (৳১৫০০ প্যাকেজ)</option>
                      </select>
                    </div>

                    {/* Exact Balance Setter */}
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">নির্দিষ্ট ব্যালেন্স নির্ধারণ:</label>
                      <div className="flex gap-1.5">
                        <input
                          type="number"
                          placeholder="৳ পরিমাণ"
                          defaultValue={u.balance}
                          onBlur={(e) => {
                            const val = Number(e.target.value);
                            if (!isNaN(val) && val >= 0 && val !== u.balance) {
                              setUserExactBalance(u.id, val);
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              const val = Number((e.target as HTMLInputElement).value);
                              if (!isNaN(val) && val >= 0) {
                                setUserExactBalance(u.id, val);
                              }
                            }
                          }}
                          className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 font-mono text-xs focus:border-amber-500"
                        />
                      </div>
                    </div>

                    {/* Quick Adjustments */}
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">দ্রুত ব্যালেন্স যোগ/বিয়োগ:</label>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => adjustUserBalance(u.id, 500)}
                          className="flex-1 py-1.5 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/70 text-emerald-300 border border-emerald-500/30 font-bold text-[11px]"
                        >
                          +৳৫০০
                        </button>
                        <button
                          type="button"
                          onClick={() => adjustUserBalance(u.id, -500)}
                          className="flex-1 py-1.5 rounded-xl bg-rose-950/70 hover:bg-rose-900/70 text-rose-300 border border-rose-500/30 font-bold text-[11px]"
                        >
                          -৳৫০০
                        </button>
                      </div>
                    </div>

                    {/* Task Reset & Ban Control */}
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">টাস্ক ও একাউন্ট স্ট্যাটাস:</label>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => resetUserTasks(u.id)}
                          className="flex-1 py-1.5 rounded-xl bg-cyan-950/70 hover:bg-cyan-900/70 text-cyan-300 border border-cyan-500/30 font-bold text-[11px]"
                          title="আজকের টাস্ক ০/২ করে দিন"
                        >
                          টাস্ক রিসেট
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleUserBan(u.id)}
                          className={`flex-1 py-1.5 rounded-xl text-[11px] font-bold border transition-colors ${
                            u.isBanned
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                              : 'bg-rose-950/60 text-rose-300 border-rose-500/30 hover:bg-rose-900/60'
                          }`}
                        >
                          {u.isBanned ? 'আনব্যান' : 'ব্যান করুন'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: Telegram & Contact Links */}
        {activeTab === 'links' && (
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-amber-300">
                  টেলিগ্রাম ও কাস্টমার সার্ভিস লিংক কন্ট্রোল
                </h3>
                <p className="text-xs text-slate-400">
                  আপনার নিজস্ব টেলিগ্রাম গ্রুপ, চ্যানেল বা কাস্টমার কেয়ার অফিসারের লিংক এখানে দিন।
                </p>
              </div>
              <button
                onClick={handleSaveSettings}
                className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow hover:bg-amber-400 flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>লিংক সংরক্ষণ করুন</span>
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  অফিসিয়াল টেলিগ্রাম কমিউনিটি গ্রুপ লিংক:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={telegramGroup}
                    onChange={(e) => setTelegramGroup(e.target.value)}
                    placeholder="https://t.me/yourgroup"
                    className="flex-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-xs font-mono focus:border-amber-500"
                  />
                  <a
                    href={formatTelegramUrl(telegramGroup)}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 rounded-xl bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 text-xs font-bold hover:bg-cyan-900/50 flex items-center gap-1"
                  >
                    <span>Test Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  অফিসিয়াল টেলিগ্রাম ব্রডকাস্ট চ্যানেল লিংক:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={telegramChannel}
                    onChange={(e) => setTelegramChannel(e.target.value)}
                    placeholder="https://t.me/yourchannel"
                    className="flex-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-xs font-mono focus:border-amber-500"
                  />
                  <a
                    href={formatTelegramUrl(telegramChannel)}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 rounded-xl bg-blue-950/60 text-blue-300 border border-blue-500/30 text-xs font-bold hover:bg-blue-900/50 flex items-center gap-1"
                  >
                    <span>Test Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  ব্যক্তিগত টেলিগ্রাম সাপোর্ট অফিসার (Sophia Agent ID):
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={sophiaTelegram}
                    onChange={(e) => setSophiaTelegram(e.target.value)}
                    placeholder="https://t.me/sophia_agent"
                    className="flex-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-xs font-mono focus:border-amber-500"
                  />
                  <a
                    href={formatTelegramUrl(sophiaTelegram)}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 rounded-xl bg-amber-950/60 text-amber-300 border border-amber-500/30 text-xs font-bold hover:bg-amber-900/50 flex items-center gap-1"
                  >
                    <span>Test Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  হোয়াটসঅ্যাপ সাপোর্ট নম্বর:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    placeholder="+88018XXXXXXXX"
                    className="flex-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-xs font-mono focus:border-amber-500"
                  />
                  <a
                    href={formatWhatsAppUrl(whatsappNumber)}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 rounded-xl bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 text-xs font-bold hover:bg-emerald-900/50 flex items-center gap-1"
                  >
                    <span>Test Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: Marquee & Platform Settings */}
        {activeTab === 'settings' && (
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-amber-300">মারকুই নোটিশ ও সাইট সেটিংস</h3>
                <p className="text-xs text-slate-400">
                  হোম পেজে স্ক্রলিং হওয়া টেক্সট ও প্ল্যাটফর্মের নাম পরিবর্তন করুন।
                </p>
              </div>
              <button
                onClick={handleSaveSettings}
                className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow hover:bg-amber-400 flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>সেটিংস সেভ করুন</span>
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  প্ল্যাটফর্মের নাম (Site Name):
                </label>
                <input
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-xs focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  হোম পেজ স্ক্রলিং মারকুই নোটিশ টেক্সট:
                </label>
                <textarea
                  rows={3}
                  value={marqueeNotice}
                  onChange={(e) => setMarqueeNotice(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-xs leading-relaxed focus:border-amber-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: Live Chat Management & Direct Replies */}
        {activeTab === 'chat' && (
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-amber-300">
                  ২৪/৭ লাইভ চ্যাট হেল্পডেস্ক কন্ট্রোল
                </h3>
                <p className="text-xs text-slate-400">
                  ইউজাররা যখন সাইট থেকে লাইভ চ্যাটে বার্তা দেবে, আপনি এখান থেকে সরাসরি উত্তর পাঠাতে পারবেন।
                </p>
              </div>
              <button
                type="button"
                onClick={clearChatHistory}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-950 text-slate-300 hover:text-rose-300 text-xs font-bold border border-slate-700 transition-colors"
              >
                চ্যাট হিস্ট্রি রিসেট
              </button>
            </div>

            {/* Chat Conversation Box */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 h-96 overflow-y-auto space-y-3">
              {chatMessages.length === 0 ? (
                <div className="py-20 text-center text-slate-500 text-xs">
                  কোনো মেসেজ নেই।
                </div>
              ) : (
                chatMessages.map((msg) => {
                  const isUser = msg.sender === 'user';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isUser ? 'items-start' : 'items-end'}`}
                    >
                      <div className="flex items-center gap-1.5 px-1 mb-1 text-[10px] text-slate-400">
                        <span className={`font-bold ${isUser ? 'text-amber-400' : 'text-emerald-400'}`}>
                          {isUser ? `👤 ${msg.userName || 'ইউজার'}` : `👑 ${msg.userName || 'অ্যাডমিন সোফিয়া'}`}
                        </span>
                        <span>• {msg.time}</span>
                      </div>

                      <div
                        className={`max-w-[85%] p-3 rounded-2xl text-xs sm:text-sm leading-relaxed shadow ${
                          isUser
                            ? 'bg-slate-800 text-slate-100 border border-amber-500/30 rounded-tl-none'
                            : 'bg-emerald-950 text-emerald-100 border border-emerald-500/40 rounded-tr-none'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                        {msg.showLinks && (
                          <div className="mt-2 text-[10px] text-amber-300 font-semibold border-t border-slate-700/60 pt-1">
                            [অফিসিয়াল টেলিগ্রাম ও সাপোর্ট লিংক কার্ড যুক্ত করা হয়েছে]
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Admin Reply Composer Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!adminReplyText.trim()) return;
                sendAdminChatMessage(adminReplyText.trim(), includeLinksInReply);
                setAdminReplyText('');
              }}
              className="p-3.5 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300">
                  অ্যাডমিন হিসেবে ইউজারের মেসেজের উত্তর লিখুন:
                </span>
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeLinksInReply}
                    onChange={(e) => setIncludeLinksInReply(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-500 bg-slate-900 border-slate-700"
                  />
                  <span>উত্তরের নিচে টেলিগ্রাম ও সাপোর্ট বাটন লিংক যোগ করুন</span>
                </label>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={adminReplyText}
                  onChange={(e) => setAdminReplyText(e.target.value)}
                  placeholder="ইউজারকে কী উত্তর দিতে চান লিখুন (যেমন: আপনার রিচার্জ অনুমোদিত হয়েছে)..."
                  className="flex-1 px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 active:scale-95 transition-transform shrink-0"
                >
                  <SendHorizontal className="w-4 h-4" />
                  <span>উত্তর পাঠান (Send Reply)</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
