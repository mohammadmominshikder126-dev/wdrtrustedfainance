import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { ToastContainer } from './components/ToastContainer';
import { RechargeModal } from './components/Modals/RechargeModal';
import { WithdrawModal } from './components/Modals/WithdrawModal';
import { LiveChatModal } from './components/Modals/LiveChatModal';
import { TeamInviteModal } from './components/Modals/TeamInviteModal';
import { BindWalletModal } from './components/Modals/BindWalletModal';
import { FinancialRecordsModal } from './components/Modals/FinancialRecordsModal';
import { DownloadAppModal } from './components/Modals/DownloadAppModal';
import { RegistrationSuccessModal } from './components/Modals/RegistrationSuccessModal';
import { HomeView } from './views/HomeView';
import { TaskView } from './views/TaskView';
import { VipView } from './views/VipView';
import { FAQView } from './views/FAQView';
import { ServiceView } from './views/ServiceView';
import { AccountView } from './views/AccountView';
import { AuthView } from './views/AuthView';
import { AdminView } from './views/AdminView';

const MainLayout: React.FC = () => {
  const { currentUser, activeModal, logout, addToast } = useApp();
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(false);

  // Listen to hash and search query changes (e.g. #admin, #vip, or ?page=admin)
  useEffect(() => {
    const handleLocation = () => {
      const hash = window.location.hash.toLowerCase();
      const params = new URLSearchParams(window.location.search);
      const page = params.get('page');

      if (hash === '#admin' || page === 'admin') {
        setIsAdminRoute(true);
      } else {
        setIsAdminRoute(false);
        if (hash === '#vip') setCurrentTab('vip');
        else if (hash === '#task') setCurrentTab('task');
        else if (hash === '#faq') setCurrentTab('faq');
        else if (hash === '#service') setCurrentTab('service');
        else if (hash === '#account') setCurrentTab('account');
      }
    };

    handleLocation();
    window.addEventListener('hashchange', handleLocation);
    window.addEventListener('popstate', handleLocation);
    return () => {
      window.removeEventListener('hashchange', handleLocation);
      window.removeEventListener('popstate', handleLocation);
    };
  }, []);

  // Session Timeout: Inactivity logout after 15 minutes
  useEffect(() => {
    if (!currentUser) return;

    let timeoutId: any;
    const SESSION_TIMEOUT_MS = 15 * 60 * 1000; // 15 minutes

    const resetTimer = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        // Session timed out
        logout();
        addToast('নিরাপত্তার স্বার্থে নিষ্ক্রিয়তার কারণে আপনার সেশনের মেয়াদ শেষ হয়েছে (Session Timeout)। পুনরায় লগইন করুন।', 'info');
      }, SESSION_TIMEOUT_MS);
    };

    // User interaction events that reset session timer
    const activityEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart', 'click'];
    activityEvents.forEach((event) => {
      window.addEventListener(event, resetTimer, { passive: true });
    });

    // Start initial timer
    resetTimer();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      activityEvents.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [currentUser]);

  // If on admin route, render AdminView directly
  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <ToastContainer />
        <AdminView />
      </div>
    );
  }

  // If user is not logged in, render AuthView
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <ToastContainer />
        <AuthView />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-amber-500/30 selection:text-amber-200">
      <ToastContainer />

      {/* Top Navbar */}
      <Navbar />

      {/* Main Viewport: Ergonomic responsive mobile-first container */}
      <main className="flex-1 max-w-md w-full mx-auto px-3.5 pt-3">
        {currentTab === 'home' && <HomeView onTabChange={setCurrentTab} />}
        {currentTab === 'task' && <TaskView onTabChange={setCurrentTab} />}
        {currentTab === 'vip' && <VipView onTabChange={setCurrentTab} />}
        {currentTab === 'faq' && <FAQView onTabChange={setCurrentTab} />}
        {currentTab === 'service' && <ServiceView />}
        {currentTab === 'account' && <AccountView onTabChange={setCurrentTab} />}
      </main>

      {/* Bottom Nav Bar */}
      <BottomNav currentTab={currentTab} onTabChange={setCurrentTab} />

      {/* Modals Container */}
      {activeModal === 'recharge' && <RechargeModal />}
      {activeModal === 'withdraw' && <WithdrawModal />}
      {activeModal === 'liveChat' && <LiveChatModal />}
      {activeModal === 'teamInvite' && <TeamInviteModal />}
      {activeModal === 'bindWallet' && <BindWalletModal />}
      {activeModal === 'financialRecords' && <FinancialRecordsModal />}
      {activeModal === 'downloadApp' && <DownloadAppModal />}
      {activeModal === 'registrationSuccess' && <RegistrationSuccessModal />}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
