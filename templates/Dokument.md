---
tags:
  - dokument
  - entita
datum_vytvoreni: <% tp.date.now("YYYY-MM-DD") %>
typ: # smlouva, výzva, rozhodnutí, email, datová zpráva, žaloba, odvolání, trestní oznámení, zápis
datum:
osoby:
  - 
instituce:
  - 
kauza:
  - 
spisova_znacka:
original:
zpracovano: false
poznamka:
---

# <% tp.file.title %>

## Metadata

| Atribut | Hodnota |
|:--------|:--------|
| **Typ** | `=this.typ` |
| **Datum** | `=this.datum` |
| **Kauza** | `=this.kauza` |
| **Spisová značka** | `=this.spisova_znacka` |
| **Zpracováno** | `=this.zpracovano` |

---

## Strany

### Osoby
`=this.osoby`

### Instituce
`=this.instituce`

---

## Obsah / Shrnutí


---

## Přílohy

- [[<% tp.file.title %> — přílohy]]

---

## Odkazy na originál

`=this.original`

---

## Poznámka

`=this.poznamka`
