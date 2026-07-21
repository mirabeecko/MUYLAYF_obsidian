---
tags:
  - kauza
  - tmobile
  - elektro
  - pozemky
  - komari-vizka
datum_vytvoreni: 2026-06-13
status: monitoring
predmet: Smluvní vztahy T-Mobile k pozemkům a elektroinstalaci v areálu Komáří vížka
strany:
  - "[[06_Instituce/Firmy/TMobile_Czech_Republic|T-Mobile Czech Republic a.s.]]"
  - "[[06_Instituce/Firmy/TJ_Krupka_zs|TJ Krupka z.s.]]"
  - "[[06_Instituce/Urady/Lesy_CR|Lesy ČR]]"
---

# T-Mobile — Pozemky a elektro

## Základní údaje

| Atribut | Hodnota |
|:--------|:--------|
| **Status** | Monitoring |
| **Předmět** | Smluvní vztahy T-Mobile k pozemkům a elektroinstalaci v areálu Komáří vížka |

---

## Strany

- [[06_Instituce/Firmy/TMobile_Czech_Republic|T-Mobile Czech Republic a.s.]] — provozovatel vysílače
- [[06_Instituce/Firmy/TJ_Krupka_zs|TJ Krupka z.s.]] — správce areálu
- [[06_Instituce/Urady/Lesy_CR|Lesy ČR]] — vlastník pozemků

---

## Otevřené otázky

- Přesná podoba smluvních vztahů mezi T-Mobile a TJ Krupka / Lesy ČR / městem Krupka
- Stav elektroinstalace a odpovědnost za údržbu
- Výše nájemného a platební morálka
- Historie smluvních vztahů

---

## Dokumenty

- [[03_Dokumenty/TMobile_Smlouva_Najem|Smlouva o nájmu]]
- [[03_Dokumenty/TMobile_Komunikace|Korespondence]]

---

## Dataview

```dataview
TABLE datum AS "Datum", udalost AS "Událost", osoby AS "Osoby"
FROM "11_Chronologie"
WHERE contains(kauza, "T-Mobile Pozemky")
SORT datum ASC
```
