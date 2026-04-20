
#scripting #tools_vyvojare 

#java_projects #apps-script 

---

Automatizace synchronizace kalendáře mezi Booking.com a Google Kalendářem může být realizována několika způsoby. Bohužel přímý skript není ideální řešení, protože Booking.com neposkytuje otevřené API pro iCal export. Nicméně lze využít nástroje třetích stran a automatizační platformy, které synchronizaci provedou za vás:


---

1. **Použití aplikace "Zapier" nebo "Make" (dříve Integromat):

Tyto nástroje umožní vytvořit automatizaci mezi Booking.com (iCal URL) a Google Kalendářem.

Postup:

1. Zaregistrujte se na Zapier (www.zapier.com) nebo Make (www.make.com).


2. Vytvořte novou "ZAP" nebo Scénář:

Trigger (spouštěč): iCal URL ze Booking.com.

Action (akce): Přidání události do Google Kalendáře.



3. Vložte iCal URL z Booking.com a autorizujte svůj Google Kalendář.


4. Nastavte frekvenci synchronizace (např. každých 15 minut).


5. Uložte a spusťte automatizaci.




---

2. Použití skriptu s Google Apps Script (pokročilé, zdarma):

Můžete si vytvořit skript pomocí Google Apps Script, který bude pravidelně stahovat iCal soubor z Booking.com a zapisovat rezervace do Google Kalendáře.

Kód skriptu:

1. Otevřete Google Kalendář > Nastavení > Skripty.

2. Vytvořte nový skript a vložte tento kód:

```javascript
function syncBookingICal() {
  const icalUrl = 'ZDE_VLOŽTE_ICAL_URL'; // Vložte iCal URL z Booking.com
  const calendarId = 'ZDE_VLOŽTE_ID_GOOGLE_KALENDÁŘE'; // ID vašeho Google Kalendáře
  const response = UrlFetchApp.fetch(icalUrl);
  const content = response.getContentText();
  const events = CalendarApp.getCalendarById(calendarId);

  const icalEvents = content.match(/BEGIN:VEVENT[\s\S]*?END:VEVENT/g);
  if (icalEvents) {
    icalEvents.forEach(event => {
      const start = event.match(/DTSTART:(\d+T\d+Z)/)[1];
      const end = event.match(/DTEND:(\d+T\d+Z)/)[1];
      const summary = event.match(/SUMMARY:(.*)/)[1];

      events.createEvent(summary, new Date(start), new Date(end));
    });
  }
}
```


3. Nahraďte ZDE_VLOŽTE_ICAL_URL a ZDE_VLOŽTE_ID_GOOGLE_KALENDÁŘE.


4. Nastavte časovač (trigger), aby se skript spouštěl pravidelně (např. každých 15 minut).




---

3. Externí synchronizační nástroje:

Existují i služby, které nabízejí přímo synchronizaci kalendářů za malý poplatek:

Syncbnb – specializovaná služba na synchronizaci ubytovacích kalendářů.

Channel Manager – profesionální nástroje jako Lodgify nebo Hostaway zvládnou synchronizovat všechny vaše kalendáře automaticky.



---

Shrnutí:

Nejjednodušší možnost pro vás je Zapier nebo skript v Google Apps Script. Pokud máte zájem o konkrétní implementaci, mohu vám skript dále upravit podle vašich potřeb.

#claude_reference
