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
  ListFilter,
  Settings2,
  Check,
  Circle,
  AtSign,
  MessageSquare,
  Bell,
  Archive,
} from "lucide-react";

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
import SeparatorFull from "@/components/separator-full";
import { cn } from "@/lib/utils";
import moment from "moment";

const data: InboxItem[] = [
  {
    id: "inbox-1",
    type: "mention",
    title: "John mentioned you in TASK-8782",
    description:
      "Hey @you, can you take a look at this issue? I think we need your input on the implementation.",
    isRead: false,
    createdAt: new Date("2025-12-05T10:30:00"),
  },
  {
    id: "inbox-2",
    type: "comment",
    title: "New comment on TASK-7878",
    description:
      "Sarah commented: 'I've updated the design specs, please review when you have a chance.'",
    isRead: false,
    createdAt: new Date("2025-12-05T09:15:00"),
  },
  {
    id: "inbox-3",
    type: "assignment",
    title: "You were assigned to TASK-5562",
    description:
      "Mike assigned you to 'Fix the SAS interface connection issue' with high priority.",
    isRead: true,
    createdAt: new Date("2025-12-04T16:45:00"),
  },
  {
    id: "inbox-4",
    type: "mention",
    title: "Alex mentioned you in a comment",
    description:
      "@you - thoughts on this approach? I'm considering using a different caching strategy.",
    isRead: true,
    createdAt: new Date("2025-12-04T14:20:00"),
  },
  {
    id: "inbox-5",
    type: "update",
    title: "TASK-7839 status changed to In Progress",
    description:
      "The issue 'We need to bypass the neural TCP card' has been moved to In Progress.",
    isRead: true,
    createdAt: new Date("2025-12-03T11:00:00"),
  },
];

export type InboxItem = {
  id: string;
  type: "mention" | "comment" | "assignment" | "update";
  title: string;
  description: string;
  isRead: boolean;
  createdAt: Date;
};

const typeIcons: Record<InboxItem["type"], React.ReactNode> = {
  mention: <AtSign className="size-4 text-blue-500" />,
  comment: <MessageSquare className="size-4 text-green-500" />,
  assignment: <Bell className="size-4 text-orange-500" />,
  update: <Circle className="size-4 text-muted-foreground" />,
};

export const columns: ColumnDef<InboxItem>[] = [
  {
    accessorKey: "status",
    header: () => <span className="sr-only">Status</span>,
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        {row.original.isRead ? (
          <Check className="size-4 text-muted-foreground" />
        ) : (
          <Circle className="size-2 fill-primary text-primary" />
        )}
      </div>
    ),
    size: 40,
  },
  {
    accessorKey: "type",
    header: () => <span className="sr-only">Type</span>,
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        {typeIcons[row.original.type]}
      </div>
    ),
    size: 40,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <div
        className="text-xs font-medium text-muted-foreground uppercase p-0 flex items-center gap-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Notification
        <ArrowUpDown className="ml-1 size-3" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="space-y-0.5">
        <div
          className={cn(
            "text-xs font-medium max-w-md overflow-hidden text-ellipsis",
            !row.original.isRead && "font-semibold"
          )}
        >
          {row.original.title}
        </div>
        <div className="text-xs text-muted-foreground max-w-md overflow-hidden text-ellipsis line-clamp-1">
          {row.original.description}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <div
        className="text-xs font-medium text-muted-foreground uppercase p-0 flex items-center gap-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Time
        <ArrowUpDown className="ml-1 size-3" />
      </div>
    ),
    cell: ({ row }) => {
      const time = moment(row.original.createdAt).fromNow();
      return (
        <div className="text-xs font-medium text-muted-foreground whitespace-nowrap">
          {time}
        </div>
      );
    },
  },
];

export function TableInbox() {
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
            All
          </div>
          <div className="px-2 py-1 border rounded-lg text-xs font-medium cursor-pointer hover:bg-accent">
            Unread
          </div>
          <div className="px-2 py-1 border rounded-lg text-xs font-medium cursor-pointer hover:bg-accent flex items-center gap-1">
            <Archive className="size-3" />
            Archived
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex gap-1 items-center text-xs font-medium border rounded-lg px-2 py-1 cursor-pointer hover:bg-accent">
            <ListFilter className="size-4" />
            Filter
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex gap-1 items-center text-xs font-medium border rounded-lg px-2 py-1 cursor-pointer hover:bg-accent">
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
                  className={cn(
                    "border-b border-border/50 cursor-pointer",
                    !row.original.isRead && "bg-muted/30"
                  )}
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
                  No notifications.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
