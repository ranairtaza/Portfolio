'use client';

import React, { useState } from 'react';
import { ArchitectureSpec } from '../../types/portfolio';
import {
  Layers,
  ArrowRight,
  CheckCircle2,
  Clock,
  Workflow,
  Server,
  Database,
  Shield,
  Radio,
} from 'lucide-react';

interface ArchitectureDiagramProps {
  spec: ArchitectureSpec;
  projectTitle: string;
}

export default function ArchitectureDiagram({ spec, projectTitle }: ArchitectureDiagramProps) {
  const [activeTab, setActiveTab] = useState<'layers' | 'dataflow'>('layers');
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const getLayerIcon = (layerName: string) => {
    if (layerName.toLowerCase().includes('presentation') || layerName.toLowerCase().includes('client')) {
      return <Layers className="w-4 h-4 text-cyan-400" />;
    }
    if (layerName.toLowerCase().includes('security') || layerName.toLowerCase().includes('edge') || layerName.toLowerCase().includes('access')) {
      return <Shield className="w-4 h-4 text-violet-400" />;
    }
    if (layerName.toLowerCase().includes('hardware')) {
      return <Radio className="w-4 h-4 text-cyan-400" />;
    }
    if (layerName.toLowerCase().includes('database') || layerName.toLowerCase().includes('storage')) {
      return <Database className="w-4 h-4 text-indigo-400" />;
    }
    return <Server className="w-4 h-4 text-cyan-300" />;
  };

  return (
    <div className="rounded-2xl glass-panel border border-white/[0.08] overflow-hidden space-y-6 p-6 sm:p-8">
      {/* Header and Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
            <Workflow className="w-4 h-4" />
            <span>Architecture Blueprint & System Topology</span>
          </div>
          <h3 className="text-xl font-bold text-white mt-1">
            {projectTitle} System Architecture
          </h3>
          <p className="text-xs text-slate-400 max-w-xl mt-1 leading-relaxed">
            {spec.summary}
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center p-1 rounded-xl bg-surface-primary border border-white/[0.08] self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('layers')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === 'layers'
                ? 'bg-cyan-400/20 text-cyan-300 border border-cyan-400/40 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Layer Topology</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('dataflow')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === 'dataflow'
                ? 'bg-violet-400/20 text-violet-300 border border-violet-400/40 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Workflow className="w-3.5 h-3.5" />
            <span>Data Flow ({spec.dataFlow.length})</span>
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 px-1">
        <span className="text-[11px] uppercase tracking-wider text-slate-500">Legend:</span>
        <div className="inline-flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500/80 border border-emerald-400/60" />
          <span className="text-emerald-300 font-medium">Verified / Current Component</span>
        </div>
        <div className="inline-flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-amber-500/80 border border-amber-400/60 border-dashed" />
          <span className="text-amber-300 font-medium">Planned / Roadmap Component</span>
        </div>
      </div>

      {/* Layer Topology View */}
      {activeTab === 'layers' && (
        <div className="space-y-6">
          {spec.layers.map((layer, layerIdx) => (
            <div
              key={layer.layerName}
              className="relative p-5 rounded-xl bg-surface-primary/60 border border-white/[0.06] space-y-4"
            >
              {/* Layer Title Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.04] pb-3">
                <div className="flex items-center space-x-2">
                  <span className="p-1.5 rounded-lg bg-surface-secondary border border-white/[0.06]">
                    {getLayerIcon(layer.layerName)}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-white font-mono">
                      {layer.layerName}
                    </h4>
                    <p className="text-[11px] text-slate-400">{layer.description}</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                  Tier {layerIdx + 1}
                </span>
              </div>

              {/* Component Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {layer.components.map((comp) => {
                  const isCurrent = comp.status === 'current';

                  return (
                    <div
                      key={comp.name}
                      className={`p-3.5 rounded-lg border text-xs flex flex-col justify-between space-y-2 transition-all ${
                        isCurrent
                          ? 'bg-surface-secondary/80 border-white/[0.08] hover:border-cyan-400/30'
                          : 'bg-amber-950/10 border-amber-800/40 border-dashed hover:border-amber-600/50'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-semibold text-slate-100 leading-snug">
                            {comp.name}
                          </span>
                          <span
                            className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono shrink-0 ${
                              isCurrent
                                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60'
                                : 'bg-amber-950/80 text-amber-300 border border-amber-700/60'
                            }`}
                          >
                            {isCurrent ? 'Current' : 'Planned'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          {comp.role}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-[10px] font-mono text-slate-400">
                        <span className="text-cyan-400/90 truncate max-w-[170px]">
                          {comp.tech}
                        </span>
                        {comp.notes && (
                          <span className="text-amber-400/80 italic text-[9px]">
                            {comp.notes}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sequence Data Flow View */}
      {activeTab === 'dataflow' && (
        <div className="space-y-3 font-mono">
          <div className="text-xs text-slate-400 mb-2">
            Click any step to inspect the protocol and payload progression:
          </div>

          <div className="space-y-3">
            {spec.dataFlow.map((step) => {
              const isSelected = activeStep === step.step;

              return (
                <div
                  key={step.step}
                  onClick={() => setActiveStep(isSelected ? null : step.step)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setActiveStep(isSelected ? null : step.step);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  className={`p-4 rounded-xl border text-xs cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-surface-secondary border-cyan-400/60 shadow-lg shadow-cyan-950/30'
                      : 'bg-surface-primary/70 border-white/[0.06] hover:border-white/[0.15] hover:bg-surface-primary'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start space-x-3">
                      <span
                        className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 text-[11px] font-bold ${
                          isSelected
                            ? 'bg-cyan-400 text-slate-950'
                            : 'bg-indigo-950/80 text-indigo-300 border border-indigo-700/50'
                        }`}
                      >
                        {step.step}
                      </span>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-white text-sm">
                            {step.title}
                          </span>
                          {step.protocol && (
                            <span className="px-2 py-0.5 rounded text-[10px] bg-white/[0.05] text-cyan-300 border border-cyan-900/40">
                              {step.protocol}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed font-sans">
                          {step.detail}
                        </p>
                      </div>
                    </div>

                    <ArrowRight
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                        isSelected ? 'rotate-90 text-cyan-300' : ''
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Verified vs Planned Summary Footer */}
      <div className="pt-4 border-t border-white/[0.06] grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
        <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-800/30 space-y-2">
          <div className="flex items-center space-x-1.5 text-emerald-400 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Verified Components in Repository ({spec.verifiedComponents.length})</span>
          </div>
          <ul className="space-y-1 text-slate-300 text-[11px]">
            {spec.verifiedComponents.map((c, i) => (
              <li key={i} className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/30 space-y-2">
          <div className="flex items-center space-x-1.5 text-amber-400 font-semibold">
            <Clock className="w-3.5 h-3.5" />
            <span>Documented Future Roadmap ({spec.plannedComponents.length})</span>
          </div>
          <ul className="space-y-1 text-slate-300 text-[11px]">
            {spec.plannedComponents.map((c, i) => (
              <li key={i} className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
