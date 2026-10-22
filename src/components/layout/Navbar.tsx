'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  Terminal,
  Menu,
  X,
  ArrowUpRight,
  Sparkles,
  Cpu,
  Zap,
} from 'lucide-react';
import { GraphicsMode } from '../../types/portfolio';

export default function Navbar() {
  const { activeSection, setActiveSection, toggleCommandPalette, graphicsMode, setGraphicsMode } =
    usePortfolio();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cycleGraphicsMode = () => {
    const modes: GraphicsMode[] = ['3d-high', '3d-low', '2d-ambient'];
    const nextIdx = (modes.indexOf(graphicsMode) + 1) % modes.length;
    setGraphicsMode(modes[nextIdx]);
  };

  const getGraphicsBadge = () => {
    switch (graphicsMode) {
      case '3d-high':
        return {
          label: '3D High',
          icon: <Sparkles className="w-3 h-3 text-cyan-300" />,
          dotColor: 'bg-cyan-300 shadow-[0_0_8px_#67e8f9]',
          border: 'border-cyan-400/40 text-cyan-300',
        };
      case '3d-low':
        return {
          label: '3D Eco',
          icon: <Cpu className="w-3 h-3 text-violet-300" />,
          dotColor: 'bg-violet-400 shadow-[0_0_8px_#a78bfa]',
          border: 'border-violet-400/40 text-violet-300',
        };
      case '2d-ambient':
        return {
          label: '2D Canvas',
          icon: <Zap className="w-3 h-3 text-amber-300" />,
          dotColor: 'bg-amber-400 shadow-[0_0_8px_#fbbf24]',
          border: 'border-amber-400/40 text-amber-300',
        };
    }
  };

  const graphicsBadge = getGraphicsBadge();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section spy
      const sections = ['home', 'about', 'projects', 'skills', 'journey', 'beyond-code', 'contact'];
      // Use a lower threshold for shorter sections
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setActiveSection]);

  const navLinks = [
    { id: 'home', label: 'Home', href: '/#home' },
    { id: 'about', label: 'About', href: '/#about' },
    { id: 'projects', label: 'Projects', href: '/#projects' },
    { id: 'skills', label: 'Skills', href: '/#skills' },
    { id: 'journey', label: 'Journey', href: '/#journey' },
    { id: 'contact', label: 'Contact', href: '/#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#070a12]/85 backdrop-blur-md border-b border-white/[0.08] shadow-2xl shadow-cyan-950/20'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / OS Identity */}
          <Link
            href="/#home"
            className="group flex items-center space-x-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 rounded-lg p-1"
            aria-label="RANA.OS Home"
          >
            <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-surface-primary border border-cyan-400/30 group-hover:border-cyan-300 transition-colors shadow-inner">
              <span className="font-mono text-xs font-bold tracking-wider text-cyan-300 group-hover:text-cyan-200">
                R
              </span>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-300 animate-pulse border-2 border-[#070a12]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="font-mono text-sm font-semibold tracking-wider text-slate-100">
                  RANA.OS
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/40">
                  v2.4 // ONLINE
                </span>
              </div>
              <span className="text-[11px] text-slate-400 hidden sm:inline-block font-mono">
                Rana Irtaza Ali Khan
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center space-x-1 px-3 py-1.5 rounded-full glass-panel border border-white/[0.08] shadow-lg shadow-black/40"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`relative px-3.5 py-1.5 text-xs font-medium tracking-wide transition-all duration-200 rounded-full focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-300 ${
                    isActive
                      ? 'text-cyan-300 bg-cyan-500/10 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-300 shadow-[0_0_8px_#67e8f9]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Actions: Graphics Mode, Command Palette & Contact CTA */}
          <div className="flex items-center space-x-2">
            {/* Graphics / Effects Mode Cycle Button */}
            <button
              onClick={cycleGraphicsMode}
              suppressHydrationWarning
              className={`hidden sm:inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-surface-primary border hover:bg-white/[0.05] transition-all text-xs font-mono focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${graphicsBadge.border}`}
              title={`Active Graphics Engine: ${graphicsBadge.label}. Click to cycle mode (High 3D, Eco 3D, 2D Canvas)`}
              aria-label={`Toggle background graphics mode. Current: ${graphicsBadge.label}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${graphicsBadge.dotColor}`} />
              {graphicsBadge.icon}
              <span className="text-[11px] font-medium hidden lg:inline">{graphicsBadge.label}</span>
            </button>

            {/* Command Palette Button */}
            <button
              onClick={toggleCommandPalette}
              className="flex items-center space-x-2 px-2.5 py-1.5 rounded-lg bg-surface-primary border border-white/[0.08] hover:border-cyan-400/40 hover:bg-white/[0.03] transition-all text-xs font-mono text-slate-400 hover:text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              title="Command Palette (Ctrl + K)"
              aria-label="Open Command Palette"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-300" />
              <span className="hidden xl:inline text-[11px]">Command</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white/[0.06] rounded border border-white/10 text-slate-300">
                ⌘K
              </kbd>
            </button>

            <a
              href="#contact"
              className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-300 hover:bg-cyan-200 text-[#070a12] font-semibold text-xs tracking-wide transition-all shadow-lg shadow-cyan-300/20 hover:shadow-cyan-200/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
            >
              <span>Contact</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-surface-primary border border-white/10 text-slate-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              aria-label="Toggle Mobile Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 px-4 pt-2 pb-5 bg-[#070a12]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? 'text-cyan-300 bg-cyan-950/50 font-semibold'
                    : 'text-slate-300 hover:bg-white/[0.05]'
                }`}
              >
                {link.label}
              </a>
            ))}

            {/* Mobile Graphics Mode Toggle */}
            <div className="pt-3 border-t border-white/10 space-y-2">
              <span className="text-[11px] font-mono uppercase text-slate-400 block px-1">
                Background Engine:
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {(['3d-high', '3d-low', '2d-ambient'] as GraphicsMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => {
                      setGraphicsMode(mode);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-2 py-1.5 rounded-lg text-[11px] font-mono transition-all text-center ${
                      graphicsMode === mode
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-bold'
                        : 'bg-white/[0.04] text-slate-400 border border-white/05 hover:text-slate-200'
                    }`}
                  >
                    {mode === '3d-high' ? '3D High' : mode === '3d-low' ? '3D Eco' : '2D Canvas'}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => {
                  toggleCommandPalette();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 text-xs font-mono text-cyan-300 py-1"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Open Command Palette</span>
              </button>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-cyan-300 text-[#070a12]"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
