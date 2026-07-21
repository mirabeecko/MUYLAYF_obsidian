---
tags:
  - osoba
  - entita
  - tj-krupka
  - neidentifikovano
datum_vytvoreni: 2026-06-13
role: Neidentifikováno
status: neznámý
vztah_ke_kauze: Zmíněn v zadání, role v kauze není z dosud analyzovaných dokumentů jasná
osoby:
  - "[[Miroslav_Brozek]]"
udalosti:
  - "[[11_Chronologie/Kompletni_Chronologie|Kompletní chronologie]]"
dokumenty:
  - 
dukazy:
  - 
poznamky: |
  Osoba uvedená v zadání kauzy.
  Vyžaduje další analýzu a doplnění ze zdrojů.
---

# Kocis

## Základní údaje

| Atribut | Hodnota |
|:--------|:--------|
| **Role** | Neidentifikováno |
| **Status** | Neznámý |
| **Vztah ke kauze** | Vyžaduje doplnění |

---

> ⚠️ **Poznámka:** Tato osoba byla uvedena v zadání kauzy, ale z dosud analyzovaných dokumentů nevyplývá její přesná role. Je třeba doplnit z dalších zdrojů (Google Drive, e-maily, datové zprávy).

---

- schůzka **nebude**
- sdělit/nesdělit za jakou drzost to vlastně považuji ... 





## Dataview

```dataview
TABLE datum AS "Datum", udalost AS "Událost", kauza AS "Kauza"
FROM "11_Chronologie"
WHERE contains(osoby, "Kocis")
SORT datum ASC
```
