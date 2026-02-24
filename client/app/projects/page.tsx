"use client";

import { useMemo } from "react";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Navbar } from "@/components/dashboard/Navbar";
import { DataTable } from "@/components/projects/table/data-table";
import { columns } from "@/components/projects/table/columns";
import { ProjectTask } from "@/components/projects/types/types";
import { NewProjectDialog } from "@/components/projects/NewProjectDialog";

import { useProjects } from "@/context/ProjectContext";

export default function ProjectsPage() {
  const { projects: rawProjects, loading, refreshProjects } = useProjects();

  const projects = useMemo(() => {
    return rawProjects.map((p: any) => ({
      id: p._id,
      title: p.name,
      taskCount: p.tasks?.length || 0,
      status: p.status || "pending",
    })) as ProjectTask[];
  }, [rawProjects]);

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
              <NewProjectDialog onSuccess={refreshProjects} />
            </div>

            {loading ? (
              <div className="flex h-[400px] items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-900 border-t-transparent"></div>
                  <p className="text-zinc-500 font-medium animate-pulse">
                    Loading projects...
                  </p>
                </div>
              </div>
            ) : projects.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 px-4 rounded-3xl border-2 border-dashed border-zinc-200 bg-white shadow-sm animate-fade-in">
                <h3 className="text-xl font-bold text-zinc-900 mb-2">
                  No projects found
                </h3>
                <p className="text-zinc-500 text-center max-w-[400px] mb-8">
                  Get started by creating your first project to manage your
                  tasks and track your progress efficiently.
                </p>
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
