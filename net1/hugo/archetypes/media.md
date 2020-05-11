---
title: "{{ replace .Name "-" " " | title }}"
description: "Description {{ replace .Name "-" " " | title }}"
type: "image"
channel: ""
link: ""
youtubeid: ""
imageaspect: "landscape"
categories:
- "News"
tags:
- ""
id: "{{ .Name | lower }}"
publishdate: "{{ now.Format "2006-01-02 15:04 GMT" }}"
lastmod: "{{ now.Format "2006-01-02 15:04 GMT" }}"
---