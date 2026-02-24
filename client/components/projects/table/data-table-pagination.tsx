"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTablePaginationProps } from "../types/types";



export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex flex-col gap-4 px-2 py-4 sm:flex-row sm:items-center sm:justify-between">
      
      
      <div className="text-sm text-zinc-500 font-medium text-center sm:text-left">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>

   
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        
    
        <div className="flex items-center justify-center sm:justify-start space-x-2">
          <p className="text-sm font-semibold text-zinc-900 whitespace-nowrap">
            Rows
          </p>

          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-9 w-[70px] rounded-xl border-zinc-200 bg-white">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>

            <SelectContent side="top" className="rounded-xl border-zinc-200">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem
                  key={pageSize}
                  value={`${pageSize}`}
                  className="rounded-lg"
                >
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>


        <div className="text-sm font-semibold text-zinc-900 text-center">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>


        <div className="flex items-center justify-center space-x-2">
          
          
          <Button
            variant="outline"
            className="hidden sm:flex h-9 w-9 p-0 rounded-xl border-zinc-200"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>

   
          <Button
            variant="outline"
            className="h-9 w-9 p-0 rounded-xl border-zinc-200"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

        
          <Button
            variant="outline"
            className="h-9 w-9 p-0 rounded-xl border-zinc-200"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          
          <Button
            variant="outline"
            className="hidden sm:flex h-9 w-9 p-0 rounded-xl border-zinc-200"
            onClick={() =>
              table.setPageIndex(table.getPageCount() - 1)
            }
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}