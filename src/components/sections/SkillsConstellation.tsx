'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { SKILL_CATEGORIES, PROJECTS } from '../../data/portfolio';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  Cpu,
  Database,
  Workflow,
  ShieldCheck,
  Server,
  Layout,
  Compass,
  ArrowRight,
  X,
  Layers,
  Table,
  Network,
  Info,
} from 'lucide-react';
import { SkillItem } from '../../types/portfolio';

const categoryIcons: Record<string, React.ReactNode> = {
  Layout: <Layout className="w-4 h-4 text-cyan-300" />,
  Server: <Server className="w-4 h-4 text-sky-300" />,
  Database: <Database className="w-4 h-4 text-indigo-300" />,
  Workflow: <Workflow className="w-4 h-4 text-violet-300" />,
  ShieldCheck: <ShieldCheck className="w-4 h-4 text-emerald-300" />,
  Compass: <Compass className="w-4 h-4 text-amber-300" />,
};

export default function SkillsConstellation() {
  const { selectedSkill, setSelectedSkill, isReducedMotion } = usePortfolio();
  const [selectedProjectFilter, setSelectedProjectFilter] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'constellation' | 'accessible-grid'>('constellation');

  // Default to Next.js or selected skill without transient hover layout shifts
  const activeSkillName = selectedSkill || 'Next.js';

  // Find the active skill object across all categories
  let activeSkillObj: (SkillItem & { categoryTitle: string; isExploringGroup?: boolean }) | null = null;
  for (const cat of SKILL_CATEGORIES) {
    const found = cat.skills.find((s) => s.name === activeSkillName);
    if (found) {
      activeSkillObj = {
        ...found,
        categoryTitle: cat.title,
        isExploringGroup: cat.isExploringGroup,
      };
      break;
    }
  }

  // Related projects for active skill
  const relatedProjects = PROJECTS.filter((proj) => {
    if (activeSkillObj?.projects?.includes(proj.id) || activeSkillObj?.projects?.includes(proj.slug)) {
      return true;
    }
    const lower = activeSkillName.toLowerCase();
    return proj.technologies.some((tech) => {
      const techLower = tech.toLowerCase();
      return techLower.includes(lower) || lower.includes(techLower);
    });
  });

  // Check if a skill belongs to the selected project filter
  const isSkillConnectedToSelectedProject = (skill: SkillItem) => {
    if (!selectedProjectFilter) return false;
    const proj = PROJECTS.find((p) => p.id === selectedProjectFilter);
    if (!proj) return false;

    if (skill.projects?.includes(proj.id) || skill.projects?.includes(proj.slug)) return true;
    const lower = skill.name.toLowerCase();
    return proj.technologies.some((tech) => {
      const techLower = tech.toLowerCase();
      return techLower.includes(lower) || lower.includes(techLower);
    });
  };

  return (
    <section
      id="skills"
      aria-label="Interactive Skills Constellation and Technology Map"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.08]"
    >
      <div className="space-y-10">
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-mono tracking-wider uppercase text-cyan-300">
              <Cpu className="w-3.5 h-3.5" />
              <span>03 // Interactive Technical Skills Constellation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Skills Constellation
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
              An interactive map of engineering technologies organized by functional category.
              Select any skill to inspect verified project applications, or select a project to highlight its associated stack.
            </p>
          </div>

          {/* View Toggle: Visual Constellation vs. Accessible Grid */}
          <div className="flex items-center space-x-2 bg-surface-primary p-1 rounded-xl border border-white/[0.08] self-start md:self-auto">
            <button
              onClick={() => setViewMode('constellation')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                viewMode === 'constellation'
                  ? 'bg-cyan-300 text-[#070a12] font-semibold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
              aria-pressed={viewMode === 'constellation'}
            >
              <Network className="w-3.5 h-3.5" />
              <span>Constellation View</span>
            </button>
            <button
              onClick={() => setViewMode('accessible-grid')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                viewMode === 'accessible-grid'
                  ? 'bg-cyan-300 text-[#070a12] font-semibold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
              aria-pressed={viewMode === 'accessible-grid'}
            >
              <Table className="w-3.5 h-3.5" />
              <span>Accessible Table</span>
            </button>
          </div>
        </div>

        {/* Bi-Directional Highlight Filter Bar: Projects Hub */}
        <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-primary/60">
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-300">
            <Layers className="w-4 h-4 text-cyan-300 shrink-0" />
            <span className="font-semibold text-white">Project Highlight Filter:</span>
            <span className="text-slate-400 hidden sm:inline">Select a project to reveal its technology stack:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {PROJECTS.map((p) => {
              const isSelected = selectedProjectFilter === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() =>
                    setSelectedProjectFilter(isSelected ? null : p.id)
                  }
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
                    isSelected
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-sm'
                      : 'bg-white/[0.04] text-slate-300 hover:text-white border border-white/[0.06] hover:border-cyan-400/30'
                  }`}
                >
                  {p.title}
                </button>
              );
            })}
            {selectedProjectFilter && (
              <button
                onClick={() => setSelectedProjectFilter(null)}
                className="px-2 py-1 text-slate-400 hover:text-white text-xs font-mono inline-flex items-center space-x-1"
                title="Clear project filter"
              >
                <X className="w-3 h-3" />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* Active Technology Inspector Callout Banner */}
        <div className="rounded-2xl glass-panel border border-cyan-400/30 p-5 sm:p-6 bg-gradient-to-r from-cyan-950/30 via-slate-900/70 to-violet-950/30 shadow-xl shadow-cyan-950/20 space-y-4 min-h-[180px]">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-white/[0.08]">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-cyan-950/80 text-cyan-300 border border-cyan-800/50">
                  {activeSkillObj?.categoryTitle || 'Engineering Technology'}
                </span>
                {activeSkillObj?.isExploring && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-amber-950/80 text-amber-300 border border-amber-800/50">
                    Currently Learning / Exploring
                  </span>
                )}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
                <span>{activeSkillName}</span>
                {activeSkillObj?.highlight && (
                  <span className="text-xs font-mono font-normal text-slate-400">
                    — {activeSkillObj.highlight}
                  </span>
                )}
              </h3>
            </div>

            {selectedSkill && (
              <button
                onClick={() => setSelectedSkill(null)}
                className="self-start sm:self-center inline-flex items-center space-x-1 px-2.5 py-1 rounded text-xs font-mono text-slate-400 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] transition-colors"
                title="Reset skill selection"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset selection</span>
              </button>
            )}
          </div>

          {/* Usage Explanation */}
          <div className="space-y-2">
            <div className="flex items-center space-x-1.5 text-xs font-mono text-cyan-300 uppercase tracking-wider">
              <Info className="w-3.5 h-3.5" />
              <span>How This Technology Is Used</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans bg-surface-primary/60 p-3.5 rounded-xl border border-white/[0.06]">
              {activeSkillObj?.usageExplanation ||
                'Applied as a foundational engineering standard in full-stack architecture, clean code structure, and reliable application execution.'}
            </p>
          </div>

          {/* Associated Project Links */}
          <div className="space-y-2 pt-1">
            <span className="text-[11px] font-mono uppercase text-slate-400 block font-semibold">
              Associated Verified Projects ({relatedProjects.length})
            </span>
            {relatedProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {relatedProjects.map((p) => (
                  <div
                    key={p.id}
                    className="p-3.5 rounded-xl bg-surface-primary border border-white/[0.08] hover:border-cyan-400/40 transition-all flex flex-col justify-between space-y-2"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                        <span>{p.categoryLabel}</span>
                        <span className="text-cyan-300">{p.statusBadge}</span>
                      </div>
                      <h4 className="font-bold text-white text-sm mt-1">{p.title}</h4>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1">{p.subtitle}</p>
                    </div>
                    <Link
                      href={`/projects/${p.slug}`}
                      className="inline-flex items-center space-x-1 text-xs font-semibold text-cyan-300 hover:text-cyan-200 transition-colors pt-1"
                    >
                      <span>View Project Study</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs font-mono text-slate-400">
                {activeSkillObj?.isExploring
                  ? 'Currently in active exploration mode. Kept distinct from deployed client and production systems.'
                  : 'Integrated across cross-functional full-stack workflows.'}
              </p>
            )}
          </div>
        </div>

        {/* View Mode Content: Constellation vs. Accessible Table */}
        <AnimatePresence mode="wait">
          {viewMode === 'constellation' ? (
            <motion.div
              key="constellation"
              initial={{ opacity: isReducedMotion ? 1 : 0, y: isReducedMotion ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: isReducedMotion ? 1 : 0, y: isReducedMotion ? 0 : -8 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
            {SKILL_CATEGORIES.map((category) => {
              const isExploringGroup = category.isExploringGroup;

              return (
                <div
                  key={category.id}
                  className={`p-6 rounded-2xl glass-panel border transition-all duration-300 flex flex-col justify-between space-y-4 hover:shadow-xl ${
                    isExploringGroup
                      ? 'border-amber-500/30 hover:border-amber-400/50 bg-gradient-to-b from-amber-950/10 to-transparent'
                      : 'border-white/[0.08] hover:border-cyan-300/40 hover:shadow-cyan-950/20'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Category Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                      <div className="flex items-center space-x-2.5">
                        <div
                          className={`p-2 rounded-lg bg-surface-primary border ${
                            isExploringGroup ? 'border-amber-400/30' : 'border-white/[0.08]'
                          }`}
                        >
                          {categoryIcons[category.iconName] || <Cpu className="w-4 h-4 text-cyan-300" />}
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-base leading-snug">
                            {category.title}
                          </h3>
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase ${
                          isExploringGroup
                            ? 'bg-amber-950/60 text-amber-300 border-amber-800/40'
                            : 'bg-white/[0.05] text-slate-400 border-white/10'
                        }`}
                      >
                        {category.skills.length} techs
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed font-sans min-h-[36px]">
                      {category.description}
                    </p>

                    {/* Interactive Skills Node List */}
                    <div className="space-y-2 pt-2">
                      {category.skills.map((skill, idx) => {
                        const isSelected = activeSkillName === skill.name;
                        const isConnected = isSkillConnectedToSelectedProject(skill);

                        return (
                          <button
                            key={idx}
                            onClick={() => setSelectedSkill(selectedSkill === skill.name ? null : skill.name)}
                            aria-label={`Select skill: ${skill.name}`}
                            className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                              isSelected
                                ? 'bg-cyan-100 border border-cyan-500 shadow-sm text-cyan-950 font-bold dark:bg-cyan-500/20 dark:text-cyan-200 dark:border-cyan-400/60 dark:shadow-cyan-500/20'
                                : isConnected
                                ? 'bg-cyan-50 border border-cyan-300 text-cyan-900 font-semibold dark:bg-cyan-950/40 dark:border-cyan-400/40 dark:text-cyan-200'
                                : 'bg-surface-primary/70 border border-slate-200/80 text-slate-800 hover:border-cyan-400/40 hover:bg-slate-50 dark:border-white/[0.05] dark:text-slate-200 dark:hover:border-cyan-300/30 dark:hover:bg-white/[0.04]'
                            }`}
                          >
                            <div className="flex items-center space-x-2.5 min-w-0">
                              <span
                                className={`w-2 h-2 rounded-full shrink-0 transition-colors ${
                                  isSelected
                                    ? 'bg-cyan-600 ring-4 ring-cyan-200 dark:bg-cyan-300 dark:ring-cyan-400/30'
                                    : isConnected
                                    ? 'bg-cyan-500 dark:bg-cyan-400'
                                    : isExploringGroup
                                    ? 'bg-amber-500 dark:bg-amber-400/60'
                                    : 'bg-slate-400 dark:bg-slate-500'
                                }`}
                              />
                              <span
                                className={`text-xs font-semibold truncate transition-colors ${
                                  isSelected
                                    ? 'text-cyan-950 dark:text-cyan-200 font-bold'
                                    : isConnected
                                    ? 'text-cyan-900 dark:text-cyan-300 font-semibold'
                                    : 'text-slate-800 dark:text-slate-200'
                                }`}
                              >
                                {skill.name}
                              </span>
                            </div>

                            {skill.highlight && (
                              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 truncate max-w-[130px] ml-2 shrink-0">
                                {skill.highlight}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
            </motion.div>
          ) : (
            /* Accessible Table / Structured Grid View */
            <motion.div
              key="accessible-grid"
              initial={{ opacity: isReducedMotion ? 1 : 0, y: isReducedMotion ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: isReducedMotion ? 1 : 0, y: isReducedMotion ? 0 : -8 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl glass-panel border border-white/[0.08] overflow-hidden shadow-2xl"
            >
              <div className="p-4 bg-surface-secondary border-b border-white/[0.08] flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-semibold">
                  Accessible Skills Inventory &amp; Practical Application Table
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  Sorted by Architectural Category
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-sans">
                  <thead className="bg-surface-primary border-b border-white/[0.08] text-slate-300 font-mono text-[11px]">
                    <tr>
                      <th className="py-3 px-4">Technology</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Usage &amp; Practical Deployment</th>
                      <th className="py-3 px-4">Status / Projects</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06] text-slate-300">
                    {SKILL_CATEGORIES.flatMap((category) =>
                      category.skills.map((skill) => {
                        const isSelected = activeSkillName === skill.name;
                        return (
                          <tr
                            key={skill.name}
                            onClick={() => setSelectedSkill(skill.name)}
                            className={`cursor-pointer transition-colors ${
                              isSelected
                                ? 'bg-cyan-500/15 text-white'
                                : 'hover:bg-white/[0.03]'
                            }`}
                          >
                            <td className="py-3 px-4 font-semibold text-white whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                <span
                                  className={`w-1.5 h-1.5 rounded-full ${
                                    category.isExploringGroup ? 'bg-amber-400' : 'bg-cyan-300'
                                  }`}
                                />
                                <span>{skill.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                              {category.title}
                            </td>
                            <td className="py-3 px-4 max-w-md text-slate-300 leading-relaxed">
                              {skill.usageExplanation}
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap font-mono text-[11px]">
                              {category.isExploringGroup ? (
                                <span className="px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800/40">
                                  Exploring
                                </span>
                              ) : skill.projects && skill.projects.length > 0 ? (
                                <span className="px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/40">
                                  {skill.projects.length} Verified {skill.projects.length === 1 ? 'Project' : 'Projects'}
                                </span>
                              ) : (
                                <span className="text-slate-500">Core Stack</span>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
