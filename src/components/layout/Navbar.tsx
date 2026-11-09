"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Terminal } from "lucide-react";
import { siteConfig } from "@/config/site";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Scroll spy logic
      const sections = siteConfig.navItems.map((item) => item.href.replace("#", ""));
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0B0D12]/80 backdrop-blur-xl border-b border-[rgba(255,255,255,0.08)] py-3.5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between" aria-label="Main Navigation">
            {/* Logo */}
            <a
              href="#hero"
              className="group flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F2FF] rounded-lg p-1"
              aria-label={`${siteConfig.developer.name} - Home`}
            >
              <div className="w-9 h-9 rounded-xl bg-[#10141E] border border-[rgba(255,255,255,0.12)] flex items-center justify-center text-[#00F2FF] transition-transform duration-300 group-hover:border-[#00F2FF] group-hover:scale-105 shadow-[0_0_15px_rgba(0,242,255,0.15)]">
                <Terminal className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white flex items-center">
                {siteConfig.developer.name}
                <span className="text-[#00F2FF] text-2xl leading-none">.</span>
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1 bg-[#10141E]/70 p-1.5 rounded-full border border-[rgba(255,255,255,0.08)] backdrop-blur-md">
              {siteConfig.navItems.map((item) => {
                const sectionId = item.href.replace("#", "");
                const isActive = activeSection === sectionId;

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`relative px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-300 ${
                      isActive
                        ? "text-[#0B0D12]"
                        : "text-[#94A3B8] hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 bg-[#00F2FF] rounded-full shadow-[0_0_15px_rgba(0,242,255,0.5)]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </a>
                );
              })}
            </div>

            {/* Right Action / CTA */}
            <div className="hidden md:flex items-center gap-3">
              <MagneticButton
                href="#contact"
                variant="primary"
                size="sm"
                className="font-bold tracking-wide"
              >
                <span>Let&apos;s Talk</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </MagneticButton>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden items-center">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl bg-[#10141E] border border-[rgba(255,255,255,0.1)] text-[#94A3B8] hover:text-white hover:border-[#00F2FF] focus:outline-none focus:ring-2 focus:ring-[#00F2FF] transition-colors"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-[#00F2FF]" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 md:hidden bg-[#07090E]/90 backdrop-blur-2xl flex flex-col"
          >
            {/* Mobile Header Bar */}
            <div className="flex items-center justify-between p-5 border-b border-[rgba(255,255,255,0.08)]">
              <a
                href="#hero"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-lg bg-[#10141E] border border-[rgba(255,255,255,0.12)] flex items-center justify-center text-[#00F2FF]">
                  <Terminal className="w-4 h-4" />
                </div>
                <span className="text-lg font-bold text-white">
                  {siteConfig.developer.name}
                  <span className="text-[#00F2FF]">.</span>
                </span>
              </a>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg bg-[#10141E] border border-[rgba(255,255,255,0.1)] text-white hover:text-[#00F2FF] focus:outline-none"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Menu Links */}
            <div className="flex-1 flex flex-col justify-center px-6 py-8 space-y-4">
              {siteConfig.navItems.map((item, idx) => {
                const sectionId = item.href.replace("#", "");
                const isActive = activeSection === sectionId;

                return (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.06 }}
                    className={`flex items-center justify-between text-2xl font-bold py-2 border-b border-[rgba(255,255,255,0.05)] transition-colors ${
                      isActive ? "text-[#00F2FF]" : "text-white hover:text-[#00F2FF]"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-xs uppercase tracking-widest text-[#64748B] font-mono">
                      0{idx + 1}
                    </span>
                  </motion.a>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="pt-6"
              >
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#00F2FF] text-[#0B0D12] font-bold text-center shadow-[0_0_20px_rgba(0,242,255,0.4)]"
                >
                  <span>Let&apos;s Connect</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </a>
              </motion.div>
            </div>

            {/* Mobile Footer Meta */}
            <div className="p-6 border-t border-[rgba(255,255,255,0.06)] text-center text-xs text-[#64748B]">
              <p>{siteConfig.developer.role} • {siteConfig.developer.availability}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
