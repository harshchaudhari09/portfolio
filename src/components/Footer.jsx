import { ArrowUp } from "lucide-react";
import { Logo } from "@/components/Logo";
import { scrollToId } from "@/lib/scroll";

const LINKS = [
  ["About", "#about"],
  ["Services", "#services"],
  ["Work", "#work"],
  ["Process", "#process"],
  ["Pricing", "#pricing"],
  ["Contact", "#contact"],
];

export const Footer = () => (
  <footer className="relative border-t border-white/[0.07] py-12">
    <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:px-8 lg:flex-row lg:items-center lg:px-16">
      <Logo />
      <nav className="flex flex-wrap gap-x-7 gap-y-3">
        {LINKS.map(([label, hash]) => (
          <button
            key={hash}
            data-testid={`footer-link-${label.toLowerCase()}`}
            onClick={() => scrollToId(hash)}
            className="text-sm text-slate-500 transition-colors duration-300 hover:text-[#00F5A0]"
          >
            {label}
          </button>
        ))}
      </nav>
      <button
        data-testid="footer-back-to-top"
        onClick={() => scrollToId("#top")}
        className="group flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-xs text-slate-400 transition-[border-color,color] duration-300 hover:border-[#00F5A0]/50 hover:text-[#00F5A0]"
        aria-label="Back to top"
      >
        Back to top
        <ArrowUp size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
      </button>
    </div>
    <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-2 px-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-16">
      <p className="mono text-[11px] text-slate-600">© 2025 Harsh Chaudhari — AI Engineer for Businesses.</p>
      <p className="mono text-[11px] text-slate-600">langchain · fastapi · react native · next.js</p>
    </div>
  </footer>
);