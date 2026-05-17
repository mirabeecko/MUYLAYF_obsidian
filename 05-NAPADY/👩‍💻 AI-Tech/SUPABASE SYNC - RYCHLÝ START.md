---
tags:
  - návod
  - supabase
  - obsidian
---

# 🚀 SUPABASE SYNC - RYCHLÝ START

Plugin pro synchronizaci poznámek z Obsidianu do Supabase je **již nainstalován**!

---

## ✅ KROK 1: Povolit plugin (2 minuty)

1. **Otevřete Nastavení** Obsidianu (ikonka ozubeného kola vlevo dole)
2. Klikněte na **Community plugins** (v levém menu)
3. Pokud je zapnutý **Safe mode**, vypněte ho (tlačítko "Turn off Safe mode")
4. Klikněte na **Browse** nebo přejděte na **Installed plugins**
5. Najděte **Supabase Sync** a **zapněte ho** (přepínač)

✨ **Plugin je aktivní!** V levém panelu (ribbon) byste měli vidět novou ikonu pro sync.

---

## ✅ KROK 2: Vytvořit Supabase projekt (5 minut)

### 2.1 Registrace
1. Jděte na https://supabase.com
2. Klikněte na **Start your project** nebo **Sign in**
3. Přihlaste se pomocí GitHub účtu (nebo vytvořte nový účet)

### 2.2 Vytvořit projekt
1. Klikněte na **New Project**
2. Vyplňte:
   - **Name**: `Komárka` (nebo jakýkoliv název)
   - **Database Password**: Vymyslete silné heslo (uložte si ho!)
   - **Region**: `Central EU (Frankfurt)` - nejblíž k ČR
   - **Pricing Plan**: **Free** (je to dost pro začátek!)
3. Klikněte **Create new project**
4. ⏱️ Počkejte 1-2 minuty, než se projekt vytvoří

### 2.3 Získat API credentials
1. Po vytvoření projektu přejděte na **Settings** (ikonka ozubeného kola)
2. V levém menu klikněte na **API**
3. **Zkopírujte** následující:
   - **Project URL** (např. `https://abcdefghijk.supabase.co`)
   - **anon public** key (dlouhý řetězec začínající `eyJhbGci...`)

📋 **ULOŽTE SI TYTO DVĚ HODNOTY** - budete je potřebovat!

---

## ✅ KROK 3: Vytvořit databázové tabulky (3 minuty)

### 3.1 Otevřít SQL Editor
1. V Supabase dashboardu klikněte na **SQL Editor** (v levém menu)
2. Klikněte na **New query** (zelené tlačítko)

### 3.2 Spustit SQL skript
1. Otevřete soubor: `.obsidian/plugins/supabase-sync/supabase-schema.sql`
2. **Zkopírujte celý obsah** souboru (Ctrl+A, Ctrl+C)
3. **Vložte** ho do SQL Editoru v Supabase (Ctrl+V)
4. Klikněte **Run** (nebo Ctrl+Enter)

✅ **Hotovo!** V levém panelu byste měli vidět nové tabulky:
- `akce`
- `dotace`
- `opravy_udrzba`
- `partneri_dodavatele`
- `pokoje`
- `rezervace`
- `uklidy`

---

## ✅ KROK 4: Nastavit plugin v Obsidianu (2 minuty)

1. **Otevřete Nastavení** Obsidianu
2. Přejděte na **Community plugins** → **Supabase Sync** → klikněte na **ikonku ozubeného kola** (Options)
3. Vyplňte:
   - **Supabase URL**: Vložte Project URL z kroku 2.3
   - **Supabase API Key**: Vložte anon public key z kroku 2.3
4. Klikněte **Test připojení**
5. ✅ Mělo by se zobrazit: **"✅ Připojení úspěšné!"**

### Volitelné nastavení:
- **Automatická synchronizace**: Zapněte, pokud chcete auto-sync při každém uložení poznámky
- **Debug režim**: Zapněte pouze pokud chcete vidět detailní logy

---

## ✅ KROK 5: První synchronizace! (1 minuta)

### Otevřete ukázkovou poznámku
1. Přejděte na složku: `Supabase Examples/`
2. Otevřete: `Příklad - Akce.md`
3. Uvidíte poznámku s tagem `#supabase-sync/akce`

### Synchronizujte
**Varianta A - Command Palette:**
1. Stiskněte **Ctrl/Cmd + P** (otevře Command Palette)
2. Napište: `sync current`
3. Vyberte: **Synchronizovat aktuální poznámku**

**Varianta B - Ribbon ikona:**
1. Klikněte na **sync ikonu** v levém panelu (ribbon)

✅ **Mělo by se zobrazit**: "✅ Příklad - Akce synchronizováno"

### Zkontrolujte v Supabase
1. Přejděte na Supabase dashboard
2. Klikněte na **Table Editor** (v levém menu)
3. Vyberte tabulku **akce**
4. 🎉 **Vidíte tam svůj záznam!**

---

## 🎯 JAK TO POUŽÍVAT

### 1. Vytvořit novou poznámku pro sync

```markdown
---
datum: 2025-07-15
stav: planovano
---

#supabase-sync/akce

# Moje letní akce

Popis akce zde...
```

### 2. Uložit poznámku
**Ctrl/Cmd + S**

### 3. Synchronizovat
- **Auto**: Pokud máte zapnutý auto-sync, stane se automaticky
- **Manuálně**: Ctrl/Cmd + P → "sync current"
- **Nebo**: Kliknout na sync ikonu v ribbonu

---

## 📋 PODPOROVANÉ TAGY

Použijte jeden z těchto tagů ve své poznámce:

| Tag | Co to je | Příklad |
|-----|----------|---------|
| `#supabase-sync/akce` | Letní akce, programy | GRAND OPENING |
| `#supabase-sync/pokoj` | Evidence pokojů | Pokoj 7 |
| `#supabase-sync/dotace` | Dotace, granty | Můj klub 2025 |
| `#supabase-sync/partner` | Dodavatelé, partneři | Bistro Komárka |
| `#supabase-sync/oprava` | Opravy a údržba | Oprava zámku |

---

## 🔄 UŽITEČNÉ PŘÍKAZY

Otevřete **Command Palette** (Ctrl/Cmd + P) a napište:

- `sync current` → Sync aktuální poznámky
- `sync all` → Sync všech poznámek
- `pull from supabase` → Stáhnout data ze Supabase

---

## ❓ CO KDYŽ NĚCO NEFUNGUJE?

### ❌ Plugin se nezobrazuje v seznamu
1. Zkontrolujte, že složka `.obsidian/plugins/supabase-sync/` obsahuje soubory
2. **Restartujte Obsidian** (zavřít a otevřít znovu)
3. Vypněte Safe mode

### ❌ "Nejdřív nastavte Supabase URL a API Key"
→ Přejděte do nastavení pluginu a vyplňte credentials (Krok 4)

### ❌ "HTTP 401: Unauthorized"
→ Zkontrolujte API key - musí být **anon public**, NE service role

### ❌ "HTTP 404: Not Found"
→ Tabulka neexistuje - spusťte SQL skript z Kroku 3

### 🔍 Zapnout detailní logy
1. Nastavení → Supabase Sync → **Debug režim** (zapnout)
2. Stiskněte **F12** (otevře Developer Console)
3. Uvidíte detailní logy o tom, co se děje

---

## 📚 DALŠÍ KROKY

### Pokročilé použití
1. Přečtěte **README.md** v `.obsidian/plugins/supabase-sync/`
2. Prozkoumejte všechny příklady ve složce `Supabase Examples/`
3. Vytvořte vlastní poznámky s tagy

### Integrace s ostatními nástroji
- Zapojte **Make.com** nebo **N8N** pro automatizace
- Připojte **Grafana** nebo **Metabase** pro vizualizace
- Vytvořte vlastní dashboard pomocí **Next.js**

### Rozšíření
- Přidejte vlastní tabulky v Supabase
- Upravte `main.js` pro podporu nových typů dat
- Vytvořte vlastní triggery a automatizace

---

## 🎉 GRATULUJI!

Máte funkční synchronizaci mezi Obsidianem a Supabase!

Teď můžete:
✅ Spravovat pokoje, akce, dotace v Obsidianu
✅ Automaticky synchronizovat do databáze
✅ Sdílet data s týmem
✅ Vytvářet reporty a dashboardy
✅ Integrovat s dalšími nástroji

---

## 🆘 POTŘEBUJETE POMOC?

1. Přečtěte **README.md** pro detaily
2. Zapněte Debug režim a podívejte se do konzole (F12)
3. Zkontrolujte Supabase Table Editor, zda se data ukládají

---

**Plugin vytvořen**: 2026-02-10
**Verze**: 1.0.0
**Pro**: TJ Krupka - Komárka

🚀 **Šťastné synchronizování!**

#claude_tech
