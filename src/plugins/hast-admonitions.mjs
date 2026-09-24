// Sätteri-hast-Plugin: Obsidian-/GitHub-Callouts als Admonitions.
//
//   > [!tip] Voraussetzung
//   > Sie haben Docker installiert.
//
// wird zu <aside class="admonition" data-admonition-type="tip"> mit Titel
// (Design nach dem Theme Multiterm, CSS in global.css). Ohne eigenen Titel
// gilt der deutsche Standardtitel des Typs.

const TITLES = {
  note: "Hinweis",
  tip: "Tipp",
  important: "Wichtig",
  caution: "Vorsicht",
  warning: "Warnung",
};

// Obsidian-Aliase auf die fünf Typen abbilden
const ALIASES = {
  info: "note",
  todo: "note",
  abstract: "note",
  summary: "note",
  hint: "tip",
  success: "tip",
  check: "tip",
  done: "tip",
  question: "important",
  help: "important",
  faq: "important",
  danger: "caution",
  error: "caution",
  bug: "caution",
  failure: "caution",
  attention: "warning",
};

const MARKER = /^\[!([a-z]+)\][+-]?[ \t]*/i;

const isBlank = (node) => node.type === "text" && !node.value.trim();

export default function admonitions() {
  return {
    name: "admonitions",
    element: {
      filter: ["blockquote"],
      visit(node) {
        const children = node.children ?? [];
        const firstIndex = children.findIndex((c) => !isBlank(c));
        const first = children[firstIndex];
        if (first?.type !== "element" || first.tagName !== "p") return;
        const lead = first.children?.[0];
        const match = lead?.type === "text" && lead.value.match(MARKER);
        if (!match) return;

        const name = match[1].toLowerCase();
        const type = TITLES[name] ? name : ALIASES[name];
        if (!type) return;

        // Titel = Rest der ersten Zeile, der Text danach bleibt Inhalt
        const rest = lead.value.slice(match[0].length);
        const newline = rest.indexOf("\n");
        const title = (newline === -1 ? rest : rest.slice(0, newline)).trim() || TITLES[type];
        const leadRest = newline === -1 ? "" : rest.slice(newline + 1);

        const firstChildren = [
          ...(leadRest ? [{ type: "text", value: leadRest }] : []),
          ...first.children.slice(1),
        ];
        const content = [
          ...(firstChildren.some((c) => !isBlank(c)) ? [{ ...first, children: firstChildren }] : []),
          ...children.slice(firstIndex + 1).filter((c) => !isBlank(c)),
        ];

        return {
          type: "element",
          tagName: "aside",
          properties: {
            className: ["admonition"],
            dataAdmonitionType: type,
            ariaLabel: title,
          },
          children: [
            {
              type: "element",
              tagName: "p",
              properties: { className: ["admonition-title"], ariaHidden: "true" },
              children: [{ type: "text", value: title }],
            },
            {
              type: "element",
              tagName: "div",
              properties: { className: ["admonition-content"] },
              children: content,
            },
          ],
        };
      },
    },
  };
}
