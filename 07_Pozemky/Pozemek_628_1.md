---
tags:
  - pozemek
  - entita
  - komari-vizka
  - lesy-cr
datum_vytvoreni: 2026-06-13
typ: pozemek
cislo_parcely: "628/1"
katastr: Krupka
vlastnik: "[[06_Instituce/Urady/Lesy_CR|Lesy ČR]]"
najemce: "[[06_Instituce/Firmy/TJ_Krupka_zs|TJ Krupka z.s.]]"
výměra: 
status: aktivní
udalosti:
  - "[[11_Chronologie/Kompletni_Chronologie|Kompletní chronologie]]"
dokumenty:
  - "[[03_Dokumenty/Lesy_CR_Email_2024]]"
dukazy:
  - "[[04_Důkazy/Fotografie_Areal_Komarka]]"
poznamky: |
  Oblast vedle malého vleku a pod ním.
  Plánováno vytvoření trailových stop.
---

# Pozemek 628/1

## Základní údaje

| Atribut | Hodnota |
|:--------|:--------|
| **Typ** | Pozemek |
| **Číslo parcely** | 628/1 |
| **Katastr** | Krupka |
| **Vlastník** | [[06_Instituce/Urady/Lesy_CR|Lesy ČR]] |
| **Nájemce / uživatel** | [[06_Instituce/Firmy/TJ_Krupka_zs|TJ Krupka z.s.]] |
| **Status** | Aktivní |

---

## Dataview

```dataview
TABLE datum AS "Datum", udalost AS "Událost", kauza AS "Kauza"
FROM "11_Chronologie"
WHERE contains(pozemky, "Pozemek 628/1")
SORT datum ASC
```
