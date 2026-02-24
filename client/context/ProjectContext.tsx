"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { projectService } from "@/services/project-service";
import { authService } from "@/services/auth-service";
import { usePathname } from "next/navigation";


interface Project {
  _id: string;
  name: string;
  status: string;
  userId: string;
  tasks: any[];
  createdAt: string;
  updatedAt: string;
}

interface ProjectContextType {
  projects: Project[];
  loading: boolean;
  refreshProjects: () => Promise<void>;
  updateProjectInState: (projectId: string, updates: Partial<Project>) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  const refreshProjects = useCallback(async () => {
    setLoading(true);
    try {
      const user = await authService.getCurrentUser();
      if (user?.id) {
        const data = await projectService.getProjects(user.id);
        setProjects(data);
      } else {
        setProjects([]);
      }
    } catch (error) {
      console.error("Failed to fetch projects in context:", error);
     
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {

    refreshProjects();
  }, [refreshProjects, pathname]);

  const updateProjectInState = useCallback(
    (projectId: string, updates: Partial<Project>) => {
      setProjects((prev) =>
        prev.map((p) => (p._id === projectId ? { ...p, ...updates } : p)),
      );
    },
    [],
  );

  return (
    <ProjectContext.Provider
      value={{ projects, loading, refreshProjects, updateProjectInState }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectProvider");
  }
  return context;
}
