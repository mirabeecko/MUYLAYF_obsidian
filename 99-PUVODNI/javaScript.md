---
type: Programovací jazyk
created_date: 21-02-2024
tags:
  - scripting
source: 
project:
  - VÝVOJÁŘ
up:
  - "[[📚 VÝVOJÁŘ MOC]]"
---


- **JavaScript** WIKI
	- je multiplatformní, [objektově orientovaný](https://www.wikiwand.com/cs/Objektov%C4%9B_orientovan%C3%A9_programov%C3%A1n%C3%AD "Objektově orientované programování"), [událostmi řízený](https://www.wikiwand.com/cs/Ud%C3%A1lostmi_%C5%99%C3%ADzen%C3%A1_architektura "Událostmi řízená architektura") [skriptovací jazyk](https://www.wikiwand.com/cs/Skriptovac%C3%AD_jazyk "Skriptovací jazyk"), jehož autorem je [Brendan Eich](https://www.wikiwand.com/cs/Brendan_Eich "Brendan Eich") z někdejší společnosti [Netscape](https://www.wikiwand.com/cs/Netscape_Communications_Corporation "Netscape Communications Corporation"). Jeho [syntaxe](https://www.wikiwand.com/cs/Syntaxe_(programovac%C3%AD_jazyk) "Syntaxe (programovací jazyk)") (zápis [zdrojového textu](https://www.wikiwand.com/cs/Zdrojov%C3%BD_k%C3%B3d "Zdrojový kód")) patří do rodiny jazyků [C](https://www.wikiwand.com/cs/C_(programovac%C3%AD_jazyk) "C (programovací jazyk)")/[C++](https://www.wikiwand.com/cs/C++ "C++")/[Java](https://www.wikiwand.com/cs/Java_(programovac%C3%AD_jazyk) "Java (programovací jazyk)"), ale JavaScript je od těchto jazyků zásadně odlišný [sémanticky](https://www.wikiwand.com/cs/S%C3%A9mantika_programovac%C3%ADch_jazyk%C5%AF "Sémantika programovacích jazyků") (funkčně, principiálně), jde o jiný jazyk. Slovo Java je součástí jeho názvu pouze z marketingových důvodů. JavaScript byl v červenci [1997](https://www.wikiwand.com/cs/1997 "1997") standardizován asociací [ECMA](https://www.wikiwand.com/cs/Ecma_International "Ecma International") (European Computer Manufacturers Association) a v srpnu [1998](https://www.wikiwand.com/cs/1998 "1998") [ISO](https://www.wikiwand.com/cs/Mezin%C3%A1rodn%C3%AD_organizace_pro_normalizaci "Mezinárodní organizace pro normalizaci") (International Organization for Standardization). Standardizovaná verze JavaScriptu je pojmenována [ECMAScript](https://www.wikiwand.com/cs/ECMAScript "ECMAScript") a z ní byly odvozeny i další implementace, jako je například [ActionScript](https://www.wikiwand.com/cs/ActionScript "ActionScript"). JavaScript byl původně obchodní název implementace společnosti Netscape, kde byl vyvíjen nejprve pod názvem Mocha, později LiveScript, ohlášen byl společně se společností [Sun Microsystems](https://www.wikiwand.com/cs/Sun_Microsystems "Sun Microsystems") v prosinci [1995](https://www.wikiwand.com/cs/1995 "1995") jako doplněk k jazykům [HTML](https://www.wikiwand.com/cs/HyperText_Markup_Language "HyperText Markup Language") a [Java](https://www.wikiwand.com/cs/Java_(programovac%C3%AD_jazyk) "Java (programovací jazyk)"). Pro verzi firmy [Microsoft](https://www.wikiwand.com/cs/Microsoft "Microsoft") je použit název JScript. Ten je podporován platformou [.NET](https://www.wikiwand.com/cs/.NET ".NET").
---
- **NEJČASTĚJŠÍ POUŽITÍ:**
	
	- [Webové](https://www.wikiwand.com/cs/World_Wide_Web "World Wide Web") stránky, do kterých je často vkládaný přímo jako součást [HTML](https://www.wikiwand.com/cs/HyperText_Markup_Language "HyperText Markup Language") kódu stránky. [Interpretaci](https://www.wikiwand.com/cs/Interpret_(software) "Interpret (software)") v tomto případě provádí [webový prohlížeč](https://www.wikiwand.com/cs/Webov%C3%BD_prohl%C3%AD%C5%BEe%C4%8D "Webový prohlížeč") návštěvníka stránky. Jsou jím obvykle ovládány různé interaktivní prvky [GUI](https://www.wikiwand.com/cs/Grafick%C3%A9_u%C5%BEivatelsk%C3%A9_rozhran%C3%AD "Grafické uživatelské rozhraní") (tlačítka, textová políčka) nebo tvořeny animace a efekty obrázků. Prakticky to znamená, že se program v JavaScriptu obvykle spouští až po stažení webové stránky z [Internetu](https://www.wikiwand.com/cs/Internet "Internet") (tzv. na straně klienta), na rozdíl od ostatních jiných interpretovaných programovacích jazyků (např. [PHP](https://www.wikiwand.com/cs/PHP "PHP") a [ASP](https://www.wikiwand.com/cs/Active_Server_Pages "Active Server Pages")), které se spouštějí na straně [serveru](https://www.wikiwand.com/cs/Server "Server") ještě před stažením z Internetu. Z toho plynou jistá bezpečností omezení – v prohlížeči spouštěný JavaScript např. nemůže pracovat se soubory, aby tím neohrozil soukromí uživatele.
	- JavaScript se využívá i na straně [serveru](https://www.wikiwand.com/cs/Server "Server"). První implementací JavaScriptu na straně serveru byl LiveWire firmy Netscape vydaný roku [1996](https://www.wikiwand.com/cs/1996 "1996"). Dnes existuje několik možností včetně [opensource](https://www.wikiwand.com/cs/Opensource "Opensource") implementace [Rhinola](https://www.wikiwand.com/cs/Rhinola "Rhinola") založené na [Rhino](https://www.wikiwand.com/cs/Rhino_(javascriptov%C3%BD_engine) "Rhino (javascriptový engine)"), gcj, [Node.js](https://www.wikiwand.com/cs/Node.js "Node.js"), Deno a [Apache](https://www.wikiwand.com/cs/Apache_HTTP_Server "Apache HTTP Server"). Událostmi řízená architektura je dělá vhodnými pro tvorbu serverových aplikací, které pracují v reálném čase.
	- Také je možno jej spouštět v [operačních systémech](https://www.wikiwand.com/cs/Opera%C4%8Dn%C3%AD_syst%C3%A9m "Operační systém") [Windows](https://www.wikiwand.com/cs/Microsoft_Windows "Microsoft Windows") pomocí programu Windows Script Host a nahradit tak [dávkové soubory](https://www.wikiwand.com/cs/D%C3%A1vkov%C3%BD_soubor "Dávkový soubor") [MS-DOS](https://www.wikiwand.com/cs/MS-DOS "MS-DOS"). Manipulaci se soubory lze například provádět za pomoci objektu FileSystemObject, který se používá i na výše zmíněných serverech.
	- Kromě [DHTML](https://www.wikiwand.com/cs/DHTML "DHTML") se JavaScript používá k psaní rozšíření pro mnohé aplikace, například [Adobe Acrobat](https://www.wikiwand.com/cs/Adobe_Acrobat "Adobe Acrobat").

---
- [[json Formát]]
---

> [!tip] schéma
> 
> ![[Pasted image 20240214143138.png]]
> 

> [!attention]+ TOOLS VÝVOJÁŘE 
> ```dataview
> list
> from #tools_vyvojare 
> 
> ```

#claude_reference
