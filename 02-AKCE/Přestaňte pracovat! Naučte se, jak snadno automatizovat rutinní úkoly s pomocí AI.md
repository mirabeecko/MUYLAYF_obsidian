---
tags:
  - tools_vyvojare
  - ČLÁNKY
source: https://www.kapler.cz/snadna-automatizace-s-pomoci-ai/
---
# Přestaňte pracovat! Naučte se, jak snadno automatizovat rutinní úkoly s pomocí AI

Komunikace s chatbotem, jakkoliv „chytrým“, je stále jen první krok ve využití umělé inteligence. Nebylo by fajn, kdyby stroje dělaly alespoň ty triviální operace místo nás samy? A přesně to si dnes ukážeme.

Uveřejněno

7. 9. 2023

Rubrika [AI](https://www.kapler.cz/category/ai/)

Autor:Tomáš Kapler

Značky:[AI nástroje](https://www.kapler.cz/tag/ai-nastroje/), [Automatizace](https://www.kapler.cz/tag/automatizace/), [ChatGPT](https://www.kapler.cz/tag/chatgpt/), [Praktické AI tipy](https://www.kapler.cz/tag/prakticke-ai-tipy/)

Mnoho činností, které mnoho z nás na počítači dělá, je ve skutečnosti velmi rutinních a opakujících se. Schválně se zkuste zamyslet nad tím, co v práci děláte třeba několikrát denně, týdně, měsíčně.

Problém je, že každý děláme trochu něco jiného, takže nástroj, který by dělal přesně to co potřebuji já (a ještě jen v daný moment), by měl cca. jednoho spokojeného zákazníka a takové se obvykle nevyplácí vytvářet.

Naštěstí existují univerzální nástroje / služby, které vám i mě umožní relativně snadno nastavit naše vlastní osobní rutiny, jedním z těchto nástrojů je česká služba [Make.com](https://www.make.com/en/register?pc=kapler) (dříve známá jako Integromat). Ta je na trhu už přes 10 let, já o ní dnes tady budu psát díky snadné integraci GPT API. V základu do 1000 akcí je **zdarma**, pro malé projekty a na vyzkoušení to to může stačit.

_Poznámka: odkaz na [Make.com](https://www.make.com/en/register?pc=kapler) je affil, takže jestli se rozhodnete využívat jejich placených tarifů, dostanu z toho asi nějaké halíře, ale na článek to nemělo vliv, nevznikl na ničí popud a jeho cílem není tuto službu propagovat. Další známá konkurence je třeba Zapier nebo IFTTT, rád ale propaguji české služby._

**AI školení** – nové termíny a místa (Praha, Brno, České Budějovice)

[VÍCE INFORMACÍ](https://www.kapler.cz/ai-skoleni/)

Chcete dostávat tyto články na e-mail, aby vám nic neuteklo?

[REGISTRUJTE SE](https://www.kapler.cz/snadna-automatizace-s-pomoci-ai/#register)

## Jak fungují automatizační platformy

Automatizační platformy tohoto typu fungují vždy v zásadě stejně – snadno bez nutnosti znalosti programování atp. integrujete a propojujete různé služby a vytváříte scénář toho, co se má v jaký moment za jakých podmínek dít. Když pochopíte princip na jednom nástroji, snadno pak ovládnete i jakýkoliv jiný. Klíčové komponenty těchto nástrojů tedy jsou

**Integrace** (v Make.com a Zapier nazývané Apps/Aplikace, v IFTTT tomu říkají Services) – služby obvykle třetích stran, ke kterým se služba typicky pomocí jejich API (aplikačních rozhraní) připojuje a umožňuje z nich vytahovat nějaká data, stahovat nějaká data či spouštět nějaké činnosti. Typicky je takovou službou například Google Sheets, Gmail, Facebook posty, Slack, AdWords, různá CRM a kalendáře či právě například OpenAI GPT. [Make.com jich má aktuálně 1560](https://www.make.com/en/integrations?pc=kapler). Když nějakou službu automatizační platforma přímo nepodporuje, je někdy možné využít obecných modulů (napojení na REST, stažení HTML…), ale bývá to o dost pracnější.

**Spouštěče a akce** (events, actions, starters, triggers…) – moduly mají jednu či více akcí, které lze nějak využít a buď ji využít jako spouštěč, který odstartuje sérii návazných kroků, nebo naopak vy danou akci vyvoláte ať už aktivitou nějakého předchozího modulu, nebo třeba automaticky každý den v jednu ráno. Například můžete spustit nějakou akci, když vám přijde nový e-mail splňující nějaké podmínky, přidá se řádek do nějaké konkrétní tabulky, změní se nějaká webová stránka. Nebo naopak vy pošlete mail, přidáte řádek do tabulky či změníte obsah webu.

**Tvorba scénářů** (workflow, flows, applety…) – způsob, jakým propojujete jednotlivé moduly/akce do sebe a nastavujete jejich parametry a podmínky, za kterých mají pracovat. Scénáře můžete vytvářet buď sami skládáním jednotlivých modulů/akcí tak jak jdou za sebou, nebo většina služeb má i předpřipravené nejoblíbenější scénáře/šablony, které můžete využít a upravit. Příkladem scénáře může být „Zapiš přijatou poptávku do zákaznického systému, přidej ji jako úkol volnému obchodníkovi a pošli e-mail poptávajícímu, s informací, kdo se mu bude věnovat“, „Udělej souhrn denních zpráv oblíbených serverů a sociálních účtů z témat, která mě zajímají a dej mi jej každé ráno v 7 do mailu“, „Přidej nového kupujícího do Mailchimp databáze“ a podobně.

Scénářů lze vymyslet nekonečno, pro inspiraci toho, co se nějak řeší doporučuji například [Make.com šablony](https://www.make.com/en/templates?pc=kapler) nebo [IFTTT Applets](https://ifttt.com/explore/applets) (vesměs není problém vytvořit obdobný scénář v jiné službě podle libosti)

## Praktická ukázka automatizace s AI

Zkusil jsem vymyslet jednoduchý scénář, který ovšem využívá GPT API, ať si uděláte představu.

Poznámka: GPT API je placené, nicméně cena za zprávy se pohybuje v halířích, takže to nebývá zásadní problém. Zcela noví uživatelé také dostávají pár dolarů kreditu na hraní.

Situace – řekněme, že chcete udělat **chytrý odpovídač na dotazy zákazníků** – ne přímo chat, ale nástroj, který vezme dotaz od zákazníka, který vám pošle třeba mailem či formulářem, zkusí jej nějak pomocí GPT analyzovat a pak zákazníkovi pošle nějakou rychlou automatickou odpověď, aby nemusel čekat a uloží dotaz i odpověď někam do tabulky či vašeho CRM, abyste se mohli dotazu věnovat až budete v práci a třeba poslali lepší odpověď.

Já tenhle scénář malinko předělám – moje automatizace bude odpovídat na vaše názory na tento článek, ale princip a jednotlivé moduly budou totožné. Konkrétně tedy to v mém případě bude vypadat následovně

1. Čtenář – vy – vyplní svůj názor na tento článek v Google formuláři, který jsem vytvořil (pro jednoduchost vyžaduje přihlášení Google účtem, abych nemusel ověřovat email).
2. Google formulář uloží odpověď spolu s e-mailem do jednoduché Google Sheets tabulky – základní funkcionalita Google formulářů.
3. Jednou za čas si Make.com sáhne na tuto tabulku a vezme postupně nově přidané řádky.
4. Pošle váš názor na GPT API a zjistí základní sentiment.
5. Uloží jej do Google Sheets tabulky k dané odpovědi.
6. Znovu pošle názor na GPT API ale tentokrát podle něj nechá vygenerovat odpověď.
7. Odpověď uloží opět do Google sheets a zároveň pošle zpět uživateli na jeho email.

Je to samozřejmě trochu za vlasy přitažený příklad ale naučí vás všechny základní operace a nejspíš pak zvládnete i jiné scénáře.

Celé nastavení má o něco více bodů, další scénáře

### 1. Vytvoření Google formuláře

Tuhle část asi většině z vás nemusím vysvětlovat, na Google Form jsem prostě vytvořil nový formulář (mimochodem – existuje rychlá zkratka – stačí zadat do prohlížeče URL adresu [form.new](https://form.new/)).

Ve formuláři přidal jen pole Název a popis, kde vysvětluji, proč musíte potvrdit zaznamenání vašeho e-mailu a že jej nepoužiju k ničemu, vyjma právě odeslání výsledku z GPT. A pak jsem přidal jedinou otázku a to typu Odstavec, kde se vás ptám na váš názor a zaškrtl jsem, že toto pole je povinné.

Dále jsem si formulář pojmenoval kliknutím na původní „Formulář bez názvu“ vlevo nahoře a v sekci Odpovědi jsem klikl na Propojit s tabulkami a nechal vytvořit novou tabulku. Posledním krokem bylo v sekci Nastavení v části Odpovědi zvolit „Ověřeno“ u Sbírat e-mailové adresy (mohl bych zvolit Sbírat od respondentů, pak bych ale musel řešit, jak ověřovat e-mailové adresy, abych nepadal do spamových pastí a to je mimo téma článku). A protože jsem použil formulář na firemní doméně, musel jsem vypnout ve stejné sekci omezení na naši organizaci.

A to je vše, formulář se automaticky ukládá, jeho adresu zjistíte třeba po kliknutí na odeslat. Můj výsledný formulář si budete moci vyzkoušet na konci článku s celou tou automatizací.

![](https://i0.wp.com/www.kapler.cz/wp-content/uploads/image-170.png?resize=1024%2C947&ssl=1)

Vytvoření formuláře na Google Forms

### 2. Úprava Google Tabulky

V předchozím kroku jsme řekli Google formuláři, aby vytvořil Google Tabulku. Ta je v tenhle moment prázdná, obsahuje jen 3 záhlaví sloupců – časová značka (tam bude čas odpovědi), E-mailová adresa (tam bude e-mail odpovídajícího uživatele) a „Napište váš názor na článek“, což je nadpis mé otázky. Já přidám ještě další dvě záhlaví – Sentiment, do buňky D1, a Navržená odpověď, do buňky E1.

![](https://i0.wp.com/www.kapler.cz/wp-content/uploads/image-171.png?resize=1024%2C275&ssl=1)

### 3. Registrace na Make.com

Přejdete na stránku [Make.com](https://www.make.com/en/register?pc=kapler) a zvolíte Get started free

![](https://i0.wp.com/www.kapler.cz/wp-content/uploads/image-173.png?resize=1024%2C599&ssl=1)

Registrace do Make.com

### 4. Vytvoření scénáře

#### 4.0. Nový scénář

V levém menu klikněte na Scénáře a poté na vytvořit nový scénář. Uvítá vás stránka, kde svítí uprostřed velké Plus, které vás vyzývá k vytvoření prvního **Modulu** – což bude obvykle **Akce / spouštěč** nějaké **Aplikace.**

![](https://i0.wp.com/www.kapler.cz/wp-content/uploads/image-174.png?resize=1024%2C588&ssl=1)

Nový scénář

#### 4.1. Modul Google Sheets / Watch new rows

Prvním úkolem našeho scénáře je, že potřebujeme sledovat nově přidané řádky do naší Google Tabulky (Sheets).

Klikněte na plus a vyhledejte aplikaci Google Sheets. Následně vybíráte Spouštěč a nebo Akci, a tentokrát vybírám spouštěč – Watch New Rows

![](https://i0.wp.com/www.kapler.cz/wp-content/uploads/image-175.png?resize=1024%2C415&ssl=1)

![](https://i0.wp.com/www.kapler.cz/wp-content/uploads/image-176.png?resize=1024%2C553&ssl=1)

V dalším okně musím vytvořit spojení na můj Google drive účet, kde mám vytvořený onu Google Tabulku, vybrat ji a zvolit pár dalších údajů a potvrďte OK.

- Connection – pomocí Add přidáte a autorizujete váš Google účet, spojení si pojmenujte libovolně.
- Search method – Search by path – umožní vám vybrat soubor v dalších polích
- Drive – My drive – vytvořená tabulka je ve výchozím stavu ve složce My drive.
- Spreadsheet ID – kliknutím vyberete příslušný soubor
- Sheet name – vyberete příslušný název listu, nejspíš Odpovědi formuláře 1
- Table contains headers – ponecháte Yes
- Row with Headers – nejlépe změnit na A1:E1, ale klidně nechte i víc
- Limit – maximální počet řádků, které v jednom cyklu bude řešit – já nastavím například 5, tj. další akce se spustí při každém běhu maximálně pro 5 nových řádků a kdyby těch řádek mezitím přibylo víc, tak se spustí až v dalším cyklu.

![](https://i0.wp.com/www.kapler.cz/wp-content/uploads/image-177.png?resize=829%2C1024&ssl=1)

Poznámka: doporučuji si vytvořený scénář průběžně ukládat – CTRL+S nebo dole v menu ikonka Uložit. Několikrát se mi stalo, že jsem z obrazovky vyskočil a přišel o část práce. Make.com by měl IMO přidat možnost automatického ukládání a obnovení.

#### 4.2. Modul OpenAI / Create a completion

Nyní potřebujeme udělat první volání do na GPT API, kdy chceme poslat názor od čtenáře a od OpenAI, aby nám vrátil sentiment této zprávy (pozitivní, negativní, smíšená, nejasná).

Klikněte na pravý výstupek z předchozího modulu, po najetí myši se u něj objeví plusko a vytvoříte tak nový modul. Tentokrát hledejte aplikaci OpenAI (ChatGPT, Whisper, DALL-E) a následně zvolte Create a completion (GPT-3, GPT-3.5, GPT-4).

![](https://i0.wp.com/www.kapler.cz/wp-content/uploads/image-178.png?resize=1024%2C785&ssl=1)

Nyní musíte vytvořit spojení na vaše OpenAI API, tedy napsat tam své klíčy – API klíč ([https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)) a Organization ID ([https://platform.openai.com/account/org-settings](https://platform.openai.com/account/org-settings)). Pakliže váš API klíč nemáte vytvořený, zvolte v příslučné sekci OpenAI administrace „Create a new secret key“).

Následně nastavíte parametry celé konverzace s OpenAI:

- Connection – vaše spojen, které jste si vytvořili
- Select Method – Create a chat completion (GPT Models)
- Model – já zvolil pro toto demo GPT-3.5 Turbo, protože je nejlevnější, často asi budete používat spíš GPT-4
- Messages – zde je potřeba napsat konverzaci – instrukce, která jasně instruují GPT aby vrátil, co očekáváte. Vytvořím dvě zprávy, **u obou bude Role User**, protože to je instrukce od uživatele. Správně by u první zprávy měla být role System, ale s tou má GPT-3.5 Turbo problémy
    - Item 1 – message content. V mém případě je to něco jako „_Jsi asistent a hodnotíš reakce čtenářů na článek u automatizaci pomocí umělé inteligence. Tvoje reakce se musí vztahovat na hodnocení článku, ne něčeho jiného, co třeba čtenář zmíní.  
        Vždy odpovídáš právě 1 slovem:  
        „pozitivní“ – čtenáři se článek líbil …_“ Přidal jsem tam i příklady
    - Item 2 – message content – zvolte z nabídky „1. Napište váš názor na článek (C)“, jinými slovy – zde jako uživatel posílám chatu hodnotu získanou v kroku 1 ze sloupce C, tedy názor uživatele.

![](https://i0.wp.com/www.kapler.cz/wp-content/uploads/image-179.png?resize=864%2C1024&ssl=1)

![](https://i0.wp.com/www.kapler.cz/wp-content/uploads/image-180.png?resize=1024%2C985&ssl=1)

#### 4.3. Modul Google Sheets / Update a Cell

Nyní potřebujeme zapsat hodnotu sentimentu do příslušného řádku a sloupce naší tabulky. Opět použijeme aplikaci Google Sheets, Make.com vám jí nabídne, hned jak dáte přidat další modul, nebudete ji muset hledat. Tentokrát ovšem nevyberete Spouštěč ale Akci – Update a Cell. Nastavení modulu je podobné jako u spouštěče:

- Connection – vyberte existující spojení, nemusíte jej znovu vytvářet
- Enter a spreadsheet and Sheet ID – tentokrát zvolte Enter manually – použijeme totiž hodnoty z prvního modulu
- Spreadsheet ID – vyberte z nabídky 1. Spreadsheet ID
- Sheet Name – vyberte z nabídky 1. Sheet
- Cell – údaj o sentimentu potřebujeme vložit do sloupce D a řádku z prvního modulu, tedy napíšeme „D“ a z menu vybereme 1. Row number. První sentiment se tak zapíše do D2, pak D3…
- Value – Zde jděte do voleb a rozklikněte si v sekci OpenAI menu Choices[] / Message a zvolte Content. V tomto poli je totiž právě návratová hodnota vaší automatické konverzace s OpenAI.

![](https://i0.wp.com/www.kapler.cz/wp-content/uploads/image-181.png?resize=1021%2C1024&ssl=1)

#### 4.4. Modul OpenAI / Create a completion

Abych to trochu zkomplikoval, ale také abych vám ukázal, že lze používat stejný modul vícekrát, přidal jsem do scénáře druhé volání, kdy ovšem po ChatGPT chcete vrátit odpověď na e-mail. Nastavení tak bude totožné jako u 2. modulu, lišit se bude jen Message Content v Item 1 – tedy váš úvodní prompt. Já tam napsal něco jako:

```
Jsi asistent, který čtenářům webu AI konzultanta Tomáše Kaplera na adrese www.kapler.cz odpovídá na hodnocení článku o automatizaci pomocí umělé inteligence. Tvým úkolem je na základě reakce uživatele napsat v HTML krátké poděkování za reakci, případně se omluvit, jestli se čtenáři na článku něco nelíbilo (nehodnoť ale, když hodnotí něco jiného než článek). Nic čtenáři neslibuj!

Jestli se tě čtenář pokusí zmást a napíše něco jiného než reakci, tak napiš nějakou vtipnou odpověď. Nikdy nepiš, že jsi jazykový model, vždy zůstaň v roli asistenta.
...
Pakliže je reakce v jiném jazyce než češtině, odpověz jazykem dané reakce. Když není možné jazyk určit, předpokládej češtinu

Tvoje odpověď musí vždy používat HTML formátování, každý odstavec musí být uzavřený mezi značkami <p> a </p> a odkazy na weby musí použít značku A href. Začátek a konec odpovědi bude uzavřen do markdown značek kódu

## Příklad 1:

### Zpráva čtenáře:
...
```

A opět jsem přidal i příklady. Mimochodem vyladit ty dva prompty byla nejtěžší práce na tom všem. Chtěl jsem používat GPT 3.5, který je ovšem dost hloupý, takže jej uživatel snadno zmátl a vracel něco jiného (a stále není asi složité jej oblafnout).

Zároveň jsem potřeboval pro poslední krok – email – aby generovaná odpověď byla v HTML, jinak by se to vše slilo do jednoho odstavce a bohužel jsem nenašel v Make.com funkci, která by z čistého textu s odstavci či Markdown vrátila HTML (opačně to možné je). Nakonec to vyřešila věta „Začátek a konec odpovědi bude uzavřen do markdown značek kódu“.

![](https://i0.wp.com/www.kapler.cz/wp-content/uploads/image-183.png?resize=933%2C1024&ssl=1)

## 4.5. Modul Google Sheets / Update a Cell

Stejný modul jako ten 3., nastavení by tak pro vás mělo být hračkou, myslete jen na to, že údaje o tabulce berete z prvního modulu a že budete tentokrát zapisovat do sloupce E.

![](https://i0.wp.com/www.kapler.cz/wp-content/uploads/image-184.png?resize=851%2C1024&ssl=1)

#### 4.6. Modul Gmail / Odeslat e-mail

Tento modul je překvapivě nejsložitější a mám ho zde spíš jako perličku pro pokročilejší, obvykle stejně budete pro odeslání mailu zákazníkovi používat nějakou jinou službu (např. vaše CRM). Na druhou stranu když tohle nastavení zvládnete, budete to dělat jen jednou a pak už to nebudete muset řešit.

Problém je, že Google neumožňuje jednoduché spojení na Gmail, musíte nejdřív v Google Cloudu vytvořit vlastního OAuth klienta. Celý popis je velmi polopaticky na stránce [Connecting to Google services using custom OAuth client](https://www.make.com/en/help/connections/connecting-to-google-services-using-a-custom-oauth-client). Pouze aby mi to fungovalo, musel jsem na konci ještě aplikaci na Google Cloud publikovat (API & Services / (vaše aplikace) / OAuth consent screen / kliknout na Publish).

Další nastavení už je celkem jasné, do Předmětu dávám sentiment z druhého modulu, do Obsahu pak odpověď ze 4. modulu.

![](https://i0.wp.com/www.kapler.cz/wp-content/uploads/image-185.png?resize=676%2C1024&ssl=1)

#### Možná vylepšení

Doteď jsme dávali jen moduly za sebe, Make.com ale umožňuje moduly různě větvit, cyklit a podobně.

Například poslední dva kroky mohou probíhat klidně současně (šestý modul nevyužívá nic z pátého modulu) a mohu tak vytvořit tzv. Router, který mi rozbočí postup do více směrů. Dá se to udělat třeba kliknutím na ikonu montážního klíče mezi dvěma body, volbou Přidat router a odpojením a přepojením modulu. Případně z dolního menu pomocí první skupiny nástrojů – Řízení toku dat.

Můj výsledný diagram pak vypadá následovně.

![](https://i0.wp.com/www.kapler.cz/wp-content/uploads/image-186.png?resize=1024%2C590&ssl=1)

Další silnou zbraní automatizace jsou Filtry, kdy vy můžete každý krok (a jeho následníky) spustit jen za nějaké podmínky. Opět to uděláte přes ikonku montážního klíče a volby Nastavit filtr, například takhle nějak by vypadalo, kdybych nechtěl posílat zprávy na svůj Gmail.

![](https://i0.wp.com/www.kapler.cz/wp-content/uploads/image-188.png?resize=1024%2C865&ssl=1)

### Nastavení spouštění scénáře

Scénář se musí nějak spouštět, správně by jej měl zahájit Spouštěč, tj. přidání nového řádku, popravdě se mi to nepodařilo nastavit, třeba mi tu někdo poradí a upravím článek.

Ale není to tak podstatné – mně tady stačí intervalové spouštění – nastavil jsem vlevo dole výchozích 15 minut, každou čtvrthodinu tak Make.com koukne na Google Sheets v prvním kroku a když zjistí, že byl přidaný alespoň jeden řádek, tak rozjede celou proceduru a to tolikrát, kolik nových řádků bylo přidáno (maximálně do hodnoty Limit, kterou jsme nastavovali v prvním kroku).

Mimochodem scénář můžete kdykoliv spouštět i v průběhu manuálně pomocí Jednorázového spuštění. A kdybyste chtěli „vyresetovat“ od jakého řádku tabulky se má scénář spustit, můžete kliknout pravým tlačítkem na první modul a zvolit „Vybrat kde začít“.

## Update – jak vypadá výsledek

Mnozí už zkoušíte, a musím říct, že mě vaše reakce i odpovědi bota dost baví ![🙂](https://s.w.org/images/core/emoji/15.0.3/svg/1f642.svg)

## Vyzkoušejte a dejte vědět

Každý provedený krok scénáře (včetně toho ověření nových řádků každých 15 minut) mi bere 1 kredit z počtu operací. Ve Free tarifu jich mám 1000 za měsíc, což mi vydrželo asi den vašeho zkoušení, ale už je další měsíc, takže klidně zas zkoušejte.

[VYZKOUŠET SCÉNÁŘ, POSLAT NÁZOR](https://docs.google.com/forms/d/e/1FAIpQLScXsJnxwjdFTaRtlXZReFQx-66ebOXYAVAGE6Rlt8pcCxYh4A/viewform)

Když už to pak umíte a máte nastavené připojení na vaše služby, je vytvoření nového scénáře otázkou často jen minut, přiznávám, že tento mi včetně napsání článku trval přes 2 dny a mnoho hodin čistého času, tak se nevzdávejte, když se někde u vašeho scénáře zaseknete.

A jestli vám přišel článek užitečný, nezapomeňte jej sdílet, tady dole ![⬇️](https://s.w.org/images/core/emoji/15.0.3/svg/2b07.svg)![⬇️](https://s.w.org/images/core/emoji/15.0.3/svg/2b07.svg)![⬇️](https://s.w.org/images/core/emoji/15.0.3/svg/2b07.svg) jsou sdílecí tlačítka a registrační formulář, když budete chtít dostávat novinky emailem. Někdy v budoucnu zkusíme určitě i nějaké pokročilejší automatizace.

#claude_reference
