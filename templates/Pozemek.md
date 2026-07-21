---
tags:
  - pozemek
  - entita
datum_vytvoreni: <% tp.date.now("YYYY-MM-DD") %>
typ: # pozemek, budova, areál
cislo_parcely:
katastr:
vlastnik:
najemce:
výměra:
status: aktivní
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
| **Číslo parcely** | `=this.cislo_parcely` |
| **Katastr** | `=this.katastr` |
| **Vlastník** | `=this.vlastnik` |
| **Nájemce** | `=this.najemce` |
| **Výměra** | `=this.výměra` |
| **Status** | `=this.status` |

---

## Vztahy

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
WHERE contains(pozemky, "<% tp.file.title %>")
SORT datum ASC
```
