"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  Hash,
  ListFilter,
  MoreHorizontal,
  Settings2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SeparatorFull from "@/components/separator-full";
import { cn } from "@/lib/utils";
import { priority } from "@/components/priority";

const data: Issue[] = [
  {
    id: "m5gr84i9",
    code: "TASK-8782",
    title:
      "You can't compress the program without quantifying the open-source SSD pixel!",
    status: {
      id: "done",
      name: "Done",
      color: "green",
    },
    priority: "medium",
    assignee: [
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        avatar: "https://ui.shadcn.com/avatars/01.png",
      },
    ],
    project: {
      id: "1",
      name: "Project A",
    },
  },
  {
    id: "3u1reuv4",
    code: "TASK-7878",
    title:
      "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!",
    status: {
      id: "in-progress",
      name: "In Progress",
      color: "blue",
    },
    priority: "high",
    assignee: [
      {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        avatar: "https://ui.shadcn.com/avatars/02.png",
      },
    ],
    project: {
      id: "2",
      name: "Project B",
    },
  },
  {
    id: "derv1ws0",
    code: "TASK-7839",
    title: "We need to bypass the neural TCP card!",
    status: {
      id: "todo",
      name: "Todo",
      color: "gray",
    },
    priority: "low",
    assignee: [
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        avatar: "https://ui.shadcn.com/avatars/01.png",
      },
    ],
    project: {
      id: "1",
      name: "Project A",
    },
  },
  {
    id: "5kma53ae",
    code: "TASK-5562",
    title:
      "The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!",
    status: {
      id: "backlog",
      name: "Backlog",
      color: "orange",
    },
    priority: "medium",
    assignee: [],
    project: {
      id: "3",
      name: "Project C",
    },
  },
];

export type Issue = {
  id: string;
  code: string;
  title: string;
  status: {
    id: string;
    name: string;
    color: string;
  };
  priority: string;
  assignee: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  }[];
  project: {
    id: string;
    name: string;
  };
};

export const columns: ColumnDef<Issue>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <div
        className="text-xs font-medium text-muted-foreground uppercase p-0 flex items-center gap-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ID
        <ArrowUpDown className="ml-1 size-3" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="capitalize text-xs font-medium text-muted-foreground">
        {row.original.code}
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <div
        className="text-xs font-medium text-muted-foreground uppercase p-0 flex items-center gap-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Title
        <ArrowUpDown className="ml-1 size-3" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="capitalize text-xs font-medium max-w-xs md:max-w-md overflow-hidden text-ellipsis">
        {row.original.title}
      </div>
    ),
  },
  {
    accessorKey: "status",
    accessorFn: (row) => row.status.name,
    header: ({ column }) => (
      <div
        className="text-xs font-medium text-muted-foreground uppercase p-0 flex items-center gap-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowUpDown className="ml-1 size-3" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="capitalize text-xs font-medium max-w-xs overflow-hidden text-ellipsis text-muted-foreground">
        {row.original.status.name}
      </div>
    ),
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <div
        className="text-xs font-medium text-muted-foreground uppercase p-0 flex items-center gap-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Priority
        <ArrowUpDown className="ml-1 size-3" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="max-w-xs overflow-hidden text-ellipsis text-muted-foreground">
        {priority[row.original.priority]}
      </div>
    ),
  },
  {
    accessorKey: "assignee",
    accessorFn: (row) => row.assignee[0]?.name ?? "",
    header: ({ column }) => (
      <div
        className="text-xs font-medium text-muted-foreground uppercase p-0 flex items-center gap-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Assignee
        <ArrowUpDown className="ml-1 size-3" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="capitalize max-w-xs overflow-hidden text-ellipsis text-xs font-medium text-muted-foreground">
        {row.original.assignee[0]?.name}
      </div>
    ),
  },
  {
    accessorKey: "project",
    accessorFn: (row) => row.project.name,
    header: ({ column }) => (
      <div
        className="text-xs font-medium text-muted-foreground uppercase p-0 flex items-center gap-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Project
        <ArrowUpDown className="ml-1 size-3" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="capitalize flex items-center gap-1 text-xs font-medium">
        <Hash className="size-4 text-primary" />
        {row.original.project.name}
      </div>
    ),
  },
];

export function TableIssues() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="space-y-2">
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <div className="px-2 py-1 border rounded-lg text-xs font-medium cursor-pointer hover:bg-accent">
            Assigned
          </div>
          <div className="px-2 py-1 border rounded-lg text-xs font-medium cursor-pointer hover:bg-accent">
            Created
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex gap-1 items-center text-xs font-medium border rounded-lg px-2 py-1">
            <ListFilter className="size-4" />
            Filter
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex gap-1 items-center text-xs font-medium border rounded-lg px-2 py-1">
                <Settings2 className="size-4" />
                Display
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="uppercase text-xs font-medium"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <SeparatorFull />
      <div className="-mx-8 -mt-2">
        <Table className="border-b border-border/50">
          <TableHeader className="bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="first:pl-8 last:pr-8">
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-b border-border/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="first:pl-8 last:pr-8 py-3"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
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
        </div>
      </div>
    </div>
  );
}
