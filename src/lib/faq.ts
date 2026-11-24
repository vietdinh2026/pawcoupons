import { formatDiscount } from "./data";
import type { Coupon, Store } from "./types";

export interface FaqItem {
  question: string;
  answer: string;
}

function formatExpiry(expiresAt: string | null): string | null {
  if (!expiresAt) return null;
  const d = new Date(expiresAt);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Build the FAQ for a store page from the store's LIVE coupons, so the
 * answers never go stale: when a code changes or expires, the FAQ
 * changes with it (pages render with revalidate = 0). No invented
 * store facts — anything not in the coupon data is answered honestly
 * as "depends on the store's terms".
 */
export function buildStoreFaq(store: Store, coupons: Coupon[]): FaqItem[] {
  const items: FaqItem[] = [];
  const best = [...coupons].sort(
    (a, b) => (b.discount_value ?? 0) - (a.discount_value ?? 0)
  )[0];

  if (best) {
    const expiry = formatExpiry(best.expires_at);
    let answer = `Yes. The best ${store.name} offer on PawCoupons right now is "${best.title}" — ${formatDiscount(best)}. `;
    answer += best.code
      ? `Use code ${best.code} at checkout. `
      : `No code is needed — the discount applies automatically. `;
    if (expiry) answer += `It expires on ${expiry}.`;
    items.push({
      question: `Does ${store.name} have a promo code right now?`,
      answer: answer.trim(),
    });
  } else {
    items.push({
      question: `Does ${store.name} have a promo code right now?`,
      answer: `There is no active ${store.name} code on PawCoupons at the moment. We add a new store with a fresh, checked coupon every day and re-check existing stores daily, so check back soon.`,
    });
  }

  items.push({
    question: `How do I use a ${store.name} promo code?`,
    answer: `Copy the code from PawCoupons, then click Shop Now to go to ${store.name}. Add items to your cart and paste the code into the promo code box at checkout, before you pay. If the code does not work, use the "Report broken code" link on the coupon so we can check it.`,
  });

  if (best?.expires_at) {
    const expiry = formatExpiry(best.expires_at);
    if (expiry) {
      items.push({
        question: `When does the current ${store.name} promo code expire?`,
        answer: `The current best ${store.name} offer expires on ${expiry}. PawCoupons automatically hides expired codes, so anything listed on this page is still within its dates.`,
      });
    }
  }

  items.push({
    question: `Does the ${store.name} promo code work on sale items?`,
    answer: `It depends on the store's terms for that offer. The description on each coupon states what it applies to, and some codes exclude sale or clearance items. If a code does not apply to your order, try another offer on this page.`,
  });

  items.push({
    question: `How often does PawCoupons check ${store.name} codes?`,
    answer: `We re-check one store every day on rotation and automatically hide coupons past their expiry date. If shoppers report a code as broken three or more times, it is hidden until we review it.`,
  });

  return items;
}

/** Schema.org FAQPage JSON-LD for the store page (rich results). */
export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
