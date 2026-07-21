---
tags:
  - dashboard
  - kauza-tmobile
  - tj-krupka
  - komari-vizka
  - main-dashboard
created: 2026-06-13
type: dashboard
status: active
---

# 🎯 CENTRÁLNÍ DASHBOARD — Kauza T-Mobile / TJ Krupka / Komáří vížka

> **IČO:** 46070516 | **Spolek:** Tělovýchovná jednota Krupka z.s.
> **Předseda:** Miroslav Brožek
> **Aktivní řízení:** 68 Cm 85/2024 | 68 Cm 87/2024 | 2 Cmo 11/2026

---

## 📊 Aktuální stav

| Aspekt | Stav | Detail |
|:-------|:-----|:-------|
| **Soudní řízení (vyloučení)** | 🔴 Probíhá | KS Ústí určil nicotnost vyloučení; odvolání zastaveno pro opožděný poplatek; 2 Cmo 11/2026 |
| **Soudní řízení (shromáždění)** | 🔴 Probíhá | Sp. zn. 68 Cm 85/2024 — žaloba po lhůtě |
| **Trestní oznámení** | 🟡 Vyšetřování | č.j. KRPU-32057-29/ČJ-2024-040981 |
| **Spolek vs. Lesy ČR** | 🟡 Jednání | Bezdůvodné obohacení, pozemky 628/7, 628/1 |
| **T-Mobile / pozemky** | 🟡 Monitoring | Vysílač, nájemní vztahy, elektroinstalace |
| **Město Krupka / zámek** | 🔴 Spor | Výměna zámků 19.1.2023, přístup, SPORT Krupka s.r.o. |

---

## ⚠️ Rizika

- [ ] **Pravomocné určení nicotnosti vyloučení** — Vaniš a Pivoňka by mohli být považováni za členy
- [ ] **Prekluzivní lhůta § 259 NOZ** — žaloby podány po lhůtě, soud to neposoudil dostatečně
- [ ] **Exekuce účtu spolku** — nezaplacený soudní poplatek 2 000 Kč
- [ ] **Nárok Lesů ČR na bezdůvodné obohacení** — pozemky v areálu Komáří vížka
- [ ] **Finanční kolaps spolku** — škoda přes 2 mil. Kč, náklady na právní služby
- [ ] **Trestní řízení může být odloženo** — policie nepostupuje dostatečně rychle
- [ ] **ČAST umožňuje přestupy vyloučených členů** — poškozuje spolek

---

## 📋 Otevřené úkoly

```dataview
TABLE status, priority, due AS "Termín", osoby AS "Osoby", kauza AS "Kauza"
FROM "10_Úkoly"
WHERE status != "hotovo" AND status != "zrušeno"
SORT priority ASC, due ASC
```

---

## 📅 Poslední události

```dataview
TABLE datum AS "Datum", udalost AS "Událost", osoby AS "Osoby", kauza AS "Kauza"
FROM "11_Chronologie"
SORT datum DESC
LIMIT 15
```

---

## 👤 Důležité osoby

```dataview
TABLE role, status, vztah_ke_kauze AS "Vztah ke kauze"
FROM "05_Osoby"
SORT role ASC
```

---

## 📄 Důležité dokumenty

```dataview
TABLE typ, datum, osoby AS "Osoby", kauza AS "Kauza", zpracovano AS "Zpracováno"
FROM "03_Dokumenty"
SORT datum DESC
LIMIT 20
```

---

## 🔍 Důležité důkazy

```dataview
TABLE popis, datum, zdroj, sila_dukazu AS "Síla", pravni_vyznam AS "Právní význam"
FROM "04_Důkazy"
SORT datum DESC
```

---

## 🔗 Související kauzy

| Kauza | Stav | Spisová značka | Odkaz |
|:------|:-----|:---------------|:------|
| Neplatnost shromáždění delegátů | 🔴 Probíhá | 68 Cm 85/2024 | [[02_Kauzy/TMobile/68_Cm_85_2024\|68 Cm 85/2024]] |
| Neplatnost vyloučení členů | 🔴 Probíhá | 68 Cm 87/2024 | [[02_Kauzy/TMobile/68_Cm_87_2024\|68 Cm 87/2024]] |
| Odvolání MB vs. KS Ústí | 🔴 Probíhá | 2 Cmo 11/2026 | [[02_Kauzy/TMobile/2_Cmo_11_2026\|2 Cmo 11/2026]] |
| Trestní oznámení (zpronevěra) | 🟡 Vyšetřování | KRPU-32057-29/ČJ-2024-040981 | [[02_Kauzy/TMobile/TO_Zpronevera\|TO Zpronevěra]] |
| Bezdůvodné obohacení Lesy ČR | 🟡 Jednání | — | [[02_Kauzy/TMobile/Lesy_CR_Obohaceni\|Lesy ČR Obohacení]] |
| T-Mobile / pozemky a elektro | 🟡 Monitoring | — | [[02_Kauzy/TMobile/TMobile_Pozemky_Elektro\|T-Mobile Pozemky]] |

---

## ⏱️ Časová osa (klíčové milníky)

```dataview
TABLE datum AS "Datum", udalost AS "Událost", osoby AS "Osoby", kauza AS "Kauza"
FROM "11_Chronologie"
WHERE klicovy_milnik = true
SORT datum ASC
```

---

## 🗺️ Vizualizace

- [[Excalidraw/Kauza_TMobile.excalidraw|🗺️ Mapa kauzy T-Mobile]]
- [[Excalidraw/Kauza_TJ_Krupka.excalidraw|🗺️ Mapa TJ Krupka]]
- [[Excalidraw/Komari_Vizka_Vlastnicke_Vztahy.excalidraw|🗺️ Vlastnické vztahy Komáří vížka]]
- [[Excalidraw/TMobile_Elektro.excalidraw|🗺️ T-Mobile Elektro]]
- [[Excalidraw/Sit_Osob.excalidraw|🗺️ Síť osob]]

---

## 📁 Odkazy

- [[00_Dashboard/Otevrene_Ukoly|📋 Otevřené úkoly]]
- [[00_Dashboard/Nove_Dokumenty|📄 Nové dokumenty]]
- [[00_Dashboard/Posledni_Dukazy|🔍 Poslední důkazy]]
- [[00_Dashboard/Dokumenty_Cekajici|⏳ Dokumenty čekající na zpracování]]
- [[00_Dashboard/Nepropojene_Entity|⚠️ Nepropojené entity]]
- [[00_Dashboard/Nevyresene_Otazky|❓ Nevyřešené otázky]]

---

*Aktualizováno: 2026-06-13*
