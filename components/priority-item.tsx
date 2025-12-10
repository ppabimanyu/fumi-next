import React from "react";
import {
  Ellipsis,
  Signal,
  SignalHigh,
  SignalLow,
  SignalMedium,
} from "lucide-react";
import { PriorityEnum } from "@/lib/enum/priority";

export const listPriorityItems: {
  value: PriorityEnum;
  icon: React.ReactNode;
}[] = [
  {
    value: PriorityEnum.NONE,
    icon: (
      <div className="flex items-center gap-1 text-xs font-medium">
        <Ellipsis className="size-4" />
        No Priority
      </div>
    ),
  },
  {
    value: PriorityEnum.LOW,
    icon: (
      <div className="flex items-center gap-1 text-xs font-medium">
        <SignalLow className="size-4" />
        Low
      </div>
    ),
  },
  {
    value: PriorityEnum.MEDIUM,
    icon: (
      <div className="flex items-center gap-1 text-xs font-medium">
        <SignalMedium className="size-4" />
        Medium
      </div>
    ),
  },
  {
    value: PriorityEnum.HIGH,
    icon: (
      <div className="flex items-center gap-1 text-xs font-medium">
        <SignalHigh className="size-4" />
        High
      </div>
    ),
  },
  {
    value: PriorityEnum.CRITICAL,
    icon: (
      <div className="flex items-center gap-1 text-xs font-medium">
        <Signal className="size-4" />
        Critical
      </div>
    ),
  },
];

export const priorityItem = (value: PriorityEnum) =>
  listPriorityItems.find((p) => p.value === value);
