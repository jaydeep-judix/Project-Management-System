import { Column, ColumnDef, Table } from "@tanstack/react-table";

export type ProjectTask = {
  id: string;
  title: string;
  taskCount: number; 
  status: string;
};

export interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

export interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}
export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export type ProjectStatus = "Pending" | "In Progress" | "Completed" | "Started";

export type StatusIndicatorProps = {
  status: ProjectStatus;
  className?: string;
};

export type Project = {
  id: string;
  name: string;
  tasksCount: number;
  status: "Pending" | "In Progress" | "Completed" | "Started";
  lastUpdated: string;
};

