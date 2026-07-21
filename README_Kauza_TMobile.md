# 📁 Kauza T-Mobile / TJ Krupka / Komáří vížka — Obsidian Vault

> **Vytvořeno:** 2026-06-13
> **Verze:** 1.0
> **Autor:** Kimi Code CLI (automatizovaný knowledge architect)

---

## 🎯 Účel tohoto vaultu

Tento vault slouží jako **kompletní znalostní systém** pro dlouhodobou správu kauzy zahrnující:

- **Tělovýchovná jednota Krupka z.s.** (IČO 46070516)
- **Komáří vížka** (lyžařský areál, pozemky Lesů ČR)
- **T-Mobile Czech Republic a.s.** (telekomunikační vysílač, elektroinstalace)
- **Město Krupka** (vlastník nemovitostí, SPORT Krupka s.r.o.)
- **Lesy ČR** (vlastník pozemků, nárok na bezdůvodné obohacení)
- **Soudní řízení** (68 Cm 85/2024, 68 Cm 87/2024, 2 Cmo 11/2026)
- **Trestní oznámení** (KRPU-32057-29/ČJ-2024-040981)

---

## 📂 Struktura vaultu

```
MUYLAYF/
├── 00_Dashboard/           # Centrální přehledy a Dataview dashboardy
│   ├── Kauza_TMobile.md
│   ├── Otevrene_Ukoly.md
│   ├── Nove_Dokumenty.md
│   ├── Posledni_Dukazy.md
│   ├── Dokumenty_Cekajici.md
│   ├── Nepropojene_Entity.md
│   └── Nevyresene_Otazky.md
├── 01_Projekty/            # Projektové řízení
├── 02_Kauzy/
│   └── TMobile/
│       ├── 68_Cm_85_2024.md
│       ├── 68_Cm_87_2024.md
│       ├── 2_Cmo_11_2026.md
│       ├── TO_Zpronevera.md
│       ├── Lesy_CR_Obohaceni.md
│       ├── TMobile_Pozemky_Elektro.md
│       └── Pripravena_Podani/   # Šablony podání
├── 03_Dokumenty/           # Dokumenty (smlouvy, výzvy, rozhodnutí)
├── 04_Důkazy/              # Důkazní karty
├── 05_Osoby/               # Entity osob
├── 06_Instituce/           # Entity institucí
│   ├── Soudy/
│   ├── Urady/
│   └── Firmy/
├── 07_Pozemky/             # Pozemky a budovy
├── 08_Média/               # Články, sociální sítě
├── 09_Judikatura/          # Judikáty a právní argumentace
├── 10_Úkoly/               # Úkoly a otevřené otázky
├── 11_Chronologie/         # Kompletní časová osa
├── 12_Archiv/              # Archiv starých struktur
├── Excalidraw/             # Vizualizace
├── Templates/              # Šablony pro nové soubory
└── Attachments/            # PDF, obrázky, audio/video
```

---

## 🚀 Jak začít

1. **Otevři** `00_Dashboard/Kauza_TMobile.md` — centrální dashboard
2. **Prohlédni si** Excalidraw mapy v `Excalidraw/`
3. **Použij** Dataview dashboardy pro filtry a přehledy
4. **Vytvářej** nové entity pomocí šablon v `Templates/`

---

## 📝 Šablony

| Šablona | Použití |
|:--------|:--------|
| `Templates/Osoba.md` | Nová osoba |
| `Templates/Instituce.md` | Nová instituce |
| `Templates/Dukaz.md` | Nový důkaz |
| `Templates/Dokument.md` | Nový dokument |
| `Templates/Ukol.md` | Nový úkol |
| `Templates/Pozemek.md` | Nový pozemek |

---

## 🔗 Klíčové vazby (Knowledge Graph)

Vault je navržen pro automatické propojení entit:

- **osoba → dokument** — přes frontmatter `osoby`
- **osoba → událost** — přes frontmatter `osoby` v chronologii
- **osoba → důkaz** — přes frontmatter `osoby` v důkazech
- **instituce → dokument** — přes frontmatter `instituce`
- **instituce → událost** — přes frontmatter `instituce` v chronologii
- **dokument → důkaz** — přes frontmatter `souvisejici_dokumenty`

---

## 📊 Dataview

Dashboardy používají plugin **Dataview**. Pro správnou funkci je nutné:

1. Nainstalovat plugin Dataview v Obsidianu
2. Povolit JavaScript queries (volitelně)
3. Reindexovat vault (Ctrl+P → Dataview: Rebuild index)

---

## ⚠️ Důležité poznámky

- **Existující data nebyla smazána** — původní struktura zůstává v `12_Archiv/` a původních složkách
- **Nová struktura je samostatná** — všechny nové soubory jsou v nových složkách
- **Záloha byla vytvořena** před zahájením změn
- **Google Drive** integrace je připravena jako úkol — vyžaduje manuální import

---

## 🔧 Údržba

Pro aktualizaci dashboardů a indexů:

```
Ctrl+P → Dataview: Rebuild index
```

Pro vyhledání nepropojených entit:

```
Otevři 00_Dashboard/Nepropojene_Entity.md
```

---

## 📞 Kontakt

**Předseda spolku:** Miroslav Brožek, +420 777 734 389

---

*Aktualizováno: 2026-06-13*
