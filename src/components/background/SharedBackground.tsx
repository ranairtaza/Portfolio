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

export default function SharedBackground() {
  const { graphicsMode, isReducedMotion } = usePortfolio();

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
      {/* Deep cosmic gradient backdrop */}
      <div className="absolute inset-0 bg-[#030712]" />

      {/* Radial accent glows */}
      <div className="absolute -top-[15%] left-[20%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full bg-cyan-950/20 blur-[130px]" />
      <div className="absolute top-[40%] -right-[10%] w-[50vw] h-[50vw] max-w-[650px] max-h-[650px] rounded-full bg-indigo-950/20 blur-[140px]" />
      <div className="absolute bottom-[10%] left-[10%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] rounded-full bg-violet-950/15 blur-[120px]" />

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
