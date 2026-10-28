import { Reveal } from "./Reveal";

const BENEFITS = [
  {
    tag: "Belong",
    title: "Find your actual people",
    desc: "No more awkward solo queues. Match with teammates who share your schedule, your humor, and your win-rate goals.",
  },
  {
    tag: "Compete",
    title: "Climb ranks that matter",
    desc: "Factory Ranked seasons track your growth across games, with recognition drops and a leaderboard your friends will see.",
  },
  {
    tag: "Earn",
    title: "Get rewarded for playing",
    desc: "Daily quests and streaks turn your normal play sessions into Factory Points — redeemable for real rewards.",
  },
  {
    tag: "Grow",
    title: "Level up off the server",
    desc: "Workshops on streaming, editing, and team strategy run by members who've gone pro. Free, always.",
  },
];

export function Benefits() {
  return (
    <section id="benefits" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <Reveal direction="left" className="relative order-2 lg:order-1">
            <div className="relative mx-auto max-w-md">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-fuchsia-500/30 via-violet-500/20 to-cyan-400/30 blur-3xl" />
              <img
                src="/images/rewards-trophy.png"
                alt="Glowing holographic trophy surrounded by achievement badges and loot icons"
                className="relative w-full animate-float-slow drop-shadow-2xl"
              />
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-300">Why members stay</span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
                More than a server. <span className="text-gradient">A second home.</span>
              </h2>
            </Reveal>

            <div className="mt-10 space-y-2">
              {BENEFITS.map((benefit, i) => (
                <Reveal key={benefit.title} delay={150 + i * 100}>
                  <div className="group flex gap-5 rounded-2xl border border-transparent p-4 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04]">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-400/20 font-display text-xs font-bold text-white transition-transform duration-300 group-hover:scale-110">
                      0{i + 1}
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-cyan-300">{benefit.tag}</p>
                      <h3 className="mt-1 font-display text-lg font-semibold text-white">{benefit.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-white/55">{benefit.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
