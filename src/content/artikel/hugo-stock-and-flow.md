---
author: Andreas Petersell
title: Hugo mit Stock and Flow
date: 2020-04-17T16:40:39+02:00
draft: false
categories:
  - konzepte
tags:
  - hugo
  - blogging
---

Wie unterscheide ich im CMS Hugo Stock and Flow? Jeder, der sich mit Blogging beschäftigt, stößt eines Tages auf Robin Sloan und seinem Gleichnis vom [Stock and Flow](http://snarkmarket.com/2010/4890).
<!--more-->

> **Flow** is the feed. It’s the posts and the tweets. It’s the stream of daily and sub-daily updates that reminds people you exist.
>
> **Stock** is the durable stuff. It’s the content you produce that’s as interesting in two months (or two years) as it is today. It’s what people discover via search. It’s what spreads slowly but surely, building fans over time.
>
> — Robin Sloan, http://snarkmarket.com/2010/4890

In meinem alten [CMS Known](https://withknown.com/) gab es nur einen Stream: längere eigene Texte und kurze Statusmeldungen wurden in einer _Timeline_ angezeigt. Doch sind eigene Essays und abgeschriebene Zitate von anderen Autoren wirklich von einem gleichen Gewicht? Nein. Also habe ich im CMS Hugo eine Trennung des Stock und Flows vorgenommen: _Blog_ ist der _Stock_ und _Status_ der _Flow_.

In Hugo habe ich einfach sämtliche Blog-Layouts dupliziert und den Namen _Status_ angepinnt. Jedoch wurden auf der Startseite der Homepage immer nur die Blogbeiträge ausgegeben - die Statusbeiträge fehlten. Jetzt wurde ich in der [Hugo-Dokumentation](https://gohugo.io/functions/where/#mainsections) fündig. Es gilt, in der Konfigurationsdatei `config.toml` einen kleinen Eintrag vorzunehmen:

```
[params]
  mainSections = ["blog", "status"]
```