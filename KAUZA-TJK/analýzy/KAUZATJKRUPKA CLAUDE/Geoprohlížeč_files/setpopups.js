require([
    "esri/request",
    "dojox/xml/DomParser",
    "esri/PopupTemplate",
    "esri/Graphic",
    "esri/geometry/Point",
    "esri/core/promiseUtils",
    "esri/rest/identify",
    "esri/rest/support/IdentifyParameters",
    "esri/layers/GraphicsLayer",
    "esri/core/reactiveUtils",
    "esri/rest/support/Query",
    "esri/rest/query"
], (esriRequest, DomParser, PopupTemplate, Graphic, Point, PromiseUtils, identify, IdentifyParameters, GraphicsLayer, reactiveUtils, Query, query) => {
    app.enabledPopup = true;

    app.clearPopup = (view) => {
        let l = view.map.findLayerById("resultsLayerGrafics");
        for (let g = l?.graphics.length - 1; g >= 0; g--) {
            if (l.graphics.items[g].typ == "identify") l.remove(l.graphics.items[g]);
        };
    }

    let setPopup = (view) => {
        view.popup.defaultPopupTemplateEnabled = true;
        view.popupEnabled = false;
        view.on("click", (event) => {
            if (app.enabledPopup == false) return;
            let mapSR = view.spatialReference.wkid;
            if (mapSR == 102067) mapSR = 5514;
            if (mapSR == 102100) mapSR = 3857;
            let seznamPromises = [];
            let mybbox = {};
            if (event.mapPoint) {
                let pixel = (view.extent.xmax - view.extent.xmin) / view.width;
                mybbox.xmin = event.mapPoint.x - (10 * pixel);
                mybbox.ymin = event.mapPoint.y - (10 * pixel);
                mybbox.xmax = event.mapPoint.x + (10 * pixel);
                mybbox.ymax = event.mapPoint.y + (10 * pixel);
            }
            let p = view.popup.fetchFeatures(event.screenPoint).then((r) => {
                return r.allGraphicsPromise.then((graphics) => {
                    let g = [];
                    graphics.forEach((ng) => {
                        if (ng) {
                            if (ng.sourceLayer) {
                                if (!ng.sourceLayer.hidepopups) {
                                    if (ng.popupTemplate == null) {
                                        ng.popupTemplate = ng.getEffectivePopupTemplate({
                                            defaultPopupTemplateEnabled: true
                                        });
                                    }
                                    g.push(ng);
                                }
                            } else {
                                g.push(ng);
                            }
                        }
                    });
                    return g;
                });
            });
            seznamPromises.push(p);
            let g = view.map.findLayerById("resultsLayerGrafics");
            if (!g) {
                g = new GraphicsLayer({
                    title: "Informace po kliknutí",
                    listMode: "hide",
                    id: "resultsLayerGrafics"
                })
                view.map.layers.add(g);
            } else {
                for (let gg = g.graphics.length - 1; gg >= 0; gg--) {
                    if (g.graphics.items[gg].typ == "identify") g.remove(g.graphics.items[gg]);
                };
            }

            let getMeta = (m) => {
                let p = identify.identify("https://ags.cuzk.gov.cz/arcgis/rest/services/Metadata/MapServer", new IdentifyParameters({
                    tolerance: 5,
                    layerIds: [m],
                    layerOption: "all",
                    returnFieldName: false,
                    returnUnformattedValues: false,
                    width: view.width,
                    height: view.height,
                    mapExtent: view.extent,
                    geometry: event.mapPoint,
                    returnGeometry: true
                })).then(r => {
                    let a = [];
                    r.results.map(f => {
                        f.feature.popupTemplate = new PopupTemplate({
                            title: "Metadata: " + f.layerName,
                            content: (c) => {
                                let inf = "";
                                for (field in c.graphic.attributes) {
                                    if ((f.layerId == 13 || f.layerId == 14) && c.graphic.attributes[field].includes('|')) {
                                        inf += '<b>' + field + "</b>:<br><b>" + c.graphic.attributes[field].replaceAll('|', '<br><b>').replaceAll(':', ':</b>') + "<br />";
                                    } else {
                                        inf += '<b>' + field + "</b>: " + c.graphic.attributes[field] + "<br />";
                                    }
                                }
                                return inf;
                            }
                        });
                        f.feature.symbol = {
                            type: "simple-fill",
                            style: "diagonal-cross",
                            outline: {
                                color: [200, 0, 0],
                                width: 1,
                                style: "solid"
                            }
                        }
                        f.feature.typ = "identify";
                        g.add(f.feature);
                        a.push(f.feature);
                        return f
                    });
                    return a;
                });
                seznamPromises.push(p);
            }
            let basemapInfo = document.getElementById("basemapInfo");
            let metadataId;

            if ((mapSR == 5514 && view.type == "2d") && basemapInfo.checked) {
                let select = document.getElementById("selectBasemapPanel").value;
                if (select == "zm") {
                    if (app.ztmInfo) metadataId = app.ztmInfo;
                } else if (select == "ortofoto") {
                    metadataId = 12;
                } else if (select == "dmr") {
                    metadataId = 20;
                }
            }
            if (metadataId) getMeta(metadataId);

            app.layerListWidget.operationalItems.forEach(vrstva => {
                let layerType = "";
                let layerTo = null;
                if (!vrstva.layer.hidepopups && vrstva.layer.visible) {
                    if (vrstva.layer.url && vrstva.layer.type == "wms" && view.type == "2d") {
                        if (vrstva.layer.url.indexOf("/wms/local-km-wms") > -1) {
                            layerType = "Katastr";
                            layerTo = vrstva.layer;
                        } else {
                            layerType = "WMS-obecny";
                            layerTo = vrstva;
                            if (vrstva.layer.metaPopup) {
                                getMeta(vrstva.layer.metaPopup)
                            }
                        }
                    } else if (vrstva.layer.url && vrstva.layer.type == "map-image" && view.type == "2d") {
                        if ((vrstva.layer.kod) && vrstva.layer.kod == 22524) {
                            layerType = "ortofoto";
                        } else if (vrstva.layer.url.indexOf("ags.cuzk.gov.cz/arcgis/rest/services/BodovaPole/MapServer") > -1) {
                            layerType = "BodovaPole";
                            layerTo = vrstva;
                        } else if (vrstva.layer.capabilities.operations.supportsQuery == true) {
                            layerType = "MapImageLayer";
                            layerTo = vrstva;
                        } else if (vrstva.layer.metaPopup) {
                            getMeta(vrstva.layer.metaPopup)
                        }
                    }

                    if (layerType == "MapImageLayer" && event.screenPoint.y > 50) {
                        let recurs = (a) => {
                            let c = a.sublayers;
                            return () => {
                                let p = [];
                                if (c) {
                                    c.forEach((s) => {
                                        if (s.visible == true) {
                                            if (s.sublayers) {
                                                let ids = recurs(s)();
                                                for (var i = 0; i < ids.length; i++) {
                                                    p.push(ids[i]);
                                                }
                                            } else {
                                                p.push(s.id);
                                            }
                                        }
                                    });
                                }
                                return p;
                            };
                        };
                        let layerIds = recurs(layerTo.layer)();

                        if (layerIds.length == 0) {
                            return;
                        }

                        let p = identify.identify(layerTo.layer.url, new IdentifyParameters({
                            tolerance: 5,
                            layerIds: layerIds,
                            returnFieldName: false,
                            returnUnformattedValues: false,
                            layerOption: "visible",
                            width: view.width,
                            height: view.height,
                            mapExtent: view.extent,
                            geometry: event.mapPoint,
                            returnGeometry: true
                        })).then((r) => {
                            let a = [];
                            r.results.map(f => {
                                f.feature.popupTemplate = new PopupTemplate({
                                    title: layerTo.title + "<br>" + f.layerName,
                                    content: (c) => {
                                        let inf = "";
                                        for (field in c.graphic.attributes) {
                                            if (layerTo.layer.url.includes('/Metadata/MapServer')) {
                                                if ((f.layerId == 13 || f.layerId == 14) && c.graphic.attributes[field].includes('|')) {
                                                    inf += '<b>' + field + "</b>:<br><b>" + c.graphic.attributes[field].replaceAll('|', '<br><b>').replaceAll(':', ':</b>') + "<br />";
                                                } else {
                                                    inf += '<b>' + field + "</b>: " + c.graphic.attributes[field] + "<br />";
                                                }
                                            } else {
                                                inf += '<b>' + field + "</b>: " + c.graphic.attributes[field] + "<br />";
                                            }
                                        }
                                        return inf;
                                    },
                                    actions: ([{
                                        id: "hlaseniChyb",
                                        className: "esri-icon-lightbulb",
                                        title: label[320]
                                    }])
                                });
                                if (f.feature.geometry.type == "polygon") {
                                    f.feature.symbol = {
                                        type: "simple-fill",
                                        style: "diagonal-cross",
                                        outline: {
                                            color: [200, 0, 0],
                                            width: 1,
                                            style: "solid"
                                        }
                                    };
                                } else if (f.feature.geometry.type == "polyline") {
                                    f.feature.symbol = {
                                        type: "simple-line",
                                        style: "solid",
                                        color: [200, 0, 0]
                                    };

                                } else if (f.feature.geometry.type == "point") {
                                    f.feature.symbol = {
                                        type: "simple-marker",
                                        style: "circle",
                                        color: [200, 0, 0],
                                        size: "8px"
                                    };
                                }
                                f.feature.typ = "identify";
                                g.add(f.feature);
                                a.push(f.feature);
                                return f
                            });
                            return a;
                        });
                        seznamPromises.push(p);
                    }

                    if (layerType == "BodovaPole" && event.screenPoint.y > 50) {
                        let recurs = (a) => {
                            let c = a.sublayers;
                            return () => {
                                let p = [];
                                if (c) {
                                    c.forEach((s) => {
                                        if (s.visible == true) {
                                            if (s.sublayers) {
                                                let ids = recurs(s)();
                                                for (var i = 0; i < ids.length; i++) {
                                                    p.push(ids[i]);
                                                }
                                            } else {
                                                p.push(s.id);
                                            }
                                        }
                                    });
                                }
                                return p;
                            };
                        };
                        let visibleLayerIds = recurs(layerTo.layer)();
                        let validSub = [48, 44, 46, 42, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 0];

                        let getLayerIds = () => {
                                let both = visibleLayerIds.filter(n => {
                                return validSub.includes(n);
                            });
                            return both;
                        }
                        let layerIds = getLayerIds();

                        if (layerIds.length == 0) {
                            return;
                        }

                        let p = identify.identify(layerTo.layer.url, new IdentifyParameters({
                            tolerance: 10,
                            layerIds: layerIds,
                            returnFieldName: false,
                            returnUnformattedValues: false,
                            layerOption: "visible",
                            width: view.width,
                            height: view.height,
                            mapExtent: view.extent,
                            geometry: event.mapPoint,
                            returnGeometry: true
                        })).then((r) => {
                            let a = [];
                            r.results.map(f => {
                                let dbpA = [
                                    [[{ title: (a) => { return `Databáze bodových polí (${a.NAZEV_BODU.replace(" ", "")})` }}], [{ id: 0, name: 'CZEPOS', druh: 'Stanice sítě CZEPOS', nadpis: 'PERMANENTNÍ STANICE CZEPOS', podnadpis: 'Permanentní stanice CZEPOS' }]],
                                    [[{ title: (a, d) => { return `Databáze bodových polí: ${a.CISLO + pl(Number(a.PL))}<br>${d.podnadpis}` }}], [
                                        { id: 18, name: 'BodZPBP', druh: 'Bod ZPBP', nadpis: 'POLOHOVÉ BODOVÉ POLE', podnadpis: 'Trigonometrický bod' },
                                        { id: 2, name: 'BodZPBPurcenyvETRS89', druh: 'Bod ZPBP určený v ETRS89', nadpis: 'POLOHOVÉ BODOVÉ POLE', podnadpis: 'Trigonometrický bod' },
                                        { id: 4, name: 'BodZPBPurcenyvETRS89metodouRTK', druh: 'Bod ZPBP určený v ETRS89 metodou RTK', nadpis: 'POLOHOVÉ BODOVÉ POLE', podnadpis: 'Trigonometrický bod' },
                                        { id: 38, name: 'ZhB', druh: 'ZhB', nadpis: 'POLOHOVÉ BODOVÉ POLE', podnadpis: 'Zhušťovací bod' },
                                        { id: 22, name: 'ZhBurcenyvETRS89', druh: 'ZhB určený v ETRS89', nadpis: 'POLOHOVÉ BODOVÉ POLE', podnadpis: 'Zhušťovací bod' },
                                        { id: 24, name: 'ZhBurcenyvETRS89metodouRTK', druh: 'ZhB určený v ETRS89 metodou RTK', nadpis: 'POLOHOVÉ BODOVÉ POLE', podnadpis: 'Zhušťovací bod' },
                                        { id: 20, name: 'PridruzenyBodKboduZPBP', druh: 'Přidružený bod k bodu ZPBP', nadpis: 'POLOHOVÉ BODOVÉ POLE', podnadpis: 'Přidružený bod ke trigonometrickému bodu' },
                                        { id: 40, name: 'PridruzenyBodkZhB', druh: 'Přidružený bod k ZhB', nadpis: 'POLOHOVÉ BODOVÉ POLE', podnadpis: 'Přidružený bod ke zhušťovacímu bodu' },
                                        { id: 6, name: 'PridruzenyBodKboduZPBPurcenyvETRS89', druh: 'Zrušený bod ZPBP určený v ETRS89', nadpis: 'POLOHOVÉ BODOVÉ POLE', podnadpis: 'Přidružený bod ke trigonometrickému bodu' },
                                        { id: 26, name: 'PridruzenyBodkZhBurcenyvETRS89', druh: 'Přidružený bod k ZhB určený v ETRS89', nadpis: 'POLOHOVÉ BODOVÉ POLE', podnadpis: 'Přidružený bod ke zhušťovacímu bodu' },
                                        { id: 8, name: 'PridruzenyBodKboduZPBPurcenyvETRS89metodouRTK', druh: 'Přidružený bod k bodu ZPBP určený v ETRS89 metodou RTK', nadpis: 'POLOHOVÉ BODOVÉ POLE', podnadpis: 'Přidružený bod ke trigonometrickému bodu' },
                                        { id: 28, name: 'PridruzenyBodkZhBurcenyvETRS89metodouRTK', druh: 'Přidružený bod k ZhB určený v ETRS89 metodou RTK', nadpis: 'POLOHOVÉ BODOVÉ POLE', podnadpis: 'Přidružený bod ke zhušťovacímu bodu' },
                                        { id: 10, name: 'ZrusenyBodZPBPurcenyvETRS89', druh: 'Přidružený bod k bodu ZPBP určený v ETRS89', nadpis: 'POLOHOVÉ BODOVÉ POLE', podnadpis: 'Trigonometrický bod' },
                                        { id: 12, name: 'ZrusenyBodZPBPurcenyvETRS89metodouRTK', druh: 'Zrušený bod ZPBP určený v ETRS89 metodou RTK', nadpis: 'POLOHOVÉ BODOVÉ POLE', podnadpis: 'Trigonometrický bod' },
                                        { id: 14, name: 'ZrusenyPridruzenyBodKboduZPBPurcenyvETRS89', druh: 'Zrušený přidružený bod k bodu ZPBP určený v ETRS89', nadpis: 'POLOHOVÉ BODOVÉ POLE', podnadpis: 'Přidružený bod ke trigonometrickému bodu' },
                                        { id: 16, name: 'ZrusenyPridruzenyBodKboduZPBPurcenyvETRS89metodouRTK', druh: 'Zrušený přidružený bod k bodu ZPBP určený v ETRS89 metodou RTK', nadpis: 'POLOHOVÉ BODOVÉ POLE', podnadpis: 'Přidružený bod ke trigonometrickému bodu' },
                                        { id: 30, name: 'ZrusenyZhBurcenyvETRS89', druh: 'Zrušený ZhB určený v ETRS89', nadpis: 'POLOHOVÉ BODOVÉ POLE', podnadpis: 'Zhušťovací bod' },
                                        { id: 32, name: 'ZrusenyZhBurcenyvETRS89metodouRTK', druh: 'Zrušený ZhB určený v ETRS89 metodou RTK', nadpis: 'POLOHOVÉ BODOVÉ POLE', podnadpis: 'Zhušťovací bod' },
                                        { id: 34, name: 'ZrusenyPridruzenyBodKboduZhBurcenyvETRS89', druh: 'Zrušený přidružený bod k bodu ZhB určený v ETRS89', nadpis: 'POLOHOVÉ BODOVÉ POLE', podnadpis: 'Zhušťovací bod' },
                                        { id: 36, name: 'ZrusenyPridruzenyBodKboduZhBurcenyvETRS89metodouRTK', druh: 'Zrušený přidružený bod k bodu ZhB určený v ETRS89 metodou RTK', nadpis: 'POLOHOVÉ BODOVÉ POLE', podnadpis: 'Přidružený bod ke zhušťovacímu bodu' }]],
                                    [[ { title: (a, d) => { return `Databáze bodových polí: ${a.CISLO}<br>${d.podnadpis}` }}], [
                                        { id: 42, name: 'BodPPBP', druh: 'Bod PPBP', nadpis: 'POLOHOVÉ BODOVÉ POLE', podnadpis: 'Bod podrobného polohového bodového pole' },
                                        { id: 44, name: 'BodZVBP', druh: 'Bod ZVBP', nadpis: 'VÝŠKOVÉ BODOVÉ POLE', podnadpis: 'Nivelační bod' },
                                        { id: 46, name: 'BodPVBP', druh: 'Bod PVBP', nadpis: 'VÝŠKOVÉ BODOVÉ POLE', podnadpis: 'Nivelační bod' }]],
                                    [[ { title: (a, d) => { return `Databáze bodových polí: ${a.CISLO}<br>${d.podnadpis}` }}], [
                                        { id: 48, name: 'BodZTBP', druh: 'Bod ZTBP', nadpis: 'TÍHOVÉ BODOVÉ POLE', podnadpis: 'Tíhový bod' }
                                    ]]
                                ];
                                let v;
                                for (let i = 0; i < dbpA.length; i++) {
                                    if (v) break;
                                    for (let ii = 0; ii < dbpA[i][1].length; ii++) {
                                        if (dbpA[i][1][ii].id == f.layerId) {
                                            v = [dbpA[i][0][0], dbpA[i][1][ii]]
                                            break;
                                        }
                                    }
                                }
                                let pl = (i) => {
                                    ((i) && i != 0) ? i = '.' + i : i = ''
                                    return i;
                                }
                                let pt = new PopupTemplate({
                                    title: v[0].title(f.feature.attributes, v[1]),
                                    content: (g) => {
                                        let a = f.feature.attributes;
                                        let vTB = (i) => {
                                            if (isNaN(i)) return i = 'neuvedeno'
                                            Number(i) != 0 ? i = i.toString().replace('.', ',') + ' m' : i = 'neuvedeno'
                                            return i;
                                        }
                                        let l = (i) => {
                                            i = i.GEODETICKE_UDAJE;
                                            if (view.popup.featureCount == 1) {
                                                window.open(i);
                                                view.closePopup();
                                            }
                                            return i;
                                        }
                                        let gh = 'Geodetické údaje a hlášení závad';
                                        if (v[1].id == 'CZEPOS') gh = 'Seznam souřadnic stanic CZEPOS'
                                        let i = `<b>${v[1].nadpis}</b><br /><br /><a style='color: #337ab7' target='_blank' href=${l(a)}><b>${gh}</b></a><br /><b>Druh bodu:</b> ${v[1].druh}<br />`;
                                        if (a.ZTLTL) i += `<b>Číslo triangulačního listu v rámci ZTL:</b> ${a.ZTLTL}<br />`;
                                        if (a.NAZEV_BODU) i += `<b>Název bodu:</b> ${a.NAZEV_BODU}<br />`;
                                        if (a.CISLO) i += `<b>Číslo bodu:</b> ${a.CISLO + pl(a.PL)}`;
                                        if (a.NAZEV_KU) i += `<br /><b>Název katastrálního území:</b> ${a.NAZEV_KU}`;
                                        i += `<br /><br /><b>Souřadnice X (JTSK):</b> ${Number(f.feature.attributes.X).toFixed(2).toString().replace('.', ',')}<br /><b>Souřadnice Y (JTSK):</b> ${Number(f.feature.attributes.Y).toFixed(2).toString().replace('.', ',')}<br /><b>Nadmořská výška bodu (Bpv):</b> ${vTB(f.feature.attributes.VYSKA)}`;
                                        return i;
                                    }
                                });
                                f.feature.popupTemplate = pt;
                                if (f.feature.geometry.type == "point") {
                                    f.feature.symbol = {
                                        type: "simple-marker",
                                        style: "circle",
                                        color: [200, 0, 0],
                                        size: "8px"
                                    };
                                }
                                f.feature.typ = "identify";
                                g.add(f.feature);
                                a.push(f.feature);
                                return f
                            });
                            return a;
                        });
                        seznamPromises.push(p);
                    }

                    if (layerType == "Katastr" && event.screenPoint.y > 50) {      //50px je horní pruh
                        if (view.zoom >= 10) {
                            if (view.spatialReference.wkid == 5514 || view.spatialReference.wkid == 102067) {
                                let k = protokol + "nahlizenidokn.cuzk.gov.cz/MapaIdentifikace.aspx?&x=" + event.mapPoint.x.toFixed(0) + "&y=" + event.mapPoint.y.toFixed(0);
                                view.widthBreakpoint == "xsmall" || view.widthBreakpoint == "small" ? window.open(k) : window.open(k, "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=100, left=100, width=600, height=600")
                                let getParcel = (e) => {
                                   return new Promise((resolve, reject) => {
                                        query.executeQueryJSON("https://ags.cuzk.gov.cz/arcgis/rest/services/RUIAN/MapServer/5/query", new Query({
                                            where: "1=1",
                                            geometry: e,
                                            returnGeometry: true,
                                            geometryType: "esriGeometryPoint",
                                            spatialRel: "esriSpatialRelWithin",
                                            outFields: ['cisloparcely', 'vymeraparcely', 'druhcislovanikod'],
                                            f: "json"
                                        })).then(r => {
                                            let a = [];
                                            r.features.map(f => {
                                                let d = document.createElement('div');
                                                let p1 = document.createElement('div')
                                                p1.innerHTML = '<b>' + label[62] + '</b>' + ': ' + (f.attributes.druhcislovanikod == 1 ? label[63] : label[64])
                                                d.appendChild(p1);
                                                let p2 = document.createElement('div')
                                                p2.innerHTML = '<b>' + label[61] + '</b>' + f.attributes.vymeraparcely.toLocaleString('cs-CZ') + ' m²'
                                                d.appendChild(p2);
                                                f.popupTemplate = new PopupTemplate({
                                                    title: label[21] + ": " + f.attributes.cisloparcely,
                                                    content: d,
                                                    actions: [{
                                                        id: "nahlizeni",
                                                        className: "esri-icon-review",
                                                        title: label[530]
                                                    }]
                                                });
                                                f.symbol = {
                                                    type: "simple-fill",
                                                    style: "diagonal-cross",
                                                    outline: {
                                                        color: [200, 0, 0],
                                                        width: 1,
                                                        style: "solid"
                                                    }
                                                }
                                                f.typ = "identify";
                                                g.add(f);
                                                a.push(f);
                                                return f;
                                            });
                                            resolve(a);
                                            return a;
                                        }).catch(error => {
                                            reject(error);
                                        });
                                    }).catch(e => {
                                        console.log(e);
                                    });
                                }                         
                                seznamPromises.push(getParcel(event.mapPoint));
                            } else {
                                let x = event.mapPoint.x;
                                let y = event.mapPoint.y;
                                if (mapSR == 3034 || mapSR == 3035 || mapSR == 3045 || mapSR == 3046 || mapSR == 4258) {
                                    x = event.mapPoint.y;
                                    y = event.mapPoint.x;
                                }
                                sstransffce(Number(view.spatialReference.wkid), 5514, x, y).then((r) => {
                                    let k = protokol + "nahlizenidokn.cuzk.gov.cz/MapaIdentifikace.aspx?&x=" + r.x.toFixed(0) + "&y=" + r.y.toFixed(0);
                                    view.widthBreakpoint == "xsmall" || view.widthBreakpoint == "small" ? window.open(k) : window.open(k, "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=100, left=100, width=600, height=600")
                                }, (err) => {
                                    alert("Chyba při převodu souřadnic." + err.message);
                                });
                            }
                        } else {
                            let styl = "position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%); padding: 10px; background-color: white; box-shadow: 0px 1px 2px rgba(0,0,0,0.3);";
                            if (localStorage.theme) {
                                if (localStorage.theme != "default") {
                                    if (localStorage.theme == "dark") {
                                        styl += "background-color: #4c4c4c; color: white;";
                                    } else if (localStorage.theme == "light") {
                                        styl += "color: #333333;";
                                    }
                                }
                            }
                            let w = view.ui.find('widgetKatastrAlert');
                            if (!w) {
                                w = document.createElement('DIV');
                                w.id = 'widgetKatastrAlert';
                                w.className = 'panel-collapse';
                                w.style = styl;
                                w.innerHTML = label[562];
                                view.ui.add({
                                    component: w
                                });
                                setTimeout(() => {
                                    if (w) app.removeDiv(['widgetKatastrAlert']);
                                }, 2000);
                            }
                        }
                    }

                    if (layerType == "ortofoto" && event.screenPoint.y > 50) {      //50px je horní pruh
                        let p = identify.identify("https://ags.cuzk.gov.cz/arcgis/rest/services/Metadata/MapServer", new IdentifyParameters({
                            tolerance: 5,
                            layerIds: [12],
                            layerOption: "all",
                            returnFieldName: false,
                            returnUnformattedValues: false,
                            width: view.width,
                            height: view.height,
                            mapExtent: view.extent,
                            geometry: event.mapPoint,
                            returnGeometry: true
                        })).then(r => {
                            let a = [];
                            r.results.map(f => {
                                f.feature.popupTemplate = new PopupTemplate({
                                    title: "Ortofoto",
                                    content: (c) => {
                                        let inf = "";
                                        for (field in c.graphic.attributes) {
                                            inf += '<b>' + field + "</b>: " + c.graphic.attributes[field] + "<br />";
                                        }
                                        return inf;
                                    }
                                });
                                f.feature.symbol = {
                                    type: "simple-fill",
                                    style: "diagonal-cross",
                                    outline: {
                                        color: [200, 0, 0],
                                        width: 1,
                                        style: "solid"
                                    }
                                }
                                f.feature.typ = "identify";
                                g.add(f.feature);
                                a.push(f.feature);
                                return f
                            });
                            return a;
                        });
                        seznamPromises.push(p);
                    }

                    if (layerType == "WMS-obecny" && event.screenPoint.y > 50) {      //50px je horní pruh
                        let vl = "", sub = [];
                        if (layerTo.children && layerTo.visible == true) {
                            let recurs = (a, b) => {
                                let c = a, u = b;
                                return () => {
                                    let p = [];
                                    c.forEach((s) => {
                                        let objvrstvy = { "name": s.layer.name, "visible": s.layer.visible };
                                        let t = "sublayers";
                                        if (u > 1) t = t + u;
                                        if (s.children.length > 0 && s.visible) {
                                            objvrstvy[t] = recurs(s.children, u + 1)();
                                        } else {
                                            if ((vl.length > 0) && vl.slice(-1) != ",") vl += ",";
                                            if (s.visibleAtCurrentScale == true && s.visible == true && s.layer.queryable == true) vl += s.layer.name;
                                        }
                                        p.push(objvrstvy);
                                    });
                                    return p;
                                };
                            };
                            if (layerTo.children && layerTo.layer) sub = recurs(layerTo.children, 2)();
                        };
                        if (vl != "") {
                            if (vl.slice(-1) == ",") vl = vl.slice(0, -1);
                            if (layerTo.layer.url.slice(-1) != "?") layerTo.layer.url += "?";
                            let bbox = view.extent.xmin.toFixed(8) + "," + view.extent.ymin.toFixed(8) + "," + view.extent.xmax.toFixed(8) + "," + view.extent.ymax.toFixed(8);
                            if (mapSR == 4326 || mapSR == 4258 || mapSR == 3034 || mapSR == 3035 || mapSR == 3045 || mapSR == 3046 || mapSR == 3835 || mapSR == 3836) bbox = view.extent.ymin.toFixed(8) + "," + view.extent.xmin.toFixed(8) + "," + view.extent.ymax.toFixed(8) + "," + view.extent.xmax.toFixed(8);
                            let mypromise = esriRequest(layerTo.layer.url, {
                                query: {
                                    SERVICE: "WMS",
                                    REQUEST: "GetFeatureInfo",
                                    VERSION: "1.3.0",
                                    INFO_FORMAT: "text/xml",
                                    FEATURE_COUNT: 25,
                                    crs: "EPSG:" + mapSR.toFixed(0),
                                    i: event.screenPoint.x.toFixed(0),
                                    j: (event.screenPoint.y - 50).toFixed(0),
                                    WIDTH: view.width.toFixed(0),
                                    HEIGHT: (view.height - 50).toFixed(0),
                                    bbox: bbox,
                                    QUERY_LAYERS: vl
                                },
                                responseType: "text"
                            }).then((r) => {
                                let v1 = DomParser.parse(r.data);
                                let polefeatures = [];
                                if ((v1) && v1.childNodes.length > 1) {
                                    for (let j = 0; j < v1.childNodes[1].childNodes.length; j++) {
                                        let g = (f, i) => {
                                            let feature = new Graphic();
                                            feature.attributes = {};
                                            if (i == 0) {
                                                if ((f.attributes) && f.attributes.length > 0) feature.attributes.layerId = f.attributes[0].nodeValue;
                                                for (let k = 0; k < f.childNodes.length; k++) {
                                                    let a = f.childNodes[k];
                                                    if (a.attributes) a.childNodes.length > 0 ? feature.attributes[a.attributes[0].nodeValue] = a.childNodes[0].nodeValue : feature.attributes[a.attributes[0].nodeValue] = ""
                                                };
                                            } else {
                                                for (let k = 0; k < f.attributes.length; k++) {
                                                    let a = f.attributes[k];
                                                    if (a) a.nodeName.length > 0 ? feature.attributes[a.nodeName] = a.nodeValue : feature.attributes[a.nodeValue] = ""
                                                };
                                            }
                                            let c = "";
                                            let fa = feature.attributes;
                                            for (att in fa) {
                                                if (fa[att].search('http://') > -1 || fa[att].search('https://') > -1) fa[att] = '<a href="' + fa[att] + '" target="_blank" style=\"color: #337ab7\">Přejít na odkaz</a>'
                                                c += '<b>' + att + "</b>: " + fa[att] + "<br />";
                                            }
                                            feature.popupTemplate = new PopupTemplate({
                                                title: layerTo.layer.title,
                                                content: c,
                                                actions: [{
                                                    id: "hlaseniChyb",
                                                    className: "esri-icon-lightbulb",
                                                    title: label[320]
                                                }]
                                            });
                                            polefeatures.push(feature);
                                        }
                                        let v2 = v1.childNodes[1].childNodes[j]
                                        if (v2.nodeName.indexOf("featureMember") > -1) {
                                            for (var ii = 0; ii < v2.childNodes.length; ii++) {
                                                if (v2.childNodes[ii].attributes) g(v2.childNodes[ii], 0);
                                            }
                                        } else if (v2.attributes) {
                                            g(v2, 1);
                                        }
                                    };
                                };
                                return polefeatures;
                            });
                            seznamPromises.push(mypromise);
                        }
                    }
                }
            });
            if (seznamPromises.length > 0) {
                let v = PromiseUtils.eachAlways(seznamPromises).then((r) => {
                    let s = [];
                    for (let i = 0; i < r.length; i++) {
                        for (let j = 0; j < r[i].value.length; j++) {
                            s.push(r[i].value[j])
                        }
                    }
                    return s;
                });
                view.openPopup({
                    title: "Atributy",
                    location: event.mapPoint,
                    spinner: true,
                    promises: [v]
                });
            }

            reactiveUtils.whenOnce(() => app.mapView.popup.visible == false).then(() => {
                app.clearPopup(app.mapView)
            });
        });
    };
    app.mapView.when(() => {
        setPopup(app.mapView);
    });
    app.sceneView.when(() => {
        setPopup(app.sceneView);
    });
});