import Link from "next/link";
import { getSortedGuides } from "@/lib/guides";

interface LatestGuidesSectionProps {
  count?: number;
  className?: string;
}

export default function LatestGuidesSection({
  count = 3,
  className = "",
}: LatestGuidesSectionProps) {
  const latestGuides = getSortedGuides().slice(0, count);

  if (latestGuides.length === 0) return null;

  return (
    <section
  className={`rounded-3xl border border-slate-200/90 bg-white p-5 shadow-sm sm:p-8 ${className}`.trim()}
>
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
            Savings guides
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Practical tips and promo code tricks before you check out.
          </p>
        </div>
        <Link
          href="/guides"
          className="shrink-0 text-sm font-bold text-brand-700 transition hover:text-brand-800 hover:underline"
        >
          All guides →
        </Link>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {latestGuides.map((g) => (
          <Link
            key={g.slug}
            href={`/guides/${g.slug}`}
            className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-400 hover:shadow-md"
          >
            <div>
              <h3 className="font-bold leading-snug text-slate-900 group-hover:text-brand-700">
                {g.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-700">
                {g.description}
              </p>
            </div>
            <span className="mt-4 inline-block text-xs font-bold text-brand-700">
              Read guide →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
