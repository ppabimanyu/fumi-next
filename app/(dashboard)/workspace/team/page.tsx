import { Users } from "lucide-react";
import { TableMembers } from "./_components/table-members";
import SeparatorFull from "@/components/separator-full";
import { PageDescription, PageTitle } from "@/components/page";

export default function TeamPage() {
  return (
    <div className="space-y-2">
      <div className="space-y-0">
        <PageTitle className="flex gap-2 items-center">
          <Users className="size-5" />
          Team
        </PageTitle>
        <PageDescription>
          Manage your team members and their permissions.
        </PageDescription>
      </div>
      <SeparatorFull />
      <TableMembers />
    </div>
  );
}
