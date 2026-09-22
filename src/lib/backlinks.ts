import { getCollection } from "astro:content";
import { unified } from "unified";
import remarkParse from "remark-parse";
import { visit } from "unist-util-visit";
import type { Link } from "mdast";

export type Backlink = {
  title: string;
  href: string;
  date: Date;
};

// Hugo iterierte $.Site.Pages (alle Seiten), nicht nur zettelkasten –
// gleiches Verhalten hier: jede Collection kann auf einen Zettel verlinken.
const COLLECTIONS_TO_PATH = {
  artikel: "artikel",
  status: "status",
  zettel: "zettel",
  quellen: "quellen",
} as const;

const parser = unified().use(remarkParse);

function extractInternalLinks(markdown: string): Set<string> {
  const tree = parser.parse(markdown);
  const links = new Set<string>();
  visit(tree, "link", (node: Link) => {
    if (node.url.startsWith("/")) {
      links.add(normalize(node.url));
    }
  });
  return links;
}

function normalize(path: string): string {
  return path.split("#")[0].replace(/\/+$/, "");
}

export async function buildBacklinkIndex(): Promise<Map<string, Backlink[]>> {
  const index = new Map<string, Backlink[]>();

  for (const [name, path] of Object.entries(COLLECTIONS_TO_PATH) as [
    keyof typeof COLLECTIONS_TO_PATH,
    string,
  ][]) {
    const entries = await getCollection(name, ({ data }) => !data.draft);
    for (const entry of entries) {
      const href = `/${path}/${entry.id}/`;
      const targets = extractInternalLinks(entry.body ?? "");
      for (const target of targets) {
        if (!index.has(target)) index.set(target, []);
        index.get(target)!.push({ title: entry.data.title, href, date: entry.data.date });
      }
    }
  }

  // Älteste Backlinks zuerst, wie im Hugo-Original (inbound-links.html)
  for (const backlinks of index.values()) {
    backlinks.sort((a, b) => a.date.valueOf() - b.date.valueOf());
  }

  return index;
}

export function getBacklinksFor(index: Map<string, Backlink[]>, href: string): Backlink[] {
  return index.get(normalize(href)) ?? [];
}
