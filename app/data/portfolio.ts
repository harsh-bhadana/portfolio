import {
  Database,
  Globe,
  Layers,
  LayoutDashboard,
  Shield,
  User,
  Users,
  Camera,
  Cpu,
  Zap,
  Paintbrush,
} from "lucide-react";
import { Experience, Skill, GithubProject, FeatureLab } from "../types/portfolio";

export const experiences: Experience[] = [
  {
    title: "Frontend Developer (Senior Associate – Technology)",
    company: "TCZ Digital Pvt. Ltd.",
    period: "Dec 2021 – Present",
    projects: [
      {
        name: "Royal Enfield (Internal Dashboard)",
        description: "Built a high-performance frontend architecture from scratch for internal operations.",
        highlights: [
          "Developed a real-time bidding system for bikes with seamless Firebase integration.",
          "Secured API payloads using hash validation and implemented Content Security Policy (CSP).",
          "Created reusable UI components and optimized app responsiveness."
        ]
      },
      {
        name: "Royal Enfield (Ride Sure)",
        description: "Integrated the Ride Sure platform with the main Royal Enfield ecosystem.",
        highlights: [
          "Enabled shared authentication and service booking flows.",
          "Integrated Google Analytics to monitor user engagement in real-time.",
          "Optimized deployment readiness and streamlined backend communication."
        ]
      },
      {
        name: "Somani (Shipment Tracking Dashboard)",
        description: "Designed and developed visual data insights for shipment logistics.",
        highlights: [
          "Created interactive data visualization components using React and Redux.",
          "Collaborated with backend teams to optimize API response times.",
          "Ensured data consistency across complex shipment tracking modules."
        ]
      }
    ]
  }
];

export const skills: Skill[] = [
  { category: "Frontend", items: ["Next.js (App Router)", "React", "Redux Toolkit", "Tailwind CSS", "JavaScript (ES6+)"], icon: Globe },
  { category: "Tools & Backend", items: ["Firebase", "Git & GitHub", "REST APIs", "Content Security Policy"], icon: Database },
  { category: "Deployment", items: ["Vercel", "Firebase Hosting"], icon: Layers }
];

export const githubProjects: GithubProject[] = [
  {
    name: "Event Logix",
    icon: LayoutDashboard,
    description: "A premium, role-based event orchestration ecosystem designed to bridge the gap between high-scale coordination, specialized staffing, and attendee engagement.",
    features: [
      "Triple-Role Adaptive Experience (Admin / Staff / Attendee)",
      "Real-time Logic-Driven Analytics with Recharts Integrated Engine",
      "Automated Background Workflows via Vercel Cron Jobs"
    ],
    highlight: "Engineered a robust 'Defensive Data Layer' with null-safety guards across Server Actions, achieving 100% stability against asynchronous data-drifting.",
    status: "In Progress",
    tech: ["NEXT.JS 16", "MONGODB", "TYPESCRIPT", "FRAMER MOTION"],
    github: "https://github.com/harsh-bhadana/event-logix",
    demo: "https://event-logix.vercel.app",
    demoCredentials: [
      { role: "Admin", email: "admin@example.com", password: "password123", icon: Shield },
      { role: "Staff", email: "staff@example.com", password: "password123", icon: Users },
      { role: "User", email: "user@example.com", password: "password123", icon: User }
    ],
    graph: {
      nodes: [
        { id: "ui", label: "Client UI", type: "client", desc: "React 19 + Framer Motion + Recharts" },
        { id: "security", label: "Security Layer", type: "server", desc: "Jose + Bcrypt JWT Encryption" },
        { id: "actions", label: "Server Actions", type: "server", desc: "Secure 'Defensive Layer' with Zod Validation" },
        { id: "db", label: "MongoDB", type: "db", desc: "High-scale Event & User Metadata" },
        { id: "worker", label: "Vercel Cron", type: "service", desc: "Automated Ticket & Event Lifecycle Sync" }
      ],
      edges: [
        { from: "ui", to: "security", label: "AUTH" },
        { from: "security", to: "actions", label: "AUTHORIZE" },
        { from: "actions", to: "db", label: "QUERY/MUTATE" },
        { from: "worker", to: "actions", label: "TRIGGER" }
      ]
    }
  },
  {
    name: "Clicks",
    icon: Camera,
    description: "A high-performance, dark-themed photography gallery featuring infinite scroll and a premium lightbox experience. Built with a content-first philosophy.",
    features: [
      "Infinite scroll with optimized image loading",
      "Premium lightbox gallery with custom transitions",
      "Integration with Vercel Blob for cloud storage"
    ],
    highlight: "Optimized LCP by 40% through intelligent image priority and lazy-loading strategies.",
    tech: ["Next.js 15", "Tailwind CSS", "Framer Motion", "Vercel Blob"],
    github: "https://github.com/harsh-bhadana/clicks",
    demo: "https://clicks-nine.vercel.app",
    graph: {
      nodes: [
        { id: "ui", label: "Gallery UI", type: "client", desc: "Infinite Scroll + Motion Transitions" },
        { id: "optimization", label: "Priority Engine", type: "server", desc: "LCP Optimization & Lazy Loading Logic" },
        { id: "storage", label: "Vercel Blob", type: "db", desc: "Native SDK Global Asset Distribution" }
      ],
      edges: [
        { from: "ui", to: "optimization", label: "RENDER" },
        { from: "optimization", to: "storage", label: "STREAM" }
      ]
    }
  }
];

const BASE = "https://next-labs-one.vercel.app";

export const featureLabs: FeatureLab[] = [
  {
    category: "Interactive & UI Lab",
    icon: Paintbrush,
    tagline: "Bridging the gap to native experience.",
    items: [
      { name: "View Transition Gallery", path: "app/interactive-ui-lab/view-transitions/page.tsx", badge: "NATIVE API", desc: "Seamless layout morphing across Next.js routing using the native CSS View Transitions API.", url: `${BASE}/interactive-ui-lab/view-transitions` },
      { name: "Modal Gallery", path: "app/routing-lab/modal-gallery/page.tsx", badge: "NEW", desc: "Sub-frame modal experience built with Parallel & Intercepting Routes for zero-layout-shift overlays without a full page navigation.", url: `${BASE}/routing-lab/modal-gallery` }
    ]
  },
  {
    category: "The Performance Lab",
    icon: Zap,
    tagline: "Pushing responsiveness to 60fps limits.",
    items: [
      { name: "Specimen 07: Zero-State Server CRUD", path: "app/performance-lab/server-crud/page.tsx", badge: "NEW · 0KB STATE", desc: "A full CRUD application with 0kb of client-side state, powered entirely by Server Actions and revalidatePath() for instant cache invalidation.", url: `${BASE}/performance-lab/server-crud` },
      { name: "Optimistic \"Like\" Button", path: "app/performance-lab/optimistic-like/page.tsx", badge: "NO LATENCY", desc: "Leveraging useOptimistic to create instantaneous feedback loops for database mutations.", url: `${BASE}/performance-lab/optimistic-like` },
      { name: "Search-as-you-go", path: "app/performance-lab/search-as-you-go/page.tsx", badge: "CONCURRENT REACT", desc: "Maintaining a snappy UI during heavy 10,000+ item filtering using useDeferredValue with initialValue support.", url: `${BASE}/performance-lab/search-as-you-go` },
      { name: "Specimen 06: The Memo-Free UI", path: "app/performance-lab/memo-free/page.tsx", badge: "REACT COMPILER", desc: "A high-density dashboard proving 60fps performance via the React Compiler Babel plugin without useMemo or useCallback.", url: `${BASE}/performance-lab/memo-free` }
    ]
  },
  {
    category: "The Rendering Lab",
    icon: Cpu,
    tagline: "Breaking the core of Next.js data fetching.",
    items: [
      { name: "Specimen 08: BFF Stock Ticker", path: "app/the-rendering/bff-stocks/page.tsx", badge: "NEW · REAL-TIME", desc: "Backend-for-Frontend pattern using useSyncExternalStore to subscribe to a real-time aggregated stock feed from a Next.js Route Handler.", url: `${BASE}/the-rendering/bff-stocks` },
      { name: "Zero-JS Data Table", path: "app/the-rendering/zero-js-table/page.tsx", badge: "0KB CLIENT JS", desc: "High-performance grid using Server Components and asynchronous searchParams for fetching and filtering.", url: `${BASE}/the-rendering/zero-js-table` },
      { name: "PPR Dashboard", path: "app/the-rendering/ppr-dashboard/page.tsx", badge: "EXPERIMENTAL PPR", desc: "Utilizing Partial Prerendering to serve static shells instantly while streaming dynamic user data into Suspense holes.", url: `${BASE}/the-rendering/ppr-dashboard` },
      { name: "The use cache Specimen", path: "app/the-rendering/use-cache-specimen/page.tsx", badge: "V16.0.0", desc: "Exploring component-level caching with the new \"use cache\" directive and granular cacheLife profiles.", url: `${BASE}/the-rendering/use-cache-specimen` },
      { name: "Infinite Scroll Native", path: "app/the-rendering/infinite-scroll/page.tsx", badge: "SERVER ACTIONS", desc: "Server-side infinite scrolling implemented with Server Actions and useActionState without external libraries.", url: `${BASE}/the-rendering/infinite-scroll` },
      { name: "Specimen 03: The proxy.ts Interceptor", path: "app/the-rendering/proxy-specimen/page.tsx", badge: "SECURITY HOOK", desc: "Centralized layer for JWT rotation, geo-fencing, and request fingerprinting using the Next.js Proxy layer.", url: `${BASE}/the-rendering/proxy-specimen` }
    ]
  }
];
