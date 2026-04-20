---
tags:
  - tj/shrnuti
  - tj/hospodareni
  - TJ/MAIN
  - tj2021-2023
  - TJK-ALFA-DOC
  - tj/pravda
up:
  - "[[⚜ TJ starý MOC]]"
dg-publish: true
---



# VÝSLEDEK **HOSPODAŘENÍ** - jednotlivé oddíly

```dataview
TABLE oddíl, členů, pokladna_2020 as pokladna,dluh_energie as energie, ztrata_jednoty
from #tj/oddily1  and -#oddilyNOVÉ 

```

<br>
```dataview
table tj_zaplatila as "TJ zaplatila za jiné", ztrata_jednoty
from #tj/vsechnyoddily
```



---
# Výsledek hospodaření 2021-2023

> [!INFO]+ VÝSLEDEK hospodaření
> ```dataview
> TABLE oddíl, členů, pokladna_2020,dluh_elektrina AS Elektřina, dluh_plyn as Plyn, oddílové_příspěvky ,členské_příspěvky as Členské, dluh_celkem as Dluh
> from #tj/oddily1 
> ```

> [!TIP]+ Pokladny 31.12.2020
> ```dataview
> TABLE pokladna_2020 as "Stav pokladny k 31.12.2020"
> from #tj/oddily1  
> 
> ```


> [!important]+ Dluh -> NEZAPLACENÉ příspěvky 
> ```dataview
> TABLE členské_příspěvky as "Nezaplacené členské příspěvky"
> from #tj/oddily1  
> 
> ```

**Členský příspěvek** ve výši 200 Kč za rok je jediný příjem, který je určen přímo spolku na jeho provoz. Jinými slovy.. 
1. Členové spolku se mohou účastnit soutěží
2. provozovat sportovní činnost
3. vybírat peníze
4. nakupovat vybavení
5. žádat dotace od města
6. přijímat sponzoring. 
7. nemusí se starat o účetnictví. 
8. věškeré listiny , smlouvy, žádosti , atd. za ně podepisuje předseda spolku. 

Za 200 Kč ročně je to celkem rozsáhlý servis. 

### Pan Vaniš, Pivoňka, pan Vlach a pan Kulík ovšem od roku 2020 nezaplatili příspěvky ani za jednoho člena.

**144.800 Kč** celkem 


Mně osobně to přijde docela k smíchu. Aby byla sranda , pánové Vaniš s Pivoňkou, pan Vlach a pan Kulík vybírali od svých členů ještě oddílové příspěvky - pod záminkou ,  Pan Vaniš s Pivoňkou 2.400 Kč za rok , pan Vlach 1.200 Kč za rok, pan Kulík dokonce 3.600 Kč za rok. 

---

> [!INFO]+ ZAPŘENÉ příspěvky 
> ```dataview
> TABLE oddílové_příspěvky as "Zapírané příspěvky" 
> from #tj/oddily1  
> 
> ```

**Zapřené příspěvky** = předsedové oddílů vybírali jménem svých oddílů příspěvky na provozní náklady, které však neuhradili 



---

> [!important]+ Energie-Dluhy oddílů
>```dataview
> TABLE dluh_elektrina, dluh_plyn, dluh_voda, dluh_energie
> from #tj/oddily1  
>  
> ```

Odběrná místa - světlo, teplo, voda - jsou napsaná na spolek a zálohy placený že spolkového účtu.

---
# Stavy pokladen

```dataview
TABLE pokladna_2020 as "stav pokladny k 31.12.2020"
from #tj/oddily1

```
<br><br><br>
I přesto, že je to v rozporu se stanovami spolku , pracují oddíly s hotovostí. Vystavují příjmové pokladní doklady apod. a místo hotovosti spolku předávají různé účtenky apod.. 

##### ❌ Uvedené stavy pokladen jsou dle účetnictví k 31.12. 2020. 

---
## Členské příspěvky 

```dataview
TABLE členské_příspěvky as "dluh"
from #tj/oddily  and -#oddilyNOVÉ 
```


#### **Platit** členské příspěvky je **povinností každého člena** spolku. Jedná se o **primární příjem** spolku.
---

# Neplacení energií
<br><br>

```dataview
TABLE dluh_energie as "dluh"
from #tj/oddily  and -#oddilyNOVÉ 
```

<br>
### Elektřina, voda, plyn od roku 2021 nejsou zaplaceny.
<br>
```dataview
table  popis, dluh_celkem, tj_zaplatila as "TJ zaplatila", ztrata_jednoty, členské_příspěvky as "Členské" , oddílové_příspěvek as "Oddílové"
from #tj/vsechnyoddily or #tj/vsechnyoddily1
```
<br>

[[🛒 TJ 2021-2023 - náklady provoz]]







---
### KARATE 2021-2023


```dataview
table členů,  dluh_celkem, členské_příspěvky as "Členské", oddílové_příspěvky as "Oddílové", pokladna_2020 as "Pokladna"
from #tj/karate1  
```



---

### LYŽAŘI 2021-2023


```dataview
table členů,  dluh_celkem, tj_zaplatila as "TJ zaplatila", členské_příspěvky as "Členské", oddílové_příspěvky as "Oddílové", pokladna_2020 as "Pokladna"
from #tj/lyzari1
```


>[!warning]+  HISTORIE 
> Historicky byl areál hlavním zdrojem příjmů TJ. Současný skutkový stav je takový, že TJ nemá vůbec žádné příjmy , a to hlavně díky nákladům areálu, protože areál se neudržuje a vleky se sotva pustí. Pokud k tomu dojde, příjem z vleků jednota stejně nezíská.

---

### Stolní tenis 2021-2023

```dataview
table členů,  dluh_celkem, tj_zaplatila as "TJ zaplatila", členské_příspěvky as "Členské", oddílové_příspěvky as "Oddílové", pokladna_2020 as "Pokladna"
from #tj/oddily1   
```

#claude_tjkrupka
