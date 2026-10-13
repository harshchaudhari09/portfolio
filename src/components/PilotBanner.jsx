import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Shared";
import { scrollToId } from "@/lib/scroll";

export const PilotBanner = () => (
  <section id="pilot" className="relative border-y border-white/[0.07] bg-[#0C0E15] py-16 lg:py-24">
    <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-16">
      <Reveal>
        <p className="mono text-xs uppercase tracking-[0.25em] text-[#FF5E36]">
          <span className="mr-3 inline-block h-px w-8 bg-[#FF5E36]/60" /> 05 — Pilot program
        </p>
        <h2
          data-testid="pilot-headline"
          className="font-display mt-5 text-2xl font-bold leading-[1.25] tracking-tight sm:text-3xl lg:text-4xl"
        >
          Taking on my <span className="text-[#00F5A0] text-glow">first 3 pilot clients</span> —
          reduced pricing in exchange for honest feedback. Interested?
        </h2>
        <p className="mono mt-5 text-[11px] uppercase tracking-[0.2em] text-slate-500">
          3 spots · reduced pricing · your feedback shapes the work
        </p>
      </Reveal>
      <Reveal delay={0.12} className="lg:justify-self-end">
        <button
          data-testid="pilot-cta"
          onClick={() => scrollToId("#contact")}
          className="btn-shine group flex items-center gap-2 rounded-full bg-[#00F5A0] px-8 py-4 font-semibold text-[#06251A] transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(0,245,160,0.45)]"
        >
          Claim a pilot spot
          <ArrowUpRight size={17} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </Reveal>
    </div>
  </section>
);