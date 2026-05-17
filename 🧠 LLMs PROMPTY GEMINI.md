---
tags:
  - webdo24
  - webdo24_prompt
up:
  - "[[⭐️ webdo24.cz]]"
---
[[🧠 LLMs PROMPTY OPENAI]]


Tady je přesná taktická konfigurace rozdělená na specializované prompty pro konkrétní LLM. Každý model dostane roli, ve které dominuje, a vygeneruje ti čistá, reálná data.

Výstupy jsou navrženy tak, aby ti formátem přesně zapadly do struktury, kterou ti následně Apps Script nebo hromadný importér schroustá.

---

### Okruh témat 1: Kompletní hloubkový CRO audit, psychologie strachu a A/B texty

- **Vhodný model:** `Claude 3.5 Sonnet` (Anthropic)
    
- **Proč:** Má nejlepší cit pro přirozený konverzní copywriting, strukturování stránek a prodejní psychologii bez generování "AI vaty".
    

#### Prompt pro Claude 3.5 Sonnet:

Plaintext

```
Jsi špičkový světový expert na optimalizaci konverzního poměru (CRO) a Conversion Copywriting, vyškolený metodikou CXL Institute a Copyhackers. Tvým úkolem je vytvořit kompletní strukturu a textaci pro službu "WebDo24.cz" (web na klíč dodaný do 24 hodin).

Uživatelé mají přirozený strach, že produkt dodaný za 24 hodin bude nekvalitní nebo odfláknutý. Musíš tento strach kompletně rozbít.

Vygeneruj mi výstup rozdělený na 3 části:

1. POŘADÍ BLOKŮ NA LANDING PAGE:
Navrhni přesné prodejní flow (odshora dolů). U každého bloku uveď jeho cíl, konkrétní prodejní argument a jaký prvek důvěry (trust signal) nebo micro-copy tam musíme umístit pro snížení strachu.

2. MATICE PRO A/B TESTOVÁNÍ TEXTŮ:
Vytvoř tabulku se 4 sloupci: [Varianta] | [Hlavní nadpis (Headline)] | [Podnadpis / Popis] | [Výzva k akci (CTA na tlačítku)].
Připrav 3 radikálně odlišné komunikační úhly (Angles):
- Varianta A: Extrémní rychlost a doručení (útoč na hořící termíny).
- Varianta B: Absolutní bezstarostnost (vše vyřešíme za vás - texty, grafiku, hosting).
- Varianta C: Nulové riziko (fixní cena, 100% garance vrácení peněz).

3. SEKCE FAQ (ROZBITÍ NÁMITEK):
Navrhni 6 konkrétních otázek a odpovědí, které neodpovídají na obecné věci, ale přímo likvidují největší strachy klienta (např. "Jak můžete stihnout kvalitní web za 24 hodin?", "Co když se mi design nebude líbit?", "Budu si moci web sám upravovat?"). Odpovědi musí znít neprůstřelně, bezpečně a profesionálně.

Piš v češtině, nepoužívej klišé a prázdné fráze. Zaměř se na přímý tah na branku a tvrdé prodejní argumenty.
```

---

### Okruh témat 2: Výzkum chování v košíku a ideální tok platby (Checkout)

- **Vhodný model:** `Claude 3.5 Sonnet` nebo `Gemini Advanced`
    
- **Proč:** Dokážou perfektně syntetizovat rozsáhlé UX studie (Baymard Institute) a aplikovat je na konkrétní prodejní trychtýř digitální služby.
    

#### Prompt pro model:

Plaintext

```
Jsi hlavní UX výzkumník specializovaný na e-commerce a B2B prodejní trychtýře, opírající se o data z výzkumného institutu Baymard Institute. Tvým úkolem je navrhnout neprůstřelný a vysoce konverzní objednávkový proces (checkout) pro službu WebDo24.cz (objednávka a platba webu na klíč).

Vygeneruj detailní analýzu a doporučení ve formě tabulky s následujícími sloupci:
[Krok košíku / Prvek] | [Častá kritická chyba, která zabíjí konverzi] | [Ideální stav podle výzkumů (Best Practice)] | [Psychologický dopad na zákazníka].

Zaměř se na tato specifika:
1. Registrace (Povinná vs. Nákup jako host a jak vyřešit přihlašovací údaje na pozadí).
2. Počet formulářových polí (Jak minimalizovat tření, co odstranit a jak využít automatické doplňování přes IČO).
3. Inline validace chyb (Jak vizuálně a textově komunikovat chybu v reálném čase, aby uživatel neodešel).
4. Prvky důvěry v momentě platby (Jaké ikony, micro-copy a garance musí být viditelné přímo u zadávání karty/Apple Pay).
5. Zobrazení finální ceny (Jak zabránit opuštění košíku kvůli skrytým nákladům za hosting nebo DPH).

Výstup chci v přehledné a detailní formě, kterou mohu rovnou předat vývojáři webu jako zadání.
```

---

### Okruh témat 3: Výzkum klíčových slov, shlukování a vylučující slova (PPC)

- **Vhodný model:** `ChatGPT-4o` (OpenAI)
    
- **Proč:** GPT-4o exceluje v logickém strukturování dat, matematickém shlukování (clusteringu) a přípravě přesných syntaktických struktur pro tabulkové importy.
    

#### Prompt pro ChatGPT-4o:

Plaintext

```
Jsi Senior PPC Stratég pro Google Ads a Seznam Sklik. Tvým úkolem je vytvořit hloubkovou analýzu klíčových slov pro službu "WebDo24.cz" (rychlá tvorba webů do 24 hodin, prodejní landing pages, weby na klíč) a připravit ji pro hromadný import do Google Ads Editoru a Skliku.

Vygeneruj mi data rozdělená do 2 tabulek, které mohu zkopírovat:

TABULKA 1: IMPORTNÍ MATICE KAMPANÍ A SESTAV
Vytvoř tabulku se 4 sloupci přesně pro import: [Campaign] | [Ad Group] | [Keyword] | [Criterion Type].
- Rozděl klíčová slova do minimálně 4 úzce zaměřených reklamních sestav (Ad Groups): Např. "Rychla_Tvorba", "Web_Pro_Firmy", "Alternativy_Wix_Webnode", "AI_Tvorba".
- Pro každou sestavu vygeneruj reálná, vysoce relevantní klíčová slova v češtině.
- Každé klíčové slovo vlož ve dvou řádcích: jednou pro frázovou shodu (Phrase) a jednou pro přesnou shodu (Exact).
- Názvy kampaní zvol strukturou: [PPC] - Vyhledávání - WebDo24.

TABULKA 2: MASIVNÍ SEZNAM VYLUČUJÍCÍCH KLÍČOVÝCH SLOV
Vytvoř tabulku se 3 sloupci: [Vylučující slovo] | [Důvod vyloučení] | [Typ shody].
Vygeneruj minimálně 25 strategických vylučujících slov, která by mohla pálit rozpočet WebDo24.cz. Zaměř se na:
- Lidi hledající věci zdarma nebo DIY návody (wix šablony, jak udělat web sám, tutoriál, open source).
- Lidi hledající práci nebo vzdělání (brigáda, práce, kurz, student, diplomová práce).
- Technické dotazy (html kód, github, wordpress plugin atd.).

Výstup vygeneruj jako čisté tabulky oddělené tabulátorem nebo jako formátovaný text, který se po vložení do Excelu/Sheets sám rozdělí do buněk.
```

---

### Okruh témat 4: Návrh reklamních sestav a kreativ pro Facebook / Meta Ads

- **Vhodný model:** `ChatGPT-4o` nebo `Claude 3.5 Sonnet`
    
- **Proč:** Vyžaduje kombinaci marketingového trychtýře (Akvizice vs. Retargeting) a schopnosti napsat chytlavý text (Hook) s vysokým prodejním tlakem.
    

#### Prompt pro model:

Plaintext

```
Jsi špičkový Performance Marketing Manažer se zaměřením na Facebook a Instagram (Meta Ads). Tvým úkolem je navrhnout strukturu kampaní pro službu WebDo24.cz a napsat konkrétní textové reklamy pro A/B testování kreativ.

Připrav výstup přímo ve formě tabulky pro hromadný import do Meta Ads Manageru s těmito sloupci:
[Campaign Name] | [Ad Set Name] | [Targeting / Audience] | [Ad Name] | [Primary Text] | [Headline] | [CTA Button]

Vytvoř strukturu pro 2 typy kampaní:
1. AKVIZICE (Studené publikum - Podnikatelé, OSVČ, Majitelé firem): Naimportuj sem minimálně 3 různé varianty reklamních textů postavené na různých marketingových "háčcích" (Rychlost doručení, Ušetřené starosti, Srovnání s nefunkční agenturou).
2. RETARGETING (Teplé publikum - Návštěvníci webu za 30 dní, kteří neodeslali objednávku): Text se musí zaměřit výhradně na rozbíjení strachu, garanci vrácení peněz a urgenci.

Texty reklam (Primary Text) napiš kompletně, žádné zástupné texty. Používej odrážky, krátké úderné věty a psychologii přímého prodeje. Headline musí mít maximálně 50 znaků a úderně doplňovat hlavní text.
```

---

### Jak to teď celé spojíš do jednoho výsledku:

1. **Spusť jednotlivé prompty** v příslušných LLM.
    
2. Jakmile ti modely vygenerují reálná data (texty pro web, importní tabulky pro Google Ads, Sklik a Facebook), otevři si svůj Google Sheet.
    
3. Vlož do něj výše uvedený kompletní **Apps Script** z předchozího kroku (ten, který má v názvu `vytvorKomplexniPpcCroStrategiiWebdo24`).
    
4. Skript ti jedním kliknutím připraví perfektně naformátované listy, sloupce a barevné rozvržení.
    
5. Ty pak jen vezmeš reálné texty a tabulky z chatů s AI a zkopíruješ je přesně do buněk na odpovídajících listech (`A/B Testování Textů`, `IMPORT GOOGLE ADS`, `IMPORT FACEBOOK`...).
    

Tím získáš v jednom jediném souboru kompletní taktický manuál s ostrými daty, připravený k okamžitému exportu do platforem. Můžeme začít prvním promptem!