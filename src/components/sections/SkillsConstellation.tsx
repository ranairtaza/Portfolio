'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SKILLS, PROJECTS } from '../../data/portfolio';
import { SkillCategory, Skill } from '../../types/portfolio';
import {
  Cpu,
  Layers,
  Database,
  Network,
  Workflow,
  Sparkles,
  ArrowRight,
  Code2,
} from 'lucide-react';

export default function SkillsConstellation() {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | 'all'>('all');
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);

  const categories: { id: SkillCategory | 'all'; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Technologies', icon: <Cpu className="w-3.5 h-3.5" /> },
    { id: 'frontend', label: 'Frontend', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'backend', label: 'Backend & DB', icon: <Database className="w-3.5 h-3.5" /> },
    { id: 'systems', label: 'Systems & Protocols', icon: <Network className="w-3.5 h-3.5" /> },
    { id: 'ai-automation', label: 'AI & Automation', icon: <Workflow className="w-3.5 h-3.5" /> },
  ];

  const filteredSkills = SKILLS.filter((s) => {
    if (selectedCategory === 'all') return true;
    return s.category === selectedCategory;
  });

  // Find projects connected to activeSkill
  const connectedProjects = activeSkill
    ? PROJECTS.filter((p) => activeSkill.relatedProjectIds.includes(p.id))
    : [];

  return (
    <section
      id="skills"
      aria-label="Skills Constellation"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]"
    >
      <div className="space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-mono tracking-wider uppercase text-cyan-400">
              <Cpu className="w-3.5 h-3.5" />
              <span>03 // Skills Constellation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Technology Matrix & Architectural Links
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl">
              Technologies categorized by domain. Select any technology node to see its
              real-world implementation across my projects.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1.5 rounded-xl glass-panel border border-white/[0.08] w-fit">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-cyan-500 text-[#030712] font-semibold shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid: Skills Cloud & Active Node Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Skills Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filteredSkills.map((skill) => {
              const isSelected = activeSkill?.name === skill.name;

              return (
                <button
                  key={skill.name}
                  onClick={() => setActiveSkill(skill)}
                  className={`p-3.5 rounded-xl text-left transition-all relative overflow-hidden group ${
                    isSelected
                      ? 'bg-cyan-950/70 border-2 border-cyan-400 text-white shadow-lg shadow-cyan-950/50'
                      : 'glass-panel border border-white/[0.07] hover:border-cyan-500/30 text-slate-200 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold font-mono tracking-tight group-hover:text-cyan-300 transition-colors">
                      {skill.name}
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isSelected
                          ? 'bg-cyan-400'
                          : skill.category === 'ai-automation'
                          ? 'bg-violet-400'
                          : skill.category === 'backend'
                          ? 'bg-indigo-400'
                          : skill.category === 'systems'
                          ? 'bg-emerald-400'
                          : 'bg-cyan-400/60'
                      }`}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span className="uppercase">{skill.category}</span>
                    <span className="text-cyan-400/80">
                      {skill.relatedProjectIds.length} {skill.relatedProjectIds.length === 1 ? 'proj' : 'projs'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Skill Inspector Card */}
          <div className="lg:col-span-4 rounded-2xl glass-panel border border-white/[0.09] p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.07]">
              <span className="text-xs font-mono uppercase text-cyan-400 font-semibold flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Node Inspector</span>
              </span>
              {activeSkill && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-slate-400 border border-white/10">
                  {activeSkill.category}
                </span>
              )}
            </div>

            {activeSkill ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white font-mono">
                    {activeSkill.name}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {activeSkill.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/[0.06] space-y-2">
                  <span className="text-[11px] font-mono uppercase text-slate-400 block">
                    Connected Real-World Projects
                  </span>
                  {connectedProjects.length > 0 ? (
                    <div className="space-y-2">
                      {connectedProjects.map((cp) => (
                        <Link
                          key={cp.id}
                          href={`/projects/${cp.slug}`}
                          className="flex items-center justify-between p-2.5 rounded-lg bg-surface-primary hover:bg-cyan-950/30 border border-white/[0.06] hover:border-cyan-500/30 transition-all group"
                        >
                          <div>
                            <div className="text-xs font-semibold text-slate-100 group-hover:text-cyan-300">
                              {cp.title}
                            </div>
                            <div className="text-[10px] text-slate-400">
                              {cp.statusBadge}
                            </div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500">
                      General engineering foundation.
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-slate-400 text-xs font-mono space-y-2">
                <Code2 className="w-6 h-6 text-slate-500 mx-auto" />
                <p>Click on any technology node on the left to inspect its real-world project links.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
