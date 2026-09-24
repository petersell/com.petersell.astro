---
author: Andreas Petersell
title: Hugo mit Asciidoc - Bilder einbinden
date: 2020-03-22T20:08:10+01:00
draft: false
categories:
    - anleitungen
tags:
    - hugo
    - asciidoc
---

## Hugo mit Asciidoc - Bilder einbinden

Leider ist eine Selbstverständlichkeit wie das Einbinden von Bildern in der Kombination Hugo/Asciidoc etwas speziell. Das Markup ist Asciidoc, welches mit Asciidoctor in HTML umgewandelt wird. Nun hat aber das Hugo-CMS seinen eigenen Mechanismus, der mit Markdown auch wunderbar funktioniert.
<!--more-->

Gottseidank fand ich auf Github den Quelltext des Blogs https://foo-dogsquared.github.io mit einem einfachen Beispiel der Bildeinbindung.

> **Tip — Voraussetzung**
>
> Sie haben Hugo und Asciidoctor installiert.

### Quellen

* [Blogging with Asciidoctor and Hugo](https://foo-dogsquared.github.io/blog/posts/blogging-with-asciidoctor-and-hugo/)
* [Beispiel der Bildeinbindung](https://raw.githubusercontent.com/foo-dogsquared/blog/master/content/posts/blogging-with-asciidoctor-and-hugo.adoc)

### Anleitung

#### 1. Content-Datei editieren

Schreiben Sie Ihren Blogpost in der Datei `meinblogpost.adoc` und fügen das Bild im Text ein.

```
image::meinblogpost.gif[]
```

Ebenfalls in die Content-Datei kommt folgendes Asciidoc-Attribut.

```
:imagesdir: ../images/meinblogpostimage/
```

Damit beim Neuanlegen einer adoc-Datei der Bildordner gleich korrekt ausgegeben wird, schreiben Sie in Ihrem Archetype `default.adoc` folgende Notation in den Bereich der Asciidoc-Attribute (unterhalb des YAML-Headers):

```
:imagesdir: ../images/{{ .File.BaseFileName }}/
```

#### 2. Bild abspeichern

Legen Sie einen Ordner `images` innerhalb des post-Ordners an.

```
|-- content
    |-- post
        └-- images
```

Da Sie wissen, dass Ihre Bilddatei `meinblogpost.gif` heißt, legen Sie einen weiteren Ordner `meinblogpost` innerhalb des `images`-Ordners an. In diesen kopieren Sie die Bilddatei zum Blogpost.

```
|-- content
    |-- post
        |-- images
        |   └-- meinblogpost.gif
        └-- meinblogpost.adoc
```

### Admonitions

Ich habe auf die kleinen Vignetten bzw. Icons für die Warnhinweise und Tipps verzichtet. Diese werden im Asciidoctor immer dann ausgegeben, wenn Sie in Asciidoc-Attributen folgenden Wert vermerken:

```
:icons: font
```

Ich habe also den CSS-Link für _Font Awesome_ wieder entfernt.

```html title="Interne Einbindung"
<link rel="stylesheet" href="{{"css/fa/css/all.css" | absURL }}
```

```html title="Externe Einbindung"
<link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
```

In meiner CSS wurden sämtliche Einträge zur class `.admonitionblock` überflüssig, die ich mir zuvor aus der `asciidoctor.css` kopiert hatte.