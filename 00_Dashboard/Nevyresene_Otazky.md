---
tags:
  - dashboard
  - dataview
---

# ❓ Nevyřešené otázky

```dataview
TABLE datum AS "Datum", otazka AS "Otázka", osoby AS "Osoby", kauza AS "Kauza", priorita AS "Priorita"
FROM "10_Úkoly"
WHERE status = "otevřená otázka"
SORT priorita ASC, datum DESC
```

---

## Právní nejistoty

```dataview
TABLE datum AS "Datum", otazka AS "Otázka", osoby AS "Osoby", kauza AS "Kauza"
FROM "10_Úkoly"
WHERE status = "otevřená otázka" AND contains(lower(otazka), "právn")
SORT datum DESC
```

---

## Důkazní nejistoty

```dataview
TABLE datum AS "Datum", otazka AS "Otázka", osoby AS "Osoby", kauza AS "Kauza"
FROM "10_Úkoly"
WHERE status = "otevřená otázka" AND contains(lower(otazka), "důkaz")
SORT datum DESC
```
