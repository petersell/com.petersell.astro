---
author: Andreas Petersell
title: Hugo mit Asciidoc - Auf anderen Post verlinken
date: 2020-04-28T14:43:14+02:00
draft: false
categories:
    - anleitungen
tags:
    - hugo
    - asciidoc
---

Wenn ich im CMS Hugo statt Markdown Asciidoc nutze, wie kann ich dann auf einen anderen Beitrag verlinken?.
<!--more-->

Beide adoc-Dateien liegen im selben Verzeichnis:

```
|-- content
    |-- blog
        |-- teamwork-manifest.adoc
        └-- teamwork-manifest-warum.adoc
```

In der Datei `teamwork-manifest-warum.adoc` musste ich auf den Post `teamwork-manifest.adoc` verlinken. Folgende Notation für einen Inline-Link brachte Erfolg.

```asciidoc
Fünf Kollegen haben link:../teamwork-manifest/[ein Manifest] geschrieben.
```