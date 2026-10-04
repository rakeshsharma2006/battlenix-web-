import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-[#26262c] bg-[#131316] px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-zinc-200",
        className,
      )}
    >
      {children}
    </span>
  );
}
