'use client';

import React, { useSyncExternalStore } from 'react';
import dynamic from 'next/dynamic';
import { usePortfolio } from '../../context/PortfolioContext';
import CanvasFallback from './CanvasFallback';

// Dynamically import the 3D scene to keep initial bundle light and avoid SSR issues
const SceneBackground3D = dynamic(() => import('./SceneBackground3D'), {
  ssr: false,
  loading: () => <CanvasFallback />,
});

const emptySubscribe = () => () => {};

function checkWebGLSupport(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch {
    return false;
  }
}

/**
 * UniverseBackground
 * Persistent interactive 3D universe mounted at the root layout level.
 * Features:
 * - Deep space atmosphere with cosmic gradients
 * - Multi-layer particle and constellation field
 * - Central wireframe geometry morphing across page sections
 * - Luminous orbital paths connected to project card hover/focus
 * - Subtle cursor parallax (desktop) and ambient drifting (touch)
 * - Safe CSS and 2D canvas fallback for reduced motion or non-WebGL devices
 * - Zero pointer event interference (pointer-events-none)
 */
export default function UniverseBackground() {
  const { graphicsMode, isReducedMotion, theme } = usePortfolio();
  const isDark = theme !== 'light';

  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const webglSupported = useSyncExternalStore(
    emptySubscribe,
    checkWebGLSupport,
    () => true
  );

  const shouldUse3D =
    isClient &&
    webglSupported &&
    !isReducedMotion &&
    (graphicsMode === '3d-high' || graphicsMode === '3d-low');

  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 w-full h-full overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Deep cosmic gradient backdrop in dark mode, clean subtle atmospheric backdrop in light mode */}
      <div
        className={`absolute inset-0 transition-colors duration-500 ${
          isDark ? 'bg-[#060913]' : 'bg-[#f8fafc]'
        }`}
      />

      {/* Atmospheric radial accent glows */}
      <div
        className={`absolute -top-[15%] left-[20%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full blur-[130px] transition-colors duration-500 ${
          isDark ? 'bg-cyan-950/25' : 'bg-sky-200/50'
        }`}
      />
      <div
        className={`absolute top-[40%] -right-[10%] w-[50vw] h-[50vw] max-w-[650px] max-h-[650px] rounded-full blur-[140px] transition-colors duration-500 ${
          isDark ? 'bg-indigo-950/25' : 'bg-indigo-100/50'
        }`}
      />
      <div
        className={`absolute bottom-[10%] left-[10%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] rounded-full blur-[120px] transition-colors duration-500 ${
          isDark ? 'bg-violet-950/20' : 'bg-violet-100/40'
        }`}
      />

      {/* Subtle grid layer */}
      <div className="absolute inset-0 bg-grid-subtle opacity-40" />

      {/* 3D R3F Environment or 2D Canvas Fallback */}
      {shouldUse3D ? (
        <SceneBackground3D mode={graphicsMode} />
      ) : (
        <CanvasFallback />
      )}

      {/* Soft vignette overlay */}
      <div className="absolute inset-0 bg-radial-vignette opacity-50" />
    </div>
  );
}
