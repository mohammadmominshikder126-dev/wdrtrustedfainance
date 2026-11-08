import React from 'react';
import { useApp } from '../context/AppContext';
import { Headphones, ShieldCheck } from 'lucide-react';
import { formatTelegramUrl } from '../utils/urlHelpers';

export const Navbar: React.FC = () => {
  const { currentUser, settings, openModal } = useApp();

  const handleSupportClick = () => {
    // If telegram link configured, directly navigate, or open live chat modal
    if (settings.telegramGroupUrl) {
      window.open(formatTelegramUrl(settings.telegramGroupUrl), '_blank');
    } else {
      openModal('liveChat');
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-slate-950/90 backdrop-blur-md border-b border-amber-500/20 px-4 py-3">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Brand Zone: 1-line wordmark with golden shield logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-600 to-yellow-400 flex items-center justify-center shadow-lg shadow-amber-500/20 border border-yellow-300/40">
            <ShieldCheck className="w-5 h-5 text-slate-950" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
              {settings.siteName || 'WDRTrustedFinance'}
            </span>
          </div>
        </div>

        {/* Action Zone: Live Support Desk */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleSupportClick}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-semibold transition-all active:scale-95"
            title="কাস্টমার সাপোর্ট"
          >
            <Headphones className="w-4 h-4" />
            <span>সাপোর্ট</span>
          </button>

          {currentUser && (
            <div className="flex items-center gap-1 text-xs text-slate-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>{currentUser.phone.substring(0, 5)}***</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
