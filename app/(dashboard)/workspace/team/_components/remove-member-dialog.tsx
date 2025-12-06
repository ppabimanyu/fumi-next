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
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LoadingButton from "@/components/loading-button";
import { UserMinus, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

export type TeamMember = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "owner" | "admin" | "member";
  status: "active" | "pending" | "inactive";
  joinedAt: Date;
};

interface RemoveMemberDialogProps {
  member: TeamMember;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RemoveMemberDialog({
  member,
  open,
  onOpenChange,
}: RemoveMemberDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleRemove = async () => {
    setIsLoading(true);

    try {
      // TODO: Implement actual remove logic via tRPC
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success(`${member.name} has been removed from the team`);
      onOpenChange(false);
    } catch {
      toast.error("Failed to remove member. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center flex flex-col items-center gap-4">
            <div className="size-12 rounded-full bg-destructive/10 flex items-center justify-center">
              <UserMinus className="size-6 text-destructive" />
            </div>
            Remove Team Member
          </DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want to remove this member from the team?
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
          <Avatar className="size-10">
            <AvatarImage src={member.avatar} alt={member.name} />
            <AvatarFallback className="text-sm">
              {member.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{member.name}</div>
            <div className="text-sm text-muted-foreground">{member.email}</div>
          </div>
        </div>

        <div className="bg-orange-500/10 rounded-lg p-4 text-sm text-orange-700 dark:text-orange-400 flex gap-2">
          <AlertTriangle className="size-4 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Warning</p>
            <p className="mt-1">
              This member will immediately lose access to the workspace and all
              its projects. They will need to be re-invited to regain access.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <LoadingButton
            variant="destructive"
            onClick={handleRemove}
            isLoading={isLoading}
          >
            <UserMinus className="size-4 mr-1" />
            Remove Member
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
