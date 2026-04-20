


```python
from selenium import webdriver

from selenium.webdriver.chrome.service import Service

from webdriver_manager.chrome import ChromeDriverManager

  

options = webdriver.ChromeOptions()

options.headless = True # Headless mód, prohlížeč se neotevře

options.add_argument("--window-size=1920,1440")

  

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

  

url = "https://or.justice.cz/ias/ui/rejstrik-firma.vysledky?subjektId=763586&typ=PLATNY"

driver.get(url)

driver.save_screenshot("/Users/mb/Desktop/screenshots/or-111screenshot.png") # Uložení screenshotu

driver.quit()
```

#claude_reference
