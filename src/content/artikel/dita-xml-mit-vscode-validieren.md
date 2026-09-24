---
title: DITA-XML mit VS Code validieren
description: VS Code für DITA einrichten
image: ""
author: Andreas Petersell
date: 2025-04-02T19:31:50.897Z
lastMod: null
draft: false
categories:
    - anleitungen
tags:
    - dita-xml
    - techcomm
fmContentType: blog
---

Um Visual Studio Code als Quelltext-Editor für DITA-XML-Dateien mit allen Annehmlichkeiten wie z.B. der Validierung nutzen zu können, müssen in den Einstellungen des Programms, genauer in der `settings.json`, drei Einträge vorgenommen werden.
<!--more-->
Damit ich bei der nächsten PC-Einrichtung nicht wieder anfange zu suchen, schreibe ich es jetzt auf.

![](/images/no-validation.png)

Leider weiß ich nicht immer, welche DITA-Tags in welche Reihenfolge gehören. Eine zeitnahe Validierung der DITA-Synstax ist also sehr hilfreich.

Quellen:
- [How can I make dita-catalog.xml work in vscode](https://stackoverflow.com/questions/64782816/how-can-i-make-dita-catalog-xml-work-in-vs-code)
- [How to find JAVA_HOME](https://www.baeldung.com/find-java-home)

### Einstellungen von VS Code komplettieren

<!-- FM:Snippet:Start data:{"id":"Admonition - Voraussetzung","fields":[]} -->
> **Info**
>
> Sie haben Java und ein DITA-Open-Toolkit installiert.
<!-- FM:Snippet:End -->

Es gilt, diese drei Einstellungen hinzuzufügen:

1. Pfad zum Java-Programm
2. Pfad zur Datei `catalog-dita.xml` im DITA-OT-Verzeichnis
3. Aktiveren des Kontrollkästchen *xml.validation.resolveExternalEntities*

#### (1) Pfad zum Java-Programm

Da ich mit Linux Fedora arbeite, gab [dieser Befehl](https://www.baeldung.com/find-java-home) im Terminal-Fenster meinen JAVA_HOME-Pfad zurück:

```bash
$ java -XshowSettings:properties -version 2>&1 > /dev/null | grep 'java.home'
```

#### (2) Pfad zur catalog-Datei

Da ich mit Linux Fedora arbeite, diese Syntax der Schrägstriche.

```
"xml.catalogs": [
	"/home/andreas/Programme/dita-ot-4.1.2/catalog-dita.xml"
],
```

#### (3) Kontrollkästchen für Validation aktiveren

In der Oberfläche das Kontrollkästchen aktiveren für *xml.validation.resolveExternalEntities*.

![](/images/kontrollkaestchen-aktivieren.png)

Zum Schluss VS Code neu starten.

#### Erbebnis

In der Datei `settings.json` sah die Notation bei mir so aus:

```
"xml.catalogs": [
	"/home/andreas/Programme/dita-ot-4.1.2/catalog-dita.xml"
],
"xml.java.home": "/usr/lib/jvm/java-21-openjdk",
"xml.validation.resolveExternalEntities": true
```

Jetzt bekomme ich sofort Fehlerhinweise, wenn meine DITA-Syntax nicht stimmt. Auch werden mir beim Schreiben im Kontextmenü mögliche korrekte Tags vorgeschlagen. Ein entspannteres Arbeiten als DITA-Redakteur ist möglich.