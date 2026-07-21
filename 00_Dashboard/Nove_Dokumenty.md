---
tags:
  - dashboard
  - dokumenty
  - dataview
---

# 📄 Nové dokumenty (poslední 30 dní)

```dataview
TABLE datum AS "Datum", typ AS "Typ", osoby AS "Osoby", kauza AS "Kauza", zpracovano AS "Zpracováno"
FROM "03_Dokumenty"
WHERE datum >= date(today) - dur(30 days)
SORT datum DESC
```

---

## Všechny dokumenty podle data

```dataview
TABLE datum AS "Datum", typ AS "Typ", osoby AS "Osoby", kauza AS "Kauza", zpracovano AS "Zpracováno"
FROM "03_Dokumenty"
SORT datum DESC
```
