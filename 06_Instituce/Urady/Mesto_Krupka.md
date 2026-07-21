---
tags:
  - instituce
  - entita
  - mesto-krupka
  - urad
datum_vytvoreni: 2026-06-13
typ: úřad
ico:
adresa: Město Krupka
status: aktivní
kontakt:
  - Starosta města Krupka
  - Městská policie Krupka
  - Městský úřad Krupka
vztah_ke_kauze: Vlastník nemovitostí, nájemce, spolupracoval s vyloučenými členy
osoby:
  - "[[Miroslav_Brozek]]"
  - "[[Michal_Schneider]]"
udalosti:
  - "[[11_Chronologie/Kompletni_Chronologie|Kompletní chronologie]]"
dokumenty:
  - "[[03_Dokumenty/Mesto_Vymena_Zamku_2023]]"
  - "[[03_Dokumenty/Mesto_Oznameni_Bezpecnostni_Opatreni]]"
  - "[[03_Dokumenty/Schuzka_Mesto_Schneider_Vitu]]"
dukazy:
  - "[[04_Důkazy/Prestipnuty_Zamek]]"
  - "[[04_Důkazy/Fotografie_Zamku]]"
poznamky: |
  Vlastník nemovitostí (Pinčesárna).
  19.1.2023 vyměnilo zámky bez souhlasu TJ.
  Umožnilo přístup vyloučeným členům, znemožnilo přístup předsedovi.
  Starosta účasten na shromáždění delegátů (nevyjasněná role).
  SPORT Krupka s.r.o. — spřízněná firma.
---

# Město Krupka

## Základní údaje

| Atribut | Hodnota |
|:--------|:--------|
| **Typ** | Město / úřad |
| **Status** | Aktivní |
| **Vztah ke kauze** | Vlastník nemovitostí, spolupracoval s vyloučenými členy |

---

## Role v kauze

- **Vlastník nemovitostí** — pronajímá prostory TJ (Pinčesárna)
- **19.1.2023** — výměna zámků bez souhlasu TJ, přístup znemožněn předsedovi
- **SPORT Krupka s.r.o.** — spřízněná právnická osoba, možný střet zájmů
- Starosta účasten na jednáních týkajících se vnitřních záležitostí spolku

---

## Dataview

```dataview
TABLE datum AS "Datum", udalost AS "Událost", kauza AS "Kauza"
FROM "11_Chronologie"
WHERE contains(instituce, "Město Krupka")
SORT datum ASC
```
