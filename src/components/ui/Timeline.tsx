import type { ReactNode } from "react";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/motion/Reveal";

type TimelineStep = {
  number: string;
  title: string;
  description: string;
  icon?: ReactNode;
};

type TimelineProps = {
  steps: TimelineStep[];
  layout?: "horizontal" | "vertical";
};

export function Timeline({ steps, layout = "horizontal" }: TimelineProps) {
  const vertical = layout === "vertical";

  return (
    <Reveal as="ol" className={vertical ? "timeline timeline-vertical relative space-y-0 pl-7" : "timeline timeline-horizontal grid gap-0 md:grid-cols-5"} y={12}>
      {steps.map((step, index) => (
        <li key={step.number} style={{ "--reveal-delay": `${Math.min(index * 70, 400)}ms` } as CSSProperties} className={vertical ? "timeline-step relative border-b border-[#26262c] py-5 last:border-b-0" : "timeline-step min-w-0 border-t border-[#26262c] px-4 py-5 first:border-t-0 md:border-l md:border-t-0 md:first:border-l-0"}>
          <span className={vertical ? "absolute -left-[2.15rem] top-6 bg-[#0b0b0d] pr-2 font-display text-xl font-bold text-[#e5484d]" : "font-display text-3xl font-bold text-[#e5484d]"}>
            {step.number}
          </span>
          {!vertical && step.icon ? <span className="ml-3 inline-flex align-middle text-[#a1a1aa]">{step.icon}</span> : null}
          <h3 className={`font-display text-xl font-semibold text-white ${vertical ? "" : "mt-2"}`}>{step.title}</h3>
          <p className="mt-2 text-sm leading-6 text-[#a1a1aa]">{step.description}</p>
        </li>
      ))}
    </Reveal>
  );
}
