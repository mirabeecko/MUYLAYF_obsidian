---
tags:
  - osoba
  - entita
  - cast
  - funkcionar
datum_vytvoreni: 2026-06-13
role: ČAST, registrační komise
status: aktivní
vztah_ke_kauze: Umožnil přestupy vyloučených členů, jednal v rozporu se zájmy TJ
osoby:
  - "[[Miroslav_Brozek]]"
  - "[[Marek_Vanis]]"
udalosti:
  - "[[11_Chronologie/Kompletni_Chronologie|Kompletní chronologie]]"
dokumenty:
  - "[[03_Dokumenty/Stiznost_CAST_Pro_CUS]]"
dukazy:
  - "[[04_Důkazy/Prestup_Hracu_CAST]]"
poznamky: |
  ČAST umožnila vyloučeným členům provádět přestupy.
  Poškození zájmů TJ Krupka.
---

# Miroslav Henžel

## Základní údaje

| Atribut | Hodnota |
|:--------|:--------|
| **Role** | ČAST, registrační komise |
| **Status** | Aktivní |
| **Vztah ke kauze** | Umožnil přestupy vyloučených členů |

---

## Dataview

```dataview
TABLE datum AS "Datum", udalost AS "Událost", kauza AS "Kauza"
FROM "11_Chronologie"
WHERE contains(osoby, "Miroslav Henžel")
SORT datum ASC
```
