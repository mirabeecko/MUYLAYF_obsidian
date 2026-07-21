---
umisteni: /Users/mb/dev/Milo_Core
project:
  - VÝVOJÁŘ
  - AI_AGENTS
up:
  - "[[📚 VÝVOJÁŘ MOC]]"
  - "[[📀 API ONE]]"
---



ve složce /Users/mb/dev/Milo_Core

# VYCHYTÁVKY
Rozšiř MiLO_Core o nastavitelnou úroveň autonomie, která mění chování diff review,
notifikací a critical-path kontrol z BLOKUJÍCÍHO čekání na NEBLOKUJÍCÍ auto-rozhodnutí
se zápisem do logu.

1) V apps/api/data/config.json přidej:
   {
     "autonomy": {
       "level": "manual",
       "diff_review_max_lines": { "manual": 20, "assisted": 150, "autonomous": null },
       "critical_path_blocking": { "manual": true, "assisted": true, "autonomous": false },
       "secretary_auto_send": {
         "enabled": false,
         "allowed_contacts": []
       }
     }
   }
   (null u diff_review_max_lines = žádný limit, agent vždy commitne sám)

2) Endpoint POST /api/autonomy { level } přepne úroveň okamžitě, bez restartu.
   Orchestrátor rozpozná fráze "přepni na autonomous/assisted/manual" a zavolá tohle.

3) Uprav bod 4 z fáze 1 (diff review u bug_fixer/builder): limit řádků teď čte z
   autonomy.diff_review_max_lines[level] místo pevné hodnoty 20. Pokud level=autonomous,
   agent rovnou commitne a zapíše do NOVÉHO souboru apps/api/data/decision_log.json:
   { timestamp, agent, project, decision, reasoning, lines_changed, reversible: true/false }

4) Uprav "druhý názor" u critical_paths (bod 9 fáze 2): pokud
   autonomy.critical_path_blocking[level] === false, systém porovná oba návrhy, vybere
   lepší podle jasného kritéria (méně řádků změn, projde testy, menší diff od current state
   - definuj konkrétní pravidlo), aplikuje ho a zapíše do decision_log i s tím, jaký byl
   druhý (nepoužitý) návrh - pro zpětnou kontrolu.

5) Secretary VŽDY čeká na odeslání, i v autonomous režimu - TOHLE NEMĚŇ jako default,
   protože e-mail nejde vzít zpět. Přidej ale volitelné pole
   autonomy.secretary_auto_send.allowed_contacts (seznam e-mailových adres/domén) -
   pokud je kontakt na seznamu A autonomy.secretary_auto_send.enabled je true, Secretary
   smí odeslat bez čekání, jinak vždy čeká. Default: enabled false, prázdný seznam.

6) Na dashboardu přidej přepínač úrovně autonomie (manual/assisted/autonomous) nahoře
   vedle stavového prstenu, a novou sekci/stránku "Decision log" ukazující posledních
   N automatických rozhodnutí s možností je jedním klikem vrátit (git revert / re-open
   ticket), pokud reversible=true.

Po dokončení ověř: přepnutí na autonomous skutečně přestane blokovat diff review a
critical path kontrolu, secretary i přesto čeká na odeslání pokud kontakt není na
allowed_contacts, a decision_log se plní srozumitelnými záznamy.