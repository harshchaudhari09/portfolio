import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal, SectionHead } from "@/components/Shared";

const STEPS = [
  { n: "01", t: "Free discovery call", d: "A free 30-minute call: what your business needs, whether AI genuinely fits, and a straight answer either way." },
  { n: "02", t: "Written plan & fixed quote", d: "You get a written scope, timeline and a fixed price before any work starts — no hourly billing roulette." },
  { n: "03", t: "Build with weekly demos", d: "You see working progress every week and course-correct early, while changes are still cheap." },
  { n: "04", t: "Testing with your real data", d: "The system is evaluated on your documents and your real enquiries — not toy examples — before your customers ever see it." },
  { n: "05", t: "Launch & 30 days of support", d: "You go live, and fixes and tweaks are included for 30 days afterwards while the system settles in." },
];

export const Process = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section id="process" className="relative py-20 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHead
            index="04"
            eyebrow="Process"
            title="How your project ships in five moves."
            sub="The same honest pipeline whether it's a 2-week assistant or a 6-week agent. Predictable, documented, demoed weekly."
          />
          <Reveal delay={0.15}>
            <div className="mono mt-10 hidden rounded-2xl border border-white/[0.08] bg-[#11131A] p-6 text-xs leading-loose text-slate-400 lg:block">
              <p className="text-slate-500">// typical engagement</p>
              <p><span className="text-[#00F5A0]">discovery call</span> → free, this week</p>
              <p><span className="text-[#00F5A0]">written quote</span> → before any work starts</p>
              <p><span className="text-[#00F5A0]">first demo</span> → within the first sprint</p>
            </div>
          </Reveal>
        </div>

        <div className="relative">
          <div className="absolute bottom-6 left-[27px] top-6 w-px bg-white/[0.08]" />
          <motion.div
            className="absolute left-[27px] top-6 w-px origin-top bg-gradient-to-b from-[#00F5A0] to-[#00E5FF]"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ height: "calc(100% - 48px)" }}
          />
          <div className="space-y-6">
            {STEPS.map((s, i) => {
              const active = activeIdx === i;
              return (
                <Reveal key={s.n} delay={i * 0.06}>
                  <div
                    data-testid={`process-step-${s.n}`}
                    onMouseEnter={() => setActiveIdx(i)}
                    className="relative flex gap-6 pl-1"
                  >
                    <span
                      className={`mono relative z-10 flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border text-sm transition-[border-color,color,background-color,box-shadow] duration-400 ${
                        active
                          ? "border-[#00F5A0]/70 bg-[#0C0E15] text-[#00F5A0] shadow-[0_0_28px_rgba(0,245,160,0.25)]"
                          : "border-white/10 bg-[#0C0E15] text-slate-500"
                      }`}
                    >
                      {s.n}
                    </span>
                    <div
                      className={`flex-1 rounded-2xl border p-6 transition-[border-color,background-color] duration-400 ${
                        active ? "border-[#00F5A0]/25 bg-[#11131A]" : "border-white/[0.07] bg-transparent"
                      }`}
                    >
                      <h3 className="font-display text-lg font-bold tracking-tight">{s.t}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.d}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};