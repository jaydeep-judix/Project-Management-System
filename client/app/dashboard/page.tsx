"use client";

import { useEffect, useState, useCallback } from "react";
import Greeting from "@/components/dashboard/Greeting";
import { Navbar } from "@/components/dashboard/Navbar";
import { TaskOverviewCard } from "@/components/dashboard/PieChart";
import { RecentProjects } from "@/components/dashboard/RecentProjects";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { StatCard } from "@/components/dashboard/StatCard";
import { projectService } from "@/services/project-service";
import { authService } from "@/services/auth-service";
import { DashboardStats } from "@/components/types";

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    completed: 0,
    inProgress: 0,
    pending: 0,
    totalTasks: 0,
    doneTasks: 0,
    inProgressTasks: 0,
    pendingTasks: 0,
    recentProjects: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = useCallback(async () => {
    try {
      const user = await authService.getCurrentUser();
      const projects = await projectService.getProjects(user.id);

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

      setStats({
        completed,
        inProgress,
        pending,
        totalTasks: doneTasks + inProgressTasks + pendingTasks,
        doneTasks,
        inProgressTasks,
        pendingTasks,
        recentProjects,
      });
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const totalTasks =
    stats.doneTasks + stats.inProgressTasks + stats.pendingTasks;

  return (
    <div className="flex h-screen bg-zinc-50/50 overflow-hidden text-zinc-900">
      <Sidebar />

      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <Navbar />

        <main className="flex-1 p-8 overflow-y-auto custom-scrollbar">
          <div className="max-w-[1600px] mx-auto space-y-6">
            <Greeting />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard
                title="Projects Completed"
                value={loading ? "—" : stats.completed}
              />
              <StatCard
                title="Projects In-progress"
                value={loading ? "—" : stats.inProgress}
              />
              <StatCard
                title="Task In-Progress"
                value={loading ? "—" : stats.inProgressTasks}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-8">
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
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
