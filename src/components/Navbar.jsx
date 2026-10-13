import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/Logo";
import { scrollToId } from "@/lib/scroll";

const LINKS = [
  ["About", "#about"],
  ["Services", "#services"],
  ["Work", "#work"],
  ["Process", "#process"],
  ["Pricing", "#pricing"],
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (hash) => {
    setOpen(false);
    setTimeout(() => scrollToId(hash), open ? 250 : 0);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4">
      <motion.nav
        data-testid="navbar"
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className={`mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-full py-3 pl-5 pr-3 transition-[background-color,box-shadow] duration-500 ${
          scrolled ? "glass shadow-[0_18px_50px_-30px_rgba(0,0,0,0.9)]" : "border border-transparent"
        }`}
      >
        <button data-testid="nav-logo" onClick={() => go("#top")} className="shrink-0" aria-label="Back to top">
          <Logo />
        </button>

        <div className="hidden items-center gap-7 lg:flex">
          {LINKS.map(([label, hash]) => (
            <button
              key={hash}
              data-testid={`nav-link-${label.toLowerCase()}`}
              onClick={() => go(hash)}
              className="text-sm text-slate-400 transition-colors duration-300 hover:text-white"
            >
              {label}
            </button>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <span className="mono flex items-center gap-2 rounded-full border border-white/10 px-3.5 py-1.5 text-[11px] tracking-wide text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00F5A0] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00F5A0]" />
            </span>
            Available for projects
          </span>
          <button
            data-testid="nav-cta-initiate"
            onClick={() => go("#contact")}
            className="btn-shine group flex items-center gap-1.5 rounded-full bg-[#00F5A0] px-5 py-2.5 text-sm font-semibold text-[#06251A] transition-shadow duration-300 hover:shadow-[0_0_32px_rgba(0,245,160,0.4)]"
          >
            Initiate Project
            <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        <button
          data-testid="nav-mobile-toggle"
          className="rounded-full border border-white/10 p-2.5 text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="nav-mobile-menu"
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="glass mx-auto mt-2 max-w-6xl rounded-3xl p-6 lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {LINKS.map(([label, hash]) => (
                <button
                  key={hash}
                  data-testid={`mobile-link-${label.toLowerCase()}`}
                  onClick={() => go(hash)}
                  className="font-display rounded-2xl px-4 py-3 text-left text-2xl font-bold text-white/90 transition-colors hover:bg-white/5 hover:text-[#00F5A0]"
                >
                  {label}
                </button>
              ))}
              <button
                data-testid="mobile-cta-contact"
                onClick={() => go("#contact")}
                className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[#00F5A0] px-5 py-3.5 font-semibold text-[#06251A]"
              >
                Initiate Project <ArrowUpRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};