"use client";

import { cn } from "@/lib/utils";
import { ProjectStatus, StatusIndicatorProps } from "./types/types";

const statusConfig: Record<ProjectStatus, { color: string; label: string }> = {
  Pending: { color: "bg-gray-400", label: "Pending" },
  Started: { color: "bg-gray-400", label: "Started" },
  "In Progress": { color: "bg-orange-500", label: "In Progress" },
  Completed: { color: "bg-green-500", label: "Completed" },
};

export function ProjectStatusBadge({
  status,
  className,
}: StatusIndicatorProps) {
  const config = statusConfig[status] || statusConfig["Pending"];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className={cn("h-2.5 w-2.5 rounded-full", config.color)} />
      <span className="text-sm font-medium text-zinc-700">{config.label}</span>
    </div>
  );
}
