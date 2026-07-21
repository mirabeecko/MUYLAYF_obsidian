---
tags:
  - pozemek
  - entita
  - komari-vizka
  - lesy-cr
  - vlek
datum_vytvoreni: 2026-06-13
typ: pozemek
cislo_parcely: "660/4"
katastr: Krupka
vlastnik: "[[06_Instituce/Urady/Lesy_CR|Lesy ČR]]"
najemce: "[[06_Instituce/Firmy/TJ_Krupka_zs|TJ Krupka z.s.]]"
výměra: "2 500 m²"
status: aktivní
udalosti:
  - "[[11_Chronologie/Kompletni_Chronologie|Kompletní chronologie]]"
dokumenty:
  - "[[03_Dokumenty/Lesy_CR_Email_2024]]"
dukazy:
  - "[[04_Důkazy/Fotografie_Areal_Komarka]]"
poznamky: |
  Malý vlek v areálu Komáří vížka.
  Výměra 2 500 m².
---

# Pozemek 660/4 (Malý vlek)

## Základní údaje

| Atribut | Hodnota |
|:--------|:--------|
| **Typ** | Pozemek |
| **Číslo parcely** | 660/4 |
| **Katastr** | Krupka |
| **Vlastník** | [[06_Instituce/Urady/Lesy_CR|Lesy ČR]] |
| **Nájemce / uživatel** | [[06_Instituce/Firmy/TJ_Krupka_zs|TJ Krupka z.s.]] |
| **Výměra** | 2 500 m² |
| **Status** | Aktivní |

---

## Dataview

```dataview
TABLE datum AS "Datum", udalost AS "Událost", kauza AS "Kauza"
FROM "11_Chronologie"
WHERE contains(pozemky, "Pozemek 660/4")
SORT datum ASC
```
