"use client";

import { motion } from "framer-motion";
import { Code, Server, Layers, Rocket, Compass, LucideIcon } from "lucide-react";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

const milestoneIcons: Record<string, LucideIcon> = {
  Code,
  Server,
  Layers,
  Rocket,
  Compass,
};

export function JourneySection() {
  return (
    <section id="journey" className="relative py-24 sm:py-32 bg-[#0B0D12] overflow-hidden">
      {/* Background Dots Texture */}
      <div className="absolute inset-0 bg-dots-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-[rgba(0,242,255,0.03)] blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Evolution & Progression"
          title="The Developer"
          highlight="Journey."
          subtitle="From understanding web fundamentals to architecting production apps and aiming for software entrepreneurship."
        />

        {/* Vertical Connected Nodes Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Continuous Glowing Center Line (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 bg-gradient-to-b from-[#00F2FF] via-[rgba(0,242,255,0.3)] to-transparent" />

          {/* Continuous Left Line (Mobile) */}
          <div className="md:hidden absolute left-5 top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#00F2FF] via-[rgba(0,242,255,0.3)] to-transparent" />

          {/* Timeline Nodes */}
          <div className="space-y-12 sm:space-y-16">
            {siteConfig.journey.map((item, index) => {
              const phaseNumber = parseInt(item.step, 10);
              // Odd phases (Phase 01, 03, 05) on the LEFT of the center line
              // Even phases (Phase 02, 04) on the RIGHT of the center line
              const isOddPhase = phaseNumber % 2 !== 0;
              const IconComponent = milestoneIcons[item.icon] || Code;

              const cardContent = (
                <motion.div
                  initial={{ opacity: 0, x: isOddPhase ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={`pl-14 ${
                    isOddPhase
                      ? "md:pl-0 md:pr-12 md:text-left"
                      : "md:pl-12 md:pr-0 md:text-left"
                  }`}
                >
                  <SpotlightCard
                    enableTilt={true}
                    className="p-6 sm:p-7 border-[rgba(255,255,255,0.08)] hover:border-[rgba(0,242,255,0.3)] group text-left"
                  >
                    {/* Milestone Step & Focus */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold text-[#00F2FF] bg-[rgba(0,242,255,0.1)] px-2.5 py-0.5 rounded-md border border-[rgba(0,242,255,0.25)]">
                        PHASE {item.step}
                      </span>
                      <span className="text-xs font-mono text-[#64748B]">
                        {item.period}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-[#151C2A] flex items-center justify-center text-[#00F2FF] shrink-0">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#00F2FF] transition-colors">
                        {item.title}
                      </h3>
                    </div>

                    {/* Sub Focus */}
                    <p className="text-xs font-mono text-[#94A3B8] mb-3">
                      Key Focus: <span className="text-white font-medium">{item.focus}</span>
                    </p>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[rgba(255,255,255,0.06)]">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded bg-[#151C2A] text-[11px] font-mono text-[#94A3B8]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </SpotlightCard>
                </motion.div>
              );

              const emptySpacer = <div className="hidden md:block" aria-hidden="true" />;

              return (
                <div key={item.step} className="relative">
                  {/* Node Marker Dot */}
                  <div className="absolute left-5 md:left-1/2 -translate-x-1/2 top-6 z-20 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-[#0B0D12] border-2 border-[#00F2FF] flex items-center justify-center shadow-[0_0_15px_rgba(0,242,255,0.6)]">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#00F2FF]" />
                    </div>
                  </div>

                  {/* 2-Column Grid on Desktop: Column 1 is LEFT of center line, Column 2 is RIGHT of center line */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {isOddPhase ? (
                      <>
                        {/* Odd Phase (01, 03, 05) on the LEFT (Col 1) */}
                        {cardContent}
                        {emptySpacer}
                      </>
                    ) : (
                      <>
                        {/* Even Phase (02, 04) on the RIGHT (Col 2) */}
                        {emptySpacer}
                        {cardContent}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
