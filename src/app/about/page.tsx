export const metadata = {
  title: "About Us — PawCoupons",
  description:
    "PawCoupons is a coupon-sharing site for US stores. Learn how we find and verify coupon codes, and how we keep them up to date.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-extrabold">About PawCoupons</h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: November 2026</p>

      <div className="mt-6 space-y-4 leading-relaxed text-slate-700">
        <p>
          PawCoupons is a coupon-sharing website for pet owners in the United
          States. We collect promo codes and deals from well-known US pet
          stores — food and treats, pharmacy, toys and gear, litter and
          cleaning, subscription boxes and pet services — so you can save
          money without hunting through dozens of coupon sites.
        </p>
        <p>
          We started PawCoupons in November 2026 with a simple idea: a coupon
          site should only list codes that are <strong>real</strong>. Every
          code on this site is a public offer from the store itself or from a
          reputable deal source. We <strong>never invent coupon codes</strong>,
          and we never show a “verified” badge for a code we have not checked.
        </p>
        <h2 className="pt-2 text-xl font-bold text-slate-900">How we check codes</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Before publishing:</strong> we check each code against the
            store&apos;s own website or a reputable deal site, and we only
            publish it when we can confirm it is a real, current offer.
          </li>
          <li>
            <strong>Every day:</strong> we re-check one store on rotation and
            add one new store with a fresh, checked coupon.
          </li>
          <li>
            <strong>Expired codes:</strong> our system automatically hides
            coupons past their expiry date.
          </li>
          <li>
            <strong>Broken codes:</strong> if shoppers report a code as broken
            three or more times, it is hidden until we review it. You can
            report a broken code from the coupon itself.
          </li>
        </ul>
        <h2 className="pt-2 text-xl font-bold text-slate-900">How PawCoupons makes money</h2>
        <p>
          Right now, the links on this site go directly to the store — they
          are not affiliate links, and we do not earn a commission. We are
          applying to affiliate networks and programs, and once a program
          approves us, some links may become affiliate links. That will never
          change the price you pay, and it will never decide which coupons we
          list. See our{" "}
          <a href="/disclosure" className="underline">
            Affiliate Disclosure
          </a>{" "}
          for the full details.
        </p>
        <h2 className="pt-2 text-xl font-bold text-slate-900">Get in touch</h2>
        <p>
          Found a working code we don&apos;t have, or spotted a mistake?
          Share it on our{" "}
          <a href="/submit" className="underline">
            Submit a Coupon
          </a>{" "}
          page, or reach us through the{" "}
          <a href="/contact" className="underline">
            Contact
          </a>{" "}
          page. We read every message.
        </p>
      </div>
    </div>
  );
}
