---
tags:
  - scripting
  - python
  - TJ/MAIN
  - tj/gpt
  - gpt
  - GPT-RADY
  - VSCODE
---
vscode :: *tj-or.py*, *or-screenshot.py*

---
## OR-SCREENSHOT - poslání png na e-mail

> [!important]+ ZADÁNÍ GPT
> VYTVOŘ SCRIPT S AUTOMATICKÝM SPUŠTĚNÍM KAŽDÝ DEN V 9:00, KTERÝ VYTVOŘÍ SCREEN celé stránky url https://or.justice.cz/ias/ui/rejstrik-firma.vysledky?subjektId=763586&typ=PLATNY a pošle mi ho emailem na telovychovnajednotakrupka@gmail.com


> [!danger] ODPOVĚĎ GPT
> Vytvoření skriptu, který automaticky spouští screenshot webové stránky a odesílá jej e-mailem, vyžaduje několik kroků. Nejprve vytvoříme jednoduchý skript v Pythonu, který použije nástroje jako Selenium pro snímání obrazovky webové stránky a poté SMTP knihovnu pro odeslání e-mailu.
> 
> Předtím než začnete, ujistěte se, že máte nainstalovaný Python a následující knihovny:
> 
> 1. `selenium` pro automatizaci webového prohlížeče.
> 2. `smtplib` a `email` pro odesílání e-mailů.
> 
> Dále budete potřebovat WebDriver pro váš preferovaný webový prohlížeč (např. ChromeDriver pro Google Chrome).
> 
> Následuje příklad skriptu:
> 
> pythonCopy code
> 
> ```python
from selenium import webdriver from selenium.webdriver.chrome.service import Service from webdriver_manager.chrome import ChromeDriverManager from email.mime.multipart import MIMEMultipart from email.mime.base import MIMEBase from email import encoders import smtplib import time  # Konfigurace Selenium options = webdriver.ChromeOptions() options.headless = True driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)  # URL, který chceme screenshotovat url = "https://or.justice.cz/ias/ui/rejstrik-firma.vysledky?subjektId=763586&typ=PLATNY"  # Otevření URL a pořízení screenshotu driver.get(url) time.sleep(5)  # Čekání na načtení stránky screenshot_name = "screenshot.png" driver.save_screenshot(screenshot_name) driver.quit()  # Konfigurace e-mailu sender_email = "vas_email@example.com" receiver_email = "telovychovnajednotakrupka@gmail.com" password = "vas_heslo" message = MIMEMultipart() message["From"] = sender_email message["To"] = receiver_email message["Subject"] = "Denní Screenshot"  # Připojení screenshotu with open(screenshot_name, "rb") as attachment:     part = MIMEBase("application", "octet-stream")     part.set_payload(attachment.read()) encoders.encode_base64(part) part.add_header("Content-Disposition", f"attachment; filename= {screenshot_name}",) message.attach(part)  # Odeslání e-mailu server = smtplib.SMTP("smtp.example.com", 587) server.starttls() server.login(sender_email, password) server.sendmail(sender_email, receiver_email, message.as_string()) server.quit()```
>```
> 
> 
> Pro automatizaci spouštění tohoto skriptu každý den v 9:00 můžete použít plánovač úloh v závislosti na vašem operačním systému. Například v Linuxu můžete použít `cron` a ve Windows 'Task Scheduler'.
> 
> Nezapomeňte nastavit správné údaje pro e-mailový server, přihlašovací údaje a cesty k WebDriveru.
> 
> Mějte na paměti, že posílání e-mailů pomocí skriptu vyžaduje opatrné nakládání s přihlašovacími údaji a mělo by se provádět bezpečně, aby nedošlo k kompromitaci vašich údajů.
> 
> 
> **MAC OS**
> 
>   
> Na Macu můžete pro plánování úloh použít nástroj `cron`, který je standardní součástí většiny Unixových a Linuxových systémů, včetně macOS. `Cron` umožňuje naplánovat spuštění skriptů a příkazů v předem definovaných časech a intervalech.
> 
> Pro nastavení `cron` úlohy, která spustí váš Python skript každý den v 9:00, postupujte následovně:
> 
> 1. Otevřete terminál na vašem Macu.
>     
> 2. Zadejte `crontab -e` pro editaci `crontab` souboru, který obsahuje vaše plánované úlohy.
>     
> 3. Přidejte následující řádek do `crontab` souboru (předpokládá se, že váš skript je umístěn v `/cesta/k/vašemu/skriptu.py`):
> 
> ```bash
> 0 9 * * * /usr/bin/python3 /cesta/k/vašemu/skriptu.py
> ```
> 
> - `0 9 * * *` určuje, že úloha se má spustit v 9:00 každý den.
> - `/usr/bin/python3` je cesta k Pythonu 3 na Macu. Tuto cestu můžete ověřit příkazem `which python3` v terminálu.
> - `/cesta/k/vašemu/skriptu.py` je cesta k vašemu Python skriptu.
> 
> 4. Uložte a zavřete editor `crontab`. To se obvykle dělá stisknutím `Ctrl + X`, poté `Y` pro potvrzení uložení a nakonec `Enter` pro ukončení editoru.
> 5. `cron` automaticky načte a aplikuje nové nastavení.
> 
> 
> Mějte na paměti, že `cron` spustí úlohu podle časového plánu systému, takže pokud je váš Mac v době plánované úlohy vypnutý nebo v režimu spánku, úloha se nespustí. Navíc, pokud vaše úloha vyžaduje grafické uživatelské rozhraní (například webový prohlížeč), může být lepší použít jiný způsob plánování, který je přívětivější k GUI aplikacím, jako je například `Automator` nebo `launchd` na macOS.


----


## OR-SCREENSHOT - otevření na macu

> [!important]+ ZADÁNÍ GPT
> VYTVOŘ SCRIPT S AUTOMATICKÝM SPUŠTĚNÍM KAŽDÝ DEN V 9:00, KTERÝ VYTVOŘÍ SCREEN celé stránky url https://or.justice.cz/ias/ui/rejstrik-firma.vysledky?subjektId=763586&typ=PLATNY a otevře ho přes celou obrazovku na mac

### Krok 1: Python Skript pro Screenshot

Předpokládám, že už máte nainstalovaný Python a Selenium. Nainstalujte WebDriver pro váš prohlížeč (např. ChromeDriver pro Chrome) a následujte tyto kroky:

1. Vytvořte Python skript (např. `screenshot.py`), který používá Selenium pro otevření webové stránky a udělání screenshotu:

```python
from selenium import webdriver

from selenium.webdriver.chrome.service import Service

from webdriver_manager.chrome import ChromeDriverManager

  

options = webdriver.ChromeOptions()

options.headless = True # Headless mód, prohlížeč se neotevře

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

  

url = "https://or.justice.cz/ias/ui/rejstrik-firma.vysledky?subjektId=763586&typ=PLATNY"

driver.get(url)

driver.save_screenshot("/Users/mb/Plocha/or-screenshot.png") # Uložení screenshotu

driver.quit()
```

3.Uložte tento skript a ověřte, že funguje správně.
    

### Krok 2: AppleScript pro Zobrazení Screenshotu

1. Otevřete `Script Editor` na vašem Macu.
    
2. Napište následující AppleScript kód, který otevře obrázek na celou obrazovku:

1. Uložte tento AppleScript jako aplikaci.
    
```applescript
tell application "Preview"
    activate
    open "/cesta/k/ulozeni/screenshot.png"  -- Cesta k screenshotu
    delay 2  -- Počkat, až se obrázek načte
    tell application "System Events" to keystroke "f" using {control down, command down}  -- Otevřít na celou obrazovku
end tell

```


### Krok 3: Automatizace s `cron`

1. Otevřete terminál na vašem Macu a napište `crontab -e` pro editaci `cron` souboru.
    
2. Přidejte následující řádek pro spuštění Python skriptu a pak AppleScript aplikace každý den v 9:00:
```bash
0 9 * * * /usr/bin/python3 /cesta/k/screenshot.py && osascript /cesta/k/applescript.app

```

3.Uložte a zavřete editor.

Tento postup zajistí, že každý den v 9:00 se spustí váš Python skript, který udělá screenshot webové stránky a následně AppleScript aplikace otevře tento screenshot na celou obrazovku. Ujistěte se, že cesty k souborům ve skriptech jsou správně nastaveny.

---

#claude_tjkrupka
