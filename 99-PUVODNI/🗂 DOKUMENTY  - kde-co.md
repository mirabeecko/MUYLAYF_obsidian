# Instalace Pythonu pro Windows

Běž na [stahovací stránku Pythonu a stáhni si instalátor nejnovější stabilní verze Pythonu. Od verze 3.6.0 má Python ve Windows jistá vylepšení, která se nám budou hodit, a proto stahuj jen verzi **3.6.0 nebo novější**.

Jak poznat, který instalátor je ten pravý? Pokud má tvůj počítač 64bitovou verzi Windows, stáhni si _Windows x86-64 executable installer_. Pokud máš starší počítač s 32bitovými Windows, stáhni si _Windows x86 executable installer_.

Kde zjistíš, zda máš 32bitové nebo 64bitové Windows? Stačí otevřít nabídku **Start**, vyhledat „Systém“ a otevřít **Systémové informace**. Pokud máš novější počítač, téměř jistě budeš mít 64bitový systém.

[![Screenshot zjišťování verze systému](https://naucse.python.cz/2018/pyknihovny-jaro/beginners/install/static/windows_32v64-bit.png)](https://naucse.python.cz/2018/pyknihovny-jaro/beginners/install/static/windows_32v64-bit.png)

Pak instalátor spusť. Na začátku instalace zaškrtni **Install launcher for all Users** a také **Add Python 3.6 to PATH**. Tyto volby ti zjednoduší vytvoření virtuálního prostředí.

(Jestli nemáš administrátorské oprávnění, volbu _Install launcher for all Users_ nezaškrtávej.)

[![Screenshot instalace Pythonu](https://naucse.python.cz/2018/pyknihovny-jaro/beginners/install/static/windows_add_python_to_path.png)](https://naucse.python.cz/2018/pyknihovny-jaro/beginners/install/static/windows_add_python_to_path.png)

Pak zmáčkni **Install now** a dále se drž instrukcí.

Máš-li otevřenou příkazovou řádku, po instalaci Pythonu ji zavři a otevři novou. Instalace mění systémové nastavení, které se musí načíst znovu.

## Vytvoření virtuálního prostředí

Až bude Python nainstalovaný, vytvoř virtuální prostředí.

Zvol si adresář (složku), ve které budeš mít soubory k PyLadies. Může to být třeba `C:\naucse-python`.

Zvolený adresář po vytvoření nesmíš přesouvat jinam – když to uděláš, přestane virtuální prostředí fungovat. Proto ho nedoporučuji vytářet na Ploše.

Kdybys někdy chtěl/a adresář přece jen přesunout, musel/a bys smazat virtuální prostředí a vytvořit nové.

Ve zbytku materiálů budeme tento adresář nazývat `~/naucse-python`, i když se u tebe pravděpodobně jmenuje jinak. Takže kdykoli od teď uvidíš `~/naucse-python`, doplň místo toho „svůj“ adresář.

Teď když je tenhle adresář vytvořený, otevři [příkazovou řádku](https://naucse.python.cz/2018/pyknihovny-jaro/beginners/cmdline/) a příkazem `cd` se do něj přepni. Pak vytvoř virtuální prostředí:

> py -3 -m venv venv

Tím se nám vytvořil adresář `~/naucse-python\venv`, ve kterém jsou soubory s virtuálním prostředím. Můžeš se podívat dovnitř, ale nikdy tam nic neměň.

## Aktivace virtuálního prostředí

Nakonec virtuální prostředí aktivuj:

```
> ~/naucse-python\venv\Scripts\activate
```

Nezapomeň místo ~/naucse-python zadat „svůj“ adresář!

Po spuštění tohoto příkazu by se mělo na začátku příkazové řádky (před `>`) objevit slovo `(venv)`. Tak poznáš, že je virtuální prostředí _aktivní_.

Tenhle příkaz si zapiš. Budeš ho muset zadat vždycky, když pustíš příkazovou řádku, než se pustíš do programování.

Zkusme teď nainstalovaný Python použít! To už bude stejné pro tebe i pro lidi na Linuxu a Macu. Sejdeme se na [další stránce](https://naucse.python.cz/2018/pyknihovny-jaro/beginners/first-steps/), kde uděláme první krůčky s Pythonem.

#claude_reference
