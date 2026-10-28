import { useState } from "react";
import { Reveal } from "./Reveal";
import { cn } from "../utils/cn";

const TABS = [
  {
    id: "hub",
    label: "Community Hub",
    title: "One server. Every game you love.",
    desc: "Organized channels by game, skill level, and region so you find your people in seconds, not weeks.",
    points: ["Smart channel routing", "Role-based access", "Server-wide events calendar"],
  },
  {
    id: "arena",
    label: "Tournament Arena",
    title: "Compete without the chaos.",
    desc: "Auto-generated brackets, live score tracking, and instant payouts so you can focus on the clutch plays.",
    points: ["Auto brackets & seeding", "Live spectator mode", "Instant prize payouts"],
  },
  {
    id: "rewards",
    label: "Rewards Store",
    title: "Get paid to show up.",
    desc: "Earn Factory Points just by playing, then redeem them for skins, Nitro, merch, and exclusive drops.",
    points: ["Daily streak bonuses", "Partner skin drops", "Member-only merch"],
  },
];

export function ProductShowcase() {
  const [active, setActive] = useState(TABS[0].id);
  const current = TABS.find((t) => t.id === active)!;

  return (
    <section id="showcase" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-300">Inside the Factory</span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              One dashboard. <span className="text-gradient">Endless game nights.</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
          <Reveal direction="left">
            <div className="flex flex-wrap gap-2">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActive(tab.id)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300",
                    active === tab.id
                      ? "border-transparent bg-gradient-to-r from-violet-500 to-cyan-400 text-ink shadow-lg shadow-violet-500/30"
                      : "border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:text-white"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div key={current.id} className="mt-8 animate-[fadeIn_0.5s_ease]">
              <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">{current.title}</h3>
              <p className="mt-4 text-white/60 leading-relaxed">{current.desc}</p>
              <ul className="mt-6 space-y-3">
                {current.points.map((point) => (
                  <li key={point} className="flex items-center gap-3 text-sm text-white/80">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400">
                      <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 text-ink">
                        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              <a
                href="#join"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-cyan-300"
              >
                Explore the dashboard
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </Reveal>

          <Reveal direction="right" delay={150}>
            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-violet-600/20 via-fuchsia-500/10 to-cyan-400/20 blur-3xl" />
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                  <span className="ml-3 text-[11px] text-white/40">factory.gg/dashboard</span>
                </div>
                <img
                  src="/images/dashboard-mockup.png"
                  alt="Fuzz's Fun Factory community dashboard showing voice channels, leaderboards, and tournament brackets"
                  className="w-full object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
