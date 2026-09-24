import { getCollection, type CollectionEntry } from "astro:content";

export type SerieEntry = CollectionEntry<"serie">;

export type Serie = {
  key: string;
  overview: SerieEntry;
  parts: SerieEntry[];
};

// Serie = Ordner unter src/content/serie/: index.md (teil 0) + teil-N.md
export const serieKey = (entry: SerieEntry) => entry.id.split("/")[0];

export const serieHref = (entry: SerieEntry) => `/serie/${entry.id}/`;

export async function getSerien(): Promise<Serie[]> {
  const entries = await getCollection("serie", ({ data }) => !data.draft);
  const serien = new Map<string, Serie>();

  for (const overview of entries.filter((e) => e.data.teil === 0)) {
    serien.set(serieKey(overview), { key: serieKey(overview), overview, parts: [] });
  }
  for (const part of entries.filter((e) => e.data.teil > 0)) {
    serien.get(serieKey(part))?.parts.push(part);
  }
  for (const serie of serien.values()) {
    serie.parts.sort((a, b) => a.data.teil - b.data.teil);
  }

  return [...serien.values()];
}
