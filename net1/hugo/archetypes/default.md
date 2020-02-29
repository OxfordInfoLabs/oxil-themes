---
title: "{{replace .Name "-" " " | title }}"
publishdate: "{{ now.Format "2006-01-02" }}"
lastmod": {{ now.Format "2006-01-02" }}"
description: "About {{ replace .Name "-" " " | title }}"
categories:
- ""
canonical_part: "{{.File.Dir}}{{.Name}}/"

---



