---
tags:
  - webdo24
  - webdo24_prompt
up:
  - "[[⭐️ webdo24.cz]]"
---



Ano — udělal bych z toho opakovatelnou pipeline: každý model vrátí výstup ve stejném formátu, výstupy se uloží, validují a finální „master model“ z nich složí jeden akční plán. Připravím ti rovnou použitelnou verzi workflow.

Ai Cro Ppc Workflow Webdo24

# AI CRO/PPC Workflow pro Webdo24.cz

Cíl: vytvořit workflow, které vezme reálná data z analytiky, PPC systémů, zákaznických dotazů a UX testování, pošle je do specializovaných LLM modelů a nakonec z nich složí jeden velký strategický výstup: CRO plán, PPC strukturu, copywriting, UX úpravy, A/B testy a implementační roadmapu.

---

# 0. ZÁKLADNÍ PRINCIP

Workflow není jeden prompt. Je to sada specializovaných agentů.

Každý agent dostane:

- jasný vstup
- konkrétní roli
- konkrétní úkol
- pevnou strukturu výstupu
- JSON blok pro další zpracování

Finální agent pak sloučí všechny odpovědi do jednoho master dokumentu.

---

# 1. DOPORUČENÉ MODELY

|Modul|Model|Důvod|
|---|---|---|
|Funnel analytika|GPT-5 / o3|analytické uvažování, práce s daty|
|Psychologie zákazníka|Claude Opus|hluboká interpretace motivací a námitek|
|Keyword clustering|GPT-5|strukturování a klasifikace dat|
|Landing page copy|Claude Sonnet|nejlepší poměr kvalita / rychlost copywritingu|
|UX + checkout|GPT-5|logika, technické CRO, formuláře|
|Meta Ads angles|Gemini 2.5 Pro / Claude Sonnet|kreativní diverzita reklamních konceptů|
|Master synthesis|GPT-5|spojení výstupů do akční strategie|

---

# 2. VSTUPNÍ DATA

Před spuštěním workflow připrav tyto soubory:

## A) Analytics export

Soubor: `analytics_export.csv` nebo `analytics_summary.md`

Obsah:

- GA4 funnel
- návštěvnost podle zdrojů
- konverzní poměr
- device split
- bounce / engagement
- purchase journey
- abandonment kroky
- top landing pages
- top exit pages

## B) PPC search terms

Soubor: `google_ads_search_terms.csv` Soubor: `sklik_search_terms.csv`

Obsah:

- search term
- impressions
- clicks
- cost
- conversions
- conversion value
- CTR
- CPC
- campaign
- ad group

## C) Zákaznické námitky

Soubor: `customer_objections.md` nebo `.csv`

Obsah:

- dotazy zákazníků
- e-maily podpory
- chat zprávy
- komentáře z formulářů
- nejčastější obavy

## D) UX poznámky

Soubor: `ux_testing_notes.md`

Obsah:

- poznámky z testování 3–5 lidí
- kde se zasekli
- co nechápali
- co jim přišlo nedůvěryhodné
- problémy na mobilu

## E) Aktuální web copy

Soubor: `current_website_copy.md`

Obsah:

- hero section
- nadpisy
- CTA
- FAQ
- texty v checkoutu
- pricing
- reference

## F) Produktový kontext

Soubor: `product_context.md`

Obsah:

- co Webdo24.cz nabízí
- cena
- balíčky
- cílovky
- garance
- dodací lhůty
- proces dodání
- odlišnosti od konkurence

---

# 3. DATOVÁ STRUKTURA PRO KAŽDÝ MODUL

Každý modul musí vracet tento formát:

{

"module_name": "",

"model_used": "",

"input_sources": [],

"key_findings": [],

"problems": [],

"recommendations": [],

"quick_wins": [],

"high_impact_actions": [],

"risks": [],

"open_questions": [],

"implementation_tasks": [],

"ab_test_ideas": [],

"priority_score": 0

}

Díky tomu půjde všechno sloučit.

---

# 4. MODUL 1 — FUNNEL ANALYTIKA

## Model

GPT-5 / o3

## Vstupy

- `analytics_export.csv`
- `analytics_summary.md`
- případně screenshoty z GA4

## Prompt

Jsi senior CRO analytik specializovaný na SaaS, e-commerce a lead-gen landing pages.

  

Analyzuj přiložená data z GA4 a analytiky.

  

VSTUPY:

- GA4 funnel data

- traffic sources

- device split

- landing pages

- checkout / purchase journey

- conversion data

  

CÍL:

Najít, kde web Webdo24.cz ztrácí peníze a proč lidé nedokončují konverzi.

  

Zaměř se na:

1. největší drop-off místa

2. rozdíly mobile vs desktop

3. kvalitu trafficu podle zdroje

4. slabá místa landing pages

5. checkout friction

6. chybějící měření

7. quick wins

  

Výstup vrať ve dvou částech:

  

# A) Lidsky čitelná analýza

- hlavní zjištění

- problém

- pravděpodobná příčina

- dopad na konverze

- doporučená oprava

- priorita 1–10

  

# B) JSON pro další zpracování

Použij přesně tuto strukturu:

  

{

"module_name": "funnel_analytics",

"model_used": "GPT-5/o3",

"input_sources": ["analytics_export", "analytics_summary"],

"key_findings": [],

"problems": [

{

"problem": "",

"evidence": "",

"likely_cause": "",

"impact": "",

"priority": 0

}

],

"recommendations": [],

"quick_wins": [],

"high_impact_actions": [],

"risks": [],

"open_questions": [],

"implementation_tasks": [],

"ab_test_ideas": [],

"priority_score": 0

}

  

Nepiš obecné rady. Každé tvrzení opři o data nebo jasně označ jako hypotézu.

---

# 5. MODUL 2 — PSYCHOLOGIE ZÁKAZNÍKA

## Model

Claude Opus

## Vstupy

- `customer_objections.md`
- `product_context.md`
- `current_website_copy.md`
- poznámky z UX testů

## Prompt

Jsi elitní behavioral marketing strategist.

1. hlavní strachy zákazníka

2. mentální bloky

3. nedůvěru k nabídce „web do 24 hodin“

4. otázky, které zákazník má před nákupem

5. rozdíl mezi tím, co prodáváme, a tím, co zákazník skutečně kupuje

6. nejsilnější positioning angles

7. trust signály s největším dopadem

8. FAQ, které musí být na webu

9. slova/fráze, kterým se vyhnout

  

Výstup vrať ve dvou částech:

  

# A) Psychologická analýza

Piš konkrétně, bez klišé.

  

# B) JSON pro další zpracování

  

{

"module_name": "customer_psychology",

"model_used": "Claude Opus",

"input_sources": ["customer_objections", "product_context", "current_website_copy", "ux_testing_notes"],

"key_findings": [],

"customer_fears": [],

"mental_blocks": [],

"trust_gaps": [],

"positioning_angles": [],

"recommended_trust_signals": [],

"faq_questions": [],

"copy_phrases_to_use": [],

"copy_phrases_to_avoid": [],

"recommendations": [],

"quick_wins": [],

"high_impact_actions": [],

"risks": [],

"open_questions": [],

"implementation_tasks": [],

"ab_test_ideas": [],

"priority_score": 0

}

---

# 6. MODUL 3 — KEYWORD CLUSTERING

## Model

GPT-5

## Vstupy

- `google_ads_search_terms.csv`
- `sklik_search_terms.csv`

## Prompt

Jsi senior PPC strategist specializovaný na Google Ads a Sklik.

  

Analyzuj export vyhledávacích dotazů.

  

CÍL:

Vytvořit čistou PPC strukturu pro Webdo24.cz, která bude odpovídat intentu zákazníka a landing page strategii.

  

U každého search termu urči:

- intent

- fázi nákupního rozhodování

- relevanci pro Webdo24.cz

- pravděpodobnost konverze

- jestli patří do kampaně, nebo do negativních slov

- doporučenou reklamní sestavu

- doporučený landing page angle

  

Kategorie intentu:

- urgent buyer

- high commercial intent

- price research

- service research

- informational

- competitor

- irrelevant

- negative keyword

  

Vytvoř:

1. reklamní sestavy

2. seznam klíčových slov

3. seznam vylučujících slov

4. doporučené landing page angles

5. doporučené headline/CTA pro každou sestavu

6. rozdělení pro Google Ads a Sklik

  

Výstup vrať jako:

  

# A) Tabulky

- keyword clusters

- negative keywords

- ad group structure

- landing page mapping

  

# B) JSON

  

{

"module_name": "keyword_clustering",

"model_used": "GPT-5",

"input_sources": ["google_ads_search_terms", "sklik_search_terms"],

"key_findings": [],

"keyword_clusters": [

{

"cluster_name": "",

"intent": "",

"keywords": [],

"recommended_ad_group": "",

"landing_page_angle": "",

"headline_ideas": [],

"cta_ideas": [],

"priority": 0

}

],

"negative_keywords": [],

"budget_killers": [],

"high_intent_keywords": [],

"recommendations": [],

"quick_wins": [],

"high_impact_actions": [],

"risks": [],

"open_questions": [],

"implementation_tasks": [],

"ab_test_ideas": [],

"priority_score": 0

}

---

# 7. MODUL 4 — LANDING PAGE COPY

## Model

Claude Sonnet

## Vstupy

- výstup z psychologie zákazníka
- výstup z keyword clusteringu
- aktuální copy webu
- produktový kontext

## Prompt

Jsi senior direct-response copywriter specializovaný na conversion landing pages.

- aktuální texty webu

- produktový kontext

  

Vytvoř:

1. kompletní strukturu homepage / landing page

2. hero sekci

3. problem section

4. solution section

5. how it works

6. trust section

7. pricing/friction reduction section

8. FAQ

9. final CTA

10. 5 headline variant

11. 5 CTA variant

12. 3 positioning varianty

13. mikrocopy pro formuláře a checkout

  

U každé sekce vysvětli:

- proč tam je

- jakou námitku řeší

- jaký psychologický efekt má

  

Výstup:

  

# A) Landing page copy

Kompletní návrh textů.

  

# B) JSON

  

{

"module_name": "landing_page_copy",

"model_used": "Claude Sonnet",

"input_sources": ["customer_psychology", "keyword_clustering", "current_website_copy", "product_context"],

"key_findings": [],

"page_structure": [],

"hero_variants": [],

"cta_variants": [],

"section_copy": [],

"faq": [],

"microcopy": [],

"positioning_variants": [],

"recommendations": [],

"quick_wins": [],

"high_impact_actions": [],

"risks": [],

"open_questions": [],

"implementation_tasks": [],

"ab_test_ideas": [],

"priority_score": 0

}

---

# 8. MODUL 5 — UX + CHECKOUT CRO

## Model

GPT-5

## Vstupy

- `ux_testing_notes.md`
- výstup z funnel analytiky
- aktuální checkout flow
- aktuální web copy

## Prompt

Jsi senior UX/CRO expert specializovaný na checkout optimalizaci.

  

Analyzuj UX a checkout Webdo24.cz.

  

CÍL:

Snížit friction, zvýšit důvěru a zlepšit dokončení objednávky.

  

Zaměř se na:

1. mobilní UX

2. formuláře

3. CTA hierarchy

4. pricing clarity

5. trust prvky u tlačítek

6. checkout flow

7. zbytečná pole

8. kognitivní zátěž

9. místa, kde zákazník začne pochybovat

10. uklidňující microcopy

  

Navrhni:

- ideální strukturu checkoutu

- optimální pořadí kroků

- které informace odstranit

- které informace přidat

- kde umístit trust signály

- jak vypadá ideální mobilní flow

  

Výstup:

  

# A) UX/CRO audit

  

# B) JSON

  

{

"module_name": "ux_checkout_cro",

"model_used": "GPT-5",

"input_sources": ["ux_testing_notes", "funnel_analytics", "current_website_copy", "checkout_flow"],

"key_findings": [],

"friction_points": [],

"checkout_issues": [],

"mobile_issues": [],

"recommended_checkout_flow": [],

"trust_signal_placements": [],

"microcopy_recommendations": [],

"recommendations": [],

"quick_wins": [],

"high_impact_actions": [],

"risks": [],

"open_questions": [],

"implementation_tasks": [],

"ab_test_ideas": [],

"priority_score": 0

}

---

# 9. MODUL 6 — META ADS A REKLAMNÍ ANGLES

## Model

Gemini 2.5 Pro / Claude Sonnet

## Vstupy

- psychologie zákazníka
- landing page copy
- produktový kontext
- Meta Ads historická data, pokud existují

## Prompt

Jsi senior Meta Ads performance strategist.

  

Vytvoř reklamní strategii pro Webdo24.cz.

  

Produkt:

Web do 24 hodin pro malé firmy, lokální služby, podnikatele, restaurace a řemeslníky.

  

CÍL:

Vytvořit sadu reklamních úhlů a variant pro Meta Ads.

  

Použij vstupy:

- psychologie zákazníka

- námitky

- landing page copy

- produktový kontext

- historická performance data, pokud jsou dostupná

  

Vytvoř:

1. 20 hooks

2. 10 video ad concepts

3. 10 static ad concepts

4. 5 retargeting angles

5. 5 trust-focused ads

6. 5 urgency ads

7. 5 before/after concepts

8. U každé reklamy uveď cílovku, emoci, fázi awareness a CTA

  

Výstup:

  

# A) Meta Ads koncepty

  

# B) JSON

  

{

"module_name": "meta_ads_angles",

"model_used": "Gemini 2.5 Pro / Claude Sonnet",

"input_sources": ["customer_psychology", "landing_page_copy", "product_context", "meta_ads_data"],

"key_findings": [],

"hooks": [],

"video_concepts": [],

"static_concepts": [],

"retargeting_angles": [],

"trust_ads": [],

"urgency_ads": [],

"before_after_concepts": [],

"recommendations": [],

"quick_wins": [],

"high_impact_actions": [],

"risks": [],

"open_questions": [],

"implementation_tasks": [],

"ab_test_ideas": [],

"priority_score": 0

}

---

# 10. MODUL 7 — A/B TEST DESIGN

## Model

GPT-5 / Claude Sonnet

## Vstupy

- funnel analytika
- psychologie zákazníka
- landing page copy
- UX audit

## Prompt

Jsi CRO experimentation strategist.

  

Vstupy:

- funnel analytika

- psychologie zákazníka

- landing page copy

- UX/CRO audit

  

CÍL:

Vytvořit testovací plán, který maximalizuje šanci na zvýšení konverzního poměru.

  

U každého testu uveď:

- hypotézu

- co testujeme

- proč to může fungovat

- očekávaný dopad

- technická náročnost

- priorita

- metrika úspěchu

- minimální potřebná návštěvnost, pokud lze odhadnout

  

Kategorie testů:

1. hero headline

2. CTA

3. trust prvky

4. pricing

5. checkout

6. FAQ

7. social proof

8. urgency

9. garance

10. formuláře

  

Výstup:

  

# A) A/B testing roadmap

  

# B) JSON

  

{

"module_name": "ab_testing_roadmap",

"model_used": "GPT-5 / Claude Sonnet",

"input_sources": ["funnel_analytics", "customer_psychology", "landing_page_copy", "ux_checkout_cro"],

"key_findings": [],

"tests": [

{

"test_name": "",

"hypothesis": "",

"variant_a": "",

"variant_b": "",

"metric": "",

"expected_impact": "",

"implementation_difficulty": "",

"priority": 0

}

],

"quick_wins": [],

"high_impact_actions": [],

"risks": [],

"open_questions": [],

"implementation_tasks": [],

"priority_score": 0

}

---

# 11. MODUL 8 — MASTER SYNTHESIS

## Model

GPT-5

## Vstupy

Všechny JSON výstupy z modulů 1–7.

## Prompt

Jsi hlavní CRO/PPC strategist.

# 3. Prioritizovaná roadmapa

Rozděl na:

- dnes / zítra

- tento týden

- 14 dní

- 30 dní

- 90 dní

  

# 4. CRO plán

- homepage

- landing pages

- checkout

- trust prvky

- microcopy

- FAQ

  

# 5. PPC plán

- Google Ads struktura

- Sklik struktura

- kampaně

- reklamní sestavy

- negativní klíčová slova

- landing page mapping

  

# 6. Meta Ads plán

- nejlepší hooks

- nejlepší reklamní úhly

- retargeting

- creative testing

  

# 7. Copywriting výstupy

- finální hero návrhy

- CTA

- FAQ

- microcopy

- trust texty

  

# 8. A/B testing roadmap

- testy podle priority

- hypotézy

- metriky

  

# 9. Implementační checklist

U každého úkolu uveď:

- název

- popis

- odpovědná role

- odhad času

- priorita

- očekávaný dopad

  

# 10. Rizika a co neměřit špatně

  

# 11. Finální doporučení

Buď konkrétní. Neopisuj výstupy. Syntetizuj je.

Odstraň duplicity.

Když se moduly rozcházejí, vyber lepší doporučení a vysvětli proč.

  

Na konci vrať i JSON:

  

{

"module_name": "master_synthesis",

"highest_priority_actions": [],

"roadmap": {

"today_tomorrow": [],

"this_week": [],

"two_weeks": [],

"thirty_days": [],

"ninety_days": []

},

"cro_plan": [],

"ppc_plan": [],

"meta_plan": [],

"copy_outputs": [],

"ab_tests": [],

"implementation_checklist": [],

"risks": [],

"expected_impact": ""

}

---

# 12. AUTOMATIZAČNÍ WORKFLOW V N8N / MAKE

## Varianta A — ruční low-code workflow

1. Nahraješ vstupní soubory do Google Drive.
2. Google Sheets obsahuje seznam modulů.
3. Každý řádek = jeden LLM úkol.
4. n8n načte prompt + vstupní soubory.
5. Pošle request do OpenRouter / OpenAI / Anthropic / Google AI.
6. Výstup uloží do složky `/outputs`.
7. JSON výstup uloží do jedné master tabulky.
8. Po dokončení všech modulů spustí Master Synthesis.
9. Finální výstup uloží jako Google Doc / Markdown / PDF.

## Varianta B — poloautomat v ChatGPT

1. Připravíš vstupní data.
2. Pošleš mi soubory sem.
3. Já postupně spustím analýzy nad daty v rámci jedné konverzace.
4. Výstupy budu držet ve stejné struktuře.
5. Nakonec z toho složím jeden master dokument.

Tahle varianta je nejrychlejší pro první iteraci.

## Varianta C — plně automatizovaná pipeline

Použije se:

- Google Drive
- Google Sheets
- n8n
- OpenRouter
- OpenAI API
- Anthropic API
- Google Gemini API
- Notion nebo Google Docs

Výhoda: Opakovatelné každý měsíc.

Nevýhoda: První setup zabere více času.

---

# 13. STRUKTURA GOOGLE SHEET PRO WORKFLOW

Tabulka: `AI_CRO_PPC_Workflow`

Sloupce:

|   |   |   |   |   |   |   |   |   |
|---|---|---|---|---|---|---|---|---|
|module_id|module_name|model|input_files|prompt|status|output_file|json_output|priority|
|1|funnel_analytics|GPT-5/o3|analytics_export.csv|...|pending|||10|
|2|customer_psychology|Claude Opus|customer_objections.md|...|pending|||10|
|3|keyword_clustering|GPT-5|search_terms.csv|...|pending|||9|
|4|landing_page_copy|Claude Sonnet|psychology + keywords|...|pending|||9|
|5|ux_checkout_cro|GPT-5|ux_notes + funnel|...|pending|||9|
|6|meta_ads_angles|Gemini/Claude|psychology + copy|...|pending|||7|
|7|ab_testing_roadmap|GPT-5/Claude|all CRO outputs|...|pending|||8|
|8|master_synthesis|GPT-5|all JSON outputs|...|pending|||10|

---

# 14. MINIMÁLNÍ VERZE, KTEROU MŮŽEME SPUSTIT HNED

Pro první ostrý běh nepotřebuješ všechno.

Stačí dodat:

1. aktuální texty webu
2. export search terms z Google Ads / Skliku
3. základní GA4 čísla
4. 10–30 zákaznických námitek nebo dotazů
5. popis produktu, ceny a cílovky

Z toho lze vytvořit:

- positioning
- PPC strukturu
- landing page copy
- FAQ
- trust prvky
- A/B test plán
- roadmapu

---

# 15. PRVNÍ BALÍČEK DAT, KTERÝ MÁŠ PŘIPRAVIT

## Soubor 1: product_context.md

Název produktu:

  

Co zákazník dostane:

  

Cena:

  

Balíčky:

  

Garance:

  

Dodání:

  

Proces:

  

Cílové skupiny:

  

Největší výhody:

  

Největší slabiny / omezení:

  

Konkurenti:

  

Co nechceme slibovat:

  

Co chceme zdůraznit:

## Soubor 2: current_website_copy.md

Hero headline:

  

Subheadline:

  

CTA:

  

Sekce webu:

  

FAQ:

  

Pricing texty:

  

Checkout texty:

  

Reference:

## Soubor 3: customer_objections.md

1. Dotaz / námitka:

Kontext:

Jak často se objevuje:

  

2. Dotaz / námitka:

Kontext:

Jak často se objevuje:

## Soubor 4: analytics_summary.md

Měsíční návštěvnost:

  

Konverzní poměr:

  

Top zdroje trafficu:

  

Mobile vs desktop:

  

Největší drop-off:

  

Top landing pages:

  

Top exit pages:

  

Počet objednávek / leadů:

  

Průměrná hodnota objednávky:

## Soubor 5: search_terms.csv

Sloupce:

- platform
- campaign
- ad_group
- search_term
- impressions
- clicks
- cost
- conversions
- conversion_value
- ctr
- cpc

---

# 16. FINÁLNÍ VÝSTUP, KTERÝ WORKFLOW VYROBÍ

Výsledkem bude jeden master dokument:

`Webdo24_CRO_PPC_Master_Strategy.md`

Obsah:

1. Executive summary
2. Diagnóza problému
3. Zákaznická psychologie
4. Nový positioning
5. PPC struktura Google Ads
6. PPC struktura Sklik
7. Meta Ads angles
8. Nová landing page struktura
9. Finální copywriting návrhy
10. Checkout optimalizace
11. Trust prvky
12. FAQ
13. A/B testing roadmapa
14. Implementační checklist
15. Časový plán
16. Prioritizace podle dopadu
17. Rizika
18. Další iterace

---

# 17. NEJLEPŠÍ PRAKTICKÝ POSTUP

Doporučený postup pro první iteraci:

1. Nejdřív spustit psychologii zákazníka.
2. Potom keyword clustering.
3. Potom landing page copy.
4. Potom UX/checkout.
5. Nakonec master synthesis.

Funnel analytiku doplnit hned, jak budou k dispozici solidní GA4 data.

Meta Ads nechat až po novém positioningu a landing page, jinak bude kreativa stát na slabém základu.

---

# 18. PRIORITA PRO WEBdo24.cz

Nejvyšší priorita pravděpodobně bude:

1. Vysvětlit nabídku během prvních 5 sekund.
2. Zvýšit důvěru v „web do 24 hodin“.
3. Ukázat konkrétní výsledek, ne technologii.
4. Oddělit cílovky podle intentu.
5. Zjednodušit objednávku.
6. Přidat silné FAQ řešící strachy.
7. Připravit landing pages podle PPC clusterů.
8. Zpřesnit negativní keywords.
9. Testovat headline a trust prvky.
10. Teprve potom škálovat rozpočty.

---

# 19. CO MŮŽEME UDĚLAT JAKO DALŠÍ KROK

Nejrychlejší cesta:

1. Dodat základní produktový kontext.
2. Dodat aktuální texty webu.
3. Dodat export search terms.
4. Dodat zákaznické námitky.

Pak lze spustit první verzi workflow ručně přímo v této konverzaci a vytvořit první master výstup.

Přemýšlení po dobu 1m 19s

Ano. Vytvořil jsem ti kompletní workflow do canvasu.

Reálně to půjde udělat dvěma způsoby:

1. **Ručně tady v chatu** — nahraješ data, já spustím jednotlivé analýzy a složím master výstup.
2. **Automatizovaně přes n8n / Make / OpenRouter** — workflow se bude dát opakovat každý měsíc.

Nejlepší další krok: pošli mi první balíček dat:

- aktuální texty webu
- popis produktu/ceny/balíčků
- export search terms z Google Ads/Skliku
- GA4 základní čísla
- zákaznické dotazy/námitky

Pak z toho uděláme první ostrý master výstup.