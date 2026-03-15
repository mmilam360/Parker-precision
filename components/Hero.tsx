import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-screen flex-col overflow-hidden bg-[#111827]"
    >
      {/* Background image */}
      <Image
        src="/images/hero-factory.jpg"
        alt="Parker Plastics injection molding facility"
        fill
        sizes="100vw"
        className="absolute inset-0 object-cover opacity-40"
        priority
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#111827]/95 via-[#111827]/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />

      {/* Content */}
      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 py-32 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full border border-[#990000]/40 bg-[#990000]/10 px-4 py-1.5 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[#990000]" />
            <span className="ml-2 text-sm font-semibold text-white/90">
              Established 1946 · Pittsburgh, Pennsylvania
            </span>
          </div>

          {/* Headline */}
          <h1 className="mt-8 text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
            Pittsburgh&apos;s Pioneer
            <br />
            <span className="text-[#990000]">Injection Moulders</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70 sm:text-xl">
            Precision plastics manufacturing since 1946. Serving top OEM companies
            with engineering, tool &amp; die, and full-service injection molding —
            all under one roof.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#990000] px-7 py-4 text-base font-bold text-white shadow-lg shadow-[#990000]/30 transition hover:bg-[#7a0000] hover:shadow-xl hover:shadow-[#990000]/40"
            >
              Request a Quote
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link
              href="#services"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 px-7 py-4 text-base font-semibold text-white transition hover:border-white/50 hover:bg-white/10"
            >
              View Capabilities
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap gap-6 text-sm text-white/50">
            <span>✦ 80+ Years Experience</span>
            <span>✦ In-House Tool & Die</span>
            <span>✦ Fortune 500 OEM Clients</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative mx-auto flex w-full max-w-7xl justify-center pb-10">
        <a
          href="#services"
          className="flex flex-col items-center gap-1 text-white/30 transition hover:text-white/60"
          aria-label="Scroll down"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDownIcon className="h-5 w-5 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
