---
tags:
  - osoba
  - entita
  - tj-krupka
  - problemova-osoba
datum_vytvoreni: 2026-06-13
role: Osoba spojená s městem Krupka a sportovními aktivitami
status: aktivní
vztah_ke_kauze: Spojen s městem Krupka, účast na jednáních týkajících se TJ
osoby:
  - "[[Miroslav_Brozek]]"
udalosti:
  - "[[11_Chronologie/Kompletni_Chronologie|Kompletní chronologie]]"
dokumenty:
  - "[[03_Dokumenty/Schuzka_Mesto_Schneider_Vitu]]"
dukazy:
  - "[[04_Důkazy/Schneider_Komunikace]]"
poznamky: |
  Osoba spojená s městem Krupka.
  Účasten na schůzce MěÚ Krupka, Schneider, Vítů.
  Role v kauze není plně objasněna.
---

# Michal Schneider

## Základní údaje

| Atribut | Hodnota |
|:--------|:--------|
| **Role** | Osoba spojená s městem Krupka |
| **Status** | Aktivní |
| **Vztah ke kauze** | Spojen s městem Krupka, účast na jednáních |

---

## Dataview

```dataview
TABLE datum AS "Datum", udalost AS "Událost", kauza AS "Kauza"
FROM "11_Chronologie"
WHERE contains(osoby, "Michal Schneider")
SORT datum ASC
```
