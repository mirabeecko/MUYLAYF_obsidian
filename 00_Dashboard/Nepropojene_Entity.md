---
tags:
  - dashboard
  - dataview
---

# ⚠️ Nepropojené entity

## Osoby bez událostí

```dataview
LIST
FROM "05_Osoby"
WHERE length(file.inlinks) = 0 AND length(file.outlinks) = 0
```

## Dokumenty bez osob

```dataview
TABLE datum AS "Datum", typ AS "Typ"
FROM "03_Dokumenty"
WHERE !osoby OR osoby = ""
SORT datum DESC
```

## Důkazy bez dokumentů

```dataview
TABLE datum AS "Datum", popis AS "Popis"
FROM "04_Důkazy"
WHERE !souvisejici_dokumenty OR souvisejici_dokumenty = ""
SORT datum DESC
```

## Úkoly bez termínu

```dataview
TABLE status, priority, popis, kauza
FROM "10_Úkoly"
WHERE !due OR due = ""
SORT priority ASC
```
