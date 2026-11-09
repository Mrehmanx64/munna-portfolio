"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, CheckCircle2, Layers } from "lucide-react";
import { ProjectItem } from "@/types";
import { MagneticButton } from "@/components/ui/MagneticButton";

interface ProjectModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
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
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0D111A] border border-[rgba(255,255,255,0.12)] shadow-[0_25px_60px_rgba(0,0,0,0.9)] z-10 custom-scrollbar"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#151C2A]/90 border border-[rgba(255,255,255,0.1)] text-[#94A3B8] hover:text-white hover:border-[#00F2FF] transition-colors focus:outline-none"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Project Image Header */}
            <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden bg-[#07090E]">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D111A] via-transparent to-transparent opacity-90" />

              {/* Status pill badge on top of image */}
              <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D111A]/90 border border-[rgba(255,255,255,0.1)] backdrop-blur-md text-xs font-semibold">
                <span
                  className={`w-2 h-2 rounded-full ${
                    project.status === "live"
                      ? "bg-[#00F2FF] animate-pulse"
                      : "bg-[#00F2FE]"
                  }`}
                />
                <span className="text-white">{project.statusLabel}</span>
              </div>
            </div>

            {/* Modal Content */}
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
                  Key Features & Capabilities
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
                  Architecture & Technologies
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
                      className="font-bold tracking-wide"
                    >
                      <span>Launch Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
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
