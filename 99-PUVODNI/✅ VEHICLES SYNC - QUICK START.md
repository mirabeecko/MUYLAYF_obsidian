---
tags:
  - vehicles
  - quick-start
---

# ✅ VEHICLES SYNC - QUICK START

Oboustranná synchronizace vozidel je **připravena k použití**!

---

## 🚀 START ZA 3 KROKY

### **KROK 1: Restartovat Obsidian** (10 sekund)
```
1. Zavřete Obsidian
2. Otevřete Obsidian znovu
```
✅ Plugin se načte s podporou vehicles

---

### **KROK 2: Test sync** (30 sekund)
```
1. Otevřete: Vehicles/Mercedes Benz GL 320.md
2. Stiskněte: Ctrl/Cmd + P
3. Napište: sync current
4. Enter
```
✅ Mělo by se zobrazit: "Mercedes Benz GL 320 synchronizováno"

---

### **KROK 3: Ověřit v Supabase** (20 sekund)
```
1. https://supabase.com/dashboard
2. Table Editor → vehicles
3. Najít Mercedes Benz GL 320
```
✅ Data jsou tam!

---

## 🎯 JAK TO POUŽÍVAT

### **A) Upravit v Obsidianu → Sync do Supabase**
```
1. Otevřete poznámku (např. Mercedes Benz GL 320.md)
2. Upravte data (např. odometer_km: 270000)
3. Uložte (Ctrl/Cmd + S)
4. Sync (Ctrl/Cmd + P → "sync current")
```

### **B) Upravit v Supabase → Stáhnout do Obsidianu**
```
1. Upravte v Supabase Table Editoru
2. V Obsidianu: Ctrl/Cmd + P → "pull from supabase"
```

### **C) Automatický sync (doporučeno!)**
```
1. Nastavení → Supabase Sync → Options
2. Zapnout: "Automatická synchronizace"
3. Od teď: Upravit → Ctrl+S → Automaticky sync!
```

---

## 📁 VAŠE VOZIDLA

Složka `Vehicles/` obsahuje **10 vozidel**:

### 🏍️ Motorky (7):
1. AJP PR4
2. Yamaha DragStar 1100
3. KTM LC4 640 Supermoto
4. TGB Blade 1000 LTX EPS (ATV)
5. KTM Duke 390
6. KTM FREERIDE 350
7. SHERCO TRIAL 290

### 🚗 Auta (3):
8. FIAT Ducato 2.3 Diesel
9. Peugeot 207
10. Mercedes Benz GL 320

---

## 💡 RYCHLÉ PŘÍKAZY

| Příkaz | Co dělá |
|--------|---------|
| `Ctrl/Cmd + P` → `sync current` | Sync aktuální poznámky |
| `Ctrl/Cmd + P` → `sync all` | Sync všech vozidel |
| `Ctrl/Cmd + P` → `pull from supabase` | Stáhnout ze Supabase |

---

## 🔧 FORMÁT POZNÁMKY

### Minimální:
```markdown
---
brand: KTM
model: Duke 390
category: motorcycle
---

#supabase-sync/vehicle

# KTM Duke 390
```

### Kompletní:
```markdown
---
brand: KTM
model: Duke 390
year: 2022
category: motorcycle
styl: naked
engine_capacity_cc: 373
power_hp: 44
fuel_type: Benzin
spz: ABC1234
vin: VBBKE15104M123456
color: orange
odometer_km: 12500
---

#supabase-sync/vehicle

# KTM Duke 390

Poznámky o vozidle...
```

---

## ❗ DŮLEŽITÉ

### ✅ MUSÍTE MÍT:
1. Tag `#supabase-sync/vehicle` v poznámce
2. Frontmatter (--- na začátku a konci)
3. Minimálně `brand` a `model`

### ⚠️ PŘED SYNC:
- Uložte poznámku (Ctrl/Cmd + S)
- Zkontrolujte, že frontmatter je správně

---

## 📖 DETAILNÍ NÁVODY

- **Kompletní návod**: `🚗 VEHICLES - OBOUSTRANNÁ SYNCHRONIZACE.md`
- **Troubleshooting**: Viz sekce v kompletním návodu
- **SQL dotazy**: Viz sekce v kompletním návodu

---

## 🆘 PROBLÉMY?

### Plugin nefunguje
→ Restartujte Obsidian

### Data se nesynchronizují
→ Zkontrolujte tag `#supabase-sync/vehicle`

### Připojení selhalo
→ Nastavení → Supabase Sync → Test připojení

### Debug
→ Nastavení → Supabase Sync → Debug režim ON
→ F12 (konzole)

---

## 🎉 TO JE VŠE!

**Start:**
1. Restartovat Obsidian
2. Test sync (Mercedes)
3. Ověřit v Supabase

**Každodenní použití:**
- Upravit poznámku → Ctrl+S → Sync!

---

**Vytvořeno**: 2026-02-10
**Vozidel**: 10
**Ready**: ✅

🚗 **GO!**

#claude_vozovypark
