var fyzOsoba = false;
var kresleniZapnutoVyjadreni = false;
var sketchVM;
var vrstvaEdit;
var novaGrafika;

document.getElementById("fyzickaOsoba").onclick = () => {
    fyzOsoba = true;
    document.getElementById("widgetVyjadreni").style.display = "block";
    document.getElementById("fyzickaOsobaDiv").style.display = "block";
    document.getElementById("vyjadreniRozhodnuti").style.display = "none";
    document.getElementById("udajeDiv").style.display = "block";
}

document.getElementById("pravnickaOsoba").onclick = () => {
    fyzOsoba = false;
    document.getElementById("widgetVyjadreni").style.display = "block";
    document.getElementById("pravnickaOsobaDiv").style.display = "block";
    document.getElementById("vyjadreniRozhodnuti").style.display = "none";
    document.getElementById("udajeDiv").style.display = "block";
}

function zacitZnovuVyjadreni() {
    document.getElementById("odeslatVyjadreni").disabled = true;
    document.getElementById("widgetVyjadreni").style.display = "none";
    document.getElementById("fyzickaOsobaDiv").style.display = "none";
    document.getElementById("pravnickaOsobaDiv").style.display = "none";
    document.getElementById("vyjadreniRozhodnuti").style.display = "block";
    document.getElementById("krestniJmeno").value = "";
    document.getElementById("prijmeni").value = "";
    document.getElementById("nazevFirmy").value = "";
    document.getElementById("ico").value = "";
    var pole = app.mapView.graphics.toArray();
    for (var i = pole.length - 1; i >= 0; i--) {
        if (pole[i].mujtyp == "nakreslenyProjekt") {
            app.mapView.graphics.remove(pole[i]);
        }
    }
    if (kresleniZapnutoVyjadreni == true) {
        app.polohaProjektu.mydraw.reset();
        document.getElementById("lokalizaceProjektu").innerHTML = "<span class='esri-icon-polygon fLeft'></span>" + label[425];
        app.activeView.cursor = "default";
        kresleniZapnutoVyjadreni = false;
    }
    if (sketchVM) {
        sketchVM.complete();
    }
    document.getElementById("editaceProjektu").classList.add("hidden");
}

require([
    "esri/Graphic",
    "esri/views/draw/Draw",
    'esri/rest/geoprocessor',
    "dojo/query",
    "esri/geometry/geometryEngineAsync",
    "esri/widgets/Sketch/SketchViewModel",
    "esri/layers/GraphicsLayer",
    "esri/rest/support/FeatureSet"], (Graphic, Draw, geoprocessor, query, geometryEngineAsync, SketchViewModel, GraphicsLayer, FeatureSet) => {
        app.polohaProjektu = {};
        query("#panelVyjadreni > div > div > a > span.esri-icon-close").on("click", (e) => {
            zacitZnovuVyjadreni();
        });

        app.polohaProjektu.mydraw = new Draw({
            view: app.mapView
        });

        app.polohaProjektu.drawingcompleteShape = (vertices) => {
            var pole = app.mapView.graphics.toArray();
            for (var i = pole.length - 1; i >= 0; i--) {
                if (pole[i].mujtyp == "nakreslenyProjekt") {
                    app.mapView.graphics.remove(pole[i]);
                }
            }
            var prvniVertex = {};
            prvniVertex[0] = vertices[0];
            var noveVertices = vertices.concat([prvniVertex[0]]);
            var graphic = new Graphic({
                geometry: {
                    type: "polygon", // autocasts as Polygon
                    rings: noveVertices,
                    spatialReference: app.mapView.spatialReference.clone()
                },
                symbol: {
                    type: "simple-fill", // autocasts as SimpleFillSymbol
                    color: "#204d74",
                    style: "diagonal-cross",
                    outline: {  // autocasts as SimpleLineSymbol
                        color: "#204d74",
                        width: 2,
                        style: "short-dash"
                    }
                },
                attributes: {
                    newDevelopment: "new store"
                }
            });
            graphic.mujtyp = "nakreslenyProjekt";
            app.mapView.graphics.add(graphic);
            geometryEngineAsync.planarArea(graphic.geometry, "square-kilometers").then((response) => {
                var planarArea = response.toFixed(0) * -1;
                if (planarArea >= 100) {
                    alert(label[571] + "\n\n" + planarArea + "km²");
                }
            });
            app.mapView.goTo(graphic)
            app.activeView.cursor = "default";
            app.polohaProjektu.mydraw.reset();
            kresleniZapnutoVyjadreni = false;
            app.enabledPopup = true;
            document.getElementById("lokalizaceProjektu").innerHTML = "<span class='esri-icon-polygon fLeft'></span>" + label[425];
            if (!app.polohaProjektu.jobId) {
                document.getElementById("odeslatVyjadreni").disabled = false;
            }
            query("#editaceProjektu").removeClass("hidden");
            if (app.mapView.widthBreakpoint == "xsmall" || app.mapView.widthBreakpoint == "small") {
                query("#udajeDiv, #fyzickaOsobaDiv, #pravnickaOsobaDiv").removeClass("hidden");
            }
        };

        app.polohaProjektu.drawing_temp = (vertices) => {
            kresleniZapnutoVyjadreni = true;
            if (vertices.length > 1) {
                var pole = app.mapView.graphics.toArray();
                for (var i = pole.length - 1; i >= 0; i--) {
                    if (pole[i].mujtyp == "nakreslenyProjekt") {
                        app.mapView.graphics.remove(pole[i]);
                    }
                }
                let graphic = new Graphic({
                    symbol: {
                        type: "simple-line",
                        color: "#204d74",
                        width: 2
                    }
                });;
                if (vertices.length == 2) {
                    graphic.geometry = {
                        type: "polyline",
                        paths: vertices
                    };
                } else {
                    graphic.geometry = {
                        type: "polygon",
                        rings: vertices
                    };
                }
                graphic.geometry.spatialReference = app.mapView.spatialReference.clone();
                graphic.mujtyp = "nakreslenyProjekt";
                app.mapView.graphics.add(graphic);
            }
        };

        app.polohaProjektu.kreslenipolygonu = (draw, view) => {
            if (kresleniZapnutoVyjadreni == true) {
                var pole = app.mapView.graphics.toArray();
                for (var i = pole.length - 1; i >= 0; i--) {
                    if (pole[i].mujtyp == "nakreslenyProjekt") {
                        app.polohaProjektu.drawingcompleteShape(pole[i].geometry.rings[0])
                    }
                }
            } else {
                if (app.mapView.widthBreakpoint == "xsmall" || app.mapView.widthBreakpoint == "small") {
                    query("#udajeDiv, #fyzickaOsobaDiv, #pravnickaOsobaDiv").addClass("hidden");
                }
                document.getElementById("odeslatVyjadreni").disabled = true;
                app.activeView.cursor = "crosshair";
                document.getElementById("lokalizaceProjektu").innerHTML = label[92];
                query("#editaceProjektu").addClass("hidden");
                kresleniZapnutoVyjadreni = true;
                app.enabledPopup = false;
                var pole = app.mapView.graphics.toArray();
                for (var i = pole.length - 1; i >= 0; i--) {
                    if (pole[i].mujtyp == "nakreslenyProjekt") {
                        app.mapView.graphics.remove(pole[i]);
                    }
                }
                var action = app.polohaProjektu.mydraw.create("polygon", { mode: "click" });
                action.on("vertex-add", (evt) => {
                    app.polohaProjektu.drawing_temp(evt.vertices);
                });
                action.on("cursor-update", (evt) => {
                    app.polohaProjektu.drawing_temp(evt.vertices);
                });

                action.on("vertex-remove", (evt) => {
                    app.polohaProjektu.drawing_temp(evt.vertices);
                });

                action.on("draw-complete", (evt) => {
                    app.polohaProjektu.drawingcompleteShape(evt.vertices);
                });
            }
        };

        app.polohaProjektu.editace = () => {
            if (!sketchVM) {
                if (app.mapView.widthBreakpoint == "xsmall" || app.mapView.widthBreakpoint == "small") {
                    query("#udajeDiv, #fyzickaOsobaDiv, #pravnickaOsobaDiv").addClass("hidden");
                }
                document.getElementById("odeslatVyjadreni").disabled = true;
                query("#lokalizaceProjektu").addClass("hidden");
                document.getElementById("editaceProjektu").innerHTML = label[577];
                var polygon = app.mapView.graphics.toArray();
                for (var i = polygon.length - 1; i >= 0; i--) {
                    if (polygon[i].mujtyp == "nakreslenyProjekt") {
                        vrstvaEdit = new GraphicsLayer({
                            graphics: [polygon[i]]
                        });
                    }
                }
                sketchVM = new SketchViewModel({
                    view: app.mapView,
                    layer: vrstvaEdit,
                    updateOnGraphicClick: true
                });
                sketchVM.update([vrstvaEdit.graphics.items[0]], {
                    tool: "reshape",
                    toggleToolOnClick: false
                });
                sketchVM.on("update", (event) => {
                    if (event.state == "active") {
                        novaGrafika = event.graphics[0];
                        vrstvaEdit.remove(event.graphics);
                        var graphic = new Graphic({
                            geometry: novaGrafika.geometry,
                            symbol: {
                                type: "simple-fill", // autocasts as SimpleFillSymbol
                                color: "#204d74",
                                style: "diagonal-cross",
                                outline: {  // autocasts as SimpleLineSymbol
                                    color: "#204d74",
                                    width: 2,
                                    style: "short-dash"
                                }
                            },
                        });
                        graphic.mujtyp = "nakreslenyProjekt";
                        app.mapView.graphics.removeAll();
                        app.mapView.graphics.add(graphic);
                        vrstvaEdit.removeAll();
                        vrstvaEdit.add(novaGrafika);
                    } else if (event.state == "ready" || event.state == "disabled" || event.state == "complete" || event.state == "cancel") {
                        sketchVM = null;
                        vrstvaEdit = null;
                        novaGrafika = null;
                        if (!app.polohaProjektu.jobId) {
                            document.getElementById("odeslatVyjadreni").disabled = false;
                        }
                        query("#lokalizaceProjektu").removeClass("hidden");
                        document.getElementById("editaceProjektu").innerHTML = label[576];
                        var pole = app.mapView.graphics.toArray();
                        for (var i = pole.length - 1; i >= 0; i--) {
                            if (pole[i].mujtyp == "nakreslenyProjekt") {
                                geometryEngineAsync.planarArea(pole[i].geometry, "square-kilometers").then((response) => {
                                    var planarArea = response.toFixed(0) * -1;
                                    if (planarArea >= 100) {
                                        alert(label[571] + "\n\n" + planarArea + "km²");
                                    }
                                });
                            }
                        }
                    }
                });
            } else {
                if (!app.polohaProjektu.jobId) {
                    document.getElementById("odeslatVyjadreni").disabled = false;
                }
                sketchVM.complete();
                if (app.mapView.widthBreakpoint == "xsmall" || app.mapView.widthBreakpoint == "small") {
                    query("#udajeDiv, #fyzickaOsobaDiv, #pravnickaOsobaDiv").removeClass("hidden");
                }
            }
        }

        app.polohaProjektu.odeslat = () => {
            var ohraniceniprojektu;
            var pole = app.mapView.graphics.toArray();
            for (var i = pole.length - 1; i >= 0; i--) {
                if (pole[i].mujtyp == "nakreslenyProjekt") {
                    ohraniceniprojektu = pole[i];
                }
            }
            if (!ohraniceniprojektu) {
                alert(label[184]);
                return;
            }
            if (app.mapView.spatialReference.wkid != 102067 && app.mapView.spatialReference.wkid != 5514) {
                alert("Vyjádření lze požadovat jen v souř. systém S-JTSK (EPSG 5514)");
                return;
            }
            if (document.getElementById("druh_stavby").value != "nic" && document.getElementById("druh_cinnosti").value != "nic") {
                if (fyzOsoba == true) {
                    if (document.getElementById("krestniJmeno").value.length == 0) {
                        alert(label[175]);
                        return;
                    }
                    else if (document.getElementById("prijmeni").value.length == 0) {
                        alert(label[176]);
                        return;
                    }
                    else if (document.getElementById("ulice").value.length == 0) {
                        alert(label[177]);
                        return;
                    }
                    else if (document.getElementById("cp").length == 0) {
                        alert(label[178]);
                        return;
                    }
                    else if (document.getElementById("obec").value.length == 0) {
                        alert(label[179]);
                        return;
                    }
                    else if (document.getElementById("psc").value.length == 0) {
                        alert(label[180]);
                        return;
                    }
                    else if (document.getElementById("vy_email").value.length == 0) {
                        alert(label[113]);
                        return;
                    }
                    else if (document.getElementById("vy_email").value.indexOf("@") == -1) {
                        alert(label[114]);
                        return;
                    }
                    else if (document.getElementById("vy_email").value.indexOf(".") == -1) {
                        alert(label[115]);
                        return;
                    }
                } else {
                    if (document.getElementById("nazevFirmy").value.length == 0) {
                        alert(label[181]);
                        return;
                    }
                    else if (document.getElementById("ico").value.length == 0) {
                        alert(label[182]);
                        return;
                    }
                    else if (document.getElementById("ico").value.length != 8) {
                        alert(label[183]);
                        return;
                    }
                    else if (document.getElementById("ulice").value.length == 0) {
                        alert(label[177]);
                        return;
                    }
                    else if (document.getElementById("cp").value.length == 0) {
                        alert(label[178]);
                        return;
                    }
                    else if (document.getElementById("obec").value.length == 0) {
                        alert(label[179]);
                        return;
                    }
                    else if (document.getElementById("psc").value.length == 0) {
                        alert(label[180]);
                        return;
                    }
                    else if (document.getElementById("vy_email").value.length == 0) {
                        alert(label[113]);
                        return;
                    }
                    else if (document.getElementById("vy_email").value.indexOf("@") == -1) {
                        alert(label[114]);
                        return;
                    }
                    else if (document.getElementById("vy_email").value.indexOf(".") == -1) {
                        alert(label[115]);
                        return;
                    }
                }
            } else {
                alert(label[174]);
                return;
            }

            let paramsObj = {
                "VstupniPolygon": new FeatureSet({
                    features: ohraniceniprojektu,
                    geometryType: "polygon"
                }),
                "Jmeno": document.getElementById('krestniJmeno').value,
                "Prijmeni": document.getElementById('prijmeni').value,
                "NazevFirmy": document.getElementById('nazevFirmy').value,
                "ICO": document.getElementById('ico').value,
                "Ulice": document.getElementById('ulice').value,
                "CisloPopisne": document.getElementById('cp').value,
                "Mesto": document.getElementById('obec').value,
                "PSC": document.getElementById('psc').value,
                "Email": document.getElementById('vy_email').value,
                "DruhStavby": document.getElementById('druh_stavby').value,
                "DruhStavebniCinnosti": document.getElementById('druh_cinnosti').value,
                "Poznamka": document.getElementById('poznamka').value,
                "format": "json"
            };

            app.polohaProjektu.gpserviceUrl = appConfig.domain + "/arcgis2/rest/services/Vyjadreni/VyjadreniDBP/GPServer/VyjadreniDBP";
            app.polohaProjektu.jobId = null;
            document.getElementById("odeslatVyjadreni").innerHTML = label[186] + ' <span id="stav_vyjadreni_prubeh" class="esri-icon-loading-indicator"></span>';
            document.getElementById("odeslatVyjadreni").disabled = true;
            document.getElementById("stav_vyjadreni").style.display = "none";

            function runAfterToken() {
                geoprocessor.submitJob(app.polohaProjektu.gpserviceUrl, paramsObj).then((jobInfo) => {
                    app.polohaProjektu.statuscykle = 0;
                    app.polohaProjektu.jobId = jobInfo.jobId;
                    var options = {
                        statusCallback: app.polohaProjektu.statusCallback
                    };
                    jobInfo.waitForJobCompletion(options).then((jobInfo) => {
                        console.log(jobInfo.jobStatus);
                        if (jobInfo.jobStatus == "job-succeeded") {
                            app.polohaProjektu.jobId = null;
                            document.getElementById("odeslatVyjadreni").disabled = false;
                            document.getElementById("odeslatVyjadreni").innerHTML = label[193];
                            document.getElementById("stav_vyjadreni").style.display = "block";
                            document.getElementById("stav_vyjadreni").style.animation = "none";
                            document.getElementById("stav_vyjadreni").style.color = "green";
                            document.getElementById("stav_vyjadreni").innerHTML = '<span class="esri-icon-grant"></span> ' + label[187];
                        } else {
                            app.polohaProjektu.onJobFailed(jobInfo);
                        }
                    }).catch((err) => {
                        console.log(err);
                        app.polohaProjektu.onJobFailed(err);
                    });
                }, (err) => {
                    console.log(err);
                    app.polohaProjektu.jobId = null;
                    document.getElementById("odeslatVyjadreni").disabled = false;
                    document.getElementById("odeslatVyjadreni").innerHTML = label[193];
                    document.getElementById("stav_vyjadreni").style.display = "block";
                    document.getElementById("stav_vyjadreni").style.animation = "none";
                    document.getElementById("stav_vyjadreni").style.color = "red";
                    document.getElementById("stav_vyjadreni").innerHTML = '<span class="esri-icon-error"></span> ' + label[188];
                });
            }

            app.prover_tokenG().then(() => {
                runAfterToken();
            }, (err) => {
                console.log(err);
                alert(label[383]);
            });
        };

        app.polohaProjektu.onJobFailed = (jobInfo) => {
            app.polohaProjektu.jobId = null;
            typchyby = 0;
            document.getElementById("odeslatVyjadreni").disabled = false;
            document.getElementById("odeslatVyjadreni").innerHTML = label[193];
            document.getElementById("stav_vyjadreni").style.display = "block";
            document.getElementById("stav_vyjadreni").style.animation = "none";
            document.getElementById("stav_vyjadreni").style.color = "red";
            document.getElementById("stav_vyjadreni").innerHTML = '<span class="esri-icon-error"></span> ' + label[188];
            var chybapolygon;
            var chybaemail;
            for (var j = 0; j < jobInfo.messages.length; j++) {
                if (jobInfo.messages[j].description.search('mimo území ČR') >= 0) { typchyby = 1 };
                if (jobInfo.messages[j].description.search('Emailová adresa') >= 0 && jobInfo.messages[j].description.search('nepovolené znaky') >= 0) { typchyby = 2; chybaemail = j };
                if (jobInfo.messages[j].description.search("WFS služba DBP je nedostupná") >= 0) { typchyby = 3 };
                if (jobInfo.messages[j].description.search("Plocha zájmového území") >= 0) { typchyby = 4; chybapolygon = j };
                if (jobInfo.messages[j].description.search("nedostupnosti WFS služby") >= 0) { typchyby = 5 };
            }

            switch (typchyby) {
                case -1:
                    console.log(jobInfo.messages);
                    break;
                case 0:
                    { alert(label[188]) };
                    for (j = 0; j < jobInfo.messages.length; j++) {
                        console.log("Message č. " + j + " - " + jobInfo.messages[j].type + " : " + jobInfo.messages[j].description);
                    };
                    console.log("Job status :" + jobInfo.jobStatus);
                    break;
                case 1:
                    { alert(label[189]) };
                    break;
                case 2:
                    { alert(jobInfo.messages[chybaemail].description + ". \n\n" + label[190]) };
                    break;
                case 3:
                    { alert(label[191]) };
                    break;
                case 4:
                    { alert(jobInfo.messages[chybapolygon].description + ". \n\n" + label[192]) };
                    break;
                case 5:
                    { alert(label[191]) };
                    break;
            };
        }

        app.polohaProjektu.statusCallback = (jobInfo) => {
            if (jobInfo.jobStatus == "job-executing" && jobInfo.jobId == app.polohaProjektu.jobId) {
                var tt = "";
                app.polohaProjektu.statuscykle++;
                if (app.polohaProjektu.statuscykle > 10) { app.polohaProjektu.statuscykle = 0 }
                var j;
                for (j = 0; j <= app.polohaProjektu.statuscykle; j++) {
                    tt = tt + ".";
                }
                console.log(tt);
            }
        };
    });