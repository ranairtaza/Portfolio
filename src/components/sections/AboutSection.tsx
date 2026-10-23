'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  GraduationCap,
  Terminal,
  Code2,
  FileDown,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolio';
import { usePortfolio } from '../../context/PortfolioContext';
import ProfileAvatar from '../ui/ProfileAvatar';

export default function AboutSection() {
  const { isReducedMotion } = usePortfolio();
  const [activeTab, setActiveTab] = useState<'profile' | 'education' | 'focus'>('profile');

  return (
    <section
      id="about"
      aria-label="About Rana Irtaza Ali Khan"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.08]"
    >
      <div className="space-y-12">
        {/* Section Header */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center space-x-2 text-xs font-mono tracking-wider uppercase text-cyan-300">
            <Terminal className="w-3.5 h-3.5" />
            <span>01 // Professional Identity &amp; Profile</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            About Me
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
            {PERSONAL_INFO.intro}
          </p>
        </motion.div>

        {/* Two-Column Editorial Card Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Profile Card & Editorial Narrative */}
          <motion.div
            className="lg:col-span-7 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Identity Showcase Header */}
            <div className="p-6 sm:p-7 rounded-2xl glass-panel border border-white/[0.08] flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-gradient-to-br from-white/[0.03] to-cyan-950/10">
              <ProfileAvatar
                src={PERSONAL_INFO.avatarUrl}
                name={PERSONAL_INFO.name}
                title={PERSONAL_INFO.role}
                size="lg"
              />

              <div className="space-y-2 text-center sm:text-left flex-1">
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-[11px] font-mono text-cyan-300">
                  <ShieldCheck className="w-3 h-3 text-cyan-300" />
                  <span>Verified Identity</span>
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {PERSONAL_INFO.name}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-cyan-300 font-medium">
                  {PERSONAL_INFO.role}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed font-sans pt-1">
                  BS Information Technology graduate (June 2026, CGPA 3.1/4.00) based in Pakistan, available for remote and hybrid full-stack engineering roles.
                </p>

                {/* Conditional Downloadable Résumé Action */}
                {PERSONAL_INFO.hasResumePdf && (
                  <div className="pt-2">
                    <a
                      href={PERSONAL_INFO.resumeUrl}
                      download="Rana_Irtaza_Ali_Khan_Resume.pdf"
                      className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-cyan-300 hover:bg-cyan-200 text-[#070a12] text-xs font-semibold font-mono tracking-wide transition-all shadow-md shadow-cyan-300/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                    >
                      <FileDown className="w-3.5 h-3.5" />
                      <span>Download Verified Résumé (PDF)</span>
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Structured Editorial Narrative */}
            <div className="p-6 sm:p-7 rounded-2xl glass-panel border border-white/[0.08] space-y-5 text-sm leading-relaxed text-slate-300">
              <h4 className="font-mono text-xs uppercase tracking-wider text-cyan-300 font-semibold flex items-center space-x-2">
                <Code2 className="w-3.5 h-3.5" />
                <span>Background &amp; Practical Experience</span>
              </h4>

              <div className="space-y-3.5 text-slate-300">
                <p>
                  My foundation is built on a{' '}
                  <span className="text-white font-medium">
                    BS in Information Technology (completion June 2026, CGPA 3.1/4.00)
                  </span>
                  . This academic training established my core grounding in relational database systems, computer networking protocols, software engineering principles, and operating systems.
                </p>

                <p>
                  In industry practice, I contributed to software development at{' '}
                  <span className="text-cyan-300 font-medium">KeyAbroad Consultants</span>, where I built web application functionality, modern user interfaces, and internal business systems. My work also included engineering an automated biometric hardware integration bridge to synchronize physical employee punch records directly with a central database, as well as implementing technical SEO improvements.
                </p>

                <p>
                  I am strongly interested in building practical SaaS products and useful business software. I enjoy taking fragmented or manual operational routines and turning them into dependable, automated software systems with clean interfaces and deterministic backend workflows.
                </p>

                <p>
                  Rather than chasing fleeting buzzwords, my focus is on continuously improving practical engineering skills—writing type-safe code in TypeScript, designing clean REST API contracts, structuring robust relational schemas with PostgreSQL, and building responsive frontends in Next.js.
                </p>

                <p>
                  My broader technical curiosities include applied artificial intelligence, workflow automation, cybersecurity fundamentals, cloud computing, and software entrepreneurship.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Profile Telemetry Inspector */}
          <motion.div
            className="lg:col-span-5 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="rounded-2xl glass-panel border border-white/[0.08] shadow-2xl overflow-hidden">
              {/* Tab Navigation Header */}
              <div className="p-3 bg-surface-secondary border-b border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-300" />
                  <span className="font-mono text-xs font-semibold text-slate-200">
                    CREDENTIALS_INSPECTOR.json
                  </span>
                </div>
                <div className="flex space-x-1">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                      activeTab === 'profile'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Summary
                  </button>
                  <button
                    onClick={() => setActiveTab('education')}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                      activeTab === 'education'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Education
                  </button>
                  <button
                    onClick={() => setActiveTab('focus')}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                      activeTab === 'focus'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Focus
                  </button>
                </div>
              </div>

              {/* Tab Content Panel */}
              <div className="p-5 space-y-4 text-xs font-sans min-h-[300px]">
                <AnimatePresence mode="wait">
                  {activeTab === 'profile' && (
                    <motion.div
                      key="profile"
                      initial={{ opacity: isReducedMotion ? 1 : 0, y: isReducedMotion ? 0 : 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: isReducedMotion ? 1 : 0, y: isReducedMotion ? 0 : -8 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-3"
                    >
                      <div className="p-3.5 rounded-xl bg-surface-primary border border-white/[0.06] space-y-2">
                        <span className="text-[10px] font-mono uppercase text-cyan-300 block">
                          Core Positioning
                        </span>
                        <div className="text-sm font-bold text-white">
                          {PERSONAL_INFO.role}
                        </div>
                        <p className="text-slate-400 text-xs leading-relaxed">
                          Building dependable web applications, multi-tenant SaaS architectures, and practical automation systems.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-surface-primary border border-white/[0.06] space-y-2">
                        <span className="text-[10px] font-mono uppercase text-violet-300 block">
                          Verified Professional Experience
                        </span>
                        <div className="flex items-center justify-between text-xs text-slate-200 font-semibold">
                          <span>KeyAbroad Consultants</span>
                          <span className="font-mono text-cyan-300">Software Developer</span>
                        </div>
                        <p className="text-slate-400 text-xs leading-relaxed">
                          Web application development, internal business systems, biometric hardware integration, and technical SEO.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-surface-primary border border-white/[0.06] space-y-2">
                        <span className="text-[10px] font-mono uppercase text-emerald-300 block">
                          Practical Engineering Values
                        </span>
                        <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 font-mono">
                          <div className="flex items-center space-x-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
                            <span>Type-Safe APIs</span>
                          </div>
                          <div className="flex items-center space-x-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
                            <span>Relational Schemas</span>
                          </div>
                          <div className="flex items-center space-x-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
                            <span>Reliable Automation</span>
                          </div>
                          <div className="flex items-center space-x-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
                            <span>User-Centered UX</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'education' && (
                    <motion.div
                      key="education"
                      initial={{ opacity: isReducedMotion ? 1 : 0, y: isReducedMotion ? 0 : 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: isReducedMotion ? 1 : 0, y: isReducedMotion ? 0 : -8 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/40 space-y-2">
                        <div className="flex items-center space-x-2 text-cyan-300 font-semibold text-sm">
                          <GraduationCap className="w-4 h-4" />
                          <span>{PERSONAL_INFO.education.degree}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-slate-300 pt-1">
                          <span>Completion: {PERSONAL_INFO.education.completion}</span>
                          <span className="font-mono px-2 py-0.5 rounded bg-cyan-300 text-[#070a12] font-bold">
                            CGPA {PERSONAL_INFO.education.cgpa}
                          </span>
                        </div>
                      </div>

                      {/* Extensible Details Table */}
                      <div className="space-y-2 pt-1">
                        <div className="text-[11px] font-mono uppercase text-slate-400">
                          Verified Academic Record
                        </div>
                        <div className="divide-y divide-white/[0.06] rounded-xl border border-white/[0.08] bg-surface-primary/70 overflow-hidden font-mono text-xs">
                          {PERSONAL_INFO.education.extensibleDetails.map((item, idx) => (
                            <div key={idx} className="p-2.5 flex items-center justify-between">
                              <span className="text-slate-400 font-sans">{item.label}</span>
                              <span className="text-slate-200 font-semibold">{item.value}</span>
                            </div>
                          ))}
                        </div>
                        <p className="text-[11px] text-slate-400 italic pt-1">
                          Additional verified academic credentials can be added to this component without altering the layout.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'focus' && (
                    <motion.div
                      key="focus"
                      initial={{ opacity: isReducedMotion ? 1 : 0, y: isReducedMotion ? 0 : 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: isReducedMotion ? 1 : 0, y: isReducedMotion ? 0 : -8 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-3 font-mono text-[11px]"
                    >
                      <div className="p-3 rounded-xl bg-surface-primary border border-white/[0.06] space-y-1">
                        <span className="text-cyan-300 font-semibold block">Full-Stack Development</span>
                        <p className="text-slate-300 font-sans text-xs">
                          Modern React 19, Next.js App Router, TypeScript, and Tailwind CSS for responsive web applications.
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-surface-primary border border-white/[0.06] space-y-1">
                        <span className="text-violet-300 font-semibold block">SaaS Architecture</span>
                        <p className="text-slate-300 font-sans text-xs">
                          Relational database models in PostgreSQL/Supabase, multi-tenant isolation, and type-safe Prisma ORM queries.
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-surface-primary border border-white/[0.06] space-y-1">
                        <span className="text-emerald-300 font-semibold block">Intelligent Automation</span>
                        <p className="text-slate-300 font-sans text-xs">
                          Structured LLM API integrations, deterministic JSON schema parsing, and event-driven workflow automation.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
