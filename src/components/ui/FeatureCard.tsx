import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type FeatureCardProps = {
  icon: ReactNode;
  number: string;
  title: string;
  description: string;
  featured?: boolean;
  className?: string;
};

export function FeatureCard({
  icon,
  number,
  title,
  description,
  featured = false,
  className,
}: FeatureCardProps) {
  return (
    <article
      className={cn(
        "feature-card min-w-0",
        featured
          ? "h-full rounded-xl border border-[#26262c] bg-[#131316] p-5 md:p-6"
          : "border-t border-[#26262c] py-5",
        className,
      )}
    >
      <div className="flex items-start gap-4">
        <span className={`feature-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#e5484d]/20 bg-[#e5484d]/[0.08] text-[#e5484d] ${featured ? "md:h-12 md:w-12" : ""}`}>
          {icon}
        </span>
        <div className="min-w-0">
          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#e5484d]">{number}</p>
          <h3 className={`mt-1 font-display font-semibold text-white ${featured ? "text-2xl" : "text-xl"}`}>{title}</h3>
          <p className="mt-2 text-base leading-7 text-[#a1a1aa]">{description}</p>
        </div>
      </div>
    </article>
  );
}
