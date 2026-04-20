---
tags:
  - tools_vyvojare
  - SOLAX
---

program: vscode
složka: MUY SOLAX WEB

---

- [ ] upravit javascript (json) podle struktury stránky

### GPT rady
Pro správné doplnění dat do JavaScriptu potřebujete znát strukturu JSON odpovědi, kterou API poskytuje. Tato struktura vám řekne, jaké klíče (keys) jsou použity pro různé datové body, které chcete zobrazit na webové stránce.

Obvykle byste měli dokumentaci API nebo příklad odpovědi z API, kterou můžete prozkoumat. Jelikož nemám přístup k internetu a nemohu načíst data přímo z poskytnutého API, nemohu přesně specifikovat, jaké klíče byste měli použít.

Nicméně, pokud bychom pracovali s předpokládanou strukturou, zde je obecný příklad, jak byste data doplnili do JavaScriptu:

1. Získejte data pomocí `fetch` API a převeďte je na JSON.
2. Zkontrolujte strukturu JSON - hledejte klíče a odpovídající hodnoty, které chcete zobrazit.
3. Použijte tyto klíče k vyhledání specifických hodnot v JSON odpovědi.
4. Aktualizujte HTML obsah pomocí `textContent` nebo `innerHTML` na odpovídajících místech vaší stránky.

*Příklad (předpokládáme strukturu JSON):*

```


// Předpokládejme, že struktura JSON odpovědi vypadá nějak takto:
// {
//   "data": {
//     "zakaznik1": {
//       "spotreba": "10 kW",
//       "vyroba": "5 kW"
//     },
//     "zakaznik2": {
//       "spotreba": "8 kW",
//       "vyroba": "4 kW"
//     }
//   }
// }

function fetchData() {
    // ... (fetch API kód)

    .then(data => {
        // Předpokládáme, že máme data ve výše uvedené struktuře
        document.querySelector('#spotreba1 .value').textContent = data.data.zakaznik1.spotreba;
        document.querySelector('#vyroba1 .value').textContent = data.data.zakaznik1.vyroba;
        // Opakujte pro zákazníka 2 a další data
        document.querySelector('#spotreba2 .value').textContent = data.data.zakaznik2.spotreba;
        document.querySelector('#vyroba2 .value').textContent = data.data.zakaznik2.vyroba;
    })
    .catch(error => console.error('Chyba při načítání dat:', error));
}

```

---

### Hruška data z API
{"success":true,"exception":"Query success!","result":{"inverterSN":"H34A15J2641138","sn":"SVJWACXAK2","acpower":4335.0,"yieldtoday":17.4,"yieldtotal":2288.8,"feedinpower":0.0,"feedinenergy":6.2,"consumeenergy":8220.21,"feedinpowerM2":0.0,"soc":65.0,"peps1":0.0,"peps2":0.0,"peps3":0.0,"inverterType":"14","inverterStatus":"102","uploadTime":"2024-01-27 16:41:59","batPower":-4444.0,"powerdc1":0.0,"powerdc2":0.0,"powerdc3":null,"powerdc4":null,"batStatus":"0"},"code":0}

#claude_tech
