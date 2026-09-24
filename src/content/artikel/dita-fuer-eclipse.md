---
author: Andreas Petersell
date: 2019-04-17
title: Einbinden der DITA-DTDs in Eclipse
description: DITA XML in Eclipse als Quelldatei-Editor
categories:
    - anleitungen
tags:
    - dita-xml
    - techcomm
markup: asciidoc
---


Eclipse eignet sich gut als Quelldateien-Editor. Damit die DITA-Dateien validiert werden können, gilt es, die DTDs einzubinden.
<!--more-->

> [!tip] Voraussetzung
> Sie müssen das Java JDK und Eclipse installiert haben. Ein Java JRE war in meinem Fall nicht ausreichend.

![DITA in Eclipse](../images/dita-fuer-eclipse/dita-fuer-eclipse.gif)

1. Klicken Sie in Eclipse auf _Window > Preferences_.
1. Öffnen Sie die Menüverzeichnisbaum unterhalb _XML_ und klicken Sie auf _XML Catalog_.
1. Klicken Sie im Fenster _Preferences_ auf _Add_.
1. Klicken Sie auf _Next Catalog_ und anschließend auf _File System_.
1. Springen Sie im Fenster _Öffnen_ auf die Datei `catalog-dita.xml` im Hauptverzeichnis Ihres aktuellen DITA Open Toolkits.