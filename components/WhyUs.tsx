import {
  BuildingOffice2Icon,
  WrenchScrewdriverIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

const stats = [
  {
    value: "80+",
    label: "Years in Business",
    sub: "Pittsburgh's original injection moulder, serving industry since 1946.",
    icon: BuildingOffice2Icon,
  },
  {
    value: "1 Roof",
    label: "Full In-House Capability",
    sub: "Engineering, tool & die, and production under one roof. Fewer handoffs, faster turnaround.",
    icon: WrenchScrewdriverIcon,
  },
  {
    value: "Fortune 500",
    label: "OEM Clients",
    sub: "Trusted by top OEM manufacturers to deliver precision, reliability, and cost-effective solutions.",
    icon: StarIcon,
  },
];

export function WhyUs() {
  return (
    <section id="about" className="bg-gray-100 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#990000]">
            Why Parker Plastics
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Built Different. Built to Last.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-900/65">
            Decades of expertise, proven processes, and a team that treats your
            program like it&apos;s their own.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.value}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-10 text-center transition-all duration-300 hover:border-[#990000]/40"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-[#990000]/20">
                  <Icon className="h-7 w-7 text-[#990000]" />
                </div>
                <p className="mt-6 text-5xl font-black tracking-tight text-[#990000]">
                  {item.value}
                </p>
                <p className="mt-2 text-lg font-bold text-gray-900">{item.label}</p>
                <p className="mt-3 text-sm leading-6 text-gray-500">{item.sub}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
