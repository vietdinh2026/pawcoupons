export type CouponStatus = "active" | "expired" | "reported";
export type ReportStatus = "open" | "resolved";
export type SubmissionStatus = "pending" | "approved" | "rejected";

export interface Store {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  website_url: string | null;
  description: string | null;
  created_at: string;
}

export interface Coupon {
  id: string;
  store_id: string;
  title: string;
  code: string | null;
  description: string | null;
  discount_type: "percent" | "fixed" | "free_shipping" | "other";
  discount_value: number | null;
  affiliate_url: string;
  affiliate_network: string | null;
  category: string;
  pet_category: string;
  tags: string[];
  expires_at: string | null;
  is_verified: boolean;
  status: CouponStatus;
  created_at: string;
  store?: Store;
}

export interface ClickRow {
  id: string;
  coupon_id: string;
  clicked_at: string;
  referrer: string | null;
}

export interface Report {
  id: string;
  coupon_id: string;
  reason: string | null;
  status: ReportStatus;
  created_at: string;
  coupon?: Coupon;
}

export interface Submission {
  id: string;
  store_name: string;
  coupon_title: string;
  code: string | null;
  affiliate_url: string | null;
  email: string | null;
  status: SubmissionStatus;
  created_at: string;
}

export interface Vote {
  id: string;
  coupon_id: string;
  vote: "up" | "down";
  created_at: string;
}

export type VoteCounts = Record<string, { up: number; down: number }>;

export const AFFILIATE_NETWORKS = [
  "ShareASale",
  "CJ",
  "Impact",
  "Rakuten",
  "Awin",
  "Amazon Associates",
  "Other",
] as const;

export const CATEGORIES = ["Pets", "Other"] as const;

/** Pet category groups for PawCoupons (see coupons.pet_category). */
export const PET_CATEGORIES = [
  { value: "all", label: "All Deals" },
  { value: "food-treats", label: "Food & Treats" },
  { value: "pharmacy", label: "Pharmacy" },
  { value: "toys-gear", label: "Toys & Gear" },
  { value: "litter-cleaning", label: "Litter & Cleaning" },
  { value: "services-boxes", label: "Services & Boxes" },
] as const;

export const PET_CATEGORY_LABELS: Record<string, string> = Object.fromEntries(
  PET_CATEGORIES.map((c) => [c.value, c.label])
);

/** One entry per pet category page (/categories/[slug]). */
export interface PetCategoryDetail {
  value: string;
  label: string;
  description: string;
  tip: string;
  image: string;
}

export const PET_CATEGORY_DETAILS: PetCategoryDetail[] = [
  {
    value: "food-treats",
    image: "/categories/food-treats.webp",
    label: "Food & Treats",
    description:
      "Dry and wet food, treats, supplements and milk powder — the repeat buys every pet needs, month after month.",
    tip: "Autoship codes save the most here: the first Autoship order gets the deepest discount, and a recurring cart clears the free-shipping threshold on its own.",
  },
  {
    value: "pharmacy",
    image: "/categories/pharmacy.webp",
    label: "Pharmacy",
    description:
      "Flea, tick and heartworm medication, vitamins, dental care and ear and eye care for dogs and cats.",
    tip: "Check exclusions first: most sitewide codes exclude prescription medication, so look for a pharmacy-specific code instead.",
  },
  {
    value: "toys-gear",
    image: "/categories/toys-gear.webp",
    label: "Toys & Gear",
    description:
      "Toys, beds, crates, carriers, leashes and clothes — the fun stuff, usually with a direct percentage-off code.",
    tip: "No subscription needed here: a one-off code beats Autoship for toys and beds, which you buy once, not every month.",
  },
  {
    value: "litter-cleaning",
    image: "/categories/litter-cleaning.webp",
    label: "Litter & Cleaning",
    description:
      "Litter, trays, pads, deodorizers and cage cleaning — heavy and bulky, so delivery costs matter as much as the discount.",
    tip: "Free shipping is the saving that counts: a small code on a heavy bag of litter is worth less than free delivery on the same order.",
  },
  {
    value: "services-boxes",
    image: "/categories/services-boxes.webp",
    label: "Services & Boxes",
    description:
      "Monthly subscription boxes, pet insurance, grooming and spa — mostly first-box, free-trial and new-member offers.",
    tip: "These are almost always new-customer deals: the first box or first month is where the saving lives, so compare the first-box offer before you subscribe.",
  },
];

export function getPetCategoryDetail(
  slug: string
): PetCategoryDetail | undefined {
  return PET_CATEGORY_DETAILS.find((c) => c.value === slug);
}

/** Short status labels shown on coupon cards (coupons.tags). */
export const COUPON_TAG_LABELS = [
  "Autoship Deal",
  "New Customers",
  "Sitewide",
  "Free Shipping",
] as const;
