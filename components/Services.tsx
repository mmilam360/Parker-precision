"use client";

import {
  WrenchScrewdriverIcon,
  CogIcon,
  AdjustmentsHorizontalIcon,
  CpuChipIcon,
  BeakerIcon,
  CubeIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const PartViewer = dynamic(() => import("./PartViewer"), { ssr: false });

const services = [
  {
    title: "Plastic Injection Molding",
    description:
      "40–150 ton press range for short and long production runs. Tight tolerances, consistent quality, and the capacity to scale with your program. Serving OEMs and manufacturers across every major industry.",
    icon: CubeIcon,
    num: "01",
  },
  {
    title: "CNC Machining",
    description:
      "Precision CNC machining from prototyping through full production runs. In-house lathes, mills, and grinders deliver the accuracy your parts demand — without sending work outside.",
    icon: CpuChipIcon,
    num: "02",
  },
  {
    title: "Tool & Die",
    description:
      "Full-service in-house tool and die shop staffed by certified journeymen. Mold design, fabrication, and repair on-site — minimizing downtime and keeping your production on schedule.",
    icon: CogIcon,
    num: "03",
  },
  {
    title: "Engineering & Design",
    description:
      "Reverse engineering, mold design, and OEM partnerships. Our team supports your project from concept to production, working directly with your engineers to solve problems before they cost time.",
    icon: WrenchScrewdriverIcon,
    num: "04",
  },
  {
    title: "Prototyping",
    description:
      "Fast-turn prototyping for new product development. Get parts in hand quickly to validate your design before committing to full tooling — reducing risk and accelerating your timeline.",
    icon: BeakerIcon,
    num: "05",
  },
  {
    title: "Secondary Operations",
    description:
      "Complete secondary operations including finishing, assembly, and quality inspection. We handle the details so your parts arrive ready to install or ship — no additional vendors needed.",
    icon: AdjustmentsHorizontalIcon,
    num: "06",
  },
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
    const onResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", onResize);

    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(section);

    const onScroll = () => {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;
      const sectionH = section.offsetHeight;
      const progress = Math.max(
        0,
        Math.min(1, (windowH - rect.top) / (windowH + sectionH))
      );
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative bg-[#0d0d0d] overflow-hidden"
    >
      {/* Desktop only: Full-bleed 3D part as background */}
      {!isMobile && (
        <>
          <div className="absolute inset-0 w-full h-full z-0">
            <PartViewer scrollProgress={scrollProgress} visible={visible} isMobile={false} />
          </div>
          {/* Dark gradient overlay — left side for text readability */}
          <div
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{
              background:
                "linear-gradient(to right, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.55) 55%, transparent 100%)",
            }}
          />
        </>
      )}

      {/* Mobile: part at top, fixed height, then cards below */}
      {isMobile && (
        <div className="relative z-10 w-full" style={{ height: 240 }}>
          <PartViewer scrollProgress={scrollProgress} visible={visible} isMobile={true} />
        </div>
      )}

      {/* Content */}
      <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 ${isMobile ? "py-10" : "py-20 sm:py-28"}`}>
        <div className="lg:w-[60%]">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#990000]">
            Capabilities
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            What We Do
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-400">
            Parker Plastics is a one-stop shop — injection molding, CNC
            machining, and in-house tooling all under one roof in the
            Pittsburgh region.
          </p>

          <div className="mt-10 grid sm:mt-14 gap-5 sm:grid-cols-2">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.title}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d]/70 backdrop-blur-sm p-5 transition-all duration-300 hover:border-[#990000]/50 hover:bg-[#0d0d0d]/80 hover:-translate-y-1"
                >
                  {/* Step number watermark */}
                  <span className="absolute -right-2 -top-4 text-8xl font-black text-white/5 transition-colors duration-300 group-hover:text-[#990000]/15">
                    {service.num}
                  </span>

                  <div className="relative">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#990000] text-white shadow-lg shadow-[#990000]/30 transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-white">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-gray-400">
                      {service.description}
                    </p>
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#990000] to-[#cc2200] transition-all duration-500 group-hover:w-full" />
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
