import { FAQItem } from "@/components/ui/FAQItem";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { faqCategories } from "@/content/faq";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Frequently Asked Questions",
  description: "Answers to common BattleNix questions about accounts, teams, tournaments, payments, prizes, and support. Check event details in the app.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <PageHeader eyebrow="Support" title="Frequently Asked Questions" description="General guidance for BattleNix accounts, teams, tournaments, payments, and support." />
        <nav aria-label="FAQ categories" className="mt-8 flex flex-wrap gap-2">
          {faqCategories.map(({ id, title }) => (
            <a key={id} href={`#${id}`} className="inline-flex min-h-11 items-center rounded-lg border border-[#26262c] px-3 text-sm text-[#a1a1aa] hover:border-[#e5484d] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5484d]">
              {title}
            </a>
          ))}
        </nav>
        <div className="mt-8 max-w-4xl">
          {faqCategories.map(({ id, title, items }) => (
            <section key={id} id={id} className="scroll-mt-24 border-t border-[#26262c] py-6">
              <h2 className="font-display text-2xl font-semibold text-white">{title}</h2>
              <div className="mt-2">
                {items.map((item) => <FAQItem key={item.question} {...item} />)}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </section>
  );
}
