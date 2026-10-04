import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { ContactCard } from "@/components/contact/ContactCard";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { CONTACT } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";
import { SITE_CONFIG } from "@/lib/site-config";
import { RevealGroup } from "@/components/motion/RevealGroup";

export const metadata = createPageMetadata({
  title: "BattleNix Contact",
  description: "Find BattleNix support options and the information to include when reporting an account, tournament, payment, or app issue.",
  path: "/contact",
});

const contactChannels = [
  { key: "email", label: "Email Support", icon: <Mail className="h-5 w-5" />, description: "Contact BattleNix support for account, tournament, payment or technical issues." },
  { key: "whatsapp", label: "WhatsApp Support", icon: <FaWhatsapp className="h-5 w-5 text-[#25D366]" aria-hidden="true" />, description: "Connect with BattleNix support through our official WhatsApp channel." },
  { key: "instagram", label: "Instagram", icon: <FaInstagram className="h-5 w-5 text-[#E4405F]" aria-hidden="true" />, description: "Follow BattleNix for tournament updates, announcements and esports content." },
  { key: "youtube", label: "YouTube", icon: <FaYoutube className="h-5 w-5 text-[#FF0033]" aria-hidden="true" />, description: "Watch BattleNix tournament content, updates and esports videos." },
] as const;

function getChannelHref(key: (typeof contactChannels)[number]["key"], value: string) {
  if (key === "email") return `mailto:${value}`;
  return value;
}

function getChannelDisplayValue(key: (typeof contactChannels)[number]["key"], value: string) {
  if (key === "whatsapp") return "Official WhatsApp channel";
  if (key === "instagram" || key === "youtube") {
    return new URL(value).pathname.replace(/^\/@?/, "@").replace(/\/$/, "");
  }
  return value;
}

const availableChannels = contactChannels.flatMap((channel) => {
  const value = CONTACT[channel.key];
  return value ? [{ ...channel, value: getChannelDisplayValue(channel.key, value), href: getChannelHref(channel.key, value) }] : [];
});

const supportTopics = ["Account", "Tournament", "Payment", "Team", "Technical", "Referral"];

export default function ContactPage() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <PageHeader eyebrow="Support" title="Get in touch" description="Find the available BattleNix support channels and what to include with a request." />
        <section className="mt-8 flex items-start gap-3 border-y border-[#26262c] py-5" aria-labelledby="location-heading">
          <MapPin aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-[#e5484d]" />
          <div>
            <h2 id="location-heading" className="font-display text-lg font-semibold text-white">Our Location</h2>
            <p className="mt-1 text-sm text-[#a1a1aa]">{SITE_CONFIG.publicLocation}</p>
          </div>
        </section>
        <section className="mt-8" aria-labelledby="support-topics-heading">
          <h2 id="support-topics-heading" className="font-display text-xl font-semibold text-white">How can we help?</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {supportTopics.map((topic) => (
              <li key={topic} className="rounded-md border border-[#26262c] bg-[#131316] px-3 py-2 text-sm text-[#a1a1aa]">{topic}</li>
            ))}
          </ul>
        </section>
        {availableChannels.length ? (
          <RevealGroup className="mt-8 grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {availableChannels.map((channel) => (
              <ContactCard key={channel.key} icon={channel.icon} label={channel.label} value={channel.value} description={channel.description} href={channel.href} />
            ))}
          </RevealGroup>
        ) : (
          <div className="mt-8 border border-[#26262c] bg-[#131316] p-6">
            <h2 className="font-display text-xl font-semibold text-white">Use in-app support</h2>
            <p className="mt-2 text-sm leading-6 text-[#a1a1aa]">No external contact channel is currently configured here. Use the support option in the BattleNix app.</p>
          </div>
        )}
        <div className="mt-10 grid gap-8 border-t border-[#26262c] pt-8 md:grid-cols-2">
          <section>
            <h2 className="font-display text-xl font-semibold text-white">Need a quick answer?</h2>
            <p className="mt-2 text-sm leading-6 text-[#a1a1aa]">Browse common questions or visit the help hub.</p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <Link href="/faq" className="inline-flex min-h-11 items-center rounded-[10px] border border-[#26262c] px-4 text-white hover:border-[#e5484d]">FAQ</Link>
              <Link href="/help" className="inline-flex min-h-11 items-center rounded-[10px] border border-[#26262c] px-4 text-white hover:border-[#e5484d]">Help Center</Link>
            </div>
          </section>
          <section>
            <h2 className="font-display text-xl font-semibold text-white">What to include</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[#a1a1aa]">
              <li>Your registered phone number or email</li>
              <li>Tournament name, if relevant</li>
              <li>Transaction ID, if relevant</li>
              <li>A screenshot of the issue, if available</li>
            </ul>
          </section>
        </div>
      </Container>
    </section>
  );
}
