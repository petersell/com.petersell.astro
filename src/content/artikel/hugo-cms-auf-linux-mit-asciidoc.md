---
title: Hugo CMS mit Asciidoc auf Linux installieren
description: Nach langer Zeit Hugo CMS auf Fedora installiert - mit Fehlermeldung
image: ""
author: Andreas Petersell
date: 2024-11-25T19:44:01.496Z
lastMod: null
draft: false
categories:
  - anleitungen
tags:
  - asciidoc
  - hugo
  - linux
fmContentType: blog
---

Seitdem ich von Windows auf Linux Fedora gewechselt bin, habe ich es versäumt, mir einen lokalen Hugo-Server zu installieren. Nun habe ich das nachgeholt: Mit dem Ergebnis, dass ich mir meine Blogposts vorher lokal anschauen kann, bevor ich sie mit Netlify auf Github veröffentliche.
<!--more-->

**(1)** Auf der Konsole folgenden Befehl absetzen: `$ sudo dnf install hugo`

**(2)** In das Projektverzeichnis gehen. Bei mir ist es: `cd git/github/com.petersell.hugo`

**(3)** Das Kommando `hugo server` eingeben + ENTER. Danach sollte die Homepage im Browser unter *localhost:1313* abrufbar sein. Leider war dies bei mir nicht der Fall. Es erschien diese Fehlermeldung:

```
Error: error building site: "/git/github/com.petersell.hugo/content/blog/essay-ddrprotagonisten.adoc:1:1": access denied: "asciidoctor" is not whitelisted in policy "security.exec.allow"; the current security configuration is:

[security]
  enableInlineShortcodes = false

  [security.exec]
    allow = ['^go$', '^npx$', '^postcss$']
    osEnv = ['(?i)^((HTTPS?|NO)_PROXY|PATH(EXT)?|APPDATA|TE?MP|TERM|GO\w+|(XDG_CONFIG_)?HOME|USERPROFILE|SSH_AUTH_SOCK|DISPLAY|LANG)$']

  [security.funcs]
    getenv = ['^HUGO_', '^CI$']

  [security.http]
    methods = ['(?i)
```

Hier fand ich eine Fehlerbehebung: https://gohugo.io/about/security/

> In [Hugo v0.91.0](https://github.com/gohugoio/hugo/releases/tag/v0.91.0) and newer, you can specify a project’s security policy in a config file.

**(4)** Ich hatte neben Markdown-Dateien auch asciidoc-Dateien in meinem Hugo-Projekt eingebunden. In der Datei *config.toml* in meinem Homepage-Hauptverzeichnis musste ich folgendes hinzufügen: '^asciidoctor$'

```
[security]
  [security.exec]
    allow = ['^go$', '^npx$', '^postcss$', '^asciidoctor$']
```

Jetzt wurde die Homepage gebuildet und war im Browser via *localhost:1313* aufrufbar.

Quelle: https://developer.fedoraproject.org/start/sw/web-app/hugo.html