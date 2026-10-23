'use client';

import React from 'react';
import Image from 'next/image';
interface ProfileAvatarProps {
  src?: string;
  name: string;
  title?: string;
  size?: 'md' | 'lg' | 'xl';
  className?: string;
}

export default function ProfileAvatar({
  src,
  name,
  title,
  size = 'lg',
  className = '',
}: ProfileAvatarProps) {
  const sizeClasses = {
    md: 'w-20 h-20 text-xl',
    lg: 'w-28 h-28 sm:w-32 sm:h-32 text-2xl sm:text-3xl',
    xl: 'w-36 h-36 sm:w-44 sm:h-44 text-3xl sm:text-4xl',
  };

  const hasRealPhoto = Boolean(src && src.trim().length > 0);

  return (
    <div className={`relative inline-block ${className}`} title={title || name}>
      {/* Outer ambient glow rings */}
      <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-cyan-400/30 via-violet-500/20 to-sky-400/30 blur-md opacity-70 group-hover:opacity-100 transition duration-500" />

      {/* Main Avatar Container */}
      <div
        className={`relative ${sizeClasses[size]} rounded-2xl glass-panel border border-cyan-400/40 overflow-hidden flex items-center justify-center shadow-2xl shadow-cyan-950/40 bg-gradient-to-br from-[#0c1222] via-[#070a12] to-[#120e29]`}
      >
        {hasRealPhoto ? (
          <Image
            src={src!}
            alt={name}
            fill
            sizes="(max-width: 640px) 128px, 176px"
            className="object-cover"
            priority
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-2 text-center select-none w-full h-full relative">
            {/* Subtle grid pattern background */}
            <div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 1px 1px, rgba(103, 232, 249, 0.4) 1px, transparent 0)',
                backgroundSize: '12px 12px',
              }}
            />

            {/* Initials & System Glyph */}
            <div className="relative z-10 flex flex-col items-center justify-center">
              <span className="font-mono font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-violet-300">
                RK
              </span>
              <span className="text-[9px] font-mono tracking-widest uppercase text-cyan-400/80 mt-0.5">
                RANA.OS
              </span>
            </div>

            {/* Corner brackets for high-tech aesthetic */}
            <span className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-cyan-400/60" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-cyan-400/60" />
            <span className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-cyan-400/60" />
            <span className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-cyan-400/60" />
          </div>
        )}
      </div>

      {/* Verified Online / Operational Status Pill */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center space-x-1 px-2 py-0.5 rounded-full bg-[#070a12] border border-cyan-400/40 text-[10px] font-mono text-cyan-300 shadow-lg whitespace-nowrap z-20">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse" />
        <span>Verified Identity</span>
      </div>
    </div>
  );
}
