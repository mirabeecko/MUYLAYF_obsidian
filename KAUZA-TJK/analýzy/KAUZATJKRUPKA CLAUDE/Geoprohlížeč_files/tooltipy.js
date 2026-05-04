require(["dijit/Tooltip", "dojo/domReady!"], (Tooltip) => {
        let p1 = ["above", "below", "before", "after"];
        let p2 = ["before", "after", "above", "below"];
        let a = 50;       
        if (app.mapView.widthBreakpoint == "medium" || app.mapView.widthBreakpoint == "large" || app.mapView.widthBreakpoint == "xlarge") {
            let lk = [
                { id: ["kompoziceZakladniMapy"], p: p1, n: '12231', l: 'Základní topografické mapy ČR', s: 'ztm' },
                { id: ["kompoziceZABAGED"], p: p1, n: '21094', l: 'ZABAGED - Výškopis<br />ZABAGED - polohopis', s: 'zabaged' },
                { id: ["kompoziceZABAGEDVyskopis"], p: p1, n: '553', l: 'ZABAGED - Výškopis - vrstevnice<br />Ortofoto', s: 'zabagedvrstevnice' },
                { id: ["kompoziceDMR4G"], p: p1, n: '11272', l: 'DMR 4G<br />Základní topografické mapy ČR', s: 'dmr4g' },
                { id: ["kompoziceDMR5G"], p: p1, n: '11273', l: 'DMR 5G<br />Základní topografické mapy ČR', s: 'dmr5g' },
                { id: ["kompoziceDMP1G"], p: p1, n: '11271', l: 'DMP 1G<br />Základní topografické mapy ČR', s: 'dmp1g' },
                { id: ["kompoziceOrtofoto"], p: p1, n: '12232', l: 'Geonames<br />RUIAN<br />Ortofoto', s: 'ortofoto' },
                { id: ["kompoziceArchivniOrtofoto"], p: p1, n: '8491', l: 'Geonames<br />Archivní ortofoto', s: 'archortofoto' },
                { id: ["kompoziceUzemniJednotky"], p: p1, n: '5717', l: 'Units eXtended<br />Ortofoto', s: 'uzemnijednotky' },
                { id: ["kompoziceKatastralniMapa"], p: p1, n: '485', l: 'Katastrální mapy<br />Ortofoto', s: 'katastralnimapa' },
                { id: ["kompoziceBodovaPole"], p: p1, n: '503', l: 'Bodová pole<br />RUIAN<br />Klady mapových listů<br />Základní topografické mapy ČR', s: 'dbp' },
                { id: ["kompoziceGeonames"], p: p1, n: '490', l: 'RUIAN<br />Geonames', s: 'geonames' },
                { id: ["kompoziceHistonames"], p: p1, n: '65403', l: 'Historická jména<br />Ortofoto', s: 'histonames' },
                { id: ["kompoziceInsParcely"], p: p1, n: '496', l: 'INSPIRE - Cadastral Parcels<br />Ortofoto', s: 'inspireparcely' },
                { id: ["kompoziceInsZemepisnaJmena"], p: p1, n: '604', l: 'INSPIRE - Geographical Names<br />Ortofoto', s: 'inspiregeonames' },
                { id: ["kompoziceInsVodstvo"], p: p1, n: '998', l: 'INSPIRE - Geographical Names<br />INSPIRE - Hydrography<br />Ortofoto', s: 'inspirevodstvo' },
                { id: ["kompoziceInsDopravniSite"], p: p1, n: '3823', l: 'INSPIRE - Geographical Names<br />INSPIRE - Transport networks<br />Ortofoto', s: 'inspiredoprava' },
                { id: ["kompoziceInsLandUse"], p: p1, n: '13992', l: 'INSPIRE - Geographical Names<br />INSPIRE - Land Use<br />Základní topografické mapy ČR', s: 'inspirelanduse' },
                { id: ["kompoziceInsGGSETRS89GRS80"], p: p1, n: '8390', l: 'INSPIRE - Geographical Names<br />GRID ETRS89 - GRS80<br />Ortofoto', s: 'inspiregrs80' },
                { id: ["kompoziceInsGGSETRS89LAEA"], p: p1, n: '3903', l: 'INSPIRE - Geographical Names<br />GRID ETRS89 - LAEA<br />Ortofoto', s: 'inspirelaea' },
                { id: ["kompoziceInsAdresy"], p: p1, n: '4364', l: 'INSPIRE - Addresses<br />Ortofoto', s: 'inspireadresy' },
                { id: ["kompoziceInsUzemniSpravniJednotky"], p: p1, n: '4365', l: 'INSPIRE - Administrative Units<br />Ortofoto', s: 'inspirehranice' },
                { id: ["kompoziceInsBudovy"], p: p1, n: '13631', l: 'INSPIRE - Buildings<br />Ortofoto', s: 'inspirebudovy' },
                { id: ["kompoziceInsNadmorskaVyskaGRID"], p: p1, n: '13994', l: 'INSPIRE Nadmořská výška (EL GRID)<br />Základní topografické mapy ČR', s: 'inspirenadmorskavyskaGRID' },
                { id: ["kompoziceInsNadmorskaVyskaTIN"], p: p1, n: '13994', l: 'INSPIRE Nadmořská výška (EL TIN)<br />DMR 5G', s: 'inspirenadmorskavyskaTIN' },
                { id: ["kompoziceInsOrtofotosnimky"], p: p1, n: '11511', l: 'INSPIRE - Geographical Names<br />INSPIRE - Administrative Units<br />INSPIRE - Ortofotosnímky (OI)', s: 'inspireortofoto' },
                { id: ["produktMetadata", "produktMetadataAdd"], p: p2, n: '94, true', l: 'Metadata', s: 'metadata' },
            ]
            lk.forEach(e => {
                let d = document.createElement('div');
                d.style.width = '200px';
                d.style.cursor = 'pointer';
                d.setAttribute('onclick', `app.widgetProdukty.usekompozici(${e.n})`);
                d.innerHTML = `<b>${label[200]}</b><br />${e.l}<br /><br /><b>${label[201]}</b><img src='../tooltipy_img/${e.s}.jpg' height='175' width='200' loading='lazy'>`;
                new Tooltip({ connectId: e.id, label: d.outerHTML, showDelay: a, hideDelay: a, position: e.p });
            });
            let tp = [
                { id: ["produktHistonames", "produktHistonamesAdd"], lt: label[597], ld: label[592], m: "Default.aspx?mode=TextMeta&metadataID=CZ-CUZK-WMS-HISTORICKA_JMENA&metadataXSL=Full&side=wms.verejne", l: "ags.cuzk.gov.cz/arcgis/rest/services/Nazvoslovi/historickajmena/MapServer" },
                { id: ["produktKilometrovaSitJTSKAdd"], lt: label[287], ld: label[288], m: "", l: "ags.cuzk.gov.cz/arcgis/rest/services/Site/JTSK_1KM/MapServer" },
                { id: ["produktGeografickaSitAdd"], lt: label[285], ld: label[286], m: "", l: "ags.cuzk.gov.cz/arcgis/rest/services/Site/GeografickaSitWGS84/MapServer" },
                { id: ["produktKladyAdd"], lt: label[283], ld: label[284], m: "", l: "ags.cuzk.gov.cz/arcgis/rest/services/KladyMapovychListu/MapServer" },
                { id: ["produktInsOrtofotosnimky", "produktInsOrtofotosnimkyAdd"], lt: label[281], ld: label[282], m: "Default.aspx?mode=TextMeta&metadataID=CZ-CUZK-VIEW-OI&metadataXSL=Full&side=wms.INSPIRE", l: "geoportal.cuzk.gov.cz/WMS_INSPIRE_ORTOFOTO/WMService.aspx" },
                { id: ["produktInsNadmorskaVyskaTIN", "produktInsNadmorskaVyskaTINAdd"], lt: label[557], ld: label[506], m: "Default.aspx?mode=TextMeta&metadataID=CZ-CUZK-VIEW-EL_TIN&metadataXSL=Full&side=wms.INSPIRE", l: "ags.cuzk.gov.cz/arcgis2/services/INSPIRE_Nadmorska_vyska_TIN/MapServer/WMSServer" },
                { id: ["produktInsNadmorskaVyskaGRID", "produktInsNadmorskaVyskaGRIDAdd"], lt: label[279], ld: label[280], m: "Default.aspx?mode=TextMeta&metadataID=CZ-CUZK-AGS-EL&metadataXSL=Full&side=wms.AGS", l: "ags.cuzk.gov.cz/arcgis2/rest/services/INSPIRE_Nadmorska_vyska/ImageServer" },
                { id: ["produktInsBudovy", "produktInsBudovyAdd"], lt: label[277], ld: label[278], m: "Default.aspx?mode=TextMeta&metadataID=CZ-00025712-CUZK_WMS-MD_BU&metadataXSL=Full&side=wms.INSPIRE", l: "services.cuzk.gov.cz/wms/inspire-BU-wms.asp" },
                { id: ["produktInsUzemniSpravniJednotky", "produktInsUzemniSpravniJednotkyAdd"], lt: label[275], ld: label[276], m: "Default.aspx?mode=TextMeta&metadataID=CZ-00025712-CUZK_WMS-MD_AU&metadataXSL=Full&side=wms.INSPIRE", l: "services.cuzk.gov.cz/wms/inspire-au-wms.asp" },
                { id: ["produktInsAdresy", "produktInsAdresyAdd"], lt: label[273], ld: label[274], m: "Default.aspx?mode=TextMeta&metadataID=CZ-00025712-CUZK_WMS-MD_AD&metadataXSL=Full&side=wms.INSPIRE", l: "services.cuzk.gov.cz/wms/inspire-ad-wms.asp" },
                { id: ["produktInsGGSETRS89LAEA", "produktInsGGSETRS89LAEAAdd"], lt: label[271], ld: label[272], m: "Default.aspx?mode=TextMeta&metadataID=CZ-CUZK-VIEW-GGS&metadataXSL=Full&side=wms.INSPIRE", l: "geoportal.cuzk.gov.cz/WMS_GRID_ETRS89_LAEA/WMService.aspx" },
                { id: ["produktInsGGSETRS89GRS80", "produktInsGGSETRS89GRS80Add"], lt: label[269], ld: label[270], m: "Default.aspx?mode=TextMeta&metadataID=CZ-CUZK-VIEW-GGS80&metadataXSL=Full&side=wms.INSPIRE", l: "geoportal.cuzk.gov.cz/WMS_GRID_ETRS89_GRS80/WMService.aspx" },
                { id: ["produktInsLandUse", "produktInsLandUseAdd"], lt: label[661], ld: label[662], m: "Default.aspx?mode=TextMeta&metadataID=CZ-CUZK-VIEW-LU&metadataXSL=Full&side=wms.INSPIRE", l: "geoportal.cuzk.gov.cz/WMS_INSPIRE_LU/WMService.aspx" },
                { id: ["produktInsDopravniSite", "produktInsDopravniSiteAdd"], lt: label[267], ld: label[268], m: "Default.aspx?mode=TextMeta&metadataID=CZ-CUZK-VIEW-TN&metadataXSL=Full&side=wms.INSPIRE", l: "geoportal.cuzk.gov.cz/WMS_INSPIRE_TN/WMService.aspx" },
                { id: ["produktInsVodstvo", "produktInsVodstvoAdd"], lt: label[265], ld: label[266], m: "Default.aspx?mode=TextMeta&metadataID=CZ-CUZK-VIEW-HY&metadataXSL=Full&side=wms.INSPIRE", l: "geoportal.cuzk.gov.cz/WMS_INSPIRE_HY/WMService.aspx" },
                { id: ["produktInsZemepisnaJmena", "produktInsZemepisnaJmenaAdd"], lt: label[263], ld: label[264], m: "Default.aspx?mode=TextMeta&metadataID=CZ-CUZK-VIEW-GN&metadataXSL=Full&side=wms.INSPIRE", l: "geoportal.cuzk.gov.cz/wms_inspire_gn/WMService.aspx" },
                { id: ["produktInsParcely", "produktInsParcelyAdd"], lt: label[261], ld: label[262], m: "Default.aspx?mode=TextMeta&metadataID=CZ-00025712-CUZK_WMS-MD_CP&metadataXSL=Full&side=wms.INSPIRE", l: "services.cuzk.gov.cz/wms/inspire-CP-wms.asp" },
                { id: ["produktGeonames", "produktGeonamesAdd"], lt: label[259], ld: label[260], m: "Default.aspx?mode=TextMeta&metadataID=CZ-CUZK-AGS-GEONAMES&metadataXSL=Full&side=wms.AGS", l: "ags.cuzk.gov.cz/arcgis/rest/services/GEONAMES/Geonames/MapServer" },
                { id: ["produktDigitalizaceKatastralniMapy", "produktDigitalizaceKatastralniMapyAdd"], lt: label[257], ld: label[258], m: "Default.aspx?mode=TextMeta&metadataXSL=full&side=wms.verejne&metadataID=CZ-00025712-CUZK_WMS-MD_DG", l: "services.cuzk.gov.cz/wms/local-dg-wms.asp" },
                { id: ["produktGeomorfologickeJednotky", "produktGeomorfologickeJednotkyAdd"], lt: label[255], ld: label[256], m: "Default.aspx?mode=TextMeta&metadataID=CZ-CUZK-AGS-GEOMORF&metadataXSL=Full&side=wms.AGS", l: "ags.cuzk.gov.cz/arcgis/rest/services/GeomorfologickeJednotky/MapServer" },
                { id: ["produktDATA200", "produktDATA200Add"], lt: label[253], ld: label[254], m: "Default.aspx?mode=TextMeta&metadataID=CZ-CUZK-AGS-DATA250-P&metadataXSL=Full&side=wms.AGS", l: "ags.cuzk.gov.cz/arcgis/rest/services/DATA250/MapServer" },
                { id: ["produktDATA50", "produktDATA50Add"], lt: label[251], ld: label[252], m: "Default.aspx?mode=TextMeta&metadataID=CZ-CUZK-AGS-DATA50-P&metadataXSL=Full&side=wms.AGS", l: "ags.cuzk.gov.cz/arcgis/rest/services/DATA50/MapServer" },
                { id: ["produktRUIAN", "produktRUIANAdd"], lt: label[249], ld: label[250], m: "Default.aspx?mode=TextMeta&metadataID=CZ-CUZK-AGS-RUIAN&metadataXSL=Full&side=wms.AGS", l: "ags.cuzk.gov.cz/arcgis/rest/services/RUIAN/MapServer" },
                { id: ["produktUzemniJednotky", "produktUzemniJednotkyAdd"], lt: label[247], ld: label[248], m: "Default.aspx?mode=TextMeta&metadataID=CZ-00025712-CUZK_WMS-MD_UX&metadataXSL=Full&side=wms.verejne", l: "services.cuzk.gov.cz/wms/local-UX-wms.asp" },
                { id: ["produktOrtofotoCIR", "produktOrtofotoCIRAdd"], lt: label[239], ld: label[240], m: "Default.aspx?mode=TextMeta&metadataID=CZ-CUZK-WMS-ORTOCIR&metadataXSL=Full&side=wms.verejne", l: "geoportal.cuzk.gov.cz/WMS_ORTOFOTO_CIR/WMService.aspx" },
                { id: ["produktArchivniOrtofoto", "produktArchivniOrtofotoAdd"], lt: label[237], ld: label[238], m: "geoportal.cuzk.gov.cz/Default.aspx?mode=TextMeta&metadataID=CZ-CUZK-WMS-ORTOARCHIV&metadataXSL=Full&side=wms.verejne", l: "geoportal.cuzk.gov.cz/WMS_ORTOFOTO_ARCHIV/WMService.aspx" },
                { id: ["produktOrtofoto", "produktOrtofotoAdd"], lt: label[235], ld: label[236], m: "Default.aspx?mode=TextMeta&metadataID=CZ-CUZK-AGS-ORTOFOTO&metadataXSL=Full&side=wms.AGS", l: "ags.cuzk.gov.cz/arcgis1/rest/services/ORTOFOTO/MapServer" },
                { id: ["produktDMP1G", "produktDMP1GAdd"], lt: label[233], ld: label[234], m: "Default.aspx?mode=TextMeta&metadataID=CZ-CUZK-AGS-DMP1G&metadataXSL=Full&side=wms.AGS", l: "ags.cuzk.gov.cz/arcgis2/rest/services/dmp1g/ImageServer" },
                { id: ["produktDMR5G", "produktDMR5GAdd"], lt: label[231], ld: label[232], m: "Default.aspx?mode=TextMeta&metadataID=CZ-CUZK-AGS-DMR5G&metadataXSL=Full&side=wms.AGS", l: "ags.cuzk.gov.cz/arcgis2/rest/services/dmr5g/ImageServer" },
                { id: ["produktDMR4G", "produktDMR4GAdd"], lt: label[229], ld: label[230], m: "Default.aspx?mode=TextMeta&metadataID=CZ-CUZK-AGS-DMR4G&metadataXSL=Full&side=wms.AGS", l: "ags.cuzk.gov.cz/arcgis2/rest/services/dmr4g/ImageServer" },
                { id: ["produktZABAGEDVyskopis", "produktZABAGEDVyskopisAdd"], lt: label[225], ld: label[226], m: "Default.aspx?mode=TextMeta&metadataID=CZ-CUZK-AGS-ZABAGED-VRSTEVNICE&metadataXSL=Full&side=wms.AGS", l: "ags.cuzk.gov.cz/arcgis/rest/services/ZABAGED_VRSTEVNICE/MapServer" },
                { id: ["produktZABAGED", "produktZABAGEDAdd"], lt: label[223], ld: label[224], m: "Default.aspx?mode=TextMeta&metadataID=CZ-CUZK-AGS-ZABAGED&metadataXSL=Full&side=wms.AGS", l: "ags.cuzk.gov.cz/arcgis/rest/services/ZABAGED_POLOHOPIS/MapServer" },
                { id: ["produktMCR1M", "produktMCR1MAdd"], lt: label[611], ld: label[612], m: "Default.aspx?mode=TextMeta&metadataID=CZ-CUZK-AGS-MCR1M&metadataXSL=Full&side=wms.AGS", l: "ags.cuzk.gov.cz/arcgis1/rest/services/ZTM/MCR1M/MapServer" },
                { id: ["produktMCR500", "produktMCR500Add"], lt: label[609], ld: label[610], m: "Default.aspx?mode=TextMeta&metadataID=CZ-CUZK-AGS-MCR500&metadataXSL=Full&side=wms.AGS", l: "ags.cuzk.gov.cz/arcgis1/rest/services/ZTM/MCR500/MapServer" },
                { id: ["produktZakladniMapa200", "produktZakladniMapa200Add"], lt: label[219], ld: label[220], m: "Default.aspx?mode=TextMeta&metadataID=CZ-CUZK-AGS-ZTM250&metadataXSL=Full&side=wms.AGS", l: "ags.cuzk.gov.cz/arcgis1/rest/services/ZTM/ZTM250/MapServer" },
                { id: ["produktZakladniMapa100", "produktZakladniMapa100Add"], lt: label[217], ld: label[218], m: "Default.aspx?mode=TextMeta&metadataID=CZ-CUZK-AGS-ZTM100&metadataXSL=Full&side=wms.AGS", l: "ags.cuzk.gov.cz/arcgis1/rest/services/ZTM/ZTM100/MapServer" },
                { id: ["produktZakladniMapa50", "produktZakladniMapa50Add"], lt: label[215], ld: label[216], m: "Default.aspx?mode=TextMeta&metadataID=CZ-CUZK-AGS-ZTM50&metadataXSL=Full&side=wms.AGS", l: "ags.cuzk.gov.cz/arcgis1/rest/services/ZTM/ZTM50/MapServer" },
                { id: ["produktZakladniMapa25", "produktZakladniMapa25Add"], lt: label[213], ld: label[214], m: "Default.aspx?mode=TextMeta&metadataID=CZ-CUZK-AGS-ZTM25&metadataXSL=Full&side=wms.AGS", l: "ags.cuzk.gov.cz/arcgis1/rest/services/ZTM/ZTM25/MapServer" },
                { id: ["produktZakladniMapa10", "produktZakladniMapa10Add"], lt: label[211], ld: label[212], m: "Default.aspx?mode=TextMeta&metadataID=CZ-CUZK-AGS-ZTM10&metadataXSL=Full&side=wms.AGS", l: "ags.cuzk.gov.cz/arcgis1/rest/services/ZTM/ZTM10/MapServer" },
                { id: ["produktZakladniMapa5", "produktZakladniMapa5Add"], lt: label[227], ld: label[228], m: "Default.aspx?mode=TextMeta&metadataID=CZ-CUZK-AGS-ZTM5&metadataXSL=Full&side=wms.AGS", l: "ags.cuzk.gov.cz/arcgis1/rest/services/ZTM/ZTM5/MapServer" },
                { id: ["produktBodovaPole", "produktBodovaPoleAdd"], lt: label[209], ld: label[210], m: "Default.aspx?menu=314984&mode=TextMeta&side=wms.AGS&metadataID=CZ-CUZK-AGS-BODOVAPOLE&metadataXSL=metadata.sluzba", l: "ags.cuzk.gov.cz/arcgis/rest/services/BodovaPole/MapServer" },
                { id: ["produktKatastralniMapa", "produktKatastralniMapaAdd"], lt: label[207], ld: label[208], m: "Default.aspx?mode=TextMeta&metadataID=CZ-00025712-CUZK_WMS-MD_KM&metadataXSL=Full&side=wms.verejne", l: "services.cuzk.gov.cz/wms/local-KM-wms.asp" },
                { id: ["produktDMPOK", "produktDMPOKAdd"], lt: label[245], ld: label[246], m: "Default.aspx?lng=CZ&menu=3147&mode=TextMeta&side=wms.AGS&metadataID=CZ-CUZK-AGS-DMPOK&metadataXSL=metadata.sluzba", l: "ags.cuzk.gov.cz/arcgis2/rest/services/dmp_obrazova_korelace/ImageServer" }
            ]
            tp.forEach(e => {
                let d = document.createElement('div');
                d.style.width = '400px';
                d.style.textAlign = 'justify';
                d.innerHTML = `<b>${label[154]}:</b> ${e.lt}<br><br><b>${label[202]}:</b> ${e.ld}<br><br><a href=${protokol}geoportal.cuzk.gov.cz/${e.m} target='_blank'>${label[203]}</a><br><br><b>${label[204]}: </b><br><a href=${protokol + e.l} target='_blank'>${protokol + e.l}</a>`;
                new Tooltip({ connectId: e.id, label: d.outerHTML, showDelay: a, hideDelay: a, position: p2 });
            });
        }
        let t = [
            { id: ["layerlisthelp"], p: p2, w: '200px', c: label[290] + ":<span class='esri-icon-handle-horizontal fRight'></span><br><br>" + label[291] + ":<span class='esri-icon-right fRight'></span><br><br>" + label[292] + ":<span class='esri-icon-visible fRight'></span>" }, 
            { id: ["resthelp"], p: p2, w: '200px', c: label[293] + "MapImage layer<br>Tile layer<br>Image layer<br>Feature layer<br>Scene layer<br>VectorTile layer<br>IndexedMesh layer<br><br><a href='" + protokol + "ags.cuzk.gov.cz/arcgis/rest/services' target='_blank'>" + label[294] + "</a>" },
            { id: ["ogchelp"], p: p2, w: '300px', c: label[295] },
            { id: ["lokalniDataHelp"], p: p2, w: '200px', c: label[296] },
            { id: ["prechodSShelp"], p: p2, w: '300px', c: label[299] },
            { id: ["lokalizaceProjektu"], p: p2, w: '200px', c: label[301] },
            { id: ["druh_stavby"], p: p2, w: '200px', c: label[302] },
            { id: ["druh_cinnosti"], p: p2, w: '200px', c: label[303] },
            { id: ["poznamka"], p: p2, w: '200px', c: label[304] },
            { id: ["vy_email"], p: p2, w: '200px', c: label[305] },
            { id: ["odeslatVyjadreni"], p: p2, w: '200px', c: label[306] },
            { id: ["timeortofotodiv"], p: p2, w: '200px', c: label[289] }
        ]
        t.forEach(e => {
            let d = document.createElement('div');
            d.style.width = e.w;
            d.innerHTML = e.c;
            new Tooltip({ connectId: e.id, label: d.outerHTML, showDelay: a, hideDelay: a, position: e.p });
        });
    });