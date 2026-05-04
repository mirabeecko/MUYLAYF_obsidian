appConfig = {};
let protokol = "https://";
appConfig.parametr = "";
let wl = window.location;
if (wl.href.indexOf("127.0.0.1") > -1 || wl.href.indexOf("localhost") > -1) {
    protokol = "http://";
    appConfig.parametr = "";
    if (wl.protocol != "http:") wl.protocol = "http:";
} else {
    if (wl.protocol != "https:") wl.protocol = "https:";
}
appConfig.domain = protokol + wl.hostname;
if (wl.pathname.indexOf("geoprohlizec") == -1 && wl.pathname.indexOf("beta") == -1) wl.pathname = "geoprohlizec";

let api = 'https://js.arcgis.com';
if (wl.hash == "#kivs") api = 'https://ags.cuzk.gov.cz/arcgis_js_api/javascript';
let apiVersion = '4.31';
let head = document.getElementsByTagName('head')[0];

let link1 = document.createElement('link');
link1.rel = 'stylesheet';
link1.type = 'text/css';
link1.id = 'motivApky';
localStorage.theme == "dark" ? link1.href = api + '/' + apiVersion + '/esri/themes/dark/main.css' : link1.href = api + '/' + apiVersion + '/esri/themes/light/main.css'
head.appendChild(link1);

let link2 = document.createElement('link');
link2.rel = 'stylesheet';
link2.type = 'text/css';
api == "https://js.arcgis.com" ? link2.href = '//ajax.googleapis.com/ajax/libs/dojo/1.14.1/dijit/themes/claro/claro.css' : link2.href = api + '/' + apiVersion + '/dijit/themes/claro/claro.css'
head.appendChild(link2);

let link3 = document.createElement('link');
link3.rel = 'stylesheet';
link3.type = 'text/css';
link3.href = './css/style.css';
head.appendChild(link3);

let l = "cs";
if (wl.hash == "#en") {
    l = "en";
    document.documentElement.setAttribute('lang', l);
}

let script1 = document.createElement('script');
script1.src = api + '/' + apiVersion + '/';
if (wl.hash == "#kivs") script1.src += 'init.js';
script1.onload = () => {
    let script2 = document.createElement('script');
    script2.src = './js/main.js';
    head.appendChild(script2);
}
head.appendChild(script1);

window.onerror = (m, u, l, c) => {
    alert('Error: ' + m + '\n\nSoubor: ' + u + '\n\nŘádek: ' + l + '\nSloupec: ' + c + '\n\nZkuste stránku načíst znovu. Pokud se bude problém stále objevovat, vymažte prosím mezipaměť webového prohlížeče.\n\nPokud se problém nevyřeší, kontaktujte prosím vývojáře! (tomas.nemecek@cuzk.gov.cz)');
    return true;
};

appConfig.referer = appConfig.domain + "/geoprohlizec";
if (wl.href.indexOf("127.0.0.1") > -1) {
    appConfig.referer = protokol + "127.0.0.1:5500/";
} else if (wl.href.indexOf("localhost") > -1) {
    appConfig.referer = protokol + "localhost:3344/webappbuilder/apps/";
}
if (!appConfig.domain.includes('ags.cuzk')) appConfig.domain = 'https://ags.cuzk.gov.cz'

d = {};
d[0] = { cs: "Katastrální mapy", en: "Cadastral maps" };
d[1] = { cs: "Pokud si přejete zobrazit katastrální mapu, stiskněte tlačítko.", en: "If you want to view the cadastral map, press the button." };
d[2] = { cs: "Přejít na katastrální mapy", en: "Go to cadastral maps" };
d[3] = { cs: "Další aplikace", en: "Other applications" };
d[4] = { cs: "Přechod do dalších aplikací", en: "Go to other apps" };
d[5] = { cs: "Analýzy výškopisu", en: "Terrain analysis" };
d[6] = { cs: "Archivní mapy", en: "Archive maps" };
d[7] = { cs: "Archiv leteckých měřických snímků", en: "Archive of aerial survey photos" };
d[8] = { cs: "Adresy", en: "Addresses" };
d[9] = { cs: "Hledej v adresách", en: "Search in Addresses" };
d[10] = { cs: "Ulice", en: "Streets" };
d[11] = { cs: "Hledej v ulicích", en: "Search the streets" };
d[12] = { cs: "Katastrální území", en: "Cadastral area" };
d[13] = { cs: "Hledej v katastrálních územích", en: "Search the cadastral area" };
d[14] = { cs: "Obec", en: "Municipality" };
d[15] = { cs: "Hledej v obcích", en: "Search the municipality" };
d[16] = { cs: "Geonames", en: "Geonames" };
d[17] = { cs: "Hledej v Geonames", en: "Search the geonames" };
d[18] = { cs: "Odstranit", en: "Delete" };
d[19] = { cs: "Přejmenovat", en: "Rename" };
d[20] = { cs: "Přiblížit na", en: "Zoom To" };
d[21] = { cs: "Parcela", en: "Parcel" };
d[22] = { cs: "Kliknutím do podkladové mapy zobrazit podrobnosti", en: "Click inside the basemap to view details" };
d[23] = { cs: "Zvýšit průhlednost", en: "Increase transparency" };
d[24] = { cs: "Snížit průhlednost", en: "Decrease transparency" };
d[25] = { cs: "Informace o službě", en: "Service information" };
d[26] = { cs: "Stáhnout data", en: "Download data" };
d[27] = { cs: "Koupit data", en: "Buy product" };
d[28] = { cs: "Informace po kliknutí: Zapnuto", en: "Click Info: On" };
d[29] = { cs: "Informace po kliknutí: Vypnuto", en: "Click Info: Off" };
d[30] = { cs: "Vypnout podvrstvy", en: "Turn off sublayers" };
d[31] = { cs: "Zapnout podvrstvy", en: "Turn on sublayers" };
d[32] = { cs: "Formát: PNG", en: "Format: PNG" };
d[33] = { cs: "Formát: JPG", en: "Format: JPG" };
d[34] = { cs: "Legenda", en: "Legend" };
d[35] = { cs: "Základní topografická mapa ", en: "Base map of the CR" };
d[36] = { cs: "Žádost o data", en: "Request data" };
d[37] = { cs: "Vypnout režim Výpis souřadnic bodu", en: "Turn on point List coordinate mode" };
d[38] = { cs: "Zrušit výběr", en: "Deselect" };
d[39] = { cs: "Využít plochu pro Export dat: ", en: "Use the Data Export area: " };
d[40] = { cs: "MČR 1 : 500 000", en: "Map of the CR 1 : 500 000" };
d[41] = { cs: "MČR 1 : 1 000 000", en: "Map of the CR 1 : 1 000 000" };
d[42] = { cs: "MČR 1 : 2 000 000", en: "Map of the CR 1 : 2 000 000" };
d[43] = { cs: "Kompozice: Nevybrána", en: "Composition: Not selected" };
d[44] = { cs: "Název služby: ", en: "Service name: " };
d[45] = { cs: "Popis: ", en: "Description: " };
d[46] = { cs: "Formát: ", en: "Format: " };
d[47] = { cs: "Aktuální souřadnicový systém (EPSG): ", en: "Current coordinate system (EPSG): " };
d[48] = { cs: "Dostupné souřadnicové systémy (EPSG): ", en: "Available coordinate systems (EPSG): " };
d[49] = { cs: "Typ a verze služby: ", en: "Service type and version: " };
d[50] = { cs: "Průhlednost: ", en: "Transparency: " };
d[51] = { cs: "Dostupné z: ", en: "Available from: " };
d[52] = { cs: "Pro tuto službu je funkce dostupná pouze v souřadnicovém systému EPSG: ", en: "For this service, the function is available only in the EPSG coordinate system: " };
d[53] = { cs: "Jaký má být nový název vrstvy: ", en: "What is the new layer name: " };
d[54] = { cs: "Název služby by neměl být prázdný, zkuste službu přejmenovat znovu.", en: "The service name should not be empty, try renaming the service again." };
d[55] = { cs: "Časté otázky", en: "Frequently asked questions" };
d[56] = { cs: "Uživatelské prostředí", en: "User interface" };
d[57] = { cs: "Funkce", en: "Functions" };
d[58] = { cs: "2D a 3D režim", en: "2D and 3D mode" };
d[59] = { cs: "Kmenové číslo", en: "Master number" };
d[60] = { cs: "Poddělení čísla", en: "Subordination of the number" };
d[61] = { cs: "Výměra parcely: ", en: "Parcel Area: " };
d[62] = { cs: "Druh číslování", en: "Type of numbering" };
d[63] = { cs: "Stavební", en: "Building" };
d[64] = { cs: "Pozemková", en: "Land" };
d[65] = { cs: "neuvedeno", en: "unknown" };
d[66] = { cs: "Domovní číslo: ", en: "House number: " };
d[67] = { cs: "Počet bytů: ", en: "Number of flats: " };
d[68] = { cs: "Počet podlaží: ", en: "Number of floors: " };
d[69] = { cs: "Typ stavebního objektu (kód): ", en: "Structure type (code): " };
d[70] = { cs: "Způsob využití (kód): ", en: "Method of use (code): " };
d[71] = { cs: "URL neobsahuje /rest/services/. Nelze pokračovat.", en: "URL does not contain/rest/services/. Cannot continue." };
d[72] = { cs: "Typ služby nebyl rozpoznán.", en: "The service type is not recognized." };
d[73] = { cs: "Není zadána URL.", en: "URL is not specified." };
d[74] = { cs: "URL není rozčleněna znakem /.", en: "URL not separated by /." };
d[75] = { cs: "URL nezačíná http:// nebo https://.", en: "URL does not begin with http:// or https://." };
d[76] = { cs: "souřadnicový systém mapy", en: "map coordinate system" };
d[77] = { cs: "souřadnicový systém mapy (starší)", en: "older map coordinate system" };
d[78] = { cs: "nepodporovaný", en: "unsupported" };
d[79] = { cs: "Vybraný souřadicový systém připojované OGC služby neodpovídá souřadnicovému systému mapy. Změňte souřadnicový systém mapy přes rozbalovací menu aplikace.", en: "The selected coordinate system attached to the OGC service does not match the coordinate system of the map. Change the map coordinate system via the application drop-down menu." };
d[80] = { cs: "Na tento typ objektu nejsme připravení. Kontaktujte prosím podporu.", en: "We are not ready for this type of object. Please contact support." };
d[81] = { cs: "Převod do souřadnicového systému mapy se nezdařil.", en: "Conversion to map coordinate system failed." };
d[82] = { cs: "Převod souřadnic...", en: "Coordinate conversion..." };
d[83] = { cs: "GPX neobsahuje tracks", en: "GPX does not contain tracks" };
d[84] = { cs: "Načítání...", en: "Loading..." };
d[85] = { cs: "Produkt, který chcete exportovat možná není ten, na který se díváte v mapě.\n\nDoporučujeme zkontrolovat Seznam vrstev.", en: "The product you want to export may not be the one you are looking at in the map.\n\nWe recommend checking the Layer List." };
d[86] = { cs: "Vyberte .gpx soubor obsahující tracks (stopy).", en: "Select the. gpx file containing tracks (tracks)." };
d[87] = { cs: "Zapnout režim Výpis souřadnic bodu", en: "Turn on point List coordinate mode" };
d[88] = { cs: "Režim Výpis souřadnic bodu je aktivní", en: "Point list coordinate mode is active" };
d[89] = { cs: "Souřadnice", en: "Coordinate" };
d[91] = { cs: "Souřadnice X není číslo", en: "Coordinate X is not a number" };
d[90] = { cs: "Souřadnice Y není číslo", en: "Coordinate Y is not a number" };
d[92] = { cs: "Probíhá lokalizace", en: "Localization in progress" };
d[93] = { cs: "Lokalizovat chybu", en: "Localize error" };
d[94] = { cs: "Hlášení bylo úspěšně vloženo do systému.", en: "The report was successfully inserted into the system." };
d[95] = { cs: "Potvrzení o přijetí hlášení o chybě bylo zasláno na Váš e-mail.", en: "Confirmation of receipt of the error report has been sent to your e-mail address." };
d[96] = { cs: "Nebyly přiloženy žádné přílohy.", en: "No attachments were attached." };
d[97] = { cs: "Do systému bylo zadáno nové hlášení o chybě.", en: "A new error report has been entered into the system." };
d[98] = { cs: "Číslo jednací: ", en: "Reference Number: " };
d[99] = { cs: "Hlášení bylo úspěšně vloženo do systému, ale selhalo odeslání informačního e-mailu pracovníkům ZÚ. Pokud chcete urychlit řešení Vašeho hlášení o chybě, zašlete informaci o vložení hlášení na adresu: ", en: "The report was successfully inserted into the system, but failed to send the information e-mail to the ZÚ personnel. If you want to speed up the resolution of your error report, please send the message to the following address: " };
d[100] = { cs: "Omlouváme se, selhalo odeslání informačního e-mailu pracovníkům ZÚ. Pokud chcete urychlit řešení Vašeho hlášení o chybě, zašlete informaci o vložení hlášení na adresu: ", en: "Sorry, failed to send the information email to the ZÚ personnel. If you want to speed up the resolution of your error report, please send the message to the following address: " };
d[101] = { cs: "Popis chyby: ", en: "Error description: " };
d[102] = { cs: "Uživatel: ", en: "User: " };
d[103] = { cs: "Seznam příloh: ", en: "List of attachments: " };
d[104] = { cs: "Děkujeme za zaslání chybového hlášení, o výsledku prošetření Vás budeme informovat.", en: "Thank you for sending the error report, we will inform you about the outcome of the inquiry." };
d[105] = { cs: "Tento e-mail je generován automaticky, neodpovídejte na něj. V případě potřeby kontaktujte našeho pracovníka:", en: "This e-mail is generated automatically, do not reply to it. If necessary, contact our worker:" };
d[106] = { cs: "telefon: 284 041 439 (pracovní dny 9-14 hodin)", en: "phone: 284 041 439 (working days 9-14 hours)" };
d[107] = { cs: "Přijato hlášení o chybě v datech Zeměměřického úřadu", en: "Received bug report in survey authority data" };
d[108] = { cs: "Potvrzení o přijetí hlášení o chybě na Váš e-mail se nepodařilo odeslat.", en: "Confirmation of receipt of error report failed to send to your email." };
d[109] = { cs: "Záznam byl odeslán úspěšně i s přílohou.", en: "The record was sent successfully with the attachment." };
d[110] = { cs: "Uložení přílohy selhalo. Důvodem může být velikost přílohy nebo nepovolený typ soubor. Záznam byl odeslán bez přílohy. Přílohu je možné ale dodatečně připojit ve vyskakovacím okně červené chyby.", en: "Saving the attachment failed. This may be because the attachment size or the file type is not allowed. The record was sent without an attachment. However, the attachment can be added to the red Error pop-up window." };
d[111] = { cs: "Omlouváme se, ale záznam se nepodařilo odeslat.", en: "Sorry, the record failed to send." };
d[112] = { cs: "Chybu je potřeba před odesláním lokalizovat. Pro lokalizaci chyby klikněte na tlačítko Lokalizovat chybu a potom klikněte do mapy.", en: "The error must be localized before it is sent. To locate the error, click Locate the error, and then click on the map." };
d[113] = { cs: "Vyplňte prosím Váš e-mail.", en: "Please fill in your email." };
d[114] = { cs: "Vyplňte prosím v e-mailu @.", en: "Please fill in @ email." };
d[115] = { cs: "Vyplňte prosím doménu v e-mailu.", en: "Please fill in the domain in the email." };
d[116] = { cs: "Vyplňte prosím popis chyby.", en: "Please fill in the error description." };
d[117] = { cs: "Vyplňte prosím delší popis chyby.", en: "Please complete a longer description of the error." };
d[118] = { cs: "Je nutné souhlasit se zpracováním osobních údajů.", en: "It is necessary to agree to the processing of personal data." };
d[119] = { cs: "Nakreslené geometrie obsahují příliš mnoho vrcholů. Upravte geometrie, takto nebudou odeslány.", en: "Drawing geometry contains too many vertices. Edit the geometry so it will not be sent." };
d[120] = { cs: "Mapa obsahuje vrstvu vytvořenou z GPX souboru, která nedovoluje změnu souř. systému mapy. Pro změnu souřad. systému odpojte tuto vrstvu z mapy. Změna souřadného systému mapy nebyla provedena.", en: "The map contains a layer created from a GPX file that does not allow the change of the competition. The map system. To change the series. System, detach this layer from the map. Change of map coordinate system was not performed." };
d[121] = { cs: "Mapa obsahuje uživatelem připojenou WMS nebo WMTS, která nepodporuje souřadný systém ", en: "The map contains a user-connected WMS or WMTS that does not support a coordinate system " };
d[122] = { cs: ". Pro změnu souřad. systému odpojte tuto vrstvu z mapy. Změna souřadného systému mapy nebyla provedena.", en: ". To change the series. System, detach this layer from the map. Change of map coordinate system was not performed." };
d[123] = { cs: "Změna souřadnicového systému je možná jen ve 2D.", en: "Changing the coordinate system is possible in 2D only." };
d[124] = { cs: "Mapová kompozice: ", en: "Map composition: " };
d[125] = { cs: "Základní topografické mapy ČR", en: "Base topographic maps of the CR" };
d[126] = { cs: "výškopis", en: "altimetry" };
d[127] = { cs: "ZABAGED® - Výškopis - DMR 4G", en: "ZABAGED® - Altimetry - DMR 4G" };
d[128] = { cs: "ZABAGED® - Výškopis - DMR 5G", en: "ZABAGED® - Altimetry - DMR 5G" };
d[129] = { cs: "ZABAGED® - Výškopis - DMP 1G", en: "ZABAGED® - Altimetry - DMP 1G" };
d[130] = { cs: "Ortofoto ČR", en: "Ortophoto CR" };
d[131] = { cs: "Archivní ortofoto", en: "Archive ortophoto" };
d[132] = { cs: "Ortofoto CIR", en: "Ortophoto CIR" };
d[133] = { cs: "Dokreslit do mapy plochu", en: "Draw an area on the map" };
d[134] = { cs: "Odstranit nakreslenou plochu", en: "Delete a drawed area" };
d[135] = { cs: "Ukončit kreslení", en: "End draw" };
d[136] = { cs: "Územní jednotky (UX)", en: "Units eXtended (UX)" };
d[137] = { cs: "Katastrální mapy", en: "Cadastral maps" };
d[138] = { cs: "Bodová pole", en: "Geodetic control" };
d[139] = { cs: "Parcely", en: "Parcels" };
d[140] = { cs: "Zeměpisná jména", en: "Geographical Names" };
d[141] = { cs: "Vodstvo", en: "Hydrography" };
d[142] = { cs: "Dopravní sítě", en: "Transport Networks" };
d[143] = { cs: "Územní správní jednotky", en: "Administrative Units" };
d[144] = { cs: "Budovy", en: "Building" };
d[145] = { cs: "Nadmořská výška", en: "Elevation" };
d[146] = { cs: "Ortofotosnímky", en: "Orthoimagery" };
d[147] = { cs: "Vlastní", en: "Custom" };
d[148] = { cs: "Název katastrálního území", en: "Name of cadastral territory" };
d[149] = { cs: "Druh pozemku", en: "Type of land" };
d[150] = { cs: "Jednoznačný identifikátor parcely", en: "Unique identifier of the parcel" };
d[151] = { cs: "Kód katastrálního území", en: "Cadastral territory Code" };
d[152] = { cs: "Nepodařilo se najít katastr v seznamu katastrů ČR", en: "Failed to find the cadastres in the list of the Czech Republic" };
d[153] = { cs: "Region soudržnosti", en: "Cohesion region" };
d[154] = { cs: "Název", en: "Name" };
d[155] = { cs: "Kód", en: "Code" };
d[156] = { cs: "Okres", en: "County" };
d[157] = { cs: "Obec s rozšířenou působností", en: "Municipality with extended scope" };
d[158] = { cs: "Kód obce s rozšířenou působností", en: "Municipality code with extended scope" };
d[159] = { cs: "Kód správní obce", en: "Administrative municipality code" };
d[160] = { cs: "Vyhledávání se nezdařilo.", en: "Search failed." };
d[161] = { cs: "Obec s pověřeným úřadem", en: "Municipality with an authorised office" };
d[162] = { cs: "Kód obce s pověřeným úřadem", en: "Code of the municipality with the authorised office" };
d[163] = { cs: "Kód obce", en: "Municipality code" };
d[164] = { cs: "Část obce", en: "Part of the municipality" };
d[165] = { cs: "Kód části obce", en: "Part of the municipality code" };
d[166] = { cs: "Základní sídelní jednotka", en: "Basic settlement unit" };
d[167] = { cs: "Kód základní sídelní jednotky", en: "Basic settlement unit code" };
d[168] = { cs: "KÚ", en: "CU" };
d[169] = { cs: "Základní topografická mapa", en: "Base topographic map" };
d[170] = { cs: "Souřadnice byly zkopírovány do Vaší schránky", en: "Coordinates were copied into your clipborad." };
d[171] = { cs: " je možné prohlížet pouze v souřadnicovém systému EPSG: 5514, JTSK/Krovak\n\nPro přechod do aplikace prosím změňte souřadnicový systém Geoprohlížeče.", en: " can only be viewed in the coordinate system EPSG: 5514, JTSK/Krovak\n\nTo switch to the application please change the coordinate system of the geoviewer." };
d[172] = { cs: "Aby funkce Překrývání fungovala, musíte do mapy přidat nějaké produkty. Funkce nevyužívá podkladové mapy.", en: "You need to add some products to the map to make the overlap function work. The function does not use the basemap." };
d[173] = { cs: "Nechci vybrat nic", en: "I don't want to choose anything" };
d[174] = { cs: "Před odesláním je potřeba vyplnit o jaký typ stavby a stavební činnosti se jedná.", en: "Before dispatch, you need to fill in the type of construction and construction activities." };
d[175] = { cs: "Vyplňte prosím pole 'Jméno'.", en: "Please fill in the 'Name' field." };
d[176] = { cs: "Vyplňte prosím pole 'Příjmení'.", en: "Please fill in the 'Last Name' field." };
d[177] = { cs: "Vyplňte prosím pole 'Ulice'.", en: "Please fill in the 'Street' field." };
d[178] = { cs: "Vyplňte prosím pole 'č. p.'.", en: "Please fill in the 'No.' Field." };
d[179] = { cs: "Vyplňte prosím pole 'Obec'.", en: "Please fill in the 'Municipality' field." };
d[180] = { cs: "Vyplňte prosím pole 'PSČ'.", en: "Please fill in the 'Zip code' field." };
d[181] = { cs: "Vyplňte prosím pole 'Název firmy'.", en: "Please fill in the 'Company name' field." };
d[182] = { cs: "Vyplňte prosím pole 'IČO'.", en: "Please fill in the 'IČO' field." };
d[183] = { cs: "Vyplňte prosím 8 čísel v poli 'IČO'.", en: "Please fill in the 8 numbers in the 'IČO' field." };
d[184] = { cs: "Prostorové vymezení projektu není zakresleno.\n\nVyznačte prosím nejdříve zájmové území do mapy.", en: "The spatial delimitation of the project is not plotted.\n\nPlease Mark the interest area first in the map." };
d[185] = { cs: "Tato funkce je dostupná pouze v souřadnicovém systém S-JTSK (EPSG 5514).", en: "This feature is only available in the S-JTSK coordinate system (EPSG 5514)." };
d[186] = { cs: "Vyjádření se zpracovává", en: "The statement is processed" };
d[187] = { cs: "Vyjádření bylo úspěšně odesláno na Váš e-mail", en: "The statement was successfully sent to your e-mail" };
d[188] = { cs: "Úlohu se nepodařilo dokončit. Vyjádření nebylo odesláno na Váš e-mail.", en: "The job failed to start. The statement has not been sent to your e-mail." };
d[189] = { cs: "Projekt je mimo území ČR nebo oblast s výškovými daty.\n\nOpravte prosím vyznačené zájmové území.", en: "The project is outside the territory of the Czech Republic or an area with altitude data.\n\nPlease correct the indicated area of interest." };
d[190] = { cs: "Opravte prosím Vaši Emailovou adresu.", en: "Please correct your email address." };
d[191] = { cs: "WFS služba databáze bodového pole je momentálně nedostupná.\n\nOpakujte akci později prosím, pracujeme na opravě problému.", en: "WFS The Point Field Database service is currently unavailable.\n\nPlease try again later, we are working on fixing the problem." };
d[192] = { cs: "Opravte prosím vyznačené zájmové území.", en: "Please correct the indicated area of interest." };
d[193] = { cs: "Odeslat", en: "Submit" };
d[194] = { cs: "Odeslaná hlášení", en: "Sent reports" };
d[195] = { cs: "Datová sada", en: "Data set" };
d[196] = { cs: "Jméno a příjmení", en: "Name and surname" };
d[197] = { cs: "Příloha", en: "Attachment" };
d[198] = { cs: "Dodatečně přidat přílohu", en: "Additionally add attachment" };
d[199] = { cs: "Přidat přílohu", en: "Add attachment" };
d[200] = { cs: "Seznam vrstev:", en: "List of layers:" };
d[201] = { cs: "Náhled", en: "Thumbnail:" };
d[202] = { cs: "Popis služby", en: "Service description" };
d[203] = { cs: "Detailní metadata", en: "Detailed metadata" };
d[204] = { cs: "Lokalizace služby", en: "Service localization" };
d[205] = { cs: "Podmínky použití", en: "Terms of use" };
d[206] = { cs: "Obchodní kód", en: "Business code" };
d[207] = { cs: "Prohlížecí služba WMS pro Katastrální mapu (KM)", en: "WMS View Service for the Cadastral Map (KM)" };
d[208] = { cs: "Prohlížecí služba WMS KN poskytuje možnost prohlížet obraz katastrální mapy složený z DKM, KMD, KM-D a OMP. Služba splňuje standard OGC WMS 1.1.1. a 1.3.0. Služba byla vytvořena za účelem zobrazování katastrální mapy nad rámec Směrnice INSPIRE. Služba umožňuje zobrazovat nejen digitální nebo digitalizovanou mapu, ale je doplněna analogovou mapou v místech, kde není digitální nebo digitalizovaná mapa k dipozici. Navíc obsahuje další náležitosti katastrální mapy, jako je vnitřní kresba atd.", en: "WMS KN view service provides a possibility to view image of cadastral map composed of the Digital Cadastral Map, both types of Cadastral Map - Digitized and Orientation Parcel Map. The service fulfils the OGC WMS 1.1.1 and 1.3.0 standards. Service was created in purpose of viewing cadastral map beyond the frame of INSPIRE Directive. Service allows to view not only digital or digitized cadastral map, but analogue map as well on places, where digital or digitized map is not available. Moreover, it contains other requirements of the cadastral map, such as inner drawings etc." };
d[209] = { cs: "Prohlížecí služba Esri ArcGIS Server - Bodová pole", en: "Esri ArcGIS Server View Service - Geodetic controls" };
d[210] = { cs: "Prohlížecí služba Bodová pole je poskytována jako veřejná služba nad aktuálními daty Databáze bodových polí ČR. Data jsou poskytována ve formě mapové služby, dále jako WMS a WFS.", en: "The Geodetic Control view service is provided as a public service for the current data of the Geodetic Control Database of the Czech Republic. The data is provided in the form of a map service, hereinafter referred to as WMS and WFS." };
d[211] = { cs: "Prohlížecí služba Esri ArcGIS Server – ZTM 10", en: "Esri ArcGIS Server View Service – ZTM 10" };
d[212] = { cs: "Prohlížecí služba Esri ArcGIS Server – ZTM 10 je poskytována jako veřejná prohlížecí služba nad daty Základní topografické mapy České republiky 1 : 10 000. Jedná se o prohlížecí službu poskytovanou technologií Esri ArcGIS Server. Službu lze využít prostřednictvím přístupových rozhraní REST, SOAP a WMTS formou optimalizovaných mapových dlaždic v souřadnicovém systému S-JTSK/Krovak East North (EPSG 5514). Dále lze službu využít v různých souřadnicových systémech (definovaných v capabilities) prostřednictvím standardu WMS. ", en: "Esri ArcGIS Server View Service – ZTM 10 is provided as a public view service for the Base Topographic Map of the Czech Republic 1 : 10 000. The view service is provided using the Esri ArcGIS Server technology. The Service is accessible by one of access interfaces – REST, SOAP, WMTS using optimized map tiles in S-JTSK coordinate reference system (EPSG:5514). The service also supports WMS interface and various coordinate reference systems (listed in capabilities). " };
d[213] = { cs: "Prohlížecí služba Esri ArcGIS Server – ZTM 25", en: "Esri ArcGIS Server View Service – ZTM 25" };
d[214] = { cs: "Prohlížecí služba Esri ArcGIS Server – ZTM 25 je poskytována jako veřejná prohlížecí služba nad daty Základní topografické mapy České republiky 1 : 25 000. Jedná se o prohlížecí službu poskytovanou technologií Esri ArcGIS Server. Službu lze využít prostřednictvím přístupových rozhraní REST, SOAP a WMTS formou optimalizovaných mapových dlaždic v souřadnicovém systému S-JTSK/Krovak East North (EPSG 5514). Dále lze službu využít v různých souřadnicových systémech (definovaných v capabilities) prostřednictvím standardu WMS. ", en: "Esri ArcGIS Server View Service – ZTM 25 is provided as a public view service for the Base Topographic Map of the Czech Republic 1 : 25 000. The view service is provided using the Esri ArcGIS Server technology. The Service is accessible by one of access interfaces – REST, SOAP, WMTS using optimized map tiles in S-JTSK coordinate reference system (EPSG:5514). The service also supports WMS interface and various coordinate reference systems (listed in capabilities). " };
d[215] = { cs: "Prohlížecí služba Esri ArcGIS Server – ZTM 50", en: "Esri ArcGIS Server View Service – ZTM 50" };
d[216] = { cs: "Prohlížecí služba Esri ArcGIS Server – ZTM 50 je poskytována jako veřejná prohlížecí služba nad daty Základní topografické mapy České republiky 1 : 50 000. Jedná se o prohlížecí službu poskytovanou technologií Esri ArcGIS Server. Službu lze využít prostřednictvím přístupových rozhraní REST, SOAP a WMTS formou optimalizovaných mapových dlaždic v souřadnicovém systému S-JTSK/Krovak East North (EPSG 5514). Dále lze službu využít v různých souřadnicových systémech (definovaných v capabilities) prostřednictvím standardu WMS.", en: "Esri ArcGIS Server View Service – ZTM 50 is provided as a public view service for the Base Topographic Map of the Czech Republic 1 : 50 000. The view service is provided using the Esri ArcGIS Server technology. The Service is accessible by one of access interfaces – REST, SOAP, WMTS using optimized map tiles in S-JTSK coordinate reference system (EPSG:5514). The service also supports WMS interface and various coordinate reference systems (listed in capabilities). " };
d[217] = { cs: "Prohlížecí služba Esri ArcGIS Server – ZTM 100", en: "Esri ArcGIS Server View Service – ZTM 100" };
d[218] = { cs: "Prohlížecí služba Esri ArcGIS Server – ZTM 100 je poskytována jako veřejná prohlížecí služba nad daty Základní topografické mapy České republiky 1 : 100 000. Jedná se o prohlížecí službu poskytovanou technologií Esri ArcGIS Server. Službu lze využít prostřednictvím přístupových rozhraní REST, SOAP a WMTS formou optimalizovaných mapových dlaždic v souřadnicovém systému S-JTSK/Krovak East North (EPSG 5514). Dále lze službu využít v různých souřadnicových systémech (definovaných v capabilities) prostřednictvím standardu WMS. ", en: "Esri ArcGIS Server View Service – ZTM 100 is provided as a public view service for the Base Topographic Map of the Czech Republic 1 : 100 000. The view service is provided using the Esri ArcGIS Server technology. The Service is accessible by one of access interfaces – REST, SOAP, WMTS using optimized map tiles in S-JTSK coordinate reference system (EPSG:5514). The service also supports WMS interface and various coordinate reference systems (listed in capabilities). " };
d[219] = { cs: "Prohlížecí služba Esri ArcGIS Server – ZTM 250", en: "Esri ArcGIS Server View Service – ZTM 250" };
d[220] = { cs: "Prohlížecí služba Esri ArcGIS Server – ZTM 250 je poskytována jako veřejná prohlížecí služba nad daty Základní topografické mapy České republiky 1 : 250 000. Jedná se o prohlížecí službu poskytovanou technologií Esri ArcGIS Server. Službu lze využít prostřednictvím přístupových rozhraní REST, SOAP a WMTS formou optimalizovaných mapových dlaždic v souřadnicovém systému S-JTSK/Krovak East North (EPSG 5514). Dále lze službu využít v různých souřadnicových systémech (definovaných v capabilities) prostřednictvím standardu WMS. ", en: "Esri ArcGIS Server View Service – ZTM 250 is provided as a public view service for the Base Topographic Map of the Czech Republic 1 : 250 000. The view service is provided using the Esri ArcGIS Server technology. The Service is accessible by one of access interfaces – REST, SOAP, WMTS using optimized map tiles in S-JTSK coordinate reference system (EPSG:5514). The service also supports WMS interface and various coordinate reference systems (listed in capabilities). " };
d[221] = { cs: "Prohlížecí služba WMS - Přehledové mapy ČR", en: "WMS view service - Overview maps of the CR" };
d[222] = { cs: "Prohlížecí služba WMS-PREHLEDKY je poskytována jako veřejná prohlížecí služba nad daty Mapy ČR 1:500 000, Mapy ČR 1:1 000 000 a Mapy ČR 1:2 000 000. Slouží především jako vhodný podklad pro navigaci v území ČR. Služba splňuje Technické pokyny pro INSPIRE prohlížecí služby v. 3.11 a zároveň splňuje standard OGC WMS 1.1.1. a 1.3.0.", en: "WMS-PREHLEDKY-P view service is provided as a public view service for the Map of the Czech Republic 1:500,000, Map of the Czech Republic 1:1,000,000 and Map of the Czech Republic 1:2,000,000 data. It serves above all as a suitable background for navigation in the territory of the Czech Republic. The service fulfils Technical guidance for INSPIRE view services v. 3.11 and simultaneously fulfils the OGC WMS 1.1.1 and 1.3.0 standards." };
d[223] = { cs: "Prohlížecí služba Esri ArcGIS Server - ZABAGED®", en: "Esri ArcGIS Server View Service - ZABAGED®" };
d[224] = { cs: "Prohlížecí služba ZABAGED - POLOHOPIS je poskytována jako veřejná prohlížecí služba nad daty ZABAGED® - polohopis. Jedná se o prohlížecí službu poskytovanou technologií Esri ArcGIS Server. Službu lze využít prostřednictvím rozhraní REST, SOAP, WMS a WFS.", en: "The viewing service ZABAGED® - PLANIMETRY is provided as a public viewing service over data ZABAGED® - planimetry. This is a viewing service provided by Esri ArcGIS Server technology. The service can be used via REST, SOAP, WMS and WFS." };
d[225] = { cs: "Prohlížecí služba Esri ArcGIS Server - ZABAGED® - VRSTEVNICE", en: "Esri ArcGIS Server View Service - ZABAGED® - CONTOUR" };
d[226] = { cs: "Prohlížecí služba ZABAGED® - VRSTEVNICE je poskytována jako veřejná prohlížecí služba nad daty ZABAGED® - výškopis. Jedná se o prohlížecí službu poskytovanou technologií Esri ArcGIS Server. Službu lze využít prostřednictvím rozhraní REST, SOAP, WMS a WFS.", en: "The viewing service ZABAGED® - CONTOUR is provided as a public viewing service over data ZABAGED® - altimetry. This is a viewing service provided by Esri ArcGIS Server technology. The service can be used via REST, SOAP, WMS and WFS." };
d[227] = { cs: "Prohlížecí služba Esri ArcGIS Server – ZTM 5", en: "Esri ArcGIS Server View Service – ZTM 5" };
d[228] = { cs: "Prohlížecí služba Esri ArcGIS Server – ZTM 5 je poskytována jako veřejná prohlížecí služba nad daty Základní topografické mapy České republiky 1 : 5 000. Jedná se o prohlížecí službu poskytovanou technologií Esri ArcGIS Server. Službu lze využít prostřednictvím přístupových rozhraní REST, SOAP a WMTS formou optimalizovaných mapových dlaždic v souřadnicovém systému S-JTSK/Krovak East North (EPSG 5514). Dále lze službu využít v různých souřadnicových systémech (definovaných v capabilities) prostřednictvím standardu WMS.", en: "Esri ArcGIS Server View Service – ZTM 5 is provided as a public view service for the Base Topographic Map of the Czech Republic 1 : 5 000. The view service is provided using the Esri ArcGIS Server technology. The Service is accessible by one of access interfaces – REST, SOAP, WMTS using optimized map tiles in S-JTSK coordinate reference system (EPSG:5514). The service also supports WMS interface and various coordinate reference systems (listed in capabilities). " };
d[229] = { cs: "IMAGE služba Esri ArcGIS Server - DMR 4G", en: "Esri ArcGIS Server IMAGE Service - DMR 4G" };
d[230] = { cs: "IMAGE služba Esri ArcGIS Server - DMR 4G je poskytována jako veřejná služba pro využití datové sady Digitální model reliéfu České republiky 4. generace (DMR 4G). Zdrojová data pro službu jsou umístěna v souřadnicovém systému S-JTSK/Krovak East North (EPSG 5514). Rozhraní služby poskytuje data ve formě stínovaného modelu reliéfu (v šedé škále nebo obarveného), případně umožňuje zobrazit data podle orientace nebo sklonitosti svahů. Dále lze službu využít i prostřednictvím standardu WMS.", en: "Esri ArcGIS Server IMAGE Service - DMR 4G is provided as a public service to use Digital Terrain Model of the Czech Republic of the 4th generation (DMR 4G). Source data in S-JTSK/Krovak East North (EPSG 5514) coordinate reference system. This service is set for providing of the data in various forms: GrayscaleHillshade, AspectRGBMap, SlopeRGBMap, SlopeRGBMap2, TintedHillshadeContinuous." };
d[231] = { cs: "IMAGE služba Esri ArcGIS Server - DMR 5G", en: "Esri ArcGIS Server IMAGE Service - DMR 5G" };
d[232] = { cs: "IMAGE služba Esri ArcGIS Server - DMR 5G je poskytována jako veřejná služba pro využití datové sady Digitální model reliéfu České republiky 5. generace (DMR 5G). Zdrojová data pro službu jsou umístěna v souřadnicovém systému S-JTSK/Krovak East North (EPSG 5514). Rozhraní služby poskytuje data ve formě stínovaného modelu reliéfu (v šedé škále nebo obarveného), případně umožňuje zobrazit data podle orientace nebo sklonitosti svahů. Dále lze službu využít (v různých souřadnicových systémech, definovaných v capabilities) i prostřednictvím standardu WMS.", en: "Esri ArcGIS Server IMAGE Service - DMR 5G is provided as a public service to use Digital Terrain Model of the Czech Republic of the 5th generation (DMR 5G). Source data in S-JTSK/Krovak East North (EPSG 5514) coordinate reference system. This service is set for providing of the data in various forms: GrayscaleHillshade, AspectRGBMap, SlopeRGBMap, SlopeRGBMap2, TintedHillshadeContinuous." };
d[233] = { cs: "IMAGE služba Esri ArcGIS Server - DMP 1G", en: "Esri ArcGIS Server IMAGE Service - DMP 1G" };
d[234] = { cs: "IMAGE služba Esri ArcGIS Server - DMP 1G je poskytována jako veřejná služba pro využití datové sady Digitální model povrchu České republiky 1. generace (DMP 1G). Rozhraní služby poskytuje data ve formě stínovaného modelu povrchu (v šedé škále nebo obarveného), případně umožňuje zobrazit data podle orientace nebo sklonitosti svahů. Dále lze službu využít (v různých souřadnicových systémech, definovaných v capabilities) i prostřednictvím standardu WMS.", en: "Esri ArcGIS Server IMAGE Service - DMP 1G is provided as a public service to use Digital Surface Model of the Czech Republic of the 1st generation (DMP 1G). This service is set for providing of the data in various forms: GrayscaleHillshade, AspectRGBMap, SlopeRGBMap, SlopeRGBMap2, TintedHillshadeContinuous." };
d[235] = { cs: "Prohlížecí služba Esri ArcGIS Server - Ortofoto ČR", en: "Esri ArcGIS Server View Service - Orthophoto CR" };
d[236] = { cs: "Prohlížecí služba Esri ArcGIS Server - Ortofoto ČR je poskytována jako veřejná prohlížecí služba nad daty ortofota České republiky. Jedná se o prohlížecí službu poskytovanou technologií Esri ArcGIS Server. Službu lze využít prostřednictvím přístupových rozhraní REST, SOAP a WMTS formou optimalizovaných mapových dlaždic v souřadnicovém systému S-JTSK/Krovak East North (EPSG 5514). Dále lze službu využít v různých souřadnicových systémech (definovaných v capabilities) prostřednictvím standardu WMS.", en: "Esri ArcGIS Server View Service - Orthophoto CR is provided as a public view service for the Orthophoto of the Czech Republic data. The view service is provided using the Esri ArcGIS Server technology. To optimize the speed, the data are provided in form of pre-prepared map tiles. The Service is accessible by one of access interfaces – REST, SOAP, WMTS and WMS." };
d[237] = { cs: "Prohlížecí služba WMS - Archivní ortofoto", en: "WMS view service - Archive Orthophoto" };
d[238] = { cs: "Prohlížecí služba WMS-ORTOARCHIV je poskytována jako veřejná prohlížecí služba nad archivnimi daty ortofota České republiky. Každá vrstva služby obsahuje vždy letecké snímkování z jednoho kalendářního roku. Archivní ortofoto černobílé je zobrazeno od r. 1998 do r. 2001, barevné od roku 2002 (zkušební) do roku 2016. Služba splňuje Technické pokyny pro INSPIRE prohlížecí služby v. 3.11 a zároveň splňuje standard OGC WMS 1.1.1. a 1.3.0.", en: "WMS-ORTOARCHIV view service is provided as a public view service for the product Archive Orthophoto of the Czech Republic. The service fulfils Technical guidance for INSPIRE view services v. 3.11 and simultaneously fulfils the OGC WMS 1.1.1 and 1.3.0 standards." };
d[239] = { cs: "Prohlížecí služba WMS - ortofoto CIR", en: "WMS view service - Orthophoto CIR" };
d[240] = { cs: "Prohlížecí služba WMS-ORTOCIR je poskytována jako veřejná prohlížecí služba nad archivními daty CIR (z ang. Color InfraRed) ortofota České republiky. Každá vrstva služby obsahuje vždy CIR ortofota z jednoho kalendářního roku. CIR ortofoto České republiky je poskytováno od roku 2010. CIR ortofot (ortofoto v nepravých barvách) vzniká z leteckých měřických snímků, kde je červené pásmo nahrazeno blízkým infračerveným pásmem, zelené pásmo červeným a modré zeleným. CIR ortofoto nachází využití především při vyhodnocení stavu vegetace. Zdravá vegetace je reprezentována sytě červenou barvou. CIR ortofoto bylo vytvářeno Ústavem pro hospodářskou úpravu lesů (ÚHÚL) ze stejných snímků, ze kterých je vytvářeno „klasické“ ortofoto. Služba splňuje Technické pokyny pro INSPIRE prohlížecí služby v. 3.11 a zároveň splňuje standard OGC WMS 1.1.1. a 1.3.0.", en: "WMS-ORTOCIR is provided as public viewing service over archive CIR (Color InfraRed) orthophotos of Czech Republic. Each service layer contains CIR orthophoto from one calendar year. CIR orthophoto of Czech Republic is provided for data since 2010. CIR orthophoto (also called false color orthophoto) is created from aerial images, where the red band is replaced by near infrared band, green band by red band and blue band by green band. CIR orthophoto is used mainly for the evaluation of vegetation condition. Healthy vegetation is represented by deep red color. CIR orthophoto is created by Forest Management Institute (FMI) from the same aerial images which the “classical” orthophoto is created. The service meets Technical orders for INSPIRE viewing services in 3.11 and also meets OGC standard WMS 1.1.1 and 1.3.0." };
d[241] = { cs: "Převzít označenou geometrii", en: "Use marked geometry" };
d[242] = { cs: "Posunout nahoru", en: "Move up" };
d[243] = { cs: "Posunout dolů", en: "Mode down" };
d[244] = { cs: "MČR 1 : 4 000 000", en: "Map of the CR 1 : 4 000 000" };
d[245] = { cs: "ZABAGED® - Výškopis - DMPOK", en: "ZABAGED® - Altimetry - DMPOK" };
d[246] = { cs: "IMAGE služba Esri ArcGIS Server - DMP OK je poskytována jako veřejná služba pro využití datové sady Digitální model povrchu České republiky z obrazové korelace (DMP OK). Službu lze využít (v různých souřadnicových systémech, definovaných v capabilities) i prostřednictvím standardu WMS.", en: "Esri ArcGIS Server IMAGE Service - DMP OK is provided as a public service to use Digital Surface Model of the Czech Republic from image correlation (DMP OK)." };
d[247] = { cs: "Prohlížecí služba WMS pro Územní jednotky (UX)", en: "WMS View Service for the Units eXtended (UX)" };
d[248] = { cs: "Prohlížecí služba WMS pro téma Units eXtended (UX) je veřejná prohlížecí služba pro poskytování dat týkajících se jednotek spravovaných resortem ČÚZK. Jedná se o neharmonizované rozšíření INSPIRE tématu Územní správní jednotky o evidenční, statistické a historické jednotky. Služba je dostupná na celém území České republiky. Služba splňuje technické pokyny pro INSPIRE prohlížeci služby ve verzi 3.11 a zároveň standardy OGC WMS 1.1.1 a 1.3.0.", en: "View service for theme Units eXtended (UX) is a public view service for the provision of data relating to units managed by the COSMC (Czech Office for Surveying, Mapping and Cadastre). Service is a non-harmonized extension to INSPIRE theme Administrative units (AU) by identification units, statistical units and historical units. The service is available for the whole area of the Czech Republic. The service fulfils technical guidance for INSPIRE view services v. 3.11 and simultaneously fulfils the OGC WMS 1.1.1 and 1.3.0 standards." };
d[249] = { cs: "Prohlížecí služba Esri ArcGIS Server - RÚIAN", en: "AGS view service - RUIAN" };
d[250] = { cs: "Prohlížecí služba nad daty Registru územní identifikace adres a nemovitostí (RÚIAN) je poskytována prostřednictvím rozhraní REST a WMS. Rozhraní služby poskytuje i dotazování na atributové záznamy objektů RÚIAN (v případě WMS pomocí operace GetFeatureInfo). Zdrojová data služby jsou denně aktualizována pomocí aplikace Veřejný dálkový přístup k RÚIAN (VDP).", en: "The view service for the data of the Registry of Territorial Identification of Addresses and Real Estate (RÚIAN) is provided via the REST and WMS interfaces. The service interface also provides querying of attribute records of RÚIAN objects (in the case of WMS using the GetFeatureInfo operation). The source data of the service is updated daily using the Public Remote Access to RÚIAN (VDP) application." };
d[251] = { cs: "Prohlížecí služba Esri ArcGIS Server - Data50", en: "AGS view service - Data50" };
d[252] = { cs: "Prohlížecí služba AGS-Data50 je poskytována jako veřejná prohlížecí služba nad daty topografické databáze České republiky Data50. Kartografická vizualizace objektů vychází z podoby Základní mapy 1:50 000. Služba může být využita jako vektorová podkladová mapa ČR pro měřítka od cca 1:60 000 do cca 1:25 000.", en: "AGS-Data50 view service is provided as a public view service for the Topographic Database of the Czech Republic Data50. The cartographic visualization of objects is based on the Base Map 1:50,000. The service can be used as a vector background map of the Czech Republic for scales from approx. 1:60,000 to approx. 1:25,000." };
d[253] = { cs: "Prohlížecí služba Esri ArcGIS Server - Data250", en: "AGS view service - Data250" };
d[254] = { cs: "Prohlížecí služba AGS - Data250 je poskytována jako veřejná prohlížecí služba nad daty produktu Topografická databáze České republiky (Data250). Databáze Data250 je digitální geografický model území České republiky, jehož minimální polohová přesnost je 125 m a podrobnost odpovídá měřítku 1 : 250 000. Obsah Data250 tvoří cca 50 typů geografických objektů.", en: "AGS - Data250 view service is provided as a public view service for the Topographic Database of the Czech Republic Data250. The Data250 database is a digital geographical model of the Czech Republic. Its minimal positional accuracy is 125 m and the level of detail corresponds to the scale 1:250,000. The content of Data250 consists of 50 feature types." };
d[255] = { cs: "Prohlížecí služba Esri ArcGIS Server - Geomorfologické jednotky ČR – 1998", en: "Esri ArcGIS Server View Service - Geomorphological units CR - 1998" };
d[256] = { cs: "Prohlížecí služba Esri ArcGIS Server - Geomorfologické jednotky ČR - 1998 je poskytována jako veřejná prohlížecí služba poskytující přehled o geomorfologických jednotkách České republiky. Zobrazuje mapu geomorfologického členění Česka, tak jak bylo zpracováno v letech 1994-1998 zákresem do Základních map ČR v měřítku 1:100 000 RNDr. Břetislavem Balatkou CSc pro Zeměměřický úřad. Členění začíná na hierarchicky nejvyšší úrovni subprovincií a pokračuje přes oblasti, celky, podcelky, okrsky a podokrsky až do nejpodrobnější úrovně částí. Jedná se o prohlížecí službu poskytovanou technologií Esri ArcGIS Server. Službu lze využít prostřednictvím přístupových rozhraní REST, SOAP a WMTS formou optimalizovaných mapových dlaždic v souřadnicovém systému S-JTSK/Krovak East North (EPSG 5514). Dále lze službu využít v různých souřadnicových systémech (definovaných v capabilities) prostřednictvím standardu WMS.", en: "Esri ArcGIS Server View Service – Geomorphological units CR - 1998 is provided as a public view service which gives an overview of the geomorphological regionalization of the Czech Republic. The view service displays map of geomorphological regionalization of the Czechia, which has been drawn into State map 1:100 000 sheets for the Land Survey Office in 1994-1998 by RNDr. Bretislaus Balatka, CSc. The regionalization begins from highest level of provinces and consists of seven hierarchical levels. View Service is operated by Esri ArcGIS Server technology. The service can be used free of charge through several access interfaces –as WMS service, through ESRI client or a in a Web browser." };
d[257] = { cs: "Prohlížecí služba WMS pro Digitalizaci katastrální mapy (DG)", en: "WMS View Service for the Digitalization of Cadastral Map(DG)" };
d[258] = { cs: "Prohlížecí služba (WMS) znázorňující stav a postup digitalizace katastrálních území, přehled kladu mapových listů a území s analogovou/vektorovou katastrální mapou. Služba splňuje standard OGC WMS 1.3.0.", en: "The view service (WMS) showing status and progress of digitalization of cadastral Territories, overview of the map sheets and territories with analogue/vector cadastral map. The service complies with the OGC WMS 1.3.0 standard." };
d[259] = { cs: "Prohlížecí služba Esri ArcGIS Server - Geonames", en: "AGS view service - Geonames" };
d[260] = { cs: "Veřejná prohlížecí služba nad aktuálními daty produktu Databáze geografických jmen České republiky (Geonames) je poskytována prostřednictvím rozhraní REST a WMS.", en: "The public viewing service over the current data of the Product Database of Geographical Names of the Czech Republic (Geonames) is provided via the REST and WMS interfaces." };
d[261] = { cs: "INSPIRE prohlížecí služba WMS pro téma Parcely (CP)", en: "INSPIRE WMS View Service for the theme Cadastral Parcels (CP)" };
d[262] = { cs: "Prohlížecí služba (WMS) pro téma Parcely (CP) je veřejná prohlížecí služba pro poskytování dat z Informačního systému katastru nemovitostí (ISKN), umožňující uživatelům prohlížení harmonizovaných dat INSPIRE tématu Parcely (CP). Služba je dostupná pouze v katastrálních územích s digitální mapou (DKM/KMD) – platí pro vrstvy CP.CadastralParcel a CP.CadastralBoundary. Vrstva CP.CadastralZoning je dostupná na území celé ČR. Služba splňuje technické pokyny pro INSPIRE prohlížecí služby v. 3.11 a zároveň splňuje standard OGC WMS 1.1.1. a 1.3.0.", en: "INSPIRE view service for theme Cadastral Parcels provides a possibility to view data image for INSPIRE theme Cadastral Parcels. The data are harmonised according to INSPIRE Implementing Rules. The service fulfils technical guidance for INSPIRE view services v. 3.11 and simultaneously fulfils the OGC WMS 1.1.1 and 1.3.0 standards." };
d[263] = { cs: "INSPIRE prohlížecí služba WMS pro téma Zeměpisná jména (GN)", en: "INSPIRE WMS View Service for the theme Geographical Names (GN)" };
d[264] = { cs: "INSPIRE prohlížecí služba WMS pro téma Zeměpisná jména (GN) poskytuje možnost prohlížet obraz dat INSPIRE tématu Zeměpisná jména. Data jsou harmonizována dle prováděcích pravidel INSPIRE. Služba splňuje Technické pokyny pro INSPIRE prohlížecí služby v. 3.11 a zároveň splňuje standard OGC WMS 1.1.1. a 1.3.0.", en: "INSPIRE WMS View Service for theme Geographic Names provides a possibility to view data image for INSPIRE theme Geographic Names. The data are harmonised according to INSPIRE Implementing Rules. The service fulfils Technical guidance for INSPIRE view services v. 3.11 and simultaneously fulfils the OGC WMS 1.1.1 and 1.3.0 standards." };
d[265] = { cs: "INSPIRE prohlížecí služba WMS pro téma Vodstvo (HY)", en: "INSPIRE WMS View Service for the theme Hydrography (HY)" };
d[266] = { cs: "INSPIRE prohlížecí služba WMS pro téma Vodstvo (HY) poskytuje možnost prohlížet obraz dat INSPIRE tématu Vodstvo aplikačních schémat Fyzické vody a Hydrografická síť. Data jsou harmonizována dle prováděcích pravidel INSPIRE. Z aplikačního schématu Physical Waters obsahuje datová sada objekty typu Watercourse (osu i plochu u vodních toků širších než 4 m), StandingWater, LandWaterBoundary, Falls, Crossing (most, propustek, akvadukt), DamOrWeir, Ford a Lock; aplikační schéma Hydro-Network je reprezentováno objekty typu WatercourseLink, HydroNode a WatercourseSeparatedCrossing. Služba splňuje Technické pokyny pro INSPIRE prohlížecí služby v. 3.11 a zároveň splňuje standard OGC WMS 1.1.1. a 1.3.0.", en: "INSPIRE WMS View Service for theme Hydrography provides a possibility to view data image for INSPIRE theme Hydrography of application schemas Physical Waters and Hydro-Network. The data are harmonised according to INSPIRE Implementing Rules. The service fulfils Technical guidance for INSPIRE view services v. 3.11 and simultaneously fulfils the OGC WMS 1.1.1 and 1.3.0 standards." };
d[267] = { cs: "INSPIRE prohlížecí služba WMS pro téma Dopravní sítě (TN)", en: "INSPIRE WMS View Service for the theme Transport Networks (TN)" };
d[268] = { cs: "INSPIRE prohlížecí služba WMS pro téma Dopravní sítě (TN) poskytuje možnost prohlížet obraz dat INSPIRE tématu Dopravní sítě. Data jsou harmonizována dle prováděcích pravidel INSPIRE. Jsou poskytovány veškeré typy objektů, které mají v rámci INSPIRE specifikace geometrii a jsou zahrnuty ve zdrojové sadě ZABAGED®. V případě dat o vodní dopravě je zdrojem datová sada Státní plavební správy sloužící k popisu objektů na vodních cestách ČR. Data jsou poskytována v souladu s datovou specifikací pro dopravní sítě. Služba splňuje Technické pokyny pro INSPIRE prohlížecí služby v. 3.11 a zároveň splňuje standard OGC WMS 1.1.1. a 1.3.0.", en: "INSPIRE WMS View Service for theme Transport Networks provides a possibility to view data image for INSPIRE theme Transport Networks. They are provided all types of objects having the geometry within the INSPIRE specifications and are included in the source set ZABAGED®. Data are provided in accordance with specifications for data Transport Networks. The service fulfils Technical guidance for INSPIRE view services v. 3.11 and simultaneously fulfils the OGC WMS 1.1.1 and 1.3.0 standards." };
d[269] = { cs: "INSPIRE prohlížecí služba WMS pro téma Zeměpisné soustavy souřadnicových sítí (GGS) - Grid_ETRS89-GRS80", en: "INSPIRE WMS View Service for the theme Geographical Grid Systems (GGS) - Grid_ETRS89-GRS80" };
d[270] = { cs: "Služba poskytuje obraz souřadnicové sítě Grid_ETRS89-GRS80, sestrojené dle specifikací INSPIRE. Tato síť, s přesností zákresu garantovanou resortem ČÚZK, bude sloužit pro podporu implementace INSPIRE tématu Zeměpisné soustavy souřadnicových sítí na území ČR. Služba splňuje Technické pokyny pro INSPIRE prohlížecí služby v. 3.11 a zároveň splňuje standard OGC WMS 1.1.1. a 1.3.0.", en: "INSPIRE view service for theme Geographical Grid Systems - Grid_ETRS89-GRS80. The coordinate grid provides a possibility to prepare data image for INSPIRE theme Geographical Grid Systems on the territory of Czech republic. The service fulfils Technical guidance for INSPIRE view services v. 3.11 and simultaneously fulfils the OGC WMS 1.1.1 and 1.3.0 standards." };
d[271] = { cs: "INSPIRE prohlížecí služba WMS pro téma Zeměpisné soustavy souřadnicových sítí (GGS) - Grid_ETRS89_LAEA", en: "INSPIRE WMS View Service for the theme Geographical Grid Systems (GGS) - Grid_ETRS89_LAEA" };
d[272] = { cs: "Služba poskytuje obraz souřadnicové sítě Grid_ETRS89-LAEA, sestrojené dle specifikací INSPIRE. Tato síť, s přesností zákresu garantovanou resortem ČÚZK, bude sloužit pro podporu implementace INSPIRE tématu Zeměpisné soustavy souřadnicových sítí na území ČR. Služba splňuje Technické pokyny pro INSPIRE prohlížecí služby v. 3.11 a zároveň splňuje standard OGC WMS 1.1.1. a 1.3.0.", en: "INSPIRE WMS View Service for theme Geographical Grid Systems - Grid_ETRS89_LAEA. The coordinate grid provides a possibility to prepare data image for INSPIRE theme Geographical Grid Systems on the territory of Czech republic. The service fulfils Technical guidance for INSPIRE view services v. 3.11 and simultaneously fulfils the OGC WMS 1.1.1 and 1.3.0 standards." };
d[273] = { cs: "INSPIRE prohlížecí služba WMS pro téma Adresy (AD)", en: "INSPIRE WMS View Service for the theme Addresses (AD)" };
d[274] = { cs: "Prohlížecí služba WMS pro téma Adresy (AD) je veřejná prohlížecí služba pro poskytování dat harmonizovaných dle INSPIRE tématu Adresy (AD). Služba je dostupná na celém území České Republiky. Služba splňuje technické pokyny pro INSPIRE prohlížeci služby ve verzi 3.11 a zároveň standardy OGC WMS 1.1.1 a 1.3.0.", en: "INSPIRE view service for theme Addresses provides a possibility to view data image for INSPIRE theme Addresses. The data are harmonised according to INSPIRE Implementing Rules. The service fulfils technical guidance for INSPIRE view services v. 3.11 and simultaneously fulfils the OGC WMS 1.1.1 and 1.3.0 standards." };
d[275] = { cs: "INSPIRE prohlížecí služba WMS pro téma Územní správní jednotky (AU)", en: "INSPIRE WMS View Service for the theme Administrative Units (AU)" };
d[276] = { cs: "Prohlížecí služba WMS pro téma Územní správní jendotky (AU) je veřejná prohlížecí služba pro poskytování dat harmonizovaných dle INSPIRE tématu Územní správní jednotky (AU). Služba je dostupná na celém území České Republiky. Služba splňuje technické pokyny pro INSPIRE prohlížeci služby ve verzi 3.11 a zároveň standardy OGC WMS 1.1.1 a 1.3.0.", en: "INSPIRE view service for theme Administrative Units provides a possibility to view data image for INSPIRE theme Administrative Units. The data are harmonised according to INSPIRE Implementing Rules. The service fulfils technical guidance for INSPIRE view services v. 3.11 and simultaneously fulfils the OGC WMS 1.1.1 and 1.3.0 standards." };
d[277] = { cs: "INSPIRE prohlížecí služba WMS pro téma Budovy (BU)", en: "INSPIRE WMS View Service for the theme Buildings (BU)" };
d[278] = { cs: "Prohlížecí služba WMS pro téma Budovy (BU) je veřejná prohlížecí služba pro poskytování dat harmonizovaných dle INSPIRE tématu Budovy (BU). Služba je dostupná na celém území České Republiky. Služba splňuje technické pokyny pro INSPIRE prohlížeci služby ve verzi 3.11 a zároveň standardy OGC WMS 1.1.1 a 1.3.0.", en: "INSPIRE view service for theme Buildings(BU) provides a possibility to view data image for INSPIRE theme Buildings (BU). The data are harmonised according to INSPIRE Implementing Rules. The service fulfils technical guidance for INSPIRE view services v. 3.11 and simultaneously fulfils the OGC WMS 1.1.1 and 1.3.0 standards." };
d[279] = { cs: "IMAGE služba Esri ArcGIS Server - INSPIRE Nadmořská výška-GRID (EL GRID)", en: "Esri ArcGIS Server IMAGE Service - INSPIRE Elevation-GRID (EL GRID)" };
d[280] = { cs: "IMAGE služba Esri ArcGIS Server – INSPIRE Nadmořská výška GRID (EL GRID) je poskytována jako veřejná služba. Rozhraní služby poskytuje data INSPIRE tématu Nadmořská výška, která spadají do aplikačního schématu ElevationGridCoverage. Data jsou vizualizovaná podle INSPIRE technického návodu. Službu lze využít i prostřednictvím standardu WMS.", en: "Esri ArcGIS Server IMAGE Service – INSPIRE Elevation GRID (EL GRID) is provided as a public service. The service provides data of INSPIRE theme Elevation, ElevationGridCoverage application schema. It uses portrayal styles defined in a technical guideline. The service can be also used by WMS standard." };
d[281] = { cs: "INSPIRE prohlížecí služba WMS pro téma Ortofotosnímky (OI)", en: "INSPIRE WMS View Service for the theme Orthoimagery (OI)" };
d[282] = { cs: "INSPIRE prohlížecí služba WMS pro téma Ortofotosnímky (OI) poskytuje možnost prohlížet obraz dat INSPIRE tématu Ortofotosnímky. Data jsou harmonizována dle prováděcích pravidel INSPIRE. Služba splňuje Technické pokyny pro INSPIRE prohlížecí služby v. 3.11 a zároveň splňuje standard OGC WMS 1.1.1. a 1.3.0.", en: "INSPIRE WMS View Service for theme Orthoimagery (OI) provides a possibility to view data image for INSPIRE theme Orthoimagery. The data are harmonised according to INSPIRE Implementing Rules. The service fulfils Technical guidance for INSPIRE view services v. 3.11 and simultaneously fulfils the OGC WMS 1.1.1 and 1.3.0 standards." };
d[283] = { cs: "Prohlížecí služba Esri ArcGIS Server - Klady mapových listů", en: "Esri ArcGIS Server View Service - Map layouts" };
d[284] = { cs: "Prohlížecí služba Klady mapových listů je poskytována jako veřejná prohlížecí služba nad vektorovými daty kladů listů Základních map ČR středních měřítek a Ortofota ČR. Slouží především pro orientaci v dělení těchto produktů na jednotlivé výdejní jednotky. Jedná se o prohlížecí službu poskytovanou technologií Esri ArcGIS Server.", en: "Viewing service - The pros of map sheets are provided as a public viewing service over vector data of the pros of the sheets of basic maps of the Czech Republic of medium scales and Orthophoto CR. It serves primarily for orientation in dividing these products into individual picking units. It is a viewing service provided by Esri ArcGIS Server." };
d[285] = { cs: "Prohlížecí služba Esri ArcGIS Server - Geografická síť WGS 84", en: "Esri ArcGIS Server View Service - WGS 84 graticule" };
d[286] = { cs: "Prohlížecí služba - Geografická síť WGS 84 je poskytována jako veřejná prohlížecí služba nad vektorovými daty geografické sítě WGS 84.Slouží především pro orientaci v síti poledníků a rovnoběžek souřadnicového systému WGS 84 a k přibližnému určení geografických souřadnic v mapovém podkladu, který si uživatel zobrazí spolu s daty této služby. Jedná se o prohlížecí službu poskytovanou technologií Esri ArcGIS Server.", en: "AGS Viewing Service - WGS 84 Geographic Network is provided as a public viewing service over WGS 84 geo-network vector data.It is primarily used for orientation in the network of meridian and parallels of the WGS 84 coordinate system and for approximate determination of geographical coordinates in the map base that the user displays together with the data of this service. It is a viewing service provided by Esri ArcGIS Server." };
d[287] = { cs: "Prohlížecí služba Esri ArcGIS Server - Kilometrová síť JTSK", en: "AGS view service - JTSK graticule" };
d[288] = { cs: "Prohlížecí služba je poskytována jako veřejná prohlížecí služba nad vektorovými daty souřadnicové sítě JTSK. Pravidelná kilometrová síť s popisem souřadnic průsečíků, vedeným v samostatné vrstvě, slouží především pro rychlou orientaci v síti JTSK a k přibližnému určení souřadnic v mapovém podkladu, který si uživatel zobrazí spolu s daty této služby.", en: "View service is provided as a public view service for the JTSK Graticule vector data. It serves above all for orientation in the network JTSK and for approximate derivation of coordinates in the map background that is displayed together with data of this service by the user." };
d[289] = { cs: "Archivní ortofoto je dostupné pouze v oblastech, kde bylo ve zvoleném letopočtu provedeno letecké snímkování.", en: "Archival Orthofoto is only available in areas where aerial photography has been performed in the selected era." };
d[290] = { cs: "Seznam vrstev umožňuje spravovat obsah mapového okna, měnit podkladové mapy a pracovat s prohlížecími službami produktů nebo externích služeb.<br><br><b>Více možností vrstvy</b>", en: "The layer list allows you to manage the contents of the map window, change the base maps, and work with the viewing services of products or external services. <br><br><b>Multiple layer options</b>" };
d[291] = { cs: "Možnosti vrstvy nabízí stahování otevřených dat, nastavení vyskakovacího okna, informace o službě, odstranění služby, změna pořadí, změna formátu nebo nastavení průhlednosti.<br><br><b>Zobrazit podvrstvy</b>", en: "Layer options offer downloading open data, setting a pop-up window, information about the service, deleting the service, changing the order, changing the format or setting transparency. <br><br><b>Show sublayers</b>" };
d[292] = { cs: "<b>Zneviditelnit vrstvu</b>", en: "<b>Invisible layer</b>" };
d[293] = { cs: "REST rozhraní zobrazuje seznam služeb vypublikovaných na ArcGIS serveru.<br><br><b>Podporované typy:</b><br>", en: "The REST interface displays a list of services published on the ArcGIS server.<br><br><b>Supported types:</b><br>" };
d[294] = { cs: "REST Zeměměřického úřadu", en: "REST of Land survey office" };
d[295] = { cs: "<b>WMS služby</b> - po načtení služby můžete zvolit jaké podvrstvy mají být po přidání viditelné, ve výchozím stavu jsou viditelné všechny. Připojit WMS službu je možné jen v souřadnicovém systému aplikace. Souřadnicový systém lze změnit přes widget v menu v levém horním rohu.<br><br><b>WMTS služby</b> - pokud se objeví problémy s načtením služby, zkuste změnit režim služby z RESTful na KVP.<br><br><b>WFS služby</b> - musí být ve verzi 2.0 a zároveň musí podporovat GeoJSON jako výstupní formát.", en: "<b>WMS service</b> - after loading the service, you can choose which sublayers to be visible after adding, by default they are all visible. You can connect a WMS service only in the application coordinate system. The coordinate system can be changed via the widget in the menu in the upper left corner. <br><br><b>WMTS services</b> - if you see problems loading the service, try changing the service mode from RESTful to KVP.<br> <br><b>WFS services</b> - must be in version 2.0 and at the same time must support GeoJSON as an output format." };
d[296] = { cs: "Vstupní Shapefile musí být .zip data (v .zip nesmí být podadresáře) a musí obsahovat soubor .prj.<br><br>Doporučujeme nahrávat zazipovaná data o velikosti do 5 MB.<br><br>Vstupní soubor GeoJSON musí mít koncovku .json nebo .geojson.<br><br>Vstupní soubor GPX data musí mít koncovku .gpx.", en: "The input of the zipped SHP data (in the ZIP not to be subdirectories) must include the. prj file.<br><br>We recommend uploading a zipped data size up to 1 MB.<br><br>The GeoJSON input file must have a .json ending." };
d[297] = { cs: "Vstupní data musí obsahovat soubor .gpx.<br><br>Doporučujeme nahrávat data o velikosti do 5 MB.", en: "The input data must contain a. gpx file.<br><br>We recommend uploading data up to 5 MB in size." };
d[298] = { cs: "Zhušťovací body", en: "Condensing geodetic control" };
d[299] = { cs: "Hledané místo na mapě lze zobrazit v jiném souřadnicovém systému než je souřadnicový systém celé aplikace.<br><br>Souřadnice lze zadat ve formátech:<br>50,12345<br>50,12345°<br>50°12,345'<br>50°12'34,5\"<br><br>Mezery kdekoli a znaky N a E jsou ignorovány.<br>Místo desetinné čárky může být tečka.<br>Pro označení minut použijte apostrof.<br>Pro označení sekund použijte uvozovky nebo dva apostrofy.", en: "The search location on the map can be displayed in a coordinate system other than the coordinate system of the entire application. <br><br>Coordinates can be specified in formats:<br>50,12345<br>50,12345°<br>50°12,345'<br>50°12'34,5\"<br><br>Spaces anywhere and N and E are ignored.<br> Instead of a decimal point, it can be a dot. <br> Use an apostrophe to mark minutes. <br>Use quotation marks or two apostrophes to indicate seconds." };
d[300] = { cs: "", en: "" };
d[301] = { cs: "Kreslení polygonu ukončíte dvojklikem v mapě.<br><br>Je možné vyznačit pouze jeden projekt.", en: "To stop drawing a polygon, double-click it in the map.<br><br>Only one project can be marked " };
d[302] = { cs: "Jakého druhu stavby se zakreslený projekt týká?", en: "What kind of construction does the project relate to?" };
d[303] = { cs: "Jaká stavební činnost se bude v zakresleném projektu provádět?<br><br>Kombinaci stavebních činností lze upřesnit v poli poznámka.", en: "What construction activity will be carried out in the project?<br><br>The combination of construction activities can be specified in the Comment field." };
d[304] = { cs: "Doplňující informace o zakresleném stavebním projektu.", en: "Additional information about the plotted construction project." };
d[305] = { cs: "Na tuto emailovou adresu odešleme hotové Vyjádření k existenci bodů bodového pole.", en: "We'll send a complete statement to this email address for the existence of point field points." };
d[306] = { cs: "Před odesláním prosím zkontrolujte vyplněné údaje a zakreslený projekt.", en: "Please check the completed data and the plotted project before submitting." };
d[307] = { cs: "Geoprohlížeč", en: "Geoviewer" };
d[308] = { cs: "Zeměměřický úřad", en: "Land Survey Office" };
d[309] = { cs: "Produkty", en: "Products" };
d[310] = { cs: "Seznam vrstev", en: "Layer list" };
d[311] = { cs: "Přidat vrstvy", en: "Add layers" };
d[312] = { cs: "pohled", en: "view" };
d[313] = { cs: "Rozšířené hledání", en: "Advanced search" };
d[314] = { cs: "Sdílet místo", en: "Share place" };
d[315] = { cs: "Změnit souřadnicový systém", en: "Change coordinate system" };
d[316] = { cs: "Přechod na souřadnice", en: "Go to coordinates" };
d[317] = { cs: "Tisk", en: "Print" };
d[318] = { cs: "Měření", en: "Measurement" };
d[319] = { cs: "Překrývání", en: "Swipe" };
d[320] = { cs: "Hlášení chyb", en: "Bug reporting" };
d[321] = { cs: "Vyjádření DBP", en: "Geodetic control statement" };
d[322] = { cs: "Sdílení", en: "Share" };
d[323] = { cs: "Nápověda", en: "Help" };
d[324] = { cs: "Přizpůsobit", en: "Customize" };
d[325] = { cs: "Zavřít", en: "Close" };
d[326] = { cs: "Nápověda", en: "Hint" };
d[327] = { cs: "Motiv", en: "Theme" };
d[328] = { cs: "Výchozí", en: "Default" };
d[329] = { cs: "Světlý", en: "Light" };
d[330] = { cs: "Tmavý", en: "Dark" };
d[331] = { cs: "Uživatelské prostředí", en: "User interface" };
d[332] = { cs: "Kontaktovat vývojáře", en: "Contact developers" };
d[333] = { cs: "<i>Jaký je rozdíl mezi <b>REST</b> a <b>WMS</b> službami?</i><br>REST služby jsou nativní služby z ArcGIS serveru, které nabízí širší možnosti než WMS, například dynamickou legendu nebo pohodlnější práci s informacemi po kliknutí do mapy. WMS služby jsou vytvořeny podle OGC standardu a jejich předností je kompatibilita.<br><br><i>Kde si mohu <b>změnit mapu</b>?</i><br>Mapy jsou pohromadě ve widgetu Produkty. Widget Produkty obsahuje v levém sloupci samostatné produkty a v pravém sloupci připravené mapové kompozice (pokud jsou dostupné).<br><br><i>Jak do mapy <b>přidat další službu</b>, aby mi <b>nesmazala původní obsah mapy</b>?</i><br>Widget Přidat vrstvy nabízí několik možností jak službu přidat. Buď již předpřipravené resortní služby nebo i přidání vlastních služeb.", en: "<i>What is the difference between <b>REST</b> and <b>WMS</b> services?</i> <br>REST services are native services from the ArcGIS server that offer wider options than WMS, such as a dynamic legend or more convenient work with information when clicked on the map. WMS services are created according to the OGC standard and their advantage is compatibility. <br><br><i>Where can I <b>change my map</b>?</i> <br>Maps are together in the Products widget. The Products widget contains separate products in the left column and the prepared map compositions (if available) in the right column. <br><br><i>How <b> add another service to the map</b> to <b>delete the original contents of the map</b>?</i> <br>Widget Add Layers offers several options to add the service. Either pre-prepared department services or also add your own services." };
d[334] = { cs: "Geoprohlížeč nabízí dva režimy zobrazení - 2D a 3D.<br><br><b>Plná funkčnost</b> aplikace je dostupná pouze ve 2D prostředí ve výchozím souřadnicovém systému EPSG: 5514 (S-JTSK/Krovak).<br><br>Pro <b>získání informací o prvku</b> stačí kliknout do mapy. Tuto funkci lze u každé vrstvy vypnout v Seznamu vrstev v kontextovém menu ('...') vrstvy.<br><br>Widget <b>Produkty</b> nabízí přístup ke všem mapovým službám resortu ČÚZK buď v podobě samostatného produktu nebo mapových kompozic (pokud existují), dojde však k vymazání aktuálního seznamu vrstev v mapovém okně. Widget <b>Seznam vrstev</b> Vám umožňuje pracovat s vrstvami, které si zrovna prohlížíte (měnit jejich pořadí, průhlednost, názvy, nákup dat nebo jejich stažení) nebo také měnit podkladovou mapu. Pokud si přejete aktuální seznam vrstev ponechat, ale pouze ho doplnit o další službu, použijte widget <b>Přidat vrstvy</b>, který nabízí přidání služeb resortu ČÚZK i vlastních služeb.<br><br>Rychlé hledání adres, ulic, obcí, katastrálních území a Geonames je dostupné v levém horním rohu. Pokud si přejete vyhledávat parcely, správní členění nebo databázi bodového pole, tak je mezi dalšími funkcemi dostupný widget <b>Rozšířené hledání</b>.<br><br><b>Další funkce v menu v levém horním rohu</b> nabízí dále změnu souřadnicového systému, měření v mapě, tisk mapy, překrývání dvou vrstev, přechod na souřadnice nebo jejich transformace.<br><br>Pokud si přejete nahlásit chybu v zobrazených, použijte widget <b>Hlášení chyb</b>, který Vám umožní chybu lokalizovat, popsat a odeslat k posouzení.<br><br>Vyjádření k existenci bodů bodového pole je integrováno mezi funkce Geoprohlížeče jako widget <b>Vyjádření DBP</b>. Aktuální seznam vrstev i rozsah mapy lze uložit a sdílet skrze widget <b>Sdílení</b>, který Vám umožní na určité časové období vygenerovat odkaz s Vaší mapovou kompozicí.<br><br><b>Přechod do dalších aplikací</b> je možný z ikony na levé straně aplikace pod ikonou 'Obnovit orientaci mapy', kde jsou dostupné i aktuality Geoportálu ČÚZK.<br><br>Ve <b>3D prostředí</b> je možné prohlížet Digitální model reliéfu 4. a 5. generace. Do aplikace můžete připojit také své vlastní 3D služby (SceneLayer z ArcGIS serveru) nebo různé 2D služby. 3D prostředí nabízí změnu souřadnicového systému pouze do WGS 84 (EPSG: 3857) a neumožňuje používat některé widgety (Hlášení chyb, Vyjádření DBP, Překrývání). <br><br><b>Dotykové ovládání</b> je podporováno ve 2D i ve 3D režimu. V obou režimech použijte pro pohyb po obrazovce jeden prst. Pro oddálení sevřete dva prsty k sobě, pro přiblížení prsty ze sevření uvolněte. Pro rotaci 3D režimu použijte dva prsty ve směru nahoru nebo dolů, případně otáčení ve směru nebo v protisměru hodinových ručiček.", en: "Geobrowser offers two display modes - 2D and 3D. <br><br><b>Full functionality</b> application is only available in 2D environments in the default EPSG coordinate system: 5514 (S-JTSK/Krovak).<br><br>To <b>get information about the element</b>, just click on the map. This function can be turned off for each layer in the Layer List in the context menu ('...') of the layer.<br><br>Widget <b>Products</b> offers access to all department services either in the form of a separate product or map compositions (if any), but the current list of layers in the map window is deleted. Widget <b>Layer list</b> allows you to work with layers you're viewing (change their order, transparency, names, data purchase or download) or change the underlying map. If you want to keep the current list of layers, but only add it to the next service, use the <b>Add Layers widget</b> which offers the addition of both ČÚZK resort and custom services. <br><br>Fast search for addresses, streets, municipalities, cadastral territories and Geonames is available in the upper left corner. If you want to search for a parcel, administrative breakdown, or point field database, the <b>Advanced Search widget</b> is available among other features in the upper-left corner. <br><br><b>Other functions in the menu in the upper left corner</b> offers further a change of coordinate system, measurement in the map, map printing, two-layer overlap, transition to coordinates or transformation.<br> <br>If you wish to report an error in the department data, use the <b>Bug Reporting widget</b> which allows you to locate, describe and send the error for assessment. <br><br>Expression of the existence of point field points is integrated between geobrowser functions as a widget <b>Geodetic control statement</b>. The current list of layers and the scope of the map can be saved and shared using the <b>Share widget</b> which allows you to generate a link with your map composition over a specific period of time. <br><br><b>Switching to other applications</b> it is possible from the icon on the left side of the app under the compass icon, where geoportal news are also available.<br> <br>In <b>3D environment</b> it is possible to view the Digital Model of relief 4th and 5th generation. You can also connect your own 3D services (SceneLayer from ArcGIS server) or various 2D services to your application. The 3D environment only offers a change of coordinate system to WGS 84 (EPSG: 3857) and does not allow you to use some widgets (Error Reporting, DBP Representation, Overlap).<br><br><b>Touch</b> is supported in both 2D and 3D mode. In both modes, use one finger to move around the screen. To zoom out, pinch two fingers in, pinch your fingers out to zoom in. To rotate 3D mode, move two fingers up or down, or clockwise or counterclockwise." };
d[335] = { cs: "Název místa (nepovinné):", en: "Name of the place (optional):" };
d[336] = { cs: "Podporované webové prohlížeče:", en: "Supported web browsers:" };
d[337] = { cs: "Levý sloupec nabízí prohlížení jednotlivých <a href='https://geoportal.cuzk.gov.cz/(S(o4z4axf3ecm2kkxi3owze1v5))/Default.aspx?mode=TextMeta&side=WMS.uvod&text=WMS.uvod&head_tab=sekce-03-gp&menu=31' target='_blank'  rel='noopener'><b>produktů</b></a> resortu ČÚZK pomocí prohlížecích služeb. V pravém sloupci jsou produkty doplněné dalšími vrstvami do podoby <b>mapových kompozic</b>.", en: "The left column offers viewing of individual <a href='https://geoportal.cuzk.gov.cz/(S(o4z4axf3ecm2kkxi3owze1v5))/Default.aspx?lng=EN&mode=TextMeta&side=WMS.uvod&text=WMS.uvod&head_tab=sekce-03-gp&menu=31' target='_blank'  rel='noopener'><b>products</b></a> of the ČÚZK resort using viewing services. In the right column, the products are complemented by additional layers into the form of <b>map compositions</b>." };
d[338] = { cs: "ZABAGED® nad Ortofoto", en: "ZABAGED® Ortophoto" };
d[339] = { cs: "ZABAGED® dle ZM10", en: "ZABAGED® ZM10" };
d[340] = { cs: "ZABAGED® - výškopis", en: "ZABAGED® - altimetry" };
d[341] = { cs: "Geomorfologické jednotky ČR", en: "Geomorphological units CR" };
d[342] = { cs: "Digitalizace katastrální mapy", en: "Digitalization of Cadastral Map" };
d[343] = { cs: "Klady mapových listů", en: "Map layouts" };
d[344] = { cs: "Kilometrová síť JTSK", en: "JTSK graticule" };
d[345] = { cs: "Geografická síť WGS 84", en: "WGS 84 graticule" };
d[346] = { cs: "Zobrazit výdejní jednotky", en: "Show dispensing units" };
d[347] = { cs: "Správní jednotky", en: "Administrative units" };
d[348] = { cs: "Ostatní", en: "Other" };
d[349] = { cs: "Městský obvod/městská část", en: "City district" };
d[350] = { cs: "Kód městského obvodu/městské části", en: "City district code" };
d[351] = { cs: "Zadejte jméno Geonames", en: "Enter Geonames" };
d[352] = { cs: "Název služby (volitelné):", en: "Service name (optional):" };
d[353] = { cs: "URL služby:", en: "Service URL:" };
d[354] = { cs: "Zadejte vlastní název mapové služby", en: "Enter a custom name for the map service" };
d[355] = { cs: "URL adresa služby/vrstvy", en: "Service/Layer URL" };
d[356] = { cs: "Přidat", en: "Add" };
d[357] = { cs: "Přidat službu OGC", en: "Add OGC service" };
d[358] = { cs: "Typ služby:", en: "Service type:" };
d[359] = { cs: "Načíst službu", en: "Load service" };
d[360] = { cs: "Podvrstvy:", en: "Sublayers:" };
d[361] = { cs: "Souřadnicové systémy:", en: "Spatial references:" };
d[362] = { cs: "Přidat službu do mapy", en: "Add service to map" };
d[363] = { cs: "Přidat lokální soubor:", en: "Add local file:" };
d[364] = { cs: "Vyberte formát souboru", en: "Select a file format" };
d[365] = { cs: "Odstranit vrstvy", en: "Remove layers" };
d[366] = { cs: "Měřítko mapy: ", en: "Map scale: " };
d[367] = { cs: "Nastavit měřítko", en: "Set scale" };
d[368] = { cs: "Podkladová mapa:", en: "Basemap:" };
d[369] = { cs: "Prázdná", en: "Empty" };
d[370] = { cs: "Kvalita 3D modelu:", en: "3D Model quality:" };
d[371] = { cs: "Vysoká", en: "High" };
d[372] = { cs: "Střední", en: "Medium" };
d[373] = { cs: "Nízká", en: "Low" };
d[374] = { cs: "Zadejte souřadnici", en: "Enter coordinate" };
d[375] = { cs: "Souřadnicový systém hledaného bodu:", en: "Search point coordinate system:" };
d[376] = { cs: "Zobrazit na mapě", en: "Show on map" };
d[377] = { cs: "například Otevírací doba je...", en: "for example Opening hours are..." };
d[378] = { cs: "Ve 3D prostředí je možné pořídit pouze zachycení celé obrazovky.", en: "In a 3D view, only full-screen capture can be saved." };
d[379] = { cs: "Kvalita obrázku 0 - 100", en: "Picture quality 0 - 100" };
d[380] = { cs: "Šířka obrázku", en: "Picture width" };
d[381] = { cs: "Výška obrázku", en: "Picture height" };
d[382] = { cs: "Ukládaná kompozice obsahuje shapefile, soubor GeoJSON, soubor gpx nebo jinou nepodporovanou vrstvu. Tyto vrstvy nemohou být uloženy a nepůjde je obnovit.", en: "The saved composition contains a shapefile, GeoJSON file, gpx file, or other unsupported layer. These layers cannot be saved and cannot be restored." };
d[383] = { cs: "Došlo k chybě.", en: "Error occurred." };
d[384] = { cs: "Nepodařilo se získat přístupové údaje k jednomu ze serverů. Některé méně významné funkce v aplikaci nebudou dostupné.", en: "Failed to get access data to one of the servers. Some minor features in the application will not be available." };
d[385] = { cs: "Nepodařilo se načíst přístupové údaje k serveru. Některé funkce v aplikaci nebudou pracovat správně. Problém může být na straně serveru.Zkuste aplikaci spustit znovu, nebo s časovým odstupem, pokud by problém přetrvával déle, kontaktujte úřad.", en: "Failed to retrieve server access data. Some features in the application will not work correctly. The problem may be on the server side. Try running the app again, or contact the authority if the problem persists longer." };
d[386] = { cs: "Měření plochy", en: "Area measurement" };
d[387] = { cs: "Měření vzdálenosti", en: "Distance measurement" };
d[388] = { cs: "Ukončit a smazat měření", en: "End and remove measurement" };
d[389] = { cs: "Zadejte informace o parcele:", en: "Enter parcel information:" };
d[390] = { cs: "Vyhledat", en: "Search" };
d[391] = { cs: "Vyhledávání probíhá nad daty <a href='https://ags.cuzk.gov.cz/arcgis/rest/services/RUIAN/Prohlizeci_sluzba_nad_daty_RUIAN/MapServer' target='_blank'  rel='noopener'><b>Registru územní identifikace, adres a nemovitostí (RUIAN)", en: "Search takes place above <a href='https://ags.cuzk.gov.cz/arcgis/rest/services/RUIAN/Prohlizeci_sluzba_nad_daty_RUIAN/MapServer' target='_blank'  rel='noopener'><b>Register of territorial identification, addresses and real estate (RUIAN)" };
d[392] = { cs: "Kraj", en: "Region" };
d[393] = { cs: "Městský obvod a městská část", en: "City district" };
d[394] = { cs: " Zpět", en: " Back" };
d[395] = { cs: "Zadejte název okresu", en: "Enter a name for the district" };
d[396] = { cs: "Zadejte název obce s rozšířenou působností", en: "Enter a name for the extended scope municipality" };
d[397] = { cs: "Zadejte název obce s pověřeným úřadem", en: "Enter the name of the municipality with an authorised office" };
d[398] = { cs: "Zadejte název obce", en: "Enter the name of the municipality" };
d[399] = { cs: "Zadejte název části obce", en: "Enter the name of the municipality" };
d[400] = { cs: "Zadejte městský obvod nebo část", en: "Enter the city district" };
d[401] = { cs: "Zadejte název nebo kód katastrálního území", en: "Enter the name or code of the cadastral territory" };
d[402] = { cs: "Zadejte název základní sídelní jednotky", en: "Enter a name for the base settlement unit" };
d[403] = { cs: "Vyplňte prosím katastrální území i kmenové číslo parcely.", en: "Please fill in the cadastral area and the master number of the parcel." };
d[404] = { cs: "Levá strana:", en: "Left:" };
d[405] = { cs: "Pravá strana:", en: "Right:" };
d[406] = { cs: "Vrstvy nejsou načteny", en: "Layers are not loaded" };
d[407] = { cs: "Svisle", en: "Vertically" };
d[408] = { cs: "Vodorovně", en: "horizontally" };
d[409] = { cs: "Orientace:", en: "Orientation:" };
d[410] = { cs: "Odsadit od kraje o (%):", en: "Offset (%):" };
d[411] = { cs: "Začni překrývat", en: "Start swipe" };
d[412] = { cs: "Zrušit překrývání", en: "End swipe" };
d[413] = { cs: "Vyberte datovou sadu", en: "Select dataset" };
d[414] = { cs: "Nevím", en: "I don´t know" };
d[415] = { cs: "Popište chybu, kterou vidíte v mapě", en: "Describe the error you see in the map" };
d[416] = { cs: "Vaše jméno a příjmení", en: "Your name and surname" };
d[417] = { cs: "Vaše emailová adresa", en: "Your email address" };
d[418] = { cs: "Upřesnit chybu", en: "Specify error" };
d[419] = { cs: "Smazat poslední", en: "Delete the last" };
d[420] = { cs: "Souhlas se zpracováním osobních údajů", en: "Consent to the processing of personal data" };
d[421] = { cs: "Začít znovu", en: "Start again" };
d[422] = { cs: "Nejprve vyberte typ investora stavby", en: "First, select the type of building investor" };
d[423] = { cs: "Fyzická osoba", en: "Natural person" };
d[424] = { cs: "Právnická osoba", en: "Legal person" };
d[425] = { cs: "Lokalizovat projekt", en: "Localize project" };
d[427] = { cs: "Jméno", en: "Name" };
d[428] = { cs: "Příjmení", en: "Surname" };
d[429] = { cs: "Název firmy", en: "Company name" };
d[430] = { cs: "č.p./ev.", en: "No." };
d[431] = { cs: "PSČ", en: "Zip code" };
d[432] = { cs: "Vyberte druh stavby", en: "Select the type of construction" };
d[433] = { cs: "Rodinný dům", en: "Family house" };
d[434] = { cs: "Průmyslový objekt", en: "Industrial building" };
d[435] = { cs: "Zemědělská usedlost", en: "Farmstead" };
d[436] = { cs: "Objekt k bydlení", en: "Housing property" };
d[437] = { cs: "Objekt lesního hospodářství", en: "Forestry object" };
d[438] = { cs: "Objekt občanské vybavenosti", en: "Civic amenities" };
d[439] = { cs: "Bytový dům", en: "Apartment building" };
d[440] = { cs: "Stavba pro rodinnou rekreaci", en: "Construction for family recreation" };
d[441] = { cs: "Stavba pro shromažďování většího počtu osob", en: "Construction for gathering more people" };
d[442] = { cs: "Stavba pro obchod", en: "Construction for trade" };
d[443] = { cs: "Stavba ubytovacího zařízení", en: "Construction of accommodation" };
d[444] = { cs: "Stavba pro výrobu a skladování", en: "Construction for production and storage" };
d[445] = { cs: "Zemědělská stavba", en: "Agricultural construction" };
d[446] = { cs: "Stavba pro administrativu", en: "Construction for administration" };
d[447] = { cs: "Stavba občanského vybavení", en: "Construction of civil equipment" };
d[448] = { cs: "Stavba technického vybavení", en: "Construction of technical equipment" };
d[449] = { cs: "Stavba pro dopravu", en: "Construction for transport" };
d[450] = { cs: "Jiná stavba", en: "Other construction" };
d[451] = { cs: "Víceúčelová stavba", en: "Multi-purpose construction" };
d[452] = { cs: "Skleník", en: "Greenhouse" };
d[453] = { cs: "Přehrada", en: "Dam" };
d[454] = { cs: "Hráz přehrazující vodní tok nebo údolí", en: "Dam replacing waterflow or valley" };
d[455] = { cs: "Hráz k ochraně nemovitostí před zaplavením při povodni", en: "Dam to protect real estate from flooding during flooding" };
d[456] = { cs: "Hráz ohrazující umělou vodní nádrž", en: "Dam replacing artificial water tank" };
d[457] = { cs: "Jez", en: "Weed" };
d[458] = { cs: "Stavba k plavebním účelům v korytech nebo na březích vodních toků", en: "Construction for swimming purposes in troughs or on the banks of watercourses" };
d[459] = { cs: "Stavba k využití vodní energie (vodní elektrárna)", en: "Construction for the use of hydropower (hydropower plant)" };
d[460] = { cs: "Stavba odkaliště", en: "Construction of sludge tank" };
d[461] = { cs: "Rozestavěné jednotky", en: "Built-up units" };
d[462] = { cs: "Vyberte druh stavební činnosti", en: "Select the type of construction activity" };
d[463] = { cs: "Nová stavba nebo zařízení", en: "New construction or equipment" };
d[464] = { cs: "Terénní úpravy", en: "Landscaping" };
d[465] = { cs: "Stavební úpravy", en: "Construction modifications" };
d[466] = { cs: "Odstranění stavby", en: "Removal of the building" };
d[467] = { cs: "Kombinace stavebních činností", en: "Combination of construction activities" };
d[468] = { cs: "Poznámka (nepovinné)", en: "Note (optional)" };
d[469] = { cs: "Webová mapa s platností:", en: "Web map with validity:" };
d[470] = { cs: "1 týden", en: "1 month" };
d[471] = { cs: "1 měsíc", en: "1 month" };
d[472] = { cs: "3 měsíce", en: "3 months" };
d[473] = { cs: "1 rok", en: "1 year" };
d[474] = { cs: "3 roky", en: "3 years" };
d[475] = { cs: " Uložit webovou mapu", en: " Save web map" };
d[476] = { cs: "Geoprohlížeč si můžete s vygenerovaným odkazem vložit i do svých webových stránek!", en: "You can also insert a Geoviewer into your website with a generated link!" };
d[477] = { cs: "Nepodařilo se načíst uložené nastavení mapy.", en: "Failed to load saved map settings." };
d[478] = { cs: "Další funkce", en: "Other features" };
d[479] = { cs: "Přidat službu z ArcGIS Serveru", en: "Add service from ArcGIS Server" };
d[480] = { cs: "Odesláno", en: "Send" };
d[481] = { cs: "Odesílání", en: "Sending" };
d[482] = { cs: "Neodesláno", en: "Cannot be sent" };
d[483] = { cs: "Aktuality", en: "News" };
d[484] = { id: 15082024, cs: "Novinky v Geoprohlížeči 2.15 (15. 8. 2024):<br><p style='text-align: justify;'>• V Seznamu vrstev lze zapnout zobrazení podrobností o podkladové mapě po kliknutí do mapy. To umožňuje například rychle zjistit datum náletu (a další metadata) listu Ortofota, datum vytvoření listu Základní topografické mapy nebo datum vytvoření DMR 5G.<br><br>• Pokud si přidáte vrstvu jednotlivé měřítkové úrovně ZTM (například ZTM 10), tak stačí kliknout do mapy a zobrazí se metadata pro mapový list. </p>", en: "What's new in Geoviewer 2.15 (15. 8. 2023):<br><p style='text-align: justify;'>• In the Layer list, you can turn on the display of details about the base map by clicking on the map. This allows you to quickly find out the date of the flight (and other metadata) of the Orthophoto sheet, the date of creation of the Basic topographic map sheet or the date of creation of the DMR 5G. • If you add a layer of individual ZTM scale levels (for example ZTM 10), just click in the map and the metadata for the map sheet will be displayed.</p>" };
d[485] = { cs: "Aktuality Geoportálu", en: "Geoportal News" };
d[486] = { cs: "ZABAGED® barevný", en: "ZABAGED® colorful" };
d[487] = { cs: "Městský obvod v Praze", en: "Prague District" };
d[488] = { cs: "Správní obvod v Praze", en: "Administrative district in Prague" };
d[489] = { cs: "Zadejte městský obvod", en: "Enter the city district" };
d[490] = { cs: "Zadejte správní obvod", en: "Enter the administrative district" };
d[491] = { cs: "Vyznačit oblast", en: "Indicate the area" };
d[492] = { cs: "Bod", en: "Point" };
d[493] = { cs: "Plocha", en: "Area" };
d[494] = { cs: "Aplikace není v souřadnicovém systému EPSG: 5514 (S-JTSK/Krovak).\n\nPro pokračování prosím změňte souřadnicový systém v menu aplikace.", en: "The application is not in the EPSG coordinate system: 5514 (S-JTSK/Krovak).\n\nTo continue, please change the coordinate system in the application menu." };
d[495] = { cs: "Aplikace není ve 2D režimu.\n\nPro pokračování prosím změňte režim zobrazení.", en: "The application is not in 2D mode.\n\nPlease change the display mode to continue" };
d[496] = { cs: "Máte vybráno", en: "You have selected" };
d[497] = { cs: "Přejít do E-shopu", en: "Go to E-shop" };
d[498] = { cs: "Máte vybráno příliš mnoho výdejních jednotek. Pokračujte prosím do E-shopu a výběr proveďte tam.", en: "You have too many picking units selected. Please proceed to the E-shop and make a selection there." };
d[499] = { cs: "Linie", en: "Line" };
d[500] = { cs: "Výdejní jednotku: ", en: "Picking unit: " };
d[501] = { cs: " již máte vybranou.", en: " you already have selected." };
d[502] = { cs: "Odstranit výsledky", en: "Remove results" };
d[503] = { cs: "Celková cena", en: "Total price" };
d[504] = { cs: "<a href='https://www.zakonyprolidi.cz/cs/1995-31#f6085084' target='_blank'  rel='noopener'>Cena bude v E-shopu upravena</a>", en: "<a href='https://www.zakonyprolidi.cz/cs/1995-31#f6085084' target='_blank'  rel='noopener'>Price will be adjusted in the e-shop</a>" };
d[505] = { cs: "Vaše objednávka obsahuje data poskytovaná dle vyhlášky č. 214/2017 Sb. výsledná úplata za Vaši objednávku byla proto zvýšena na minimální výši úplaty stanovenou pro poskytování těchto dat po započtení slev, která činí 200 Kč.", en: "Your order contains data provided according to Decree No. 214/2017 Coll. the resulting remuneration for your order has therefore been increased to the minimum amount of remuneration fixed for the provision of this data after the discount, which amounts to CZK 200." };
d[506] = { cs: "INSPIRE prohlížecí služba WMS pro data Nadmořská výška - TIN (EL TIN) poskytuje možnost prohlížet obraz dat INSPIRE tématu Nadmořská výška - ElevationTIN. Data jsou prezentována mračnem bodů, které jsou pro účely této služby sloučeny do multipoint geometrie. Měřítkové omezení jednotlivých vrstev je uvedeno v capabilities služby. Služba splňuje Technické pokyny pro INSPIRE prohlížecí služby v. 3.11 a zároveň splňuje standard OGC WMS 1.1.1 a 1.3.0.", en: "INSPIRE View Service for data Elevation - TIN (EL TIN) provides an opportunity to view data image for INSPIRE Theme Elevation - ElevationTIN. Data are represented by point cloud. For the purpose of this service points are merged to multipoint geometry. A range of scale denominators is defined in a capabilities document for each layer. The service meets requeirements for INSPIRE view services v. 3.11 and fulfils the OGC WMS 1.1.1 and 1.3.0 standards." };
d[507] = { cs: "Vstupní souřadnicový systém", en: "Input coordinate system" };
d[508] = { cs: "Výstupní souřadnicový systém", en: "Output coordinate system" };
d[509] = { cs: "Výsledek transformace:", en: "Transformation result:" };
d[510] = { cs: "Transformace souřadnic", en: "Coordinate Transformation" };
d[511] = { cs: "Probíhá transformace", en: "Transformation in progress" };
d[512] = { cs: "Spustit transformaci", en: "Run transformation" };
d[513] = { cs: "Operace se nezdařila, zkuste službu načíst znovu.\n\nPopis chyby:\n", en: "The operation failed, try the load service again.\n\nError description:\n" };
d[514] = { cs: "Všechny", en: "All" };
d[515] = { cs: " Ukládání...", en: " Saving..." };
d[516] = { cs: "Základní polohové bodové pole", en: "Horizontal geodetic control" };
d[517] = { cs: "Podrobné polohové bodové pole", en: "Detailed horizontal geodetic control" };
d[518] = { cs: "Výškové bodové pole", en: "Vertical geodetic control" };
d[519] = { cs: "Tíhové bodové pole", en: "Gravity geodetic control" };
d[520] = { cs: "stanice CZEPOS", en: "points of CZEPOS" };
d[521] = { cs: "Číslo bodu", en: "Point number" };
d[522] = { cs: "Číslo SMO-5", en: "SMO-5 number" };
d[523] = { cs: "Geodetické údaje", en: "Geodetic control data" };
d[524] = { cs: "Název bodu", en: "Point name" };
d[525] = { cs: "Nivelační bod", en: "Leveling point" };
d[526] = { cs: "Název listu SMO-5", en: "Sheet name SMO-5" };
d[527] = { cs: "Nivelační pořad", en: "Leveling kit" };
d[528] = { cs: "Kreslení: zapnuto", en: "Drawing: on" };
d[529] = { cs: "Odstranit výsledky vyhledávání", en: "Delete search results" };
d[530] = { cs: "Nahlížení do KN", en: "View of the LR" };
d[531] = { cs: "ZABAGED® - polohopis", en: "ZABAGED® - planimetry" };
d[532] = { cs: "skrýt vizualizace ZABAGED® - polohopis", en: "hide ZABAGED® - planimetry visualisations" };
d[533] = { cs: "Výstavy ZÚ", en: "Expositions LSO" };
d[534] = { cs: " Denní světlo", en: " Daylight" };
d[535] = { cs: "Připojovaná služba nepodporuje aktuální souřadnicový systém mapy. Změňte prosím souřadnicový systém v rozbalovacím menu aplikace.\n\nSlužba podporuje tento souřadnicový systém:", en: "The connected service does not support the current coordinate system of the map. Please change the coordinate system in the application drop-down menu.\n\nThe service supports this coordinate system:" };
d[536] = { cs: "Číslo triangulačního listu (ZTLTL)", en: "Triangulation sheet number" };
d[537] = { cs: "Datum:", en: "Date:" };
d[538] = { cs: "změnit formát", en: "change format" };
d[539] = { cs: "Název mapy", en: "Map name" };
d[540] = { cs: "Kvalita obrázku (DPI)", en: "Image quality (DPI)" };
d[541] = { cs: "Nastavení stránky:", en: "Page settings:" };
d[542] = { cs: "A4 na výšku", en: "A4 portrait" };
d[543] = { cs: "A4 na šířku", en: "A4 landscape" };
d[544] = { cs: "A3 na výšku", en: "A3 portrait" };
d[545] = { cs: "A3 na šířku", en: "A3 landscape" };
d[546] = { cs: "Rozvržení stránky", en: "Page layout" };
d[547] = { cs: "Pouze mapa", en: "Map only" };
d[548] = { cs: "Autor mapy", en: "Map author" };
d[549] = { cs: "Chvilku strpení...", en: "Moment of patience..." };
d[550] = { cs: "Připravit k tisku", en: "Prepare for printing" };
d[551] = { cs: "Zahrnout umísťovací soubor", en: "Include placement file" };
d[552] = { cs: "Uložit lokalizaci do PDF", en: "Save localization to PDF" };
d[553] = { cs: "Nastavit vlastní styl", en: "Set own style" };
d[554] = { cs: "Vložte URL adresu pro JSON s nastavenými styly:", en: "Paste the URL for the JSON with the styles set:" };
d[555] = { cs: "Nastavit styl", en: "Set style" };
d[556] = { cs: "Prohlášení o přístupnosti", en: "Accessibility statement" };
d[557] = { cs: "Prohlížecí služba WMS pro téma Nadmořská výška-TIN (EL TIN)", en: "INSPIRE WMS View Service for the theme Elevation TIN (EL TIN)" };
d[558] = { cs: "Parcela:", en: "Parcel:" };
d[559] = { cs: "Druh", en: "Kind" };
d[560] = { cs: "Lokalizace", en: "Localization" };
d[561] = { cs: "Výslovnost", en: "Pronunciation" };
d[562] = { cs: "Pro nahlížení do katastru nemovitostí je potřeba přiblížit mapu.", en: "To view the land register, it is necessary to zoom in on the map." };
d[563] = { cs: "Identifikační číslo osoby", en: "Person identification number" };
d[564] = { cs: "Zápis souřadnic ", en: "Written coordinate " };
d[565] = { cs: " je chybný.", en: " is wrong." };
d[566] = { cs: "Část souřadnice ", en: " Part of coordinate " };
d[567] = { cs: " není číslo.", en: " is not a number." };
d[568] = { cs: " je mimo rozsah území ČR.", en: " is outside the scope of the Czech Republic." };
d[569] = { cs: "Chyba při převodu souřadnic.", en: "Error converting coordinates." };
d[570] = { cs: "Nalezené souřadnice", en: "Coordinates found" };
d[571] = { cs: "Nakreslený projekt je příliš velký, povoleno je maximálně 100km².", en: "The drawing project is too large, the permit is a maximum of 100km²." };
d[572] = { cs: "Firma", en: "Company" };
d[573] = { cs: "Adresa", en: "Address" };
d[574] = { cs: "Stavba", en: "Construction" };
d[575] = { cs: "Kontakt", en: "Contact" };
d[576] = { cs: "Editovat projekt", en: "Edit project" };
d[577] = { cs: "Ukončit editaci", en: "Finish editing" };
d[578] = { cs: "Nepodařilo se vyhledat parcely z následujících řádků .txt souboru:\n\n", en: "Failed to find parcels from the following lines of the .txt file:\n\n" };
d[579] = { cs: "Nahrajte textový soubor:", en: "Upload a text file:" };
d[580] = { cs: "Jednotlivé souřadnice", en: "Individual coordinates" };
d[581] = { cs: "Textový soubor", en: "Text file" };
d[582] = { cs: "Přejít na podrobnou nápovědu", en: "Go to step-by-step help" };
d[583] = { cs: "Zobrazit poslední výsledek", en: "Show last result" };
d[584] = { cs: "Vyberte prosím soubor k transformaci.", en: "Please select the file to transform." };
d[585] = { cs: "Vybraný soubor není textový (.txt).", en: "The selected file is not text (.txt)." };
d[586] = { cs: "Vybraný soubor není podporovaný.", en: "The selected file is not supported." };
d[587] = { cs: "Zobrazit Geonames", en: "Show Geonames" };
d[588] = { cs: "Nic nenalezeno", en: "Nothing found" };
d[589] = { cs: "Historická jména", en: "Historical names" };
d[590] = { cs: "Hledej v historických jménech", en: "Search in historical names" };
d[591] = { cs: "Zobrazit Historická jména", en: "Show historical names" };
d[592] = { cs: "Prohlížecí služba Historická jména je poskytována jako veřejná prohlížecí služba pro prohlížení historických geografických jmen nesídelních objektů propojených s aktuálními daty produktu Databáze geografických jmen České republiky (Geonames). Jeden objekt může mít i několik jmen excerpovaných z map i nemapových zdrojů. V atributech je uvedeno pravděpodobné období užíváni historického jména, jazyk jména, plná znění jména i zkratky použité ve zdroji a zdroj jmen. Službu lze využít prostřednictvím přístupových rozhraní REST, SOAP a WMS.", en: "The Historical Names ArcGIS Server View Service is provided as a public service for viewing historical geographical names of non-residential objects connected to current data from the Database of geographic names of the Czech Republic (Geonames). One object can have several names excerpted from maps and non-map sources. The attributes indicate the probable period of use of the historical name, the language of the name, the full version of the name and abbreviations used in the source and the source of the name itself. The service is accesible through REST, SOAP and WMS interface." };
d[593] = { cs: "Posunout nahoru", en: "Move up" };
d[594] = { cs: "Filtrovat vrstvy...", en: "Filter layers..." };
d[595] = { cs: "(povinné)", en: "(required)" };
d[596] = { cs: "Nejsou vyplněna všechna povinná pole, upravte prosím zadání a spusťte transformaci.", en: "Not all required fields are filled in, please edit the entry and run the transformation." };
d[597] = { cs: "Prohlížecí služba Esri ArcGIS Server - Historická jména", en: "Esri ArcGIS Server View Service - Historical Names" };
d[598] = { cs: "Žádný", en: "None" };
d[599] = { cs: "platnost do", en: "valid until" };
d[600] = { cs: "Vymazat předchozí výsledky vyhledávání", en: "Clear previous search results" };
d[601] = { cs: "Výškopis - vrstevnice", en: "Altimetry - contour" };
d[602] = { cs: "Přidaná prohlížecí služba má všechny podvrstvy vypnuté. K zobrazení obsahu je nutné kliknutím na symbol šipky službu rozbalit a zapnout podvrstvu, která Vás zajímá.", en: "The added browser service has all sublayers turned off. To view the content, you must click the arrow symbol to expand the service and turn on the sublayer you are interested in." };
d[603] = { cs: "Zdá se, že máme problém s Vaším internetovým připojením.\n\nZkontrolujte, že připojení funguje a zkuste načíst aplikaci znovu.", en: "We seem to have a problem with your Internet connection.\n\nCheck that the connection is working and try to load the application again." };
d[604] = { cs: "Zvolte prosím datovou sadu.", en: "Please select a dataset." };
d[605] = { cs: "Režim služby:", en: "Service mode:" };
d[606] = { cs: "Název nebo kód katastrálního území", en: "Cadastral territory name or code" };
d[607] = { cs: "Způsob využití pozemku", en: "Method of use of the land" };
d[608] = { cs: "Jména světa", en: "Names of the world" };
d[609] = { cs: "Prohlížecí služba Esri ArcGIS Server – MČR 500", en: "Esri ArcGIS Server View Service – MCR 500" };
d[610] = { cs: "Prohlížecí služba Esri ArcGIS Server – MČR 500 je poskytována jako veřejná prohlížecí služba nad daty Mapy České republiky 1 : 500 000. Jedná se o prohlížecí službu poskytovanou technologií Esri ArcGIS Server. Službu lze využít prostřednictvím přístupových rozhraní REST, SOAP a WMTS formou optimalizovaných mapových dlaždic v souřadnicovém systému S-JTSK/Krovak East North (EPSG 5514). Dále lze službu využít v různých souřadnicových systémech (definovaných v capabilities) prostřednictvím standardu WMS. ", en: "Esri ArcGIS Server View Service – MCR 500 is provided as a public view service for the Map of the Czech Republic 1 : 500 000. The view service is provided using the Esri ArcGIS Server technology. The Service is accessible by one of access interfaces – REST, SOAP, WMTS using optimized map tiles in S-JTSK coordinate reference system (EPSG:5514). The service also supports WMS interface and various coordinate reference systems (listed in capabilities). " };
d[611] = { cs: "Prohlížecí služba Esri ArcGIS Server – MČR 1M", en: "Esri ArcGIS Server View Service – MCR 1M" };
d[612] = { cs: "Prohlížecí služba Esri ArcGIS Server – MČR 1M je poskytována jako veřejná prohlížecí služba nad daty Mapy České republiky 1 : 1 000 000. Jedná se o prohlížecí službu poskytovanou technologií Esri ArcGIS Server. Službu lze využít prostřednictvím přístupových rozhraní REST, SOAP a WMTS formou optimalizovaných mapových dlaždic v souřadnicovém systému S-JTSK/Krovak East North (EPSG 5514). Dále lze službu využít v různých souřadnicových systémech (definovaných v capabilities) prostřednictvím standardu WMS. ", en: "Esri ArcGIS Server View Service – MCR 1M is provided as a public view service for the Map of the Czech Republic 1 : 1 000 000. The view service is provided using the Esri ArcGIS Server technology. The Service is accessible by one of access interfaces – REST, SOAP, WMTS using optimized map tiles in S-JTSK coordinate reference system (EPSG:5514). The service also supports WMS interface and various coordinate reference systems (listed in capabilities). " };
d[613] = { cs: "Režim prolnutí", en: "Blend Mode" };
d[614] = { cs: "Zesvětlit", en: "Lighten" };
d[615] = { cs: "Světlejší", en: "Lighter" };
d[616] = { cs: "Plus", en: "Plus" };
d[617] = { cs: "Závoj", en: "Screen" };
d[618] = { cs: "Zesvětlit barvy", en: "Color-dodge" };
d[619] = { cs: "Ztmavit", en: "Darken" };
d[620] = { cs: "Násobit", en: "Multiply" };
d[621] = { cs: "Ztmavit barvy", en: "Color-burn" };
d[622] = { cs: "Převrátit", en: "Invert" };
d[623] = { cs: "Rozdíl", en: "Difference" };
d[624] = { cs: "Vyloučit", en: "Exclusion" };
d[625] = { cs: "Minus", en: "Minus" };
d[626] = { cs: "Zrcadlit", en: "Reflect" };
d[627] = { cs: "Kontrast", en: "Contrast" };
d[628] = { cs: "Překrýt", en: "Overlay" };
d[629] = { cs: "Měkké světlo", en: "Soft-light" };
d[630] = { cs: "Tvrdé světlo", en: "Hard-light" };
d[631] = { cs: "Jasné světlo", en: "Vivid-light" };
d[632] = { cs: "Komponenty", en: "Component" };
d[633] = { cs: "Odstín", en: "Hue" };
d[634] = { cs: "Sytost", en: "Saturation" };
d[635] = { cs: "Světlost", en: "Luminosity" };
d[636] = { cs: "Barva", en: "Color" };
d[637] = { cs: "Složené", en: "Composite" };
d[638] = { cs: "Cíl nad", en: "Destination-over" };
d[639] = { cs: "Cíl nahoře", en: "Destination-atop" };
d[640] = { cs: "Cíl uvnitř", en: "Destination-in" };
d[641] = { cs: "Cíl vně", en: "Destination-out" };
d[642] = { cs: "Zdroj nahoře", en: "Source-atop" };
d[643] = { cs: "Zdroj uvnitř", en: "Source-in" };
d[644] = { cs: "Zdroj vně", en: "Source-out" };
d[645] = { cs: "Xor", en: "Xor" };
d[646] = { cs: "Normální", en: "Normal" };
d[647] = { cs: "Průměr", en: "Average" };
d[648] = { cs: "Připravit pouze zachycení obrazovky", en: "Prepare only screenshot" };
d[649] = { cs: "Souřadnice zachycené obrazovky", en: "Screenshot coordinates" };
d[650] = { cs: "Levý horní roh", en: "Top left corner" };
d[651] = { cs: "Pravý horní roh", en: "Top right corner" };
d[652] = { cs: "Pravý dolní roh", en: "Bottom right corner" };
d[653] = { cs: "Levý dolní roh", en: "Bottom left corner" };
d[654] = { cs: "chyba načtení práv", en: "rights loading error" };
d[655] = { cs: "server neodpovídá", en: "server is not responding" };
d[656] = { cs: "Digitální data", en: "Digital data" };
d[657] = { cs: "Tištěná data", en: "Printed data" };
d[658] = { cs: "Chci koupit:", en: "Want to buy:" };
d[659] = { cs: "Státní mapa 1 : 5000 s výplní ploch", en: "State map 1 : 5000 with fill polygon" };
d[660] = { cs: "Státní mapa 1 : 5000 bez výplně ploch", en: "State map 1 : 5000 without fill polygon" };
d[661] = { cs: "INSPIRE prohlížecí služba WMS pro téma Využití území (LU)", en: "INSPIRE WMS View Service for the theme Land Use (LU)" };
d[662] = { cs: "INSPIRE prohlížecí služba WMS pro téma Využití území (LU) poskytuje možnost prohlížet obraz dat INSPIRE tématu Využití území - Stávající využití území. Data jsou harmonizována dle prováděcích pravidel INSPIRE. Zdrojovou datovou sadou je Základní báze geografických dat České republiky (ZABAGED®). Služba splňuje Technické pokyny pro INSPIRE prohlížecí služby v. 3.11 a zároveň splňuje standard OGC WMS 1.1.1. a 1.3.0.", en: "INSPIRE WMS View Service for theme Land Use provides a possibility to view data image for INSPIRE theme Land Use - Existing Land Use. The data are harmonised according to INSPIRE Implementing Rules. The base of the dataset is the Fundamental Base of Geographic Data of the Czech Republic (ZABAGED®). The service fulfils Technical guidance for INSPIRE view services v. 3.11 and simultaneously fulfils the OGC WMS 1.1.1 and 1.3.0 standards." };
d[663] = { cs: "Využití území", en: "Land Use" };
d[664] = { cs: "Zadejte vlastní měřítko", en: "Enter a custom scale" };
d[665] = { cs: "Odkaz byl úspěšně odeslán na Váš email.", en: "The link was successfully sent to your email." };
d[666] = { cs: "Export dat dále pokračuje, odkaz bude po dokončení odeslán na Váš e-mail.", en: "The data export continues, the link will be sent to your e-mail upon completion." };
d[667] = { cs: "Již máte spuštěn výdej dat, který zatím nebyl dokončen. Další výdej můžete spustit až po dokončení - výsledek obdržíte na e-mail.", en: "You are already running a data issue that has not yet been completed. You can start the next issue only after completion - you will receive the result by e-mail." };
d[668] = { cs: "Exportovat data", en: "Export data" };
d[669] = { cs: "Kam máme odkaz na data doručit?", en: "Where should we deliver the data link?" };
d[670] = { cs: "Data budou automaticky připravena podle rozsahu mapového okna.", en: "The data will be automatically prepared according to the scope of the map window." };
d[671] = { cs: "Zastavit export", en: "Stop exporting" };
d[672] = { cs: "umisťovací soubor", en: "placement file" };
d[673] = { cs: "Rozsah pro export dat je příliš velký...", en: "The range for data export is too large..." };
d[674] = { cs: "povoleno je", en: "allowed is" };
d[675] = { cs: "Vlastní podnázev (volitelné)", en: "Custom sub-name (optional)" };
d[676] = { cs: "Nakreslená geometrie je nevhodná.", en: "The drawn geometry is inappropriate." };
d[677] = { cs: "Nakreslit vlastní rozsah", en: "Draw custom range" };
d[678] = { cs: "Rozšířené možnosti", en: "Advanced options" };
d[679] = { cs: "Pro výdej použijeme nakreslený rozsah.", en: "We will use drawn range for the export." };
d[680] = { cs: "Souborová geodatabáze", en: "Feature geodatabase" };
d[681] = { cs: "Použít", en: "Use" };
d[682] = { cs: "Pro výdej použijeme rozsah lokálních dat.", en: "We will use the range of local data for the export." };
d[683] = { cs: "Použít lokální data", en: "Use local data" };
d[684] = { cs: "Není k dispozici odpovídající vrstva...", en: "There is no corresponding layer..." };
d[685] = { cs: "Přidat polygon z SHP nebo GeoJSON můžete v okně <a onclick=\"document.getElementById('tlacitkoPridatVrstvy').click();\" style='cursor: pointer; color: #337ab7'>Přidat vrstvy</a> na záložce Ostatní.", en: "You can add polygon from SHP or GeoJSON in the <a onclick='document.getElementById('tlacitkoPridatVrstvy').click();' style='cursor: pointer; color: #337ab7'>Add Layers</a> tab on the Other tab." };
d[686] = { cs: "Použít výsledek vyhledávání", en: "Use search result" };
d[687] = { cs: "výsledek", en: "result" };
d[688] = { cs: "Pro výdej použijeme vybraný výsledek vyhledávání.", en: "We will use the selected search result for the export." };
d[689] = { cs: "Přidat polygon jako výsledek vyhledávání můžete v okně <a onclick=\"document.getElementById('tlacitkoRozsireneHledani').click();\" style='cursor: pointer; color: #337ab7'>Rozšířené hledání</a>.", en: "You can add a figure as a search results in the <a onclick='document.getElementById('tlacitkoRozsireneHledani').click();' style='cursor: pointer; color: #337ab7'>Add Layers</a> tab on the Other tab." };
d[690] = { cs: "přidružený k", en: "associated with" };
d[691] = { cs: "Zkopírovat odkaz", en: "Copy link" };
d[692] = { cs: "Zkopírovat odkaz s rozsahem mapového okna", en: "Copy link with map window range" };
d[693] = { cs: "Právě prohlížíte <b>Produkt nebo jeho mapovou kompozici</b>. Přejete si získat trvalý odkaz?", en: "You are viewing the Product or its map composition. Do you want to get a permanent link?" };
d[694] = { cs: "Přejít ke stažení dat", en: "Go to download data" };
d[695] = { cs: "Odkaz byl zkopírován do Vaší schránky!", en: "The link has been copied to your clipboard!" };
d[696] = { cs: "Došlo k chybě při aktualizaci", en: "An update error occurred" };
d[697] = { cs: "Doporučujeme vymazat mezipaměť webového prohlížeče nebo aplikaci spustit v anonymním okně. Pokud se problém nepodaří odstranit, kontaktujte: tomas.nemecek@cuzk.gov.cz", en: "We recommend that you clear the Web browser cache or run the application in an incognito window. If the problem cannot be addressed, contact: tomas.nemecek@cuzk.gov.cz" };
d[698] = { cs: "Souřadnicový systém:", en: "Coordinate system:" };
d[699] = { cs: "předpřipravené jednotky", en: "pre-prepared units" };
d[700] = { cs: "Počet výsledků:", en: "Number of results:" };
d[701] = { cs: "Stáhnout vše", en: "Download all" };
d[702] = { cs: "Aktualizováno", en: "Updated" };
d[703] = { cs: "Přístup ke stažení předpřipravených výdejních jednotek dat resortu.", en: "Access to download pre-prepared dispensing units of data of the resort." };
d[704] = { cs: "Téma", en: "Theme" };
d[705] = { cs: "Bohužel, nebyl nalezen žádný výsledek.", en: "Unfortunately, no result was found." };
d[706] = { cs: " a více<div style='color: red;'>Nevidíte všechny výsledky, přibližte prosím mapové okno.</div>", en: " and more<div style='color: red;'>You don't see all the results, please zoom in on the map window.</div>" };
d[707] = { cs: "Jednotlivé parcely", en: "Individual parcels" };
d[708] = { cs: "Více parcel", en: "Multiple parcels" };
d[709] = { cs: "<b>Vložte textový soubor (.txt) v následujícím tvaru:</b><br><span style='color: green;'>Kód katastrálního území</span>,<br><span style='color: blue;'>Kmenové číslo/Poddělení čísla</span> (pokud existuje, jinak pouze Kmenové číslo bez '/'),<br><span style='color: purple;'>Druh číslování parcely</span> (Stavební - 1, Pozemková - 2)<br>; (za posledním záznamem by neměl být ';')<br><br><b>Například:</b><br><i><span style='color: green;'>730475</span>,<span style='color: blue;'>605/12</span>,<span style='color: purple;'>2</span>;<br><span style='color: green;'>730475</span>,<span style='color: blue;'>605/1</span>,<span style='color: purple;'>2</span></i><br><br>Velikost souboru může být maximálně 5 Kb.<br><br>", en: "<b>Add text file (.txt) as follows:</b><br><span style='color: green;'>A cadastral area code</span>,<br><span style='color: blue;'>Kmen number/Number subdite</span> (if any, otherwise only Tribal number without '/'), <br><span style='color: purple;'> Parcel numbering species</span> (Building - 1, Land - 2)<br>; (after the last record should not be ';') <br><br><b>Example:</b><br><i><span style='color: green;'>730475</span>,<span style='color: blue;'>605/12</span>,<span style='color: purple;'>2</span>;<br> <span style='color: green;'>730475</span>,<span style='color: blue;'>605/1</span>,<span style='color: purple;'>2</span></i><br><br>The file size can be a maximum of 5 Kb.<br><br>" };
d[710] = { cs: "Upravit službu", en: "Edit service" };
d[711] = { cs: "Připravte si své místo...", en: "Prepare your place..." };
d[712] = { cs: "například Můj oblíbený park...", en: "for example My favourite park..." };
d[713] = { cs: "Velikost okna:", en: "Window size:" };
d[714] = { cs: "Malé", en: "Small" };
d[715] = { cs: "Střední", en: "Medium" };
d[716] = { cs: "Velké", en: "Large" };
d[717] = { cs: "Více souřadnic", en: "Multiple coordinates" };
d[718] = { cs: "<b>Vložte textový soubor (.txt) v následujícím tvaru:</b><br><span style='color: green'>Souřadnice Y</span>,<span style='color: red'>Souřadnice X</span>; (nezáporné)<br><br><b>Například:</b><br><span style='color: green'>697471.57</span>,<span style='color: red'>1037986.22</span>;<br><span style='color: green'>697260.17</span>,<span style='color: red'>1038050.88</span>;<br><br>Tato funkce je dostupná pouze v souřadnicovém systému JTSK (EPSG: 5514).<br>Velikost souboru nesmí být větší než 1 Mb a počet souřadnic nesmí být větší než 1000.", en: "<b>Add a text file (.txt) as follows:</b><br><span style='color: green'>Coordinate Y</span>.<span style='color: red'>Coordinate X</span>; (positive) <br><br><b> Example:</b><br><span style='color: green'>697471.57</span>,<span style='color: red'>1037986.22</span>;<br> <br>This function is only available in the JTSK coordinate system (EPSG: 5514).<br> The file size must not be greater than 1 Mb, and the number of coordinates must not exceed 1000." };
d[719] = { cs: "Odkaz pro webové stránky", en: "Link for web page" };
d[720] = { cs: "<i>Pokud chcete nahlásit chybu v aplikaci, <a style='color: #337ab7' href='mailto:tomas.nemecek@cuzk.gov.cz?subject=Geoprohlížeč - chyba'>kontaktujte prosím vývojáře</a> (tomas.nemecek@cuzk.gov.cz)</i>", en: "<i>If you would like to report an error in the application, <a style='color: #337ab7' href='mailto:tomas.nemecek@cuzk.gov.cz?subject=Geoprohlížeč - chyba'>please contact developer</a> (tomas.nemecek@cuzk.gov.cz)</i>" };
d[721] = { cs: "Přejete si získat trvalý odkaz na Geoprohlížeč pouze se zvolenou podkladovou mapou?", en: "Do you want to get a permanent link to the Geoviewer only with the selected base map?" };
d[722] = { cs: "Nástroj slouží k exportu dat pro uživatelem přesně vymezené území. Nejedná se o vyhledávání předpřipravených jednotek, data Vám budou připravena na míru a Export tedy několik minut trvá.<br><br>Ve výchozím stavu se data připraví podle rozsahu mapového okna. Díky Rozšířeným možnostem je možné rozsah libovolně nastavit. K tomu můžete využít buď kreslení v mapovém okně, vlastní data (Shapefile nebo GeoJSON) nebo vyhledávání územních jednotek - stačí se řídit instrukcemi Rozšířených možností.<br><br>Jakmile jste s rozsahem spokojeni, stačí vyplnit E-mail, kam budou data odeslána zvolit formát a spustit Export - může několik minut trvat, nezavírejte prosím okno webového prohlížeče.<hr>Pro návrat do okna použijte <b>Exportovat data</b> v možnostech produktu v Seznamu vrstev.", en: "The tool is used to export data for a precisely defined territory by the user. It is not a search for pre-prepared units, the data will be tailor-made for you and the export takes a few minutes. <br><br>By default, the data is prepared according to the scope of the map window. Thanks to the Advanced Options, the range can be freely adjusted. To do this, you can use either drawing in the map window, your own data (Shapefile or GeoJSON) or searching for territorial units - just follow the instructions of the Advanced Options. <br><br>Once you are satisfied with the range, just fill in the Email where the data will be sent to choose the format and start the Export - it may take a few minutes, please do not close the web browser window.<hr>To return to the window, use <b>Export Data</b> in the product options in the Layer List." };
d[723] = { cs: "Barva špendlíku:", en: "Pin color:" };
d[724] = { cs: "Informace o ukládání dat", en: "About data storage" };
d[725] = { cs: "Doplnit nadpisy", en: "Add headings" };
d[726] = { cs: "Stáhnout výsledky ve formátu GeoJSON", en: "Download results in GeoJSON format" };
d[727] = { cs: "Celá obrazovka", en: "Full screen" };
d[728] = { cs: "Zobrazit tlačítka pro další akce", en: "Show buttons for more actions" };
d[729] = { cs: "Rastrové funkce", en: "Raster functions" };
d[730] = { cs: "Ohodnoťte aplikaci", en: "Rate the app" };
d[731] = { cs: "Zobrazit REST", en: "Show REST" };
d[732] = { cs: "Vložte URL adresu REST rozhraní", en: "Paste the URL of the REST interface" };
d[733] = { cs: "Složky", en: "Folders" };
d[734] = { cs: "Služby", en: "Services" };
d[735] = { cs: "Verze serveru", en: "Server version" };
d[736] = { cs: "V tuto chvíli není možné stáhnout další data, protože stahuje příliš mnoho uživatelů.\n\nZkuste to prosím za chvíli znovu. Omlouváme se za komplikace.", en: "At this time, it is not possible to download additional data because it is downloading too many users.nnPlease try again in a moment. We apologize for the inconvenience." };
d[737] = { cs: "Nástroj slouží k vyhledávání předpřipravených výdejních jednotek dat ČÚZK. Nástroj Vám podle rozsahu připraví data ke stažení, přičemž výsledků může být maximálně 100. Pro přesnější výsledky doporučujeme přiblížit mapové okno a zobrazit si Vaše zájmové území.<br><br>Toto okno je možné znovu vyvolat po přidání příslušného produktu do Seznamu vrstev a kliknutí na Stahování předpřipravených jednotek z možností vrstvy.<hr>Pro návrat do okna použijte <b>Stáhnout data</b> v možnostech produktu v Seznamu vrstev.", en: "The tool is used to search for pre-prepared ČÚZK data dispensing units. The tool will prepare data for download according to the scope, while the results can be a maximum of 100. For more accurate results, we recommend zooming in on the map window and viewing your area of interest. <hr>To return to the window, use <b>Download data</b> in the product options in the Layer List." };
d[738] = { cs: "Zkuste <b>změnit podkladovou mapu</b> nebo <a href='javascript:void(0)' rel='noopener' onclick='document.getElementById(\"tlacitkoPridatVrstvy\").click();'><b>Přidejte vrstvu...</b></a>", en: "Try <b>changing the base map</b> or <a href='javascript:void(0)' rel='noopener' onclick='document.getElementById(\"tlacitkoPridatLayers\").click();'><b>Add layer...</b></a>" };
d[739] = { cs: "Můžete přidat vlastní geometrii ve widgetu <a href='javascript:void(0)' rel='noopener' onclick='document.getElementById(\"tlacitkoPridatVrstvy\").click();'><b>Přidat vrstvy</b></a> v záložce Ostatní (SHP/GeoJSON). Po kliknutí na polygon bude k dispozici možnost <b>Vyjádření DBP</b>.", en: "You can add custom geometry in the widget <a href='javascript:void(0)' rel='noopener' onclick='document.getElementById(\"tlacitkoPridatVrstvy\").click();'><b>Add layers</b></a> in the Other tab (SHP/GeoJSON). When you click on a polygon, the <b>DBP Statement</b> option becomes available." };
d[740] = { cs: "Nastavení", en: "Settings" };
d[741] = { cs: "Tlačítko", en: "Button" };
d[742] = { cs: "Výpis souřadnic bodu", en: "Point list coordinates" };
d[743] = { cs: "Výchozí zdroj vyhledávání:", en: "Default search source:" };
d[744] = { cs: "Jazyk", en: "Language" };
d[745] = { cs: "Po spuštění <b>Sledovat polohu</b>", en: "<b>Track location</b> after startup" };
d[746] = { cs: "Zjišťování polohy zařízení není povolené.", en: "Device location services are not enabled." };
d[747] = { cs: "*Vyžaduje přístup k poloze zařízení.", en: "*Requires access to the device's location." };
d[748] = { cs: "Zjišťování polohy", en: "Location services" };
d[749] = { cs: "Po získání polohy automaticky <b>Přiblížit na</b>", en: "After you get a location<b>, automatically Zoom To</b>" };
d[750] = { cs: "Obsah Seznamu vrstev po spuštění:", en: "Layer List content after startup:" };
d[751] = { cs: "Produkt", en: "Product" };
d[752] = { cs: "Kompozice", en: "Composition" };
d[753] = { cs: "Po spuštění <b>pokračovat, kde jste skončili</b> (2D)", en: "<b>Pick up where you left off</b> after starting (2D)" };
d[754] = { cs: "Byl změněn souřadnicový systém aplikace.\n\Úpravu můžete provést v Menu aplikace - Změnit souřadnicový systém.", en: "The coordinate system of the application has changed.nnYou can make the change in the Application Menu - Change Coordinate System." };
d[755] = { cs: "Otevřená data lze získat pouze ve 2D prostředí.", en: "Open data can only be obtained in a 2D environment." };

label = {};
if (l) {
    for (x in d) {
        if (l == "cs") {
            label[x] = d[x].cs;
        } else {
            label[x] = d[x].en;
        }
    };
}

try {
    if (l) {
        document.getElementById('settingslangSelect').value = l;
        document.getElementById('settingslangSelect').style.backgroundImage = `url(./images/${l}.svg)`;
        for (let i of document.getElementsByClassName("esri-icon-maximize")) {
            i.title = label[324];
        }
        for (let i of document.getElementsByClassName("esri-icon-close")) {
            i.title = label[325];
        }
        for (let i of document.getElementsByClassName("hint")) {
            i.innerHTML = label[326];
        }
        for (let i of document.getElementsByClassName("back")) {
            i.innerHTML = label[394];
        }
        for (let i of document.getElementsByClassName("backOnTop")) {
            i.innerHTML = label[394];
        }
        for (let i of document.getElementsByClassName("searchHranice")) {
            i.innerHTML = "<span class='esri-icon-search fLeft'></span>" + label[390];
        }
        let resttyp = "<span class='esri-expand__icon-number badgeOpenData'>REST</span>";
        let wmstyp = "<span class='esri-expand__icon-number badgeOpenData'>WMS</span>";
        [{ "loadingTitle": { 'i': label[307] } },
        { "label_1": { 'i': label[307] } },
        { "label_2": { 'i': label[308] } },
        { "loadingTitle2": { 'i': "<div id='loaderCircle' class='esri-icon-loading-indicator'></div><br><br>" + label[308] } },
        { "tlacitkoProdukty": { 'i': "<p class='esri-icon-maps mRight'></p> " + label[309] } },
        { "produkty": { 't': label[309], 'i': label[309] } },
        { "tlacitkoSeznamVrstev": { 'i': "<p class='esri-icon-layers mRight'></p> " + label[310] } },
        { "seznamVrstev": { 't': label[310], 'i': "<span class='esri-icon-layers hidden-sm hidden-md hidden-lg'></span><span class='hidden-xs'>" + label[310] + "</span>" } },
        { "tlacitkoPridatVrstvy": { 'i': "<p class='esri-icon-plus mRight'></p> " + label[311] } },
        { "pridatvrstvy": { 't': label[311],'i': "<span class='esri-icon-plus hidden-sm hidden-md hidden-lg'></span><span class='hidden-xs'>" + label[311] + "</span>" } },
        { "mapNav": { 't':  "2D " + label[312] } },
        { "sceneNav": { 't': "3D " + label[312] } },
        { "tlacitkoRozsireneHledani": { 'i': "<p class='esri-icon-search mRight'></p> " + label[313] } },
        { "zmenitSSmenu": { 'i': "<p class='esri-icon-public mRight'></p> " + label[315] } },
        { "tlacitkoPrechodSouradnice": { 'i': "<p class='esri-icon-map-pin mRight'></p> " + label[316] } },
        { "tlacitkoTransformaceSouradnic": { 'i': "<p class='esri-icon-swap mRight'></p> " + label[510] } },
        { "tlacitkoTisk": { 'i': "<p class='esri-icon-printer mRight'></p> " + label[317] } },
        { "tlacitkoMereni": { 'i': "<p class='esri-icon-measure mRight'></p> " + label[318] } },
        { "tlacitkoSwipe": { 'i': "<p class='esri-icon-dock-right mRight'></p> " + label[319] } },
        { "tlacitkoHlaseniChyb": { 'i': "<p class='esri-icon-lightbulb mRight'></p> " + label[320] } },
        { "tlacitkoVyjadreniDBP": { 'i': "<p class='esri-icon-documentation mRight'></p> " + label[321] } },
        { "tlacitkoSdileni": { 'i': "<p class='esri-icon-share mRight'></p> " + label[322] } },
        { "tlacitkoNapoveda": { 'i': "<p class='esri-icon-question mRight'></p> " + label[323] } },
        { "label_3": { 'i': label[307] } },
        { "label_4": { 'i':  label[327] + ":" } },
        { "label_5": { 'i': label[328] } },
        { "label_6": { 'i': label[329] } },
        { "label_7": { 'i': label[330] } },
        { "label_8": { 'i': "<a target='_blank' href='https://forms.office.com/r/wiP1fSbai2' style='color: #337ab7'><b>" + label[730] + "</b></a>" } },
        { "label_9": { 'i': label[332] } },
        { "label_10": { 'i': label[333] } },
        { "label_13": { 'i': label[336] } },
        { "label_14": { 'i': label[323] } },
        { "label_15": { 'i': label[309] } },
        { "label_16": { 'i': label[337] } },
        { "produktKatastralniMapa": { 'i': wmstyp + label[0] } },
        { "produktKatastralniMapaAdd": { 'i': wmstyp + label[0] } },
        { "produktBodovaPole": { 'i': resttyp + label[138] } },
        { "produktBodovaPoleAdd": { 'i': resttyp + label[138] } },
        { "produktZABAGED": { 'i': resttyp + label[531] } },
        { "produktZABAGEDAdd": { 'i': resttyp + label[531] } },
        { "produktZABAGEDVyskopis": { 'i': resttyp + "ZABAGED® - " + label[601] } },
        { "produktZABAGEDVyskopisAdd": { 'i': resttyp + "ZABAGED® - " + label[601] } },
        { "produktDMR4G": { 'i': resttyp + label[127] } },
        { "produktDMR4GAdd": { 'i': resttyp + label[127] } },
        { "produktDMR5G": { 'i': resttyp + label[128] } },
        { "produktDMR5GAdd": { 'i': resttyp + label[128] } },
        { "produktDMP1G": { 'i': resttyp + label[129] } },
        { "produktDMP1GAdd": { 'i': resttyp + label[129] } },
        { "produktOrtofoto": { 'i': resttyp + label[130] } },
        { "produktOrtofotoAdd": { 'i': resttyp + label[130] } },
        { "produktArchivniOrtofoto": { 'i': wmstyp + label[131] } },
        { "produktArchivniOrtofotoAdd": { 'i': wmstyp + label[131] } },
        { "produktOrtofotoCIR": { 'i': wmstyp + label[132] } },
        { "produktOrtofotoCIRAdd": { 'i': wmstyp + label[132] } },
        { "produktZakladniMapa5": { 'i': resttyp + label[35] + " 1 : 5 000" } },
        { "produktZakladniMapa5Add": { 'i': resttyp + label[35] + " 1 : 5 000" } },
        { "produktZakladniMapa10": { 'i': resttyp + label[35] + " 1 : 10 000" } },
        { "produktZakladniMapa10Add": { 'i': resttyp + label[35] + " 1 : 10 000" } },
        { "produktZakladniMapa25": { 'i': resttyp + label[35] + " 1 : 25 000" } },
        { "produktZakladniMapa25Add": { 'i': resttyp + label[35] + " 1 : 25 000"} },
        { "produktZakladniMapa50": { 'i': resttyp + label[35] + " 1 : 50 000" } },
        { "produktZakladniMapa50Add": { 'i': resttyp + label[35] + " 1 : 50 000" } },
        { "produktZakladniMapa100": { 'i': resttyp + label[35] + " 1 : 100 000" } },
        { "produktZakladniMapa100Add": { 'i': resttyp + label[35] + " 1 : 100 000" } },
        { "produktZakladniMapa200": { 'i': resttyp + label[35] + " 1 : 250 000" } },
        { "produktZakladniMapa200Add": { 'i': resttyp + label[35] + " 1 : 250 000" } },
        { "produktMCR500": { 'i': resttyp + label[40] } },
        { "produktMCR500Add": { 'i': resttyp + label[40] } },
        { "produktMCR1M": { 'i': resttyp + label[41] } },
        { "produktMCR1MAdd": { 'i': resttyp + label[41] } },
        { "produktMCR2M": { 'i': resttyp + label[42] } },
        { "produktMCR2MAdd": { 'i': resttyp + label[42] } },
        { "produktUzemniJednotky": { 'i': wmstyp + label[136] } },
        { "produktUzemniJednotkyAdd": { 'i': wmstyp + label[136] } },
        { "produktGeomorfologickeJednotky": { 'i': resttyp + label[341] } },
        { "produktGeomorfologickeJednotkyAdd": { 'i': resttyp + label[341] } },
        { "produktDigitalizaceKatastralniMapy": { 'i': wmstyp + label[342] } },
        { "produktDigitalizaceKatastralniMapyAdd": { 'i': wmstyp + label[342] } },
        { "produktInsParcely": { 'i': wmstyp + label[139] } },
        { "produktInsParcelyAdd": { 'i': wmstyp + label[139] } },
        { "produktInsZemepisnaJmena": { 'i': wmstyp + label[140] } },
        { "produktInsZemepisnaJmenaAdd": { 'i': wmstyp + label[140] } },
        { "produktInsVodstvo": { 'i': wmstyp + label[141] } },
        { "produktInsVodstvoAdd": { 'i': wmstyp + label[141] } },
        { "produktInsDopravniSite": { 'i': wmstyp + label[142] } },
        { "produktInsDopravniSiteAdd": { 'i': wmstyp + label[142] } },
        { "produktInsAdresy": { 'i': wmstyp + label[8] } },
        { "produktInsAdresyAdd": { 'i': wmstyp + label[8] } },
        { "produktInsUzemniSpravniJednotky": { 'i': wmstyp + label[143] } },
        { "produktInsUzemniSpravniJednotkyAdd": { 'i': wmstyp + label[143] } },
        { "produktInsBudovy": { 'i': wmstyp + label[144] } },
        { "produktInsBudovyAdd": { 'i': wmstyp + label[144] } },
        { "produktInsLandUse": { 'i': wmstyp + label[663] } },
        { "produktInsLandUseAdd": { 'i': wmstyp + label[663] } },
        { "produktInsNadmorskaVyskaGRID": { 'i': resttyp + label[145] + " (GRID)" } },
        { "produktInsNadmorskaVyskaGRIDAdd": { 'i': resttyp + label[145] + " (GRID)" } },
        { "produktInsNadmorskaVyskaTIN": { 'i': wmstyp + label[145] + " (TIN)" } },
        { "produktInsNadmorskaVyskaTINAdd": { 'i': wmstyp + label[145] + " (TIN)" } },
        { "produktInsOrtofotosnimky": { 'i': wmstyp + label[146] } },
        { "produktInsOrtofotosnimkyAdd": { 'i': wmstyp + label[146] } },
        { "produktKladyAdd": { 'i': resttyp + label[343] } },
        { "produktGeografickaSitAdd": { 'i': resttyp + label[345] } },
        { "produktKilometrovaSitJTSKAdd": { 'i': resttyp + label[344] } },
        { "label_17": { 'i': label[130] } },
        { "label_21": { 'i': label[348] } },
        { "label_189": { 'i': label[130] } },
        { "label_18": { 'i': label[125] } },
        { "label_22": { 'i': label[125] } },
        { "label_25": { 'i': label[348] } },
        { "label_28": { 'i': label[309] } },
        { "label_29": { 'i': label[348] } },
        { "label_30": { 'i': label[352] } },
        { "label_31": { 'i': label[353] } },
        { "volbaAGS_title": { 'p': label[354] } },
        { "settingsTitleInput1": { 'p': label[355] } },
        { "ESRIPridatButton1": { 'i': "<span class='esri-icon-plus fLeft'></span>" + label[356] } },
        { "label_32": { 'i': label[357] } },
        { "label_34": { 'i': label[353] } },
        { "settingsTitleInput2": { 'p': label[355] } },
        { "label_33": { 'i': label[358] } },
        { "OGCLoad": { 'i': "<span class='esri-icon-upload fLeft'></span>" + label[359] } },
        { "label_35": { 'i': label[352] } },
        { "volbaWMS_title": { 'p': label[354] } },
        { "label_36": { 'i': label[360] } },
        { "label_37": { 'i': label[361] } },
        { "OGCPridatButton2": { 'i': "<span class='esri-icon-plus fLeft'></span>" + label[362] } },
        { "label_38": { 'i': label[363] } },
        { "label_39": { 'i': label[364] } },
        { "odstranitvrstvy": { 'i': "<span class='esri-icon-trash fLeft'></span>" + label[365] } },
        { "label_41": { 'i': label[131] + ":" } },
        { "label_42": { 'i': label[366] } },
        { "label_43": { 't': label[367] } },
        { "label_44": { 'i': label[368] } },
        { "label_45": { 'i': label[125] } },
        { "label_46": { 'i': label[130] } },
        { "label_47": { 'i': label[369] } },
        { "label_48": { 'i': label[370] } },
        { "label_49": { 'i': label[371] } },
        { "label_50": { 'i': label[372] } },
        { "label_51": { 'i': label[373] } },
        { "label_52": { 'i': label[128] } },
        { "label_53": { 'i': label[127] } },
        { "label_54": { 'i': label[47] } },
        { "nadpisX": { 'i': label[89] + " Y:" } },
        { "souradnice2": { 'p': label[374] } },
        { "nadpisY": { 'i': label[89] + " X:" } },
        { "souradnice1": { 'p': label[374] } },
        { "label_55": { 'i': label[375] } },
        { "zobrazitSouradnice": { 'i': "<span class='esri-icon-search fLeft'></span> " + label[376] } },
        { "vymazatBody": { 'i': "<span class='esri-icon-trash fLeft'></span> " + label[502] } },
        { "label_56": { 'i': label[378] } },
        { "label_57": { 'i': label[46] } },
        { "label_58": { 'i': label[380] + ":" } },
        { "sceneScreenshotWidth": { 'p': label[380] } },
        { "label_59": { 'i': label[381] + ":" } },
        { "sceneScreenshotHeight": { 'p': label[381] } },
        { "label_60": { 'i': label[550] } },
        { "label_61": { 'i': label[380] + ":" } },
        { "label_62": { 'i': label[381] + ":" } },
        { "label_64": { 'i': "<span class='esri-icon-measure-line fLeft'></span> " + label[387] } },
        { "label_65": { 'i': "<span class='esri-icon-measure-area fLeft'></span> " + label[386] } },
        { "label_68": { 'i': label[388] } },
        { "label_69": { 'i': label[139] + "<span class='esri-icon-collapse fRight'></span>" } },
        { "label_70": { 'i': label[347] + "<span class='esri-icon-collapse fRight'></span>" } },
        { "label_71": { 'i': label[389] } },
        { "rozsirenevyhledavanibtn": { 'i': "<span class='esri-icon-search fLeft'></span>" + label[390] } },
        { "odstranitNalezeneParcelyBtn": { 'i': "<span class='esri-icon-trash fLeft'></span> " + label[18] } },
        { "label_72": { 'i': label[391] } },
        { "label_73": { 'i': label[153] + " (NUTS 2) <span class='esri-icon-collapse fRight'></span>" } },
        { "hledaniRegionSoudrznostiNadpis": { 'i': label[153] + " (NUTS 2):" } },
        { "label_74": { 'i': label[392] + "<span class='esri-icon-collapse fRight'></span>" } },
        { "hledaniKrajNadpis": { 'i': label[392] + ":" } },
        { "label_75": { 'i': label[156] + "<span class='esri-icon-collapse fRight'></span>" } },
        { "hledaniOkresNadpis": { 'i': label[156] + ":" } },
        { "label_76": { 'i': label[157] + "<span class='esri-icon-collapse fRight'></span>" } },
        { "hledaniORPNadpis": { 'i': label[157] + ":" } },
        { "label_77": { 'i': label[161] + "<span class='esri-icon-collapse fRight'></span>" } },
        { "hledaniPOUNadpis": { 'i': label[161] + ":" } },
        { "label_78": { 'i': label[14] + "<span class='esri-icon-collapse fRight'></span>" } },
        { "hledaniObecNadpis": { 'i': label[14] + ":" } },
        { "label_79": { 'i': label[164] + "<span class='esri-icon-collapse fRight'></span>" } },
        { "hledaniCastObceNadpis": { 'i': label[164] + ":" } },
        { "label_80": { 'i': label[393] + "<span class='esri-icon-collapse fRight'></span>" } },
        { "hledaniMestskyObvodCastStatutPrahaNadpis": { 'i': label[393] + ":" } },
        { "label_81": { 'i': label[12] + "<span class='esri-icon-collapse fRight'></span>" } },
        { "hledaniKatastralniUzemiNadpis": { 'i': label[12] + ":" } },
        { "label_82": { 'i': label[166] + "<span class='esri-icon-collapse fRight'></span>" } },
        { "hledaniZSJNadpis": { 'i': label[166] + ":" } },
        { "hledaniOkres": { 'p': label[395] } },
        { "hledaniORP": { 'p': label[396] } },
        { "hledaniPOU": { 'p': label[397] } },
        { "hledaniObec": { 'p': label[398] } },
        { "hledaniCastObce": { 'p': label[399] } },
        { "hledaniMestskyObvodCastStatutPraha": { 'p': label[400] } },
        { "hledaniMestskyObvodPraha": { 'p': label[489] } },
        { "label_487": { 'i':label[487] + "<span class='esri-icon-collapse fRight'></span>" } },
        { "hledaniMestskyObvodPrahaNadpis": { 'i': label[487] + ":" } },
        { "hledaniSpravniObvodPraha": { 'p': label[490] } },
        { "label_488": { 'i': label[488] + "<span class='esri-icon-collapse fRight'></span>" } },
        { "hledaniSpravniObvodPrahaNadpis": { 'i': label[488] + ":" } },
        { "hledaniKatastralniUzemi": { 'p': label[401] } },
        { "hledaniZSJ": { 'p': label[402] } },
        { "label_84": { 'i': label[404] } },
        { "label_85": { 'i': label[406] } },
        { "label_86": { 'i': label[405] } },
        { "label_87": { 'i': label[406] } },
        { "label_88": { 'i': label[409] } },
        { "label_89": { 'i': label[407] } },
        { "label_90": { 'i': label[408] } },
        { "label_91": { 'i': label[410] } },
        { "label_92": { 'i': '<span class="esri-icon-close fLeft"></span>' + label[412] } },
        { "useSwipe": { 'i': '<span class="esri-icon-swap fLeft"></span>' + label[411] } },
        { "lokalizaceChyby": { 'i': '<span class="esri-icon-map-pin fLeft"></span>' + label[93] } },
        { "label_94": { 'i': label[413] } },
        { "label_95": { 'i': label[169] } },
        { "label_102": { 'i': label[130] } },
        { "label_104": { 'i': label[414] } },
        { "label_105": { 'i': label[348] } },
        { "popisChyby": { 'p': label[415] } },
        { "jmeno": { 'p': label[416] } },
        { "email": { 'p': label[417] } },
        { "upresneniGeometrie": { 'i': "<span class='esri-icon-authorize fLeft'></span>" + label[418] + "<span id='hlaseniChybIkonaUpresneni' class='esri-icon-down fRight'></span>" } },
        { "upresneniGeometrieSmazatPosledni": { 'i': label[419] } },
        { "label_162": { 'i': label[420] } },
        { "odeslat": { 'i': label[193] } },
        { "zacitZnovu": { 'i': "<span class='esri-icon-undo fLeft'></span>" + label[421] } },
        { "label_106": { 'i': label[422] } },
        { "fyzickaOsoba": { 'i': "<span class='esri-icon-user fLeft'></span>" + label[423] } },
        { "pravnickaOsoba": { 'i': "<span class='esri-icon-organization fLeft'></span>" + label[424] } },
        { "lokalizaceProjektu": { 'i':  "<span class='esri-icon-polygon fLeft'></span>" + label[425] } },
        { "editaceProjektu": { 'i': "<span class='esri-icon-edit fLeft'></span>" + label[576] } },
        { "krestniJmeno": { 'p': label[427] } },
        { "prijmeni": { 'p': label[428] } },
        { "nazevFirmy": { 'p': label[429] } },
        { "ico": { 'p': label[563] } },
        { "ulice": { 'p': label[10] } },
        { "obec": { 'p': label[14] } },
        { "cp": { 'p': label[430] } },
        { "psc": { 'p': label[431] } },
        { "label_108": { 'i': label[432] } },
        { "label_109": { 'i': label[433] } },
        { "label_110": { 'i': label[434] } },
        { "label_111": { 'i': label[435] } },
        { "label_112": { 'i': label[436] } },
        { "label_113": { 'i': label[437] } },
        { "label_114": { 'i': label[438] } },
        { "label_115": { 'i': label[439] } },
        { "label_116": { 'i': label[440] } },
        { "label_117": { 'i': label[441] } },
        { "label_118": { 'i': label[442] } },
        { "label_119": { 'i': label[443] } },
        { "label_120": { 'i': label[444] } },
        { "label_121": { 'i': label[445] } },
        { "label_122": { 'i': label[446] } },
        { "label_123": { 'i': label[447] } },
        { "label_124": { 'i': label[448] } },
        { "label_125": { 'i': label[449] } },
        { "label_126": { 'i': label[450] } },
        { "label_127": { 'i': label[451] } },
        { "label_128": { 'i': label[452] } },
        { "label_129": { 'i': label[453] } },
        { "label_130": { 'i': label[454] } },
        { "label_131": { 'i': label[455] } },
        { "label_132": { 'i': label[456] } },
        { "label_133": { 'i': label[457] } },
        { "label_134": { 'i': label[458] } },
        { "label_135": { 'i': label[459] } },
        { "label_136": { 'i': label[460] } },
        { "label_137": { 'i': label[461] } },
        { "label_138": { 'i': label[462] } },
        { "label_139": { 'i': label[463] } },
        { "label_140": { 'i': label[464] } },
        { "label_141": { 'i': label[465] } },
        { "label_142": { 'i': label[466] } },
        { "label_143": { 'i': label[467] } },
        { "poznamka": { 'p': label[468] } },
        { "odeslatVyjadreni": { 'i': label[193] } },
        { "zacitZnovuVyjadreni": { 'i': "<span class='esri-icon-undo fLeft'></span>" + label[421] } },
        { "label_146": { 'i': label[469] } },
        { "ulozitMapuCas1": { 'i': label[470] } },
        { "ulozitMapuCas2": { 'i': label[471] } },
        { "ulozitMapuCas3": { 'i': label[472] } },
        { "ulozitMapuCas4": { 'i': label[473] } },
        { "ulozitMapuCas5": { 'i': label[474] } },
        { "ulozitMapu": { 'i': "<span class='esri-icon-save fLeft'></span>" + label[475] } },
        { "label_145": { 'i': label[476] } },
        { "label_150": { 'i': label[315] } },
        { "label_151": { 'i': label[311] } },
        { "label_152": { 'i': label[310] } },
        { "label_153": { 'i': label[316] } },
        { "label_154": { 'i': label[317] } },
        { "label_155": { 'i': label[318] } },
        { "label_156": { 'i': label[313] } },
        { "label_157": { 'i': label[319] } },
        { "label_158": { 'i': label[320] } },
        { "label_159": { 'i': label[321] } },
        { "label_160": { 'i': label[322] } },
        { "label_163": { 't': label[478] } },
        { "label_165": { 'i': label[479] } },
        { "removeHranice": { 'i': "<span class='esri-icon-trash fLeft'></span>" + label[502] } },
        { "label_166": { 'i': label[507] + ":" } },
        { "label_167": { 'i': label[508] + ":" } },
        { "label_168": { 'i': label[509] } },
        { "transformaceSouradnice1": { 'p': label[374] + " " + label[595] } },
        { "transformaceSouradnice2": { 'p': label[374] + " " + label[595] } },
        { "transformaceSouradnice3": { 'p': label[374] } },
        { "transformaceNadpis4": { 'i': label[579] } },
        { "label_169": { 'i': label[510] } },
        { "label_170": { 'i': "<span class='esri-icon-play fLeft'></span>" + label[512] } },
        { "label_171": { 'i': label[138] + "<span class='esri-icon-collapse fRight'></span>" } },
        { "label_172": { 'i': label[516] + "<span class='esri-icon-collapse fRight'></span>" } },
        { "label_173": { 'i': label[517] + "<span class='esri-icon-collapse fRight'></span>" } },
        { "label_174": { 'i': label[518] + "<span class='esri-icon-collapse fRight'></span>" } },
        { "label_175": { 'i': label[519] + "<span class='esri-icon-collapse fRight'></span>" } },
        { "label_176": { 'i': label[520] + "<span class='esri-icon-collapse fRight'></span>" } },
        { "label_177": { 'p': label[521] } },
        { "hledani_label_178": { 'p': label[148] } },
        { "label_179": { 'p': label[522] } },
        { "label_180": { 'p': label[524] } },
        { "ztbp_cislobodu": { 'p': label[521] } },
        { "czepos_nazev_bodu": { 'p': label[524] } },
        { "czepos_nazev_ku": { 'p': label[148] } },
        { "ztvp_nivelacnibod": { 'p': label[525] } },
        { "ztvp_nazevsmo5": { 'p': label[526] } },
        { "hledani_ztvp_katastr": { 'p': label[148] } },
        { "ztvp_nivelacniporad": { 'p': label[527] } },
        { "hledaniZPBPNadpis": { 'i': label[516] + ":" } },
        { "hledaniZHBNadpis": { 'i': label[298] + ":" } },
        { "hledaniPPBPNadpis": { 'i': label[517] + ":" } },
        { "hledaniZPVPNadpis": { 'i': label[518] + ":" } },
        { "hledaniZTBPNadpis": { 'i': label[519] + ":" } },
        { "hledaniCZEPOSNadpis": { 'i': label[520] + ":" } },
        { "odstranitvysledkyvyhledavani": { 'i': "<span class='esri-icon-trash fLeft'></span>" + label[529] } },
        { "label_182": { 'i': label[63] } },
        { "label_183": { 'i': label[64] } },
        { "hledani_vstupkatastry": { 'p': label[606] } },
        { "vstupkmenovecislo": { 'p': label[59] + " ../.. " + label[60] } },
        { "label_184": { 'i': "Widget <b>" + label[534] + "</b> (3D)" } },
        { "label_185": { 'i': label[55] } },
        { "label_190": { 'i': label[582] } },
        { "label_191": { 'i': label[298] + "<span class='esri-icon-collapse fRight'></span>" } },
        { "label_192": { 'p': label[521] } },
        { "label_193": { 'p': label[536] } },
        { "hledani_label_194": { 'p': label[148] } },
        { "label_195": { 'p': label[522] } },
        { "removeDBP": { 'i': "<span class='esri-icon-trash fLeft'></span>" + label[502] } },
        { "label_196": { 'p': label[521] } },
        { "label_197": { 'p': label[536] } },
        { "hledani_label_198": { 'p': label[148] } },
        { "label_199": { 'p': label[522] } },
        { "label_200": { 'i': label[334] } },
        { "label_201": { 'i': label[537] } },
        { "tiskNazevMapy": { 'p': label[539] } },
        { "tiskDpiNadpis": { 'i': label[540] + ":" } },
        { "tiskFormatNadpis": { 'i': label[46] } },
        { "tiskLayoutTemplateNadpis": { 'i': label[541] } },
        { "label_202": { 'i': label[543] } },
        { "label_203": { 'i': label[542] } },
        { "label_204": { 'i': label[545] } },
        { "label_205": { 'i': label[544] } },
        { "label_207": { 'i': label[550] } },
        { "label_210": { 'i': label[547] } },
        { "label_211": { 'i': label[552] } },
        { "tiskSirka": { 'p': label[380] } },
        { "tiskVyska": { 'p': label[381] } },
        { "tiskAutor": { 'p': label[548] } },
        { "vyjadreniJmenoNadpis": { 'i': label[427] + ":" } },
        { "vyjadreniFirmaNadpis": { 'i': label[572] + ":" } },
        { "vyjadreniAdresaNadpis": { 'i': label[573] + ":" } },
        { "vyjadreniStavbaNadpis": { 'i': label[574] + ":" } },
        { "vyjadreniKontaktNadpis": { 'i': label[575] + ":" } },
        { "transformaceSouradniceToggle": { 'i': label[580] } },
        { "transformaceTxtSouborToggle": { 'i': label[581] } },
        { "label_219": { 'i': label[507] + ":" } },
        { "label_220": { 'i': label[508] + ":" } },
        { "label_221": { 'i': "<span class='esri-icon-play fLeft'></span>" + label[512] } },
        { "label_222": { 'i': label[537] } },
        { "transformaceVysledekTxtUrl": { 'i': label[583] } },
        { "produktHistonamesAdd": { 'i': resttyp + label[589] } },
        { "produktHistonames": { 'i': resttyp + label[589] } },
        { "onTopAddData": { 't': label[593] } },
        { "onTopProdukty": { 't': label[593] } },
        { "label_63": { 'i': label[598] } },
        { "label_66": { 'i': label[556] } },
        { "label_67": { 'i': label[600] } },
        { "label_83": { 'i': label[605] } },
        { "label_164": { 'i': label[648] } },
        { "vlastniMeritkoValue": { 'i': label[147] } },
        { "vlastniMeritkoInput": { 'p': label[664] } },
        { "label_223": { 'i': label[367] } },
        { "label_224": { 'p': label[675] } },
        { "hledaniParcelToggle": { 'i': label[707] } },
        { "hledaniParcelTxtSouborToggle": { 'i': label[708] } },
        { "label_225": { 'i': label[709] } },
        { "nactenoPridatVrstvuEdit": { 'i': "<span class='esri-icon-edit fLeft'></span>" + label[710] } },
        { "prechodNaSouradniceToggle": { 'i': label[580] } },
        { "prechodNaSouradniceTxtSouborToggle": { 'i': label[717] } },
        { "label_226": { 'i': label[502] } },
        { "label_228": { 'i': label[718] } },
        { "hlaseni_info": { 'i': label[720] } },
        { "hlaseni_priloha": { 'i': label[197] + ":" } },
        { "label_229": { 'i': label[723] } },
        { "cookies": { 'i': label[724] } },
        { "prechodNaSouradniceTxtLabels": { 'i': label[725] } },
        { "hledaniParcelTxtGeojsonLabel": { 'i': label[726] } },
        { "label_230": { 'i': label[600] } },
        { "ESRIRestBtn": { 'i': label[731] + "<span class='esri-icon-collapse fRight'></span>" } },
        { "ESRIRestInput": { 'p': label[732] } },
        { "infoVrstva": { 'i': label[738] } },
        { "indikaceKresleniProjektu": { 'i': label[739] } },
        { "label_149": { 'i': label[740] } },
        { "tlacitkoNastaveni": { 'i':"<p class='esri-icon-settings mRight'></p> " + label[740] } },
        { "settingsUI": { 'i': label[331] + ":" } },
        { "settingskatastrLabel": { 'i': label[741] + " <b>" + label[2] + "</b>" } },
        { "settingsexpand3Label": { 'i': label[741] + " <b>" +  label[483] + "</b>" } },
        { "settingscoordinateLabel": { 'i': "Widget <b>" + label[742] + "</b>" } },
        { "settingssearchLabel": { 'i': label[743] } },
        { "settingslangLabel": { 'i': label[744] + ":" } },
        { "settingstrackLabel": { 'i': label[745] } },
        { "settingstrackinfo": { 'i': label[747] } },
        { "settingstracklabel": { 'i': label[748] + ":*" } },
        { "settingstrackzoomLabel": { 'i': label[749] } },
        { "settingslayerlistLabel": { 'i': label[750] } },
        { "settingsnavigatingLabel": { 'i': label[753] } },
        { "tiskDraw": { 'i': "<span class='esri-icon-polygon fLeft'></span>" + label[133] } },
        { "tiskDrawEnd": { 'i': "<span class='esri-icon-trash fLeft'></span>" + label[134] } },
        { "basemapInfoLabel": { 'i': label[22] } },
        { "produktDMPOK": { 'i': resttyp + label[245] } },
        { "produktDMPOKAdd": { 'i': resttyp + label[245] } }].forEach(i => {
            Object.keys(i).forEach(v => {
                let e = document.getElementById(v);
                if (i[v].i) e.innerHTML = i[v].i;
                if (i[v].t) e.title = i[v].t;
                if (i[v].p) e.placeholder = i[v].p;
            });
        })
    }
} catch(error) {
    document.getElementById("offline").innerHTML = "<span class='alert'><span class='esri-icon-notice-triangle'></span> " + label[696] + "</span>";
    document.getElementById("offline").title = error.name + ": " + error.message + "\n\n" + label[697];
}

var dojoConfig = {
    locale: l,
    has: { "esri-promise-compatibility-deprecation-warnings": 0 },
    packages: [{ name: "bootstrap", location: location.pathname.replace(/\/[^/]+$/, "") + "/js/dojo-bootstrap" },
    { name: "calcite-maps", location: location.pathname.replace(/\/[^/]+$/, "") + "/js" },
    { name: "calcite-settings", location: location.pathname.replace(/\/[^/]+$/, "") + "/js" }]
};
if (api == "https://js.arcgis.com") {
    dojoConfig.packages.push({ name: "dojo", location: "//ajax.googleapis.com/ajax/libs/dojo/1.14.1/dojo/" }, { name: "dijit", location: "//ajax.googleapis.com/ajax/libs/dojo/1.14.1/dijit/" }, { name: "dojox", location: "//ajax.googleapis.com/ajax/libs/dojo/1.14.1/dojox/" })
}