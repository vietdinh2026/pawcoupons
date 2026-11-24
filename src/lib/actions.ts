"use server";

import { revalidatePath } from "next/cache";
import { getServiceClient, isSupabaseConfigured } from "./supabase";
import type { CouponStatus } from "./types";

/* ------------------------------------------------------------------ */
/* Public actions                                                      */
/* ------------------------------------------------------------------ */

export async function voteCoupon(couponId: string, vote: "up" | "down") {
  if (!isSupabaseConfigured()) return { ok: false, error: "Database not configured." };
  const db = getServiceClient();
  const { error } = await db.from("votes").insert({ coupon_id: couponId, vote });
  if (error) return { ok: false, error: error.message };
  revalidatePath("/");
  return { ok: true };
}

export async function reportCoupon(formData: FormData) {
  const couponId = String(formData.get("coupon_id") ?? "");
  const reason = String(formData.get("reason") ?? "Code did not work");
  if (!couponId) return { ok: false, error: "Missing coupon." };
  if (!isSupabaseConfigured()) return { ok: false, error: "Database not configured." };
  const db = getServiceClient();
  const { error } = await db.from("reports").insert({ coupon_id: couponId, reason, status: "open" });
  if (error) return { ok: false, error: error.message };
  revalidatePath("/");
  return { ok: true };
}

export async function submitCoupon(formData: FormData) {
  const storeName = String(formData.get("store_name") ?? "").trim();
  const couponTitle = String(formData.get("coupon_title") ?? "").trim();
  if (!storeName || !couponTitle) {
    return { ok: false, error: "Store name and coupon title are required." };
  }
  if (!isSupabaseConfigured()) return { ok: false, error: "Database not configured." };
  const db = getServiceClient();
  const { error } = await db.from("submissions").insert({
    store_name: storeName,
    coupon_title: couponTitle,
    code: String(formData.get("code") ?? "").trim() || null,
    affiliate_url: String(formData.get("affiliate_url") ?? "").trim() || null,
    email: String(formData.get("email") ?? "").trim() || null,
    status: "pending",
  });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function sendContactMessage(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const topic = String(formData.get("topic") ?? "Other").trim();
  const message = String(formData.get("message") ?? "").trim();
  if (!name || !email || !message) {
    return { ok: false, error: "Name, email and message are required." };
  }
  if (!isSupabaseConfigured()) return { ok: false, error: "Database not configured." };
  const db = getServiceClient();
  const { error } = await db.from("contact_messages").insert({
    name,
    email,
    topic,
    message,
    status: "open",
  });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

/* ------------------------------------------------------------------ */
/* Admin actions (TODO: protect /admin with a password before going    */
/* live — see README.md. These actions currently have no auth.)       */
/* ------------------------------------------------------------------ */

export async function upsertStore(formData: FormData) {
  const db = getServiceClient();
  const id = String(formData.get("id") ?? "").trim() || null;
  const name = String(formData.get("name") ?? "").trim();
  const slug =
    String(formData.get("slug") ?? "").trim() ||
    name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const payload = {
    name,
    slug,
    logo_url: String(formData.get("logo_url") ?? "").trim() || null,
    website_url: String(formData.get("website_url") ?? "").trim() || null,
    description: String(formData.get("description") ?? "").trim() || null,
  };
  const { error } = id
    ? await db.from("stores").update(payload).eq("id", id)
    : await db.from("stores").insert(payload);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin");
  revalidatePath("/stores");
  return { ok: true };
}

export async function deleteStore(id: string) {
  const db = getServiceClient();
  const { error } = await db.from("stores").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin");
  return { ok: true };
}

export async function upsertCoupon(formData: FormData) {
  const db = getServiceClient();
  const id = String(formData.get("id") ?? "").trim() || null;
  const discountValue = String(formData.get("discount_value") ?? "").trim();
  const expiresAt = String(formData.get("expires_at") ?? "").trim();
  const petCategory = String(formData.get("pet_category") ?? "food-treats").trim();
  const tagsRaw = String(formData.get("tags") ?? "");
  const tags = tagsRaw
    .split(",")
    .map((t) => t.trim())
    .filter((t) =>
      ["Autoship Deal", "New Customers", "Sitewide", "Free Shipping"].includes(t)
    );
  const payload = {
    store_id: String(formData.get("store_id") ?? ""),
    title: String(formData.get("title") ?? "").trim(),
    code: String(formData.get("code") ?? "").trim() || null,
    description: String(formData.get("description") ?? "").trim() || null,
    discount_type: String(formData.get("discount_type") ?? "percent"),
    discount_value: discountValue ? Number(discountValue) : null,
    affiliate_url: String(formData.get("affiliate_url") ?? "").trim(),
    affiliate_network: String(formData.get("affiliate_network") ?? "").trim() || null,
    category: String(formData.get("category") ?? "Other"),
    pet_category: petCategory || "food-treats",
    tags,
    expires_at: expiresAt ? new Date(expiresAt).toISOString() : null,
    is_verified: formData.get("is_verified") === "on",
    status: String(formData.get("status") ?? "active") as CouponStatus,
  };
  const { error } = id
    ? await db.from("coupons").update(payload).eq("id", id)
    : await db.from("coupons").insert(payload);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin");
  revalidatePath("/");
  return { ok: true };
}

export async function deleteCoupon(id: string) {
  const db = getServiceClient();
  const { error } = await db.from("coupons").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin");
  revalidatePath("/");
  return { ok: true };
}

export async function setCouponStatus(id: string, status: CouponStatus) {
  const db = getServiceClient();
  const { error } = await db.from("coupons").update({ status }).eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin");
  revalidatePath("/");
  return { ok: true };
}

export async function setCouponVerified(id: string, verified: boolean) {
  const db = getServiceClient();
  const { error } = await db.from("coupons").update({ is_verified: verified }).eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin");
  revalidatePath("/");
  return { ok: true };
}

export async function setSubmissionStatus(id: string, status: "approved" | "rejected") {
  const db = getServiceClient();
  const { error } = await db.from("submissions").update({ status }).eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin");
  return { ok: true };
}

export async function resolveReport(id: string) {
  const db = getServiceClient();
  const { error } = await db.from("reports").update({ status: "resolved" }).eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin");
  return { ok: true };
}
