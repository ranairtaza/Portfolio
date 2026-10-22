'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { SKILL_CATEGORIES, PROJECTS } from '../../data/portfolio';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  Cpu,
  Database,
  Network,
  Workflow,
  ShieldCheck,
  Server,
  Layout,
  CheckCircle2,
  FolderGit2,
  ArrowRight,
  Sparkles,
  X,
} from 'lucide-react';

const categoryIcons: Record<string, React.ReactNode> = {
  Layout: <Layout className="w-4 h-4 text-cyan-300" />,
  Server: <Server className="w-4 h-4 text-sky-300" />,
  Database: <Database className="w-4 h-4 text-indigo-300" />,
  Workflow: <Workflow className="w-4 h-4 text-violet-300" />,
  Network: <Network className="w-4 h-4 text-teal-300" />,
  ShieldCheck: <ShieldCheck className="w-4 h-4 text-emerald-300" />,
};

// Map skills to practical project usages
const SKILL_PROJECT_APPLICATION: Record<string, Record<string, string>> = {
  'Next.js (App Router)': {
    leadmachine: 'Server Components, dynamic route handlers, and multi-tenant subpath routing.',
    keyabroad: 'Authenticated operations portal layout, SSR student dossier view, and server-side RBAC.',
    'biometric-attendance': 'Administrative hardware telemetry dashboard and live socket monitor.',
  },
  React: {
    leadmachine: 'Interactive lead staging kanban and real-time qualification feeds.',
    keyabroad: 'Interactive dossier review forms, multi-file document uploaders, and status trackers.',
  },
  TypeScript: {
    leadmachine: 'Strict end-to-end API payloads, Prisma schemas, and LLM structured JSON types.',
    keyabroad: 'Role matrices, student intake models, and secure document payload signatures.',
    'biometric-attendance': 'TCP packet buffer types, hardware response serialization, and reconciliation engine.',
  },
  'Tailwind CSS v4': {
    leadmachine: 'Custom dark-mode glassmorphic control panels and high-density data tables.',
    keyabroad: 'Clean internal admin layouts optimized for high-volume counselor workflows.',
    'biometric-attendance': 'Compact telemetry views and event status indicators.',
  },
  'Node.js': {
    keyabroad: 'Document processing services, token issuance, and background notification workers.',
    'biometric-attendance': 'Persistent TCP daemon receiving raw hardware biometric sockets on local network.',
  },
  'REST APIs': {
    leadmachine: 'Webhook intake endpoints and tenant lead ingestion routes.',
    keyabroad: 'Secured student application and counselor management REST endpoints.',
    'biometric-attendance': 'Cloud sync API for encrypted punch batching from on-premise daemon.',
  },
  PostgreSQL: {
    leadmachine: 'Multi-tenant database schema with strict Row-Level Security (RLS) isolation.',
    keyabroad: 'Relational data store tracking university cutoffs, applications, and student dossiers.',
    'biometric-attendance': 'Centralized enterprise attendance database storing timecard punches and shifts.',
  },
  Supabase: {
    leadmachine: 'Database hosting, Row-Level Security policy enforcement, and authentication.',
    keyabroad: 'Object storage for encrypted student transcript files and temporary signed URLs.',
  },
  'Prisma ORM': {
    leadmachine: 'Strict relational modeling, type-safe database queries, and automatic migrations.',
  },
  'AI API Integrations': {
    leadmachine: 'Prompt-engineered lead scoring pipelines with deterministic JSON schema validation.',
  },
  'Business Automation': {
    leadmachine: 'Automated qualification pipelines and lead sequence dispatch triggers.',
    'biometric-attendance': 'Automated punch-to-payroll reconciliation reducing manual collation by 90%.',
  },
  'Multi-Tenant Design': {
    leadmachine: 'Multi-tenant schema partitioning with organization-scoped data isolation.',
  },
  'TCP/IP Sockets': {
    'biometric-attendance': 'Raw bidirectional socket communications with biometric terminal hardware.',
  },
  'Authentication & RBAC': {
    leadmachine: 'Tenant-scoped session tokens and administrative role controls.',
    keyabroad: 'Granular permissions differentiating counselors, verification officers, and directors.',
  },
  'Git & GitHub': {
    leadmachine: 'Version control, atomic commits, and automated deployment triggers.',
    keyabroad: 'Feature branches, issue tracking, and collaborative internal code reviews.',
    'biometric-attendance': 'Daemon build management and deployment automation.',
  },
  'Vercel Platform': {
    leadmachine: 'Edge function execution, serverless Next.js hosting, and automated preview branches.',
    keyabroad: 'Production cloud hosting with custom domain configuration and zero downtime.',
  },
};

export default function SkillsConstellation() {
  const { selectedSkill, setSelectedSkill, isReducedMotion } = usePortfolio();
  const [activeSkillHover, setActiveSkillHover] = useState<string | null>(null);

  const currentSkill = selectedSkill || activeSkillHover || 'Next.js (App Router)';

  // Find all projects that use the selected skill
  const matchingProjects = PROJECTS.filter((proj) => {
    const explicitMap = SKILL_PROJECT_APPLICATION[currentSkill];
    if (explicitMap && explicitMap[proj.id]) return true;

    const lower = currentSkill.toLowerCase();
    return proj.technologies.some((tech) => {
      const techLower = tech.toLowerCase();
      return (
        techLower.includes(lower) ||
        lower.includes(techLower) ||
        (lower.includes('next.js') && techLower.includes('next.js')) ||
        (lower.includes('ai') && techLower.includes('ai')) ||
        (lower.includes('sql') && (techLower.includes('sql') || techLower.includes('postgresql')))
      );
    });
  });

  const getProjectSpecificContext = (projectId: string) => {
    const appMap = SKILL_PROJECT_APPLICATION[currentSkill];
    if (appMap && appMap[projectId]) {
      return appMap[projectId];
    }
    return 'Integrated as a core engineering technology within the system architecture.';
  };

  return (
    <section
      id="skills"
      aria-label="Technical Skills Constellation"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.08]"
    >
      <div className="space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-mono tracking-wider uppercase text-cyan-300">
              <Cpu className="w-3.5 h-3.5" />
              <span>03 // Skills Constellation & Project Graph</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Skills Constellation
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl">
              Technologies organized by architectural domain. Click any technology below to see
              how it is practically deployed across concrete production and prototype systems.
            </p>
          </div>

          {/* Quick Info Chip */}
          <div className="hidden sm:inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-surface-primary border border-cyan-400/30 text-xs font-mono text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>Click any tech to inspect project usage</span>
          </div>
        </div>

        {/* Dynamic Project Link Inspector Banner */}
        <div className="rounded-2xl glass-panel border border-cyan-400/40 p-5 sm:p-6 bg-gradient-to-r from-cyan-950/30 via-slate-900/60 to-violet-950/30 shadow-xl shadow-cyan-950/20 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.08]">
            <div className="flex items-center space-x-3">
              <span className="p-2 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                <FolderGit2 className="w-4 h-4" />
              </span>
              <div>
                <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">
                  Technology Connected To Projects
                </div>
                <div className="text-base sm:text-lg font-bold text-white flex items-center space-x-2">
                  <span>{currentSkill}</span>
                  <span className="text-xs font-mono font-normal text-slate-400">
                    ({matchingProjects.length} {matchingProjects.length === 1 ? 'project' : 'projects'})
                  </span>
                </div>
              </div>
            </div>

            {selectedSkill && (
              <button
                onClick={() => setSelectedSkill(null)}
                className="self-start sm:self-center inline-flex items-center space-x-1 px-2.5 py-1 rounded text-xs font-mono text-slate-400 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] transition-colors"
                title="Reset skill selection"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset selection</span>
              </button>
            )}
          </div>

          {/* Connected Projects Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSkill}
              initial={{ opacity: isReducedMotion ? 1 : 0, y: isReducedMotion ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: isReducedMotion ? 1 : 0, y: isReducedMotion ? 0 : -8 }}
              transition={{ duration: 0.2 }}
            >
              {matchingProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {matchingProjects.map((project) => (
                    <div
                      key={project.id}
                      className="p-4 rounded-xl bg-surface-primary/80 border border-white/[0.08] hover:border-cyan-300/40 transition-all flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono uppercase text-slate-400">
                            {project.categoryLabel}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-800/40">
                            {project.statusBadge}
                          </span>
                        </div>
                        <h4 className="font-bold text-white text-sm">{project.title}</h4>
                        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                          {getProjectSpecificContext(project.id)}
                        </p>
                      </div>

                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center space-x-1.5 text-xs font-semibold text-cyan-300 hover:text-cyan-200 transition-colors pt-1"
                      >
                        <span>Read Architecture Case Study</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs font-mono text-slate-400 py-2">
                  Foundational skill utilized across full-stack systems engineering and architectural standards.
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 6 Categorized Technology Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((category) => (
            <div
              key={category.id}
              className="p-6 rounded-2xl glass-panel border border-white/[0.08] hover:border-cyan-300/40 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/20 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <div className="flex items-center space-x-2.5">
                    <div className="p-2 rounded-lg bg-surface-primary border border-white/[0.08]">
                      {categoryIcons[category.iconName] || <Cpu className="w-4 h-4 text-cyan-300" />}
                    </div>
                    <h3 className="font-bold text-white text-base">
                      {category.title}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-slate-400 border border-white/10 uppercase">
                    {category.skills.length} techs
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {category.description}
                </p>

                {/* Skills List in Card */}
                <div className="space-y-2 pt-2">
                  {category.skills.map((skill, idx) => {
                    const isSelected = selectedSkill === skill.name || currentSkill === skill.name;

                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedSkill(skill.name)}
                        onMouseEnter={() => setActiveSkillHover(skill.name)}
                        onMouseLeave={() => setActiveSkillHover(null)}
                        className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-300 ${
                          isSelected
                            ? 'bg-cyan-500/15 border border-cyan-400/50 shadow-sm shadow-cyan-500/20'
                            : 'bg-surface-primary/70 border border-white/[0.05] hover:border-cyan-300/30 hover:bg-white/[0.03]'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <CheckCircle2
                            className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                              isSelected ? 'text-cyan-300' : 'text-slate-500'
                            }`}
                          />
                          <span
                            className={`text-xs font-semibold transition-colors ${
                              isSelected ? 'text-cyan-200' : 'text-slate-200'
                            }`}
                          >
                            {skill.name}
                          </span>
                        </div>
                        {skill.highlight && (
                          <span className="text-[10px] font-mono text-slate-400 truncate max-w-[130px]">
                            {skill.highlight}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
