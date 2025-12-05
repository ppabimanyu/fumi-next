import { Inbox } from "lucide-react";
import { TableInbox } from "./_components/table-inbox";
import SeparatorFull from "@/components/separator-full";
import { PageTitle } from "@/components/page";

export default function InboxPage() {
  return (
    <div className="space-y-2">
      <PageTitle className="flex gap-2 items-center">
        <Inbox className="size-5" />
        Inbox
      </PageTitle>
      <SeparatorFull />
      <TableInbox />
    </div>
  );
}
