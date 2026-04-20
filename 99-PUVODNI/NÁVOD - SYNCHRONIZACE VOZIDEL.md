---
tags:
  - návod
  - vozidla
  - supabase
---

# 🚗 NÁVOD: SYNCHRONIZACE VOZIDEL DO SUPABASE

Plugin byl aktualizován a nyní podporuje vozidla!

---

## ✅ KROK 1: Vytvořit tabulku v Supabase

### 1.1 Otevřít SQL Editor
1. Přihlaste se na https://supabase.com/dashboard
2. Vyberte projekt "Komárka"
3. Klikněte na **SQL Editor** (v levém menu)

### 1.2 Spustit SQL skript
1. Otevřete soubor: `.obsidian/plugins/supabase-sync/vozidla-schema.sql`
2. **Zkopírujte celý obsah** (Ctrl+A, Ctrl+C)
3. **Vložte** do SQL Editoru v Supabase (Ctrl+V)
4. Klikněte **Run** (nebo Ctrl+Enter)

✅ **Hotovo!** Tabulka `vozidla` je vytvořena.

---

## ✅ KROK 2: Restartovat Obsidian

Plugin byl aktualizován, proto je nutné Obsidian restartovat:

1. **Zavřete Obsidian** kompletně
2. **Otevřete Obsidian** znovu
3. Plugin se načte s novou podporou pro vozidla

### Alternativa: Reload plugin
1. Otevřete **Command Palette** (Ctrl/Cmd + P)
2. Napište: `reload`
3. Vyberte: **Reload app without saving**

---

## ✅ KROK 3: Ověřit, že plugin funguje

1. Otevřete **Nastavení** → **Community plugins** → **Supabase Sync**
2. Plugin by měl být **zapnutý** (zelený přepínač)
3. Klikněte na **Options** (ozubené kolo)
4. Klikněte **Test připojení**
5. ✅ Mělo by se zobrazit: "Připojení úspěšné!"

---

## 🚗 POZNÁMKY O VOZIDLECH

Vytvořil jsem pro vás **poznámky o vozidlech** ve složce `Vozidla/`:

1. ✅ **ZETOR 8145 - Traktor.md**
2. ✅ **Prinoth T4 - Rolba.md**
3. ✅ **Chevrolet Captiva.md**
4. ✅ **Sherco Trial 280 2T.md**
5. ✅ **KTM LC4.md**
6. ✅ **TGB Čtyřkolka.md**

Každá poznámka obsahuje:
- Tag `#supabase-sync/vozidlo`
- Frontmatter s technickými údaji
- Strukturovaný obsah

---

## 🔄 ZPŮSOBY SYNCHRONIZACE

### A) OBSIDIAN → SUPABASE (Nahrát data DO databáze)

**Použijte, když:**
- Vytvoříte novou poznámku o vozidle v Obsidianu
- Upravíte existující poznámku
- Chcete data z poznámek uložit do Supabase

**Jak na to:**

#### 1. Synchronizovat JEDNU poznámku:
1. Otevřete poznámku (např. `ZETOR 8145 - Traktor.md`)
2. Stiskněte **Ctrl/Cmd + P** (Command Palette)
3. Napište: `sync current`
4. Vyberte: **Synchronizovat aktuální poznámku**
5. ✅ Zobrazí se: "✅ ZETOR 8145 - Traktor synchronizováno"

#### 2. Synchronizovat VŠECHNY poznámky:
1. Stiskněte **Ctrl/Cmd + P**
2. Napište: `sync all`
3. Vyberte: **Synchronizovat všechny poznámky**
4. ✅ Zobrazí se: "✅ Synchronizováno X poznámek"

#### 3. Automatická synchronizace:
1. **Nastavení** → **Supabase Sync** → **Options**
2. Zapněte: **Automatická synchronizace**
3. Od teď se poznámky budou synchronizovat automaticky při každém uložení (Ctrl/Cmd + S)

---

### B) SUPABASE → OBSIDIAN (Stáhnout data Z databáze)

**Použijte, když:**
- Máte data v Supabase a chcete je v Obsidianu
- Někdo jiný přidal/upravil data v databázi
- Chcete aktualizovat poznámky podle databáze

**Jak na to:**

1. Stiskněte **Ctrl/Cmd + P** (Command Palette)
2. Napište: `pull from supabase`
3. Vyberte: **Stáhnout data ze Supabase**
4. ✅ Plugin vytvoří/aktualizuje poznámky ve složce: `Supabase/vozidla/`

---

## 📊 KONTROLA V SUPABASE

### Zobrazit data v Supabase:
1. Otevřete https://supabase.com/dashboard
2. Vyberte projekt "Komárka"
3. Klikněte na **Table Editor**
4. Vyberte tabulku **vozidla**
5. 🎉 Vidíte všechna vozidla!

### SQL dotazy:
```sql
-- Všechna vozidla
SELECT * FROM vozidla;

-- Vozidla s končící STK
SELECT nazev, registracni_znacka, platnost_stk
FROM vozidla
WHERE platnost_stk < CURRENT_DATE + INTERVAL '60 days'
ORDER BY platnost_stk;

-- Nefunkční vozidla
SELECT nazev, typ, stav, poznamky
FROM vozidla
WHERE stav IN ('nefunkcni', 'v_oprave');
```

---

## 📝 JAK VYTVOŘIT NOVOU POZNÁMKU O VOZIDLE

```markdown
---
typ: auto
znacka: Škoda
model: Octavia
registracni_znacka: ABC1234
vin: TMBJJ7NE3J0123456
rok_vyroby: 2018
vykon_hp: 150
stav: funkcni
umisteni: Komárka - parkoviště
platnost_stk: 2026-05-15
---

#supabase-sync/vozidlo

# Škoda Octavia

**Typ**: auto
**Značka**: Škoda
**Model**: Octavia
**RZ**: ABC1234
**VIN**: TMBJJ7NE3J0123456
**Rok výroby**: 2018
**Výkon**: 150 HP
**Stav**: funkcni
**Umístění**: Komárka - parkoviště
**STK**: 2026-05-15

## Poznámky

Služební vozidlo pro potřeby spolku.
```

---

## 🎯 PODPOROVANÉ POLE

| Pole | Popis | Příklad |
|------|-------|---------|
| `nazev` | Název vozidla | ZETOR 8145 |
| `typ` | Typ vozidla | traktor, rolba, auto, moto, ctyrkolka, ostatni |
| `znacka` | Značka | ZETOR, Prinoth, Chevrolet |
| `model` | Model | 8145, T4, Captiva |
| `registracni_znacka` | RZ | U001131 |
| `vin` | VIN číslo | 81451490 |
| `rok_vyroby` | Rok výroby | 2018 |
| `vykon_hp` | Výkon v HP | 82 |
| `vykon_kw` | Výkon v KW | 178 |
| `motor` | Popis motoru | 4válcový, Scania DS9 |
| `stav` | Stav | funkcni, nefunkcni, v_oprave, mimo_provoz |
| `umisteni` | Kde je vozidlo | Komárka - areál |
| `platnost_stk` | Datum STK | 2026-05-15 |
| `poznamky` | Volný text | Jakékoliv poznámky |

---

## 💡 TIPY

### 1. Používejte frontmatter
Nejsnazší způsob:
```markdown
---
typ: auto
znacka: Škoda
stav: funkcni
---
```

### 2. Inline hodnoty
Plugin umí parsovat i z textu:
```markdown
**RZ**: ABC1234
**Výkon**: 150 HP
```

### 3. Auto-sync
Zapněte automatickou synchronizaci v nastavení pro instant sync při každém uložení.

### 4. Fotky
Můžete vkládat obrázky:
```markdown
![[foto_vozidla.jpg]]
```

---

## ❓ TROUBLESHOOTING

### ❌ "Plugin nepodporuje vozidla"
→ Restartujte Obsidian (zavřít a otevřít znovu)

### ❌ "HTTP 404: Table not found"
→ Spusťte SQL skript `vozidla-schema.sql` v Supabase

### ❌ Data se nesynchronizují
→ Zkontrolujte:
1. Tag `#supabase-sync/vozidlo` je v poznámce
2. Frontmatter je správně formátovaný (--- na začátku a konci)
3. Supabase credentials jsou vyplněny v nastavení

### 🔍 Debug
1. Zapněte **Debug režim** v nastavení pluginu
2. Otevřete konzoli (F12)
3. Synchronizujte poznámku
4. Sledujte logy v konzoli

---

## 🎉 HOTOVO!

Teď můžete:
✅ Spravovat vozidla v Obsidianu
✅ Automaticky synchronizovat do Supabase
✅ Sdílet data s týmem
✅ Vytvářet reporty o vozidlech
✅ Hlídat STK a servisy

---

**Vytvořeno**: 2026-02-10
**Pro**: TJ Krupka - Komárka

🚗 **Šťastné řízení!**

#claude_reference
