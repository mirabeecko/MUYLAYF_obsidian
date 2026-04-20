---
tags:
  - tools_vyvojare
project: VÝVOJÁŘ
type: Programovací jazyk
---


###### JSON je universální formát pro ukládání dat. Jak ho používat?

(https://jecas.cz/json)

Zkratka JSON znamená **JavaScript Object Notation** – česky by se dala přeložit třeba jako styl zápisu JavaScriptového objektu. Z toho plyne, že má něco společného s JS, ale v dnešní době se používá jako universální strojově čitelný formát pro výměnu dat.

`Hlavní výhoda JSONu je v jeho snadném zpracovávání.`

**Zápis objektu v JS**
Příklad zápisu objektu přiřazeného do proměnné v JavaScriptu může vypadat následovně. Objekt je ve složených závorkách a jednotlivé dvojice „klíč : hodnota“ se oddělují čárkou:

var objekt = {
  "klic" : "hodnota",
  "jinyNazev" : "další hodnota"
}

Z vlastnosti klic výše uvedeného objektu jde získat nastavenou hodnotu jako:
S S
alert(objekt.klic); // hodnota
Získávat hodnoty z JSON objektu je tedy velmi pohodlné.


**Zanořování dat**
V praxi jsou soubory ve JSONu mnohem složitější. Do klíče jde kromě hodnoty přiřadit další pole:

var objekt = {
  "klic" : {
    "zanorenyKlic" : "hodnota",
    "jinyZanorenyNazev" : "další hodnota"
  }
}


Hodnota v tomto případě půjde získat jako objekt.klic.zanorenyKlic.

Více položek
Přísluší-li k jednomu klíči více položek, používají se hranaté závorky [].

`var objekt = [
  {
    "klic" : "hodnota",
    "jinyNazev" : "další hodnota"
  },
  {
    "klic" : "hodnota 2",
    "jinyNazev" : "další hodnota 2"
  }  
]

`
Data z objektu se v tomto případě dostanou pomocí číselného indexu:

alert(objekt[0].klic); // hodnota
Hodnoty bez klíče
Existuje-li více položek, které nepotřebují klíč, použijí se hranaté závorky:

var objekt = {
  "klic" : [
      "hodnota",
      "další"
  ],
  "jinyKlic" : "další hodnota"
};
Získat hodnoty půjde opět pomocí číselného indexu:

alert(objekt.klic[0]); // hodnota


**Parsování JSONu**
Při získání dat ve formátu JSON pomocí AJAXu je potřeba převést tento textový obsah do JS objektu.

V případě úspěšně získaných dat přes AJAX se potom callback funkci předají data převedená na objekt pomocí JSON.parse:

callbackFunkce(JSON.parse(xhr.responseText));
Pro IE 7 a starší se převod prováděl funkcí eval:

callbackFunkce(eval('(' + xhr.responseText + ')'));
Opakem JSON.parse je JSON.stringify – zajistí převod JS proměnné/objektu na textový řetězec.

**Data v JSONu**
JSON je v dnešní době asi nejrozšířenějším způsobem získávání dat napříč servery.

Kromě toho jde používat jako úložiště dat. Některé programy ho používají pro konfigurační soubory.

Soubor ve formátu JSON vypadá nějak takto:

{
  "klic" : "hodnota",
  "jinyNazev" : "další hodnota"
}

Pro získání obsahu z cizích stránek se hodí hledat, jestli neexistuje v JSONu – zpracování je potom mnohem jednodušší než parsování HTML kódu.

**JSON vs. JS objekt**
Objekt v JavaScriptu vypadá podobně jako JSON, ale existují mezi nimi rozdíly v syntaxi. Obecně platí, že JSON jde použít jako JS objekt, ale už nemusí platit, že objekt z JavaScriptu bude validní JSON.


**Uvozovky**
Většina hodnot uvnitř JSON objektu, má-li být JSON validní, musí být v dvojitých uvozovkách.

Výjimkou jsou hodnoty v podobě čísel, true, false a null.

JSONLint – validátor a formátovač JSONu
V JavaScriptovém objektu jde klíče uvádět s jednoduchými uvozovkami nebo dokonce bez nich.

var objekt = {
  klic : "hodnota",
  'jinyKlic' : "jiná hodnota"
}


**Funkce**
JS objekt dále může na rozdíl od JSONu kromě řetězce, čísla, true, false a null obsahovat i funkci:

var objekt = {
  klic : function(parametr) {
    alert(parametr);
  }
}


**Použití**:
objekt.klic("hodnota"); // hodnota
JSON v PHP
Jazyk PHP má pro práci se JSONem dvě funkce:

json_encode($pole) – převede PHP pole do JSONu
json_decode($text) – převede textová data z JSONu do PHP objektu
json_decode($text, true) – převede textová data z JSONu do PHP pole
Kromě PHP objektu jde používat i pouze obyčejné pole – toho se dosáhne druhým parametrem nastaveným na true ↑.

**Zpracování JSONu v PHP**
Získání hodnoty z JSONu může vypadat následovně:

<?php
$json = '{
  "klic" : "hodnota",
  "jinyNazev" : "další hodnota"
}';
$objekt = json_decode($json);
echo $objekt->klic; // hodnota


**JSONP**
JSONP je „JSON s vycpávkou“ (písmeno P značí padding). Používá se v situacích, kdy je potřeba získat JavaScriptem data z cizí domény.

AJAX je typicky omezen pouze na totožnou doménu, takže by se získat JSON z cizí stránky nezdařilo. JSONP to obchází tak, že jsou požadovaná data obalena do volání JS funkce a cizí URL s tímto obsahem se připojí jako běžný externí skript.

Připojit externí skript jde v JS následujícím způsobem. Obvykle se u JSONP může parametrem callback nastavit název vlastní funkce:

var s = document.createElement("script");
s.src = "http://example.com/data.json?callback=vlastniFunkce";
document.head.appendChild( s );
Příklad JSONP souboru:

vlastniFunkce({
  "klic" : "hodnota",
  "jinyNazev" : "další hodnota"
});


Po stažení obsahu se zavolá funkce vlastniFunkce a jako parametr dostane data. Vlastní funkce už je deklarována na stránce, která se snaží získat obsah:

function vlastniFunkce(data) {
  alert(data.klic); // hodnota
}


**Bezpečnost JSONP**
Vzhledem k tomu, že se do stránky připojuje cizí skript, je používání JSONP risikové. Autor stránky, která poskytuje data ve formátu JSONP, může získat značnou kontrolu nad stránkou, která si tento skript připojuje.

Cizí JavaScript může prakticky libovolně manipulovat se obsahem stránky.

Používat JSONP je tak dobré jen z prověřených zdrojů. Ani to nezajišťuje 100% bezpečí, protože původně prověřený JSONP může být časem napaden útočníkem.

**JSON API**
JSON se často používá u Single page aplikací. Taková aplikace sestává z jediné HTML stránky a všechna data ze serveru se získávají v JSON formátu a o jejich zobrazení se stará JavaScript.

Server nabízející obsah v JSONu se tedy vůbec nestará o presentační podobu, ale pouze tupě vrací data ke zpracování.

Používat JSON API se v jistých případech hodí i u serverových aplikací. Část zobrazující data může být v takovém případě nezávislá na části data připravující.>)



---
[[JavaScript Bez názvu 6]]

#claude_reference
