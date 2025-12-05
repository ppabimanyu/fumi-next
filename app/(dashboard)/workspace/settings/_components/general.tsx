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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Building2,
  Image as ImageIcon,
  FileText,
  Globe,
  TriangleAlert,
  Trash2,
  AlertTriangle,
  UserMinus,
  Archive,
} from "lucide-react";
import { useState } from "react";

export function WorkspaceGeneralSettings() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const workspaceName = "my-workspace";

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
              <SectionItemTitle>Workspace URL</SectionItemTitle>
              <SectionItemDescription>
                This is your workspace&apos;s unique identifier used in URLs.
              </SectionItemDescription>
            </SectionItemHeader>
            <SectionItemContent className="md:w-xs">
              <div className="flex items-center">
                <span className="text-xs text-muted-foreground bg-muted px-3 py-2 rounded-l-md border border-r-0">
                  app.fumi.io/
                </span>
                <Input
                  className="rounded-l-none"
                  placeholder="my-workspace"
                  defaultValue="my-workspace"
                />
              </div>
            </SectionItemContent>
          </SectionItem>
        </SectionContent>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle className="flex items-center gap-2">
            <FileText className="size-5" />
            Workspace Details
          </SectionTitle>
          <SectionDescription>
            Additional information about your workspace.
          </SectionDescription>
        </SectionHeader>
        <SectionContent>
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
          <Separator />
          <SectionItem>
            <SectionItemHeader>
              <SectionItemTitle>Website</SectionItemTitle>
              <SectionItemDescription>
                Your organization&apos;s website URL.
              </SectionItemDescription>
            </SectionItemHeader>
            <SectionItemContent className="md:w-xs">
              <div className="flex items-center">
                <span className="text-xs text-muted-foreground bg-muted px-3 py-2 rounded-l-md border border-r-0">
                  <Globe className="size-4" />
                </span>
                <Input
                  className="rounded-l-none"
                  placeholder="https://example.com"
                />
              </div>
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
              <SectionItemTitle>
                Archive Workspace
                <Badge
                  variant="outline"
                  className="text-orange-600 border-orange-500/20"
                >
                  Reversible
                </Badge>
              </SectionItemTitle>
              <SectionItemDescription>
                Archiving will hide this workspace from the sidebar and pause
                all notifications. You can restore it at any time.
              </SectionItemDescription>
            </SectionItemHeader>
            <SectionItemContent>
              <Button
                variant="outline"
                className="text-orange-600 border-orange-500/50 hover:bg-orange-500/10"
              >
                <Archive className="size-4" />
                Archive Workspace
              </Button>
            </SectionItemContent>
          </SectionItem>
          <Separator />
          <SectionItem>
            <SectionItemHeader>
              <SectionItemTitle>
                Leave Workspace
                <Badge
                  variant="outline"
                  className="border-destructive/50 text-destructive/80"
                >
                  <AlertTriangle className="size-3" />
                  Cannot be undone
                </Badge>
              </SectionItemTitle>
              <SectionItemDescription>
                You will lose access to this workspace and all its projects. An
                admin will need to re-invite you to regain access.
              </SectionItemDescription>
            </SectionItemHeader>
            <SectionItemContent>
              <Button className="text-destructive bg-destructive/10 hover:bg-destructive/20">
                <UserMinus className="size-4" />
                Leave Workspace
              </Button>
            </SectionItemContent>
          </SectionItem>
          <Separator />
          <SectionItem>
            <SectionItemHeader>
              <SectionItemTitle>
                Delete Workspace
                <Badge
                  variant="outline"
                  className="border-destructive/50 text-destructive/80"
                >
                  <AlertTriangle className="size-3" />
                  Warning: This action is irreversible
                </Badge>
              </SectionItemTitle>
              <SectionItemDescription>
                Permanently delete this workspace and all of its data, including
                projects, issues, and team members. This action cannot be
                undone.
              </SectionItemDescription>
            </SectionItemHeader>
            <SectionItemContent>
              <Dialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="text-destructive bg-destructive/10 hover:bg-destructive/20">
                    <Trash2 className="size-4" />
                    Delete Workspace
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-center flex flex-col items-center gap-4">
                      <div className="size-12 rounded-full bg-destructive/10 flex items-center justify-center">
                        <Trash2 className="size-6 text-destructive" />
                      </div>
                      Delete Workspace
                    </DialogTitle>
                    <DialogDescription className="text-center">
                      This action cannot be undone. This will permanently delete
                      the workspace and all associated data.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      To confirm, type{" "}
                      <span className="font-mono font-medium text-foreground">
                        {workspaceName}
                      </span>{" "}
                      below:
                    </p>
                    <Input
                      placeholder={workspaceName}
                      value={confirmText}
                      onChange={(e) => setConfirmText(e.target.value)}
                    />
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setDeleteDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      disabled={confirmText !== workspaceName}
                      onClick={() => {
                        // Handle delete
                        setDeleteDialogOpen(false);
                        setConfirmText("");
                      }}
                    >
                      Delete Workspace
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </SectionItemContent>
          </SectionItem>
        </SectionContent>
      </Section>
    </div>
  );
}
