---
tags: []
cssclasses:
  - dashboard
sticker: emoji//1f600
---

> **ODKAZ** NA FORMULÁŘ : https://forms.gle/ExfjgniM96N8kVv68
>  TJ bankovní účet : 1061094359/0800
>  IČO: 46070516

---

#### TJ Krupka

-  ❌ Další postup 
	- [[⚜ SHRNUTÍ ROKŮ 2021 - 2023]] !!!
	- [[REAKCE NA SVOLÁNÍ SHROMÁŽDĚNÍ DELEGÁTŮ]]


- VYJÁDŘENÍ apod.
	- 🩸[[Vyjádření pro oddíl Stolní tenis]]
	- 🩸[[🩸 JIRKA ČERNÝ RADY]]
	- [[🩸 TJ SHRNUTÍ]]
	- [[⚜ 8001 TJ VÝSTUP]]
	- [[Město Krupka.canvas|Město Krupka]] canvas
	- [[ÚPRAVY ČEZ DISTRIBUCE KOMÁRKA]]

-  💳  Členství a Příspěvky
	- [[🏓TJ DĚTI TABULKA]]
	- [[KDO JE a KDO NENÍ člen]]


-  🏴‍☠️ Problémy
	- [[🩸 Stolní tenis - špatně]]
	- [[⚜ TJ ODDÍLY 2021-2023 - výsledek hospodaření]]


-  💿 Data
	- [[🛒 TJ 2021-2023 - náklady provoz]]
	- [[⚜ TJ ODDÍLY 2021-2023 - výsledek hospodaření]]]
	- [[TJ CANVAS.canvas|TJ CANVAS]]

- 🗄️ TJ ODDÍLY `$=dv.list(dv.pages('#tj/oddily').sort(f=>f.file.mtime.ts,"desc").limit(10).file.link)`
  
- 🔗 ODKAZY
	- [TJ ZÁKLADNA | formulář k vyplnění](https://forms.gle/ExfjgniM96N8kVv68)
	- [ČUS PORTÁL](https://iscus.cz/)
	- [Předsednictví 2021-2023](https://docs.google.com/spreadsheets/d/1H4cXIPiaVO9ASkoaMedm6zZDm34xtJb5NQCkltLJeT4/edit#gid=100737586)
	- [[ZÁPASY TJ KRUPKA]]
	- [RSST Teplice](https://registr.ping-pong.cz/htm/auth/svaz/?svaz=420509)
	- [TJ ČAST EDITACE](https://registr.ping-pong.cz/htm/auth/klub/?klub=420509005)
	- [Evidenční seznam ČAST](https://registr.ping-pong.cz/htm/auth/klub/seznam/edit.php?seznam=17003)
<br>
##### ⛏ TJ TODO

#### Mákni na tom
```tasks 
due before tomorrow 

```

#### Blížící se úkoly:

```tasks
due after tomorrow
```
#### Bez termínu
```tasks
not done
no due date
#task 

```


# TJ Děti
```dataview
LIST 
FROM #tj/deti 
SORT ASC
```
---
###### MAJLAJF Vault Info

- 🗄️ Poslední úpravy `$=dv.list(dv.pages('#tj-krupka').sort(f=>f.file.mtime.ts,"desc").limit(10).file.link)`
- 🔖 Tagged: POZNÁMKY `$=dv.list(dv.pages('#tj/poznamky').sort(f=>f.file.name,"desc").limit(10).file.link)`
-  🔖 Tagged: *oddíly* `$=dv.list(dv.pages('#tj/poznamky').sort(f=>f.file.name,"desc").limit(10).file.link)`
-  〽️ Stats
    - File Count: `$=dv.pages().length`
    - Personal recipes: `$=dv.pages('"80 TJ"').length`


```dataview
table instituce, zástupce, email, tel
from #tj/instituce

```


##### Šablony
```dataview
list 
from #template-tj 

```
---

- TJ poznámky `$=dv.list(dv.pages('#Tj/poznamky').sort(f=>f.file.name,"desc").limit(10).file.link)`
---
#####  🧹 Úkoly
- Poslední úpravy `$=dv.list(dv.pages('#tj-krupka').sort(f=>f.file.mtime.ts,"desc").limit(10).file.link)`
- 🗄️ Poslední úpravy `$=dv.list(dv.pages('#tj/deti').sort(f=>f.file.mtime.ts,"desc").limit(10).file.link)`
- TJ udalosti `$=dv.list(dv.pages('#tj/udalosti').sort(f=>f.file.name,"desc").limit(20).file.link)`
<br>
##### VÝSLEDEK hospodaření

```dataview
TABLE oddíl, pokladna_2020,dluh_elektrina AS Elektřina, dluh_plyn as Plyn, oddílové_příspěvky ,členské_příspěvky as Členské, dluh_celkem as Dluh
from #tj/oddily  

```

##### Pokladny 31.12.2020
```dataview
TABLE pokladna_2020 as "pokladna k 31.12.2020"
from #tj/oddily  

```

##### Příspěvky 2021-2023
```dataview
TABLE oddílové_příspěvky as "Vybrané oddílové příspěvky" , členské_příspěvky as "Nezaplacené členské příspěvky"
from #tj/oddily  

```

##### Energie/Dluhy oddílů
```dataview
TABLE dluh_energie, další_náklady as "další náklady"
from #tj/oddily  
 
```

#claude_reference
