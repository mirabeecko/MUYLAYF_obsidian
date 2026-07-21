---
tags:
  - kauza
  - trestni-rizeni
  - zpronevera
datum_vytvoreni: 2026-06-13
cislo_jednaci: "KRPU-32057-29/ČJ-2024-040981"
organy:
  - "[[06_Instituce/Urady/Policie_CR|Policie ČR]]"
status: vyšetřování
predmet: Zpronevěra členských příspěvků, podvod, zkreslování údajů o hospodaření
pachatele:
  - "[[Marek_Vanis|Marek Vaniš]]"
  - "[[Jaromir_Pivonka|Jaromír Pivoňka]]"
  - "[[Gustav_Vlach|Gustav Vlach]]"
oznamovatel: "[[Miroslav_Brozek|Miroslav Brožek]]"
---

# TO Zpronevěra

## Základní údaje

| Atribut | Hodnota |
|:--------|:--------|
| **Číslo jednací** | KRPU-32057-29/ČJ-2024-040981 |
| **Orgán** | [[06_Instituce/Urady/Policie_CR|Policie ČR]] |
| **Status** | Vyšetřování |
| **Předmět** | Zpronevěra členských příspěvků, podvod, zkreslování údajů |

---

## Pachatelé

- [[Marek_Vanis|Marek Vaniš]] — § 206 TZ, § 209 TZ, § 254 TZ
- [[Jaromir_Pivonka|Jaromír Pivoňka]] — § 206 TZ, § 254 TZ
- [[Gustav_Vlach|Gustav Vlach]] — § 206 TZ, § 254 TZ

## Oznamovatel

- [[Miroslav_Brozek|Miroslav Brožek]]

---

## Škoda

| Položka | Částka |
|:--------|:-------|
| Stolní tenis (odhad) | 432 000 Kč |
| Lyžaři (přiznaná) | 26 674 Kč |
| **Celkem** | **~500 000 — 800 000 Kč** |

---

## Dokumenty

- [[03_Dokumenty/Trestni_Oznameni_2024|Trestní oznámení]]
- [[03_Dokumenty/Vyrozumeni_Policie_TO_2024|Vyrozumění policie]]

---

## Dataview

```dataview
TABLE datum AS "Datum", udalost AS "Událost", osoby AS "Osoby"
FROM "11_Chronologie"
WHERE contains(kauza, "TO Zpronevěra")
SORT datum ASC
```
