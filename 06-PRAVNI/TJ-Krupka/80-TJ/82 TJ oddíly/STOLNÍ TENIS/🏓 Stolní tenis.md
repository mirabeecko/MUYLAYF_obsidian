---
oddíl: Stolní tenis
členů: "36"
pokladna_2020: 43 793 Kč
předseda oddílu: Marek Vaniš
dluh_elektrina: 10 415 Kč
dluh_plyn: 33 051 Kč
dluh_energie: 43 466 Kč
dluh_celkem: 461 659 Kč
oddílové_příspěvky: 345 600 Kč
členské_příspěvky: 28 800 Kč
tags:
  - tj/oddily
  - tj/stolnitenis
  - tj/st21
  - tj/stolnitenis1
  - tj/ST
  - tj/dokumenty
  - Tj/zpravy
ele_2020: 0 Kč
ele_2021: 3 360 Kč
ele_2022: 3 238 Kč
ele_2023: 3 817 Kč
ztrata_jednoty: 72 266 Kč
clenske_za_rok: 7 200 Kč
prispevek_clen: 2 400 Kč
tj_zaplatila: 43 466 Kč
další_náklady: 0 Kč
dluh_voda: 
cssclasses:
  - dashboard
---


[[PŘÍKLADY JINÝCH]]

> [!important]- #hastag **TJ/ST**
> 
> ```dataview
> list
> from #tj/ST 
> 
> ```
> 
> 

---
- **Nabytí Pinčesárny** městek Krupka
	- [[PINČESÁRNA - SMLOUVA o bezplatném převodu nemovitostí podle zák č. 9291 sb., 1994.pdf]]

---
### Výsledky hospodaření oddílů *2021-2023*

```dataview
table členů, dluh_celkem as "dluh", tj_zaplatila as "TJ zaplaceno", oddílové_příspěvky as "zapřené přísp.", členské_příspěvky as "nezaplacené přísp."
from #tj/oddily

```


```dataview
table  členů as "Celkem členů", tj_zaplatila as "TJ zaplatila za ODDÍLY",  členské_příspěvky as "Dluh za nezaplacené členské příspěvky", ztrata_jednoty as "Ztráta TJK celkem", oddílové_příspěvek
from #tj/vsechnyoddily 
```

```dataview
table členů, dluh_celkem as "dluh", tj_zaplatila as "TJ zaplaceno", oddílové_příspěvky as "zapřené přísp.", členské_příspěvky as "nezaplacené přísp."
from #tj/vsechnyoddily 

```

![[Hospodaření oddílů 2021-2023.png]]
### #hashtag tj/ST
```dataview
list 
from #tj/ST   

```




### Jednání a DLUH Vaniše a Pivoňky 

> [!danger]- **PORUŠENÍ STANOV** SPOLKU
>  > Hrubé porušení povinností člena spolku dle čl. 4 bod 2. písmena a), b),c),d),e)
---

> [!warning]- KONKRÉTNÍ **POJMENOVÁNÍ** 
> 10. Nedodržování stanov a jednání v rozporu s nimi  
> 1. Neplnění povinností členů - úhrada členských příspěvků
> 2. Zapření výběru oddílových příspěvků předsedovi spolku, který je sám platil
> 3. Neuhrazení elektřiny, vody, plynu za hernu stolního tenisu (min. od 2021)
> 4. Výběr záloh za hospodu STEJSKAL - zapírání
> 5. Opakované vytváření domnělých nákladů oddílu a mámení proplacení od spolku
> 6. Neoprávněné samovolné nakládání s majetkem TJ
> 7. Neoprávněné rozdávání majetku TJ - nábytek, stoly na stolní tenis
> 8. Lži, sliby a pomluvy
> 9. Uvádění nepravdivých údajů ČAST apod.  
> 11. Odevzdání dotace NSA s chybami - bez nápravy
> 12. Bezdůvodné obohacení na úkor spolku
> 13. Uvádění čísla účtu v registru ČAST - **_2401649002/5500 Equa Bank_**
> 14. Provoz kantýny bez živnostenského oprávnění
> 15. Pomlouvání a šíření nepravdivých informací - klamání veřejnosti
> 16. Pokus o násilné převzetí spolku - protizákonné jednání - rozpor se stanovami, NOZ, Trestním zákoníkem
> 17. Páchání trestné činnosti jménem spolku 
```dataview
table členů, dluh_celkem as "dluh", tj_zaplatila as "TJ zaplaceno", oddílové_příspěvky as "zapřené oddílové přísp.", členské_příspěvky as "nezaplacené členské přísp."
from #tj/st23 

```

### **ČAST**
- Hráči oddílů **byli** členy spolku
	- členství ve spolku 
	- pokud byli členy spolku, stačí čestné prohlášení, že mají uhrazené příspěvky od roku 2021 do 2024
---
- Hráči oddílů **nebyli** členy spolku
	- pokud nebyli členy spolku, jsou všechny jejich odehrané zápasy této sezóny neplatné
	- jakmile spolek zjistil nesrovnalosti o jejich členství, upozornil je na to a vyzval je k nápravě tohoto stavu
	- oslovení hráči na výzvu nereagovali, tedy nevyužili možnost aktualizovat stav 
	- členství těchto hráčů 
#### PŘESTUP - SOUTĚŽNÍ ŘÁD

- Pro stanovení finančního vyrovnání při přestupech (**viz čl. 462**) platí vždy základní žebříček schválený po odehrané sezóně (k 10.6., 20.6., 30.6.).
- str. 61 - REGISTRAČNÍ A PŘESTUPNÍ ŘÁD !!!
- str. 65 - PŘESTUPNÍ ŘÁD
- str. 73 Článek 463. **Výchovné při přestupech**
	- Výchovné při přestupu je řešeno dohodou dotčených stran. Jedná-li se o hráče kategorie mládeže (U11 – U21) je jeho maximální výše určena každoročně vydanou tabulkou výchovného VV ČAST – viz čl. 452.03.  
	- Toto platí i v případě jedná-li se o hráče ostatních kategorií, jehož poslední registrace proběhla před 15.5.2011. Datum poslední registrace bude uveden v registru ČAST.

- str. 66 - Článek 452. **PODMÍNKY přestupu**
	- 452.01
		- Hráč nebo ostatní člen smí podat přestup nejdříve 12 měsíců po udělení registrace, a to pouze jedenkrát za 12 měsíců. V období od 1.7. do 31.8. může hráč hlásit přestup i v kratší době než po uplynutí 12-ti měsíců, pokud 12-ti měsíční lhůta spadá do tohoto období.  
		- Ohlásí-li přestup v době kratší jak 12 měsíců od vydání schválení jeho posledního přestupu, (mimo období 1.7.- 31.8.), je přestup neplatný a nebude projednáván. V opakovaných případech může být takové jednání předáno Disciplinární komisi.
		- *Poznámka*: Při přestupu ostatního člena je možné jeho status změnit na aktivní registraci (hráče), a to nejdříve za 12 měsíců od schváleného přestupu.
	- 452.02
		- Přestup podléhá souhlasu:
	
		- hráče, ostatního člena  
		- oddílu, z kterého hráč přestupuje („mateřský oddíl“), - oddílu, do kterého hráč přestupuje („nový oddíl“).
	
		- Chybí-li souhlas kterékoli z uvedených stran, přestup se nepovoluje, s výjimkou čl. 452.03 až 452.06. V případě, že v době hlášení přestupu je hráč na hostování (podle čl. 461), podléhá schválení souhlasu hráče, mateřského oddílu, nového oddílu i oddílu, kde je na hostování.
	- 452.03
	
		- Byl-li přestup zamítnut z důvodu chybějícího souhlasu mateřského oddílu a není-li smlouvou podle čl.456 mezi hráčem a oddílem stanoveno jinak, smí hráč po uplynutí 12 měsíců ve lhůtě 30 dnů přestoupit bez souhlasu mateřského oddílu. Podává-li se přestup opakovaně do stejného oddílu, 12-ti měsíční lhůta se zkracuje na 9 měsíců, při platnosti ustanovení článku 451.02. Připadne-li 30ti denní lhůta (celá, nebo částečně) na období 15.února až 14.května včetně, nezapočítává se do ní toto období, kdy nelze ohlásit přestup.
	
		- Jedná-li se o hráče věkové kategorie U11 – U21, náleží mateřskému oddílu odstupné podle tabulky výchovného vydané VV ČAST k 1.3. každého roku, kterou mohou každoročně do 31.3. upravovat všechny řídící svazy pro svoje potřeby. V případě nevydání nové tabulky VV ČAST, platí tabulka vydaná v minulém období. Tabulka výchovného krajských svazů může činit nejvýše 30% částek, tabulka výchovného regionálních svazů může činit nejvýše 15% částek, z výchovného, určeného ČAST. Tabulka je sestavena podle umístění hráčů na základním žebříčku a podle věkových kategorií. Je-li hráč zařazen na více žebříčcích, platí ta částka, která je pro mateřský oddíl nejvýhodnější.
	
		*Poznámka*:  
		Žebříčková hodnota hráče a tabulka výchovného se vztahuje k termínu zamítnutého přestupu z důvodu chybějícího souhlasu.
		Hráč nebo ostatní člen smí podat přestup nejdříve 12 měsíců po udělení registrace, a to pouze jedenkrát za 12 měsíců. V období od 1.7. do 31.8. může hráč hlásit přestup i v kratší době než po uplynutí 12-ti měsíců, pokud 12-ti měsíční lhůta spadá do tohoto období.  
		Ohlásí-li přestup v době kratší jak 12 měsíců od vydání schválení jeho posledního přestupu, (mimo období 1.7.- 31.8.), je přestup neplatný a nebude projednáván. V opakovaných případech může být takové jednání předáno Disciplinární komisi.
		
		*Poznámka*:
		Při přestupu ostatního člena je možné jeho status změnit na aktivní registraci (hráče), a to nejdříve za 12 měsíců od schváleného přestupu.


- 330.05 
	- Dojde-li v průběhu soutěže **ke změnám v kádru družstva** (např. přestup do jiného oddílu, odchod do zahraničí, **zrušení registrace**, úmrtí) je povinností oddílu provést změnu soupisky – neprodleně po vzniklé situaci. Má-li změna vliv na složení i dalších družstev oddílu, je potřeba **neprodleně změnit soupisky všech těchto družstev.** Při změně soupisek nutno dodržet čl. 330.15 a 330.17. Nedodržení tohoto ustanovení přivodí sportovně technické důsledky a potrestání pokutou podle tohoto řádu. Pokud nastane situace, kdy ke změně dojde bezprostředně před utkáním a oddíl již nestačí změny provést, zajistí jejich realizování až pro následující utkání (příp. dvouutkání). **Po nastalé změně (pokud došlo k odchodu hráče základu družstva), nesmí již první hráči na soupiskách nižších družstev nastoupit za tato družstva, i když změna soupisek nebyla provedena (např. při odchodu hráče ze základu A družstva nemůže již první hráč na soupisce B družstva za toto družstvo nastoupit - obdobně u dalších nižších družstev)**.

### Město **Krupka** & **Pinčesárna**

- **Důkazy** + návrhy skutečností k ověření u konkrétních osob:

	- zeptejte se  bývalého starosty -> s kým byl nájemní vztah 
	- zeptejte se  současného starosty -> s kým byl nájemní vztah 
	- zeptejte se Rostislava Kadlece -> s kým byl nájemní vztah a s kým jednal v roce 2023
	- zeptejte se Karlu Roučkovi (expředseda TJ Krupka z.s.) -> s kým byl nájemní vztah 
	- zavolejte na Městskou policii -> kdo posledních 10 let jednal za Pinčesárnu ve věci spuštění Alarmu apod.
	- zeptejte se Marka Vaniše a Jaromíra Pivoňky -> s kým byl nájemní vztah 
		- výpovědi Vaniše a spol. (viz. nahlédnutí do spisu)
			- nájemní vztah má TJ Krupka z.s. a oni jsou jeho členové
	- zeptejte se kohokoliv z hráčů stolního tenisu -> kde hráli posledních 10 let zápasy, kde trénují a co měli po celou dobu napsáno na dresech

Pokud někdo umožní nebo neznemožní vstup do budovy komukoliv jinému než jsem já, řeknu umělý inteligenci, aby vygenerovala všechny stížnosti na všechny orgány a ikdyž mi to bude líto, tak ho nechám ukřižovat.

1. *Veřejně známá a nepopřitelná fakta o Pinčesárně:*
- místo konání tréninků mládeže TJ Krupka minimálně 10 let
- místo konání tréninků dospělých hrajících soutěže za oddíl TJ Krupka
- sportoviště zapsané v provozovnách spolku
- sportoviště evidované Českou Asociací stolního tenisu jako prostory TJ Krupka

2. *Smluvní vztah:*
- neposkytnutí kopie smlouvy na základě žádosti předsedy spolku
- zaslání návrhu nové smlouvy na pinčesárnu předsedovi TJ Krupka
- popření nájemního vztahu starostou města Krupka


> [!important]- **Porušení Nového Občanského Zákona** -> PINČESÁRNA
> 
> - [§ 2205](https://www.kurzy.cz/zakony/89-2012-obcansky-zakonik/paragraf-2205/) Nájemní smlouva pronajímatele zavazuje:
> 
> 	- a) přenechat věc nájemci tak, aby ji mohl užívat k ujednanému nebo obvyklému účelu,
> 	- b) udržovat věc v takovém stavu, aby mohla sloužit tomu užívání, pro které byla pronajata,*
> 	- c) zajistit nájemci nerušené užívání věci po dobu nájmu.
> 
> ---
> 
> - [§ 2209](https://www.kurzy.cz/zakony/89-2012-obcansky-zakonik/paragraf-2209/)
> 	- *Během nájmu pronajímatel nemá právo o své vůli pronajatou věc měnit.*
> 
> ---
> 
> - [§ 2232](https://www.kurzy.cz/zakony/89-2012-obcansky-zakonik/paragraf-2232/)
> 	- Porušuje-li strana zvlášť závažným způsobem své povinnosti, a tím působí značnou újmu druhé straně, má dotčená strana právo vypovědět nájem bez výpovědní doby.
> 
> ---
> 
> - [§ 2227](https://www.kurzy.cz/zakony/89-2012-obcansky-zakonik/paragraf-2227/)
> 	-Stane-li se věc nepoužitelnou k ujednanému účelu, nebo není-li ujednán, k účelu obvyklému, a to z důvodů, které nejsou na straně nájemce, má nájemce právo nájem vypovědět bez výpovědní doby.
> 
> ---
> 
> - [§ 2237](https://www.kurzy.cz/zakony/89-2012-obcansky-zakonik/paragraf-2237/)
> 	- *Smlouva vyžaduje písemnou formu; pronajímatel však nemá právo namítnout vůči nájemci neplatnost smlouvy pro nedostatek formy.*
> 
> - [§ 2238](https://www.kurzy.cz/zakony/89-2012-obcansky-zakonik/paragraf-2238/)
> 	- *Užívá-li nájemce byt po dobu tří let v dobré víře, že nájem je po právu, považuje se nájemní smlouva za řádně uzavřenou.*
> 
> 

#### **PROVOZ** PINČESÁRNA
- 134.400 Kč ročně na zálohách za teplo | *11.200 Kč měsíčně*
- 36.000 Kč ročně na zálohách za elektřinu | *3.000 Kč měsíčně*
- 4.200 Kč ročně na zálohách za elektřinu | *350 Kč měsíčně*

	= **174.600 Kč** Ročně  |    **14.550 Kč** Měsíčně

------
#### **PŘÍJMY** ZA STOLNÍ TENIS
17x 200 Kč = *3.400 Kč*  ... ==ROČNÍ ZISK jednoty z dětí==

- 17x 6.000 Kč = **102.000 Kč**
za *předpokladu*, že *zaplatí všechny děti*

| Dospělí                       | Děti                         | Děti - výběr | Dospělí - výběr |     |
| ----------------------------- | ---------------------------- | ------------ | --------------- | --- |
| náklady za rok cca 120.414 Kč | náklady za rok cca 54.816 Kč | 102.000 Kč   | 0 Kč            |     |

**Seznam všeho potřebného** k zachování mládeže v Krupce:
- prostory - zázemí
- světlo + teplo + voda
- Stabilní placení příspěvků 

---

#claude_tjkrupka
