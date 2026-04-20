---
cssclasses:
  - dashboard
tags:
  - Tj/zpravy
  - TJK-ALFA-DOC
  - tj/dataview
---
# Tělovýchovná jednota Krupka z.s.
### Hospodaření oddílů   2021-2023
```dataview
TABLE pokladna_2020 as "pokladna" , oddílové_příspěvky as "vybrali a zapřeli" , členské_příspěvky as "nezaplatili",dluh_energie as "bylo za ně zaplaceno", dluh_celkem as "celková škoda"
from #tj/oddily1

```

**Vybrali =** Požadovali a obdrželi úhradu pod názvem "Platba za členské příspěvky" od všech hráčů včetně mě  
**Nezaplatili =** Hodnota nezaplacených *členských příspěvků jednotě podle počtu členů*  
**Bylo za ně zaplaceno =** Elektřina, voda, plyn - náklady za provoz jednotlivých sportovišť, kterou daný oddíl vytvořil a nezaplatil.  
**Pokladna =** stav hotovosti v pokladně ke dni 31.12.2020, který též odmítají vydat  

---

> [!INFO]+ **ZAPŘENÉ** příspěvky
> ```dataview
TABLE oddílové_příspěvky as "dluh" 
from #tj/oddily1 

> [!INFO]+ **NEZALACENÉ** příspěvky
> ```dataview
 TABLE členské_příspěvky as "dluh"
> from #tj/oddily1 

---

> [!INFO]+ **ENERGIE** - Elektřina, voda, plyn
> ```dataview
TABLE dluh_energie as "dluh"
from #tj/oddily1 

---

#claude_reference
