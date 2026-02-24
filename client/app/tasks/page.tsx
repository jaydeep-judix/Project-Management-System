"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Navbar } from "@/components/dashboard/Navbar";
import { TaskDataTable } from "@/components/tasks/table/task-data-table";
import { useEffect, useState, useCallback, useMemo } from "react";
import { projectService } from "@/services/project-service";
import { authService } from "@/services/auth-service";
import { getTaskColumns } from "@/components/tasks/table/task-columns";
import { ProjectTaskDetail } from "@/components/tasks/types/types";
import { NewTaskDialog } from "@/components/tasks/NewTaskDialog";
import { toast } from "sonner";

export default function TasksPage() {
  const [projectsData, setProjectsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const user = await authService.getCurrentUser();
      const data = await projectService.getProjects(user.id);
      setProjectsData(data);
    } catch (error) {
      toast.error("Failed to load tasks and projects.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const allTasks = useMemo(() => {
    const tasks: ProjectTaskDetail[] = [];
    projectsData.forEach((project) => {
      (project.tasks || []).forEach((task: any) => {
        tasks.push({
          id: task._id,
          projectId: project._id,
          taskTitle: task.title,
          projectTitle: project.name,
          status: task.status || "pending",
        });
      });
    });
    return tasks;
  }, [projectsData]);

  const projectsList = useMemo(() => {
    return projectsData.map((p) => ({ id: p._id, title: p.name }));
  }, [projectsData]);

  const columns = useMemo(() => getTaskColumns(fetchData), [fetchData]);

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
                  Tasks
                </h1>
                <p className="text-zinc-500 mt-1">
                  Manage and track your individual tasks across all projects.
                </p>
              </div>
              <NewTaskDialog projects={projectsList} onSuccess={fetchData} />
            </div>

            {loading ? (
              <div className="flex h-[400px] items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-900 border-t-transparent"></div>
                  <p className="text-zinc-500 font-medium animate-pulse">
                    Loading tasks...
                  </p>
                </div>
              </div>
            ) : allTasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 px-4 rounded-3xl border-2 border-dashed border-zinc-200 bg-white shadow-sm animate-fade-in">
                <h3 className="text-xl font-bold text-zinc-900 mb-2">
                  No tasks found
                </h3>

                <p className="text-zinc-500 text-center max-w-[400px] mb-8">
                  Get started by creating your first task to stay organized and
                  track progress across your projects efficiently.
                </p>
              </div>
            ) : (
              <TaskDataTable columns={columns} data={allTasks} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
