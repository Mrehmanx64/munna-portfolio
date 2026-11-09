export type SkillCategory = 'all' | 'frontend' | 'backend' | 'database' | 'auth' | 'tools';

export interface SkillItem {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'auth' | 'tools';
  categoryLabel: string;
  description: string;
  iconName: string;
  highlight?: boolean;
}

export interface ProjectScreenshot {
  title: string;
  image: string;
  caption?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  nativeTitle?: string;
  tagline: string;
  description: string;
  longDescription: string;
  image: string;
  screenshots?: ProjectScreenshot[];
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  status: 'live' | 'development';
  statusLabel: string;
  features: string[];
  techStackDetails: {
    category: string;
    items: string[];
  }[];
}

export interface JourneyMilestone {
  step: string;
  title: string;
  period: string;
  focus: string;
  description: string;
  technologies: string[];
  icon: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SiteConfig {
  developer: {
    name: string;
    role: string;
    headline: string;
    subheadline: string;
    avatar: string;
    avatarAlt: string;
    availability: string;
    location: string;
    phone?: string;
    resume?: string;
    about: {
      intro: string;
      journey: string;
      designPhilosophy: string;
      founderVision: string;
    };
  };
  social: {
    github: string;
    linkedin: string;
    email: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
    whatsapp?: string;
  };
  skills: SkillItem[];
  projects: ProjectItem[];
  journey: JourneyMilestone[];
  navItems: NavItem[];
}
