import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

/**
 * Serves guide images stored in `content/guides/images/` — the folder
 * Mikasa uploads photos to from GitHub web. Files under `content/`
 * are NOT served by Next.js automatically (only `public/` is), so
 * this route reads them from disk and streams them back.
 *
 * A guide references an image in Markdown as:
 *   ![Senior dog and cat eating](/guides/images/senior-dog-cat.webp)
 * The URL path `/guides/images/<file>` maps to this route.
 */
const IMAGES_DIR = path.join(process.cwd(), "content", "guides", "images");

const MIME: Record<string, string> = {
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".avif": "image/avif",
  ".svg": "image/svg+xml",
};

export async function GET(
  _request: Request,
  { params }: { params: { filename: string } }
) {
  const filename = params.filename ?? "";
  // Only a plain file name is allowed — no subfolders, no "..".
  if (
    !filename ||
    filename.includes("/") ||
    filename.includes("\\") ||
    filename.includes("..")
  ) {
    return new NextResponse("Not found", { status: 404 });
  }

  const ext = path.extname(filename).toLowerCase();
  const mime = MIME[ext];
  if (!mime) return new NextResponse("Not found", { status: 404 });

  const filePath = path.join(IMAGES_DIR, filename);
  if (!fs.existsSync(filePath)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const bytes = await fs.promises.readFile(filePath);
  return new NextResponse(bytes, {
    headers: {
      "Content-Type": mime,
      // Photos rarely change under the same name; cache aggressively.
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
