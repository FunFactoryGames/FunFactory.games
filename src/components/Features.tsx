import { Reveal } from "./Reveal";

const FEATURES = [
  {
    icon: "🎙️",
    title: "Voice Lounges, 24/7",
    desc: "Drop into always-on voice rooms for every game in your library. Someone's always down to queue.",
  },
  {
    icon: "🏆",
    title: "Weekly Tournaments",
    desc: "Compete in ranked brackets with real prizes — bragging rights included, every single week.",
  },
  {
    icon: "🤝",
    title: "AI Squad Finder",
    desc: "Get matched with teammates by skill, vibe, and schedule. No more solo-queue roulette.",
  },
  {
    icon: "🎁",
    title: "Loot & Rewards",
    desc: "Earn Factory Points for showing up and playing. Cash them in for skins, Discord nitro, and merch.",
  },
  {
    icon: "🎬",
    title: "Creator Studio",
    desc: "Clip, stream, and get featured on our channels. Built-in tools for aspiring content creators.",
  },
  {
    icon: "🛡️",
    title: "Zero-Toxicity Policy",
    desc: "Active moderation and a culture that actually enforces kindness. Play hard, not hostile.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">What you get</span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Built for how gamers <span className="text-gradient">actually play</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-5 text-lg text-white/60">
              Every feature inside the Factory exists for one reason: to make it easier to play
              more, with better people.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 90}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-white/20 hover:bg-white/[0.06]">
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-400/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-2xl shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                  {feature.icon}
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-white/55">{feature.desc}</p>
                <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-white/40 transition-colors group-hover:text-white/80">
                  Learn more
                  <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
