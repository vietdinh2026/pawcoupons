import type { FaqItem } from "./faq";

export interface GuideSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  updatedAt: string;
  /** Store this guide is about (its live coupons are shown on the page). */
  storeSlug?: string;
  intro: string[];
  sections: GuideSection[];
  faqs: FaqItem[];
}

export const GUIDES: Guide[] = [
  {
    slug: "black-friday-shopping-tips-2026",
    title: "Black Friday Pet Shopping Tips 2026: Don't Pay Full Price — Check for a Promo Code First",
    description:
      "Black Friday 2026 tips for pet supplies: check for a promo code before you pay, stack sale prices with codes and Autoship, watch prescription exclusions, and mind free-shipping thresholds on heavy litter and food — with live codes for Chewy, Petco, PetSmart, BarkBox and more.",
    updatedAt: "2026-11-24",
    intro: [
      "Black Friday 2026 falls on Friday, November 27, with Cyber Monday on Monday, November 30. The biggest mistake pet owners make is not a bad deal — it is a good deal paid for at full price because the promo code was never applied.",
      "Before you pay for anything, check the live codes on the store's PawCoupons page, copy the best code, and paste it in the promo-code box before you pay. It takes 30 seconds, and it is the easiest saving of the whole weekend.",
    ],
    sections: [
      {
        heading: "Find a code before you check out — every time",
        paragraphs: [
          "Do this for every order: find the store on PawCoupons first, copy the live code, shop as normal, then paste the code in the promo-code box before you pay. Check that the total changed — if it did not, read the code's terms for a minimum spend or excluded brands, and try the next live code on the store page.",
          "Codes change daily during Black Friday week, and the best ones can end before Friday itself. Check the live store page right before checkout, not a screenshot or a code from last week.",
        ],
        bullets: [
          "Check the store's live codes on PawCoupons before you shop",
          "Paste the code before you pay — most stores will not apply it afterwards",
          "If no code works, use 'Report broken code' so PawCoupons can check it",
        ],
      },
      {
        heading: "Compare the code with the Autoship offer",
        paragraphs: [
          "For food, treats and litter you buy every month, the first Autoship order often beats a one-off promo code — Chewy, Petco and 1-800-PetMeds all run deep first-Autoship discounts. But a Black Friday code can beat Autoship on a single big order, so compare the two before you check out and pick the bigger saving.",
          "After the first order, Autoship keeps saving a smaller percentage on every delivery, and it makes it easy to clear free-shipping thresholds without thinking about it.",
        ],
      },
      {
        heading: "Watch out for prescription exclusions",
        paragraphs: [
          "Sitewide codes at pet pharmacies often exclude prescription medicine and a few restricted brands. If your cart is mostly flea, tick or heartworm medication, check the code's terms first — a pharmacy-specific code usually saves more than a sitewide one that excludes Rx items.",
          "The same applies to some premium food brands. Read the exclusions before you celebrate the discount.",
        ],
      },
      {
        heading: "Heavy bags: check free shipping before the code",
        paragraphs: [
          "Litter, large food bags and crates are heavy, and delivery can cost more than the code saves. Check the free-shipping threshold first — Chewy ships free over $49, and first-time customers need less. If your cart is just short, adding a small toy or treat is usually cheaper than paying for shipping.",
        ],
      },
      {
        heading: "Timing: don't wait for Friday if the code is good now",
        paragraphs: [
          "Early Black Friday sales start one to two weeks before Friday, November 27, and the best codes often appear in that early window. If you see a code you like, use it — Black Friday codes can end at midnight with no warning. Cyber Monday, November 30, is usually the best day for online-only codes.",
        ],
      },
      {
        heading: "Where to look first, by what you're buying",
        paragraphs: [
          "Food and treats: Chewy, Petco and PetSmart — compare the live code with the first Autoship offer. Pharmacy: Chewy Pharmacy, PetCareRx and 1-800-PetMeds — compare the pharmacy code with the sitewide one. Toys and gear: PetSmart and BarkBox. Subscription boxes: BarkBox — look for first-box offers. Litter and cleaning: Chewy and Petco — check free-shipping thresholds first.",
          "Every store above has a live code page on PawCoupons — open the store page from the guide's live offers or the All Stores page and check the codes there before you check out.",
        ],
      },
    ],
    faqs: [
      {
        question: "When is Black Friday 2026?",
        answer:
          "Black Friday 2026 is Friday, November 27, 2026. Most stores start their sales one to two weeks early, and Cyber Monday follows on Monday, November 30, 2026.",
      },
      {
        question: "Do I still need a promo code if the item is already on sale?",
        answer:
          "Yes — that is exactly when a code saves the most. Sale prices and promo codes usually stack, so the code is an extra discount on top of the sale price. Always check the store's live codes on PawCoupons before you pay.",
      },
      {
        question: "Can I use more than one promo code on one order?",
        answer:
          "Usually no. Most stores allow one promo code per order, so compare the live codes on the store page and pick the one that saves the most.",
      },
      {
        question: "What if the code doesn't work?",
        answer:
          "Check the minimum spend, expiry date and exclusions first. If it still does not work, try the next live code on the store page — and use 'Report broken code' on the coupon so PawCoupons can check it.",
      },
      {
        question: "Do Black Friday promo codes expire quickly?",
        answer:
          "Yes. Black Friday codes often end at midnight or when the event ends. PawCoupons hides expired codes automatically, so anything listed on a store page is still within its dates — but use a code as soon as you find a good one.",
      },
    ],
  },
  {
    slug: "how-to-save-at-chewy",
    title: "How to Save at Chewy: Autoship, Free Shipping & Promo Codes (2026)",
    description:
      "How to save the most at Chewy in 2026: first Autoship discounts, free shipping thresholds, Autoship savings on every order, and the current live codes.",
    updatedAt: "2026-11-21",
    storeSlug: "chewy",
    intro: [
      "Chewy is one of the easiest stores to save at, because the savings are built into how you shop: the first Autoship order gets the deepest discount, repeat orders keep saving, and shipping is free once your cart is big enough.",
      "The live code list at the bottom of this page always shows the best Chewy offer on PawCoupons right now — check it before you order, because promo codes can beat Chewy's standard Autoship discount.",
    ],
    sections: [
      {
        heading: "Start with your first Autoship order",
        paragraphs: [
          "The single biggest saving at Chewy is the first Autoship order. Chewy's own Autoship program gives 35% off your first Autoship order (up to $20) — and a promo code from PawCoupons can be even better, so always compare the live code list before you check out.",
          "Autoship is Chewy's recurring delivery program: you pick the food, treats or supplies your pet needs and how often they arrive. You can change the schedule or skip a delivery any time.",
        ],
      },
      {
        heading: "Keep saving on every Autoship order",
        paragraphs: [
          "After the first order, Autoship saves 5% on every order. It adds up fast on food and litter you buy every month, and a recurring cart also makes it easy to clear the free-shipping threshold without thinking about it.",
        ],
      },
      {
        heading: "Free shipping thresholds",
        paragraphs: [
          "Standard orders ship free once they reach $49, and first-time customers only need $35 for free delivery. Orders arrive in 1–3 days. If your cart is just short of the threshold, adding a small toy or treat is usually cheaper than paying for shipping.",
        ],
        bullets: [
          "Free shipping on orders over $49",
          "Free shipping on first orders over $35",
          "1–3 day delivery on eligible items",
        ],
      },
      {
        heading: "Returns are free for a year",
        paragraphs: [
          "Chewy offers free 365-day returns. If a food or product doesn't work for your pet, you can return it — that makes it low-risk to try a new brand with a promo code.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is the best Chewy promo code today?",
        answer:
          "Chewy's best offer is usually on the first Autoship order. The live list on our Chewy page always shows the best current code — check there before you order.",
      },
      {
        question: "How does Chewy Autoship work?",
        answer:
          "You choose the products and delivery frequency, and Chewy ships them automatically. The first Autoship order gets the deepest discount, later orders save 5%, and you can change or skip deliveries any time.",
      },
      {
        question: "Does Chewy offer free shipping?",
        answer:
          "Yes — orders over $49 ship free, and first-time customers only need $35 for free delivery. Delivery takes 1–3 days on eligible items.",
      },
      {
        question: "Can I return items to Chewy for free?",
        answer:
          "Yes. Chewy offers free returns for 365 days.",
      },
    ],
  },
  {
    slug: "how-to-save-at-petco",
    title: "How to Save at Petco: Autoship, Treats Rewards & First-Order Codes (2026)",
    description:
      "How to save at Petco in 2026: the first Autoship discount, the free Treats rewards program, Vital Care membership perks, and the current live codes.",
    updatedAt: "2026-11-24",
    storeSlug: "petco",
    intro: [
      "Petco's savings come in three layers: a deep discount on your first Autoship order, the free Treats rewards program that earns points on everything you buy, and the Vital Care membership for regular shoppers who want free shipping and grooming and vet savings.",
      "The live code list at the bottom of this page always shows the best Petco offer on PawCoupons right now — check it before you order, because a first-order code and the Autoship discount do not always stack.",
    ],
    sections: [
      {
        heading: "First Autoship order: the deepest single discount",
        paragraphs: [
          "Petco's first Autoship (repeat delivery) order gets the biggest percentage off of any single Petco offer. If the food or litter you buy every month is on Autoship, that first delivery is where the saving lives — later deliveries keep a smaller recurring discount.",
          "Compare it with the live first-order code on the Petco page before you check out: one of the two will be better for your cart, and you can usually only use one per order.",
        ],
      },
      {
        heading: "Treats rewards: free points on every order",
        paragraphs: [
          "Treats is Petco's free loyalty program. You earn points on every purchase — in store and online — and the points turn into rewards dollars you can spend on a later order. It costs nothing to join, and it stacks with promo codes and Autoship discounts.",
          "If you shop at Petco even a few times a year, joining Treats is the easiest saving on this page: sign up once, earn on everything, and spend the rewards on the next bag of food.",
        ],
        bullets: [
          "Free to join, points earned on eligible orders",
          "Rewards dollars to spend on later orders",
          "Stacks with promo codes and Autoship",
        ],
      },
      {
        heading: "Vital Care membership: worth it if you shop monthly",
        paragraphs: [
          "Vital Care is Petco's paid membership for regular shoppers. It bundles free shipping with savings on grooming and veterinary visits at Petco locations. If you buy food monthly and groom your dog a few times a year, the membership can pay for itself — but check the current terms on petco.com first, because the benefits and price change over time.",
          "If you only shop at Petco occasionally, skip the membership and stick with Treats points plus the live codes on the Petco page.",
        ],
      },
      {
        heading: "Best times to shop Petco",
        paragraphs: [
          "Petco's biggest savings cluster around Black Friday and Cyber Monday, with sitewide codes and extra Autoship offers. Between events, watch for first-order codes and seasonal sales on toys, beds and holiday items.",
          "For heavy items like litter and large food bags, check the free-shipping threshold before you celebrate a code — delivery on a heavy order can cost more than the code saves.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is the best Petco promo code today?",
        answer:
          "Petco's best offer is usually the first Autoship discount or a first-order code. The live list on our Petco page always shows the best current code — check there before you order.",
      },
      {
        question: "Is Petco Treats free to join?",
        answer:
          "Yes. Treats is Petco's free loyalty program. You earn points on eligible purchases and turn them into rewards dollars for later orders.",
      },
      {
        question: "Can I stack a promo code with Autoship at Petco?",
        answer:
          "Usually you can only use one discount per order, so compare the first Autoship discount with the live first-order code and pick the one that saves more on your cart.",
      },
      {
        question: "Does Petco offer free shipping?",
        answer:
          "Petco offers free shipping above a minimum order value, and Vital Care members get free shipping as part of the membership. Check the current threshold on the Petco page before you check out.",
      },
    ],
  },
  {
    slug: "how-to-save-on-pet-pharmacy",
    title: "How to Save on Pet Pharmacy: Flea, Tick & Heartworm Meds Without Overpaying (2026)",
    description:
      "How to save on pet medication in 2026: compare Chewy Pharmacy, PetCareRx and 1-800-PetMeds, watch Rx exclusions in sitewide codes, use Autoship for chronic meds, and check membership pricing before you buy.",
    updatedAt: "2026-11-24",
    intro: [
      "Flea, tick and heartworm medication is the most expensive repeat purchase most pet owners make — and the one where a promo code most often fails, because sitewide codes usually exclude prescription items.",
      "The trick is to compare the pharmacy-specific offers across Chewy Pharmacy, PetCareRx and 1-800-PetMeds before you buy, and to check the code's exclusions first. A 25% pharmacy code beats a 30% sitewide code that excludes your medication.",
    ],
    sections: [
      {
        heading: "First, check whether the code excludes prescriptions",
        paragraphs: [
          "Most sitewide promo codes exclude prescription medication and a few manufacturer-restricted brands. Before you shop, read the exclusions on the coupon: if your cart is mostly Rx items, look for a pharmacy-specific code instead — PetCareRx and Chewy Pharmacy both run codes made for prescription orders.",
          "Over-the-counter flea and tick products are usually not excluded, so a sitewide code can still work well for those.",
        ],
      },
      {
        heading: "Compare the three pharmacies on the same medication",
        paragraphs: [
          "Prices for the same medication vary between Chewy Pharmacy, PetCareRx and 1-800-PetMeds, and the best store changes with each sale. Check the live codes on each store's PawCoupons page, then compare the final price after the code — not the shelf price before it.",
          "Also compare pack sizes: a 6-month supply is usually cheaper per dose than a 1-month supply, and the saving grows when a percentage code applies to the bigger pack.",
        ],
      },
      {
        heading: "Autoship for chronic medication",
        paragraphs: [
          "If your pet takes the same medication every month, Autoship is the easiest recurring saving: the first Autoship order gets the deepest discount, and later deliveries keep saving. You will need a valid prescription from your vet — the pharmacy contacts your vet to confirm it.",
          "Set the delivery frequency to match the dose schedule, and skip or delay a delivery if you still have doses left. Never stockpile more than you can use before the expiry date.",
        ],
      },
      {
        heading: "Membership pricing: check before you pay for it",
        paragraphs: [
          "PetCareRx runs a PetPlus membership with wholesale pricing and free shipping, and it often goes on deep discount for the annual plan. If you buy medication every month, the membership can beat one-off codes — but do the math first: compare the member price plus the membership cost against the best live code without it.",
        ],
      },
      {
        heading: "What you need before you order",
        paragraphs: [
          "Prescription medication needs a valid prescription from your veterinarian. The pharmacy will usually contact your vet directly, so have your vet's name and phone number ready. Allow extra days for the first order while the prescription is confirmed.",
        ],
      },
    ],
    faqs: [
      {
        question: "Why doesn't my promo code work on pet medication?",
        answer:
          "Most sitewide codes exclude prescription medication and some restricted brands. Look for a pharmacy-specific code on the store's PawCoupons page instead — those are made for Rx orders.",
      },
      {
        question: "Which is cheapest: Chewy Pharmacy, PetCareRx or 1-800-PetMeds?",
        answer:
          "It changes with each sale. Compare the live codes on all three store pages on PawCoupons and check the final price after the code — the cheapest store is different almost every month.",
      },
      {
        question: "Do I need a prescription to order pet medication online?",
        answer:
          "Yes, for prescription medication. The pharmacy contacts your vet to confirm the prescription, so have your vet's details ready and allow extra days for the first order.",
      },
      {
        question: "Does Autoship save money on pet medication?",
        answer:
          "Yes — the first Autoship order gets the deepest discount and later deliveries keep saving. It works best for medication your pet takes every month on a fixed schedule.",
      },
    ],
  },
];

export function getSortedGuides(): Guide[] {
  return [...GUIDES].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

export function getGuide(slug: string): Guide | undefined {
  const normalized = slug.trim().toLowerCase();
  return GUIDES.find((g) => g.slug === normalized);
}

export function getGuideForStore(storeSlug: string): Guide | undefined {
  const normalized = storeSlug.trim().toLowerCase();
  return GUIDES.find((g) => g.storeSlug === normalized);
}
