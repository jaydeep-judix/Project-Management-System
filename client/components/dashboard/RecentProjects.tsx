"use client";

import { cn } from "@/lib/utils";
import { RecentProjectsProps } from "./types/types";

const statusColor: Record<string, string> = {
  done: "bg-emerald-500",
  "in-progress": "bg-amber-500",
  pending: "bg-zinc-200",
};

const statusLabel: Record<string, string> = {
  done: "Completed",
  "in-progress": "In Progress",
  pending: "Pending",
};

export function RecentProjects({
  className,
  projects,
  loading,
}: RecentProjectsProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-2xl bg-white border border-zinc-200 shadow-sm p-6 hover:shadow-md transition-all",
        className,
      )}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-zinc-900 tracking-tight">
            Recent Projects
          </h2>
          <p className="text-sm text-zinc-500">Overview of your latest work</p>
        </div>
        <button className="text-xs font-bold text-zinc-400 hover:text-zinc-900 underline underline-offset-4 transition-colors">
          View All
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {loading ? (
          [1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-xl border border-zinc-100 px-5 py-4 animate-pulse"
            >
              <div className="flex items-center gap-4">
                <div className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
                <div className="flex flex-col gap-1.5">
                  <div className="h-3 w-32 rounded bg-zinc-200" />
                  <div className="h-2.5 w-16 rounded bg-zinc-100" />
                </div>
              </div>
              <div className="h-2.5 w-20 rounded bg-zinc-100" />
            </div>
          ))
        ) : projects.length === 0 ? (
          <div className="flex h-24 items-center justify-center text-sm text-zinc-400 font-medium">
            No projects yet. Create your first one!
          </div>
        ) : (
          projects.map((project) => (
            <div
              key={project.id}
              className="group flex items-center justify-between rounded-xl border border-zinc-100 bg-white px-5 py-4 transition-all hover:border-zinc-200 hover:bg-zinc-50/50 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <span
                  className={cn(
                    "h-2.5 w-2.5 rounded-full ring-2 ring-white shadow-sm",
                    statusColor[project.status] ?? "bg-zinc-200",
                  )}
                />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-zinc-900 group-hover:text-black transition-colors">
                    {project.name}
                  </span>
                  <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest">
                    {statusLabel[project.status] ?? project.status}
                  </span>
                </div>
              </div>
              <span className="text-[11px] font-bold text-zinc-400 group-hover:text-zinc-500 transition-colors">
                {new Date(project.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
