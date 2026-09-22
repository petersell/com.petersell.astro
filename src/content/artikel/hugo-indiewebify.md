---
author: Andreas Petersell
title: Indiewebify my Hugo-Site
date: 2017-07-06
draft: false
categories:
    - anleitungen
tags:
    - hugo
    - blogging
---


Mit Hilfe eines kleinen Services von Pelle Wessmann namens https://webmention.herokuapp.com/ ist es mir auf meiner statischen Hugo-Seite möglich, Kommentare, Likes, Reposts u.ä. via Webmentions einzusammeln.
<!--more-->

### Schritt 1 - Anmelden und Code einfügen

![Webmention](../images/hugo-indiewebify/indiewebify.gif)

Anschließend Domain eingeben und die beiden Code-Schnipsel einfügen. Den ersten in die `header.html`, den zweiten in die `single.html`.

### Schritt 2 - CSS-Klassen hinzufügen

Das Stylesheet der Service-Seite aufrufen: [https://webmention.herokuapp.com/style.css](https://webmention.herokuapp.com/style.css). Darin alles, was _webmention_ enthält, in die eigene CSS-Datei kopieren. In meinem Fall in die CSS meines Hugo-Themes Mainroad.

### Schritt 3 - Neuer Build

Einen neuen Build laufen lassen ohne `server`-Befehl, so dass der public-Ordner neu befüllt wird. Anschließend den public-Ordner auf den Webspace kopieren. Darauf achten, dass auch die neue CSS mit auf dem Webspace liegt.

### Schritt 4 - Kommentieren und Liken

Die beiden Posts vor diesem Artikel sind ein _Like_ und ein _Kommentar_. d.h. ich habe einfach die URL zitiert. Das Ergebnis dieser beiden Posts auf www.publication.work ist folgendes:

![Ergebnis](../images/hugo-indiewebify/indiewebify-output.gif)