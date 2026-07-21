---
tags:
  - instituce
  - entita
datum_vytvoreni: <% tp.date.now("YYYY-MM-DD") %>
typ: # soud, úřad, firma, policie, spolek
ico:
adresa:
status: aktivní
kontakt:
  - 
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
| **Typ** | `=this.typ` |
| **IČO** | `=this.ico` |
| **Adresa** | `=this.adresa` |
| **Status** | `=this.status` |
| **Vztah ke kauze** | `=this.vztah_ke_kauze` |

---

## Kontakt

`=this.kontakt`

---

## Vztahy

### Osoby
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
WHERE contains(instituce, "<% tp.file.title %>")
SORT datum ASC
```

```dataview
TABLE datum AS "Datum", typ AS "Typ", kauza AS "Kauza"
FROM "03_Dokumenty"
WHERE contains(instituce, "<% tp.file.title %>")
SORT datum ASC
```
