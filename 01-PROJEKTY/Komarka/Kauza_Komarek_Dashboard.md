#claude_obsidian

# 🗂️ Dashboard - Kauza Komárek

> **Centrální přehled** všech poznámek, dokumentů a souvislostí týkajících se kauzy Komárek

---

## 📋 Rychlý přehled

| Položka        | Status          | Poslední aktualizace |
| -------------- | --------------- | -------------------- |
| Základní fakta | 🟡 Rozpracováno | -                    |
| Časová osa     | 🟡 Rozpracováno | -                    |
| Klíčové osoby  | 🟡 Rozpracováno | -                    |
| Dokumenty      | 🔴 Chybí        | -                    |
| Právní analýza | 🔴 Chybí        | -                    |

---

## 🎯 Klíčové oblasti

### 1. [[Kauza Komarek - Zakladni Fakta|📌 Základní fakta]]
- Hlavní obvinění
- Dotčené společnosti
- Výše škody/transakce
- Právní kvalifikace

### 2. [[Kauza Komarek - Casova Osa|⏱️ Časová osa]]
- Chronologický přehled událostí
- Klíčové milníky
- Soudní jednání
- Rozhodnutí orgánů

### 3. [[Kauza Komarek - Osoby|👥 Klíčové osoby]]
- **Hlavní aktéři:**
  - [[Osoba - Karel Komarek|Karel Komárek]]
  - Další osoby (vytvořte jednotlivé stránky)
- **Instituce:**
  - Státní zástupci
  - Soudci
  - Advokáti
  - Dotčené úřady

### 4. [[Kauza Komarek - Dokumenty|📄 Dokumenty]]
- Obžaloby
- Rozsudky
- Důkazní materiály
- Mediální zprávy
- Výroční zprávy společností

### 5. [[Kauza Komarek - Pravni Analyza|⚖️ Právní analýza]]
- Aplikovatelné právní normy
- Judikatura
- Právní argumenty obhajoby
- Právní argumenty obžaloby

### 6. [[Kauza Komarek - Medialni Pokryti|📰 Mediální pokrytí]]
- Články
- Rozhovory
- Komentáře
- Timeline mediální pozornosti

### 7. [[Kauza Komarek - Financni Aspekty|💰 Finanční aspekty]]
- Toky peněz
- Dotčené společnosti
- Daňové souvislosti
- Ekonomická analýza

---

## 🔗 Propojené kauzy

- [[Souvisejici Kauza 1]]
- [[Souvisejici Kauza 2]]

---

## 📝 Poznámky k dalšímu zpracování

```dataview
TABLE file.mtime as "Upraveno"
FROM #kauza_komarek
SORT file.mtime DESC
LIMIT 10
```

---

## ✅ Úkoly

- [ ] Doplnit základní fakta
- [ ] Vytvořit kompletní časovou osu
- [ ] Zmapovat všechny klíčové osoby
- [ ] Shromáždit dokumenty
- [ ] Provést právní analýzu
- [ ] Zmapovat mediální pokrytí

---

## 🏷️ Tagy

#kauza_komarek #pravni_kauza #ekonomicka_kriminalita #dashboard

---

## 📚 Doporučená struktura složek

```
📁 Kauza Komárek/
├── 📁 00-Dashboard/
│   └── Kauza_Komarek_Dashboard.md (tento soubor)
├── 📁 01-Zakladni-Informace/
│   ├── Zakladni-Fakta.md
│   └── Kontext.md
├── 📁 02-Casova-Osa/
│   ├── Chronologie.md
│   └── Milniky.md
├── 📁 03-Osoby/
│   ├── Karel-Komarek.md
│   ├── Dalsi-Osoby.md
│   └── Instituce.md
├── 📁 04-Dokumenty/
│   ├── Soudni/
│   ├── Pravni/
│   └── Medialni/
├── 📁 05-Pravni-Analyza/
│   ├── Pravni-Normy.md
│   ├── Judikatura.md
│   └── Argumentace.md
├── 📁 06-Financni-Aspekty/
│   ├── Toky-Penez.md
│   └── Spolecnosti.md
└── 📁 07-Medialni-Pokryti/
    ├── Clanky.md
    └── Analyzy.md
```

---

## 💡 Tipy pro práci s poznámkami

1. **Používejte zpětné odkazy** - Propojujte související poznámky pomocí `[[]]`
2. **Konzistentní tagy** - Používejte `#kauza_komarek` pro všechny související poznámky
3. **Dataview queries** - Využívejte Dataview plugin pro automatické přehledy
4. **Metadata** - U každé poznámky uvádějte datum vytvoření, zdroj informací
5. **Revize** - Pravidelně aktualizujte dashboard

---

## 🔍 Užitečné Dataview queries

### Všechny poznámky v kauze
```dataview
LIST
FROM #kauza_komarek
```

### Nedokončené úkoly
```dataview
TASK
FROM #kauza_komarek
WHERE !completed
```

### Timeline podle data
```dataview
TABLE datum as "Datum", popis as "Událost"
FROM #kauza_komarek
WHERE datum
SORT datum ASC
```

---

**Vytvořeno:** `= date(now)`
**Poslední aktualizace:** `= date(now)`
