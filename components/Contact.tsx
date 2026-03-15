"use client";

import { Mail, MapPin, Phone } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="bg-[#f3f4f6] py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#990000]">
            Contact
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Request a Quote
          </h2>
          <div className="mt-8 space-y-6 text-gray-700">
            <div>
              <p className="text-xl font-semibold text-gray-900">
                Parker Plastics Corporation
              </p>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 text-[#990000]" />
              <p>3585 Valley Drive, Pittsburgh, PA 15234</p>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-5 w-5 text-[#990000]" />
              <a href="tel:4125616902" className="transition hover:text-[#990000]">
                412.561.6902
              </a>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 text-[#990000]" />
              <a
                href="mailto:wynnthomas@parkerplasticscorp.com"
                className="transition hover:text-[#990000]"
              >
                wynnthomas@parkerplasticscorp.com
              </a>
            </div>
          </div>
        </div>

        <form className="rounded-3xl bg-white p-8 shadow-sm">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-gray-700">
                Name
              </span>
              <input
                type="text"
                required
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-[#990000] focus:ring-2 focus:ring-[#990000]/20"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-gray-700">
                Company
              </span>
              <input
                type="text"
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-[#990000] focus:ring-2 focus:ring-[#990000]/20"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-gray-700">
                Email
              </span>
              <input
                type="email"
                required
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-[#990000] focus:ring-2 focus:ring-[#990000]/20"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-gray-700">
                Phone
              </span>
              <input
                type="tel"
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-[#990000] focus:ring-2 focus:ring-[#990000]/20"
              />
            </label>
          </div>

          <label className="mt-6 block">
            <span className="mb-2 block text-sm font-medium text-gray-700">
              Project Description
            </span>
            <textarea
              rows={6}
              className="w-full rounded-3xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-[#990000] focus:ring-2 focus:ring-[#990000]/20"
            />
          </label>

          <button
            type="submit"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-[#990000] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#7a0000]"
          >
            Send Request
          </button>
        </form>
      </div>
    </section>
  );
}
