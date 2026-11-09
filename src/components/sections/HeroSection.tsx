"use client";

import { useRef, useEffect, useState, type RefObject } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useMotionValue, useTransform, animate } from "framer-motion";
import { ArrowDown, ArrowUpRight, Cpu, Sparkles, Code2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { MagneticButton } from "@/components/ui/MagneticButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function AnimatedNumber({ value }: { value: string }) {
  const numericValue = parseInt(value);
  const suffix = value.replace(/[0-9]/g, '');
  const count = useMotionValue(0);
  const display = useTransform(count, (latest) => Math.floor(latest));

  useEffect(() => {
    const controls = animate(0, numericValue, {
      duration: 2,
      onUpdate: (latest) => count.set(latest),
    });
    return () => controls.stop();
  }, [numericValue, count]);

  return (
    <span>
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}

gsap.registerPlugin(ScrollTrigger);

const PHRASES = [
  ["FULL", "STACK"],
  ["WEB", "DEVELOPER"],
  ["MERN", "STACK"],
  ["CREATIVE", "MINDSET"],
  ["CLEAN", "CODE"],
  ["REACT", "NODE"],
  ["DIGITAL", "BUILDER"],
  ["PROBLEM", "SOLVER"],
];

const STATS = [
  {
    value: "2+",
    label: "Years Experience",
    short: "Experience",
    detail: "Building web apps",
    icon: Cpu,
  },
  {
    value: "5+",
    label: "Shipped Projects",
    short: "Projects",
    detail: "Production apps",
    icon: Sparkles,
  },
  {
    value: "100%",
    label: "MERN Stack",
    short: "MERN Stack",
    detail: "Clean architecture",
    icon: Code2,
  },
];

const TECH = [
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "MongoDB",
  "TypeScript",
];

/* ─────────────────────────────────────────────────────────────
   Glitch phrase cycling — shared by the desktop + mobile stages.
   Only the stage that is actually visible animates.
   ───────────────────────────────────────────────────────────── */
function usePhraseCycle(
  topRef: RefObject<HTMLSpanElement | null>,
  botRef: RefObject<HTMLSpanElement | null>,
  active: boolean,
  reduced: boolean | null,
) {
  const idxRef = useRef(0);

  useEffect(() => {
    const topEl = topRef.current;
    const botEl = botRef.current;
    if (!active || !topEl || !botEl) return;

    // Reduced motion: show a static phrase instead of an empty backdrop
    if (reduced) {
      topEl.textContent = PHRASES[0][0];
      botEl.textContent = PHRASES[0][1];
      return;
    }

    const glitchIn = (el: HTMLSpanElement, text: string) => {
      el.textContent = text;
      gsap.fromTo(
        el,
        {
          autoAlpha: 0,
          skewX: 10,
          scale: 0.95,
          filter: "blur(10px) brightness(2.2)",
          y: 14,
        },
        {
          autoAlpha: 1,
          skewX: 0,
          scale: 1,
          filter: "blur(0px) brightness(1)",
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
      );
    };

    const glitchOut = (el: HTMLSpanElement, onComplete: () => void) => {
      gsap.to(el, {
        autoAlpha: 0,
        skewX: -10,
        scale: 1.05,
        filter: "blur(8px) brightness(1.8)",
        y: -10,
        duration: 0.3,
        ease: "power2.in",
        onComplete,
      });
    };

    const cyclePhrase = () => {
      const next = (idxRef.current + 1) % PHRASES.length;
      idxRef.current = next;
      const [top, bot] = PHRASES[next];
      glitchOut(topEl, () => glitchIn(topEl, top));
      gsap.delayedCall(0.08, () =>
        glitchOut(botEl, () => glitchIn(botEl, bot)),
      );
    };

    glitchIn(topEl, PHRASES[idxRef.current][0]);
    glitchIn(botEl, PHRASES[idxRef.current][1]);

    const intervalId = setInterval(cyclePhrase, 2800);

    return () => {
      clearInterval(intervalId);
      gsap.killTweensOf([topEl, botEl]);
    };
  }, [active, reduced, topRef, botRef]);
}

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  // desktop backdrop words
  const topWordRef = useRef<HTMLSpanElement>(null);
  const bottomWordRef = useRef<HTMLSpanElement>(null);
  // phone / tablet backdrop words
  const mTopWordRef = useRef<HTMLSpanElement>(null);
  const mBotWordRef = useRef<HTMLSpanElement>(null);

  // Which stage is visible (matches Tailwind `lg` = 1024px)
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  usePhraseCycle(topWordRef, bottomWordRef, isDesktop, shouldReduceMotion);
  usePhraseCycle(mTopWordRef, mBotWordRef, !isDesktop, shouldReduceMotion);

  // ── Pointer parallax on desktop backdrop (original) ───────────────────
  useEffect(() => {
    if (shouldReduceMotion) return;
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;
    const onMove = (e: PointerEvent) => {
      if (!backdropRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 8;
      gsap.to(backdropRef.current, {
        x,
        y,
        duration: 0.6,
        ease: "power2.out",
        overwrite: "auto",
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [shouldReduceMotion]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 65%, rgba(75,83,91,.18), transparent 38%), linear-gradient(135deg,#0f1014 0%,#0B0D12 52%,#13141a 100%)",
      }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.045) 1px,transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "linear-gradient(to bottom,transparent 0%,#000 12%,#000 80%,transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom,transparent 0%,#000 12%,#000 80%,transparent 100%)",
          opacity: 0.5,
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* Ambient orbs */}
      <div
        className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full bg-[rgba(90,123,140,.12)] blur-[90px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-[rgba(0,242,255,.05)] blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      {/* ═══════════════ DESKTOP (unchanged) ═══════════════ */}
      <div
        className="hidden lg:flex relative w-full h-full mx-auto px-4 sm:px-6 md:px-10 min-h-screen flex-col justify-center"
        style={{ zIndex: 1 }}
      >
        {/* LAYER 1: backdrop cycling phrases */}
        <div
          ref={backdropRef}
          className="absolute w-full left-0 right-0 text-center font-extrabold pointer-events-none select-none px-4 sm:px-6"
          style={{
            top: "50%",
            transform: "translateY(-50%)",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            lineHeight: 0.72,
            letterSpacing: "-0.085em",
            zIndex: 1,
            filter: "blur(1.5px)",
            opacity: 0.75,
          }}
          aria-hidden="true"
        >
          <span
            ref={topWordRef}
            className="block whitespace-nowrap"
            style={{
              fontSize: "clamp(90px, 18vw, 270px)",
              color: "rgba(210,228,235,0.88)",
              textShadow:
                "0 0 18px rgba(0,242,255,0.55), 0 0 50px rgba(0,242,255,0.28), 0 0 110px rgba(0,242,255,0.14), 0 0 220px rgba(0,242,255,0.07)",
            }}
          />
          <span
            ref={bottomWordRef}
            className="block whitespace-nowrap"
            style={{
              fontSize: "clamp(95px, 19vw, 285px)",
              color: "transparent",
              WebkitTextStroke: "1px rgba(0,242,255,0.28)",
              textShadow:
                "0 0 35px rgba(0,242,255,0.18), 0 0 90px rgba(0,242,255,0.08)",
            }}
          />
        </div>

        {/* LAYER 1.5: depth vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 2,
            background:
              "radial-gradient(ellipse 55% 70% at 50% 60%, transparent 30%, rgba(11,13,18,0.52) 68%, rgba(11,13,18,0.82) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Portrait + environmental lighting */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 hidden md:flex items-end justify-center pointer-events-none"
          style={{ height: "100vh", width: "70vw", zIndex: 3 }}
        >
          <div
            className="absolute"
            style={{
              bottom: "12%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "70%",
              height: "55%",
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse at 50% 60%, rgba(0,210,255,0.22) 0%, rgba(0,242,255,0.10) 35%, transparent 70%)",
              filter: "blur(40px)",
              zIndex: 0,
            }}
            aria-hidden="true"
          />
          <div
            className="absolute"
            style={{
              bottom: "18%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "40%",
              height: "38%",
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse at 50% 55%, rgba(0,242,255,0.28) 0%, rgba(0,200,255,0.12) 50%, transparent 75%)",
              filter: "blur(22px)",
              zIndex: 0,
            }}
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2"
            style={{
              width: "55%",
              height: "8%",
              borderRadius: "50%",
              background: "rgba(0,242,255,0.14)",
              filter: "blur(20px)",
              zIndex: 0,
            }}
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="relative w-full h-full"
            style={{ zIndex: 2 }}
          >
            <Image
              src="/images/hero-munna.png"
              alt={siteConfig.developer.avatarAlt}
              fill
              priority
              sizes="(max-width: 768px) 90vw, 900px"
              className="object-contain object-bottom"
              style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,.35))" }}
            />
          </motion.div>
        </div>

        {/* COPY — bottom left */}
        <div
          className="absolute z-10 w-full max-w-[460px] px-4 sm:px-6 md:px-10"
          style={{ bottom: "14%", left: "4%" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full mb-4 border border-[#00F2FF]/30 bg-[#00F2FF]/[0.08] backdrop-blur-md shadow-[0_0_15px_rgba(0,242,255,0.15)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F2FF] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F2FF]" />
            </span>
            <span className="text-[#00F2FF] font-mono text-[10px] tracking-[.15em] uppercase font-semibold">
              Available for opportunities
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-2 font-mono text-[10px] tracking-[.2em] uppercase text-[#64748B] mb-2.5"
          >
            <span className="w-4 h-[1px] bg-[#00F2FF]" />
            <span>Full-Stack Web Developer</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-bold leading-[1.02] tracking-tight text-white mb-3"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(32px, 3.8vw, 54px)",
              letterSpacing: "-0.04em",
            }}
          >
            Hi, I&apos;m {siteConfig.developer.name}
            <span className="text-[#00F2FF]">.</span>
            <br />
            <span className="bg-gradient-to-r from-[#00F2FF] via-[#75E6FF] to-[#E0F8FF] bg-clip-text text-transparent">
              MERN Stack Engineer
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-[13px] leading-relaxed mb-6 max-w-[340px] text-[#94A3B8]"
          >
            I build end-to-end web applications with MongoDB, Express, React
            &amp; Node.js — clean code, real products, shipped.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-3"
          >
            <MagneticButton
              href="#projects"
              variant="primary"
              size="md"
              className="font-bold tracking-wide shadow-[0_0_20px_rgba(0,242,255,0.3)]"
            >
              <span>View My Work</span>
              <ArrowDown className="w-4 h-4 stroke-[2.5]" />
            </MagneticButton>
            <MagneticButton
              href={siteConfig.developer.resume || "/Munna_Resume.pdf"}
              variant="outline"
              size="md"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold"
            >
              <span>Resume</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2]" />
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap items-center gap-1.5 mt-5 pt-4 border-t border-white/[0.08] max-w-[340px]"
          >
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748B] mr-1">
              Stack:
            </span>
            {TECH.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/[0.04] border border-white/[0.08] text-[#CBD5E1]"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </div>

        {/* STATS — bottom right */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="absolute z-10 hidden sm:flex flex-col gap-3"
          style={{ right: "4%", bottom: "14%" }}
        >
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.04, x: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="group relative flex items-center gap-3.5 p-3 rounded-2xl bg-[#0D121D]/75 border border-white/[0.08] backdrop-blur-xl hover:border-[#00F2FF]/40 hover:shadow-[0_0_20px_rgba(0,242,255,0.18)] transition-all duration-300 min-w-[190px]"
              >
                <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] group-hover:border-[#00F2FF]/30 group-hover:bg-[#00F2FF]/10 flex items-center justify-center text-[#94A3B8] group-hover:text-[#00F2FF] transition-colors duration-300">
                  <Icon className="w-4 h-4 stroke-[2]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-xl text-[#00F2FF] tracking-tight leading-none">
                    <AnimatedNumber value={stat.value} />
                  </span>
                  <span className="font-semibold text-[11px] text-white/90 mt-0.5">
                    {stat.label}
                  </span>
                  <span className="text-[9px] font-mono text-[#64748B]">
                    {stat.detail}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Scroll cue */}
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="absolute bottom-[3.5%] left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2 cursor-pointer group"
          style={{ color: "#77797c", fontSize: "8px", letterSpacing: ".18em" }}
          aria-label="Scroll down to About section"
        >
          <span className="group-hover:text-[#00F2FF] transition-colors">SCROLL</span>
          <div className="w-5 h-8 rounded-full border border-[rgba(255,255,255,0.15)] flex items-start justify-center p-1 group-hover:border-[#00F2FF] transition-colors">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1.5 h-1.5 rounded-full bg-[#00F2FF]"
            />
          </div>
        </motion.a>

      </div>

      {/* ═══════════════ PHONE + TABLET ═══════════════ */}
      <div className="relative z-10 lg:hidden">
        {/* ── Stage: sized to the 2400×1340 PNG so words sit right behind the body ── */}
        <div className="relative w-full overflow-hidden pt-16 sm:pt-20">
          {/* Depth vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              zIndex: 2,
              background:
                "radial-gradient(ellipse 80% 70% at 50% 55%, transparent 35%, rgba(11,13,18,0.45) 78%, rgba(11,13,18,0.8) 100%)",
            }}
            aria-hidden="true"
          />

          {/* Image box: same aspect as the PNG, wider than the screen on phones so the pose reads larger */}
          <div
            className="relative left-1/2 -translate-x-1/2 w-[135vw] sm:w-[min(110vw,880px)]"
            style={{ aspectRatio: "2400 / 1340" }}
          >
            {/* Backdrop words — directly behind the torso */}
            <div
              className="absolute inset-x-0 text-center font-extrabold pointer-events-none select-none"
              style={{
                top: "24%",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                lineHeight: 0.72,
                letterSpacing: "-0.085em",
                zIndex: 1,
                filter: "blur(1px)",
                opacity: 0.8,
              }}
              aria-hidden="true"
            >
              <span
                ref={mTopWordRef}
                className="block whitespace-nowrap"
                style={{
                  fontSize: "clamp(56px, 17vw, 170px)",
                  color: "rgba(210,228,235,0.88)",
                  textShadow:
                    "0 0 14px rgba(0,242,255,0.55), 0 0 40px rgba(0,242,255,0.28), 0 0 90px rgba(0,242,255,0.14)",
                }}
              />
              <span
                ref={mBotWordRef}
                className="block whitespace-nowrap"
                style={{
                  fontSize: "clamp(60px, 18vw, 180px)",
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(0,242,255,0.3)",
                  textShadow:
                    "0 0 28px rgba(0,242,255,0.18), 0 0 70px rgba(0,242,255,0.08)",
                }}
              />
            </div>

            {/* Glow behind the body */}
            <div
              className="absolute left-1/2 -translate-x-1/2 bottom-[5%] w-[55%] h-[70%] rounded-full pointer-events-none"
              style={{
                zIndex: 2,
                background:
                  "radial-gradient(ellipse at 50% 60%, rgba(0,210,255,0.24) 0%, rgba(0,242,255,0.10) 40%, transparent 72%)",
                filter: "blur(36px)",
              }}
              aria-hidden="true"
            />

            {/* Portrait */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.1,
              }}
              className="absolute inset-0 pointer-events-none"
              style={{ zIndex: 3 }}
            >
              <Image
                src="/images/hero-munna.png"
                alt={siteConfig.developer.avatarAlt}
                fill
                priority
                sizes="(max-width: 640px) 135vw, 880px"
                className="object-contain object-bottom"
                style={{ filter: "drop-shadow(0 18px 36px rgba(0,0,0,.4))" }}
              />
            </motion.div>

            {/* Black fade — bottom 10% of the PNG only */}
            <div
              className="absolute inset-x-0 bottom-0 h-[10%] pointer-events-none bg-gradient-to-t from-[#0B0D12] to-transparent"
              style={{ zIndex: 4 }}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* ── Stats sit below the image ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative mt-3 px-4 sm:px-6 mx-auto max-w-xl sm:max-w-2xl grid grid-cols-3 gap-2 sm:gap-3"
          style={{ zIndex: 5 }}
        >
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-1.5 sm:gap-3 p-2.5 sm:p-3.5 rounded-2xl bg-[#0D121D]/80 border border-white/[0.08] backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
              >
                <div className="hidden sm:flex w-9 h-9 shrink-0 rounded-xl bg-white/[0.04] border border-white/[0.08] items-center justify-center text-[#00F2FF]">
                  <Icon className="w-4 h-4 stroke-[2]" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-extrabold text-lg sm:text-xl text-[#00F2FF] tracking-tight leading-none">
                    <AnimatedNumber value={stat.value} />
                  </span>
                  <span className="font-semibold text-[10px] sm:text-[11px] text-white/90 mt-1 leading-tight">
                    <span className="sm:hidden">{stat.short}</span>
                    <span className="hidden sm:inline">{stat.label}</span>
                  </span>
                  <span className="hidden sm:block text-[9px] font-mono text-[#64748B] mt-0.5">
                    {stat.detail}
                  </span>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* ── Remaining hero copy ── */}
        <div className="flex flex-col items-center text-center gap-4 px-5 pt-8 pb-16 mx-auto max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#00F2FF]/30 bg-[#00F2FF]/[0.08] backdrop-blur-md shadow-[0_0_15px_rgba(0,242,255,0.15)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F2FF] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F2FF]" />
            </span>
            <span className="text-[#00F2FF] font-mono text-[10px] tracking-[.15em] uppercase font-semibold">
              Available for opportunities
            </span>
          </motion.div>

          <p className="flex items-center gap-2 font-mono text-[10px] tracking-[.2em] uppercase text-[#64748B]">
            <span className="w-4 h-px bg-[#00F2FF]" />
            Full-Stack Web Developer
            <span className="w-4 h-px bg-[#00F2FF]" />
          </p>

          <h1
            className="font-bold text-white leading-[1.05]"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(30px, 8vw, 52px)",
              letterSpacing: "-0.04em",
            }}
          >
            Hi, I&apos;m {siteConfig.developer.name}
            <span className="text-[#00F2FF]">.</span>
            <br />
            <span className="bg-gradient-to-r from-[#00F2FF] via-[#75E6FF] to-[#E0F8FF] bg-clip-text text-transparent">
              MERN Stack Engineer
            </span>
          </h1>

          <p className="text-sm sm:text-[15px] text-[#94A3B8] max-w-sm sm:max-w-md leading-relaxed">
            I build end-to-end web applications with MongoDB, Express, React
            &amp; Node.js — clean code, real products, shipped.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <MagneticButton
              href="#projects"
              variant="primary"
              size="md"
              className="font-bold shadow-[0_0_20px_rgba(0,242,255,0.3)]"
            >
              <span>View My Work</span>
              <ArrowDown className="w-4 h-4 stroke-[2.5]" />
            </MagneticButton>
            <MagneticButton
              href={siteConfig.developer.resume || "/Munna_Resume.pdf"}
              variant="outline"
              size="md"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Resume</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2]" />
            </MagneticButton>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2 pt-4 border-t border-white/[0.08] w-full">
            {TECH.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/[0.04] border border-white/[0.08] text-[#CBD5E1]"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-8 flex flex-col items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#64748B]"
          >
            <span>Scroll</span>
            <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 rounded-full bg-[#00F2FF]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
