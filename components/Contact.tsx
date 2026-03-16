"use client";

import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

export function Contact() {
  return (
    <section id="contact" className="bg-[#f9fafb] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#990000]">
            Get in Touch
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Request a Quote
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-600">
            Send us your project details and we&apos;ll follow up promptly.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left: Contact Info */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900">
                Parker Plastics Corporation
              </h3>
              <p className="mt-1 text-sm text-gray-500">Pittsburgh, Pennsylvania</p>

              <div className="mt-8 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#990000]/10">
                    <MapPinIcon className="h-5 w-5 text-[#990000]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Address</p>
                    <p className="mt-0.5 text-sm text-gray-600">
                      3585 Valley Drive<br />Pittsburgh, PA 15234
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#990000]/10">
                    <PhoneIcon className="h-5 w-5 text-[#990000]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Phone</p>
                    <a
                      href="tel:4125616902"
                      className="mt-0.5 block text-sm text-gray-600 transition hover:text-[#990000]"
                    >
                      412.561.6902
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#990000]/10">
                    <EnvelopeIcon className="h-5 w-5 text-[#990000]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Email</p>
                    <a
                      href="mailto:wynnthomas@parkerplasticscorp.com"
                      className="mt-0.5 block text-sm text-gray-600 transition hover:text-[#990000]"
                    >
                      wynnthomas@parkerplasticscorp.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map embed */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
              <iframe
                src="https://maps.google.com/maps?q=3585+Valley+Drive+Pittsburgh+PA+15234&output=embed"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Right: RFQ Form */}
          <form className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900">Submit RFQ</h3>
            <p className="mt-1 text-sm text-gray-500">
              Fill out the form and we&apos;ll be in touch within one business day.
            </p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-gray-700">
                  Name <span className="text-[#990000]">*</span>
                </span>
                <input
                  type="text"
                  required
                  placeholder="Jane Smith"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#990000] focus:ring-2 focus:ring-[#990000]/20"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-gray-700">
                  Company
                </span>
                <input
                  type="text"
                  placeholder="Acme Corporation"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#990000] focus:ring-2 focus:ring-[#990000]/20"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-gray-700">
                  Email <span className="text-[#990000]">*</span>
                </span>
                <input
                  type="email"
                  required
                  placeholder="jane@company.com"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#990000] focus:ring-2 focus:ring-[#990000]/20"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-gray-700">
                  Phone
                </span>
                <input
                  type="tel"
                  placeholder="412-000-0000"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#990000] focus:ring-2 focus:ring-[#990000]/20"
                />
              </label>
            </div>

            <label className="mt-5 block">
              <span className="mb-1.5 block text-sm font-semibold text-gray-700">
                Project Details
              </span>
              <textarea
                rows={5}
                placeholder="Describe your project, material preferences, quantities, and any relevant specifications..."
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#990000] focus:ring-2 focus:ring-[#990000]/20"
              />
            </label>

            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#990000] px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-[#990000]/25 transition hover:bg-[#7a0000] active:scale-[0.98]"
            >
              Send Request for Quote
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
