"use client";

import { useState } from "react";
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
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import LoadingButton from "@/components/loading-button";
import { FolderPlus, Plus } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";
import { trpc } from "@/lib/trpc/client";
import { useRouter } from "next/navigation";
import { z } from "zod";

const createProjectSchema = z.object({
  name: z
    .string()
    .min(1, "Project name is required")
    .min(2, "Project name must be at least 2 characters")
    .max(50, "Project name must be at most 50 characters"),
  code: z.string().max(10, "Code must be at most 10 characters"),
  description: z
    .string()
    .max(500, "Description must be at most 500 characters"),
});

export function CreateProjectDialog() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const trpcUtils = trpc.useUtils();

  const createProjectMutation = trpc.project.createProject.useMutation({
    onSuccess: ({ projectId }) => {
      trpcUtils.project.listProjects.invalidate();
      toast.success("Project created successfully");
      router.push(`/projects/${projectId}`);
    },
    onError: (error) => {
      toast.error(`Failed to create project. ${error.message}`);
    },
    onSettled: () => {
      setOpen(false);
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
      code: "",
      description: "",
    },
    validators: {
      onChange: createProjectSchema,
    },
    onSubmit: async ({ value }) => {
      await createProjectMutation.mutateAsync({
        name: value.name.trim(),
        code: value.code.trim(),
        description: value.description.trim(),
      });
    },
  });

  const handleClose = () => {
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          handleClose();
        } else {
          setOpen(true);
        }
      }}
    >
      <DialogTrigger asChild>
        <button
          className="hover:bg-accent rounded-sm p-0.5 transition-colors"
          aria-label="Create project"
        >
          <Plus className="size-4" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FolderPlus className="size-5 text-primary" />
            </div>
            Create Project
          </DialogTitle>
          <DialogDescription>
            Create a new project to organize your issues and collaborate with
            your team.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <form.Field name="name">
            {(field) => (
              <Field>
                <FieldLabel htmlFor="project-name">Project Name</FieldLabel>
                <Input
                  id="project-name"
                  placeholder="My Project"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldDescription>
                  This will be the display name of your project.
                </FieldDescription>
                <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
              </Field>
            )}
          </form.Field>

          <form.Field name="code">
            {(field) => (
              <Field>
                <FieldLabel htmlFor="project-code">
                  Project Code{" "}
                  <span className="text-muted-foreground font-normal">
                    (optional)
                  </span>
                </FieldLabel>
                <Input
                  id="project-code"
                  placeholder="PROJ"
                  value={field.state.value}
                  onChange={(e) =>
                    field.handleChange(e.target.value.toUpperCase())
                  }
                  maxLength={10}
                />
                <FieldDescription>
                  A short code used for issue identifiers (e.g., PROJ-123). Will
                  be auto-generated if left empty.
                </FieldDescription>
                <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
              </Field>
            )}
          </form.Field>

          <form.Field name="description">
            {(field) => (
              <Field>
                <FieldLabel htmlFor="project-description">
                  Description{" "}
                  <span className="text-muted-foreground font-normal">
                    (optional)
                  </span>
                </FieldLabel>
                <Textarea
                  id="project-description"
                  placeholder="A brief description of what this project is for..."
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  rows={3}
                />
                <FieldDescription>
                  Help your team understand the purpose of this project.
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
                <FolderPlus className="size-4 mr-2" />
                Create Project
              </LoadingButton>
            )}
          </form.Subscribe>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
