"use client";

import { cn } from "@/lib/utils";
import { TrendingUp, FolderCheck, Clock, Activity } from "lucide-react";

type StatCardProps = {
  title: string;
  value: string | number;
  className?: string;
};

const iconMap: Record<string, any> = {
  "Projects Completed": FolderCheck,
  "Projects In-progress": Activity,
  "Task In-Progress": Clock,
};

export function StatCard({ title, value, className }: StatCardProps) {
  const Icon = iconMap[title] || Activity;

  return (
    <div
      className={cn(
        "group relative flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-zinc-300 transition-all duration-300",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <div className="rounded-xl bg-zinc-50 p-2 text-zinc-900 group-hover:bg-zinc-100 transition-colors">
          <Icon size={20} strokeWidth={2.5} />
        </div>
      </div>

      <div className="space-y-0.5">
        <p className="text-xs font-medium text-zinc-500">{title}</p>
        <div className="flex items-baseline gap-2">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
            {value}
          </h2>
          <span className="text-[10px] font-semibold text-zinc-400">
            / this month
          </span>
        </div>
      </div>
    </div>
  );
}
