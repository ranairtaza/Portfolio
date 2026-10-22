'use client';

import React from 'react';
import { PERSONAL_INFO } from '../../data/portfolio';
import { ArrowUp, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '/#home' },
    { label: 'About', href: '/#about' },
    { label: 'Projects', href: '/#projects' },
    { label: 'Skills', href: '/#skills' },
    { label: 'Journey', href: '/#journey' },
    { label: 'Beyond Code', href: '/#beyond-code' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <footer className="border-t border-white/[0.08] bg-[#070a12]/95 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col space-y-8">
        {/* Top Row: Brand & Navigation */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#67e8f9]" />
            <span className="font-mono text-sm font-bold tracking-wider text-white">
              RANA.OS // Phase 1
            </span>
          </div>

          <nav
            aria-label="Footer Navigation"
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-mono text-slate-400"
          >
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="hover:text-cyan-300 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-400 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="text-slate-400 hover:text-cyan-300 transition-colors"
              aria-label="Email Rana"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1 px-2.5 py-1 rounded bg-surface-primary border border-white/[0.08] text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors"
              aria-label="Scroll to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Bottom Row: Copyright */}
        <div className="pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-500 gap-2 text-center sm:text-left">
          <p>© 2026 {PERSONAL_INFO.name}. All architecture diagrams and project specifications are authentic.</p>
          <p className="text-slate-600">Built with Next.js App Router, TypeScript, and Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}
