"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Shield, UserMinus } from "lucide-react";
import { RemoveMemberDialog } from "./remove-member-dialog";
import { ChangeRoleDialog } from "./change-role-dialog";
import { TeamMember } from "./table-members";

interface MemberActionsProps {
  member: TeamMember;
}

export function MemberActions({ member }: MemberActionsProps) {
  const [removeDialogOpen, setRemoveDialogOpen] = React.useState(false);
  const [changeRoleDialogOpen, setChangeRoleDialogOpen] = React.useState(false);

  const isOwner = member.role === "OWNER";

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <MoreHorizontal className="size-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="text-xs">Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-xs"
            onClick={() => setChangeRoleDialogOpen(true)}
          >
            <Shield className="size-3 mr-2" />
            Change role
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-xs text-destructive"
            onClick={() => setRemoveDialogOpen(true)}
            disabled={isOwner}
          >
            <UserMinus className="size-3 mr-2" />
            Remove from team
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <RemoveMemberDialog
        member={member}
        open={removeDialogOpen}
        onOpenChange={setRemoveDialogOpen}
      />

      <ChangeRoleDialog
        member={member}
        open={changeRoleDialogOpen}
        onOpenChange={setChangeRoleDialogOpen}
      />
    </>
  );
}
