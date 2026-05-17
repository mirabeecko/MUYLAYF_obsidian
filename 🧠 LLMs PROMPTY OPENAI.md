---
tags:
  - webdo24
  - webdo24_prompt
up:
  - "[[⭐️ webdo24.cz]]"
---
[[🧠 LLMs PROMPTY GEMINI]]


[[🧠AI CRO,PPC Workflow  webdo24.cz]]
# CELKOVÁ ARCHITEKTURA

```
DATA + ANALYTIKA    ↓PSYCHOLOGIE + POSITIONING    ↓KEYWORDS + PPC    ↓COPYWRITING + LANDING PAGE    ↓UX + CHECKOUT    ↓A/B TESTY    ↓IMPLEMENTACE    ↓ITERACE
```

---

# IDEÁLNÍ MODELY PRO JEDNOTLIVÉ ÚKOLY

|Oblast|Nejlepší model|
|---|---|
|Analytika + funnel|GPT-5 / o3|
|UX audit|Claude Opus|
|Copywriting|Claude Sonnet|
|PPC clustering|GPT-5|
|Psychologie zákazníka|Claude Opus|
|Facebook ads|Gemini 2.5 Pro|
|Strukturování dat|GPT-5|
|A/B varianty|Claude Sonnet|
|Technické CRO|GPT-5|
|Competitor research|Gemini|
|Shrnutí a spojování|GPT-5|

---

# MASTER SYSTÉM

Každý prompt musí vracet:

- STRICT STRUCTURE
- JSON/tabulky
- jasné sekce
- bez omáčky
- připravené pro další LLM

Jinak to nepůjde spojit.

---

# OKRUH 1 — ANALYTIKA + FUNNEL

## MODEL:

GPT-5 / o3

---

## CÍL:

Najít:

- kde umírají konverze
- kde je friction
- kde je nedůvěra
- co rozbíjí checkout

---

## PROMPT

```
Jsi senior CRO analytik specializovaný na SaaS, AI služby a high-conversion landing pages.Analyzuj:- GA4 data- funnel- checkout flow- device split- bounce points- abandonment- source quality- behavior flowCíl:Najít největší překážky konverzí.Vrať výstup přesně v této struktuře:# 1. Největší problémy funnelu- problém- dopad- pravděpodobná příčina- priorita (1-10)# 2. Kritická místa nedůvěry- kde vzniká- proč- jak se projevuje# 3. Největší friction body- formuláře- checkout- pricing- CTA- navigace# 4. Mobilní UX problémy- konkrétní problém- očekávaný dopad# 5. Doporučené rychlé opravy- quick wins- expected impact# 6. Dlouhodobé optimalizacePiš extrémně konkrétně.Nepiš obecné rady.Každý problém vysvětli psychologicky i technicky.
```

---

# OKRUH 2 — PSYCHOLOGIE ZÁKAZNÍKA

## MODEL:

Claude Opus

---

## CÍL:

Pochopit:

- emoce
- strach
- důvěru
- motivace
- objections

---

## PROMPT

```
Jsi elitní behavioral marketing strategist.Analyzuj produkt Webdo24.cz.Produkt:AI + lidé vytvoří funkční web do 24 hodin.Cena:[doplň]Cílové skupiny:- řemeslníci- malé firmy- restaurace- lokální služby- podnikateléNajdi:# 1. Největší strachy zákazníka# 2. Největší mentální bloky# 3. Proč lidé nevěří nabídce# 4. Co musí web komunikovat během prvních 5 sekund# 5. Jak vytvořit pocit:- bezpečí- důvěry- jednoduchosti- rychlosti- jistoty# 6. Co by dramaticky zvýšilo důvěru# 7. Jaké trust prvky mají nejvyšší psychologický dopad# 8. Co zákazník skutečně nekupuje(ne web, ale výsledek)# 9. Jaké positioning angles mají největší potenciálBuď brutálně konkrétní.Ignoruj klišé marketing.Piš jako člověk, který rozumí lidskému mozku.
```

---

# OKRUH 3 — KEYWORD CLUSTERING

## MODEL:

GPT-5

---

## CÍL:

Připravit:

- reklamní sestavy
- intent
- landing pages
- search structure

---

## PROMPT

```
Jsi PPC strategist specializovaný na high-converting search campaigns.Dostaneš export search terms.Tvůj úkol:# 1. Rozdělit keywords podle intentu:- hot intent- warm intent- cold intent- informational- competitor- urgent buyer# 2. Vytvořit reklamní sestavy# 3. Navrhnout:- headlines- CTA- landing page angle# 4. Identifikovat:- negativní keywords- low-buying intent- budget killers# 5. Určit:- které keywords mají nejvyšší conversion potential# 6. Vytvořit:- ideální strukturu Google Ads účtuVýstup:TABULKY + JSON.Každé keyword přiřaď:- intent- CPC quality- conversion probability- landing page relevance
```

---

# OKRUH 4 — LANDING PAGE COPY

## MODEL:

Claude Sonnet

---

## CÍL:

Přepsat homepage pro maximální konverze.

---

## PROMPT

```
Jsi senior direct-response copywriter.Přepiš homepage Webdo24.cz.Cíl:Maximální konverze z PPC trafficu.Produkt:Web do 24 hodin.Použij:- behavioral psychology- clarity- trust- friction reduction- high-converting SaaS structureVytvoř:# HERO SECTION- headline- subheadline- CTA- trust strip# PROBLEM SECTION# SOLUTION SECTION# HOW IT WORKS# TRUST SECTION# FAQ# FINAL CTAVygeneruj:- 5 variant headline- 5 variant CTA- 3 různé positioning approachesPiš:- jasně- moderně- sebevědomě- bez korporátní omáčky- bez AI buzzwordsKaždou sekci vysvětli:- proč funguje psychologicky
```

---

# OKRUH 5 — UX + CHECKOUT

## MODEL:

GPT-5

---

## PROMPT

```
Jsi senior UX/CRO expert.Analyzuj checkout flow Webdo24.cz.Najdi:- friction- cognitive overload- unnecessary thinking- trust issues- form problems- mobile UX issuesNavrhni:- ideální checkout flow- optimální počet kroků- nejlepší pořadí informací- nejlepší trust placements- nejlepší CTA hierarchyCíl:Minimalizace abandonment rate.Výstup:- wireframe structure- UX recommendations- priority fixes- expected impact
```

---

# OKRUH 6 — META ADS

## MODEL:

Gemini 2.5 Pro

---

## PROMPT

```
Jsi Meta Ads performance strategist.Vytvoř:- hooks- ad angles- UGC concepts- emotional triggers- scroll-stopping ideasProdukt:Web do 24 hodin.Cílovka:malé firmy, podnikatelé, lokální služby.Vytvoř:# 1. 20 hooks# 2. 10 video ad concepts# 3. 10 static ad concepts# 4. 5 retargeting angles# 5. 5 urgency angles# 6. 5 trust-focused adsU každého:- emotion- target psychology- awareness level- ideal audienceNepiš generické reklamy.
```

---

# OKRUH 7 — MASTER SYNTHESIS

## MODEL:

GPT-5

Tohle je nejdůležitější část.

---

## PROMPT

```
Jsi CRO/PPC lead strategist.Dostaneš:- analytiku- keyword research- psychological analysis- UX audit- copywriting- PPC structure- Meta conceptsTvůj úkol:# 1. Sloučit vše do jedné strategie# 2. Prioritizovat:- highest ROI tasks- quick wins- biggest bottlenecks# 3. Vytvořit:- implementační roadmapu- priority matrix- testing roadmap# 4. Navrhnout:- co implementovat první- co testovat- co odložit# 5. Vytvořit:- finální CRO systém- PPC systém- scaling strategiiVýstup:jasný akční plán.Ne obecné rady.Konkrétní kroky.
```

---

# CO JE KRITICKY DŮLEŽITÉ

Každý výstup:

- ukládat strukturovaně
- ideálně markdown + JSON
- stejný naming
- stejné sekce

Jinak to později nespojíš.

---

# DOPORUČENÁ INFRASTRUKTURA

|Úkol|Nástroj|
|---|---|
|Data storage|Notion / Obsidian|
|Structured outputs|JSON|
|Pipeline|n8n|
|AI orchestration|OpenRouter|
|Tracking|GA4 + Clarity|
|PPC exporty|Google Sheets|
|A/B tracking|PostHog|

---

# CO BYCH UDĚLAL TEĎ HNED

## KROK 1

Vyexportovat:

- GA4
- Google Ads search terms
- Sklik search terms
- Meta performance
- heatmapy

## KROK 2

Pustit:

1. psychologie
2. keyword clustering
3. funnel audit

To jsou největší ROI věci.

## KROK 3

Až potom:

- redesign
- copy
- ads