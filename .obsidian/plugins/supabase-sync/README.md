# Supabase Sync Plugin - Návod k použití

Plugin pro synchronizaci poznámek z Obsidianu do Supabase databáze pro správu Komárky.

---

## 📥 Instalace

### 1. Plugin je již nainstalován
Plugin je umístěn v: `.obsidian/plugins/supabase-sync/`

### 2. Povolit plugin v Obsidianu
1. Otevřete **Nastavení** (Settings) - ikonka ozubeného kola
2. Přejděte na **Community plugins**
3. Vypněte **Safe mode** (pokud je zapnutý)
4. Přejděte na **Installed plugins**
5. Najděte **Supabase Sync** a zapněte ho

---

## ⚙️ Nastavení

### 1. Získejte Supabase credentials

1. Přihlaste se na https://supabase.com/dashboard
2. Vytvořte nový projekt (pokud ještě nemáte) - **FREE tier je dostačující**
3. Po vytvoření projektu přejděte na **Settings** → **API**
4. Zkopírujte:
   - **Project URL** (např. `https://abcdefgh.supabase.co`)
   - **Anon/Public key** (začína `eyJhbGci...`)

### 2. Vytvořte databázové tabulky

V Supabase SQL Editoru spusťte SQL příkazy pro vytvoření tabulek (viz samostatný soubor `supabase-schema.sql` nebo použijte SQL z hlavního návodu).

Základní tabulky:
- `pokoje`
- `rezervace`
- `uklidy`
- `opravy_udrzba`
- `dotace`
- `akce`
- `partneri_dodavatele`

### 3. Nastavte plugin v Obsidianu

1. Otevřete **Nastavení** → **Community plugins** → **Supabase Sync** → **Options** (ikonka ozubeného kola)
2. Vyplňte:
   - **Supabase URL**: Vaše Project URL
   - **Supabase API Key**: Anon/Public key
3. (Volitelné) Zapněte **Automatická synchronizace** - poznámky se budou synchronizovat při každém uložení
4. Klikněte na **Test připojení** - mělo by se zobrazit "✅ Připojení úspěšné!"

---

## 🚀 Jak používat

### Základní workflow

1. **Vytvořte novou poznámku**
2. **Přidejte příslušný tag** podle typu dat
3. **Vyplňte data**
4. **Synchronizujte**

### Podporované tagy

| Tag | Supabase tabulka | Účel |
|-----|------------------|------|
| `#supabase-sync/akce` | `akce` | Letní akce, programy, akce |
| `#supabase-sync/pokoj` | `pokoje` | Evidence pokojů |
| `#supabase-sync/dotace` | `dotace` | Dotace, granty |
| `#supabase-sync/partner` | `partneri_dodavatele` | Partneři, dodavatelé |
| `#supabase-sync/oprava` | `opravy_udrzba` | Opravy a údržba |

---

## 📝 Příklady poznámek

### Příklad 1: Akce (letní program)

```markdown
---
datum: 2025-07-05
typ: letni_akce
stav: planovano
---

#supabase-sync/akce

# GRAND OPENING Komárka 2025

**Datum**: 5.7.2025
**Typ**: letni_akce
**Stav**: planovano

Program zahrnuje ukázky bike trailů, trampolíny, občerstvení...
```

Po synchronizaci se vytvoří záznam v tabulce `akce` s poli:
- `nazev`: "GRAND OPENING Komárka 2025"
- `datum`: 2025-07-05
- `typ`: "letni_akce"
- `stav`: "planovano"
- `poznamky`: Text z poznámky

### Příklad 2: Pokoj

```markdown
---
cislo_pokoje: 7
pocet_luzek: 3
stav: ciste
---

#supabase-sync/pokoj

# Pokoj 7

Pokoj má 3 lůžka, čistý a připravený.
```

### Příklad 3: Dotace

```markdown
---
poskytovatel: Ústecký kraj
deadline: 2025-03-31
stav: priprava
---

#supabase-sync/dotace

# ÚK Sport 2025

Dotace na sportovní vybavení.
```

### Příklad 4: Partner (dodavatel)

```markdown
---
typ: bistro
telefon: +420 777 123 456
email: kontakt@bistro.cz
hodnoceni: 4
---

#supabase-sync/partner

# Bistro Komárka - Jan Novák

Mobilní bistro, burgery a gril.
```

### Příklad 5: Oprava

```markdown
---
priorita: vysoka
stav: v_planu
---

#supabase-sync/oprava

# Oprava zámku v pokoji 5

**Popis**: Zámek nefunguje, nutná výměna.

**Priorita**: vysoka
**Stav**: v_planu
**Odhadované náklady**: 2500 Kč
```

---

## 🔄 Způsoby synchronizace

### 1. Manuální sync aktuální poznámky
- **Command Palette** (Ctrl/Cmd + P): `Synchronizovat aktuální poznámku`
- Nebo: klikněte na **sync ikonu** v levém panelu (ribbon)

### 2. Sync všech poznámek
- **Command Palette** (Ctrl/Cmd + P): `Synchronizovat všechny poznámky`
- Synchronizuje všechny poznámky s podporovanými tagy

### 3. Automatický sync
- Zapněte v nastavení pluginu: **Automatická synchronizace**
- Poznámky se budou synchronizovat automaticky při každém uložení (Ctrl/Cmd + S)

### 4. Stáhnout data ze Supabase
- **Command Palette**: `Stáhnout data ze Supabase`
- Stáhne všechny záznamy z Supabase a vytvoří/aktualizuje poznámky v Obsidianu
- Poznámky budou uloženy ve složkách: `Supabase/akce/`, `Supabase/pokoje/`, atd.

---

## 🎯 Tipy a triky

### 1. Použití frontmatter (YAML)
Nejsnazší způsob, jak zadat strukturovaná data:

```markdown
---
datum: 2025-07-15
stav: planovano
---

#supabase-sync/akce

# Můj akce
```

### 2. Inline pole v textu
Plugin umí parsovat i data z textu:

```markdown
#supabase-sync/akce

# Můj akce

**Datum**: 2025-07-15
**Stav**: planovano
```

### 3. Hodnocení hvězdičkami
Pro partnery můžete použít emoji hvězdičky:

```markdown
#supabase-sync/partner

# Partner XY

**Hodnocení**: ★★★★☆
```

Plugin převede 4 hvězdičky na číslo 4 v databázi.

### 4. Propojení s existujícími poznámkami
Můžete linkovat na jiné poznámky v Obsidianu:

```markdown
#supabase-sync/akce

# Akce 15.7.

**Partner**: [[Bistro kandidát 1]]
**Instruktoři**: [[Smíča]], [[Deniska Jedličková]]
```

### 5. Fotodokumentace
Můžete vkládat obrázky do poznámek:

```markdown
#supabase-sync/pokoj

# Pokoj 7

## Fotky stavu
![[pokoj7_foto1.jpg]]
![[pokoj7_foto2.jpg]]
```

URL obrázků se uloží do Supabase pole `fotky[]`.

---

## 🐛 Troubleshooting

### ❌ "Nejdřív nastavte Supabase URL a API Key"
**Řešení**: Přejděte do nastavení pluginu a vyplňte URL a API key.

### ❌ "HTTP 401: Unauthorized"
**Řešení**:
- Zkontrolujte, že používáte správný API key (Anon/Public, NE Service Role)
- Ověřte, že URL je správné

### ❌ "HTTP 404: Not Found"
**Řešení**: Tabulka v Supabase neexistuje. Vytvořte ji pomocí SQL skriptu.

### ❌ "HTTP 400: Bad Request"
**Řešení**:
- Data v poznámce neodpovídají struktuře tabulky
- Zkontrolujte, že požadovaná pole jsou vyplněna
- Zapněte Debug režim v nastavení a podívejte se do konzole (F12)

### ⚠️ Plugin se nezobrazuje v seznamu
**Řešení**:
1. Zkontrolujte, že složka `.obsidian/plugins/supabase-sync/` obsahuje soubory:
   - `manifest.json`
   - `main.js`
   - `styles.css`
2. Restartujte Obsidian
3. Vypněte Safe mode v nastavení

### 🔍 Zapnout debug režim
Pokud něco nefunguje:
1. Nastavení → Supabase Sync → **Debug režim** (zapnout)
2. Otevřete Developer Console (Ctrl/Cmd + Shift + I nebo F12)
3. Záložka **Console**
4. Uvidíte detailní logy o tom, co se děje

---

## 📊 Sledování dat

### V Obsidianu
Použijte Dataview plugin pro zobrazení dat z poznámek:

```dataview
TABLE datum, stav, typ
FROM #supabase-sync/akce
WHERE datum >= date(today)
SORT datum ASC
```

### V Supabase
1. Přejděte na https://supabase.com/dashboard
2. Vyberte projekt
3. **Table Editor** - zde vidíte všechny záznamy
4. **SQL Editor** - můžete psát vlastní SQL dotazy

### Příklad SQL dotazu
```sql
-- Všechny plánované akce
SELECT * FROM akce
WHERE stav = 'planovano'
ORDER BY datum ASC;

-- Pokoje potřebující opravu
SELECT * FROM pokoje
WHERE stav = 'potrebuje_opravu';

-- Dotace s deadlinem do 30 dní
SELECT * FROM dotace
WHERE deadline <= CURRENT_DATE + INTERVAL '30 days'
ORDER BY deadline ASC;
```

---

## 🔐 Bezpečnost

### ✅ CO DĚLAT
- Používejte **Anon/Public API key** (začíná `eyJhbGci...`)
- Nastavte **Row Level Security (RLS)** v Supabase pro ochranu dat
- Zálohujte Obsidian vault pravidelně

### ❌ CO NEDĚLAT
- **NIKDY** nepoužívejte Service Role key v pluginu (má plný přístup)
- Nesdílejte API key veřejně
- Nevkládejte API key do veřejných poznámek

---

## 🆘 Podpora

Pokud máte problém nebo nápad na vylepšení:
1. Zkontrolujte **Troubleshooting** sekci výše
2. Zapněte **Debug režim** a podívejte se do konzole
3. Kontaktujte správce systému

---

## 📚 Další zdroje

- **Supabase dokumentace**: https://supabase.com/docs
- **Obsidian API**: https://docs.obsidian.md/
- **SQL tutorial**: https://www.w3schools.com/sql/

---

## 🎉 Užitečné příkazy (Command Palette)

Otevřete Command Palette pomocí **Ctrl/Cmd + P** a napište:

- `Sync current` - Synchronizovat aktuální poznámku
- `Sync all` - Synchronizovat všechny poznámky
- `Pull from Supabase` - Stáhnout data ze Supabase

---

**Verze**: 1.0.0
**Autor**: TJ Krupka
**Datum**: 2026-02-10
