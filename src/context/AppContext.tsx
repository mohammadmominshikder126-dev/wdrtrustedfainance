import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  VipPackage,
  Transaction,
  TeamMember,
  PaymentGateway,
  BannerItem,
  PlatformSettings,
  ChatMessage
} from '../types';
import {
  INITIAL_SETTINGS,
  INITIAL_VIP_PACKAGES,
  INITIAL_PAYMENT_GATEWAYS,
  INITIAL_BANNERS,
  INITIAL_TEAM_MEMBERS
} from '../data/mockData';

interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface AppContextType {
  currentUser: User | null;
  settings: PlatformSettings;
  vipPackages: VipPackage[];
  paymentGateways: PaymentGateway[];
  banners: BannerItem[];
  transactions: Transaction[];
  teamMembers: TeamMember[];
  allUsers: User[];
  chatMessages: ChatMessage[];
  activeModal: string | null;
  modalData: any;
  toasts: ToastMessage[];
  isAdminAuthenticated: boolean;
  
  // Actions
  login: (phone: string, pass: string) => boolean;
  register: (phone: string, pass: string, inviteCode: string) => { success: boolean; error?: string };
  logout: () => void;
  openModal: (modalName: string, data?: any) => void;
  closeModal: () => void;
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  claimDailyCheckin: () => { success: boolean; message: string };
  submitTask: (taskId: string) => { success: boolean; message: string; earned: number };
  buyVipPackage: (level: number) => { success: boolean; message: string };
  requestDeposit: (method: string, amount: number, senderNumber: string, trxId: string) => void;
  requestWithdraw: (amount: number, method: string, accountNumber: string, pin: string) => { success: boolean; message: string };
  bindWallet: (method: 'bKash' | 'Nagad' | 'Rocket' | 'USDT', number: string, pin: string) => boolean;
  sendUserChatMessage: (text: string) => void;
  sendAdminChatMessage: (text: string, showLinks?: boolean) => void;
  clearChatHistory: () => void;
  
  // Admin actions
  adminLogin: (password: string) => boolean;
  adminLogout: () => void;
  updateSettings: (newSettings: Partial<PlatformSettings>) => void;
  updatePaymentGateways: (gateways: PaymentGateway[]) => void;
  updateBanners: (banners: BannerItem[]) => void;
  updateVipPackages: (packages: VipPackage[]) => void;
  approveTransaction: (id: string) => void;
  rejectTransaction: (id: string) => void;
  adjustUserBalance: (userId: string, amount: number) => void;
  setUserExactBalance: (userId: string, newBalance: number) => void;
  setUserVipLevel: (userId: string, level: number) => void;
  resetUserTasks: (userId: string) => void;
  toggleUserBan: (userId: string) => void;
  addNewUserByAdmin: (phone: string, balance: number, vipLevel: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load settings
  const [settings, setSettings] = useState<PlatformSettings>(() => {
    const saved = localStorage.getItem('wdr_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  // Load VIP Packages
  const [vipPackages, setVipPackages] = useState<VipPackage[]>(() => {
    const saved = localStorage.getItem('wdr_vip_packages');
    return saved ? JSON.parse(saved) : INITIAL_VIP_PACKAGES;
  });

  // Load Gateways
  const [paymentGateways, setPaymentGateways] = useState<PaymentGateway[]>(() => {
    const saved = localStorage.getItem('wdr_gateways');
    return saved ? JSON.parse(saved) : INITIAL_PAYMENT_GATEWAYS;
  });

  // Load Banners
  const [banners, setBanners] = useState<BannerItem[]>(() => {
    const saved = localStorage.getItem('wdr_banners');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 4) return parsed;
      } catch (e) {
        // fallback
      }
    }
    return INITIAL_BANNERS;
  });

  // Load Users
  const [allUsers, setAllUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('wdr_all_users');
    if (saved) return JSON.parse(saved);
    const defaultUser: User = {
      id: 'WDR9922',
      phone: '01899112233',
      balance: 100,
      vipLevel: 0,
      totalProfit: 0,
      todayProfit: 0,
      teamCommission: 0,
      inviteCode: 'WDR9922',
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      tasksCompletedToday: 0
    };
    return [defaultUser];
  });

  // Current User
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('wdr_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Transactions
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('wdr_transactions');
    return saved ? JSON.parse(saved) : [
      {
        id: 'trx_welcome_1',
        userId: 'WDR9922',
        phone: '01899112233',
        type: 'welcome_bonus',
        amount: 100,
        status: 'completed',
        createdAt: new Date().toISOString(),
        notes: 'নতুন রেজিস্ট্রেশন বোনাস ১০০ টাকা'
      }
    ];
  });

  // Team Members
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
    const saved = localStorage.getItem('wdr_team_members');
    return saved ? JSON.parse(saved) : INITIAL_TEAM_MEMBERS;
  });

  // Real-time Chat Messages (Sync between User Live Chat & Admin Panel)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('wdr_chat_messages');
    return saved ? JSON.parse(saved) : [
      {
        id: 'msg_welcome',
        sender: 'agent',
        userName: 'সোফিয়া (সাপোর্ট অফিসার)',
        text: 'আসসালামু আলাইকুম! WDRTrustedFinance ২৪/৭ লাইভ সাপোর্টে আপনাকে স্বাগতম। আমি আপনার ব্যক্তিগত কাস্টমার সার্ভিস অফিসার। আপনাকে কীভাবে সাহায্য করতে পারি?',
        time: 'এখনই'
      }
    ];
  });

  // Modals & UI
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalData, setModalData] = useState<any>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('wdr_admin_auth') === 'true';
  });

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('wdr_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('wdr_vip_packages', JSON.stringify(vipPackages));
  }, [vipPackages]);

  useEffect(() => {
    localStorage.setItem('wdr_gateways', JSON.stringify(paymentGateways));
  }, [paymentGateways]);

  useEffect(() => {
    localStorage.setItem('wdr_banners', JSON.stringify(banners));
  }, [banners]);

  useEffect(() => {
    localStorage.setItem('wdr_all_users', JSON.stringify(allUsers));
  }, [allUsers]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('wdr_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('wdr_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('wdr_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('wdr_team_members', JSON.stringify(teamMembers));
  }, [teamMembers]);

  useEffect(() => {
    localStorage.setItem('wdr_chat_messages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const openModal = (modalName: string, data?: any) => {
    setActiveModal(modalName);
    setModalData(data || null);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalData(null);
  };

  // Auth: 1 Number = 1 Account
  const register = (phone: string, pass: string, inviteCode: string) => {
    const cleanPhone = phone.trim();
    // Check if phone already registered
    const exists = allUsers.some((u) => u.phone === cleanPhone);
    if (exists) {
      addToast('এই নম্বর দিয়ে ইতিমধ্যে একাউন্ট খোলা আছে! দয়া করে লগইন করুন।', 'error');
      return { success: false, error: 'এই নম্বর দিয়ে ইতিমধ্যে একাউন্ট খোলা আছে! দয়া করে লগইন করুন।' };
    }

    const randomId = 'WDR' + Math.floor(1000 + Math.random() * 9000);
    const newUser: User = {
      id: randomId,
      phone: cleanPhone,
      balance: settings.welcomeBonus, // 100 Taka
      vipLevel: 0,
      totalProfit: 0,
      todayProfit: 0,
      teamCommission: 0,
      inviteCode: randomId,
      invitedBy: inviteCode || 'WDR9922',
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      tasksCompletedToday: 0
    };

    const newTrx: Transaction = {
      id: 'trx_' + Math.random().toString(36).substring(2, 9),
      userId: newUser.id,
      phone: newUser.phone,
      type: 'welcome_bonus',
      amount: settings.welcomeBonus,
      status: 'completed',
      createdAt: new Date().toISOString(),
      notes: 'নতুন রেজিস্ট্রেশন বোনাস ১০০ টাকা'
    };

    // If invited by someone, add to team members
    const newMember: TeamMember = {
      id: 'm_' + Math.random().toString(36).substring(2, 8),
      phone: cleanPhone.substring(0, 5) + '***' + cleanPhone.slice(-3),
      level: 1,
      vipLevel: 0,
      joinedAt: new Date().toISOString().split('T')[0],
      totalDeposit: 0,
      totalWithdraw: 0,
      commissionEarned: 0
    };

    setAllUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    setTransactions((prev) => [newTrx, ...prev]);
    setTeamMembers((prev) => [newMember, ...prev]);

    addToast('অভিনন্দন! আপনার অ্যাকাউন্ট তৈরি সফল হয়েছে এবং ১০০ টাকা বোনাস যোগ হয়েছে।', 'success');
    // Open Registration Notification Modal
    openModal('registrationSuccess');
    return { success: true };
  };

  const login = (phone: string, _pass: string) => {
    const cleanPhone = phone.trim();
    const found = allUsers.find((u) => u.phone === cleanPhone);
    if (found) {
      if (found.isBanned) {
        addToast('আপনার অ্যাকাউন্ট সাময়িকভাবে স্থগিত বা ব্যান করা হয়েছে। সাপোর্টে যোগাযোগ করুন।', 'error');
        return false;
      }
      const updated = { ...found, lastLogin: new Date().toISOString() };
      setCurrentUser(updated);
      setAllUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
      addToast('সফলভাবে লগইন হয়েছে!', 'success');
      // Open notification modal on entering account as commanded
      openModal('registrationSuccess');
      return true;
    }

    addToast('এই নম্বরে কোনো অ্যাকাউন্ট পাওয়া যায়নি। দয়া করে সঠিক নম্বর দিন অথবা রেজিস্ট্রেশন করুন।', 'error');
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    addToast('লগআউট সম্পন্ন হয়েছে', 'info');
  };

  // Daily Checking Bonus: 20 Taka every 24 hours, only for users with VIP >= 1
  const claimDailyCheckin = () => {
    if (!currentUser) return { success: false, message: 'লগইন করুন' };

    // Rule: VIP >= 1 required! VIP 0 cannot claim checkin bonus
    if (currentUser.vipLevel <= 0) {
      return {
        success: false,
        message: 'চেকিং বোনাস পেতে অন্তত একটি ভিআইপি প্যাকেজ (VIP 1+) সক্রিয় থাকতে হবে।'
      };
    }

    const now = Date.now();
    if (currentUser.lastCheckinDate) {
      const lastCheck = new Date(currentUser.lastCheckinDate).getTime();
      const diffHours = (now - lastCheck) / (1000 * 60 * 60);
      if (diffHours < 24) {
        const remainingHours = Math.ceil(24 - diffHours);
        return {
          success: false,
          message: `আপনি ইতিমধ্যে আজকের চেকিং বোনাস নিয়েছেন। পরবর্তী বোনাস ${remainingHours} ঘণ্টা পর আনলক হবে।`
        };
      }
    }

    const bonus = settings.checkinBonus; // 20 Taka
    const updatedUser: User = {
      ...currentUser,
      balance: currentUser.balance + bonus,
      todayProfit: currentUser.todayProfit + bonus,
      totalProfit: currentUser.totalProfit + bonus,
      lastCheckinDate: new Date().toISOString()
    };

    const newTrx: Transaction = {
      id: 'trx_' + Math.random().toString(36).substring(2, 9),
      userId: currentUser.id,
      phone: currentUser.phone,
      type: 'checkin_bonus',
      amount: bonus,
      status: 'completed',
      createdAt: new Date().toISOString(),
      notes: 'দৈনিক সাইন-ইন/চেকিং রিওয়ার্ড ২০ টাকা'
    };

    setCurrentUser(updatedUser);
    setAllUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    setTransactions((prev) => [newTrx, ...prev]);
    addToast(`অভিনন্দন! আপনার অ্যাকাউন্টে ২০ টাকা চেকিং বোনাস যুক্ত হয়েছে।`, 'success');
    return { success: true, message: '২০ টাকা চেকিং বোনাস সফলভাবে গৃহীত হয়েছে!' };
  };

  // Submit Task: 2 tasks per 24 hours, only for VIP >= 1
  const submitTask = (_taskId: string) => {
    if (!currentUser) return { success: false, message: 'লগইন করুন', earned: 0 };

    if (currentUser.vipLevel <= 0) {
      return {
        success: false,
        message: 'টাস্ক সম্পন্ন করতে একটি ভিআইপি প্যাকেজ সক্রিয় করুন।',
        earned: 0
      };
    }

    const currentVip = vipPackages.find((v) => v.level === currentUser.vipLevel);
    if (!currentVip) return { success: false, message: 'প্যাকেজ পাওয়া যায়নি', earned: 0 };

    // Check 24 hour task quota
    const now = Date.now();
    let completedToday = currentUser.tasksCompletedToday || 0;
    if (currentUser.lastTaskDate) {
      const lastTask = new Date(currentUser.lastTaskDate).getTime();
      const diffHours = (now - lastTask) / (1000 * 60 * 60);
      if (diffHours >= 24) {
        completedToday = 0; // reset quota after 24h
      }
    }

    if (completedToday >= settings.tasksPerDay) {
      return {
        success: false,
        message: `আজকের জন্য নির্ধারিত ২টি টাস্ক ইতিমধ্যে সম্পন্ন করেছেন! পরবর্তী টাস্ক ২৪ ঘণ্টা পর আনলক হবে।`,
        earned: 0
      };
    }

    const earned = currentVip.perTaskProfit;
    const newCompleted = completedToday + 1;

    const updatedUser: User = {
      ...currentUser,
      balance: currentUser.balance + earned,
      todayProfit: currentUser.todayProfit + earned,
      totalProfit: currentUser.totalProfit + earned,
      tasksCompletedToday: newCompleted,
      lastTaskDate: new Date().toISOString()
    };

    const newTrx: Transaction = {
      id: 'trx_' + Math.random().toString(36).substring(2, 9),
      userId: currentUser.id,
      phone: currentUser.phone,
      type: 'task_income',
      amount: earned,
      status: 'completed',
      createdAt: new Date().toISOString(),
      notes: `ভিআইপি ${currentUser.vipLevel} টাস্ক আর্নিং (টাস্ক ${newCompleted}/২)`
    };

    // Calculate Referral Commission: L1 = 25%, L2 = 5%, L3 = 2%
    // Distribute commission to demo team
    const l1Commission = earned * 0.25;
    const l2Commission = earned * 0.05;
    const l3Commission = earned * 0.02;

    setTeamMembers((prev) =>
      prev.map((m) => {
        if (m.level === 1) {
          return { ...m, commissionEarned: m.commissionEarned + l1Commission };
        } else if (m.level === 2) {
          return { ...m, commissionEarned: m.commissionEarned + l2Commission };
        } else if (m.level === 3) {
          return { ...m, commissionEarned: m.commissionEarned + l3Commission };
        }
        return m;
      })
    );

    setCurrentUser(updatedUser);
    setAllUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    setTransactions((prev) => [newTrx, ...prev]);
    addToast(`টাস্ক সম্পন্ন হয়েছে! ৳${earned} আপনার একাউন্টে যোগ হয়েছে।`, 'success');

    return {
      success: true,
      message: `টাস্ক সম্পন্ন হয়েছে! ৳${earned} সফলভাবে মূল ব্যালেন্সে যোগ হয়েছে। (আজকের টাস্ক: ${newCompleted}/২)`,
      earned
    };
  };

  // Buy VIP Package
  const buyVipPackage = (level: number) => {
    if (!currentUser) return { success: false, message: 'লগইন করুন' };

    const targetPkg = vipPackages.find((p) => p.level === level);
    if (!targetPkg) return { success: false, message: 'প্যাকেজ পাওয়া যায়নি' };

    if (currentUser.balance < targetPkg.price) {
      return {
        success: false,
        message: `পর্যাপ্ত ব্যালেন্স নেই! এই প্যাকেজের জন্য ৳${targetPkg.price} প্রয়োজন। দয়া করে আগে রিচার্জ করুন।`
      };
    }

    const updatedUser: User = {
      ...currentUser,
      balance: currentUser.balance - targetPkg.price,
      vipLevel: level,
      tasksCompletedToday: 0
    };

    const newTrx: Transaction = {
      id: 'trx_' + Math.random().toString(36).substring(2, 9),
      userId: currentUser.id,
      phone: currentUser.phone,
      type: 'task_income',
      amount: -targetPkg.price,
      status: 'completed',
      createdAt: new Date().toISOString(),
      notes: `${targetPkg.titleBn} প্যাকেজ ক্রয় সম্পন্ন`
    };

    setCurrentUser(updatedUser);
    setAllUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    setTransactions((prev) => [newTrx, ...prev]);
    addToast(`অভিনন্দন! ${targetPkg.titleBn} সফলভাবে সক্রিয় হয়েছে।`, 'success');
    return { success: true, message: `${targetPkg.titleBn} সক্রিয় হয়েছে!` };
  };

  // Deposit Request
  const requestDeposit = (method: string, amount: number, senderNumber: string, trxId: string) => {
    if (!currentUser) return;

    const newTrx: Transaction = {
      id: 'trx_' + Math.random().toString(36).substring(2, 9),
      userId: currentUser.id,
      phone: currentUser.phone,
      type: 'deposit',
      amount,
      method,
      accountNumber: senderNumber,
      trxId,
      status: 'pending',
      createdAt: new Date().toISOString(),
      notes: `${method} এর মাধ্যমে ৳${amount} ডিপোজিট আবেদন`
    };

    setTransactions((prev) => [newTrx, ...prev]);
    addToast('আপনার রিচার্জ আবেদন সফলভাবে জমা হয়েছে! অ্যাডমিন অনুমোদনের পর ব্যালেন্স যুক্ত হবে।', 'success');
  };

  // Withdraw: Rule: Must have VIP >= 1. Locked for VIP 0!
  const requestWithdraw = (amount: number, method: string, accountNumber: string, _pin: string) => {
    if (!currentUser) return { success: false, message: 'লগইন করুন' };

    // Withdrawal lock for VIP 0
    if (currentUser.vipLevel <= 0) {
      return {
        success: false,
        message: 'উত্তলন করতে একটি পেকেজ ক্রয় করুন এবং সফল ভাবে টাকা উত্তলন করে নিন'
      };
    }

    if (amount < settings.minWithdrawAmount) {
      return {
        success: false,
        message: `সর্বনিম্ন উত্তোলনের পরিমাণ ৳${settings.minWithdrawAmount}`
      };
    }

    if (currentUser.balance < amount) {
      return {
        success: false,
        message: 'আপনার একাউন্টে পর্যাপ্ত ব্যালেন্স নেই।'
      };
    }

    const updatedUser: User = {
      ...currentUser,
      balance: currentUser.balance - amount
    };

    const newTrx: Transaction = {
      id: 'trx_' + Math.random().toString(36).substring(2, 9),
      userId: currentUser.id,
      phone: currentUser.phone,
      type: 'withdraw',
      amount,
      method,
      accountNumber,
      status: 'pending',
      createdAt: new Date().toISOString(),
      notes: `${method} (${accountNumber})-এ ৳${amount} উত্তোলন আবেদন`
    };

    setCurrentUser(updatedUser);
    setAllUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    setTransactions((prev) => [newTrx, ...prev]);
    addToast('উত্তোলন আবেদন সফলভাবে জমা হয়েছে! ৫-৩০ মিনিটের মধ্যে পেমেন্ট সম্পন্ন হবে।', 'success');

    return {
      success: true,
      message: 'উত্তোলন আবেদন সফলভাবে গ্রহণ করা হয়েছে!'
    };
  };

  // Bind Wallet
  const bindWallet = (method: 'bKash' | 'Nagad' | 'Rocket' | 'USDT', number: string, _pin: string) => {
    if (!currentUser) return false;
    const updatedUser: User = {
      ...currentUser,
      walletAddress: {
        method,
        number,
        pinConfigured: true
      }
    };
    setCurrentUser(updatedUser);
    setAllUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    addToast('উইথড্র অ্যাকাউন্ট সফলভাবে সংরক্ষণ করা হয়েছে!', 'success');
    return true;
  };

  // Live Chat: User sends message
  const sendUserChatMessage = (text: string) => {
    const newMsg: ChatMessage = {
      id: 'usr_' + Date.now(),
      sender: 'user',
      userName: currentUser ? `User (${currentUser.phone.substring(0, 5)}***)` : 'ভিজিটর',
      userPhone: currentUser?.phone || 'Guest',
      text,
      time: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages((prev) => [...prev, newMsg]);

    // Automated immediate link reply if admin hasn't taken over yet
    setTimeout(() => {
      const autoReply: ChatMessage = {
        id: 'agent_auto_' + Date.now(),
        sender: 'agent',
        userName: 'সোফিয়া (সাপোর্ট অফিসার)',
        text: 'আপনার বার্তাটি গৃহীত হয়েছে। দ্রুততম সমাধান ও সহায়তার জন্য দয়া করে নিচের অফিশিয়াল টেলিগ্রাম চ্যানেল ও সাপোর্ট ম্যানেজারের সাথে সরাসরি যোগাযোগ করুন:',
        time: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
        showLinks: true
      };
      setChatMessages((prev) => [...prev, autoReply]);
    }, 700);
  };

  // Live Chat: Admin sends custom reply directly to user
  const sendAdminChatMessage = (text: string, showLinks: boolean = false) => {
    const adminMsg: ChatMessage = {
      id: 'agent_' + Date.now(),
      sender: 'agent',
      userName: 'সোফিয়া (সাপোর্ট ম্যানেজার - অ্যাডমিন)',
      text,
      time: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
      showLinks
    };
    setChatMessages((prev) => [...prev, adminMsg]);
    addToast('ইউজার চ্যাটে আপনার রিপ্লাই পাঠানো হয়েছে!', 'success');
  };

  const clearChatHistory = () => {
    const welcomeOnly: ChatMessage[] = [
      {
        id: 'msg_welcome',
        sender: 'agent',
        userName: 'সোফিয়া (সাপোর্ট অফিসার)',
        text: 'আসসালামু আলাইকুম! WDRTrustedFinance ২৪/৭ লাইভ সাপোর্টে আপনাকে স্বাগতম। আমি আপনার ব্যক্তিগত কাস্টমার সার্ভিস অফিসার। আপনাকে কীভাবে সাহায্য করতে পারি?',
        time: 'এখনই'
      }
    ];
    setChatMessages(welcomeOnly);
    addToast('চ্যাট হিস্ট্রি মুছে ফেলা হয়েছে', 'info');
  };

  // Admin Actions
  const adminLogin = (password: string) => {
    if (password === 'admin123') {
      setIsAdminAuthenticated(true);
      localStorage.setItem('wdr_admin_auth', 'true');
      addToast('অ্যাডমিন প্যানেলে স্বাগতম!', 'success');
      return true;
    }
    addToast('ভুল অ্যাডমিন পাসওয়ার্ড!', 'error');
    return false;
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('wdr_admin_auth');
    addToast('অ্যাডমিন প্যানেল থেকে লগআউট সম্পন্ন হয়েছে', 'info');
  };

  const updateSettings = (newSettings: Partial<PlatformSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    addToast('সেটিংস সফলভাবে সংরক্ষিত হয়েছে!', 'success');
  };

  const updatePaymentGateways = (gateways: PaymentGateway[]) => {
    setPaymentGateways(gateways);
    addToast('পেমেন্ট গেটওয়ে নম্বর ও তথ্য আপডেট হয়েছে!', 'success');
  };

  const updateBanners = (newBanners: BannerItem[]) => {
    setBanners(newBanners);
    addToast('ব্যানার ও ছবি আপডেট সম্পন্ন হয়েছে!', 'success');
  };

  const updateVipPackages = (packages: VipPackage[]) => {
    setVipPackages(packages);
    addToast('ভিআইপি প্যাকেজ রেট আপডেট হয়েছে!', 'success');
  };

  const approveTransaction = (id: string) => {
    const trx = transactions.find((t) => t.id === id);
    if (!trx) return;

    if (trx.type === 'deposit') {
      const depositAmount = trx.amount;
      const depositor = allUsers.find((u) => u.id === trx.userId || u.phone === trx.phone);

      // 3-Tier Referral Commissions on Deposit:
      // Level 1: 25%
      // Level 2: 5%
      // Level 3: 2%
      const l1Bonus = depositAmount * 0.25;
      const l2Bonus = depositAmount * 0.05;
      const l3Bonus = depositAmount * 0.02;

      const commissionTrxs: Transaction[] = [];

      // Find Level 1 referrer
      let l1User = depositor?.invitedBy
        ? allUsers.find((u) => u.id === depositor.invitedBy || u.inviteCode === depositor.invitedBy)
        : null;

      // If depositor was invited by currentUser or matches currentUser inviteCode
      if (!l1User && currentUser && (depositor?.invitedBy === currentUser.id || depositor?.invitedBy === currentUser.inviteCode)) {
        l1User = currentUser;
      }

      let l2User: User | null = null;
      let l3User: User | null = null;

      if (l1User) {
        commissionTrxs.push({
          id: 'trx_' + Math.random().toString(36).substring(2, 9),
          userId: l1User.id,
          phone: l1User.phone,
          type: 'team_commission',
          amount: l1Bonus,
          status: 'completed',
          createdAt: new Date().toISOString(),
          notes: `লেভেল ১ রেফারেল ডিপোজিট বোনাস (২৫%) - ৳${depositAmount} এর ২৫% (ইউজার: ${depositor?.phone?.substring(0, 5) || ''}***)`
        });

        // Find Level 2 referrer
        if (l1User.invitedBy) {
          l2User = allUsers.find((u) => u.id === l1User.invitedBy || u.inviteCode === l1User.invitedBy) || null;
          if (l2User) {
            commissionTrxs.push({
              id: 'trx_' + Math.random().toString(36).substring(2, 9),
              userId: l2User.id,
              phone: l2User.phone,
              type: 'team_commission',
              amount: l2Bonus,
              status: 'completed',
              createdAt: new Date().toISOString(),
              notes: `লেভেল ২ রেফারেল ডিপোজিট বোনাস (৫%) - ৳${depositAmount} এর ৫%`
            });

            // Find Level 3 referrer
            const l2InvitedBy = l2User.invitedBy;
            if (l2InvitedBy) {
              l3User = allUsers.find((u) => u.id === l2InvitedBy || u.inviteCode === l2InvitedBy) || null;
              if (l3User) {
                commissionTrxs.push({
                  id: 'trx_' + Math.random().toString(36).substring(2, 9),
                  userId: l3User.id,
                  phone: l3User.phone,
                  type: 'team_commission',
                  amount: l3Bonus,
                  status: 'completed',
                  createdAt: new Date().toISOString(),
                  notes: `লেভেল ৩ রেফারেল ডিপোজিট বোনাস (২%) - ৳${depositAmount} এর ২%`
                });
              }
            }
          }
        }
      }

      // Update all users: Depositor gets deposit balance; referrers get referral commissions
      setAllUsers((prev) =>
        prev.map((u) => {
          if (u.id === trx.userId || u.phone === trx.phone) {
            return { ...u, balance: u.balance + depositAmount };
          }
          if (l1User && (u.id === l1User.id || u.phone === l1User.phone)) {
            return {
              ...u,
              balance: u.balance + l1Bonus,
              teamCommission: (u.teamCommission || 0) + l1Bonus,
              totalProfit: (u.totalProfit || 0) + l1Bonus
            };
          }
          if (l2User && (u.id === l2User.id || u.phone === l2User.phone)) {
            return {
              ...u,
              balance: u.balance + l2Bonus,
              teamCommission: (u.teamCommission || 0) + l2Bonus,
              totalProfit: (u.totalProfit || 0) + l2Bonus
            };
          }
          if (l3User && (u.id === l3User.id || u.phone === l3User.phone)) {
            return {
              ...u,
              balance: u.balance + l3Bonus,
              teamCommission: (u.teamCommission || 0) + l3Bonus,
              totalProfit: (u.totalProfit || 0) + l3Bonus
            };
          }
          return u;
        })
      );

      // If currentUser is depositor, reflect deposit
      if (currentUser && (currentUser.id === trx.userId || currentUser.phone === trx.phone)) {
        setCurrentUser((prev) => (prev ? { ...prev, balance: prev.balance + depositAmount } : null));
      }

      // If currentUser is Level 1 referrer, reflect commission instantly
      if (currentUser && l1User && (currentUser.id === l1User.id || currentUser.phone === l1User.phone)) {
        setCurrentUser((prev) =>
          prev
            ? {
                ...prev,
                balance: prev.balance + l1Bonus,
                teamCommission: (prev.teamCommission || 0) + l1Bonus,
                totalProfit: (prev.totalProfit || 0) + l1Bonus
              }
            : null
        );
        addToast(`অভিনন্দন! আপনার রেফারেল মেম্বার ডিপোজিট করায় আপনি ২৫% কমিশন (৳${l1Bonus}) পেয়েছেন!`, 'success');
      }

      // Update Team Members list
      setTeamMembers((prev) => {
        let matched = false;
        const updated = prev.map((m) => {
          if (depositor && (m.phone.includes(depositor.phone.slice(-3)) || m.phone === depositor.phone)) {
            matched = true;
            return {
              ...m,
              totalDeposit: m.totalDeposit + depositAmount,
              commissionEarned: m.commissionEarned + l1Bonus
            };
          }
          return m;
        });

        // Also update realistic team breakdown for demo/levels
        if (!matched) {
          return updated.map((m) => {
            if (m.level === 1) {
              return { ...m, totalDeposit: m.totalDeposit + depositAmount, commissionEarned: m.commissionEarned + l1Bonus };
            } else if (m.level === 2) {
              return { ...m, totalDeposit: m.totalDeposit + depositAmount, commissionEarned: m.commissionEarned + l2Bonus };
            } else if (m.level === 3) {
              return { ...m, totalDeposit: m.totalDeposit + depositAmount, commissionEarned: m.commissionEarned + l3Bonus };
            }
            return m;
          });
        }
        return updated;
      });

      if (commissionTrxs.length > 0) {
        setTransactions((prev) => [...commissionTrxs, ...prev]);
      }
    }

    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: 'approved' } : t))
    );
    addToast('লেনদেন অনুমোদন (Approved) করা হয়েছে!', 'success');
  };

  const rejectTransaction = (id: string) => {
    const trx = transactions.find((t) => t.id === id);
    if (!trx) return;

    if (trx.type === 'withdraw') {
      // refund user balance
      setAllUsers((prev) =>
        prev.map((u) => {
          if (u.id === trx.userId || u.phone === trx.phone) {
            return { ...u, balance: u.balance + trx.amount };
          }
          return u;
        })
      );
      if (currentUser && (currentUser.id === trx.userId || currentUser.phone === trx.phone)) {
        setCurrentUser((prev) => (prev ? { ...prev, balance: prev.balance + trx.amount } : null));
      }
    }

    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: 'rejected' } : t))
    );
    addToast('লেনদেন বাতিল (Rejected) করা হয়েছে!', 'info');
  };

  const adjustUserBalance = (userId: string, amount: number) => {
    setAllUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          return { ...u, balance: Math.max(0, u.balance + amount) };
        }
        return u;
      })
    );
    if (currentUser && currentUser.id === userId) {
      setCurrentUser((prev) => (prev ? { ...prev, balance: Math.max(0, prev.balance + amount) } : null));
    }
    addToast(`ইউজারের ব্যালেন্স ৳${amount} সমন্বয় করা হয়েছে`, 'success');
  };

  const toggleUserBan = (userId: string) => {
    setAllUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const isBanned = !u.isBanned;
          return { ...u, isBanned };
        }
        return u;
      })
    );
    addToast('ইউজার স্ট্যাটাস পরিবর্তন করা হয়েছে', 'info');
  };

  const addNewUserByAdmin = (phone: string, balance: number, vipLevel: number) => {
    const cleanPhone = phone.trim();
    if (allUsers.some((u) => u.phone === cleanPhone)) {
      addToast('এই নম্বরে ইতোমধ্যে অ্যাকাউন্ট রয়েছে', 'error');
      return;
    }
    const newId = 'WDR' + Math.floor(1000 + Math.random() * 9000);
    const newUser: User = {
      id: newId,
      phone: cleanPhone,
      balance,
      vipLevel,
      totalProfit: 0,
      todayProfit: 0,
      teamCommission: 0,
      inviteCode: newId,
      createdAt: new Date().toISOString(),
      lastLogin: 'Never',
      tasksCompletedToday: 0
    };
    setAllUsers((prev) => [...prev, newUser]);
    addToast('নতুন ইউজার সফলভাবে যোগ করা হয়েছে!', 'success');
  };

  const setUserExactBalance = (userId: string, newBalance: number) => {
    const val = Math.max(0, newBalance);
    setAllUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, balance: val } : u))
    );
    if (currentUser && currentUser.id === userId) {
      setCurrentUser((prev) => (prev ? { ...prev, balance: val } : null));
    }
    addToast(`ইউজারের ব্যালেন্স ৳${val} সফলভাবে সেট করা হয়েছে`, 'success');
  };

  const setUserVipLevel = (userId: string, level: number) => {
    setAllUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, vipLevel: level } : u))
    );
    if (currentUser && currentUser.id === userId) {
      setCurrentUser((prev) => (prev ? { ...prev, vipLevel: level } : null));
    }
    addToast(`ইউজারকে সফলভাবে VIP ${level} এ উন্নীত করা হয়েছে!`, 'success');
  };

  const resetUserTasks = (userId: string) => {
    setAllUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, tasksCompletedToday: 0 } : u))
    );
    if (currentUser && currentUser.id === userId) {
      setCurrentUser((prev) => (prev ? { ...prev, tasksCompletedToday: 0 } : null));
    }
    addToast('ইউজারের দৈনিক টাস্ক রিসেট করা হয়েছে', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        settings,
        vipPackages,
        paymentGateways,
        banners,
        transactions,
        teamMembers,
        allUsers,
        chatMessages,
        activeModal,
        modalData,
        toasts,
        isAdminAuthenticated,
        login,
        register,
        logout,
        openModal,
        closeModal,
        addToast,
        claimDailyCheckin,
        submitTask,
        buyVipPackage,
        requestDeposit,
        requestWithdraw,
        bindWallet,
        sendUserChatMessage,
        sendAdminChatMessage,
        clearChatHistory,
        adminLogin,
        adminLogout,
        updateSettings,
        updatePaymentGateways,
        updateBanners,
        updateVipPackages,
        approveTransaction,
        rejectTransaction,
        adjustUserBalance,
        setUserExactBalance,
        setUserVipLevel,
        resetUserTasks,
        toggleUserBan,
        addNewUserByAdmin
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
