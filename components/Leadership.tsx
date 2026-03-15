import { UserCircleIcon } from "@heroicons/react/24/solid";

const team = [
  { name: "Diane Parker Moore", title: "President" },
  { name: "Kenneth Murin", title: "Plant Manager" },
  {
    name: "Wynn Thomas Hann",
    title: "Director of Operations & Q.C.",
  },
  { name: "Tara D'Agaro", title: "Accounting Department" },
];

export function Leadership() {
  return (
    <section id="team" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#990000]">
            Leadership
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            The Team Behind the Work
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-600">
            Experienced people who know manufacturing — and know how to get it
            done right.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {team.map((member) => (
            <div
              key={member.name}
              className="group flex flex-col items-center rounded-2xl border border-gray-100 bg-gray-50 p-8 text-center shadow-sm transition-all duration-300 hover:border-[#990000]/30 hover:shadow-md"
            >
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-[#990000]/10 ring-4 ring-[#990000]/10 transition-all duration-300 group-hover:ring-[#990000]/30">
                <UserCircleIcon className="h-16 w-16 text-[#990000]/70" />
              </div>
              <h3 className="mt-6 text-lg font-bold text-gray-900">
                {member.name}
              </h3>
              <p className="mt-2 text-sm font-medium uppercase tracking-wide text-gray-500">
                {member.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
