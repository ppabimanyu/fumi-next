"use client";

import {
  CheckCircle2,
  CircleDashed,
  CircleDot,
  Clock,
  ListTodo,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

// Mock project data
const projectData = {
  name: "Project Alpha",
  description:
    "A comprehensive project management solution built with modern technologies. This project aims to streamline team collaboration and improve productivity across all departments.",
  totalIssues: 24,
  openIssues: 8,
  inProgressIssues: 6,
  completedIssues: 10,
  members: [
    { id: "1", name: "John Doe", email: "john@example.com", avatar: "" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", avatar: "" },
    { id: "3", name: "Bob Johnson", email: "bob@example.com", avatar: "" },
    { id: "4", name: "Alice Brown", email: "alice@example.com", avatar: "" },
  ],
  recentActivity: [
    {
      id: "1",
      action: "completed",
      issue: "PROJ-001",
      user: "John Doe",
      time: "2 hours ago",
    },
    {
      id: "2",
      action: "created",
      issue: "PROJ-007",
      user: "Jane Smith",
      time: "4 hours ago",
    },
    {
      id: "3",
      action: "updated",
      issue: "PROJ-003",
      user: "Bob Johnson",
      time: "1 day ago",
    },
  ],
};

function StatCard({
  title,
  value,
  icon: Icon,
  className,
}: {
  title: string;
  value: number;
  icon: React.ElementType;
  className?: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`size-4 ${className || "text-muted-foreground"}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

export function ProjectOverview() {
  const completionRate = Math.round(
    (projectData.completedIssues / projectData.totalIssues) * 100
  );

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Issues"
          value={projectData.totalIssues}
          icon={ListTodo}
        />
        <StatCard
          title="Open"
          value={projectData.openIssues}
          icon={CircleDashed}
          className="text-slate-400"
        />
        <StatCard
          title="In Progress"
          value={projectData.inProgressIssues}
          icon={CircleDot}
          className="text-yellow-500"
        />
        <StatCard
          title="Completed"
          value={projectData.completedIssues}
          icon={CheckCircle2}
          className="text-primary"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Project Description & Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">About Project</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {projectData.description}
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{completionRate}%</span>
              </div>
              <Progress value={completionRate} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Team Members */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="size-4" />
              Team Members
            </CardTitle>
            <span className="text-xs text-muted-foreground">
              {projectData.members.length} members
            </span>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {projectData.members.map((member) => (
                <div key={member.id} className="flex items-center gap-3">
                  <Avatar className="size-8">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback className="text-xs">
                      {member.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {member.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {member.email}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Clock className="size-4" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projectData.recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-3 text-sm"
              >
                <div
                  className={`size-2 rounded-full ${
                    activity.action === "completed"
                      ? "bg-primary"
                      : activity.action === "created"
                      ? "bg-green-500"
                      : "bg-yellow-500"
                  }`}
                />
                <span className="text-muted-foreground">{activity.user}</span>
                <span>{activity.action}</span>
                <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">
                  {activity.issue}
                </span>
                <span className="text-muted-foreground ml-auto text-xs">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
