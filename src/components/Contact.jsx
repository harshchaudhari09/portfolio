import { useState } from "react";
import { toast } from "sonner";
import { Mail, Copy, Linkedin, Github, Send, Loader2, Clock } from "lucide-react";
import { Reveal, SectionHead } from "@/components/Shared";

const EMAIL = "dcharshchaudhari@gmail.com";

// Submissions go to Web3Forms, which emails each one to EMAIL. The access key only
// identifies that inbox, so it's safe to ship in client code (that's how Web3Forms works).
const WEB3FORMS_KEY = "b181ea3c-4cd2-4948-b596-91ef78d8e7eb";

const PROJECT_TYPES = ["AI Customer Assistant", "Lead Capture & Qualification", "Custom AI Workflow / Agent", "Something else"];
const BUDGETS = ["Under ₹50k", "₹50k – ₹2L", "₹2L+", "Not sure yet"];

const CHANNELS = [
  { id: "linkedin", icon: Linkedin, label: "LinkedIn", value: "/in/harsh-chaudhari09", href: "https://www.linkedin.com/in/harsh-chaudhari09/", testid: "channel-linkedin" },
  { id: "github", icon: Github, label: "GitHub", value: "@harshchaudhari09", href: "https://github.com/harshchaudhari09", testid: "channel-github" },
];

export const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", project_type: "AI Customer Assistant", budget: "Not sure yet", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || form.name.trim().length < 2) return toast.error("Please enter your name.");
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return toast.error("Please enter a valid email address.");
    if (form.message.trim().length < 10) return toast.error("Tell me a bit more — at least 10 characters.");
    setSubmitting(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New project brief from ${form.name.trim()} — ${form.project_type}`,
          from_name: "Portfolio contact form",
          replyto: form.email,
          name: form.name.trim(),
          email: form.email.trim(),
          project_type: form.project_type,
          budget: form.budget,
          message: form.message.trim(),
          botcheck: form.botcheck,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) throw new Error(data.message || `HTTP ${res.status}`);
      toast.success("Thanks – I'll reply within 24 hours, IST.");
      setForm((f) => ({ ...f, name: "", email: "", message: "" }));
    } catch {
      toast.error(`Couldn't send that – please email me at ${EMAIL} instead.`);
    } finally {
      setSubmitting(false);
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      toast.success("Email copied to clipboard");
    } catch {
      toast.error(EMAIL);
    }
  };

  return (
    <section id="contact" className="relative py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
        <SectionHead
          index="07"
          eyebrow="Contact"
          title="Tell me what you're building."
          sub="One form, one inbox — I read every message myself and reply within 24 hours (IST)."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <Reveal>
            <form
              data-testid="contact-form"
              onSubmit={submit}
              className="rounded-3xl border border-white/[0.08] bg-[#11131A] p-7 sm:p-10"
            >
              {/* Honeypot: hidden from people, bots that tick it get rejected by Web3Forms */}
              <input
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
                checked={!!form.botcheck}
                onChange={(e) => set("botcheck", e.target.checked)}
              />
              <p className="mono text-xs uppercase tracking-[0.25em] text-slate-500">// project brief — step 1</p>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className="mono text-[11px] uppercase tracking-[0.2em] text-slate-400">Your name</span>
                  <input
                    data-testid="contact-input-name"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    placeholder="Your name"
                    className="mt-2 w-full rounded-xl border border-white/10 bg-[#0C0E15] px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition-[border-color,box-shadow] duration-300 focus:border-[#00F5A0]/60 focus:shadow-[0_0_0_3px_rgba(0,245,160,0.12)]"
                  />
                </label>
                <label className="block">
                  <span className="mono text-[11px] uppercase tracking-[0.2em] text-slate-400">Work email</span>
                  <input
                    data-testid="contact-input-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="you@company.com"
                    className="mt-2 w-full rounded-xl border border-white/10 bg-[#0C0E15] px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition-[border-color,box-shadow] duration-300 focus:border-[#00F5A0]/60 focus:shadow-[0_0_0_3px_rgba(0,245,160,0.12)]"
                  />
                </label>
              </div>

              <p className="mono mt-8 text-[11px] uppercase tracking-[0.2em] text-slate-400">What do you need?</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {PROJECT_TYPES.map((t) => (
                  <button
                    type="button"
                    key={t}
                    data-testid={`contact-type-${t.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                    onClick={() => set("project_type", t)}
                    className={`rounded-full border px-4 py-2 text-xs transition-[border-color,color,background-color] duration-300 ${
                      form.project_type === t
                        ? "border-[#00F5A0]/60 bg-[#00F5A0]/10 text-[#00F5A0]"
                        : "border-white/10 text-slate-400 hover:border-white/25 hover:text-white"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <p className="mono mt-8 text-[11px] uppercase tracking-[0.2em] text-slate-400">Budget range</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {BUDGETS.map((b) => (
                  <button
                    type="button"
                    key={b}
                    data-testid={`contact-budget-${b.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                    onClick={() => set("budget", b)}
                    className={`rounded-full border px-4 py-2 text-xs transition-[border-color,color,background-color] duration-300 ${
                      form.budget === b
                        ? "border-[#FF5E36]/60 bg-[#FF5E36]/10 text-[#FF5E36]"
                        : "border-white/10 text-slate-400 hover:border-white/25 hover:text-white"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>

              <label className="mt-8 block">
                <span className="mono text-[11px] uppercase tracking-[0.2em] text-slate-400">Project details</span>
                <textarea
                  data-testid="contact-input-message"
                  value={form.message}
                  onChange={(e) => set("message", e.target.value)}
                  rows={5}
                  placeholder="What are you building, what does success look like, and is there a deadline breathing down your neck?"
                  className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-[#0C0E15] px-4 py-3 text-sm leading-relaxed text-white placeholder:text-slate-600 outline-none transition-[border-color,box-shadow] duration-300 focus:border-[#00F5A0]/60 focus:shadow-[0_0_0_3px_rgba(0,245,160,0.12)]"
                />
              </label>

              <button
                data-testid="contact-submit"
                type="submit"
                disabled={submitting}
                className="btn-shine mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-[#00F5A0] px-6 py-4 font-semibold text-[#06251A] transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(0,245,160,0.4)] disabled:opacity-60"
              >
                {submitting ? <Loader2 size={17} className="animate-spin" /> : <Send size={16} />}
                {submitting ? "Transmitting…" : "Send project brief"}
              </button>
            </form>
          </Reveal>

          <div className="space-y-5">
            <Reveal delay={0.1}>
              <div data-testid="channel-email" className="card-hover flex items-center justify-between rounded-2xl border border-white/[0.08] bg-[#11131A] p-6">
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#00F5A0]/25 bg-[#00F5A0]/5 text-[#00F5A0]">
                    <Mail size={17} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white">Direct email</p>
                    <p className="mono truncate text-xs text-slate-500">{EMAIL}</p>
                  </div>
                </div>
                <button
                  data-testid="copy-email-button"
                  onClick={copyEmail}
                  className="mono ml-3 flex items-center gap-1.5 rounded-full border border-white/10 px-3.5 py-2 text-[11px] text-slate-300 transition-[border-color,color] duration-300 hover:border-[#00F5A0]/50 hover:text-[#00F5A0]"
                >
                  <Copy size={12} /> copy
                </button>
              </div>
            </Reveal>

            {CHANNELS.map((c, i) => (
              <Reveal key={c.id} delay={0.14 + i * 0.05}>
                <a
                  data-testid={c.testid}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-hover group flex items-center justify-between rounded-2xl border border-white/[0.08] bg-[#11131A] p-6"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 transition-[color,border-color] duration-300 group-hover:border-[#00F5A0]/40 group-hover:text-[#00F5A0]">
                      <c.icon size={17} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">{c.label}</p>
                      <p className="mono text-xs text-slate-500">{c.value}</p>
                    </div>
                  </div>
                  <span className="mono text-[11px] text-slate-600 transition-colors duration-300 group-hover:text-[#00F5A0]">open ↗</span>
                </a>
              </Reveal>
            ))}

            <Reveal delay={0.3}>
              <div className="rounded-2xl border border-white/[0.08] bg-[#0C0E15] p-6">
                <p className="mono flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-slate-500">
                  <Clock size={12} className="text-[#00F5A0]" /> response time
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  Within 24 hours, IST. I read every message myself — no assistants, no auto-replies.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};