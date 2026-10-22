'use client';

import React from 'react';
import { motion } from 'motion/react';
import { JOURNEY_MILESTONES } from '../../data/portfolio';
import {
  Clock,
  Briefcase,
  GraduationCap,
  MapPin,
  Calendar,
  CheckCircle2,
  BadgeCheck,
} from 'lucide-react';

export default function TimelineSection() {
  return (
    <section
      id="journey"
      aria-label="Journey Timeline"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.08]"
    >
      <div className="space-y-12">
        {/* Header */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center space-x-2 text-xs font-mono tracking-wider uppercase text-cyan-300">
            <Clock className="w-3.5 h-3.5" />
            <span>04 // Career &amp; Education</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Engineering Journey
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl">
            A chronological track of software engineering contributions at KeyAbroad Consultants
            and formal academic training in Information Technology.
          </p>
        </motion.div>

        {/* Timeline Flow */}
        <div className="relative border-l-2 border-white/[0.08] ml-4 sm:ml-6 space-y-12">
          {JOURNEY_MILESTONES.map((item, index) => {
            const isExp = item.type === 'experience';

            return (
              <motion.div
                key={item.id}
                className="relative pl-8 sm:pl-10 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Timeline node icon */}
                <div
                  className={`absolute -left-[17px] top-1.5 flex items-center justify-center w-8 h-8 rounded-full border-2 bg-[#070a12] transition-colors ${
                    isExp
                      ? 'border-cyan-400 text-cyan-300 group-hover:bg-cyan-500/10'
                      : 'border-violet-400 text-violet-300 group-hover:bg-violet-500/10'
                  }`}
                >
                  {isExp ? (
                    <Briefcase className="w-3.5 h-3.5" />
                  ) : (
                    <GraduationCap className="w-4 h-4" />
                  )}
                </div>

                {/* Timeline card */}
                <div className="rounded-2xl glass-panel border border-white/[0.08] hover:border-cyan-300/40 p-6 sm:p-7 space-y-4 transition-all hover:shadow-xl hover:shadow-cyan-950/20">
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs text-cyan-300 font-semibold uppercase">
                          {isExp ? 'Professional Experience' : 'Formal Degree'}
                        </span>
                        {item.badge && (
                          <span className="inline-flex items-center space-x-1 text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
                            <BadgeCheck className="w-3 h-3 text-emerald-400" />
                            <span>{item.badge}</span>
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                        {item.title}
                      </h3>
                      <div className="text-sm font-medium text-slate-300">
                        {item.organization}
                      </div>
                    </div>

                    <div className="flex flex-wrap sm:flex-col sm:items-end text-xs font-mono text-slate-400 gap-2 sm:gap-1">
                      <div className="flex items-center space-x-1.5 text-cyan-300">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.period}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    {item.summary}
                  </p>

                  {/* Concrete Accomplishments */}
                  <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                    <span className="text-[11px] font-mono uppercase text-slate-400 block font-semibold">
                      Key Outcomes & Responsibilities
                    </span>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {item.outcomes.map((ach, idx) => (
                        <li key={idx} className="flex items-start space-x-2.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-300 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills / Coursework Pills */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {item.stackTags.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-white/[0.04] text-slate-300 border border-white/[0.06]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
