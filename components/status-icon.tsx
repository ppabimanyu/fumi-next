import {
  CircleCheck,
  CircleDashed,
  CircleDot,
  CircleDotDashed,
  CircleX,
} from "lucide-react";

export const statusIcon: Record<string, React.ReactNode> = {
  BACKLOG: <CircleDashed className="size-5 text-slate-400" />,
  IN_PROGRESS: <CircleDotDashed className="size-5 text-yellow-400/80" />,
  REVIEW: <CircleDot className="size-5 text-yellow-400/80" />,
  DONE: <CircleCheck className="size-5 text-primary" />,
  CANCELED: <CircleX className="size-5 text-slate-400" />,
};
