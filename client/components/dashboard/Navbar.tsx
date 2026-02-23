"use client";

import { Search, Plus, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Profile from "./icons/Profile";

import { NewProjectDialog } from "@/components/projects/NewProjectDialog";

export function Navbar({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "flex h-16 items-center justify-between border-b bg-white px-8 transition-all shrink-0",
        className,
      )}
    >
      <div className="flex items-center w-full max-w-lg gap-3 rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-2.5 focus-within:bg-white focus-within:ring-2 focus-within:ring-zinc-900/5 transition-all group">
        <Search
          size={18}
          className="text-zinc-400 group-focus-within:text-zinc-900 transition-colors"
        />
        <input
          type="text"
          placeholder="Search projects, tasks, or commands..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-400 text-zinc-900"
        />
        <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-white px-1.5 font-mono text-[10px] font-medium text-zinc-400">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden sm:block">
          <NewProjectDialog onSuccess={() => window.location.reload()}>
            <Button className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl px-5 py-5 shadow-sm active:scale-95 transition-all">
              <Plus size={18} />
              <span className="text-sm font-semibold tracking-wide">
                New Project
              </span>
            </Button>
          </NewProjectDialog>
        </div>

        <div className="flex items-center gap-3 pl-2 cursor-pointer group">
          <div className="h-10 w-10 rounded-full overflow-hidden ring-2 ring-zinc-50 group-hover:ring-zinc-200 transition-all shadow-sm">
            <Profile className="scale-50 object-fit" />
          </div>
        </div>
      </div>
    </header>
  );
}
