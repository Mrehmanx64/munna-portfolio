import { SiteConfig } from "@/types";

/**
 * Site configuration and personal developer data.
 * All personal links, projects, and contact targets can be updated directly here.
 */
export const siteConfig: SiteConfig = {
  developer: {
    name: "Munna",
    role: "Full-Stack Web Developer",
    headline: "Turning Ideas Into Digital Experiences.",
    subheadline:
      "I build modern, responsive web applications with thoughtful design, clean code, and powerful technologies.",
    avatar: "/images/profile.jpeg",
    avatarAlt: "Naimur - Full-Stack Web Developer",
    availability: "Available for opportunities & collaborations",
    location: "Dhaka, Bangladesh",
    about: {
      intro:
        "I am a passionate Full-Stack Web Developer who genuinely loves learning, architecting clean web solutions, and solving real-world problems through software.",
      journey:
        "My journey began with deep curiosity about how interactive products work under the hood. Step by step, I evolved from writing clean HTML, CSS, and modern JavaScript to building full-stack applications with React, Next.js, Node.js, and MongoDB.",
      designPhilosophy:
        "I believe software should be as intuitive and delightful to use as it is robust. I focus on pixel-precise UI design, silky animations, accessible semantics, and seamless responsiveness across devices.",
      founderVision:
        "My long-term aspiration is to build and scale my own software company—creating independent digital products and SaaS tools that solve tangible problems for real people.",
    },
  },

  social: {
    // Configurable social URLs - update with your personal usernames
    github: "https://github.com/Naimur131251",
    linkedin: "https://www.linkedin.com/in/naimur456/",
    email: "naimur131251@gmail.com",
    twitter: "https://x.com",
  },

  navItems: [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Journey", href: "#journey" },
    { label: "Contact", href: "#contact" },
  ],

  skills: [
    // Frontend
    {
      name: "Next.js",
      category: "frontend",
      categoryLabel: "Frontend",
      description:
        "App Router, Server Components, SSR, API routes, and modern performance optimizations.",
      iconName: "Zap",
      highlight: true,
    },
    {
      name: "React",
      category: "frontend",
      categoryLabel: "Frontend",
      description:
        "Component-driven architecture, custom hooks, state management, and modern React 19.",
      iconName: "Atom",
      highlight: true,
    },
    {
      name: "TypeScript",
      category: "frontend",
      categoryLabel: "Frontend",
      description:
        "Strict static typing, interfaces, generic types, and type-safe full-stack workflows.",
      iconName: "Code2",
      highlight: true,
    },
    {
      name: "Tailwind CSS",
      category: "frontend",
      categoryLabel: "Frontend",
      description:
        "Utility-first responsive design, custom design tokens, dark mode, and sleek micro-styling.",
      iconName: "Palette",
      highlight: true,
    },
    {
      name: "JavaScript (ES6+)",
      category: "frontend",
      categoryLabel: "Frontend",
      description:
        "Asynchronous patterns, closures, array primitives, modern DOM APIs, and modular architecture.",
      iconName: "FileCode",
    },
    {
      name: "HTML5 & Semantic Web",
      category: "frontend",
      categoryLabel: "Frontend",
      description:
        "Accessible markup, clean semantic structure, SEO fundamentals, and responsive viewports.",
      iconName: "Layout",
    },
    {
      name: "CSS3 & Modern Motion",
      category: "frontend",
      categoryLabel: "Frontend",
      description:
        "Flexbox, CSS Grid, keyframe animations, glassmorphism, and responsive layouts.",
      iconName: "Layers",
    },

    // Backend
    {
      name: "Node.js",
      category: "backend",
      categoryLabel: "Backend",
      description:
        "Event-driven runtime environment for building fast, non-blocking network applications.",
      iconName: "Server",
      highlight: true,
    },
    {
      name: "Express.js",
      category: "backend",
      categoryLabel: "Backend",
      description:
        "Minimalist web framework for routing, middleware pipelines, and scalable backend logic.",
      iconName: "Cpu",
      highlight: true,
    },
    {
      name: "RESTful APIs",
      category: "backend",
      categoryLabel: "Backend",
      description:
        "Clean REST architecture, predictable endpoints, HTTP status codes, and JSON serialization.",
      iconName: "Workflow",
    },

    // Database
    {
      name: "MongoDB",
      category: "database",
      categoryLabel: "Database",
      description:
        "Document-oriented NoSQL database for flexible data modeling and rapid query execution.",
      iconName: "Database",
      highlight: true,
    },
    {
      name: "Mongoose",
      category: "database",
      categoryLabel: "Database",
      description:
        "Schema validation, middleware hooks, query population, and model encapsulation in Node.",
      iconName: "HardDrive",
    },

    // Authentication
    {
      name: "Better Auth",
      category: "auth",
      categoryLabel: "Authentication",
      description:
        "Modern, secure, and type-safe authentication framework for full-stack TypeScript applications.",
      iconName: "ShieldCheck",
      highlight: true,
    },

    // Tools
    {
      name: "Git",
      category: "tools",
      categoryLabel: "Tools",
      description:
        "Distributed version control, branch management, merge conflict resolution, and history tracking.",
      iconName: "GitBranch",
    },
    {
      name: "GitHub",
      category: "tools",
      categoryLabel: "Tools",
      description:
        "Remote code collaboration, pull requests, automated releases, and issue tracking.",
      iconName: "Github",
    },
    {
      name: "VS Code",
      category: "tools",
      categoryLabel: "Tools",
      description:
        "Customized development environment with linting, formatting, and debugging workflows.",
      iconName: "Terminal",
    },
    {
      name: "AI-Assisted Coding",
      category: "tools",
      categoryLabel: "Tools",
      description:
        "Leveraging state-of-the-art AI tools for rapid ideation, pair programming, and architecture validation.",
      iconName: "Sparkles",
      highlight: true,
    },
  ],

  projects: [
    {
      id: "bazar-dor",
      title: "Bazar Dor",
      nativeTitle: "বাজার দর",
      tagline: "Bangla Market Price Platform & Commodity Comparison Hub",
      description:
        "A Bangla market-price platform that helps users explore essential product prices, market comparisons, and price changes across essential daily commodities.",
      longDescription:
        "Bazar Dor (বাজার দর) was built to bring price transparency to everyday consumers and citizens in Bangladesh. It aggregates essential grocery, vegetable, fish, and commodity price data into a clean, bilingual interface. Users can inspect daily rate adjustments, compare rates across markets, and monitor price trends over time.",
      image: "/images/projects/bazar-dor.jpg",
      tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "REST API"],
      liveUrl: "https://naimur-bazar-dor.vercel.app",
      featured: true,
      status: "live",
      statusLabel: "Live Production App",
      features: [
        "Real-time Bangla commodity price directory (Rice, Lentils, Oil, Vegetables, Meat)",
        "Visual 30-day price trend analysis graphs for essential items",
        "Quick market comparison across local hubs and retail centers",
        "Bilingual user experience tailored for Bengali speakers",
        "Fast responsive mobile interface optimized for on-the-go market shoppers",
      ],
      techStackDetails: [
        {
          category: "Frontend",
          items: ["Next.js App Router", "React", "Tailwind CSS", "TypeScript"],
        },
        {
          category: "Design",
          items: ["Responsive UI", "Bangla Typography", "Custom Data Cards"],
        },
        {
          category: "Deployment",
          items: ["Vercel Edge Platform", "Automated CI/CD"],
        },
      ],
    },
    {
      id: "fit-log",
      title: "Fit Log",
      tagline: "Fitness Planning & Activity Tracking Interface",
      description:
        "A fitness planning interface for organizing workout plans, saving activities, and tracking completed workouts with set, rep, and weight metrics.",
      longDescription:
        "Fit Log is a sleek, distraction-free fitness planning and workout tracking application designed for gym-goers and fitness enthusiasts. It enables users to create structured routine calendars, log real-time exercise performance (sets, reps, weights, duration), and monitor overall training consistency without cluttered advertisements.",
      image: "/images/projects/fit-log.jpg",
      tags: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Node.js",
        "Mongoose",
        "MongoDB",
      ],
      featured: true,
      status: "development",
      statusLabel: "Interactive Preview & Showcase",
      features: [
        "Interactive Workout Routine Calendar with split scheduling (Legs, Upper Body, Cardio)",
        "Detailed exercise performance logging with live set/rep/weight checklists",
        "Weekly activity trend visualization with workout duration tracking",
        "Exercise catalog categorized by muscle groups (Chest, Legs, Back, Core)",
        "Dark-mode first interface designed for high contrast in gym environments",
      ],
      techStackDetails: [
        {
          category: "Frontend",
          items: ["Next.js", "TypeScript", "Tailwind CSS"],
        },
        {
          category: "Backend & Data",
          items: ["Node.js", "Express.js", "Mongoose", "MongoDB"],
        },
        {
          category: "Architecture",
          items: ["REST Endpoints", "Modular Component System"],
        },
      ],
    },
  ],

  journey: [
    {
      step: "01",
      title: "Web Engineering Fundamentals",
      period: "The Foundation",
      focus: "HTML5, Modern CSS3, JavaScript ES6+",
      description:
        "Started with intense curiosity about web mechanics. Mastered DOM manipulation, modern JavaScript paradigms, asynchronous programming, responsive grid layouts, and semantic markup.",
      technologies: ["JavaScript ES6+", "HTML5", "CSS3", "Git"],
      icon: "Code",
    },
    {
      step: "02",
      title: "Full-Stack & Backend Logic",
      period: "Backend Mastery",
      focus: "Node.js, Express.js, MongoDB, REST APIs",
      description:
        "Expanded into backend systems to understand data flows and server logic. Built RESTful API endpoints with Express.js, structured database schemas in MongoDB using Mongoose, and implemented CRUD operations.",
      technologies: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "Mongoose",
        "REST APIs",
      ],
      icon: "Server",
    },
    {
      step: "03",
      title: "Modern Production Architecture",
      period: "Next.js & Type Safety",
      focus: "Next.js App Router, TypeScript, Better Auth, Tailwind CSS",
      description:
        "Embraced modern industry standards: Next.js App Router for hybrid rendering, TypeScript for bulletproof type safety, Better Auth for secure user identity, and Tailwind CSS for rapid, polished styling.",
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Better Auth",
      ],
      icon: "Layers",
    },
    {
      step: "04",
      title: "Building & Launching Real Products",
      period: "Product Shipping",
      focus: "Bazar Dor & Fit Log",
      description:
        "Shifted from tutorials to solving tangible problems. Shipped 'Bazar Dor' to bring price clarity to Bengali consumers and architected 'Fit Log' for structured workout planning and activity tracking.",
      technologies: [
        "Full-Stack Next.js",
        "Vercel",
        "MongoDB",
        "Real-world Problem Solving",
      ],
      icon: "Rocket",
    },
    {
      step: "05",
      title: "The Horizon: Software Entrepreneurship",
      period: "The Vision",
      focus: "Independent SaaS Products & Software Venture",
      description:
        "Actively working toward the long-term ambition of founding a software company. Focusing on scalable system design, user-centered product craft, and building software that creates genuine human impact.",
      technologies: [
        "Product Strategy",
        "Scalable Systems",
        "SaaS Engineering",
      ],
      icon: "Compass",
    },
  ],
};
