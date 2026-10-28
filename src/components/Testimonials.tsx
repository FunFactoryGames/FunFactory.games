import { Reveal } from "./Reveal";

const TESTIMONIALS = [
  {
    quote:
      "I joined for a Valorant tournament and never left. Two years later I'm a mod and my whole squad started here.",
    name: "Mika R.",
    handle: "@mika.clutch",
    game: "VALORANT Diamond",
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    quote:
      "The AI squad finder actually works. Matched me with three people who turned into my ranked team within a week.",
    name: "Devon W.",
    handle: "@devonwplays",
    game: "Apex Legends",
    color: "from-cyan-400 to-blue-500",
  },
  {
    quote:
      "First community I've been in where reporting toxic behavior actually leads to a ban. It's genuinely safe here.",
    name: "Priya S.",
    handle: "@priyagg",
    game: "Overwatch 2",
    color: "from-lime-400 to-emerald-500",
  },
  {
    quote:
      "Earned enough Factory Points in a month to grab Discord Nitro and a hoodie. Didn't spend a cent.",
    name: "Jonas K.",
    handle: "@jonask",
    game: "Minecraft",
    color: "from-amber-400 to-orange-500",
  },
  {
    quote:
      "The Creator Studio workshops got my clips in front of actual audiences. Grew my channel 10x in two months.",
    name: "Lena F.",
    handle: "@lenaframes",
    game: "Fortnite",
    color: "from-fuchsia-500 to-pink-500",
  },
  {
    quote:
      "Tournament brackets run smoother here than on paid platforms I've used. Fuzz's team built this right.",
    name: "Tariq B.",
    handle: "@tariqbuilds",
    game: "Counter-Strike 2",
    color: "from-indigo-500 to-violet-500",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5 text-amber-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.2-5.4 3.2 1.3-6-4.6-4.1 6.1-.6z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-20" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Member stories</span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Don't take our word for it
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.handle} delay={i * 80}>
              <figure className="group relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-white/20 hover:bg-white/[0.06]">
                <Stars />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-white/75">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${t.color} font-display text-sm font-bold text-ink`}
                  >
                    {t.name.charAt(0)}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-white/45">
                      {t.handle} &middot; {t.game}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
