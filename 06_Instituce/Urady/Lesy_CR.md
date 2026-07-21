---
tags:
  - instituce
  - entita
  - lesy-cr
  - statni-podnik
datum_vytvoreni: 2026-06-13
typ: státní podnik
ico: "01390699"
adresa: Praha
status: aktivní
kontakt:
  - "p. Kilb"
  - "p. Tučková"
vztah_ke_kauze: Vlastník pozemků v areálu Komáří vížka, nárok na bezdůvodné obohacení
osoby:
  - "[[Miroslav_Brozek]]"
  - "[[Gustav_Vlach]]"
udalosti:
  - "[[11_Chronologie/Kompletni_Chronologie|Kompletní chronologie]]"
dokumenty:
  - "[[03_Dokumenty/Lesy_CR_Dohoda_Nahoda]]"
  - "[[03_Dokumenty/Lesy_CR_Email_2024]]"
  - "[[03_Dokumenty/Lesy_CR_Zadost_Souhlas_Silnice]]"
dukazy:
  - "[[04_Důkazy/Lesy_CR_Faktura_2021_2022]]"
  - "[[04_Důkazy/Fotografie_Areal_Komarka]]"
poznamky: |
  Státní podnik Lesy České republiky, s.p.
  Vlastník pozemků č.parc. 628/7 (Slalomák), 628/1, 628/11, 660/4.
  Nárok na bezdůvodné obohacení za užívání pozemků.
  Jednání o splátkovém kalendáři a budoucím využití areálu.
---

# Lesy ČR

## Základní údaje

| Atribut | Hodnota |
|:--------|:--------|
| **Typ** | Státní podnik |
| **IČO** | 01390699 |
| **Status** | Aktivní |
| **Vztah ke kauze** | Vlastník pozemků, nárok na bezdůvodné obohacení |

---

## Vlastněné pozemky v areálu

| Pozemek | Popis | Výměra |
|:--------|:------|:-------|
| **628/7** | Slalomák — sjezdovka | — |
| **628/1** | Oblast vedle malého vleku a pod ním | — |
| **628/11** | Trailové trasy | 4 209 m² |
| **660/4** | Malý vlek | 2 500 m² |

---

## Role v kauze

- **Vlastník pozemků** v areálu Komáří vížka
- **Nárok na bezdůvodné obohacení** — spolek užíval pozemky bez platného právního důvodu v některých obdobích
- **Jednání o budoucnosti** — trail park, letní provoz, údržba
- Kontaktní osoby: p. Kilb, p. Tučková

---

## Dataview

```dataview
TABLE datum AS "Datum", udalost AS "Událost", kauza AS "Kauza"
FROM "11_Chronologie"
WHERE contains(instituce, "Lesy ČR")
SORT datum ASC
```
