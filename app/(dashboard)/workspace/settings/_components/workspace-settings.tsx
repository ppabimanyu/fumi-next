"use client";

import {
  Section,
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionItem,
  SectionItemContent,
  SectionItemDescription,
  SectionItemHeader,
  SectionItemTitle,
  SectionTitle,
} from "@/components/section";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Building2, Image as ImageIcon, TriangleAlert } from "lucide-react";
import { LeaveWorkspaceDialog } from "./leave-workspace-dialog";
import { DeleteWorkspaceDialog } from "./delete-workspace-dialog";

export function WorkspaceSettings() {
  return (
    <div className="space-y-8">
      <Section>
        <SectionHeader>
          <SectionTitle className="flex items-center gap-2">
            <Building2 className="size-5" />
            Workspace Information
          </SectionTitle>
          <SectionDescription>
            Update your workspace&apos;s basic information.
          </SectionDescription>
        </SectionHeader>
        <SectionContent>
          <SectionItem>
            <SectionItemHeader>
              <SectionItemTitle>Workspace Logo</SectionItemTitle>
              <SectionItemDescription>
                JPG, GIF, PNG or WebP. Max size of 800KB.
              </SectionItemDescription>
            </SectionItemHeader>
            <SectionItemContent>
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-lg bg-muted flex items-center justify-center border-2 border-dashed border-muted-foreground/25 cursor-pointer hover:border-muted-foreground/50 transition-colors">
                  <ImageIcon className="size-5 text-muted-foreground" />
                </div>
              </div>
            </SectionItemContent>
          </SectionItem>
          <Separator />
          <SectionItem>
            <SectionItemHeader>
              <SectionItemTitle>Workspace Name</SectionItemTitle>
              <SectionItemDescription>
                This is your workspace&apos;s visible name. It will be displayed
                to all members.
              </SectionItemDescription>
            </SectionItemHeader>
            <SectionItemContent className="md:w-xs">
              <Input placeholder="Acme Inc." defaultValue="My Workspace" />
            </SectionItemContent>
          </SectionItem>
          <Separator />
          <SectionItem>
            <SectionItemHeader>
              <SectionItemTitle>Description</SectionItemTitle>
              <SectionItemDescription>
                A brief description of your workspace and its purpose.
              </SectionItemDescription>
            </SectionItemHeader>
            <SectionItemContent className="md:w-md">
              <Textarea
                placeholder="Describe your workspace..."
                rows={3}
                defaultValue="A workspace for managing projects and collaborating with team members."
              />
            </SectionItemContent>
          </SectionItem>
        </SectionContent>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle className="flex items-center gap-2 text-destructive">
            <TriangleAlert className="size-5" />
            Danger Zone
          </SectionTitle>
          <SectionDescription>
            These actions are irreversible. Please proceed with caution.
          </SectionDescription>
        </SectionHeader>
        <SectionContent>
          <SectionItem>
            <SectionItemHeader>
              <SectionItemTitle>Leave Workspace</SectionItemTitle>
              <SectionItemDescription>
                You will lose access to this workspace and all its projects. An
                admin will need to re-invite you to regain access.
              </SectionItemDescription>
            </SectionItemHeader>
            <SectionItemContent>
              <LeaveWorkspaceDialog />
            </SectionItemContent>
          </SectionItem>
          <Separator />
          <SectionItem>
            <SectionItemHeader>
              <SectionItemTitle>Delete Workspace</SectionItemTitle>
              <SectionItemDescription>
                Permanently delete this workspace and all of its data, including
                projects, issues, and team members. This action cannot be
                undone.
              </SectionItemDescription>
            </SectionItemHeader>
            <SectionItemContent>
              <DeleteWorkspaceDialog />
            </SectionItemContent>
          </SectionItem>
        </SectionContent>
      </Section>
    </div>
  );
}
