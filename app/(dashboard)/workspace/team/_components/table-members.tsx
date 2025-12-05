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
  MoreHorizontal,
  Shield,
  UserPlus,
  Mail,
  Crown,
  User,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import SeparatorFull from "@/components/separator-full";
import { cn } from "@/lib/utils";
import moment from "moment";

const data: TeamMember[] = [
  {
    id: "member-1",
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "",
    role: "owner",
    status: "active",
    joinedAt: new Date("2024-01-15"),
  },
  {
    id: "member-2",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    avatar: "",
    role: "admin",
    status: "active",
    joinedAt: new Date("2024-03-20"),
  },
  {
    id: "member-3",
    name: "Mike Chen",
    email: "mike.chen@example.com",
    avatar: "",
    role: "member",
    status: "active",
    joinedAt: new Date("2024-06-10"),
  },
  {
    id: "member-4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    avatar: "",
    role: "member",
    status: "active",
    joinedAt: new Date("2024-08-05"),
  },
  {
    id: "member-5",
    name: "Alex Wilson",
    email: "alex.wilson@example.com",
    avatar: "",
    role: "member",
    status: "pending",
    joinedAt: new Date("2024-12-01"),
  },
];

export type TeamMember = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "owner" | "admin" | "member";
  status: "active" | "pending" | "inactive";
  joinedAt: Date;
};

const roleIcons: Record<TeamMember["role"], React.ReactNode> = {
  owner: <Crown className="size-3 text-yellow-500" />,
  admin: <Shield className="size-3 text-blue-500" />,
  member: <User className="size-3 text-muted-foreground" />,
};

const roleBadges: Record<TeamMember["role"], string> = {
  owner: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  admin: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  member: "bg-muted text-muted-foreground border-border",
};

const statusBadges: Record<TeamMember["status"], string> = {
  active: "bg-green-500/10 text-green-600 border-green-500/20",
  pending: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  inactive: "bg-muted text-muted-foreground border-border",
};

export const columns: ColumnDef<TeamMember>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <div
        className="text-xs font-medium text-muted-foreground uppercase p-0 flex items-center gap-1 cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Member
        <ArrowUpDown className="ml-1 size-3" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="size-8">
          <AvatarImage src={row.original.avatar} alt={row.original.name} />
          <AvatarFallback className="text-xs">
            {row.original.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-0.5">
          <div className="text-xs font-medium">{row.original.name}</div>
          <div className="text-xs text-muted-foreground">
            {row.original.email}
          </div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <div
        className="text-xs font-medium text-muted-foreground uppercase p-0 flex items-center gap-1 cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Role
        <ArrowUpDown className="ml-1 size-3" />
      </div>
    ),
    cell: ({ row }) => (
      <div
        className={cn(
          "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-xs font-medium capitalize",
          roleBadges[row.original.role]
        )}
      >
        {roleIcons[row.original.role]}
        {row.original.role}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <div
        className="text-xs font-medium text-muted-foreground uppercase p-0 flex items-center gap-1 cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowUpDown className="ml-1 size-3" />
      </div>
    ),
    cell: ({ row }) => (
      <div
        className={cn(
          "inline-flex items-center px-2 py-0.5 rounded-md border text-xs font-medium capitalize",
          statusBadges[row.original.status]
        )}
      >
        {row.original.status}
      </div>
    ),
  },
  {
    accessorKey: "joinedAt",
    header: ({ column }) => (
      <div
        className="text-xs font-medium text-muted-foreground uppercase p-0 flex items-center gap-1 cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Joined
        <ArrowUpDown className="ml-1 size-3" />
      </div>
    ),
    cell: ({ row }) => {
      const date = moment(row.original.joinedAt).format("MMM D, YYYY");
      return (
        <div className="text-xs font-medium text-muted-foreground">{date}</div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <MoreHorizontal className="size-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="text-xs">Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-xs">
            <Mail className="size-3 mr-2" />
            Send email
          </DropdownMenuItem>
          <DropdownMenuItem className="text-xs">
            <Shield className="size-3 mr-2" />
            Change role
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-xs text-destructive">
            Remove from team
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

export function TableMembers() {
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
            All Members
          </div>
          <div className="px-2 py-1 border rounded-lg text-xs font-medium cursor-pointer hover:bg-accent">
            Admins
          </div>
          <div className="px-2 py-1 border rounded-lg text-xs font-medium cursor-pointer hover:bg-accent">
            Pending
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex gap-1 items-center text-xs font-medium border rounded-lg px-2 py-1 cursor-pointer hover:bg-accent">
            <UserPlus className="size-4" />
            Invite
          </div>
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
                  No team members.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
