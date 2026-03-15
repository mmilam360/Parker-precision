"use client";

import Image from "next/image";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Materials", href: "#materials" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#333333] text-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="#top" className="flex items-center">
          <Image
            src="/images/logo-text.jpg"
            alt="Parker Plastics Corporation"
            width={240}
            height={18}
            className="hidden h-auto w-auto max-w-[240px] sm:block"
            priority
          />
          <Image
            src="/images/logo-icon.jpg"
            alt="Parker Plastics Corporation icon"
            width={48}
            height={48}
            className="h-12 w-12 rounded sm:hidden"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/85 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="#contact"
            className="rounded-full bg-[#990000] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#7a0000]"
          >
            Get a Quote
          </Link>
        </nav>

        <button
          type="button"
          aria-label="Toggle navigation"
          className="rounded-full border border-white/20 p-2 text-white lg:hidden"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {isOpen ? (
        <div className="border-t border-white/10 bg-[#333333] lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-white/85 transition hover:bg-white/10 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#contact"
              className="mt-2 rounded-full bg-[#990000] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#7a0000]"
              onClick={() => setIsOpen(false)}
            >
              Get a Quote
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
