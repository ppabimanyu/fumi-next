import { cn } from "@/lib/utils";

export function PageTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("text-md font-medium", className)}>{children}</div>;
}

export function PageDescription({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("text-xs text-muted-foreground", className)}>
      {children}
    </div>
  );
}
