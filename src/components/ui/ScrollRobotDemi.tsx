'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

export default function ScrollRobotDemi() {
  const { activeSection, isReducedMotion } = usePortfolio();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up' | 'idle'>('idle');
  const [isHovered, setIsHovered] = useState(false);
  const [isWaving, setIsWaving] = useState(false);
  const [blink, setBlink] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Track scroll progress and scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;

      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, Math.round((currentScroll / totalHeight) * 100)));
        setScrollProgress(progress);
      }

      if (currentScroll > lastScrollY.current + 4) {
        setScrollDirection('down');
      } else if (currentScroll < lastScrollY.current - 4) {
        setScrollDirection('up');
      }

      lastScrollY.current = currentScroll;

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setScrollDirection('idle');
      }, 350);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  // Periodic blinking effect for the visor eyes
  useEffect(() => {
    if (isReducedMotion) return;
    const blinkInterval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 180);
    }, 4000);
    return () => clearInterval(blinkInterval);
  }, [isReducedMotion]);

  const handleRobotClick = () => {
    setIsWaving(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setIsWaving(false), 1200);
  };

  const getSectionDialogue = () => {
    switch (activeSection) {
      case 'home':
        return 'System Online • Welcome';
      case 'about':
        return 'Identity Verified • Info';
      case 'projects':
        return 'Exploring Software • LeadMachine';
      case 'skills':
        return 'Constellation Matrix Active';
      case 'journey':
        return 'Analyzing Career Timeline';
      case 'beyond-code':
        return 'Engineering Philosophy';
      case 'services':
        return 'Systems & SaaS Architecture';
      case 'contact':
        return 'Ready to Connect • Inquire';
      default:
        return 'Patrolling RANA.OS';
    }
  };

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 z-40 p-2.5 rounded-full glass-panel border border-cyan-400/40 text-cyan-300 shadow-xl hover:scale-110 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
        title="Summon Demi Assistant"
        aria-label="Expand Demi scroll companion"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-cyan-300 animate-pulse block" />
      </button>
    );
  }

  return (
    <aside
      aria-label="Demi AI Scroll Companion"
      className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 flex flex-col items-end select-none pointer-events-none"
    >
      {/* Speech bubble / status telemetry */}
      <div
        className={`pointer-events-auto mb-2 transition-all duration-300 transform ${
          isHovered || scrollDirection !== 'idle'
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
        }`}
      >
        <div className="relative px-3 py-1.5 rounded-xl glass-panel border border-cyan-400/30 text-xs font-mono shadow-2xl backdrop-blur-xl flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[11px] font-semibold text-cyan-300">
            {getSectionDialogue()}
          </span>
          <span className="text-slate-400 text-[10px] pl-1 border-l border-white/10 font-bold">
            {scrollProgress}%
          </span>
          <div className="absolute -bottom-1 right-6 w-2 h-2 bg-inherit border-r border-b border-cyan-400/30 rotate-45" />
        </div>
      </div>

      {/* Robot Body & Interaction Container */}
      <div
        className="pointer-events-auto relative group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleRobotClick}
        title="Demi Assistant: Click to return to top"
      >
        {/* Ambient Thruster / Floating Aura */}
        <div className="absolute -inset-2 rounded-full bg-gradient-to-t from-cyan-400/25 via-sky-500/15 to-transparent blur-md opacity-60 group-hover:opacity-100 transition-opacity" />

        {/* Demi Avatar SVG Canvas */}
        <div
          className={`relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center transition-transform duration-300 ${
            scrollDirection === 'down'
              ? 'rotate-6 translate-y-1'
              : scrollDirection === 'up'
              ? '-rotate-6 -translate-y-1'
              : 'hover:-translate-y-1'
          }`}
        >
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-[0_4px_12px_rgba(6,182,212,0.35)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Antenna with Glowing Diode */}
            <path
              d="M50 22 L50 10"
              stroke="#67e8f9"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle
              cx="50"
              cy="8"
              r="4"
              fill="#22d3ee"
              className={isReducedMotion ? '' : 'animate-pulse'}
            />

            {/* Robot Head Outer Shell */}
            <rect
              x="22"
              y="22"
              width="56"
              height="44"
              rx="18"
              fill="url(#demiHeadGradient)"
              stroke="#67e8f9"
              strokeWidth="2.5"
            />

            {/* Side Ear Antennas / Audio Sensors */}
            <rect x="16" y="34" width="6" height="20" rx="3" fill="#0891b2" stroke="#67e8f9" strokeWidth="1" />
            <rect x="78" y="34" width="6" height="20" rx="3" fill="#0891b2" stroke="#67e8f9" strokeWidth="1" />

            {/* Glossy Curved Visor Screen */}
            <rect
              x="28"
              y="28"
              width="44"
              height="30"
              rx="12"
              fill="#050814"
              stroke="#0891b2"
              strokeWidth="1.5"
            />

            {/* Digital Eyes / Visor Expression */}
            {blink ? (
              // Blinking state: flat slit lines
              <g stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round">
                <line x1="38" y1="43" x2="45" y2="43" />
                <line x1="55" y1="43" x2="62" y2="43" />
              </g>
            ) : isWaving ? (
              // Waving happy state: curved smiling eyes ^ ^
              <g stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round">
                <path d="M37 45 Q41 38 45 45" />
                <path d="M55 45 Q59 38 63 45" />
              </g>
            ) : scrollDirection === 'down' ? (
              // Looking down eyes
              <g fill="#38bdf8">
                <circle cx="41" cy="45" r="3.5" />
                <circle cx="59" cy="45" r="3.5" />
              </g>
            ) : scrollDirection === 'up' ? (
              // Looking up eyes
              <g fill="#38bdf8">
                <circle cx="41" cy="39" r="3.5" />
                <circle cx="59" cy="39" r="3.5" />
              </g>
            ) : (
              // Neutral focused eyes with subtle ocular glow
              <g fill="#38bdf8">
                <circle cx="41" cy="42" r="3.5" />
                <circle cx="59" cy="42" r="3.5" />
                <circle cx="42.5" cy="40.5" r="1.2" fill="#ffffff" />
                <circle cx="60.5" cy="40.5" r="1.2" fill="#ffffff" />
              </g>
            )}

            {/* Cute Cheek Blushes when hovered */}
            {isHovered && (
              <g fill="#f43f5e" opacity="0.6">
                <ellipse cx="34" cy="50" rx="3" ry="1.5" />
                <ellipse cx="66" cy="50" rx="3" ry="1.5" />
              </g>
            )}

            {/* Floating Body Chassis */}
            <path
              d="M32 70 C32 66, 68 66, 68 70 L62 82 C62 86, 38 86, 38 82 Z"
              fill="url(#demiBodyGradient)"
              stroke="#67e8f9"
              strokeWidth="2"
            />

            {/* Core Power Ring */}
            <circle cx="50" cy="75" r="3" fill="#38bdf8" className={isReducedMotion ? '' : 'animate-ping'} />
            <circle cx="50" cy="75" r="3" fill="#67e8f9" />

            {/* Floating Thruster Plasma Flame */}
            <path
              d="M44 86 Q50 97 56 86 Z"
              fill="url(#thrusterGradient)"
              opacity="0.85"
            />

            {/* Gradient Definitions */}
            <defs>
              <linearGradient id="demiHeadGradient" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="demiBodyGradient" x1="30" y1="65" x2="70" y2="85" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#0369a1" />
              </linearGradient>
              <linearGradient id="thrusterGradient" x1="44" y1="86" x2="56" y2="97" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#67e8f9" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Micro Circular Progress Ring around Demi */}
        <svg className="absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)] -rotate-90 pointer-events-none">
          <circle
            cx="50%"
            cy="50%"
            r="44%"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="2"
          />
          <circle
            cx="50%"
            cy="50%"
            r="44%"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="2"
            strokeDasharray="220"
            strokeDashoffset={220 - (220 * scrollProgress) / 100}
            strokeLinecap="round"
            className="transition-all duration-150"
          />
        </svg>

        {/* Minimize Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsMinimized(true);
          }}
          className="absolute -top-1.5 -left-1.5 w-4 h-4 rounded-full bg-slate-800 text-slate-300 hover:text-white border border-white/20 text-[9px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          title="Minimize Assistant"
          aria-label="Minimize Demi companion"
        >
          ×
        </button>
      </div>
    </aside>
  );
}
