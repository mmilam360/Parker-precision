"use client";

import {
  WrenchScrewdriverIcon,
  CogIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";

const services = [
  {
    title: "Engineering",
    description:
      "From reverse engineering to mold design and modification — our engineering team supports your project at every stage. We work with top OEM companies to deliver precision and reliability.",
    icon: WrenchScrewdriverIcon,
  },
  {
    title: "Tool & Die",
    description:
      "Full-service in-house tool and die shop with certified journeymen. CNC machines, lathes, mills, and grinders on-site — minimizing downtime and keeping your production on schedule.",
    icon: CogIcon,
  },
  {
    title: "Secondary Operations",
    description:
      "Complete secondary operations on finished products to ensure the best quality. We handle the details so your parts arrive ready to use.",
    icon: AdjustmentsHorizontalIcon,
  },
];

export function Services() {
  return (
    <section id="services" className="bg-gray-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#990000]">
            Capabilities
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What We Do
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Parker Plastics supports B2B manufacturing programs with integrated
            engineering, tooling, and production expertise — all under one roof.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.title}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-[#990000]/40 hover:shadow-md"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#990000] text-white shadow-lg shadow-[#990000]/20">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-900">
                  {service.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-gray-600">
                  {service.description}
                </p>
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#990000] transition-all duration-300 group-hover:w-full" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
