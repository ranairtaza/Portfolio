'use client';

import React, { useState } from 'react';
import { PERSONAL_INFO } from '../../data/portfolio';
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
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons';

export default function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'transmitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setFormStatus('error');
      setStatusMessage('Please provide your name, valid email address, and a message.');
      return;
    }

    setFormStatus('transmitting');
    setStatusMessage('Opening your email client...');

    // Build a mailto: link pre-filled with the form data
    const subject = encodeURIComponent(
      formState.subject.trim() || `Portfolio Inquiry from ${formState.name.trim()}`
    );
    const body = encodeURIComponent(
      `Name: ${formState.name.trim()}\nFrom: ${formState.email.trim()}\n\n${formState.message.trim()}`
    );
    const mailtoHref = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;

    // Open email client
    window.location.href = mailtoHref;

    // Show success feedback after brief delay
    setTimeout(() => {
      setFormStatus('success');
      setStatusMessage(
        'Your email client should be open. If nothing happened, email directly: ' + PERSONAL_INFO.email
      );
    }, 800);
  };

  return (
    <section
      id="contact"
      aria-label="Contact and Inquiries"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.08]"
    >
      <div className="space-y-12">
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-mono tracking-wider uppercase text-cyan-300">
            <Mail className="w-3.5 h-3.5" />
            <span>06 // Communications Gateway</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Contact & Collaborations
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl">
            Open for full-stack engineering roles, technical advisory, and SaaS product engineering.
            Reach out directly or book a discovery conversation.
          </p>
        </div>

        {/* Grid: Direct Links & Dispatch Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Links & Booking */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Email Card */}
            <div className="p-6 rounded-2xl glass-panel border border-white/[0.08] space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                Direct Communication Channel
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

              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={`mailto:${PERSONAL_INFO.email}?subject=Engineering%20Collaboration%20Inquiry`}
                  className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-cyan-300 hover:bg-cyan-200 text-[#070a12] font-semibold text-xs tracking-wide transition-all shadow-md shadow-cyan-300/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Direct Email</span>
                </a>

                <a
                  href={PERSONAL_INFO.bookingUrl}
                  className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl glass-panel hover:bg-white/[0.08] text-slate-200 hover:text-white text-xs font-semibold border border-white/10 hover:border-cyan-300/40 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                  <Calendar className="w-3.5 h-3.5 text-cyan-300" />
                  <span>Schedule Discovery</span>
                </a>
              </div>
            </div>

            {/* Social & Booking Profiles */}
            <div className="p-6 rounded-2xl glass-panel border border-white/[0.08] space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                Verified Social Profiles
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 rounded-xl bg-surface-primary hover:bg-white/[0.05] border border-white/[0.08] hover:border-cyan-300/40 text-slate-300 hover:text-white transition-all text-xs font-mono group focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-300"
                >
                  <GithubIcon className="w-4 h-4 text-slate-300 group-hover:text-cyan-300" />
                  <span className="truncate">GitHub Profile</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 ml-auto shrink-0" />
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 rounded-xl bg-surface-primary hover:bg-white/[0.05] border border-white/[0.08] hover:border-blue-400/40 text-slate-300 hover:text-white transition-all text-xs font-mono group focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-300"
                >
                  <LinkedinIcon className="w-4 h-4 text-blue-400" />
                  <span className="truncate">LinkedIn Profile</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 ml-auto shrink-0" />
                </a>
              </div>
            </div>

            {/* Availability & Location */}
            <div className="p-6 rounded-2xl glass-panel border border-white/[0.08] space-y-3 text-xs font-sans">
              <div className="flex items-center space-x-2 text-cyan-300 font-mono uppercase tracking-wider text-[11px] font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Operational Parameters</span>
              </div>
              <div className="space-y-2 text-slate-300 font-mono text-[11px]">
                <div className="flex items-center justify-between pb-1.5 border-b border-white/[0.06]">
                  <span className="text-slate-400 font-sans">Status:</span>
                  <span className="font-semibold text-emerald-400">Open for Work</span>
                </div>
                <div className="flex items-center justify-between pb-1.5 border-b border-white/[0.06]">
                  <span className="text-slate-400 font-sans">Location:</span>
                  <span>Pakistan (Remote / Hybrid)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-sans">Timezone:</span>
                  <span>PKT (UTC+5)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dispatch Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl glass-panel border border-white/[0.08] shadow-2xl overflow-hidden">
              <div className="px-5 py-3.5 bg-surface-secondary border-b border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center space-x-2 font-mono text-xs text-slate-200">
                  <Terminal className="w-4 h-4 text-cyan-300" />
                  <span>DISPATCH_MESSAGE.sh</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/40">
                  Direct Channel
                </span>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 block">
                      Your Name <span className="text-cyan-300">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Alex Mercer"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface-primary border border-white/[0.08] focus:border-cyan-300 focus:outline-none text-xs text-white placeholder-slate-500 font-sans"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 block">
                      Email Address <span className="text-cyan-300">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="e.g. alex@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface-primary border border-white/[0.08] focus:border-cyan-300 focus:outline-none text-xs text-white placeholder-slate-500 font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 block">
                    Subject / Project Specification
                  </label>
                  <input
                    type="text"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    placeholder="e.g. Full-Stack Role / SaaS Project Inquiry"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-primary border border-white/[0.08] focus:border-cyan-300 focus:outline-none text-xs text-white placeholder-slate-500 font-sans"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 block">
                    Message Payload <span className="text-cyan-300">*</span>
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Outline your project scope, engineering requirements, or role details..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-primary border border-white/[0.08] focus:border-cyan-300 focus:outline-none text-xs text-white placeholder-slate-500 font-sans resize-none"
                  />
                </div>

                {/* Status Feedback */}
                {formStatus !== 'idle' && (
                  <div
                    className={`p-3 rounded-xl text-xs font-mono flex items-center space-x-2 ${
                      formStatus === 'success'
                        ? 'bg-emerald-950/60 border border-emerald-800/40 text-emerald-300'
                        : formStatus === 'error'
                        ? 'bg-rose-950/60 border border-rose-800/40 text-rose-300'
                        : 'bg-cyan-950/60 border border-cyan-800/40 text-cyan-300'
                    }`}
                  >
                    {formStatus === 'success' && <Check className="w-4 h-4 shrink-0 text-emerald-400" />}
                    {formStatus === 'error' && <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />}
                    {formStatus === 'transmitting' && <Sparkles className="w-4 h-4 shrink-0 text-cyan-300 animate-spin" />}
                    <span>{statusMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formStatus === 'transmitting'}
                  className="w-full inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-cyan-300 hover:bg-cyan-200 disabled:opacity-50 text-[#070a12] font-semibold text-xs tracking-wider uppercase transition-all shadow-lg shadow-cyan-300/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>
                    {formStatus === 'transmitting' ? 'Transmitting...' : 'Dispatch Message'}
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
