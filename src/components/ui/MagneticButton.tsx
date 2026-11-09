"use client";

import React, { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  strength?: number;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  target,
  rel,
  strength = 0.25,
  variant = "primary",
  size = "md",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * strength;
    const y = (clientY - (top + height / 2)) * strength;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles =
    "relative inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F2FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0D12] select-none";

  const sizeStyles = {
    sm: "px-4 py-2 text-xs gap-1.5",
    md: "px-6 py-3 text-sm gap-2",
    lg: "px-7 py-3.5 text-base gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-[#00F2FF] text-[#0B0D12] hover:bg-[#D5FF26] shadow-[0_0_20px_rgba(0,242,255,0.35)] hover:shadow-[0_0_30px_rgba(0,242,255,0.55)] active:scale-[0.98]",
    secondary:
      "bg-[#151B28] text-white hover:bg-[#1D2536] border border-[rgba(255,255,255,0.1)] hover:border-[rgba(0,242,255,0.3)] active:scale-[0.98]",
    outline:
      "bg-transparent text-white border border-[rgba(255,255,255,0.15)] hover:border-[#00F2FF] hover:text-[#00F2FF] hover:bg-[rgba(0,242,255,0.06)] active:scale-[0.98]",
    ghost:
      "bg-transparent text-[#94A3B8] hover:text-white hover:bg-[rgba(255,255,255,0.05)] active:scale-[0.98]",
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.1 }}
      className="inline-flex items-center justify-center"
    >
      {href ? (
        <a
          href={href}
          target={target}
          rel={rel}
          className={combinedClasses}
          onClick={onClick}
        >
          {children}
        </a>
      ) : (
        <button type="button" className={combinedClasses} onClick={onClick}>
          {children}
        </button>
      )}
    </motion.div>
  );

  return content;
}
