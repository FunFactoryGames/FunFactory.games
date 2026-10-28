import { Reveal } from "./Reveal";

const GAMES = [
  "VALORANT",
  "Apex Legends",
  "League of Legends",
  "Minecraft",
  "Fortnite",
  "Counter-Strike 2",
  "Overwatch 2",
  "Rocket League",
  "Elden Ring",
  "Call of Duty",
];

export function SocialProof() {
  const loop = [...GAMES, ...GAMES];

  return (
    <section className="relative border-y border-white/5 bg-surface/60 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
            Where squads from every title link up
          </p>
        </Reveal>
      </div>

      <div className="relative mt-8 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-surface to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-surface to-transparent" />
        <div className="flex w-max animate-marquee gap-12 [animation-play-state:running] hover:[animation-play-state:paused]">
          {loop.map((game, i) => (
            <span
              key={`${game}-${i}`}
              className="flex items-center gap-3 whitespace-nowrap text-lg font-display font-semibold text-white/35 transition-colors hover:text-white/70"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-violet-400 to-cyan-400" />
              {game}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
