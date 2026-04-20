---
oddíl: Všechny oddíly
členů: "115"
pokladna 31.12.2020: 178 114 Kč
předseda oddílu: Vaniš, Kulík, Vlach
dluh_elektrina: 266 870 Kč
dluh_plyn: 33 051 Kč
dluh_energie: 299 921 Kč
dluh_celkem: 1 748 035 Kč
další dluhy: 210 000 Kč
další náklady: 210 000 Kč
oddílové_příspěvek: 955 200 Kč
členské_příspěvky: 104 800 Kč
tags:
  - tj/vsechnyoddily
  - tj/shrnuti
  - TJK-ALFA-DOC
ele_2020: 61 000 Kč
ele_2021: 73 360 Kč
ele_2022: 68 693 Kč
ele_2023: 63 817 Kč
ztrata_jednoty: 614 771 Kč
clenske_za_rok: 26 200 Kč
prispevek_clen: 7 200 Kč
tj_zaplatila: 509 921 Kč
popis: před navýšením základny
---




```dataview
table tj_zaplatila as "TJ zaplatila za jiné", ztrata_jednoty
from #tj/vsechnyoddily
```


---



---
```dataview
table  členů, tj_zaplatila as "TJ zaplatila za ODDÍL", ztrata_jednoty, členské_příspěvky
from #tj/oddily1
```

---


36+79+40 = *155 členů*

#claude_tjkrupka
