---
author: Andreas Petersell
title: DITA-Output mit Docker builden
date: 2021-11-29T08:28:39+01:00
draft: false
categories:
  - anleitungen
tags:
  - dita-xml
  - techcomm
  - docker
---

Sie müssen nicht bei jedem neuen Rechner das DITA-OT erneut installieren. Sie können die verschiedenen Versionen des DITA-OTs auch über Docker nutzen und so sich die vielen Installationen sparen.
<!--more-->

## Quellen

Diese Quelle ermöglichten mir diesen Artikel:

* [Running the dita command from a Docker image](https://www.dita-ot.org/dev/topics/using-docker-images.html)

## Kontext

Mein Sohn hatte neulich mehrere alte PCs aus einer Betriebsauflösung geschenkt bekommen. Einen davon hatte er mir neu aufgebaut - mit schön viel Arbeitsspeicher. Als ich das Ding zum ersten Mal anmache, rief ich verwundert: Hey, das ist ja Linux! Kann ich nicht wenigstens so etwas wie Dual-Boot bekommen, wo ich mich zur Not auch für Window entscheiden kann? _Nichts da! Du wirst es lieben._ Nun mußte ich also sämtliche Programme neu installieren. Bis ich innerhalb der DITA-Dokumention auf den Artikel [Running the dita command from a Docker image](https://www.dita-ot.org/dev/topics/using-docker-images.html) stieß.

Es wäre schon schön, wenn ich das DITA-OT nicht so oft neu installieren müßte. Inklusive des richtigen JREs usw. Selbst wenn ich ein neues DITA-OT ausprobieren möchte, muß ich es nicht gleich installieren, sondern könnte ein anderes Image nutzen.

Natürlich habe ich beim Befolgen der Anleitung viel falsch gemacht, und fast hätte ich es aufgegeben. Denn die Anleitung setzt voraus, dass der Nutzer im Umgang mit Linux und Docker erfahren ist. Das war bei mir nicht der Fall.

## Anleitung

> [!tip] Voraussetzung
> Sie haben Docker installiert.

In der Dokumentation zum DITA OpenToolkit heißt es:

_To build output, map a host directory to a container volume and specify options for the dita command._

```bash title="DITA-OT Dokumentation"
$ docker run -it \
  -v /Users/username/source:/src ghcr.io/dita-ot/dita-ot:3.6.1 \
  -i /src/input.ditamap \
  -o /src/out \
  -f html5 -v
```

_This command sequence specifies the following options:_

* `-v` mounts the source subfolder of your home directory and binds it to the /src volume in the container
* `-i` specifies the `input.ditamap` file in your source folder as the input map file
* `-o` writes the output to source/out
* `-f` sets the output format to HTML5, and
* `-v` displays build progress messages with verbose logging

### Mein Fehler Nr. 1

Der Quellordner ist nicht in `/Users/username/` gelegen, denn ich bin nicht als Nutzer _root_ unterwegs. Bei mir ist der Pfad meiner DITA-Quelldateien als Nutzer _andreas_ dieser: `/home/andreas/DITA-ZKS`.

### Mein Fehler Nr. 2

Wenn es heißt:

> `-v` mounts the source subfolder of your home directory and binds it to the /src volume in the container,

dann wird aus dem Pfad zu meiner Ditamap-Datei `/home/andreas/DITA-ZKS/zks.ditamap` eben genau `/src/zks.ditamap`. Das selbe gilt für den Pfad des Ordner `out`.

### Richtiger Docker-Befehl

Nach folgendem Docker-Run-Befehl füllte sich mein output-Ordner `out` mit den gewünschten HTML-Seiten.

```bash title="Docker-Befehl auf der Konsole"
$ docker run -it \
  -v /home/andreas/DITA-ZKS:/src ghcr.io/dita-ot/dita-ot:3.6.1 \
  -i /src/zks.ditamap \
  -o /src/out \
  -f html5 -v
```
