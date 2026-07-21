---
tags:
  - ukol
datum_vytvoreni: <% tp.date.now("YYYY-MM-DD") %>
status: otevřený # otevřený, v řešení, hotovo, zrušeno
priority: 2 # 1=kritická, 2=vysoká, 3=střední, 4=nízká
due:
popis:
otazka:
osoby:
  - 
instituce:
  - 
kauza:
  - 
dukazy:
  - 
---

# <% tp.file.title %>

## Popis

`=this.popis`

## Metadata

| Atribut | Hodnota |
|:--------|:--------|
| **Status** | `=this.status` |
| **Priorita** | `=this.priority` |
| **Termín** | `=this.due` |
| **Kauza** | `=this.kauza` |

---

## Odpovědné osoby

`=this.osoby`

---

## Související instituce

`=this.instituce`

---

## Důkazy

`=this.dukazy`

---

## Otevřená otázka

`=this.otazka`

---

## Postup řešení

- [ ] Analýza
- [ ] Příprava
- [ ] Podání / odeslání
- [ ] Vyhodnocení
