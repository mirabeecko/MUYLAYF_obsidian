function zobrazUpresneni() {
    var zobrazenoUpresneni = document.getElementById('upresneniGeometrieDiv').style.display;
    if (zobrazenoUpresneni == 'block') {
        document.getElementById('upresneniGeometrieDiv').style.display = 'none';
        document.getElementById('hlaseniChybIkonaUpresneni').classList.remove('rotate');
    } else {
        document.getElementById('upresneniGeometrieDiv').style.display = 'block';
        document.getElementById('hlaseniChybIkonaUpresneni').classList.add('rotate');
    }
};
var kresleniZapnutoHlaseniChyb = false;

var upresneniPolygon = false;
var upresneniLinie = false;

require([
    "esri/Graphic",
    "esri/layers/GraphicsLayer",
    'esri/geometry/SpatialReference',
    "esri/geometry/Point",
    "esri/rest/geoprocessor",
    "esri/layers/FeatureLayer",
    "esri/views/draw/Draw",
    "dojo/query"], (Graphic, GraphicsLayer, SpatialReference, Point, geoprocessor, FeatureLayer, Draw, query) => {
        app.widgetHlasenichyb = {};
        query("#panelHlaseniChyb > div > div > a > span.esri-icon-close").on("click", (e) => {
            app.widgetHlasenichyb.zacitZnovu();
        });

        app.widgetHlasenichyb.barva = [200, 0, 0];
        app.widgetHlasenichyb.barva_t = "Red";

        app.widgetHlasenichyb.zacitZnovu = () => {
            document.getElementById('popisChyby').value = '';
            document.getElementById('jmeno').value = '';
            document.getElementById('email').value = '';
            document.getElementById('souhlas').checked = false;
            document.getElementById('kdejechyba').value = 'nic';
            document.getElementById('odeslat').innerHTML = label[193];
            document.getElementById("stav_hlaseni").style.display = "none";
            document.getElementById('upresneniGeometrie').disabled = true;
            document.getElementById('upresneniGeometrieDiv').style.display = 'none';
            if (app.graphics_coord_layer) {
                var pole = app.graphics_coord_layer.graphics.toArray();
                for (var i = pole.length - 1; i >= 0; i--) {
                    if (pole[i].mujtyp == "hlaseni_bod" || pole[i].mujtyp == "hlaseni_temp" || pole[i].mujtyp == "hlaseni_grafika") {
                        app.graphics_coord_layer.graphics.remove(pole[i]);
                    }
                }
            }
        };

        app.widgetHlasenichyb.drawingcompleteBod = (typ, coordinates) => {
            if (!app.graphics_coord_layer) {
                app.graphics_coord_layer = new GraphicsLayer({ title: "Značka odečtu souřadnic", listMode: "hide" });
                app.mapView.map.layers.add(app.graphics_coord_layer);
                app.sceneView.map.layers.add(app.graphics_coord_layer);
            }
            var mapPoint = new Point({ x: coordinates[0], y: coordinates[1], spatialReference: app.activeView.spatialReference.clone() });
            var symbol = {
                type: "text", // autocasts as new TextSymbol()
                color: "#204d74",
                text: "\ue61d", // esri-icon-map-pin
                font: {
                    // autocasts as new Font()
                    size: 25,
                    family: "calcite-web-icons" // Esri Icon Font
                },
                haloColor: "white",
                haloSize: "3px"
            };
            var graphic = new Graphic({ geometry: mapPoint, symbol: symbol });
            graphic.mujtyp = "hlaseni_bod";
            app.graphics_coord_layer.add(graphic);
            app.enabledPopup = true;
            kresleniZapnutoHlaseniChyb = false;
            app.activeView.cursor = "default";
            document.getElementById('lokalizaceChyby').innerHTML = '<span class="esri-icon-map-pin fLeft"></span>' + label[93];
            document.getElementById('upresneniGeometrie').disabled = false;
            app.drawAttach.reset();
            query('#HlasenkaForm').removeClass("hidden");
        };

        app.widgetHlasenichyb.drawingcomplete = (typ, vertices) => {
            upresneniLinie = false;
            upresneniPolygon = false;
            document.getElementById("upresneniGeometriePolygon").innerHTML = "<span class='esri-icon-polygon'></span>";
            document.getElementById("upresneniGeometriePolygon").disabled = false;
            document.getElementById("upresneniGeometriePolyline").innerHTML = "<span class='esri-icon-polyline'></span>";
            document.getElementById("upresneniGeometriePolyline").disabled = false;
            if (vertices.length > 1) {
                if (!app.graphics_coord_layer) {
                    app.graphics_coord_layer = new GraphicsLayer({ title: "Značka odečtu souřadnic", listMode: "hide" });
                    app.mapView.map.layers.add(app.graphics_coord_layer);
                    app.sceneView.map.layers.add(app.graphics_coord_layer);
                } else {
                    app.graphics_coord_layer.graphics.forEach((mygraphics) => {
                        if (mygraphics.mujtyp) {
                            if (mygraphics.mujtyp == "hlaseni_temp") { app.graphics_coord_layer.graphics.remove(mygraphics); }
                        }
                    });
                }
                if (typ == "polyline") {
                    var polyline = {
                        type: "polyline", // autocasts as Polyline
                        paths: vertices,
                        spatialReference: app.activeView.spatialReference.clone()
                    };
                    var graphic = new Graphic({
                        geometry: polyline,
                        attributes: {
                            color: app.widgetHlasenichyb.barva_t
                        },
                        symbol: {
                            type: "simple-line", // autocasts as SimpleLineSymbol
                            color: app.widgetHlasenichyb.barva,
                            width: 3
                        }
                    });
                    graphic.mujtyp = "hlaseni_grafika";
                    //app.widgetHlasenichyb.kreslenipolyline();
                } else {
                    var polygon = {
                        type: "polygon", // autocasts as Polygon
                        rings: vertices,
                        spatialReference: app.activeView.spatialReference.clone()
                    };
                    var graphic = new Graphic({
                        geometry: polygon,
                        attributes: {
                            color: app.widgetHlasenichyb.barva_t
                        },
                        symbol: {
                            type: "simple-fill", // autocasts as SimpleFillSymbol
                            color: app.widgetHlasenichyb.barva,
                            style: "diagonal-cross",
                            outline: {  // autocasts as SimpleLineSymbol
                                color: app.widgetHlasenichyb.barva,
                                width: 3
                            }
                        }
                    });
                    graphic.mujtyp = "hlaseni_grafika";
                    //app.widgetHlasenichyb.kreslenipolygonu();
                }

                app.graphics_coord_layer.add(graphic);
                document.getElementById("upresneniGeometrieSmazatPosledni").disabled = false;
                app.widgetHlasenichyb.sestavatributsgeometrii();
                app.enabledPopup = true;
            }
        };

        app.widgetHlasenichyb.drawingtemp = (typ, vertices) => {
            if (vertices.length > 1) {
                if (!app.graphics_coord_layer) {
                    app.graphics_coord_layer = new GraphicsLayer({ title: "Značka odečtu souřadnic", listMode: "hide" });
                    app.mapView.map.layers.add(app.graphics_coord_layer);
                    app.sceneView.map.layers.add(app.graphics_coord_layer);
                } else {
                    app.graphics_coord_layer.graphics.forEach((mygraphics) => {
                        if (mygraphics.mujtyp) {
                            if (mygraphics.mujtyp == "hlaseni_temp") { app.graphics_coord_layer.graphics.remove(mygraphics); }
                        }
                    });
                }
                var polyline = {
                    type: "polyline", // autocasts as Polyline
                    paths: vertices,
                    spatialReference: app.activeView.spatialReference.clone()
                };
                var graphic = new Graphic({
                    geometry: polyline,
                    symbol: {
                        type: "simple-line", // autocasts as SimpleLineSymbol
                        color: app.widgetHlasenichyb.barva, // [100,100,100],
                        width: 3
                    }
                });

                graphic.mujtyp = "hlaseni_temp";
                app.graphics_coord_layer.add(graphic);
            }

        };

        app.widgetHlasenichyb.kreslenibodu = () => {
            document.getElementById("priloha").value = "";
            document.getElementById('odeslat').innerHTML = label[193];
            document.getElementById("stav_hlaseni").style.display = "none";
            if (kresleniZapnutoHlaseniChyb == false) {
                kresleniZapnutoHlaseniChyb = true;
                query('#HlasenkaForm').addClass("hidden");
                app.activeView.cursor = "crosshair";
                document.getElementById('lokalizaceChyby').innerHTML = '<span class="esri-icon-map-pin fLeft"></span>' + label[92];
                document.getElementById('upresneniGeometrie').disabled = true;
                document.getElementById('upresneniGeometrieDiv').style.display = 'none';
                app.activeView.popup.set({
                    visible: false
                });
                app.enabledPopup = false;
                if (app.graphics_coord_layer) {
                    var pole = app.graphics_coord_layer.graphics.toArray();
                    for (var i = pole.length - 1; i >= 0; i--) {
                        if (pole[i].mujtyp == "hlaseni_bod" || pole[i].mujtyp == "hlaseni_temp" || pole[i].mujtyp == "hlaseni_grafika") {
                            app.graphics_coord_layer.graphics.remove(pole[i]);
                        }
                    }
                }
                app.drawAttach.reset();
                var action = app.drawAttach.create("point", { mode: "click" });
                action.on("draw-complete", (evt) => {
                    app.widgetHlasenichyb.drawingcompleteBod("point", evt.vertices[0]);
                });
            } else {
                app.drawAttach.reset();
                kresleniZapnutoHlaseniChyb = false;
                app.activeView.cursor = "default";
                document.getElementById('lokalizaceChyby').innerHTML = '<span class="esri-icon-map-pin fLeft"></span>' + label[93];
                app.enabledPopup = true;
                query('#HlasenkaForm').removeClass("hidden");
            }
        };

        app.widgetHlasenichyb.kreslenipolygonu = () => {
            document.getElementById("upresneniGeometriePolygon").innerHTML = "<span class='esri-icon-close'></span>";
            document.getElementById("upresneniGeometriePolyline").disabled = true;
            if (upresneniPolygon == true) {
                upresneniPolygon = false;
                if (app.drawAttach.activeAction) { 
                    app.drawAttach.reset(); 
                }
                if (app.graphics_coord_layer.graphics) {
                    app.graphics_coord_layer.graphics.forEach((mygraphics) => {
                        if (mygraphics.mujtyp) {
                            if (mygraphics.mujtyp == "hlaseni_temp") { app.graphics_coord_layer.graphics.remove(mygraphics); }
                        }
                    });
                }
                app.activeView.cursor = "default";
                app.enabledPopup = true;
                document.getElementById("upresneniGeometriePolygon").innerHTML = "<span class='esri-icon-polygon'></span>";
                document.getElementById("upresneniGeometriePolyline").disabled = false;
                return;
            }
            upresneniPolygon = true;
            app.activeView.cursor = "crosshair";
            app.activeView.popup.set({
                visible: false
            });
            app.enabledPopup = false;
            if (app.graphics_coord_layer) {
                app.graphics_coord_layer.graphics.forEach((mygraphics) => {
                    if (mygraphics.mujtyp) {
                        if (mygraphics.mujtyp == "hlaseni_temp") { app.graphics_coord_layer.graphics.remove(mygraphics); }
                    }
                });
            }
            if (app.drawAttach.activeAction) { app.drawAttach.reset(); }
            var action = app.drawAttach.create("polygon", { mode: "click" });
            action.on("draw-complete", (evt) => { app.widgetHlasenichyb.drawingcomplete("polygon", evt.vertices); app.activeView.cursor = "default"; });
            action.on("vertex-add", (evt) => {
                app.widgetHlasenichyb.drawingtemp("polygon", evt.vertices);
            });
            action.on("vertex-remove", (evt) => {
                app.widgetHlasenichyb.drawingtemp("polygon", evt.vertices);
            });
            action.on("cursor-update", (evt) => {
                app.widgetHlasenichyb.drawingtemp("polygon", evt.vertices);
            });
        };

        app.widgetHlasenichyb.init = () => {            
            if (app.drawAttach.activeAction) { 
                app.drawAttach.complete();
                app.drawAttach.reset(); 
            }
            app.activeView.cursor = "default";
            app.enabledPopup = true;
        }

        app.widgetHlasenichyb.kreslenipolyline = () => {
            document.getElementById("upresneniGeometriePolyline").innerHTML = "<span class='esri-icon-close'></span>";
            document.getElementById("upresneniGeometriePolygon").disabled = true;
            if (upresneniLinie == true) {
                upresneniLinie = false;
                if (app.drawAttach.activeAction) { 
                    app.drawAttach.reset(); 
                }
                if (app.graphics_coord_layer.graphics) {
                    app.graphics_coord_layer.graphics.forEach((mygraphics) => {
                        if (mygraphics.mujtyp) {
                            if (mygraphics.mujtyp == "hlaseni_temp") { app.graphics_coord_layer.graphics.remove(mygraphics); }
                        }
                    });
                }
                app.activeView.cursor = "default";
                app.enabledPopup = true;
                document.getElementById("upresneniGeometriePolyline").innerHTML = "<span class='esri-icon-polyline'></span>";
                document.getElementById("upresneniGeometriePolygon").disabled = false;
                return;
            }
            upresneniLinie = true;
            app.activeView.cursor = "crosshair";
            app.activeView.popup.set({
                visible: false
            });
            app.enabledPopup = false;
            if (app.graphics_coord_layer) {
                app.graphics_coord_layer.graphics.forEach((mygraphics) => {
                    if (mygraphics.mujtyp) {
                        if (mygraphics.mujtyp == "hlaseni_temp") { app.graphics_coord_layer.graphics.remove(mygraphics); }
                    }
                });
            }

            if (app.drawAttach.activeAction) { app.drawAttach.reset(); }
            var action = app.drawAttach.create("polyline", { mode: "click" });
            action.on("draw-complete", (evt) => { app.widgetHlasenichyb.drawingcomplete("polyline", evt.vertices); app.activeView.cursor = "default"; });
            action.on("vertex-add", (evt) => {
                app.widgetHlasenichyb.drawingtemp("polyline", evt.vertices);
            });
            action.on("vertex-remove", (evt) => {
                app.widgetHlasenichyb.drawingtemp("polyline", evt.vertices);
            });
            action.on("cursor-update", (evt) => {
                app.widgetHlasenichyb.drawingtemp("polyline", evt.vertices);
            });
        };

        app.widgetHlasenichyb.smazatposledni = () => {
            if (app.graphics_coord_layer) {
                var pole = app.graphics_coord_layer.graphics.toArray();
                var mamjeden = 0;
                var pocetGrafik = 0;
                for (var i = pole.length - 1; i >= 0; i--) {
                    if (pole[i].mujtyp == "hlaseni_grafika" && mamjeden == 0) {
                        app.graphics_coord_layer.graphics.remove(pole[i]);
                        mamjeden = 1;
                    }
                }
                app.graphics_coord_layer.graphics.forEach((grafiky) => {
                    if (grafiky) {
                        if (grafiky.mujtyp == "hlaseni_grafika") {
                            pocetGrafik++;
                        }
                    }
                });
                if (pocetGrafik == 0) {
                    document.getElementById("upresneniGeometrieSmazatPosledni").disabled = true;
                }
            }
        };


        app.widgetHlasenichyb.sendMails = (email, mytempGraphic) => {
            function runAfterToken() {
                var zpravadodialogu1 = "";
                var zpravadodialogu2 = "";

                function zobrazUzivateliDialog() {
                    if (zpravadodialogu1 != "" && zpravadodialogu2 != "") {
                        //alert(zpravadodialogu1+zpravadodialogu2);             
                        if (zpravadodialogu1 != label[94] && zpravadodialogu2 != label[95]) {
                            alert(zpravadodialogu1 + zpravadodialogu2);
                        }
                    }
                    document.getElementById('odeslat').innerHTML = label[193];
                    document.getElementById("stav_hlaseni").style.display = "block";
                    document.getElementById("stav_hlaseni").style.animation = "none";
                    document.getElementById("stav_hlaseni").style.color = "green";
                    document.getElementById("stav_hlaseni").innerHTML = '<span class="esri-icon-grant"></span> ' + label[480];
                    document.getElementById('odeslat').disabled = false;
                };

                var seznampriloh = label[96];     //s ref. odkazy a odkazem na admin aplikaci pro nás
                var seznampriloh2 = label[96];   //bez ref. odkazů pro zadavatele
                var textmailu = label[97] + "<br /><br />";
                var mfea = mytempGraphic;

                var datum_id = new Date(mfea.attributes.datum_zalozeni);
                var datum_id_mesic = ((datum_id.getMonth() + 1) < 10) ? '0' + (datum_id.getMonth() + 1).toString() : datum_id.getMonth() + 1;
                var datum_id_den = (datum_id.getDate() < 10) ? '0' + (datum_id.getDate()).toString() : datum_id.getDate();
                //var id_jednaci=mfea.attributes.datum_zalozeni.getFullYear()+"-"+(mfea.attributes.datum_zalozeni.getMonth()+1)+"-"+mfea.attributes.datum_zalozeni.getDate();
                var id_jednaci = datum_id.getFullYear() + "-" + datum_id_mesic + "-" + datum_id_den;
                if (isNaN(mytempGraphic.attributes.objectid) == false) {
                    id_jednaci = id_jednaci + "_" + mytempGraphic.attributes.objectid;
                }
                textmailu = textmailu + label[98] + id_jednaci + "<br /><br />";
                var datovasada = "nic";
                if (mfea.attributes.datova_sada == "1") { datovasada = "ZABAGED"; }
                if (mfea.attributes.datova_sada == "15") { datovasada = "Základní topografická mapa"; }
                if (mfea.attributes.datova_sada == "2") { datovasada = "Základní mapa ČR 1 : 10 000"; }
                if (mfea.attributes.datova_sada == "3") { datovasada = "Základní mapa ČR 1 : 25 000"; }
                if (mfea.attributes.datova_sada == "4") { datovasada = "Základní mapa ČR 1 : 50 000"; }
                if (mfea.attributes.datova_sada == "5") { datovasada = "Základní mapa ČR 1 : 100 000"; }
                if (mfea.attributes.datova_sada == "6") { datovasada = "Základní mapa ČR 1 : 200 000"; }
                if (mfea.attributes.datova_sada == "7") { datovasada = "Mapa ČR 1 : 500 000"; }
                if (mfea.attributes.datova_sada == "8") { datovasada = "Mapa ČR 1 : 1 000 000"; }
                if (mfea.attributes.datova_sada == "9") { datovasada = "Data200"; }
                if (mfea.attributes.datova_sada == "10") { datovasada = "Názvosloví (Geonames)"; }
                if (mfea.attributes.datova_sada == "11") { datovasada = "Ortofoto"; }
                if (mfea.attributes.datova_sada == "12") { datovasada = "Správní a katastrální hranice ČR"; }
                if (mfea.attributes.datova_sada == "13") { datovasada = "NEVÍM"; }
                if (mfea.attributes.datova_sada == "14") { datovasada = "Jiné"; }

                if (mytempGraphic.attributes.idprilohy) {
                    seznampriloh = '<a href="' + appConfig.domain + '/arcgis3/rest/services/Hosted/Hlaseni_chyb/FeatureServer/0/' +
                        mytempGraphic.attributes.objectid + '/attachments/' + mytempGraphic.attributes.idprilohy + '">' + mytempGraphic.attributes.nazevprilohy + '</a>';
                    seznampriloh2 = mytempGraphic.attributes.nazevprilohy;
                }

                textmailu = textmailu + "Datová sada: " + datovasada + " (" + mfea.attributes.datova_sada + ")<br />";
                textmailu = textmailu + "Popis chyby: " + mfea.attributes.popis_chyby + "<br />";
                textmailu = textmailu + "Jméno a příjmení: " + mfea.attributes.jmeno_prijmeni + "<br />";
                textmailu = textmailu + "E-mail: " + email + "<br />";
                var mageometrii = "Ne";
                if (mytempGraphic.attributes.geometrie.length > 0) { mageometrii = "Ano"; }
                textmailu = textmailu + "Přiložena geometrie: " + mageometrii + "<br />";
                textmailu = textmailu + "Seznam příloh:<br />" + seznampriloh + "<br />" + "<br />";

                textmailu = textmailu + "<a href='http://a300400.katastr.int/admin?app=1&x=" + mfea.geometry.x.toFixed(2) + "&y=" + mfea.geometry.y.toFixed(2) + "'>Otevřít místo v administrátorské aplikaci</a><br>";
                textmailu = textmailu + "<a href='http://a300400.katastr.int/admin?app=geojson&x=" + mfea.geometry.x.toFixed(2) + "&y=" + mfea.geometry.y.toFixed(2) + "&i=" + mytempGraphic.attributes.objectid + "&d=" + encodeURI(mfea.attributes.popis_chyby) + "'>Stáhnout jako GeoJSON</a>";

                var mygp = appConfig.domain + "/arcgis/rest/services/HlaseniChyb/Email/GPServer/Email";
                geoprocessor.submitJob(mygp, { "SendTo": mfcpfc(mfcp[0], 3), "FromAddr": mfcpfc(mfcp[1], 3), "Subject": "ID: " + id_jednaci + " --- Chybové hlášení Geoportálu", "Text": textmailu, "User": mfcpfc(mfcp[2], 3), "Password": mfcpfc(mfcp[3], 3) }).then((jobInfo) => {
                    var options = {
                        statusCallback: (stav) => {
                            console.log(stav.jobStatus);
                        }
                    };
                    jobInfo.waitForJobCompletion(options).then((jobInfo) => {
                        console.log('odeslání e-mailu pracovníkům ZU skončeno s ' + jobInfo.jobStatus);
                        if (jobInfo.jobStatus == "job-succeeded") {
                            zpravadodialogu1 = label[94];
                        } else {
                            zpravadodialogu1 = label[99] + mfcp[4] + " .\n";
                        }
                        console.log(zpravadodialogu1);
                        zobrazUzivateliDialog();
                    }, (err) => {
                        console.log('chyba odeslání e-mailu pracovníkům ZU ' + jobInfo.jobStatus);
                        zpravadodialogu1 = label[100] + mfcp[4] + " .\n";
                        console.log(zpravadodialogu1);
                        zobrazUzivateliDialog();
                    });
                });
                //odeslání e-mailu na zadavatele      
                textmailu = "";
                textmailu = label[97] + "<br /><br />";
                textmailu = textmailu + label[101] + mfea.attributes.popis_chyby + "<br />";
                textmailu = textmailu + label[102] + mfea.attributes.jmeno_prijmeni + "<br />";
                textmailu = textmailu + "E-mail: " + email + "<br />";
                textmailu = textmailu + label[103] + "<br />" + seznampriloh2 + "<br />" + "<br />";

                textmailu = textmailu + label[98] + id_jednaci + "<br /><br />";
                textmailu = textmailu + label[104] + "<br /><br />";
                textmailu = textmailu + "<i>" + label[105] + "</i><br />";
                textmailu = textmailu + "<i>" + label[106] + "</i><br />";

                var mygp = appConfig.domain + "/arcgis/rest/services/HlaseniChyb/Email/GPServer/Email";
                geoprocessor.submitJob(mygp, { "SendTo": email, "FromAddr": mfcpfc(mfcp[1], 3), "Subject": label[107] + " - ID: " + id_jednaci, "Text": textmailu, "User": mfcpfc(mfcp[2], 3), "Password": mfcpfc(mfcp[3], 3) }).then((jobInfo) => {
                    var options = {
                        statusCallback: (stav) => {
                            console.log(stav.jobStatus);
                        }
                    };
                    jobInfo.waitForJobCompletion(options).then((jobInfo) => {
                        console.log('odeslání e-mailu zadavateli skončeno s ' + jobInfo.jobStatus);
                        if (jobInfo.jobStatus == "job-succeeded") {
                            zpravadodialogu2 = label[95];
                        } else {
                            zpravadodialogu2 = label[108];
                        }
                        console.log(zpravadodialogu2);
                        zobrazUzivateliDialog();
                    }, (err) => {
                        console.log('chyba odeslání e-mailu zadavateli ' + jobInfo.jobStatus);
                        zpravadodialogu2 = label[108];
                        console.log(zpravadodialogu2);
                        zobrazUzivateliDialog();
                    });
                });
            }
            app.prover_tokenR().then(() => {
                runAfterToken();
            }, (err) => {
                console.log(err);
                document.getElementById('odeslat').innerHTML = label[193];
                document.getElementById('odeslat').disabled = false;
                alert(label[383]);
            });
        };

        app.widgetHlasenichyb.sendAttachments = (vrstva, email, mytempGraphic) => {
            if (document.getElementById("priloha").value != "") {
                var form = document.getElementById("uploadattform");
                var formData = new FormData(form);
                vrstva.addAttachment(mytempGraphic, formData).then((result) => {
                    console.log("attachment added: ", result);
                    if (app.graphics_coord_layer) {
                        app.graphics_coord_layer.graphics.forEach((mygraphics) => {
                            if (mygraphics.mujtyp) {
                                if (mygraphics.mujtyp == "hlaseni_odeslane") {
                                    mygraphics.attributes.idprilohy = result.objectId;
                                    mygraphics.attributes.globIdprilohy = result.globalId;
                                }
                            }
                        });
                    }
                    mytempGraphic.attributes.idprilohy = result.objectId;
                    app.widgetHlasenichyb.sendMails(email, mytempGraphic);  //uvnitř sendmails je i závěrečný dialog pro uživatele
                })
                    .catch((err) => {
                        console.log("attachment adding failed: ", err);
                        alert(label[110]);
                        app.widgetHlasenichyb.sendMails(email, mytempGraphic);
                    });
            } else {
                //alert("Záznam byl uložen (příloha nebyla zadána).");
                app.widgetHlasenichyb.sendMails(email, mytempGraphic);  //uvnitř sendmails je i závěrečný dialog pro uživatele  
            }
        };


        app.widgetHlasenichyb.odeslat = (bodchyby, geostring) => {
            var popis_chyby = document.getElementById('popisChyby').value.trim();
            var jmeno = document.getElementById('jmeno').value.trim();
            var email = document.getElementById('email').value.trim();
            var kdejechyba = document.getElementById('kdejechyba').value.trim();
            var cekamnatoken=appConfig.getMytoken('e');
        cekamnatoken.then(function(response) {

            var myFLayer = new FeatureLayer({
                url: appConfig.domain + "/arcgis3/rest/services/Hosted/Hlaseni_chyb/FeatureServer/0",
                outFields: ["*"],
                objectIdField: "objectid"
            });
            myFLayer.load().then((mylayer) => {
                var loadedLayer = mylayer.loaded;
                if (mylayer.loadError) {
                    alert("Chyba při připojování k datové vrstvě.");
                } else {
                    var myAttr = {
                        "popis_chyby": popis_chyby,
                        "jmeno_prijmeni": jmeno,
                        "email": changeVT(email),
                        "datova_sada": kdejechyba,
                        "organizace": "Zadáno z geoprohlížeče API4.",
                        "stav": "1",
                        "poznamka_ke_stavu": "",
                        "datum_zalozeni": new Date().getTime(),
                        "geometrie": geostring
                    };

                    var x = bodchyby.x;
                    var y = bodchyby.y;

                    var myBod = new Point({ x: x, y: y, spatialReference: new SpatialReference({ wkid: 102067, latestWkid: 5514 }), hasZ: false });

                    var mytempGraphic = new Graphic({
                        geometry: myBod,
                        attributes: myAttr
                    });
                    var edits = {
                        addFeatures: [mytempGraphic]
                    };
                    var prilohadiv = document.getElementById("priloha").value;
                    var nazevprilohy = "";
                    if (prilohadiv.length > 0) {
                        var nazevprilohyparts = document.getElementById("priloha").value.split(String.fromCharCode(92));
                        nazevprilohy = nazevprilohyparts[nazevprilohyparts.length - 1];
                    }

                    mylayer.applyEdits(edits).then((response) => {
                        console.log(response);
                        var isok = 0;
                        if (response.addFeatureResults) {
                            if (response.addFeatureResults.length == 1) {
                                if (response.addFeatureResults[0].error === null) {
                                    isok = 1;
                                }
                            }
                        }
                        if (isok == 1) {
                            console.log("upload attachments if is some");
                            mytempGraphic.attributes.objectid = response.addFeatureResults[0].objectId;
                            mytempGraphic.attributes.globalid = response.addFeatureResults[0].globalId;
                            mytempGraphic.attributes.idprilohy = undefined;
                            mytempGraphic.attributes.nazevprilohy = nazevprilohy;
                            if (app.graphics_coord_layer) {
                                app.graphics_coord_layer.graphics.forEach((bodvmape) => {
                                    if (bodvmape.mujtyp) {
                                        if (bodvmape.mujtyp == "hlaseni_bod") {
                                            bodvmape.mujtyp = "hlaseni_odeslane";
                                            bodvmape.symbol = {
                                                type: "text", // autocasts as new TextSymbol()
                                                color: [255, 0, 0, 1],
                                                text: "\ue61d", // esri-icon-map-pin
                                                font: {
                                                    size: 25,
                                                    family: "calcite-web-icons" // Esri Icon Font
                                                },
                                                haloColor: "white",
                                                haloSize: "3px"
                                            };
                                            bodvmape.attributes = {
                                                "popis_chyby": popis_chyby,
                                                "jmeno_prijmeni": jmeno,
                                                "email": email,
                                                "datova_sada": kdejechyba,
                                                "organizace": "Zadáno z geoprohlížeče API4.",
                                                "stav": "1",
                                                "poznamka_ke_stavu": "",
                                                "datum_zalozeni": new Date().getTime(),
                                                "geometrie": geostring
                                            };
                                            bodvmape.attributes.objectid = response.addFeatureResults[0].objectId;
                                            bodvmape.attributes.globalid = response.addFeatureResults[0].globalId;
                                            bodvmape.attributes.idprilohy = undefined;
                                            bodvmape.attributes.globIdprilohy = undefined;
                                            bodvmape.attributes.nazevprilohy = nazevprilohy;
                                        }
                                    }
                                });
                                var pole = app.graphics_coord_layer.graphics.toArray();
                                for (var i = pole.length - 1; i >= 0; i--) {
                                    if (pole[i].mujtyp == "hlaseni_temp" || pole[i].mujtyp == "hlaseni_grafika") {
                                        app.graphics_coord_layer.graphics.remove(pole[i]);
                                    }
                                }
                            }
                            app.widgetHlasenichyb.sendAttachments(mylayer, email, mytempGraphic);  //uvnitř sendmails je i závěrečný dialog pro uživatele
                        } else {
                            alert(label[111]);
                            console.log("Data byla odeslána ale uložení se nezdařilo (success=false).");
                            document.getElementById('odeslat').innerHTML = label[193];
                            document.getElementById("stav_hlaseni").style.display = "block";
                            document.getElementById("stav_hlaseni").style.animation = "none";
                            document.getElementById("stav_hlaseni").style.color = "red";
                            document.getElementById("stav_hlaseni").innerHTML = '<span class="esri-icon-error"></span> ' + label[482];
                        }

                    }).catch((error) => {
                        alert(label[111]);
                        console.error(
                            "[ applyEdits ] FAILURE: ",
                            error.code,
                            error.name,
                            error.message
                        );
                        console.log("error = ", error);
                        document.getElementById('odeslat').innerHTML = label[193];
                        document.getElementById("stav_hlaseni").style.display = "block";
                        document.getElementById("stav_hlaseni").style.animation = "none";
                        document.getElementById("stav_hlaseni").style.color = "red";
                        document.getElementById("stav_hlaseni").innerHTML = '<span class="esri-icon-error"></span> ' + label[482];
                        document.getElementById('odeslat').disabled = false;
                    });
                }
            });
            });
        };

        app.widgetHlasenichyb.kontrolaaodeslani = () => {
            var popis_chyby = document.getElementById('popisChyby').value.trim();
            var jmeno = document.getElementById('jmeno').value.trim();
            var email = document.getElementById('email').value.trim();
            var kdejechyba = document.getElementById('kdejechyba').value.trim();
            var geostring = app.widgetHlasenichyb.sestavatributsgeometrii();
            var odeslanejmeno = jmeno;
            var mambod = 0;
            var znacka;
            if (app.graphics_coord_layer) {
                app.graphics_coord_layer.graphics.forEach((mygraphics) => {
                    if (mygraphics.mujtyp) {
                        if (mygraphics.mujtyp == "hlaseni_bod") {
                            znacka = mygraphics;
                            mambod = 1;
                        }
                    }
                });
            }
            if (mambod == 0) {
                alert(label[112]);
            }
            else if (kdejechyba == "nic") {
                alert(label[604]);
            }
            else if (email.length == 0) {
                alert(label[113]);
            }
            else if (email.indexOf("@") == -1) {
                alert(label[114]);
            }
            else if (email.indexOf(".") == -1) {
                alert(label[115]);
            }
            else if (!odeslanejmeno) {
                document.getElementById('jmeno').value = "Nezadáno";
                app.widgetHlasenichyb.kontrolaaodeslani();
            }
            else if (popis_chyby.length == 0) {
                alert(label[116]);
            }
            else if (popis_chyby.length <= 1) {
                alert(label[117]);
            }
            else if (geostring.length > 4999) {
                //alert("Nakreslené geometrie obsahují příliš mnoho vrcholů. Upravte geometrie.");
            }
            else if (document.getElementById('souhlas').checked == true) {
                document.getElementById('odeslat').innerHTML = label[481];
                document.getElementById('odeslat').disabled = true;
                if (app.activeView.spatialReference.wkid == 5514 || app.activeView.spatialReference.wkid == 102067) {
                    app.widgetHlasenichyb.odeslat(znacka.geometry, geostring);
                } else {
                    sstransffce(app.activeView.spatialReference.wkid, 5514, znacka.geometry.x, znacka.geometry.y).then((response) => {
                        app.widgetHlasenichyb.odeslat({ x: response.x, y: response.y }, geostring);
                    }, (err) => {
                        console.log("Bod chyby se nepodařilo převézt do JTSK souř. systému. Záznam nebyl odeslán.");
                        document.getElementById('odeslat').innerHTML = label[193];
                        document.getElementById("stav_hlaseni").style.display = "block";
                        document.getElementById("stav_hlaseni").style.animation = "none";
                        document.getElementById("stav_hlaseni").style.color = "red";
                        document.getElementById("stav_hlaseni").innerHTML = '<span class="esri-icon-error"></span> ' + label[482];
                    });
                }
            }
            else {
                alert(label[118]);
            }
        };

        app.widgetHlasenichyb.sestavatributsgeometrii = () => {
            var textGeom = "";
            if (app.graphics_coord_layer) {
                app.graphics_coord_layer.graphics.forEach((mygraphic) => {
                    if (mygraphic.mujtyp) {
                        if (mygraphic.mujtyp == "hlaseni_grafika") {
                            if (mygraphic.geometry.type == 'polyline') {
                                var textpath = "[[";
                                var i;
                                for (i = 0; i < mygraphic.geometry.paths[0].length; i++) {
                                    if (i > 0) { textpath = textpath + ","; }
                                    textpath = textpath + "[" + (-1 * mygraphic.geometry.paths[0][i][0]).toFixed(2) + "," + (-1 * mygraphic.geometry.paths[0][i][1]).toFixed(2) + "]";
                                }
                                textpath = textpath + "]]";
                                if (textGeom.length > 0) { textGeom = textGeom + ","; }
                                textGeom = textGeom + '{"g":{"t":"' + mygraphic.geometry.type + '","p":' + textpath + '},"a":{"c":"' + mygraphic.attributes.color + '"}}';
                            }
                            if (mygraphic.geometry.type == 'polygon') {

                                var textpath = "[[";
                                var i;
                                for (i = 0; i < mygraphic.geometry.rings[0].length; i++) {
                                    if (i > 0) { textpath = textpath + ","; }
                                    textpath = textpath + "[" + (-1 * mygraphic.geometry.rings[0][i][0]).toFixed(2) + "," + (-1 * mygraphic.geometry.rings[0][i][1]).toFixed(2) + "]";
                                }
                                textpath = textpath + "]]";
                                if (textGeom.length > 0) { textGeom = textGeom + ","; }
                                textGeom = textGeom + '{"g":{"t":"' + mygraphic.geometry.type + '","r":' + textpath + '},"a":{"c":"' + mygraphic.attributes.color + '"}}';
                            }
                        }
                    }
                });
            }
            if (textGeom.length > 0) {
                geometrie_str = "[" + textGeom + "]";
            } else {
                geometrie_str = "";
            }

            if (geometrie_str.length > 4999) {
                alert(label[119]);
            }
            return geometrie_str;
        };

        // main
        var mfcp = [];
        app.drawAttach = new Draw({
            view: app.mapView
        });
        app.drawAttach.reset();

        var mfcpfc = (value, j) => { var result = ""; for (i = 0; i < value.length; ++i) { result += String.fromCharCode(j ^ value.charCodeAt(i)); }; return result; }
        var changeVT = (value) => {

            if (value != null) {
                var t1 = ""; var t2 = ""; var t3 = ""; var tmp = ""; var i; var policko = [3, 8, 1, 9, 7, 6, 4];
                for (i = 0; i < value.length; ++i) { t1 += String.fromCharCode(policko[i % policko.length] ^ value.charCodeAt(i)); }
                t1.replace(/_/g, "%095");
                for (i = 0; i < t1.length; i++) {
                    if (t1.charCodeAt(i) < 48 || (t1.charCodeAt(i) > 57 && t1.charCodeAt(i) < 65) || (t1.charCodeAt(i) > 90 && t1.charCodeAt(i) < 97) || t1.charCodeAt(i) > 122) {
                        tmp = t1.charCodeAt(i).toString();
                        if (tmp.length < 3) { tmp = "0" + tmp; }
                        if (tmp.length < 3) { tmp = "0" + tmp; }
                        t2 += "_" + tmp;
                    } else { t2 += t1.substr(i, 1); }
                }
                var ft = t2.split("");
                for (i = 1; i < ft.length / 2; i = i + 2) { tmp = ft[i]; ft[i] = ft[ft.length - i]; ft[ft.length - i] = tmp; }
                for (i = 0; i < ft.length - 1; i = i + 2) { tmp = ft[i]; ft[i] = ft[i + 1]; ft[i + 1] = tmp; }
                for (i = 0; i < ft.length; i++) { t3 += ft[i]; }
                return t3;
            } else {
                return value;
            }
        };
        mfcp[0] = "bmwlmjm-ab`lC`vyh-dlu-`y8wlnbp-mfnf`fhC`vyh-dlu-`y";
        //mfcp[0] = "sfwq-`fqufmzC`vyh-`y8bmwlmjm-ab`lC`vyh-`y8alkvnjo-uo`fhC`vyh-`y8wlnbp-mfnf`fhC`vyh-`y"; + petr a vlček
        mfcp[1] = "kobpfmj`kzaC`vyh-dlu-`y";
        mfcp[2] = "Kobpj`@kza";
        mfcp[3] = "Rh1,iwQN60tWa";

        document.getElementById('barvaCervena').onclick = () => { app.widgetHlasenichyb.barva = [200, 0, 0]; app.widgetHlasenichyb.barva_t = "Red"; document.getElementById('barvaCervena').innerHTML = '&#10003'; document.getElementById('barvaModra').innerHTML = ''; document.getElementById('barvaZelena').innerHTML = ''; };
        document.getElementById('barvaModra').onclick = () => { app.widgetHlasenichyb.barva = [54, 132, 180]; app.widgetHlasenichyb.barva_t = "Blue"; document.getElementById('barvaModra').innerHTML = '&#10003'; document.getElementById('barvaCervena').innerHTML = ''; document.getElementById('barvaZelena').innerHTML = ''; };
        document.getElementById('barvaZelena').onclick = () => { app.widgetHlasenichyb.barva = [115, 173, 33]; app.widgetHlasenichyb.barva_t = "Green"; document.getElementById('barvaZelena').innerHTML = '&#10003'; document.getElementById('barvaCervena').innerHTML = ''; document.getElementById('barvaModra').innerHTML = ''; };

        document.getElementById('lokalizaceChyby').onclick = app.widgetHlasenichyb.kreslenibodu;
        document.getElementById('zacitZnovu').onclick = app.widgetHlasenichyb.zacitZnovu;
        document.getElementById('odeslat').onclick = app.widgetHlasenichyb.kontrolaaodeslani;
        document.getElementById('upresneniGeometriePolygon').onclick = app.widgetHlasenichyb.kreslenipolygonu;
        document.getElementById('upresneniGeometriePolyline').onclick = app.widgetHlasenichyb.kreslenipolyline;
        document.getElementById('upresneniGeometrieSmazatPosledni').onclick = app.widgetHlasenichyb.smazatposledni;
    });
