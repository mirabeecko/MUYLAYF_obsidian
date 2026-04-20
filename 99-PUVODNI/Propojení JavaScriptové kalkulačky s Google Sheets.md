---
tags:
  - scripting
  - apps-script
  - kalkulacka-fve
  - java_projects
project:
  - KALKULAČKA_FVE
  - VÝVOJÁŘ
up:
  - "[[📚 VÝVOJÁŘ MOC]]"
---
Propojení JavaScriptové kalkulačky s Google Sheets pro dynamické načítání cen je skvělý nápad! Toto lze realizovat pomocí Google Sheets API nebo přímo pomocí JavaScriptu s využitím Google Apps Script. Zde je stručný přehled postupu:

### Použití Google Sheets API

1. **Převod Excelového souboru na Google Sheets**: Nejprve musíte váš Excelový soubor nahrát do Google Sheets, což vám umožní s ním pracovat online.
2. **Nastavení Google Sheets API**: Musíte si vytvořit projekt v Google Cloud Console, povolit Google Sheets API a vytvořit pověření (credentials), které vám umožní přistupovat k tabulkám programově.
3. **Načítání dat v JavaScriptu**: Pomocí AJAX nebo Fetch API můžete v JavaScriptu načítat data přímo z Google Sheets s použitím vytvořených pověření.

### Použití Google Apps Script jako prostředníka

Google Apps Script může fungovat jako server, který komunikuje mezi Google Sheets a vaší webovou stránkou.

1. **Vytvoření skriptu**: Ve vašem listu Google Sheets vytvořte nový skript pomocí Nástrojů > Editor skriptů.
2. **Napsání funkce v Google Apps Script**: Vytvořte funkci, která načte potřebné hodnoty z listu.
3. **Publikování jako Web App**: Po napsání a testování skriptu jej publikujte jako web aplikaci.
4. **Načítání dat pomocí JavaScriptu**: Pomocí Fetch API nebo AJAX volání můžete načítat data z vaší Google Apps Script aplikace do vaší webové stránky nebo aplikace.

### Příklad kódu pro Google Apps Script


```javascript
function getCeny() {   var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("NázevListu");   var range = sheet.getRange("A1:B10"); // Přizpůsobte rozsah vašim potřebám   var values = range.getValues();      return JSON.stringify(values); }
```

Tento skript načte hodnoty z definovaného rozsahu v listu a převede je na JSON string, který lze snadno poslat a zpracovat v JavaScriptu na klientovi.

### Příklad volání Google Apps Script z JavaScriptu

```javascript
fetch('URL_VAŠÍ_WEB_APP')   .then(response => response.json())   .then(data => {     console.log(data); // Zde zpracujte načtená data   });
```

Nahraďte `'URL_VAŠÍ_WEB_APP'` URL adresou vaší publikované Google Apps Script Web App. Toto volání vám umožní získat data z vašeho Google Sheet.

V obou přístupech je klíčové správně nastavit oprávnění a zabezpečení, aby vaše data zůstala chráněná a aby byl přístup umožněn pouze oprávněným uživatelům.

#claude_reference
