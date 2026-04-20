---
tags:
  - PROMPTS
  - tjk_prompts
  - APP
  - kom2025
  - BUSINESS
  - KOM-BUSINESS
  - business_category
up:
  - "[[⚜️ KOMÁRKA BUSINESS]]"
  - "[[⚜ TJK MOC]]"
---
PROMPT – Mobilní aplikace „Trail Park Komárka“ Logo: Použij logo z přílohy (ve formátu PNG/SVG). Umísti jej na úvodní obrazovku a do horní části hlavní stránky aplikace.

---

1. Autentifikace Login / Registrace přes: E-mail + heslo Google účet (OAuth2)

Při registraci se data ukládají do Supabase tabulky riders: id (UUID) email (text) display_name (text) created_at (timestamp)

Údaje slouží také k přihlášení uživatele.

---

2. Funkce aplikace a) Hlavní stránka Zobraz 3 nejrychlejší časy jezdců na hlavní trati. Data se berou z tabulky track_times v Supabase (viz níže).

Zobraz aktuální polohu jezdce na mapě a zvýrazni oficiální trať (importovaná z KML nebo GPX). Start a cíl trasy definován přes GPS: Start: 50.703461530, 13.866165630 Cíl: 50.703583620, 13.866390950

Automatické měření začíná při vstupu do oblasti startu a končí v oblasti cíle. Zaznamenávej a ukládej: Čas Rychlost (průměrná + maximální) Vzdálenost Převýšení

Tabulka v Supabase: track_times id (UUID) rider_id (UUID, foreign key do riders) route_id (foreign key do routes) duration (float) distance (float) elevation_gain (float) max_speed (float) created_at (timestamp)

---

b) Trasy Každý registrovaný uživatel může: Importovat vlastní trasu (.KML nebo .GPX) Pojmenovat trasu a přidat popis Sdílet trasu komunitě (veřejná / neveřejná)

Trasy se zobrazují na mapě a jsou uloženy v tabulce routes:

Tabulka v Supabase: routes id (UUID) rider_id (vlastník) name (text) description (text) kml_data nebo gpx_data (text/blob) is_public (boolean) created_at (timestamp)

---

3. Další funkce Profil uživatele: Seznam jeho tras, jeho nejlepší časy, možnost upravit údaje. Leaderboard: Celkové pořadí jezdců na jednotlivých trasách. Sdílení: Sdílení trasy nebo času na sociální sítě (volitelně). Offline mód (volitelně): Stáhnout trasu pro offline použití.

---

4. Designové prvky Použij kontrastní černobílý styl vycházející z přiloženého loga. Hlavní barvy: černá, bílá, zvýraznění (např. oranžová nebo zelená pro trasu). Styl mapy: turistický / trailový (např. OpenStreetMap s vrstvou MTB).

#claude_komarka #claude_sporty
