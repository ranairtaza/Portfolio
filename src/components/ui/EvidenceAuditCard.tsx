'use client';

import React from 'react';
import { ProjectEvidence, RepoAccessType } from '../../types/portfolio';
import {
  ShieldCheck,
  GitCommit,
  FileCode2,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Lock,
  FileCheck2,
} from 'lucide-react';
import { GithubIcon } from './BrandIcons';

interface EvidenceAuditCardProps {
  evidence?: ProjectEvidence;
  githubUrl?: string;
  liveUrl?: string;
  repoAccessType?: RepoAccessType;
  repoAccessLabel?: string;
  projectTitle: string;
}

export default function EvidenceAuditCard({
  evidence,
  githubUrl,
  liveUrl,
  repoAccessType = 'public',
  repoAccessLabel,
  projectTitle,
}: EvidenceAuditCardProps) {
  if (!evidence && !githubUrl && !liveUrl) return null;

  const isPublic = repoAccessType === 'public';
  const isProprietary = repoAccessType === 'proprietary-onprem' || repoAccessType === 'private-enterprise';

  return (
    <div className="rounded-2xl glass-panel border border-white/[0.08] p-6 sm:p-7 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-4">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-emerald-950/60 border border-emerald-700/50 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white font-mono">
              Repository Audit & Evidence // {projectTitle}
            </h3>
            <p className="text-[11px] text-slate-400">
              Verified software artifacts and production verification scope for {projectTitle}
            </p>
          </div>
        </div>

        {/* Access Badge */}
        <span
          className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium self-start sm:self-auto ${
            isPublic
              ? 'bg-cyan-950/70 text-cyan-300 border border-cyan-800/50'
              : 'bg-slate-900 text-slate-300 border border-white/10'
          }`}
        >
          {isPublic ? <GithubIcon className="w-3.5 h-3.5" /> : <Lock className="w-3 h-3 text-slate-400" />}
          <span>{repoAccessLabel || (isPublic ? 'Public Repository' : 'Private / Internal System')}</span>
        </span>
      </div>

      {/* Grid of Verified Telemetry */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        {evidence?.verifiedCommits !== undefined && (
          <div className="p-3 rounded-xl bg-surface-primary border border-white/[0.06] space-y-1">
            <span className="text-[10px] uppercase text-slate-500 flex items-center space-x-1">
              <GitCommit className="w-3 h-3 text-cyan-400" />
              <span>Verified Commits</span>
            </span>
            <span className="text-base font-bold text-white">
              {evidence.verifiedCommits} commits
            </span>
          </div>
        )}

        {evidence?.primaryLanguage && (
          <div className="p-3 rounded-xl bg-surface-primary border border-white/[0.06] space-y-1">
            <span className="text-[10px] uppercase text-slate-500 flex items-center space-x-1">
              <FileCode2 className="w-3 h-3 text-violet-400" />
              <span>Core Language</span>
            </span>
            <span className="text-base font-bold text-white">
              {evidence.primaryLanguage}
            </span>
          </div>
        )}

        {evidence?.license && (
          <div className="p-3 rounded-xl bg-surface-primary border border-white/[0.06] space-y-1">
            <span className="text-[10px] uppercase text-slate-500 flex items-center space-x-1">
              <CheckCircle className="w-3 h-3 text-emerald-400" />
              <span>License</span>
            </span>
            <span className="text-base font-bold text-white">
              {evidence.license}
            </span>
          </div>
        )}

        {evidence?.hasAutomatedTests !== undefined && (
          <div className="p-3 rounded-xl bg-surface-primary border border-white/[0.06] space-y-1">
            <span className="text-[10px] uppercase text-slate-500 flex items-center space-x-1">
              <FileCheck2 className="w-3 h-3 text-cyan-400" />
              <span>Automated Tests</span>
            </span>
            <span className="text-base font-bold text-emerald-300">
              {evidence.hasAutomatedTests ? 'Verified' : 'Manual QA'}
            </span>
          </div>
        )}
      </div>

      {/* Verified Files & Testing Scope */}
      {evidence?.verifiedFiles && evidence.verifiedFiles.length > 0 && (
        <div className="p-4 rounded-xl bg-surface-primary/70 border border-white/[0.06] space-y-2.5">
          <span className="text-[11px] font-mono uppercase text-slate-400 font-semibold block">
            Inspected Files & Structural Manifest
          </span>
          <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
            {evidence.verifiedFiles.map((file) => (
              <span
                key={file}
                className="px-2.5 py-1 rounded-md bg-surface-secondary text-slate-300 border border-white/[0.08]"
              >
                {file}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Testing Details Note */}
      {evidence?.testingDetails && (
        <div className="text-xs text-slate-300 font-sans leading-relaxed bg-surface-primary/40 p-3.5 rounded-xl border border-white/[0.04]">
          <span className="font-semibold text-white font-mono text-[11px] uppercase block mb-1">
            Quality Assurance & Testing Evidence:
          </span>
          {evidence.testingDetails}
        </div>
      )}

      {/* Disclosure / Unverified Scope Disclaimer */}
      {evidence?.unverifiedClaimsNotice && (
        <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/30 text-amber-200 text-xs flex items-start space-x-2.5">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-semibold text-amber-300 font-mono text-[11px] uppercase block">
              Integrity & Scope Disclosure:
            </span>
            <p className="text-[11px] leading-relaxed text-amber-200/90 font-sans">
              {evidence.unverifiedClaimsNotice}
            </p>
          </div>
        </div>
      )}

      {/* Verified Destination Links */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        {githubUrl && isPublic && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl glass-panel hover:bg-white/[0.08] text-slate-200 hover:text-white text-xs font-mono border border-white/10 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <GithubIcon className="w-4 h-4" />
            <span>Open Verified GitHub Repo</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        )}

        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-[#070a12] font-semibold text-xs tracking-wide transition-all shadow-md shadow-cyan-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <span>Visit Live Demo</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}

        {isProprietary && (
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-surface-primary border border-white/[0.08] text-xs font-mono text-slate-400">
            <Lock className="w-3.5 h-3.5 text-slate-500" />
            <span>Private enterprise on-premises deployment (Protected for customer security)</span>
          </div>
        )}
      </div>
    </div>
  );
}
