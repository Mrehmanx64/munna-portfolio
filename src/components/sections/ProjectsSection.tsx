"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Layers,
  ArrowUpRight,
  Check,
  ImageIcon,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { ProjectItem } from "@/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ProjectModal } from "@/components/sections/ProjectModal";

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [initialScreenshotIdx, setInitialScreenshotIdx] = useState(0);

  const handleOpenDetails = (project: ProjectItem, screenshotIdx: number = 0) => {
    setSelectedProject(project);
    setInitialScreenshotIdx(screenshotIdx);
    setModalOpen(true);
  };

  return (
    <section id="projects" className="relative py-24 sm:py-32 bg-[#07090E] overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[rgba(0,242,255,0.03)] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-[rgba(0,242,254,0.02)] blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Featured Engineering"
          title="Crafted Projects &"
          highlight="Real Solutions."
          subtitle="Explore concrete web applications built to address real-world problems with modern technologies and human-centered design."
        />

        {/* Projects Grid */}
        <div className="space-y-16 lg:space-y-24">
          {siteConfig.projects.map((project, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <SpotlightCard
                  enableTilt={false}
                  className="p-6 sm:p-8 lg:p-10 border-[rgba(255,255,255,0.08)] hover:border-[rgba(0,242,255,0.35)] shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
                >
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                      isReversed ? "lg:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Visual Screenshot Preview (7 cols) */}
                    <div
                      className={`lg:col-span-7 ${
                        isReversed ? "lg:order-2" : "lg:order-1"
                      }`}
                    >
                      <div className="group relative rounded-2xl overflow-hidden bg-[#0A0D15] border border-[rgba(255,255,255,0.1)] shadow-2xl">
                        {/* Aspect Ratio Container */}
                        <div
                          onClick={() => handleOpenDetails(project, 0)}
                          className="relative w-full aspect-[16/10] overflow-hidden cursor-pointer"
                        >
                          <Image
                            src={project.image}
                            alt={`${project.title} Preview`}
                            fill
                            sizes="(max-width: 1024px) 100vw, 650px"
                            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                          />

                          {/* Subtle Dark Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12] via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-300" />

                          {/* Hover action overlay */}
                          <div className="absolute inset-0 bg-[#0B0D12]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00F2FF] text-[#0B0D12] text-xs font-bold shadow-[0_0_20px_rgba(0,242,255,0.6)] transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                              <span>Explore Project Gallery &amp; Details</span>
                              <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
                            </span>
                          </div>

                          {/* Top Status Tag */}
                          <div className="absolute top-3.5 left-3.5 z-10 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B0D12]/90 border border-[rgba(255,255,255,0.12)] backdrop-blur-md text-[11px] font-semibold text-white shadow-lg">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                project.status === "live"
                                  ? "bg-[#00F2FF] animate-pulse shadow-[0_0_8px_#00F2FF]"
                                  : "bg-[#00F2FE]"
                              }`}
                            />
                            <span>{project.statusLabel}</span>
                          </div>

                          {/* Top Right Screen Count Badge */}
                          {project.screenshots && project.screenshots.length > 1 && (
                            <div className="absolute top-3.5 right-3.5 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0B0D12]/90 border border-[rgba(255,255,255,0.12)] backdrop-blur-md text-[10px] font-mono font-medium text-[#CBD5E1] shadow-lg">
                              <ImageIcon className="w-3 h-3 text-[#00F2FF]" />
                              <span>{project.screenshots.length} Screens</span>
                            </div>
                          )}
                        </div>

                        {/* Interactive Screen Preview Strip */}
                        {project.screenshots && project.screenshots.length > 1 && (
                          <div className="flex flex-wrap items-center gap-1.5 px-3 py-2 bg-[#080B12] border-t border-white/[0.06]">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748B] mr-1 hidden sm:inline">
                              Gallery:
                            </span>
                            {project.screenshots.map((screen, sIdx) => (
                              <button
                                key={screen.image}
                                type="button"
                                onClick={() => handleOpenDetails(project, sIdx)}
                                className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] border border-white/[0.08] text-[#94A3B8] hover:text-[#00F2FF] hover:border-[#00F2FF]/40 hover:bg-[#00F2FF]/[0.06] transition-all"
                              >
                                {screen.title.split(" ")[0]} • 0{sIdx + 1}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Content Details (5 cols) */}
                    <div
                      className={`lg:col-span-5 flex flex-col justify-between ${
                        isReversed ? "lg:order-1" : "lg:order-2"
                      }`}
                    >
                      <div>
                        {/* Number & Badge */}
                        <div className="flex items-center gap-3 mb-3">
                          <span className="font-mono text-xs text-[#00F2FF] tracking-widest uppercase">
                            0{index + 1} • FEATURED
                          </span>
                        </div>

                        {/* Project Title */}
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 flex items-baseline gap-2">
                          <span>{project.title}</span>
                          {project.nativeTitle && (
                            <span className="text-xl font-bold text-[#00F2FF]">
                              ({project.nativeTitle})
                            </span>
                          )}
                        </h3>

                        {/* Tagline */}
                        <p className="text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-4">
                          {project.tagline}
                        </p>

                        {/* Description */}
                        <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed mb-6">
                          {project.description}
                        </p>

                        {/* Feature Highlights */}
                        <div className="space-y-2 mb-6">
                          {project.features.slice(0, 3).map((feat, fIdx) => (
                            <div
                              key={fIdx}
                              className="flex items-start gap-2 text-xs sm:text-sm text-[#94A3B8]"
                            >
                              <Check className="w-4 h-4 text-[#00F2FF] shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-8">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 text-xs font-mono rounded-lg bg-[#141A26] border border-[rgba(255,255,255,0.06)] text-[#94A3B8]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Links */}
                      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[rgba(255,255,255,0.08)]">
                        {project.liveUrl && (
                          <MagneticButton
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="primary"
                            size="sm"
                            className="font-bold tracking-wide shadow-[0_0_20px_rgba(0,242,255,0.3)]"
                          >
                            <span>Live App</span>
                            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                          </MagneticButton>
                        )}

                        <button
                          type="button"
                          onClick={() => handleOpenDetails(project, 0)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#151C2A] text-white hover:bg-[#1D2638] text-xs font-semibold border border-[rgba(255,255,255,0.1)] hover:border-[#00F2FF] transition-colors"
                        >
                          <Layers className="w-3.5 h-3.5 text-[#00F2FF]" />
                          <span>View Screens &amp; Details</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Interactive Project Modal */}
      <ProjectModal
        key={`${selectedProject?.id ?? "none"}-${initialScreenshotIdx}`}
        project={selectedProject}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialIndex={initialScreenshotIdx}
      />
    </section>
  );
}
