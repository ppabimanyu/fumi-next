import React from "react";
import { Signal, SignalHigh, SignalLow, SignalMedium } from "lucide-react";

export const priority: Record<string, React.ReactNode> = {
  low: (
    <div className="flex items-center gap-1 text-xs font-medium">
      <SignalLow className="size-5 text-green-500" />
      Low
    </div>
  ),
  medium: (
    <div className="flex items-center gap-1 text-xs font-medium">
      <SignalMedium className="size-5 text-yellow-500" />
      Medium
    </div>
  ),
  high: (
    <div className="flex items-center gap-1 text-xs font-medium">
      <SignalHigh className="size-5 text-red-500" />
      High
    </div>
  ),
  critical: (
    <div className="flex items-center gap-1 text-xs font-medium">
      <Signal className="size-5 text-pink-500" />
      Critical
    </div>
  ),
};
