"use client";

import { useState } from "react";

/**
 * Store logo, loaded from the store's own favicon via Google's favicon
 * service — no logo files to upload, and a new store gets its logo
 * automatically from its website domain. If the logo fails to load,
 * falls back to the store's initial in a coloured tile.
 */
export default function StoreLogo({
  name,
  websiteUrl,
  size = 64,
}: {
  name: string;
  websiteUrl?: string | null;
  size?: number;
}) {
  const [failed, setFailed] = useState(false);

  let domain = "";
  try {
    domain = websiteUrl ? new URL(websiteUrl).hostname : "";
  } catch {
    domain = "";
  }

  if (!domain || failed) {
    return (
      <div
        style={{ width: size, height: size, fontSize: Math.round(size * 0.4) }}
        className="flex shrink-0 items-center justify-center rounded-xl bg-brand-50 font-extrabold text-brand-700"
      >
        {name.charAt(0)}
      </div>
    );
  }

  return (
    <img
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`}
      alt={`${name} logo`}
      width={size}
      height={size}
      style={{ width: size, height: size }}
      loading="lazy"
      onError={() => setFailed(true)}
      className="shrink-0 object-contain"
    />
  );
}
