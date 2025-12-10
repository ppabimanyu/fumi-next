import { StatusIconEnum } from "@/lib/enum/status-icon";
import {
  CircleCheck,
  CircleDashed,
  CircleDot,
  CircleDotDashed,
  CircleX,
} from "lucide-react";

export function IssueStatusItem({
  value,
  name,
}: {
  value: StatusIconEnum;
  name?: string;
}) {
  return value === StatusIconEnum.BACKLOG ? (
    <div className="flex items-center gap-1 text-xs font-medium">
      <CircleDashed className="size-5 text-slate-400" />
      {name}
    </div>
  ) : value === StatusIconEnum.IN_PROGRESS ? (
    <div className="flex items-center gap-1 text-xs font-medium">
      <CircleDotDashed className="size-5 text-yellow-400/80" />
      {name}
    </div>
  ) : value === StatusIconEnum.REVIEW ? (
    <div className="flex items-center gap-1 text-xs font-medium">
      <CircleDot className="size-5 text-yellow-400/80" />
      {name}
    </div>
  ) : value === StatusIconEnum.DONE ? (
    <div className="flex items-center gap-1 text-xs font-medium">
      <CircleCheck className="size-5 text-primary" />
      {name}
    </div>
  ) : value === StatusIconEnum.CANCELED ? (
    <div className="flex items-center gap-1 text-xs font-medium">
      <CircleX className="size-5 text-slate-400" />
      {name}
    </div>
  ) : null;
}
