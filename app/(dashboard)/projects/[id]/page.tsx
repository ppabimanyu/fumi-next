"use client";

import { Box, LayoutGrid, List, PanelsTopLeft, Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageDescription, PageTitle } from "@/components/page";
import SeparatorFull from "@/components/separator-full";
import { ProjectOverview } from "./_components/overview";
import { ProjectListView } from "./_components/list-view";
import { ProjectKanbanView } from "./_components/kanban-view";
import { ProjectSettings } from "./_components/settings";

// Mock project data - in real implementation this would come from params/API
const project = {
  id: "p5gr84i9",
  name: "Project Alpha",
  code: "PROJ",
};

export default function ProjectPage() {
  return (
    <div className="flex flex-col h-full w-full space-y-2 ">
      <div className="space-y-0">
        <PageTitle className="flex items-center gap-2">
          <Box className="size-5" />
          {project.name}
        </PageTitle>
        <PageDescription>
          Manage project issues, track progress, and collaborate with your team.
        </PageDescription>
      </div>
      <SeparatorFull />
      <Tabs defaultValue="overview" className="w-full h-full">
        <TabsList className="space-x-2">
          <TabsTrigger value="overview" className="gap-1.5">
            <PanelsTopLeft className="size-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="list" className="gap-1.5">
            <List className="size-4" />
            List
          </TabsTrigger>
          <TabsTrigger value="kanban" className="gap-1.5">
            <LayoutGrid className="size-4" />
            Kanban
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-1.5">
            <Settings className="size-4" />
            Settings
          </TabsTrigger>
        </TabsList>
        <SeparatorFull />
        <TabsContent value="overview">
          <ProjectOverview />
        </TabsContent>
        <TabsContent value="list">
          <ProjectListView />
        </TabsContent>
        <TabsContent value="kanban">
          <ProjectKanbanView />
        </TabsContent>
        <TabsContent value="settings">
          <ProjectSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
