---
tags:
  - scripting
project: VÝVOJÁŘ
type: TUTORIAL
---
# Lekce 1 - Skriptování v Bashi - Úvod do skriptování

- ![CZ](images/img/languages/cs.svg)
    - [![SK](images/img/languages/sk.svg)](https://www.itnetwork.sk/linux/bash/skriptovanie-v-bashi-uvod-do-skriptovania)

[Linux a UNIX](linux) [Bash](linux/bash) Skriptování v Bashi - Úvod do skriptování

[![](images/651ac8077eeeb.jpg)](https://www.itnetwork.cz/api/Abc-Def/def/105)

[

Naučíme tě pracovat na home-office.

Více info »



](https://www.itnetwork.cz/api/Abc-Def/def/109)

[Další](linux/bash/skriptovani-v-bashi-promenne "Skriptování v Bashi - Proměnné")

V tomto tutoriálu se začneme učit programovat ve skriptovacím jazyku Bash. Vysvětlíme si, co to Bash znamená, jaký je rozdíl mezi **kompilovaným** a **interpretovaným** jazykem a jak **automatizovat procesy** v Linuxu. Všechny lekce budou vysvětleny na distribuci Debian. V dnešní době jde o jednu z nejpoužívanějších na serverech. U jiných distribucí se může stát, že některé příkazy nebo umístění konfiguračních souborů mohou být odlišné.

![Linux - Skriptování v Bashi](images/84316/penguin.png)

#### Minimální požadavky[](https://www.itnetwork.cz/linux/bash/skriptovani-v-bashi-uvod-do-skriptovani#_minimalni-pozadavky)

Pro úspěšné zvládnutí tohoto kurzu je nutné znát alespoň základy Linuxu. Ideálně v rozsahu tohoto [kurzu](linux/zaklady/). Vhodná je také orientace v některém z programovacích jazyků, byť opět na základní úrovni. Například [jazyka C](cecko/zaklady/).

## Skriptovací vs kompilovaný jazyk[](https://www.itnetwork.cz/linux/bash/skriptovani-v-bashi-uvod-do-skriptovani#_skriptovaci-vs-kompilovany-jazyk)

Existují dva základní druhy jazyků, kompilovaný a skriptovací nebo také interpretovaný. Hlavní rozdíl je v tom, že program v kompilovaném jazyce se musí pomocí speciálního překladače, tzv. **kompilátoru**, přeložit do strojového kódu. Ten se následně uloží do binárního souboru (slangově binárky). **Binární** (strojový) **kód** může být následně předán procesoru ke zpracování. Kompilátor překládá najednou celý program. Skriptovací (interpretovaný) jazyk se chová odlišně. Pomocí **interpretu** vyhodnocuje řádek po řádku a předává je procesoru ke zpracování postupně.

Uvedeme si to na příkladu. Řekněme, že máme v plánu jet na výlet. U kompilovaných jazyků se nejprve podíváme do mapy, zjistíme stav dopravy, nastavíme GPS a následně s jistotou pojedeme naplánovanou trasou až do místa určení. U skriptovacího jazyka vyrazíme na cestu a s každým krokem plánujeme ten další. Může se stát, že v půlce cesty narazíme na slepou ulici. V takovém případě program havaruje.

Výhodou kompilovaného jazyka oproti skriptovacímu je jednoznačně větší **rychlost**. Skriptovací jazyky jsou obecně vysokoúrovňové s velkou dávkou abstrakce. Lépe a rychleji se v nich proto vyvíjí. Na rozdíl od kompilovaných jazyků jsou ty skriptovací často **multiplatformní**.

Představitelé kompilovaných jazyků jsou např. C, C++, C# nebo Java. Za skriptovací jazyky se považují např. Python, PHP, JavaScript nebo právě Bash.

## Co je to Bash[](https://www.itnetwork.cz/linux/bash/skriptovani-v-bashi-uvod-do-skriptovani#_co-je-to-bash)

Bourne Again Shell, zkráceně Bash, je interpretovaný jazyk využívaný ke skriptování v Linuxovém nebo UNIXovém shellu. V současné době se jedná o nejpoužívanější skriptovací jazyk ve světě Linuxu. Bash využijeme všude tam, kde se často opakují procesy, např. při zálohování. Bash skripty uplatníme i tam, kde potřebujeme automatizovat nějaký složitější proces. Např. spravujeme-li firemní doménový server, může být přidání nového zaměstnance do systému zbytečně zdlouhavé. Bash script za nás může účet zaměstnance vytvořit, nastavit potřebná přístupová práva, VPN apod. Ušetříme tím čas na jinou práci.

## Seznam dostupných Shellů[](https://www.itnetwork.cz/linux/bash/skriptovani-v-bashi-uvod-do-skriptovani#_seznam-dostupnych-shellu)

Jak bylo již bylo řečeno, Bash je v dnešní době jeden z nejpoužívanějších jazyků. Najdeme ho proto ve většině distribucí. Pokud bychom se chtěli přesvědčit, že je opravdu v našem systému k dispozici, stačí si vypsat obsah souboru `/etc/shells`:

`cat /etc/shells`

V konzoli vidíme výstup:

![[Snímek obrazovky 2024-02-13 v 13.47.41.png]]

Zároveň si zkontrolujeme, zda je Bash nastavený jako výchozí shell. Výchozí shell je uveden v systémové proměnné `SHELL`. Vypíšeme si proto do konzole systémové proměnné. Můžeme si výpis zpřehlednit pomocí filtru `grep`:

`printenv | grep ^shell -i`

Výstupem je:

![[Snímek obrazovky 2024-02-13 v 13.49.11.png]]

Pokud by jako výchozí shell nebyl nastavený Bash, změníme to pomocí příkazu `export`:

`export SHELL=/bin/bash`

> [!attention]+ INFO
> Znak `^` u příkazu grep nám nastaví filtr pouze na řádky, které začínají následujícím řetězcem, v našem případě SHELL. Přepínač `-i` (`--ignore-case`) říká shellu, že má ignorovat velká a malá písmena.

## První skript v Bashi[](https://www.itnetwork.cz/linux/bash/skriptovani-v-bashi-uvod-do-skriptovani#_prvni-skript-v-bashi)

Nyní si ukážeme, jak v Bashi vytvořit skript. Skripty se píší vždy do běžných souborů (bez speciální přípony). Není proto nutné uvádět příponu souboru, jelikož při spuštění skriptu Linuxu sami řekneme, že má použít právě Bash. Už jenom z konvence a přehlednosti je ovšem lepší ke skriptu připsat příponu `.sh` (shell). Vytvoříme tedy si nový soubor pro náš skript:

`touch script.sh`

Je vcelku jedno, v jakém editoru skript budeme editovat. Můžeme si vybrat, jestli nám bude více vyhovovat terminálový editor (vi, vim, nano) nebo grafický (gedit, VScode…). Protože na serverech často grafické prostředí chybí, je dobré se naučit s terminálovým editorem. V tomto kurzu bude použit terminálový editor `nano`:

`nano script.sh`

Následujícím scriptem si vypíšeme do konzole obsah domovského adresáře:

> [!attention]+ Následujícím scriptem si vypíšeme do konzole obsah domovského adresáře:
> 
> #!/bin/bash
> echo "Toto je výpis obsahu domovského adresáře"  
> ls -l /home/vf

Prvním řádkem říkáme Linuxu, že jako jazyk používáme Bash. Vždy začíná znaky `#!`, což je tzv. **shebang**. Za ním následuje cesta k našemu skriptovacímu jazyku. Tu jsme si zjistili v souboru `/etc/shells`. Pokud bychom používali místo Bash např. Perl, první řádek bude začínat `#!/bin/Perl`. Příkazem `echo` (ozvěna) vypisujeme výstup do konzole.

Skript uložíme a můžeme ho spustit. Jako příkaz pro spuštění skriptu použijeme `bash`:

`bash script.sh`

Výstupem je:

```
Toto je výpis obsahu domovského adresáře
drwxr-xr-x  2 vf vf 4096 srp 12 10:12 Desktop
drwxr-xr-x  2 vf vf 4096 říj 13 07:39 Documents
drwxrwxr-x+ 2 vf vf 4096 zář 20 13:12 Downloads
drwxr-xr-x  2 vf vf 4096 srp 12 10:12 Music
drwxr-xr-x  3 vf vf 4096 srp 15 15:40 Pictures
drwxr-xr-x  2 vf vf 4096 srp 12 10:12 Public
drwx------  5 vf vf 4096 srp 28 18:53 snap
drwxr-xr-x  2 vf vf 4096 srp 12 10:12 Templates
drwxr-xr-x  2 vf vf 4096 srp 12 10:12 Videos
```

![[Snímek obrazovky 2024-02-13 v 13.51.04.png]]

Script můžeme spustit i bez příkazu `bash`. Je k tomu ale zapotřebí oprávnění pro spouštění, které nastavíme příkazem `chmod`:

`sudo chmod +x script.sh`

Script poté spustíme zadáním absolutní či relativní cesty ke skriptu. Pokud se nacházíme ve stejném adresáři, relativní cesta bude vypadat takto:

`./script.sh`

### Komentáře v Bashi[](https://www.itnetwork.cz/linux/bash/skriptovani-v-bashi-uvod-do-skriptovani#_komentare-v-bashi)

Komentář je část kódu, kterou interpret při provádění příkazů přeskočí, jakoby ve skriptu vůbec nebyla. Můžeme ho využít jako poznámku pro lepší zorientování v kódu nebo k dočasnému vyřazení části kódu. Komentáře začínají znakem `#`. Na české klávesnici jej napíšeme pomocí klávesové zkratky pravý Alt + X:

```
#!/bin/bash

# Toto je komentář a v programu se nijak funkčně neprojeví

#echo "Hello World"

echo "Ahoj Světe" # komentáře lze psát i za funkční příkaz
```

Když si zkusíme spustit tento skript, vypíše se nám do konzole pouze řádek:

`Ahoj Světe`:

Konzolová aplikace
Ahoj Světe

Tímto jsme se seznámili s úplným základem skriptování v Bashi. Znalosti využijeme v dalších lekcích při tvorbě výrazně složitějších (a zajímavějších) skriptů.

V další lekci, [Skriptování v Bashi - Proměnné](linux/bash/skriptovani-v-bashi-promenne), se podíváme na proměnné v Bashi. Řekneme si co je to proměnná a jak nám usnadní práci při skriptování.

  
Zdroj: https://www.itnetwork.cz/linux/bash/skriptovani-v-bashi-uvod-do-skriptovani

#claude_reference
