'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  GraduationCap,
  CheckCircle2,
  Terminal,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export default function AboutSection() {
  const { isReducedMotion } = usePortfolio();
  const [activeTab, setActiveTab] = useState<'principles' | 'education' | 'stack'>('principles');

  const principles = [
    {
      title: 'Pragmatic Engineering & Type Safety',
      desc: 'Advocating for strict TypeScript contracts, schema validation, and predictable data boundaries to prevent runtime failures before code ever reaches staging.',
      badge: 'Defensive Design',
    },
    {
      title: 'Relational Isolation & RLS Security',
      desc: 'Leveraging PostgreSQL Row-Level Security, tenancy isolation keys, and authenticated session tokens to protect business data without relying solely on application-level filtering.',
      badge: 'Multi-Tenant Ready',
    },
    {
      title: 'Autonomous AI with Guardrails',
      desc: 'Integrating generative AI and LLM endpoints not as opaque black boxes, but through deterministic JSON schemas, error fallbacks, and prompt-engineered classification gates.',
      badge: 'Deterministic AI',
    },
    {
      title: 'Hardware & Systems Resilience',
      desc: 'Bridging physical biometric devices and socket protocols with local buffer queues, handling power cycles, and offline network reconnects gracefully.',
      badge: 'Zero Data Loss',
    },
  ];

  return (
    <section
      id="about"
      aria-label="About Rana Irtaza"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.08]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Narrative */}
        <motion.div
          className="lg:col-span-7 space-y-6"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center space-x-2 text-xs font-mono tracking-wider uppercase text-cyan-300">
            <Terminal className="w-3.5 h-3.5" />
            <span>01 // Developer Profile</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            Pragmatic software engineering with a focus on real operational utility.
          </h2>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              I am a software developer with a practical obsession with building
              dependable web applications, cloud database architectures, and business automation pipelines.
              My work centers on turning chaotic, manual workflows into streamlined, automated software solutions.
            </p>
            <p>
              As a{' '}
              <span className="text-white font-medium">
                BS Information Technology graduate (June 2026, CGPA 3.13 / 4.00)
              </span>
              , I combine strong theoretical computing foundations with proven hands-on software development at{' '}
              <span className="text-cyan-300 font-medium underline decoration-cyan-400/50 underline-offset-4">
                KeyAbroad Consultants (Faisalabad)
              </span>
              , where I spearheaded internal operations platforms and architected biometric attendance synchronization engines.
            </p>
            <p>
              I am deeply interested in building useful software products that provide real, measurable leverage—spanning
              multi-tenant SaaS tools like <span className="text-cyan-300 font-medium">LeadMachine</span>, automated client portals,
              and reliable hardware-to-cloud integration systems.
            </p>
          </div>

          {/* Key Indicators */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-surface-primary/70 border border-white/[0.08]">
              <div className="text-[11px] font-mono text-cyan-300">STATUS</div>
              <div className="text-sm font-semibold text-slate-100 mt-1">Open for Work</div>
              <div className="text-xs text-slate-400">Global & Remote</div>
            </div>
            <div className="p-3.5 rounded-xl bg-surface-primary/70 border border-white/[0.08]">
              <div className="text-[11px] font-mono text-violet-300">DEGREE</div>
              <div className="text-sm font-semibold text-slate-100 mt-1">BS Info Tech</div>
              <div className="text-xs text-slate-400">June 2026 • 3.13 CGPA</div>
            </div>
            <div className="p-3.5 rounded-xl bg-surface-primary/70 border border-white/[0.08]">
              <div className="text-[11px] font-mono text-sky-300">FOCUS</div>
              <div className="text-sm font-semibold text-slate-100 mt-1">Full-Stack + AI</div>
              <div className="text-xs text-slate-400">SaaS & Automation</div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Interactive System Inspector Card */}
        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="rounded-2xl glass-panel border border-white/[0.08] shadow-2xl overflow-hidden">
            {/* Header with tabs */}
            <div className="p-3 bg-surface-secondary border-b border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-300" />
                <span className="font-mono text-xs font-semibold text-slate-200">
                  SYSTEM_INSPECTOR.json
                </span>
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={() => setActiveTab('principles')}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                    activeTab === 'principles'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Principles
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
                  onClick={() => setActiveTab('stack')}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                    activeTab === 'stack'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Stack
                </button>
              </div>
            </div>

            {/* Tab Body */}
            <div className="p-5 space-y-4 text-xs font-sans min-h-[280px]">
              <AnimatePresence mode="wait">
                {activeTab === 'principles' && (
                  <motion.div
                    key="principles"
                    initial={{ opacity: isReducedMotion ? 1 : 0, y: isReducedMotion ? 0 : 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: isReducedMotion ? 1 : 0, y: isReducedMotion ? 0 : -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3.5"
                  >
                    {principles.map((p, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-cyan-400/20 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-slate-200 text-xs">{p.title}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/40">
                            {p.badge}
                          </span>
                        </div>
                        <p className="text-slate-400 text-[11px] leading-relaxed">{p.desc}</p>
                      </div>
                    ))}
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
                    <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/30 space-y-2">
                      <div className="flex items-center space-x-2 text-cyan-300 font-semibold text-sm">
                        <GraduationCap className="w-4 h-4" />
                        <span>Bachelor of Science in Information Technology</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-300 pt-1">
                        <span>Completed June 2026</span>
                        <span className="font-mono px-2 py-0.5 rounded bg-cyan-300 text-[#070a12] font-bold">
                          CGPA 3.13 / 4.00
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 pt-1">
                      <div className="text-[11px] font-mono uppercase text-slate-400">
                        Core Academic Foundations
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                        <div className="flex items-center space-x-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
                          <span>Database Systems (RDBMS)</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
                          <span>Computer Networks & Protocols</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
                          <span>Software Architecture</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
                          <span>Information Security</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'stack' && (
                  <motion.div
                    key="stack"
                    initial={{ opacity: isReducedMotion ? 1 : 0, y: isReducedMotion ? 0 : 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: isReducedMotion ? 1 : 0, y: isReducedMotion ? 0 : -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3 font-mono text-[11px]"
                  >
                    <div className="p-2.5 rounded-lg bg-surface-primary border border-white/[0.06]">
                      <span className="text-cyan-300 block mb-1">{'// Frontend & Rendering'}</span>
                      <span className="text-slate-300">
                        React 19, Next.js (App Router), TypeScript, Tailwind CSS
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-surface-primary border border-white/[0.06]">
                      <span className="text-violet-300 block mb-1">{'// Backend & Storage'}</span>
                      <span className="text-slate-300">
                        Node.js, PostgreSQL, Supabase (RLS & Auth), Prisma ORM, REST APIs
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-surface-primary border border-white/[0.06]">
                      <span className="text-sky-300 block mb-1">{'// Systems & Integration'}</span>
                      <span className="text-slate-300">
                        Raw TCP/IP Sockets, Biometric Hardware, Linux/Bash, Vercel
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
