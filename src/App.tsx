import { useEffect, useMemo, useRef, useState } from "react";

type Tier = {
  name: string;
  price: string;
  cadence: string;
  blurb: string;
  highlight?: boolean;
  cta: string;
  features: string[];
};

function cn(...v: Array<string | false | null | undefined>) {
  return v.filter(Boolean).join(" ");
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(!!mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");
  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));
        if (visible[0]?.target?.id) setActive(visible[0].target.id);
      },
      { root: null, threshold: [0.2, 0.35, 0.5], rootMargin: "-10% 0px -70% 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

function Reveal({
  children,
  delayMs = 0,
  className,
}: {
  children: React.ReactNode;
  delayMs?: number;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (reduced) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.2 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <div
      ref={ref}
      className={cn(
        "will-change-transform",
        reduced
          ? ""
          : cn(
              "transition-all duration-700 ease-out",
              shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            ),
        className
      )}
      style={!reduced ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}

function GlowDivider() {
  return (
    <div className="relative">
      <div className="mx-auto h-px w-full max-w-6xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute inset-0 mx-auto h-px w-full max-w-6xl bg-gradient-to-r from-transparent via-fuchsia-400/30 to-transparent blur" />
    </div>
  );
}

function LogoMark({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative grid size-10 place-items-center rounded-2xl",
        "bg-white/5 ring-1 ring-white/10",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_20px_60px_-20px_rgba(168,85,247,0.55)]",
        className
      )}
      aria-hidden="true"
    >
      <div className="absolute -inset-6 rounded-[28px] bg-[radial-gradient(circle_at_30%_30%,rgba(168,85,247,0.25),transparent_55%),radial-gradient(circle_at_70%_20%,rgba(34,211,238,0.16),transparent_50%)] blur-xl" />
      <svg
        className="relative z-10 size-5 text-white/90"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 21h10" />
        <path d="M12 17v4" />
        <path d="M8 17h8" />
        <path d="M12 3l7 6v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9l7-6z" />
        <path d="M9.5 11.5h.01" />
        <path d="M14.5 11.5h.01" />
      </svg>
    </div>
  );
}

function Button({
  children,
  href,
  variant = "primary",
  className,
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  onClick?: () => void;
}) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";
  const styles = {
    primary:
      "bg-gradient-to-b from-white/18 to-white/8 text-white ring-1 ring-white/14 shadow-[0_18px_60px_-18px_rgba(168,85,247,0.65)] hover:translate-y-[-1px] hover:ring-white/22",
    secondary:
      "bg-white/5 text-white/90 ring-1 ring-white/10 hover:bg-white/8 hover:ring-white/18",
    ghost: "text-white/80 hover:text-white hover:bg-white/5",
  } as const;

  const inner = (
    <span className={cn(base, styles[variant], className)}>
      {children}
      <svg
        className="size-4 opacity-70 transition-transform duration-300 group-hover:translate-x-0.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 12h14" />
        <path d="m13 5 7 7-7 7" />
      </svg>
    </span>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick}>
        {inner}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick}>
      {inner}
    </button>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-white/80 ring-1 ring-white/10">
      <span className="size-1.5 rounded-full bg-fuchsia-300/80" aria-hidden="true" />
      {children}
    </span>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
      <div className="text-lg font-semibold tracking-tight text-white">{value}</div>
      <div className="mt-1 text-xs text-white/60">{label}</div>
    </div>
  );
}

function FauxScreenshot() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-[32px] bg-[radial-gradient(circle_at_20%_20%,rgba(168,85,247,0.28),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(34,211,238,0.20),transparent_55%),radial-gradient(circle_at_60%_90%,rgba(251,146,60,0.18),transparent_55%)] blur-2xl" />
      <div className="relative overflow-hidden rounded-[28px] bg-white/5 ring-1 ring-white/10 shadow-[0_40px_140px_-60px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-4 py-3">
          <div className="flex gap-2" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-rose-400/80" />
            <span className="size-2.5 rounded-full bg-amber-300/80" />
            <span className="size-2.5 rounded-full bg-emerald-300/80" />
          </div>
          <div className="ml-2 text-xs font-medium text-white/60">Fuzz’s Fun Factory • Live Lounge</div>
          <div className="ml-auto hidden items-center gap-2 text-xs text-white/55 sm:flex">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-1 ring-1 ring-white/10">
              <span className="size-1.5 rounded-full bg-emerald-300" />
              Online
            </span>
            <span className="rounded-full bg-white/5 px-2 py-1 ring-1 ring-white/10">Drops</span>
          </div>
        </div>

        <div className="grid gap-4 p-4 sm:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-3">
            <div className="rounded-2xl bg-gradient-to-b from-white/8 to-white/3 p-4 ring-1 ring-white/10">
              <div className="flex items-start gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-white/8 ring-1 ring-white/10">
                  <span className="text-sm font-bold text-white/90">FF</span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="truncate text-sm font-semibold text-white">Matchmaking Night</div>
                    <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[11px] font-semibold text-emerald-200 ring-1 ring-emerald-300/20">
                      Live
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-white/60">
                    Queue up, squad up, win together. Voice channels auto-sort by role.
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <Stat label="Active lobbies" value="18" />
                <Stat label="Avg. wait" value="2m" />
                <Stat label="Tonight’s prize" value="$250" />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { k: "Drops", v: "Weekly creator loot" },
                { k: "Tournaments", v: "Monthly brackets" },
                { k: "Clips", v: "Highlights & edits" },
                { k: "Coaching", v: "Skill labs" },
              ].map((x) => (
                <div
                  key={x.k}
                  className="rounded-2xl bg-white/4 p-4 ring-1 ring-white/10 transition hover:bg-white/6"
                >
                  <div className="text-sm font-semibold text-white">{x.k}</div>
                  <div className="mt-1 text-xs text-white/60">{x.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded-2xl bg-white/4 p-4 ring-1 ring-white/10">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-white">Now playing</div>
                <div className="text-xs text-white/55">Ambient</div>
              </div>
              <div className="mt-3 overflow-hidden rounded-2xl bg-black/40 ring-1 ring-white/10">
                <div className="aspect-[4/3] bg-[radial-gradient(circle_at_30%_30%,rgba(168,85,247,0.35),transparent_55%),radial-gradient(circle_at_75%_20%,rgba(34,211,238,0.22),transparent_55%),linear-gradient(180deg,rgba(255,255,255,0.10),rgba(255,255,255,0.03))]" />
              </div>
              <div className="mt-3 flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-fuchsia-300/80 to-cyan-300/70" />
                </div>
                <div className="text-xs tabular-nums text-white/55">02:14</div>
              </div>
            </div>

            <div className="rounded-2xl bg-white/4 p-4 ring-1 ring-white/10">
              <div className="text-sm font-semibold text-white">Upcoming</div>
              <ul className="mt-3 space-y-2 text-xs text-white/65">
                {[
                  "Friday: Community customs (open) — 8pm",
                  "Saturday: Clip review & edits — 3pm",
                  "Sunday: Chill co-op & raids — 6pm",
                ].map((t) => (
                  <li key={t} className="flex gap-2">
                    <span className="mt-1 size-1.5 rounded-full bg-white/35" aria-hidden="true" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <Button variant="secondary" href="#pricing" className="w-full">
                  Reserve a spot
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const sections = useMemo(
    () => [
      "top",
      "social-proof",
      "features",
      "showcase",
      "benefits",
      "testimonials",
      "pricing",
      "faq",
      "cta",
    ],
    []
  );
  const active = useScrollSpy(sections);

  const [mobileOpen, setMobileOpen] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = reduced ? "auto" : "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, [reduced]);

  const tiers: Tier[] = [
    {
      name: "Starter",
      price: "$0",
      cadence: "forever",
      blurb: "Join the Factory floor. Play nights, LFG, and the vibe check channel.",
      cta: "Join free",
      features: [
        "Access to LFG + voice lounges",
        "Weekly community nights",
        "Clip-of-the-week highlights",
        "Member-only roles & reactions",
      ],
    },
    {
      name: "VIP Pass",
      price: "$7",
      cadence: "/month",
      blurb: "Skip the noise. Get priority queues, drops, and early event access.",
      highlight: true,
      cta: "Go VIP",
      features: [
        "Priority matchmaking nights",
        "Early access to tourneys & customs",
        "Monthly drop pack + giveaways",
        "VIP chat + creator AMAs",
        "Profile badge & cosmetics",
      ],
    },
    {
      name: "Squad",
      price: "$19",
      cadence: "/month",
      blurb: "For full teams. Private channels, scrim scheduling, and coaching labs.",
      cta: "Unlock Squad",
      features: [
        "Private squad hub (text + voice)",
        "Scrim scheduler & attendance",
        "Team VOD review nights",
        "Role-based callout templates",
        "Priority support",
      ],
    },
  ];

  const faqs = [
    {
      q: "What is Fuzz’s Fun Factory?",
      a: "A premium gamer community built for consistent play nights, real friendships, and better sessions—without the spam. Think: curated channels, smart events, and a culture that stays fun.",
    },
    {
      q: "Do I need a specific game to join?",
      a: "Nope. We rotate spotlight games and run always-on LFG. If you’re respectful and down to play, you belong here.",
    },
    {
      q: "How do events work?",
      a: "We run weekly matchmaking nights and monthly tournaments. RSVP, show up, and we auto-sort lobbies. VIP gets earlier slots and priority.",
    },
    {
      q: "Is it beginner-friendly?",
      a: "Very. We have ‘no-sweat’ queues, coaching labs, and role tags so you’re never thrown into the deep end.",
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes. VIP and Squad are month-to-month. Keep your free access even if you cancel.",
    },
  ];

  return (
    <div id="top" className="min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-black/60 focus:px-4 focus:py-2 focus:text-sm focus:text-white focus:ring-2 focus:ring-fuchsia-300/60"
      >
        Skip to content
      </a>

      {/* Ambient grid + noise */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.18),transparent_55%),radial-gradient(circle_at_80%_10%,rgba(34,211,238,0.14),transparent_50%),radial-gradient(circle_at_60%_80%,rgba(251,146,60,0.10),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay [background-image:url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%22120%22%20height=%22120%22%3E%3Cfilter%20id=%22n%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.8%22%20numOctaves=%223%22%20stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect%20width=%22120%22%20height=%22120%22%20filter=%22url(%23n)%22%20opacity=%220.35%22/%3E%3C/svg%3E')]" />
      </div>

      {/* Sticky navbar */}
      <header className="sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <nav
            className={cn(
              "mt-4 rounded-2xl bg-white/[0.04] backdrop-blur-xl",
              "ring-1 ring-white/10 shadow-[0_20px_70px_-40px_rgba(0,0,0,0.8)]"
            )}
            aria-label="Primary"
          >
            <div className="flex items-center justify-between px-3 py-3 sm:px-4">
              <a href="#top" className="flex items-center gap-3">
                <LogoMark />
                <div className="leading-tight">
                  <div className="text-sm font-semibold tracking-tight text-white">
                    Fuzz’s Fun Factory
                  </div>
                  <div className="text-xs text-white/55">Community • Events • Drops</div>
                </div>
              </a>

              <div className="hidden items-center gap-1 md:flex">
                {[
                  ["Social proof", "#social-proof"],
                  ["Features", "#features"],
                  ["Showcase", "#showcase"],
                  ["Pricing", "#pricing"],
                  ["FAQ", "#faq"],
                ].map(([label, href]) => {
                  const id = (href as string).replace("#", "");
                  const isActive = active === id;
                  return (
                    <a
                      key={href}
                      href={href as string}
                      className={cn(
                        "rounded-xl px-3 py-2 text-sm font-semibold tracking-tight transition",
                        isActive ? "text-white" : "text-white/70 hover:text-white",
                        "hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300/60"
                      )}
                    >
                      {label}
                    </a>
                  );
                })}
              </div>

              <div className="hidden items-center gap-2 md:flex">
                <Button variant="ghost" href="#pricing">
                  See tiers
                </Button>
                <Button href="#cta">Join the community</Button>
              </div>

              <button
                type="button"
                className="inline-flex items-center justify-center rounded-xl bg-white/5 p-2 ring-1 ring-white/10 transition hover:bg-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300/60 md:hidden"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((v) => !v)}
              >
                <svg
                  className="size-5 text-white/90"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {mobileOpen ? (
                    <>
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </>
                  ) : (
                    <>
                      <path d="M4 6h16" />
                      <path d="M4 12h16" />
                      <path d="M4 18h16" />
                    </>
                  )}
                </svg>
              </button>
            </div>

            {mobileOpen && (
              <div className="border-t border-white/10 px-3 pb-3 pt-2 md:hidden">
                <div className="grid gap-1">
                  {[
                    ["Social proof", "#social-proof"],
                    ["Features", "#features"],
                    ["Showcase", "#showcase"],
                    ["Benefits", "#benefits"],
                    ["Testimonials", "#testimonials"],
                    ["Pricing", "#pricing"],
                    ["FAQ", "#faq"],
                  ].map(([label, href]) => (
                    <a
                      key={href}
                      href={href as string}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-xl px-3 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300/60"
                    >
                      {label}
                    </a>
                  ))}
                </div>
                <div className="mt-3 grid gap-2">
                  <Button href="#cta" className="w-full" onClick={() => setMobileOpen(false)}>
                    Join the community
                  </Button>
                  <Button
                    variant="secondary"
                    href="#pricing"
                    className="w-full"
                    onClick={() => setMobileOpen(false)}
                  >
                    See tiers
                  </Button>
                </div>
              </div>
            )}
          </nav>
        </div>
      </header>

      <main id="main" className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Hero */}
        <section className="relative pb-10 pt-14 sm:pt-20">
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-24 -z-10">
            <div className="mx-auto h-[340px] max-w-6xl rounded-[48px] bg-[radial-gradient(circle_at_30%_35%,rgba(168,85,247,0.38),transparent_55%),radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.26),transparent_55%),radial-gradient(circle_at_50%_80%,rgba(251,146,60,0.18),transparent_55%)] blur-2xl" />
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
            <div>
              <Reveal>
                <Chip>New: Matchmaking Nights + Drop Packs</Chip>
              </Reveal>
              <Reveal delayMs={120}>
                <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  The gamer community that <span className="text-white">actually</span> shows up.
                </h1>
              </Reveal>
              <Reveal delayMs={220}>
                <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
                  Fuzz’s Fun Factory is a premium, curated space for players who want better sessions:
                  fast LFG, voice that doesn’t feel awkward, weekly events, and a culture built around
                  being good at games <span className="text-white/85">and</span> good to each other.
                </p>
              </Reveal>

              <Reveal delayMs={320}>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button href="#cta" className="sm:px-5">
                    Join the Factory
                  </Button>
                  <Button variant="secondary" href="#showcase" className="sm:px-5">
                    See what you get
                  </Button>
                </div>
              </Reveal>

              <Reveal delayMs={420}>
                <div className="mt-8 grid grid-cols-2 gap-3 sm:max-w-xl sm:grid-cols-4">
                  <Stat label="Members" value="12k+" />
                  <Stat label="Weekly events" value="6" />
                  <Stat label="Avg. LFG time" value="< 3m" />
                  <Stat label="Toxicity" value="0 tolerance" />
                </div>
              </Reveal>

              <Reveal delayMs={520}>
                <div className="mt-7 flex flex-wrap items-center gap-3 text-xs text-white/55">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10">
                    <span className="size-1.5 rounded-full bg-emerald-300" />
                    Live events every week
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10">
                    <span className="size-1.5 rounded-full bg-cyan-300" />
                    Mobile-first onboarding
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10">
                    <span className="size-1.5 rounded-full bg-fuchsia-300" />
                    Accessible + inclusive
                  </span>
                </div>
              </Reveal>
            </div>

            <Reveal delayMs={220} className="lg:justify-self-end">
              <FauxScreenshot />
            </Reveal>
          </div>
        </section>

        <GlowDivider />

        {/* Social proof */}
        <section id="social-proof" className="py-14 sm:py-16">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Trusted by players who want better lobbies.
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
                  Built for momentum: fast matchmaking, consistent events, and the little product details
                  that make the community feel alive.
                </p>
              </div>
              <div className="rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
                <div className="text-xs text-white/55">Rated by members</div>
                <div className="mt-1 flex items-center gap-2">
                  <div className="text-lg font-semibold">4.9</div>
                  <div className="flex" aria-label="5 star rating">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className="size-4 text-amber-300"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Creators",
                desc: "Clip reviews, collabs, and community edit nights.",
                metric: "300+",
              },
              {
                title: "Competitive squads",
                desc: "Scrims, VOD reviews, and role-based callouts.",
                metric: "1,100+",
              },
              {
                title: "Co-op enjoyers",
                desc: "Raids, roguelikes, and ‘no-sweat’ queues.",
                metric: "4,000+",
              },
              {
                title: "New friends",
                desc: "Real conversations without the cringe.",
                metric: "Every day",
              },
            ].map((x, idx) => (
              <Reveal key={x.title} delayMs={idx * 90}>
                <div className="group rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 transition hover:bg-white/7 hover:ring-white/18">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-semibold text-white">{x.title}</div>
                      <div className="mt-2 text-sm text-white/60">{x.desc}</div>
                    </div>
                    <div className="rounded-2xl bg-white/5 px-3 py-2 text-xs font-semibold text-white/80 ring-1 ring-white/10">
                      {x.metric}
                    </div>
                  </div>
                  <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <div className="mt-4 flex items-center justify-between text-xs text-white/55">
                    <span>Quality bar</span>
                    <span className="font-semibold text-white/80">High</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <GlowDivider />

        {/* Features */}
        <section id="features" className="py-14 sm:py-16">
          <Reveal>
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Everything you need to find your people.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/65 sm:text-base">
                Designed like a product, not a pile of channels. Clean structure, smart events, and
                microinteractions that make it feel effortless.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => {
              const data = [
                {
                  title: "Smart LFG",
                  desc: "Role tags, region filters, and quick ‘ready’ pings. Less scrolling, more playing.",
                  icon: (
                    <path d="M7 8h10M7 12h6m-8 9V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v9l-4 4H7a2 2 0 0 1-2-2z" />
                  ),
                },
                {
                  title: "Matchmaking Nights",
                  desc: "Weekly lobbies that start on time. We pair you with compatible playstyles.",
                  icon: <path d="M12 2v20M2 12h20" />,
                },
                {
                  title: "Premium moderation",
                  desc: "Anti-toxicity by design: clear rules, fast actions, and calm escalation.",
                  icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
                },
                {
                  title: "Drops & giveaways",
                  desc: "Weekly drop packs, creator collabs, and seasonal prize pools.",
                  icon: <path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8m16 0-8 6-8-6m16 0-8-6-8 6" />,
                },
                {
                  title: "Clip pipeline",
                  desc: "Share raw clips → get feedback → ship edits. Built-in templates and prompts.",
                  icon: <path d="M15 10l4.553-2.276A1 1 0 0 1 21 8.618v6.764a1 1 0 0 1-1.447.894L15 14V10zM3 6h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />,
                },
                {
                  title: "Onboarding that sticks",
                  desc: "One minute to set roles, find a lobby, and join your first event.",
                  icon: <path d="M12 3v6l4 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />,
                },
              ][i];

              return (
                <Reveal key={data.title} delayMs={i * 90}>
                  <div className="group relative overflow-hidden rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 transition hover:bg-white/7 hover:ring-white/18">
                    <div className="pointer-events-none absolute -inset-12 opacity-0 transition duration-500 group-hover:opacity-100">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(168,85,247,0.22),transparent_55%),radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.16),transparent_55%)] blur-2xl" />
                    </div>
                    <div className="relative">
                      <div className="flex items-start gap-4">
                        <div className="grid size-11 place-items-center rounded-2xl bg-white/6 ring-1 ring-white/10">
                          <svg
                            className="size-5 text-white/85"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            {data.icon}
                          </svg>
                        </div>
                        <div>
                          <div className="text-base font-semibold tracking-tight text-white">
                            {data.title}
                          </div>
                          <div className="mt-2 text-sm leading-relaxed text-white/60">{data.desc}</div>
                        </div>
                      </div>
                      <div className="mt-5 flex items-center justify-between text-xs text-white/55">
                        <span>Built for</span>
                        <span className="rounded-full bg-white/5 px-2 py-1 font-semibold text-white/75 ring-1 ring-white/10">
                          gamers
                        </span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        <GlowDivider />

        {/* Product showcase */}
        <section id="showcase" className="py-14 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <Reveal>
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  A community that feels like a premium app.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/65 sm:text-base">
                  We’ve obsessed over the details: clean navigation, curated rooms, and smooth rituals
                  that turn strangers into squads.
                </p>

                <div className="mt-8 grid gap-3">
                  {["Find a lobby in under 3 minutes", "Join an event without awkwardness", "Stay for the friendships, not the drama"].map(
                    (t, idx) => (
                      <Reveal key={t} delayMs={idx * 120}>
                        <div className="flex items-start gap-3 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                          <div className="mt-0.5 grid size-7 place-items-center rounded-xl bg-emerald-400/10 ring-1 ring-emerald-300/20">
                            <svg
                              className="size-4 text-emerald-200"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="M20 6 9 17l-5-5" />
                            </svg>
                          </div>
                          <div className="text-sm font-semibold text-white/85">{t}</div>
                        </div>
                      </Reveal>
                    )
                  )}
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button href="#pricing">Choose your tier</Button>
                  <Button variant="secondary" href="#faq">
                    Read the FAQ
                  </Button>
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={150}>
              <div className="relative overflow-hidden rounded-[32px] bg-white/5 p-6 ring-1 ring-white/10">
                <div className="pointer-events-none absolute inset-0 opacity-80 [mask-image:radial-gradient(circle_at_40%_30%,black,transparent_70%)]">
                  <div className="absolute -inset-20 bg-[conic-gradient(from_220deg,rgba(168,85,247,0.26),rgba(34,211,238,0.18),rgba(251,146,60,0.14),rgba(168,85,247,0.26))] blur-2xl" />
                </div>

                <div className="relative grid gap-4 sm:grid-cols-2">
                  {[
                    {
                      k: "Weekly Rituals",
                      v: "Matchmaking nights, customs, raids, and chill co-op.",
                    },
                    {
                      k: "Culture",
                      v: "No ego. No slurs. No drama farming. Just good games.",
                    },
                    {
                      k: "Creator Tools",
                      v: "Clip prompts, review nights, and collab channels.",
                    },
                    {
                      k: "Progress",
                      v: "Coaching labs, VOD sessions, and scrim planning.",
                    },
                  ].map((x) => (
                    <div
                      key={x.k}
                      className="group rounded-3xl bg-black/30 p-5 ring-1 ring-white/10 transition hover:bg-black/35"
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-semibold text-white">{x.k}</div>
                        <div className="size-2 rounded-full bg-fuchsia-300/70 opacity-70 transition group-hover:opacity-100" />
                      </div>
                      <div className="mt-2 text-sm text-white/60">{x.v}</div>
                      <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                      <div className="mt-4 text-xs text-white/55">Stays lightweight. Feels premium.</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <GlowDivider />

        {/* Benefits */}
        <section id="benefits" className="py-14 sm:py-16">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Feel the difference in the first session.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/65 sm:text-base">
                  Most servers grow. The Factory improves. Better rituals, better queues, better people.
                </p>
              </div>
              <div className="rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
                <div className="text-xs text-white/55">Average time to make a friend</div>
                <div className="mt-1 text-lg font-semibold tracking-tight">One night</div>
              </div>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-[32px] bg-white/5 p-7 ring-1 ring-white/10">
                <div className="pointer-events-none absolute -inset-16 opacity-80">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_30%,rgba(168,85,247,0.22),transparent_55%),radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.14),transparent_55%)] blur-2xl" />
                </div>
                <div className="relative">
                  <div className="text-lg font-semibold tracking-tight text-white">
                    Less doomscrolling. More ‘ready up’.
                  </div>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/65">
                    We replace endless channel lists with clear flows: pick a vibe, pick a role, join a
                    lobby. Our events are designed to start, not to linger.
                  </p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {["Clear roles", "Instant lobbies", "Real schedules"].map((t) => (
                      <div
                        key={t}
                        className="rounded-2xl bg-black/25 p-4 ring-1 ring-white/10"
                      >
                        <div className="text-sm font-semibold text-white/85">{t}</div>
                        <div className="mt-1 text-xs text-white/55">Less friction, more fun.</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={120} className="lg:col-span-5">
              <div className="grid h-full gap-4">
                {[
                  {
                    t: "Safety-first by default",
                    d: "We build the vibe you want to return to—firm rules, gentle tone.",
                  },
                  {
                    t: "Signal over noise",
                    d: "Curated channels and rituals keep the community readable.",
                  },
                  {
                    t: "Momentum loops",
                    d: "Events → clips → highlights → new friends → next event.",
                  },
                ].map((x) => (
                  <div
                    key={x.t}
                    className="rounded-[28px] bg-white/5 p-6 ring-1 ring-white/10 transition hover:bg-white/7"
                  >
                    <div className="text-base font-semibold tracking-tight text-white">{x.t}</div>
                    <div className="mt-2 text-sm leading-relaxed text-white/60">{x.d}</div>
                    <div className="mt-4 flex items-center gap-2 text-xs text-white/55">
                      <span className="size-1.5 rounded-full bg-white/30" />
                      <span>Designed for long-term vibes</span>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <GlowDivider />

        {/* Testimonials */}
        <section id="testimonials" className="py-14 sm:py-16">
          <Reveal>
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Members say it best.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/65 sm:text-base">
                The Factory is built for people who want to play more—and feel better doing it.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {[
              {
                quote:
                  "First server where I didn’t feel like an extra. Joined a matchmaking night and had a squad in 10 minutes.",
                name: "Kai",
                role: "FPS grinder",
              },
              {
                quote:
                  "The vibe is premium. Clean channels, clear events, and the mods are actually present without being weird about it.",
                name: "Mina",
                role: "Variety gamer",
              },
              {
                quote:
                  "VIP is worth it for the priority queues alone. Plus the clip nights helped me level up my content.",
                name: "Rook",
                role: "Creator",
              },
            ].map((t, idx) => (
              <Reveal key={t.name} delayMs={idx * 120}>
                <figure className="group rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 transition hover:bg-white/7 hover:ring-white/18">
                  <div className="flex items-center gap-2 text-amber-300" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} className="size-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="mt-4 text-sm leading-relaxed text-white/70">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-6 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-white">{t.name}</div>
                      <div className="text-xs text-white/55">{t.role}</div>
                    </div>
                    <div className="grid size-10 place-items-center rounded-2xl bg-white/6 ring-1 ring-white/10">
                      <span className="text-xs font-bold text-white/80">FF</span>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>

        <GlowDivider />

        {/* Pricing */}
        <section id="pricing" className="py-14 sm:py-16">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Pick your vibe. Upgrade when you’re ready.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/65 sm:text-base">
                  Start free. Go VIP for priority access and drops. Bring your full team with Squad.
                </p>
              </div>
              <div className="rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
                <div className="text-xs text-white/55">Guarantee</div>
                <div className="mt-1 text-sm font-semibold text-white/85">Cancel anytime</div>
              </div>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {tiers.map((tier, idx) => (
              <Reveal key={tier.name} delayMs={idx * 120}>
                <div
                  className={cn(
                    "relative overflow-hidden rounded-[32px] p-7 ring-1 transition",
                    tier.highlight
                      ? "bg-white/7 ring-white/18"
                      : "bg-white/5 ring-white/10 hover:bg-white/7 hover:ring-white/18"
                  )}
                >
                  {tier.highlight && (
                    <div className="absolute right-4 top-4 rounded-full bg-fuchsia-400/15 px-3 py-1 text-xs font-semibold text-fuchsia-200 ring-1 ring-fuchsia-300/20">
                      Most popular
                    </div>
                  )}
                  <div className="pointer-events-none absolute -inset-20 opacity-60">
                    <div
                      className={cn(
                        "absolute inset-0 blur-3xl",
                        tier.highlight
                          ? "bg-[radial-gradient(circle_at_30%_30%,rgba(168,85,247,0.22),transparent_60%),radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.14),transparent_55%)]"
                          : "bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.10),transparent_60%)]"
                      )}
                    />
                  </div>

                  <div className="relative">
                    <div className="text-base font-semibold tracking-tight text-white">{tier.name}</div>
                    <div className="mt-3 flex items-end gap-2">
                      <div className="text-4xl font-semibold tracking-tight text-white">{tier.price}</div>
                      <div className="pb-1 text-sm text-white/60">{tier.cadence}</div>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-white/65">{tier.blurb}</p>

                    <div className="mt-6">
                      <Button href="#cta" className="w-full">
                        {tier.cta}
                      </Button>
                    </div>

                    <ul className="mt-6 space-y-3 text-sm text-white/65">
                      {tier.features.map((f) => (
                        <li key={f} className="flex gap-3">
                          <svg
                            className="mt-0.5 size-4 flex-none text-emerald-200"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delayMs={200}>
            <div className="mt-8 rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-sm font-semibold text-white">Want to bring a clan or org?</div>
                  <div className="mt-1 text-sm text-white/60">
                    We’ll set up a custom home base with onboarding, roles, and event templates.
                  </div>
                </div>
                <Button variant="secondary" href="#cta">
                  Talk to us
                </Button>
              </div>
            </div>
          </Reveal>
        </section>

        <GlowDivider />

        {/* FAQ */}
        <section id="faq" className="py-14 sm:py-16">
          <Reveal>
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">FAQ</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/65 sm:text-base">
                Everything you need to know before you step onto the Factory floor.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {faqs.map((x, idx) => (
              <Reveal key={x.q} delayMs={idx * 90}>
                <details className="group rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 open:bg-white/7">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
                    <span className="text-sm font-semibold text-white">{x.q}</span>
                    <span className="grid size-9 place-items-center rounded-2xl bg-white/6 ring-1 ring-white/10">
                      <svg
                        className="size-4 text-white/70 transition-transform duration-300 group-open:rotate-45"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M12 5v14" />
                        <path d="M5 12h14" />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-white/65">{x.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </section>

        <GlowDivider />

        {/* CTA */}
        <section id="cta" className="py-14 sm:py-16">
          <Reveal>
            <div className="relative overflow-hidden rounded-[40px] bg-white/5 p-8 ring-1 ring-white/10 sm:p-10">
              <div className="pointer-events-none absolute -inset-24 opacity-80">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(168,85,247,0.32),transparent_55%),radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.22),transparent_55%),radial-gradient(circle_at_55%_85%,rgba(251,146,60,0.16),transparent_55%)] blur-2xl" />
              </div>

              <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    Ready for better sessions?
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
                    Join the Factory. Set your roles. Pick your vibe. We’ll get you into a lobby—fast.
                    No spam. No ego. Just games, friends, and momentum.
                  </p>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <Button
                      href="#top"
                      onClick={() => {
                        const el = document.getElementById("top");
                        el?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
                      }}
                    >
                      Join now
                    </Button>
                    <Button variant="secondary" href="#pricing">
                      Compare tiers
                    </Button>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-white/60">
                    <span className="inline-flex items-center gap-2 rounded-full bg-black/25 px-3 py-1 ring-1 ring-white/10">
                      <span className="size-1.5 rounded-full bg-emerald-300" />
                      Instant access
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-black/25 px-3 py-1 ring-1 ring-white/10">
                      <span className="size-1.5 rounded-full bg-fuchsia-300" />
                      Friendly vibes
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-black/25 px-3 py-1 ring-1 ring-white/10">
                      <span className="size-1.5 rounded-full bg-cyan-300" />
                      Weekly events
                    </span>
                  </div>
                </div>

                <div className="rounded-[28px] bg-black/30 p-6 ring-1 ring-white/10">
                  <div className="text-sm font-semibold text-white">Quick start</div>
                  <ol className="mt-4 space-y-3 text-sm text-white/65">
                    {[
                      "Join free and pick your roles",
                      "Post a ‘ready’ ping in LFG",
                      "Hop into a voice lounge",
                      "RSVP to your first event",
                    ].map((s, i) => (
                      <li key={s} className="flex gap-3">
                        <div className="mt-0.5 grid size-6 place-items-center rounded-xl bg-white/6 text-xs font-semibold text-white/75 ring-1 ring-white/10">
                          {i + 1}
                        </div>
                        <div>{s}</div>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-6">
                    <a
                      href="#features"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300/60"
                    >
                      See all features
                      <svg
                        className="size-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M5 12h14" />
                        <path d="m13 5 7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Footer */}
        <footer className="pb-14 pt-10">
          <div className="rounded-3xl bg-white/4 p-8 ring-1 ring-white/10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-md">
                <div className="flex items-center gap-3">
                  <LogoMark className="size-11" />
                  <div>
                    <div className="text-sm font-semibold text-white">Fuzz’s Fun Factory</div>
                    <div className="text-xs text-white/55">Where good games become great nights.</div>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-white/65">
                  A curated gamer community with premium events, smarter LFG, and a culture you can
                  trust.
                </p>
              </div>

              <div className="grid gap-8 sm:grid-cols-3">
                <div>
                  <div className="text-sm font-semibold text-white">Explore</div>
                  <ul className="mt-3 space-y-2 text-sm text-white/65">
                    {[
                      ["Features", "#features"],
                      ["Showcase", "#showcase"],
                      ["Pricing", "#pricing"],
                      ["FAQ", "#faq"],
                    ].map(([label, href]) => (
                      <li key={href as string}>
                        <a className="hover:text-white" href={href as string}>
                          {label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Community</div>
                  <ul className="mt-3 space-y-2 text-sm text-white/65">
                    {["Code of conduct", "Events", "Giveaways", "Support"].map((label) => (
                      <li key={label}>
                        <a className="hover:text-white" href="#cta">
                          {label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Connect</div>
                  <ul className="mt-3 space-y-2 text-sm text-white/65">
                    {[
                      ["Join", "#cta"],
                      ["Tiers", "#pricing"],
                      ["FAQ", "#faq"],
                    ].map(([label, href]) => (
                      <li key={href as string}>
                        <a className="hover:text-white" href={href as string}>
                          {label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-xs text-white/55">
                © {new Date().getFullYear()} Fuzz’s Fun Factory. All rights reserved.
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-white/55">
                <span className="rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10">
                  Built mobile-first
                </span>
                <span className="rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10">
                  Accessible UI
                </span>
                <span className="rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10">
                  Reduced-motion friendly
                </span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
