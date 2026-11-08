"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Cpu,
  Zap,
  ShieldCheck,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { MagneticButton } from "@/components/ui/MagneticButton";

const floatingBadges = [
  { label: "Next.js", icon: Zap, x: -30, y: 50, delay: 0 },
  { label: "TypeScript", icon: Code2, x: 190, y: -30, delay: 0.2 },
  { label: "Better Auth", icon: ShieldCheck, x: 260, y: 280, delay: 0.4 },
  { label: "Node.js", icon: Cpu, x: -30, y: 250, delay: 0.6 },
];

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      // Mouse coordinates relative to the hero section
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    const el = heroRef.current;
    if (el) {
      el.addEventListener("mousemove", handleMouseMove);
      el.addEventListener("mouseleave", handleMouseLeave);
    }
    return () => {
      if (el) {
        el.removeEventListener("mousemove", handleMouseMove);
        el.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [shouldReduceMotion]);

  // Headline words for animated reveal
  const headlineWords = [
    { text: "Turning", highlight: false },
    { text: "Ideas", highlight: false },
    { text: "Into", highlight: false },
    { text: "Digital", highlight: true },
    { text: "Experiences.", highlight: true },
  ];

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-[#0B0D12]"
    >
      {/* Background Grid and Radial Gradient */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />

      {/* Mouse-following desktop spotlight effect */}
      {!shouldReduceMotion && isHovering && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-500 opacity-60 hidden lg:block"
          style={{
            background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(194, 248, 0, 0.08), transparent 60%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Subtle Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-[rgba(194,248,0,0.04)] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-[rgba(0,242,254,0.03)] blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text Content & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Small Badge with Live Ping Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[rgba(194,248,0,0.3)] bg-[rgba(194,248,0,0.07)] text-[#C2F800] text-xs font-semibold uppercase tracking-wider mb-6 shadow-[0_0_15px_rgba(194,248,0,0.15)]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C2F800] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C2F800]" />
              </span>
              <span>FULL-STACK WEB DEVELOPER</span>
            </motion.div>

            {/* Main Headline with Staggered Word Reveal */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.08]">
              {headlineWords.map((word, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.15 + idx * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`inline-block mr-3 sm:mr-4 ${
                    word.highlight
                      ? "text-[#C2F800] drop-shadow-[0_0_35px_rgba(194,248,0,0.35)]"
                      : "text-white"
                  }`}
                >
                  {word.text}
                </motion.span>
              ))}
            </h1>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
              className="text-lg sm:text-xl text-[#94A3B8] max-w-2xl mb-8 leading-relaxed font-normal"
            >
              {siteConfig.developer.subheadline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              <MagneticButton
                href="#projects"
                variant="primary"
                size="lg"
                className="w-full sm:w-auto font-bold tracking-wide"
              >
                <span>Explore My Work</span>
                <ArrowDown className="w-4 h-4 stroke-[2.5]" />
              </MagneticButton>

              <MagneticButton
                variant="outline"
                size="lg"
                className="w-full sm:w-auto font-semibold"
              >
                <a href="/Naimur_Resume.pdf" download="Naimur_Resume.pdf">
                  Download Resume
                </a>

                <ArrowUpRight className="w-4 h-4 stroke-[2]" />
              </MagneticButton>
            </motion.div>

            {/* Quick Tech Highlights Pill row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-12 pt-6 border-t border-[rgba(255,255,255,0.06)] flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#64748B]"
            >
              <span className="text-[#94A3B8] font-mono uppercase tracking-wider">
                Primary Stack:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {[
                  "Next.js",
                  "React",
                  "TypeScript",
                  "Tailwind CSS",
                  "Node.js",
                  "MongoDB",
                  "Better Auth",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md bg-[#10141E] border border-[rgba(255,255,255,0.06)] text-[#E2E8F0] font-mono text-[11px]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Profile Visual Card with Glowing Ring & Floating Badges */}
          <div className="lg:col-span-5 flex justify-center items-center relative mt-6 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative w-72 sm:w-80 md:w-96 aspect-square"
            >
              {/* Outer Animated Glow Ring */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#C2F800]/20 via-transparent to-[#00F2FE]/20 blur-xl opacity-70 animate-pulse pointer-events-none" />

              {/* High-tech geometric frame */}
              <div className="relative w-full h-full rounded-3xl p-2 bg-gradient-to-b from-[rgba(194,248,0,0.3)] via-[rgba(255,255,255,0.08)] to-transparent border border-[rgba(255,255,255,0.12)] shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-md">
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#0D111A]">
                  <Image
                    src={siteConfig.developer.avatar}
                    alt={siteConfig.developer.avatarAlt}
                    fill
                    priority
                    sizes="(max-width: 768px) 320px, 400px"
                    className="object-cover object-center filter brightness-[0.95] contrast-[1.05] transition-transform duration-700 hover:scale-105"
                  />

                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12] via-transparent to-transparent opacity-60" />

                  {/* Corner Accent Marks */}
                  <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#C2F800]" />
                  <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#C2F800]" />
                  <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[#C2F800]" />
                  <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#C2F800]" />
                </div>
              </div>

              {/* Floating Technology Badges (Desktop & Tablet) */}
              {!shouldReduceMotion && (
                <>
                  {floatingBadges.map((badge, idx) => {
                    const Icon = badge.icon;
                    return (
                      <motion.div
                        key={badge.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          y: [0, -8, 0],
                        }}
                        transition={{
                          opacity: { duration: 0.5, delay: 0.6 + badge.delay },
                          scale: { duration: 0.5, delay: 0.6 + badge.delay },
                          y: {
                            duration: 3 + idx * 0.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            repeatType: "mirror",
                            delay: idx * 0.3,
                          },
                        }}
                        style={{
                          left: `${badge.x}px`,
                          top: `${badge.y}px`,
                        }}
                        className="hidden sm:flex absolute z-20 items-center gap-2 px-3 py-1.5 rounded-xl bg-[#10141E]/90 border border-[rgba(255,255,255,0.12)] shadow-[0_10px_25px_rgba(0,0,0,0.6)] backdrop-blur-md text-xs font-semibold text-white hover:border-[#C2F800] transition-colors"
                      >
                        <div className="w-5 h-5 rounded-md bg-[#1A2234] flex items-center justify-center text-[#C2F800]">
                          <Icon className="w-3 h-3" />
                        </div>
                        <span>{badge.label}</span>
                      </motion.div>
                    );
                  })}
                </>
              )}

              {/* Status indicator pill positioned at bottom */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.85 }}
                className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#10141E]/95 border border-[rgba(194,248,0,0.3)] shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-md whitespace-nowrap text-xs font-medium text-white"
              >
                <span className="w-2 h-2 rounded-full bg-[#C2F800] animate-pulse shadow-[0_0_10px_#C2F800]" />
                <span>{siteConfig.developer.availability}</span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator at bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-16 sm:mt-20 flex flex-col items-center justify-center"
        >
          <a
            href="#about"
            className="flex flex-col items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#64748B] hover:text-[#C2F800] transition-colors group focus:outline-none"
            aria-label="Scroll down to About section"
          >
            <span>Explore Experience</span>
            <div className="w-5 h-8 rounded-full border border-[rgba(255,255,255,0.15)] flex items-start justify-center p-1 group-hover:border-[#C2F800] transition-colors">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-1.5 h-1.5 rounded-full bg-[#C2F800]"
              />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
