---
title: Verification of your Subdomain for a gitlab Project
image: ""
author: Andreas Petersell
date: 2025-05-19T15:40:36.542Z
lastMod: null
draft: false
categories:
    - anleitungen
tags:
    - hugo
    - blogging
fmContentType: blog
---

You have a project on gitlab with the URL *myname.gitlab.io/project* and would now like to redirect your subdomain *www.myname.com* to your project in addition to your root domain *myname.com*.
<!--more-->

Quelle: [GitLab Pages custom domains](https://docs.gitlab.com/user/project/pages/custom_domains_ssl_tls_certification/)

<!-- FM:Snippet:Start data:{"id":"Admonition - Voraussetzung","fields":[]} -->
> **Info**
>
> You have access to the DNS entries of your domains with your web hosting service provider.
<!-- FM:Snippet:End -->

### CNAME worked fine

This is not a guide, as every web host service provider uses different forms to enter the various DNS entries.

Mine uses the following values:

|Subdomain |Domain    	|Typ   	|Content   	|
|---	|---	|---	|---	|
|www   	|myname.com   	|CNAME   	|myname.gitlab.io.  	|

And so the CNAME entry worked immediately.

### Verification by trial and error

But it took me days to complete the verification. The Gitlab documentation uses this syntax as a default and alludes to the command line level.

```
_gitlab-pages-verification-code.www.myname.com TXT gitlab-pages-verification-code=31e837733dd7174ada938b64
```

However, this example is not clear when filling in the form above. After several attempts, the following entry in the table worked.

|Subdomain |Domain    	|Typ   	|Content   	|
|---	|---	|---	|---	|
|_gitlab-pages-verification-code.www 	|myname.com   	|TXT  	|gitlab-pages-verification-code=31e837733dd7174ada938b64 	|

The verification status finally turned green: *Verified!*

At https://dnschecker.org/ you can check whether the TXT entries are recognized. Fill in *_gitlab-pages-verification-code.www.myname.com* and select *TXT*. 