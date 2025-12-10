"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { priority } from "@/components/priority-item";
import { statusIcon } from "@/components/status-icon";
import { Timer, TimerOff } from "lucide-react";
import moment from "moment";

type Issue = {
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

const issues: Issue[] = [
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

function IssueCard({ issue }: { issue: Issue }) {
  const overdue = issue.dueDate < new Date();
  const time = moment(issue.dueDate).fromNow();
  const isToday = issue.dueDate.toDateString() === new Date().toDateString();

  return (
    <div className="p-3 bg-card border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer space-y-2">
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs text-muted-foreground font-mono">
          {issue.code}
        </span>
        <span>{priority(issue.priority)?.icon}</span>
      </div>
      <p className="text-sm font-medium line-clamp-2">{issue.title}</p>
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

export function ProjectKanbanView() {
  const getIssuesByStatus = (statusName: string) => {
    return issues.filter((issue) => issue.status.name === statusName);
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 h-full -mx-8 px-8">
      {statuses.map((status) => {
        const columnIssues = getIssuesByStatus(status.name);
        return (
          <div
            key={status.id}
            className="min-w-96 bg-muted/30 rounded-lg p-3 h-full flex flex-col"
          >
            {/* Column Header */}
            <div className="flex items-center gap-2 mb-3 px-1">
              {statusIcon(status.icon)}
              <span className="text-sm font-medium">{status.name}</span>
              <span className="text-xs text-muted-foreground ml-auto">
                {columnIssues.length}
              </span>
            </div>

            {/* Issue Cards */}
            <div className="space-y-2 h-full">
              {columnIssues.map((issue) => (
                <IssueCard key={issue.id} issue={issue} />
              ))}
              {columnIssues.length === 0 && (
                <div className="text-xs text-muted-foreground text-center py-8">
                  No issues
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
