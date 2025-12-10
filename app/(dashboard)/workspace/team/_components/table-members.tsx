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
import { ArrowUpDown, Settings2, Shield, Crown, User } from "lucide-react";

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SeparatorFull from "@/components/separator-full";
import { cn } from "@/lib/utils";
import { InviteMemberDialog } from "./invite-member-dialog";
import { MemberActions } from "./member-actions";
import { Button } from "@/components/ui/button";

// Filter options
export type RoleType = "OWNER" | "ADMIN" | "MEMBER";
export type StatusType = "ACTIVE" | "PENDING";

const roleFilterOptions: {
  value: RoleType;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    value: "OWNER",
    label: "Owner",
    icon: <Crown className="size-3 text-yellow-500" />,
  },
  {
    value: "ADMIN",
    label: "Admin",
    icon: <Shield className="size-3 text-blue-500" />,
  },
  {
    value: "MEMBER",
    label: "Member",
    icon: <User className="size-3 text-muted-foreground" />,
  },
];

const statusFilterOptions: { value: StatusType; label: string }[] = [
  { value: "ACTIVE", label: "Active" },
  { value: "PENDING", label: "Pending" },
];

export type TeamMember = {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null;
  };
  role: RoleType;
  status: StatusType;
  createdAt: Date;
};

const roleIcons: Record<RoleType, React.ReactNode> = {
  OWNER: <Crown className="size-3 text-yellow-500" />,
  ADMIN: <Shield className="size-3 text-blue-500" />,
  MEMBER: <User className="size-3 text-muted-foreground" />,
};

const roleBadges: Record<RoleType, string> = {
  OWNER: "bg-yellow-500/10 text-yellow-600 border-none",
  ADMIN: "bg-blue-500/10 text-blue-600 border-none",
  MEMBER: "bg-muted text-muted-foreground border-none",
};

const statusBadges: Record<StatusType, string> = {
  ACTIVE: "bg-green-500/10 text-green-600 border-none",
  PENDING: "bg-orange-500/10 text-orange-600 border-none",
};

export const columns: ColumnDef<TeamMember>[] = [
  {
    accessorKey: "member",
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
          <AvatarImage
            src={row.original.user.image ?? ""}
            alt={row.original.user.name}
          />
          <AvatarFallback className="text-xs">
            {row.original.user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-0.5">
          <div className="text-xs font-medium">{row.original.user.name}</div>
          <div className="text-xs text-muted-foreground">
            {row.original.user.email}
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
      const date = moment(row.original.createdAt).format("MMM D, YYYY");
      return (
        <div className="text-xs font-medium text-muted-foreground">{date}</div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <MemberActions member={row.original} />,
    enableHiding: false,
  },
];

import moment from "moment";
import { trpc } from "@/lib/trpc/client";
import LoadingContent from "@/components/loading-content";

export function TableMembers() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  // Filter states
  const [roleFilter, setRoleFilter] = React.useState<RoleType[]>([]);
  const [statusFilter, setStatusFilter] = React.useState<StatusType[]>([]);

  const listMembersQuery = trpc.workspaceMember.listMembers.useQuery({
    status: statusFilter,
    role: roleFilter,
  });

  const table = useReactTable({
    data: listMembersQuery.data?.data ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className="space-y-2">
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          {/* Role Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div
                className={cn(
                  "flex gap-1 items-center text-xs font-medium border rounded-lg px-2 py-1 cursor-pointer hover:bg-accent",
                  roleFilter.length > 0 &&
                    "bg-primary/10 border-primary text-primary"
                )}
              >
                {roleFilter.length > 0 && (
                  <span className="bg-primary text-primary-foreground rounded-full size-4 flex items-center justify-center text-[10px]">
                    {roleFilter.length}
                  </span>
                )}
                Role
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel className="text-xs">
                Filter by Role
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {roleFilterOptions.map((option) => (
                <DropdownMenuCheckboxItem
                  key={option.value}
                  className="text-xs"
                  checked={roleFilter.includes(option.value)}
                  onCheckedChange={(checked) => {
                    setRoleFilter((prev) =>
                      checked
                        ? [...prev, option.value]
                        : prev.filter((v) => v !== option.value)
                    );
                  }}
                >
                  <span className="flex items-center gap-2">
                    {option.icon}
                    {option.label}
                  </span>
                </DropdownMenuCheckboxItem>
              ))}
              {roleFilter.length > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-xs h-8"
                    onClick={() => setRoleFilter([])}
                  >
                    Clear
                  </Button>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

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
                  {option.label}
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
        </div>
        <div className="flex gap-2 items-center">
          <InviteMemberDialog />

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
            {listMembersQuery.isPending ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <LoadingContent />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
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
