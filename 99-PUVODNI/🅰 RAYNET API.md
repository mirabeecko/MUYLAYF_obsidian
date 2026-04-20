---
tags:
  - RAYNET
  - API
  - python
  - GPT-RADY
  - SUN
  - gpt
  - EDU
source: 
aliases:
---
#### 1. Získání dat z RAYNET CRM
Nejprve použijte příkaz `curl` pro získání dat z API. Předpokládám, že data jsou ve formátu JSON, což je běžné u API.

```bash
curl -X GET -u 'sun@sun-station.cz:crm-099e1dc9308049b981a9ebb59ad55d47' -H 'X-Instance-Name: slunicko' 'https://app.raynet.cz/api/v2/company/'
```

#### 2. Zpracování Dat
Data ve formátu JSON je potřeba nejprve zpracovat. Můžete použít skript v jazyce Python, Node.js nebo jakémkoliv jiném programovacím jazyce, který umí zpracovávat JSON.

V Pythonu můžete například použít následující skript pro načtení a zpracování JSON dat:

```python
import json
import requests

response = requests.get('https://app.raynet.cz/api/v2/company/', auth=('sun@sun-station.cz', 'crm-099e1dc9308049b981a9ebb59ad55d47'), headers={'X-Instance-Name': 'slunicko'})
data = response.json()
# zde by byl kód pro zpracování a přípravu dat pro vložení do tabulky

```

#### 3. Vložení dat do tabulky
V závislosti na tom, kam chcete data vložit (například do databáze SQL, Excelu, Google Sheets atd.), budete muset použít odpovídající metodu nebo knihovnu. Například pro vložení do databáze MySQL v Pythonu můžete použít knihovnu `pymysql` nebo `sqlalchemy`.
Příklad vkládání do databáze MySQL:

```python
import pymysql

connection = pymysql.connect(host='hostname', user='username', password='password', db='dbname')

try:
    with connection.cursor() as cursor:
        # Vytvoření SQL příkazu pro vložení dat
        sql = "INSERT INTO `table_name` (`column1`, `column2`) VALUES (%s, %s)"
        for item in data:
            cursor.execute(sql, (item['field1'], item['field2']))

    connection.commit()
finally:
    connection.close()

```


Pro Excel nebo Google Sheets můžete použít knihovnu jako `openpyxl` (pro Excel) nebo `gspread` (pro Google Sheets) v Pythonu.

---


- [[📀 API ONE]]
- [[👓 VÝVOJÁŘ CANVAS.canvas|👓 VÝVOJÁŘ CANVAS]]

#claude_tech
