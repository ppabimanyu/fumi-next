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

const projectName = "Project Alpha";

export function DeleteProjectDialog() {
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (confirmText !== projectName) {
      toast.error("Please type the project name correctly to confirm deletion");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Project deleted successfully");
      setOpen(false);
    } catch {
      toast.error("Failed to delete project");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setOpen(false);
      setConfirmText("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        <Button variant="destructive" onClick={() => setOpen(true)}>
          <Trash2 className="size-4 mr-2" />
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
              <li>All comments will be deleted</li>
              <li>All project settings will be removed</li>
            </ul>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <p className="text-sm">
              Please type <strong>{projectName}</strong> to confirm:
            </p>
            <Input
              placeholder={projectName}
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <LoadingButton
            variant="destructive"
            onClick={handleDelete}
            disabled={confirmText !== projectName}
            isLoading={isLoading}
          >
            <Trash2 className="size-4 mr-2" />
            Delete Project
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
