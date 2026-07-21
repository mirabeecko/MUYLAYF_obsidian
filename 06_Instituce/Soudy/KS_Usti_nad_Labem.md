---
tags:
  - instituce
  - entita
  - soud
  - krajsky-soud
datum_vytvoreni: 2026-06-13
typ: soud
ico:
adresa: Ústí nad Labem
status: aktivní
kontakt:
  - Krajský soud v Ústí nad Labem
vztah_ke_kauze: Soud prvního stupně ve sporech o neplatnost rozhodnutí spolku
osoby:
  - "[[Miroslav_Brozek]]"
  - "[[Marek_Vanis]]"
  - "[[Jaromir_Pivonka]]"
  - "[[Gustav_Vlach]]"
  - "[[Martin_Kulik]]"
udalosti:
  - "[[11_Chronologie/Kompletni_Chronologie|Kompletní chronologie]]"
dokumenty:
  - "[[03_Dokumenty/Rozhodnuti_KS_Usti_68Cm85_2024]]"
  - "[[03_Dokumenty/Rozhodnuti_KS_Usti_68Cm87_2024]]"
  - "[[03_Dokumenty/Odvolani_Krajsky_Soud_2024]]"
dukazy:
  - "[[04_Důkazy/Soudni_Zapisnice]]"
poznamky: |
  Sp. zn. 68 Cm 85/2024 — neplatnost shromáždění delegátů.
  Sp. zn. 68 Cm 87/2024 — neplatnost vyloučení.
  KS Ústí určil nicotnost vyloučení.
  Odvolání zastaveno pro opožděný poplatek 2 000 Kč.
---

# Krajský soud v Ústí nad Labem

## Základní údaje

| Atribut | Hodnota |
|:--------|:--------|
| **Typ** | Krajský soud |
| **Status** | Aktivní |
| **Vztah ke kauze** | Soud prvního stupně |

---

## Řízení

| Spisová značka | Předmět | Stav |
|:---------------|:--------|:-----|
| **68 Cm 85/2024** | Neplatnost shromáždění delegátů | Probíhá |
| **68 Cm 87/2024** | Neplatnost vyloučení | KS určil nicotnost |
| **2 Cmo 11/2026** | Odvolání MB | Zastaveno pro opožděný poplatek |

---

## Dataview

```dataview
TABLE datum AS "Datum", udalost AS "Událost", kauza AS "Kauza"
FROM "11_Chronologie"
WHERE contains(instituce, "Krajský soud")
SORT datum ASC
```
