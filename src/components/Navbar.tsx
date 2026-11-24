"use client";

import { useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Coupons", subtle: false },
  { href: "/stores", label: "Stores", subtle: false },
  { href: "/guides", label: "Guides", subtle: false },
  { href: "/submit", label: "Submit a Coupon", subtle: false },
  { href: "/admin", label: "Owner", subtle: true },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="text-2xl font-extrabold tracking-tight text-brand-600"
        >
          Deal<span className="text-slate-900">Nest</span>
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
              className={`rounded-lg px-3 py-2 hover:bg-slate-100 ${
                item.subtle ? "text-slate-500" : ""
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
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100 md:hidden"
        >
          <span>Menu</span>
          <span className="text-xs">{open ? "▲" : "▼"}</span>
        </button>
      </div>

      {/* Mobile dropdown panel */}
      {open && (
        <nav
          aria-label="Mobile navigation"
          className="border-t bg-white px-4 py-3 shadow-md md:hidden"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-1 text-sm font-medium">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-2.5 hover:bg-slate-100 ${
                  item.subtle ? "text-slate-500" : "text-slate-800"
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
