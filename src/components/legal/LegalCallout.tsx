import type { ReactNode } from "react";
import { AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

type LegalCalloutProps = {
  title: string;
  tone?: "info" | "warning";
  children: ReactNode;
};

export function LegalCallout({
  title,
  tone = "info",
  children,
}: LegalCalloutProps) {
  const isWarning = tone === "warning";

  return (
    <div
      className={cn(
        "my-6 rounded-lg border p-4 text-sm leading-7",
        isWarning
          ? "border-amber-500/50 bg-[#1a1a1f] text-amber-100"
          : "border-[#45454d] bg-[#131316] text-zinc-100",
      )}
    >
      <div className="mb-2 flex items-center gap-2 font-semibold text-white">
        {isWarning ? <AlertCircle className="h-4 w-4" /> : <Info className="h-4 w-4" />}
        {title}
      </div>
      <div className="text-zinc-200">{children}</div>
    </div>
  );
}
