import { useEffect, useState } from "react";
import { cn } from "../utils/cn";

const LINKS = [
  { label: "Features", href: "#features" },
  { label: "Showcase", href: "#showcase" },
  { label: "Benefits", href: "#benefits" },
  { label: "Stories", href: "#testimonials" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-2.5" : "py-5"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "flex items-center justify-between rounded-2xl border px-4 py-2.5 transition-all duration-500 sm:px-5",
            scrolled
              ? "border-white/10 bg-ink/80 shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl"
              : "border-transparent bg-transparent"
          )}
        >
          <a href="#top" className="group flex items-center gap-2.5">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 shadow-lg shadow-fuchsia-500/30 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
              <span className="text-base font-black text-ink">F</span>
            </span>
            <span className="font-display text-sm font-bold tracking-tight text-white sm:text-base">
              Fuzz's <span className="text-gradient">Fun Factory</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-white/70 transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="#pricing"
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              Sign in
            </a>
            <a
              href="#join"
              className="group relative overflow-hidden rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink shadow-[0_0_0_0_rgba(168,85,247,0)] transition-all duration-300 hover:shadow-[0_0_30px_0_rgba(168,85,247,0.5)]"
            >
              <span className="relative z-10">Join the Factory</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-300 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-white lg:hidden"
          >
            <div className="relative h-4 w-5">
              <span
                className={cn(
                  "absolute left-0 top-0 h-0.5 w-5 rounded-full bg-white transition-all duration-300",
                  open && "top-1.5 rotate-45"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1.5 h-0.5 w-5 rounded-full bg-white transition-all duration-300",
                  open && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-3 h-0.5 w-5 rounded-full bg-white transition-all duration-300",
                  open && "top-1.5 -rotate-45"
                )}
              />
            </div>
          </button>
        </div>
      </div>

      <div
        className={cn(
          "fixed inset-x-4 top-20 z-40 origin-top rounded-2xl border border-white/10 bg-surface/95 p-4 shadow-2xl backdrop-blur-xl transition-all duration-300 lg:hidden",
          open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        )}
      >
        <nav className="flex flex-col gap-1">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-4 py-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#join"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-lg bg-gradient-to-r from-violet-500 to-cyan-400 px-4 py-3 text-center text-sm font-semibold text-ink"
          >
            Join the Factory
          </a>
        </nav>
      </div>
    </header>
  );
}
