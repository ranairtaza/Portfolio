'use client';

import React, { createContext, useContext, useState, useEffect, useSyncExternalStore } from 'react';
import { GraphicsMode } from '../types/portfolio';

export type Theme = 'dark' | 'light';

interface PortfolioContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  graphicsMode: GraphicsMode;
  setGraphicsMode: (mode: GraphicsMode) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  activeProjectId: string | null;
  setActiveProjectId: (id: string | null) => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  toggleCommandPalette: () => void;
  isReducedMotion: boolean;
  selectedSkill: string | null;
  setSelectedSkill: (skill: string | null) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getInitialGraphicsMode(): GraphicsMode {
  if (typeof window !== 'undefined') {
    try {
      const savedMode = localStorage.getItem('rana_os_graphics_mode') as GraphicsMode;
      if (savedMode && ['3d-high', '3d-low', '2d-ambient'].includes(savedMode)) {
        return savedMode;
      }
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return '2d-ambient';
      }
    } catch {
      // ignore storage access restrictions
    }
  }
  return '3d-high';
}

function getInitialTheme(): Theme {
  if (typeof window !== 'undefined') {
    try {
      const savedTheme = localStorage.getItem('rana_os_theme') as Theme;
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
    } catch {
      // ignore
    }
  }
  return 'dark';
}

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const isReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false
  );

  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  const [graphicsMode, setGraphicsModeState] = useState<GraphicsMode>(getInitialGraphicsMode);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      root.style.colorScheme = 'light';
    }
    try {
      localStorage.setItem('rana_os_theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  useEffect(() => {
    // Global Command/Ctrl + K shortcut
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const setGraphicsMode = (mode: GraphicsMode) => {
    setGraphicsModeState(mode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('rana_os_graphics_mode', mode);
    }
  };

  const toggleCommandPalette = () => {
    setIsCommandPaletteOpen((prev) => !prev);
  };

  return (
    <PortfolioContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
        graphicsMode,
        setGraphicsMode,
        activeSection,
        setActiveSection,
        activeProjectId,
        setActiveProjectId,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        toggleCommandPalette,
        isReducedMotion,
        selectedSkill,
        setSelectedSkill,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
