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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LoadingButton from "@/components/loading-button";
import {
  UserMinus,
  AlertTriangle,
  ChevronDown,
  Crown,
  Shield,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Mock data - in real implementation this would come from context/props
type TeamMember = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "owner" | "admin" | "member";
};

// Mock current user and team data
const mockCurrentUser: TeamMember = {
  id: "member-1",
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "",
  role: "owner",
};

const mockTeamMembers: TeamMember[] = [
  mockCurrentUser,
  {
    id: "member-2",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    avatar: "",
    role: "admin",
  },
  {
    id: "member-3",
    name: "Mike Chen",
    email: "mike.chen@example.com",
    avatar: "",
    role: "member",
  },
];

const roleIcons: Record<TeamMember["role"], React.ReactNode> = {
  owner: <Crown className="size-3 text-yellow-500" />,
  admin: <Shield className="size-3 text-blue-500" />,
  member: <User className="size-3 text-muted-foreground" />,
};

type DialogStep = "confirm" | "transfer-ownership" | "cannot-leave";

export function LeaveWorkspaceDialog() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedNewOwner, setSelectedNewOwner] = useState<TeamMember | null>(
    null
  );

  // In real implementation, these would come from props/context
  const currentUser = mockCurrentUser;
  const teamMembers = mockTeamMembers;
  const workspaceName = "My Workspace";

  const isOwner = currentUser.role === "owner";
  const isOnlyMember = teamMembers.length === 1;
  const otherMembers = teamMembers.filter((m) => m.id !== currentUser.id);

  // Determine which dialog step to show
  const getDialogStep = (): DialogStep => {
    if (isOnlyMember) return "cannot-leave";
    if (isOwner && otherMembers.length > 0) return "transfer-ownership";
    return "confirm";
  };

  const dialogStep = getDialogStep();

  const handleLeaveWorkspace = async () => {
    if (isOwner && !selectedNewOwner) {
      toast.error("Please select a new owner before leaving");
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Implement actual leave logic via tRPC
      // If owner, first transfer ownership, then leave
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (isOwner && selectedNewOwner) {
        toast.success(
          `Ownership transferred to ${selectedNewOwner.name}. You have left the workspace.`
        );
      } else {
        toast.success(`You have left ${workspaceName}`);
      }

      handleClose();
      // In real implementation, redirect to workspace selection or home
    } catch {
      toast.error("Failed to leave workspace. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedNewOwner(null);
  };

  const renderCannotLeaveContent = () => (
    <>
      <DialogHeader>
        <DialogTitle className="text-center flex flex-col items-center gap-4">
          <div className="size-12 rounded-full bg-orange-500/10 flex items-center justify-center">
            <AlertTriangle className="size-6 text-orange-500" />
          </div>
          Cannot Leave Workspace
        </DialogTitle>
        <DialogDescription className="text-center">
          You are the only member of this workspace. You cannot leave because a
          workspace must have at least one member.
        </DialogDescription>
      </DialogHeader>
      <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
        <p>To leave this workspace, you can either:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Invite another member and transfer ownership to them</li>
          <li>Delete the workspace entirely</li>
        </ul>
      </div>
      <DialogFooter>
        <Button variant="outline" className="w-full" onClick={handleClose}>
          Got it
        </Button>
      </DialogFooter>
    </>
  );

  const renderTransferOwnershipContent = () => (
    <>
      <DialogHeader>
        <DialogTitle className="text-center flex flex-col items-center gap-4">
          <div className="size-12 rounded-full bg-orange-500/10 flex items-center justify-center">
            <Crown className="size-6 text-orange-500" />
          </div>
          Transfer Ownership Before Leaving
        </DialogTitle>
        <DialogDescription className="text-center">
          As the workspace owner, you must transfer ownership to another member
          before you can leave.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-3">
        <p className="text-sm font-medium">Select new owner:</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {selectedNewOwner ? (
                <div className="flex items-center gap-2">
                  <Avatar className="size-6">
                    <AvatarImage
                      src={selectedNewOwner.avatar}
                      alt={selectedNewOwner.name}
                    />
                    <AvatarFallback className="text-xs">
                      {selectedNewOwner.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span className="text-sm">{selectedNewOwner.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {selectedNewOwner.email}
                    </span>
                  </div>
                </div>
              ) : (
                <span className="text-muted-foreground">
                  Select a team member...
                </span>
              )}
              <ChevronDown className="size-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width)">
            {otherMembers.map((member) => (
              <DropdownMenuItem
                key={member.id}
                onClick={() => setSelectedNewOwner(member)}
                className={cn(
                  "flex items-center gap-2 py-2 cursor-pointer",
                  selectedNewOwner?.id === member.id && "bg-accent"
                )}
              >
                <Avatar className="size-8">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="text-xs">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-medium">{member.name}</span>
                    {roleIcons[member.role]}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {member.email}
                  </span>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="bg-orange-500/10 rounded-lg p-4 text-sm text-orange-700 dark:text-orange-400 flex gap-2">
        <AlertTriangle className="size-4 shrink-0 mt-0.5" />
        <div>
          <p className="font-medium">Warning</p>
          <p className="mt-1">
            After transferring ownership, you will become a regular member until
            you leave. This action cannot be undone.
          </p>
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={handleClose}>
          Cancel
        </Button>
        <LoadingButton
          variant="destructive"
          onClick={handleLeaveWorkspace}
          disabled={!selectedNewOwner}
          isLoading={isLoading}
        >
          <Crown className="size-4 mr-1" />
          Transfer & Leave
        </LoadingButton>
      </DialogFooter>
    </>
  );

  const renderConfirmContent = () => (
    <>
      <DialogHeader>
        <DialogTitle className="text-center flex flex-col items-center gap-4">
          <div className="size-12 rounded-full bg-destructive/10 flex items-center justify-center">
            <UserMinus className="size-6 text-destructive" />
          </div>
          Leave Workspace
        </DialogTitle>
        <DialogDescription className="text-center">
          Are you sure you want to leave{" "}
          <span className="font-medium text-foreground">{workspaceName}</span>?
        </DialogDescription>
      </DialogHeader>

      <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
        <p>If you leave this workspace:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>You will lose access to all projects and data</li>
          <li>An admin will need to re-invite you to regain access</li>
          <li>
            Your contributions will remain but will show as from a former member
          </li>
        </ul>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={handleClose}>
          Cancel
        </Button>
        <LoadingButton
          variant="destructive"
          onClick={handleLeaveWorkspace}
          isLoading={isLoading}
        >
          <UserMinus className="size-4 mr-1" />
          Leave Workspace
        </LoadingButton>
      </DialogFooter>
    </>
  );

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
          <UserMinus className="size-4" />
          Leave Workspace
        </Button>
      </DialogTrigger>
      <DialogContent>
        {dialogStep === "cannot-leave" && renderCannotLeaveContent()}
        {dialogStep === "transfer-ownership" &&
          renderTransferOwnershipContent()}
        {dialogStep === "confirm" && renderConfirmContent()}
      </DialogContent>
    </Dialog>
  );
}
