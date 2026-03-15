import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-[#333333]">
      <Image
        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80"
        alt="Industrial manufacturing setting"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover"
        priority
      />
      <div className="absolute inset-0 bg-[#111827]/75" />

      <div className="relative mx-auto flex min-h-[calc(100vh-81px)] max-w-7xl items-center px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur">
            Established 1946 • Pittsburgh, Pennsylvania
          </div>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Pittsburgh&apos;s Pioneer Injection Moulders
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl">
            Precision plastics manufacturing since 1946. Serving top OEM companies
            with engineering, tool &amp; die, and full-service injection molding.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-[#990000] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#7a0000]"
            >
              Request a Quote
            </Link>
            <Link
              href="#services"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
            >
              Our Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
