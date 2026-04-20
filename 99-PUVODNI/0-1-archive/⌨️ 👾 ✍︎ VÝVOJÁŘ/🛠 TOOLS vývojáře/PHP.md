---
tags:
  - tools_vyvojare
---
**PHP** ([rekurzivní zkratka](https://cs.wikipedia.org/wiki/Rekurzivn%C3%AD_zkratka "Rekurzivní zkratka") _PHP: **Hypertext Preprocessor**_, česky „PHP: [Hypertextový](https://cs.wikipedia.org/wiki/Hypertext "Hypertext") [preprocesor](https://cs.wikipedia.org/wiki/Preprocesor "Preprocesor")“, původně _**Personal Home Page**_) je [skriptovací](https://cs.wikipedia.org/wiki/Skriptovac%C3%AD_jazyk "Skriptovací jazyk") [programovací jazyk](https://cs.wikipedia.org/wiki/Programovac%C3%AD_jazyk "Programovací jazyk"). Je určený především pro programování dynamických [internetových stránek](https://cs.wikipedia.org/wiki/Webov%C3%A1_str%C3%A1nka "Webová stránka") a webových aplikací například ve formátu [HTML](https://cs.wikipedia.org/wiki/Hypertext_Markup_Language "Hypertext Markup Language"), [XHTML](https://cs.wikipedia.org/wiki/Extensible_Hypertext_Markup_Language "Extensible Hypertext Markup Language") či [WML](https://cs.wikipedia.org/wiki/Wireless_Markup_Language "Wireless Markup Language"). PHP lze použít i k tvorbě konzolových a desktopových aplikací. Pro desktopové použití existuje [kompilovaná](https://cs.wikipedia.org/wiki/Kompilovan%C3%BD_jazyk "Kompilovaný jazyk") forma jazyka.

Při použití PHP pro dynamické stránky jsou skripty prováděny na straně [serveru](https://cs.wikipedia.org/wiki/Server "Server") – k uživateli je přenášen až výsledek jejich činnosti. Interpret PHP skriptu je možné volat pomocí [příkazového řádku](https://cs.wikipedia.org/wiki/P%C5%99%C3%ADkazov%C3%BD_%C5%99%C3%A1dek "Příkazový řádek"), dotazovacích metod [HTTP](https://cs.wikipedia.org/wiki/Hypertext_Transfer_Protocol "Hypertext Transfer Protocol") nebo pomocí [webových služeb](https://cs.wikipedia.org/wiki/Webov%C3%A1_slu%C5%BEba "Webová služba"). [Syntaxe](https://cs.wikipedia.org/wiki/Syntax "Syntax") jazyka je inspirována několika programovacími jazyky ([Perl](https://cs.wikipedia.org/wiki/Perl "Perl"), [C](https://cs.wikipedia.org/wiki/C_(programovac%C3%AD_jazyk) "C (programovací jazyk)"), [Pascal](https://cs.wikipedia.org/wiki/Pascal_(programovac%C3%AD_jazyk) "Pascal (programovací jazyk)") a [Java](https://cs.wikipedia.org/wiki/Java_(programovac%C3%AD_jazyk) "Java (programovací jazyk)")). Jazyk PHP je nezávislý na [platformě](https://cs.wikipedia.org/wiki/Po%C4%8D%C3%ADta%C4%8Dov%C3%A1_platforma "Počítačová platforma"), rozdíly v různých [operačních systémech](https://cs.wikipedia.org/wiki/Opera%C4%8Dn%C3%AD_syst%C3%A9m "Operační systém") se omezují na několik systémově závislých funkcí a skripty lze většinou mezi operačními systémy přenášet bez jakýchkoli úprav.

PHP podporuje mnoho knihoven pro různé účely – např. zpracování textu, grafiky, práci se soubory, přístup k většině databázových systémů (mj. [MySQL](https://cs.wikipedia.org/wiki/MySQL "MySQL"), [ODBC](https://cs.wikipedia.org/wiki/Open_Database_Connectivity "Open Database Connectivity"), [Oracle](https://cs.wikipedia.org/wiki/Oracle_Database "Oracle Database"), [PostgreSQL](https://cs.wikipedia.org/wiki/PostgreSQL "PostgreSQL"), [MSSQL](https://cs.wikipedia.org/wiki/Microsoft_SQL_Server "Microsoft SQL Server"), [SQLite](https://cs.wikipedia.org/wiki/SQLite "SQLite")), podporu celé řady internetových protokolů ([HTTP](https://cs.wikipedia.org/wiki/Hypertext_Transfer_Protocol "Hypertext Transfer Protocol"), [SMTP](https://cs.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol "Simple Mail Transfer Protocol"), [SNMP](https://cs.wikipedia.org/wiki/Simple_Network_Management_Protocol "Simple Network Management Protocol"), [FTP](https://cs.wikipedia.org/wiki/File_Transfer_Protocol "File Transfer Protocol"), [IMAP](https://cs.wikipedia.org/wiki/Internet_Message_Access_Protocol "Internet Message Access Protocol"), [POP3](https://cs.wikipedia.org/wiki/Post_Office_Protocol "Post Office Protocol"), [LDAP](https://cs.wikipedia.org/wiki/LDAP "LDAP"), …).

PHP je nejrozšířenějším skriptovacím jazykem pro web, k červnu 2019 měl podíl přes 79 %.[[7]](https://cs.wikipedia.org/wiki/PHP#cite_note-7) Oblíbeným se stal především díky jednoduchosti použití a bohaté zásobě funkcí. V kombinaci s operačním systémem Linux, databázovým systémem (obvykle [MySQL](https://cs.wikipedia.org/wiki/MySQL "MySQL")/[MariaDB](https://cs.wikipedia.org/wiki/MariaDB "MariaDB") nebo [PostgreSQL](https://cs.wikipedia.org/wiki/PostgreSQL "PostgreSQL")) a webovým serverem [Apache](https://cs.wikipedia.org/wiki/Apache_HTTP_Server "Apache HTTP Server") je často využíván k tvorbě [webových aplikací](https://cs.wikipedia.org/wiki/Webov%C3%A1_aplikace "Webová aplikace"). Pro tuto kombinaci se vžila zkratka [LAMP](https://cs.wikipedia.org/wiki/LAMP "LAMP") – tedy spojení [Linux](https://cs.wikipedia.org/wiki/Linux "Linux"), [Apache](https://cs.wikipedia.org/wiki/Apache_HTTP_Server "Apache HTTP Server"), [MySQL](https://cs.wikipedia.org/wiki/MySQL "MySQL") a PHP, [Perl](https://cs.wikipedia.org/wiki/Perl "Perl") nebo [Python](https://cs.wikipedia.org/wiki/Python "Python").

V PHP jsou napsány i velké internetové projekty, včetně [Wikipedie](https://cs.wikipedia.org/wiki/Wikipedie "Wikipedie") nebo [Facebooku](https://cs.wikipedia.org/wiki/Facebook "Facebook") (Facebook používá PHP transformované do [C++](https://cs.wikipedia.org/wiki/C%2B%2B "C++") pomocí aplikace [HipHop for PHP](https://cs.wikipedia.org/wiki/HipHop_for_PHP "HipHop for PHP") a to především kvůli vyšší rychlosti).

## Ukázka kódu[[editovat](https://cs.wikipedia.org/w/index.php?title=PHP&veaction=edit&section=1 "Editace sekce: Ukázka kódu") | [editovat zdroj](https://cs.wikipedia.org/w/index.php?title=PHP&action=edit&section=1 "Edit section's source code: Ukázka kódu")]

Takto v PHP vypadá skript [Hello world](https://cs.wikipedia.org/wiki/Hello_world "Hello world"):

<?php echo "Ahoj, světe!"; ?>

Můžeme text ale přenášet i přes proměnnou:

<?php
  $promenna = "Ahoj, světe!";
  echo $promenna;
?>

## Některé vlastnosti jazyka PHP[[editovat](https://cs.wikipedia.org/w/index.php?title=PHP&veaction=edit&section=2 "Editace sekce: Některé vlastnosti jazyka PHP") | [editovat zdroj](https://cs.wikipedia.org/w/index.php?title=PHP&action=edit&section=2 "Edit section's source code: Některé vlastnosti jazyka PHP")]

- Jazyk PHP je dynamicky typovaný, tzn. že datový typ [proměnné](https://cs.wikipedia.org/wiki/Prom%C4%9Bnn%C3%A1 "Proměnná") je vázán na hodnotu, nikoliv na proměnnou.
- [Pole](https://cs.wikipedia.org/wiki/Pole "Pole") jsou asociativní, tedy ve skutečnosti se jedná o [hašovací tabulky](https://cs.wikipedia.org/wiki/Ha%C5%A1ovac%C3%AD_tabulka "Hašovací tabulka"), které ukládají páry klíč → hodnota. Klíčem může být pouze [celé číslo](https://cs.wikipedia.org/wiki/Integer "Integer") anebo [řetězec](https://cs.wikipedia.org/wiki/Textov%C3%BD_%C5%99et%C4%9Bzec "Textový řetězec"), jedno pole může dokonce obsahovat klíče jak celočíselné, tak řetězcové. Každé pole ještě drží pořadí párů, toto pořadí je zcela nezávislé na klíčích i hodnotách.
- Řetězce lze v PHP zapsat 2 různými způsoby, a to:
    - uzavírat do uvozovek (při vyhodnocení se provede nahrazení proměnných uvnitř)
    - uzavírat do apostrofů (nahrazuje se jen [escape sekvence](https://cs.wikipedia.org/wiki/Escapov%C3%A1n%C3%AD "Escapování") \').
- Kromě proměnných, které lze vytvářet i rušit, lze definovat konstanty. Proměnné mají své _úrovně viditelnosti_ a pravidla pro jejich perzistenci (např. proměnná vytvořená ve funkci nebo metodě je po jejím vykonání automaticky zrušena, naproti tomu, proměnná vytvořená např. v cyklu nebo vloženém souboru bude viditelná do skončení programu). Konstanty jsou viditelné ze všech úrovní a po jejich definování je nelze zrušit.
- PHP podporuje reference, pomocí kterých lze do proměnných ukládat odkazy na libovolnou jinou proměnnou, nebo i prvek jejího pole. Jako reference lze volat i parametry funkce. U každé proměnné PHP eviduje, kolik na ni směřuje referencí, a podle toho se rozhoduje, kdy může kterou proměnnou zrušit.

// Zde je v proměnné string (tečka je operátor spojování řetězců)
$retez = "Ahoj, světe" . ', mám se dobře' . " a nevadí, že střídám oddělovače";

// Zde je v proměnné číslo (int)
$cislo = 100;

// Do proměnné je možné dát pole, které obsahuje jak čísla, tak znaky či další pole
$pole = array('a', 'b', 1, 2, array('první' => 'podpole', 'vytištěno'));

// Nenahlásí chybu (jenom varování) a vytiskne 'Array'
print($pole);

// Vytiskne obsah proměnné pole
print_r($pole);

// Test porovnání
$cislo = 100;
$retez = '100';

// Toto porovnání ('==') platí díky automatické typové konverzi
if ($retez == $cislo) {
  echo 'Jsou stejné';
}

// Ale porovnání pomocí '===' neplatí, neboť nejsou stejné typy
if ($retez === $cislo) {
  echo 'Jsou stejné';
} else {
  echo 'To by nešlo';
}

### Superglobální proměnné[[editovat](https://cs.wikipedia.org/w/index.php?title=PHP&veaction=edit&section=3 "Editace sekce: Superglobální proměnné") | [editovat zdroj](https://cs.wikipedia.org/w/index.php?title=PHP&action=edit&section=3 "Edit section's source code: Superglobální proměnné")]

- PHP do verze 4.2.0 ve výchozím nastavení automaticky přejímalo veškeré proměnné poslané jakoukoliv metodou ([HTTP](https://cs.wikipedia.org/wiki/Hypertext_Transfer_Protocol "Hypertext Transfer Protocol") POST, HTTP GET, [HTTP cookie](https://cs.wikipedia.org/wiki/HTTP_cookie "HTTP cookie"), ale i ze zabudovaného mechanismu sessions) a umožňovalo s nimi dále pracovat jako s [globálními](https://cs.wikipedia.org/wiki/Glob%C3%A1ln%C3%AD_prom%C4%9Bnn%C3%A1 "Globální proměnná") – tato možnost představovala bezpečnostní riziko[[Správa o stavu herny v Husitská 191]](https://cs.wikipedia.org/wiki/PHP#cite_note-8).
- Od verze 4.2.0 lze hodnotu získat z tzv. [superglobálních proměnných](https://cs.wikipedia.org/w/index.php?title=Superglob%C3%A1ln%C3%AD_prom%C4%9Bnn%C3%A1&action=edit&redlink=1 "Superglobální proměnná (stránka neexistuje)") s garancí původu informace – tedy že data byla odeslána požadovanou metodou. Používání globálních proměnných je stále možné pomocí konfigurační direktivy `register_globals` povolit, ale z bezpečnostních důvodů je to silně nedoporučováno [[9]](https://cs.wikipedia.org/wiki/PHP#cite_note-9).

// odešlu formulář metodou POST, kde do pole s názvem jmeno vepíšu 'Tom'
echo $jmeno; // vrátí 'Tom', funguje pouze v případě povolených globálních proměnných
echo $_POST['jmeno']; // vrátí 'Tom', superglobální proměnné fungují i při vypnutých globálních proměnných
echo $_GET['jmeno']; // vypíše chybu úrovně 'notice' o neexistenci proměnné a vrátí NULL
// NULL je zvláštní hodnota libovolného typu proměnných pro stav 'nedefinováno'

## Významné projekty napsané v PHP[[editovat](https://cs.wikipedia.org/w/index.php?title=PHP&veaction=edit&section=4 "Editace sekce: Významné projekty napsané v PHP") | [editovat zdroj](https://cs.wikipedia.org/w/index.php?title=PHP&action=edit&section=4 "Edit section's source code: Významné projekty napsané v PHP")]

- [MediaWiki](https://cs.wikipedia.org/wiki/MediaWiki "MediaWiki") – software pro tvorbu webových projektů typu [wiki](https://cs.wikipedia.org/wiki/Wiki "Wiki"), např. [Wikipedie](https://cs.wikipedia.org/wiki/Wikipedie "Wikipedie") – této webové encyklopedie;
- [phpBB](https://cs.wikipedia.org/wiki/PhpBB "PhpBB") – balík pro provoz webového fóra;
- [WordPress](https://cs.wikipedia.org/wiki/WordPress "WordPress") – [publikační systém](https://cs.wikipedia.org/wiki/Syst%C3%A9m_pro_spr%C3%A1vu_obsahu "Systém pro správu obsahu") pro provoz [blogů](https://cs.wikipedia.org/wiki/Blog "Blog") a podobných aplikací;
- [Grav](https://cs.wikipedia.org/wiki/Grav "Grav") – [publikační systém](https://cs.wikipedia.org/wiki/Syst%C3%A9m_pro_spr%C3%A1vu_obsahu "Systém pro správu obsahu") pro provoz [blogů](https://cs.wikipedia.org/wiki/Blog "Blog") a podobných aplikací, který používá [prosté databázové soubory](https://cs.wikipedia.org/wiki/Prost%C3%BD_datab%C3%A1zov%C3%BD_soubor "Prostý databázový soubor");
- [Drupal](https://cs.wikipedia.org/wiki/Drupal "Drupal") – [publikační systém](https://cs.wikipedia.org/wiki/Syst%C3%A9m_pro_spr%C3%A1vu_obsahu "Systém pro správu obsahu") pro provoz komplexních webových systémů;
- [Adminer](https://cs.wikipedia.org/wiki/Adminer "Adminer") – webová aplikace pro správu databázového systému [MySQL](https://cs.wikipedia.org/wiki/MySQL "MySQL");
- [phpMyAdmin](https://cs.wikipedia.org/wiki/PhpMyAdmin "PhpMyAdmin") – oblíbená webová aplikace pro správu databázového systému [MySQL](https://cs.wikipedia.org/wiki/MySQL "MySQL");
- [Texy!](https://cs.wikipedia.org/wiki/Texy! "Texy!") – překladač intuitivní syntaxe pro formátování textu na [HTML](https://cs.wikipedia.org/wiki/Hypertext_Markup_Language "Hypertext Markup Language");
- [Nette Framework](https://cs.wikipedia.org/wiki/Nette_Framework "Nette Framework") – framework pro tvorbu webových aplikací v PHP;
- [Facebook](https://cs.wikipedia.org/wiki/Facebook "Facebook") – rozsáhlá sociální síť je implementována v PHP.

Další viz [Kategorie:Software v PHP](https://cs.wikipedia.org/wiki/Kategorie:Software_v_PHP "Kategorie:Software v PHP").

## Výhody a nevýhody PHP[[editovat](https://cs.wikipedia.org/w/index.php?title=PHP&veaction=edit&section=5 "Editace sekce: Výhody a nevýhody PHP") | [editovat zdroj](https://cs.wikipedia.org/w/index.php?title=PHP&action=edit&section=5 "Edit section's source code: Výhody a nevýhody PHP")]

### Výhody PHP[[editovat](https://cs.wikipedia.org/w/index.php?title=PHP&veaction=edit&section=6 "Editace sekce: Výhody PHP") | [editovat zdroj](https://cs.wikipedia.org/w/index.php?title=PHP&action=edit&section=6 "Edit section's source code: Výhody PHP")]

- PHP je specializované na webové stránky.
- Rozsáhlý soubor funkcí v základní knihovně PHP (přes pět a půl tisíce), další funkce v [PECL](https://cs.wikipedia.org/wiki/PECL "PECL").
- Nativní podpora mnoha databázových systémů.
- Multiplatformnost (zejména [Linux](https://cs.wikipedia.org/wiki/Linux "Linux") a [Microsoft Windows](https://cs.wikipedia.org/wiki/Microsoft_Windows "Microsoft Windows")).[[10]](https://cs.wikipedia.org/wiki/PHP#cite_note-10)
- Možnost využití nativních funkcí operačního systému (možná nekompatibilita s jiným operačním systémem).[[11]](https://cs.wikipedia.org/wiki/PHP#cite_note-11)
- Strmá křivka učení.
- Obrovská podpora na [hostingových](https://cs.wikipedia.org/wiki/Webhosting "Webhosting") službách – PHP je fakticky standardem, který je prakticky všude.[[12]](https://cs.wikipedia.org/wiki/PHP#cite_note-12)
- Obrovské množství projektů a kódů, které lze zdarma využít ([WordPress](https://cs.wikipedia.org/wiki/WordPress "WordPress"), [phpBB](https://cs.wikipedia.org/wiki/PhpBB "PhpBB") a další).
- Poměrně slušná dokumentace.[[13]](https://cs.wikipedia.org/wiki/PHP#cite_note-13)
- Velmi svobodná licence, která (v protikladu k např. [GPL](https://cs.wikipedia.org/wiki/GNU_General_Public_License "GNU General Public License")) neobsahuje [copyleft](https://cs.wikipedia.org/wiki/Copyleft "Copyleft").[[p .č. 6]](https://cs.wikipedia.org/wiki/PHP#cite_note-14)
- Ve standardní distribuci je přítomen [ladící nástroj](https://cs.wikipedia.org/wiki/Lad%C4%9Bn%C3%AD_(programov%C3%A1n%C3%AD) "Ladění (programování)") ([debugger](https://cs.wikipedia.org/wiki/Debugger "Debugger") - phpdbg).[[15]](https://cs.wikipedia.org/wiki/PHP#cite_note-15)

### Nevýhody PHP[[editovat](https://cs.wikipedia.org/w/index.php?title=PHP&veaction=edit&section=7 "Editace sekce: Nevýhody PHP") | [editovat zdroj](https://cs.wikipedia.org/w/index.php?title=PHP&action=edit&section=7 "Edit section's source code: Nevýhody PHP")]

- Nekonzistentní pojmenování funkcí, např.:
    - např. strpos(), strchr(), ale str_replace(), str_pad().
    - Nejednotné názvosloví skupin funkcí, např.: mysql_XXXX, imap_XXXX, json_XXXX (s podtržítkem) versus imageXXXX, bcXXXX, gzXXXX (bez podtržítka).
- Nejednotné pořadí parametrů, např.: array_map() vs. array_filter().
- Po zpracování požadavku neudržuje kontext aplikace, vytváří jej vždy znovu (oslabuje výkon).

## Historický vývoj PHP[[editovat](https://cs.wikipedia.org/w/index.php?title=PHP&veaction=edit&section=8 "Editace sekce: Historický vývoj PHP") | [editovat zdroj](https://cs.wikipedia.org/w/index.php?title=PHP&action=edit&section=8 "Edit section's source code: Historický vývoj PHP")]

Související informace naleznete také v článku [Historie PHP](https://cs.wikipedia.org/wiki/Historie_PHP "Historie PHP").

PHP bylo původně označení pro Personal Home Page,[[16]](https://cs.wikipedia.org/wiki/PHP#cite_note-history-16) tedy osobní domácí stránky. Vše začalo v roce 1994, kdy byla napsána binární část [Common Gateway Interface](https://cs.wikipedia.org/wiki/Common_Gateway_Interface "Common Gateway Interface") (CGI) v [programovacím jazyku](https://cs.wikipedia.org/wiki/Programovac%C3%AD_jazyk "Programovací jazyk") [C](https://cs.wikipedia.org/wiki/C_(programovac%C3%AD_jazyk) "C (programovací jazyk)"). Tuto prvotní část napsal [dánský](https://cs.wikipedia.org/wiki/D%C3%A1nsko "Dánsko")/[grónský](https://cs.wikipedia.org/wiki/Gr%C3%B3nsko "Grónsko") programátor [Rasmus Lerdorf](https://cs.wikipedia.org/wiki/Rasmus_Lerdorf "Rasmus Lerdorf"). Lerdorf zpočátku vytvořil tyto nástroje pro osobní domácí stránky (Personal Home Page) za účelem možné záměny s malou skupinou skriptů v [Perlu](https://cs.wikipedia.org/wiki/Perl "Perl"), které chtěl používat pro údržbu osobní domovské stránky. Nástroje měly zajistit běh úloh jako například zobrazení jeho životopisu a zaznamenávání návštěvnosti stránek.[[16]](https://cs.wikipedia.org/wiki/PHP#cite_note-history-16) Tento binární kód ještě tentýž rok skloubil s jiným programem, který sám napsal. Po spojení s Form Interpreter tak vznikla kombinace PHP/FI, která měla mnohem větší funkčnost. PHP/FI obsahovala širokou implementaci pro [programovací jazyk C](https://cs.wikipedia.org/wiki/C_(programovac%C3%AD_jazyk) "C (programovací jazyk)") a navíc tato verze mohla komunikovat s [databázemi](https://cs.wikipedia.org/wiki/Datab%C3%A1ze "Databáze"), což umožnilo tvorbu prvních jednoduchých dynamických [webových aplikací](https://cs.wikipedia.org/wiki/Webov%C3%A9_aplikace "Webové aplikace"). Lerdorf veřejně oznámil vydání PHP/FI (pod názvem „Personal Home Page Tools (PHP Tools) version 1.0“) v diskuzní skupině [Usenet](https://cs.wikipedia.org/wiki/Usenet "Usenet") dne [8. června](https://cs.wikipedia.org/wiki/8._%C4%8Derven "8. červen") [1995](https://cs.wikipedia.org/wiki/1995 "1995").[[17]](https://cs.wikipedia.org/wiki/PHP#cite_note-17) Jeho cílem bylo rozšířit okruh uživatelů, aby mohl najít co nejvíce chyb a tak zdokonalil kód. Tato verze již měla základní vlastnosti, které měly i pozdější verze PHP, například proměnné ve stylu [Perlu](https://cs.wikipedia.org/wiki/Perl "Perl"), zpracování formulářů a možnost vložit [HTML](https://cs.wikipedia.org/wiki/HyperText_Markup_Language "HyperText Markup Language") kód. Syntaxe byla obdobná jako u [Perlu](https://cs.wikipedia.org/wiki/Perl "Perl"), ale byla omezenější, jednodušší a méně konzistentní.[[16]](https://cs.wikipedia.org/wiki/PHP#cite_note-history-16)

[Zeev Suraski](https://cs.wikipedia.org/wiki/Zeev_Suraski "Zeev Suraski") a [Andi Gutmans](https://cs.wikipedia.org/wiki/Andi_Gutmans "Andi Gutmans"), dva izraelští vývojáři na [Technion IIT](https://cs.wikipedia.org/w/index.php?title=Technion_IIT&action=edit&redlink=1 "Technion IIT (stránka neexistuje)"), přepsali [parser](https://cs.wikipedia.org/wiki/Parser "Parser") v roce [1997](https://cs.wikipedia.org/wiki/1997 "1997"), vytvořili tak základ PHP 3 a změnili název jazyka na [rekurzivní zkratku](https://cs.wikipedia.org/wiki/Rekurzivn%C3%AD_zkratka "Rekurzivní zkratka") PHP = PHP: Hypertext Preprocessor.[[16]](https://cs.wikipedia.org/wiki/PHP#cite_note-history-16) Tým vývojářů oficiálně vydal PHP/FI 2 v [Listopadu](https://cs.wikipedia.org/wiki/Listopad "Listopad") [1997](https://cs.wikipedia.org/wiki/1997 "1997") po měsíčním testování [beta verze](https://cs.wikipedia.org/wiki/Beta_verze "Beta verze"). Poté začalo veřejné testování PHP 3, a její oficiální uvolnění přišlo v [červnu](https://cs.wikipedia.org/wiki/%C4%8Cerven "Červen") [1998](https://cs.wikipedia.org/wiki/1998 "1998"). [Zeev Suraski](https://cs.wikipedia.org/wiki/Zeev_Suraski "Zeev Suraski") a [Andi Gutmans](https://cs.wikipedia.org/wiki/Andi_Gutmans "Andi Gutmans") poté začali opětovné přepisování jádra PHP a vydali [Zend Engine](https://cs.wikipedia.org/wiki/Zend_Engine "Zend Engine") v roce [1999](https://cs.wikipedia.org/wiki/1999 "1999").[[18]](https://cs.wikipedia.org/wiki/PHP#cite_note-18) Založili firmu [Zend Technologies](https://cs.wikipedia.org/w/index.php?title=Zend_Technologies&action=edit&redlink=1 "Zend Technologies (stránka neexistuje)") v [Ramat Gan](https://cs.wikipedia.org/wiki/Ramat_Gan "Ramat Gan"), [Izrael](https://cs.wikipedia.org/wiki/Izrael "Izrael").[[16]](https://cs.wikipedia.org/wiki/PHP#cite_note-history-16)

Dne [22. května](https://cs.wikipedia.org/wiki/22._kv%C4%9Bten "22. květen") [2000](https://cs.wikipedia.org/wiki/2000 "2000") byla vydána verze PHP 4 postavená na [Zend Engine](https://cs.wikipedia.org/wiki/Zend_Engine "Zend Engine") 1.0. Dne [13. června](https://cs.wikipedia.org/wiki/13._%C4%8Derven "13. červen") [2004](https://cs.wikipedia.org/wiki/2004 "2004") byla představena verze PHP 5, která již stojí na novém [Zend Engine](https://cs.wikipedia.org/wiki/Zend_Engine "Zend Engine") II.[[16]](https://cs.wikipedia.org/wiki/PHP#cite_note-history-16) PHP 5 obsahuje nové rysy jako je vylepšená podpora pro [objektově orientované programování](https://cs.wikipedia.org/wiki/Objektov%C4%9B_orientovan%C3%A9_programov%C3%A1n%C3%AD "Objektově orientované programování"), PHP Data Objects extension (ta definuje lehké a konzistentní rozhraní pro napojení k [databázím](https://cs.wikipedia.org/wiki/Datab%C3%A1ze "Databáze")) a nesčetné množství výkonových vylepšení.[[19]](https://cs.wikipedia.org/wiki/PHP#cite_note-19) PHP 4 se již dále nevyvíjí a pro tuto verzi se nebudou vydávat ani žádné bezpečnostní aktualizace.[[20]](https://cs.wikipedia.org/wiki/PHP#cite_note-2007_news-20)[[21]](https://cs.wikipedia.org/wiki/PHP#cite_note-21)

V roce [2008](https://cs.wikipedia.org/wiki/2008 "2008") se stává PHP 5 jedinou stabilní verzí, která se vyvíjela. Později se zjistilo, že zde chybí static binding, byl přidán v PHP 5.3.[[22]](https://cs.wikipedia.org/wiki/PHP#cite_note-22)[[23]](https://cs.wikipedia.org/wiki/PHP#cite_note-23) Plánované PHP 6 se vyvíjelo s verzí PHP 5. Mezi hlavní změny patří odebrání register_globals,[[24]](https://cs.wikipedia.org/wiki/PHP#cite_note-24) magické uvozovky[[zdroj?](https://cs.wikipedia.org/wiki/Wikipedie:Ov%C4%9B%C5%99itelnost "Wikipedie:Ověřitelnost")] a safe mode.[[20]](https://cs.wikipedia.org/wiki/PHP#cite_note-2007_news-20)[[25]](https://cs.wikipedia.org/wiki/PHP#cite_note-25)

PHP ještě plně nepodporuje [Unicode](https://cs.wikipedia.org/wiki/Unicode "Unicode") nebo multibyte strings; podpora [unicode](https://cs.wikipedia.org/wiki/Unicode "Unicode") bude zahrnuta až do verze PHP následující po PHP 5. Spousta kvalitních [open sourcových](https://cs.wikipedia.org/wiki/Otev%C5%99en%C3%BD_software "Otevřený software") projektů pozastavilo podporu PHP 4 ve svých nových kódech od [5. února](https://cs.wikipedia.org/wiki/5._%C3%BAnor "5. únor") [2008](https://cs.wikipedia.org/wiki/2008 "2008"). Aby jim konsorcium vývojářů PHP usnadnilo přechod na PHP 5, poskytlo jim přechodovou verzi z PHP 4 na PHP 5.[[26]](https://cs.wikipedia.org/wiki/PHP#cite_note-gophp5-26)[[27]](https://cs.wikipedia.org/wiki/PHP#cite_note-27)

PHP 5 běží jak ve [32bitovém](https://cs.wikipedia.org/wiki/32bitov%C3%BD "32bitový"), tak i v [64bitovém](https://cs.wikipedia.org/wiki/64bitov%C3%BD "64bitový") prostředí, ale jedinou oficiální verzí pro [Windows](https://cs.wikipedia.org/wiki/Microsoft_Windows "Microsoft Windows") je 32bitová verze, vyžadující 32bitový mód kompatibility [Windows](https://cs.wikipedia.org/wiki/Microsoft_Windows "Microsoft Windows") při použití IIS v 64bitovém prostředí [Windows](https://cs.wikipedia.org/wiki/Microsoft_Windows "Microsoft Windows"). K dispozici je verze třetí strany,[[28]](https://cs.wikipedia.org/wiki/PHP#cite_note-28) která je určena pro 64bitové [Windows](https://cs.wikipedia.org/wiki/Microsoft_Windows "Microsoft Windows").

Vývoj verze 6 narazil někdy během roku 2010 na problémy kolem implementace Unicode a od té doby se vydání nové hlavní verze odkládalo, nicméně mnoho podstatných změn přinesly dílčí verze 5.3 a 5.4. PHP 6 bylo stále vyvíjeno, ale nedosáhlo bodu, ve kterém by bylo schváleno k vydání. V červenci 2014 se hlasovalo o názvu nové verze a bylo odhlasováno, že to bude PHP 7.[[29]](https://cs.wikipedia.org/wiki/PHP#cite_note-29)

Kvůli oblíbenosti řady PHP 5.6.x byla její podpora prodloužena až do 31. prosince 2018.[[30]](https://cs.wikipedia.org/wiki/PHP#cite_note-www.root.cz/zpravicky/php-5-x-konci-podpora-ke-konci-roku-pouziva-ho-62-webu-30) I přes blížící se konec podpory PHP 5.6.x ještě v říjnu roku 2018 používalo podle statistik [W3Techs](https://cs.wikipedia.org/w/index.php?title=W3Techs&action=edit&redlink=1 "W3Techs (stránka neexistuje)") tuto verzi ještě 62 % webů.[[30]](https://cs.wikipedia.org/wiki/PHP#cite_note-www.root.cz/zpravicky/php-5-x-konci-podpora-ke-konci-roku-pouziva-ho-62-webu-30)

Jazyk PHP byl dlouho definován pouze svou implementací, oficiální specifikace jazyka byla oznámena na konci července 2014.[[31]](https://cs.wikipedia.org/wiki/PHP#cite_note-31)[[32]](https://cs.wikipedia.org/wiki/PHP#cite_note-32)

### Data vydání hlavních verzí[[editovat](https://cs.wikipedia.org/w/index.php?title=PHP&veaction=edit&section=9 "Editace sekce: Data vydání hlavních verzí") | [editovat zdroj](https://cs.wikipedia.org/w/index.php?title=PHP&action=edit&section=9 "Edit section's source code: Data vydání hlavních verzí")]

||Význam|Stav vývoje|
|---|---|---|
|červená|staré verze|již nepodporované|
|žlutá|současné verze|opravovány jsou pouze kritické chyby|
|zelená|současné verze|aktivně podporováno, chyby jsou opravovány, pravidelně vychází nové verze|
|modrá|budoucí verze|vývoj nových vlastností|

|Řada|Verze|Datum vydání|Poznámka|
|---|---|---|---|
|1.x|1.0|[8. června](https://cs.wikipedia.org/wiki/8._%C4%8Derven "8. červen") [1995](https://cs.wikipedia.org/wiki/1995 "1995")|Oficiální název „Personal Home Page Tools (PHP Tools)“. Poprvé byl použit název „PHP“.|
|2.x|2.0|[16. dubna](https://cs.wikipedia.org/wiki/16._duben "16. duben") [1996](https://cs.wikipedia.org/wiki/1996 "1996")|Autor jej považoval za „nejrychlejší a nejjednodušší nástroj“ pro tvorbu dynamických webových stránek.|
|3.x|3.0|[6. června](https://cs.wikipedia.org/wiki/6._%C4%8Derven "6. červen") [1998](https://cs.wikipedia.org/wiki/1998 "1998")|Tým vývojářů se z původní jedné osoby rozšířil na více osob. [Zeev Suraski](https://cs.wikipedia.org/wiki/Zeev_Suraski "Zeev Suraski") a [Andi Gutmans](https://cs.wikipedia.org/wiki/Andi_Gutmans "Andi Gutmans")  <br>přepsali celý základ pro tuto verzi.|
|4.x|4.0|[22. května](https://cs.wikipedia.org/wiki/22._kv%C4%9Bten "22. květen") [2000](https://cs.wikipedia.org/wiki/2000 "2000")|Přidán pokročilý dvoustupňový systém parse/execute (analyzovat/vykonat) syntaktické analýzy tagu –  <br>[Zend engine](https://cs.wikipedia.org/w/index.php?title=Zend_engine&action=edit&redlink=1 "Zend engine (stránka neexistuje)").|
|4.1|[10. prosince](https://cs.wikipedia.org/wiki/10._prosinec "10. prosinec") [2001](https://cs.wikipedia.org/wiki/2001 "2001")|Byly představeny ‚superglobalní proměnné‘ (`$_GET`, `$_POST`, `$_SESSION`, atd.)|
|4.2|[22. dubna](https://cs.wikipedia.org/wiki/22._duben "22. duben") [2002](https://cs.wikipedia.org/wiki/2002 "2002")|zakázání register_globals ve výchozím nastavení. Data přijatá prostřednictvím sítě  <br>nejsou přímo vkládány do názvů globálních proměnných, uzavírá se tím možnost využití bezpečnostních děr.|
|4.3|[27. prosince](https://cs.wikipedia.org/wiki/27._prosinec "27. prosinec") [2002](https://cs.wikipedia.org/wiki/2002 "2002")|Představeno [CLI](https://cs.wikipedia.org/wiki/P%C5%99%C3%ADkazov%C3%BD_%C5%99%C3%A1dek "Příkazový řádek"), jako doplněk [CGI](https://cs.wikipedia.org/wiki/Common_Gateway_Interface "Common Gateway Interface").|
|4.4|[11. srpna](https://cs.wikipedia.org/wiki/11._srpen "11. srpen") [2005](https://cs.wikipedia.org/wiki/2005 "2005")|Dodány stránky nápovědy pro skripty `phpize` a `php-config`.|
|5.x|5.0|[13. července](https://cs.wikipedia.org/wiki/13._%C4%8Dervenec "13. červenec") [2004](https://cs.wikipedia.org/wiki/2004 "2004")|[Zend Engine](https://cs.wikipedia.org/wiki/Zend_Engine "Zend Engine") II s novým objektovým modelováním.|
|5.1|[24. listopadu](https://cs.wikipedia.org/wiki/24._listopad "24. listopad") [2005](https://cs.wikipedia.org/wiki/2005 "2005")|Zlepšení výkonu zavedením kompilátoru proměnných v přepracovaném Engine PHP.|
|5.2|[2. listopadu](https://cs.wikipedia.org/wiki/2._listopad "2. listopad") [2006](https://cs.wikipedia.org/wiki/2006 "2006")|Povolen filtr přípon ve výchozím nastavení.|
|5.3|[30. června](https://cs.wikipedia.org/wiki/30._%C4%8Derven "30. červen") [2009](https://cs.wikipedia.org/wiki/2009 "2009")|jmenné prostory, oprava chyb, změny ve funkcích a doplňcích|
|5.4|[1. března](https://cs.wikipedia.org/wiki/1._b%C5%99ezen "1. březen") [2012](https://cs.wikipedia.org/wiki/2012 "2012")|traits, dereference polí, odstranění některých zastaralých funkcí a direktiv|
|5.5|[20. června](https://cs.wikipedia.org/wiki/20._%C4%8Derven "20. červen") [2013](https://cs.wikipedia.org/wiki/2013 "2013")|operátor yield, blok finally pro ošetřování výjimek, označení extenze MySQL jako zastaralé|
|5.6|[28. srpna](https://cs.wikipedia.org/wiki/28._srpen "28. srpen") [2014](https://cs.wikipedia.org/wiki/2014 "2014")|konstantní skalární výrazy, variadické funkce, operátor pro umocňování, upload souborů větších než 2 GB|
|6.x|6.0|–|nevydaná verze s plánovanou nativní podporou Unicode|
|7.x|7.0|[3. prosince](https://cs.wikipedia.org/wiki/3._prosinec "3. prosinec") [2015](https://cs.wikipedia.org/wiki/2015 "2015")|až 2x zrychlení oproti verzi 5.6, snížena paměťová náročnost, 64bitová podpora, typová kontrola pro skalární datové typy v parametrech, definice návratových hodnot funkcí, nový operátor `null coalesce`, nový operátor `spaceship`, přidání anonymních tříd|
|7.1|[1. prosince](https://cs.wikipedia.org/wiki/1._prosinec "1. prosinec") [2016](https://cs.wikipedia.org/wiki/2016 "2016")|návratový [typ void](https://cs.wikipedia.org/wiki/Void_(datov%C3%BD_typ) "Void (datový typ)"), definice viditelnosti konstant, definice parametrů jako nullable, zachytávání více výjimek v jednom `catch` bloku, přidání typu `iterable`|
|7.2|[30. listopad](https://cs.wikipedia.org/wiki/30._listopad "30. listopad") [2017](https://cs.wikipedia.org/wiki/2017 "2017")|podpora algoritmu [Argon2](https://cs.wikipedia.org/wiki/Argon2 "Argon2") ve funkci `password_hash`, generický typ `object` jako type hint u parametrů funkcí|
|7.3|[6. prosinec](https://cs.wikipedia.org/wiki/6._prosinec "6. prosinec") [2018](https://cs.wikipedia.org/wiki/2018 "2018")|volání funkcí a metod lze zakončit čárkou jako u definice polí, zpětně kompatibilní přepis interní knihovny PCRE pro regulární výrazy|
|7.4|[28. listopad](https://cs.wikipedia.org/wiki/28._listopad "28. listopad") [2019](https://cs.wikipedia.org/wiki/2019 "2019")[[33]](https://cs.wikipedia.org/wiki/PHP#cite_note-33)|typová kontrola ve vlastnostech objektu (Type Properties), zkrácený zápis anonymních funkcí atd.[[34]](https://cs.wikipedia.org/wiki/PHP#cite_note-34)|
|8.x|8.0|[26. listopad](https://cs.wikipedia.org/wiki/26._listopad "26. listopad") [2020](https://cs.wikipedia.org/wiki/2020 "2020")|union types, pojmenované argumenty, atributy (anotace implementované v jazyce bez [PHPDoc](https://cs.wikipedia.org/wiki/PHPDoc "PHPDoc")), definice třídních proměnných v konstruktoru, mixed type|
|8.1|[25. listopad](https://cs.wikipedia.org/wiki/25._listopad "25. listopad") [2021](https://cs.wikipedia.org/wiki/2021 "2021")|[výčtový typ](https://cs.wikipedia.org/wiki/V%C3%BD%C4%8Dtov%C3%BD_typ "Výčtový typ"), fibers pro paralelizaci, readonly označení třídních proměnných, intersection type, never type|
|8.2|[24. listopad](https://cs.wikipedia.org/wiki/24._listopad "24. listopad") [2022](https://cs.wikipedia.org/wiki/2022 "2022")|readonly třídy, rozšíření typů o null/true/false, použití konstant v traits|
|8.3|[23. listopad](https://cs.wikipedia.org/wiki/23._listopad "23. listopad") [2023](https://cs.wikipedia.org/wiki/2023 "2023")|typy pro konstanty ve třídách, funkce json_validate, atribut označující přepsání metody|

#claude_reference
