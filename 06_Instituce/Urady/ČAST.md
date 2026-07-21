---
tags:
  - instituce
  - entita
  - cast
  - sport
datum_vytvoreni: 2026-06-13
typ: spolek
ico:
adresa:
status: aktivní
kontakt:
  - "Miroslav Henžel, registrační komise"
vztah_ke_kauze: Umožnila přestupy vyloučených členů, poškození TJ
osoby:
  - "[[Miroslav_Henzel|Miroslav Henžel]]"
  - "[[Miroslav_Brozek]]"
  - "[[Marek_Vanis]]"
udalosti:
  - "[[11_Chronologie/Kompletni_Chronologie|Kompletní chronologie]]"
dokumenty:
  - "[[03_Dokumenty/Stiznost_CAST_Pro_CUS]]"
dukazy:
  - "[[04_Důkazy/Prestup_Hracu_CAST]]"
poznamky: |
  Česká asociace stolního tenisu.
  Umožnila vyloučeným členům provádět přestupy v rozporu se zájmy TJ.
---

# ČAST

## Základní údaje

| Atribut | Hodnota |
|:--------|:--------|
| **Typ** | Spolek / sportovní asociace |
| **Status** | Aktivní |
| **Vztah ke kauze** | Umožnila přestupy vyloučených členů |

---

## Dataview

```dataview
TABLE datum AS "Datum", udalost AS "Událost", kauza AS "Kauza"
FROM "11_Chronologie"
WHERE contains(instituce, "ČAST")
SORT datum ASC
```
