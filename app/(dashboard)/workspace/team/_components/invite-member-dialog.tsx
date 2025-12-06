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
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/loading-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Mail, UserPlus, ChevronDown, Shield, User } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Role = "admin" | "member";

const roleConfig: Record<
  Role,
  {
    icon: React.ReactNode;
    label: string;
    description: string;
    className: string;
  }
> = {
  admin: {
    icon: <Shield className="size-4 text-blue-500" />,
    label: "Admin",
    description: "Can manage team settings and invite members",
    className: "bg-blue-500/10 text-blue-600 border-none",
  },
  member: {
    icon: <User className="size-4 text-muted-foreground" />,
    label: "Member",
    description: "Can view and collaborate on projects",
    className: "bg-muted text-muted-foreground border-none",
  },
};

export function InviteMemberDialog() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("member");
  const [isLoading, setIsLoading] = useState(false);

  const handleInvite = async () => {
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Implement actual invite logic via tRPC
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success(`Invitation sent to ${email}`);
      handleClose();
    } catch {
      toast.error("Failed to send invitation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEmail("");
    setRole("member");
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
        <div className="flex gap-1 items-center text-xs font-medium border rounded-lg px-2 py-1 cursor-pointer hover:bg-accent">
          <UserPlus className="size-4" />
          Invite
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="size-5" />
            Invite Team Member
          </DialogTitle>
          <DialogDescription>
            Send an invitation to join your team. They will receive an email
            with instructions to join.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <Field>
            <FieldLabel htmlFor="email">Email Address</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="colleague@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FieldDescription>
              Enter the email address of the person you want to invite.
            </FieldDescription>
          </Field>

          <Field>
            <FieldLabel>Role</FieldLabel>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  <div className="flex items-center gap-2">
                    {roleConfig[role].icon}
                    <span>{roleConfig[role].label}</span>
                  </div>
                  <ChevronDown className="size-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width)">
                {(Object.keys(roleConfig) as Role[]).map((roleKey) => (
                  <DropdownMenuItem
                    key={roleKey}
                    onClick={() => setRole(roleKey)}
                    className={cn(
                      "flex flex-col items-start gap-1 py-2 cursor-pointer",
                      role === roleKey && "bg-accent"
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
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <FieldDescription>
              Select the role for the new team member.
            </FieldDescription>
          </Field>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <LoadingButton
            onClick={handleInvite}
            disabled={!email}
            isLoading={isLoading}
          >
            <Mail className="size-4 mr-2" />
            Send Invitation
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
