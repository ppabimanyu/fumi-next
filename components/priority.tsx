import React from "react";
import {
  Ellipsis,
  Signal,
  SignalHigh,
  SignalLow,
  SignalMedium,
} from "lucide-react";
import { priorityEnum } from "@/lib/constants/priority";

export const listPriorities: { value: priorityEnum; icon: React.ReactNode }[] =
  [
    {
      value: priorityEnum.NONE,
      icon: (
        <div className="flex items-center gap-1 text-xs font-medium">
          <Ellipsis className="size-4" />
          No Priority
        </div>
      ),
    },
    {
      value: priorityEnum.LOW,
      icon: (
        <div className="flex items-center gap-1 text-xs font-medium">
          <SignalLow className="size-4" />
          Low
        </div>
      ),
    },
    {
      value: priorityEnum.MEDIUM,
      icon: (
        <div className="flex items-center gap-1 text-xs font-medium">
          <SignalMedium className="size-4" />
          Medium
        </div>
      ),
    },
    {
      value: priorityEnum.HIGH,
      icon: (
        <div className="flex items-center gap-1 text-xs font-medium">
          <SignalHigh className="size-4" />
          High
        </div>
      ),
    },
    {
      value: priorityEnum.CRITICAL,
      icon: (
        <div className="flex items-center gap-1 text-xs font-medium">
          <Signal className="size-4" />
          Critical
        </div>
      ),
    },
  ];

export const priority = (value: priorityEnum) =>
  listPriorities.find((p) => p.value === value);
