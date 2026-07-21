---
tags:
  - kauza
  - lesy-cr
  - bezdůvodne-obohaceni
  - komari-vizka
datum_vytvoreni: 2026-06-13
status: jednání
predmet: Nárok Lesů ČR na bezdůvodné obohacení za užívání pozemků v areálu Komáří vížka
strany:
  - "[[06_Instituce/Urady/Lesy_CR|Lesy ČR]]"
  - "[[06_Instituce/Firmy/TJ_Krupka_zs|TJ Krupka z.s.]]"
  - "[[Gustav_Vlach|Gustav Vlach]]"
---

# Lesy ČR — Bezdůvodné obohacení

## Základní údaje

| Atribut | Hodnota |
|:--------|:--------|
| **Status** | Jednání |
| **Předmět** | Nárok Lesů ČR na bezdůvodné obohacení za užívání pozemků v areálu Komáří vížka |

---

## Strany

- [[06_Instituce/Urady/Lesy_CR|Lesy ČR]] — vlastník pozemků, nárokující si obohacení
- [[06_Instituce/Firmy/TJ_Krupka_zs|TJ Krupka z.s.]] — uživatel areálu
- [[Gustav_Vlach|Gustav Vlach]] — bývalý odpovědný zástupce, potenciálně odpovědný za obohacení

---

## Pozemky

- [[07_Pozemky/Pozemek_628_7_Slalomak|Pozemek 628/7 (Slalomák)]]
- [[07_Pozemky/Pozemek_628_1|Pozemek 628/1]]
- [[07_Pozemky/Pozemek_628_11_Trail|Pozemek 628/11 (Trail)]]
- [[07_Pozemky/Pozemek_660_4_Maly_Vlek|Pozemek 660/4 (Malý vlek)]]

---

## Postoj TJ

Spolek souhlasí s nárokem Lesů ČR v případě, že k obohacení skutečně došlo. V případě, že k obohacení nedošlo z důvodu obohacení třetích osob (Gustav Vlach), podporuje TJ soudní vymáhání od zodpovědných osob.

---

## Dokumenty

- [[03_Dokumenty/Lesy_CR_Email_2024|Emailová komunikace]]
- [[03_Dokumenty/Lesy_CR_Dohoda_Nahoda|Dohoda o náhradě]]

---

## Dataview

```dataview
TABLE datum AS "Datum", udalost AS "Událost", osoby AS "Osoby"
FROM "11_Chronologie"
WHERE contains(kauza, "Lesy ČR Obohacení")
SORT datum ASC
```
