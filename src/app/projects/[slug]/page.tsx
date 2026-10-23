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
  Sparkles,
  GitBranch,
  Users,
  Briefcase,
  Layers,
  Terminal,
} from 'lucide-react';
import { GithubIcon } from '../../../components/ui/BrandIcons';
import ArchitectureDiagram from '../../../components/ui/ArchitectureDiagram';
import EvidenceAuditCard from '../../../components/ui/EvidenceAuditCard';
import { Metadata } from 'next';
import { getSiteUrl } from '../../../lib/siteConfig';

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
      description: 'The requested engineering case study could not be located in RANA.OS.',
    };
  }

  const productionUrl = getSiteUrl();
  const canonicalUrl = `${productionUrl}/projects/${project.slug}`;

  return {
    title: `${project.title} — Technical Case Study | Rana Irtaza Ali Khan`,
    description: `${project.subtitle}. Problem statement, architecture blueprint, engineering decisions, and verified repository evidence.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${project.title} | RANA.OS Technical Case Study`,
      description: project.description,
      url: canonicalUrl,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} — Architecture Case Study`,
      description: project.subtitle,
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

  const isShipped = project.status === 'Shipped' || project.status === 'Internal Production';
  const isLive = project.status === 'Live';
  const isPrototype = project.status === 'Prototype' || project.status === 'Active Development';

  // Related projects
  const relatedProjects = (project.relatedSlugs || [])
    .map((s) => PROJECTS.find((p) => p.slug === s))
    .filter((p): p is typeof project => Boolean(p));

  return (
    <article className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      {/* 01. Breadcrumb / Back Link */}
      <nav aria-label="Breadcrumb" className="flex items-center justify-between">
        <Link
          href="/#projects"
          className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-300 rounded"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Projects</span>
        </Link>

        <span
          className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium ${
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
            className={`w-2 h-2 rounded-full ${
              isLive
                ? 'bg-emerald-400 animate-pulse'
                : isShipped
                ? 'bg-indigo-400'
                : isPrototype
                ? 'bg-cyan-400'
                : 'bg-violet-400'
            }`}
          />
          <span>{project.statusBadge}</span>
        </span>
      </nav>

      {/* 02. Hero Header */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
            Case Study // {project.categoryLabel}
          </span>
          {project.role && (
            <>
              <span className="text-slate-600 font-mono">•</span>
              <span className="text-xs font-mono text-slate-400 flex items-center space-x-1">
                <Briefcase className="w-3 h-3 text-violet-400" />
                <span>{project.role}</span>
              </span>
            </>
          )}
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          {project.title}
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed">
          {project.subtitle}
        </p>

        {/* Action Bar */}
        <div className="pt-3 flex flex-wrap items-center gap-3">
          {project.githubUrl && project.repoAccessType === 'public' && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl glass-panel hover:bg-white/[0.08] text-slate-200 hover:text-white text-xs font-mono border border-white/10 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Verified Source Code</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-[#070a12] font-semibold text-xs tracking-wide transition-all shadow-md shadow-cyan-400/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demonstration</span>
            </a>
          )}
        </div>
      </header>

      {/* 03. Telemetry Visualizer / Mock Interface Preview */}
      <section aria-label="System Interface Telemetry" className="rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0c1222]/90 flex flex-col">
        <div className="px-4 py-2.5 bg-surface-secondary/90 border-b border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-slate-500 font-sans">
              Endpoint Telemetry: {project.previewImageMock?.routeEndpoint || `/${project.slug}`}
            </span>
          </div>
          <Terminal className="w-4 h-4 text-cyan-300" />
        </div>

        <div className="p-6 relative overflow-hidden bg-gradient-to-b from-white/[0.02] to-transparent space-y-2">
          <div className="text-xs font-mono text-cyan-300 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>ACTIVE RUNTIME CONTEXT</span>
          </div>
          <p className="font-mono text-xs sm:text-sm text-slate-200">
            {project.previewImageMock?.terminalSnippet || `${project.title} // Core System Active`}
          </p>
          <div className="text-[11px] font-mono text-slate-400 pt-1">
            Status: {project.status} • Category: {project.categoryLabel}
          </div>
        </div>
      </section>

      {/* 04. Executive Overview & Problem Statement Grid */}
      <section aria-label="Executive Overview and Problem" className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <span>Problem Addressed</span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            {project.caseStudy.problemStatement}
          </p>
        </div>
      </section>

      {/* 05. Target Users & My Contributions */}
      <section aria-label="Target Users and Contributions" className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {project.caseStudy.targetUsers && (
          <div className="p-6 rounded-2xl glass-panel border border-white/[0.08] space-y-3">
            <div className="flex items-center space-x-2 text-violet-400 text-xs font-mono uppercase font-semibold">
              <Users className="w-4 h-4" />
              <span>Target Users & Real Use Case</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              {project.caseStudy.targetUsers}
            </p>
          </div>
        )}

        {project.caseStudy.roleAndContributions && project.caseStudy.roleAndContributions.length > 0 && (
          <div className="p-6 rounded-2xl glass-panel border border-white/[0.08] space-y-3">
            <div className="flex items-center space-x-2 text-emerald-400 text-xs font-mono uppercase font-semibold">
              <Briefcase className="w-4 h-4" />
              <span>My Role & Engineering Contributions</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {project.caseStudy.roleAndContributions.map((contrib, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{contrib}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* 06. Tech Stack Breakdown */}
      <section aria-label="Technical Stack" className="p-6 sm:p-7 rounded-2xl glass-panel border border-white/[0.08] space-y-4">
        <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono uppercase font-semibold">
          <Layers className="w-4 h-4" />
          <span>Technical Stack & Framework Breakdown</span>
        </div>

        {project.caseStudy.techStack && project.caseStudy.techStack.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
            {project.caseStudy.techStack.map((group) => (
              <div
                key={group.category}
                className="p-4 rounded-xl bg-surface-primary/70 border border-white/[0.06] space-y-2"
              >
                <span className="text-[11px] font-mono uppercase text-slate-400 font-semibold block">
                  {group.category}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-surface-secondary text-cyan-300 border border-cyan-900/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
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
        )}
      </section>

      {/* 07. Architecture Blueprint (Diagram Component) */}
      {project.caseStudy.architecture && (
        <section aria-label="System Architecture">
          <ArchitectureDiagram
            spec={project.caseStudy.architecture}
            projectTitle={project.title}
          />
        </section>
      )}

      {/* 08. Meaningful Engineering Decisions & Trade-Offs */}
      {project.caseStudy.engineeringDecisions && project.caseStudy.engineeringDecisions.length > 0 && (
        <section aria-label="Engineering Decisions" className="p-6 sm:p-7 rounded-2xl glass-panel border border-white/[0.08] space-y-5">
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono uppercase font-semibold">
            <Cpu className="w-4 h-4" />
            <span>Key Engineering Decisions & Architectural Trade-offs</span>
          </div>

          <div className="space-y-4">
            {project.caseStudy.engineeringDecisions.map((dec, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-surface-primary/70 border border-white/[0.06] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white font-mono">
                    #{idx + 1}: {dec.title}
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/40">
                    Decision Record
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-surface-secondary/70 border border-white/[0.04] space-y-1">
                    <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold block">
                      Context & Constraints
                    </span>
                    <p className="text-slate-300 leading-relaxed font-sans">{dec.context}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-surface-secondary/70 border border-white/[0.04] space-y-1">
                    <span className="text-[10px] font-mono uppercase text-cyan-300 font-semibold block">
                      Architectural Decision
                    </span>
                    <p className="text-slate-200 leading-relaxed font-sans">{dec.decision}</p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-amber-950/15 border border-amber-800/20 text-xs space-y-1">
                  <span className="text-[10px] font-mono uppercase text-amber-300 font-semibold block">
                    Trade-offs Accepted
                  </span>
                  <p className="text-amber-200/90 leading-relaxed font-sans">{dec.tradeOffs}</p>
                </div>

                {dec.evidence && (
                  <div className="text-[11px] font-mono text-slate-400 pt-1 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Evidence: {dec.evidence}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 09. Security & Reliability Considerations */}
      {project.caseStudy.securityReliability && project.caseStudy.securityReliability.length > 0 && (
        <section aria-label="Security and Reliability" className="p-6 sm:p-7 rounded-2xl glass-panel border border-white/[0.08] space-y-4">
          <div className="flex items-center space-x-2 text-violet-400 text-xs font-mono uppercase font-semibold">
            <Shield className="w-4 h-4" />
            <span>Security & Reliability Controls</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {project.caseStudy.securityReliability.map((sec, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-surface-primary/70 border border-white/[0.06] space-y-2 text-xs"
              >
                <span className="text-[11px] font-mono uppercase text-violet-300 font-bold block">
                  {sec.area}
                </span>
                <p className="text-slate-300 leading-relaxed font-sans">
                  {sec.control}
                </p>
                <div className="pt-2 border-t border-white/[0.04] text-[10px] font-mono text-slate-400">
                  <span className="text-slate-500 uppercase block">Verification Scope:</span>
                  <span className="text-slate-300">{sec.scopeOfVerification}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 10. Repository Audit & Technical Credibility Card */}
      <section aria-label="Repository Evidence Audit">
        <EvidenceAuditCard
          evidence={project.evidence}
          githubUrl={project.githubUrl}
          liveUrl={project.liveUrl}
          repoAccessType={project.repoAccessType}
          repoAccessLabel={project.repoAccessLabel}
          projectTitle={project.title}
        />
      </section>

      {/* 11. Engineering Challenges Resolved */}
      <section aria-label="Core Engineering Challenges" className="p-6 sm:p-7 rounded-2xl glass-panel border border-white/[0.08] space-y-4">
        <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono uppercase font-semibold">
          <GitBranch className="w-4 h-4" />
          <span>Core Engineering Challenges Resolved</span>
        </div>
        <div className="space-y-3">
          {project.caseStudy.keyChallenges.map((item, idx) => {
            const isObj = typeof item === 'object' && item !== null;
            const challengeTitle = isObj ? item.challenge : `Challenge #${idx + 1}`;
            const challengeSolution = isObj ? item.solution : item;

            return (
              <div
                key={idx}
                className="p-4 rounded-xl bg-surface-primary/70 border border-white/[0.06] text-xs text-slate-300 leading-relaxed space-y-1.5"
              >
                <span className="font-semibold text-white block">
                  {challengeTitle}
                </span>
                <p className="text-slate-300 font-sans">{challengeSolution}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 12. Current Status & Technical Roadmap */}
      <section aria-label="Current Status and Roadmap" className="p-6 sm:p-7 rounded-2xl glass-panel border border-white/[0.08] space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
            Current Implementation Status & Technical Roadmap
          </span>
          <span className="text-xs font-mono text-cyan-400">
            {project.status}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
          {project.caseStudy.currentStatus}
        </p>

        {project.caseStudy.futureRoadmap && project.caseStudy.futureRoadmap.length > 0 && (
          <div className="pt-3 border-t border-white/[0.06] space-y-2">
            <span className="text-[11px] font-mono uppercase text-slate-400 block font-semibold">
              Documented Upcoming Milestones
            </span>
            <ul className="space-y-1.5 text-xs text-slate-300 font-mono">
              {project.caseStudy.futureRoadmap.map((item, idx) => (
                <li key={idx} className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* 13. Related Projects */}
      {relatedProjects.length > 0 && (
        <section aria-label="Related Systems" className="space-y-4 pt-4 border-t border-white/[0.08]">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white font-mono">
              Related Systems in RANA.OS
            </h3>
            <Link
              href="/#projects"
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              View All Projects →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedProjects.map((rel) => (
              <Link
                key={rel.slug}
                href={`/projects/${rel.slug}`}
                className="p-4 rounded-xl glass-panel border border-white/[0.08] hover:border-cyan-400/40 transition-all group flex flex-col justify-between space-y-2"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>{rel.categoryLabel}</span>
                    <span className="text-cyan-400">{rel.statusBadge}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors mt-1">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                    {rel.subtitle}
                  </p>
                </div>

                <div className="inline-flex items-center space-x-1 text-xs font-mono text-cyan-400 pt-2">
                  <span>Explore Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 14. Case Study Prev/Next Navigation Footer */}
      <footer className="pt-6 border-t border-white/[0.08] flex items-center justify-between">
        <Link
          href={`/projects/${prevProject.slug}`}
          className="flex items-center space-x-2 text-xs font-mono text-slate-400 hover:text-white transition-colors p-2 rounded focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-300"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Prev: {prevProject.title}</span>
        </Link>

        <Link
          href={`/projects/${nextProject.slug}`}
          className="flex items-center space-x-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors p-2 rounded focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-300"
        >
          <span>Next: {nextProject.title}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </footer>
    </article>
  );
}
