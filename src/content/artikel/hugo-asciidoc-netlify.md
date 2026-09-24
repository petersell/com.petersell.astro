---
author: Andreas Petersell
title: Hugo mit Asciidoc - Webseite mit Netlify bereitstellen
date: 2020-05-01T17:29:38+02:00
draft: false
categories:
    - anleitungen
tags:
    - asciidoc
    - hugo
    - blogging
---

Solange man als Blogger nur wenige Artikel hat, kann man den Hugo-Ordner `public` via FTP auf den Webserver kopieren. Werden es mehr Blogposts, werden Dienste wie Netlify unausweichlich.
<!--more-->

### Quelle

* [AsciiDoc support for Hugo on Netlify](https://www.patrickpeeters.com/2019/09/asciidoc-support-for-hugo-on-netlify/)

### Abenteuer Netlify

Als das Kopieren meines Output-Ordners auf meinen Webserver 5 Minuten dauerte, war klar, dass das kein Bloggen mehr ist, sondern eine Qual. Ich wußte nie, was _Deployen_ bedeutet, jetzt ahnte ich es. Im Netz war meistens vom Dienst _Netlify_ die Rede, wenn es um das Bereitstellen von Hugo-Output auf einen Webserver ging. Bestimmt gibt es auch andere Dienste. Aber als ich obige Quelle fand, stand meine Wahl für _Netlify_ fest.

Die erste Begegnung mit dem Dienst war schaurig. Man braucht ein hohes Verzweiflungspotential, um in der Benutzerführung von Netlify nicht sofort zu verzweifeln. So wird der Nutzer 3 Schritte mittels einer großen _Weiter_-Schaltfläche geleitet, um dann im 4. Schritt lediglich auf einen kleinen Repository-Namen klicken zu müssen, damit es weiter geht. Hat man diese Klippe überwunden, erwarten einen jede Menge Fehlermeldungen, die es erstmal zu finden und zu dechiffrieren gilt.

Ein Abbruch gab es wegen einer PDF-Datei, ein zweiter wegen einer falschen Syntax meiner Hugo-Version. Auf folgende Fehlermeldung war ich gottseidank vorbereitet und entsprechend erleichert, als sie mir erschien.

```txt frame="terminal"
10:08:14 PM: Executing user command: hugo --gc --minify
10:08:14 PM: Building sites …
10:08:14 PM: ERROR 2020/04/29 20:08:14 asciidoctor / asciidoc not found in $PATH: Please install.
10:08:14 PM: Leaving AsciiDoc content unrendered.
```

### Anpassungen wegen Asciidoc

Nun schreibt Patrick Peeters:

> Netlify’s buildbot can install software on build, all you need is a Gemfile in the root folder of your project pointing at the right software packages, in my case that’s just asciidoctor.
>
> — Patrick Peeters

Was zur Hölle ist ein _Gemfile_? Wieder halfen mir öffentliche Git-Repositorys: eine Datei mit Namen `Gemfile`. Erstellen Sie also im Rootverzeichnis Ihres Hugo-Projektes eine Datei, benennen Sie sie _Gemfile_ und tragen folgenden Text ein:

```
source 'https://rubygems.org'
gem 'asciidoctor'
```

In einer Anleitung zu Netlify hatte ich gelernt, dass es ratsam ist, ebenfalls im Rootverzeichnis eine Datei namens `netlify.toml` anzulegen. So Sie auch eine haben, müssen Sie den Build-Befehl folgendermaßen anpassen:

```
[build]
publish = "public"
command = "bundle && hugo --minify"
```

Wenn Sie jetzt Ihr Hugo-Projekt mit den angepassten Dateien `Gemfile` und `netlify.toml` in den Masterbranch hochladen, sollte der _Deploy_ fehlerfrei laufen und zumindest der Asciidoc-Inhalt korrekt ausgegeben werden.

### Theme im Ursprungszustand

Als Hugo-Theme habe ich mich für das Theme [Contentful](https://github.com/foo-dogsquared/hugo-theme-contentful) entschieden. Da dies ein sehr minimalistisches Theme ist, musste ich viel nacharbeiten. Um so größer war der Schreck, als nach erfolgreichem _Deploy_ meine Webseite so gut wie nackt war: nämlich im Urzustand des Original-Themes.

Jetzt war ich zugegebenermaßen etwas müde. Da ich wußte, dass ich nicht so schnell auf ein anderes Theme umschwenken werde, habe ich kurzerhand die Theme-Dateien in die Hugo-Standard-Ordner verschoben und das Verzeichnis `themes` komplett gelöscht. Nach einem nächsten Upload in den Masterbranch war alles so schön grün wie nach einem lokalen `hugo server`-Aufruf. 