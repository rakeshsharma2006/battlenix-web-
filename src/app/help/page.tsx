import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { faqCategories } from "@/content/faq";
import { createPageMetadata } from "@/lib/metadata";
import { LEGAL_LINKS } from "@/lib/constants";

export const metadata = createPageMetadata({
  title: "Help Center",
  description: "Find BattleNix help topics for accounts, teams, tournaments, payments, prizes, and support, with links to FAQs and policies.",
  path: "/help",
});

export default function HelpPage() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <PageHeader eyebrow="Support" title="Help Center" description="Choose a topic to find the relevant FAQ answers and policy pages." />
        <nav aria-label="Help topics" className="mt-8 flex flex-wrap gap-2">
          {faqCategories.map(({ id, title }) => (
            <Link key={id} href={`/faq#${id}`} className="inline-flex min-h-11 items-center rounded-lg border border-[#26262c] px-3 text-sm text-[#a1a1aa] hover:border-[#e5484d] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5484d]">
              {title}
            </Link>
          ))}
        </nav>
        <div className="mt-10 grid gap-10 border-t border-[#26262c] pt-8 md:grid-cols-2">
          <section>
            <h2 className="font-display text-xl font-semibold text-white">Contact</h2>
            <p className="mt-2 text-sm leading-6 text-[#a1a1aa]">For account or event-specific help, use the support options available in the app.</p>
            <Link href="/contact" className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-white underline decoration-[#e5484d] underline-offset-4">Contact options</Link>
          </section>
          <section>
            <h2 className="font-display text-xl font-semibold text-white">Policies</h2>
            <ul className="mt-2 space-y-2 text-sm text-[#a1a1aa]">
              {LEGAL_LINKS.map(({ href, label }) => <li key={href}><Link href={href} className="hover:text-white">{label}</Link></li>)}
            </ul>
          </section>
        </div>
      </Container>
    </section>
  );
}
