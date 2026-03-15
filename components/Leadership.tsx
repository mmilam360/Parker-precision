import { UserCircleIcon } from "@heroicons/react/24/solid";

const team = [
  { name: "Diane Parker Moore", title: "President" },
  { name: "Kenneth Murin", title: "Plant Manager" },
  {
    name: "Wynn Thomas Hann",
    title: "Director of Operations / Q.C. Director",
  },
  { name: "Tara D'Agaro", title: "Accounting Department" },
];

export function Leadership() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#990000]">
            Leadership
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Our Team
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {team.map((member) => (
            <article
              key={member.name}
              className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-[#990000]">
                <UserCircleIcon className="h-14 w-14" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                {member.name}
              </h3>
              <p className="mt-3 text-sm font-medium uppercase tracking-wide text-gray-500">
                {member.title}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
