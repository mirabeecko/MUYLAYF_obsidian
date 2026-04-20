---
tags:
  - vehicles
  - supabase
  - sync
  - návod
---

# 🚗 VEHICLES - OBOUSTRANNÁ SYNCHRONIZACE

Plugin byl aktualizován pro vaši existující tabulku `vehicles` v Supabase!

---

## ✅ CO BYLO UDĚLÁNO

### 1. Plugin aktualizován
✅ Přidána podpora pro tabulku `vehicles`
✅ Tag: `#supabase-sync/vehicle`
✅ Parsing všech polí z vaší databáze
✅ Oboustranná synchronizace (Obsidian ↔ Supabase)

### 2. Vytvořeno 10 poznámek
📁 Složka `Vehicles/` obsahuje všechna vaše vozidla:

1. ✅ AJP PR4.md
2. ✅ Yamaha DragStar 1100.md
3. ✅ KTM LC4 640 Supermoto.md
4. ✅ TGB Blade 1000 LTX EPS.md
5. ✅ FIAT Ducato 2.3 Diesel.md
6. ✅ KTM Duke 390.md
7. ✅ Peugeot 207.md
8. ✅ KTM FREERIDE 350.md
9. ✅ SHERCO TRIAL 290.md
10. ✅ Mercedes Benz GL 320.md

---

## 🚀 JAK TO POUŽÍVAT

### **ZPŮSOB A: OBSIDIAN → SUPABASE**
(Upravíte poznámku v Obsidianu a synchronizujete do databáze)

#### 1. Otevřete poznámku
```
Např: Vehicles/Mercedes Benz GL 320.md
```

#### 2. Upravte data
```markdown
---
brand: Mercedes Benz
model: GL 320
year: 2007
odometer_km: 270000  ← změna z 267000 na 270000
---

#supabase-sync/vehicle

# Mercedes Benz GL 320

**Odometer Km**: 270000
```

#### 3. Uložte
```
Ctrl/Cmd + S
```

#### 4. Synchronizujte
```
Ctrl/Cmd + P → "sync current"
```

✅ **Hotovo!** Data se aktualizují v Supabase.

---

### **ZPŮSOB B: SUPABASE → OBSIDIAN**
(Upravíte data v Supabase a stáhnete do Obsidianu)

#### 1. Upravte v Supabase
```
1. https://supabase.com/dashboard
2. Table Editor → vehicles
3. Najděte záznam (např. Mercedes)
4. Upravte pole (např. odometer_km: 270000)
5. Uložte (Enter)
```

#### 2. Stáhněte do Obsidianu
```
Ctrl/Cmd + P → "pull from supabase"
```

✅ **Hotovo!** Poznámka v Obsidianu se aktualizuje.

---

### **ZPŮSOB C: AUTOMATICKÁ SYNCHRONIZACE**
(Zapnout auto-sync při každém uložení)

#### 1. Zapnout auto-sync
```
Nastavení → Supabase Sync → Options
→ Zapnout: "Automatická synchronizace"
```

#### 2. Od teď stačí uložit
```
Upravíte poznámku → Ctrl/Cmd + S → Automaticky sync!
```

---

## 📊 STRUKTURA POZNÁMKY

### Minimální formát:
```markdown
---
brand: KTM
model: Duke 390
category: motorcycle
---

#supabase-sync/vehicle

# KTM Duke 390

Jakékoliv poznámky zde...
```

### Kompletní formát:
```markdown
---
supabase_id: "16"
brand: KTM
model: Duke 390
year: 2022
category: motorcycle
styl: naked
engine_capacity_cc: 373
power_hp:
power_kw:
cooling_type: liquid
gears: 6
oil_type: 10W-50
fuel_type: Benzin
tank_capacity: 13.4
spz:
vin:
color: white, orange, black
stk_until:
pov_until:
insurance_company:
insurance_expiry:
last_service_date:
next_service_date:
odometer_km:
current_price_eur: 120
day_price_czk: 2400
1h_price_czk: 900
3h_price_czk: 1900
weekend_price_czk: 4900
notes:
photo_url: https://...
---

#supabase-sync/vehicle

# KTM Duke 390

Detailní popis vozidla...

## Fotka
![Fotka vozidla](https://...)
```

---

## 🎯 PODPOROVANÁ POLE

| Pole | Popis | Příklad |
|------|-------|---------|
| `brand` | Značka | KTM, Mercedes Benz |
| `model` | Model | Duke 390, GL 320 |
| `year` | Rok výroby | 2022 |
| `category` | Kategorie | motorcycle, car |
| `styl` | Styl | naked, SUV, enduro |
| `engine_capacity_cc` | Objem motoru (ccm) | 373 |
| `power_hp` | Výkon (HP) | 221.27 |
| `power_kw` | Výkon (KW) | 165 |
| `fuel_type` | Palivo | Benzin, Diesel |
| `cooling_type` | Chlazení | liquid, air |
| `gears` | Počet rychlostí | 6 |
| `oil_type` | Typ oleje | 10W-50 |
| `tank_capacity` | Objem nádrže (l) | 13.4 |
| `spz` | SPZ | 6U47271 |
| `vin` | VIN číslo | VF3WAKFUC33355757 |
| `color` | Barva | white, orange |
| `stk_until` | STK do | 2026-12-31 |
| `pov_until` | POV do | 2026-12-31 |
| `insurance_company` | Pojišťovna | Kooperativa |
| `insurance_expiry` | Pojištění do | 2026-12-31 |
| `last_service_date` | Poslední servis | 2025-01-15 |
| `next_service_date` | Příští servis | 2025-07-15 |
| `odometer_km` | Kilometry | 267000 |
| `current_price_eur` | Cena (EUR) | 120 |
| `day_price_czk` | Cena/den (CZK) | 2400 |
| `1h_price_czk` | Cena/1h (CZK) | 900 |
| `3h_price_czk` | Cena/3h (CZK) | 1900 |
| `weekend_price_czk` | Cena/víkend (CZK) | 4900 |
| `notes` | Poznámky | ATV, naked bike |
| `photo_url` | URL fotky | https://... |

---

## 🔄 PRAKTICKÉ PŘÍKLADY

### Příklad 1: Přidat nové vozidlo

#### V Obsidianu:
```markdown
---
brand: Honda
model: CBR 600
year: 2020
category: motorcycle
styl: sport
engine_capacity_cc: 600
color: red
---

#supabase-sync/vehicle

# Honda CBR 600

Sportovní motorka pro půjčovnu.
```

```
Ctrl/Cmd + P → "sync current"
```

✅ Vozidlo se přidá do Supabase!

---

### Příklad 2: Aktualizovat kilometry

#### V poznámce:
```markdown
**Odometer Km**: 270000  ← změna z 267000
```

```
Uložit (Ctrl+S) → Sync (Ctrl+P → sync current)
```

✅ Kilometry aktualizovány v databázi!

---

### Příklad 3: Stáhnout všechna vozidla ze Supabase

Pokud někdo jiný přidal/upravil vozidla v databázi:

```
Ctrl/Cmd + P → "pull from supabase"
```

✅ Všechna vozidla se stáhnou/aktualizují v Obsidianu!

---

## 📋 CHECKLIST: NASTAVENÍ SYNC

- [ ] **1. Restartovat Obsidian**
  ```
  Zavřít Obsidian → Otevřít znovu
  ```

- [ ] **2. Ověřit plugin**
  ```
  Nastavení → Community plugins → Supabase Sync
  → Plugin je ZAPNUTÝ (zelený)
  ```

- [ ] **3. Zkontrolovat credentials**
  ```
  Supabase Sync → Options
  → Supabase URL vyplněno
  → Supabase API Key vyplněno
  ```

- [ ] **4. Test připojení**
  ```
  Supabase Sync → Options → Test připojení
  → ✅ "Připojení úspěšné!"
  ```

- [ ] **5. První sync**
  ```
  Otevřít: Vehicles/Mercedes Benz GL 320.md
  → Ctrl/Cmd + P → "sync current"
  → ✅ "Mercedes Benz GL 320 synchronizováno"
  ```

- [ ] **6. Ověřit v Supabase**
  ```
  https://supabase.com/dashboard
  → Table Editor → vehicles
  → Najít Mercedes Benz GL 320
  → ✅ Data jsou tam!
  ```

---

## 💡 TIPY PRO EFEKTIVNÍ POUŽITÍ

### 1. Auto-sync
```
Nastavení → Supabase Sync → Automatická synchronizace ON
→ Každé uložení (Ctrl+S) = automatický sync
```

### 2. Hromadná synchronizace
```
Ctrl/Cmd + P → "sync all"
→ Synchronizuje všechny poznámky s tagem #supabase-sync/vehicle
```

### 3. Dataview přehledy
```markdown
## 🏍️ Všechny motorky
\`\`\`dataview
TABLE brand, model, year, category, styl
FROM #supabase-sync/vehicle
WHERE category = "motorcycle"
SORT brand ASC
\`\`\`

## 🚗 Všechny auta
\`\`\`dataview
TABLE brand, model, year, odometer_km
FROM #supabase-sync/vehicle
WHERE category = "car"
SORT odometer_km DESC
\`\`\`
```

### 4. Rychlé úpravy
Nejčastější změny můžete dělat přímo ve frontmatter:
```yaml
---
odometer_km: 270000  ← rychlá změna
last_service_date: 2026-02-10
---
```

---

## ❓ TROUBLESHOOTING

### ❌ "Plugin nepodporuje vehicles"
→ **Řešení**: Restartujte Obsidian (zavřít a otevřít)

### ❌ "HTTP 404: Table not found"
→ **Řešení**: Zkontrolujte, že tabulka `vehicles` existuje v Supabase

### ❌ Data se nesynchronizují
→ **Zkontrolujte**:
1. Tag `#supabase-sync/vehicle` je v poznámce
2. Frontmatter je správně formátovaný (--- na začátku a konci)
3. Supabase credentials v nastavení jsou správné

### ❌ "Připojení selhalo"
→ **Zkontrolujte**:
1. Máte internet
2. Supabase URL je správné (`https://xxxxx.supabase.co`)
3. API key je `anon public` (začíná `eyJhbGci...`)

### 🔍 Debug režim
```
Nastavení → Supabase Sync → Debug režim ON
→ F12 (konzole) → Uvidíte detailní logy
```

---

## 🎉 WORKFLOW SHRNUTÍ

### Každodenní použití:

**1. Ranní update:**
```
Ctrl/Cmd + P → "pull from supabase"
→ Stáhne aktuální stav ze Supabase
```

**2. Práce s vozidly:**
```
Upravit poznámku → Ctrl/Cmd + S → Auto-sync (pokud zapnutý)
NEBO: Ctrl/Cmd + P → "sync current"
```

**3. Hromadný sync:**
```
Ctrl/Cmd + P → "sync all"
→ Synchronizuje všechna vozidla najednou
```

---

## 📊 SQL DOTAZY V SUPABASE

### Všechna vozidla:
```sql
SELECT brand, model, year, category, styl
FROM vehicles
ORDER BY brand, model;
```

### Motorky seřazené podle výkonu:
```sql
SELECT brand, model, power_hp, engine_capacity_cc
FROM vehicles
WHERE category = 'motorcycle'
ORDER BY power_hp DESC;
```

### Vozidla s končící STK:
```sql
SELECT brand, model, stk_until
FROM vehicles
WHERE stk_until < CURRENT_DATE + INTERVAL '60 days'
ORDER BY stk_until;
```

### Celkový počet kilometrů:
```sql
SELECT
  category,
  COUNT(*) as pocet_vozidel,
  SUM(odometer_km) as celkove_km
FROM vehicles
WHERE odometer_km IS NOT NULL
GROUP BY category;
```

---

## 🔗 INTEGRACE S DALŠÍMI NÁSTROJI

### 1. Grafana Dashboard
- Připojit Grafana k Supabase PostgreSQL
- Vytvořit dashboard s grafy vozidel

### 2. Make.com / N8N
- Automatické notifikace STK
- Auto-update kilometrů z GPS

### 3. Vlastní web
```typescript
// Next.js - zobrazit všechna vozidla
const { data } = await supabase
  .from('vehicles')
  .select('*')
  .order('brand', { ascending: true })
```

---

## ✅ HOTOVO!

Máte plně funkční oboustrannou synchronizaci mezi Obsidianem a Supabase!

**Co teď můžete:**
✅ Spravovat vozidla v Obsidianu i Supabase
✅ Automaticky synchronizovat změny
✅ Sdílet data s týmem
✅ Vytvářet reporty a dashboardy
✅ Sledovat STK, servisy, kilometry

---

**Vytvořeno**: 2026-02-10
**Pro**: TJ Krupka - Komárka
**Vozidel**: 10

🚗 **Šťastnou jízdu!**

#claude_vozovypark
