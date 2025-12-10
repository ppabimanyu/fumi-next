"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { priority } from "@/components/priority-item";
import { statusIcon } from "@/components/status-icon";
import { ChevronDown, ChevronRight, Timer, TimerOff } from "lucide-react";
import moment from "moment";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export type Issue = {
  id: string;
  code: string;
  title: string;
  status: {
    id: string;
    name: string;
    icon: string;
    isCompleted: boolean;
    isCanceled: boolean;
  };
  priority: string;
  dueDate: Date;
};

const statuses = [
  { id: "backlog", name: "Backlog", icon: "BACKLOG" },
  { id: "in-progress", name: "In Progress", icon: "IN_PROGRESS" },
  { id: "review", name: "Review", icon: "REVIEW" },
  { id: "done", name: "Done", icon: "DONE" },
  { id: "canceled", name: "Canceled", icon: "CANCELED" },
];

const data: Issue[] = [
  {
    id: "m5gr84i9",
    code: "PROJ-001",
    title:
      "You can't compress the program without quantifying the open-source SSD pixel!",
    status: {
      id: "djwjdwkdwm",
      name: "Done",
      icon: "DONE",
      isCompleted: true,
      isCanceled: false,
    },
    priority: "MEDIUM",
    dueDate: new Date("2025-12-09T23:59:59"),
  },
  {
    id: "3u1reuv4",
    code: "PROJ-002",
    title:
      "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!",
    status: {
      id: "djwjd92w2S",
      name: "In Progress",
      icon: "IN_PROGRESS",
      isCompleted: false,
      isCanceled: false,
    },
    priority: "HIGH",
    dueDate: new Date("2025-12-08T23:59:59"),
  },
  {
    id: "derv1ws0",
    code: "PROJ-003",
    title: "We need to bypass the neural TCP card!",
    status: {
      id: "wdowosiwjd",
      name: "Backlog",
      icon: "BACKLOG",
      isCompleted: false,
      isCanceled: false,
    },
    priority: "NONE",
    dueDate: new Date("2025-12-15T23:59:59"),
  },
  {
    id: "5kma53ae",
    code: "PROJ-004",
    title:
      "The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!",
    status: {
      id: "wdwdkowsd",
      name: "Review",
      icon: "REVIEW",
      isCompleted: false,
      isCanceled: false,
    },
    priority: "MEDIUM",
    dueDate: new Date("2025-12-12T23:59:59"),
  },
  {
    id: "efk29dsl",
    code: "PROJ-005",
    title: "Calculate multi-byte protocol for backup system",
    status: {
      id: "kwmds92jwd",
      name: "Canceled",
      icon: "CANCELED",
      isCompleted: false,
      isCanceled: true,
    },
    priority: "CRITICAL",
    dueDate: new Date("2025-12-06T23:59:59"),
  },
  {
    id: "abc12345",
    code: "PROJ-006",
    title: "Implement user authentication flow",
    status: {
      id: "wdowosiwjd",
      name: "Backlog",
      icon: "BACKLOG",
      isCompleted: false,
      isCanceled: false,
    },
    priority: "HIGH",
    dueDate: new Date("2025-12-20T23:59:59"),
  },
  {
    id: "def67890",
    code: "PROJ-007",
    title: "Setup CI/CD pipeline",
    status: {
      id: "djwjd92w2S",
      name: "In Progress",
      icon: "IN_PROGRESS",
      isCompleted: false,
      isCanceled: false,
    },
    priority: "MEDIUM",
    dueDate: new Date("2025-12-10T23:59:59"),
  },
];

function IssueRow({ issue }: { issue: Issue }) {
  const overdue = issue.dueDate < new Date();
  const time = moment(issue.dueDate).fromNow();
  const isToday = issue.dueDate.toDateString() === new Date().toDateString();

  return (
    <div className="flex items-center gap-2 px-2 py-2 hover:bg-muted/50 rounded-md cursor-pointer">
      {/* Priority */}
      <div>{priority(issue.priority)?.icon}</div>

      {/* Issue Code */}
      <span className="text-xs p-1 bg-primary/20 text-primary rounded-md">
        {issue.code}
      </span>

      {/* Status Icon */}
      <div>{statusIcon(issue.status.icon)}</div>

      {/* Title */}
      <span className="text-sm font-medium flex-1 truncate">{issue.title}</span>

      {/* Due Date */}
      <div
        className={cn(
          "flex items-center gap-1 text-xs",
          isToday ? "text-yellow-500" : "",
          overdue ? "text-destructive" : "text-muted-foreground"
        )}
      >
        {overdue ? (
          <TimerOff className="size-3" />
        ) : (
          <Timer className="size-3" />
        )}
        {time}
      </div>
    </div>
  );
}

function StatusGroup({
  status,
  issues,
  defaultOpen = true,
}: {
  status: { id: string; name: string; icon: string };
  issues: Issue[];
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="-mx-8">
      <CollapsibleTrigger className="w-full">
        <div className="flex items-center gap-2 px-2 py-2 bg-muted/50">
          <div className="text-muted-foreground">
            {isOpen ? (
              <ChevronDown className="size-4" />
            ) : (
              <ChevronRight className="size-4" />
            )}
          </div>
          {statusIcon(status.icon)}
          <span className="text-sm font-medium">{status.name}</span>
          <span className="text-xs text-muted-foreground ml-1">
            {issues.length}
          </span>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="ml-4 border-l border-border/50 pl-2 space-y-0.5">
          {issues.map((issue) => (
            <IssueRow key={issue.id} issue={issue} />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function ProjectListView() {
  const getIssuesByStatus = (statusName: string) => {
    return data.filter((issue) => issue.status.name === statusName);
  };

  return (
    <div className="space-y-1">
      {statuses.map((status) => {
        const statusIssues = getIssuesByStatus(status.name);
        // Only show groups that have issues
        if (statusIssues.length === 0) return null;
        return (
          <StatusGroup
            key={status.id}
            status={status}
            issues={statusIssues}
            defaultOpen={
              !status.icon.includes("DONE") && !status.icon.includes("CANCELED")
            }
          />
        );
      })}
    </div>
  );
}
