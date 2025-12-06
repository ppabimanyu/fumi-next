"use client";

import * as React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { flexRender, Row, Cell } from "@tanstack/react-table";
import { IssueDetailDialog, type Issue } from "./issue-detail-dialog";

interface IssueTableRowProps {
  row: Row<Issue>;
}

export function IssueTableRow({ row }: IssueTableRowProps) {
  const [isDetailOpen, setIsDetailOpen] = React.useState(false);

  return (
    <>
      <TableRow
        data-state={row.getIsSelected() && "selected"}
        className="border-b border-border/50 cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={() => setIsDetailOpen(true)}
      >
        {row.getVisibleCells().map((cell: Cell<Issue, unknown>) => (
          <TableCell key={cell.id} className="first:pl-8 last:pr-8 py-3">
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>

      <IssueDetailDialog
        // issue={row.original}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
      />
    </>
  );
}
