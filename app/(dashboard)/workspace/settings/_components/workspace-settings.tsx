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
import { Building2, Camera, Loader2, TriangleAlert } from "lucide-react";
import { LeaveWorkspaceDialog } from "./leave-workspace-dialog";
import { DeleteWorkspaceDialog } from "./delete-workspace-dialog";
import { trpc } from "@/lib/trpc/client";
import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function WorkspaceSettings() {
  const activeWorkspaceQuery = trpc.workspace.getActiveWorkspace.useQuery();
  if (activeWorkspaceQuery.isError) {
    toast.error("Failed to load active workspace");
  }

  // Image upload
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const uploadImageMutation = trpc.workspace.uploadImage.useMutation({
    onSuccess: (data) => {
      toast.success(data.message);
      activeWorkspaceQuery.refetch();
    },
    onError: (error) => {
      toast.error(error.message);
      setPreviewImage(null);
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type. Allowed: JPG, PNG, GIF, WebP");
      return;
    }

    // Validate file size (800KB)
    if (file.size > 800 * 1024) {
      toast.error("File too large. Maximum size is 800KB");
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Convert to base64 and upload
    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    uploadImageMutation.mutate({
      fileBase64: base64,
      fileName: file.name,
      contentType: file.type,
    });

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Update workspace
  const updateWorkspaceMutation = trpc.workspace.updateWorkspace.useMutation({
    onSuccess: () => {
      toast.success("Workspace updated successfully");
      activeWorkspaceQuery.refetch();
    },
    onError: () => {
      toast.error("Failed to update workspace");
    },
  });

  const form = useForm({
    defaultValues: {
      name: activeWorkspaceQuery.data?.name ?? "",
      description: activeWorkspaceQuery.data?.description ?? "",
    },
    validators: {
      onChange: z.object({
        name: z.string().min(1).max(50),
        description: z.string(),
      }),
    },
    onSubmit: async ({ value }) => {
      if (
        value.name.trim() == activeWorkspaceQuery.data?.name &&
        value.description.trim() == activeWorkspaceQuery.data?.description
      ) {
        return;
      }
      updateWorkspaceMutation.mutate({
        name: value.name?.trim(),
        description: value.description?.trim(),
      });
    },
  });

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
                {/* Hidden file input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                  id="avatar-upload"
                />

                {/* Avatar with click to upload */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadImageMutation.isPending}
                  className="relative group cursor-pointer disabled:cursor-not-allowed"
                >
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={
                        previewImage || activeWorkspaceQuery.data?.image || ""
                      }
                      alt={activeWorkspaceQuery.data?.name || "User"}
                    />
                    <AvatarFallback className="text-xl">
                      {activeWorkspaceQuery.data?.name
                        ?.slice(0, 2)
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    {uploadImageMutation.isPending ? (
                      <Loader2 className="size-5 text-white animate-spin" />
                    ) : (
                      <Camera className="size-5 text-white" />
                    )}
                  </div>
                </button>
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
              <form.Field name="name">
                {(field) => (
                  <Input
                    placeholder="Workspace Name"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={form.handleSubmit}
                  />
                )}
              </form.Field>
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
              <form.Field name="description">
                {(field) => (
                  <Textarea
                    placeholder="Describe your workspace..."
                    rows={3}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={form.handleSubmit}
                  />
                )}
              </form.Field>
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
          {activeWorkspaceQuery.data?.workspaceType === "PERSONAL" && (
            <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground mb-4">
              <p className="font-medium text-sm">Personal Workspace</p>
              <p className="mt-1 text-xs">
                This is your personal workspace. You cannot leave or delete it.
                Personal workspaces are created automatically for each user.
              </p>
            </div>
          )}
          <SectionItem>
            <SectionItemHeader>
              <SectionItemTitle>Leave Workspace</SectionItemTitle>
              <SectionItemDescription>
                You will lose access to this workspace and all its projects. An
                admin will need to re-invite you to regain access.
              </SectionItemDescription>
            </SectionItemHeader>
            <SectionItemContent>
              <LeaveWorkspaceDialog
                disabled={
                  activeWorkspaceQuery.data?.workspaceType === "PERSONAL"
                }
              />
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
              <DeleteWorkspaceDialog
                workspaceName={activeWorkspaceQuery.data?.name ?? ""}
                disabled={
                  activeWorkspaceQuery.data?.workspaceType === "PERSONAL"
                }
              />
            </SectionItemContent>
          </SectionItem>
        </SectionContent>
      </Section>
    </div>
  );
}
