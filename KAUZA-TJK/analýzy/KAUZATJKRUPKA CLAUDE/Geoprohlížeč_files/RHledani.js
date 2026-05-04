require(["esri/rest/query",
    "esri/rest/support/Query",
    "esri/layers/GraphicsLayer",
    "esri/layers/FeatureLayer",
    "esri/core/promiseUtils",
    "esri/request",
    "dojo/query"
], (query, Query, GraphicsLayer, FeatureLayer, promiseUtils, esriRequest, query_dojo) => {
    app.rozsireneHledani = {};
    app.rozsireneHledani.odstranVysledky = (typ) => {
        var layer = app.activeView.map.findLayerById("resultsLayerGrafics");
        if (!layer) {
            var resultsLayer = new GraphicsLayer({
                title: "grafiky",
                listMode: "hide",
                id: "resultsLayerGrafics"
            });
            app.activeView.map.layers.add(resultsLayer);
        } else {
            app.activeView.closePopup();
            if (typ == 1) {
                layer.removeAll();
                query_dojo("#odstranitNalezeneParcelyBtn, #odstranitvysledkyvyhledavani, #label_67, #removeDBP, #removeHranice, #label_230").addClass("hidden");
                document.getElementById('zachovatVysledkyVyhledavani').parentNode.classList.add('hidden');
                document.getElementById('zachovatVysledkyVyhledavaniKatastralniUzemi').parentNode.classList.add('hidden');
            } else if (typ == 2) {
                for (var g = layer.graphics.length - 1; g >= 0; g--) {
                    if (layer.graphics.items[g].typ == "parcela") {
                        layer.remove(layer.graphics.items[g]);
                    }
                };
                query_dojo("#odstranitNalezeneParcelyBtn, #label_67").addClass("hidden");
                document.getElementById('zachovatVysledkyVyhledavani').parentNode.classList.add('hidden');
                if (layer.graphics.length == 0) {
                    query_dojo("#odstranitvysledkyvyhledavani").addClass("hidden");
                }
            } else if (typ == 3) {
                for (var g = layer.graphics.length - 1; g >= 0; g--) {
                    if (layer.graphics.items[g].typ == "ruian") {
                        layer.remove(layer.graphics.items[g]);
                    }
                };
                query_dojo("#removeHranice").addClass("hidden");
                if (layer.graphics.length == 0) {
                    query_dojo("#odstranitvysledkyvyhledavani, #label_230").addClass("hidden");
                    document.getElementById('zachovatVysledkyVyhledavaniKatastralniUzemi').parentNode.classList.add('hidden');
                }
            } else if (typ == 4) {
                for (var g = layer.graphics.length - 1; g >= 0; g--) {
                    if (layer.graphics.items[g].typ == "dbp") {
                        layer.remove(layer.graphics.items[g]);
                    }
                };
                query_dojo("#removeDBP").addClass("hidden");
                if (layer.graphics.length == 0) {
                    query_dojo("#odstranitvysledkyvyhledavani").addClass("hidden");
                }
            }
        }
    }    

    app.rozsireneHledani.naseptavani = (e) => {
        let input = e.target.id;
        let tabulka;
        e.target.attributes.tabulka ? tabulka = e.target.attributes.tabulka.nodeValue : tabulka = 7
        if (!e.inputType || e.inputType == "insertReplacementText") {
            document.getElementById(input).blur();
            return;
        }
        if ((e.target.value) && isNaN(e.target.value) == true) {
            if (e.target.value.indexOf("(") > 0) {
                e.target.value = e.target.value.substr(0, e.target.value.indexOf("(") - 1);
            }
            esriRequest("https://ags.cuzk.gov.cz/arcgis/rest/services/RUIAN/MapServer/exts/GeocodeSOE/tables/" + tabulka + "/suggest?text=" + encodeURI(e.target.value.toLowerCase()) + "&location=&distance=&f=pjson", {
                responseType: "json"
            }).then((response) => {
                if (response.data.suggestions) {
                    let byName = response.data.suggestions.slice(0);
                    byName.sort((a, b) => {
                        let x = a.text.toLowerCase();
                        let y = b.text.toLowerCase();
                        return x < y ? -1 : x > y ? 1 : 0;
                    });
                    let list = document.getElementById("list" + input.replace("hledani", ""));
                    if (list.options.length > 0) {
                        list.innerHTML = null;
                    }
                    for (let i = 0; i < byName.length; i++) {
                        let option = document.createElement('option');
                        option.value = byName[i].text;
                        list.appendChild(option);
                    }
                }
            });
        }
    }
    let arr = ["hledaniOkres", "hledaniORP", "hledaniPOU", "hledaniMestskyObvodCastStatutPraha", "hledaniKatastralniUzemi", "hledani_label_198", "hledani_label_194", "hledani_label_178", "hledani_ztvp_katastr", "hledani_vstupkatastry"];
    arr.forEach(e => {
        document.getElementById(e).oninput = app.rozsireneHledani.naseptavani;
    });

    app.rozsireneHledani.hledaniParcel = (typ, btn, input) => {
        let onError = (typ, btn, val, err, input) => {
            if (typ == 1) {
                if (btn) { btn.disabled = false; btn.innerHTML = val;}
            } else {
                if (input) { input.disabled = false; input.value = null; }
                document.getElementById("label_225").innerHTML = label[709];
            }
            if (err) alert(err);
            return;
        }
        let taks = (p) => {
            let featureLayer = new FeatureLayer({
                url: "https://ags.cuzk.gov.cz/arcgis/rest/services/RUIAN/MapServer/5"
            });
            let q = p.map((w) => {
                let nq = new Query({
                    returnGeometry: true,
                    outFields: ["cisloparcely", "katastralniuzemi", "id", "druhcislovanikod", "kmenovecislo", "poddelenicisla", "druhpozemkukod", "zpusobyvyuzitipozemku", "vymeraparcely"],
                    outSpatialReference: { wkid: app.activeView.spatialReference.wkid },
                    where: w,
                });
                return nq
            });
            return promiseUtils.eachAlways(q.map(nq => {
                return featureLayer.queryFeatures(nq);
            }));
        }
        let parseResults = (r) => {
            if (typ == 2 && document.getElementById("hledaniParcelTxtGeojson").checked == true) {
                let file = '{"type": "FeatureCollection","crs": {"type": "name","properties": {"name": "EPSG:' + app.activeView.spatialReference.latestWkid + '"}}, "features": [';
                for (let i = 0; i < r.length; i++) {
                    if (r[i]) {
                        file += '{"type": "Feature", "id": ' + i + ', "geometry": { "type": "' + r[i].geometry.type.charAt(0).toUpperCase() + r[i].geometry.type.slice(1) + '", "coordinates":' + JSON.stringify(r[i].geometry.rings) + '},"properties":' + JSON.stringify(r[i].attributes) + '}';
                        if (i != r.length - 1) file += ',';
                    }
                }
                file += ']}';
                let a = document.createElement("a");
                a.href = window.URL.createObjectURL(new Blob([file], { type: "text/plain" }));
                a.download = "parcely.json";
                a.click();
                a.remove();
            }
            let d1 = r[0].sourceLayer.getFieldDomain("druhpozemkukod", {
                feature: r[0]
            });
            let d2 = r[0].sourceLayer.getFieldDomain("zpusobyvyuzitipozemku", {
                feature: r[0]
            });
            let myResult = r.map((feature) => {
                feature.typ = "parcela";
                feature.popupTemplate = {
                    title: label[558] + " {cisloparcely}",
                    content: "<b>" + label[151] + ":</b> {katastralniuzemi}<br><b>" + label[150] + ":</b> {id}<br><br><b>" + label[62] + ":</b> {druhcislovanikod}<br><b>" + label[59] + ":</b> {kmenovecislo}<br><b>" + label[60] + ": </b> {poddelenicisla}<br><br><b>" + label[149] + ": </b> {druhpozemkukod}<br><b>" + label[607] + ":</b> {zpusobyvyuzitipozemku}<br><b>" + label[61] + "</b> {vymeraparcely} m²",
                    actions: [{
                            id: "nahlizeni",
                            className: "esri-icon-documentation",
                            title: label[530]
                        }, {
                            id: "csv",
                            className: "esri-icon-table",
                            title: "CSV"
                        }]
                    };                
                app.activeView.type == "2d" ? feature.symbol = { type: "simple-fill", color: [60, 60, 60], style: "diagonal-cross", outline: { color: [200, 0, 0], width: 2, style: "solid" }} : feature.symbol = {type: "polygon-3d", symbolLayers: [{type: "fill", material: { color: [60, 60, 60, 0.5] }, outline: { color: [200, 0, 0], size: 2 }}]};
                for (let att in feature.attributes) {
                    if (att == 'id' || att == 'katastralniuzemi' || att == 'kmenovecislo') feature.attributes[att].toString();
                    if ((att == 'poddelenicisla') && feature.attributes[att] == null) feature.attributes[att] = '-';
                    if ((att == 'druhcislovanikod') && feature.attributes[att] == 1) feature.attributes[att] = label[63];
                    if ((att == 'druhcislovanikod') && feature.attributes[att] == 2) feature.attributes[att] = label[64];
                    if (att == 'zpusobyvyuzitipozemku') {
                        if (feature.attributes[att] == null) {
                            feature.attributes[att] = '-';
                        } else {
                            for (let i = 0; i < d2.codedValues.length; i++) {
                                if (feature.attributes[att] == d2.codedValues[i].code) { feature.attributes[att] = d2.codedValues[i].name; }
                            }
                        }
                    }
                    if (att == 'druhpozemkukod') {
                        for (let ii = 0; ii < d1.codedValues.length; ii++) {
                            if (feature.attributes[att] == d1.codedValues[ii].code) { feature.attributes[att] = d1.codedValues[ii].name; }
                        }
                    }
                }
                return feature
            });
            app.activeView.map.findLayerById("resultsLayerGrafics").addMany(myResult);
            app.activeView.goTo(myResult).then(() => {
                app.activeView.openPopup({
                    features: myResult,
                    featureMenuOpen: false,
                    updateLocationEnabled: true,
                    highlightEnabled: true
                });
                if (typ == 1) {
                    if (btn) { btn.disabled = false; btn.innerHTML = btnValue; }
                    document.getElementById('zachovatVysledkyVyhledavani').parentNode.classList.remove('hidden');
                    query_dojo("#label_67").removeClass("hidden");
                } else {
                    input.disabled = false; input.value = null;
                    document.getElementById("label_225").innerHTML = label[709];
                }
                query_dojo("#odstranitNalezeneParcelyBtn, #odstranitvysledkyvyhledavani").removeClass("hidden");
            });
        }
        app.activeView.closePopup();
        let btnValue;
        if (btn) { btnValue = btn.innerHTML; btn.disabled = true; btn.innerHTML = label[549] + "<span class='esri-icon-loading-indicator loadingProgress'></span>"; }
        let layer = app.activeView.map.findLayerById("resultsLayerGrafics");
        if (!layer) {
            let resultsLayer = new GraphicsLayer({
                title: "grafiky",
                listMode: "hide",
                id: "resultsLayerGrafics"
            });
            app.activeView.map.layers.add(resultsLayer);
        };    
        if ((typ == 1 && document.getElementById("zachovatVysledkyVyhledavani").checked == true) || (typ == 2)) {
            app.rozsireneHledani.odstranVysledky(2);
        }
        if (typ == 1) {
            let kmenovecislo = document.getElementById('vstupkmenovecislo').value.trim();
            let poddelenicisla;
            let ku = document.getElementById('hledani_vstupkatastry').value;
            if (!kmenovecislo || !ku) {
                onError(typ, btn, btnValue, label[403]);
                return;
            }
            let input1 = document.getElementById('vstupcislovani_1');
            let input2 = document.getElementById('vstupcislovani_2');            
            let druhcislovanikod = input1.checked ? input1.value : input2.checked ? input2.value : null;
            if (kmenovecislo.indexOf("/" >= -1)) {
                let n = kmenovecislo.split("/");
                kmenovecislo = n[0];
                poddelenicisla = n[1];
            }
            if (ku.indexOf("(") > 0) ku = ku.substr(0, ku.indexOf("(") - 1);
    
            let where;
            isNaN(ku) == true ? where = "lower(nazev) = lower('" + ku + "')" : where = "kod = " + ku
            let params = new Query({
                where: where,
                f: "json",
                outFields: ["kod"]
            });
            let getKU = (p) => {
                let promise = new Promise((resolve, reject) => {
                    query.executeQueryJSON("https://ags.cuzk.gov.cz/arcgis/rest/services/RUIAN/MapServer/7/query", p).then((r) => {
                        r.features.length != 0 ? resolve(r.features[0].attributes.kod) : reject(new Error(label[152]));
                    }).catch((error) => {
                        reject(error);
                    });
                });
                return promise;
            }
            getKU(params).then((kod) => {
                let where = "katastralniuzemi=" + kod + " AND kmenovecislo=" + kmenovecislo + " AND druhcislovanikod=" + druhcislovanikod;
                if (poddelenicisla) where += " AND poddelenicisla=" + poddelenicisla
                taks([where]).then((r) => {
                    let t = [];
                    r.forEach(e => {
                        if (e.value) { e.value.features.forEach(f => { t.push(f); }); } else { onError(typ, btn, btnValue, label[160]); }
                    });
                    t.length != 0 ? parseResults(t) : onError(typ, btn, btnValue, label[160])
                }).catch((error) => {
                    onError(typ, btn, btnValue, label[160] + "\n\n" + error.message);
                });
            }).catch((error) => {
                onError(typ, btn, btnValue, label[160] + "\n\n" + error.message);
            });
        } else if (typ == 2) {
            if (input.files[0].type != "text/plain" && input.files[0].size > 5000) {
                alert(label[383]);
                input.value = null;
                return;
            }
            document.getElementById("label_225").innerHTML = label[549] + "<br><br>";
            input.disabled = true;
            let fileReader = new FileReader();
            fileReader.onload = () => {
                let str = fileReader.result;
                if (str.slice(-1) == ';') str = str.substring(0, str.length - 1)
                let myRows = str.split(";").map(r => {
                    if (r.indexOf(",") > -1) {
                        let s = r.split(",");
                        let w = "katastralniuzemi=" + s[0];
                        s[1].indexOf("/") > -1 ? w += "AND kmenovecislo=" + s[1].split("/")[0] + " AND poddelenicisla=" + s[1].split("/")[1] : w += "AND kmenovecislo=" + s[1];
                        w += "AND druhcislovanikod=" + s[2];
                        return w
                    } else {
                        onError(typ, undefined, undefined, label[160], input)
                    }
                });
                taks(myRows).then((r) => {
                    let t = [];
                    let invalid = [];
                    r.forEach((e, i) => {
                        if (e.value) {
                            if (e.value.features.length == 0) invalid.push(i + 1)
                            e.value.features.forEach(f => {
                                t.push(f);                        
                            });
                        } else {
                            invalid.push(i + 1)
                        }
                    });
                    if (invalid.length != 0) alert(label[578] + invalid)
                    t.length != 0 ? parseResults(t) : onError(typ, undefined, undefined, label[160], input)
                }).catch((error) => {
                    onError(typ, undefined, undefined, label[160] + "\n\n" + error.message);
                });
            }
            fileReader.readAsText(document.getElementById("hledaniParcelTxt").files[0]);
        }
    }

    app.rozsireneHledani.openDiv = (input) => {
        let list = ['#hledaniParcel', '#spravniCleneni', '#hledaniDBP', '#hledaniGeonames', '#hledaniTlacitkaAll']
        let toQuery = "";
        list.forEach((e, i) => {
            if (e != '#' + input) {
                toQuery += e;
                if (i != list.length - 1) {
                    toQuery += ", "
                }
            }
        });
        query_dojo('#' + input).removeClass('hidden');
        query_dojo(toQuery).addClass('hidden');
    }

    app.rozsireneHledani.zpet = (uroven, btn) => {
        if (uroven == 1) {
            query_dojo('#hledaniTlacitkaAll').removeClass('hidden');
            query_dojo('#hledaniParcel, #spravniCleneni, #hledaniDBP, #hledaniGeonames').addClass('hidden');
        } else if (uroven == 2) {
            query_dojo(".divHledani").addClass("hidden");
            query_dojo("#" + btn + ", .backOnTopBtn").removeClass("hidden");
        }
    }

    app.rozsireneHledani.openScnDiv = (id, mode) => {
        query_dojo("#" + id).removeClass("hidden");
        query_dojo("#" + mode + ", .backOnTopBtn").addClass("hidden");
    }

    app.rozsireneHledani.onError = (btn, val) => {
        if (btn) btn.disabled = false; btn.innerHTML = val;
        alert(label[160]);        
    }

    app.rozsireneHledani.ruian = (vrstva, input, btn) => {
        if ((input) && input.value == "") {
            alert(label[160]);
            return;
        } else {
            var myValue = input.value;
            if (myValue.indexOf("(") > 0) myValue = myValue.substr(0, myValue.indexOf("(") - 1)
            var myWhere = "lower(nazev) like lower('%" + myValue + "%')";
        }
        let lineSymbol2D = {
            type: "simple-fill",
            color: [60, 60, 60],
            style: "diagonal-cross",
            outline: {
                color: [200, 0, 0],
                width: 2,
                style: "solid"
            }
        };
        let lineSymbol3D = {
            type: "polygon-3d",
            symbolLayers: [{
                type: "fill",
                material: {
                    color: [60, 60, 60, 0.5]
                },
                outline: {
                    color: [200, 0, 0],
                    size: 2
                }
            }]
        };
        let outSR = { wkid: app.activeView.spatialReference.wkid };
        let goTo = (e) => {
            app.activeView.map.findLayerById("resultsLayerGrafics").addMany(e);
            app.activeView.goTo(e).then(() => {
                app.activeView.openPopup({
                    features: e,
                    updateLocationEnabled: true
                });
            });
        }
        require(["esri/rest/query"], (query) => {
            var queryUrl = "https://ags.cuzk.gov.cz/arcgis/rest/services/RUIAN/MapServer/";
            var layer = app.activeView.map.findLayerById("resultsLayerGrafics");
            if (!layer) {
                var resultsLayer = new GraphicsLayer({
                    title: "grafiky",
                    listMode: "hide",
                    id: "resultsLayerGrafics"
                });
                app.activeView.map.layers.add(resultsLayer);
            } else {
                let nechVysledky = false;
                if (document.getElementById("zachovatVysledkyVyhledavaniKatastralniUzemi").checked == false && vrstva == 11) {
                    nechVysledky = true;
                }
                if (nechVysledky == false) {
                    app.rozsireneHledani.odstranVysledky(3);
                }
            }
            app.activeView.closePopup();
            if (btn) {
                var btnValue = btn.innerHTML;
                btn.disabled = true;
                btn.innerHTML = label[549] + "<span class='esri-icon-loading-indicator loadingProgress'></span>";
            }
            if (vrstva == 1) {
                input.disabled = true;
                let query1 = new Query({
                    returnGeometry: true,
                    outFields: ["objectid", "nazev", "nutslau"],
                    outSpatialReference: outSR,
                    where: "kod=" + myValue
                });
                query.executeQueryJSON(queryUrl + "18", query1).then((results) => {
                    let vysledky = results.features;
                    vysledky[0].popupTemplate = {
                        title: label[153] + ": ",
                        content: "<b>" + label[154] + ":</b> {nazev}<br><b>" + label[155] + ":</b> {nutslau}"
                    };
                    app.activeView.type == "2d" ? vysledky[0].symbol = lineSymbol2D : vysledky[0].symbol = lineSymbol3D
                    vysledky[0].typ = "ruian";
                    goTo(vysledky);
                    input.disabled = false;
                    input.value = "0";
                    query_dojo("#removeHranice, #odstranitvysledkyvyhledavani").removeClass("hidden");
                });
            } else if (vrstva == 2) {
                input.disabled = true;
                let query1 = new Query({
                    returnGeometry: true,
                    outFields: ["objectid", "nazev", "regionsoudrznosti", "nutslau"],
                    outSpatialReference: outSR,
                    where: "kod=" + myValue
                });
                query.executeQueryJSON(queryUrl + "17", query1).then((results) => {
                    let vysledky = results.features;
                    vysledky[0].popupTemplate = {
                        title: label[392] + ": ",
                        content: "<b>" + label[154] + ":</b> {nazev}<br><b>" + label[155] + ":</b> {nutslau}"
                    };
                    app.activeView.type == "2d" ? vysledky[0].symbol = lineSymbol2D : vysledky[0].symbol = lineSymbol3D
                    vysledky[0].typ = "ruian";
                    goTo(vysledky);
                    input.disabled = false;
                    input.value = "0";
                    query_dojo("#removeHranice, #odstranitvysledkyvyhledavani").removeClass("hidden");
                });
            } else if (vrstva == 3) {
                let query1 = new Query({
                    returnGeometry: true,
                    outFields: ["objectid", "nutslau", "nazev"],
                    orderByFields: ["nazev"],
                    where: myWhere,
                    outSpatialReference: outSR
                });
                query.executeQueryJSON(queryUrl + "15", query1).then((results) => {
                    let vysledky = results.features;
                    if (vysledky.length > 0) {
                        for (var t = 0; t < vysledky.length; t++) {
                            vysledky[t].popupTemplate = {
                                title: label[156] + ": {nazev}",
                                content: "<b>" + label[155] + ":</b> {nutslau}"
                            };
                            app.activeView.type == "2d" ? vysledky[t].symbol = lineSymbol2D : vysledky[t].symbol = lineSymbol3D
                            vysledky[t].typ = "ruian";
                        }
                        goTo(vysledky);
                        query_dojo("#removeHranice, #odstranitvysledkyvyhledavani").removeClass("hidden");
                    } else {
                        alert(label[160]);
                    }
                    btn.disabled = false;
                    btn.innerHTML = btnValue;
                }).catch(() => {
                    app.rozsireneHledani.onError(btn, btnValue);
                });
            } else if (vrstva == 4) {
                let query1 = new Query({
                    returnGeometry: true,
                    outFields: ["objectid", "kod", "nazev"],
                    orderByFields: ["nazev"],
                    where: myWhere,
                    outSpatialReference: outSR
                });
                query.executeQueryJSON(queryUrl + "14", query1).then((results) => {
                    var vysledky = results.features;
                    if (vysledky.length > 0) {
                        for (var t = 0; t < vysledky.length; t++) {
                            vysledky[t].popupTemplate = {
                                title: "<b>" + label[157] + ": </b> {nazev}",
                                content: "<b>" + label[158] + ":</b> {kod}"
                            };
                            app.activeView.type == "2d" ? vysledky[t].symbol = lineSymbol2D : vysledky[t].symbol = lineSymbol3D
                            vysledky[t].typ = "ruian";
                        }
                        goTo(vysledky);
                        query_dojo("#removeHranice, #odstranitvysledkyvyhledavani").removeClass("hidden");
                    } else {
                        alert(label[160]);
                    }
                    btn.disabled = false;
                    btn.innerHTML = btnValue;
                }).catch(() => {
                    app.rozsireneHledani.onError(btn, btnValue);
                });
            } else if (vrstva == 5) {
                let query1 = new Query({
                    returnGeometry: true,
                    outFields: ["objectid", "kod", "nazev"],
                    orderByFields: ["nazev"],
                    where: myWhere,
                    outSpatialReference: outSR
                });
                query.executeQueryJSON(queryUrl + "13", query1).then((results) => {
                    var vysledky = results.features;
                    if (vysledky.length > 0) {
                        for (var t = 0; t < vysledky.length; t++) {
                            vysledky[t].popupTemplate = {
                                title: label[161] + ": {nazev}",
                                content: "<b>" + label[162] + ":</b> {kod}<br>"
                            };
                            app.activeView.type == "2d" ? vysledky[t].symbol = lineSymbol2D : vysledky[t].symbol = lineSymbol3D
                            vysledky[t].typ = "ruian";
                        }
                        goTo(vysledky);
                        query_dojo("#removeHranice, #odstranitvysledkyvyhledavani").removeClass("hidden");
                    } else {
                        alert(label[160]);
                    }
                    btn.disabled = false;
                    btn.innerHTML = btnValue;
                }).catch(() => {
                    app.rozsireneHledani.onError(btn, btnValue);
                });
            } else if (vrstva == 6) {
                let query1 = new Query({
                    returnGeometry: true,
                    outFields: ["objectid", "kod", "nazev", "okres"],
                    orderByFields: ["nazev"],
                    where: myWhere,
                    outSpatialReference: outSR
                });
                query.executeQueryJSON(queryUrl + "12", query1).then((results) => {
                    let myResults = []
                    if (results.features.length > 0) {
                        let upper = new Set();
                        results.features.forEach((n) => {
                            upper.add(n.attributes.okres);
                            n.popupTemplate = {
                                title: label[14] + ": {nazev}",
                                content: "<b>" + label[163] + ": </b> {kod}"
                            };
                            app.activeView.type == "2d" ? n.symbol = lineSymbol2D : n.symbol = lineSymbol3D;
                            n.typ = "ruian";
                            myResults.push(n);
                        });
                        let tasks = [...upper].map((id) => {
                            let newQuery = new Query({
                                outFields: ["nazev", "kod"],
                                where: "kod=" + id,
                                outSpatialReference: outSR
                            });
                            return [queryUrl + "15", newQuery]
                        });
                        promiseUtils.eachAlways(tasks.map((task) => {
                            return query.executeQueryJSON(task[0], task[1])
                        })).then((myUppers) => {
                            myUppers = myUppers.map((element) => {
                                return element.value.features[0]
                            });
                            myResults.forEach((myFeature) => {
                                for (let i = 0; i < myUppers.length; i++) {
                                    if (myFeature.attributes.okres == myUppers[i].attributes.kod) {
                                        myFeature.popupTemplate.title += " (" + label[156] + " " + myUppers[i].attributes.nazev + ")";
                                        break;
                                    }
                                }
                            });
                            goTo(myResults);
                            btn.disabled = false;
                            btn.innerHTML = btnValue;
                            query_dojo("#removeHranice, #odstranitvysledkyvyhledavani").removeClass("hidden");
                        }).catch(() => {
                            app.rozsireneHledani.onError(btn, btnValue);
                        });
                    } else {
                        alert(label[160]);
                        btn.disabled = false;
                        btn.innerHTML = btnValue;
                    }
                }).catch(() => {
                    app.rozsireneHledani.onError(btn, btnValue);
                });
            } else if (vrstva == 7) {
                let query1 = new Query({
                    returnGeometry: true,
                    outFields: ["objectid", "kod", "nazev", "obec"],
                    orderByFields: ["nazev"],
                    where: myWhere,
                    outSpatialReference: outSR
                });
                query.executeQueryJSON(queryUrl + "11", query1).then((results) => {
                    let myResults = []
                    if (results.features.length > 0) {
                        let upper = new Set();
                        results.features.forEach((n) => {
                            upper.add(n.attributes.obec);
                            n.popupTemplate = {
                                title: label[164] + ": {nazev}",
                                content: "<b>" + label[165] + ": </b> {kod}"
                            };
                            if (app.activeView.type == "2d") {
                                n.symbol = {
                                    type: "text",
                                    color: "#204d74",
                                    text: "\ue61d",
                                    font: {
                                        size: 25,
                                        family: "calcite-web-icons"
                                    },
                                    haloColor: "white",
                                    haloSize: "3px"
                                };
                            } else if (app.activeView.type == "3d") {
                                n.symbol = {
                                    type: "point-3d",
                                    symbolLayers: [{
                                        type: "icon",
                                        size: 12,
                                        resource: { primitive: "circle" },
                                        material: { color: "red" }
                                    }],
                                    verticalOffset: {
                                        screenLength: 40,
                                        minWorldLength: 10
                                    },
                                    callout: {
                                        type: "line",
                                        size: 1.5,
                                        color: "white",
                                        border: {
                                            color: "black"
                                        }
                                    }
                                };
                            }
                            n.typ = "ruian";
                            myResults.push(n);
                        });
                        let tasks = [...upper].map((id) => {
                            let newQuery = new Query({
                                outFields: ["nazev", "kod"],
                                where: "kod=" + id,
                                outSpatialReference: outSR
                            });
                            return [queryUrl + "12", newQuery]
                        });
                        promiseUtils.eachAlways(tasks.map((task) => {
                            return query.executeQueryJSON(task[0], task[1])
                        })).then((myUppers) => {
                            myUppers = myUppers.map((element) => {
                                return element.value.features[0]
                            });
                            myResults.forEach((myFeature) => {
                                for (let i = 0; i < myUppers.length; i++) {
                                    if (myFeature.attributes.obec == myUppers[i].attributes.kod) {
                                        myFeature.popupTemplate.title += " (" + label[14] + " " + myUppers[i].attributes.nazev + ")";
                                        break;
                                    }
                                }
                            });
                            goTo(myResults);
                            btn.disabled = false;
                            btn.innerHTML = btnValue;
                            query_dojo("#removeHranice, #odstranitvysledkyvyhledavani").removeClass("hidden");
                        }).catch(() => {
                            app.rozsireneHledani.onError(btn, btnValue);
                        });
                    } else {
                        alert(label[160]);
                        btn.disabled = false;
                        btn.innerHTML = btnValue;
                    }
                }).catch(() => {
                    app.rozsireneHledani.onError(btn, btnValue);
                });
            } else if (vrstva == 8) {
                let query1 = new Query({
                    returnGeometry: true,
                    outFields: ["objectid", "kod", "nazev", "obec"],
                    orderByFields: ["nazev"],
                    where: myWhere,
                    outSpatialReference: outSR
                });
                query.executeQueryJSON(queryUrl + "9", query1).then((results) => {
                    let vysledky = results.features;
                    if (vysledky.length > 0) {
                        for (var t = 0; t < vysledky.length; t++) {
                            vysledky[t].popupTemplate = {
                                title: label[487] + ": {nazev}",
                                content: "<b>" + label[155] + ":</b> {kod}<br>"
                            };
                            app.activeView.type == "2d" ? vysledky[t].symbol = lineSymbol2D : vysledky[t].symbol = lineSymbol3D
                            vysledky[t].typ = "ruian";
                        }
                        goTo(vysledky);
                        query_dojo("#removeHranice, #odstranitvysledkyvyhledavani").removeClass("hidden");
                    } else {
                        alert(label[160]);
                    }
                    btn.disabled = false;
                    btn.innerHTML = btnValue;
                }).catch(() => {
                    app.rozsireneHledani.onError(btn, btnValue);
                });
            } else if (vrstva == 9) {
                let query1 = new Query({
                    returnGeometry: true,
                    outFields: ["objectid", "kod", "nazev", "obec"],
                    orderByFields: ["nazev"],
                    where: myWhere,
                    outSpatialReference: outSR
                });
                query.executeQueryJSON(queryUrl + "10", query1).then((results) => {
                    let vysledky = results.features;
                    if (vysledky.length > 0) {
                        for (var t = 0; t < vysledky.length; t++) {
                            vysledky[t].popupTemplate = {
                                title: label[488] + ": {nazev}",
                                content: "<b>" + label[155] + ":</b> {kod}<br>"
                            };
                            app.activeView.type == "2d" ? vysledky[t].symbol = lineSymbol2D : vysledky[t].symbol = lineSymbol3D
                            vysledky[t].typ = "ruian";
                        }
                        goTo(vysledky);
                        query_dojo("#removeHranice, #odstranitvysledkyvyhledavani").removeClass("hidden");
                    } else {
                        alert(label[160]);
                    }
                    btn.disabled = false;
                    btn.innerHTML = btnValue;
                }).catch(() => {
                    app.rozsireneHledani.onError(btn, btnValue);
                });
            } else if (vrstva == 10) {
                let query1 = new Query({
                    returnGeometry: true,
                    outFields: ["objectid", "kod", "nazev", "obec"],
                    orderByFields: ["nazev"],
                    where: myWhere,
                    outSpatialReference: outSR
                });
                query.executeQueryJSON(queryUrl + "8", query1).then((results) => {
                    let myResults = []
                    if (results.features.length > 0) {
                        let upper = new Set();
                        results.features.forEach((n) => {
                            upper.add(n.attributes.obec);
                            n.popupTemplate = {
                                title: label[349] + ": {nazev}",
                                content: "<b>" + label[350] + ": </b> {kod}"
                            };
                            app.activeView.type == "2d" ? n.symbol = lineSymbol2D : n.symbol = lineSymbol3D;
                            n.typ = "ruian";
                            myResults.push(n);
                        });
                        let tasks = [...upper].map((id) => {
                            let newQuery = new Query({
                                outFields: ["nazev", "kod"],
                                where: "kod=" + id,
                                outSpatialReference: outSR
                            });
                            return [queryUrl + "12", newQuery]
                        });
                        promiseUtils.eachAlways(tasks.map((task) => {
                            return query.executeQueryJSON(task[0], task[1])
                        })).then((myUppers) => {
                            myUppers = myUppers.map((element) => {
                                return element.value.features[0]
                            });
                            myResults.forEach((myFeature) => {
                                for (let i = 0; i < myUppers.length; i++) {
                                    if (myFeature.attributes.obec == myUppers[i].attributes.kod) {
                                        myFeature.popupTemplate.title += " (" + label[14] + " " + myUppers[i].attributes.nazev + ")";
                                        break;
                                    }
                                }
                            });
                            goTo(myResults);
                            btn.disabled = false;
                            btn.innerHTML = btnValue;
                            query_dojo("#removeHranice, #odstranitvysledkyvyhledavani").removeClass("hidden");
                        }).catch(() => {
                            app.rozsireneHledani.onError(btn, btnValue);
                        });
                    } else {
                        alert(label[160]);
                        btn.disabled = false;
                        btn.innerHTML = btnValue;
                    }
                }).catch(() => {
                    app.rozsireneHledani.onError(btn, btnValue);
                });
            } else if (vrstva == 11) {
                if (isNaN(myValue) == true) {
                    var where = "lower(nazev) = lower('" + myValue + "')";
                } else {
                    var where = "kod = " + myValue;
                }
                let query1 = new Query({
                    returnGeometry: true,
                    outFields: ["objectid", "kod", "nazev"],
                    orderByFields: ["nazev"],
                    where: where,
                    outSpatialReference: outSR
                });
                query.executeQueryJSON(queryUrl + "7", query1).then((results) => {
                    let vysledky = results.features;
                    if (vysledky.length > 0) {
                        for (var t = 0; t < vysledky.length; t++) {
                            if (vysledky[t]) {
                                vysledky[t].popupTemplate = {
                                    title: label[12] + ": {nazev}",
                                    content: "<b>" + label[151] + ": </b> {kod}<br>"
                                };
                                app.activeView.type == "2d" ? vysledky[t].symbol = lineSymbol2D : vysledky[t].symbol = lineSymbol3D
                                vysledky[t].typ = "ruian";
                            }
                        }
                        goTo(vysledky);
                        query_dojo("#removeHranice, #odstranitvysledkyvyhledavani, #label_230").removeClass("hidden");
                        document.getElementById('zachovatVysledkyVyhledavaniKatastralniUzemi').parentNode.classList.remove('hidden');
                    } else {
                        alert(label[160]);
                    }
                    btn.disabled = false;
                    btn.innerHTML = btnValue;
                }).catch(() => {
                    app.rozsireneHledani.onError(btn, btnValue);
                });
            } else if (vrstva == 12) {
                let query1 = new Query({
                    returnGeometry: true,
                    outFields: ["objectid", "kod", "nazev", "katastralniuzemi"],
                    orderByFields: ["nazev"],
                    where: myWhere,
                    outSpatialReference: outSR
                });
                query.executeQueryJSON(queryUrl + "6", query1).then((results) => {
                    let myResults = []
                    if (results.features.length > 0) {
                        let upper = new Set();
                        results.features.forEach((n) => {
                            upper.add(n.attributes.katastralniuzemi);
                            n.popupTemplate = {
                                title: label[166] + ": {nazev}",
                                content: "<b>" + label[167] + ": </b> {kod}"
                            };
                            app.activeView.type == "2d" ? n.symbol = lineSymbol2D : n.symbol = lineSymbol3D;
                            n.typ = "ruian";
                            myResults.push(n);
                        });
                        let tasks = [...upper].map((id) => {
                            let newQuery = new Query({
                                outFields: ["nazev", "kod"],
                                where: "kod=" + id,
                                outSpatialReference: outSR
                            });
                            return [queryUrl + "7", newQuery]
                        });
                        promiseUtils.eachAlways(tasks.map((task) => {
                            return query.executeQueryJSON(task[0], task[1])
                        })).then((myUppers) => {
                            myUppers = myUppers.map((element) => {
                                return element.value.features[0]
                            });
                            myResults.forEach((myFeature) => {
                                for (let i = 0; i < myUppers.length; i++) {
                                    if (myFeature.attributes.katastralniuzemi == myUppers[i].attributes.kod) {
                                        myFeature.popupTemplate.title += " (" + label[168] + " " + myUppers[i].attributes.nazev + ")";
                                        break;
                                    }
                                }
                            });
                            goTo(myResults);
                            btn.disabled = false;
                            btn.innerHTML = btnValue;
                            query_dojo("#removeHranice, #odstranitvysledkyvyhledavani").removeClass("hidden");
                        }).catch(() => {
                            app.rozsireneHledani.onError(btn, btnValue);
                        });
                    } else {
                        alert(label[160]);
                        btn.disabled = false;
                        btn.innerHTML = btnValue;
                    }
                }).catch(() => {
                    app.rozsireneHledani.onError(btn, btnValue);
                });
            }
        });
    };

    app.rozsireneHledani.DBP = (druh, btn) => {
        let pointSymbol2D = {
            type: "simple-marker",
            style: "circle",
            color: "yellow",
            size: "10px",
            outline: {
                color: "#000000",
                width: 1.5
            }
        };
        let pointSymbol3D = {
            type: "point-3d",
            symbolLayers: [{
                type: "icon",
                size: 12,
                resource: { primitive: "circle" },
                material: { color: "red" }
            }],
            verticalOffset: {
                screenLength: 40,
                minWorldLength: 10
            },
            callout: {
                type: "line",
                size: 1.5,
                color: "white",
                border: {
                    color: "black"
                }
            }
        };
        require(["esri/rest/query"], (query) => {
            let queryUrl = "https://ags.cuzk.gov.cz/arcgis/rest/services/BodovaPole/MapServer/";
            let layer = app.activeView.map.findLayerById("resultsLayerGrafics");
            if (!layer) {
                let resultsLayer = new GraphicsLayer({
                    title: "grafiky",
                    listMode: "hide",
                    id: "resultsLayerGrafics"
                });
                app.activeView.map.layers.add(resultsLayer);
            } else {
                app.rozsireneHledani.odstranVysledky(4);
            }
            app.activeView.closePopup();
            let btnValue = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = label[549] + "<span class='esri-icon-loading-indicator loadingProgress'></span>";
            if (druh == 1) {
                var popupTemplate = {
                    title: label[516] + ": {NAZEV_KU}: {CISLO}",
                    content:
                        "<a href='{GEODETICKE_UDAJE}' style=\"color: #337ab7\" target='_blank'><b>" + label[523] + "</b></a><br><br>" +
                        "<b>" + label[521] + ": </b>{CISLO}<br>" +
                        "<b>" + label[536] + ": </b>{ZTLTL}<br>" +
                        "<b>" + label[522] + ": </b>{CISLO_SMO5}<br>" +
                        "<b>" + label[148] + ": </b>{NAZEV_KU}<br>"
                };
                var dotaz = [];
                if (document.getElementById("label_196").value) {
                    dotaz.push("CISLO=" + document.getElementById("label_196").value + " AND");
                }
                if (document.getElementById("label_199").value) {
                    dotaz.push("lower(CISLO_SMO5) like lower('%" + document.getElementById("label_199").value + "%') AND");
                }
                if (document.getElementById("hledani_label_198").value) {
                    var label_198 = document.getElementById("hledani_label_198").value;
                    if (label_198.indexOf("(") > 0) {
                        label_198 = label_198.substr(0, label_198.indexOf("(") - 1);
                    }
                    dotaz.push("lower(NAZEV_KU) like lower('" + label_198 + "') AND");
                }
                if (document.getElementById("label_197").value) {
                    dotaz.push("lower(ZTLTL) like lower('%" + document.getElementById("label_197").value + "%') AND");
                }

                var queryDotaz = dotaz.toString().replace(/,/g, ' ');
                if (queryDotaz.slice(-1) == "D") {
                    queryDotaz = queryDotaz.slice(0, -4);
                }
                
                var layersToTask = ["2", "4", "6", "8", "10", "12", "14", "16", "18", "20"];
                var outFields = ["CISLO", "ZTLTL", "CISLO_SMO5", "GEODETICKE_UDAJE", "NAZEV_KU", "PL"];
                var orderByFields = "NAZEV_KU";
            } else if (druh == 2) {
                var popupTemplate = {
                    title: label[298] + ": {NAZEV_KU}: {CISLO}",
                    content:
                        "<a href='{GEODETICKE_UDAJE}' style=\"color: #337ab7\" target='_blank'><b>" + label[523] + "</b></a><br><br>" +
                        "<b>" + label[521] + ": </b>{CISLO}<br>" +
                        "<b>" + label[536] + ": </b>{ZTLTL}<br>" +
                        "<b>" + label[522] + ": </b>{CISLO_SMO5}<br>" +
                        "<b>" + label[148] + ": </b>{NAZEV_KU}<br>"
                };
                var dotaz = [];
                if (document.getElementById("label_192").value) {
                    dotaz.push("CISLO=" + document.getElementById("label_192").value + " AND");
                }
                if (document.getElementById("label_195").value) {
                    dotaz.push("lower(CISLO_SMO5) like lower('%" + document.getElementById("label_195").value + "%') AND");
                }
                if (document.getElementById("hledani_label_194").value) {
                    var label_194 = document.getElementById("hledani_label_194").value;
                    if (label_194.indexOf("(") > 0) {
                        label_194 = label_194.substr(0, label_194.indexOf("(") - 1);
                    }
                    dotaz.push("lower(NAZEV_KU) like lower('" + label_194 + "') AND");
                }
                if (document.getElementById("label_193").value) {
                    dotaz.push("lower(ZTLTL) like lower('%" + document.getElementById("label_193").value + "%') AND");
                }

                var queryDotaz = dotaz.toString().replace(/,/g, ' ');
                if (queryDotaz.slice(-1) == "D") {
                    queryDotaz = queryDotaz.slice(0, -4);
                }
                var layersToTask = ["22", "24", "26", "28", "30", "32", "34", "36", "38", "40"];
                var outFields = ["CISLO", "ZTLTL", "CISLO_SMO5", "GEODETICKE_UDAJE", "NAZEV_KU", "PL"];
                var orderByFields = "NAZEV_KU";
            } else if (druh == 3) {
                var popupTemplate = {
                    title: label[517] + ": {NAZEV_KU}: {CISLO}",
                    content:
                        "<a href='{GEODETICKE_UDAJE}' style=\"color: #337ab7\" target='_blank'><b>" + label[523] + "</b></a><br><br>" +
                        "<b>" + label[148] + ": </b>{NAZEV_KU}<br>" +
                        "<b>" + label[521] + ": </b>{CISLO}<br>" +
                        "<b>" + label[522] + ": </b>{CISLO_SMO5}"
                };
                var dotaz = [];
                if (document.getElementById("label_177").value) {
                    dotaz.push("CISLO=" + document.getElementById("label_177").value + " AND");
                }
                if (document.getElementById("hledani_label_178").value) {
                    var label_178 = document.getElementById("hledani_label_178").value;
                    if (label_178.indexOf("(") > 0) {
                        label_178 = label_178.substr(0, label_178.indexOf("(") - 1);
                    }
                    dotaz.push("lower(NAZEV_KU) like lower('" + label_178 + "') AND");
                }
                if (document.getElementById("label_179").value) {
                    dotaz.push("CISLO_SMO5 like '%" + document.getElementById("label_179").value + "%' AND");
                }
                var queryDotaz = dotaz.toString().replace(/,/g, ' ');
                if (queryDotaz.slice(-1) == "D") {
                    queryDotaz = queryDotaz.slice(0, -4);
                }

                var layersToTask = ["42"];
                var outFields = ["CISLO", "GEODETICKE_UDAJE", "NAZEV_KU", "CISLO_SMO5"];
                var orderByFields = "NAZEV_KU";
            } else if (druh == 4) {
                var popupTemplate = {
                    title: label[518] + ": {NAZEV_KU}: {CISLO}",
                    content:
                        "<a href='{GEODETICKE_UDAJE}' style=\"color: #337ab7\" target='_blank'><b>" + label[523] + "</b></a><br><br>" +
                        "<b>" + label[524] + ": </b>{CISLO}<br>" +
                        "<b>" + label[148] + ": </b>{NAZEV_KU}<br>"
                };
                var dotaz = [];
                if (document.getElementById("ztvp_nivelacnibod").value) {
                    dotaz.push("lower(CISLO) like lower('%" + document.getElementById("ztvp_nivelacnibod").value + "%') AND");
                }
                if (document.getElementById("ztvp_nazevsmo5").value) {
                    dotaz.push("lower(NAZEV_SMO5) like lower('%" + document.getElementById("ztvp_nazevsmo5").value + "%') AND");
                }
                if (document.getElementById("hledani_ztvp_katastr").value) {
                    var ztvp_katastr = document.getElementById("hledani_ztvp_katastr").value;
                    if (ztvp_katastr.indexOf("(") > 0) {
                        ztvp_katastr = ztvp_katastr.substr(0, ztvp_katastr.indexOf("(") - 1);
                    }
                    dotaz.push("lower(NAZEV_KU) like lower('" + ztvp_katastr + "') AND");
                }
                if (document.getElementById("ztvp_nivelacniporad").value) {
                    dotaz.push("lower(PORAD) like lower('%" + document.getElementById("ztvp_nivelacniporad").value + "%') AND");
                }

                var queryDotaz = dotaz.toString().replace(/,/g, ' ');
                if (queryDotaz.slice(-1) == "D") {
                    queryDotaz = queryDotaz.slice(0, -4);
                }
                var layersToTask = ["44", "46"];
                var outFields = ["CISLO", "PORAD", "NAZEV_SMO5", "GEODETICKE_UDAJE", "NAZEV_KU"];
                var orderByFields = "NAZEV_KU";
            } else if (druh == 5) {
                var popupTemplate = {
                    title: label[524] + ": {NAZEV_BODU}: {CISLO}",
                    content:
                        "<a href='{GEODETICKE_UDAJE}' style=\"color: #337ab7\" target='_blank'><b>" + label[523] + "</b></a><br><br>" +
                        "<b>" + label[524] + ": </b>{NAZEV_BODU}<br>" +
                        "<b>" + label[521] + ": </b>{CISLO}<br>"
                };
                var dotaz = [];
                if (document.getElementById("ztbp_cislobodu").value) {
                    dotaz.push("CISLO like '%" + document.getElementById("ztbp_cislobodu").value + "%' AND");
                }
                if (document.getElementById("label_180").value) {
                    dotaz.push("lower(NAZEV_BODU) like lower('%" + document.getElementById("label_180").value + "%') AND");
                }
                var queryDotaz = dotaz.toString().replace(/,/g, ' ');
                if (queryDotaz.slice(-1) == "D") {
                    queryDotaz = queryDotaz.slice(0, -4);
                }
                var layersToTask = ["48"];
                var outFields = ["CISLO", "GEODETICKE_UDAJE", "NAZEV_BODU"];
                var orderByFields = "NAZEV_BODU";
            } else if (druh == 6) {
                var popupTemplate = {
                    title: label[524] + ": {NAZEV_BODU}",
                    content:
                        "<a href='{GEODETICKE_UDAJE}' style=\"color: #337ab7\" target='_blank'><b>" + label[523] + "</b></a><br><br>" +
                        "<b>" + label[524] + ": </b>{NAZEV_BODU}<br>" +
                        "<b>" + label[148] + ": </b>{NAZEV_KU}<br>"
                };
                var dotaz = [];
                if (document.getElementById("czepos_nazev_bodu").value) {
                    dotaz.push("lower(NAZEV_BODU) like lower('%" + document.getElementById("czepos_nazev_bodu").value + "%') AND");
                }
                if (document.getElementById("czepos_nazev_ku").value) {
                    dotaz.push("lower(NAZEV_KU) like lower('" + document.getElementById("czepos_nazev_ku").value + "') AND");
                }
                var queryDotaz = dotaz.toString().replace(/,/g, ' ');
                if (queryDotaz.slice(-1) == "D") {
                    queryDotaz = queryDotaz.slice(0, -4);
                }
                var layersToTask = ["0"];
                var outFields = ["GEODETICKE_UDAJE", "NAZEV_KU", "NAZEV_BODU"];
                var orderByFields = "NAZEV_KU";
            }
            if (!queryDotaz) {app.rozsireneHledani.onError(btn, btnValue); return;}
            let tasks = layersToTask.map((id) => {
                let newQuery = new Query({
                    returnGeometry: true,
                    orderByFields: orderByFields,
                    outFields: outFields,
                    where: queryDotaz,
                    outSpatialReference: { wkid: app.activeView.spatialReference.wkid }
                });
                return [queryUrl + id, newQuery]
            });

            promiseUtils.eachAlways(tasks.map((task) => {
                return query.executeQueryJSON(task[0], task[1])
            })).then((results) => {
                var vysledky = [];
                results.forEach(element => {
                    if (element.value) {
                        element.value.features.forEach(features => {
                            vysledky.push(features);
                        });
                    }
                });
                if (vysledky.length != 0) {
                    vysledky.forEach(element => {
                        element.popupTemplate = popupTemplate;
                        if (element.attributes.PL) {
                            if (element.attributes.PL != 0) {
                                var bod = element.attributes.CISLO;
                                element.attributes.CISLO += "." + element.attributes.PL + " (" + label[690] + " " + bod + ")";
                            }
                        }
                        if (app.activeView.type == "2d") {
                            element.symbol = pointSymbol2D;
                        } else if (app.activeView.type == "3d") {
                            element.symbol = pointSymbol3D;
                        }
                        element.typ = "dbp";
                    });
                    let resultsLayer = app.activeView.map.findLayerById("resultsLayerGrafics");
                    resultsLayer.addMany(vysledky);
                    app.activeView.goTo({
                        target: vysledky,
                        zoom: 10
                    }).then(() => {
                        app.activeView.openPopup({
                            features: vysledky,
                            updateLocationEnabled: true
                        });
                    });
                    document.getElementById("removeDBP").classList.remove("hidden");
                    document.getElementById("odstranitvysledkyvyhledavani").classList.remove("hidden");
                } else {
                    alert(label[160]);
                }
                btn.disabled = false;
                btn.innerHTML = btnValue;
            }).catch(() => {
                app.rozsireneHledani.onError(btn, btnValue);
            });
        });
    };
});