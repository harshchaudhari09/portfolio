import { ArrowUpRight, BadgeCheck, IndianRupee, FileText, PhoneCall } from "lucide-react";
import { Reveal, SectionHead } from "@/components/Shared";
import { scrollToId } from "@/lib/scroll";

const POINTS = [
  { icon: FileText, t: "Written plan & fixed quote", d: "Scope, timeline and price agreed before any work starts." },
  { icon: IndianRupee, t: "Fixed-price projects", d: "Quoted after a free call — you approve the number first." },
  { icon: BadgeCheck, t: "Pilot pricing available", d: "Reduced pricing for my first 3 pilot clients, in exchange for honest feedback." },
];

export const Pricing = () => (
  <section id="pricing" className="relative py-20 lg:py-32">
    <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
      <SectionHead
        index="06"
        eyebrow="Pricing"
        title="Simple, honest pricing."
        sub="No hourly billing roulette and no surprise invoices. Fixed-price projects, quoted after a free call. Pilot pricing available."
      />

      <div className="mt-14 grid gap-5 lg:grid-cols-3 lg:gap-6">
        {POINTS.map((p, i) => (
          <Reveal key={p.t} delay={i * 0.08} className="h-full">
            <div
              data-testid={`pricing-point-${i}`}
              className="card-hover flex h-full flex-col gap-4 rounded-3xl border border-white/[0.08] bg-[#11131A] p-8"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#00F5A0]/25 bg-[#00F5A0]/5 text-[#00F5A0]">
                <p.icon size={19} />
              </span>
              <h3 className="font-display text-xl font-bold tracking-tight">{p.t}</h3>
              <p className="text-sm leading-relaxed text-slate-400">{p.d}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div
          data-testid="pricing-cta-banner"
          className="mt-8 flex flex-col items-start justify-between gap-6 rounded-3xl border border-[#00F5A0]/30 bg-[#11131A] p-8 sm:flex-row sm:items-center sm:p-10"
        >
          <div>
            <p className="font-display text-xl font-bold tracking-tight sm:text-2xl">
              Tell me what you need on a free call — get a fixed quote in writing.
            </p>
            <p className="mono mt-2 text-[11px] uppercase tracking-[0.2em] text-slate-500">
              no commitment · 30 minutes · IST-friendly hours
            </p>
          </div>
          <button
            data-testid="pricing-cta-call"
            onClick={() => scrollToId("#contact")}
            className="btn-shine group flex shrink-0 items-center gap-2 rounded-full bg-[#00F5A0] px-7 py-3.5 font-semibold text-[#06251A] transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(0,245,160,0.45)]"
          >
            Book a free 30-min call
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </Reveal>
    </div>
  </section>
);