"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  badge: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  badge,
  title,
  highlight,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  const isCentered = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-14 ${isCentered ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}`}
    >
      {/* Small Badge */}
      <div
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-[rgba(0,242,255,0.3)] bg-[rgba(0,242,255,0.06)] text-[#00F2FF] ${
          isCentered ? "mx-auto" : ""
        }`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FF] animate-pulse" />
        {badge}
      </div>

      {/* Main Title */}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 leading-[1.15]">
        {title}{" "}
        {highlight && (
          <span className="text-[#00F2FF] drop-shadow-[0_0_20px_rgba(0,242,255,0.3)]">
            {highlight}
          </span>
        )}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
