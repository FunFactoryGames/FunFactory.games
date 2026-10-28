import { Reveal } from "./Reveal";

const STATS = [
  { value: "25K+", label: "Active members" },
  { value: "180+", label: "Tournaments run" },
  { value: "4.9/5", label: "Community rating" },
  { value: "24/7", label: "Always live" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-24 pt-36 sm:pb-32 sm:pt-44">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-ink">
        <div className="absolute inset-0 bg-grid mask-fade-b opacity-60" />
        <div className="absolute left-1/2 top-[-10%] h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-violet-600/30 blur-[120px] animate-pulse-glow" />
        <div className="absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-cyan-400/20 blur-[110px] animate-float-slow" />
        <div className="absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-[110px] animate-float" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/70 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-400" />
                </span>
                Recruiting now &middot; 1,204 online this hour
              </span>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[4.2rem]">
                Your next <span className="text-gradient">squad</span> is waiting
                <br className="hidden sm:block" /> inside the Factory.
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/60">
                Fuzz's Fun Factory is the gaming home base for people who take fun seriously —
                nightly tournaments, voice lounges that never sleep, and a crew that actually
                shows up. No toxicity. No gatekeeping. Just good games.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href="#join"
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 bg-[length:200%_100%] px-8 py-4 text-sm font-semibold text-ink shadow-xl shadow-fuchsia-500/20 transition-all duration-500 hover:bg-[position:100%_0] hover:shadow-fuchsia-500/40 animate-gradient-x"
                >
                  Join Free on Discord
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a
                  href="#showcase"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/10"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                    <path d="M8 5v14l11-7-11-7z" fill="currentColor" />
                  </svg>
                  See it in action
                </a>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <dl className="mt-14 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
                {STATS.map((stat) => (
                  <div key={stat.label}>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd className="font-display text-2xl font-bold text-white sm:text-3xl">{stat.value}</dd>
                    <dd className="mt-1 text-xs text-white/50">{stat.label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal direction="scale" delay={200} className="relative">
            <div className="relative mx-auto max-w-md">
              <div className="absolute inset-0 scale-90 rounded-[3rem] bg-gradient-to-br from-violet-500/40 via-fuchsia-500/30 to-cyan-400/30 blur-3xl" />
              <div className="relative rounded-[2.5rem] border border-white/10 bg-white/5 p-3 shadow-2xl backdrop-blur-xl">
                <img
                  src="/images/fuzz-mascot.png"
                  alt="Fuzz, the Fun Factory mascot, giving a thumbs up with a glowing controller"
                  className="w-full animate-float rounded-[2rem] object-cover"
                />
                <div className="absolute -left-6 top-10 animate-float-slow rounded-2xl border border-white/10 bg-ink/80 px-4 py-3 shadow-xl backdrop-blur-xl">
                  <p className="text-xs font-semibold text-white">🏆 Weekend Cup</p>
                  <p className="text-[11px] text-white/50">+500 live now</p>
                </div>
                <div className="absolute -right-6 bottom-16 animate-float rounded-2xl border border-white/10 bg-ink/80 px-4 py-3 shadow-xl backdrop-blur-xl">
                  <p className="text-xs font-semibold text-white">🎁 Loot Drop</p>
                  <p className="text-[11px] text-white/50">Unlocked: Legendary skin</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
