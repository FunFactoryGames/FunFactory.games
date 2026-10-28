import { Reveal } from "./Reveal";
import { cn } from "../utils/cn";

const PLANS = [
  {
    name: "Recruit",
    price: "Free",
    cadence: "forever",
    desc: "Everything you need to jump in and start playing with the crew tonight.",
    features: ["Full server access", "Daily voice lounges", "Community tournaments", "Squad Finder matching"],
    cta: "Join Free",
    highlight: false,
  },
  {
    name: "Elite",
    price: "$6",
    cadence: "/month",
    desc: "For members who want faster matchmaking and better loot every week.",
    features: [
      "Everything in Recruit",
      "Priority Squad Finder",
      "2x Factory Points",
      "Custom profile badge",
      "Early tournament entry",
    ],
    cta: "Go Elite",
    highlight: true,
  },
  {
    name: "Legend",
    price: "$14",
    cadence: "/month",
    desc: "The full VIP experience, built for members who live on the server.",
    features: [
      "Everything in Elite",
      "Monthly merch drop",
      "1:1 coaching sessions",
      "Private Legend lounge",
      "Vote on new features",
    ],
    cta: "Become a Legend",
    highlight: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-300">Membership</span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Free to play. <span className="text-gradient">Even better upgraded.</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-5 text-lg text-white/60">
              No contracts, cancel anytime. Most of the Factory runs great on the free tier —
              upgrades just add extra shine.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 120}>
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-3xl border p-8 transition-all duration-500 hover:-translate-y-2",
                  plan.highlight
                    ? "border-fuchsia-400/40 bg-gradient-to-b from-violet-500/15 via-white/[0.04] to-transparent shadow-2xl shadow-fuchsia-500/10"
                    : "border-white/10 bg-white/[0.03] hover:border-white/20"
                )}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-4 py-1 text-xs font-bold text-ink shadow-lg">
                    Most Popular
                  </span>
                )}
                <h3 className="font-display text-xl font-bold text-white">{plan.name}</h3>
                <p className="mt-2 text-sm text-white/55">{plan.desc}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-sm text-white/45">{plan.cadence}</span>
                </div>

                <ul className="mt-8 flex-1 space-y-3.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-white/75">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10">
                        <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 text-cyan-300">
                          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="#join"
                  className={cn(
                    "mt-8 inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300",
                    plan.highlight
                      ? "bg-gradient-to-r from-violet-500 to-cyan-400 text-ink shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50"
                      : "border border-white/15 bg-white/5 text-white hover:border-white/30 hover:bg-white/10"
                  )}
                >
                  {plan.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
