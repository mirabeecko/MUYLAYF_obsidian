---
type: dashboard
---

# DASHBOARD — DATAVIEW

> Tento soubor používá Obsidian Dataview plugin pro dynamické přehledy.

---

## Všechny kartotéky

```dataview
table type, frakce, datum, id
from "_osoby" or "_udalosti" or "_evidence"
sort datum asc
```

---

## Osoby v kauze

```dataview
table role, strana, frakce
from "_osoby"
sort id asc
```

---

## Události chronologicky

```dataview
table datum, nazev, vyznam
from "_udalosti"
sort datum asc
```

---

## Důkazy

```dataview
table datum, soubor, frakce
from "_evidence"
sort datum asc
```

---

## Urgentní items

```dataview
table type, datum, frakce
from "_udalosti"
where vyznam = "urgentni"
```
