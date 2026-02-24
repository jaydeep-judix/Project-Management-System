"use client";

import { cn } from "@/lib/utils";
import { RecentProjectsProps } from "./types/types";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { NewProjectDialog } from "../projects/NewProjectDialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

const statusColor: Record<string, string> = {
  done: "bg-emerald-500",
  "in-progress": "bg-orange-500",
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
        <Link href="/projects">
          <button className="text-xs font-bold text-zinc-400 hover:text-zinc-900 underline cursor-pointer underline-offset-4 transition-colors">
            View All
          </button>
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {loading ? (
          [1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-xl border border-zinc-100 px-5 py-4"
            >
              <div className="flex items-center gap-4">
                <Skeleton className="h-2.5 w-2.5 rounded-full" />
                <div className="flex flex-col gap-1.5">
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-2.5 w-16" />
                </div>
              </div>
              <Skeleton className="h-2.5 w-20" />
            </div>
          ))
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 rounded-xl border border-dashed border-zinc-100 bg-zinc-50/30">
            <p className="text-sm text-zinc-500 font-medium text-center mb-4">
              No projects yet. Start tracking your latest work!
            </p>
            <NewProjectDialog onSuccess={() => window.location.reload()}>
          <Button className="text-xs font-bold px-4 py-2 bg-white border border-zinc-200 rounded-lg text-zinc-900 hover:bg-zinc-50 transition-colors shadow-sm">
            <Plus size={18} />
            <span className="hidden sm:inline text-sm font-semibold tracking-wide">
              New Project
            </span>
          </Button>
        </NewProjectDialog>
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
