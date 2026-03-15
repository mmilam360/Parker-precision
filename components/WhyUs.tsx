import { BuildingOffice2, Factory, ShieldCheck } from "lucide-react";

const differentiators = [
  {
    title: "Since 1946",
    description:
      "Pittsburgh's original injection moulder. 80 years of manufacturing expertise in the Steel City.",
    icon: Factory,
  },
  {
    title: "Full In-House Capability",
    description:
      "Engineering through tool and die under one roof. Less coordination, faster turnaround, fewer handoffs.",
    icon: BuildingOffice2,
  },
  {
    title: "OEM Trusted",
    description:
      "Serving top OEM companies with cost-effective solutions, reliable quality, and responsive service.",
    icon: ShieldCheck,
  },
];

export function WhyUs() {
  return (
    <section id="about" className="bg-[#333333] py-20 text-white sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f4b4b4]">
            Why Parker Plastics
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Why Parker Plastics
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {differentiators.map((item, index) => {
            const Icon = item.icon;
            const stat = index === 0 ? "80 Years" : index === 1 ? "One Roof" : "Top OEMs";

            return (
              <article
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-8"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#990000] text-white">
                    <Icon className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">{stat}</p>
                    <h3 className="text-lg font-medium text-white/85">{item.title}</h3>
                  </div>
                </div>
                <p className="mt-6 text-base leading-7 text-white/75">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
