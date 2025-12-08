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
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import LoadingButton from "@/components/loading-button";
import { trpc } from "@/lib/trpc/client";
import { useRouter } from "next/navigation";
import { env } from "@/env";

export function DeleteWorkspaceDialog({
  workspaceName,
  disabled = false,
}: {
  workspaceName: string;
  disabled?: boolean;
}) {
  const router = useRouter();
  const trpcUtils = trpc.useUtils();
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const deleteWorkspaceMutation = trpc.workspace.deleteWorkspace.useMutation({
    onSuccess: () => {
      toast.success("Workspace deleted successfully");
      trpcUtils.workspace.listWorkspace.invalidate();
      trpcUtils.workspace.getActiveWorkspace.invalidate();
      router.replace(env.NEXT_PUBLIC_DEFAULT_AUTHENTICATED_PAGE);
    },
    onError: () => {
      toast.error("Failed to delete workspace");
    },
    onSettled: () => {
      handleClose();
    },
  });

  const handleDelete = async () => {
    if (confirmText === workspaceName) {
      await deleteWorkspaceMutation.mutateAsync();
    }
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
        <Button
          className="text-destructive bg-destructive/10 hover:bg-destructive/20 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={disabled}
        >
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
            This action cannot be undone. This will permanently delete the
            workspace and all associated data.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            To confirm, type{" "}
            <span className="font-medium text-foreground">{workspaceName}</span>{" "}
            below:
          </p>
          <Input
            placeholder={workspaceName}
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <LoadingButton
            variant="destructive"
            disabled={confirmText !== workspaceName}
            onClick={handleDelete}
            isLoading={deleteWorkspaceMutation.isPending}
          >
            Delete Workspace
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
