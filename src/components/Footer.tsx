import { useState } from "react";

const COLUMNS = [
  {
    title: "Community",
    links: ["Discord Server", "Tournaments", "Squad Finder", "Events Calendar", "Creator Studio"],
  },
  {
    title: "Resources",
    links: ["Rules & Guidelines", "Rewards Store", "Support Center", "Partner With Us", "Brand Kit"],
  },
  {
    title: "Company",
    links: ["About Fuzz", "Careers", "Press", "Contact"],
  },
];

const SOCIALS = [
  { label: "Discord", icon: "💬" },
  { label: "X", icon: "✦" },
  { label: "YouTube", icon: "▶" },
  { label: "Twitch", icon: "🎮" },
  { label: "TikTok", icon: "♪" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <footer className="relative border-t border-white/10 bg-surface/80 pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 pb-16 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <a href="#top" className="group flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 shadow-lg shadow-fuchsia-500/30">
                <span className="text-base font-black text-ink">F</span>
              </span>
              <span className="font-display text-base font-bold tracking-tight text-white">
                Fuzz's <span className="text-gradient">Fun Factory</span>
              </span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/50">
              The gaming community built for people who show up. Squad up, compete, and get
              rewarded — all in one place.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSubmitted(true);
              }}
              className="mt-7 max-w-sm"
            >
              <label htmlFor="footer-email" className="text-xs font-semibold uppercase tracking-wider text-white/50">
                Get drops &amp; event alerts
              </label>
              <div className="mt-2.5 flex gap-2">
                <input
                  id="footer-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-violet-400/60"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-transform duration-300 hover:scale-105"
                >
                  {submitted ? "✓ Done" : "Join"}
                </button>
              </div>
              {submitted && <p className="mt-2 text-xs text-cyan-300">You're in! Check your inbox for a welcome gift.</p>}
            </form>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h4 className="font-display text-sm font-semibold text-white">{col.title}</h4>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-white/50 transition-colors hover:text-white">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 py-8 sm:flex-row">
          <p className="text-xs text-white/40">© {new Date().getFullYear()} Fuzz's Fun Factory. All rights reserved.</p>
          <div className="flex items-center gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm text-white/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:text-white"
              >
                {s.icon}
              </a>
            ))}
          </div>
          <div className="flex gap-5 text-xs text-white/40">
            <a href="#" className="hover:text-white/70">
              Privacy
            </a>
            <a href="#" className="hover:text-white/70">
              Terms
            </a>
            <a href="#" className="hover:text-white/70">
              Code of Conduct
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
