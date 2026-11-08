import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Award,
  Gift,
  Headphones
} from 'lucide-react';
import { BannerItem } from '../types';

interface BannerSliderProps {
  onBannerClick?: (banner: BannerItem, index: number) => void;
}

export const BannerSlider: React.FC<BannerSliderProps> = ({ onBannerClick }) => {
  const { banners, openModal, claimDailyCheckin } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const total = banners.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Continuous auto-play timer (every 4 seconds smoothly changes)
  useEffect(() => {
    if (total <= 1 || isPaused) return;

    timerRef.current = setTimeout(() => {
      nextSlide();
    }, 4000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, isPaused, nextSlide, total]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleBannerAction = (banner: BannerItem, index: number) => {
    if (onBannerClick) {
      onBannerClick(banner, index);
      return;
    }

    // Context-sensitive quick actions
    if (banner.tag === 'BONUS' || banner.title.includes('রেফারেল')) {
      openModal('teamInvite');
    } else if (banner.tag === 'VIP' || banner.title.includes('ভিআইপি')) {
      const el = document.getElementById('vip-packages-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        openModal('recharge');
      }
    } else if (banner.tag === 'NEW' || banner.title.includes('বোনাস')) {
      claimDailyCheckin();
    } else if (banner.tag === 'SECURE' || banner.title.includes('সাপোর্ট')) {
      openModal('liveChat');
    }
  };

  if (!banners || banners.length === 0) return null;

  return (
    <div
      className="relative rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl bg-slate-950 aspect-[16/8] sm:aspect-[21/9] select-none group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Banner Slides Carousel with Continuous Ken Burns Movement */}
      <div className="relative w-full h-full overflow-hidden">
        {banners.map((banner, index) => {
          const isActive = index === currentIndex;
          const isPrev = index === (currentIndex - 1 + total) % total;
          const isNext = index === (currentIndex + 1) % total;

          // Determine sliding transform
          let translateClass = 'opacity-0 pointer-events-none translate-x-full scale-95';
          if (isActive) {
            translateClass = 'opacity-100 z-10 translate-x-0 scale-100';
          } else if (isPrev) {
            translateClass = 'opacity-0 pointer-events-none -translate-x-full scale-95';
          } else if (isNext) {
            translateClass = 'opacity-0 pointer-events-none translate-x-full scale-95';
          }

          return (
            <div
              key={banner.id || index}
              onClick={() => handleBannerAction(banner, index)}
              className={`absolute inset-0 transition-all duration-700 ease-in-out cursor-pointer ${translateClass}`}
            >
              {/* Premium Background Image with continuous breathing/motion effect */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={banner.imageUrl}
                  alt={banner.title}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover brightness-[0.72] transition-transform duration-[6000ms] ease-out will-change-transform ${
                    isActive ? 'scale-110 translate-y-[-1%]' : 'scale-100 translate-y-0'
                  }`}
                />
              </div>

              {/* Multi-layered cinematic gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/40" />

              {/* Glowing ambient light accent matching dark-gold theme */}
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

              {/* Slide Content Overlay */}
              <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end z-20">
                <div className="max-w-xl space-y-1 sm:space-y-1.5">
                  {/* Badge & Category */}
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md shadow-amber-500/30 flex items-center gap-1">
                      {banner.tag === 'HOT' && <Sparkles className="w-3 h-3 fill-slate-950" />}
                      {banner.tag === 'BONUS' && <TrendingUp className="w-3 h-3" />}
                      {banner.tag === 'VIP' && <Award className="w-3 h-3" />}
                      {banner.tag === 'NEW' && <Gift className="w-3 h-3" />}
                      {banner.tag === 'SECURE' && <ShieldCheck className="w-3 h-3" />}
                      <span>{banner.tag || 'HOT'}</span>
                    </span>

                    <span className="text-[11px] sm:text-xs text-amber-300 font-bold flex items-center gap-1 backdrop-blur-sm bg-slate-950/40 px-2 py-0.5 rounded-full border border-amber-500/20">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> WDRTrustedFinance প্রিমিয়াম
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-base sm:text-2xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                    {banner.title}
                  </h2>

                  {/* Subtitle */}
                  <p className="text-xs sm:text-sm text-slate-300/95 font-medium line-clamp-1 drop-shadow">
                    {banner.subtitle}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Manual Navigation Arrows (Sleek, appear on hover/tap) */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-950/70 hover:bg-amber-500 hover:text-slate-950 text-amber-300 border border-amber-500/30 flex items-center justify-center transition-all duration-200 z-30 opacity-70 hover:opacity-100 backdrop-blur-sm active:scale-90"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-950/70 hover:bg-amber-500 hover:text-slate-950 text-amber-300 border border-amber-500/30 flex items-center justify-center transition-all duration-200 z-30 opacity-70 hover:opacity-100 backdrop-blur-sm active:scale-90"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </>
      )}

      {/* Bottom Indicators with Animated Progress Line */}
      {total > 1 && (
        <div className="absolute bottom-2.5 right-3 sm:right-4 z-30 flex items-center gap-1.5 p-1 rounded-full bg-slate-950/70 backdrop-blur-md border border-slate-800">
          {banners.map((_, dotIdx) => {
            const isDotActive = dotIdx === currentIndex;
            return (
              <button
                key={dotIdx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(dotIdx);
                }}
                className={`relative h-1.5 rounded-full transition-all duration-300 ${
                  isDotActive
                    ? 'w-6 bg-gradient-to-r from-amber-400 to-yellow-300 shadow-sm shadow-amber-400/50'
                    : 'w-1.5 bg-slate-600/70 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${dotIdx + 1}`}
              >
                {/* Active animated progress bar inside the pill */}
                {isDotActive && !isPaused && (
                  <span
                    className="absolute inset-0 bg-white/40 rounded-full animate-pulse"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
