import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowDown, ArrowUpRight, Cpu } from "lucide-react";
import { scrollToId } from "@/lib/scroll";

const EASE = [0.16, 1, 0.3, 1];

const SCRIPT = [
  { cmd: "harsh --status", out: ["● available_for_projects: true", "● response_time: within 24 hours (IST)"] },
  { cmd: "harsh --stack", out: ["python · langchain · langgraph · fastapi", "react_native · next.js · supabase"] },
  { cmd: "harsh --recent --work", out: ["wandr · curadiet · tripmind_ai · smile_ai", "150+ itineraries/month · 2 hrs → 15 min"] },
];

const MASK_LINES = [
  [{ t: "AI systems" }],
  [{ t: "that " }, { t: "answer", mint: true }],
  [{ t: "your customers," }],
  [{ t: "qualify", mint: true }, { t: " your" }],
  [{ t: "leads and" }],
  [{ t: "save", mint: true }, { t: " your team" }],
  [{ t: "hours." }],
];

const MaskedLine = ({ parts, delay }) => (
  <span className="block overflow-hidden pb-1">
    <motion.span
      className="block"
      initial={{ y: "112%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.95, delay, ease: EASE }}
    >
      {parts.map((p, i) => (
        <span key={i} className={p.mint ? "text-[#00F5A0] text-glow" : ""}>
          {p.t}
        </span>
      ))}
    </motion.span>
  </span>
);

const useTerminal = () => {
  const [lines, setLines] = useState([]);
  const [current, setCurrent] = useState("");
  useEffect(() => {
    let cancelled = false;
    const timers = new Set();
    const wait = (ms) => new Promise((r) => timers.add(setTimeout(r, ms)));
    const run = async () => {
      while (!cancelled) {
        setLines([]);
        for (const block of SCRIPT) {
          for (let c = 0; c <= block.cmd.length; c++) {
            if (cancelled) return;
            setCurrent(block.cmd.slice(0, c));
            await wait(26 + Math.random() * 42);
          }
          await wait(260);
          if (cancelled) return;
          setLines((prev) => [...prev, { type: "cmd", text: block.cmd }]);
          setCurrent("");
          for (const o of block.out) {
            await wait(340);
            if (cancelled) return;
            setLines((prev) => [...prev, { type: "out", text: o }]);
          }
          await wait(650);
        }
        await wait(2800);
      }
    };
    run();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);
  return { lines, current };
};

const Terminal = () => {
  const { lines, current } = useTerminal();
  const [load, setLoad] = useState(23);
  useEffect(() => {
    const id = setInterval(() => setLoad(12 + Math.round(Math.random() * 30)), 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <div data-testid="hero-terminal" className="overflow-hidden rounded-2xl border border-white/10 bg-[#0C0E15]/95 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]">
      <div className="flex items-center justify-between border-b border-white/[0.07] bg-[#11131A] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#FF5E36]/80" />
          <span className="h-3 w-3 rounded-full bg-[#F5C518]/80" />
          <span className="h-3 w-3 rounded-full bg-[#00F5A0]/80" />
          <span className="mono ml-3 text-[11px] tracking-widest text-slate-500">harsh@studio — zsh</span>
        </div>
        <span className="mono hidden items-center gap-1.5 rounded-md border border-[#00F5A0]/20 bg-[#00F5A0]/5 px-2 py-1 text-[10px] text-[#00F5A0] sm:flex">
          <Cpu size={11} /> {load}% load
        </span>
      </div>
      <div className="mono h-[240px] space-y-2 overflow-hidden p-5 text-[12.5px] leading-relaxed sm:text-[13px]">
        {lines.map((l, i) =>
          l.type === "cmd" ? (
            <p key={i} className="text-slate-100">
              <span className="text-[#FF5E36]">➜</span> <span className="text-[#00F5A0]">~</span> {l.text}
            </p>
          ) : (
            <p key={i} className="pl-4 text-slate-400">{l.text}</p>
          )
        )}
        <p className="text-slate-100">
          <span className="text-[#FF5E36]">➜</span> <span className="text-[#00F5A0]">~</span> {current}
          <span className="cursor-blink ml-0.5 inline-block h-[14px] w-[7px] translate-y-[2px] bg-[#00F5A0]" />
        </p>
      </div>
    </div>
  );
};

export const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yTerm = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const yGlow = useTransform(scrollYProgress, [0, 1], [0, 140]);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 110, damping: 16 });
  const sry = useSpring(ry, { stiffness: 110, damping: 16 });
  const onTilt = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 9);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 7);
  };

  const metrics = [
    ["150+", "AI itineraries a month (internship project)"],
    ["2 hrs → 15 min", "planning time"],
    ["4", "products built"],
  ];

  return (
    <section id="top" ref={ref} onMouseMove={onTilt} className="relative overflow-hidden pt-36 pb-20 lg:min-h-screen lg:pt-40 lg:pb-28">
      <div className="grid-bg absolute inset-0" />
      <motion.div style={{ y: yGlow }} className="hero-glow absolute inset-0" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:px-16">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
            className="mono flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#00F5A0]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute h-full w-full animate-ping rounded-full bg-[#00F5A0] opacity-60" />
              <span className="relative h-2 w-2 rounded-full bg-[#00F5A0]" />
            </span>
            Harsh Chaudhari — AI Engineer for Businesses
          </motion.p>

          <h1 className="font-display mt-7 text-[1.75rem] font-extrabold leading-[1.1] tracking-tight sm:text-4xl lg:text-[3.2rem]">
            {MASK_LINES.map((parts, i) => (
              <MaskedLine key={i} parts={parts} delay={0.35 + i * 0.11} />
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
            className="mt-7 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg"
          >
            I'm Harsh, an AI engineer who builds chatbots, assistants and automations
            grounded in your business's own data – and designed to check their work
            before your customers see it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <button
              data-testid="hero-cta-work"
              onClick={() => scrollToId("#work")}
              className="btn-shine group flex items-center gap-2 rounded-full bg-[#00F5A0] px-7 py-3.5 font-semibold text-[#06251A] transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(0,245,160,0.45)]"
            >
              See my work
              <ArrowDown size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" />
            </button>
            <button
              data-testid="hero-cta-call"
              onClick={() => scrollToId("#contact")}
              className="group flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 font-semibold text-white transition-[border-color,background-color] duration-300 hover:border-[#00F5A0]/50 hover:bg-[#00F5A0]/5"
            >
              Book a free 30-min call
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.15 }}
            className="mt-14 grid max-w-xl grid-cols-3 divide-x divide-white/10 border-t border-white/10 pt-6"
          >
            {metrics.map(([v, l]) => (
              <div key={l} className="px-4 first:pl-0">
                <p className="mono text-lg font-semibold text-white sm:text-xl">{v}</p>
                <p className="mt-1 text-[11px] uppercase tracking-wider text-slate-500">{l}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div style={{ y: yTerm }} className="relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: EASE }}
            style={{ rotateX: srx, rotateY: sry, transformPerspective: 1200 }}
          >
            <Terminal />
          </motion.div>
          <div className="float-y absolute -right-3 -top-14 hidden rounded-xl border border-white/10 bg-[#11131A]/90 px-4 py-3 backdrop-blur-md sm:block">
            <p className="mono text-[10px] uppercase tracking-[0.2em] text-slate-500">now building</p>
            <p className="mono mt-1 text-xs text-[#00F5A0]">smile.ai — for dental clinics</p>
          </div>
          <div className="float-y absolute -bottom-12 -left-3 hidden rounded-xl border border-white/10 bg-[#11131A]/90 px-4 py-3 backdrop-blur-md sm:block" style={{ animationDelay: "1.4s" }}>
            <p className="mono text-[10px] uppercase tracking-[0.2em] text-slate-500">based in</p>
            <p className="mono mt-1 text-xs text-white">Mumbai · IST (UTC+5:30)</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};