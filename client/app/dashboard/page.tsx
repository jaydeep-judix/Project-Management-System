"use client";

import { useEffect, useState, useCallback } from "react";
import { useMemo } from "react";
import Greeting from "@/components/dashboard/Greeting";
import { Navbar } from "@/components/dashboard/Navbar";
import { TaskOverviewCard } from "@/components/dashboard/PieChart";
import { RecentProjects } from "@/components/dashboard/RecentProjects";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { StatCard } from "@/components/dashboard/StatCard";
import { useProjects } from "@/context/ProjectContext";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const { projects, loading } = useProjects();

  const stats = useMemo(() => {
    let completed = 0;
    let inProgress = 0;
    let pending = 0;
    let doneTasks = 0;
    let inProgressTasks = 0;
    let pendingTasks = 0;

    projects.forEach((p: any) => {
      if (p.status === "done") completed++;
      else if (p.status === "in-progress") inProgress++;
      else pending++;

      (p.tasks || []).forEach((t: any) => {
        if (t.status === "done") doneTasks++;
        else if (t.status === "in-progress") inProgressTasks++;
        else pendingTasks++;
      });
    });

    const recentProjects = [...projects]
      .sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 3)
      .map((p: any) => ({
        id: p._id,
        name: p.name,
        status: p.status,
        createdAt: p.createdAt,
      }));

    return {
      completed,
      inProgress,
      pending,
      totalTasks: doneTasks + inProgressTasks + pendingTasks,
      doneTasks,
      inProgressTasks,
      pendingTasks,
      recentProjects,
    };
  }, [projects]);

  const totalTasks =
    stats.doneTasks + stats.inProgressTasks + stats.pendingTasks;

  return (
    <div className="flex h-screen bg-zinc-50/50 overflow-hidden text-zinc-900">
      <Sidebar />

      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <Navbar />

        <main className="flex-1 p-4 sm:p-8 overflow-y-auto custom-scrollbar relative">
          <div className="max-w-[1600px] mx-auto space-y-6">
            <Greeting />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <StatCard
                title="Projects Completed"
                value={stats.completed}
                loading={loading}
              />
              <StatCard
                title="Projects In-progress"
                value={stats.inProgress}
                loading={loading}
              />
              <StatCard
                title="Task In-Progress"
                value={stats.inProgressTasks}
                loading={loading}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 pb-8">
              <RecentProjects
                className="h-full"
                projects={stats.recentProjects}
                loading={loading}
              />
              <TaskOverviewCard
                className="h-full"
                total={totalTasks || 1}
                completed={stats.doneTasks}
                inProgress={stats.inProgressTasks}
                notStarted={stats.pendingTasks}
                loading={loading}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
