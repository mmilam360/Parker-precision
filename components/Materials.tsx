import { BeakerIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

const materials = [
  "Polypropylene",
  "Polystyrene",
  "Nylons",
  "Thermoplastics",
  "Polyethylene",
  "Polycarbonates",
  "ABS & ABS/PC",
  "Glass & Mineral Filled",
  "Static Conductive",
];

export function Materials() {
  return (
    <section id="materials" className="bg-[#f9fafb] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#990000]">
            Materials
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Materials We Work With
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-gray-600">
            From commodity resins to engineered materials — we have the expertise
            to evaluate options for your application.
          </p>
        </div>

        <div className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-3">
          {materials.map((material) => (
            <span
              key={material}
              className="inline-flex items-center gap-2 rounded-full border border-[#990000]/25 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800 shadow-sm transition-all duration-200 hover:border-[#990000] hover:bg-[#990000]/5 hover:text-[#990000]"
            >
              <BeakerIcon className="h-4 w-4 text-[#990000]" />
              {material}
            </span>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-[#990000]/20 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#990000]/10">
            <ChatBubbleLeftRightIcon className="h-6 w-6 text-[#990000]" />
          </div>
          <h3 className="mt-4 text-lg font-bold text-gray-900">
            Material Consultation Available
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-base text-gray-600">
            We&apos;ll help you evaluate options to reduce cost while balancing
            strength, elongation, flex, and durability.
          </p>
          <a
            href="#contact"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-[#990000] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#7a0000]"
          >
            Talk to an Engineer
          </a>
        </div>
      </div>
    </section>
  );
}
