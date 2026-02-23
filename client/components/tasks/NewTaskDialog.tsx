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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { projectService } from "@/services/project-service";
import { NewTaskDialogProps } from "./types/types";

export function NewTaskDialog({ projects, onSuccess }: NewTaskDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [projectId, setProjectId] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await projectService.addTask(projectId, title);
      setTitle("");
      setProjectId("");
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error("Failed to add task:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl px-6 py-6 h-auto font-bold shadow-sm transition-all active:scale-95 gap-2">
          <Plus size={20} strokeWidth={3} />
          New Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-2xl border-zinc-200">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-zinc-900">
            Add New Task
          </DialogTitle>
          <DialogDescription className="text-zinc-500">
            Fill in the details below to add a new task to your project.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="title"
                className="text-sm font-bold text-zinc-700"
              >
                Task Title
              </Label>
              <Input
                id="title"
                placeholder="e.g., Design homepage hero section"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-11 rounded-xl border-zinc-200 bg-zinc-50/50 focus:bg-white transition-colors"
                required
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="project"
                className="text-sm font-bold text-zinc-700"
              >
                Project
              </Label>
              <Select value={projectId} onValueChange={setProjectId} required>
                <SelectTrigger
                  id="project"
                  className="h-11 rounded-xl border-zinc-200 bg-zinc-50/50 focus:bg-white transition-colors"
                >
                  <SelectValue placeholder="Select a project" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-zinc-200 shadow-lg">
                  {projects.map((project) => (
                    <SelectItem
                      key={project.id}
                      value={project.id}
                      className="rounded-lg focus:bg-zinc-50"
                    >
                      {project.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl h-12 font-bold transition-all active:scale-[0.98]"
            >
              {loading ? "Adding Task..." : "Add Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
