'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { JOURNEY_MILESTONES } from '../../data/portfolio';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  Clock,
  Briefcase,
  GraduationCap,
  Layers,
  Compass,
  MapPin,
  Calendar,
  CheckCircle2,
  BadgeCheck,
  Building2,
  Sparkles,
  Info,
} from 'lucide-react';
import { JourneyMilestone } from '../../types/portfolio';

export default function TimelineSection() {
  const { isReducedMotion } = usePortfolio();
  const [filter, setFilter] = useState<'all' | 'experience' | 'education' | 'saas-experiment' | 'current-focus'>('all');

  const filteredMilestones = JOURNEY_MILESTONES.filter((item) => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  const getMilestoneIcon = (type: JourneyMilestone['type']) => {
    switch (type) {
      case 'education':
        return <GraduationCap className="w-4 h-4 text-cyan-300" />;
      case 'experience':
        return <Briefcase className="w-4 h-4 text-violet-300" />;
      case 'saas-experiment':
        return <Layers className="w-4 h-4 text-sky-300" />;
      case 'current-focus':
        return <Compass className="w-4 h-4 text-emerald-300" />;
      default:
        return <Clock className="w-4 h-4 text-slate-300" />;
    }
  };

  const getTypeLabel = (type: JourneyMilestone['type']) => {
    switch (type) {
      case 'education':
        return 'Formal Degree';
      case 'experience':
        return 'Professional Experience';
      case 'saas-experiment':
        return 'SaaS Product Experimentation';
      case 'current-focus':
        return 'Undated Focus Area';
      default:
        return 'Career Milestone';
    }
  };

  return (
    <section
      id="journey"
      aria-label="Career and Education Journey"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.08]"
    >
      <div className="space-y-12">
        {/* Header with Title and Filter Buttons */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center space-x-2 text-xs font-mono tracking-wider uppercase text-cyan-300">
              <Clock className="w-3.5 h-3.5" />
              <span>04 // Interactive Career Map</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Career Journey
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
              A verified progression of academic foundations, professional software development at KeyAbroad Consultants, SaaS product experimentation, and current technical learning.
            </p>
          </motion.div>

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Milestones' },
              { id: 'education', label: 'Education' },
              { id: 'experience', label: 'Experience' },
              { id: 'saas-experiment', label: 'SaaS Builds' },
              { id: 'current-focus', label: 'Current Focus' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as typeof filter)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  filter === tab.id
                    ? 'bg-cyan-300 text-[#070a12] font-semibold shadow-md shadow-cyan-300/20'
                    : 'bg-surface-primary text-slate-400 hover:text-white border border-white/[0.08] hover:border-cyan-400/30'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scroll-aware Career Timeline */}
        <div className="relative border-l-2 border-white/[0.08] ml-3 sm:ml-6 space-y-10">
          <AnimatePresence mode="popLayout">
            {filteredMilestones.map((item, index) => {
              const isEducation = item.type === 'education';
              const isExperience = item.type === 'experience';
              const isSaas = item.type === 'saas-experiment';
              const isCurrent = item.type === 'current-focus';

              const borderGlow = isEducation
                ? 'border-cyan-400/30 hover:border-cyan-300/60'
                : isExperience
                ? 'border-violet-400/30 hover:border-violet-300/60'
                : isSaas
                ? 'border-sky-400/30 hover:border-sky-300/60'
                : 'border-emerald-400/30 hover:border-emerald-300/60';

              return (
                <motion.div
                  key={item.id}
                  layout
                  className="relative pl-7 sm:pl-10 group"
                  initial={{ opacity: 0, y: isReducedMotion ? 0 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  {/* Timeline node node connector */}
                  <div
                    className={`absolute -left-[17px] top-2 flex items-center justify-center w-8 h-8 rounded-full border-2 bg-[#070a12] transition-all shadow-md ${
                      isEducation
                        ? 'border-cyan-400 text-cyan-300 group-hover:bg-cyan-500/10'
                        : isExperience
                        ? 'border-violet-400 text-violet-300 group-hover:bg-violet-500/10'
                        : isSaas
                        ? 'border-sky-400 text-sky-300 group-hover:bg-sky-500/10'
                        : 'border-emerald-400 text-emerald-300 group-hover:bg-emerald-500/10'
                    }`}
                  >
                    {getMilestoneIcon(item.type)}
                  </div>

                  {/* Timeline Content Card */}
                  <div
                    className={`rounded-2xl glass-panel border ${borderGlow} p-6 sm:p-7 space-y-4 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-950/20`}
                  >
                    {/* Card Header & Telemetry */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`font-mono text-xs font-semibold uppercase tracking-wider ${
                              isEducation
                                ? 'text-cyan-300'
                                : isExperience
                                ? 'text-violet-300'
                                : isSaas
                                ? 'text-sky-300'
                                : 'text-emerald-300'
                            }`}
                          >
                            {getTypeLabel(item.type)}
                          </span>

                          {item.badge && (
                            <span className="inline-flex items-center space-x-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/70 text-cyan-300 border border-cyan-800/40">
                              <BadgeCheck className="w-3 h-3 text-cyan-400" />
                              <span>{item.badge}</span>
                            </span>
                          )}

                          {isCurrent && (
                            <span className="inline-flex items-center space-x-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/70 text-emerald-300 border border-emerald-800/40">
                              <Sparkles className="w-3 h-3 text-emerald-400" />
                              <span>Undated Current Focus</span>
                            </span>
                          )}
                        </div>

                        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                          {item.title}
                        </h3>

                        <div className="flex items-center space-x-2 text-sm font-medium text-slate-300">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          <span>{item.organization}</span>
                        </div>
                      </div>

                      {/* Period & Location Badge */}
                      <div className="flex flex-wrap sm:flex-col sm:items-end text-xs font-mono text-slate-400 gap-2 sm:gap-1.5 shrink-0">
                        {item.period && (
                          <div className="flex items-center space-x-1.5 text-cyan-300 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.06]">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{item.period}</span>
                          </div>
                        )}
                        {item.location && (
                          <div className="flex items-center space-x-1 text-slate-400">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{item.location}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Narrative Summary */}
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                      {item.summary}
                    </p>

                    {/* Scope of Individual Contribution Callout (Where work belongs to an employer or team) */}
                    {item.scopeOfContribution && (
                      <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08] text-xs space-y-1">
                        <div className="flex items-center space-x-1.5 font-mono text-[11px] text-cyan-300 font-semibold uppercase">
                          <Info className="w-3.5 h-3.5" />
                          <span>Scope of Individual Contribution</span>
                        </div>
                        <p className="text-slate-300 leading-relaxed font-sans text-xs">
                          {item.scopeOfContribution}
                        </p>
                      </div>
                    )}

                    {/* Extensible Academic Details (Education only) */}
                    {item.extensibleDetails && item.extensibleDetails.length > 0 && (
                      <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-800/30 space-y-2">
                        <span className="text-[10px] font-mono uppercase text-cyan-300 block font-semibold">
                          Verified Academic Parameters
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                          {item.extensibleDetails.map((detail, idx) => (
                            <div key={idx} className="p-2 rounded-lg bg-surface-primary border border-white/[0.06]">
                              <span className="text-[10px] text-slate-400 block">{detail.label}</span>
                              <span className="text-slate-200 font-semibold">{detail.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Verified Outcomes List */}
                    <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                      <span className="text-[11px] font-mono uppercase text-slate-400 block font-semibold">
                        Key Engineering Outcomes &amp; Responsibilities
                      </span>
                      <ul className="space-y-2 text-xs text-slate-300">
                        {item.outcomes.map((outcome, idx) => (
                          <li key={idx} className="flex items-start space-x-2.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-300 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Stack / Coursework Tags */}
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {item.stackTags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-white/[0.04] text-slate-300 border border-white/[0.08]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
