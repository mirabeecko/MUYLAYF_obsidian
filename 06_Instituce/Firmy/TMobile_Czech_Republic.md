---
tags:
  - instituce
  - entita
  - tmobile
  - telekomunikace
datum_vytvoreni: 2026-06-13
typ: firma
ico: "60193336"
adresa: Praha
status: aktivní
kontakt:
  - T-Mobile Czech Republic a.s.
vztah_ke_kauze: Nájemce pozemků/vysílače v areálu Komáří vížka, provozovatel elektroinstalace
osoby:
  - "[[Miroslav_Brozek]]"
udalosti:
  - "[[11_Chronologie/Kompletni_Chronologie|Kompletní chronologie]]"
dokumenty:
  - "[[03_Dokumenty/TMobile_Smlouva_Najem]]"
  - "[[03_Dokumenty/TMobile_Komunikace]]"
dukazy:
  - "[[04_Důkazy/Elektroinstalace]]"
  - "[[04_Důkazy/TMobile_Fotografie_Vysilac]]"
poznamky: |
  T-Mobile Czech Republic a.s., IČO 60193336.
  Provozuje telekomunikační vysílač v oblasti Komáří vížka.
  Smluvní vztah k pozemkům a elektroinstalaci vyžaduje detailní analýzu.
---

# T-Mobile Czech Republic a.s.

## Základní údaje

| Atribut | Hodnota |
|:--------|:--------|
| **Typ** | Akciová společnost |
| **IČO** | 60193336 |
| **Sídlo** | Praha |
| **Status** | Aktivní |

---

## Role v kauze

Provozovatel telekomunikační infrastruktury v areálu Komáří vížka. Smluvní vztah k pozemkům, nájemní vztahy a elektroinstalace. Potenciální vliv na hospodaření areálu.

---

> ⚠️ **Otevřené otázky:**
> - Přesná podoba smluvních vztahů mezi T-Mobile a TJ Krupka / Lesy ČR / městem Krupka
> - Stav elektroinstalace a odpovědnost za údržbu
> - Výše nájemného a platební morálka

---

## Dataview

```dataview
TABLE datum AS "Datum", udalost AS "Událost", kauza AS "Kauza"
FROM "11_Chronologie"
WHERE contains(instituce, "T-Mobile")
SORT datum ASC
```
