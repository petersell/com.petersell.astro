---
author: Andreas Petersell
title: Eigenen DITA-Bootstrap-Output mit Docker builden
date: 2023-01-24
draft: false
categories:
  - anleitungen
tags:
  - dita-xml
  - techcomm
  - docker
---


Sie generieren DITA-Output mit Hilfe eines DITA-OT-Images. Aber wie generieren Sie Output mit Hilfe eines Plugins, dass nicht standardmäßig in das DITA-OT integriert ist und von Ihnen angepaßt wurde?

<!--more-->


### Kontext

Warum sollte ich als DITA-Redakteur _Docker_ und ähnliches benutzen? Was bringt mir das? Auf den Punkt gebracht: das eigene Überleben als DITA-Redakteur.

![DITA-Kapitän](../images/dita-ot-bootstrap-mit-docker/containerschiff.jpg)

Sie sind der Kapitän auf einem großen Schiff voller Container. In jedem Container befindet sich entweder eine Version des DITA-Open-Toolkits oder ein DITA-OT-Plugin. Wenn Sie ein PDF oder HTML-Output benötigen, suchen Sie sich ein DITA-OT heraus, fügen ein oder mehrere Plugins hinzu und starten den Build.

1. Sie haben also eine große Auswahl an DITA-OT-Versionen und Plugins. Sie können sofort das neueste testen und gebrauchen.
1. Nie wieder müssen Sie sich Gedanken machen, welches Java das DITA-OT benötigt. Nie wieder müssen Sie einen DITA-OT/bin-Pfad in die Umgebungsvariablen Ihres Betriebssystem schreiben.
1. Sie können das verwendete Image anderen bekannt geben, so dass diese mit dem selben DITA-OT builden.

Sie überleben als DITA-Redakteur, weil Sie schneller, flexibler, unabhängiger und aktueller sind.

Mein Sohn hatte mir einen neuen Rechner aufgebaut - mit Linux! Nun mußte ich sämtliche Programme neu installieren. Gottseidank stieß ich innerhalb der DITA-Dokumention auf den Artikel [Running the dita command from a Docker image](https://www.dita-ot.org/dev/topics/using-docker-images.html). Inzwischen gelingt es mir, mit Hilfe von Docker Standard-HTML-Output zu generieren.

Aber ich möchte das Aussehen verändern mit Hilfe des Plugins [DITA Bootstrap](https://github.com/infotexture/dita-bootstrap) von Roger W. Fienhold Sheen. Dafür hat letzterer [eine Anleitung](https://www.dita-ot.org/dev/topics/creating-docker-images.html) in der offiziellen Dokumentation geschrieben.

Zu guter Letzt möchte ich das DITA-Bootstrap-Plugin anpassen: mit meinen Farben, meinen Menü-Bezeichnungen, meine Header- und Footer-Datei einbinden uvm. Dazu hinterlege ich meine Version des Bootstrap-Plugins in ein Github-Repository.

### Anleitung

> **Tip — Voraussetzung**
>
> Sie haben Docker installiert.

#### 1) Bootstrap-Plugin anpassen und bereitstellen

Sie möchten ein Plugin nach Ihren Wünschen anpassen. Also gilt es, das Plugin von einem Git-Repository downzuloaden, es anzupassen und anschließend in ein eigenes Repository innerhalb Ihres Git-Anbieters hochzuladen.

Ich bin kein Git-Experte, darum hier mein Weg, der für mich funktioniert:

1. Fremdes Repository (z.B. [DITA-Bootstrap](https://github.com/infotexture/dita-bootstrap)) klonen, so dass in einem lokalen Ordner ein neues Verzeichnis _A_ entsteht.
1. Auf der Github-Webseite in Ihrem Github-Account ein neues Repo erstellen und ebenfalls klonen, so dass ein zweiter Ordner _B_ entsteht.
1. Anschließend den Inhalt des Ordners _A_ in den Ordner _B_ kopieren (ohne das Verzeichnis `.git` und den anderen Git-Dateien).
1. Das Plugin nach Ihren wünschen anpassen. Der Titel _DITA-Bootstrap_ könnte z.B. in Ihren Wunschtitel geändert werden.
1. Den Ordner _B_, der ja unser eigenes, geklontes lokales Repo ist, auf das remote Github-Repo _pushen_ (aktualisieren).

#### 2) Dockerfile erstellen

Erstellen Sie innerhalb Ihres DITA-XML-Quelldateien-Ordners eine neue Textdatei mit Namen `Dockerfile`. Schreiben Sie folgendes hinein:

**Dockerfile im Quelldateien-Ordner**

```
# Use the latest DITA-OT image ↓ as parent:
FROM ghcr.io/dita-ot/dita-ot:4.0.1

# Install a custom plug-in from a remote location:
RUN dita --install https://github.com/jason-fox/fox.jason.extend.css/archive/master.zip

# Install a custom plug-in from a remote location:
RUN dita --install https://github.com/petersell/zks-bootstrap-5-3-2/archive/master.zip
```

Sie müssen natürlich Ihr eigenes Repository im zweiten RUN-Befehl angeben in der Form https://github.com/user/repository

Für das eigene Repository muss eine Zip-Datei bereitgehalten werden. Diese muss man nicht extra erstellen, denn das übernimmt Github. Schreiben Sie einfach `/archive/master.zip` ans Ende der Repository-URL, um aus dem Masterbranch eine Zipdatei zu erstellen.

So wird aus _http://github.com/user/repository.git_ dann _http://github.com/user/repository/archive/master.zip_.

#### 3) Image bauen

Auf der Grundlage der Datei `Dockerfile` wird jetzt ein lokales Image erstellt. Öffnen Sie ein Kommandozeilen-Fenster und gehen Sie in Ihr DITA-Quellverzeichnis, weil sich darin Ihre `Dockerfile` befindet.

Geben Sie folgenden Befehl ein:

**Buildfehl auf Konsole**

```
$ docker image build -t ditaot-bootstrap-docker-image:1.0 .
```

Sie können Ihrem Image natürlich einen anderen Namen vergeben als _ditaot-bootstrap-docker-image_.

Überprüfen Sie im selben Fenster, ob das Images gebaut wurde:

----
$ docker images
----

#### 4) Container starten für den Build

Jetzt können Sie den Docker-Container starten, der auf diesem Docker-Image basiert. Da auf dem Container nun mal ein DITA-OT ist, heißt _starten_ zugleich DITA-Output builden. Dazu geben Sie dem run-Befehl die Eigenschaften mit auf auf den Weg, wie Sie es auch mit dem DITA-Build-Befehl auf lokaler Ebene tun würden: das DITA-Quellverzeichnis, die Haupt-Ditamap, den Output-Ordner sowie das Format (transtype). 

Geben Sie folgenden Befehl im Kommandozeilen-Fenster ein:

**Docker-Befehl auf der Konsole**

```
$ docker container run -it \
  -v /home/andreas/DITA-ZKS:/src ditaot-bootstrap-docker-image:1.0 \
  -i /src/zks.ditamap \
  -o /src/out/dita-bootstrap \
  -f html5-bootstrap -v
```

Passen Sie Ihren DITA-Quelldatei-Ordner entsprechend an. Bei mir heißt der DITA-Quelldatei-Pfad: `/home/andreas/DITA-ZKS`.

Falls Sie einen anderen Image-Namen statt _ditaot-bootstrap-docker-image_ gewählt haben, müssen Sie den Ihrigen vermerken.

Ebenso heißt meine ditamap-Datei _zks.ditamap_. Tragen Sie hier Ihre Ditamap ein.

Der Output landet innerhalb des DITA-Quellverzeichnisses im Verzeichnis `out/dita-bootstrap`.

[caption="Abb. 1: "]
![Bootstrap-Output](../images/dita-ot-bootstrap-mit-docker/dita-ot-bootstrap-mit-docker.png)

Nach dem Docker-Run-Befehl füllte sich mein output-Ordner `out` mit den gewünschten HTML-Seiten - jetzt aber im Bootstrap-Look des Plugins.
