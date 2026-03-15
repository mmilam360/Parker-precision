const materials = [
  "Polypropylene",
  "Polystyrene",
  "Nylons",
  "Thermoplastics",
  "Polyethylene",
  "Polycarbonates",
  "ABS and ABS/PC",
  "Glass and mineral filled materials",
  "Static conductive materials",
];

export function Materials() {
  return (
    <section id="materials" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#990000]">
            Materials
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Materials We Work With
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Material consultation available — we&apos;ll help you evaluate options
            to reduce cost while balancing strength, elongation, flex, and
            durability.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {materials.map((material) => (
            <span
              key={material}
              className="rounded-full border border-[#990000]/20 bg-[#990000]/5 px-5 py-3 text-sm font-medium text-gray-800"
            >
              {material}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
