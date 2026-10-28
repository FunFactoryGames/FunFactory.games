import { useState } from "react";
import { Reveal } from "./Reveal";
import { cn } from "../utils/cn";

const FAQS = [
  {
    q: "Is Fuzz's Fun Factory actually free to join?",
    a: "Yes — the Recruit tier is 100% free, forever. That includes full server access, voice lounges, tournaments, and Squad Finder matching. Paid tiers just add extra perks for members who want them.",
  },
  {
    q: "What platform does the community live on?",
    a: "We're primarily on Discord, with a companion web dashboard for tournaments, leaderboards, and the rewards store. One account, synced everywhere.",
  },
  {
    q: "Do I need to be a hardcore or pro player to join?",
    a: "Not at all. Most of our 25,000+ members are casual-to-competitive players. We match you by vibe and schedule first, skill second — everyone finds their lane.",
  },
  {
    q: "What games are supported?",
    a: "Our core channels cover VALORANT, Apex Legends, League of Legends, Minecraft, Fortnite, CS2, Overwatch 2, Rocket League, and more — plus a general lounge for anything else you're playing.",
  },
  {
    q: "How does moderation actually work?",
    a: "We run a volunteer + paid mod team active across time zones, backed by automated toxicity detection. Verified reports are reviewed within hours, not days, and repeat offenders are removed.",
  },
  {
    q: "Can I cancel a paid membership anytime?",
    a: "Yes, Elite and Legend are month-to-month with zero contracts. Cancel in two clicks from your dashboard and keep access until the end of your billing period.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-300">FAQ</span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Questions? We've got answers.
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={item.q} delay={i * 60}>
                <div
                  className={cn(
                    "overflow-hidden rounded-2xl border transition-colors duration-300",
                    isOpen ? "border-white/20 bg-white/[0.05]" : "border-white/10 bg-white/[0.02]"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-display text-base font-semibold text-white sm:text-lg">{item.q}</span>
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 transition-transform duration-300",
                        isOpen && "rotate-45 bg-gradient-to-br from-violet-500 to-cyan-400"
                      )}
                    >
                      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-white">
                        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={cn(
                      "grid transition-all duration-300 ease-in-out",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-sm leading-relaxed text-white/60">{item.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
