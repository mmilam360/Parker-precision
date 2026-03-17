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
  return (
    <section id="services" className="bg-[#fafafa] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#990000]">
            Capabilities
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What We Do
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Parker Plastics is a one-stop shop — injection molding, CNC machining, and in-house tooling all under one roof in the Pittsburgh region.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.title}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-[#990000]/30 hover:shadow-lg hover:-translate-y-1 sm:p-8"
              >
                {/* Step number watermark */}
                <span className="absolute -right-2 -top-4 text-8xl font-black text-gray-100 transition-colors duration-300 group-hover:text-[#990000]/10">
                  {service.num}
                </span>

                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#990000] text-white shadow-lg shadow-[#990000]/20 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-gray-900">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-gray-600">
                    {service.description}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#990000] to-[#cc2200] transition-all duration-500 group-hover:w-full" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
