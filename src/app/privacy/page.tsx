export const metadata = {
  title: "Privacy Policy — PawCoupons",
  description:
    "How PawCoupons collects, uses and protects your information. We do not sell personal data.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-extrabold">Privacy Policy</h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: November 2026</p>

      <div className="mt-6 space-y-4 leading-relaxed text-slate-700">
        <p>
          PawCoupons (“we”, “us”, “our”) operates the website pawcoupons.com.
          This policy explains what information we collect when you use the
          site, how we use it, and the choices you have. We do not sell your
          personal information to anyone.
        </p>

        <h2 className="pt-2 text-xl font-bold text-slate-900">Information you give us</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Coupon submissions:</strong> if you submit a coupon, you
            may include a store name, coupon details and, optionally, your
            email address so we can follow up about your submission.
          </li>
          <li>
            <strong>Contact messages:</strong> if you write to us through the
            Contact page, we collect your name, email address and message so
            we can reply.
          </li>
          <li>
            <strong>Broken-code reports and votes:</strong> when you report a
            code or vote on whether it worked, we store that feedback with
            the coupon — no name or email is attached.
          </li>
        </ul>

        <h2 className="pt-2 text-xl font-bold text-slate-900">Information collected automatically</h2>
        <p>
          When you click “Shop Now” or reveal a coupon code, we record an
          anonymous click count for that coupon so we can see which offers
          people find useful. We do not track you across other websites, and
          we do not build advertising profiles.
        </p>

        <h2 className="pt-2 text-xl font-bold text-slate-900">Cookies</h2>
        <p>
          The public site does not use advertising or tracking cookies. A
          cookie is used only for the site owner&apos;s admin login session.
          If you do not log in as the owner, no cookie is set for you.
        </p>

        <h2 className="pt-2 text-xl font-bold text-slate-900">How we use your information</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>To review coupon submissions and publish the ones that check out.</li>
          <li>To reply to messages you send us.</li>
          <li>To find and remove broken or expired codes.</li>
          <li>To keep the site secure and running.</li>
        </ul>
        <p>
          We never share your email address with stores, advertisers or other
          third parties, except where required by law.
        </p>

        <h2 className="pt-2 text-xl font-bold text-slate-900">Links to other websites</h2>
        <p>
          PawCoupons links to stores and other third-party websites. Their
          privacy practices are their own — we encourage you to read the
          privacy policy of any store you visit through our links.
        </p>

        <h2 className="pt-2 text-xl font-bold text-slate-900">Children&apos;s privacy</h2>
        <p>
          PawCoupons is not directed at children under 13, and we do not
          knowingly collect personal information from children under 13.
        </p>

        <h2 className="pt-2 text-xl font-bold text-slate-900">Your choices</h2>
        <p>
          You can browse PawCoupons without giving us any personal information
          at all — no account is required. If you shared your email with us
          and want it removed, write to us through the{" "}
          <a href="/contact" className="underline">
            Contact
          </a>{" "}
          page and we will delete it.
        </p>

        <h2 className="pt-2 text-xl font-bold text-slate-900">Changes to this policy</h2>
        <p>
          We may update this policy from time to time. When we do, we will
          change the “Last updated” date at the top of this page.
        </p>
      </div>
    </div>
  );
}
