---
title: "{{ replace .Name "-" " " | title }}"
description: "Description {{ replace .Name "-" " " | title }}"
mediatype: "video"
channel: ""
event: ""
link: ""
youtubeid: ""
imageaspect: "landscape"
categories:
- "News"
tags:
- ""
id: "{{ .Name | lower }}"
publishdate: "{{ .Date }}"
lastmod: "{{ .Date }}"
type: "media"
---