import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "action" | "outline";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  target?: string;
  rel?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  target,
  rel,
}: ButtonProps) {
  const baseClasses =
    "button-link inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] border px-5 text-sm font-semibold transition-[background-color,border-color,box-shadow,transform] duration-150 ease-[var(--ease-out)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5484d] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0d]";

  const variantClasses =
    variant === "primary"
      ? "button-primary border-[#e5484d] bg-[#e5484d] text-white"
      : variant === "action"
        ? "button-action border-[#2f6bff] bg-[#2f6bff] text-white"
        : "button-outline border-[#45454d] bg-[#131316]/80 text-zinc-100";

  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className={cn(baseClasses, variantClasses, className)}
    >
      {children}
    </Link>
  );
}
