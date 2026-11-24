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

/** Short status labels shown on coupon cards (coupons.tags). */
export const COUPON_TAG_LABELS = [
  "Autoship Deal",
  "New Customers",
  "Sitewide",
  "Free Shipping",
] as const;
