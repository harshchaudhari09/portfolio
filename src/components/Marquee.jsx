const ITEMS = [
  "AI ASSISTANTS",
  "RAG PIPELINES",
  "LANGCHAIN",
  "LANGGRAPH",
  "FASTAPI",
  "LEAD QUALIFICATION",
  "WORKFLOW AUTOMATION",
  "CHATBOTS",
  "NEXT.JS",
  "SUPABASE",
];

export const Marquee = () => (
  <div data-testid="editorial-marquee" className="marquee relative overflow-hidden border-y border-white/[0.07] bg-[#0C0E15] py-5">
    <div className="marquee-track">
      {[0, 1].map((copy) => (
        <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
          {ITEMS.map((item) => (
            <span key={`${copy}-${item}`} className="mono flex items-center text-sm tracking-[0.3em] text-slate-500">
              <span className="px-6 transition-colors duration-300 hover:text-[#00F5A0]">{item}</span>
              <span className="text-[#FF5E36]/70">///</span>
            </span>
          ))}
        </div>
      ))}
    </div>
    <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#090A0F] to-transparent" />
    <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#090A0F] to-transparent" />
  </div>
);