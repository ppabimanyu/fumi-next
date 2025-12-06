import {
  CircleCheck,
  CircleDashed,
  CircleDot,
  CircleDotDashed,
  CircleX,
} from "lucide-react";

export const listStatusIcon: { value: string; icon: React.ReactNode }[] = [
  {
    value: "BACKLOG",
    icon: <CircleDashed className="size-5 text-slate-400" />,
  },
  {
    value: "IN_PROGRESS",
    icon: <CircleDotDashed className="size-5 text-yellow-400/80" />,
  },
  {
    value: "REVIEW",
    icon: <CircleDot className="size-5 text-yellow-400/80" />,
  },
  { value: "DONE", icon: <CircleCheck className="size-5 text-primary" /> },
  { value: "CANCELED", icon: <CircleX className="size-5 text-slate-400" /> },
];

export const statusIcon = (value: string) =>
  listStatusIcon.find((icon) => icon.value === value)?.icon;
