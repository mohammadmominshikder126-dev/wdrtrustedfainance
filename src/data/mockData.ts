import { VipPackage, PaymentGateway, BannerItem, PlatformSettings, TeamMember } from '../types';

export const INITIAL_SETTINGS: PlatformSettings = {
  siteName: 'WDRTrustedFinance',
  marqueeNotice: '🎉 স্বাগতম WDRTrustedFinance এ! নতুন একাউন্ট করলেই পাচ্ছেন ১০০ টাকা ওয়েলকাম বোনাস। প্রতিদিন ভিআইপি প্ল্যানে ২টি টাস্ক ও ৩ স্তরের আকর্ষণীয় রেফারেল বোনাস (২৫%, ৫%, ২%)। বিকাশ ও নগদে দ্রুত লেনদেন সম্পন্ন হয়।',
  telegramGroupUrl: 'https://t.me/wdrtrustedfinance_group',
  telegramChannelUrl: 'https://t.me/wdrtrustedfinance_channel',
  supportSophiaTelegram: 'https://t.me/wdr_sophia_agent',
  supportJamesTelegram: 'https://t.me/wdr_james_agent',
  whatsappSupportNumber: '+8801899988877',
  minWithdrawAmount: 500,
  welcomeBonus: 100,
  checkinBonus: 20,
  tasksPerDay: 2
};

export const INITIAL_VIP_PACKAGES: VipPackage[] = [
  {
    level: 0,
    name: 'VIP 0',
    titleBn: 'ভিআইপি ০ - ফ্রি ট্রায়াল',
    price: 0,
    priceBn: '৳০',
    dailyTasks: 0,
    dailyProfit: 0,
    dailyProfitBn: '৳০',
    perTaskProfit: 0,
    perTaskProfitBn: '৳০',
    validityDays: 0,
    validityBn: 'সীমিত',
    descriptionBn: 'ফ্রি ট্রায়াল সদস্য (উত্তোলন এবং চেকিং বোনাস পেতে ভিআইপি ১ কিনুন)',
    badgeColor: 'from-slate-600 to-slate-800'
  },
  {
    level: 1,
    name: 'VIP 1',
    titleBn: '১নং পেকেজ - ৩০০ টাকা',
    price: 300,
    priceBn: '৳৩০০',
    dailyTasks: 2,
    dailyProfit: 30,
    dailyProfitBn: '৳৩০',
    perTaskProfit: 15,
    perTaskProfitBn: '৳১৫',
    validityDays: 60,
    validityBn: '৬০ দিন',
    descriptionBn: 'প্রতিদিন ২টি কাজ | প্রতি কাজে ১৫ টাকা লাভ | প্রতিদিন মোট আয় ৩০ টাকা',
    badgeColor: 'from-amber-600 to-amber-800'
  },
  {
    level: 2,
    name: 'VIP 2',
    titleBn: '২নং পেকেজ - ৮০০ টাকা',
    price: 800,
    priceBn: '৳৮০০',
    dailyTasks: 2,
    dailyProfit: 80,
    dailyProfitBn: '৳৮০',
    perTaskProfit: 40,
    perTaskProfitBn: '৳৪০',
    validityDays: 90,
    validityBn: '৯০ দিন',
    descriptionBn: 'প্রতিদিন ২টি কাজ | প্রতি কাজে ৪০ টাকা লাভ | প্রতিদিন মোট আয় ৮০ টাকা',
    badgeColor: 'from-amber-500 to-amber-700'
  },
  {
    level: 3,
    name: 'VIP 3',
    titleBn: '৩নং পেকেজ - ১২০০ টাকা',
    price: 1200,
    priceBn: '৳১,২০০',
    dailyTasks: 2,
    dailyProfit: 130,
    dailyProfitBn: '৳১৩০',
    perTaskProfit: 65,
    perTaskProfitBn: '৳৬৫',
    validityDays: 120,
    validityBn: '১২০ দিন',
    descriptionBn: 'প্রতিদিন ২টি কাজ | প্রতি কাজে ৬৫ টাকা লাভ | প্রতিদিন মোট আয় ১৩০ টাকা',
    badgeColor: 'from-cyan-600 to-blue-700'
  },
  {
    level: 4,
    name: 'VIP 4',
    titleBn: '৪নং পেকেজ - ১৫০০ টাকা',
    price: 1500,
    priceBn: '৳১,৫০০',
    dailyTasks: 2,
    dailyProfit: 180,
    dailyProfitBn: '৳১৮০',
    perTaskProfit: 90,
    perTaskProfitBn: '৳৯০',
    validityDays: 150,
    validityBn: '১৫০ দিন',
    descriptionBn: 'প্রতিদিন ২টি কাজ | প্রতি কাজে ৯০ টাকা লাভ | প্রতিদিন মোট আয় ১৮০ টাকা',
    badgeColor: 'from-yellow-500 to-amber-600'
  }
];

export const INITIAL_PAYMENT_GATEWAYS: PaymentGateway[] = [
  {
    method: 'bKash',
    title: 'বিকাশ (bKash Personal Send Money)',
    number: '01899223344',
    instructions: 'বিকাশ এ শুধু সেন্ড মানি করুন। আপনার বিকাশ অ্যাপ থেকে *Send Money* অপশনে গিয়ে ওপরের নম্বরে টাকা পাঠান। টাকা পাঠানোর পর ট্রানজেকশন আইডি (TrxID) নিচে লিখে নিশ্চিত করুন।',
    isActive: true
  },
  {
    method: 'Nagad',
    title: 'নগদ (নগদ শুধুমাত্র ক্যাশ আউট করুন)',
    number: '01711889900',
    instructions: 'নগদ শুধুমাত্র ক্যাশ আউট করুন। নগদ অ্যাপ অথবা ডায়াল করে *Cash Out* অপশনে গিয়ে ওপরের এজেন্ট নম্বরে টাকা ক্যাশআউট করুন। এরপর প্রাপ্ত ট্রানজেকশন আইডি (TrxID) নিচে লিখে নিশ্চিত করুন।',
    isActive: true
  },
  {
    method: 'Rocket',
    title: 'রকেট (Rocket Agent Cashout)',
    number: '01922334455',
    instructions: 'রকেট এজেন্ট একাউন্টে ক্যাশ আউট করে ট্রানজেকশন আইডি সাবমিট করুন। ৫-১০ মিনিটের মধ্যে ব্যালেন্স যুক্ত হবে।',
    isActive: true
  },
  {
    method: 'USDT',
    title: 'USDT (TRC20 Wallet)',
    number: 'TXY99abcTrustedFinanceTRC20OfficialWalletWDR',
    instructions: 'বাইনান্স বা যেকোনো ক্রিপ্টো ওয়ালেট থেকে TRC20 নেটওয়ার্কে USDT ট্রান্সফার করুন। রেট: ১ USDT = ১২৫ টাকা।',
    rate: 125,
    isActive: true
  }
];

export const INITIAL_BANNERS: BannerItem[] = [
  {
    id: 'b1',
    title: 'WDRTrustedFinance ক্লাউড আর্নিং',
    subtitle: 'প্রতিদিন নিশ্চিত আয় ও ২৪ ঘণ্টার নির্ভরযোগ্য পেমেন্ট',
    tag: 'HOT',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'b2',
    title: '৩ স্তরের রেফারেল ইনকাম (২৫%, ৫%, ২%)',
    subtitle: 'বন্ধুদের ইনভাইট করে আজীবন বিশাল কমিশন উপভোগ করুন',
    tag: 'BONUS',
    imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'b3',
    title: 'ভিআইপি সদস্য পদ ও দ্রুত উইথড্রয়াল',
    subtitle: 'বিকাশ, নগদ ও রকেটে ৫-১৫ মিনিটে সরাসরি ক্যাশ পান',
    tag: 'VIP',
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'b4',
    title: '১০০ টাকা ফ্রি রেজিস্ট্রেশন বোনাস',
    subtitle: 'নতুন একাউন্ট খুলেই ১০০ টাকা ফ্রি বোনাস ও দৈনিক ২০ টাকা আয়',
    tag: 'NEW',
    imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'b5',
    title: 'নিরাপদ পেমেন্ট ও ২৪/৭ লাইভ সাপোর্ট',
    subtitle: 'টেলিগ্রাম ও লাইভ চ্যাটে আমাদের কাস্টমার সার্ভিসের সাথে যুক্ত থাকুন',
    tag: 'SECURE',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80'
  }
];

export const INITIAL_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'm1',
    phone: '01798***123',
    level: 1,
    vipLevel: 1,
    joinedAt: '2026-11-06',
    totalDeposit: 1000,
    totalWithdraw: 250,
    commissionEarned: 120
  },
  {
    id: 'm2',
    phone: '01811***456',
    level: 1,
    vipLevel: 2,
    joinedAt: '2026-11-05',
    totalDeposit: 2500,
    totalWithdraw: 400,
    commissionEarned: 320
  },
  {
    id: 'm3',
    phone: '01933***789',
    level: 2,
    vipLevel: 1,
    joinedAt: '2026-11-07',
    totalDeposit: 1000,
    totalWithdraw: 0,
    commissionEarned: 50
  },
  {
    id: 'm4',
    phone: '01644***321',
    level: 3,
    vipLevel: 0,
    joinedAt: '2026-11-07',
    totalDeposit: 0,
    totalWithdraw: 0,
    commissionEarned: 0
  }
];

export const SAMPLE_LIVE_PAYOUTS = [
  { phone: '017****4210', amount: 1500, method: 'bKash', time: '১ মিনিট আগে' },
  { phone: '018****8831', amount: 2800, method: 'Nagad', time: '২ মিনিট আগে' },
  { phone: '019****1124', amount: 950, method: 'bKash', time: '৩ মিনিট আগে' },
  { phone: '016****9012', amount: 5400, method: 'Rocket', time: '৪ মিনিট আগে' },
  { phone: '017****6632', amount: 1200, method: 'Nagad', time: '৫ মিনিট আগে' },
  { phone: '013****7841', amount: 3100, method: 'bKash', time: '৭ মিনিট আগে' },
  { phone: '015****3490', amount: 800, method: 'Nagad', time: '৮ মিনিট আগে' },
  { phone: '018****0029', amount: 4600, method: 'USDT', time: '১০ মিনিট আগে' }
];

export const DEMO_TASK_ITEMS = [
  {
    id: 't1',
    merchantName: 'Daraz Cloud Mall',
    productName: 'Xiaomi Smart Wireless Earbuds Pro',
    productImage: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=300&q=80',
    orderPrice: 1200
  },
  {
    id: 't2',
    merchantName: 'Alibaba Express Merchant',
    productName: 'Luxury Chronograph Waterproof Watch',
    productImage: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=300&q=80',
    orderPrice: 2800
  },
  {
    id: 't3',
    merchantName: 'Amazon Prime Global',
    productName: 'Ergonomic Wireless Mechanical Keyboard',
    productImage: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=300&q=80',
    orderPrice: 4500
  },
  {
    id: 't4',
    merchantName: 'eBay International',
    productName: '4K Ultra HD Action Sports Camera',
    productImage: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=300&q=80',
    orderPrice: 6200
  }
];
