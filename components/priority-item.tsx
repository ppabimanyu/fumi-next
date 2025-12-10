import React from "react";
import {
  Ellipsis,
  Signal,
  SignalHigh,
  SignalLow,
  SignalMedium,
} from "lucide-react";
import { PriorityEnum } from "@/lib/enum/priority";

export function PriorityItem({ value }: { value: PriorityEnum }) {
  return value === PriorityEnum.NONE ? (
    <div className="flex items-center gap-1 text-xs font-medium">
      <Ellipsis className="size-4" />
      No Priority
    </div>
  ) : value === PriorityEnum.LOW ? (
    <div className="flex items-center gap-1 text-xs font-medium">
      <SignalLow className="size-4" />
      Low
    </div>
  ) : value === PriorityEnum.MEDIUM ? (
    <div className="flex items-center gap-1 text-xs font-medium">
      <SignalMedium className="size-4" />
      Medium
    </div>
  ) : value === PriorityEnum.HIGH ? (
    <div className="flex items-center gap-1 text-xs font-medium">
      <SignalHigh className="size-4" />
      High
    </div>
  ) : value === PriorityEnum.CRITICAL ? (
    <div className="flex items-center gap-1 text-xs font-medium">
      <Signal className="size-4" />
      Critical
    </div>
  ) : null;
}
