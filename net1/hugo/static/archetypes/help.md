---
title: "{{replace .Name "-" " " | title }}"
publishdate: "{{ now.Format "2006-01-02" }}"
lastmod": {{ now.Format "2006-01-02" }}"
description: "Help documentation: {{ replace .Name "-" " " | title }}"
categories:
- ""
---
