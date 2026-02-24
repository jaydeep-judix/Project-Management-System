"use client";

import { cn } from "@/lib/utils";
import LegendItem from "./ui/LegendItem";
import { TaskOverviewProps } from "./types/types";
import { Skeleton } from "../ui/skeleton";

export function TaskOverviewCard({
  total,
  completed,
  inProgress,
  notStarted,
  className,
  loading,
}: TaskOverviewProps & { loading?: boolean }) {
  const completedPercent = total > 0 ? (completed / total) * 100 : 0;
  const inProgressPercent = total > 0 ? (inProgress / total) * 100 : 0;

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
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-around gap-8 sm:gap-10 flex-1">
        <div className="relative h-44 w-44 sm:h-52 sm:w-52 transition-transform hover:scale-105 duration-500 shrink-0">
          {loading ? (
            <Skeleton className="h-full w-full rounded-full" />
          ) : (
            <div
              className="h-full w-full rounded-full"
              style={{
                background: `conic-gradient(
                  #f97316 0% ${inProgressPercent}%,
                  #10b981 ${inProgressPercent}% ${
                    inProgressPercent + completedPercent
                  }%,
                  #e4e4e7 ${inProgressPercent + completedPercent}% 100%
                )`,
              }}
            />
          )}

          <div className="absolute inset-8 sm:inset-10 flex flex-col items-center justify-center rounded-full bg-white shadow-inner">
            {loading ? (
              <Skeleton className="h-10 w-12 rounded-lg" />
            ) : (
              <>
                <span className="text-3xl sm:text-4xl font-black text-zinc-900 leading-none">
                  {completed}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-zinc-400 mt-1 uppercase tracking-widest text-center">
                  DONE / {total}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:gap-8 w-full max-w-[220px]">
          <LegendItem
            color="bg-orange-500"
            value={inProgress}
            label="In Progress"
            total={total}
            loading={loading}
          />
          <LegendItem
            color="bg-emerald-500"
            value={completed}
            label="Completed"
            total={total}
            loading={loading}
          />
          <LegendItem
            color="bg-zinc-100"
            value={notStarted}
            label="Pending"
            total={total}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
