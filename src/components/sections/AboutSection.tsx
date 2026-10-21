'use client';

import React, { useState } from 'react';
import {
  GraduationCap,
  CheckCircle2,
  Terminal,
} from 'lucide-react';

export default function AboutSection() {
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
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Narrative */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center space-x-2 text-xs font-mono tracking-wider uppercase text-cyan-400">
            <Terminal className="w-3.5 h-3.5" />
            <span>01 // Developer Profile</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            Building software systems that solve real operational friction.
          </h2>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              I am a software developer with a practical obsession with building
              dependable web applications, cloud database architectures, and business automation pipelines.
              My work centers on turning chaotic, manual workflows into streamlined, automated software solutions.
            </p>
            <p>
              Currently, I engineer software platforms and systems integrations at{' '}
              <span className="text-white font-medium underline decoration-cyan-500/50 underline-offset-4">
                KeyAbroad Consultants
              </span>
              , where I spearheaded the internal KeyAbroad 2.0 student lifecycle platform and architected
              the Biometric Attendance & HR Integration engine bridging physical recognition hardware to our
              PostgreSQL database.
            </p>
            <p>
              Alongside client and internal enterprise systems, I am building{' '}
              <span className="text-cyan-300 font-medium">LeadMachine</span>, a multi-tenant AI-assisted
              business software platform engineered for automated lead qualification and intelligent outreach.
            </p>
          </div>

          {/* Key Indicators */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-surface-primary/70 border border-white/[0.07]">
              <div className="text-[11px] font-mono text-cyan-400">STATUS</div>
              <div className="text-sm font-semibold text-slate-100 mt-1">Open for Work</div>
              <div className="text-xs text-slate-400">Global & Remote</div>
            </div>
            <div className="p-3.5 rounded-xl bg-surface-primary/70 border border-white/[0.07]">
              <div className="text-[11px] font-mono text-indigo-400">DEGREE</div>
              <div className="text-sm font-semibold text-slate-100 mt-1">BS Info Tech</div>
              <div className="text-xs text-slate-400">June 2026 • 3.10 CGPA</div>
            </div>
            <div className="p-3.5 rounded-xl bg-surface-primary/70 border border-white/[0.07]">
              <div className="text-[11px] font-mono text-violet-400">SPECIALIZATION</div>
              <div className="text-sm font-semibold text-slate-100 mt-1">Full-Stack + AI</div>
              <div className="text-xs text-slate-400">Next.js & PostgreSQL</div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive System Inspector Card */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl glass-panel border border-white/[0.09] shadow-2xl overflow-hidden">
            {/* Header with tabs */}
            <div className="p-3 bg-surface-secondary border-b border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                <span className="font-mono text-xs font-semibold text-slate-200">
                  SYSTEM_INSPECTOR.json
                </span>
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={() => setActiveTab('principles')}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                    activeTab === 'principles'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Principles
                </button>
                <button
                  onClick={() => setActiveTab('education')}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                    activeTab === 'education'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Education
                </button>
                <button
                  onClick={() => setActiveTab('stack')}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                    activeTab === 'stack'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Stack
                </button>
              </div>
            </div>

            {/* Tab Body */}
            <div className="p-5 space-y-4 text-xs font-sans">
              {activeTab === 'principles' && (
                <div className="space-y-3.5">
                  {principles.map((p, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-cyan-500/20 transition-colors"
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
                </div>
              )}

              {activeTab === 'education' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/30 space-y-2">
                    <div className="flex items-center space-x-2 text-cyan-300 font-semibold text-sm">
                      <GraduationCap className="w-4 h-4" />
                      <span>Bachelor of Science in Information Technology</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-300 pt-1">
                      <span>Completion: June 2026</span>
                      <span className="font-mono px-2 py-0.5 rounded bg-cyan-400 text-[#030712] font-bold">
                        CGPA 3.10 / 4.00
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-1">
                    <div className="text-[11px] font-mono uppercase text-slate-400">
                      Core Academic Foundations
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                      <div className="flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>Database Systems (RDBMS)</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>Computer Networks & Protocols</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>Software Architecture</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>Information Security</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'stack' && (
                <div className="space-y-3 font-mono text-[11px]">
                  <div className="p-2.5 rounded-lg bg-surface-primary border border-white/[0.06]">
                    <span className="text-cyan-400 block mb-1">{'// Frontend & Rendering'}</span>
                    <span className="text-slate-300">
                      React 19, Next.js (App Router), TypeScript, Tailwind CSS, Motion
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-surface-primary border border-white/[0.06]">
                    <span className="text-indigo-400 block mb-1">{'// Backend & Storage'}</span>
                    <span className="text-slate-300">
                      Node.js, PostgreSQL, Supabase (RLS & Auth), Prisma ORM, REST APIs
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-surface-primary border border-white/[0.06]">
                    <span className="text-violet-400 block mb-1">{'// Hardware & Systems'}</span>
                    <span className="text-slate-300">
                      Raw TCP/IP Sockets, Biometric Terminals, Linux/Bash, Vercel, Git
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
