"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import LegendItem from "./ui/LegendItem";
import { TaskOverviewProps } from "./types/types";


export function TaskOverviewCard({
  total,
  completed,
  inProgress,
  notStarted,
  className,
}: TaskOverviewProps) {
  const completedPercent = (completed / total) * 100;
  const inProgressPercent = (inProgress / total) * 100;

  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm border border-zinc-200 hover:shadow-md transition-all",
        className,
      )}
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-lg font-bold text-zinc-900 tracking-tight">
            Task Overview
          </h2>
          <p className="text-sm text-zinc-500">Distribution of progress</p>
        </div>

        <button className="flex items-center gap-2 rounded-xl border border-zinc-200 px-3 py-1.5 text-xs font-bold text-zinc-600 hover:bg-zinc-50 transition-colors">
          This Week
          <ChevronDown size={14} strokeWidth={3} />
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-around gap-10 flex-1">
        <div className="relative h-52 w-52 transition-transform hover:scale-105 duration-500 shrink-0">
          <div
            className="h-full w-full rounded-full"
            style={{
              background: `conic-gradient(
                #18181b 0% ${inProgressPercent}%,
                #71717a ${inProgressPercent}% ${
                  inProgressPercent + completedPercent
                }%,
                #e4e4e7 ${inProgressPercent + completedPercent}% 100%
              )`,
            }}
          />

          <div className="absolute inset-10 flex flex-col items-center justify-center rounded-full bg-white shadow-inner">
            <span className="text-4xl font-black text-zinc-900 leading-none">
              {completed}
            </span>
            <span className="text-xs font-bold text-zinc-400 mt-1 uppercase tracking-widest">
              DONE / {total}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-8 w-full max-w-[220px]">
          <LegendItem
            color="bg-zinc-900"
            value={inProgress}
            label="In Progress"
            total={total}
          />
          <LegendItem
            color="bg-zinc-400"
            value={completed}
            label="Completed"
            total={total}
          />
          <LegendItem
            color="bg-zinc-100"
            value={notStarted}
            label="Yet to Start"
            total={total}
          />
        </div>
      </div>
    </div>
  );
}
