"use client";

import * as React from "react";
import { ChevronsUpDown, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { CreateWorkspaceDialog } from "./create-workspace-dialog";
import { trpc } from "@/lib/trpc/client";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { env } from "@/env";

export function WorkspaceSwitcher() {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const trpcUtils = trpc.useUtils();
  const [createDialogOpen, setCreateDialogOpen] = React.useState(false);

  const listWorkspaceQuery = trpc.workspace.listWorkspace.useQuery();
  if (listWorkspaceQuery.isError) {
    toast.error("Failed to load workspaces");
  }

  const activeWorkspaceQuery = trpc.workspace.getActiveWorkspace.useQuery();
  if (activeWorkspaceQuery.isError) {
    toast.error("Failed to load active workspace");
  }

  const changeActiveWorkspaceMutation =
    trpc.workspace.changeActiveWorkspace.useMutation({
      onSuccess: () => {
        trpcUtils.workspace.getActiveWorkspace.invalidate();
        toast.success("Workspace changed successfully");
      },
      onError: () => {
        toast.error("Failed to change active workspace. Please try again.");
      },
      onSettled: () => {
        router.replace(env.NEXT_PUBLIC_DEFAULT_AUTHENTICATED_PAGE);
        setCreateDialogOpen(false);
      },
    });

  const handleChangeActiveWorkspace = async (workspaceId: string) => {
    if (workspaceId != activeWorkspaceQuery.data?.id) {
      await changeActiveWorkspaceMutation.mutateAsync({ workspaceId });
    }
  };

  if (listWorkspaceQuery.isPending || listWorkspaceQuery.isPending) {
    return (
      <div className="flex items-center gap-2 w-full">
        <Skeleton className="h-10 w-12 rounded-full" />
        <div className="space-y-2 w-full">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    );
  }

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Avatar>
                    <AvatarImage
                      src={activeWorkspaceQuery.data?.image ?? ""}
                      alt={activeWorkspaceQuery.data?.name ?? ""}
                    />
                    <AvatarFallback>
                      {activeWorkspaceQuery.data?.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {activeWorkspaceQuery.data?.name}
                  </span>
                  <span className="truncate text-xs capitalize">
                    {activeWorkspaceQuery.data?.workspaceType.toLowerCase()}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-muted-foreground text-xs">
                Workspaces
              </DropdownMenuLabel>
              {listWorkspaceQuery.data?.map((workspace) => (
                <DropdownMenuItem
                  key={workspace.name}
                  onClick={() => handleChangeActiveWorkspace(workspace.id)}
                  className="gap-2 p-2"
                >
                  <div className="flex size-6 items-center justify-center rounded-md border">
                    <Avatar>
                      <AvatarImage
                        src={workspace.image ?? ""}
                        alt={workspace.name ?? ""}
                      />
                      <AvatarFallback>
                        {workspace.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {workspace.name}
                    </span>
                    <span className="truncate text-xs capitalize">
                      {workspace.workspaceType.toLowerCase()}
                    </span>
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="gap-2 p-2"
                onSelect={(e) => {
                  e.preventDefault();
                  setCreateDialogOpen(true);
                }}
              >
                <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                  <Plus className="size-4" />
                </div>
                <div className="text-muted-foreground font-medium">
                  Create workspace
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      <CreateWorkspaceDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />
    </>
  );
}
