---
tags:
  - osoba
  - entita
datum_vytvoreni: <% tp.date.now("YYYY-MM-DD") %>
role:
status: aktivní
vztah_ke_kauze:
  - 
osoby:
  - 
udalosti:
  - 
dokumenty:
  - 
dukazy:
  - 
poznamky:
---

# <% tp.file.title %>

## Základní údaje

| Atribut | Hodnota |
|:--------|:--------|
| **Role** | `=this.role` |
| **Status** | `=this.status` |
| **Vztah ke kauze** | `=this.vztah_ke_kauze` |

---

## Vztahy

### Související osoby
`=this.osoby`

### Události
`=this.udalosti`

### Dokumenty
`=this.dokumenty`

### Důkazy
`=this.dukazy`

---

## Poznámky

`=this.poznamky`

---

## Dataview — všechny zmínky

```dataview
TABLE datum AS "Datum", udalost AS "Událost", kauza AS "Kauza"
FROM "11_Chronologie"
WHERE contains(osoby, "<% tp.file.title %>")
SORT datum ASC
```

```dataview
TABLE datum AS "Datum", typ AS "Typ", kauza AS "Kauza"
FROM "03_Dokumenty"
WHERE contains(osoby, "<% tp.file.title %>")
SORT datum ASC
```
