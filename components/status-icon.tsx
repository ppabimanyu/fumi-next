import { StatusIconEnum } from "@/lib/enum/status-icon";
import {
  CircleCheck,
  CircleDashed,
  CircleDot,
  CircleDotDashed,
  CircleX,
} from "lucide-react";

export const listStatusIcon: {
  value: StatusIconEnum;
  icon: React.ReactNode;
}[] = [
  {
    value: StatusIconEnum.BACKLOG,
    icon: <CircleDashed className="size-5 text-slate-400" />,
  },
  {
    value: StatusIconEnum.IN_PROGRESS,
    icon: <CircleDotDashed className="size-5 text-yellow-400/80" />,
  },
  {
    value: StatusIconEnum.REVIEW,
    icon: <CircleDot className="size-5 text-yellow-400/80" />,
  },
  {
    value: StatusIconEnum.DONE,
    icon: <CircleCheck className="size-5 text-primary" />,
  },
  {
    value: StatusIconEnum.CANCELED,
    icon: <CircleX className="size-5 text-slate-400" />,
  },
];

export const statusIcon = (value: StatusIconEnum) =>
  listStatusIcon.find((icon) => icon.value === value)?.icon;
