export interface User {
  id: string;
  phone: string;
  balance: number;
  vipLevel: number;
  totalProfit: number;
  todayProfit: number;
  teamCommission: number;
  inviteCode: string;
  invitedBy?: string;
  createdAt: string;
  lastLogin: string;
  isBanned?: boolean;
  tasksCompletedToday: number;
  lastTaskDate?: string;
  lastCheckinDate?: string;
  walletAddress?: {
    method: 'bKash' | 'Nagad' | 'Rocket' | 'USDT';
    number: string;
    pinConfigured?: boolean;
  };
}

export interface VipPackage {
  level: number;
  name: string;
  titleBn: string;
  price: number;
  priceBn: string;
  dailyTasks: number;
  dailyProfit: number;
  dailyProfitBn: string;
  perTaskProfit: number;
  perTaskProfitBn: string;
  validityDays: number;
  validityBn: string;
  descriptionBn: string;
  badgeColor: string;
}

export interface Transaction {
  id: string;
  userId: string;
  phone: string;
  type: 'deposit' | 'withdraw' | 'task_income' | 'team_commission' | 'welcome_bonus' | 'checkin_bonus';
  amount: number;
  method?: string;
  accountNumber?: string;
  trxId?: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  createdAt: string;
  notes?: string;
}

export interface TeamMember {
  id: string;
  phone: string;
  level: 1 | 2 | 3;
  vipLevel: number;
  joinedAt: string;
  totalDeposit: number;
  totalWithdraw: number;
  commissionEarned: number;
}

export interface PaymentGateway {
  method: 'bKash' | 'Nagad' | 'Rocket' | 'USDT';
  title: string;
  number: string;
  instructions: string;
  rate?: number; // e.g. 1 USDT = 125 BDT
  qrCodeUrl?: string;
  isActive: boolean;
}

export interface BannerItem {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  imageUrl: string;
  link?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  userName?: string;
  userPhone?: string;
  text: string;
  time: string;
  showLinks?: boolean;
}

export interface PlatformSettings {
  siteName: string;
  marqueeNotice: string;
  telegramGroupUrl: string;
  telegramChannelUrl: string;
  supportSophiaTelegram: string;
  supportJamesTelegram: string;
  whatsappSupportNumber: string;
  minWithdrawAmount: number;
  welcomeBonus: number;
  checkinBonus: number;
  tasksPerDay: number;
}

export interface TaskItem {
  id: string;
  merchantName: string;
  productName: string;
  productImage: string;
  orderPrice: number;
  commission: number;
}
