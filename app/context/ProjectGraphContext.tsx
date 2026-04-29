"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ProjectGraphContextType {
  activeProjectGraph: any;
  setActiveProjectGraph: (project: any) => void;
}

const ProjectGraphContext = createContext<ProjectGraphContextType | undefined>(undefined);

export function ProjectGraphProvider({ children }: { children: ReactNode }) {
  const [activeProjectGraph, setActiveProjectGraph] = useState<any>(null);

  return (
    <ProjectGraphContext.Provider value={{ activeProjectGraph, setActiveProjectGraph }}>
      {children}
    </ProjectGraphContext.Provider>
  );
}

export function useProjectGraph() {
  const context = useContext(ProjectGraphContext);
  if (context === undefined) {
    throw new Error("useProjectGraph must be used within a ProjectGraphProvider");
  }
  return context;
}
