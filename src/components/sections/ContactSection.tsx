'use client';

import React, { useState } from 'react';
import { PERSONAL_INFO, RECRUITER_DOSSIER } from '../../data/portfolio';
import { ContactInquiryType } from '../../types/portfolio';
import {
  Mail,
  Send,
  Copy,
  Check,
  Calendar,
  Sparkles,
  Terminal,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  Briefcase,
  Layers,
  Users2,
  FileDown,
  Info,
  Clock,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons';

interface FormState {
  name: string;
  email: string;
  inquiryType: ContactInquiryType;
  details: string;
  honeypot: string; // bot protection
}

interface FormErrors {
  name?: string;
  email?: string;
  inquiryType?: string;
  details?: string;
}

export default function ContactSection() {
  const [selectedPath, setSelectedPath] = useState<ContactInquiryType>('career');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPayload, setCopiedPayload] = useState(false);
  const [showRecruiterDossier, setShowRecruiterDossier] = useState(false);

  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    inquiryType: 'career',
    details: '',
    honeypot: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [formStatus, setFormStatus] = useState<
    'idle' | 'transmitting' | 'success' | 'fallback_ready' | 'error'
  >('idle');
  const [statusMessage, setStatusMessage] = useState('');

  // Handle path selection
  const handlePathSelect = (path: ContactInquiryType) => {
    setSelectedPath(path);
    setFormState((prev) => ({ ...prev, inquiryType: path }));
  };

  // Validate single field
  const validateField = (field: keyof FormState, value: string): string | undefined => {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'Name is required.';
        if (value.trim().length < 2) return 'Name must be at least 2 characters.';
        return undefined;
      case 'email':
        if (!value.trim()) return 'Email address is required.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return 'Please provide a valid email address.';
        }
        return undefined;
      case 'details':
        if (!value.trim()) return 'Please provide opportunity or project details.';
        if (value.trim().length < 10) return 'Please provide at least 10 characters of detail.';
        return undefined;
      default:
        return undefined;
    }
  };

  const handleBlur = (field: keyof FormState) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, formState[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleCopyEmail = () => {
    if (!PERSONAL_INFO.email) return;
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const formatPayloadText = () => {
    const typeLabel =
      formState.inquiryType === 'career'
        ? 'Career Opportunity'
        : formState.inquiryType === 'project'
        ? 'Software Development Project'
        : formState.inquiryType === 'collaboration'
        ? 'Software Collaboration'
        : 'General Inquiry';

    return `--- RANA.OS INQUIRY PAYLOAD ---
Name: ${formState.name}
Email: ${formState.email}
Inquiry Type: ${typeLabel}
Opportunity / Project Details:
${formState.details}
--------------------------------`;
  };

  const handleCopyPayload = () => {
    navigator.clipboard.writeText(formatPayloadText());
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const nameErr = validateField('name', formState.name);
    const emailErr = validateField('email', formState.email);
    const detailsErr = validateField('details', formState.details);

    if (nameErr || emailErr || detailsErr) {
      setErrors({
        name: nameErr,
        email: emailErr,
        details: detailsErr,
      });
      setTouched({ name: true, email: true, details: true });
      setFormStatus('error');
      setStatusMessage('Please correct the highlighted fields before submitting.');
      return;
    }

    setFormStatus('transmitting');
    setStatusMessage('Transmitting inquiry payload to server gateway...');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setFormStatus('success');
        setStatusMessage(
          data.message || 'Inquiry successfully delivered. I will review and reply promptly.'
        );
      } else if (data.fallback) {
        // Honest fallback mode when email service is not provisioned with live secrets
        setFormStatus('fallback_ready');
        setStatusMessage(
          data.message ||
            'Direct automated server dispatch is not configured with an email provider. Fallback channels are ready below.'
        );
      } else {
        setFormStatus('error');
        setStatusMessage(
          data.error || 'Server rejected submission. Please use the Google Calendar link or email directly.'
        );
      }
    } catch {
      setFormStatus('fallback_ready');
      setStatusMessage(
        'Network transmission unavailable. Fallback options are ready below to ensure your message is not lost.'
      );
    }
  };

  const getInquiryPlaceholder = () => {
    switch (formState.inquiryType) {
      case 'career':
        return 'Outline the role (full-stack / frontend / backend), team context, tech stack, and whether the position is remote or hybrid...';
      case 'project':
        return 'Describe your web application or SaaS MVP requirements, target timelines, and core problems to solve...';
      case 'collaboration':
        return 'Share what you are building, open-source ideas, or software experiments you would like to collaborate on...';
      default:
        return 'Provide details on your project, opportunity, or idea...';
    }
  };

  return (
    <section
      id="contact"
      aria-label="Contact and Inquiries"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.08]"
    >
      <div className="space-y-16">
        {/* 1. Header with exact required copy */}
        <div className="space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-mono tracking-wider uppercase text-cyan-300">
            <Mail className="w-3.5 h-3.5" />
            <span>07 // Communications Gateway</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Have a problem worth solving?
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed font-sans">
            I&apos;m interested in building useful software, developing SaaS products, and exploring practical
            AI-powered solutions. If you have a project, opportunity, or idea to discuss, let&apos;s connect.
          </p>
        </div>

        {/* 2. Three Distinct Contact Paths */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Select Your Inquiry Pathway
            </span>
            <span className="text-[11px] font-mono text-cyan-300">3 Optimized Routing Paths</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Path 1: Career opportunities */}
            <button
              type="button"
              onClick={() => handlePathSelect('career')}
              className={`p-6 rounded-2xl text-left transition-all border flex flex-col justify-between space-y-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
                selectedPath === 'career'
                  ? 'bg-cyan-950/40 border-cyan-400 shadow-lg shadow-cyan-950/40'
                  : 'bg-surface-primary border-white/[0.08] hover:border-white/20'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      selectedPath === 'career'
                        ? 'bg-cyan-400/20 text-cyan-300'
                        : 'bg-white/[0.05] text-slate-400'
                    }`}
                  >
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded ${
                      selectedPath === 'career'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'
                        : 'bg-white/[0.04] text-slate-400'
                    }`}
                  >
                    Hiring Teams
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">Career opportunities</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  For recruiters and hiring managers interested in software development roles.
                </p>
              </div>

              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
                <span className={selectedPath === 'career' ? 'text-cyan-300' : 'text-slate-500'}>
                  {selectedPath === 'career' ? '● Active Pathway' : 'Select Pathway'}
                </span>
                <span className="text-[11px] text-slate-400">BS IT • June 2026</span>
              </div>
            </button>

            {/* Path 2: Software development projects */}
            <button
              type="button"
              onClick={() => handlePathSelect('project')}
              className={`p-6 rounded-2xl text-left transition-all border flex flex-col justify-between space-y-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
                selectedPath === 'project'
                  ? 'bg-violet-950/40 border-violet-400 shadow-lg shadow-violet-950/40'
                  : 'bg-surface-primary border-white/[0.08] hover:border-white/20'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      selectedPath === 'project'
                        ? 'bg-violet-400/20 text-violet-300'
                        : 'bg-white/[0.05] text-slate-400'
                    }`}
                  >
                    <Layers className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded ${
                      selectedPath === 'project'
                        ? 'bg-violet-500/20 text-violet-300 border border-violet-400/30'
                        : 'bg-white/[0.04] text-slate-400'
                    }`}
                  >
                    Businesses & Clients
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">Software development projects</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  For businesses looking for web applications, dashboards, SaaS platforms, API integrations, or
                  automation.
                </p>
              </div>

              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
                <span className={selectedPath === 'project' ? 'text-violet-300' : 'text-slate-500'}>
                  {selectedPath === 'project' ? '● Active Pathway' : 'Select Pathway'}
                </span>
                <span className="text-[11px] text-slate-400">Next.js • SaaS</span>
              </div>
            </button>

            {/* Path 3: Collaboration */}
            <button
              type="button"
              onClick={() => handlePathSelect('collaboration')}
              className={`p-6 rounded-2xl text-left transition-all border flex flex-col justify-between space-y-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
                selectedPath === 'collaboration'
                  ? 'bg-cyan-950/40 border-cyan-400 shadow-lg shadow-cyan-950/40'
                  : 'bg-surface-primary border-white/[0.08] hover:border-white/20'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      selectedPath === 'collaboration'
                        ? 'bg-cyan-400/20 text-cyan-300'
                        : 'bg-white/[0.05] text-slate-400'
                    }`}
                  >
                    <Users2 className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded ${
                      selectedPath === 'collaboration'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'
                        : 'bg-white/[0.04] text-slate-400'
                    }`}
                  >
                    Developers & Founders
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">Collaboration</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  For developers and founders interested in building useful software products.
                </p>
              </div>

              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
                <span className={selectedPath === 'collaboration' ? 'text-cyan-300' : 'text-slate-500'}>
                  {selectedPath === 'collaboration' ? '● Active Pathway' : 'Select Pathway'}
                </span>
                <span className="text-[11px] text-slate-400">Open Systems</span>
              </div>
            </button>
          </div>
        </div>

        {/* 3. Recruiter-Friendly Information Dossier (Interactive Banner/Modal) */}
        <div className="p-6 rounded-2xl glass-panel border border-white/[0.08] space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-950/60 border border-cyan-800/40 flex items-center justify-center text-cyan-300">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white font-mono">
                  Recruiter &amp; Hiring Manager Information Summary
                </h3>
                <p className="text-xs text-slate-400 font-sans">
                  Concise professional credentials and verified engineering contributions.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setShowRecruiterDossier(!showRecruiterDossier)}
                className="px-3 py-1.5 rounded-lg bg-surface-primary hover:bg-white/[0.06] border border-white/[0.08] text-xs font-mono text-cyan-300 hover:text-cyan-200 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-300"
              >
                {showRecruiterDossier ? 'Hide Summary Details' : 'View Full Dossier'}
              </button>

              {/* Résumé Integration: Hidden until real PDF is placed in public/resume.pdf */}
              {PERSONAL_INFO.hasResumePdf && (
                <a
                  href={PERSONAL_INFO.resumeUrl}
                  download="Rana_Irtaza_Ali_Khan_Resume.pdf"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-cyan-300 hover:bg-cyan-200 text-[#070a12] text-xs font-mono font-semibold transition-all shadow-md shadow-cyan-300/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Download Résumé</span>
                </a>
              )}
            </div>
          </div>

          {/* Quick at-a-glance points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-surface-primary border border-white/[0.06] space-y-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Core Engineering</span>
              <span className="text-slate-200 font-medium block">Full-Stack Web &amp; Next.js</span>
            </div>
            <div className="p-3 rounded-xl bg-surface-primary border border-white/[0.06] space-y-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Product Interests</span>
              <span className="text-slate-200 font-medium block">SaaS Architecture &amp; MVPs</span>
            </div>
            <div className="p-3 rounded-xl bg-surface-primary border border-white/[0.06] space-y-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Applied AI</span>
              <span className="text-slate-200 font-medium block">LLM APIs &amp; Automation</span>
            </div>
            <div className="p-3 rounded-xl bg-surface-primary border border-white/[0.06] space-y-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Verified Education</span>
              <span className="text-cyan-300 font-medium block">BS IT • June 2026 • 3.1 CGPA</span>
            </div>
          </div>

          {/* Expanded Dossier Details */}
          {showRecruiterDossier && (
            <div className="pt-4 border-t border-white/[0.08] space-y-5 animate-in fade-in duration-300">
              <div className="p-4 rounded-xl bg-surface-primary/70 border border-white/[0.06] space-y-2">
                <span className="text-xs font-mono text-cyan-300 font-semibold uppercase tracking-wider block">
                  Professional Summary
                </span>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {RECRUITER_DOSSIER.summary}
                </p>
              </div>

              {/* Verified KeyAbroad Scope */}
              <div className="space-y-3">
                <span className="text-xs font-mono text-slate-300 font-semibold uppercase tracking-wider block">
                  KeyAbroad Consultants — Verified Software Development Contributions
                </span>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
                  {RECRUITER_DOSSIER.verifiedExperience.verifiedContributions.map((item, i) => (
                    <li
                      key={i}
                      className="p-3 rounded-xl bg-surface-primary border border-white/[0.06] flex items-start space-x-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-cyan-300 shrink-0 mt-0.5" />
                      <span className="font-sans leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Integrity Guard Note */}
              <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-400 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <Info className="w-4 h-4 text-cyan-300 shrink-0" />
                <span>{RECRUITER_DOSSIER.integrityDisclaimer}</span>
              </div>
            </div>
          )}
        </div>

        {/* 4. Grid: Direct Contact Channels & Dispatch Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Links & Profile Destinations */}
          <div className="lg:col-span-5 space-y-6">
            {/* Google Calendar Booking Card */}
            <div className="p-6 rounded-2xl glass-panel border border-cyan-400/30 space-y-4 shadow-xl shadow-cyan-950/20">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-semibold flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Direct Scheduling</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/40">
                  Instant Confirmation
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Schedule a 1-on-1 video call directly on Google Calendar to discuss software engineering roles,
                project scope, or SaaS collaboration.
              </p>

              <a
                href={PERSONAL_INFO.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-cyan-300 hover:bg-cyan-200 text-[#070a12] font-semibold text-xs tracking-wider uppercase transition-all shadow-lg shadow-cyan-300/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Conversation on Google Calendar</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </a>
            </div>

            {/* Verified Social & Code Profiles */}
            <div className="p-6 rounded-2xl glass-panel border border-white/[0.08] space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                Verified Profile Destinations
              </span>

              <div className="space-y-3">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-surface-primary hover:bg-white/[0.05] border border-white/[0.08] hover:border-cyan-300/40 text-slate-300 hover:text-white transition-all text-xs font-mono group focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-300"
                >
                  <div className="flex items-center space-x-3">
                    <GithubIcon className="w-4 h-4 text-slate-300 group-hover:text-cyan-300" />
                    <div className="text-left">
                      <span className="block font-medium text-slate-200">GitHub Profile</span>
                      <span className="text-[11px] text-slate-500">github.com/ranairtaza</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-300 transition-colors" />
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-surface-primary hover:bg-white/[0.05] border border-white/[0.08] hover:border-blue-400/40 text-slate-300 hover:text-white transition-all text-xs font-mono group focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-300"
                >
                  <div className="flex items-center space-x-3">
                    <LinkedinIcon className="w-4 h-4 text-blue-400" />
                    <div className="text-left">
                      <span className="block font-medium text-slate-200">LinkedIn Profile</span>
                      <span className="text-[11px] text-slate-500">linkedin.com/in/rana-irtaza-ali-khan</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 transition-colors" />
                </a>
              </div>
            </div>

            {/* Configurable Direct Email Card: Rendered ONLY when a verified email is provided */}
            {PERSONAL_INFO.email ? (
              <div className="p-6 rounded-2xl glass-panel border border-white/[0.08] space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                  Direct Email Dispatch
                </span>

                <div className="flex items-center justify-between p-3 rounded-xl bg-surface-primary border border-white/[0.08]">
                  <div className="flex items-center space-x-3 overflow-hidden">
                    <Mail className="w-4 h-4 text-cyan-300 shrink-0" />
                    <span className="font-mono text-xs sm:text-sm text-slate-200 truncate select-all">
                      {PERSONAL_INFO.email}
                    </span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-white/[0.05] hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 transition-colors ml-2 shrink-0 focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-300"
                    title="Copy email to clipboard"
                    aria-label="Copy email address"
                  >
                    {copiedEmail ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <a
                  href={`mailto:${PERSONAL_INFO.email}?subject=Software%20Development%20%2F%20SaaS%20Inquiry`}
                  className="w-full inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-cyan-500/10 text-slate-200 hover:text-cyan-300 border border-white/[0.08] text-xs font-mono transition-all"
                >
                  <Mail className="w-3.5 h-3.5 text-cyan-300" />
                  <span>Open in Email Client</span>
                </a>
              </div>
            ) : null}

            {/* Operational Parameters & Availability */}
            <div className="p-6 rounded-2xl glass-panel border border-white/[0.08] space-y-3 text-xs">
              <div className="flex items-center space-x-2 text-cyan-300 font-mono uppercase tracking-wider text-[11px] font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Operational Parameters</span>
              </div>
              <div className="space-y-2.5 text-slate-300 font-mono text-[11px]">
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                  <span className="text-slate-400 font-sans flex items-center space-x-1.5">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Availability:</span>
                  </span>
                  <span className="font-semibold text-emerald-400">Open for Work (Remote / Hybrid)</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                  <span className="text-slate-400 font-sans flex items-center space-x-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Location:</span>
                  </span>
                  <span>Pakistan (Available Globally)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-sans flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Timezone:</span>
                  </span>
                  <span>PKT (UTC+5) • Flexible Overlap</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Accessible Contact Form UI */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl glass-panel border border-white/[0.08] shadow-2xl overflow-hidden">
              <div className="px-5 py-3.5 bg-surface-secondary border-b border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center space-x-2 font-mono text-xs text-slate-200">
                  <Terminal className="w-4 h-4 text-cyan-300" />
                  <span>TRANSMIT_INQUIRY.sh</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/40">
                  Validated Channel
                </span>
              </div>

              {/* Form or Fallback Notice */}
              {formStatus === 'fallback_ready' ? (
                /* Honest Fallback Presentation */
                <div className="p-6 sm:p-8 space-y-6">
                  <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/40 space-y-2">
                    <div className="flex items-center space-x-2 text-cyan-300 font-mono text-xs font-semibold">
                      <Info className="w-4 h-4 shrink-0" />
                      <span>Direct Server Dispatch in Fallback Mode</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      Automated background email sending is not yet connected to a third-party email provider API. To
                      ensure your message reaches me immediately with 100% reliability, choose one of the direct
                      actions below:
                    </p>
                  </div>

                  {/* Packaged Payload Display */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-medium">
                        Your Prepared Inquiry Payload:
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyPayload}
                        className="inline-flex items-center space-x-1.5 text-xs font-mono text-cyan-300 hover:text-cyan-200 transition-colors"
                      >
                        {copiedPayload ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Payload</span>
                          </>
                        )}
                      </button>
                    </div>

                    <pre className="p-3.5 rounded-xl bg-surface-primary border border-white/[0.08] text-xs font-mono text-slate-300 whitespace-pre-wrap break-all select-all max-h-48 overflow-y-auto">
                      {formatPayloadText()}
                    </pre>
                  </div>

                  {/* Fallback Action Buttons */}
                  <div className="space-y-3 pt-2">
                    <a
                      href={PERSONAL_INFO.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-cyan-300 hover:bg-cyan-200 text-[#070a12] font-semibold text-xs tracking-wider uppercase transition-all shadow-lg shadow-cyan-300/20"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Book on Google Calendar (Recommended)</span>
                      <ExternalLink className="w-3.5 h-3.5 ml-1" />
                    </a>

                    {PERSONAL_INFO.email && (
                      <a
                        href={`mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
                          `Portfolio Inquiry [${formState.inquiryType}] from ${formState.name}`
                        )}&body=${encodeURIComponent(
                          `Name: ${formState.name}\nEmail: ${formState.email}\nInquiry Type: ${formState.inquiryType}\n\nDetails:\n${formState.details}`
                        )}`}
                        className="w-full inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/10 text-slate-200 text-xs font-mono transition-all border border-white/10"
                      >
                        <Mail className="w-3.5 h-3.5 text-cyan-300" />
                        <span>Launch Email Client With Pre-filled Details</span>
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={() => setFormStatus('idle')}
                      className="w-full py-2 text-center text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors"
                    >
                      ← Edit Inquiry Details
                    </button>
                  </div>
                </div>
              ) : formStatus === 'success' ? (
                /* Confirmed Delivery State */
                <div className="p-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Inquiry Transmitted</h3>
                  <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed font-sans">
                    {statusMessage}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setFormState({
                        name: '',
                        email: '',
                        inquiryType: selectedPath,
                        details: '',
                        honeypot: '',
                      });
                      setFormStatus('idle');
                    }}
                    className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/[0.05] text-slate-200 hover:bg-white/10 text-xs font-mono transition-colors"
                  >
                    <span>Send Another Inquiry</span>
                  </button>
                </div>
              ) : (
                /* Standard Form */
                <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-7 space-y-5">
                  {/* Honeypot field (hidden from legitimate users, catches spam bots) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website-field">Leave this empty</label>
                    <input
                      id="website-field"
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formState.honeypot}
                      onChange={(e) => setFormState({ ...formState, honeypot: e.target.value })}
                    />
                  </div>

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="name-input" className="text-xs font-mono text-slate-300 block">
                        Your Name <span className="text-cyan-300">*</span>
                      </label>
                      <input
                        id="name-input"
                        type="text"
                        required
                        aria-required="true"
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        value={formState.name}
                        onBlur={() => handleBlur('name')}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="e.g. Alex Mercer"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-surface-primary border text-xs text-white placeholder-slate-500 font-sans focus:outline-none transition-colors ${
                          errors.name
                            ? 'border-rose-500 focus:border-rose-400'
                            : 'border-white/[0.08] focus:border-cyan-300'
                        }`}
                      />
                      {errors.name && (
                        <p id="name-error" className="text-[11px] font-mono text-rose-400 flex items-center space-x-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="email-input" className="text-xs font-mono text-slate-300 block">
                        Email Address <span className="text-cyan-300">*</span>
                      </label>
                      <input
                        id="email-input"
                        type="email"
                        required
                        aria-required="true"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        value={formState.email}
                        onBlur={() => handleBlur('email')}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="e.g. alex@company.com"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-surface-primary border text-xs text-white placeholder-slate-500 font-sans focus:outline-none transition-colors ${
                          errors.email
                            ? 'border-rose-500 focus:border-rose-400'
                            : 'border-white/[0.08] focus:border-cyan-300'
                        }`}
                      />
                      {errors.email && (
                        <p id="email-error" className="text-[11px] font-mono text-rose-400 flex items-center space-x-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Inquiry Type Selector Pills */}
                  <div className="space-y-2">
                    <label id="inquiry-type-label" className="text-xs font-mono text-slate-300 block">
                      Inquiry Type <span className="text-cyan-300">*</span>
                    </label>
                    <div
                      role="radiogroup"
                      aria-labelledby="inquiry-type-label"
                      className="grid grid-cols-2 sm:grid-cols-4 gap-2"
                    >
                      {(
                        [
                          { id: 'career', label: 'Career Role' },
                          { id: 'project', label: 'Client Project' },
                          { id: 'collaboration', label: 'Collaboration' },
                          { id: 'general', label: 'General' },
                        ] as const
                      ).map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          role="radio"
                          aria-checked={formState.inquiryType === item.id}
                          onClick={() => {
                            setFormState((prev) => ({ ...prev, inquiryType: item.id }));
                            setSelectedPath(item.id);
                          }}
                          className={`px-3 py-2 rounded-xl text-xs font-mono transition-all border text-center ${
                            formState.inquiryType === item.id
                              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40 font-semibold'
                              : 'bg-surface-primary text-slate-400 border-white/[0.08] hover:text-slate-200'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Details Field */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label htmlFor="details-input" className="text-xs font-mono text-slate-300 block">
                        Project or Opportunity Details <span className="text-cyan-300">*</span>
                      </label>
                      <span className="text-[10px] font-mono text-slate-500">
                        {formState.details.length} chars
                      </span>
                    </div>

                    <textarea
                      id="details-input"
                      rows={5}
                      required
                      aria-required="true"
                      aria-invalid={Boolean(errors.details)}
                      aria-describedby={errors.details ? 'details-error' : undefined}
                      value={formState.details}
                      onBlur={() => handleBlur('details')}
                      onChange={(e) => handleChange('details', e.target.value)}
                      placeholder={getInquiryPlaceholder()}
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-surface-primary border text-xs text-white placeholder-slate-500 font-sans focus:outline-none transition-colors resize-none ${
                        errors.details
                          ? 'border-rose-500 focus:border-rose-400'
                          : 'border-white/[0.08] focus:border-cyan-300'
                      }`}
                    />
                    {errors.details && (
                      <p id="details-error" className="text-[11px] font-mono text-rose-400 flex items-center space-x-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.details}</span>
                      </p>
                    )}
                  </div>

                  {/* Status Banner */}
                  {formStatus === 'error' && (
                    <div
                      role="alert"
                      className="p-3 rounded-xl bg-rose-950/60 border border-rose-800/40 text-rose-300 text-xs font-mono flex items-center space-x-2"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                      <span>{statusMessage}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={formStatus === 'transmitting'}
                    className="w-full inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-cyan-300 hover:bg-cyan-200 disabled:opacity-50 text-[#070a12] font-semibold text-xs tracking-wider uppercase transition-all shadow-lg shadow-cyan-300/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
                  >
                    {formStatus === 'transmitting' ? (
                      <>
                        <Sparkles className="w-4 h-4 animate-spin text-[#070a12]" />
                        <span>Transmitting Payload...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Transmit Message Payload</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
