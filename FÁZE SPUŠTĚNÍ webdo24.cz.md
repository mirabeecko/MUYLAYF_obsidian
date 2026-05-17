---
tags:
  - webdo24
  - webdo24_prompt
---
[[🧠 LLMs PROMPTY OPENAI]]
[[🧠 LLMs PROMPTY GEMINI]]

---
## FÁZE 1: Kvantitativní a kvalitativní výzkum (Data a hlava zákazníka)

_Tato fáze ti odpoví na otázku: Kdo je můj zákazník, co ho trápí a kde na mém současném webu utírají peníze?_

- [ ] **Nasazení analytických nástrojů:** Zkontroluj správné měření konverzí v GA4 a nasaď nástroj na nahrávání uživatelů (Hotjar nebo Microsoft Clarity).
    
- [ ] **Analýza nákupního trychtýře:** V GA4 se podívej na přehled _Purchase journey_. Identifikuj přesný krok (např. výběr dopravy, krok platby), kde odpadává nejvíce lidí.
    
- [ ] **Sběr zákaznických námitek:** Projdi e-maily ze zákaznické podpory a sepiš si top 10 nejčastějších dotazů, obav a důvodů, proč zákazníci váhají s nákupem.
    
- [ ] **Rychlé uživatelské testování:** Nech 3–5 lidí projít procesem nákupu na mobilním telefonu. Zaznamenej si místa, kde se zasekli nebo kde vyjádřili nejistotu.
    

---

## FÁZE 2: Strategie klíčových slov a shlukování (Příprava pro PPC)

_Vytvoření pevného základu pro kampaně, ze kterého bude vycházet i struktura prodejní stránky._

- [ ] **Export dat z PPC systémů:** Stáhni si historické reporty vyhledávacích dotazů z Google Ads a Skliku.
    
- [ ] **Očištění a shlukování (Clustering):** Pomocí LLM (např. GPT-4o) roztřiď relevantní klíčová slova do logických tématických skupin (reklamních sestav).
    
- [ ] **Tvorba seznamu vylučujících slov:** Identifikuj nerelevantní výrazy (např. _„zdarma“, „návod“, „wix“, „brigáda“_), které ti jen zbytečně pálí rozpočet, a připrav je pro hromadný import.
    

---

## FÁZE 3: Copywriting, psychologie webu a A/B varianty

_Využití Claude 3.5 Sonnet pro kompletní přetexování a přeskládání bloků webu na základě dat z Fáze 1 a 2._

- [ ] **Definice nového pořadí bloků (Struktura):** Navrhni logický flow stránky. (Např.: _Chytlavý nadpis s jasným přínosem -> Problém zákazníka -> Tvoje řešení -> Jak to funguje -> Sociální důkaz/Reference -> FAQ řešící strachy -> Výzva k akci_).
    
- [ ] **Implementace prvků důvěry (Trust Signals):** Do struktury webu prokazatelně zakomponuj prvky snižující strach (např. garance vrácení peněz, loga bezpečných platebních metod hned pod tlačítko „Koupit“, certifikace, reálné recenze).
    
- [ ] **Optimalizace pokladny (Checkout):** Uprav kroky platby podle osvědčených postupů (např. schování nepovinných polí, možnost nákupu bez registrace, vizuální indikátor postupu platby).
    
- [ ] **Příprava A/B variant textů:** Nech AI vygenerovat minimálně 2–3 odlišné verze hlavních prodejních nadpisů (Headline) a textů na tlačítkách (CTA) pro pozdější testování.
    

---

## FÁZE 4: Technická realizace a grafické úpravy webu

_Zavedení změn na web a příprava na ostrý provoz._

- [ ] **Grafický facelift a Micro-copy:** Zpřehledni design webu (dostatek volného prostoru, kontrastní CTA tlačítka) a doplň uklidňující texty k formulářům (např. _„Nespamujeme. Vaše data jsou v bezpečí“_).
    
- [ ] **Nahození změn na web:** Nasazení nové struktury, textů a upraveného košíku do produkce.
    
- [ ] **Nastavení A/B testování na webu:** Pokud máš dostatečnou návštěvnost, nasaď nástroj pro A/B testování (např. VWO, Google Optimize alternativy), abys mohl testovat připravené textové varianty.
    

---

## FÁZE 5: Hromadný import kampaní a spuštění (Google, Sklik, Facebook)

_Nalití připravených dat do reklamních platforem bez ručního klikání._

- [ ] **Příprava importních tabulek:** Naplň vygenerovanou strukturu z Google Sheets tvými konkrétními klíčovými slovy, sestavami a texty reklam.
    
- [ ] **Hromadný import do Google Ads:** Otevři desktopovou aplikaci _Google Ads Editor_, zkopíruj data z Excelu/Sheets a nahraj je hromadně do systému.
    
- [ ] **Hromadný import do Skliku:** Využij oficiální importér Skliku přes Excel šablonu přímo v rozhraní Seznamu.
    
- [ ] **Příprava a import A/B reklam pro Facebook (Meta):** Vyexportuj strukturu kampaně z Meta Ads Manageru, v Excelu naklonuj řádky s různými textovými variacemi (připravenými ve Fázi 3) a naimportuj soubor zpět.
    
- [ ] **Finální kontrola a Ostré spuštění:** Zkontroluj rozpočty, správnost odkazů (UTM parametry) a kampaně aktivuj.
    

---

## FÁZE 6: Vyhodnocování a iterace (Nekonečná smyčka)

- Kampaně běží, web sbírá data. Po 2–4 týdnech se vrať na **Fázi 1**, vyhodnoť úspěšnost A/B testů, očisti další klíčová slova a proces opakuj pro neustálé zvyšování konverzního poměru.