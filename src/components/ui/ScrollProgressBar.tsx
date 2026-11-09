"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#00F2FF] via-[#D5FF26] to-[#00F2FE] origin-left z-50 shadow-[0_0_12px_rgba(0,242,255,0.8)]"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
