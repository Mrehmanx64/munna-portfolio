"use client";

import { ArrowUp, Terminal } from "lucide-react";
import { siteConfig } from "@/config/site";
import {
  GithubIcon,
  LinkedinIcon,
  FacebookIcon,
  InstagramIcon,
  WhatsAppIcon,
} from "@/components/ui/Icons";

interface FooterProps {
  currentYear?: number;
}

export function Footer({ currentYear = 2026 }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#07090E] border-t border-[rgba(255,255,255,0.06)] pt-16 pb-12 overflow-hidden">
      {/* Subtle top cyan highlight line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#00F2FF]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-[rgba(255,255,255,0.06)]">
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <a href="#hero" className="flex items-center gap-2 mb-2 group">
              <div className="w-8 h-8 rounded-lg bg-[#10141E] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[#00F2FF] group-hover:border-[#00F2FF] transition-colors">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="text-xl font-extrabold text-white">
                {siteConfig.developer.name}
                <span className="text-[#00F2FF]">.</span>
              </span>
            </a>
            <p className="text-xs text-[#94A3B8] max-w-xs">
              {siteConfig.developer.subheadline}
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
            {siteConfig.navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-[#00F2FF] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Social Icons & Back To Top */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="w-10 h-10 rounded-xl bg-[#10141E] border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[#94A3B8] hover:text-[#00F2FF] hover:border-[#00F2FF] transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="w-10 h-10 rounded-xl bg-[#10141E] border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[#94A3B8] hover:text-[#00F2FF] hover:border-[#00F2FF] transition-colors"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            {siteConfig.social.whatsapp && (
              <a
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Contact"
                className="w-10 h-10 rounded-xl bg-[#10141E] border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[#94A3B8] hover:text-emerald-400 hover:border-emerald-400 transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
            )}

            {siteConfig.social.facebook && (
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Profile"
                className="w-10 h-10 rounded-xl bg-[#10141E] border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[#94A3B8] hover:text-[#1877F2] hover:border-[#1877F2] transition-colors"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
            )}

            {siteConfig.social.instagram && (
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="w-10 h-10 rounded-xl bg-[#10141E] border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[#94A3B8] hover:text-pink-400 hover:border-pink-400 transition-colors"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            )}

            <a
              href={`mailto:${siteConfig.social.email}`}
              aria-label="Send direct email"
              className="w-10 h-10 rounded-xl bg-[#10141E] border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[#94A3B8] hover:text-[#00F2FF] hover:border-[#00F2FF] transition-colors"
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="w-10 h-10 rounded-xl bg-[#151C2A] border border-[rgba(0,242,255,0.3)] flex items-center justify-center text-[#00F2FF] hover:bg-[#00F2FF] hover:text-[#0B0D12] transition-all ml-1 shadow-[0_0_15px_rgba(0,242,255,0.2)]"
            >
              <ArrowUp className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          <p>© {currentYear} {siteConfig.developer.name}. All rights reserved.</p>
          <p className="font-mono flex items-center gap-2">
            <span>Built with Next.js &amp; Tailwind CSS</span>
            <span className="w-1 h-1 rounded-full bg-[#00F2FF]" />
            <span>Full-Stack Engineer</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
