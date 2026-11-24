"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/faq";

export default function StoreFaq({
  title,
  items,
}: {
  title: string;
  items: FaqItem[];
}) {
  const [open, setOpen] = useState<number | null>(0);

  if (items.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-extrabold">{title}</h2>
      <div className="mt-4 space-y-3">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div
              key={item.question}
              className="overflow-hidden rounded-2xl border bg-white"
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-slate-900 hover:bg-slate-50"
              >
                <span>{item.question}</span>
                <span
                  aria-hidden
                  className={`shrink-0 text-lg text-brand-600 transition-transform ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              {isOpen && (
                <p className="border-t px-5 py-4 leading-relaxed text-slate-600">
                  {item.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
