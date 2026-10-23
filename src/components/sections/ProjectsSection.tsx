'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS } from '../../data/portfolio';
import { ProjectCategory } from '../../types/portfolio';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  FolderGit2,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  Terminal,
  GitCommit,
  Lock,
} from 'lucide-react';
import { GithubIcon } from '../ui/BrandIcons';

export default function ProjectsSection() {
  const { isReducedMotion, setActiveProjectId, activeProjectId } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');

  const categories: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: 'All Projects' },
    { id: 'saas', label: 'SaaS & AI' },
    { id: 'enterprise', label: 'Enterprise Systems' },
    { id: 'automation', label: 'Hardware & Automation' },
    { id: 'client', label: 'Client Work' },
  ];

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  return (
    <section
      id="projects"
      aria-label="Featured Projects"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.08]"
    >
      <div className="space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-mono tracking-wider uppercase text-cyan-300">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>02 // Systems & Software</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Featured Projects & Case Studies
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl font-sans leading-relaxed">
              Real-world systems supported by repository evidence, code audits, architecture diagrams,
              and dedicated technical case studies.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1.5 rounded-xl glass-panel border border-white/[0.08] w-fit">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-cyan-300 text-[#070a12] font-semibold shadow-md shadow-cyan-300/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const isPrototype = project.status === 'Active Development' || project.status === 'Prototype';
              const isLive = project.status === 'Live';
              const isShipped = project.status === 'Shipped' || project.status === 'Internal Production';
              const isActiveInScene = activeProjectId === project.id;
              const isPublic = project.repoAccessType === 'public';

              return (
                <motion.div
                  key={project.id}
                  layout={!isReducedMotion}
                  initial={{ opacity: isReducedMotion ? 1 : 0, scale: isReducedMotion ? 1 : 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: isReducedMotion ? 1 : 0, scale: isReducedMotion ? 1 : 0.96 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  tabIndex={0}
                  onMouseEnter={() => setActiveProjectId(project.id)}
                  onMouseLeave={() => setActiveProjectId(null)}
                  onFocus={() => setActiveProjectId(project.id)}
                  onBlur={() => setActiveProjectId(null)}
                  className={`group relative flex flex-col justify-between rounded-2xl glass-panel border p-6 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/50 ${
                    isActiveInScene
                      ? 'border-cyan-300/60 shadow-2xl shadow-cyan-950/30'
                      : 'border-white/[0.08] hover:border-cyan-300/40 hover:shadow-2xl hover:shadow-cyan-950/20'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Top Bar: Category & Status Badge */}
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
                        {project.categoryLabel}
                      </span>
                      <span
                        className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium ${
                          isLive
                            ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-800/50'
                            : isShipped
                            ? 'bg-indigo-950/70 text-indigo-300 border border-indigo-800/50'
                            : isPrototype
                            ? 'bg-cyan-950/70 text-cyan-300 border border-cyan-800/50'
                            : 'bg-violet-950/70 text-violet-300 border border-violet-800/50'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isLive
                              ? 'bg-emerald-400 animate-pulse'
                              : isShipped
                              ? 'bg-indigo-400'
                              : isPrototype
                              ? 'bg-cyan-300'
                              : 'bg-violet-400'
                          }`}
                        />
                        <span>{project.statusBadge}</span>
                      </span>
                    </div>

                    {/* Visual Screenshot / Preview Frame Container */}
                    <div className="rounded-xl overflow-hidden border border-white/[0.08] bg-[#0c1222]/90 flex flex-col">
                      {/* Mock Browser/Terminal Frame Bar */}
                      <div className="px-3 py-2 bg-surface-secondary/90 border-b border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-slate-400">
                        <div className="flex items-center space-x-1.5">
                          <span className="w-2 h-2 rounded-full bg-rose-500/80" />
                          <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                          <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                        </div>
                        <span className="text-slate-500 truncate max-w-[150px]">
                          {project.previewImageMock?.routeEndpoint || `/${project.slug}`}
                        </span>
                        <Terminal className="w-3 h-3 text-cyan-300/80" />
                      </div>

                      {/* Visual Area (Supports real screenshot or telemetry preview) */}
                      <div className="p-4 flex flex-col justify-center min-h-[90px] relative overflow-hidden bg-gradient-to-b from-white/[0.02] to-transparent">
                        <div className="text-[11px] font-mono text-slate-300 flex items-center space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-300" />
                          <span className="truncate">
                            {project.previewImageMock?.terminalSnippet || `${project.title} // Core System`}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1 font-mono flex items-center justify-between">
                          <span>Status: {project.status}</span>
                          {project.evidence?.verifiedCommits !== undefined && (
                            <span className="text-cyan-400 flex items-center space-x-1">
                              <GitCommit className="w-3 h-3" />
                              <span>{project.evidence.verifiedCommits} commits</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Project Title & Subtitle */}
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 font-sans leading-relaxed">
                        {project.subtitle}
                      </p>
                    </div>

                    {/* Problem-Focused Description */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-300 block">
                        Problem Solved
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans line-clamp-3">
                        {project.problemStatement}
                      </p>
                    </div>

                    {/* Key Highlights */}
                    <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                        Implementation Evidence
                      </span>
                      <ul className="space-y-1.5 text-[11px] text-slate-300">
                        {project.highlights.slice(0, 2).map((hl, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-300 shrink-0 mt-0.5" />
                            <span className="line-clamp-2">{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Tags */}
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] text-slate-300 border border-white/[0.06]"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 5 && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-500">
                          +{project.technologies.length - 5}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="pt-5 mt-5 border-t border-white/[0.06] flex items-center justify-between">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center space-x-1.5 text-xs font-semibold text-cyan-300 hover:text-cyan-200 group/link transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-300 rounded"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                    </Link>

                    <div className="flex items-center space-x-2">
                      {project.githubUrl && isPublic ? (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-300"
                          title="View Verified GitHub Repository"
                          aria-label={`GitHub for ${project.title}`}
                        >
                          <GithubIcon className="w-4 h-4" />
                        </a>
                      ) : (
                        <span
                          className="p-1.5 text-slate-600 cursor-default"
                          title={project.repoAccessLabel || 'Private System'}
                          aria-label="Private or On-Premise System"
                        >
                          <Lock className="w-3.5 h-3.5" />
                        </span>
                      )}

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-white/[0.06] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-300"
                          title="View Live Demonstration"
                          aria-label={`Live Demo for ${project.title}`}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
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
