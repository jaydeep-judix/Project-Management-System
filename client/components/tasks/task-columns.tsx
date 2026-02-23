"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CheckCircle2,
  Circle,
  CircleDashed,
  CircleEllipsis,
  XCircle,
  MoreHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { projectService } from "@/services/project-service";
import { Trash2 } from "lucide-react";
import { ProjectTaskDetail } from "./types/types";



export const statuses = [
  { value: "pending", label: "Pending", icon: CircleDashed },
  { value: "in-progress", label: "In Progress", icon: CircleEllipsis },
  { value: "done", label: "Done", icon: CheckCircle2 },
];

export const getTaskColumns = (
  onRefresh: () => void,
): ColumnDef<ProjectTaskDetail>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "rowNumber",
    header: "ID",
    cell: ({ row }) => (
      <div className="w-[40px] text-zinc-400 font-medium tabular-nums">
        {row.index + 1}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "taskTitle",
    header: "Task Title",
    cell: ({ row }) => {
      return (
        <span
          className="max-w-[400px] truncate font-bold text-zinc-900 block"
          title={row.getValue("taskTitle")}
        >
          {row.getValue("taskTitle")}
        </span>
      );
    },
  },
  {
    accessorKey: "projectTitle",
    header: "Project Title",
    cell: ({ row }) => {
      const title = row.getValue("projectTitle") as string;
      const words = title.split(" ");
      const truncated =
        words.slice(0, 4).join(" ") + (words.length > 4 ? " ..." : "");

      return (
        <span
          className="max-w-[300px] truncate text-zinc-500 font-medium block"
          title={title}
        >
          {truncated}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status"),
      );

      if (!status) return null;

      return (
        <div className="flex w-[120px] items-center gap-2">
          <status.icon className="h-4 w-4 text-zinc-400" />
          <span className="text-sm font-medium text-zinc-600 truncate">
            {status.label}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const task = row.original;

      const handleUpdateStatus = async (status: string) => {
        try {
          await projectService.updateTaskStatus(
            task.projectId,
            task.id,
            status,
          );
          onRefresh();
        } catch (error) {
          console.error("Failed to update status:", error);
        }
      };

      const handleDeleteTask = async () => {
        try {
          await projectService.deleteTask(task.projectId, task.id);
          onRefresh();
        } catch (error) {
          console.error("Failed to delete task:", error);
        }
      };

      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 hover:bg-zinc-100 rounded-lg focus-visible:ring-0"
              >
                <MoreHorizontal className="h-4 w-4 text-zinc-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 rounded-xl p-2 shadow-lg border-zinc-200"
            >
              <DropdownMenuLabel className="px-2 py-1.5 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                Update Status
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="-mx-1 my-1" />
              {statuses.map((status) => (
                <DropdownMenuItem
                  key={status.value}
                  onSelect={() => handleUpdateStatus(status.value)}
                  className="rounded-lg text-sm font-medium focus:bg-zinc-50 cursor-pointer flex items-center gap-2"
                >
                  <status.icon className="h-4 w-4 text-zinc-400" />
                  {status.label}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator className="-mx-1 my-1" />
              <DropdownMenuItem
                onSelect={handleDeleteTask}
                className="rounded-lg text-sm font-medium focus:bg-red-50 text-red-600 cursor-pointer flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Delete Task
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
