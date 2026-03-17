import {
  ShieldCheckIcon,
  TruckIcon,
  BoltIcon,
  HeartIcon,
  ShoppingBagIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";

const industries = [
  {
    name: "Firearms & Defense",
    description: "Precision components for firearms manufacturers and defense contractors. Tight tolerances, consistent quality, zero compromises.",
    icon: ShieldCheckIcon,
  },
  {
    name: "Automotive & Transportation",
    description: "Durable plastic components for automotive OEMs and Tier 1/2 suppliers. High-volume runs, spec-compliant, on-time delivery.",
    icon: TruckIcon,
  },
  {
    name: "Utilities & Infrastructure",
    description: "Rugged parts for utility companies and infrastructure projects. Built to perform in demanding field conditions.",
    icon: BoltIcon,
  },
  {
    name: "Medical & Industrial",
    description: "Clean, consistent production for medical device and industrial equipment manufacturers. Quality systems that meet your compliance needs.",
    icon: HeartIcon,
  },
  {
    name: "Consumer Products",
    description: "From short-run prototypes to full production, we support consumer product brands that need reliable plastic components at scale.",
    icon: ShoppingBagIcon,
  },
  {
    name: "OEM Manufacturing",
    description: "Overflow production and contract manufacturing for OEMs and larger molding companies. We run your program when you need the capacity.",
    icon: CpuChipIcon,
  },
];

export function Industries() {
  return (
    <section id="industries" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#990000]">
            Industries
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Who We Serve
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            From firearms to automotive to medical — if your business runs on precision plastic parts, Parker Precision Molding has the capability and capacity to support it.
          </p>
        </div>

        <div className="mt-10 grid sm:mt-14 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => {
            const Icon = industry.icon;
            return (
              <div
                key={industry.name}
                className="group flex items-start gap-4 rounded-2xl border border-gray-100 bg-[#fafafa] p-5 transition-all duration-300 hover:border-[#990000]/20 hover:bg-white hover:shadow-md hover:-translate-y-0.5 sm:gap-5 sm:p-7"
              >
                <div className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#990000]/10 ring-1 ring-[#990000]/20 transition-all duration-300 group-hover:bg-[#990000] group-hover:ring-[#990000]">
                  <Icon className="h-6 w-6 text-[#990000] transition-colors duration-300 group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">{industry.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{industry.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
