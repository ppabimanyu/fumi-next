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
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/loading-button";
import { Trash2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc/client";
import { useRouter } from "next/navigation";
import { env } from "@/env";

export function DeleteProjectDialog({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const router = useRouter();
  const trpcUtils = trpc.useUtils();
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const deleteProjectMutation = trpc.project.deleteProject.useMutation({
    onSuccess: () => {
      toast.success("Project deleted successfully");
      trpcUtils.project.listProjects.invalidate();
      router.replace(env.NEXT_PUBLIC_DEFAULT_AUTHENTICATED_PAGE);
    },
    onError: () => {
      toast.error("Failed to delete project");
    },
    onSettled: () => {
      handleClose();
    },
  });

  const handleDelete = async () => {
    if (confirmText !== name) {
      toast.error("Please type the project name correctly to confirm deletion");
      return;
    }
    await deleteProjectMutation.mutateAsync({ projectId: id });
  };

  const handleClose = () => {
    setOpen(false);
    setConfirmText("");
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
        <Button className="text-destructive bg-destructive/10 hover:bg-destructive/20 disabled:opacity-50 disabled:cursor-not-allowed">
          <Trash2 className="size-4" />
          Delete Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="size-5" />
            Delete Project
          </DialogTitle>
          <DialogDescription className="space-y-3 pt-2">
            <p>
              This action <strong>cannot be undone</strong>. This will
              permanently delete the project and all of its data.
            </p>
            <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
              <li>All issues will be deleted</li>
              <li>All project settings will be removed</li>
            </ul>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <p className="text-sm">
              Please type <strong>{name}</strong> to confirm:
            </p>
            <Input
              placeholder={name}
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              disabled={deleteProjectMutation.isPending}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={deleteProjectMutation.isPending}
          >
            Cancel
          </Button>
          <LoadingButton
            variant="destructive"
            onClick={handleDelete}
            disabled={confirmText !== name}
            isLoading={deleteProjectMutation.isPending}
          >
            <Trash2 className="size-4 mr-2" />
            Delete Project
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
