'use client';

import React from 'react';
import { INTERESTS } from '../../data/portfolio';
import {
  Compass,
  Cpu,
  Building2,
  ShieldCheck,
  Network,
  Cloud,
  Workflow,
  Sparkles,
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Cpu: <Cpu className="w-5 h-5 text-cyan-400" />,
  Building2: <Building2 className="w-5 h-5 text-sky-400" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
  Network: <Network className="w-5 h-5 text-violet-400" />,
  Cloud: <Cloud className="w-5 h-5 text-indigo-400" />,
  Workflow: <Workflow className="w-5 h-5 text-teal-400" />,
};

export default function InterestsSection() {
  return (
    <section
      id="interests"
      aria-label="Interests and Ongoing Research"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]"
    >
      <div className="space-y-10">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-mono tracking-wider uppercase text-cyan-400">
            <Compass className="w-3.5 h-3.5" />
            <span>05 // Tech Radar & Research</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Interests & Ongoing Engineering Explorations
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl">
            Beyond active production systems, here are the technical domains, architectural
            patterns, and emerging frameworks I continually evaluate.
          </p>
        </div>

        {/* Interests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INTERESTS.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl glass-panel border border-white/[0.08] hover:border-cyan-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/20 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                    {iconMap[item.iconName] || <Sparkles className="w-5 h-5 text-cyan-400" />}
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/40">
                    {item.domain}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/[0.06] space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">
                  Active Radar Note
                </span>
                <p className="text-xs font-mono text-cyan-300/90 leading-snug">
                  {item.currentExploration}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
