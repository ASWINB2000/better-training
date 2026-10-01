import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const mime: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
};

async function photoDataUri(image: string | null) {
  if (!image) return null;
  try {
    const file = await readFile(path.join(process.cwd(), "public", image));
    const type = mime[path.extname(image).toLowerCase()];
    return type ? `data:${type};base64,${file.toString("base64")}` : null;
  } catch {
    return null;
  }
}

/** Social share card: brand-red panel with the title on the left and the photo on the right. */
export async function renderOgImage({
  eyebrow,
  title,
  footer,
  image,
}: {
  eyebrow: string;
  title: string;
  footer: string;
  image: string | null;
}) {
  const photo = await photoDataUri(image);
  const fontSize = title.length > 40 ? 56 : title.length > 24 ? 68 : 80;

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#7f1d1d" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: photo ? 700 : 1200,
            height: "100%",
            padding: "64px 56px 56px 72px",
            color: "#fff",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 26,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#fecaca",
              fontWeight: 700,
            }}
          >
            {eyebrow}
          </div>
          <div style={{ display: "flex", fontSize, fontWeight: 700, lineHeight: 1.1 }}>
            {title}
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 28 }}>
            <div style={{ display: "flex", fontWeight: 700 }}>Better Training</div>
            <div style={{ display: "flex", color: "#fecaca", marginTop: 6 }}>{footer}</div>
          </div>
        </div>
        {photo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo}
            alt=""
            width={500}
            height={630}
            style={{ width: 500, height: 630, objectFit: "cover" }}
          />
        )}
      </div>
    ),
    ogSize,
  );
}
