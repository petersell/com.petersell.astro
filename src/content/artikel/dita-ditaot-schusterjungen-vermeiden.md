---
author: Andreas Petersell
title: Schusterjungen im PDF-Output des DITA-OT vermeiden
date: 2012-11-23
draft: false
categories:
  - anleitungen
tags:
  - dita-xml
  - techcomm
---


Das DITA Open Toolkit ist ein Open Source Tool für das Generieren von Ausgabeformaten für Inhalte, die mittels DITA XML erstellt wurden. Es kommt öfter vor, dass sich der Seitentitel und die Kurzbeschreibung (shortdesc) als letzte unten auf einer PDF-Seite wiederfinden und der Textkörper erst auf der nächsten Seite folgt.
<!--more-->

Das sieht unschön aus. Doch unter [data2type](https://www.data2type.de/xml-xslt-xslfo/xsl-fo/xslfo-einfuehrung/typografische-mittel/) wurde ich fündig.

Folgende umbruchverhindernde Attribute für `shortdesc` gilt es, im PDF-Plugin in der Datei `cfg/fo/attrs/commons-attr.xsl` hinzufügen:

```xml
<xsl:attribute-set name="topic__shortdesc" use-attribute-sets="body">
  <xsl:attribute name="keep-with-previous.within-page">always</xsl:attribute>
  <xsl:attribute name="keep-with-next.within-page">always</xsl:attribute>
</xsl:attribute-set>
```