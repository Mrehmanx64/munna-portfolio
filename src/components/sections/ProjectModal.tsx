"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  CheckCircle2,
  Layers,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
} from "lucide-react";
import { ProjectItem } from "@/types";
import { MagneticButton } from "@/components/ui/MagneticButton";

interface ProjectModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

export function ProjectModal({
  project,
  isOpen,
  onClose,
  initialIndex = 0,
}: ProjectModalProps) {
  const [activeIdx, setActiveIdx] = useState(initialIndex);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (!project?.screenshots) return;
      if (e.key === "ArrowLeft") {
        setActiveIdx((prev) => (prev > 0 ? prev - 1 : project.screenshots!.length - 1));
      } else if (e.key === "ArrowRight") {
        setActiveIdx((prev) => (prev < project.screenshots!.length - 1 ? prev + 1 : 0));
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("modal-open");
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.style.overflow = "unset";
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, project]);

  if (!project) return null;

  const screenshots = project.screenshots && project.screenshots.length > 0
    ? project.screenshots
    : [{ title: project.title, image: project.image, caption: project.tagline }];

  const currentScreenshot = screenshots[activeIdx] || screenshots[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev > 0 ? prev - 1 : screenshots.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev < screenshots.length - 1 ? prev + 1 : 0));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#07090E]/85 backdrop-blur-xl"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="relative w-full max-w-5xl my-auto max-h-[88vh] overflow-y-auto rounded-3xl bg-[#0D111A] border border-[rgba(255,255,255,0.12)] shadow-[0_25px_60px_rgba(0,0,0,0.95)] z-10 custom-scrollbar"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-[#151C2A]/90 border border-[rgba(255,255,255,0.12)] text-[#94A3B8] hover:text-white hover:border-[#00F2FF] transition-all focus:outline-none shadow-lg"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* ── PROJECT SCREENSHOT VIEWER & CAROUSEL HEADER ── */}
            <div className="relative w-full bg-[#080B12] border-b border-[rgba(255,255,255,0.08)]">
              {/* Main Active Image Viewport */}
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[500px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentScreenshot.image}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={currentScreenshot.image}
                      alt={currentScreenshot.title}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 1200px) 100vw, 1024px"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Ambient Top & Bottom Gradients */}
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0B0D12]/80 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0D111A] via-[#0D111A]/60 to-transparent pointer-events-none" />

                {/* Status Badge (Top Left) */}
                <div className="absolute top-4 left-4 z-20 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D111A]/90 border border-[rgba(255,255,255,0.12)] backdrop-blur-md text-xs font-semibold shadow-lg">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      project.status === "live"
                        ? "bg-[#00F2FF] animate-pulse shadow-[0_0_8px_#00F2FF]"
                        : "bg-[#00F2FE]"
                    }`}
                  />
                  <span className="text-white">{project.statusLabel}</span>
                </div>

                {/* Screen Counter (Top Center/Right) */}
                {screenshots.length > 1 && (
                  <div className="absolute top-4 right-16 z-20 hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0D111A]/90 border border-[rgba(255,255,255,0.12)] backdrop-blur-md text-xs font-mono text-[#CBD5E1] shadow-lg">
                    <ImageIcon className="w-3.5 h-3.5 text-[#00F2FF]" />
                    <span>
                      {activeIdx + 1} / {screenshots.length} Screens
                    </span>
                  </div>
                )}

                {/* Prev / Next Navigation Arrows */}
                {screenshots.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-[#070A10]/80 border border-white/10 text-white/80 hover:text-white hover:border-[#00F2FF] hover:bg-[#070A10] transition-all backdrop-blur-md shadow-xl"
                      aria-label="Previous screenshot"
                    >
                      <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-[#070A10]/80 border border-white/10 text-white/80 hover:text-white hover:border-[#00F2FF] hover:bg-[#070A10] transition-all backdrop-blur-md shadow-xl"
                      aria-label="Next screenshot"
                    >
                      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                  </>
                )}

                {/* Caption Banner (Bottom of preview) */}
                <div className="absolute bottom-3 left-4 right-4 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-1 pointer-events-none">
                  <div>
                    <span className="font-bold text-white text-sm sm:text-base drop-shadow-md">
                      {currentScreenshot.title}
                    </span>
                    {currentScreenshot.caption && (
                      <p className="text-xs text-[#94A3B8] font-mono drop-shadow-md">
                        {currentScreenshot.caption}
                      </p>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-[#00F2FF] uppercase tracking-wider self-start sm:self-auto">
                    Screen {activeIdx + 1} of {screenshots.length}
                  </span>
                </div>
              </div>

              {/* Thumbnail Strip Gallery Selector */}
              {screenshots.length > 1 && (
                <div className="p-3 sm:p-4 bg-[#0A0E17]/90 border-t border-[rgba(255,255,255,0.06)] overflow-x-auto custom-scrollbar">
                  <div className="flex items-center gap-3 min-w-max">
                    {screenshots.map((s, idx) => {
                      const isActive = idx === activeIdx;
                      return (
                        <button
                          key={s.image}
                          type="button"
                          onClick={() => setActiveIdx(idx)}
                          className={`relative group flex items-center gap-2.5 p-1.5 rounded-xl border text-left transition-all duration-200 ${
                            isActive
                              ? "bg-[#141C2B] border-[#00F2FF] shadow-[0_0_15px_rgba(0,242,255,0.3)] ring-1 ring-[#00F2FF]"
                              : "bg-[#0D121D]/60 border-white/[0.08] hover:border-white/20 hover:bg-[#141C2B]/50"
                          }`}
                        >
                          <div className="relative w-16 sm:w-20 aspect-[16/10] rounded-lg overflow-hidden shrink-0 bg-black/40">
                            <Image
                              src={s.image}
                              alt={s.title}
                              fill
                              className="object-cover object-top"
                              sizes="80px"
                            />
                            {isActive && (
                              <div className="absolute inset-0 bg-[#00F2FF]/10 pointer-events-none" />
                            )}
                          </div>
                          <div className="pr-2 max-w-[150px] sm:max-w-[180px]">
                            <div
                              className={`text-[11px] font-semibold truncate ${
                                isActive ? "text-[#00F2FF]" : "text-white/80 group-hover:text-white"
                              }`}
                            >
                              {s.title}
                            </div>
                            <div className="text-[9px] font-mono text-[#64748B] truncate">
                              Screen 0{idx + 1}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* ── MODAL CONTENT DETAILS ── */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Title & Tagline */}
              <div>
                <div className="flex flex-wrap items-baseline gap-3 mb-2">
                  <h3 id="modal-title" className="text-2xl sm:text-3xl font-extrabold text-white">
                    {project.title}
                  </h3>
                  {project.nativeTitle && (
                    <span className="text-xl sm:text-2xl font-bold text-[#00F2FF]">
                      ({project.nativeTitle})
                    </span>
                  )}
                </div>
                <p className="text-base text-[#00F2FF] font-medium">
                  {project.tagline}
                </p>
              </div>

              {/* Full Description */}
              <div className="space-y-3">
                <h4 className="text-sm font-mono uppercase tracking-wider text-[#94A3B8]">
                  Project Overview
                </h4>
                <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
                  {project.longDescription}
                </p>
              </div>

              {/* Key Features */}
              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-mono uppercase tracking-wider text-[#94A3B8]">
                  Key Features &amp; Capabilities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#131926] border border-[rgba(255,255,255,0.06)] flex items-start gap-2.5 text-xs sm:text-sm text-[#E2E8F0]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#00F2FF] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Architecture & Tech Stack Grid */}
              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-mono uppercase tracking-wider text-[#94A3B8]">
                  Architecture &amp; Technologies
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {project.techStackDetails.map((group) => (
                    <div
                      key={group.category}
                      className="p-4 rounded-xl bg-[#10141E] border border-[rgba(255,255,255,0.08)]"
                    >
                      <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-[#00F2FF]">
                        <Layers className="w-3.5 h-3.5" />
                        <span>{group.category}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {group.items.map((item) => (
                          <span
                            key={item}
                            className="text-xs px-2 py-0.5 rounded bg-[#182030] text-[#CBD5E1] font-mono"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-4 border-t border-[rgba(255,255,255,0.08)] flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-[#64748B]">
                  <span>Status:</span>
                  <span className="text-white font-mono">{project.statusLabel}</span>
                </div>

                <div className="flex items-center gap-3">
                  {project.liveUrl ? (
                    <MagneticButton
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="primary"
                      size="sm"
                      className="font-bold tracking-wide shadow-[0_0_20px_rgba(0,242,255,0.3)]"
                    >
                      <span>Launch Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
                    </MagneticButton>
                  ) : (
                    <div className="px-4 py-2 rounded-xl bg-[#141A26] border border-[rgba(255,255,255,0.08)] text-xs font-mono text-[#94A3B8]">
                      Active Development Prototype
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl bg-[#151C2A] text-white hover:bg-[#1C2538] text-xs font-semibold border border-[rgba(255,255,255,0.08)] transition-colors"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
