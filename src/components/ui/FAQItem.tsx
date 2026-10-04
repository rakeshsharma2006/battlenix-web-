import { Plus } from "lucide-react";
import type { FAQItemData } from "@/content/faq";

export function FAQItem({ question, answer }: FAQItemData) {
  return (
    <details className="faq-row group border-b border-[#26262c] py-3 last:border-b-0">
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold text-white marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5484d]">
        <span>{question}</span>
        <Plus aria-hidden="true" className="faq-plus h-4 w-4 shrink-0 text-[#a1a1aa]" />
      </summary>
      <div className="faq-answer-grid">
        <div>
          <p className="max-w-3xl py-3 pr-8 text-base leading-7 text-[#a1a1aa]">{answer}</p>
        </div>
      </div>
    </details>
  );
}
