'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  Terminal,
  Cpu,
  Sparkles,
  Zap,
  Menu,
  X,
  ArrowUpRight,
} from 'lucide-react';
import { GraphicsMode } from '../../types/portfolio';

export default function Navbar() {
  const {
    activeSection,
    setActiveSection,
    toggleCommandPalette,
    graphicsMode,
    setGraphicsMode,
  } = usePortfolio();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [graphicsMenuOpen, setGraphicsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section spy
      const sections = ['hero', 'about', 'projects', 'skills', 'timeline', 'interests', 'contact'];
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
    { id: 'about', label: 'About', href: '#about' },
    { id: 'projects', label: 'Projects', href: '#projects' },
    { id: 'skills', label: 'Constellation', href: '#skills' },
    { id: 'timeline', label: 'Timeline', href: '#timeline' },
    { id: 'interests', label: 'Radar', href: '#interests' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ];

  const graphicsOptions: { mode: GraphicsMode; label: string; desc: string }[] = [
    { mode: '3d-high', label: '3D Constellation (Full)', desc: '140 nodes + scroll parallax' },
    { mode: '3d-low', label: '3D Low Power', desc: '70 nodes, balanced battery' },
    { mode: '2d-ambient', label: '2D Eco (Canvas)', desc: 'Zero WebGL, ultralight' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#030712]/80 backdrop-blur-md border-b border-white/[0.08] shadow-2xl shadow-cyan-950/20'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / OS Identity */}
          <Link
            href="/#hero"
            className="group flex items-center space-x-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1"
            aria-label="RANA.OS Home"
          >
            <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-surface-primary border border-cyan-500/30 group-hover:border-cyan-400 transition-colors shadow-inner">
              <span className="font-mono text-xs font-bold tracking-wider text-cyan-400 group-hover:text-cyan-300">
                R
              </span>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse border-2 border-[#030712]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="font-mono text-sm font-semibold tracking-wider text-slate-100">
                  RANA.OS
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/60 text-cyan-400 border border-cyan-800/40">
                  v2.4
                </span>
              </div>
              <span className="text-[11px] text-slate-400 hidden sm:inline-block font-mono">
                Rana Irtaza Ali Khan
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center space-x-1 px-3 py-1.5 rounded-full glass-panel border border-white/[0.07] shadow-lg shadow-black/40"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`relative px-3.5 py-1.5 text-xs font-medium tracking-wide transition-all duration-200 rounded-full focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 ${
                    isActive
                      ? 'text-cyan-300 bg-cyan-500/10 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Controls: Command Palette & Graphics Switcher & CTA */}
          <div className="flex items-center space-x-2.5">
            {/* Quick Command Palette Button */}
            <button
              onClick={toggleCommandPalette}
              className="flex items-center space-x-2 px-2.5 py-1.5 rounded-lg bg-surface-primary border border-white/[0.08] hover:border-cyan-500/40 hover:bg-white/[0.03] transition-all text-xs font-mono text-slate-400 hover:text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              title="Command Palette (Ctrl + K)"
              aria-label="Open Command Palette"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden lg:inline text-[11px]">Command</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white/[0.06] rounded border border-white/10 text-slate-300">
                ⌘K
              </kbd>
            </button>

            {/* Graphics Mode Toggle */}
            <div className="relative">
              <button
                onClick={() => setGraphicsMenuOpen(!graphicsMenuOpen)}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-surface-primary border border-white/[0.08] hover:border-violet-500/40 hover:bg-white/[0.03] transition-all text-xs font-mono text-slate-400 hover:text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                aria-label="Toggle Background Graphics Mode"
                title="Background Engine Settings"
              >
                {graphicsMode === '3d-high' ? (
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                ) : graphicsMode === '3d-low' ? (
                  <Cpu className="w-3.5 h-3.5 text-violet-400" />
                ) : (
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                )}
                <span className="hidden xl:inline text-[11px]">
                  {graphicsMode === '3d-high' ? '3D High' : graphicsMode === '3d-low' ? '3D Eco' : '2D Canvas'}
                </span>
              </button>

              {graphicsMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setGraphicsMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 p-2 rounded-xl glass-panel border border-white/10 shadow-2xl z-30 font-sans">
                    <div className="px-3 py-1.5 text-[11px] font-mono uppercase text-slate-400 border-b border-white/[0.08] mb-1 flex items-center justify-between">
                      <span>Graphics Engine</span>
                      <span className="text-[10px] text-cyan-400">R3F / Three.js</span>
                    </div>
                    {graphicsOptions.map((opt) => (
                      <button
                        key={opt.mode}
                        onClick={() => {
                          setGraphicsMode(opt.mode);
                          setGraphicsMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex flex-col space-y-0.5 ${
                          graphicsMode === opt.mode
                            ? 'bg-cyan-950/60 text-cyan-200 border border-cyan-800/40'
                            : 'text-slate-300 hover:bg-white/[0.05]'
                        }`}
                      >
                        <span className="font-semibold">{opt.label}</span>
                        <span className="text-[10px] text-slate-400">{opt.desc}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Direct Contact Button */}
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-[#030712] font-semibold text-xs tracking-wide transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              <span>Contact</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-surface-primary border border-white/10 text-slate-300 hover:text-white"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 px-4 pt-2 pb-4 bg-[#030712]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  activeSection === link.id
                    ? 'text-cyan-400 bg-cyan-950/40'
                    : 'text-slate-300 hover:bg-white/[0.05]'
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => {
                  toggleCommandPalette();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 text-xs font-mono text-cyan-400 py-1"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Open Command Palette</span>
              </button>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-semibold px-3 py-1.5 rounded bg-cyan-500 text-black"
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
