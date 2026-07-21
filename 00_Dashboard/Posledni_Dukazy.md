---
tags:
  - dashboard
  - dukazy
  - dataview
---

# 🔍 Poslední důkazy

```dataview
TABLE datum AS "Datum", popis AS "Popis", zdroj AS "Zdroj", sila_dukazu AS "Síla", osoby AS "Osoby", kauza AS "Kauza"
FROM "04_Důkazy"
SORT datum DESC
LIMIT 30
```

---

## Důkazy čekající na vyhodnocení

```dataview
TABLE datum AS "Datum", popis AS "Popis", zdroj AS "Zdroj", otevrene_otazky AS "Otevřené otázky"
FROM "04_Důkazy"
WHERE status = "čeká na vyhodnocení"
SORT datum DESC
```
