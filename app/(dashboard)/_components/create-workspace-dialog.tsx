"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import LoadingButton from "@/components/loading-button";
import { Building2 } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { trpc } from "@/lib/trpc/client";
import { useRouter } from "next/navigation";
import { env } from "@/env";

const createWorkspaceSchema = z.object({
  name: z
    .string()
    .min(1, "Workspace name is required")
    .min(2, "Workspace name must be at least 2 characters")
    .max(50, "Workspace name must be at most 50 characters"),
  description: z
    .string()
    .max(500, "Description must be at most 500 characters"),
});

interface CreateWorkspaceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateWorkspaceDialog({
  open,
  onOpenChange,
}: CreateWorkspaceDialogProps) {
  const router = useRouter();
  const trpcUtils = trpc.useUtils();

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
        onOpenChange(false);
      },
    });

  const createWorkspaceMutation = trpc.workspace.createWorkspace.useMutation({
    onSuccess: () => {
      trpcUtils.workspace.listWorkspace.invalidate();
      toast.success("Workspace created successfully");
    },
    onError: () => {
      toast.error("Failed to create workspace. Please try again.");
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
    validators: {
      onChange: createWorkspaceSchema,
    },
    onSubmit: async ({ value }) => {
      const { workspaceId } = await createWorkspaceMutation.mutateAsync({
        name: value.name.trim(),
        description: value.description?.trim(),
      });
      await changeActiveWorkspaceMutation.mutateAsync({
        workspaceId,
      });
    },
  });

  const handleClose = () => {
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          handleClose();
        } else {
          onOpenChange(true);
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Building2 className="size-5 text-primary" />
            </div>
            Create Workspace
          </DialogTitle>
          <DialogDescription>
            Create a new workspace to organize your projects and collaborate
            with your team.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <form.Field name="name">
            {(field) => (
              <Field>
                <FieldLabel htmlFor="workspace-name">Workspace Name</FieldLabel>
                <Input
                  id="workspace-name"
                  placeholder="My Workspace"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldDescription>
                  This will be the display name of your workspace.
                </FieldDescription>
                <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
              </Field>
            )}
          </form.Field>

          <form.Field name="description">
            {(field) => (
              <Field>
                <FieldLabel htmlFor="workspace-description">
                  Description{" "}
                  <span className="text-muted-foreground font-normal">
                    (optional)
                  </span>
                </FieldLabel>
                <Textarea
                  id="workspace-description"
                  placeholder="A brief description of what this workspace is for..."
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  rows={3}
                />
                <FieldDescription>
                  Help your team understand the purpose of this workspace.
                </FieldDescription>
                <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
              </Field>
            )}
          </form.Field>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <LoadingButton
                onClick={() => form.handleSubmit()}
                disabled={!canSubmit}
                isLoading={isSubmitting}
              >
                <Building2 className="size-4 mr-2" />
                Create Workspace
              </LoadingButton>
            )}
          </form.Subscribe>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
