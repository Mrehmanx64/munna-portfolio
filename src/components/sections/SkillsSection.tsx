"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Atom,
  Code2,
  Palette,
  FileCode,
  Layout,
  Layers,
  Server,
  Cpu,
  Workflow,
  Database,
  HardDrive,
  ShieldCheck,
  GitBranch,
  Terminal,
  Sparkles,
  LucideIcon,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { SkillCategory } from "@/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { GithubIcon } from "@/components/ui/Icons";

// Mapping icon names to Lucide icons or custom SVG
const iconMap: Record<string, LucideIcon | React.ComponentType<{ className?: string }>> = {
  Zap,
  Atom,
  Code2,
  Palette,
  FileCode,
  Layout,
  Layers,
  Server,
  Cpu,
  Workflow,
  Database,
  HardDrive,
  ShieldCheck,
  GitBranch,
  Github: GithubIcon,
  Terminal,
  Sparkles,
};

const categories: { key: SkillCategory; label: string }[] = [
  { key: "all", label: "All Technologies" },
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "database", label: "Database" },
  { key: "auth", label: "Authentication" },
  { key: "tools", label: "Tools & Workflow" },
];

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("all");

  const filteredSkills =
    activeCategory === "all"
      ? siteConfig.skills
      : siteConfig.skills.filter((skill) => skill.category === activeCategory);

  return (
    <section id="skills" className="relative py-24 sm:py-32 bg-[#0B0D12] overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[rgba(194,248,0,0.03)] blur-[130px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Technical Expertise"
          title="Engineered with"
          highlight="Modern Standards."
          subtitle="A focused, modern technology stack honed through hands-on product engineering, real APIs, and clean code principles."
        />

        {/* Interactive Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveCategory(cat.key)}
                className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F2FF] ${
                  isActive
                    ? "text-[#0B0D12] shadow-[0_0_20px_rgba(194,248,0,0.35)]"
                    : "text-[#94A3B8] hover:text-white bg-[#10141E]/80 border border-[rgba(255,255,255,0.08)] hover:border-[rgba(194,248,0,0.2)]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSkillTab"
                    className="absolute inset-0 bg-[#00F2FF] rounded-xl"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => {
              const IconComponent = iconMap[skill.iconName] || Code2;
              return (
                <motion.div
                  layout
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{
                    duration: 0.4,
                    delay: Math.min(index * 0.04, 0.3),
                    ease: "easeOut",
                  }}
                >
                  <SpotlightCard
                    enableTilt={true}
                    className="h-full p-5 sm:p-6 flex flex-col justify-between group transition-all duration-300 border-[rgba(255,255,255,0.08)] hover:border-[rgba(194,248,0,0.4)]"
                  >
                    <div>
                      {/* Top Header: Icon & Category Label */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-11 h-11 rounded-xl bg-[#151C2A] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[#00F2FF] group-hover:bg-[#00F2FF] group-hover:text-[#0B0D12] group-hover:shadow-[0_0_20px_rgba(194,248,0,0.4)] transition-all duration-300">
                          <IconComponent className="w-5 h-5 stroke-[2]" />
                        </div>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#64748B] group-hover:text-[#94A3B8] transition-colors">
                          {skill.categoryLabel}
                        </span>
                      </div>

                      {/* Title */}
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#00F2FF] transition-colors">
                          {skill.name}
                        </h3>
                        {skill.highlight && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FF] shadow-[0_0_8px_#00F2FF]" />
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                        {skill.description}
                      </p>
                    </div>

                    {/* Subtle Bottom Accent Indicator */}
                    <div className="mt-4 pt-3 border-t border-[rgba(255,255,255,0.05)] flex items-center justify-between text-[11px] font-mono text-[#64748B]">
                      <span>Ready in stack</span>
                      <span className="text-[#00F2FF] opacity-0 group-hover:opacity-100 transition-opacity">
                        Active
                      </span>
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
