import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Bot, ExternalLink, Headphones, SendHorizontal } from 'lucide-react';
import { formatTelegramUrl, formatWhatsAppUrl } from '../../utils/urlHelpers';

export const LiveChatModal: React.FC = () => {
  const { closeModal, settings, chatMessages, sendUserChatMessage } = useApp();
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    sendUserChatMessage(input.trim());
    setInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-md bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl flex flex-col h-[560px] max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-amber-500/20">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-300 leading-tight">২৪/৭ লাইভ হেল্পডেস্ক</h4>
              <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                সাপোর্ট অফিসার সোফিয়া (অনলাইন)
              </span>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Links Header */}
        <div className="px-3 py-2 bg-amber-500/10 border-b border-amber-500/20 flex items-center justify-between text-xs">
          <span className="text-amber-200 font-medium">সরাসরি টেলিগ্রামে কথা বলুন:</span>
          <a
            href={formatTelegramUrl(settings.supportSophiaTelegram)}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-amber-400 hover:underline font-bold"
          >
            <span>@Sophia_Support</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Message Feed - Synchronized with AppContext so Admin replies appear immediately */}
        <div className="flex-1 p-3.5 overflow-y-auto space-y-3">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <span className="text-[10px] text-slate-400 mb-0.5 px-1 font-medium">
                {msg.sender === 'user' ? 'আপনি' : msg.userName || 'কাস্টমার সাপোর্ট'}
              </span>
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-xs sm:text-sm leading-relaxed shadow ${
                  msg.sender === 'user'
                    ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-none'
                    : 'bg-slate-800 text-slate-100 border border-slate-700 rounded-tl-none'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>

                {/* Direct Action Link Buttons inside message as commanded */}
                {msg.showLinks && (
                  <div className="mt-3 space-y-2 pt-2 border-t border-slate-700/80">
                    <a
                      href={formatTelegramUrl(settings.telegramChannelUrl)}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between p-2 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-200 hover:bg-cyan-900/50 transition-colors text-xs font-bold"
                    >
                      <span className="flex items-center gap-1.5">
                        <Headphones className="w-3.5 h-3.5 text-cyan-400" />
                        অফিসিয়াল টেলিগ্রাম চ্যানেল
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                    </a>

                    <a
                      href={formatTelegramUrl(settings.supportSophiaTelegram)}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between p-2 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-200 hover:bg-amber-900/50 transition-colors text-xs font-bold"
                    >
                      <span className="flex items-center gap-1.5">
                        <Headphones className="w-3.5 h-3.5 text-amber-400" />
                        কাস্টমার সার্ভিস এজেন্ট (Sophia)
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                    </a>

                    {settings.whatsappSupportNumber && (
                      <a
                        href={formatWhatsAppUrl(settings.whatsappSupportNumber)}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-2 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 hover:bg-emerald-900/50 transition-colors text-xs font-bold"
                      >
                        <span className="flex items-center gap-1.5">
                          <Bot className="w-3.5 h-3.5 text-emerald-400" />
                          হোয়াটসঅ্যাপ কাস্টমার সার্ভিস
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                      </a>
                    )}
                  </div>
                )}
              </div>
              <span className="text-[10px] text-slate-500 mt-1 px-1">{msg.time}</span>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="আপনার প্রশ্ন এখানে লিখুন..."
            className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
          />
          <button
            type="submit"
            className="w-10 h-10 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 flex items-center justify-center shrink-0 transition-transform active:scale-95 shadow-md shadow-amber-500/20"
          >
            <SendHorizontal className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};
