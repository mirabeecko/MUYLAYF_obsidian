---
tags:
  - media
  - index
  - dashboard
datum_vytvoreni: 2026-06-13
---

# 📰 Index médií

> Přehled článků, příspěvků na sociálních sítích a dalších mediálních výstupů týkajících se kauzy.

---

## Články

```dataview
TABLE datum AS "Datum", zdroj AS "Zdroj", url AS "URL", kauza AS "Kauza"
FROM "08_Média/Clanky"
SORT datum DESC
```

---

## Sociální sítě

```dataview
TABLE datum AS "Datum", platforma AS "Platforma", url AS "URL", kauza AS "Kauza"
FROM "08_Média/Socialni_Site"
SORT datum DESC
```

---

## Monitoring

- [ ] Vyhledat články o TJ Krupka v regionálním tisku
- [ ] Sledovat sociální sítě města Krupka
- [ ] Archivovat komentáře na veřejných fórech
