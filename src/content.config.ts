import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Hugo liefert leere Strings ("") und explizites YAML `null` für unbenutzte
// Felder (image, description, lastMod) statt die Felder wegzulassen.
const emptyToUndefined = (val: unknown) =>
  val === "" || val === null ? undefined : val;

const baseSchema = z.object({
  title: z.string(),
  author: z.string().default("Andreas Petersell"),
  date: z.coerce.date(),
  lastMod: z.preprocess(emptyToUndefined, z.coerce.date().optional()),
  draft: z.boolean().default(false),
  categories: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  description: z.preprocess(emptyToUndefined, z.string().optional()),
  image: z.preprocess(emptyToUndefined, z.string().optional()),
});

const artikel = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/artikel" }),
  schema: baseSchema.extend({
    // Inhaltsverzeichnis anzeigen (nur bei mehr als zwei Überschriften)
    toc: z.boolean().default(true),
  }),
});

const status = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/status" }),
  schema: baseSchema.extend({
    // Zitat-Status-Posts referenzieren teils eine Quelle (z.B. zitat-*.md)
    signaturen: z.array(reference("quellen")).default([]),
  }),
});

const serie = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/serie" }),
  schema: baseSchema,
});

const zettel = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/zettel" }),
  schema: baseSchema.extend({
    signaturen: z.array(reference("quellen")).default([]),
    // "107ff" u.ä. kommen vor, daher String statt number
    seite: z.coerce.string().optional(),
    // teils reine Zahl (7.6), teils alphanumerisch (3.5b1b) in den Hugo-Dateien
    zettelnummer: z.coerce.string(),
  }),
});

const quellen = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/quellen" }),
  schema: baseSchema.extend({
    dnb: z.string(),
    // eigener Signatur-Schlüssel der Quelle, von zettel/status referenziert
    signaturen: z.array(z.string()).min(1),
  }),
});

export const collections = { artikel, status, serie, zettel, quellen };
