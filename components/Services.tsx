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

  useEffect(() => {
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
      // progress: 0 when top of section hits bottom of viewport, 1 when bottom of section leaves top
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
    };
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative bg-[#0d0d0d] py-20 sm:py-28 overflow-hidden"
    >
      {/* Maroon radial glow behind the 3D part */}
      <div
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-[50%] h-[80%] hidden lg:block"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(153,0,0,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Desktop: two-column layout */}
        <div className="lg:flex lg:items-center lg:gap-12">
          {/* Left: text + cards */}
          <div className="lg:w-[58%]">
            <div className="max-w-2xl">
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
            </div>

            {/* Mobile: 3D part above cards */}
            <div className="lg:hidden mt-8 mx-auto w-[260px] h-[260px]">
              <PartViewer scrollProgress={scrollProgress} visible={visible} />
            </div>

            <div className="mt-10 grid sm:mt-14 gap-5 sm:grid-cols-2">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <article
                    key={service.title}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 transition-all duration-300 hover:border-[#990000]/50 hover:bg-white/8 hover:-translate-y-1"
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

          {/* Right: 3D part (desktop only) */}
          <div className="hidden lg:flex lg:w-[42%] items-center justify-center">
            <div className="w-[420px] h-[520px]">
              <PartViewer scrollProgress={scrollProgress} visible={visible} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
