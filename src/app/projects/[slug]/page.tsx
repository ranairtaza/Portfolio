import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PROJECTS } from '../../../data/portfolio';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Cpu,
  Shield,
  Workflow,
  Sparkles,
  GitBranch,
} from 'lucide-react';
import { GithubIcon } from '../../../components/ui/BrandIcons';
import { Metadata } from 'next';

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: 'Project Not Found | RANA.OS',
    };
  }

  return {
    title: `${project.title} — Technical Case Study | Rana Irtaza Ali Khan`,
    description: project.subtitle,
    openGraph: {
      title: `${project.title} | RANA.OS Case Study`,
      description: project.description,
    },
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projectIndex = PROJECTS.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = PROJECTS[projectIndex];
  const prevProject =
    projectIndex > 0 ? PROJECTS[projectIndex - 1] : PROJECTS[PROJECTS.length - 1];
  const nextProject =
    projectIndex < PROJECTS.length - 1 ? PROJECTS[projectIndex + 1] : PROJECTS[0];

  const isShipped = project.status === 'Shipped';
  const isPrototype = project.status === 'Active Development';

  return (
    <article className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      {/* Breadcrumb / Back Link */}
      <div className="flex items-center justify-between">
        <Link
          href="/#projects"
          className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Projects</span>
        </Link>

        <span
          className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium ${
            isShipped
              ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-800/50'
              : isPrototype
              ? 'bg-cyan-950/70 text-cyan-300 border border-cyan-800/50'
              : 'bg-violet-950/70 text-violet-300 border border-violet-800/50'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
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

      {/* Hero Header */}
      <div className="space-y-4">
        <div className="text-xs font-mono uppercase tracking-widest text-cyan-400">
          Case Study // {project.category.toUpperCase()}
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          {project.title}
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed">
          {project.subtitle}
        </p>

        {/* Action Bar */}
        <div className="pt-4 flex flex-wrap items-center gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl glass-panel hover:bg-white/[0.08] text-slate-200 hover:text-white text-xs font-mono border border-white/10 transition-all"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Source Code</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-[#030712] font-semibold text-xs tracking-wide transition-all shadow-md shadow-cyan-500/20"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demonstration</span>
            </a>
          )}
        </div>
      </div>

      {/* Tech Stack Banner */}
      <div className="p-5 rounded-2xl glass-panel border border-white/[0.08] space-y-3">
        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">
          Applied Stack & Frameworks
        </span>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-lg text-xs font-mono bg-surface-primary text-cyan-300 border border-cyan-800/30"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Problem & Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 rounded-2xl glass-panel border border-white/[0.08] space-y-3">
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono uppercase font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Executive Overview</span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            {project.caseStudy.overview}
          </p>
        </div>

        <div className="p-6 rounded-2xl glass-panel border border-white/[0.08] space-y-3">
          <div className="flex items-center space-x-2 text-rose-400 text-xs font-mono uppercase font-semibold">
            <Shield className="w-4 h-4" />
            <span>Problem Statement</span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            {project.caseStudy.problemStatement}
          </p>
        </div>
      </div>

      {/* Architecture Notes */}
      <div className="p-7 rounded-2xl glass-panel border border-white/[0.08] space-y-5">
        <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono uppercase font-semibold">
          <Cpu className="w-4 h-4" />
          <span>Architectural Blueprint & Implementation Strategy</span>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.caseStudy.architectureNotes.map((note, idx) => (
            <li
              key={idx}
              className="p-4 rounded-xl bg-surface-primary/70 border border-white/[0.06] text-xs text-slate-300 leading-relaxed flex items-start space-x-3"
            >
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Data Flow Pipeline */}
      <div className="p-7 rounded-2xl glass-panel border border-white/[0.08] space-y-4">
        <div className="flex items-center space-x-2 text-indigo-400 text-xs font-mono uppercase font-semibold">
          <Workflow className="w-4 h-4" />
          <span>End-to-End System Data Flow</span>
        </div>
        <div className="space-y-3 font-mono text-xs">
          {project.caseStudy.dataFlow.map((step, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-surface-primary border border-white/[0.06] text-slate-200 flex items-start space-x-3"
            >
              <span className="w-6 h-6 rounded-md bg-indigo-950/80 text-indigo-300 border border-indigo-700/50 flex items-center justify-center shrink-0 text-[11px] font-bold">
                {idx + 1}
              </span>
              <p className="mt-0.5 leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Engineering Challenges & Solutions */}
      <div className="p-7 rounded-2xl glass-panel border border-white/[0.08] space-y-4">
        <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono uppercase font-semibold">
          <GitBranch className="w-4 h-4" />
          <span>Core Engineering Challenges Resolved</span>
        </div>
        <div className="space-y-3">
          {project.caseStudy.keyChallenges.map((challenge, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-surface-primary/70 border border-white/[0.06] text-xs text-slate-300 leading-relaxed"
            >
              <span className="font-semibold text-slate-100 block mb-1">
                Challenge #{idx + 1}:
              </span>
              {challenge}
            </div>
          ))}
        </div>
      </div>

      {/* Current Status & Roadmap */}
      <div className="p-7 rounded-2xl glass-panel border border-white/[0.08] space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
            Status & Technical Roadmap
          </span>
          <span className="text-xs font-mono text-cyan-400">
            {project.status}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {project.caseStudy.currentStatus}
        </p>

        <div className="pt-3 border-t border-white/[0.06] space-y-2">
          <span className="text-[11px] font-mono uppercase text-slate-400 block font-semibold">
            Upcoming Milestones
          </span>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {project.caseStudy.futureRoadmap.map((item, idx) => (
              <li key={idx} className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Case Study Navigation Footer */}
      <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between">
        <Link
          href={`/projects/${prevProject.slug}`}
          className="flex items-center space-x-2 text-xs font-mono text-slate-400 hover:text-white transition-colors p-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Prev: {prevProject.title}</span>
        </Link>

        <Link
          href={`/projects/${nextProject.slug}`}
          className="flex items-center space-x-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors p-2"
        >
          <span>Next: {nextProject.title}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
}
