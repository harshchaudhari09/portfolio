import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, y = 28, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export const SectionHead = ({ index, eyebrow, title, sub }) => (
  <Reveal className="max-w-2xl">
    <p className="mono flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#00F5A0]">
      <span className="inline-block h-px w-8 bg-[#00F5A0]/60" />
      {index} — {eyebrow}
    </p>
    <h2 className="font-display mt-5 text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl">
      {title}
    </h2>
    {sub && <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">{sub}</p>}
  </Reveal>
);

export const Tag = ({ children, tone = "mint" }) => {
  const tones = {
    mint: "border-[#00F5A0]/25 text-[#00F5A0] bg-[#00F5A0]/5",
    flame: "border-[#FF5E36]/30 text-[#FF5E36] bg-[#FF5E36]/5",
    slate: "border-white/10 text-slate-400 bg-white/[0.03]",
  };
  return (
    <span className={`mono rounded-full border px-3 py-1 text-[11px] tracking-wide ${tones[tone]}`}>
      {children}
    </span>
  );
};