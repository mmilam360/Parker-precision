import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex h-[100dvh] flex-col overflow-hidden bg-[#111827]"
    >
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover object-[center_40%] md:object-center"
        style={{ filter: "brightness(0.7) saturate(0.9)" }}
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#333333]/50 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative mx-auto flex h-full w-full max-w-7xl flex-col items-start justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-3xl">
          {/* Badge */}
          <div className="animate-fade-in-up inline-flex max-w-full items-center rounded-full border border-[#990000]/50 bg-[#990000]/15 px-4 py-2 backdrop-blur-sm">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#990000] shadow-[0_0_8px_rgba(153,0,0,0.6)]" />
            <span className="ml-3 text-xs font-semibold tracking-wide text-white/90 sm:text-sm">
              Family-Owned Since 1994 &middot; Rostraver Township, Pennsylvania
            </span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-in-up animation-delay-100 mt-6 text-[2rem] font-black uppercase tracking-tight text-white sm:text-6xl lg:text-7xl lg:leading-[0.95]">
            Precision Injection Molding &amp; CNC Machining
            <br />
            <span className="bg-gradient-to-r from-[#990000] to-[#cc2200] bg-clip-text text-transparent">
              Southwest PA
            </span>
          </h1>

          {/* Subheadline */}
          <p className="animate-fade-in-up animation-delay-200 mt-5 max-w-2xl text-[0.95rem] leading-7 text-white/70 sm:text-xl sm:leading-8">
            Family-owned since 1994. Rostraver Township, PA. 40–150 ton capacity, in-house tooling, 30 years of customer-first manufacturing.
          </p>

          {/* CTAs */}
          <div className="animate-fade-in-up animation-delay-300 mt-6 sm:mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="#contact"
              className="animate-pulse-glow group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#990000] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#990000]/30 transition-all duration-300 hover:bg-[#7a0000] hover:shadow-xl hover:shadow-[#990000]/40 hover:scale-[1.02] sm:w-auto"
            >
              Get a Quote
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="#services"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/10 sm:w-auto"
            >
              Request Capacity
            </Link>
          </div>
        </div>
      </div>

      {/* Trust bar pinned to bottom */}
      <div className="animate-fade-in animation-delay-500 relative border-t border-white/10 bg-black/40 backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl grid-cols-2 items-center gap-2 px-4 py-4 sm:flex sm:flex-wrap sm:justify-start sm:gap-y-2 sm:px-6 lg:px-8">
          {[
            "30+ Years Experience",
            "40–150 Ton Press Capacity",
            "In-House Tool & Die",
            "24/7 Production",
          ].map((text, i) => (
            <span key={text} className="flex items-center gap-2 text-xs font-medium text-white/70 sm:text-sm">
              {i > 0 && <span className="hidden h-3 w-px bg-white/20 mx-3 sm:block" />}
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#990000]" />
              {text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
