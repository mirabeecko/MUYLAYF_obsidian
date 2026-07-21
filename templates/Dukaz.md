---
tags:
  - dukaz
  - entita
datum_vytvoreni: <% tp.date.now("YYYY-MM-DD") %>
popis:
datum:
zdroj:
osoby:
  - 
souvisejici_dokumenty:
  - 
pravni_vyznam:
sila_dukazu: střední
otevrene_otazky:
  - 
status: čeká na vyhodnocení
kauza:
  - 
---

# <% tp.file.title %>

## Popis

`=this.popis`

## Metadata

| Atribut | Hodnota |
|:--------|:--------|
| **Datum vzniku** | `=this.datum` |
| **Zdroj** | `=this.zdroj` |
| **Právní význam** | `=this.pravni_vyznam` |
| **Síla důkazu** | `=this.sila_dukazu` |
| **Status** | `=this.status` |

---

## Vztahy

### Související osoby
`=this.osoby`

### Související dokumenty
`=this.souvisejici_dokumenty`

### Kauza
`=this.kauza`

---

## Otevřené otázky

`=this.otevrene_otazky`

---

## Dataview — všechny zmínky

```dataview
TABLE datum AS "Datum", udalost AS "Událost", kauza AS "Kauza"
FROM "11_Chronologie"
WHERE contains(dukazy, "<% tp.file.title %>")
SORT datum ASC
```
