---
tags:
  - instituce
  - entita
  - policie
  - trestni-rizeni
datum_vytvoreni: 2026-06-13
typ: policie
ico:
adresa: Ústecký kraj
status: aktivní
kontakt:
  - Policie ČR, Krajské ředitelství Ústeckého kraje
vztah_ke_kauze: Vyšetřování trestné činnosti v souvislosti s TJ Krupka
osoby:
  - "[[Miroslav_Brozek]]"
  - "[[Marek_Vanis]]"
  - "[[Jaromir_Pivonka]]"
  - "[[Gustav_Vlach]]"
udalosti:
  - "[[11_Chronologie/Kompletni_Chronologie|Kompletní chronologie]]"
dokumenty:
  - "[[03_Dokumenty/Trestni_Oznameni_2024]]"
  - "[[03_Dokumenty/Vyrozumeni_Policie_TO_2024]]"
dukazy:
  - "[[04_Důkazy/Policejni_Vyslech_Vanis]]"
  - "[[04_Důkazy/Policejni_Vyslech_Vlach]]"
poznamky: |
  č.j. KRPU-32057-29/ČJ-2024-040981
  Vyšetřování trestné činnosti (zpronevěra, podvod, zkreslování údajů).
  Vyrozumění ze dne 31.5.2024.
  Výslechy Vaniše a Vlacha — přiznání.
---

# Policie ČR

## Základní údaje

| Atribut | Hodnota |
|:--------|:--------|
| **Typ** | Policie |
| **Status** | Aktivní |
| **Vztah ke kauze** | Vyšetřování trestné činnosti |

---

## Trestní oznámení

| Číslo jednací | Datum | Stav |
|:--------------|:------|:-----|
| KRPU-32057-29/ČJ-2024-040981 | 25.1.2024 | Vyšetřování |

---

## Dataview

```dataview
TABLE datum AS "Datum", udalost AS "Událost", kauza AS "Kauza"
FROM "11_Chronologie"
WHERE contains(instituce, "Policie")
SORT datum ASC
```
