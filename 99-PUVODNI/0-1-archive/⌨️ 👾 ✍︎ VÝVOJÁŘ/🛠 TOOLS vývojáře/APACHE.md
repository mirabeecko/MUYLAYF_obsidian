---
tags:
  - tools_vyvojare
---


# Apache HTTP Server


Apache HTTP server je **program spuštěný na serveru zapojeném do internetové sítě, který dodává prohlížečům jednotlivé webové stránky**. Tento nejpoužívanější webový server patří mezi open source software, díky čemuž je všem dostupný zdarma.

**Apache HTTP Server** je [softwarový](https://cs.wikipedia.org/wiki/Software "Software") [webový server](https://cs.wikipedia.org/wiki/Webov%C3%BD_server "Webový server") s [otevřeným kódem](https://cs.wikipedia.org/wiki/Otev%C5%99en%C3%BD_software "Otevřený software") pro [GNU/Linux](https://cs.wikipedia.org/wiki/Linux "Linux"), [BSD](https://cs.wikipedia.org/wiki/BSD "BSD"), [Solaris](https://cs.wikipedia.org/wiki/Solaris_(opera%C4%8Dn%C3%AD_syst%C3%A9m) "Solaris (operační systém)"), [macOS](https://cs.wikipedia.org/wiki/MacOS "MacOS"), [Microsoft Windows](https://cs.wikipedia.org/wiki/Microsoft_Windows "Microsoft Windows") a další platformy. V současné době dodává prohlížečům na celém světě asi čtvrtinu internetových stránek.[[1]](https://cs.wikipedia.org/wiki/Apache_HTTP_Server#cite_note-netcraft-1)

## Historie

Vývoj Apache začal v roce [1993](https://cs.wikipedia.org/wiki/1993 "1993") v [NCSA](https://cs.wikipedia.org/w/index.php?title=NCSA&action=edit&redlink=1 "NCSA (stránka neexistuje)") (National Center for Supercomputing Aplications) na [Illinoiské](https://cs.wikipedia.org/wiki/Illinois "Illinois") univerzitě. Původní jméno projektu bylo _[NCSA HTTPd](https://cs.wikipedia.org/w/index.php?title=NCSA_HTTPd&action=edit&redlink=1 "NCSA HTTPd (stránka neexistuje)")_. V dalším roce však vývojářský tým opustil hlavní [programátor](https://cs.wikipedia.org/wiki/Program%C3%A1tor "Programátor") [Rob McCool](https://cs.wikipedia.org/w/index.php?title=Rob_McCool&action=edit&redlink=1 "Rob McCool (stránka neexistuje)"), tím došlo ke zpomalení vývoje a poté, v roce [1998](https://cs.wikipedia.org/wiki/1998 "1998"), k úplnému zastavení.

NCSA HTTPd však mezitím už používali správci webových serverů a dodávali k němu vlastní úpravy – _[patche](https://cs.wikipedia.org/wiki/Patch "Patch")_ (patch = záplata). Hlavní úlohu v dalším vývoji sehráli [Brian Behlendorf](https://cs.wikipedia.org/w/index.php?title=Brian_Behlendorf&action=edit&redlink=1 "Brian Behlendorf (stránka neexistuje)") a [Cliff Skolnick](https://cs.wikipedia.org/w/index.php?title=Cliff_Skolnick&action=edit&redlink=1 "Cliff Skolnick (stránka neexistuje)"), kteří založili [e-mailovou](https://cs.wikipedia.org/wiki/E-mail "E-mail") konferenci a začali sběr úprav a jejich distribuci [koordinovat](https://cs.wikipedia.org/w/index.php?title=Koordinace&action=edit&redlink=1 "Koordinace (stránka neexistuje)"). První veřejná verze s označením 0.6.2 byla vydána v dubnu [1995](https://cs.wikipedia.org/wiki/1995 "1995"). Následovalo kompletní přepsání kódu (Apache2 už neobsahuje nic z původního NCSA HTTPd) a založení _[Apache Group](https://cs.wikipedia.org/w/index.php?title=Apache_Group&action=edit&redlink=1 "Apache Group (stránka neexistuje)")_, která je dnes základem vývojářského týmu.

Od dubna [1996](https://cs.wikipedia.org/wiki/1996 "1996") byl Apache [nejpopulárnější](https://cs.wikipedia.org/wiki/Popularita "Popularita") server na [internetu](https://cs.wikipedia.org/wiki/Internet "Internet"). V květnu [1999](https://cs.wikipedia.org/wiki/1999 "1999") běžel na 57 % všech serverů a v listopadu [2005](https://cs.wikipedia.org/wiki/2005 "2005") jeho používanost dosáhla 69 %.[[2]](https://cs.wikipedia.org/wiki/Apache_HTTP_Server#cite_note-2) Tržní podíl serveru Apache v ČR je 64,32%[[3]](https://cs.wikipedia.org/wiki/Apache_HTTP_Server#cite_note-3).

Název vznikl z úcty a obdivu k domorodému kmenu [indiánů](https://cs.wikipedia.org/wiki/Indi%C3%A1ni "Indiáni") – [Apačů](https://cs.wikipedia.org/wiki/Apa%C4%8Dov%C3%A9 "Apačové") anebo [anglického](https://cs.wikipedia.org/wiki/Angli%C4%8Dtina "Angličtina") slovního spojení „A patchy server“ (patchovaný server, kdysi byl Apache pouze sada patchů pro jiný web server). Jako [indiánský](https://cs.wikipedia.org/wiki/Indi%C3%A1ni "Indiáni") [symbol](https://cs.wikipedia.org/wiki/Symbol "Symbol") je ve znaku ptačí pero.

## Funkce

Apache podporuje velké množství funkcí, mnoho z nich je implementováno jako kompilované moduly rozšiřující [jádro](https://cs.wikipedia.org/wiki/J%C3%A1dro_(informatika) "Jádro (informatika)"). Mohou to být funkce podpory [programovacích jazyků](https://cs.wikipedia.org/wiki/Programovac%C3%AD_jazyk "Programovací jazyk") na straně serveru nebo různá [autentizační](https://cs.wikipedia.org/wiki/Autentizace "Autentizace") schémata. Příkladem podporovaných programovacích jazyků je [Perl](https://cs.wikipedia.org/wiki/Perl "Perl"), [Python](https://cs.wikipedia.org/wiki/Python "Python"), [Tcl](https://cs.wikipedia.org/wiki/Tcl "Tcl") nebo [PHP](https://cs.wikipedia.org/wiki/PHP "PHP"). Autentizační schémata jako například mod_access, mod_auth, mod_digest, a mod_auth_digest. Příkladem dalších funkcí je podpora [SSL](https://cs.wikipedia.org/wiki/Secure_Sockets_Layer "Secure Sockets Layer"), [TLS](https://cs.wikipedia.org/wiki/Transport_Layer_Security "Transport Layer Security") (mod_ssl), [proxy](https://cs.wikipedia.org/wiki/Proxy_server "Proxy server") modul (mod_proxy), [URL](https://cs.wikipedia.org/wiki/Uniform_Resource_Locator "Uniform Resource Locator") rewriter známý jako rewrite engine z modulu mod_rewrite, konfigurace souborů [logu](https://cs.wikipedia.org/wiki/Log "Log") (mod_log_config) a filtrace (mod_include a mod_ext_filter).

Apache dále obsahuje externí modul pro [kompresi](https://cs.wikipedia.org/wiki/Komprese_dat "Komprese dat") dat webových stránek posílaných protokolem [HTTP](https://cs.wikipedia.org/wiki/Hypertext_Transfer_Protocol "Hypertext Transfer Protocol") (mod_gzip), open source modul pro ochranu a prevenci webových aplikací před napadením (mod_security). Logy z Apache mohou být analyzovány pomocí [browseru](https://cs.wikipedia.org/wiki/Browser "Browser") a skriptů jako AWStats/W3Perl nebo Visitors. Nastavit se dají i formy chybových zpráv, DBMS autentizační databáze a nechybí ani podpora mnoha grafických prostředí ([GUI](https://cs.wikipedia.org/wiki/Grafick%C3%A9_u%C5%BEivatelsk%C3%A9_rozhran%C3%AD "Grafické uživatelské rozhraní")).

Virtuální hosting je funkce dovolující jedné instalaci Apache na jednom fyzickém počítači obsluhovat více webových stránek.

## Výkon

Přestože hlavním cílem Apache není být „nejrychlejším“ webovým serverem, jeho výkon se může srovnávat s ostatními výkonnými webovými servery. Místo implementování jedné architektury, Apache poskytuje mnoho tzv. MultiProcessing modulů (MPM) což mu dovoluje přizpůsobit se potřebám systému na kterém běží. Z toho vyplývá, že výkon je hodně závislý na zvolených MPM a konkrétním nastavení. Tam, kde je nutné udělat kompromis ve výkonu, Apache je navrženo tak, aby [latence](https://cs.wikipedia.org/wiki/Latence "Latence") byla co nejnižší a propustnost co nejvyšší, vzhledem k obsluze více požadavků, tedy zajistit konzistentní a spolehlivé obsloužení požadavků v co nejkratším časovém rámci.

Za nejvýkonnější verzi, podle Apache Foundation, je považována vícevláknová verze kombinující více [procesů](https://cs.wikipedia.org/wiki/Proces_(informatika) "Proces (informatika)") a více [vláken](https://cs.wikipedia.org/wiki/Vl%C3%A1kno_(program) "Vlákno (program)") na proces. Tato verze je výkonnější než předešlá víceprocesová verze, protože vlákna mají menší režii než procesy, ale stále nedosahuje výkonu architektury založené na [eventech](https://cs.wikipedia.org/wiki/Event-driven_Process_Chain "Event-driven Process Chain"), na které jsou založeny některé konkurenční servery.

## Licence]

S vydáním Apache 2.0 Apache Foundation přijala novou licenci [Apache License](https://cs.wikipedia.org/wiki/Apache_License "Apache License"). Někteří uživatelé tuto změnu neakceptovali a na verzi 2.0 nepřešli.

## Související články

- [Apache Software Foundation](https://cs.wikipedia.org/wiki/Apache_Software_Foundation "Apache Software Foundation")
- [Webový server](https://cs.wikipedia.org/wiki/Webov%C3%BD_server "Webový server")
- [Seznam webových serverů](https://cs.wikipedia.org/wiki/Seznam_webov%C3%BDch_server%C5%AF "Seznam webových serverů")
- [LAMP](https://cs.wikipedia.org/wiki/LAMP "LAMP")

#claude_reference
