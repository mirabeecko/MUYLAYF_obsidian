---
tags:
  - pozemek
  - entita
  - komari-vizka
  - lesy-cr
  - traily
datum_vytvoreni: 2026-06-13
typ: pozemek
cislo_parcely: "628/11"
katastr: Krupka
vlastnik: "[[06_Instituce/Urady/Lesy_CR|Lesy ČR]]"
najemce: "[[06_Instituce/Firmy/TJ_Krupka_zs|TJ Krupka z.s.]]"
výměra: "4 209 m²"
status: aktivní
udalosti:
  - "[[11_Chronologie/Kompletni_Chronologie|Kompletní chronologie]]"
dokumenty:
  - "[[03_Dokumenty/Lesy_CR_Zadost_Souhlas_Silnice]]"
dukazy:
  - "[[04_Důkazy/Fotografie_Areal_Komarka]]"
poznamky: |
  Trailové trasy vedle malého vleku.
  Výměra 4 209 m².
---

# Pozemek 628/11 (Trail)

## Základní údaje

| Atribut | Hodnota |
|:--------|:--------|
| **Typ** | Pozemek |
| **Číslo parcely** | 628/11 |
| **Katastr** | Krupka |
| **Vlastník** | [[06_Instituce/Urady/Lesy_CR|Lesy ČR]] |
| **Nájemce / uživatel** | [[06_Instituce/Firmy/TJ_Krupka_zs|TJ Krupka z.s.]] |
| **Výměra** | 4 209 m² |
| **Status** | Aktivní |

---

## Dataview

```dataview
TABLE datum AS "Datum", udalost AS "Událost", kauza AS "Kauza"
FROM "11_Chronologie"
WHERE contains(pozemky, "Pozemek 628/11")
SORT datum ASC
```
