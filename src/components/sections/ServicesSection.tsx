'use client';

import React from 'react';
import Link from 'next/link';
import { SERVICES_DATA, PERSONAL_INFO } from '../../data/portfolio';
import {
  Globe,
  Layers,
  LayoutDashboard,
  Cpu,
  Sparkles,
  ArrowRight,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Code2,
  ShieldCheck,
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-5 h-5 text-cyan-300" />,
  Layers: <Layers className="w-5 h-5 text-violet-300" />,
  LayoutDashboard: <LayoutDashboard className="w-5 h-5 text-cyan-300" />,
  Cpu: <Cpu className="w-5 h-5 text-violet-300" />,
  Sparkles: <Sparkles className="w-5 h-5 text-cyan-300" />,
};

export default function ServicesSection() {
  const handleSelectService = () => {
    // Scroll to contact section
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="services"
      aria-label="Services & Capabilities Overview"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.08]"
    >
      <div className="space-y-16">
        {/* Section Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-mono tracking-wider uppercase text-cyan-300">
            <Code2 className="w-3.5 h-3.5" />
            <span>06 // Engineering Capabilities</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                What I Can Help Build
              </h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                Core technical focus areas available for software development projects, SaaS MVPs, and business
                automation. These communicate areas of engineering capability—not proof of completed client engagements.
              </p>
            </div>

            <div className="shrink-0 flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-surface-primary border border-white/[0.08] text-xs font-mono text-slate-400">
              <ShieldCheck className="w-4 h-4 text-cyan-300" />
              <span>Verified Skillsets Only</span>
            </div>
          </div>
        </div>

        {/* 5 Service Area Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service, index) => (
            <div
              key={service.id}
              className={`rounded-2xl p-6 glass-panel border border-white/[0.08] hover:border-cyan-400/40 transition-all duration-300 flex flex-col justify-between group ${
                index === 3 || index === 4 ? 'md:col-span-1 lg:col-span-1' : ''
              }`}
            >
              <div className="space-y-5">
                {/* Header & Icon */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-surface-primary border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {iconMap[service.iconName] || <Globe className="w-5 h-5 text-cyan-300" />}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.04] text-slate-400 border border-white/[0.06]">
                    {service.badge}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-white group-hover:text-cyan-200 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    {service.description}
                  </p>
                </div>

                {/* Deliverables */}
                <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300 block font-medium">
                    Key Deliverables:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {service.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-300 shrink-0 mt-0.5" />
                        <span className="leading-tight">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Stack & Action */}
              <div className="pt-6 mt-6 border-t border-white/[0.06] space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {service.suggestedStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-primary text-slate-300 border border-white/[0.08]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <button
                  onClick={handleSelectService}
                  className="w-full inline-flex items-center justify-between px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-cyan-500/10 text-slate-200 hover:text-cyan-300 border border-white/[0.08] hover:border-cyan-400/30 text-xs font-mono transition-all group/btn focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-300"
                >
                  <span>Discuss Requirements</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform text-cyan-300" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Client Conversion Funnel Path */}
        <div className="rounded-2xl p-8 glass-panel border border-white/[0.08] bg-surface-secondary/40 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-semibold block">
              Clear Engagement Path
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              From Exploration to Collaboration
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
              A transparent, pressure-free evaluation process. Review verified architectural evidence, assess technical
              suitability, and schedule a conversation when ready.
            </p>
          </div>

          {/* 3 Step Flow */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Step 1 */}
            <div className="p-5 rounded-xl bg-surface-primary border border-white/[0.08] space-y-3 relative group hover:border-cyan-400/40 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-300 font-bold px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40">
                  Step 01
                </span>
                <span className="text-[10px] font-mono text-slate-500">DISCOVER</span>
              </div>
              <h4 className="text-sm font-semibold text-white">Explore Projects</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Review live application architectures, technology stacks, and verified repository evidence.
              </p>
              <div className="pt-2">
                <a
                  href="#projects"
                  className="inline-flex items-center space-x-1.5 text-xs font-mono text-cyan-300 hover:text-cyan-200 transition-colors"
                >
                  <span>Browse Projects</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-xl bg-surface-primary border border-white/[0.08] space-y-3 relative group hover:border-violet-400/40 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-violet-300 font-bold px-2 py-0.5 rounded bg-violet-950/60 border border-violet-800/40">
                  Step 02
                </span>
                <span className="text-[10px] font-mono text-slate-500">VERIFY</span>
              </div>
              <h4 className="text-sm font-semibold text-white">Review Relevant Case Study</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Inspect system trade-offs, engineering decisions, and security constraints implemented in practice.
              </p>
              <div className="pt-2">
                <Link
                  href="/projects/leadmachine"
                  className="inline-flex items-center space-x-1.5 text-xs font-mono text-violet-300 hover:text-violet-200 transition-colors"
                >
                  <span>Inspect LeadMachine Case Study</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-xl bg-surface-primary border border-white/[0.08] space-y-3 relative group hover:border-cyan-400/40 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-300 font-bold px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40">
                  Step 03
                </span>
                <span className="text-[10px] font-mono text-slate-500">CONNECT</span>
              </div>
              <h4 className="text-sm font-semibold text-white">Contact or Book Conversation</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Schedule a direct 1-on-1 discovery call on Google Calendar or submit your project specification.
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                <a
                  href={PERSONAL_INFO.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs font-mono text-cyan-300 hover:text-cyan-200 transition-colors"
                >
                  <Calendar className="w-3 h-3" />
                  <span>Google Calendar Booking</span>
                  <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
