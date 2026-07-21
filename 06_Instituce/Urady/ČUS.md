---
tags:
  - instituce
  - entita
  - cus
  - sport
datum_vytvoreni: 2026-06-13
typ: spolek
ico:
adresa:
status: aktivní
kontakt:
vztah_ke_kauze: Nadřízená organizace, možnost podání stížnosti
osoby:
  - "[[Miroslav_Brozek]]"
udalosti:
  - "[[11_Chronologie/Kompletni_Chronologie|Kompletní chronologie]]"
dokumenty:
  - "[[03_Dokumenty/Stiznost_CAST_Pro_CUS]]"
dukazy:
poznamky: |
  Česká unie sportu.
  Nadřízená organizace pro ČAST.
  Možnost podání podnětu / stížnosti.
---

# ČUS

## Základní údaje

| Atribut | Hodnota |
|:--------|:--------|
| **Typ** | Spolek / sportovní unie |
| **Status** | Aktivní |
| **Vztah ke kauze** | Nadřízená organizace, možnost podání stížnosti |

---

## Dataview

```dataview
TABLE datum AS "Datum", udalost AS "Událost", kauza AS "Kauza"
FROM "11_Chronologie"
WHERE contains(instituce, "ČUS")
SORT datum ASC
```
