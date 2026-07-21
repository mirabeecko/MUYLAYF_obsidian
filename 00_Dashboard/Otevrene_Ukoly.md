---
tags:
  - dashboard
  - ukoly
  - dataview
---

# 📋 Otevřené úkoly

```dataview
TABLE status, priority AS "Priorita", due AS "Termín", osoby AS "Osoby", kauza AS "Kauza", popis AS "Popis"
FROM "10_Úkoly"
WHERE status != "hotovo" AND status != "zrušeno"
SORT priority ASC, due ASC
```

---

## Podle priority

### 🔴 Kritická
```dataview
TABLE due AS "Termín", osoby AS "Osoby", kauza AS "Kauza", popis AS "Popis"
FROM "10_Úkoly"
WHERE priority = 1 AND status != "hotovo" AND status != "zrušeno"
SORT due ASC
```

### 🟡 Vysoká
```dataview
TABLE due AS "Termín", osoby AS "Osoby", kauza AS "Kauza", popis AS "Popis"
FROM "10_Úkoly"
WHERE priority = 2 AND status != "hotovo" AND status != "zrušeno"
SORT due ASC
```

### 🟢 Střední
```dataview
TABLE due AS "Termín", osoby AS "Osoby", kauza AS "Kauza", popis AS "Popis"
FROM "10_Úkoly"
WHERE priority = 3 AND status != "hotovo" AND status != "zrušeno"
SORT due ASC
```

---

## Podle kauzy

```dataview
TABLE rows.status AS "Stav", rows.due AS "Termín", rows.popis AS "Popis"
FROM "10_Úkoly"
WHERE status != "hotovo" AND status != "zrušeno"
GROUP BY kauza AS "Kauza"
```
