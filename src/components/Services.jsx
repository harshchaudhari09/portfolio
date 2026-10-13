import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionHead, Tag } from "@/components/Shared";
import { scrollToId } from "@/lib/scroll";

const SERVICES = [
  {
    n: "01",
    title: "AI Customer Assistant",
    desc: "Answers your customers' questions 24/7 — grounded in your own documents, FAQs and service pages, so it replies with what's actually true for your business.",
    tags: ["RAG", "Your documents", "24/7"],
    snippet: "$ ask(\"what's included in the plan?\") → answered from your docs",
    time: "2–4 weeks",
  },
  {
    n: "02",
    title: "Lead Capture & Qualification",
    desc: "AI that understands enquiries as they arrive, sorts them by intent, and books appointments — so hot leads never sit unanswered in an inbox.",
    tags: ["Intent sorting", "Appointment booking", "Instant replies"],
    snippet: "$ enquiry → intent detected → appointment booked",
    time: "3–5 weeks",
  },
  {
    n: "03",
    title: "Custom AI Workflow / Agent",
    desc: "Automates a task your team repeats — research, reports, planning — as an agent that runs on your schedule and shows its work.",
    tags: ["Research", "Reports", "Planning"],
    snippet: "$ agent.run(task=\"weekly report\") → drafted & delivered",
    time: "4–6 weeks",
  },
];

export const Services = () => (
  <section id="services" className="relative py-20 lg:py-32">
    <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
      <SectionHead
        index="02"
        eyebrow="Services"
        title="Three ways AI goes to work for your business."
        sub="Every engagement starts with a free discovery call, moves on a written plan with a fixed quote, and ships with 30 days of support."
      />

      <div className="mt-14 border-t border-white/[0.08]">
        {SERVICES.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.05}>
            <div
              data-testid={`service-row-${s.n}`}
              className="group relative grid cursor-pointer gap-4 border-b border-white/[0.08] py-8 transition-colors duration-300 hover:bg-white/[0.02] lg:grid-cols-[90px_1.15fr_1fr_auto] lg:items-center lg:gap-8 lg:px-6"
              onClick={() => scrollToId("#contact")}
            >
              <span className="mono text-sm text-slate-600 transition-colors duration-300 group-hover:text-[#00F5A0]">
                /{s.n}
              </span>
              <div>
                <h3 className="font-display text-xl font-bold tracking-tight sm:text-2xl">{s.title}</h3>
                <p className="mono mt-2 text-[11px] uppercase tracking-[0.2em] text-slate-600">
                  timeline — {s.time}
                </p>
              </div>
              <div>
                <p className="text-sm leading-relaxed text-slate-400">{s.desc}</p>
                <p className="mono mt-3 hidden text-[11.5px] text-[#00F5A0]/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100 lg:block">
                  {s.snippet}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <Tag key={t} tone="slate">{t}</Tag>
                  ))}
                </div>
              </div>
              <span className="hidden h-12 w-12 items-center justify-center rounded-full border border-white/10 text-slate-500 transition-[border-color,color,transform] duration-300 group-hover:border-[#00F5A0]/50 group-hover:text-[#00F5A0] group-hover:rotate-45 lg:flex">
                <ArrowUpRight size={18} />
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);