"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { listPriorities, priority } from "@/components/priority";
import { statusIcon } from "@/components/status-icon";
import {
  Box,
  CalendarDays,
  Check,
  ChevronRight,
  ListTodo,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export type Issue = {
  id: string;
  code: string;
  title: string;
  description?: string;
  status: {
    id: string;
    name: string;
    icon: string;
    isCompleted: boolean;
    isCanceled: boolean;
  };
  priority: string;
  startDate?: Date;
  dueDate?: Date;
  assignee?: Member[];
  project: {
    id: string;
    name: string;
    code: string;
  };
  labels?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  subtasks?: Subtask[];
};

type Subtask = {
  id: string;
  title: string;
  completed: boolean;
};

type Member = {
  id: string;
  name: string;
  email: string;
  image: string;
};

type Project = {
  id: string;
  name: string;
  code: string;
};

const listMembers: Member[] = [
  {
    id: "m5gr84i9",
    name: "John Doe",
    email: "john.doe@example.com",
    image: "https://example.com/avatar.jpg",
  },
  {
    id: "ij3dek2n",
    name: "Jane Doe",
    email: "jane.doe@example.com",
    image: "https://example.com/avatar.jpg",
  },
];

const listProjects: Project[] = [
  {
    id: "p5gr84i9",
    name: "Project 1",
    code: "PROJ1",
  },
  {
    id: "p5gr8cy7",
    name: "Project 2",
    code: "PROJ2",
  },
];

// Status options for the dropdown
const listStatus = [
  { id: "m5gr84i9", name: "Backlog", icon: "BACKLOG" },
  { id: "ij3dek2n", name: "In Progress", icon: "IN_PROGRESS" },
  { id: "ej23nek2", name: "Review", icon: "REVIEW" },
  { id: "kfreomf3", name: "Done", icon: "DONE" },
  { id: "fekfmo3m", name: "Canceled", icon: "CANCELED" },
];

const issueDetail: Issue = {
  id: "m5gr84i9",
  code: "ISSUE1",
  title: "Issue 1",
  description: "Description of issue 1",
  status: {
    id: "m5gr84i9",
    name: "Backlog",
    icon: "BACKLOG",
    isCompleted: false,
    isCanceled: false,
  },
  priority: "NONE",
  startDate: new Date("2025-12-01T00:00:00"),
  dueDate: new Date("2025-12-06T23:59:59"),
  assignee: [
    {
      id: "m5gr84i9",
      name: "John Doe",
      email: "john.doe@example.com",
      image: "https://example.com/avatar.jpg",
    },
  ],
  project: {
    id: "p5gr84i9",
    name: "Project 1",
    code: "PROJ1",
  },
  labels: ["Label 1", "Label 2"],
  createdAt: new Date("2025-12-06T23:59:59"),
  updatedAt: new Date("2025-12-06T23:59:59"),
  subtasks: [
    { id: "sub1", title: "Research API requirements", completed: true },
    { id: "sub2", title: "Create database schema", completed: false },
    { id: "sub3", title: "Implement frontend components", completed: false },
  ],
};

export function IssueDetailDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [issue] = useState(issueDetail);

  const [openComboboxStatus, setOpenComboboxStatus] = useState(false);
  const [openComboboxPriority, setOpenComboboxPriority] = useState(false);
  const [openComboboxAssignee, setOpenComboboxAssignee] = useState(false);
  const [openComboboxProject, setOpenComboboxProject] = useState(false);
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [openDueDatePicker, setOpenDueDatePicker] = useState(false);
  const [subtasks, setSubtasks] = useState<Subtask[]>(issue.subtasks || []);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");

  const issueForm = useForm({
    defaultValues: {
      title: issue.title,
      description: issue.description,
      statusId: issue.status.id,
      priority: issue.priority,
      dueDate: issue.dueDate,
      startDate: issue.startDate,
      assignee: issue.assignee?.map((assignee) => assignee.id),
      projectId: issue.project.id,
      labels: issue.labels,
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-full md:min-w-4xl max-h-[90vh] flex flex-col p-4 bg-card"
        showCloseButton={false}
      >
        {/* Header */}
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs ">
              <span className="font-mono font-medium flex gap-1 p-1 border-primary rounded-lg bg-primary/20 text-primary">
                <Box className="size-4" />
                {issue.project.code}
              </span>
              <ChevronRight className="size-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {issue.code}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="size-8 p-0"
                onClick={() => onOpenChange(false)}
              >
                <X className="size-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Content Area */}
        <div className="flex flex-col gap-4 h-full overflow-auto">
          {/* Title */}
          <div>
            <issueForm.Field name="title">
              {(field) => (
                <textarea
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                    }
                  }}
                  placeholder="Issue title"
                  className="flex field-sizing-content w-full resize-none border-none bg-transparent px-2 font-bold text-3xl shadow-none placeholder:text-muted-foreground/40 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
                  maxLength={50}
                  rows={1}
                />
              )}
            </issueForm.Field>
          </div>

          {/* Description */}
          <div className="h-full overflow-auto min-h-24">
            <issueForm.Field name="description">
              {(field) => (
                <textarea
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Add a description..."
                  className="text-sm font-medium text-foreground/80 h-full flex field-sizing-content w-full resize-none border-none bg-transparent p-2 shadow-none placeholder:text-muted-foreground/40 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
                />
              )}
            </issueForm.Field>
          </div>

          {/* Subtasks */}
          <div className="space-y-2 rounded-lg bg-background/80 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <ListTodo className="size-4" />
                Subtasks
                <span className="text-muted-foreground">
                  ({subtasks.filter((s) => s.completed).length}/
                  {subtasks.length})
                </span>
              </h3>
            </div>

            {/* Subtask List */}
            {
              <div className="overflow-auto">
                {subtasks.map((subtask) => (
                  <div
                    key={subtask.id}
                    className="flex items-center gap-2 p-1 rounded-lg hover:bg-muted/50 group"
                  >
                    <Checkbox
                      id={subtask.id}
                      checked={subtask.completed}
                      onCheckedChange={(checked) => {
                        setSubtasks((prev) =>
                          prev.map((s) =>
                            s.id === subtask.id
                              ? { ...s, completed: checked === true }
                              : s
                          )
                        );
                      }}
                    />
                    <label
                      htmlFor={subtask.id}
                      className={cn(
                        "flex-1 text-sm cursor-pointer",
                        subtask.completed &&
                          "line-through text-muted-foreground"
                      )}
                    >
                      {subtask.title}
                    </label>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => {
                        setSubtasks((prev) =>
                          prev.filter((s) => s.id !== subtask.id)
                        );
                      }}
                    >
                      <Trash2 className="size-3 text-muted-foreground" />
                    </Button>
                  </div>
                ))}
                {/* Add Subtask Input */}
                <div className="flex items-center justify-between gap-2 px-1">
                  <Checkbox disabled />
                  <input
                    placeholder="Add a subtask..."
                    maxLength={150}
                    value={newSubtaskTitle}
                    onChange={(e) => setNewSubtaskTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && newSubtaskTitle.trim()) {
                        setSubtasks((prev) => [
                          ...prev,
                          {
                            id: `sub-${Date.now()}`,
                            title: newSubtaskTitle.trim(),
                            completed: false,
                          },
                        ]);
                        setNewSubtaskTitle("");
                      }
                    }}
                    className="w-full text-sm"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-2"
                    disabled={!newSubtaskTitle.trim()}
                    onClick={() => {
                      if (newSubtaskTitle.trim()) {
                        setSubtasks((prev) => [
                          ...prev,
                          {
                            id: `sub-${Date.now()}`,
                            title: newSubtaskTitle.trim(),
                            completed: false,
                          },
                        ]);
                        setNewSubtaskTitle("");
                      }
                    }}
                  >
                    <Plus className="size-4" />
                  </Button>
                </div>
              </div>
            }
          </div>

          <div className="flex gap-2 items-center">
            {/**
             * Status Combobox
             * Displays current status with icon, closes on selection
             */}
            <issueForm.Field name="statusId">
              {(field) => {
                const selectedStatusDisplay = (id: string): React.ReactNode => {
                  const status = listStatus.find((status) => status.id === id);
                  return (
                    <span className="flex items-center gap-2">
                      {status ? (
                        <>
                          {statusIcon(status.icon)}
                          <span className="text-xs">{status.name}</span>
                        </>
                      ) : (
                        <span className="text-xs">Select status...</span>
                      )}
                    </span>
                  );
                };

                return (
                  <Popover
                    open={openComboboxStatus}
                    onOpenChange={setOpenComboboxStatus}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-fit justify-between px-2"
                        size={"sm"}
                      >
                        {selectedStatusDisplay(field.state.value)}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-fit">
                      <Command>
                        <CommandInput placeholder="Search status..." />
                        <CommandList>
                          <CommandEmpty>No status found.</CommandEmpty>
                          <CommandGroup>
                            {listStatus.map((status) => (
                              <CommandItem
                                key={status.id}
                                value={status.id}
                                onSelect={(currentValue) => {
                                  field.handleChange(currentValue);
                                  setOpenComboboxStatus(false);
                                }}
                              >
                                {statusIcon(status.icon)}
                                {status.name}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    field.state.value === status.id
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                );
              }}
            </issueForm.Field>

            {/**
             * Priority Combobox
             * Displays priority icon, closes on selection
             */}
            <issueForm.Field name="priority">
              {(field) => (
                <Popover
                  open={openComboboxPriority}
                  onOpenChange={setOpenComboboxPriority}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-fit justify-between px-2"
                      size={"sm"}
                    >
                      {field.state.value
                        ? priority(field.state.value)?.icon
                        : ""}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-fit">
                    <Command>
                      <CommandInput placeholder="Search priority..." />
                      <CommandList>
                        <CommandEmpty>No priority found.</CommandEmpty>
                        <CommandGroup>
                          {listPriorities.map((p) => (
                            <CommandItem
                              key={p.value}
                              value={p.value}
                              onSelect={(currentValue) => {
                                field.handleChange(currentValue);
                                setOpenComboboxPriority(false);
                              }}
                            >
                              {p.icon}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  field.state.value === p.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              )}
            </issueForm.Field>

            {/**
             * Assignee Combobox (Multi-select)
             * Allows selecting multiple team members as assignees
             * Features:
             * - Toggle selection (click to add/remove)
             * - Stacked avatars display (max 3 visible)
             * - Shows "+N" for more than 3 assignees
             * - Shows name only when single assignee selected
             * - Searchable by name and email via keywords prop
             * - Popover stays open for multi-selection
             */}
            <issueForm.Field name="assignee">
              {(field) => {
                const selectedMembers = field.state.value
                  ? listMembers.filter((m) => field.state.value?.includes(m.id))
                  : [];

                const toggleMember = (memberId: string) => {
                  const currentIds = field.state.value || [];
                  if (currentIds.includes(memberId)) {
                    // Remove member
                    field.handleChange(
                      currentIds.filter((id) => id !== memberId)
                    );
                  } else {
                    // Add member
                    field.handleChange([...currentIds, memberId]);
                  }
                };

                return (
                  <Popover
                    open={openComboboxAssignee}
                    onOpenChange={setOpenComboboxAssignee}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-fit justify-between px-2 gap-2"
                        size={"sm"}
                      >
                        {selectedMembers.length > 0 ? (
                          <div className="flex items-center gap-1">
                            <div className="flex -space-x-2">
                              {selectedMembers.slice(0, 3).map((m) => (
                                <Avatar
                                  key={m.id}
                                  className="size-5 border-2 border-background"
                                >
                                  <AvatarImage src={m.image} />
                                  <AvatarFallback className="text-[10px]">
                                    {m.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                              ))}
                            </div>
                            {selectedMembers.length > 3 && (
                              <span className="text-xs text-muted-foreground">
                                +{selectedMembers.length - 3}
                              </span>
                            )}
                            {selectedMembers.length === 1 && (
                              <span className="text-xs">
                                {selectedMembers[0].name}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            Assignee
                          </span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-fit">
                      <Command>
                        <CommandInput placeholder="Search members..." />
                        <CommandList>
                          <CommandEmpty>No members found.</CommandEmpty>
                          <CommandGroup>
                            {listMembers.map((m) => (
                              <CommandItem
                                key={m.id}
                                value={m.id}
                                onSelect={() => toggleMember(m.id)}
                                keywords={[m.name, m.email]}
                              >
                                <Avatar className="size-6">
                                  <AvatarImage src={m.image} />
                                  <AvatarFallback className="text-xs">
                                    {m.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                  <span className="text-sm">{m.name}</span>
                                  <span className="text-xs text-muted-foreground">
                                    {m.email}
                                  </span>
                                </div>
                                <Check
                                  className={cn(
                                    "ml-auto size-4",
                                    field.state.value?.includes(m.id)
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                );
              }}
            </issueForm.Field>

            {/**
             * Project Combobox
             * Single-select dropdown for assigning issue to a project
             * Displays project name with box icon, closes on selection
             */}
            <issueForm.Field name="projectId">
              {(field) => {
                const selectedProjectDisplay = (
                  id: string
                ): React.ReactNode => {
                  const project = listProjects.find(
                    (project) => project.id === id
                  );
                  return (
                    <span className="flex items-center gap-2">
                      {project ? (
                        <>
                          <Box className="size-4" />
                          <span className="text-xs">{project.name}</span>
                        </>
                      ) : (
                        <span className="text-xs">Select project...</span>
                      )}
                    </span>
                  );
                };

                return (
                  <Popover
                    open={openComboboxProject}
                    onOpenChange={setOpenComboboxProject}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-fit justify-between px-2"
                        size={"sm"}
                      >
                        {selectedProjectDisplay(field.state.value ?? "")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-fit">
                      <Command>
                        <CommandInput placeholder="Search project..." />
                        <CommandList>
                          <CommandEmpty>No project found.</CommandEmpty>
                          <CommandGroup>
                            {listProjects.map((project) => (
                              <CommandItem
                                key={project.id}
                                value={project.id}
                                onSelect={(currentValue) => {
                                  field.handleChange(currentValue);
                                  setOpenComboboxProject(false);
                                }}
                              >
                                <Box className="size-4" />
                                {project.name}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    field.state.value === project.id
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                );
              }}
            </issueForm.Field>

            {/**
             * Start Date Picker
             * Date picker for issue start date
             * Cannot select dates before today or after due date
             * Displays formatted date or placeholder when not set
             */}
            <issueForm.Field name="startDate">
              {(field) => (
                <issueForm.Subscribe selector={(state) => state.values.dueDate}>
                  {(dueDate) => (
                    <Popover
                      open={openStartDatePicker}
                      onOpenChange={setOpenStartDatePicker}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className={cn(
                            "w-fit justify-start text-left px-2 gap-2",
                            !field.state.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarDays className="size-4" />
                          <span className="text-xs">
                            {field.state.value
                              ? format(field.state.value, "MMM d, yyyy")
                              : "Start date"}
                          </span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.state.value}
                          onSelect={(date) => {
                            field.handleChange(date);
                            setOpenStartDatePicker(false);
                          }}
                          disabled={(date) => {
                            const today = new Date(
                              new Date().setHours(0, 0, 0, 0)
                            );
                            if (date < today) return true;
                            if (dueDate && date > dueDate) return true;
                            return false;
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                </issueForm.Subscribe>
              )}
            </issueForm.Field>

            {/**
             * Due Date Picker
             * Date picker for issue due date
             * Cannot select dates before the start date
             * Displays formatted date or placeholder when not set
             */}
            <issueForm.Field name="dueDate">
              {(field) => (
                <issueForm.Subscribe
                  selector={(state) => state.values.startDate}
                >
                  {(startDate) => (
                    <Popover
                      open={openDueDatePicker}
                      onOpenChange={setOpenDueDatePicker}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className={cn(
                            "w-fit justify-start text-left px-2 gap-2",
                            !field.state.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarDays className="size-4" />
                          <span className="text-xs">
                            {field.state.value
                              ? format(field.state.value, "MMM d, yyyy")
                              : "Due date"}
                          </span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.state.value}
                          onSelect={(date) => {
                            field.handleChange(date);
                            setOpenDueDatePicker(false);
                          }}
                          disabled={(date) => {
                            const minDate =
                              startDate ||
                              new Date(new Date().setHours(0, 0, 0, 0));
                            return date < minDate;
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                </issueForm.Subscribe>
              )}
            </issueForm.Field>
          </div>
        </div>
        <div className="-mx-4 w-dwh border-b h-0" />
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Update Issue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
