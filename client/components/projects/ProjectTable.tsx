"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoreHorizontal, Search, Filter } from "lucide-react";
import { ProjectStatusBadge } from "./ProjectStatusBadge";
import { cn } from "@/lib/utils";
import { Project } from "./types/types";


const initialProjects: Project[] = [
  {
    id: "1",
    name: "Website Redesign for E-commerce Client",
    tasksCount: 12,
    status: "In Progress",
    lastUpdated: "2 hours ago",
  },
  {
    id: "2",
    name: "Mobile App Development (iOS & Android)",
    tasksCount: 45,
    status: "Completed",
    lastUpdated: "Yesterday",
  },
  {
    id: "3",
    name: "Marketing Campaign - Q1 Launch",
    tasksCount: 8,
    status: "Started",
    lastUpdated: "3 days ago",
  },
  {
    id: "4",
    name: "Internal Tools Dashboard",
    tasksCount: 15,
    status: "Pending",
    lastUpdated: "5 hours ago",
  },
  {
    id: "5",
    name: "Customer Portal API Integration",
    tasksCount: 22,
    status: "In Progress",
    lastUpdated: "1 hour ago",
  },
];

export function ProjectTable() {
  const [projects, setProjects] = React.useState<Project[]>(initialProjects);
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleStatusChange = (id: string, newStatus: Project["status"]) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p)),
    );
  };

  return (
    <div className="space-y-4">

      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input
            placeholder="Search projects..."
            className="pl-9 bg-white border-zinc-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          className="gap-2 text-zinc-600 border-zinc-200"
        >
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

  
      <div className="rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-zinc-50/50">
            <TableRow className="hover:bg-transparent border-zinc-100">
              <TableHead className="w-[80px] font-bold text-zinc-500 py-4 px-6 text-xs uppercase tracking-wider">
                ID
              </TableHead>
              <TableHead className="font-bold text-zinc-500 py-4 px-6 text-xs uppercase tracking-wider">
                Project Name
              </TableHead>
              <TableHead className="font-bold text-zinc-500 py-4 px-6 text-xs uppercase tracking-wider">
                Tasks
              </TableHead>
              <TableHead className="font-bold text-zinc-500 py-4 px-6 text-xs uppercase tracking-wider text-center">
                Status
              </TableHead>
              <TableHead className="w-[100px] py-4 px-6"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProjects.map((project) => (
              <TableRow
                key={project.id}
                className="group border-zinc-100/60 hover:bg-zinc-50/50 transition-colors"
              >
                <TableCell className="py-4 px-6 font-medium text-zinc-400">
                  #{project.id}
                </TableCell>
                <TableCell className="py-4 px-6">
                  <div className="flex flex-col gap-0.5">
                    <span
                      className="font-bold text-zinc-900 truncate max-w-[300px] block"
                      title={project.name}
                    >
                      {project.name}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-medium">
                      Updated {project.lastUpdated}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-4 px-6">
                  <span className="inline-flex items-center rounded-lg bg-zinc-100 px-2.5 py-0.5 text-xs font-bold text-zinc-600">
                    {project.tasksCount} tasks
                  </span>
                </TableCell>
                <TableCell className="py-4 px-6">
                  <div className="flex justify-center">
                    <ProjectStatusBadge status={project.status} />
                  </div>
                </TableCell>
                <TableCell className="py-4 px-6 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 hover:bg-zinc-100 rounded-lg"
                      >
                        <MoreHorizontal className="h-4 w-4 text-zinc-400" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-40 rounded-xl p-2 shadow-lg border-zinc-200"
                    >
                      <div className="px-2 py-1.5 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                        Change Status
                      </div>
                      <DropdownMenuItem
                        onClick={() =>
                          handleStatusChange(project.id, "Pending")
                        }
                        className="rounded-lg text-sm font-medium focus:bg-zinc-50"
                      >
                        Pending
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleStatusChange(project.id, "In Progress")
                        }
                        className="rounded-lg text-sm font-medium focus:bg-zinc-50 text-orange-600"
                      >
                        In Progress
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleStatusChange(project.id, "Completed")
                        }
                        className="rounded-lg text-sm font-medium focus:bg-zinc-50 text-green-600"
                      >
                        Completed
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {filteredProjects.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-32 text-center text-zinc-400 font-medium"
                >
                  No projects found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
