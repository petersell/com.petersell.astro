---
title: Einen Habit-Tracker mit Obsidian erstellen
author: Andreas Petersell
date: 2024-03-10
headless: false
draft: false
categories:
  - anleitungen
tags:
  - obsidian
preview: null
---

Statt Zettelkasten und meinen Roman zu schreiben, erstelle ich mit Obsidian einen Habit-Tracker. Das Prokrastinieren wird durch [Obisidian](https://obsidian.md/) auf eine ganz neue Ebene gehoben.
<!--more-->

Jeder der etwas auf sich hält, hat *Atomic Habits* von James Clear gelesen und werkelt mit Obsidian herum, das gelesene irgendwie umzusetzen. Ich auch, denn es macht einfach Spaß.

## Zweimal wöchentlich laufen

Zweimal in der Woche möchte ich mindestens joggen gehen. Besser noch dreimal. Beides verbuche ich als Erfolg. Jahrelang habe ich mir diesen Erfolg in meinen Taschenkalender eingetragen. Jetzt gibt es aber Obsidian.

Ich möchte in einer Monatsübersicht sehen, wie oft ich in jeder Woche joggen war. Dazu habe ich mir das Plugin *Tracker* installiert.

### Tracker einrichten - Monatsübersicht

1. In meinem *Daily Template* richte ich im YAML-Header einen neuen Wert  *jogging:* ein. Hier muss später in jeder neu erstellten Tagesnotiz hinter dem Doppelpunkt eine 0 oder 1 eingetragen werden - je nach dem, ob ich joggen war.
2. In die Tagesnotizen der letzten Wochen trage ich rückwirkend ebenfalls den Wert *joggen: 0/1* ein, je nach dem, ob ich an diesen Tagen joggen war.
3. Ich lege einen neuen Ordner *Habits* an.
4. Ich lege eine neue Notiz *Jogging Tracker* in diesem Ordner an. Es entsteht also eine Datei `Habits/Jogging Tracker.md`.
5. In diese Notiz trage ich folgendes ein:

```
---tracker
searchType: frontmatter
searchTarget: jogging
folder: Journal/01 - Daily/2024-daily
datasetName: Jogging
month:
  startWeekOn: Mon
---
```

Hinweis: anstelle der 3 Bindestriche müssen die 3 Apostrophe (Auslassungszeichen) der Tracker-Syntax gesetzt werden.

Das Verzeichnis unter *folder* ist das Verzeichnis, wo derzeit meine Tagesnotizen gespeichert werden.

Gehe ich nun aus der *Bearbeiten*-Ansicht heraus, zeigt sich ein Monatskalender mit farbigen Kreisen an den Tagen, an denen ich joggen war. Da ich die Woche mit *Montag* anfangen lassen möchte, füge ich `startWeekOn: Mon` unter `month` hinzu.

![Wochenübersicht](../images/obsidian/habit-tracker-month.png)

## Unter 14 Minuten laufen

Das Joggen allein ist schon ein Erfolg. Man hat seinen inneren Schweinehund überwunden und das Haus verlassen. Aber ein bisschen Ehrgeiz entwickelt man auch. So habe ich mir vorgenommen, nicht jeden Tag 1% besser zu werden wie James Clear, aber doch mindestens unter 14 Minuten zu bleiben. Um zu sehen, wie oft ich meine Mindestanforderung nicht erfüllen konnte, habe ich mir ein schönes Liniendiagramm gebastelt.

### Tracker einrichten - Liniendiagramm

1. In meinem *Daily Template* habe ich im YAML-Header  einen weiteren Wert einführt: *joggingzeit:*.
2. In die Tagesnotizen der letzten Wochen trage ich ebenfalls diesen Wert *joggingzeit:* ein. In meinem Taschenkalender stehen meine notierten Zeiten der vergangen Jogging-Touren. Jedoch statt *13,12* für 13 Minuten und 12 Sekunden trage ich *13.12* hinter den Wert *joggingzeit:* ein. Statt des Kommas also einen Punkt.
4. Ich erstelle eine neue Notiz *Joggingzeit Tracker* in meinem neuen Ordner *Habits*.
5. In diese Notiz trage ich folgendes:

```
---tracker
searchType: frontmatter
searchTarget: joggingtime
folder: Journal/01 - Daily/2024-daily
line:
	fillGap: true
	reverseYAxis: true
---
```

Wechsle ich nun vom Editier-Modus in die Lese-Ansicht, zeigt sich ein Graph mit X- und Y-Achse und einer Linie zwischen den Zeitwerten.

![Liniendiagramm](../images/obsidian/habit-tracker-line.png)

Damit zwischen den unregelmäßigen Datumsangaben eine Linie gezogen wird, muss das Attribut `fillGap: true` zur *line* hinzugefügt werden.

Damit die höchste Zeit als schlechtes Ergebnis ausgegeben wird, muss die Y-Achse umgedreht werden mit `reverseYAxis: true`.

Quelle und Inspiration:
1. https://www.youtube.com/watch?v=W_leEJHBZW4
2. https://github.com/pyrochlore/obsidian-tracker/blob/master/docs/InputParameters.md