'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../../context/PortfolioContext';
import { PERSONAL_INFO, PROJECTS } from '../../data/portfolio';
import {
  Search,
  ArrowRight,
  Sparkles,
  Cpu,
  Zap,
  Mail,
  FileCode2,
  FolderGit2,
  Check,
  X,
  Calendar,
  Layers,
  FileDown,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { GraphicsMode } from '../../types/portfolio';

interface PaletteItem {
  id: string;
  category: 'Navigation' | 'Projects' | 'Engine' | 'Actions';
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  action: () => void;
}

function CommandPaletteModal({
  onClose,
  graphicsMode,
  setGraphicsMode,
}: {
  onClose: () => void;
  graphicsMode: GraphicsMode;
  setGraphicsMode: (mode: GraphicsMode) => void;
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => {
      setCopiedEmail(false);
      onClose();
    }, 1200);
  };

  const items: PaletteItem[] = [
    // Navigation
    {
      id: 'nav-hero',
      category: 'Navigation',
      title: 'System Terminal / Hero',
      subtitle: 'Jump to top intro and system status overview',
      icon: <Sparkles className="w-4 h-4 text-cyan-400" />,
      action: () => {
        window.location.hash = 'home';
        onClose();
      },
    },
    {
      id: 'nav-about',
      category: 'Navigation',
      title: 'About Rana Irtaza',
      subtitle: 'Background, architecture ethos, education details',
      icon: <FileCode2 className="w-4 h-4 text-cyan-400" />,
      action: () => {
        window.location.hash = 'about';
        onClose();
      },
    },
    {
      id: 'nav-projects',
      category: 'Navigation',
      title: 'Featured Projects',
      subtitle: 'LeadMachine, KeyAbroad 2.0, Biometric Attendance',
      icon: <FolderGit2 className="w-4 h-4 text-cyan-400" />,
      action: () => {
        window.location.hash = 'projects';
        onClose();
      },
    },
    {
      id: 'nav-skills',
      category: 'Navigation',
      title: 'Skills Constellation',
      subtitle: 'Full-stack technologies, databases, and AI pipelines',
      icon: <Cpu className="w-4 h-4 text-cyan-400" />,
      action: () => {
        window.location.hash = 'skills';
        onClose();
      },
    },
    {
      id: 'nav-journey',
      category: 'Navigation',
      title: 'Experience & Education Timeline',
      subtitle: 'KeyAbroad Consultants & BS Information Technology',
      icon: <FileCode2 className="w-4 h-4 text-cyan-400" />,
      action: () => {
        window.location.hash = 'journey';
        onClose();
      },
    },
    {
      id: 'nav-beyond-code',
      category: 'Navigation',
      title: 'Beyond Code',
      subtitle: 'AI agents, entrepreneurship, cybersecurity, fitness',
      icon: <Sparkles className="w-4 h-4 text-violet-400" />,
      action: () => {
        window.location.hash = 'beyond-code';
        onClose();
      },
    },
    {
      id: 'nav-services',
      category: 'Navigation',
      title: 'Services / What I Can Help Build',
      subtitle: 'SaaS MVPs, dashboards, web applications, API & AI workflows',
      icon: <Layers className="w-4 h-4 text-cyan-400" />,
      action: () => {
        window.location.hash = 'services';
        onClose();
      },
    },
    {
      id: 'nav-contact',
      category: 'Navigation',
      title: 'Contact Gateway',
      subtitle: 'Career opportunities, software projects & collaboration',
      icon: <Mail className="w-4 h-4 text-cyan-400" />,
      action: () => {
        window.location.hash = 'contact';
        onClose();
      },
    },

    // Case Studies
    ...PROJECTS.map((p) => ({
      id: `case-${p.slug}`,
      category: 'Projects' as const,
      title: `Case Study: ${p.title}`,
      subtitle: `${p.statusBadge} • ${p.subtitle}`,
      icon: <FolderGit2 className="w-4 h-4 text-violet-400" />,
      action: () => {
        router.push(`/projects/${p.slug}`);
        onClose();
      },
    })),

    // Graphics Engine Controls
    {
      id: 'engine-high',
      category: 'Engine',
      title: 'Switch Engine: 3D High Fidelity',
      subtitle: '140 particles with interactive pointer and scroll camera tracking',
      icon: <Sparkles className="w-4 h-4 text-cyan-400" />,
      action: () => {
        setGraphicsMode('3d-high');
        onClose();
      },
    },
    {
      id: 'engine-low',
      category: 'Engine',
      title: 'Switch Engine: 3D Low Power',
      subtitle: '70 particles, battery-saving mode for laptops',
      icon: <Cpu className="w-4 h-4 text-violet-400" />,
      action: () => {
        setGraphicsMode('3d-low');
        onClose();
      },
    },
    {
      id: 'engine-2d',
      category: 'Engine',
      title: 'Switch Engine: 2D Eco Canvas',
      subtitle: 'Pure 2D canvas, 0% WebGL overhead for integrated GPUs',
      icon: <Zap className="w-4 h-4 text-amber-400" />,
      action: () => {
        setGraphicsMode('2d-ambient');
        onClose();
      },
    },

    // Actions
    {
      id: 'act-booking',
      category: 'Actions',
      title: 'Schedule on Google Calendar',
      subtitle: 'Book a 1-on-1 discovery call or recruiter interview',
      icon: <Calendar className="w-4 h-4 text-cyan-400" />,
      action: () => {
        window.open(PERSONAL_INFO.bookingUrl, '_blank', 'noopener,noreferrer');
        onClose();
      },
    },
    ...(PERSONAL_INFO.email
      ? [
          {
            id: 'act-copy-email',
            category: 'Actions' as const,
            title: copiedEmail ? 'Email Copied to Clipboard!' : `Copy Email (${PERSONAL_INFO.email})`,
            subtitle: 'One-click copy for quick correspondence',
            icon: copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Mail className="w-4 h-4 text-cyan-400" />,
            action: handleCopyEmail,
          },
        ]
      : []),
    ...(PERSONAL_INFO.hasResumePdf
      ? [
          {
            id: 'act-download-resume',
            category: 'Actions' as const,
            title: 'Download Verified Résumé (PDF)',
            subtitle: 'Official education, experience and project documentation',
            icon: <FileDown className="w-4 h-4 text-cyan-400" />,
            action: () => {
              window.open(PERSONAL_INFO.resumeUrl, '_blank');
              onClose();
            },
          },
        ]
      : []),
    {
      id: 'act-github',
      category: 'Actions',
      title: 'Open GitHub Profile',
      subtitle: PERSONAL_INFO.github,
      icon: <GithubIcon className="w-4 h-4 text-slate-200" />,
      action: () => {
        window.open(PERSONAL_INFO.github, '_blank', 'noopener,noreferrer');
        onClose();
      },
    },
    {
      id: 'act-linkedin',
      category: 'Actions',
      title: 'Open LinkedIn Profile',
      subtitle: PERSONAL_INFO.linkedin,
      icon: <LinkedinIcon className="w-4 h-4 text-blue-400" />,
      action: () => {
        window.open(PERSONAL_INFO.linkedin, '_blank', 'noopener,noreferrer');
        onClose();
      },
    },
  ];

  const filteredItems = items.filter((item) => {
    const text = `${item.title} ${item.subtitle} ${item.category}`.toLowerCase();
    return text.includes(query.toLowerCase());
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="RANA.OS Command Palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="fixed inset-0 bg-[#030712]/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Palette Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: -12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -12 }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-xl rounded-2xl bg-[#070d1d] border border-cyan-500/30 shadow-2xl shadow-cyan-950/50 overflow-hidden z-10 flex flex-col max-h-[80vh]"
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/[0.08] bg-surface-secondary">
          <Search className="w-5 h-5 text-cyan-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command, project, or section..."
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none font-mono"
          />
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-white/[0.05] transition-colors"
            aria-label="Close Command Palette"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 divide-y divide-white/[0.04] scrollbar-thin">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs font-mono">
              No system commands found matching &quot;{query}&quot;
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-all ${
                    isSelected
                      ? 'bg-cyan-950/60 border border-cyan-800/40 text-cyan-200 shadow-inner'
                      : 'text-slate-300 hover:bg-white/[0.03] border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-3 overflow-hidden">
                    <div
                      className={`p-2 rounded-lg ${
                        isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-white/[0.05] text-slate-400'
                      }`}
                    >
                      {item.icon}
                    </div>
                    <div className="flex flex-col truncate">
                      <span className="text-xs font-medium text-slate-100 truncate">
                        {item.title}
                      </span>
                      <span className="text-[11px] text-slate-400 truncate">
                        {item.subtitle}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 shrink-0 ml-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-slate-400 border border-white/[0.08]">
                      {item.category}
                    </span>
                    <ArrowRight
                      className={`w-3.5 h-3.5 transition-transform ${
                        isSelected ? 'translate-x-0.5 text-cyan-400' : 'text-slate-600'
                      }`}
                    />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Palette Footer */}
        <div className="px-4 py-2 border-t border-white/[0.08] bg-surface-primary/90 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center space-x-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <div className="text-cyan-400/80">
            Current: {graphicsMode}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function CommandPalette() {
  const { isCommandPaletteOpen, setIsCommandPaletteOpen, graphicsMode, setGraphicsMode } =
    usePortfolio();

  return (
    <AnimatePresence>
      {isCommandPaletteOpen && (
        <CommandPaletteModal
          onClose={() => setIsCommandPaletteOpen(false)}
          graphicsMode={graphicsMode}
          setGraphicsMode={setGraphicsMode}
        />
      )}
    </AnimatePresence>
  );
}
