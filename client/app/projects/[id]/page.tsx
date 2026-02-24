"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Navbar } from "@/components/dashboard/Navbar";
import { TaskDataTable } from "@/components/tasks/table/task-data-table";
import { getTaskColumns } from "@/components/tasks/table/task-columns";
import { ProjectTaskDetail } from "@/components/tasks/types/types";
import { NewTaskDialog } from "@/components/tasks/NewTaskDialog";

import { useMemo } from "react";
import { useParams } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import { useProjects } from "@/context/ProjectContext";
import { cn } from "@/lib/utils";

export default function ProjectDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { projects, loading, refreshProjects } = useProjects();

  const project = useMemo(() => {
    return projects.find((p) => p._id === id);
  }, [projects, id]);

  const tasks = useMemo(() => {
    if (!project || !project.tasks) return [];
    return project.tasks.map((task: any) => ({
      id: task._id,
      projectId: project._id,
      taskTitle: task.title,
      projectTitle: project.name,
      status: task.status || "pending",
    })) as ProjectTaskDetail[];
  }, [project]);

  const columns = useMemo(
    () => getTaskColumns(refreshProjects),
    [refreshProjects],
  );

  const projectsList = useMemo(() => {
    if (!project) return [];
    return [{ id: project._id, title: project.name }];
  }, [project]);

  if (loading) {
    return (
      <div className="flex h-screen bg-zinc-50/50 overflow-hidden text-zinc-900">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Navbar />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-zinc-500 font-medium">
              Loading project details...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex h-screen bg-zinc-50/50 overflow-hidden text-zinc-900">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Navbar />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-zinc-500 font-medium whitespace-pre-wrap text-center">
              <h1 className="text-2xl font-bold text-zinc-900 mb-2">
                Project Not Found
              </h1>
              <p>
                The project you are looking for does not exist or you don't have
                access.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-zinc-50/50 overflow-hidden text-zinc-900">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 p-4 sm:p-8 overflow-y-auto custom-scrollbar">
          <div className="max-w-[1600px] mx-auto space-y-6 sm:space-y-8">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-sm space-y-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-zinc-900 leading-tight sm:leading-none">
                      {project.name}
                    </h1>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={cn(
                          "border rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider",
                          project.status === "done"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-50"
                            : project.status === "in-progress"
                              ? "bg-orange-50 text-orange-700 border-orange-100 hover:bg-orange-50"
                              : "bg-zinc-50 text-zinc-700 border-zinc-100 hover:bg-zinc-50",
                        )}
                      >
                        {project.status === "done"
                          ? "Done"
                          : project.status === "in-progress"
                            ? "In Progress"
                            : "Pending"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-zinc-500 text-xs sm:text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-zinc-400 sm:size-4" />
                      <span>
                        Created{" "}
                        {new Date(project.createdAt).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-zinc-400 sm:size-4" />
                      <span>{project.tasks?.length || 0} Tasks</span>
                    </div>
                  </div>
                </div>

                <div className="flex">
                  <NewTaskDialog
                    projects={projectsList}
                    onSuccess={refreshProjects}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-xl font-bold text-zinc-900 tracking-tight">
                  Project Tasks
                </h2>
              </div>
              <TaskDataTable columns={columns} data={tasks} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
