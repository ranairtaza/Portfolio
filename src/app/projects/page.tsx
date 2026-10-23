import React from 'react';
import Link from 'next/link';
import { PROJECTS } from '../../data/portfolio';
import {
  FolderGit2,
  ArrowRight,
  ExternalLink,
  Lock,
  GitCommit,
  ArrowLeft,
} from 'lucide-react';
import { Metadata } from 'next';
import { GithubIcon } from '../../components/ui/BrandIcons';
import { getSiteUrl } from '../../lib/siteConfig';

export const metadata: Metadata = {
  title: 'Engineering Projects & Case Studies | Rana Irtaza Ali Khan',
  description:
    'Comprehensive case studies covering multi-tenant SaaS, educational portals, hardware biometric synchronization, and cloud architectures.',
  alternates: {
    canonical: `${getSiteUrl()}/projects`,
  },
};

export default function ProjectsIndexPage() {
  return (
    <main className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
      {/* Navigation & Header */}
      <div className="space-y-4">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to RANA.OS Home</span>
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-xs font-mono tracking-wider uppercase text-cyan-300">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Project Catalog // Systems Directory</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Engineering Projects
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-sans leading-relaxed">
              Real-world systems, production platforms, and verified architectural prototypes.
              Supported by repository evidence, code audits, and technical case studies.
            </p>
          </div>
        </div>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROJECTS.map((project) => {
          const isPublic = project.repoAccessType === 'public';
          const isLive = project.status === 'Live';
          const isShipped = project.status === 'Shipped' || project.status === 'Internal Production';

          return (
            <div
              key={project.id}
              className="p-6 rounded-2xl glass-panel border border-white/[0.08] hover:border-cyan-400/40 transition-all flex flex-col justify-between space-y-5 group"
            >
              <div className="space-y-4">
                {/* Status and Category */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                    {project.categoryLabel}
                  </span>
                  <span
                    className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium ${
                      isLive
                        ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-800/50'
                        : isShipped
                        ? 'bg-indigo-950/70 text-indigo-300 border border-indigo-800/50'
                        : 'bg-cyan-950/70 text-cyan-300 border border-cyan-800/50'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isLive
                          ? 'bg-emerald-400 animate-pulse'
                          : isShipped
                          ? 'bg-indigo-400'
                          : 'bg-cyan-400'
                      }`}
                    />
                    <span>{project.statusBadge}</span>
                  </span>
                </div>

                {/* Title and Subtitle */}
                <div>
                  <h2 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1 font-sans">
                    {project.subtitle}
                  </p>
                </div>

                {/* Problem Statement */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-cyan-300 block">
                    Problem Addressed
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {project.problemStatement}
                  </p>
                </div>

                {/* Evidence telemetry tag */}
                {project.evidence?.verifiedCommits !== undefined && (
                  <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-400">
                    <GitCommit className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{project.evidence.verifiedCommits} verified commits in repository</span>
                  </div>
                )}

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface-primary text-slate-300 border border-white/[0.06]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
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
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
                      title="GitHub Repository"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  ) : (
                    <span
                      title={project.repoAccessLabel || 'Private System'}
                      className="p-1.5 text-slate-600"
                    >
                      <Lock className="w-3.5 h-3.5" />
                    </span>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-white/[0.06] transition-colors"
                      title="Live Demo"
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
    </main>
  );
}
