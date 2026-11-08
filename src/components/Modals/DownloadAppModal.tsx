import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Smartphone, Download, ShieldCheck } from 'lucide-react';

export const DownloadAppModal: React.FC = () => {
  const { closeModal, addToast } = useApp();

  const handleDownload = () => {
    addToast('WDRTrustedFinance APK ডাউনলোড শুরু হচ্ছে...', 'info');
    setTimeout(() => {
      addToast('অ্যাপ ডাউনলোড সফল হয়েছে!', 'success');
      closeModal();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-sm bg-slate-900 border border-amber-500/30 rounded-3xl p-6 shadow-2xl text-center">
        <div className="flex justify-end">
          <button
            onClick={closeModal}
            className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-slate-950 mx-auto mb-4 shadow-xl shadow-amber-500/30">
          <Smartphone className="w-9 h-9" />
        </div>

        <h3 className="text-lg font-extrabold text-amber-300 mb-1">
          অ্যান্ড্রয়েড অ্যাপ ডাউনলোড
        </h3>
        <p className="text-xs text-slate-400 mb-5 leading-relaxed">
          দ্রুততম ও ঝামেলাহীন ব্যবহারের জন্য WDRTrustedFinance অফিসিয়াল অ্যান্ড্রয়েড অ্যাপ ইনস্টল করুন।
        </p>

        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-left space-y-1.5 mb-5 text-xs text-slate-300">
          <div className="flex justify-between">
            <span className="text-slate-500">ভার্সন:</span>
            <span className="font-mono text-amber-400 font-bold">v3.5.2 Pro</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">সাইজ:</span>
            <span className="font-mono text-slate-200">9.8 MB</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">নিরাপত্তা:</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> ১০০% সুরক্ষিত (Verified)
            </span>
          </div>
        </div>

        <button
          onClick={handleDownload}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 active:scale-98 transition-transform"
        >
          <Download className="w-4 h-4" />
          <span>সরাসরি APK ডাউনলোড করুন</span>
        </button>
      </div>
    </div>
  );
};
