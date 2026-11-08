import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, ArrowDownLeft, ArrowUpRight, Award, Gift, Zap } from 'lucide-react';
import { formatTaka } from '../../utils/urlHelpers';

export const FinancialRecordsModal: React.FC = () => {
  const { closeModal, transactions, currentUser } = useApp();
  const [filter, setFilter] = useState<'all' | 'deposit' | 'withdraw' | 'task_income' | 'bonus'>('all');

  const userTransactions = transactions.filter(
    (t) => t.userId === currentUser?.id || t.phone === currentUser?.phone
  );

  const filtered = userTransactions.filter((t) => {
    if (filter === 'all') return true;
    if (filter === 'bonus') return t.type === 'welcome_bonus' || t.type === 'checkin_bonus' || t.type === 'team_commission';
    return t.type === filter;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-md bg-slate-900 border border-amber-500/30 rounded-2xl p-5 shadow-2xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
          <h3 className="text-base font-bold text-amber-300">আর্থিক লেনদেনের খতিয়ান</h3>
          <button
            onClick={closeModal}
            className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1.5 py-3 overflow-x-auto no-scrollbar shrink-0">
          {[
            { id: 'all', label: 'সকল' },
            { id: 'deposit', label: 'রিচার্জ' },
            { id: 'withdraw', label: 'উত্তোলন' },
            { id: 'task_income', label: 'টাস্ক আয়' },
            { id: 'bonus', label: 'বোনাস' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id as any)}
              className={`px-3 py-1 text-xs font-bold rounded-lg whitespace-nowrap transition-all ${
                filter === item.id
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-850 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Transaction list */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-xs">
              কোনো লেনদেন রেকর্ড পাওয়া যায়নি।
            </div>
          ) : (
            filtered.map((trx) => {
              const isPositive = trx.amount > 0 && trx.type !== 'withdraw';
              return (
                <div
                  key={trx.id}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        trx.type === 'deposit'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : trx.type === 'withdraw'
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                          : trx.type === 'task_income'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30'
                      }`}
                    >
                      {trx.type === 'deposit' && <ArrowDownLeft className="w-5 h-5" />}
                      {trx.type === 'withdraw' && <ArrowUpRight className="w-5 h-5" />}
                      {trx.type === 'task_income' && <Zap className="w-5 h-5" />}
                      {(trx.type === 'welcome_bonus' || trx.type === 'checkin_bonus' || trx.type === 'team_commission') && (
                        <Gift className="w-5 h-5" />
                      )}
                    </div>

                    <div>
                      <span className="text-xs font-bold text-slate-200 block">
                        {trx.notes || (trx.type === 'deposit' ? 'রিচার্জ' : 'উত্তোলন')}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {new Date(trx.createdAt).toLocaleString('bn-BD')}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`text-sm font-extrabold block ${
                        isPositive ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {isPositive ? '+' : '-'}{formatTaka(Math.abs(trx.amount))}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.2 rounded inline-block ${
                        trx.status === 'completed' || trx.status === 'approved'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : trx.status === 'pending'
                          ? 'bg-amber-500/10 text-amber-400'
                          : 'bg-rose-500/10 text-rose-400'
                      }`}
                    >
                      {trx.status === 'completed'
                        ? 'সফল'
                        : trx.status === 'approved'
                        ? 'অনুমোদিত'
                        : trx.status === 'pending'
                        ? 'অপেক্ষমান'
                        : 'বাতিল'}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
