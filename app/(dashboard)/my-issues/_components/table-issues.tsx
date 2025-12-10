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
import { ArrowUpDown, Settings2, Timer, TimerOff } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import SeparatorFull from "@/components/separator-full";
import { cn } from "@/lib/utils";
import moment from "moment";
import { statusIcon } from "@/components/status-icon";
import { IssueTableRow } from "./issue-table-row";
import { Button } from "@/components/ui/button";
import { StatusIconEnum } from "@/lib/enum/status-icon";
import { PriorityEnum } from "@/lib/enum/priority";
import { priorityItem } from "@/components/priority-item";

// Filter options
const statusFilterOptions = [
  { value: "Backlog", label: "Backlog", icon: "BACKLOG" },
  { value: "In Progress", label: "In Progress", icon: "IN_PROGRESS" },
  { value: "Review", label: "Review", icon: "REVIEW" },
  { value: "Done", label: "Done", icon: "DONE" },
  { value: "Canceled", label: "Canceled", icon: "CANCELED" },
];

const priorityFilterOptions = [
  { value: "NONE", label: "No Priority" },
  { value: "LOW", label: "Low" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
  { value: "CRITICAL", label: "Critical" },
];

const dateFilterOptions = [
  { value: "overdue", label: "Overdue" },
  { value: "today", label: "Due Today" },
  { value: "week", label: "Due This Week" },
  { value: "month", label: "Due This Month" },
];

const data: Issue[] = [
  {
    id: "m5gr84i9",
    code: "TASK-8782",
    title:
      "You can't compress the program without quantifying the open-source SSD pixel!",
    status: {
      id: "djwjdwkdwm",
      name: "Done",
      icon: "DONE",
      isCompleted: true,
      isCanceled: false,
    },
    project: {
      id: "m5gr84i9",
      name: "Project 1",
      code: "PROJ1",
    },
    priority: "MEDIUM",
    dueDate: new Date("2025-12-09T23:59:59"),
  },
  {
    id: "3u1reuv4",
    code: "TASK-7878",
    title:
      "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!",
    status: {
      id: "djwjd92w2S",
      name: "In Progress",
      icon: "IN_PROGRESS",
      isCompleted: false,
      isCanceled: false,
    },
    project: {
      id: "m5gr84i9",
      name: "Project 1",
      code: "PROJ1",
    },
    priority: "HIGH",
    dueDate: new Date("2025-12-08T23:59:59"),
  },
  {
    id: "derv1ws0",
    code: "TASK-7839",
    title: "We need to bypass the neural TCP card!",
    status: {
      id: "wdowosiwjd",
      name: "Backlog",
      icon: "BACKLOG",
      isCompleted: false,
      isCanceled: false,
    },
    project: {
      id: "m5gr84i9",
      name: "Project 2",
      code: "PROJ2",
    },
    priority: "NONE",
    dueDate: new Date("2025-12-05T23:59:59"),
  },
  {
    id: "5kma53ae",
    code: "TASK-5562",
    title:
      "The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!",
    status: {
      id: "wdwdkowsd",
      name: "Review",
      icon: "REVIEW",
      isCompleted: false,
      isCanceled: false,
    },
    project: {
      id: "m5gr84i9",
      name: "Project 2",
      code: "PROJ2",
    },
    priority: "MEDIUM",
    dueDate: new Date("2025-12-04T23:59:59"),
  },
  {
    id: "5kma53ae",
    code: "TASK-5562",
    title:
      "The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!",
    status: {
      id: "kwmds92jwd",
      name: "Canceled",
      icon: "CANCELED",
      isCompleted: false,
      isCanceled: true,
    },
    project: {
      id: "m5gr84i9",
      name: "Project 2",
      code: "PROJ2",
    },
    priority: "CRITICAL",
    dueDate: new Date("2025-12-06T23:59:59"),
  },
];

export type Issue = {
  id: string;
  code: string;
  title: string;
  status: {
    id: string;
    name: string;
    icon: string;
    isCompleted: boolean;
    isCanceled: boolean;
  };
  project: {
    id: string;
    name: string;
    code: string;
  };
  priority: string;
  dueDate: Date;
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
      <div className="capitalize text-xs font-medium max-w-xs overflow-hidden text-ellipsis flex items-center gap-1">
        {statusIcon(row.original.status.icon as StatusIconEnum)}
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
      <div className="max-w-xs overflow-hidden text-ellipsis">
        {priorityItem(row.original.priority as PriorityEnum)?.icon}
      </div>
    ),
  },
  {
    accessorKey: "due",
    accessorFn: (row) => row.dueDate,
    header: ({ column }) => (
      <div
        className="text-xs font-medium text-muted-foreground uppercase p-0 flex items-center gap-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Due
        <ArrowUpDown className="ml-1 size-3" />
      </div>
    ),
    cell: ({ row }) => {
      const overdue = row.original.dueDate < new Date();
      const time = moment(row.original.dueDate).fromNow();
      const isToday =
        row.original.dueDate.toDateString() === new Date().toDateString();
      return (
        <div
          className={cn(
            "capitalize flex items-center gap-1 text-xs font-medium",
            isToday ? "text-yellow-500" : "",
            overdue ? "text-destructive" : ""
          )}
        >
          {overdue ? (
            <TimerOff className="size-4" />
          ) : (
            <Timer className="size-4" />
          )}
          {time}
        </div>
      );
    },
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

  // Filter states
  const [statusFilter, setStatusFilter] = React.useState<string[]>([]);
  const [priorityFilter, setPriorityFilter] = React.useState<string[]>([]);
  const [dateFilter, setDateFilter] = React.useState<string[]>([]);

  // Filter data based on selections
  const filteredData = React.useMemo(() => {
    return data.filter((issue) => {
      // Status filter
      if (
        statusFilter.length > 0 &&
        !statusFilter.includes(issue.status.name)
      ) {
        return false;
      }
      // Priority filter
      if (
        priorityFilter.length > 0 &&
        !priorityFilter.includes(issue.priority)
      ) {
        return false;
      }
      // Date filter
      if (dateFilter.length > 0) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const dueDate = new Date(issue.dueDate);
        dueDate.setHours(0, 0, 0, 0);

        const matchesAnyDateFilter = dateFilter.some((filter) => {
          switch (filter) {
            case "overdue":
              return dueDate < today;
            case "today":
              return dueDate.getTime() === today.getTime();
            case "week": {
              const weekFromNow = new Date(today);
              weekFromNow.setDate(weekFromNow.getDate() + 7);
              return dueDate >= today && dueDate <= weekFromNow;
            }
            case "month": {
              const monthFromNow = new Date(today);
              monthFromNow.setMonth(monthFromNow.getMonth() + 1);
              return dueDate >= today && dueDate <= monthFromNow;
            }
            default:
              return true;
          }
        });
        if (!matchesAnyDateFilter) return false;
      }
      return true;
    });
  }, [statusFilter, priorityFilter, dateFilter]);

  const table = useReactTable({
    data: filteredData,
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
          {/* Status Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div
                className={cn(
                  "flex gap-1 items-center text-xs font-medium border rounded-lg px-2 py-1 cursor-pointer hover:bg-accent",
                  statusFilter.length > 0 &&
                    "bg-primary/10 border-primary text-primary"
                )}
              >
                {statusFilter.length > 0 && (
                  <span className="bg-primary text-primary-foreground rounded-full size-4 flex items-center justify-center text-[10px]">
                    {statusFilter.length}
                  </span>
                )}
                Status
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel className="text-xs">
                Filter by Status
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {statusFilterOptions.map((option) => (
                <DropdownMenuCheckboxItem
                  key={option.value}
                  className="text-xs"
                  checked={statusFilter.includes(option.value)}
                  onCheckedChange={(checked) => {
                    setStatusFilter((prev) =>
                      checked
                        ? [...prev, option.value]
                        : prev.filter((v) => v !== option.value)
                    );
                  }}
                >
                  <span className="flex items-center gap-2">
                    {statusIcon(option.icon as StatusIconEnum)}
                    {option.label}
                  </span>
                </DropdownMenuCheckboxItem>
              ))}
              {statusFilter.length > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-xs h-8"
                    onClick={() => setStatusFilter([])}
                  >
                    Clear
                  </Button>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Priority Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div
                className={cn(
                  "flex gap-1 items-center text-xs font-medium border rounded-lg px-2 py-1 cursor-pointer hover:bg-accent",
                  priorityFilter.length > 0 &&
                    "bg-primary/10 border-primary text-primary"
                )}
              >
                {priorityFilter.length > 0 && (
                  <span className="bg-primary text-primary-foreground rounded-full size-4 flex items-center justify-center text-[10px]">
                    {priorityFilter.length}
                  </span>
                )}
                Priority
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel className="text-xs">
                Filter by Priority
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {priorityFilterOptions.map((option) => (
                <DropdownMenuCheckboxItem
                  key={option.value}
                  className="text-xs"
                  checked={priorityFilter.includes(option.value)}
                  onCheckedChange={(checked) => {
                    setPriorityFilter((prev) =>
                      checked
                        ? [...prev, option.value]
                        : prev.filter((v) => v !== option.value)
                    );
                  }}
                >
                  {priorityItem(option.value as PriorityEnum)?.icon ||
                    option.label}
                </DropdownMenuCheckboxItem>
              ))}
              {priorityFilter.length > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-xs h-8"
                    onClick={() => setPriorityFilter([])}
                  >
                    Clear
                  </Button>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Date Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div
                className={cn(
                  "flex gap-1 items-center text-xs font-medium border rounded-lg px-2 py-1 cursor-pointer hover:bg-accent",
                  dateFilter.length > 0 &&
                    "bg-primary/10 border-primary text-primary"
                )}
              >
                {dateFilter.length > 0 && (
                  <span className="bg-primary text-primary-foreground rounded-full size-4 flex items-center justify-center text-[10px]">
                    {dateFilter.length}
                  </span>
                )}
                Due Date
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel className="text-xs">
                Filter by Due Date
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {dateFilterOptions.map((option) => (
                <DropdownMenuCheckboxItem
                  key={option.value}
                  className="text-xs"
                  checked={dateFilter.includes(option.value)}
                  onCheckedChange={(checked) => {
                    setDateFilter((prev) =>
                      checked
                        ? [...prev, option.value]
                        : prev.filter((v) => v !== option.value)
                    );
                  }}
                >
                  {option.label}
                </DropdownMenuCheckboxItem>
              ))}
              {dateFilter.length > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-xs h-8"
                    onClick={() => setDateFilter([])}
                  >
                    Clear
                  </Button>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
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
              table
                .getRowModel()
                .rows.map((row) => <IssueTableRow key={row.id} row={row} />)
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
      {/* <div className="flex items-center justify-end space-x-2 py-4">
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
      </div> */}
    </div>
  );
}
