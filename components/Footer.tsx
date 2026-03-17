import Image from "next/image";
import Link from "next/link";
import { MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline";

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Materials", href: "#materials" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="bg-[#333333] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <Image
              src="/images/logo-text.jpg"
              alt="Parker Plastics Corporation"
              width={220}
              height={18}
              className="h-auto w-auto max-w-[220px] brightness-0 invert"
            />
            <p className="mt-4 max-w-xs text-sm leading-6 text-white/60">
              Pittsburgh&apos;s original injection moulder. Precision plastics
              manufacturing since 1946.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              Quick Links
            </p>
            <ul className="mt-5 flex flex-col gap-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/75 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              Contact Us
            </p>
            <div className="mt-5 space-y-4 text-sm text-white/75">
              <div className="flex items-start gap-3">
                <MapPinIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#990000]" />
                <span>3585 Valley Drive<br />Pittsburgh, PA 15234</span>
              </div>
              <div className="flex items-center gap-3">
                <PhoneIcon className="h-4 w-4 flex-shrink-0 text-[#990000]" />
                <a href="tel:4125616902" className="transition hover:text-white">
                  412.561.6902
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-center sm:flex-row sm:text-left sm:px-6 lg:px-8">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} Parker Plastics Corporation. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            Established 1946 &middot; Pittsburgh, Pennsylvania
          </p>
        </div>
      </div>
    </footer>
  );
}
