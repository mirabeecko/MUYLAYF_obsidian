---
tags:
  - instituce
  - entita
  - mestska-policie
  - mesto-krupka
datum_vytvoreni: 2026-06-13
typ: policie
ico:
adresa: Krupka
status: aktivní
kontakt:
vztah_ke_kauze: Zásah při výměně zámků, možná spolupráce s vyloučenými členy
osoby:
  - "[[Miroslav_Brozek]]"
  - "[[Marek_Vanis]]"
udalosti:
  - "[[11_Chronologie/Kompletni_Chronologie|Kompletní chronologie]]"
dokumenty:
  - "[[03_Dokumenty/Mesto_Vymena_Zamku_2023]]"
dukazy:
  - "[[04_Důkazy/Prestipnuty_Zamek]]"
poznamky: |
  Městská policie Krupka.
  Účast při výměně zámků 19.1.2023.
---

# Městská policie Krupka

## Základní údaje

| Atribut | Hodnota |
|:--------|:--------|
| **Typ** | Městská policie |
| **Status** | Aktivní |
| **Vztah ke kauze** | Zásah při výměně zámků |

---

## Dataview

```dataview
TABLE datum AS "Datum", udalost AS "Událost", kauza AS "Kauza"
FROM "11_Chronologie"
WHERE contains(instituce, "Městská policie")
SORT datum ASC
```
