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

export function DeleteWorkspaceDialog() {
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // In real implementation, this would come from context/props
  const workspaceName = "my-workspace";

  const handleDelete = async () => {
    if (confirmText !== workspaceName) {
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Implement actual delete logic via tRPC
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Workspace deleted successfully");
      handleClose();
      // In real implementation, redirect to workspace selection or home
    } catch {
      toast.error("Failed to delete workspace. Please try again.");
    } finally {
      setIsLoading(false);
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
            This action cannot be undone. This will permanently delete the
            workspace and all associated data.
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
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <LoadingButton
            variant="destructive"
            disabled={confirmText !== workspaceName}
            onClick={handleDelete}
            isLoading={isLoading}
          >
            Delete Workspace
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
