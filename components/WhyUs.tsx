import {
  BuildingOffice2Icon,
  WrenchScrewdriverIcon,
  ClockIcon,
  MapPinIcon,
  CubeTransparentIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const stats = [
  {
    value: "40–150T",
    label: "Press Capacity",
    sub: "Multiple presses covering 40 to 150 US tons — right-sized for your run, from small precision parts to larger structural components.",
    icon: CubeTransparentIcon,
  },
  {
    value: "24/7",
    label: "Production Capability",
    sub: "Machines running around the clock. When your program needs capacity, we deliver — days, nights, and weekends.",
    icon: ClockIcon,
  },
  {
    value: "1 Roof",
    label: "Full In-House Capability",
    sub: "Injection molding, CNC machining, and tool & die under one roof. Fewer handoffs, tighter control, faster turnaround.",
    icon: WrenchScrewdriverIcon,
  },
  {
    value: "80+",
    label: "Years in Business",
    sub: "Pittsburgh's original injection moulder since 1946. Decades of process knowledge built into every program we run.",
    icon: BuildingOffice2Icon,
  },
  {
    value: "Local",
    label: "Pittsburgh Region",
    sub: "Belle Vernon, PA — in the heart of southwestern Pennsylvania. Fast turnaround, local relationships, responsive service.",
    icon: MapPinIcon,
  },
  {
    value: "Every",
    label: "Industry Served",
    sub: "Firearms, defense, automotive, utilities, medical, and industrial. If it's made from plastic, we've likely run it.",
    icon: UsersIcon,
  },
];

export function WhyUs() {
  return (
    <section id="about" className="relative overflow-hidden bg-[#1a1a1a] py-20 sm:py-28">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#990000]">
            Why Parker Plastics
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Built Different. Built to Last.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/50">
            Real capacity, real craftsmen, real Pittsburgh. Here&apos;s what makes us different.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm transition-all duration-300 hover:border-[#990000]/40 hover:bg-white/[0.08] hover:-translate-y-1"
              >
                {/* Glow effect on hover */}
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-[#990000]/0 to-[#990000]/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:from-[#990000]/10 group-hover:to-transparent" />

                <div className="relative">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-[#990000]/15 ring-1 ring-[#990000]/20 transition-all duration-300 group-hover:bg-[#990000]/25 group-hover:ring-[#990000]/40">
                    <Icon className="h-7 w-7 text-[#990000]" />
                  </div>
                  <p className="mt-5 text-4xl font-black tracking-tight text-[#990000]">
                    {item.value}
                  </p>
                  <p className="mt-1.5 text-lg font-bold text-white">{item.label}</p>
                  <p className="mt-3 text-sm leading-6 text-white/50">{item.sub}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
