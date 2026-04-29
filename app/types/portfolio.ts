export interface ProjectHighlight {
  name: string;
  description: string;
  highlights: string[];
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  projects: ProjectHighlight[];
}

export interface Skill {
  category: string;
  items: string[];
  icon: string;
}

export interface ProjectGraphNode {
  id: string;
  label: string;
  type: string;
  desc: string;
}

export interface ProjectGraphEdge {
  from: string;
  to: string;
  label: string;
}

export interface ProjectGraph {
  nodes: ProjectGraphNode[];
  edges: ProjectGraphEdge[];
}

export interface ProjectDemoCredential {
  role: string;
  email: string;
  password: string;
  icon: string;
}

export interface GithubProject {
  name: string;
  icon: string;
  description: string;
  features: string[];
  highlight?: string;
  status?: string;
  tech: string[];
  github: string;
  demo?: string;
  demoCredentials?: ProjectDemoCredential[];
  graph?: ProjectGraph;
}

export interface FeatureLabItem {
  name: string;
  path: string;
  badge: string;
  desc: string;
  url?: string;
  purpose: string;
  tech_used: string[];
  included_in: string;
  is_experimental: boolean;
  summary: string;
}

export interface FeatureLab {
  category: string;
  icon: string;
  tagline: string;
  items: FeatureLabItem[];
}
