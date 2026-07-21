


https://buy.stripe.com/test_5kQ00idLs4rE20odXW5gc0f


❯ Jsi tým složený z:

  - CRO specialisty s 15 lety praxe
  - UX designéra
  - Google Ads specialisty
  - B2B obchodníka
  - psychologa spotřebitelského chování
  - investora hodnotícího startupy
  - senior frontend developera

  Tvým úkolem není web chválit.

  Tvým úkolem je najít všechny důvody, proč návštěvník NEodešle poptávku.

  Neanalyzuj veřejně dostupný web.

  Analyzuj kompletní projekt uložený v:

  /Users/mb/dev/webdo24
uzuj:

  - headline
  - subheadline
  - CTA
  - formuláře
  - navigaci
  - reference
  - důvěryhodnost
  - nabídku
  - ceny
  - FAQ
  - mobilní verzi
  - rychlost

  Chovej se jako návštěvník, který utrácí vlastní peníze.

  Najdi minimálně 30 důvodů proč neodeslat poptávku.

  Buď extrémně kritický.

  --------------------------------------------------
  ČÁST 4 – DŮVĚRYHODNOST
  --------------------------------------------------

  Ohodnoť:

  - důvěryhodnost

  - SEO title
  - meta description
  - OpenGraph
  - strukturu nadpisů
  - schema.org
  - interní prolinkování
  - indexovatelnost
  - Core Web Vitals
  - obrázky
  - lazy loading
  - výkon

  Najdi vše, co může snižovat návštěvnost neb
i:

  - zda je vhodný pro Google Ads
  - které části budou snižovat Quality Score
  - kde dochází ke ztrátě návštěvníků
  - jaké landing pages chybí

  --------------------------------------------------
  ČÁST 7 – PŘEPIS HOMEPAGE
  --------------------------------------------------

  Navrhni kompletní novou homepage.

  Napiš:

  Vytvoř tabulku:

  Změna | Náročnost | Dopad | Priorita

  a seřaď podle očekávaného přínosu.

  --------------------------------------------------
  ČÁST 9 – AKČNÍ PLÁN
  --------------------------------------------------

  Vytvoř:

  - změny na 1 hodinu práce
  - změny na 1 den práce
  - změny na 1 týden práce
  - změny na 1 měsíc práce

  Odhadni, které změny přinesou nejvyšší růst počtu poptávek.

  --------------------------------------------------
  DŮLEŽITÉ
  -------------------------------------------

  Cituj konkrétní soubory, komponenty a řádky kódu, ze kterých vycházíš.

  Pokud najdeš problém, vždy uveď:

  - soubor
  - komponentu
  - konkrétní místo
  - návrh opravy

  Buď extrémně kritický.

  Představ si, že majitel utrácí 300 000 Kč měsíčně za reklamu a tvým jediným cílem je zvýšit počet poptávek.

Pustím se do toho. Nejdřív si zmapuji celý tečný kód, ne domněnky.

  Ran 1 shell command                                                                                                 
Toto je statický HTML web (ne Next.js). Zmapuji ho důkladně. Nejdřív zjistím, co je vlastně nasazené a jak vypadá struktura.

  Ran 1 shell command
                                                                                                                      webdo24.cz – statický web na Vercelu, homepmapuji obsah hlavních souborů.

Teď ta nejdůležitější věc — objednací stránka (objednat.html), reference/portfolio sekce a důvěryhodnostní prvky.

  Read 1 file

Zásadní nález: objednací stránka používá TESTOVACÍ Stripe odkazy (buy.stripe.com/test_..., ř. 240–253) — pokud je to nasazené živě, nikdo nemůže reálně zaplatit. A celý model je „zaplať předem, brief až po platbě" — žádný poptávkový formulář neexistuje. Ověřím git stav, reference/portfolio a zda existují recenze.

  Ran 1 shell command

Social proof je nekonzistentní: ř. 577 „120+ spokojených klientů" vs ř. 1088 „Stovky spokojených klientů" — a žádná konkrétní recenze se jménem. Teď výkon: obřder.
čové: homepage, objednat.html i model stránky nemají žádný formulář (pouze platba). Formuláře mají jen reklamní landing pages (web-do-24-hodin.html, -v2.html, web-pro-firmy/). Ověřím, kam vede odeslání formuláře z těchto LP — to je jádro otázky Google Ads.

  Searched for 1 pattern

LP formuláře posílají leady na n8n webhook (n8n.webdo24.cz/webhook/new-lead) — dobře. Ale na v2 LP je Clarity s placeholderem CLARITY_ID (ř. 11) = rozbité. Přečtu hero + formulář + odeslání na hlavní LP a zkontroluji .gitignore kvůli .env.local.

  Ran 1 shell command

Poslední ověření před analýzou: testimonialxterních skriptů (výkon) a cenovánekonzistence napříč webem.

  Ran 1 shell command

Mám kompletní důkazní bázi z reálného kódu. Zde je celá analýza.

---
AUDIT WEBDO24.CZ — proč návštěvník neodešle

▎ Analyzováno z /Users/mb/dev/webdo24. Cituji konkrétní soubory a řádky. Homepage = index.html (1 796 ř., na disku rozpracovaná — git status ukazuje  M index.html). Reklamní LP = web-do-24-hodin.html, web-do-24-hodin-v2.html, web-pro-firmy/index.html.

🔴 NEJDŘÍV TŘI KRITICKÉ NÁLEZY (vše ostatní je až po nich)

1. Platba přes objednací stránku NEFUNGUJE — testovací Stripe odkazy.
objednat.html:240-253 obsahuje výhradně tes
ž webhook selže (.catch), kód přesto zavolá done() → zobrazí „děkujeme" a v done() (ř. 911-915) pošle do dataLayeru event:'conversion'. Výsledek: lead je ztracený, ale Google Ads ho počítá jako konverzi. Optimalizujete kampaně na fantomové konverze.

---
ČÁST 1 – PRVNÍ DOJEM (5 sekund)

Hodnoceno jen z homepage (index.html), hero ř. 488-553.

┌─────┬────────────────┬───────────┬────────────────────────────────────────────────────────────────────────────┐
│  #  │     Otázka     │ Hodnocení │                                    Proč                                    │
├─────┼────────────────┼───────────┼────────────────────────────────────────────────────────────────────────────┤
│ 1   │ Co firma       │ ANO       │ H1 „Sp 24 hodin" (ř. 489) + podnadpis „Web,   │
───┴────────────────┴───────────┴────────────────────────────────────────────────────────────────────────────┘

Závěr 5s testu: Návštěvník pochopí co a za jak dlouho, ale ne pro koho, s jakým výsledkem a proč věřit. A jediná akce je tvrdá (platba).

---
ČÁST 2 – AUDIT KONVERZÍ (seřazeno dle závažnosti)

P0 — Testovací platební brána

PROBLÉM: objednat.html:240-253 — testovací Stripe odkazy.
DOPAD: Nelze zaplatit = 0 dokončených objednávek z hlavní cesty.
VLIV NA KONVERZE: −100 % na této cestě.lamu.
OPRAVA: V .catch zobrazit chybu + fallback (tel: odkaz / e-mail), konverzi pálit jen ve .then při HTTP 200.

P1 — Nekonzistentní ceny napříč webem

PROBLÉM: Homepage „od 14 900 Kč" (index.html, ceník ř. 1109), ale LP 6× „od 9 900 Kč" (web-do-24-hodin-v2.html:13,243).
DOPAD: Návštěvník z reklamy vidí 9 900, na homepage 14 900 → pocit klamavé reklamy, ztráta důvěry, horší message-match (Quality Score).
OPRAVA: Sjednotit vstupní cenu, nebo jasně odlišit produkt „landing page 9 900" vs „web 14 900".

P1 — Nekonzistentní a nedoložené sociální důkazy
+.
DOPAD: Klikne se zvědavostí, narazí na platební bránu, odejde (a možná nedůvěřuje).
OPRAVA: Rozdělit: primární „Chci nezávaznou nabídku", sekundární „Objednat a zaplatit".

P2 — 6 živých iframů v portfoliu zabíjí výkon

PROBLÉM: index.html:724,745,766,787 — iframy načítají živé cizí weby (paddleboardy-milada.cz, dousa-elektro.cz, ninja-tyden.webdo24.cz, web.webdo24.cz/...).
DOPAD: Obrovský LCP/INP, závislost na cizích serverech (když spadnou nebo přidají X-Frame-Options, portfolio zmizí — fallback řeší jen část, ř. 725).
OPRAVA: Nahradit statickými screenshoty (už máte previews/*.png), živý web jen v lightboxu na klik.

P2 — Hero je slider (2 slidy), klíčové sdělabase je FAQ prázdné. Navíc hardcoded FAQ schema (index.html:395) se může lišit od obsahu v DB.
OPRAVA: FAQ renderovat staticky do HTML (SEO + spolehlivost), Supabase jen jako CMS při buildu.

P3 — Chybí identifikace firmy (IČO/sídlo)

PROBLÉM: Nikde IČO, DIČ ani sídlo — jen „© Soterana Corp s.r.o." (index.html:1365).
DOPAD: Důvěra + zákonná informační povinnost (§ 435 OZ) u online prodeje.
OPRAVA: Doplnit IČO/sídlo do patičky a VOP.

---
ČÁST 3 – SKEPTICKÝ ZÁKAZNÍK (30+ důvodů neodeslat)

Pohledem člověka, co platí ze svého:
 Co hosting po 1. roce zdarma? Kolik pak platím?
16. „Web vlastníte" — ale na čem běží, umím to převzít?
17. Žádný telefonát/konzultace předem — co když mě nepochopí a udělají špatný web?
18. „Do 24 hodin" — to znamená narychlo a odfláknuté?
19. Nikde živý chat — když mám dotaz teď, musím volat/mailovat a čekat.
20. FAQ chvíli prázdné (načítá se z Supabase) — působí rozbitě.
21. Stránka skáče/rotuje (hero slider) — nestíhám číst.
22. Web je pomalý (6 iframů cizích webů) — když je pomalý jejich, jaký udělají mně?
23. Žádné srovnání „před/po" reálné firmy.
24. Cena Automation 59 900 bez jediného vysvětlení, proč tolik.
25. „Splátky 12×" — je to úvěr? Kdo ho poskytuje? Úrok? (objednat.html)
26. Platba kartou na neznámém webu — je to bezpečné? (logo Stripe je, ale malé)
27. Žádné „kolik to celkem stojí za rok" (w
    Kritérium      │ Skóre │                                   Zdůvodnění                                    │
├─────────────────────┼───────┼─────────────────────────────────────────────────────────────────────────────────┤
│ Důvěryhodnost       │ 3/10  │ Nulové ověřitelné důkazy, protichůdná čísla klientů (ř. 577 vs 1088 vs schema   │
│                     │       │ 313), chybí IČO/sídlo, jen mobil. Riziko fake AggregateRating (index.html:308). │
├─────────────────────┼───────┼─────────────────────────────────────────────────────────────────────────────────┤
│ Profesionalita      │ 6/10  │ Vizuál je moderní a konzistentní (glassmorphism, paleta navy/teal/coral).       │
│                     │       │ Sráží: rotující hero, 6 cizích iframů, prázdné FAQ při načítání.                │
├─────────────────────┼───────┼─────────────────────────────────────────────────────────────────────────────────┤
│ Odbornost           │ 4/10  │ Tvrzení o AI/automatizaci nejsou ničím podložená (žádné case study, čísla,      │
│                     │       │ screenshot reálného CRM). Působí jako marketing, ne důkaz.                      │
├─────────────────────┼───────┼─────────────────────────────────────────────────────────────────────────────────┤
│ Srozumitelnost      │ 5/10  │ Nabídka „co dostanu" je obecná, ceny si odporují (9 900 vs 14 900), CTA         │
│                     │       │ „Rezervovat                                        │
ggregateRating na Organization (ř. 308) — Google nezobrazuje self-serving rating organizace a fake/neoveřitelný rating riskuje manuální penalizaci. 🔴
- Hardcoded FAQ v schema (ř. 395+) ≠ FAQ načítané z Supabase → nesoulad. ⚠️
- LP schema priceRange:"Kč Kč" (web-do-24-hodin-v2.html:28) je rozbité. ⚠️
Indexovatelnost: robots.txt OK (objednat.html správně Disallow). sitemap.xml ale neobsahuje web-do-24-hodin.html, web-do-24-hodin-v2.html — pokud mají být indexované. ⚠️
Interní prolinkování: slabé — model stránky a LP nejsou provázané z homepage navigace.
Core Web Vitals (riziko):
- 🔴 cdn.tailwindcss.com (index.html:40) — Tailwind sám hlásí „nepoužívat na produkci". Render-blocking, velký JS, generuje CSS v prohlížeči → pomalý FCP/LCP.
- 🔴 6× <iframe> s živými cizími weby → katastrofa pro LCP a INP, závislost na cizích serverech.
- 🔴 og-image 5,7 MB; v repu navíc 2× nepoužitý Gemini_*.png (10 MB) — grep potvrdil, že nejsou referencované, jen
zabírají repo.
Rozbitá Clarity na v2 (web-do-24-hodin-v2.html:11 i="CLARITY_ID" placeholder) — neměříte chování na LP. ⚠️
4. Chybí konzistentní conversion tracking mezi „form_submit" a reálným leadem (viz P0 bug).

Kde se ztrácí návštěvníci:
- Na homepage: CTA → platba, žádný měkký krok → bounce.
- Na LP v2: formulář je v hero pravém sloupci (:776), ale na mobilu (@media min-width:960px grid, ř. 69) klesá pod fold → ověřit, že je nad foldem i na mobilu.
- Tichý fail formuláře → ztracené leady i z placené návštěvnosti.

Jaké LP chybí:
- Oborové LP pro message-match dle keywords: „web pro řemeslníky", „web pro restaurace", „web pro e-shop", „web pro autoservis".
- LP „web zdarma kalkulace / nezávazná nabío klíčová slova s nižším nákupním záměrem.
O

▎ Hlavní nadpis (H1):
▎ Funkční web pro vaše podnikání — online už zítra.

▎ Podnadpis:
▎ Řekněte nám ve 3 větách, co děláte. Do 24 hodin máte hotový web, který přijímá poptávky a odpovídá zákazníkům za vás. Bez agentury, bez čekání týdny.

▎ Primární CTA: Chci nezávaznou nabídku → (vede na formulář, ne platbu)
▎ Sekundární CTA: Zobrazit reference
▎ Mikrotext pod CTA: Nezávazné · Odpovíme do hodiny · Web od 14 900 Kč


REFERENCE (nahradit prázdná čísla)

▎ Nadpis: Co říkají klienti
▎ (3 reálné recenze, formát:)
▎ „Web jsem měl druhý den a první poptávka přišla do týdne." — Pavel Douša, elektrikář (odkaz: dousa-elektro.cz)
▎ (+ mřížka 4-6 screenshotů z previews/ s názvem firmy a oborem)

BALÍČKY

▎ Nadpis: Vyberte si rozsah. Cenu znáte předem.
▎ Start 14 900 Kč · Business 29 900 Kč · Automation 59 900 Kč
▎ (u každého: „nebo od X Kč/měsíc, 12 splátě dostanu, jediné CTA „Chci tento balíček" →
ebo zavolejte: 735 847 185 (Po–Pá 9–18)
▎ (+ IČO, sídlo firmy)

---
ČÁST 8 – PRIORITY

┌──────────────────────────────────────────────────────────────┬───────────┬─────────────────────────┬──────────┐
│                            Změna                             │ Náročnost │          Dopad          │ Priorita │
├──────────────────────────────────────────────────────────────┼───────────┼─────────────────────────┼──────────┤
│ Opravit testovací Stripe odkazy → live (objednat.html:240)   │    1h     │       🔴 Extrémní       │    1     │
├──────────────────────────────────────────────────────────────┼───────────┼─────────────────────────┼──────────┤
│ Opravit tichý fail formuláře + falešnou konverzi (v2:902)    │    1h     │       🔴 Extrémní       │    2     │
├─────────────────────────────────────────────┼─────────────────────────┼──────────┤
tatický hero místo slideru, 1 H1                            │    2h     │       🟡 Střední        │    10    │
├──────────────────────────────────────────────────────────────┼───────────┼─────────────────────────┼──────────┤
│ FAQ staticky do HTML                                         │    2h     │    🟡 Střední (SEO)     │    11    │
├──────────────────────────────────────────────────────────────┼───────────┼─────────────────────────┼──────────┤
│ Doplnit IČO/sídlo + ověřit GDPR consent (Smartlook)          │    1h     │       🟡 Střední        │    12    │
│                                                              │           │     (právní/důvěra)     │          │
├──────────────────────────────────────────────────────────────┼───────────┼─────────────────────────┼──────────┤
│ Opravit Clarity ID + priceRange na LP                        │  30 min   │    🟡 Nízký (měření)    │    13    │
├──────────────────────────────────────────────────────────────┼───────────┼─────────────────────────┼──────────┤
│ Oborové + lokální LP pro Ads                                 │  1 měsíc  │     🟠 Vysoký (QS)      │    14    │
└──────────────────────────────────────────────────────────────┴───────────┴─────────────────────────┴──────────┘

---
menšit og-image na <150 KB.

📆 1 TÝDEN

- Tailwind build lokálně (PostCSS/CLI) místo cdn.tailwindcss.com.
- Iframy → statické WebP screenshoty, živý web jen v lightboxu.
- Statický hero (1 sdělení, 1 H1), FAQ staticky do HTML.
- Doplnit IČO/sídlo, ověřit GDPR consent pro Smartlook.
- Opravit Clarity ID + priceRange na LP, doplnit sitemap o LP.

🗓️ 1 MĚSÍC

- Oborové a lokální LP pro message-match s , e-shop; Praha/region).

✻ Sautéed for 7m 14s

❯ koukni se na index-v3.html - rozhodni, zda není lepší a pokud ano, budeme upravovat tuto variantu v3. až to rozhodneš, začni vším, co má extrémní dopad. zbytek se domluvíme, až to budeš mít hotové.

  Read 1 file

v3 přečtena celá. Než rozhodnu definitivně, ověřím jednu věc kvůli extrémně dopadové opravě — zda někde v repu/historii existují živé Stripe odkazy (abych nemusel testovací nahrazovat naslepo).

  Ran 1 shell command

────────────┼─────────────────────────────────────────────────────┼──────────────────────────────────────────┤
│ „Pro koho"   │ chybí                                               │ celá sekce use-cases ✅ (řeší slabinu z  │
│              │                                                     │ Části 1)                                 │
├──────────────┼─────────────────────────────────────────────────────┼──────────────────────────────────────────┤
│ Námitky      │ neřeší                                              │ srovnávací tabulka DIY vs agentura vs    │
│              │                                                     │ WebDo24 ✅                               │
├──────────────┼─────────────────────────────────────────────────────┼──────────────────────────────────────────┤
│ Čísla        │ rozpor (120+ vs „stovky" vs 40)                     │ konzistentní (40+, ⭐5,0, schema 5/40)   │
│ klientů      │                                                     │ ✅                                       │
├──────────────┼─────────────────────────────────────────────────────┼──────────────────────────────────────────┤
│ Smartlook    │ nahrává hned (GDPR riziko)                          │ není (lehčí) ✅                          │
├──────────────┼─────────────────────────────────────────────────────┼──────────────────────────────────────────┤
│ Garance      │ „vracíme peníze" (100 %, rvracíme 50 %" — konzistentní všude ✅   │
🟢 Tichá ztráta leadů + falešné konverze na LP (web-do-24-hodin-v2.html, web-pro-firmy/) — opravím teď.

Začínám body 2 a 3.

⏺ Update(index-v3.html)
Added 21 lines
.footer-links a:hover{color:#fff}

/* ═══════════════════════════════════════
   LEAD FORM (měkká konverze — nezávazná poptávka)
═══════════════════════════════════════ */
.lead{padding:6rem 1.5rem;background:#0B1929}
.lead-card{max-width:42rem;margin:surface);border:1px solid var(--borde
line-height:1.55}
.lead-msg.show{display:block}
.lead-msg.ok{background:rgba(0,196,181,0.1);border:1px solid rgba(0,196,181,0.3);color:#fff}
.lead-msg.bad{background:rgba(255,51,102,0.1);border:1px solid rgba(255,51,102,0.3);color:#fff}

/* ═══════════════════════════════════════
   UTILITIES
═══════════════════════════════════════ */
.container{max-width:72rem;margin:0 auto;width:100%}

Teď hero CTA → směřuje na měkkou poptávku:

⏺ Update(index-v3.html)
    <div style="text-align:center;margin-top:3.5rem">
      <a href="objednat.html" class="btn-primary">Rezervovat spuštění →</a>
      <a href="#poptavka" class="btn-primary">Chci nezávaznou nabídku →</a>
    </div>
  </div>
</section>

Teď přidám samotnou sekci s formulářem před závěrečné CTA:

⏺ Update(index-v3.html)
Added 39 lines
</section>

        <div class="lead-row">
          <div class="lead-field">
            <label class="lead-label" for="lead-name">Jméno / firma *</label>
            <input id="lead-name" class="lead-input" type="text" placeholder="Jan Novák, Novák Elekt
ro" required autocomplete="name">
          </div>
          <div class="lead-field">
            <label class="lead-label" for="lead-phone">Telefon *</label>
            <input id="lead-phone" class="lead-input" type="tel" placeholder="+420 777 123 456" requ
ired autocomplete="tel">
          </div>
        </div>
        <div class="lead-field">
okud spěcháte, zavolejte na <a href="tel:+420735847185" style="color:var(--teal);font-weight:800">73
5&nbsp;847&nbsp;185</a>.</div>
      <div id="lead-bad" class="lead-msg bad">Odeslání se teď nepodařilo. Zavolejte nám prosím na <a
 href="tel:+420735847185" style="color:var(--teal);font-weight:800">735&nbsp;847&nbsp;185</a> nebo n
apište na <a href="mailto:info@webdo24.cz" style="color:var(--teal);font-weight:800">info@webdo24.cz
</a> — ozveme se hned.</div>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════
   FINAL CTA
══════════════════════════════════
  var ok=true;
  [name,phone].forEach(function(el){
    if(!el.value.trim()){el.classList.add('err');ok=false;}
    else el.classList.remove('err');
  });
  if(!ok){name.value.trim()?phone.focus():name.focus();return;}

  var btn=document.getElementById('lead-btn');
  var bad=document.getElementById('lead-bad');
  bad.classList.remove('show');
  btn.disabled=true;btn.textContent='Odesílám…';

  var data={
    /* úspěch — teprve TEĎ ukážeme díky + pálíme konverzi */
    document.getElementById('leadForm').style.display='none';
    document.getElementById('lead-ok').classList.add('show');
    (window.dataLayer=window.dataLayer||[]).push({event:'generate_lead',lead_source:'index-v3-poptav
ka'});
  })
  .catch(function(){
    /* selhání — lead se NEZTRATÍ tiše, konverzi NEpálíme, ukážeme fallback */
    btn.disabled=false;btn.textContent='Chci nezávaznou nabídku →';
    bad.classList.add('show');
  });
}


⏺ Update(web-do-24-hodin-v2.html)
Added 7 lines, removed 1 line
  btn.disabled=true;btn.textContent='Odesílám…';
  var data={name:n.value.trim(),phone:p.value.trim(),email:document.getElementById('fe').value.trim(
),note:document.getElementById('fm').value.trim(),source:'web-do-24-hodin-v2',url:window.location.hr
ef};
  fetch('https://n8n.webdo24.cz/webhook/new-lead',{method:'POST',headers:{'Content-Type':'applicatio
n/json'},body:JSON.stringify(data)})
    .then(function(){done()}).catch(function(){done()});
    .then(function(res){if(!res.ok)throw new Error('HTTP '+res.status);done();})
    .catch(function(){
      btn.disabled=false;btn.textC
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(function() { showConsultSuccess(); })
  .catch(function() { showConsultSuccess(); });
  .then(function(res) { if(!res.ok) throw new Error('HTTP '+res.status); showConsultSuccess(); })
  .catch(function() {
    btn.disabled = false; btn.textContent = 'Chci konzultaci zdarma';
    var box = document.getElementById('cfErr');
    if(!box){box=document.createElement('p');box.id='cfErr';box.style.cssText='margin-top:.85rem;fo
nt-size:.82rem;font-weight:700;color:#ff6b8a;text-align:center;line-height:1.5';document.getElement
ById('consultForm').appendChild(box);}
    box.innerHTML='Odeslání se terosím na <a href="tel:+420735847185"
Added 8 lines, removed 6 lines
    body: JSON.stringify(data)
  })
  .then(function(r) {
    // Show success regardless (don't block conversions on webhook issues)
    if (!r.ok) throw new Error('HTTP ' + r.status);
    // Úspěch — teprve TEĎ ukážeme díky + pálíme konverzi
    document.getElementById('leadForm').style.display = 'none';
    document.getElementById('formSuccess').style.display = 'block';
    trackEvent('form_submit', { name: name, phone: phone });

    window.scrollTo({ top: document.getElementById('formSuccess').getBoundingClientRect().top + wind
ow.scrollY - 80, behavior: 'smooth
 style="color:#fff;font-weight:800">735 847 185</a> — ozveme se hned.';
    console.error('Webhook:', err);
  });
});

Ověřím původní text tlačítka na web-do-24-hodin.html, ať fallback obnoví správný popisek:

  Read 1 file, ran 1 shell command

Tlačítko sedí („Odeslat poptávku"). Ověřím syntaxi JS v upravených souborech – vytáhnu skript bloky a prověřím Node:

  Ran 1 shell command
d neztratí — zobrazí se fallback s telefonem a tlačítko se znovu povolí.
- Hlavní CTA v heru a v sekci „Jak to funguje" teď vedou na formulář (#poptavka) místo rovnou na platbu. Cesta „rovnou objednat" zůstává zachována v ceníku a závěrečném CTA pro rozhodnuté.

3. Oprava tiché ztráty leadů na všech 3 reklamních LP — web-do-24-hodin.html, web-do-24-hodin-v2.html, web-pro-firmy/index.html
- Dřív: při výpadku webhooku se zobrazilo „děkujeme" a do GA4 se poslala konverze → lead ztracený, kampaň optimalizovaná na fantomy.
- Teď: konverze jen při res.ok, jinak fallback s tel. číslem.

Veškerý JS jsem ověřil Node syntaktickou kontrolou (4× OK) a zapsal do claude-changes.md.

🔴 Blokuje mě jediná věc — živé Stripe odkaroject (metadata)
  plink_1TfLUGCBgIxNRpER3Z5BRPyU    2026-06-06 14:46    TRUE    czk    https://buy.stripe.com/aFabJ0bC327p0qU2wx9EI0f    Model Automation — webdo24.cz
  plink_1TfLU7CBgIxNRpER6ZjeHckr    2026-06-06 14:46    TRUE    czk    https://buy.stripe.com/dRm28q5dFeUba1u1st9EI0e    Model Start — webdo24.cz
  plink_1TfLU2CBgIxNRpERpcdbiX83    2026-06-06 14:45    TRUE    czk    https://buy.stripe.com/3cI8wO21t27pehKdbb9EI0d    Model Business — webdo24.cz
  plink_1TfLTzCBgIxNRpERDbjy3QrD    2026-06-06 14:45    TRUE    czk    https://buy.stripe.com/9B600i49BcM3ddG3AB9EI0c    Model Business — webdo24.cz
  plink_1TfLTqCBgIxNRpERdzHvkU76    2026-06-06 14:45    TRUE    czk    https://buy.stripe.com/28E00igWn4fx7Tm1st9EI0b    Model Start — webdo24.cz
  plink_1TfLStCBgIxNRpERA4hKXQMS    2026-06-06 14:44    TRUE    czk    https://buy.stripe.com/eVq6oG5dF13l0qU1st9EI0a
     Model Automation — webdo24.czč mi do chatu rozhodně neposílej (bezpečnost).

Zbývá tedy jediné: musíš mi u každého balíčku říct, který ze dvou odkazů je jednorázová platba (Varianta A) a který splátky (Varianta B). Snadno to poznáš tak, že odkaz otevřeš — jednorázový ukáže celou částku (např. 14 900 Kč), splátkový ukáže měsíční částku / předplatné (např. 1 490 Kč/měs).

⏺ User answered Claude's questions:
· MODEL START — který odkaz je JEDNORÁZOVÁ platba (celá částka 14 900 Kč, Varianta A)? Ten druhý bude automaticky splátkový (Varianta B). → …9EI0b (28E00i)
· MODEL BUSINESS — který odkaz je JEDNORÁZOVÁ platba (celá částka 29 900 Kč, Varianta A)? Ten druhý bude splátkový (Varianta B). → …9EI0c (9B600i)
· MODEL AUTOMATION — který odkaz je JEDN9 900 Kč, Varianta A)? Ten druhý bude
  // Varianta A = jednorázová platba, Varianta B = 12 měsíčních splátek
  'Start': {
    'Varianta A': 'https://buy.stripe.com/test_5kQ00i8r81fs0Wk4nm5gc0e',
    'Varianta B': 'https://buy.stripe.com/test_4gMcN436O1fs20ocTS5gc0h'
    'Varianta A': 'https://buy.stripe.com/28E00igWn4fx7Tm1st9EI0b',
    'Varianta B': 'https://buy.stripe.com/dRm28q5dFeUba1u1st9EI0e'
  },
  'Business': {
    'Varianta A': 'https://buy.stripe.com/test_5kQ00idLs4rE20odXW5gc0f',
    'Varianta B': 'https://buy.stripe.com/test_6oUcN4bDkaQ2awU3ji5gc0i'
    'Varianta A': 'https://buy.stripe.com/9B600i49BcM3ddG3AB9EI0c',
    'Varianta B': 'https://buy.str0d'
Co je teď hotové

┌─────┬─────────────────────────────────────────────┬───────────────────────────────────┬───────────────────────┐
│  #  │                   Oprava                    │              Soubor               │         Stav          │
├─────┼─────────────────────────────────────────────┼───────────────────────────────────┼───────────────────────┤
│ 1   │ Živé Stripe Payment Links (nahrazeny        │ objednat.html                     │ ✅ 6 živých, mapování │
│     │ testovací)                                  │                                   │  A/B potvrzeno        │
├─────┼─────────────────────────────────────────────┼───────────────────────────────────┼───────────────────────┤
│ 2   │ Měkký poptávkový formulář (sekce #poptavka, │ index-v3.html                     │ ✅                    │
│     │  n8n webhook, správná obsluha chyb)         │                                   │                       │
├─────┼─────────────────────────────────────────────┼───────────────────────────────────┼───────────────────────┤
│ 3   │ Konec tiché ztráty leadů + falešnýcml, -v2.html,   │ ✅ všechny 3 LP       │
sazení v3 na / (přejmenování index.html) · sjednocení cen 9 900 vs 14 900 · reálné recenze místo čísel · Tailwind build lokálně místo CDN · og-image 5,7 MB → <150 KB · IČO/sídlo + GDPR consent · oprava Clarity ID + priceRange na LP.

Čím chceš pokračovat?