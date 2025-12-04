import { ListFilter, Logs, Settings2 } from "lucide-react";
import React from "react";
import { TableIssues } from "./_components/table-issues";
import SeparatorFull from "@/components/separator-full";

export default function MyIssuesPage() {
  return (
    <div className="space-y-2">
      <h1 className="text-md font-medium flex gap-2 items-center">
        <Logs className="size-5" />
        My Issues
      </h1>
      <SeparatorFull />
      <TableIssues />
    </div>
  );
}
