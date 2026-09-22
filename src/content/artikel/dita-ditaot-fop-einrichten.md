---
author: Andreas Petersell
title: FOP für das DITA-OT 2.4.5 einrichten
date: 2017-04-23
draft: true
categories:
    - anleitungen
tags:
    - dita-xml
---


Als ich 2008 mit DITA-XML anfing, war der Open Source Apache FOP-Prozessor nicht in der Lage, ein Stichwortverzeichnis auszugeben. Darum mußte ich auf den _XEP-Prozessor Personal Edition_ zurückgreifen. Dieser gibt jedoch eine Fusszeile aus, die besagt, dass die Software nicht für den kommerziellen Einsatz bestimmt ist. Inzwischen kann unter FOP ein Stichwortverzeichnis generiert werden und ich sattle um. Sämtliche PDF-Einstellungen müssen für den Einsatz unter FOP neu eingerichtet werden.
<!--more-->


### Bilder werden nicht an A4 angepaßt

Die Bilder haben viel zu große Abmasse, trotz 72dpi und max. 600px Breite. Eine Lösungsansatz fand ich hier bei [infotexture.net](http://infotexture.net/2010/03/dita-ot-scaling-images-in-pdf-output/)

Für mich ergaben sich aus dem og. Hinweis folgende Handlungsschritte:

1. In der Datei `DITA-OT-2.4.5/plugins/org.dita.pdf2.fop/cfg/fop.xconf` von 72 dpi auf 120 dpi erhöhen: `<source-resolution>120</source-resolution>` und `<target-resolution>120</target-resolution>`
2. Eine `pdf.properties`-Datei erstellen, die den obigen Pfad der `fop.xconf` enthält:
`args.fo.userconfig = ${dita.dir}/plugins/org.dita.pdf2.fop/cfg/fop.xconf`
3. Die Properties-Datei in den DITA-OT-build-Befehl aufnehmen:
`dita -i D:\publikation.ditamap -f pdf -v -o D:\DITA-OUT -propertyfile D:\build\pdf.properties`

### Related Links ausblenden

In die so eben erstellte Datei `pdf.properties` gilt es folgenden Wert zu vermerken: `args.rellinks = none`

### Formatierungen in ein Extra-Plugin

Für folgende Abweichungen müssen neue Templates her:

- Deckblatt mit z,B. blauem und orangefarbenen Titel und Titelbild (DITA for Print)
- Bildunterschriften sollen kleiner werden und kursiv
- In der Header-Zeile muß der jeweilige Topic-Titel ausgeben werden (DITA for Print)
- Topics erster Ebene sollen auf einer neuer Seite starten

Damit die Formartierungen beim DITA-OT-Update erhalten bleiben, müssen die neuen Templates in ein neues PDF-Plugin ausgelagert werden. Die Templates dazu werden PDF2-Plugin des neuen DITA-OTs 2.4.5 entnommen und in das neue Plugin kopiert. Die Template-Beispiele entnahm ich dem Buch _DITA for Print: A DITA Open Toolkit Workbook_ von Leigh W. White.

Ich musste mehr Template-Dateien ins Plugin aufnehmen als im Buch vorgesehen. Das Buch von Leight W. White ist sehr verständlich und funktioniert beim DITA-OT 2.4.5 auch noch mit der 1. Ausgabe. Die Anpassungen sind jedoch zu umfangreich, um sie hier abzubilden.

Hier noch weitere geänderte Templates.

#### A4 einstellen

In `DITA-OT2.4.5\plugins\com.hsh-berlin.custpdf\cfg\fo\attrs\basic-settings.xml`

```
<xsl:variable name="page-width">210mm</xsl:variable>
<xsl:variable name="page-height">297mm</xsl:variable>
```
  
#### Bildunterschrift verkleinern

In `DITA-OT2.4.5\plugins\com.hsh-berlin.custpdf\cfg\fo\attrs\common-attr.xml`

```
<xsl:attribute-set name="fig.title" use-attribute-sets="base-font common.title">
     <xsl:attribute name="font-weight">normal</xsl:attribute>
     <xsl:attribute name="font-size">8pt</xsl:attribute>
     <xsl:attribute name="font-style">italic</xsl:attribute>
</xsl:attribute-set>
```

#### Topics 1. Ebene auf neuer Seite starten

Quelle: [https://www.oxygenxml.com/forum/topic12752.html](https://www.oxygenxml.com/forum/topic12752.htm)

In `DITA-OT2.4.5\plugins\com.hsh-berlin.custpdf\cfg\fo\attrs\commons-attr.xsl`

```
<xsl:attribute-set name="topic.title" use-attribute-sets="common.title common.border__bottom">
     <xsl:attribute name="break-before">page</xsl:attribute>
        ...
</xsl:attribute-set> 
```
Alle fehlenden Templates finden sich im Buch _DITA for Print_. Das Auslagern meiner individuellen Formatierungen in ein eingenes PDF-Plugin erlaubt mir, letzteres auch in eine neue DITA-OT-Installation bequem zu übernehmen.