---
tags:
  - instituce
  - entita
  - sport-krupka
  - mesto-krupka
datum_vytvoreni: 2026-06-13
typ: firma
ico:
adresa: Krupka
status: aktivní
kontakt:
vztah_ke_kauze: Spřízněná firma města Krupka, možný střet zájmů
osoby:
  - "[[Michal_Schneider|Michal Schneider]]"
udalosti:
  - "[[11_Chronologie/Kompletni_Chronologie|Kompletní chronologie]]"
dokumenty:
dukazy:
poznamky: |
  SPORT Krupka s.r.o.
  Spřízněná firma města Krupka.
  Možný střet zájmů v souvislosti s pronájmem sportovních zařízení.
---

# SPORT Krupka s.r.o.

## Základní údaje

| Atribut | Hodnota |
|:--------|:--------|
| **Typ** | Společnost s ručením omezeným |
| **Status** | Aktivní |
| **Vztah ke kauze** | Spřízněná firma města, možný střet zájmů |

---

## Dataview

```dataview
TABLE datum AS "Datum", udalost AS "Událost", kauza AS "Kauza"
FROM "11_Chronologie"
WHERE contains(instituce, "SPORT Krupka")
SORT datum ASC
```
