"use client";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  LayoutDashboard,
  Folder,
  CheckSquare,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { authService } from "@/services/auth-service";
import { useProjects } from "@/context/ProjectContext";

interface SidebarProps {
  className?: string;
  onClose?: () => void;
}

export function Sidebar({ className, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { projects } = useProjects();

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch {}
    window.location.href = "/login";
  };

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Projects", href: "/projects", icon: Folder },
    { label: "Tasks", href: "/tasks", icon: CheckSquare },
  ];

  return (
    <aside
      className={cn(
        "sticky top-0 h-screen w-64 flex-col border-r bg-white text-zinc-600 shadow-sm transition-all hidden lg:flex shrink-0",
        className,
      )}
    >
      <div className="px-7 py-8">
        <Link href="/login">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-zinc-900">
              Judix
            </h1>
          </div>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto sidebar-scroll flex flex-col gap-8">
        <nav className="flex flex-col gap-1.5 px-3 mt-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all group",
                  isActive
                    ? "bg-zinc-100/80 text-zinc-900 shadow-sm"
                    : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900",
                )}
              >
                <item.icon
                  size={18}
                  className={cn(
                    isActive
                      ? "text-zinc-900"
                      : "text-zinc-400 group-hover:text-zinc-900",
                  )}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3">
          <div className="flex items-center justify-between px-4 mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Projects
            </h2>
          </div>

          <div className="flex flex-col gap-1">
            {projects.map((project) => (
              <Link
                key={project._id}
                href={`/projects/${project._id}`}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-2 text-sm font-medium transition-all",
                  pathname === `/projects/${project._id}`
                    ? "bg-zinc-100/80 text-zinc-900"
                    : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900",
                )}
              >
                <div
                  className={cn(
                    "h-2 w-2 rounded-full shrink-0",
                    project.status === "done"
                      ? "bg-emerald-500"
                      : project.status === "in-progress"
                      ? "bg-orange-500"
                      : "bg-zinc-300",
                  )}
                />
                <span className="truncate">{project.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-auto p-4 space-y-2 border-t border-zinc-100/60">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start gap-3 rounded-xl px-4 py-2 text-sm font-medium text-zinc-500 hover:bg-red-50 hover:text-red-600 transition-all"
        >
          <LogOut size={18} />
          Logout
        </Button>
      </div>
    </aside>
  );
}