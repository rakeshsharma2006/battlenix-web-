import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="py-20">
      <Container>
        <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center sm:p-12">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#e5484d]">404</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-white">Page not found</h1>
          <p className="mt-4 text-base text-zinc-300">
            The route you were looking for does not exist or has moved. Head back to the BattleNix home page.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href="/"
              className="inline-flex min-h-11 items-center justify-center rounded-[10px] border border-[#e5484d] bg-[#e5484d] px-5 text-sm font-semibold text-white hover:bg-[#d63b43] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5484d]"
            >
              Back to home
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
