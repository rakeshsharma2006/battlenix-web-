import { ChevronDown } from "lucide-react";
import type { FAQItemData } from "@/content/faq";

export function FAQItem({ question, answer }: FAQItemData) {
  return (
    <details className="group border-b border-[#26262c] py-4 last:border-b-0">
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold text-white marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5484d]">
        <span>{question}</span>
        <ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0 text-[#a1a1aa] transition-transform group-open:rotate-180" />
      </summary>
      <p className="max-w-3xl py-3 pr-8 text-sm leading-7 text-[#a1a1aa]">{answer}</p>
    </details>
  );
}
