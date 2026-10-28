import { Reveal } from "./Reveal";

export function CTA() {
  return (
    <section id="join" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal direction="scale">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-violet-600/30 via-fuchsia-600/20 to-cyan-500/20 px-6 py-16 text-center shadow-2xl sm:px-16 sm:py-24">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-violet-500/40 blur-[100px] animate-pulse-glow" />
              <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-cyan-400/30 blur-[100px] animate-pulse-glow" />
              <div className="absolute inset-0 bg-grid opacity-20" />
            </div>

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                Free forever &middot; No credit card
              </span>
              <h2 className="mx-auto mt-6 max-w-2xl font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
                Stop queuing alone. Start playing with your people.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">
                Join 25,000+ gamers already inside Fuzz's Fun Factory. It takes 30 seconds, and
                tonight's game night is already filling up.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="#"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-9 py-4 text-sm font-bold text-ink shadow-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M20.317 4.369a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.127c-.598.35-1.22.645-1.873.893a.076.076 0 0 0-.04.106c.36.698.772 1.364 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.673-3.549-13.66a.061.061 0 0 0-.031-.028ZM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.418 0 1.334-.955 2.419-2.157 2.419Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.418 0 1.334-.946 2.419-2.157 2.419Z" />
                  </svg>
                  Join on Discord — It's Free
                </a>
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-9 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Compare plans
                </a>
              </div>

              <div className="mt-10 flex items-center justify-center -space-x-3">
                {["from-violet-500 to-fuchsia-500", "from-cyan-400 to-blue-500", "from-lime-400 to-emerald-500", "from-amber-400 to-orange-500", "from-fuchsia-500 to-pink-500"].map(
                  (c, i) => (
                    <span
                      key={i}
                      className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink bg-gradient-to-br ${c} text-[10px] font-bold text-ink`}
                    >
                      {String.fromCharCode(65 + i)}
                    </span>
                  )
                )}
                <span className="pl-5 text-xs font-medium text-white/60">Joined by 1,204 gamers this week</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
