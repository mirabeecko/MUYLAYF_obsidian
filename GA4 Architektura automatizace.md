---
tags:
  - webdo24
  - webdo24_prompt
up:
---
## 1. Architektura řešení

Pro automatizaci potřebuješ propojit tvůj backend s Google Cloudem.

1. **Google Cloud Project:** Vytvoř si projekt a aktivuj **Google Analytics Admin API**.
    
2. **Service Account:** Vytvoř servisní účet s právy "Editor" na úrovni tvého hlavního GA4 účtu. Získáš **JSON klíč**, který bude tvůj agent používat k autorizaci.
    
3. **Backend Script (Python/Node.js):** Skript, který po vytvoření objednávky zákazníkem provede API volání.
    


---
## 2. Automatizační kroky (API Workflow)

### Krok A: Založení "Property" (Vlastnictví)

Místo celého nového účtu (Account) se obvykle zakládá nová **Property** pod tvým klientským účtem.

- **API endpoint:** `properties.create`
    
- **Vstup:** Název firmy zákazníka, časové pásmo a měna.
    

### Krok B: Vytvoření "Data Streamu"

Aby jsi získal měřící kód, musíš vytvořit stream pro web.

- **API endpoint:** `properties.dataStreams.create`
    
- **Vstup:** URL adresa webu zákazníka.
    
- **Výstup:** **Measurement ID** (např. `G-XXXXXXXXXX`).
    

### Krok C: Získání měřícího kódu (Snippetu)

Samotný JavaScript kód je fixní šablona, do které jen vložíš získané `Measurement ID`.

JavaScript

```
// Šablona pro tvého agenta:
const code = `<script async src="https://www.googletagmanager.com/gtag/js?id=${measurementId}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${measurementId}');
</script>`;
```

---

## 3. Integrace do hlavní workflow (Agentic Way)

Pokud používáš agenty z naší tabulky (např. **Devin** nebo **CrewAI**), implementace vypadá takto:

|**Fáze Workflow**|**Nástroj / Agent**|**Činnost**|
|---|---|---|
|**Trigger**|Webhook (Stripe/Make)|Nový zákazník zaplatil.|
|**Provisioning**|**SmolAgents** (Python)|Skript přes Google API založí Property a Data Stream.|
|**Injekce kódu**|**Devin.ai**|Přihlásí se na web zákazníka (nebo do gitu) a vloží GA4 kód do `<head>`.|
|**Verifikace**|**Nanobot (Local)**|Ověří, zda web odesílá hit (status 200) zpět do Analytics.|
|**Report**|**OpenAI Operator**|Pošle zákazníkovi e-mail s odkazem na jeho nový dashboard.|