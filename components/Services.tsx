"use client";

import {
  WrenchScrewdriverIcon,
  CogIcon,
  AdjustmentsHorizontalIcon,
  CpuChipIcon,
  BeakerIcon,
  CubeIcon,
} from "@heroicons/react/24/outline";

const services = [
  {
    title: "Plastic Injection Molding",
    description:
      "40–150 ton presses for short and long production runs. Tight tolerances, consistent quality, and the capacity to scale with your program. Serving OEMs and manufacturers across every major industry.",
    icon: CubeIcon,
    num: "01",
  },
  {
    title: "CNC Machining",
    description:
      "Added in 2018 — in-house CNC machining allows us to process extra steps directly on injection molded parts and take on standalone precision machining work without sending anything outside.",
    icon: CpuChipIcon,
    num: "02",
  },
  {
    title: "Tool & Die",
    description:
      "In-house certified journeymen handle mold design, fabrication, repair, and modification on-site. No outsourcing means faster turnaround and tighter control over your tooling.",
    icon: CogIcon,
    num: "03",
  },
  {
    title: "Sampling & Troubleshooting",
    description:
      "Our specialty since day one — new projects, complex parts, and helping OEMs bring products to market efficiently. We've been solving difficult molding problems for 30+ years.",
    icon: BeakerIcon,
    num: "04",
  },
  {
    title: "Contract Manufacturing",
    description:
      "Higher-volume production runs and overflow capacity for larger molding companies and OEMs. Machines running 24/7 means we can absorb your overflow and keep your supply chain moving.",
    icon: WrenchScrewdriverIcon,
    num: "05",
  },
  {
    title: "Assembly & Secondary Operations",
    description:
      "Complete in-house finishing, assembly, and secondary operations. Parts leave our facility ready to install or ship — no additional vendors, no extra handoffs.",
    icon: AdjustmentsHorizontalIcon,
    num: "06",
  },
];

export function Services() {
  return (
    <section id="services" className="bg-[#0d0d0d] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#990000]">
          Capabilities
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          What We Do
        </h2>
        <p className="mt-4 text-lg leading-8 text-gray-400 max-w-2xl">
          Parker Precision Molding is a one-stop shop — injection molding, CNC
          machining, and in-house tooling all under one roof in
          Rostraver Township, PA.
        </p>

        <div className="mt-10 sm:mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#161616] p-5 transition-all duration-300 hover:border-[#990000]/50 hover:bg-[#1a1a1a] hover:-translate-y-1"
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
    </section>
  );
}
