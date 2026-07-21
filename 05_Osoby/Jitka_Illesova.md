---
tags:
  - osoba
  - entita
  - tj-krupka
  - problemova-osoba
datum_vytvoreni: 2026-06-13
role: Účetní spolku
status: aktivní (externí)
vztah_ke_kauze: Zadržování dokumentace, neoprávněné předání účetnictví městu
osoby:
  - "[[Miroslav_Brozek]]"
udalosti:
  - "[[11_Chronologie/Kompletni_Chronologie|Kompletní chronologie]]"
dokumenty:
  - "[[03_Dokumenty/Predzalobni_Vyzva_Illesova_2023]]"
dukazy:
  - "[[04_Důkazy/Faktura_Ucetni_2021]]"
  - "[[04_Důkazy/Email_Illesova_Nepredani]]"
poznamky: |
  Obdržela 30 000 Kč za účetnictví 2021.
  Odmítla dokončit rok 2021 ("to stále není všechno").
  Neoprávněně předala účetnictví městu Krupka.
  Komplikace při daňové kontrole.
---

# Jitka Illéšová

## Základní údaje

| Atribut | Hodnota |
|:--------|:--------|
| **Role** | Účetní spolku |
| **Status** | Externí spolupracovnice |
| **Vztah ke kauze** | Zadržování dokumentace, neoprávněné předání účetnictví městu |

---

## Protiprávní jednání

- ❌ Obdržela 30 000 Kč za účetnictví 2021
- ❌ Odmítla dokončit rok 2021
- ❌ **Neoprávněně předala účetnictví městu Krupka**
- ❌ Zadržovala dokumentaci

---

## Dopad

Komplikace při daňové kontrole. Znemožnění řádného vedení účetnictví spolku.

---

## Dataview

```dataview
TABLE datum AS "Datum", udalost AS "Událost", kauza AS "Kauza"
FROM "11_Chronologie"
WHERE contains(osoby, "Jitka Illéšová")
SORT datum ASC
```
