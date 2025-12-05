import React from "react";
import {
  Ellipsis,
  Signal,
  SignalHigh,
  SignalLow,
  SignalMedium,
} from "lucide-react";

export const priority: Record<string, React.ReactNode> = {
  NONE: (
    <div className="flex items-center gap-1 text-xs font-medium">
      <Ellipsis className="size-5" />
      No Priority
    </div>
  ),
  LOW: (
    <div className="flex items-center gap-1 text-xs font-medium">
      <SignalLow className="size-5" />
      Low
    </div>
  ),
  MEDIUM: (
    <div className="flex items-center gap-1 text-xs font-medium">
      <SignalMedium className="size-5" />
      Medium
    </div>
  ),
  HIGH: (
    <div className="flex items-center gap-1 text-xs font-medium">
      <SignalHigh className="size-5" />
      High
    </div>
  ),
  CRITICAL: (
    <div className="flex items-center gap-1 text-xs font-medium">
      <Signal className="size-5" />
      Critical
    </div>
  ),
};
