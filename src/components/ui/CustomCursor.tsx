"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "framer-motion";

function subscribePointer(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getPointerSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function getServerPointerSnapshot() {
  return false;
}

export function CustomCursor() {
  const isFinePointer = useSyncExternalStore(
    subscribePointer,
    getPointerSnapshot,
    getServerPointerSnapshot
  );

  const shouldReduceMotion = useReducedMotion();
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isFinePointer || shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleTargetCheck = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = Boolean(
        target.closest("a, button, input, textarea, select, [role='button'], [data-cursor-hover]")
      );
      setIsHovered(isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleTargetCheck);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleTargetCheck);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isFinePointer, shouldReduceMotion]);

  if (!isFinePointer || shouldReduceMotion || !isVisible) {
    return null;
  }

  return (
    <>
      {/* Central crisp lime dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#00F2FF] pointer-events-none z-[9999] shadow-[0_0_8px_#00F2FF]"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovered ? 0 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 1200,
          damping: 50,
          mass: 0.1,
        }}
        aria-hidden="true"
      />

      {/* Trailing smooth magnetic aura ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - (isHovered ? 24 : 14),
          y: mousePosition.y - (isHovered ? 24 : 14),
          width: isHovered ? 48 : 28,
          height: isHovered ? 48 : 28,
          borderColor: isHovered ? "rgba(0, 242, 255, 0.85)" : "rgba(0, 242, 255, 0.35)",
          backgroundColor: isHovered ? "rgba(0, 242, 255, 0.1)" : "rgba(0, 242, 255, 0)",
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 28,
          mass: 0.2,
        }}
        aria-hidden="true"
      />
    </>
  );
}
