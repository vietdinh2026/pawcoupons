"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Coupons", subtle: false },
  { href: "/stores", label: "Stores", subtle: false },
  { href: "/categories", label: "Categories", subtle: false },
  { href: "/guides", label: "Guides", subtle: false },
  { href: "/submit", label: "Submit a Coupon", subtle: false },
  { href: "/admin", label: "Owner", subtle: true },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/20 bg-gradient-to-r from-brand-600 via-brand-700 to-slate-900 text-white shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-white"
        >
          <Image
            src="/icon.png"
            alt="PawCoupons"
            width={32}
            height={32}
            className="h-8 w-8 shrink-0 rounded-lg"
            priority
          />
          <span>
            Paw<span className="text-brand-100">Coupons</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 text-sm font-medium md:flex md:gap-2"
        >
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-2 text-white hover:bg-white/15 ${
                item.subtle ? "text-white/70" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile dropdown button */}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
          className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/20 md:hidden"
        >
          <span>Menu</span>
          <span className="text-xs">{open ? "▲" : "▼"}</span>
        </button>
      </div>

      {/* Mobile dropdown panel */}
      {open && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-white/15 bg-slate-900 px-4 py-3 shadow-md md:hidden"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-1 text-sm font-medium">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-white hover:bg-white/10 ${
                  item.subtle ? "text-white/70" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
