---
tags:
  - osoba
  - entita
  - tj-krupka
  - problemova-osoba
  - zanikle-clenstvi
datum_vytvoreni: 2026-06-13
role: Bývalý údajný předseda oddílu karate
status: zánik členství
vztah_ke_kauze: Neplatič, neoprávněný vydávající se za předsedu oddílu
osoby:
  - "[[Miroslav_Brozek]]"
udalosti:
  - "[[11_Chronologie/Kompletni_Chronologie|Kompletní chronologie]]"
dokumenty:
  - "[[03_Dokumenty/Vyzva_Kulik_2021]]"
  - "[[03_Dokumenty/Zanik_Clenstvi_Kulik_2024]]"
dukazy:
  - "[[04_Důkazy/Email_Vyzva_Kulik]]"
poznamky: |
  Nebyl nikdy předsedou oddílu (byl to Jiří Kulík).
  Nedodal seznam členů, neplatil příspěvky.
  Zánik členství 18.1.2024 (výzva 18.12.2023).
---

# Martin Kulík

## Základní údaje

| Atribut | Hodnota |
|:--------|:--------|
| **Role** | Bývalý údajný předseda oddílu karate |
| **Status** | Zánik členství |
| **Vztah ke kauze** | Neplatič, neoprávněný vydávající se za předsedu oddílu |

---

## Protiprávní jednání

- ❌ Nebyl nikdy předsedou oddílu (byl to Jiří Kulík)
- ❌ Nedodal seznam členů
- ❌ Neplatil příspěvky

---

## Dataview

```dataview
TABLE datum AS "Datum", udalost AS "Událost", kauza AS "Kauza"
FROM "11_Chronologie"
WHERE contains(osoby, "Martin Kulík")
SORT datum ASC
```
