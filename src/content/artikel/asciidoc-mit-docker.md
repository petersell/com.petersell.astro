---
author: Andreas Petersell
title: Asciidoc mit Docker bauen
date: 2025-09-15
draft: false
categories:
  - anleitungen
tags:
  - asciidoc
  - techcomm
  - docker
---

Sie müssen nicht für jedes Output-Format des Asciidoctors ein Extra-Tool installieren. Sie brauchen eigentlich nur ein Docker-Image nutzen, egal welchen Output Sie aus Ihren adoc-Dateien generieren wollen.
<!--more-->
Diese Quelle ermöglichte mir den Artikel: [Asciidoctor Docker Container](https://github.com/asciidoctor/docker-asciidoctor)

> **Tip — Voraussetzung**
>
> Sie haben Docker installiert.

### Kontext

Da ich im Zusammenhang mit DITA XML bereits Docker installiert hatte, wußte ich, dass es für adoc-Dateien einen ähnlichen Weg des Bauens über ein Docker-Image geben müßte.

Das gibt es. Und das Schönes ist, dass der Build via Docker verschiedene Ausgabeformate abdeckt: HTML, PDF, EPUB3 und Confluence uvm.

### Anleitung

1. Docker im Terminal starten: `sudo systemctl start docker`
1. Buildbefehl eingeben + ENTER
1. Im Output-Ordner das Ergebnis bestaunen

#### Buildbefehl anpassen

In der readme-Datei des Projekts heißt es:

----
docker run -it \
  -u $(id -u):$(id -g) \
  -v <your directory>:/documents/ asciidoctor/docker-asciidoctor
----

Diese Beispiel-Syntax gilt es anzupassen. Den Part `-u $(id -u):$(id -g)` sollten Sie in Ihrem Build-Befehl übernehmen. Er sorgt dafür, dass das Output-Verzeichnis editierbar ist. So können Sie z.B. einen Image-Ordner einfügen, wenn nötig.

**Mein angepaßter Build-Befehl**

```xml
docker run --rm \
  -u $(id -u):$(id -g) \
  -v ~/sync/asciidoc:/documents asciidoctor/docker-asciidoctor \ <1>
  asciidoctor -v -D /documents/homepage/output/ /documents/homepage/'**/*.adoc' <2> 
```

<1> Mein lokaler Ordner `sync/asciidoc` wird mit dem Ordner `documents` des Containers verbunden (mounted) und das Image _asciidoctor/docker-asciidoctor_ wird benutzt.
<2> Es wird HTML-Output erzeugt in meinem lokalen Ordner `sync/asciidoc/homepage/output`, denn _documents_ ist ja gleichbedeutend mit _sync/asciidoc_. Da ich nicht nur eine, sondern mehrere adoc-Dateien hatte, musste ich bei der Quelldatei-Angabe am Ende mit der [Wildcard-Syntax](https://docs.asciidoctor.org/asciidoctor/latest/cli/process-multiple-files/) arbeiten.

### Fazit

Ich habe mir die Installation sämtlicher Asciidoctor-Build-Tools erspart und brauche mich nicht um Updates zu kümmern. Einfach Docker starten, Buildbefehl eingeben und mehrere Output-Formate erhalten.