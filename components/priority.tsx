import React from "react";
import {
  Ellipsis,
  Signal,
  SignalHigh,
  SignalLow,
  SignalMedium,
} from "lucide-react";

export const listPriorities: { value: string; icon: React.ReactNode }[] = [
  {
    value: "NONE",
    icon: (
      <div className="flex items-center gap-1 text-xs font-medium">
        <Ellipsis className="size-4" />
        No Priority
      </div>
    ),
  },
  {
    value: "LOW",
    icon: (
      <div className="flex items-center gap-1 text-xs font-medium">
        <SignalLow className="size-4" />
        Low
      </div>
    ),
  },
  {
    value: "MEDIUM",
    icon: (
      <div className="flex items-center gap-1 text-xs font-medium">
        <SignalMedium className="size-4" />
        Medium
      </div>
    ),
  },
  {
    value: "HIGH",
    icon: (
      <div className="flex items-center gap-1 text-xs font-medium">
        <SignalHigh className="size-4" />
        High
      </div>
    ),
  },
  {
    value: "CRITICAL",
    icon: (
      <div className="flex items-center gap-1 text-xs font-medium">
        <Signal className="size-4" />
        Critical
      </div>
    ),
  },
];

export const priority = (value: string) =>
  listPriorities.find((p) => p.value === value);
