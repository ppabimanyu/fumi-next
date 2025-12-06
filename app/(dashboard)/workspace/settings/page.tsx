import { PageDescription, PageTitle } from "@/components/page";
import SeparatorFull from "@/components/separator-full";
import { Settings } from "lucide-react";
import { WorkspaceSettings } from "./_components/workspace-settings";

export default function WorkspaceSettingsPage() {
  return (
    <div className="flex flex-col h-full w-full mx-auto space-y-4">
      <div className="space-y-0">
        <PageTitle className="flex items-center gap-2">
          <Settings className="size-5" />
          Workspace Settings
        </PageTitle>
        <PageDescription>
          Manage your workspace settings and preferences.
        </PageDescription>
      </div>
      <SeparatorFull />
      <div className="w-full md:w-3xl mx-auto">
        <WorkspaceSettings />
      </div>
    </div>
  );
}
