"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Copy,
  Check,
  Send,
  MapPin,
  Clock,
  Sparkles,
  AlertCircle,
  ExternalLink,
  MessageSquare,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Please provide your name";
    if (!formData.email.trim()) {
      errs.email = "Please provide your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address";
    }
    if (!formData.message.trim()) {
      errs.message = "Please write a message";
    } else if (formData.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters long";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Honest handling: simulate client validation check, then provide mailto trigger & clear instructions
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Open mailto link as direct communication fallback
      const mailtoLink = `mailto:${siteConfig.social.email}?subject=${encodeURIComponent(
        formData.subject || `Message from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      window.location.href = mailtoLink;
    }, 1000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.social.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-[#07090E] overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[rgba(0,242,255,0.03)] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[rgba(0,242,254,0.02)] blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Direct Connection"
          title="Have an Idea?"
          highlight="Let's Build Something Great."
          subtitle="Whether you have an inquiry, wish to discuss modern web projects, or want to explore collaboration, my inbox is always open."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start max-w-6xl mx-auto">
          {/* Left Column: Direct Contact Info & Socials */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Contact Card */}
            <SpotlightCard className="p-6 sm:p-8 border-[rgba(255,255,255,0.08)]">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#00F2FF]" />
                <span>Let&apos;s Connect</span>
              </h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">
                I prioritize responding to constructive conversations, project collaborations, and opportunities.
              </p>

              {/* Email Click-to-Copy */}
              <div className="p-4 rounded-xl bg-[#151C2A] border border-[rgba(255,255,255,0.08)] mb-6">
                <div className="flex items-center justify-between text-xs text-[#64748B] mb-1.5 font-mono">
                  <span>DIRECT EMAIL</span>
                  {copiedEmail && (
                    <span className="text-[#00F2FF] font-semibold flex items-center gap-1">
                      <Check className="w-3 h-3" /> Copied to clipboard!
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm sm:text-base font-semibold text-white truncate">
                    {siteConfig.social.email}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-[#1E2638] hover:bg-[#00F2FF] text-[#94A3B8] hover:text-[#0B0D12] transition-colors shrink-0"
                    aria-label="Copy email address"
                  >
                    {copiedEmail ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Meta details: Location, Status */}
              <div className="space-y-3 text-xs sm:text-sm text-[#94A3B8]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#151C2A] flex items-center justify-center text-[#00F2FF] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span>Location: <strong className="text-white font-medium">{siteConfig.developer.location}</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#151C2A] flex items-center justify-center text-[#00F2FF] shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span>Availability: <strong className="text-[#00F2FF] font-medium">Open for discussions</strong></span>
                </div>
              </div>

              {/* Social Channels */}
              <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)]">
                <p className="text-xs font-mono uppercase tracking-wider text-[#64748B] mb-3">
                  Profiles & Repositories
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href={siteConfig.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#151C2A] border border-[rgba(255,255,255,0.08)] text-white hover:border-[#00F2FF] hover:text-[#00F2FF] transition-colors text-xs font-medium"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>GitHub</span>
                    <ExternalLink className="w-3 h-3 text-[#64748B]" />
                  </a>

                  <a
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#151C2A] border border-[rgba(255,255,255,0.08)] text-white hover:border-[#00F2FF] hover:text-[#00F2FF] transition-colors text-xs font-medium"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                    <span>LinkedIn</span>
                    <ExternalLink className="w-3 h-3 text-[#64748B]" />
                  </a>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Right Column: Interactive Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <SpotlightCard className="p-6 sm:p-8 lg:p-10 border-[rgba(255,255,255,0.08)]">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[rgba(0,242,255,0.15)] border-2 border-[#00F2FF] flex items-center justify-center text-[#00F2FF] mx-auto shadow-[0_0_25px_rgba(0,242,255,0.4)]">
                    <Check className="w-8 h-8 stroke-[2.5]" />
                  </div>
                  <h4 className="text-2xl font-bold text-white">
                    Message Prepared!
                  </h4>
                  <p className="text-sm text-[#94A3B8] max-w-md mx-auto leading-relaxed">
                    Your email client has been opened with your message pre-filled. You can also reach me directly anytime at{" "}
                    <span className="text-[#00F2FF] font-mono">{siteConfig.social.email}</span>.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: "", email: "", subject: "", message: "" });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-[#151C2A] text-white hover:bg-[#1E2638] text-xs font-semibold border border-[rgba(255,255,255,0.1)] transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-2"
                      >
                        Your Name <span className="text-[#00F2FF]">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: "" });
                        }}
                        placeholder="e.g. Alex Rahman"
                        className={`w-full px-4 py-3 rounded-xl bg-[#151C2A] border text-white text-sm placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#00F2FF] transition-colors ${
                          errors.name
                            ? "border-red-500/80"
                            : "border-[rgba(255,255,255,0.1)] focus:border-[#00F2FF]"
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-2"
                      >
                        Your Email <span className="text-[#00F2FF]">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: "" });
                        }}
                        placeholder="alex@example.com"
                        className={`w-full px-4 py-3 rounded-xl bg-[#151C2A] border text-white text-sm placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#00F2FF] transition-colors ${
                          errors.email
                            ? "border-red-500/80"
                            : "border-[rgba(255,255,255,0.1)] focus:border-[#00F2FF]"
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-2"
                    >
                      Subject / Topic
                    </label>
                    <input
                      type="text"
                      id="subject"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      placeholder="Project Inquiry, Full-Stack Opportunity, etc."
                      className="w-full px-4 py-3 rounded-xl bg-[#151C2A] border border-[rgba(255,255,255,0.1)] text-white text-sm placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#00F2FF] focus:border-[#00F2FF] transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-2"
                    >
                      Message <span className="text-[#00F2FF]">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: "" });
                      }}
                      placeholder="Tell me about what you have in mind..."
                      className={`w-full px-4 py-3 rounded-xl bg-[#151C2A] border text-white text-sm placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#00F2FF] transition-colors resize-none ${
                        errors.message
                          ? "border-red-500/80"
                          : "border-[rgba(255,255,255,0.1)] focus:border-[#00F2FF]"
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Transparent Integration Notice */}
                  <div className="p-3.5 rounded-xl bg-[#10141E] border border-[rgba(255,255,255,0.06)] flex items-start gap-2.5 text-xs text-[#64748B]">
                    <MessageSquare className="w-4 h-4 text-[#00F2FF] shrink-0 mt-0.5" />
                    <span>
                      <strong>Honest Delivery:</strong> Submitting will trigger your preferred mail client addressed to <strong className="text-white">{siteConfig.social.email}</strong>. (API backend like Resend or Formspree can be easily bound in <code className="text-[#00F2FF]">src/config/site.ts</code>).
                    </span>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#00F2FF] hover:bg-[#D5FF26] text-[#0B0D12] font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,242,255,0.35)] hover:shadow-[0_0_30px_rgba(0,242,255,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-[#0B0D12] border-t-transparent rounded-full animate-spin" />
                        <span>Preparing Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4 stroke-[2.5]" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
