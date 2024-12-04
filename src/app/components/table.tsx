"use client";

import * as React from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { sampleCountyCensusData } from "@/utils/sampleData";
import { CountyCensusData } from "@/utils/types";

export function DataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 48,
  });

  const columns: ColumnDef<CountyCensusData>[] = [
    {
      accessorKey: "county",
      header: "County",
      enableHiding: true,
      cell: ({ row }) => {
        return (
          <div className="capitalize flex items-center">
            <div>
              <p>{row.getValue("county")}</p>
            </div>
          </div>
        );
      },
    },

    {
      accessorKey: "total",
      header: "Total Adult Population (2027)",
      cell: ({ row }) => {
        return (
          <div>
            <p>{row.getValue("total")}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "totalVoters",
      header: "Total Voters (2022)",
      cell: ({ row }) => {
        return (
          <div>
            <p>{row.getValue("totalVoters")}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "difference",
      header: "Difference",
      cell: ({ row }) => {
        return (
          <div>
            <p>{row.getValue("difference")}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "percentage",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Percentage Difference (%)
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("percentage")}</div>
      ),
    },
  ];

  const table = useReactTable({
    data: sampleCountyCensusData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      sorting,
      pagination,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full container mx-auto">
      <div className="flex items-center py-4">
        <Input
          placeholder="Search counties..."
          value={(table.getColumn("county")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("county")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => {
                      column.toggleVisibility(!!value);
                    }}
                  >
                    {column.id === "femaleVoters"
                      ? "Female Voters"
                      : column.id === "maleVoters"
                      ? "Male Voters"
                      : column.id === "totalVoters"
                      ? "Total Voters"
                      : column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="font-medium">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => {
              return (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    const isTotal = cell.row.original.county === "TOTAL";
                    return (
                      <TableCell
                        key={cell.id}
                        className={`border-2 border-gray-200 py-2 border-dotted ${
                          isTotal ? "font-bold" : ""
                        }`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <div className="pt-8"></div>
      {/* <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div> */}
    </div>
  );
}
