---
tags:
  - checklist
  - supabase
  - setup
---

# ✅ SUPABASE SYNC - INSTALAČNÍ CHECKLIST

Použijte tento checklist pro kontrolu, že máte vše správně nastavené.

---

## 📦 ČÁST 1: OBSIDIAN PLUGIN

- [ ] Plugin je ve složce `.obsidian/plugins/supabase-sync/`
- [ ] Složka obsahuje soubory:
  - [ ] `manifest.json`
  - [ ] `main.js`
  - [ ] `styles.css`
  - [ ] `README.md`
  - [ ] `supabase-schema.sql`
- [ ] Obsidian byl restartován
- [ ] Safe mode je vypnutý
- [ ] Plugin je zapnutý v seznamu "Installed plugins"
- [ ] V levém ribbonu vidím sync ikonu

---

## 🗄️ ČÁST 2: SUPABASE PROJEKT

- [ ] Mám účet na Supabase.com
- [ ] Vytvořil jsem nový projekt
- [ ] Poznamenal jsem si:
  - [ ] Project URL: `https://____________.supabase.co`
  - [ ] Anon Public Key: `eyJhbGci____________`
  - [ ] Database Password: `____________`
- [ ] Projekt je aktivní (zelená tečka)

---

## 🏗️ ČÁST 3: DATABÁZOVÉ TABULKY

- [ ] Otevřel jsem SQL Editor v Supabase
- [ ] Zkopíroval jsem obsah `supabase-schema.sql`
- [ ] Spustil jsem SQL skript (Run)
- [ ] Skript proběhl bez chyb
- [ ] V Table Editoru vidím tabulky:
  - [ ] `pokoje`
  - [ ] `rezervace`
  - [ ] `uklidy`
  - [ ] `opravy_udrzba`
  - [ ] `dotace`
  - [ ] `akce`
  - [ ] `partneri_dodavatele`

---

## ⚙️ ČÁST 4: NASTAVENÍ PLUGINU

- [ ] Otevřel jsem nastavení pluginu (Settings → Community plugins → Supabase Sync → Options)
- [ ] Vyplnil jsem Supabase URL
- [ ] Vyplnil jsem Supabase API Key (anon public)
- [ ] Klikl jsem na "Test připojení"
- [ ] Test připojení byl úspěšný ✅
- [ ] (Volitelné) Zapnul jsem Automatickou synchronizaci
- [ ] (Volitelné) Zapnul jsem Debug režim

---

## 🧪 ČÁST 5: PRVNÍ TEST

- [ ] Otevřel jsem ukázkovou poznámku: `Supabase Examples/Příklad - Akce.md`
- [ ] Poznámka obsahuje tag `#supabase-sync/akce`
- [ ] Stiskl jsem Ctrl/Cmd + P
- [ ] Vybral jsem "Synchronizovat aktuální poznámku"
- [ ] Zobrazila se zpráva "✅ synchronizováno"
- [ ] Otevřel jsem Supabase Table Editor → tabulka `akce`
- [ ] Vidím tam záznam "GRAND OPENING Komárka 2025"

---

## 🎯 ČÁST 6: VYTVOŘENÍ VLASTNÍ POZNÁMKY

- [ ] Vytvořil jsem novou poznámku
- [ ] Přidal jsem tag (např. `#supabase-sync/akce`)
- [ ] Vyplnil jsem frontmatter (datum, stav, atd.)
- [ ] Uložil jsem poznámku (Ctrl/Cmd + S)
- [ ] Synchronizoval jsem ji
- [ ] Zkontroloval jsem v Supabase, že se objevila

---

## 🔄 ČÁST 7: OBOUSMĚRNÁ SYNCHRONIZACE

### Test: Obsidian → Supabase
- [ ] Vytvořil jsem poznámku v Obsidianu
- [ ] Synchronizoval jsem ji
- [ ] Vidím ji v Supabase Table Editoru

### Test: Supabase → Obsidian
- [ ] Vytvořil jsem záznam v Supabase (Table Editor → Insert row)
- [ ] V Obsidianu spustil jsem: "Stáhnout data ze Supabase"
- [ ] Nová poznámka se objevila ve složce `Supabase/akce/` (nebo jiné)

---

## 🚀 POKROČILÉ FUNKCE (Volitelné)

- [ ] Nastavil jsem auto-sync při uložení
- [ ] Vytvořil jsem vlastní tagy/tabulky
- [ ] Připojil jsem Grafana nebo Metabase
- [ ] Nastavil jsem N8N nebo Make.com workflow
- [ ] Vytvořil jsem vlastní dashboard

---

## 📊 KONTROLNÍ PŘÍKAZY

Vyzkoušejte tyto příkazy (Ctrl/Cmd + P):

- [ ] `sync current` - funguje
- [ ] `sync all` - funguje
- [ ] `pull from supabase` - funguje

---

## 🐛 TROUBLESHOOTING

Pokud něco nefunguje, zkontrolujte:

### Plugin se nezobrazuje
- [ ] Složka pluginu existuje
- [ ] Všechny soubory jsou na místě
- [ ] Restartoval jsem Obsidian
- [ ] Safe mode je vypnutý

### Chyba připojení
- [ ] URL je správné (obsahuje https:// a končí .supabase.co)
- [ ] API key je anon public (začíná eyJhbGci...)
- [ ] Projekt v Supabase je aktivní
- [ ] Mám připojení k internetu

### Chyba synchronizace
- [ ] Tabulka v Supabase existuje
- [ ] Tag v poznámce je správný (např. #supabase-sync/akce)
- [ ] Poznámka obsahuje požadovaná pole
- [ ] Zapnul jsem Debug režim a kontroloval logy (F12)

### Data se neobjevují
- [ ] Zkontroloval jsem Table Editor v Supabase
- [ ] Obnovil jsem stránku v browseru
- [ ] Zkontroloval jsem správnou tabulku
- [ ] Zkontroloval jsem RLS policies (Row Level Security)

---

## ✅ HOTOVO!

Pokud máte všechny checkboxy zaškrtnuté, jste připraveni používat Supabase Sync!

**Užitečné odkazy:**
- 📖 README: `.obsidian/plugins/supabase-sync/README.md`
- 🚀 Rychlý start: `SUPABASE SYNC - RYCHLÝ START.md`
- 💻 SQL schema: `.obsidian/plugins/supabase-sync/supabase-schema.sql`
- 📋 Příklady: složka `Supabase Examples/`

---

## 🆘 STÁLE PROBLÉMY?

1. **Zapněte Debug režim**: Settings → Supabase Sync → Debug režim
2. **Otevřete konzoli**: Stiskněte F12
3. **Zkuste synchronizovat** a sledujte logy v konzoli
4. **Hledejte chyby** (červené texty v konzoli)
5. **Google the error** - většina chyb má řešení online

---

**Poslední kontrola**: {{ date }}
**Status**: [ ] Vše funguje / [ ] Některé problémy / [ ] Nefunguje

**Poznámky:**
_Zde si poznamenejte případné problémy nebo dotazy..._

#claude_tech
