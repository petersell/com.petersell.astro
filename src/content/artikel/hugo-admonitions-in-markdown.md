---
title: Admonitions in Markdown
description: Farbig umrahmte Hinweise und Warnungen.
image: ""
author: Andreas Petersell
date: 2024-12-07T11:38:27.101Z
lastMod: null
draft: false
categories:
    - anleitungen
tags:
    - hugo
    - techcomm
    - blogging
fmContentType: blog
---

In Markdown gibt es keine Möglichkeit, farbig umrahmte Absätze für Hinweise, Warnungen, Infos und Tipps zu gestalten. In Hugo bietet sich aber diese Möglichkeit durch sogenannte Shortcodes.
<!--more-->

Sogenannte Shortcodes werden in einer HTML-Datei abgelegt und müssen im Markdown-Content auf spezielle Weise eingefügt werden.

Quelle: [hugo-notice von Nicolas Martignoni](https://github.com/martignoni/hugo-notice)

## Anleitung

Da ich mein Template **nicht** im Ordner `themes` als git-submodule betreibe, kopiere ich alles in meinen lokalen `layouts`-Ordner und synchronisiere diesen zugleich mit meinen Content-Dateien.

> **Info**
>
> Sie müssen in der `config.toml` angeben, ob Sie auf Ihrer Webseite mit einer Standardsprache arbeiten, oder mehrere, nahezu gleichberechtigte Sprachen nutzen. Da ich Deutsch als Standardsprache nutze, habe ich in die `config.toml` diesen Eintrag hinzugefügt: `defaultContentLanguage = 'de'`.

### Einmaliges Einrichten

**(1)** - Laden Sie das Zip-Archiv vom [git-Repository hugo-notice](https://github.com/martignoni/hugo-notice) herunter und entpacken Sie es.

**(2)** - Legen Sie die Datei `notice.html` in den Ordner `layouts/shortcodes` ab.

**(3)** - Kopieren Sie den Ordner `icons` in Ihren Hauptordner des Repositorys, also auf gleicher Ebene wie den den Ordner `layouts`.

**(4)** - Kopieren Sie den Ordner `i18n` in Ihren Hauptordner des Repositorys, also auf gleicher Ebene wie den den Ordner `layouts`. Löschen Sie die Dateien für die Sprachen, die Sie bestimmt nicht nutzen. Bei mir blieb nur die `de.yaml` übrig.

**(5)** - Editieren Sie im Ordner `i18n` die Datei `de.yaml`, so denn nötig. Ich habe z.B. die Übersetzung vom gelben Kasten *Information* auf *Voraussetzung* geändert.

### Anwenden im Markdown-Content

Sobald Sie die Admonitions benutzen möchten, fügen Sie z.B. für obiges gelbes Kästchen folgende Notation in Ihre Content-Datei ein:


```
{{</* notice info */>}}
Sie müssen in der `config.toml` angeben, ob Sie auf Ihrer Webseite ...
{{</* /notice */>}}
```

### Beispiel für eine Warnung

> **Warning**
>
> This is a warning notice. Be warned!

```
{{</* notice warning */>}}
This is a warning notice. Be warned!
{{</* /notice */>}}
```

### Weitere Quellen
- [Fehler bei Übersetzungen von Shortcodes ](https://discourse.gohugo.io/t/i-need-help-with-i18n-translate-shortcode/39858)
- [gohugo.io - Create your own shortcodes](https://gohugo.io/templates/shortcode/)