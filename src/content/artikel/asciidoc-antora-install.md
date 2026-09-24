---
author: Andreas Petersell
title: Antora lokal installieren
date: 2020-06-03T12:15:42+02:00
draft: false
categories:
    - anleitungen
tags:
    - asciidoc
    - techcomm
---


Antora ist so etwas wie ein _Static Site Generator_ für Technische Redakteure. Der Content wird in Asciidoc geschrieben und kann sich in verschiedenen Git-Repositorys befinden. 
<!--more-->


### Quellen

* [Antora-Dokumentation](https://docs.antora.org/antora/2.2/install/windows-requirements/)

### Kontext

Dieser Artikel ist eine Dokumentation der Installation von Antora auf meinem Privatrechner. Das kann auf jedem anderen PC anders aussehen. Warum _Privatrechner?_ Dieses Wort steht für die Kombination aus den begrenzten PC-Kenntnissen eine Redakteurs - aber gepaart mit vollen Adminrechten.

### 1) Update Node.js für Windows mit Installer

Auf https://nodejs.org/en/download/ gilt es, den passenden Long Term Support-Installer zu downloaden. In meinem Fall _LTS Windows Installer (.msi) 64-bit_. Führen Sie die Datei per Doppelklick aus.

Nach dem Installer habe ich noch das nachfolgende Skript _Tools for Node.js Native Module Installation Script_ gestartet. Dies dauerte einige Minuten und installierte via Chocolatey jede Menge Komponenten.

![Chocolatey-Installation](../images/asciidoc-antora-install/install-node4.png)
 
Das Ergebnis in der PowerShell ergab diese Versionen.

```
C:\Users\Andreas> npm --version
6.14.4
C:\Users\Andreas> node --version
v12.16.3
```

### 2) Antora installieren

Wie in der Antora-Dokumenation beschrieben, geben Sie den Installationsbefehl für eine globale Installation von Antora ein.

**Ausführen in der PowerShell**

```
$ npm i -g @antora/cli@2.2 @antora/site-generator-default@2.2
```

Anschließend führen Sie `antora version` aus, um sich vom Erfolg der Installation zu überzeugen. Bei mir endete es in einer Fehlermeldung.

**Fehlermeldung**

```
Die Datei "C:\Users\Andreas\AppData\Roaming\npm\antora.ps1" kann nicht geladen werden. Die Datei
"C:\Users\Andreas\AppData\Roaming\npm\antora.ps1" ist nicht digital signiert. Sie können dieses Skript im aktuellen System nicht ausführen. Weitere Informationen zum Ausführen von Skripts und Festlegen der Ausführungsrichtlinie erhalten Sie unter "about_Execution_Policies" (https:/go.microsoft.com/fwlink/?LinkID=135170)..
```

Auf der angegebenen URL von Microsoft https:/go.microsoft.com/fwlink/?LinkID=135170 wurde ich fündig.

![Ausführungsrichtlinie ändern](../images/asciidoc-antora-install/antora-version.png)

Es gilt herauszufinden, welche Ausführungsrichtlinien innerhalb der PowerShell für mich als Nutzer gelten:

**Ausführen in der PowerShell**

```
Get-ExecutionPolicy -Scope CurrentUser
```

Für mich auf dem Windows-Client galt _Undefined_. Um meine Rechte auf der PowerShell meines Rechners zu erweitern, musste ich eingeben:

**Ausführen in der PowerShell**

```
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Ein nochmaliges Ausführen von `antora version` gab die korrekte Versionsnummer `2.2.0` zurück.

### 3) Antora-Demo-Projekt generieren

Um zu einem schnellen Ergebnis zu kommen, habe ich das Beispielprojekt _Demo Docs Site_ auf https://gitlab.com/antora/demo/docs-site generiert. Um es clonen zu können, habe ich mir einen Gitlab-Account angelegt. Für diesen Account musste ich mir ein [SSH-Key einrichten](https://www.hrz.tu-darmstadt.de/speicherplatz_datensicherung_und_server/virtuelle_server/anleitung_sammlung/artikel_details_22784.de.jsp) und in den Nutzer-Einstellungen unter _SSH-Keys_ hinterlegen. Nun konnte ich das Beispielprojekt _Demo Docs Site_ fehlerfrei clonen.

![Beispielrepo clonen](../images/asciidoc-antora-install/clone-beispielrepo2.png)

Öffnen Sie ein PowerShell-Fenster im neu entstandenen Ordner `docs-site` und geben Sie den Build-Befehl ein.

**Ausführen in der PowerShell**

```
C:\Daten\antora\docs-site> antora antora-playbook.yml
```

Der Befehl clont zwei Repositorys. Im Ergebnis entsteht innerhalb des Ordners `docs-site` ein neuer Ordner `build` mit dem HTML-Output des Beispielprojekts .