'use client';

import React from 'react';
import { motion, type Variants } from 'motion/react';
import { PERSONAL_INFO } from '../../data/portfolio';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  ArrowRight,
  Terminal,
  Cpu,
  Layers,
  GraduationCap,
  MapPin,
} from 'lucide-react';

export default function HeroSection() {
  const { toggleCommandPalette, isReducedMotion } = usePortfolio();

  const containerVariants: Variants = {
    hidden: { opacity: isReducedMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isReducedMotion ? 0 : 0.08,
        delayChildren: isReducedMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: isReducedMotion ? 1 : 0, y: isReducedMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      id="home"
      aria-label="Hero Overview"
      className="relative min-h-[94vh] flex flex-col justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl flex flex-col space-y-6"
      >
        {/* System Status Beacon */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-400/30 text-xs font-mono text-cyan-300 w-fit"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-300" />
          </span>
          <span className="tracking-wide">RANA.OS</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-300">{PERSONAL_INFO.status}</span>
        </motion.div>

        {/* Name and Editorial Heading */}
        <motion.div variants={itemVariants} className="space-y-3">
          <p className="font-mono text-xs uppercase tracking-widest text-cyan-300 font-semibold">
            {PERSONAL_INFO.name} — {PERSONAL_INFO.role}
          </p>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
            I build software that{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-violet-300">
              solves real problems.
            </span>
          </h1>
        </motion.div>

        {/* Supporting text about full-stack development, SaaS, AI integrations, and automation */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-xl text-slate-300 leading-relaxed font-normal max-w-3xl"
        >
          {PERSONAL_INFO.supportingText}
        </motion.p>

        {/* Action CTAs */}
        <motion.div variants={itemVariants} className="pt-2 flex flex-wrap items-center gap-3.5">
          <a
            href="#projects"
            className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-cyan-300 hover:bg-cyan-200 text-[#070a12] font-semibold text-sm tracking-wide transition-all shadow-lg shadow-cyan-300/20 hover:shadow-cyan-200/30 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#contact"
            className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl glass-panel hover:bg-white/[0.08] text-slate-200 hover:text-white font-medium text-sm tracking-wide transition-all border border-white/10 hover:border-cyan-400/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            <span>Contact Me</span>
          </a>

          <button
            onClick={toggleCommandPalette}
            className="inline-flex items-center space-x-2 px-4 py-3.5 rounded-xl bg-surface-primary/80 hover:bg-surface-primary text-slate-300 hover:text-cyan-300 font-mono text-xs border border-white/[0.08] hover:border-cyan-400/30 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-300" />
            <span>Terminal</span>
            <kbd className="px-1.5 py-0.5 text-[10px] bg-white/[0.06] rounded border border-white/10">
              ⌘K
            </kbd>
          </button>
        </motion.div>

        {/* Developer Tool Telemetry Cards */}
        <motion.div variants={itemVariants} className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl glass-panel border border-white/[0.08] flex flex-col space-y-1">
            <div className="flex items-center space-x-1.5 text-cyan-300">
              <GraduationCap className="w-4 h-4" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Education
              </span>
            </div>
            <div className="font-semibold text-slate-100 text-sm">
              BS Info Tech
            </div>
            <div className="text-[11px] font-mono text-cyan-300">
              CGPA 3.13 / 4.00
            </div>
          </div>

          <div className="p-3.5 rounded-xl glass-panel border border-white/[0.08] flex flex-col space-y-1">
            <div className="flex items-center space-x-1.5 text-violet-300">
              <Layers className="w-4 h-4" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Industry Work
              </span>
            </div>
            <div className="font-semibold text-slate-100 text-sm">
              KeyAbroad
            </div>
            <div className="text-[11px] text-slate-400">
              Software Dev
            </div>
          </div>

          <div className="p-3.5 rounded-xl glass-panel border border-white/[0.08] flex flex-col space-y-1">
            <div className="flex items-center space-x-1.5 text-sky-300">
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

          <div className="p-3.5 rounded-xl glass-panel border border-white/[0.08] flex flex-col space-y-1">
            <div className="flex items-center space-x-1.5 text-emerald-400">
              <MapPin className="w-4 h-4" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Availability
              </span>
            </div>
            <div className="font-semibold text-slate-100 text-sm">
              Remote Ready
            </div>
            <div className="text-[11px] text-slate-400">
              Global Collaboration
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
