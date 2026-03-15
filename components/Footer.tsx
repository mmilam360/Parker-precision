import Image from "next/image";
import Link from "next/link";

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Materials", href: "#materials" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="bg-[#333333] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <div className="flex items-center gap-4">
            <Image
              src="/images/logo-icon.jpg"
              alt="Parker Plastics logo icon"
              width={56}
              height={56}
              className="rounded"
            />
            <div>
              <p className="text-lg font-semibold">Parker Plastics Corporation</p>
              <p className="text-sm text-white/70">Established 1946</p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
            Navigation
          </p>
          <div className="mt-4 flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white/80 transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
            Contact
          </p>
          <div className="mt-4 space-y-3 text-white/80">
            <p>3585 Valley Drive, Pittsburgh, PA 15234</p>
            <p>412.561.6902</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-6 text-sm text-white/60 sm:px-6 lg:px-8">
          © 2025 Parker Plastics Corporation. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
