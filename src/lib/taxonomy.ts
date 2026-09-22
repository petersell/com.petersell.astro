import { getCollection } from "astro:content";

export type TaxonomyEntry = {
  title: string;
  date: Date;
  href: string;
  collectionLabel: string;
  terms: string[];
};

export type TaxonomyTerm = {
  label: string;
  slug: string;
  entries: TaxonomyEntry[];
};

// Hugo-Konvention aus config.toml: [taxonomies] category = "categories", tag = "tags"
const COLLECTIONS = [
  { name: "artikel", path: "artikel", label: "Artikel" },
  { name: "status", path: "status", label: "Status" },
  { name: "zettel", path: "zettel", label: "Zettel" },
  { name: "quellen", path: "quellen", label: "Quellen" },
] as const;

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replaceAll("ä", "ae")
    .replaceAll("ö", "oe")
    .replaceAll("ü", "ue")
    .replaceAll("ß", "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function getTaxonomyTerms(field: "categories" | "tags"): Promise<Map<string, TaxonomyTerm>> {
  const terms = new Map<string, TaxonomyTerm>();

  for (const { name, path, label } of COLLECTIONS) {
    const entries = await getCollection(name, ({ data }) => !data.draft);
    for (const entry of entries) {
      const values = entry.data[field];
      const taxonomyEntry: TaxonomyEntry = {
        title: entry.data.title,
        date: entry.data.date,
        href: `/${path}/${entry.id}/`,
        collectionLabel: label,
        terms: values,
      };
      for (const value of values) {
        const slug = slugify(value);
        if (!terms.has(slug)) {
          terms.set(slug, { label: value, slug, entries: [] });
        }
        terms.get(slug)!.entries.push(taxonomyEntry);
      }
    }
  }

  for (const term of terms.values()) {
    term.entries.sort((a, b) => b.date.valueOf() - a.date.valueOf());
  }

  return terms;
}
