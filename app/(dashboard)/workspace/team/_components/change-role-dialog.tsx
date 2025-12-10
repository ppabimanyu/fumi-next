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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LoadingButton from "@/components/loading-button";
import { Shield, ChevronDown, Crown, User, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { TeamMember } from "./table-members";
import { WorkspaceMemberRoleEnum } from "@/lib/enum/workspace-member-role";

const roleConfig: Record<
  WorkspaceMemberRoleEnum,
  { icon: React.ReactNode; label: string; description: string }
> = {
  OWNER: {
    icon: <Crown className="size-4 text-yellow-500" />,
    label: "Owner",
    description: "Has full control over the workspace",
  },
  ADMIN: {
    icon: <Shield className="size-4 text-blue-500" />,
    label: "Admin",
    description: "Can manage team settings and invite members",
  },
  MEMBER: {
    icon: <User className="size-4 text-muted-foreground" />,
    label: "Member",
    description: "Can view and collaborate on projects",
  },
};

interface ChangeRoleDialogProps {
  member: TeamMember;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChangeRoleDialog({
  member,
  open,
  onOpenChange,
}: ChangeRoleDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<WorkspaceMemberRoleEnum>(
    member.role === "OWNER" ? "ADMIN" : (member.role as WorkspaceMemberRoleEnum)
  );

  const currentRoleDisplay =
    member.role === "OWNER" ? (
      <div className="flex items-center gap-1.5">
        <Crown className="size-4 text-yellow-500" />
        <span>Owner</span>
      </div>
    ) : (
      <div className="flex items-center gap-1.5">
        {roleConfig[member.role].icon}
        <span>{roleConfig[member.role].label}</span>
      </div>
    );

  const handleChangeRole = async () => {
    if (selectedRole === member.role) {
      onOpenChange(false);
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Implement actual change role logic via tRPC
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success(
        `${member.user.name}'s role has been changed to ${roleConfig[selectedRole].label}`
      );
      onOpenChange(false);
    } catch {
      toast.error("Failed to change role. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const isOwner = member.role === "OWNER";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center flex flex-col items-center gap-4">
            <div className="size-12 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Shield className="size-6 text-blue-500" />
            </div>
            Change Member Role
          </DialogTitle>
          <DialogDescription className="text-center">
            Update the role for this team member.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
          <Avatar className="size-10">
            <AvatarImage src={member.user.image ?? ""} alt={member.user.name} />
            <AvatarFallback className="text-sm">
              {member.user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="font-medium">{member.user.name}</div>
            <div className="text-sm text-muted-foreground">
              {member.user.email}
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            Current: {currentRoleDisplay}
          </div>
        </div>

        {isOwner ? (
          <div className="bg-orange-500/10 rounded-lg p-4 text-sm text-orange-700 dark:text-orange-400 flex gap-2">
            <AlertTriangle className="size-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Cannot change owner role</p>
              <p className="mt-1">
                Workspace owners cannot have their role changed. To change the
                owner, the current owner must transfer ownership from workspace
                settings.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm font-medium">Select new role:</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  <div className="flex items-center gap-2">
                    {roleConfig[selectedRole].icon}
                    <span>{roleConfig[selectedRole].label}</span>
                  </div>
                  <ChevronDown className="size-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width)">
                {(Object.keys(roleConfig) as WorkspaceMemberRoleEnum[]).map(
                  (roleKey) => (
                    <DropdownMenuItem
                      key={roleKey}
                      onClick={() => setSelectedRole(roleKey)}
                      className={cn(
                        "flex flex-col items-start gap-1 py-2 cursor-pointer",
                        selectedRole === roleKey && "bg-accent"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        {roleConfig[roleKey].icon}
                        <span className="font-medium">
                          {roleConfig[roleKey].label}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground pl-6">
                        {roleConfig[roleKey].description}
                      </span>
                    </DropdownMenuItem>
                  )
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          {!isOwner && (
            <LoadingButton
              onClick={handleChangeRole}
              disabled={selectedRole === member.role}
              isLoading={isLoading}
            >
              <Shield className="size-4 mr-1" />
              Update Role
            </LoadingButton>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
