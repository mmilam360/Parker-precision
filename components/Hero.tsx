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
          <div className="animate-fade-in-up inline-flex items-center rounded-full border border-[#990000]/50 bg-[#990000]/15 px-5 py-2 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-[#990000] shadow-[0_0_8px_rgba(153,0,0,0.6)]" />
            <span className="ml-3 text-sm font-semibold tracking-wide text-white/90">
              Established 1946 &middot; Pittsburgh Region, Pennsylvania
            </span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-in-up animation-delay-100 mt-6 text-4xl font-black uppercase tracking-tight text-white sm:text-6xl lg:text-7xl lg:leading-[0.95]">
            Injection Molding &amp; CNC Machining
            <br />
            <span className="bg-gradient-to-r from-[#990000] to-[#cc2200] bg-clip-text text-transparent">
              Pittsburgh Region
            </span>
          </h1>

          {/* Subheadline */}
          <p className="animate-fade-in-up animation-delay-200 mt-5 max-w-2xl text-base leading-7 text-white/70 sm:text-xl sm:leading-8">
            40–150 ton capacity. In-house tooling. Serving firearms, defense, automotive, and virtually every industry — family-owned since 1946.
          </p>

          {/* CTAs */}
          <div className="animate-fade-in-up animation-delay-300 mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:mt-10">
            <Link
              href="#contact"
              className="animate-pulse-glow group inline-flex items-center justify-center gap-2 rounded-xl bg-[#990000] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#990000]/30 transition-all duration-300 hover:bg-[#7a0000] hover:shadow-xl hover:shadow-[#990000]/40 hover:scale-[1.02]"
            >
              Request a Quote
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#990000]/50 bg-[#990000]/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-[#990000]/80 hover:bg-[#990000]/20"
            >
              Request Capacity
            </Link>
            <Link
              href="#services"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/10"
            >
              View Capabilities
            </Link>
          </div>
        </div>
      </div>

      {/* Trust bar pinned to bottom */}
      <div className="animate-fade-in animation-delay-500 relative border-t border-white/10 bg-black/40 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 py-4 sm:justify-start sm:px-6 lg:px-8">
          {[
            { icon: "◆", text: "80+ Years Experience" },
            { icon: "◆", text: "40–150 Ton Press Capacity" },
            { icon: "◆", text: "In-House Tool & Die" },
            { icon: "◆", text: "24/7 Production" },
          ].map((item) => (
            <span
              key={item.text}
              className="flex items-center gap-2 text-sm font-medium text-white/70"
            >
              <span className="text-[8px] text-[#990000]">{item.icon}</span>
              {item.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
