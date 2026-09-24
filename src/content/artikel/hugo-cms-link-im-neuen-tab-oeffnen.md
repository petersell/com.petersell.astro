---
title: Hugo - Link im neuen Tab öffnen lassen
description: Einen Link in Markdown erstellen - der im neuen Tab öffnet
image: ""
author: Andreas Petersell
date: 2024-12-02T18:13:16.066Z
lastMod: null
draft: false
categories:
    - anleitungen
tags:
    - hugo
    - blogging
fmContentType: blog
---

In Markdown kann man standardmäßig nur Links zu Webseiten erstellen, die im selben Tab öffnen, nicht jedoch in einem neuen Tab geöffnet werden mit Hilfe des Attributs `target="_blank"`.
<!--more-->

Da ich inzwischen für das Schreiben meiner Hugo-Blogposts das Headless-CMS [Frontmatter](https://frontmatter.codes) nutze, möchte ich für einfache Texte wieder vermehrt Markdown nutzen. 

Quelle: [How to target blank in md?](https://discourse.gohugo.io/t/how-to-target--blank-in-md/524/19)

### Anleitung

Das Attribut `target="_blank"` kann man mit Hilfe von Hugo-Shortcodes realisieren.

> [!note]
> Damit HTML-Code innerhalb der Markdown-Datei gerendert wird, muss einmalig in der `config.toml` folgender Eintrag gemacht werden:
>
> ```
> [markup.goldmark.renderer]
> unsafe = true
> ```

**(1)** - Erstellen Sie einen neuen Ordner `shortcodes` im Hugo-Verzeichnis `layouts`.

**(2)** - Erstellen Sie im neuen Verzeichnis eine neue HTML-Datei. Ich nenne sie wie im Beispiel unter Quellen `a_blank.html`.

**(3)** - Fügen Sie diesen Code hinein:

```
<a target="_blank" href="{{ .Get 1 }}">{{ .Get 0 | markdownify }}</a>
```
**(4)** - In der eigentlichen Markdown-Content-Datei fügen Sie den Shortcode folgendermaßen ein:

```
{{%/* a_blank "Shortcodes linking" "https://www.petersell.de" */%}}
```

Klickt man jetzt auf diesen Link [Shortcodes linking](https://www.petersell.de), öffnet sich die Webseite in einem neuen Tab.

#### Weitere Quellen
- [Raw HTML omitted Fehler](https://discourse.gohugo.io/t/hugo-0-60-0-raw-html-omitted-issue/22010/7)
- [gohugo.io - Create your own shortcodes](https://gohugo.io/templates/shortcode/)

