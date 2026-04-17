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
      { role: "Admin", email: "admin@eventlogix.com", password: "password123", icon: Shield },
      { role: "Staff", email: "staff@eventlogix.com", password: "password123", icon: Users },
      { role: "Public", email: "public@eventlogix.com", password: "password123", icon: User }
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
      {
        name: "View Transitions API",
        path: "app/interactive-ui-lab/view-transitions/page.tsx",
        badge: "NATIVE API",
        desc: "Seamless layout morphing across Next.js routing.",
        url: `${BASE}/interactive-ui-lab/view-transitions`,
        purpose: "Native layout morphing across Next.js routing.",
        tech_used: ["View Transitions API", "Next.js App Router"],
        included_in: "Next 15+",
        is_experimental: true,
        summary: "Implements seamless, native page transitions using the browser's View Transitions API, integrated with Next.js routing for layout morphing."
      }
    ]
  },
  {
    category: "Routing Lab",
    icon: Layers,
    tagline: "Advanced navigational architectural patterns.",
    items: [
      {
        name: "Modal Gallery",
        path: "app/routing-lab/modal-gallery/page.tsx",
        badge: "PARALLEL",
        desc: "Sub-frame modal experience without full navigation.",
        url: `${BASE}/routing-lab/modal-gallery`,
        purpose: "Implementation of Parallel & Intercepting Routes for a sub-frame modal experience.",
        tech_used: ["Parallel Routes", "Intercepting Routes"],
        included_in: "Next 13.3+",
        is_experimental: false,
        summary: "A sophisticated routing pattern that allows displaying a modal while keeping the underlying page interactive and accessible via its own URL."
      }
    ]
  },
  {
    category: "The Performance Lab",
    icon: Zap,
    tagline: "Pushing responsiveness to 60fps limits.",
    items: [
      {
        name: "Zero-State Server CRUD",
        path: "app/performance-lab/server-crud/page.tsx",
        badge: "0KB STATE",
        desc: "Full CRUD application with 0kb client-side state.",
        url: `${BASE}/performance-lab/server-crud`,
        purpose: "A CRUD application with 0kb client-side state, powered entirely by Server Actions.",
        tech_used: ["Server Actions", "revalidatePath()", "Server Components"],
        included_in: "Next 14+",
        is_experimental: false,
        summary: "Demonstrates a 'Return to Simplicity' model where all state is handled on the server, eliminating client-side complexity and state sync issues."
      },
      {
        name: "Optimistic Mutations",
        path: "app/performance-lab/optimistic-like/page.tsx",
        badge: "NO LATENCY",
        desc: "Instant feedback for server mutations.",
        url: `${BASE}/performance-lab/optimistic-like`,
        purpose: "Instant UI feedback for server mutations using React 19's useOptimistic.",
        tech_used: ["useOptimistic", "useTransition", "Server Actions"],
        included_in: "Next 15+ / React 19",
        is_experimental: true,
        summary: "Uses the latest React 19 hooks to update the UI immediately upon user action, providing a perceived zero-latency experience despite network roundtrips."
      },
      {
        name: "Search-as-you-go",
        path: "app/performance-lab/search-as-you-go/page.tsx",
        badge: "CONCURRENT",
        desc: "Fluid filtering under heavy load.",
        url: `${BASE}/performance-lab/search-as-you-go`,
        purpose: "Fluid search filtering under heavy load using useDeferredValue.",
        tech_used: ["useDeferredValue", "useMemo"],
        included_in: "Next 13+ / React 18+",
        is_experimental: false,
        summary: "Prevents UI blocking during heavy computation (10,000+ items) by deferring non-urgent updates, keeping the input field fluid and responsive."
      },
      {
        name: "The Memo-Free Dashboard",
        path: "app/performance-lab/memo-free/page.tsx",
        badge: "COMPILER",
        desc: "Proving the power of the React Compiler.",
        url: `${BASE}/performance-lab/memo-free`,
        purpose: "Proving the power of the React Compiler without manual useMemo or useCallback.",
        tech_used: ["React Compiler", "Auto-memoization"],
        included_in: "Next 15+ / React 19",
        is_experimental: true,
        summary: "Showcases the new React Compiler's ability to automatically optimize component rendering, removing the need for manual memoization hooks."
      }
    ]
  },
  {
    category: "The Rendering Lab",
    icon: Cpu,
    tagline: "Breaking the core of Next.js data fetching.",
    items: [
      {
        name: "BFF Stock Ticker",
        path: "app/the-rendering/bff-stocks/page.tsx",
        badge: "REAL-TIME",
        desc: "Backend-for-Frontend pattern for real-time feeds.",
        url: `${BASE}/the-rendering/bff-stocks`,
        purpose: "Backend-for-Frontend pattern for real-time aggregated feeds.",
        tech_used: ["Route Handlers (BFF)", "useSyncExternalStore", "Edge Caching"],
        included_in: "Next 13+",
        is_experimental: false,
        summary: "Aggregates multiple mock market APIs into a single, cached Route Handler to reduce network overhead and protect upstream services."
      },
      {
        name: "Zero-JS Data Table",
        path: "app/the-rendering/zero-js-table/page.tsx",
        badge: "0KB JS",
        desc: "High-performance server-filtered table.",
        url: `${BASE}/the-rendering/zero-js-table`,
        purpose: "High-performance server-filtered tables using asynchronous searchParams.",
        tech_used: ["searchParams", "Server Components", "Suspense"],
        included_in: "Next 13+",
        is_experimental: false,
        summary: "An interactive data table that supports filtering and pagination entirely through URL parameters and server-side rendering, requiring 0kb of client JS."
      },
      {
        name: "PPR Dashboard",
        path: "app/the-rendering/ppr-dashboard/page.tsx",
        badge: "HYBRID",
        desc: "Instant static shells with streamed dynamic content.",
        url: `${BASE}/the-rendering/ppr-dashboard`,
        purpose: "Partial Prerendering (PPR) for instant static shells with streamed dynamic content.",
        tech_used: ["Partial Prerendering (PPR)", "Streaming", "Suspense boundaries"],
        included_in: "Next 15+",
        is_experimental: true,
        summary: "A hybrid rendering model that serves a static HTML shell immediately while lazily streaming dynamic components as they finish loading on the server."
      },
      {
        name: "The 'use cache' Directive",
        path: "app/the-rendering/use-cache-specimen/page.tsx",
        badge: "CACHE V1",
        desc: "Granular component-level caching.",
        url: `${BASE}/the-rendering/use-cache-specimen`,
        purpose: "Experimental component-level caching for granular performance control.",
        tech_used: ["\"use cache\" directive", "cacheLife profiles"],
        included_in: "Next 15+",
        is_experimental: true,
        summary: "Demonstrates the experimental Next.js directive for caching return values of functions or component outputs across requests."
      },
      {
        name: "Infinite Scroll Native",
        path: "app/the-rendering/infinite-scroll/page.tsx",
        badge: "PROGRESSIVE",
        desc: "Pure server-side infinite scrolling.",
        url: `${BASE}/the-rendering/infinite-scroll`,
        purpose: "Progressive enhancement for infinite feeds using useActionState.",
        tech_used: ["useActionState", "Server Actions", "Progressive Enhancement"],
        included_in: "Next 15+ / React 19",
        is_experimental: true,
        summary: "Implements a robust infinite scrolling mechanism using new React 19 state management for actions, ensuring compatibility with and without JavaScript."
      },
      {
        name: "Proxy Interceptors",
        path: "app/the-rendering/proxy-specimen/page.tsx",
        badge: "BLEEDING EDGE",
        desc: "Advanced request interception layer.",
        url: `${BASE}/the-rendering/proxy-specimen`,
        purpose: "Advanced proxy layer for JWT rotation and geo-fencing.",
        tech_used: ["Next.js 16 Proxy Layer", "Middleware Interceptors"],
        included_in: "Next 16+",
        is_experimental: true,
        summary: "Explores bleeding-edge proxying capabilities in Next.js 16 for intercepting and modifying requests at the framework level before they reach the application logic."
      }
    ]
  }
];
