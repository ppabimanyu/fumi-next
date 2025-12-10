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
import { Box, TriangleAlert } from "lucide-react";
import { DeleteProjectDialog } from "./delete-project-dialog";
import { trpc } from "@/lib/trpc/client";
import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";

export function ProjectSettingsPage({
  id,
  name,
  code,
  description,
}: {
  id: string;
  name: string;
  code: string;
  description: string;
}) {
  const trpcUtils = trpc.useUtils();

  const updateProjectByIdMutation = trpc.project.updateProjectById.useMutation({
    onSuccess: () => {
      toast.success("Project updated successfully");
      trpcUtils.project.getProjectById.invalidate({ projectId: id });
      trpcUtils.project.listProjects.invalidate();
    },
    onError: (error) => {
      toast.error(`Failed to update project, ${error}`);
    },
  });

  const form = useForm({
    defaultValues: {
      name: name,
      code: code,
      description: description,
    },
    onSubmit: async ({ value }) => {
      if (
        value.name.trim() === name &&
        value.code.trim() === code &&
        value.description.trim() === description
      ) {
        return;
      }
      updateProjectByIdMutation.mutate({
        projectId: id,
        code: value.code.trim(),
        description: value.description.trim(),
        name: value.name.trim(),
      });
    },
  });

  return (
    <div className="space-y-8 w-full md:w-3xl mx-auto my-12">
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
              <SectionItemTitle>Project Name</SectionItemTitle>
              <SectionItemDescription>
                This is your project&apos;s display name visible to all members.
              </SectionItemDescription>
            </SectionItemHeader>
            <SectionItemContent className="md:w-xs">
              <form.Field name="name">
                {(field) => (
                  <Input
                    placeholder="Project Name"
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
              <SectionItemTitle>Project Code</SectionItemTitle>
              <SectionItemDescription>
                A unique identifier for your project, used as issue prefix
                (e.g., PROJ-001).
              </SectionItemDescription>
            </SectionItemHeader>
            <SectionItemContent className="md:w-xs">
              <form.Field name="code">
                {(field) => (
                  <Input
                    placeholder="Project Code"
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
                A brief description of your project and its goals.
              </SectionItemDescription>
            </SectionItemHeader>
            <SectionItemContent className="md:w-md">
              <form.Field name="description">
                {(field) => (
                  <Textarea
                    placeholder="Describe your project..."
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
              <SectionItemTitle>Delete Project</SectionItemTitle>
              <SectionItemDescription>
                Permanently delete this project and all of its data, including
                issues and comments. This action cannot be undone.
              </SectionItemDescription>
            </SectionItemHeader>
            <SectionItemContent>
              <DeleteProjectDialog id={id} name={name} />
            </SectionItemContent>
          </SectionItem>
        </SectionContent>
      </Section>
    </div>
  );
}
