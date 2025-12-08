"use client";

import { Box } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { trpc } from "@/lib/trpc/client";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const navProjectItems: {
  title: string;
  url: string;
}[] = [
  {
    title: "NextJS StarterKit",
    url: "/projects/nextjs-starterkit",
  },
  {
    title: "Fumi",
    url: "/projects/fumi",
  },
];

export function NavProject() {
  const pathname = usePathname();

  const listProjectsQuery = trpc.project.listProjects.useQuery();
  if (listProjectsQuery.isError) {
    toast.error("Failed to load projects");
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Project</SidebarGroupLabel>
      <SidebarMenu>
        {listProjectsQuery.isPending ? (
          <div className="flex items-center gap-2 w-full p-2">
            <Skeleton className="h-6 w-8 rounded-full" />
            <Skeleton className="h-6 w-full" />
          </div>
        ) : (
          listProjectsQuery.data?.map((item) => {
            return (
              <SidebarMenuItem key={item.name}>
                <Link href={`/projects/${item.id}`}>
                  <SidebarMenuButton
                    tooltip={item.name}
                    isActive={pathname === `/projects/${item.id}`}
                  >
                    <Box className="size-4" />
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            );
          })
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
