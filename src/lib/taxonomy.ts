import { getCollection } from "astro:content";
import { getSerien, serieHref } from "./serie";

// Ein Eintrag in Listen (Startseite, Kategorie- und Stichwortseiten)
export type ListEntry = {
  title: string;
  date: Date;
  href: string;
  typeLabel: string;
  description?: string;
  categories: string[];
  tags: string[];
};

export type TaxonomyTerm = {
  label: string;
  slug: string;
  entries: ListEntry[];
};

// Hugo-Konvention aus config.toml: [taxonomies] category = "categories", tag = "tags"
const COLLECTIONS = [
  { name: "artikel", path: "artikel", label: "Artikel" },
  { name: "status", path: "status", label: "Status" },
  { name: "zettel", path: "zettel", label: "Zettel" },
  { name: "quellen", path: "quellen", label: "Quellen" },
] as const;

// Kategorien sind im Frontmatter klein geschrieben ("essays"), angezeigt werden sie groß
export function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

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
      const taxonomyEntry: ListEntry = {
        title: entry.data.title,
        date: entry.data.date,
        href: `/${path}/${entry.id}/`,
        typeLabel: label,
        description: entry.data.description,
        categories: entry.data.categories,
        tags: entry.data.tags,
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

  // Serien nur mit ihrer Übersichtsseite, nicht mit jedem Teil
  for (const { overview } of await getSerien()) {
    const values = overview.data[field];
    for (const value of values) {
      const slug = slugify(value);
      if (!terms.has(slug)) {
        terms.set(slug, { label: value, slug, entries: [] });
      }
      terms.get(slug)!.entries.push({
        title: overview.data.title,
        date: overview.data.date,
        href: serieHref(overview),
        typeLabel: "Serie",
        description: overview.data.description,
        categories: overview.data.categories,
        tags: overview.data.tags,
      });
    }
  }

  for (const term of terms.values()) {
    term.entries.sort((a, b) => b.date.valueOf() - a.date.valueOf());
  }

  return terms;
}
