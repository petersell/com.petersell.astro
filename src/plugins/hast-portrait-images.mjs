// Sätteri-hast-Plugin: markiert Hochkant-Bilder im Markdown mit der Klasse
// "portrait", damit sie per CSS schmaler dargestellt werden können.
// Die Maße werden beim Build mit sharp aus der Bilddatei gelesen.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

// Ab diesem Verhältnis Höhe/Breite gilt ein Bild als hochkant.
// Knapp quadratische Bilder (z. B. 600×635) bleiben so in voller Breite.
const PORTRAIT_RATIO = 1.2;

async function isPortrait(file) {
  if (!fs.existsSync(file)) return false;
  const { width, height, orientation } = await sharp(file).metadata();
  // EXIF-Orientierung 5–8 = um 90° gedreht
  const [w, h] = (orientation ?? 1) >= 5 ? [height, width] : [width, height];
  return h / w >= PORTRAIT_RATIO;
}

export default function portraitImages({ fileURL }) {
  if (!fileURL) return null;
  const dir = path.dirname(fileURLToPath(fileURL));

  return {
    name: "portrait-images",
    element: {
      filter: ["img"],
      async visit(node, ctx) {
        const src = node.properties?.src;
        if (typeof src !== "string" || URL.canParse(src)) return; // externe Bilder
        const decoded = decodeURI(src);
        const file = decoded.startsWith("/")
          ? path.join(process.cwd(), "public", decoded)
          : path.resolve(dir, decoded);
        // Als "class" statt "className" setzen: Astros Image-Marker reicht die
        // Property an die <Image>-Komponente weiter, die daraus class="…" rendert.
        if (await isPortrait(file)) ctx.setProperty(node, "class", "portrait");
      },
    },
  };
}
