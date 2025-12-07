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
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Box,
  Image as ImageIcon,
  TriangleAlert,
  Users,
  Globe,
  Lock,
} from "lucide-react";
import { DeleteProjectDialog } from "./delete-project-dialog";

export function ProjectSettings() {
  return (
    <div className="space-y-8 w-full md:w-3xl mx-auto">
      {/* Project Information */}
      <Section>
        <SectionHeader>
          <SectionTitle className="flex items-center gap-2">
            <Box className="size-5" />
            Project Information
          </SectionTitle>
          <SectionDescription>
            Update your project&apos;s basic information.
          </SectionDescription>
        </SectionHeader>
        <SectionContent>
          <SectionItem>
            <SectionItemHeader>
              <SectionItemTitle>Project Icon</SectionItemTitle>
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
              <SectionItemTitle>Project Name</SectionItemTitle>
              <SectionItemDescription>
                This is your project&apos;s display name visible to all members.
              </SectionItemDescription>
            </SectionItemHeader>
            <SectionItemContent className="md:w-xs">
              <Input placeholder="Project Alpha" defaultValue="Project Alpha" />
            </SectionItemContent>
          </SectionItem>
          <Separator />
          <SectionItem>
            <SectionItemHeader>
              <SectionItemTitle>Project Code</SectionItemTitle>
              <SectionItemDescription>
                A unique identifier for your project, used as issue prefix
                (e.g., PROJ-001).
              </SectionItemDescription>
            </SectionItemHeader>
            <SectionItemContent className="md:w-xs">
              <Input placeholder="PROJ" defaultValue="PROJ" maxLength={6} />
            </SectionItemContent>
          </SectionItem>
          <Separator />
          <SectionItem>
            <SectionItemHeader>
              <SectionItemTitle>Description</SectionItemTitle>
              <SectionItemDescription>
                A brief description of your project and its goals.
              </SectionItemDescription>
            </SectionItemHeader>
            <SectionItemContent className="md:w-md">
              <Textarea
                placeholder="Describe your project..."
                rows={3}
                defaultValue="A comprehensive project management solution built with modern technologies."
              />
            </SectionItemContent>
          </SectionItem>
        </SectionContent>
      </Section>

      {/* Access & Visibility */}
      <Section>
        <SectionHeader>
          <SectionTitle className="flex items-center gap-2">
            <Users className="size-5" />
            Access & Visibility
          </SectionTitle>
          <SectionDescription>
            Control who can view and access this project.
          </SectionDescription>
        </SectionHeader>
        <SectionContent>
          <SectionItem>
            <SectionItemHeader>
              <SectionItemTitle>Project Visibility</SectionItemTitle>
              <SectionItemDescription>
                Choose who can see this project within your workspace.
              </SectionItemDescription>
            </SectionItemHeader>
            <SectionItemContent className="md:w-xs">
              <Select defaultValue="workspace">
                <SelectTrigger>
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="workspace">
                    <div className="flex items-center gap-2">
                      <Globe className="size-4" />
                      <span>Workspace</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="private">
                    <div className="flex items-center gap-2">
                      <Lock className="size-4" />
                      <span>Private</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </SectionItemContent>
          </SectionItem>
          <Separator />
          <SectionItem>
            <SectionItemHeader>
              <SectionItemTitle>Project Lead</SectionItemTitle>
              <SectionItemDescription>
                The person responsible for managing this project.
              </SectionItemDescription>
            </SectionItemHeader>
            <SectionItemContent className="md:w-xs">
              <Select defaultValue="john">
                <SelectTrigger>
                  <SelectValue placeholder="Select lead" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="john">John Doe</SelectItem>
                  <SelectItem value="jane">Jane Smith</SelectItem>
                  <SelectItem value="bob">Bob Johnson</SelectItem>
                </SelectContent>
              </Select>
            </SectionItemContent>
          </SectionItem>
        </SectionContent>
      </Section>

      {/* Danger Zone */}
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
              <SectionItemTitle>Archive Project</SectionItemTitle>
              <SectionItemDescription>
                Archive this project. Archived projects can be restored later.
              </SectionItemDescription>
            </SectionItemHeader>
            <SectionItemContent>
              <Button variant="outline">Archive Project</Button>
            </SectionItemContent>
          </SectionItem>
          <Separator />
          <SectionItem>
            <SectionItemHeader>
              <SectionItemTitle>Delete Project</SectionItemTitle>
              <SectionItemDescription>
                Permanently delete this project and all of its data, including
                issues and comments. This action cannot be undone.
              </SectionItemDescription>
            </SectionItemHeader>
            <SectionItemContent>
              <DeleteProjectDialog />
            </SectionItemContent>
          </SectionItem>
        </SectionContent>
      </Section>
    </div>
  );
}
