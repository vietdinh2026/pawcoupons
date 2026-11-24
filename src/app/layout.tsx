import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import "./globals.css";

const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://pawcoupons.com";
const siteUrl = rawSiteUrl.trim().replace(/\/+$/, "") || "https://pawcoupons.com";

const defaultTitle = "PawCoupons — Verified Pet Coupons & Promo Codes";
const defaultDescription =
  "Find working coupon codes and deals for pet stores. Save on pet food, treats, pharmacy, toys, litter and subscription boxes.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s | PawCoupons",
  },
  description: defaultDescription,
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: "/",
    siteName: "PawCoupons",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-100 text-slate-900 antialiased">
        <Navbar />

        <main className="mx-auto min-h-[70vh] max-w-6xl px-4 py-8">{children}</main>

        <footer className="border-t-4 border-brand-600 bg-slate-900 text-slate-300">
          <div className="mx-auto max-w-6xl px-4 py-8 text-sm">
            <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-2">
              <Link href="/about" className="hover:text-white">
                About Us
              </Link>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
              <Link href="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/disclosure" className="hover:text-white">
                Affiliate Disclosure
              </Link>
              <Link href="/guides" className="hover:text-white">
                Savings Guides
              </Link>
              <Link href="/submit" className="hover:text-white">
                Submit a Coupon
              </Link>
              <Link href="/stores" className="hover:text-white">
                All Stores
              </Link>
            </nav>
            <p className="mt-4 text-slate-400">
              PawCoupons is a coupon-sharing site. We may earn a commission when you shop
              through links on this site, at no extra cost to you. See our{" "}
              <Link href="/disclosure" className="text-slate-200 underline hover:text-white">
                Affiliate Disclosure
              </Link>
              .
            </p>
            <p className="mt-2 text-slate-400">© {new Date().getFullYear()} PawCoupons. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
