"use client";

import Image from "next/image";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Materials", href: "#materials" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#333333] shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="#top" className="flex items-center" onClick={() => setIsOpen(false)}>
          <Image
            src="/images/parker-logo.png"
            alt="Parker Precision Molding, Inc."
            width={220}
            height={60}
            className="h-14 w-auto"
            style={{ background: "transparent", filter: "brightness(0) invert(1) sepia(1) saturate(2) hue-rotate(300deg)" }}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/80 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="#contact"
            className="rounded-lg bg-[#990000] px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-[#990000]/30 transition hover:bg-[#7a0000]"
          >
            Get a Quote
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Toggle navigation"
          className="rounded-lg border border-white/20 p-2 text-white lg:hidden"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? (
            <XMarkIcon className="h-5 w-5" />
          ) : (
            <Bars3Icon className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="border-t border-white/10 bg-[#2a2a2a] lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#contact"
              className="mt-2 rounded-lg bg-[#990000] px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-[#7a0000]"
              onClick={() => setIsOpen(false)}
            >
              Get a Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
