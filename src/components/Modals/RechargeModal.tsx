import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Copy,
  Check,
  Clock,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { toBengaliNumber } from '../../utils/urlHelpers';

export const RechargeModal: React.FC = () => {
  const { closeModal, paymentGateways, requestDeposit, addToast, settings } = useApp();
  const [selectedMethod, setSelectedMethod] = useState<'bKash' | 'Nagad' | 'Rocket' | 'USDT'>('bKash');
  const [amount, setAmount] = useState<number>(300);
  const [senderNumber, setSenderNumber] = useState('');
  const [trxId, setTrxId] = useState('');
  const [copiedAmount, setCopiedAmount] = useState(false);
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [step, setStep] = useState<'details' | 'confirm'>('details');

  const activeGateway = paymentGateways.find((g) => g.method === selectedMethod) || paymentGateways[0];
  const quickAmounts = [300, 800, 1200, 1500];

  const handleCopyAmount = () => {
    navigator.clipboard.writeText(amount.toString());
    setCopiedAmount(true);
    addToast('পরিমাণ কপি হয়েছে!', 'success');
    setTimeout(() => setCopiedAmount(false), 2000);
  };

  const handleCopyNumber = () => {
    if (activeGateway?.number) {
      navigator.clipboard.writeText(activeGateway.number);
      setCopiedNumber(true);
      addToast('এজেন্ট নম্বর কপি হয়েছে!', 'success');
      setTimeout(() => setCopiedNumber(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || amount < 300) {
      addToast('সর্বনিম্ন রিচার্জ পরিমাণ ৳৩০০', 'error');
      return;
    }
    if (!senderNumber.trim()) {
      addToast('প্রেরক নম্বর অবশ্যই দিতে হবে', 'error');
      return;
    }
    if (!trxId.trim()) {
      addToast('১০ সংখ্যার ট্রানজেকশন আইডি (TrxID) দিন', 'error');
      return;
    }

    requestDeposit(selectedMethod, amount, senderNumber, trxId);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-md bg-slate-900 border border-amber-500/30 rounded-3xl shadow-2xl max-h-[92vh] overflow-y-auto flex flex-col">
        {/* Top Header matching Bangladeshi OnePay / Gateway header in the golden-slate theme */}
        <div className="p-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-amber-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-amber-300">
                {settings.siteName || 'WDRTrustedFinance'} নিরাপদ পেমেন্ট
              </h3>
              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-400" /> সময় বাকি: ০৪:৫৯ মিনিট
              </span>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-200"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Method Selection Bar */}
          <div>
            <span className="text-xs font-semibold text-slate-300 block mb-2">
              পেমেন্ট মাধ্যম বেছে নিন:
            </span>
            <div className="grid grid-cols-4 gap-2">
              {(['bKash', 'Nagad', 'Rocket', 'USDT'] as const).map((method) => {
                const isSelected = selectedMethod === method;
                return (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setSelectedMethod(method)}
                    className={`py-2 px-1 text-xs font-bold rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {method === 'bKash' ? 'বিকাশ' : method === 'Nagad' ? 'নগদ' : method === 'Rocket' ? 'রকেট' : 'USDT'}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Amount Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              রিচার্জের পরিমাণ নির্বাচন করুন:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {quickAmounts.map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setAmount(val)}
                  className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                    amount === val
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500 ring-1 ring-amber-400/40'
                      : 'bg-slate-950/70 text-slate-300 border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  ৳{toBengaliNumber(val)}
                </button>
              ))}
            </div>
          </div>

          {/* PAYMENT DETAILS CARD (Exact structured receipt layout) */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/30 shadow-inner space-y-3">
            {/* Row 1: Amount */}
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-850">
              <span className="text-xs text-slate-400">পরিমাণ:</span>
              <div className="flex items-center gap-2">
                <span className="text-base font-black text-amber-400 font-mono">
                  {amount} ৳
                </span>
                <button
                  type="button"
                  onClick={handleCopyAmount}
                  className="px-2 py-0.5 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[11px] font-bold flex items-center gap-1 border border-amber-500/30"
                >
                  {copiedAmount ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedAmount ? 'কপি' : 'কপি'}</span>
                </button>
              </div>
            </div>

            {/* Row 2: Payment Type */}
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-850 text-xs">
              <span className="text-slate-400">পেমেন্ট টাইপ:</span>
              <span className="font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                {selectedMethod === 'bKash'
                  ? 'বিকাশ এ শুধু সেন্ড মানি করুন (Send Money)'
                  : selectedMethod === 'Nagad'
                  ? 'নগদ শুধুমাত্র ক্যাশ আউট করুন (Cash Out)'
                  : 'Cash Out / Transfer'}
              </span>
            </div>

            {/* Row 3: Agent/Personal Number with Copy */}
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-850">
              <span className="text-xs text-slate-400">
                {selectedMethod === 'bKash' ? 'বিকাশ' : selectedMethod === 'Nagad' ? 'নগদ' : selectedMethod === 'Rocket' ? 'রকেট' : 'USDT'} নম্বর:
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-black text-slate-100 font-mono select-all">
                  {activeGateway?.number}
                </span>
                <button
                  type="button"
                  onClick={handleCopyNumber}
                  className="px-2.5 py-1 rounded bg-amber-500 text-slate-950 text-[11px] font-extrabold flex items-center gap-1 shadow-sm hover:bg-amber-400"
                >
                  {copiedNumber ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedNumber ? 'কপি হয়েছে' : 'কপি করুন'}</span>
                </button>
              </div>
            </div>

            {/* Row 4: Account Type */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">অ্যাকাউন্ট টাইপ:</span>
              <span className="font-bold text-emerald-400">
                {selectedMethod === 'bKash' ? 'Personal (পার্সোনাল - সেন্ড মানি)' : 'Agent (এজেন্ট ক্যাশ আউট)'}
              </span>
            </div>
          </div>

          {/* Submission Form for Sender Number & Transaction ID */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                যে নম্বর থেকে টাকা পাঠিয়েছেন (প্রেরক নম্বর):
              </label>
              <input
                type="text"
                value={senderNumber}
                onChange={(e) => setSenderNumber(e.target.value)}
                placeholder="যেমন: 018XXXXXXXX"
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-300">
                  ১০ সংখ্যার ট্রানজেকশন আইডি (TrxID):
                </label>
                <span className="text-[10px] text-amber-400 font-medium flex items-center gap-0.5">
                  <HelpCircle className="w-3 h-3" /> কীভাবে TrxID পাবেন?
                </span>
              </div>
              <input
                type="text"
                value={trxId}
                onChange={(e) => setTrxId(e.target.value)}
                placeholder="TrxID লিখুন (যেমন: 9J3K8L2M90)"
                required
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-sm font-mono tracking-wider focus:outline-none focus:border-amber-500 uppercase"
              />
            </div>

            {/* Step-by-step Guidelines */}
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-200 text-[11px] leading-relaxed space-y-1">
              <p className="font-bold text-amber-300">রিচার্জ করার সঠিক নিয়ম:</p>
              <p>১. ওপরের নম্বরটি কপি করে আপনার {selectedMethod} অ্যাপে যান।</p>
              <p>
                ২. {selectedMethod === 'bKash'
                  ? 'বিকাশ এ শুধু সেন্ড মানি (Send Money) করুন এবং'
                  : selectedMethod === 'Nagad'
                  ? 'নগদ শুধুমাত্র ক্যাশ আউট (Cash Out) করুন এবং'
                  : '*Cash Out* অপশন নির্বাচন করে'} উল্লেখিত সঠিক পরিমাণ ({amount} ৳) টাকা পাঠান।
              </p>
              <p>৩. টাকা পাঠানো সম্পন্ন হলে মেসেজ থেকে ১০ সংখ্যার TrxID কপি করে ওপরে বসিয়ে কনফার্ম করুন।</p>
            </div>

            {/* Confirm Payment Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/25 active:scale-98 transition-transform flex items-center justify-center gap-1.5"
            >
              <span>পেমেন্ট নিশ্চিত করুন (Confirm Payment)</span>
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
