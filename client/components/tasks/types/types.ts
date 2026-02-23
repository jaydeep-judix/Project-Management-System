import { ColumnDef, Table } from "@tanstack/react-table";

export interface NewTaskDialogProps {
  projects: { id: string; title: string }[];
  onSuccess?: () => void;
}
export type ProjectTaskDetail = {
  id: string;
  projectId: string;
  taskTitle: string;
  projectTitle: string;
  status: string;
};

export interface TaskDataTableToolbarProps<TData> {
  table: Table<TData>;
}

export interface TaskDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
