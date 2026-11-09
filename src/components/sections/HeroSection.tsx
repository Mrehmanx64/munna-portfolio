"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { MagneticButton } from "@/components/ui/MagneticButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PHRASES = [
  ["FULL",     "STACK"],
  ["WEB",      "DEVELOPER"],
  ["MERN",     "STACK"],
  ["CREATIVE", "MINDSET"],
  ["CLEAN",    "CODE"],
  ["REACT",    "NODE"],
  ["DIGITAL",  "BUILDER"],
  ["PROBLEM",  "SOLVER"],
];

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef      = useRef<HTMLElement>(null);
  const backdropRef     = useRef<HTMLDivElement>(null);
  const topWordRef      = useRef<HTMLSpanElement>(null);
  const bottomWordRef   = useRef<HTMLSpanElement>(null);
  const kickerRef       = useRef<HTMLParagraphElement>(null);
  const headlineRef     = useRef<HTMLHeadingElement>(null);
  const subRef          = useRef<HTMLParagraphElement>(null);
  const ctaRef          = useRef<HTMLDivElement>(null);
  const badgeRef        = useRef<HTMLDivElement>(null);
  const statsRef        = useRef<HTMLDivElement>(null);
  const phraseIdxRef    = useRef(0);
  const tlRef           = useRef<gsap.core.Timeline | null>(null);

  // ── Pointer parallax on backdrop ──────────────────────────────────────
  useEffect(() => {
    if (shouldReduceMotion) return;
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;
    const onMove = (e: PointerEvent) => {
      if (!backdropRef.current) return;
      const x = (e.clientX / window.innerWidth  - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 8;
      gsap.to(backdropRef.current, {
        x, y,
        duration: 0.6,
        ease: "power2.out",
        overwrite: "auto",
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [shouldReduceMotion]);

  // ── Hero entrance + glitch cycling ────────────────────────────────────
  useEffect(() => {
    if (!topWordRef.current || !bottomWordRef.current) return;
    if (shouldReduceMotion) return;

    const ctx = gsap.context(() => {

      // — Entry animation for copy —
      const entryTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // badge fades in
      entryTl.fromTo(badgeRef.current,
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.5 },
        0
      );

      // kicker slides up
      entryTl.fromTo(kickerRef.current,
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.5 },
        0.15
      );

      // headline words stagger up
      entryTl.fromTo(headlineRef.current,
        { autoAlpha: 0, y: 32 },
        { autoAlpha: 1, y: 0, duration: 0.6 },
        0.25
      );

      // sub + cta
      entryTl.fromTo(subRef.current,
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.5 },
        0.55
      );
      entryTl.fromTo(ctaRef.current,
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.5 },
        0.65
      );
      entryTl.fromTo(statsRef.current,
        { autoAlpha: 0, x: 20 },
        { autoAlpha: 1, x: 0, duration: 0.6 },
        0.5
      );

      // — Glitch cycling function —
      const glitchIn = (el: HTMLSpanElement, text: string) => {
        el.textContent = text;
        gsap.fromTo(el,
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
          }
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
        const next = (phraseIdxRef.current + 1) % PHRASES.length;
        phraseIdxRef.current = next;
        const [top, bot] = PHRASES[next];

        glitchOut(topWordRef.current!, () => glitchIn(topWordRef.current!, top));
        // slight stagger on bottom word
        gsap.delayedCall(0.08, () => {
          glitchOut(bottomWordRef.current!, () => glitchIn(bottomWordRef.current!, bot));
        });
      };

      // initial set
      glitchIn(topWordRef.current!, PHRASES[0][0]);
      glitchIn(bottomWordRef.current!, PHRASES[0][1]);

      // cycle every 2.8s
      const intervalId = setInterval(cyclePhrase, 2800);
      tlRef.current = entryTl;

      return () => clearInterval(intervalId);

    }, sectionRef);

    return () => ctx.revert();
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
          maskImage: "linear-gradient(to bottom,transparent 0%,#000 12%,#000 80%,transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom,transparent 0%,#000 12%,#000 80%,transparent 100%)",
          opacity: 0.5,
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* Ambient orbs */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full bg-[rgba(90,123,140,.12)] blur-[90px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-[rgba(0,242,255,.05)] blur-[100px] pointer-events-none" aria-hidden="true" />

        {/* ── STAGE ── */}
        <div className="relative w-full h-full mx-auto px-4 sm:px-6 md:px-10 min-h-screen flex flex-col justify-center" style={{ zIndex: 1 }}>


        {/* ── LAYER 1: backdrop cycling phrases ── */}
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
              textShadow: "0 0 35px rgba(0,242,255,0.18), 0 0 90px rgba(0,242,255,0.08)",
            }}
          />
        </div>

        {/* ── LAYER 1.5: depth vignette ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 2,
            background:
              "radial-gradient(ellipse 55% 70% at 50% 60%, transparent 30%, rgba(11,13,18,0.52) 68%, rgba(11,13,18,0.82) 100%)",
          }}
          aria-hidden="true"
        />

        {/* ── Portrait + environmental lighting ── */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-end justify-center pointer-events-none"
          style={{ height: "100vh", width: "70vw", zIndex: 3 }}
        >
          {/* Wide outer bloom */}
          <div className="absolute" style={{
            bottom: "12%", left: "50%", transform: "translateX(-50%)",
            width: "70%", height: "55%", borderRadius: "50%",
            background: "radial-gradient(ellipse at 50% 60%, rgba(0,210,255,0.22) 0%, rgba(0,242,255,0.10) 35%, transparent 70%)",
            filter: "blur(40px)", zIndex: 0,
          }} aria-hidden="true" />
          {/* Inner core */}
          <div className="absolute" style={{
            bottom: "18%", left: "50%", transform: "translateX(-50%)",
            width: "40%", height: "38%", borderRadius: "50%",
            background: "radial-gradient(ellipse at 50% 55%, rgba(0,242,255,0.28) 0%, rgba(0,200,255,0.12) 50%, transparent 75%)",
            filter: "blur(22px)", zIndex: 0,
          }} aria-hidden="true" />
          {/* Floor spill */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2" style={{
            width: "55%", height: "8%", borderRadius: "50%",
            background: "rgba(0,242,255,0.14)", filter: "blur(20px)", zIndex: 0,
          }} aria-hidden="true" />

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

        {/* ── COPY — bottom left ── */}
        <div
          className="absolute z-10 w-full px-4 sm:px-6 md:px-10"
          style={{ bottom: "14%" }}
        >
          {/* Availability badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
            style={{ border: "1px solid rgba(0,242,255,0.3)", background: "rgba(0,242,255,0.07)", opacity: 0 }}
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00F2FF] animate-pulse"
              style={{ boxShadow: "0 0 8px #00F2FF" }} />
            <span className="text-[#00F2FF] font-mono text-[10px] tracking-[.15em] uppercase">
              Available for opportunities
            </span>
          </div>

          <p
            ref={kickerRef}
            className="font-mono text-[10px] tracking-[.2em] uppercase mb-3 text-[#64748B]"
            style={{ opacity: 0 }}
          >
            Full-Stack Developer
          </p>

          <h1
            ref={headlineRef}
            className="font-bold leading-[1.0] tracking-tight text-white mb-4"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(30px, 3.6vw, 52px)",
              letterSpacing: "-0.04em",
              opacity: 0,
            }}
          >
            {siteConfig.developer.name}<br />
            <em className="not-italic" style={{ color: "rgba(180,195,210,0.75)" }}>
              MERN Stack Engineer.
            </em>
          </h1>

          <p
            ref={subRef}
            className="text-[13px] leading-relaxed mb-6 max-w-[300px]"
            style={{ color: "#94A3B8", opacity: 0 }}
          >
            I build end-to-end web applications with MongoDB, Express,
            React &amp; Node.js — clean code, real products, shipped.
          </p>

          <div ref={ctaRef} className="flex flex-wrap gap-3" style={{ opacity: 0 }}>
            <MagneticButton href="#projects" variant="primary" size="md" className="font-bold tracking-wide">
              <span>View My Work</span>
              <ArrowDown className="w-4 h-4 stroke-[2.5]" />
            </MagneticButton>
            <MagneticButton href="/Naimur_Resume.pdf" variant="outline" size="md" className="font-semibold">
              <span>Resume</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2]" />
            </MagneticButton>
          </div>
        </div>

        {/* ── STATS — bottom right ── */}
        <div
          ref={statsRef}
          className="absolute z-10 hidden sm:flex flex-col gap-5"
          style={{ right: "4%", bottom: "14%", opacity: 0 }}
        >
          {[
            { value: "2+",   label: "Years building" },
            { value: "5+",   label: "Projects shipped" },
            { value: "MERN", label: "Core stack" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col gap-0.5">
              <strong
                className="font-bold leading-none"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: s.value === "MERN" ? "clamp(16px,1.8vw,22px)" : "clamp(22px,2.5vw,30px)",
                  letterSpacing: "-0.04em",
                  color: "#00F2FF",
                }}
              >
                {s.value}
              </strong>
              <small className="font-mono tracking-[.14em] uppercase" style={{ fontSize: "7px", color: "#64748B" }}>
                {s.label}
              </small>
            </div>
          ))}
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="absolute bottom-[3.5%] left-1/2 -translate-x-1/2 z-10 hidden sm:flex items-center gap-2"
          style={{ color: "#77797c", fontSize: "8px", letterSpacing: ".18em" }}
          aria-hidden="true"
        >
          <span className="inline-block w-px h-6 bg-gradient-to-b from-[#00F2FF] to-transparent" />
          SCROLL
        </motion.div>

      </div>

      {/* ── MOBILE ── */}
      <div className="relative z-10 flex flex-col items-center text-center gap-5 px-5 pt-28 pb-16 md:hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
          style={{ border: "1px solid rgba(0,242,255,0.3)", background: "rgba(0,242,255,0.07)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FF] animate-pulse" style={{ boxShadow: "0 0 8px #00F2FF" }} />
          <span className="text-[#00F2FF] font-mono text-[10px] tracking-[.15em] uppercase">Available</span>
        </div>

        <div className="relative w-72 h-80 sm:w-80 sm:h-96">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-40 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(0,242,255,0.22) 0%, transparent 70%)", filter: "blur(30px)" }} />
          <Image
            src="/images/hero-munna.png"
            alt={siteConfig.developer.avatarAlt}
            fill priority sizes="320px"
            className="object-contain object-bottom"
            style={{ filter: "drop-shadow(0 12px 30px rgba(0,0,0,.4))" }}
          />
        </div>

        <p className="font-mono text-[10px] tracking-[.2em] uppercase text-[#64748B]">Full-Stack Developer</p>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          {siteConfig.developer.name}<br />
          <em className="not-italic" style={{ color: "rgba(180,195,210,0.75)" }}>MERN Stack.</em>
        </h1>
        <p className="text-sm text-[#94A3B8] max-w-xs leading-relaxed">
          I build end-to-end web applications with MongoDB, Express, React &amp; Node.js — clean code, real products, shipped.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <MagneticButton href="#projects" variant="primary" size="md" className="font-bold">
            <span>View My Work</span>
            <ArrowDown className="w-4 h-4 stroke-[2.5]" />
          </MagneticButton>
          <MagneticButton href="/Naimur_Resume.pdf" variant="outline" size="md">
            <span>Resume</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2]" />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
