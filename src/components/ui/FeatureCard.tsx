import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
};

export function FeatureCard({
  icon,
  title,
  description,
  className,
}: FeatureCardProps) {
  return (
    <article
      className={cn(
        "min-w-0 border-t border-[#26262c] py-5 first:border-t-0",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <span className="mt-1 shrink-0 text-[#e5484d]">{icon}</span>
        <div className="min-w-0">
          <h3 className="font-display text-xl font-semibold text-white">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-[#a1a1aa]">{description}</p>
        </div>
      </div>
    </article>
  );
}
