---
author: Andreas Petersell
title: Weiterblättern im Hugo-Theme Minimo
date: 2018-08-20
draft: true
categories:
  - anleitungen
tags:
  - hugo
---

[Hugo](https://gohugo.io/) ist ein Open Source Webseiten-Generator für statische Seiten. Das Theme Minimo erstellt die Links unterhalb eines Blogposts für Weiter und Zurück automatisch – nur leider genau umgekehrt, wie ich es für meine Texte gebrauchen kann. Bei Blogposts landet der aktuellste Post oben. Bei belletristischen Texten wird das erste Kapitel zuerst geschrieben, soll aber auch an erster (oben) Stelle bleiben. Kurz und gut: ich wollte eine Möglichkeit haben, Hugo-Seiten manuell zu verbinden. Bei Kapitel 1 landet der Leser nach Klick auf Weiter beim Kapitel 2. Eigentlich logisch, im CMS Hugo aber nicht so einfach.
<!--more-->

### Template-Weiche einrichten

Die Weiter-Zurück-Navigation befindet sich im Theme Minimo in der Template-Datei `layouts\_default\partials\nav\entry_nav.html`. Dieses sogenannte Partial wiederum wird aufgerufen in der Layoutdatei `single.html`.

Für die Blogposts wollte ich die bisherige Weiter-Navigation haben (aktuellster Post zuoberst). Für die Romankapitel wollte ich eine neue Navigation einrichten. Benötigt wurde eine “Weiche”. Bei [Thomas Leister](https://thomas-leister.de/einfuehrung-in-hugo-theme-erstellen/) wurde ich fündig. Meine Datei `single.html` bekam folgende “Weiche”.

```
{{ if eq .Type "novel" }}
    {{ partial "nav/entry_nav-novel.html" . }}
{{ else }}
    {{ partial "nav/entry_nav.html" . }}
{{ end }}
```

In meine Content-Dateien für den Roman musste ich noch einen Variable für den Typ einfügen: `type: novel`.

```yaml
---
title: gero_prolog
linktitle: 1_gero-prolog
type: novel
date: 2017-10-01
nextpage: novel/version-eins/2_michael-01/
---
```

### Neue Partial-Datei erschaffen

Die oben erwähnte Partial-Datei `entry_nav.html` habe ich kopiert und umbenannt in `entry_nav-novel.html`. Bei Blogposts kommt die Original-Datei zum Einsatz, bei Pages im Ordner `novel` wird die neue Datei herangezogen.

Beim Weiter-Link den Titel des nächsten Kapitels einzublenden, habe ich nicht geschafft. Darum habe ich ihn weggelassen. In einer Sequenz sorgt das für mehr Übersichtlichkeit. Bei den Blogpost wird weiterhin der Titel des nächsten Blogposts ausgegen.

Ausgehend vom vorhandenen Minimo-Template `entry_nav.html` habe ich mein Template durch Trial and Error folgendermaßen in der Datei `entry_nav-novel.html` angepasst.

```yaml
<nav class='entry-nav'>
  <div class='container'>

    {{- if $.Params.prevpage -}}
    <div class='prev-entry sep-before'>
	 <a href='{{ $.Params.prevpage | relURL }}'>
        <span aria-hidden='true'>
          {{- partial "svg/icons" "prev" -}}
          {{- print " " ( i18n "previous" ) -}}
        </span>
        <span class='screen-reader-text'>{{ i18n "previousPost" }}: </span>
     </a>
    </div>
    {{- end -}}

    {{- if $.Params.nextpage -}}
    <div class='next-entry sep-before'>
	 <a href='{{ $.Params.nextpage | relURL }}'>
	    <span class='screen-reader-text'>{{ i18n "nextPost" }}: </span>
        <span aria-hidden='true'>
          {{- print ( i18n "next" ) " " -}}
          {{- partial "svg/icons" "next" -}}
        </span>
	  </a>
    </div>
    {{- end -}}

  </div>
</nav>
```