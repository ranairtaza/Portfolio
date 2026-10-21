'use client';

import React, { createContext, useContext, useState, useEffect, useSyncExternalStore } from 'react';
import { GraphicsMode } from '../types/portfolio';

interface PortfolioContextType {
  graphicsMode: GraphicsMode;
  setGraphicsMode: (mode: GraphicsMode) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
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

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const isReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false
  );

  const [graphicsMode, setGraphicsModeState] = useState<GraphicsMode>(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('rana_os_graphics_mode') as GraphicsMode;
      if (savedMode && ['3d-high', '3d-low', '2d-ambient'].includes(savedMode)) {
        return savedMode;
      }
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return '2d-ambient';
      }
    }
    return '3d-high';
  });

  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

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
        graphicsMode,
        setGraphicsMode,
        activeSection,
        setActiveSection,
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
