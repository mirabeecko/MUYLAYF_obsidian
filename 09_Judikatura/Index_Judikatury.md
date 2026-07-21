---
tags:
  - judikatura
  - index
  - dashboard
datum_vytvoreni: 2026-06-13
---

# ⚖️ Index judikatury

> Přehled judikátů a právních argumentů použitelných v kauze.

---

## Použitelná rozhodnutí

| Judikát | Téma | Vztah k kauze |
|:--------|:-----|:--------------|
| NS ČR 5 Tdo 663/2015 | Zpronevěra — vybírání příspěvků | Identický případ = zpronevěra |
| NS ČR sp. zn. 29 Cdo 4627/2016 | Prekluzivní lhůta § 259 NOZ | Lhůtu nelze prominout |
| NS ČR — § 6, § 8 NOZ | Poctivost a zneužití práva | Soud měl žalobu odmítnout |

---

## Právní argumenty

- **§ 206 TZ** — Zpronevěra
- **§ 209 TZ** — Podvod
- **§ 254 TZ** — Zkreslování údajů o hospodaření
- **§ 6 NOZ** — Poctivost a dobrá víra
- **§ 8 NOZ** — Zákaz zneužití práva
- **§ 239 NOZ** — Vyloučení ze spolku
- **§ 259 NOZ** — Prekluzivní lhůta

---

## Dataview

```dataview
TABLE soud AS "Soud", spisova_znacka AS "Spisová značka", tema AS "Téma", pouziti AS "Použití v kauze"
FROM "09_Judikatura"
SORT soud ASC
```
