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
  /** Slugs of other guides this one genuinely relates to (by content, not by default). */
  relatedGuides?: string[];
  /** Pet category slugs this guide genuinely covers. */
  relatedCategories?: string[];
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
    updatedAt: "2026-11-25",
    relatedGuides: [
      "how-to-save-at-chewy",
      "how-to-save-at-petco",
      "how-to-save-on-pet-pharmacy",
    ],
    relatedCategories: ["food-treats", "pharmacy", "litter-cleaning"],
    intro: [
      "Your dog doesn't care about Black Friday — but your wallet will notice it when the kibble bag, the flea treatment and the litter all run out in the same week. Black Friday 2026 lands on November 27, with Cyber Monday on November 30, and pet stores save their deepest food, pharmacy and toy deals for exactly that stretch.",
      "Think of this guide as the pre-checkout sniff test for pet owners: open your pet store's page on PawCoupons, grab the live code that fits your cart — Autoship food, a pharmacy refill, a first BarkBox — and only then pay. Thirty seconds at the promo box can cover a bag of treats, and the codes on the store page are the ones still live right now.",
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
          "Friday, November 27, 2026 — and the pet deals don't wait for that morning. Chewy, Petco and PetSmart usually open their early Black Friday pet sales a week or two ahead, then Cyber Monday on November 30 brings the online-only codes for toys, beds and first boxes.",
      },
      {
        question: "Do I still need a promo code if the item is already on sale?",
        answer:
          "Yes, and for pet food it's often where the real saving hides. A bag of kibble already marked down can still take a promo code on top, and that extra cut matters when you're buying the same food every month. Just check the live code on PawCoupons first — some sale items and premium brands are excluded, so pick the code that actually applies to your cart.",
      },
      {
        question: "Can I use more than one promo code on one order?",
        answer:
          "Almost never — pet stores take one code per checkout, whether it's Chewy, Petco or a pharmacy like PetCareRx. The smarter move is to compare: a 35% first-Autoship code usually beats a small sitewide code on a food order, while a pharmacy code usually beats both on flea and tick medicine. Pick the winner for that cart and save the other code for your next refill.",
      },
      {
        question: "What if the code doesn't work?",
        answer:
          "Start with the three usual suspects for pet carts: the code is for first orders or first Autoship only, your cart is under the minimum spend, or the item is prescription medicine or an excluded premium brand. If none of those fit, try the next live code on the store page — and tap 'Report broken code' so we can check it and pull it if it's dead.",
      },
      {
        question: "Do Black Friday promo codes expire quickly?",
        answer:
          "They can vanish overnight, especially the ones tied to a single weekend. A code that works on a Tuesday night can be gone by Friday morning, and the deepest toy and first-box offers often end when Cyber Monday does. PawCoupons drops expired codes from the store pages automatically, so what you see there is still in date — but if a code looks good for your pet's next food or medicine refill, use it rather than saving it for later.",
      },
    ],
  },
  {
    slug: "how-to-save-at-chewy",
    title: "How to Save at Chewy in 2026: One Autoship Cart for Food, Pharmacy and Litter",
    description:
      "Save at Chewy by running one Autoship cart for a multi-pet household: time food, litter and pharmacy refills together, pick between the first-order gift card and the first-Autoship discount, and trial new food risk-free — with live Chewy codes on PawCoupons.",
    updatedAt: "2026-11-25",
    storeSlug: "chewy",
    relatedGuides: [
      "how-to-save-on-pet-pharmacy",
      "how-to-save-at-petco",
      "black-friday-shopping-tips-2026",
    ],
    relatedCategories: ["food-treats", "pharmacy", "litter-cleaning"],
    intro: [
      "If you share your home with a dog who eats like a teenager and a cat who only eats one flavour, Chewy stops being a shop and becomes a schedule. The saving isn't in one clever code — it's in getting the food, the litter and the flea treatment to arrive in the same box, on the week you actually run out.",
      "This guide is built around that one-cart idea. Set up Autoship around each pet's real usage, choose the right first-order deal for the size of your cart, and use Chewy's long returns window to trial a new food without betting a full bag on it. The live Chewy codes on PawCoupons are the starting point — check them before you order, because the best deal changes with your cart.",
    ],
    sections: [
      {
        heading: "Run one Autoship cart, timed to each pet",
        paragraphs: [
          "Don't put everything on the same delivery date. A large dog can finish a bag of kibble in four weeks while a cat's litter lasts two, and flea and tick medicine runs on a strict monthly clock. Give each item its own Autoship frequency — food every four weeks, litter every two, medicine monthly — and let Chewy deliver them together when the dates line up.",
          "That timing is where the money is. A cart that clears the free-shipping threshold in one delivery beats three small orders that each miss it, and a recurring cart means you stop paying full price for an emergency bag at the last minute because the food ran out on a Sunday.",
        ],
      },
      {
        heading: "First order: gift card, Autoship discount or early code — pick one",
        paragraphs: [
          "Chewy's first-order deals don't stack, so the choice depends on your cart. A first order over $49 can earn a $20 gift card, while a first Autoship order gets 35% off up to $20 — on a small first cart the gift card often wins, on a big first food order the Autoship percentage usually wins. Early seasonal codes, like the 30% Black Friday early deal, are a third option for a one-off order that you don't want on Autoship.",
          "Do the quick maths before you check out: work out the final price after each deal, not the headline percentage. Then check the live Chewy page on PawCoupons, because which deal is running — and whether it excludes your brand — changes week to week.",
        ],
      },
      {
        heading: "Put the pharmacy refill in the same cart, but read its rules first",
        paragraphs: [
          "Chewy Pharmacy runs its own first-order discount — 20% off a first prescription order — and it plays by different rules from a food code. A prescription needs your vet's approval, so allow extra days on the first order, and don't count on a sitewide code covering it: most sitewide codes exclude prescription medicine.",
          "Once the prescription is approved, set the refill on Autoship to match the dose schedule and skip a delivery if you still have doses left. Never stockpile medicine past its expiry date just because a code is running.",
        ],
      },
      {
        heading: "Trial a new food without betting a full bag on it",
        paragraphs: [
          "Chewy gives you 365 days to return an item for free, and that changes how you should try a new food. Buy the smallest bag first, mix it with the old food over a week or so, and watch whether your pet actually eats it — a 35% discount on a bag your dog refuses is still money wasted.",
          "If the trial works, move the winning food onto Autoship at the frequency your pet actually eats it. If it doesn't, return it and try the next brand with the next live code, instead of forcing a pet through a bag they hate.",
        ],
      },
      {
        heading: "When to check Petco or PetSmart instead",
        paragraphs: [
          "Chewy usually wins on a recurring food-and-pharmacy cart, but it isn't always the cheapest for a single toy, bed or crate — especially when Petco or PetSmart run a pickup or in-store deal on that exact item. Before a one-off purchase, compare the final price on Chewy with the same item at Petco, including delivery.",
          "For the pharmacy side of the same cart, compare Chewy Pharmacy with PetCareRx and 1-800-PetMeds the same way — our pet pharmacy guide walks through that comparison, and the live codes for all three are on their PawCoupons store pages.",
        ],
      },
    ],
    faqs: [
      {
        question: "Should I put everything on Autoship, or just the food?",
        answer:
          "Put the things you buy on a fixed schedule on Autoship — food, litter and monthly medicine — and keep toys, beds and treats as one-off orders. Autoship saves the most on repeat essentials, and a toy bought on a schedule is just a toy arriving before you need it.",
      },
      {
        question: "Can I use the $20 gift card and the 35% first-Autoship discount together?",
        answer:
          "No — Chewy's first-order deals don't stack, so you pick one per order. Compare the final price: the gift card usually wins on a first order just over $49, while the 35% Autoship discount (up to $20) usually wins on a larger first food order. Check the live Chewy page on PawCoupons to see which deals are running right now.",
      },
      {
        question: "How do I time a pharmacy refill on Autoship?",
        answer:
          "Set the delivery frequency to match the dose schedule — usually monthly for flea, tick and heartworm medicine — and order the first refill a few days early, because the pharmacy needs your vet to approve the prescription. Once it's approved, Autoship keeps the refills coming, and you can skip a delivery if you still have doses left.",
      },
      {
        question: "What if my pet won't eat the new food I bought on sale?",
        answer:
          "Return it — Chewy offers free returns for 365 days, so a failed trial costs you nothing but the week you spent testing it. Next time, buy the smallest bag first and mix it with the old food gradually, and only move the new food onto Autoship once your pet is eating it happily.",
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
    relatedGuides: ["black-friday-shopping-tips-2026"],
    relatedCategories: ["food-treats", "litter-cleaning"],
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
    relatedGuides: [
      "how-to-save-at-chewy",
      "black-friday-shopping-tips-2026",
    ],
    relatedCategories: ["pharmacy"],
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
