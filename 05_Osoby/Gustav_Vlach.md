---
tags:
  - osoba
  - entita
  - tj-krupka
  - problemova-osoba
  - zanikle-clenstvi
datum_vytvoreni: 2026-06-13
role: Bývalý předseda lyžařského oddílu
status: zánik členství
vztah_ke_kauze: Pachatel zpronevěry, odpovědný zástupce areálu Komáří vížka
osoby:
  - "[[Miroslav_Brozek]]"
  - "[[Marek_Vanis]]"
  - "[[Jaromir_Pivonka]]"
udalosti:
  - "[[11_Chronologie/Kompletni_Chronologie|Kompletní chronologie]]"
dokumenty:
  - "[[03_Dokumenty/Predzalobni_Vyzva_Vlach_2023]]"
  - "[[03_Dokumenty/Zanik_Clenstvi_Vlach_2023]]"
dukazy:
  - "[[04_Důkazy/Policejni_Vyslech_Vlach]]"
  - "[[04_Důkazy/Vlach_Emaily]]"
  - "[[04_Důkazy/Ukonce_Odpovedneho_Zastupce_Vlach_2024]]"
poznamky: |
  Zánik členství 14.12.2023 (neplacení příspěvků).
  Při výslechu přiznal 26 674 Kč v pokladně — nepředal.
  Odpovědný zástupce areálu do 10.7.2024.
  Zanedbal lyžařský areál — náklady 150k/rok, příjmy 0 Kč.
---

# Gustav Vlach

## Základní údaje

| Atribut | Hodnota |
|:--------|:--------|
| **Role** | Bývalý předseda lyžařského oddílu |
| **Status** | Zánik členství 14.12.2023 |
| **Vztah ke kauze** | Pachatel zpronevěry, odpovědný zástupce areálu Komáří vížka |

---

## Protiprávní jednání

- ❌ Nedodal seznam členů
- ❌ Neplatil příspěvky
- ❌ **Při výslechu přiznal 26 674 Kč v pokladně** — nepředal
- ❌ Zasílal pouze dílčí částky místo řádného předání
- ❌ Zanedbal lyžařský areál (náklady 150k/rok, příjmy 0 Kč)
- ❌ Ukonce odpovědného zástupce až 10.7.2024

---

## Vztahy

### Související osoby
- [[Miroslav_Brozek|Miroslav Brožek]] — předseda spolku
- [[Marek_Vanis|Marek Vaniš]] — spolupachatel
- [[Jaromir_Pivonka|Jaromír Pivoňka]] — spolupachatel

### Dokumenty
- [[03_Dokumenty/Predzalobni_Vyzva_Vlach_2023|Předžalobní výzva 14.11.2023]]
- [[03_Dokumenty/Zanik_Clenstvi_Vlach_2023|Zánik členství 14.12.2023]]

### Důkazy
- [[04_Důkazy/Policejni_Vyslech_Vlach|Policejní výslech — přiznání 26 674 Kč]]
- [[04_Důkazy/Vlach_Emaily|E-maily s dílčími částkami]]
- [[04_Důkazy/Ukonce_Odpovedneho_Zastupce_Vlach_2024|Oznámení o ukonce odpovědného zástupce 10.7.2024]]

---

## Dataview

```dataview
TABLE datum AS "Datum", udalost AS "Událost", kauza AS "Kauza"
FROM "11_Chronologie"
WHERE contains(osoby, "Gustav Vlach")
SORT datum ASC
```
