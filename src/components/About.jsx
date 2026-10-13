import { useState } from "react";
import { MapPin, BadgeCheck } from "lucide-react";
import { Reveal, SectionHead, Tag } from "@/components/Shared";

const STACK = {
  AI: ["LangChain", "LangGraph", "RAG", "Groq", "Gemini"],
  Backend: ["Python", "FastAPI", "Supabase", "PostgreSQL"],
  Frontend: ["Next.js", "React Native", "TypeScript", "Tailwind"],
};

const STATS = [
  ["150+", "AI itineraries a month (Wandr)"],
  ["4", "products built"],
  ["2 → 15", "hrs → min, trip planning"],
  ["100%", "TripMind test plans passing every check"],
];

export const About = () => {
  const [tab, setTab] = useState("AI");

  return (
    <section id="about" className="relative py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
        <SectionHead
          index="01"
          eyebrow="About"
          title="AI engineering for businesses, from Mumbai."
          sub="I'm an AI engineer from Mumbai with a B.Tech in Computer Science (Data Science & Data Engineering) — helping businesses put AI to work on their own data."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3 lg:gap-6">
          <Reveal className="lg:col-span-2">
            <div data-testid="about-story-card" className="card-hover relative h-full overflow-hidden rounded-3xl border border-white/[0.08] bg-[#11131A]">
              <div className="grid sm:grid-cols-[1fr_0.75fr]">
                <div className="p-7 sm:p-10">
                  <p className="mono text-xs uppercase tracking-[0.25em] text-[#00F5A0]">// the short story</p>
                  <h3 className="font-display mt-4 text-2xl font-bold leading-snug">
                    Not chatbot wrappers. Systems grounded in your data.
                  </h3>
                  <p className="mt-5 leading-relaxed text-slate-400">
                    During my Machine Learning internship at TransOrg Analytics, I worked
                    on Wandr, an AI travel planner that cut trip planning from 2 hours to
                    under 15 minutes. Now I build the same kind of systems for businesses:
                    assistants and automations that are validated before they answer, and
                    secure by design.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <Tag>RAG systems</Tag>
                    <Tag tone="flame">LangGraph agents</Tag>
                    <Tag>Data privacy</Tag>
                  </div>
                </div>
                <div className="relative min-h-[220px]">
                  <img
                    src="/images/about.jpg"
                    alt="Developer workspace"
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#11131A] via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div data-testid="about-stats-card" className="card-hover flex h-full flex-col justify-between gap-6 rounded-3xl border border-white/[0.08] bg-[#11131A] p-7 sm:p-8">
              <p className="mono text-xs uppercase tracking-[0.25em] text-slate-500">// by the numbers</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-7">
                {STATS.map(([v, l]) => (
                  <div key={l}>
                    <p className="mono text-2xl font-semibold text-[#00F5A0] sm:text-3xl">{v}</p>
                    <p className="mt-1 text-[11px] uppercase tracking-wider text-slate-500">{l}</p>
                  </div>
                ))}
              </div>
              <p className="mono flex items-center gap-2 border-t border-white/[0.07] pt-5 text-[11px] text-slate-500">
                <MapPin size={12} className="text-[#FF5E36]" /> Mumbai, India · Remote · IST (UTC+5:30)
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.05} className="lg:col-span-2">
            <div data-testid="about-stack-card" className="card-hover h-full rounded-3xl border border-white/[0.08] bg-[#11131A] p-7 sm:p-8">
              <p className="mono text-xs uppercase tracking-[0.25em] text-slate-500">// tech stack matrix</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {Object.keys(STACK).map((k) => (
                  <button
                    key={k}
                    data-testid={`stack-tab-${k.toLowerCase()}`}
                    onClick={() => setTab(k)}
                    className={`mono rounded-full border px-4 py-1.5 text-xs transition-[border-color,color,background-color] duration-300 ${
                      tab === k
                        ? "border-[#00F5A0]/60 bg-[#00F5A0]/10 text-[#00F5A0]"
                        : "border-white/10 text-slate-400 hover:border-white/25 hover:text-white"
                    }`}
                  >
                    {k}
                  </button>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {STACK[tab].map((t) => (
                  <span
                    key={t}
                    className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-slate-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div data-testid="about-philosophy-card" className="card-hover h-full overflow-hidden rounded-3xl border border-white/[0.08] bg-[#11131A]">
              <div className="border-b border-white/[0.07] px-7 py-4">
                <p className="mono text-xs uppercase tracking-[0.25em] text-slate-500">// principles.js</p>
              </div>
              <pre className="mono overflow-x-auto p-7 text-[12.5px] leading-[1.9]">
                <code>
                  <span className="text-[#FF5E36]">const</span> <span className="text-[#00E5FF]">principles</span> = [
                  {"\n  "}<span className="text-[#00F5A0]">"grounded in your data"</span>,
                  {"\n  "}<span className="text-[#00F5A0]">"checked before it answers"</span>,
                  {"\n  "}<span className="text-[#00F5A0]">"your data stays private"</span>,
                  {"\n"}];
                </code>
              </pre>
              <p className="mono flex items-center gap-2 border-t border-white/[0.07] px-7 py-4 text-[11px] text-slate-500">
                <BadgeCheck size={13} className="text-[#00F5A0]" /> three principles, zero exceptions
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};