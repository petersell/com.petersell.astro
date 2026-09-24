---
author: Andreas Petersell
title: Eine Homepage mit Asciidoctor erstellen
date: 2019-01-22
draft: false
categories:
    - anleitungen
tags:
    - asciidoc
    - blogging
    - techcomm
---

Für längere Texte und Anleitungen hatte ich bisher viele CMS genutzt: Wordpress, Kirby, Hugo und Known. Doch keines der CMS kannte ein Austauschformat. Jeder Text wurde in die jeweilige Datenbank abgelegt. Mit jedem Umzug gingen Texte verloren. Nun brachte [Tom Swan](https://www.tomswan.com/) mich auf die Idee, es mit Asciidoc zu versuchen. Hier die wichtigsten Schritte.
<!--more-->

> [!note] Update
> Inzwischen nutze ich das CMS Hugo. Nur mit Hilfe des Asciidoctors HTML-Dateien zu erstellen, war doch sehr anstrengend.


### Metadaten für HTML-Dateien einrichten

Sie können mit einer HTML-Datei [docinfo.html](https://asciidoctor.org/docs/user-manual/#docinfo-file) und dem [Attribut](https://asciidoctor.org/docs/user-manual/#attributes) `:docinfo:` die Metadaten innerhalb des HTML-Headers erzeugen und im HTML-Output in jeder Datei einfügen. Erstellen Sie eine HTML-Datei und fügen Sie Ihre Metadaten ein. Z.B.

```html
<!-- docinfo.html -->
<link rel="shortcut icon" type="image/png" href="images/petersell.ico">
<meta property="og:title" content="Andreas Petersell" />
<meta property="og:site_name" content="Andreas Petersell" />
<meta property="og:description" content="Technical Writer (DITA XML) and Author" />
<link href="https://twitter.com/petersell" rel="me" class="u-url"/>
<link href="https://www.petersell.com" rel="me" class="u-url"/>
```

Kopieren Sie die `docinfo.html`  in das Quellhauptverzeichnis. Fügen Sie anschließend jeder Ihrer adoc-Dateien folgendes Attribut hinzu:

```
:docinfo: shared
```

Kopieren Sie abschließend ein Favicon-Datei in das Verzeichnis `/images`.

### asciidoc.css anpassen

Nach dem Build wird die Standard-CSS im Ausgabeordner abgelegt. Diese `asciidoctor.css`  gilt es umzubennen und im Hauptverzeichnis der Quelldateien abzulegen. Nehmen Sie darin die gewünschten Änderungen vor. Meine Änderungswünsche waren z.B die Farbe grün für die Überschriften und Links. Auch gefiel mir die links ausgerichtete schwarze Fußleiste nicht.

```css title="Farbe der Links"
a{color:#44aa00;text-decoration:underline;line-height:inherit}
```

```css title="Farbe der Fußleiste"
#footer{max-width:1000px;background-color:rgba(255,255,255,.8);padding:1.25em}
#footer-text{color:rgba(0,0,0,.8);line-height:1.44}
```

Fügen Sie das Stylesheet Ihrem Buildbefehl hinzu.

```shell
asciidoctor -a linkcss -a stylesheet=petersell.css -D C:\asciidoc\out\html 'C:\asciidoc\src\**\*.adoc'
```

### Menüleiste erstellen

Die Möglichkeit, ein kleines Menü mit Asciidoc zusammenstellen zu können, überzeugte mich letztendlich, via Asciidoc zu bloggen.

Meine include-Datei, die das Menü mit zwei externen Weblinks enthält, siehe folgendermaßen aus:

```asciidoc
:home: index.html[Home]
:doku: doku.html[Softwaredokumentation]

link:{home} | link:{doku} | https://www.petersell.com[Stream] | https://www.petersell.com/pages/impressum[Impressum]
```

Diese include-Datei `include-menu.adoc` habe ich in jeder Asciidoc-Datei unterhalb der Attribute eingebunden:

```asciidoc
include::include-menu.adoc[]
```


Diese hier aufgerufene HTML-Seite sieht als `doku-asciidoc.adoc` im Header folgendermaßen aus:

```asciidoc
:title: Asciidoc
:sourcedir: ../
:docinfo: shared
:icons: font
:sectanchors:
:imagesdir: images
:doctype: article
:filename: doku-asciidoc
:date: 22.01.2019

   include::include-menu.adoc[]

- - -

== {title}

- - -

=== Eine Homepage mit Asciidoc erstellen

[abstract]
Für längere Texte und Anleitungen hatte ich bisher viele CMS genutzt: Wordpress, Kirby, Hugo und Known. Doch keines der CMS kannte ein Austauschformat. Jeder Text wurde in die jeweilige Datenbank abgelegt. Mit jedem Umzug gingen Texte verloren. Nun brachte {web-tomswan} mich auf die Idee, es mit Asciidoc zu versuchen. Hier die wichtigsten Schritte.
```

### Inhaltsverzeichnis einfügen

Wenn Sie auf bestimmten Seiten ein Inhaltsverzeichnis erstellen möchten, fügen Sie diese beiden Attribute ein:

```asciidoc
:toc-title: Inhalt
:toc: macro
```

An die Stelle in der adoc-Datei, wo das Inhaltsverzeichnis erscheinen soll, fügen Sie `toc::[]` ein.

### Quelldateien im Unterordner

Liegen manche Quelldateien in einem Unterordner, könnten folgnde Attribute hilfereich sein:

```asciidoc
:sourcedir: ../
:docinfodir: ../
```