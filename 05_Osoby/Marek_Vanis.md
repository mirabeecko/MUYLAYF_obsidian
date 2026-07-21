---
tags:
  - osoba
  - entita
  - tj-krupka
  - problemova-osoba
  - vyloucen
datum_vytvoreni: 2026-06-13
role: Bývalý údajný předseda oddílu stolního tenisu
status: vyloučen
vztah_ke_kauze: Obžalovaný z trestných činů, žalobce v občanskoprávním řízení
osoby:
  - "[[Miroslav_Brozek]]"
  - "[[Jaromir_Pivonka]]"
  - "[[Gustav_Vlach]]"
  - "[[Martin_Kulik]]"
udalosti:
  - "[[11_Chronologie/Kompletni_Chronologie|Kompletní chronologie]]"
dokumenty:
  - "[[03_Dokumenty/Vylouceni_Vanis_2023]]"
  - "[[03_Dokumenty/Predzalobni_Vyzva_Vanis_2023]]"
  - "[[03_Dokumenty/Zaloba_Neplatnost_Vylouceni_2024]]"
dukazy:
  - "[[04_Důkazy/Prestipnuty_Zamek]]"
  - "[[04_Důkazy/Policejni_Vyslech_Vanis]]"
  - "[[04_Důkazy/Whatsapp_Prispevky_ST]]"
poznamky: |
  Vyloučen 28.11.2023 pro hrubé porušení povinností člena (§ 239 NOZ).
  Při policejním výslechu přiznal vybírání příspěvků.
  Žaloba na neplatnost vyloučení podána PO lhůtě (8.4.2024, lhůta uplynula 28.2.2024).
---

# Marek Vaniš

## Základní údaje

| Atribut | Hodnota |
|:--------|:--------|
| **Role** | Bývalý údajný předseda oddílu stolního tenisu |
| **Status** | Vyloučen 28.11.2023 |
| **Vztah ke kauze** | Obžalovaný z trestných činů, žalobce v občanskoprávním řízení |

---

## Protiprávní jednání

- ❌ Vybíral členské příspěvky, **nepředal je spolku** (statisíce Kč)
- ❌ Nedoložil legitimnost své funkce
- ❌ Nedodal seznamy členů (přes opakované výzvy)
- ❌ Neplatil příspěvky TJ ani náklady na provoz (3+ roky)
- ❌ Pokusil se převést majetek TJ na město Krupka
- ❌ Neoprávněně svolával orgány spolku
- ❌ Při policejním výslechu přiznal vybírání příspěvků

---

## Vztahy

### Související osoby
- [[Miroslav_Brozek|Miroslav Brožek]] — předseda spolku
- [[Jaromir_Pivonka|Jaromír Pivoňka]] — spolupachatel
- [[Gustav_Vlach|Gustav Vlach]] — spolupachatel
- [[Martin_Kulik|Martin Kulík]] — spolupachatel

### Dokumenty
- [[03_Dokumenty/Vylouceni_Vanis_2023|Vyloučení Vaniš 28.11.2023]]
- [[03_Dokumenty/Predzalobni_Vyzva_Vanis_2023|Předžalobní výzva 6.11.2023]]
- [[03_Dokumenty/Zaloba_Neplatnost_Vylouceni_2024|Žaloba na neplatnost vyloučení 8.4.2024]]

### Důkazy
- [[04_Důkazy/Prestipnuty_Zamek|Přestřižený zámek / výměna zámků]]
- [[04_Důkazy/Policejni_Vyslech_Vanis|Policejní výslech — přiznání]]
- [[04_Důkazy/Whatsapp_Prispevky_ST|WhatsApp zprávy o příspěvcích]]

---

## Trestněprávní kvalifikace

- **§ 206 TZ — Zpronevěra**: vybírání příspěvků jménem spolku, nevedení evidence, ne předání prostředků
- **§ 209 TZ — Podvod**: neoprávněné vydávání se za předsedu oddílu
- **§ 254 TZ — Zkreslování údajů o hospodaření**: ne předání seznamů členů

---

## Dataview

```dataview
TABLE datum AS "Datum", udalost AS "Událost", kauza AS "Kauza"
FROM "11_Chronologie"
WHERE contains(osoby, "Marek Vaniš")
SORT datum ASC
```
