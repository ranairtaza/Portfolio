'use client';

import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../../data/portfolio';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  ArrowRight,
  Terminal,
  Cpu,
  Layers,
  GraduationCap,
  MapPin,
  Clock,
} from 'lucide-react';

export default function HeroSection() {
  const { toggleCommandPalette } = usePortfolio();
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      // Formatted in PKT (UTC+5)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Karachi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setCurrentTime(new Intl.DateTimeFormat('en-GB', options).format(now));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      aria-label="Hero Overview"
      className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <div className="max-w-4xl flex flex-col space-y-6">
        {/* System Status Pill */}
        <div className="inline-flex items-center space-x-2.5 px-3 py-1.5 rounded-full glass-panel border border-cyan-500/30 text-xs font-mono text-cyan-300 w-fit">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
          </span>
          <span className="tracking-wide">RANA.OS v2.4</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-300">{PERSONAL_INFO.status}</span>
        </div>

        {/* Name and Editorial Heading */}
        <div className="space-y-3">
          <p className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-semibold">
            {PERSONAL_INFO.role}
          </p>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
            Rana Irtaza <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
              Ali Khan
            </span>
          </h1>
        </div>

        {/* Value Proposition */}
        <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-normal max-w-3xl">
          {PERSONAL_INFO.tagline}
        </p>

        {/* Short Bio */}
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl font-sans">
          {PERSONAL_INFO.shortBio}
        </p>

        {/* Action CTAs */}
        <div className="pt-2 flex flex-wrap items-center gap-3.5">
          <a
            href="#projects"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-[#030712] font-semibold text-sm tracking-wide transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#contact"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl glass-panel hover:bg-white/[0.08] text-slate-200 hover:text-white font-medium text-sm tracking-wide transition-all border border-white/10 hover:border-cyan-500/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <span>Contact Me</span>
          </a>

          <button
            onClick={toggleCommandPalette}
            className="inline-flex items-center space-x-2 px-4 py-3 rounded-xl bg-surface-primary/80 hover:bg-surface-primary text-slate-300 hover:text-cyan-300 font-mono text-xs border border-white/[0.08] hover:border-cyan-500/30 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>Terminal</span>
            <kbd className="px-1.5 py-0.5 text-[10px] bg-white/[0.06] rounded border border-white/10">
              Ctrl+K
            </kbd>
          </button>
        </div>

        {/* Telemetry Strip / Metrics Cards */}
        <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Card 1: Education */}
          <div className="p-3.5 rounded-xl glass-panel border border-white/[0.06] flex flex-col space-y-1">
            <div className="flex items-center space-x-1.5 text-cyan-400">
              <GraduationCap className="w-4 h-4" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Education
              </span>
            </div>
            <div className="font-semibold text-slate-100 text-sm">
              BS Info Tech
            </div>
            <div className="text-[11px] font-mono text-cyan-300/90">
              CGPA 3.10 / 4.00
            </div>
          </div>

          {/* Card 2: Production Experience */}
          <div className="p-3.5 rounded-xl glass-panel border border-white/[0.06] flex flex-col space-y-1">
            <div className="flex items-center space-x-1.5 text-indigo-400">
              <Layers className="w-4 h-4" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Industry Work
              </span>
            </div>
            <div className="font-semibold text-slate-100 text-sm">
              KeyAbroad
            </div>
            <div className="text-[11px] text-slate-400">
              Consultants Dev
            </div>
          </div>

          {/* Card 3: Core Architecture */}
          <div className="p-3.5 rounded-xl glass-panel border border-white/[0.06] flex flex-col space-y-1">
            <div className="flex items-center space-x-1.5 text-violet-400">
              <Cpu className="w-4 h-4" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Core Stack
              </span>
            </div>
            <div className="font-semibold text-slate-100 text-sm">
              Next.js + TS
            </div>
            <div className="text-[11px] text-slate-400">
              PostgreSQL / Supabase
            </div>
          </div>

          {/* Card 4: Live Telemetry Time */}
          <div className="p-3.5 rounded-xl glass-panel border border-white/[0.06] flex flex-col space-y-1">
            <div className="flex items-center space-x-1.5 text-emerald-400">
              <Clock className="w-4 h-4" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Local Time (PKT)
              </span>
            </div>
            <div className="font-mono font-semibold text-slate-100 text-sm tracking-wider">
              {currentTime || 'Loading...'}
            </div>
            <div className="text-[11px] text-slate-400 flex items-center space-x-1">
              <MapPin className="w-3 h-3 text-emerald-400 inline" />
              <span>UTC+5 • Remote Ready</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
