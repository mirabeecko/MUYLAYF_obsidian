---
tags:
  - instituce
  - entita
  - tj-krupka
  - spolek
datum_vytvoreni: 2026-06-13
typ: spolek
ico: "46070516"
adresa: Krupka
status: aktivní
kontakt:
  - "Miroslav Brožek, předseda, +420 777 734 389"
  - "Datová schránka"
vztah_ke_kauze: Hlavní poškozený subjekt, žalovaný, oznamovatel
osoby:
  - "[[Miroslav_Brozek]]"
  - "[[Marek_Vanis]]"
  - "[[Jaromir_Pivonka]]"
  - "[[Gustav_Vlach]]"
  - "[[Martin_Kulik]]"
  - "[[Jitka_Illesova]]"
  - "[[Jana_Hrabalova]]"
udalosti:
  - "[[11_Chronologie/Kompletni_Chronologie|Kompletní chronologie]]"
dokumenty:
  - "[[03_Dokumenty/Stanovy_TJK_2016]]"
  - "[[03_Dokumenty/Stanovy_TJK_2024]]"
  - "[[03_Dokumenty/Zapis_Schromazdeni_Delegatu_2024]]"
dukazy:
  - "[[04_Důkazy/Zapis_Ze_Schuzi]]"
  - "[[04_Důkazy/Prestipnuty_Zamek]]"
poznamky: |
  Tělovýchovná jednota Krupka z.s., IČO 46070516.
  Založena v historické podobě, reorganizace od 2021.
  Spravuje areál Komáří vížka a objekty v Krupce (Pinčesárna).
---

# Tělovýchovná jednota Krupka z.s.

## Základní údaje

| Atribut | Hodnota |
|:--------|:--------|
| **Typ** | Spolek |
| **IČO** | 46070516 |
| **Adresa** | Krupka |
| **Předseda** | [[Miroslav_Brozek|Miroslav Brožek]] |
| **Status** | Aktivní |

---

## Role v kauze

Hlavní poškozený subjekt. Čelí žalobám na neplatnost rozhodnutí, trestním oznámením pachatelů a nárokům třetích stran (Lesy ČR, město Krupka, T-Mobile).

---

## Dataview

```dataview
TABLE datum AS "Datum", udalost AS "Událost", kauza AS "Kauza"
FROM "11_Chronologie"
WHERE contains(instituce, "Tělovýchovná jednota Krupka")
SORT datum ASC
```
