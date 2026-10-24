'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CERTIFICATIONS } from '../../data/portfolio';
import { Certification, CertificationCategory } from '../../types/portfolio';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  Award,
  ExternalLink,
  ShieldCheck,
  FileText,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  Building2,
  Cpu,
  Network,
  Users2,
  TrendingUp,
  X,
  Eye,
} from 'lucide-react';

export default function CertificationsSection() {
  const { isReducedMotion } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<CertificationCategory>('all');
  const [expandedSpecialization, setExpandedSpecialization] = useState<boolean>(false);
  const [previewDoc, setPreviewDoc] = useState<{
    title: string;
    url: string;
    type: 'image' | 'pdf';
  } | null>(null);

  const categories: { id: CertificationCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Credentials', icon: <Award className="w-3.5 h-3.5" /> },
    { id: 'ai', label: 'AI & Machine Learning', icon: <Cpu className="w-3.5 h-3.5" /> },
    { id: 'networking-support', label: 'Networking & IT Support', icon: <Network className="w-3.5 h-3.5" /> },
    { id: 'business-leadership', label: 'Leadership & Systems', icon: <Users2 className="w-3.5 h-3.5" /> },
    { id: 'internship', label: 'Experience Letters', icon: <Building2 className="w-3.5 h-3.5" /> },
    { id: 'marketing', label: 'Marketing & Funnels', icon: <TrendingUp className="w-3.5 h-3.5" /> },
  ];

  const filteredCerts = CERTIFICATIONS.filter((c) => {
    if (activeCategory === 'all') return true;
    return c.category === activeCategory;
  });

  const getIssuerBadge = (type: Certification['issuerType']) => {
    switch (type) {
      case 'Google':
        return (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-blue-950/70 text-blue-300 border border-blue-800/50">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span>Google Career Certificates</span>
          </span>
        );
      case 'Cisco':
        return (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-cyan-950/70 text-cyan-300 border border-cyan-800/50">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>Cisco Networking Academy</span>
          </span>
        );
      case 'Outskill':
        return (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-emerald-950/70 text-emerald-300 border border-emerald-800/50">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Outskill Certified</span>
          </span>
        );
      case 'Talkpool':
        return (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-indigo-950/70 text-indigo-300 border border-indigo-800/50">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            <span>Talkpool Pakistan Pvt. Ltd.</span>
          </span>
        );
      case 'Coursera':
      default:
        return (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-violet-950/70 text-violet-300 border border-violet-800/50">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            <span>Coursera Verified</span>
          </span>
        );
    }
  };

  return (
    <section
      id="certifications"
      aria-label="Certifications and Verified Credentials"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.08]"
    >
      <div className="space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center space-x-2 text-xs font-mono tracking-wider uppercase text-cyan-300">
              <Award className="w-3.5 h-3.5" />
              <span>03 // Verified Credentials</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Certifications & Technical Proof
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl font-sans leading-relaxed">
              Official professional certifications, technical program specializations, and verified corporate
              experience documentation from Google, Cisco, Outskill, and Talkpool Pakistan.
            </p>
          </motion.div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1.5 rounded-xl glass-panel border border-white/[0.08] w-fit">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-cyan-300 text-[#070a12] font-semibold shadow-md shadow-cyan-300/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert) => {
              const hasSubCourses = cert.subCourses && cert.subCourses.length > 0;

              return (
                <motion.div
                  key={cert.id}
                  layout={!isReducedMotion}
                  initial={{ opacity: isReducedMotion ? 1 : 0, scale: isReducedMotion ? 1 : 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: isReducedMotion ? 1 : 0, scale: isReducedMotion ? 1 : 0.98 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative flex flex-col justify-between rounded-2xl glass-panel border border-white/[0.08] hover:border-cyan-300/40 p-6 sm:p-7 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-950/20"
                >
                  <div className="space-y-4">
                    {/* Header: Issuer Badge & Date */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      {getIssuerBadge(cert.issuerType)}
                      <span className="font-mono text-xs text-slate-400">{cert.issueDate}</span>
                    </div>

                    {/* Title & Credential ID */}
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {cert.title}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1 text-xs text-slate-400 font-mono">
                        <span className="text-slate-300 font-medium">{cert.issuer}</span>
                        {cert.credentialId && (
                          <>
                            <span className="text-slate-600">•</span>
                            <span className="text-slate-500">ID: {cert.credentialId}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Summary Description */}
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                      {cert.summary}
                    </p>

                    {/* Sub-courses accordion for Google Specialization */}
                    {hasSubCourses && (
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => setExpandedSpecialization(!expandedSpecialization)}
                          className="w-full flex items-center justify-between p-3 rounded-xl bg-surface-primary/70 border border-white/[0.06] text-xs font-mono text-cyan-300 hover:bg-surface-primary transition-colors"
                        >
                          <span className="flex items-center space-x-2">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Included Modular Courses ({cert.subCourses?.length})</span>
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              expandedSpecialization ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {expandedSpecialization && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-2 space-y-2 overflow-hidden"
                            >
                              {cert.subCourses?.map((sc, i) => (
                                <div
                                  key={i}
                                  className="p-3 rounded-xl bg-[#070a12]/80 border border-white/[0.05] flex items-center justify-between text-xs font-mono"
                                >
                                  <div className="space-y-0.5 pr-2">
                                    <span className="text-slate-200 block font-sans text-xs">
                                      {sc.title}
                                    </span>
                                    {sc.credentialId && (
                                      <span className="text-[10px] text-slate-500">ID: {sc.credentialId}</span>
                                    )}
                                  </div>
                                  <div className="flex items-center space-x-2 shrink-0">
                                    {sc.verificationUrl && (
                                      <a
                                        href={sc.verificationUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-1.5 rounded-lg bg-surface-secondary text-slate-300 hover:text-cyan-300 border border-white/[0.08] transition-colors"
                                        title="Verify online"
                                      >
                                        <ExternalLink className="w-3.5 h-3.5" />
                                      </a>
                                    )}
                                    {sc.pdfUrl && (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setPreviewDoc({
                                            title: sc.title,
                                            url: sc.pdfUrl!,
                                            type: 'pdf',
                                          })
                                        }
                                        className="p-1.5 rounded-lg bg-surface-secondary text-slate-300 hover:text-cyan-300 border border-white/[0.08] transition-colors"
                                        title="View Certificate PDF"
                                      >
                                        <FileText className="w-3.5 h-3.5" />
                                      </button>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}

                    {/* Validated Skills Tags */}
                    <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                        Skills Verified by Credential
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {cert.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-[11px] font-mono bg-surface-primary text-slate-300 border border-white/[0.06]"
                          >
                            <CheckCircle2 className="w-3 h-3 text-cyan-300" />
                            <span>{skill}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2.5 pt-5 mt-4 border-t border-white/[0.06]">
                    {cert.verificationUrl && (
                      <a
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-cyan-300 text-[#070a12] text-xs font-mono font-semibold hover:bg-cyan-200 transition-colors shadow-sm"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Verify Credential</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}

                    {cert.certificatePdfUrl && (
                      <button
                        type="button"
                        onClick={() =>
                          setPreviewDoc({
                            title: cert.title,
                            url: cert.certificatePdfUrl!,
                            type: 'pdf',
                          })
                        }
                        className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl glass-panel hover:bg-white/[0.08] text-slate-200 hover:text-white text-xs font-mono border border-white/10 transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5 text-cyan-400" />
                        <span>View Document (PDF)</span>
                      </button>
                    )}

                    {cert.certificateImageUrl && (
                      <button
                        type="button"
                        onClick={() =>
                          setPreviewDoc({
                            title: cert.title,
                            url: cert.certificateImageUrl!,
                            type: 'image',
                          })
                        }
                        className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl glass-panel hover:bg-white/[0.08] text-slate-200 hover:text-white text-xs font-mono border border-white/10 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 text-emerald-400" />
                        <span>View Badge / Image</span>
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Document Lightbox / Preview Modal */}
      <AnimatePresence>
        {previewDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setPreviewDoc(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl glass-panel border border-white/[0.15] bg-[#0c1222] overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#070a12]/90">
                <div className="flex items-center space-x-2 text-sm font-mono text-white">
                  <ShieldCheck className="w-4 h-4 text-cyan-300" />
                  <span className="font-semibold truncate max-w-[500px]">{previewDoc.title}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <a
                    href={previewDoc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-xs font-mono text-cyan-300 hover:text-cyan-200 underline"
                  >
                    <span>Open in new tab</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <button
                    onClick={() => setPreviewDoc(null)}
                    className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                    aria-label="Close Preview"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 p-4 overflow-auto flex items-center justify-center min-h-[450px]">
                {previewDoc.type === 'image' ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={previewDoc.url}
                    alt={previewDoc.title}
                    className="max-h-[75vh] w-auto rounded-lg border border-white/10 shadow-lg object-contain"
                  />
                ) : (
                  <iframe
                    src={previewDoc.url}
                    title={previewDoc.title}
                    className="w-full h-[70vh] rounded-lg border border-white/10"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
