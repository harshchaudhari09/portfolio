import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X, TrendingUp, ExternalLink } from "lucide-react";
import { Reveal, SectionHead, Tag } from "@/components/Shared";
import { scrollToId } from "@/lib/scroll";

// Projects marked `temporary` show their current version; swap in the updated
// write-up, image and link once each project's upgrade ships.
const PROJECTS = [
  {
    id: "wandr",
    name: "Wandr",
    kind: "AI Travel Planner App",
    cats: ["AI Assistants", "Web & Mobile"],
    metric: "150+ itineraries/month",
    desc: "An AI travel planner for iOS, Android and web, built during my Machine Learning internship at TransOrg Analytics. Travellers plan a trip by chatting, then reshape it in plain language.",
    arch: [
      "RAG assistant grounded in the user's own trips, live weather and location",
      "11-intent routing layer for user requests",
      "Two-model editing pipeline (Groq + Gemini)",
      "Shipped on iOS, Android and web",
    ],
    stack: ["React Native", "Supabase", "Groq", "Gemini", "RAG"],
    img: "/images/wandr.jpg",
    link: "https://wandronline.netlify.app/home",
    result: "150+ itineraries a month · planning time 2 hrs → 15 min",
    temporary: true,
  },
  {
    id: "curadiet",
    name: "CuraDiet",
    kind: "Diabetes Risk Check & Diet Planner",
    cats: ["Machine Learning"],
    metric: "97.2% accuracy · 0.978 ROC-AUC",
    desc: "A web app that screens for diabetes risk from a person's details, lab values and vitals, then builds a personalised diet plan. The risk model is trained on ~96,000 anonymised patient records and checked against ADA diagnostic cut-offs. A screening aid, not medical advice.",
    arch: [
      "HistGradientBoosting risk model, chosen from 3 compared models",
      "Inputs: age, height and weight, activity, smoking history, HbA1c, glucose, blood pressure",
      "Results checked against ADA diagnostic cut-offs",
      "Personalised diet plan based on the risk result",
    ],
    stack: ["Python", "scikit-learn", "Flask", "Machine Learning"],
    img: "/images/curadiet.jpg",
    link: "https://curadiet.onrender.com/",
    slowStart: true,
    result: "97.2% test accuracy · 0.978 ROC-AUC · 19,226 held-out patients",
  },
  {
    id: "tripmind",
    name: "TripMind AI",
    kind: "Self-Checking Multi-Agent Travel Planner",
    cats: ["AI Agents"],
    metric: "100% of test plans pass every check",
    desc: "A travel planner that checks its own work. LangGraph runs 10 research lookups in parallel – flights, trains, hotels, weather, attractions and more – a writer agent drafts a day-by-day plan, and a critic agent reviews it and sends it back to be fixed before the traveller sees it.",
    arch: [
      "10 parallel research lookups in LangGraph, all live data",
      "Critic agent: rule checks in Python plus an AI reviewer",
      "Writer ⇄ critic loop, up to 2 rounds of fixes",
      "Evaluated on 15 test trips, graded by code",
    ],
    stack: ["LangGraph", "LangChain", "FastAPI", "Groq", "Python"],
    img: "/images/tripmind.jpg",
    link: "https://tripmind-ai-y4g3.onrender.com/",
    slowStart: true,
    result: "Pass every check: 87% first draft → 100% after the critic · 15/15 approved",
  },
  {
    id: "smile-ai",
    name: "Smile.ai",
    kind: "Lead & Appointment Platform for Dental Clinics",
    cats: ["Web & Mobile"],
    metric: "In development",
    desc: "A lead and appointment platform for dental clinics: enquiries, patient conversations and appointments in one place, with each clinic's data isolated at the database level, not just in the UI. AI assistant coming next.",
    arch: [
      "Lead, conversation and appointment management",
      "Appointment booking per clinic",
      "Database-level isolation between clinics (Row-Level Security)",
      "Built on Next.js + Supabase",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
    cover: ["leads → conversations → appointments", "using (is_clinic_member(clinic_id))", "row_level_security: enabled ✓"],
    status: "in development",
  },
];

const FILTERS = ["All", "AI Assistants", "AI Agents", "Machine Learning", "Web & Mobile"];

// Stand-in artwork for projects without a real screenshot yet – drawn in the
// site's terminal style instead of stock photos of other people's apps.
const Cover = ({ project }) => (
  <div className="relative flex h-full w-full flex-col justify-center bg-[#0C0E15] p-6 pb-12 sm:p-8 sm:pb-14">
    <div className="grid-bg absolute inset-0" />
    <div className="hero-glow absolute inset-0" />
    <p className="mono relative text-[11px] uppercase tracking-[0.25em] text-slate-500">~/{project.id}</p>
    <p className="font-display relative mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">{project.name}</p>
    <div className="mono relative mt-4 space-y-1 text-[11px] text-[#00F5A0]/80 sm:text-xs">
      {project.cover.map((line) => (
        <p key={line}>{line}</p>
      ))}
    </div>
  </div>
);

export const Projects = () => {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState(null);

  const visible = PROJECTS.filter((p) => filter === "All" || p.cats.includes(filter));

  useEffect(() => {
    if (active) {
      window.__lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      window.__lenis?.start();
      document.body.style.overflow = "";
    }
  }, [active]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="work" className="relative py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHead
            index="03"
            eyebrow="Featured Work"
            title="Real products, real results."
            sub="AI systems I've built — from a travel planner serving 150+ itineraries a month to an agent system that checks its own work and a diabetes-risk model with 0.978 ROC-AUC. Open a card for how it works."
          />
          <Reveal delay={0.15} className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                data-testid={`project-filter-${f.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                onClick={() => setFilter(f)}
                className={`mono rounded-full border px-4 py-2 text-xs transition-[border-color,color,background-color] duration-300 ${
                  filter === f
                    ? "border-[#00F5A0]/60 bg-[#00F5A0]/10 text-[#00F5A0]"
                    : "border-white/10 text-slate-400 hover:border-white/25 hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </Reveal>
        </div>

        <motion.div layout className="mt-14 grid gap-6 md:grid-cols-2 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <motion.article
                layout
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                <button
                  data-testid={`project-card-${p.id}`}
                  onClick={() => setActive(p)}
                  className="card-hover block w-full overflow-hidden rounded-3xl border border-white/[0.08] bg-[#11131A] text-left"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    {p.img ? (
                      <img
                        src={p.img}
                        alt={`${p.name} — ${p.kind}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                        <Cover project={p} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#11131A] via-transparent to-transparent" />
                    <span className="mono absolute left-4 top-4 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur-md">
                      {p.cats[0]}
                    </span>
                    {p.status && (
                      <span className="mono absolute right-4 top-4 rounded-full border border-[#FF5E36]/40 bg-black/50 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#FF5E36] backdrop-blur-md">
                        {p.status}
                      </span>
                    )}
                  </div>
                  <div className="flex items-start justify-between gap-4 p-6 sm:p-7">
                    <div>
                      <h3 className="font-display text-xl font-bold tracking-tight sm:text-2xl">{p.name}</h3>
                      <p className="mt-1 text-sm text-slate-400">{p.kind}</p>
                      <p className="mono mt-4 flex items-center gap-2 text-xs text-[#00F5A0]">
                        <TrendingUp size={13} /> {p.metric}
                      </p>
                    </div>
                    <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-[border-color,color,transform] duration-300 group-hover:border-[#00F5A0]/50 group-hover:text-[#00F5A0] group-hover:rotate-45">
                      <ArrowUpRight size={17} />
                    </span>
                  </div>
                </button>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            data-testid="project-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-6"
            onClick={() => setActive(null)}
          >
            <motion.div
              data-testid="project-modal"
              initial={{ y: 60, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-white/10 bg-[#11131A] p-7 sm:rounded-3xl sm:p-10"
            >
              <button
                data-testid="project-modal-close"
                onClick={() => setActive(null)}
                className="absolute right-5 top-5 rounded-full border border-white/10 p-2 text-slate-400 transition-colors hover:border-[#00F5A0]/50 hover:text-white"
                aria-label="Close case study"
              >
                <X size={16} />
              </button>
              <p className="mono text-xs uppercase tracking-[0.25em] text-[#00F5A0]">{active.cats.join(" · ")}</p>
              <h3 className="font-display mt-3 text-3xl font-bold tracking-tight">{active.name}</h3>
              <p className="mt-1 text-slate-400">{active.kind}</p>
              <p className="mt-6 leading-relaxed text-slate-300">{active.desc}</p>

              {active.result && (
                <p className="mono mt-6 flex items-center gap-2 rounded-xl border border-[#00F5A0]/25 bg-[#00F5A0]/5 px-4 py-3 text-xs text-[#00F5A0]">
                  <TrendingUp size={13} /> {active.result}
                </p>
              )}

              <p className="mono mt-8 text-xs uppercase tracking-[0.25em] text-slate-500">// how it works</p>
              <ul className="mt-4 space-y-2.5">
                {active.arch.map((a) => (
                  <li key={a} className="mono flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3 text-[12.5px] text-slate-300">
                    <span className="mt-0.5 text-[#00F5A0]">▸</span> {a}
                  </li>
                ))}
              </ul>

              {active.note && (
                <p className="mono mt-4 rounded-xl border border-[#FF5E36]/25 bg-[#FF5E36]/5 px-4 py-3 text-[12.5px] leading-relaxed text-[#FF5E36]">
                  {active.note}
                </p>
              )}

              <div className="mt-7 flex flex-wrap items-center gap-2">
                {active.stack.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
                {active.status && <Tag tone="flame">status: {active.status}</Tag>}
              </div>

              <button
                data-testid="project-modal-cta"
                onClick={() => { setActive(null); setTimeout(() => scrollToId("#contact"), 200); }}
                className="btn-shine mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-[#00F5A0] px-6 py-3.5 font-semibold text-[#06251A]"
              >
                Build something like this <ArrowUpRight size={16} />
              </button>

              {active.link && (
                <a
                  data-testid="project-modal-link"
                  href={active.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm text-white transition-[border-color,color] duration-300 hover:border-[#00F5A0]/50 hover:text-[#00F5A0]"
                >
                  View the live app <ExternalLink size={14} />
                </a>
              )}
              {active.link && active.slowStart && (
                <p className="mono mt-3 text-center text-[11px] text-slate-500">
                  Free hosting – the app may take up to a minute to wake up.
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};