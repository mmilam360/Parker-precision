import { UserCircleIcon } from "@heroicons/react/24/solid";

const team = [
  {
    name: "Blake Parker",
    title: "Founder",
    note: "Nearly 40 years of molding experience. Founded Parker Precision Molding in 1994 with Linda Parker. His legacy and expertise remain the foundation of everything we do.",
  },
  {
    name: "Linda Parker",
    title: "Co-Founder",
    note: "Co-founded the company alongside Blake in 1994. After Blake's passing, Linda and the family kept his vision alive and continued building the business he started.",
  },
  {
    name: "Mitchell Parker",
    title: "Operations",
    note: "Blake's son. Continuing the family legacy — keeping the machines running, the customers close, and the quality that Blake built into the business from day one.",
  },
];

export function Leadership() {
  return (
    <section id="team" className="bg-[#fafafa] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#990000]">
            Our Story
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Blake Parker&apos;s Legacy
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Parker Precision Molding was founded in 1994 by Blake Parker — a craftsman with nearly 40 years in injection molding. After his passing, the family kept his business alive. Over 20 years later, we&apos;re still running.
          </p>
        </div>

        <div className="mt-10 grid sm:mt-14 gap-8 sm:grid-cols-3">
          {team.map((member) => (
            <div
              key={member.name}
              className="group flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:border-[#990000]/30 hover:shadow-md hover:-translate-y-0.5 sm:p-8"
            >
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-[#990000]/10 ring-4 ring-[#990000]/10 transition-all duration-300 group-hover:ring-[#990000]/30">
                <UserCircleIcon className="h-16 w-16 text-[#990000]/70" />
              </div>
              <h3 className="mt-6 text-lg font-bold text-gray-900">
                {member.name}
              </h3>
              <p className="mt-2 text-sm font-medium uppercase tracking-wide text-[#990000]">
                {member.title}
              </p>
              <p className="mt-4 text-sm leading-6 text-gray-500">{member.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
