'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PROJECTS } from '../../data/portfolio';
import { ProjectCategory } from '../../types/portfolio';
import {
  FolderGit2,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { GithubIcon } from '../ui/BrandIcons';

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');

  const categories: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: 'All Projects' },
    { id: 'saas', label: 'SaaS & AI' },
    { id: 'enterprise', label: 'Enterprise Systems' },
    { id: 'automation', label: 'Hardware & Automation' },
  ];

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  return (
    <section
      id="projects"
      aria-label="Featured Projects"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]"
    >
      <div className="space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-mono tracking-wider uppercase text-cyan-400">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>02 // Systems & Software</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Featured Engineering Projects
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl">
              Architected software solutions spanning multi-tenant SaaS, educational
              workflow engines, and physical biometric hardware integrations.
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
                    ? 'bg-cyan-500 text-[#030712] font-semibold shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const isPrototype = project.status === 'Active Development';
            const isShipped = project.status === 'Shipped';

            return (
              <div
                key={project.id}
                className="group relative flex flex-col justify-between rounded-2xl glass-panel border border-white/[0.08] hover:border-cyan-500/30 p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-950/20"
              >
                <div className="space-y-4">
                  {/* Top Bar: Category & Status Badge */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
                      {project.category}
                    </span>
                    <span
                      className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium ${
                        isShipped
                          ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-800/50'
                          : isPrototype
                          ? 'bg-cyan-950/70 text-cyan-300 border border-cyan-800/50'
                          : 'bg-violet-950/70 text-violet-300 border border-violet-800/50'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isShipped
                            ? 'bg-emerald-400'
                            : isPrototype
                            ? 'bg-cyan-400 animate-pulse'
                            : 'bg-violet-400'
                        }`}
                      />
                      <span>{project.statusBadge}</span>
                    </span>
                  </div>

                  {/* Project Title & Subtitle */}
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 font-sans">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Architectural Highlights */}
                  <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                      Key Highlights
                    </span>
                    <ul className="space-y-1.5 text-[11px] text-slate-300">
                      {project.highlights.slice(0, 3).map((hl, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Tags */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] text-slate-300 border border-white/[0.06]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center space-x-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 group/link transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded"
                  >
                    <span>Read Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>

                  <div className="flex items-center space-x-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
                        title="View GitHub Repository"
                        aria-label={`GitHub for ${project.title}`}
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-white/[0.06] transition-colors"
                        title="View Live Concept"
                        aria-label={`Live Demo for ${project.title}`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
