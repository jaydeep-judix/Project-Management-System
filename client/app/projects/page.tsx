"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Navbar } from "@/components/dashboard/Navbar";
import { DataTable } from "@/components/projects/data-table";
import { columns } from "@/components/projects/columns";
import { ProjectTask } from "@/components/projects/types/types";
import { NewProjectDialog } from "@/components/projects/NewProjectDialog";

import { useEffect, useState, useCallback } from "react";
import { projectService } from "@/services/project-service";
import { authService } from "@/services/auth-service";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectTask[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = useCallback(async () => {
    try {
      const user = await authService.getCurrentUser();
      const data = await projectService.getProjects(user.id);

      const mappedProjects: ProjectTask[] = data.map((p: any) => ({
        id: p._id,
        title: p.name,
        taskCount: p.tasks?.length || 0,
        status: p.status || "pending",
      }));

      setProjects(mappedProjects);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <div className="flex h-screen bg-zinc-50/50 overflow-hidden">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 p-8 overflow-y-auto custom-scrollbar">
          <div className="max-w-[1600px] mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
                  Projects
                </h1>
                <p className="text-zinc-500 mt-1">
                  Manage and track your projects and their associated tasks.
                </p>
              </div>
              <NewProjectDialog onSuccess={fetchProjects} />
            </div>

            {loading ? (
              <div className="flex h-[400px] items-center justify-center text-zinc-500 font-medium">
                Loading projects...
              </div>
            ) : (
              <DataTable columns={columns} data={projects} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
