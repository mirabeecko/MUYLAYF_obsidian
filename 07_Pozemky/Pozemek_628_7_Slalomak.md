---
tags:
  - pozemek
  - entita
  - komari-vizka
  - lesy-cr
datum_vytvoreni: 2026-06-13
typ: pozemek
cislo_parcely: "628/7"
katastr: Krupka
vlastnik: "[[06_Instituce/Urady/Lesy_CR|Lesy ČR]]"
najemce: "[[06_Instituce/Firmy/TJ_Krupka_zs|TJ Krupka z.s.]]"
výměra: 
status: aktivní
udalosti:
  - "[[11_Chronologie/Kompletni_Chronologie|Kompletní chronologie]]"
dokumenty:
  - "[[03_Dokumenty/Lesy_CR_Dohoda_Nahoda]]"
  - "[[03_Dokumenty/Lesy_CR_Email_2024]]"
dukazy:
  - "[[04_Důkazy/Fotografie_Areal_Komarka]]"
poznamky: |
  Slalomák — sjezdovka v areálu Komáří vížka.
  Nárok Lesů ČR na bezdůvodné obohacení.
  Plánováno využití pro letní provoz (single track).
---

# Pozemek 628/7 (Slalomák)

## Základní údaje

| Atribut | Hodnota |
|:--------|:--------|
| **Typ** | Pozemek |
| **Číslo parcely** | 628/7 |
| **Katastr** | Krupka |
| **Vlastník** | [[06_Instituce/Urady/Lesy_CR|Lesy ČR]] |
| **Nájemce / uživatel** | [[06_Instituce/Firmy/TJ_Krupka_zs|TJ Krupka z.s.]] |
| **Status** | Aktivní |

---

## Využití

- Zimní: sjezdovka pro lyžaře
- Letní: plánován single track (cyklistika)
- Divadelní představení v přírodě

---

## Dataview

```dataview
TABLE datum AS "Datum", udalost AS "Událost", kauza AS "Kauza"
FROM "11_Chronologie"
WHERE contains(pozemky, "Pozemek 628/7")
SORT datum ASC
```
