"use client";

import { motion } from "framer-motion";
import { Code2, Sparkles, Compass, Lightbulb, CheckCircle2, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export function AboutSection() {
  const pillars = [
    {
      icon: Code2,
      title: "Full-Stack Web Engineering",
      description:
        "Building end-to-end applications where frontend responsiveness harmonizes with type-safe backend architectures using Next.js, Node.js, and MongoDB.",
      highlight: "Clean Code & Architecture",
    },
    {
      icon: Sparkles,
      title: "Thoughtful UI & Motion Design",
      description:
        "Obsessed with responsive precision, accessible semantics, smooth micro-interactions, and dark aesthetics that feel tactile and responsive.",
      highlight: "Pixel-Level Craft",
    },
    {
      icon: Compass,
      title: "Building an Independent Venture",
      description:
        "Driven by a foundational goal: to establish and scale an independent software company creating utility-focused SaaS and digital tools.",
      highlight: "Founder Mindset",
    },
  ];

  const focusPoints = [
    "Full-Stack mastery with Next.js App Router & TypeScript",
    "Modern, type-safe authentication architectures with Better Auth",
    "Clean REST API design & document modeling with Mongoose",
    "Performance optimization, SEO standards & Core Web Vitals",
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32 bg-[#07090E] overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[rgba(0,242,255,0.03)] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[rgba(0,242,254,0.02)] blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="About The Developer"
          title="Driven by Curiosity,"
          highlight="Focused on Impact."
          subtitle="A full-stack builder translating complex problems into elegant, accessible, and performant web products."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column: Narrative & Values */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Intro paragraph */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#10141E]/80 border border-[rgba(255,255,255,0.08)] relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#00F2FF]" />
              <p className="text-xl sm:text-2xl font-semibold text-white leading-snug mb-4">
                &ldquo;{siteConfig.developer.about.intro}&rdquo;
              </p>
              <p className="text-[#94A3B8] leading-relaxed text-base">
                {siteConfig.developer.about.journey}
              </p>
            </div>

            {/* Design & UI Approach */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#10141E]/50 border border-[rgba(255,255,255,0.06)] backdrop-blur-md">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-[#00F2FF]" />
                <span>My Approach to UI & Architecture</span>
              </h3>
              <p className="text-[#94A3B8] leading-relaxed text-base mb-6">
                {siteConfig.developer.about.designPhilosophy}
              </p>

              {/* Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {focusPoints.map((point) => (
                  <div key={point} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#E2E8F0]">
                    <CheckCircle2 className="w-4 h-4 text-[#00F2FF] shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Long-term vision */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#10141E] to-[#151C2C] border border-[rgba(0,242,255,0.25)] flex items-start gap-4 shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
              <div className="w-10 h-10 rounded-xl bg-[rgba(0,242,255,0.1)] border border-[rgba(0,242,255,0.3)] flex items-center justify-center text-[#00F2FF] shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white mb-1">
                  The Founder Vision
                </h4>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  {siteConfig.developer.about.founderVision}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Three Interactive Pillars */}
          <div className="lg:col-span-5 space-y-4">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <SpotlightCard
                  key={pillar.title}
                  enableTilt={true}
                  className="p-6 sm:p-7 border border-[rgba(255,255,255,0.08)] hover:border-[rgba(0,242,255,0.3)] transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#151B28] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[#00F2FF] transition-colors group-hover:bg-[#00F2FF] group-hover:text-[#0B0D12] shadow-[0_0_15px_rgba(0,242,255,0.1)]">
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#10141E] border border-[rgba(255,255,255,0.06)] text-[#94A3B8] group-hover:text-[#00F2FF] group-hover:border-[rgba(0,242,255,0.3)] transition-colors">
                      {pillar.highlight}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00F2FF] transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    {pillar.description}
                  </p>
                </SpotlightCard>
              );
            })}

            {/* Quick Action Link to Projects */}
            <div className="pt-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#00F2FF] hover:text-[#D5FF26] group"
              >
                <span>See these principles applied in my projects</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
