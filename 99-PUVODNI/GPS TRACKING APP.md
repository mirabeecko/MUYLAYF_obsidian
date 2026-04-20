---
tags:
  - tjk_prompts
  - AI
  - PROMPTS
---



# ZADÁNÍ

Vytvoř mi Android aplikaci, která automaticky měří čas jízdy mezi dvěma GPS body.

🔹 Start GPS bod: 50.705740, 13.851789  
🔹 Konec GPS bod: 50.683709, 13.857079

📲 Funkce aplikace:
- Aplikace se aktivuje automaticky po vstupu do startovní zóny (do 20 metrů od GPS startu).
- Měření času běží na pozadí během pohybu.
- Měření se zastaví při dosažení cílového bodu (do 20 metrů od cíle).
- Po skončení měření se data automaticky odešlou do databáze Supabase.

📥 Ukládaná data:
- `race_time` (doba v sekundách)
- `rider` (vstupní pole pro jméno závodníka)
- `route` (pevně nastaveno jako např. "Komárka trasa 1")
- `prevyseni` (zatím neřeš, může být prázdné)
- `created_at` (automaticky generované timestamp)
- `id` (automaticky generované ID)

📤 Supabase připojení:
- SUPABASE_URL=https://mljqltwcdqknezuqpisb.supabase.co
- SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sanFsdHdjZHFrbmV6dXFwaXNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzMTMzNTgsImV4cCI6MjA2MDg4OTM1OH0.rG9nXbN7uY8GaVVB3xh6sKwIIe4-HoVAFY_HOzaLZSs

📦 Název tabulky: `race_time`

Přidej jednoduchý úvodní formulář pro zadání jména jezdce a tlačítko pro spuštění GPS sledování. Po úspěšném odeslání do databáze zobraz potvrzení.

Design aplikace jednoduchý, čitelný, bez registrace.



# VYTVOŘENÍ APK
## ✅ Cíl:

- Aplikace automaticky změří čas mezi dvěma GPS body.
- Po projetí trasy výsledek odešle do Supabase databáze `race_time`.
- Hotovou aplikaci dostaneš jako `.apk` soubor, který si nainstaluješ do mobilu.
    

---

## 🔧 1) CO SI PŘIPRAVIT

|Co|Popis|
|---|---|
|💻 Počítač|S nainstalovaným **Node.js**: [https://nodejs.org](https://nodejs.org)|
|📱 Android telefon|S aplikací **Expo Go** nebo připraven k instalaci `.apk`|
|🌍 Internet|Pro upload a build aplikace|
|🧑 Expo účet|Založ zdarma na: https://expo.dev/signup|

---

## 🚀 2) INSTALACE NÁSTROJŮ

bash

ZkopírovatUpravit

`npm install -g expo-cli eas-cli`

---

## 📁 3) VYTVOŘENÍ PROJEKTU

bash

ZkopírovatUpravit

`mkdir gps_timer_app && cd gps_timer_app npx create-expo-app .`

→ Vyber šablonu **blank (JavaScript)**

---

## 📦 4) INSTALACE KNIHOVEN

bash

ZkopírovatUpravit

`npm install @supabase/supabase-js expo-location`

---

## 🧠 5) VLOŽENÍ KÓDU

- Otevři soubor `App.js` ve složce projektu
    
- Nahraď celý jeho obsah tímto:  
    👉 Klikni pro otevření kódu v Canvasu
    

---

## 🔑 6) PŘIHLAŠ SE DO EXPO

bash

ZkopírovatUpravit

`npx expo login`

---

## ⚙️ 7) PŘIPRAV BUILD PRO ANDROID

bash

ZkopírovatUpravit

`npx eas build:configure`

→ Vyber platformu `Android`

---

## 🏗️ 8) SPUSŤ VYTVOŘENÍ APK

bash

ZkopírovatUpravit

`npx eas build --platform android --profile preview`

🔄 Teď chvíli počkáš (~5–10 min)  
Poté dostaneš odkaz typu:

bash

ZkopírovatUpravit

`https://expo.dev/accounts/[tvůj-účet]/projects/gps_timer_app/builds/xxxxxxxx`

---

## 📲 9) INSTALACE DO TELEFONU

1. Otevři ten odkaz v mobilu
    
2. Stáhni `.apk`
    
3. Povoli instalaci z neznámých zdrojů
    
4. Otevři soubor → Nainstaluj → Hotovo!
    

---

## ✅ HOTOVO!

> Aplikace bude automaticky měřit čas při průjezdu GPS bodem `START`, zastaví se v `CÍLI` a výsledek odešle do Supabase do tabulky `race_time`.

#claude_reference
