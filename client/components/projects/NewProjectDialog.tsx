"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { projectService } from "@/services/project-service";
import { authService } from "@/services/auth-service";

export function NewProjectDialog({
  onSuccess,
  children,
}: {
  onSuccess?: () => void;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await authService.getCurrentUser();
      await projectService.createProject(name, user.id);
      setName("");
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error("Failed to create project:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl px-6 py-6 h-auto font-bold shadow-sm transition-all active:scale-95 gap-2">
            <Plus size={20} strokeWidth={3} />
            New Project
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-2xl border-zinc-200">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-zinc-900">
            Create Project
          </DialogTitle>
          <DialogDescription className="text-zinc-500">
            Give your project a name to get started. You can add tasks later.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-bold text-zinc-700">
              Project Name
            </Label>
            <Input
              id="name"
              placeholder="e.g., E-commerce Redesign"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11 rounded-xl border-zinc-200 bg-zinc-50/50 focus:bg-white transition-colors"
              required
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl h-12 font-bold transition-all active:scale-[0.98]"
            >
              {loading ? "Creating..." : "Create Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
