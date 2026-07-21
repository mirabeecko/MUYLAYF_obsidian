---
tags:
  - instituce
  - entita
  - uzsv
  - statni-sprava
datum_vytvoreni: 2026-06-13
typ: úřad
ico:
adresa:
status: aktivní
kontakt:
vztah_ke_kauze: Úřad pro zastupování státu ve věcech majetkových — potenciální kontakt v majetkových sporech
osoby:
  - "[[Miroslav_Brozek]]"
udalosti:
dokumenty:
dukazy:
poznamky: |
  Úřad pro zastupování státu ve věcech majetkových.
  Potenciální kontakt v majetkových sporech (Lesy ČR, pozemky).
---

# Úřad pro zastupování státu ve věcech majetkových

## Základní údaje

| Atribut | Hodnota |
|:--------|:--------|
| **Typ** | Úřad |
| **Status** | Aktivní |
| **Vztah ke kauze** | Potenciální kontakt v majetkových sporech |

---

## Dataview

```dataview
TABLE datum AS "Datum", udalost AS "Událost", kauza AS "Kauza"
FROM "11_Chronologie"
WHERE contains(instituce, "Úřad pro zastupování")
SORT datum ASC
```
