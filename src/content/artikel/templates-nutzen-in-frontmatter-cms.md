---
title: Templates nutzen in FrontMatter CMS
description: Templates erstellen und nutzen in Headless FrontMatter CMS
image: ""
author: Andreas Petersell
date: 2024-12-04T19:41:27.963Z
lastMod: null
draft: false
categories:
    - anleitungen
tags:
    - hugo
    - blogging
fmContentType: blog
---

Bisher habe ich meine Asciidoc- und Markdown-Dateien in VSCode erstellt. Das macht aber nicht so viel Spaß. Nun habe ich das [Headless-CMS](https://route360.dev/en/post/frontmatter-cms/) FrontMatter entdeckt. Statt zu tippen klicke ich jetzt auf Schaltflächen.
<!--more-->

Erstellen Sie schnell auf Grundlage einer Markdown-Datei (template) eine Kopie dieser mit neuem Dateinamen. Die Dokumentation spricht zwar vom Einsatz von Templates. Aber nirgendwo steht, wie man die eingerichteten Templates benutzt! Bis ich die Vorgehensweise zufällig im Video *How you can use content-types in Front Matter CMS* vom Entwickler Elio Struyf entdeckte.

> **Tip**
>
> Wenn Sie vorhaben, über die Schaltfläche *Create Template* ein Template zu erstellen, sichern Sie sich zuvor die Datei `frontmatter.json`. Denn diese Vorgehensweise überschreibt gern diese Datei. Die folgende Anleitung verzichtet auf den Einsatz dieser Aktionsschaltfläche.

### Template erstellen

**(1)** - Erstellen Sie einmalig einen Ordner `.frontmatter/templates`.

**(2)** - Kopieren Sie eine Markdown-Datei in diesen neuen Ordner `templates`.

**(3)** - Passen Sie die Datei so an, dass sie Ihren Vorstellungen eines Templates enspricht. [Platzhalter](https://frontmatter.codes/docs/content-creation/placeholders) wie in der Datei `frontmatter.json` sind nicht möglich.

Sie können beliebig viele Template-Dateien erstellen. Beim Benutzen der Templates werden diese Ihnen in einer Auswahlliste angeboten.

### Template benutzen

**(1)** - Klicken Sie in der linken Symbolschaltflächen-Leiste auf das Icon *Explorer* und wechseln Sie in den VSCode-Dateiexplorer.

**(2)** - Machen Sie einen rechten Mausklick auf den Content-Ordner, in der die neue Markdown-Datei angelegt werden soll. Z.B. `content/blog`.

**(3)** - Wählen Sie im Kontextmenü den Eintrag *Frontmatter > New Article from template*.

**(4)** - Wählen Sie die entsprechende Template-Datei aus, auf dessen Grundlage die neue Datei entstehen soll.

**(5)** - Editieren Sie die Datei wie gewohnt und passen Sie den YAML-Header an.

### Weitere Quellen
- [Video: How you can use content-types in Front Matter CMS](https://www.youtube.com/watch?v=oA5ocNaiAtY)
- [Frontmatter CMS](https://frontmatter.codes/)

