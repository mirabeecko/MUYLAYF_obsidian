---
tags:
  - dashboard
  - dokumenty
  - dataview
---

# ⏳ Dokumenty čekající na zpracování

```dataview
TABLE datum AS "Datum", typ AS "Typ", osoby AS "Osoby", kauza AS "Kauza", poznamka AS "Poznámka"
FROM "03_Dokumenty"
WHERE zpracovano = false OR zpracovano = "ne"
SORT datum ASC
```

---

## Podle typu

```dataview
TABLE rows.datum AS "Datum", rows.osoby AS "Osoby", rows.kauza AS "Kauza"
FROM "03_Dokumenty"
WHERE zpracovano = false OR zpracovano = "ne"
GROUP BY typ AS "Typ"
```
