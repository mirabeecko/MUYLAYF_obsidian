---
tags:
  - kcah
source: https://galaxie39.webnode.cz/zapnuti-pc-na-dalku/
---


# Zapnutí PC na dálku

  

![](https://c067896d2d.cbaul-cdnwnd.com/3b3be099d78fa0ca95c0e940ac547f91/200000123-99a3c9a9d8/aplikace-android-5.jpg?ph=c067896d2d)

**Začínáme**  

Pokud chceme zapnout počítač na dálku, tak k tomu musíme využít technologie s názvem "Wake on LAN (zkratka WOL, WoL), jenž umožňuje zapnutí počítače přes síť (samozřejmě, že počítač musí být připojen do síťě a to buď kabelem anebo Wifi). V současné době je připojení či zapnutí počítače naprosto primitivní a zvládne to každý jedinec, který začal používat někdy svůj mozek. Podobná technologie byla vymyšlena už v roce 1997 a před tím ještě podobné, které měli společný cíl. Nezbytným předpokladem je to, že musí aplikace dobře komunikovat se základní deskou umístěnou v počítači.  

![](https://c067896d2d.cbaul-cdnwnd.com/3b3be099d78fa0ca95c0e940ac547f91/200000124-a3655a4622/popis%20z%C3%A1kladn%C3%AD%20desky.jpg?ph=c067896d2d)

Základní deska (viz. obrázek nahoře) musí být vybavena konektorem WAKEUP-LINK, který je propojen pomocí 3pinového kabelu se síťovou kartou či routerem. Síťové karty podporují právě WOL.  

Aby vše fungovalo, jak má být, tak musí být funkce Wake on LAN povolena i v BIOSu základní desky. Počítač samozřejmě musí být připojen i do napětí. Pokud je vše připojeno a aktivováno, tak dobře nastavená síťová karta zůstává aktivní i v době, kdy je zařízení vypnuté. Nejlépe se takto ovládají počítače bez mechanického zapínání.   

![](https://c067896d2d.cbaul-cdnwnd.com/3b3be099d78fa0ca95c0e940ac547f91/200000126-65e1266dab/jak.jpg?ph=c067896d2d)

![](https://c067896d2d.cbaul-cdnwnd.com/3b3be099d78fa0ca95c0e940ac547f91/200000127-6100761f6b/jak2.jpg?ph=c067896d2d)

**Příprava na zapnutí počítače na dálku**  

V první řadě si musíme zajistit zjištění názvu tzv. "MAC adresy síťové karty, což je jasný identifikátor síťového zařízení, díky němuž poznáme kde se počítač nachází a otevřená cestu s ním na dálku pracovat.  

MAC adresu zjistíme podle několika způsobů. Mezi nejrychlejší patří zadání příkazu "ipconfig/all" do příkazového řádku. V prostředí Windows je MAC adresa označena jakožto "Fyzická adresa" a jde o sekvenci specifických znaků/čísel, které se oddělují pomlčkami: **"02-35-89-BD-EC"**. Tuto informaci si překopírujeme anebo poznamenáme či nafotíme pro pozdější použití.  

![](https://c067896d2d.cbaul-cdnwnd.com/3b3be099d78fa0ca95c0e940ac547f91/200000125-b016cb1143/abyste-mohli-zapnout-pocitac-potrebujete-znat-mac-adresu-karty.png?ph=c067896d2d)

V dalším kroku nainstalujeme aplikaci na mobilní telefon. Tuto aplikaci nalezneme na internetu anebo přímo v obchodě Google Play, kde jsou i podobné variace. Mezi asi ty nejlepší aplikace patří "**WolOn - Wake on Lan**" (hodnoceno uživateli, jako nejlepší aplikace na zapínání PC na dálku).  

Poté co vybranou aplikaci nainstalujeme a spustíme, tak musíme přidat zařízení, která budeme chtít na dálku zapínat. Zařízení přidáme pomocí tlačítka "**plus**" - následně počítač pojmenujeme a zadáme potřebnou MAC adresu a vše uložíme pomocí kouzelné hůlky. Pomocí tlačítka "plus" můžeme do aplikace přidat celou řadu počítačů, které můžeme ovládat na dálku. Většina těchto programů nabízí také skenování počítačů - což můžeme aktivovat pomocí volby "Network Scan" a "Start network scan". Poté jen vše uložíte pomocí tlačítka "Save to Wan list".  

**Halo pane, nejde to!!**  

Nezapíná se Vám počítač i když si myslíte, že vše jste udělali dobře a voláte - POMOC ?? Nevoljte správný odborník na ITC musí si své zdroje vyhledávat a testovat, musí přemýšlet a dávat si dvě a dvě dohromady.  

Pokud se Vám tedy počítač po nastavení nezapne, tak může být chyba v několika bodech. Buďto je vypnutá funkce "Wake on LAN v BIOSu" (bližší informace naleznete v manuálu základní desky - musíte znát pouze číslo a název základní desky a manuál si vyhledáte na internetu. Každá firma by měla mít manuály uložené v dokumentech) anebo jste udělali chybu při přepisu MAC adresy (zkontrolujte si to). Nespecifickým problémem může být například to, že telefon a pc jsou v rozdílné síti (mobilní telefon je propojen přes Wifi a počítač přes LAN - někdy to není kompatibilní a způsobuje to problémy). Pokud půjdeme do hloubky a necháme tento problém otevřený, tak počítač může probudit k životu téměř každý, kdo zná vaši MAC adresu a používá LAN. Když nepomůže ani jedno ani druhý a počítač nelze zapnout na dálku, tak je nutné zkontrolovat základní desku, zda síťová karta podporuje funkci WOL.

#claude_reference
