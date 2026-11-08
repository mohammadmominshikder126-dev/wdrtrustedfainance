import React from 'react';
import { Home, Zap, Award, HelpCircle, Headphones, User } from 'lucide-react';

interface BottomNavProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange }) => {
  const tabs = [
    { id: 'home', labelBn: 'হোম', icon: Home },
    { id: 'task', labelBn: 'টাস্ক', icon: Zap, isCenter: true },
    { id: 'vip', labelBn: 'ভিআইপি', icon: Award },
    { id: 'faq', labelBn: 'এফএকিউ', icon: HelpCircle },
    { id: 'service', labelBn: 'সার্ভিস', icon: Headphones },
    { id: 'account', labelBn: 'আমার', icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-amber-500/20 py-1 px-1.5">
      <div className="max-w-md mx-auto grid grid-cols-6 items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          if (tab.isCenter) {
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="flex flex-col items-center justify-center -mt-4 relative group"
              >
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 active:scale-95 ${
                    isActive
                      ? 'bg-gradient-to-tr from-amber-600 via-yellow-500 to-amber-400 text-slate-950 shadow-amber-500/50 ring-3 ring-amber-500/30'
                      : 'bg-gradient-to-tr from-slate-800 to-slate-700 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  <Icon className="w-5 h-5 stroke-[2.4]" />
                </div>
                <span
                  className={`text-[9px] mt-1 font-bold ${
                    isActive ? 'text-amber-400' : 'text-slate-400'
                  }`}
                >
                  {tab.labelBn}
                </span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center justify-center py-1 transition-colors relative min-h-[44px]"
            >
              <Icon
                className={`w-4.5 h-4.5 transition-transform duration-150 ${
                  isActive
                    ? 'text-amber-400 stroke-[2.3] scale-110'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              />
              <span
                className={`text-[10px] font-medium tracking-tight mt-1 ${
                  isActive ? 'text-amber-400 font-bold' : 'text-slate-400'
                }`}
              >
                {tab.labelBn}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
