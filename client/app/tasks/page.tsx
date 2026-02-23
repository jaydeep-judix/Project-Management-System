"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Navbar } from "@/components/dashboard/Navbar";
import { TaskDataTable } from "@/components/tasks/task-data-table";
import { useEffect, useState, useCallback, useMemo } from "react";
import { projectService } from "@/services/project-service";
import { authService } from "@/services/auth-service";
import { getTaskColumns } from "@/components/tasks/task-columns";
import { ProjectTaskDetail } from "@/components/tasks/types/types";
import { NewTaskDialog } from "@/components/tasks/NewTaskDialog";

export default function TasksPage() {
  const [projectsData, setProjectsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const user = await authService.getCurrentUser();
      const data = await projectService.getProjects(user.id);
      setProjectsData(data);
    } catch (error) {
      console.error("Failed to fetch tasks/projects:", error);
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
              <div className="flex h-[400px] items-center justify-center text-zinc-500 font-medium">
                Loading tasks...
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
