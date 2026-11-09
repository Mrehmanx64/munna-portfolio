import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { JourneySection } from "@/components/sections/JourneySection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0B0D12] text-[#F8FAFC] selection:bg-[#00F2FF] selection:text-[#0B0D12] overflow-x-hidden">
      {/* Sticky Navigation */}
      <Navbar />

      <main id="main-content" className="relative flex flex-col">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. About Me Section */}
        <AboutSection />

        {/* 3. Skills Section */}
        <SkillsSection />

        {/* 4. Featured Projects Section */}
        <ProjectsSection />

        {/* 5. Development Journey Section */}
        <JourneySection />

        {/* 6. Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
