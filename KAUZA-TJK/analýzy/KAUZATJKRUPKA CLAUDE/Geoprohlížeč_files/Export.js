require([
    "esri/rest/geoprocessor",
    "esri/geometry/Polygon",
    "esri/Graphic",
    "esri/geometry/geometryEngineAsync",
    "esri/rest/support/FeatureSet",
    "esri/layers/MapImageLayer",
    "esri/views/draw/Draw",
    "esri/request",
    "esri/geometry/projection",
    "esri/core/reactiveUtils",
    "dojo/query",
    "dijit/Tooltip",
    "dojo/domReady!"
], (
    geoprocessor,
    Polygon,
    Graphic,
    geometryEngineAsync,
    FeatureSet,
    MapImageLayer,
    Draw,
    esriRequest,
    projection,
    reactiveUtils,
    query,
    Tooltip
) => {
    app.export = {};
    app.export.id = "";
    app.draw = new Draw({
        view: app.activeView
    });
    app.export.zavrit = () => {
        if (app.export.watchLimit) app.export.watchLimit.remove();
        let pole = app.mapView.graphics.toArray();
        for (let i = pole.length - 1; i >= 0; i--) {
            if (pole[i].mujtyp == "kresleniExport") app.mapView.graphics.remove(pole[i]);
        };
        if (app.export.id != "") alert(label[666]);
        app.removeDiv(['widgetExport']);
        app.enabledPopup = true;
    }

    app.export.limits = {
        "Ortofoto": 40,
        "ZTM5": 40,
        "DBP": 40,
        "ZTM10": 100,
        "Zabaged": 100,
        "Vrstevnice": 100,
        "ZTM25": 200,
        "DMR5G": 200,
        "DMR4G": 200,
        "DMP1G": 200,
        "DMPOK": 200,
        "INSPIRE_EL_GRID": 200,
        "ZTM50": 1000,
        "Data50": 1000,
        "ZTM100": 2000,
        "Data250": 2000,
        "Geonames": 2000
    }

    app.export.remove = () => {
        let pole = app.mapView.graphics.toArray();
        for (let i = pole.length - 1; i >= 0; i--) {
            if (pole[i].mujtyp == "kresleniExport") app.mapView.graphics.remove(pole[i]);
        };
        query("#exportOdstranit").addClass("hidden");
        query(".exportLocalBtn, #exportKreslit").removeAttr("disabled");
        document.getElementById("exportInfo").innerHTML = label[670];
        app.export.watchLimitFunc();
        app.export.getPolygon()
    }

    app.export.advanced = () => {
        query("#exportAdvanced").toggleClass("esri-icon-down esri-icon-up");
        query("#exportKreslitDiv").toggleClass("hidden");
    };

    app.export.localData = (id, feature) => {
        let pole = app.mapView.graphics.toArray();
        for (let i = pole.length - 1; i >= 0; i--) {
            if (pole[i].mujtyp == "kresleniExport") app.mapView.graphics.remove(pole[i]);
        };
        let graphic = app.mapView.map.findLayerById(id).source.items[Number(feature)];
        graphic.symbol = {
            type: "simple-fill",
            color: [4, 90, 141],
            style: "diagonal-cross",
            outline: {
                color: [4, 90, 141],
                width: 3
            }
        }
        graphic.mujtyp = "kresleniExport";
        app.mapView.graphics.add(graphic);
        app.export.controlLimit(graphic);
        app.mapView.goTo(graphic);
        document.getElementById("exportKreslit").disabled = true;
        query(".exportLocalBtn").attr("disabled", "true");
        query("#exportOdstranit").removeClass("hidden");
        document.getElementById("exportInfo").innerHTML = label[682];
        app.export.advanced();
    }

    app.export.localSearchData = (id) => {
        if (id != "search") {
            let layer = app.activeView.map.findLayerById("resultsLayerGrafics");
            if (!layer) {
                return;
            } else {
                let graphic = new Graphic();
                graphic.geometry = layer.graphics.items[id].geometry;
                graphic.symbol = {
                    type: "simple-fill",
                    color: [4, 90, 141],
                    style: "diagonal-cross",
                    outline: {
                        color: [4, 90, 141],
                        width: 3
                    }
                }
                graphic.mujtyp = "kresleniExport";
                app.mapView.graphics.add(graphic);
                app.mapView.goTo(graphic);
            }
        } else {
            let searchW = app.mapView.ui.find("search")
            if (searchW?.selectedResult?.feature?.geometry?.type == "polygon") {
                let graphic = new Graphic();
                graphic.geometry = searchW.selectedResult.feature.geometry;
                graphic.symbol = {
                    type: "simple-fill",
                    color: [4, 90, 141],
                    style: "diagonal-cross",
                    outline: {
                        color: [4, 90, 141],
                        width: 3
                    }
                }
                graphic.mujtyp = "kresleniExport";
                app.mapView.graphics.add(graphic);
                app.mapView.goTo(graphic);
            }

        }
        document.getElementById("exportKreslit").disabled = true;
        query(".exportLocalBtn").attr("disabled", "true");
        query("#exportOdstranit").removeClass("hidden");
        document.getElementById("exportInfo").innerHTML = label[688];
        app.export.advanced();
        app.export.watchLimitFunc();
    }

    app.export.localDataPopup = (fromPopup) => {
        let pole = app.mapView.graphics.toArray();
        for (let i = pole.length - 1; i >= 0; i--) {
            if (pole[i].mujtyp == "kresleniExport") app.mapView.graphics.remove(pole[i]);
        };
        let graphic = app.activeView.popup.selectedFeature;
        graphic.symbol = {
            type: "simple-fill",
            color: [4, 90, 141],
            style: "diagonal-cross",
            outline: {
                color: [4, 90, 141],
                width: 3
            }
        }
        graphic.mujtyp = "kresleniExport";
        app.mapView.graphics.add(graphic);
        app.export.controlLimit(graphic);
        app.mapView.goTo(graphic);
        document.getElementById("exportKreslit").disabled = true;
        document.getElementById("exportLocalPopupPolygon").disabled = true;
        app.activeView.popup.visible = false;
        query(".exportLocalBtn").attr("disabled", "true");
        query("#exportOdstranit").removeClass("hidden");
        document.getElementById("exportInfo").innerHTML = label[682];
        if (!fromPopup) app.export.advanced();
    }

    app.export.getPolygon = () => {
        let layers = app.mapView.map.layers.toArray();
        let count = 0;
        if (layers.length == 0) document.getElementById("exportLocalPolygon").innerHTML = label[684];
        for (let i = 0; i < layers.length; i++) {
            if (layers[i].type == "feature" && !layers[i].url && layers[i].source) {
                if (i == layers.length - 1 && layers[i].source.length == 0 && count == 0) {
                    document.getElementById("exportLocalPolygon").innerHTML = label[684];
                } else {
                    document.getElementById("exportLocalPolygon").innerHTML = "";
                    if (layers[i].source.length >= 1) {
                        for (let ii = 0; ii < layers[i].source.items.length; ii++) {
                            if (layers[i].source.items[ii].geometry.type == "polygon") {
                                document.getElementById("exportLocalPolygon").innerHTML += "<button type=\"button\" class=\"btn btn-primary btn-block exportLocalBtn\" onclick=\"app.export.localData('" + layers[i].id.toString() + "', '" + ii + "');\" style=\"margin-bottom: 10px;\"><span class=\"esri-icon-right-arrow fLeft\"></span>" + label[681] + " <span style='font-style: italic;'>" + layers[i].title + " (" + (ii + 1) + ")</span></button>";
                                count++;
                            }
                        }
                    } else {
                        if (i == layers.length - 1 && count == 0) document.getElementById("exportLocalPolygon").innerHTML = label[684];
                    }
                }
            } else {
                if (i == layers.length - 1 && count == 0) document.getElementById("exportLocalPolygon").innerHTML = label[684];
            }
        };
        let layer = app.activeView.map.findLayerById("resultsLayerGrafics");
        let count2 = 0;
        if (!layer) {
            document.getElementById("exportLocalSearch").innerHTML = label[684];
        } else {
            if (layer.graphics.items.length != 0) {
                document.getElementById("exportLocalSearch").innerHTML = "";
                for (var i = 0; i < layer.graphics.items.length; i++) {
                    if ((layer.graphics.items[i].typ == "ruian" || layer.graphics.items[i].typ == "parcela") && layer.graphics.items[i].geometry.type == "polygon") {
                        document.getElementById("exportLocalSearch").innerHTML += "<button type=\"button\" class=\"btn btn-primary btn-block exportLocalBtn\" onclick=\"app.export.localSearchData('" + i + "');\" style=\"margin-bottom: 10px;\"><span class=\"esri-icon-right-arrow fLeft\"></span>" + label[681] + " " + label[687] + " <span style='font-style: italic;'>" + (i + 1) + "</span></button>";
                        count2++;
                    }
                }
                if (count2 == 0) document.getElementById("exportLocalSearch").innerHTML = label[684];
            } else {
                document.getElementById("exportLocalSearch").innerHTML = label[684];
            }
        }
        let searchW = app.mapView.ui.find("search")
        if (searchW) {
            if (count2 == 0) document.getElementById("exportLocalSearch").innerHTML = "";
            if (searchW?.selectedResult?.feature?.geometry?.type == "polygon") {
                count2++;
                document.getElementById("exportLocalSearch").innerHTML += "<button type=\"button\" class=\"btn btn-primary btn-block exportLocalBtn\" onclick=\"app.export.localSearchData('search');\" style=\"margin-bottom: 10px;\"><span class=\"esri-icon-right-arrow fLeft\"></span>" + label[681] + " " + label[687] + " <span style='font-style: italic;'>" + count2 + "</span></button>";
            }
        }
    }

    app.export.widget = (produkt, kod) => {
        if (app.activeView.type != "2d") {
            alert(label[755]);
            return;
        }
        if (app.export.id != "") {
            alert(label[667]);
        } else {
            app.removeDiv(['widgetExport']);
            let isValid = false;
            let ids = ['Ortofoto', 'MCR500', 'MCR1M', 'Zabaged', 'Vrstevnice', 'Data50', 'Data250', 'DMR4G', 'DMR5G', 'DMP1G', 'DMPOK', 'INSPIRE_EL_GRID', 'DBP', 'GeomorfologickeJednotky', 'ZTM5', 'ZTM10', 'ZTM25', 'ZTM50', 'ZTM100', 'ZTM250', 'Geonames'];
            ids.forEach(element => {
                if (produkt == element) isValid = true;
            });
            if (isValid == false) {
                alert(label[383]);
                return;
            }
            query(".panel").removeClass("in");
            let obsahExport = "<div class='zadaniExport panel-body'><span style='float: right; cursor: pointer; padding: 2px;' class='esri-icon-close bold' onclick='app.export.zavrit()' title='" + label[325] + "'></span><span style='float: right; cursor: pointer; padding: 2px 10px 2px 2px;' class='esri-icon-dock-right bold hidden-xs' onclick='app.widgetReposition(widgetExport);' title='" + label[324] + "'></span><span style='float: right; padding-right: 10px;' class='hidden-xs'> | </span><span style='float: right; cursor: pointer; padding: 2px 10px 2px 2px;' class='esri-icon-question bold hidden-xs' title='" + label[323] + "' id='exportTooltip'></span>" +
                "<p style='font-weight: bold'>" + label[669] + "</p><input id='exportEmail' type='email' name='email' class='form-control' placeholder='E-mail' maxlength='100' /><hr>" +
                "<div id='exportAreaAlert' class='hidden'>" + label[673] + "</div>" +
                "<p id='exportInfo' style='margin-top: 10px; margin-bottom: 5px; font-weight: bold;'>" + label[670] + "</p>" +
                "<p style='margin-top: 10px; margin-bottom: 10px; cursor: pointer; color: #337ab7' class='bold' onclick='app.export.advanced();'>" + label[678] + "<span id='exportAdvanced' class='esri-icon-down bold' style='float: right; color: black;'></span></p>" +
                "<div id='exportKreslitDiv' class='hidden'>" +
                "<p style='font-weight: bold;'>" + label[491] + ":</p>" +
                "<button id='exportKreslit' type='button' class='btn btn-primary btn-block' onclick='app.export.kreslenipolygonu();' style='margin-bottom: 10px;'><span class='esri-icon-polygon fLeft'></span>" + label[677] + "</button><hr>" +
                "<button id='exportLocalPopupPolygon' type='button' class='btn btn-primary btn-block' onclick='app.export.localDataPopup();' style='margin-bottom: 10px;' disabled><span class='esri-icon-polygon fLeft'></span>" + label[241] + "</button><hr>" +
                "<p style='font-weight: bold;'>" + label[683] + ":</p>" +
                "<p id='exportLocalPolygon'></p>" +
                "<p style='font-size: 10px;'>" + label[685] + "</p><hr>" +
                "<p style='font-weight: bold;'>" + label[686] + ":</p>" +
                "<p id='exportLocalSearch'></p>" +
                "<p style='font-size: 10px;'>" + label[689] + "</p><hr>" +
                "<button id='exportOdstranit' type='button' class='btn btn-primary btn-block hidden' onclick='app.export.remove();' style='margin-bottom: 10px;'><span class='esri-icon-close fLeft'></span>" + label[38] + "</button>" +
                "</div>" +
                "<p id='exportFormat' style='font-weight: bold;'>" + label[46] + "</p>" +
                "<button id='exportExportovatData' type='button' class='btn btn-primary btn-block' onclick='app.export.pripravit(\"" + produkt + "\");'>" + label[668] + "<span class='esri-icon-collapse fRight'></span></button>" +
                "<button id='exportZastavitExport' type='button' class='btn btn-primary btn-block hidden' onclick='app.export.zastavit();'>" + label[671] + "</button>" +
                "<div id='exportVysledek' style='color: green; text-align: center;'></div></div>";
            let styl = "position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%); background-color: white; box-shadow: 0px 1px 2px rgba(0,0,0,0.3); min-width: 230px; max-height: 80%; overflow: auto; z-index: 5;";
            if (((localStorage.theme) && localStorage.theme != "default") && localStorage.theme == "dark") styl += "background-color: #4c4c4c; color: white;";

            let widgetExport = document.createElement("DIV");
            widgetExport.id = "widgetExport";
            widgetExport.className = "panel-collapse";
            widgetExport.style = styl;
            widgetExport.innerHTML = obsahExport;

            app.mapView.ui.add({
                component: widgetExport
            });

            new Tooltip({
                connectId: ["exportTooltip"],
                label: "<div style='width: 300px;'>" + label[722] + "</div>",
                showDelay: 50,
                hideDelay: 50,
                position: ["before", "after", "above", "below"]
            });
            app.enabledPopup = false;

            (app.activeView.popup?.visible && app.activeView.popup?.selectedFeature?.geometry?.type == "polygon") ? document.getElementById("exportLocalPopupPolygon").disabled = false : app.activeView.popup.visible = false;

            if (produkt == "Ortofoto" || produkt == "MCR500" || produkt == "MCR1M" || produkt == "ZTM5" || produkt == "ZTM10" || produkt == "ZTM25" || produkt == "ZTM50" || produkt == "ZTM100" || produkt == "ZTM250") {
                document.getElementById("exportFormat").innerHTML += "<select id='exportFormatValue' class='form-control' style='font-weight: normal;'>" +
                    "<option value='TIFF' selected>TIFF (+ " + label[672] + ")</option>" +
                    "<option value='JPEG'>JPEG (+ " + label[672] + ")</option>" +
                    "<option value='PNG'>PNG (+ " + label[672] + ")</option>" +
                    "<option value='BMP'>BMP (+ " + label[672] + ")</option>" +
                    "<option value='FGDB_RasterDataset'>" + label[680] + " (FGDB - Raster dataset)</option></select>";
            } else if (produkt == "Zabaged" || produkt == "Data50" || produkt == "Data250" || produkt == "Vrstevnice" || produkt == "Geonames" || produkt == "GeomorfologickeJednotky") {
                document.getElementById("exportFormat").innerHTML += "<select id='exportFormatValue' class='form-control' style='font-weight: normal;'>" +
                    "<option value='FGDB_FeatureClass' selected>" + label[680] + " (FGDB - Feature class)</option>" +
                    "<option value='Geopackage'>Geopackage</option>" +
                    "<option value='SHP'>Shapefile</option></select>";
            } else if (produkt == "INSPIRE_EL_GRID") {
                document.getElementById("exportFormat").innerHTML += "<select id='exportFormatValue' class='form-control' style='font-weight: normal;'>" +
                    "<option value='FGDB_FeatureClass' selected>" + label[680] + " (FGDB - Feature class)</option>" +
                    "<option value='FGDB_RasterDataset'>" + label[680] + " (FGDB - Raster dataset)</option>" +
                    "<option value='Geopackage'>Geopackage</option>" +
                    "<option value='SHP'>Shapefile</option>" +
                    "<option value='TXT'>TXT</option></select>";
            } else if (produkt == "DMP1G" || produkt == "DMR4G" || produkt == "DMR5G") {
                document.getElementById("exportFormat").innerHTML += "<select id='exportFormatValue' class='form-control' style='font-weight: normal;'>" +
                    "<option value='FGDB_FeatureClass' selected>" + label[680] + " (FGDB - Feature class)</option>" +
                    "<option value='FGDB_RasterDataset'>" + label[680] + " (FGDB - Raster dataset)</option>" +
                    "<option value='LAS'>LAS</option>" +
                    "<option value='Geopackage'>Geopackage</option>" +
                    "<option value='SHP'>Shapefile</option>" +
                    "<option value='TXT'>TXT</option></select>";
            } else if (produkt == "DBP") {
                document.getElementById("exportFormat").innerHTML += "<select id='exportFormatValue' class='form-control' style='font-weight: normal;'>" +
                    "<option value='FGDB_FeatureClass' selected>" + label[680] + " (FGDB - Feature class)</option>" +
                    "<option value='Geopackage'>Geopackage</option>" +
                    "<option value='SHP'>Shapefile</option>" +
                    "<option value='TXT'>TXT</option></select>";
            }
            if (((localStorage.theme) && localStorage.theme != "default") && localStorage.theme == "dark") query(".form-control").attr("style", { "background-color": "#4c4c4c", "color": "#fff" });
            app.export.getPolygon();
            if (kod) {
                if (isNaN(kod) == false) {
                    if ((app.widgetProdukty) && app.widgetProdukty.useproduct) {
                        app.widgetProdukty.useproduct(Number(kod));
                    } else {
                        app.export.kod = kod;
                        var interval = setInterval(() => {
                            if ((app.widgetProdukty) && app.widgetProdukty.useproduct) {
                                app.widgetProdukty.useproduct(Number(app.export.kod));
                                clearInterval(interval);
                            }
                        }, 2000);
                    }
                } else {
                    alert(label[383])
                }
            }
            app.export.controlLimit = (p) => {
                if (!p) {
                    p = new Graphic({
                        geometry: Polygon.fromExtent(app.mapView.extent),
                    });
                }
                geometryEngineAsync.planarArea(p.geometry, "square-kilometers").then((r) => {
                    let planarArea = Number(r);
                    if (planarArea < 0) planarArea = planarArea * -1;
                    (app.export.limits[produkt]) && planarArea > app.export.limits[produkt] ? document.getElementById("exportAreaAlert").classList.remove("hidden") : document.getElementById("exportAreaAlert").classList.add("hidden")
                })
            }
            app.export.watchLimitFunc = () => {
                let extent = true;
                let arr = app.mapView.graphics.toArray();
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i]?.mujtyp == "kresleniExport") {
                        app.export.controlLimit(arr[i])
                        extent = false;
                        break;
                    }
                }
                if (extent) app.export.controlLimit();
            }
            app.export.watchLimit = reactiveUtils.watch(() => app.mapView.zoom, () => {
                app.export.watchLimitFunc();
            });
            app.export.watchLimitFunc();
        }
    }

    app.export.pripravit = (produkt) => {
        document.getElementById("exportVysledek").innerHTML = "";
        document.getElementById("exportVysledek").style.marginTop = "0px";
        if (document.getElementById("exportEmail").value == "") {
            alert(label[113]);
            return;
        }
        let grafika;
        let vlastniPolygon = false;
        let pole = app.mapView.graphics.toArray();
        for (let i = pole.length - 1; i >= 0; i--) {
            if (pole[i].mujtyp == "kresleniExport") {
                vlastniPolygon = true;
                grafika = pole[i];
            }
        };
        if (vlastniPolygon == false) {
            grafika = new Graphic({
                geometry: Polygon.fromExtent(app.mapView.extent),
            });
        }
        if (grafika.geometry.isSelfIntersecting == true) {
            alert(label[676]);
            return;
        }
        geometryEngineAsync.planarArea(grafika.geometry, "square-kilometers").then((response) => {
            let limit = app.export.limits[produkt];
            let planarArea = Number(response);
            if (planarArea < 0) planarArea = planarArea * -1;
            if ((limit) && planarArea > limit) {
                let oblast = planarArea.toLocaleString('en', {
                    maximumFractionDigits: 0
                }).replace(/,/g, " ");
                alert(label[673] + "\n\n" + oblast + " km² (" + label[674] + " " + limit + " km²)");
                return;
            } else {
                app.export.odeslat(produkt, new FeatureSet({
                    features: grafika,
                    geometryType: "polygon"
                }));
            }
        });
    }

    app.export.odeslat = (produkt, polygon) => {
        document.getElementById("exportExportovatData").disabled = true;
        document.getElementById("exportExportovatData").innerHTML = label[549] + "<span id='stav_export' class='esri-icon-loading-indicator'></span>";

        function runAfterToken() {
            let paramsObj = {
                "VstupniPolygon": polygon,
                "Produkt": produkt,
                "VydejniFormat": document.getElementById("exportFormatValue").value,
                "Email": document.getElementById("exportEmail").value
            }
            app.export.gpUrl = appConfig.domain + "/arcgis2/rest/services/Vydej/VydejDat/GPServer/VydejDat";
            geoprocessor.submitJob(app.export.gpUrl, paramsObj).then((jobInfo) => {
                query("#exportZastavitExport").removeClass("hidden");
                app.export.id = jobInfo;
                let options = {
                    interval: 5000,
                    statusCallback: app.export.statusCallback
                };
                let zavritOkno = (() => {
                    app.export.zastavit();
                });
                window.onbeforeunload = zavritOkno;
                jobInfo.waitForJobCompletion(options).then((jobInfo) => {
                    if (jobInfo.jobStatus == "job-succeeded") {
                        app.export.id = "";
                        if (document.getElementById('widgetExport')) {
                            document.getElementById("exportVysledek").innerHTML = label[665];
                            document.getElementById("exportVysledek").style.marginTop = "10px";
                            document.getElementById("exportExportovatData").disabled = false;
                            document.getElementById("exportExportovatData").innerHTML = label[668] + "<span class='esri-icon-collapse fRight'></span>";
                            query("#exportZastavitExport").addClass("hidden");
                            for (var j = 0; j < jobInfo.messages.length; j++) {
                                if (jobInfo.messages[j].description.search('URL: ') >= 0) document.getElementById("exportVysledek").innerHTML += '<button type="button" class="btn btn-primary btn-block" onclick="window.open(\'' + jobInfo.messages[j].description.split("URL: ")[1] + '\');" style="margin-top: 10px;">' + label[694] + '<span class="esri-icon-download" style="float: right;"></span></button>';
                            }
                        } else {
                            alert(label[665]);
                        }
                        window.onbeforeunload = undefined;
                    } else {
                        if (!jobInfo.jobStatus.includes("job-cancell")) app.export.onJobFailed(jobInfo);
                    }
                }).catch((err) => {
                    if (!jobInfo.jobStatus.includes("job-cancell")) app.export.onJobFailed(jobInfo);
                    app.export.id = "";
                });
            }, (err) => {
                alert(err);
                app.export.id = "";
                document.getElementById("exportExportovatData").disabled = false;
                document.getElementById("exportExportovatData").innerHTML = label[668] + "<span class='esri-icon-collapse fRight'></span>";
                query("#exportZastavitExport").addClass("hidden");
                window.onbeforeunload = undefined;
            });
        }
        app.prover_tokenG().then(() => {
            runAfterToken();
        }, (err) => {
            console.log(err);
            app.export.id = "";
            document.getElementById("exportExportovatData").disabled = false;
            document.getElementById("exportExportovatData").innerHTML = label[668] + "<span class='esri-icon-collapse fRight'></span>";
            query("#exportZastavitExport").addClass("hidden");
            alert(label[383]);
        });
    }

    app.export.statusCallback = (jobInfo) => {
        if (jobInfo.jobStatus == "job-executing") console.log(jobInfo.jobStatus);
    };

    app.export.onJobFailed = (jobInfo) => {
        app.export.id = "";
        let chyba = undefined;
        let errors = [
            'Nebyl zadán žádný polygon',
            'Může být zadán pouze jeden polygon',
            'Vstupní geometrie musí být polygon',
            'Plocha zájmového území je',
            'Emailová adresa',
            'oblast leží mimo území ČR',
            'Výstup do formátu',
            'lze odesílat emaily pouze do domény',
            'V oblasti vymezené vstupním polygonem se nenacházejí žádná data pro výdej'
        ]
        for (let j = 0; j < jobInfo.messages.length; j++) {
            for (let i = 0; i < errors.length; i++) {
                if (jobInfo.messages[j].description.search(errors[i]) > -1) { chyba = jobInfo.messages[j].description; break; }
            }
            if (chyba) break;
        }
        chyba ? alert(chyba) : alert(label[383]);
        document.getElementById("exportExportovatData").disabled = false;
        document.getElementById("exportExportovatData").innerHTML = label[668] + "<span class='esri-icon-collapse fRight'></span>";
        query("#exportZastavitExport").addClass("hidden");
        window.onbeforeunload = undefined;
    }

    app.export.zastavit = () => {
        document.getElementById("exportZastavitExport").disabled = true;
        app.export.id.cancelJob(app.export.id.jobId).then(() => {
            document.getElementById("exportZastavitExport").disabled = false;
            document.getElementById("exportExportovatData").disabled = false;
            document.getElementById("exportExportovatData").innerHTML = label[668] + "<span class='esri-icon-collapse fRight'></span>";
            query("#exportZastavitExport").addClass("hidden");
            app.export.id = "";
        });
    }

    app.export.kreslenipolygonu = () => {
        query("#widgetExport").addClass("hidden");
        app.enabledPopup = false;
        function kresleniPolygonEdit(vertices) {
            if (vertices.length > 1) {
                let pole = app.mapView.graphics.toArray();
                for (let i = pole.length - 1; i >= 0; i--) {
                    if (pole[i].mujtyp == "kresleniExport") app.mapView.graphics.remove(pole[i]);
                }
                let graphic = new Graphic({
                    symbol: {
                        type: "simple-line",
                        color: [4, 90, 141],
                        width: 3
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
                graphic.mujtyp = "kresleniExport";
                app.mapView.graphics.add(graphic);
            }
        };
        function kresleniPolygonComplete(vertices) {
            let pole = app.mapView.graphics.toArray();
            for (let i = pole.length - 1; i >= 0; i--) {
                if (pole[i].mujtyp == "kresleniExport") app.mapView.graphics.remove(pole[i]);
            }
            let prvniVertex = {};
            prvniVertex[0] = vertices[0];
            let noveVertices = vertices.concat([prvniVertex[0]]);
            let graphic = new Graphic({
                geometry: {
                    type: "polygon", // autocasts as Polygon
                    rings: noveVertices,
                    spatialReference: app.mapView.spatialReference.clone()
                },
                symbol: {
                    type: "simple-fill", // autocasts as SimpleFillSymbol
                    color: [4, 90, 141],
                    style: "diagonal-cross",
                    outline: {  // autocasts as SimpleLineSymbol
                        color: [4, 90, 141],
                        width: 3
                    }
                }
            });
            graphic.mujtyp = "kresleniExport";
            app.mapView.graphics.add(graphic);
            app.mapView.goTo(graphic);
            app.enabledPopup = true;
            app.export.watchLimitFunc();
        }
        app.activeView.cursor = "crosshair";
        let pole = app.mapView.graphics.toArray();
        for (let i = pole.length - 1; i >= 0; i--) {
            if (pole[i].mujtyp == "kresleniExport") app.mapView.graphics.remove(pole[i]);
        }
        let action = app.draw.create("polygon", { mode: "click" });
        action.on("vertex-add", (evt) => {
            kresleniPolygonEdit(evt.vertices);
        });
        action.on("cursor-update", (evt) => {
            kresleniPolygonEdit(evt.vertices);
        });
        action.on("draw-complete", (evt) => {
            app.activeView.cursor = "default";
            app.draw.reset();
            kresleniPolygonComplete(evt.vertices);
            query("#widgetExport, #exportOdstranit").removeClass("hidden");
            app.export.advanced();
            document.getElementById("exportInfo").innerHTML = label[679];
            query(".exportLocalBtn, #exportKreslit").attr("disabled", "true");
        });
    };

    app.export.kladyGetIds = (c) => {
        if (!c) c = ''
        if (c.indexOf('ztm') > -1) {
            c = document.getElementById('exportAtomThemeDiv')?.childNodes[1]?.value.split('-')
            c = c[0] + '-' + c[1]
        }
        let l = {
            'dmr5g': [24, 25],
            'dmr5g-sjtsk': [24, 25],
            'dmr5g-etrs89': [26, 27],
            'dmr4g': [24, 25],
            'dmr4g-sjtsk': [24, 25],
            'dmr4g-etrs89': [26, 27],
            'dmp1g': [24, 25],
            'dmp1g-sjtsk': [24, 25],
            'dmp1g-etrs89': [26, 27],
            'dmpok': [24, 25],
            'dmpok-sjtsk-laz': [24, 25],
            'dmpok-sjtsk-tiff': [24, 25],
            'dmpok-etrs89': [26, 27],
            'dmpok-etrs89-laz': [26, 27],
            'dmpok-etrs89-tiff': [26, 27],
            'ortofoto': [24, 25],
            'ztm5-sjtsk': [0, 1],
            'ztm10-sjtsk': [2, 3],
            'ztm25-sjtsk': [4, 5],
            'ztm50-sjtsk': [6, 7],
            'ztm100-sjtsk': [8, 9],
            'ztm250-sjtsk': [10, 11],
            'ztm5-etrs89': [12, 13],
            'ztm10-etrs89': [14, 15],
            'ztm25-etrs89': [16, 17],
            'ztm50-etrs89': [18, 19],
            'ztm100-etrs89': [20, 21],
            'ztm250-etrs89': [22, 23],
            'el-tin': [26, 27],
            'zabaged-vyskopis': [24, 25],
            'oi': [26, 27]
        }
        return l[c]
    }

    app.export.kladyOnChangeTheme = (c) => {
        let k = document.getElementById("exportAtomKlady")?.checked;
        if (k) {
            let l = app.activeView.map.findLayerById('KladyMLAtom');
            if (l) {
                l.sublayers.forEach(s => {
                    s.visible = false;
                });
                c = app.export.kladyGetIds(c);
                if (c.length) {
                    c.forEach(s => {
                        l?.sublayers.forEach(e => {
                            if (e.id == Number(s)) e.visible = true
                        });
                    })
                }
            }
        }
    }

    app.export.kladyOnChange = (v, c) => {
        function setSub(l, c) {
            c = app.export.kladyGetIds(c);
            if (c.length) {
                c.forEach(s => {
                    l?.sublayers.forEach(e => {
                        if (e.id == Number(s)) e.visible = true
                    });
                })
            }
        }
        if (v) {
            let l = app.activeView.map.findLayerById('KladyMLAtom');
            if (document.getElementById('exportAtomTema')?.value) c = document.getElementById('exportAtomTema').value
            if (l) {
                l.sublayers.forEach(s => {
                    s.visible = false;
                })
                l.visible = true;
                setSub(l, c);
            } else {
                l = new MapImageLayer({
                    url: protokol + "ags.cuzk.gov.cz/arcgis/rest/services/KladyMapovychListu/MapServer",
                    title: "Klady mapových listů",
                    id: "KladyMLAtom"
                }).load().then(e => {
                    e.sublayers.forEach(s => {
                        s.visible = false;
                    })
                    app.activeView.map.add(e);
                    setSub(e, c);
                });
            }
        } else {
            let l = app.activeView.map.findLayerById('KladyMLAtom');
            if (l) app.activeView.map.remove(l);
        }
    }

    app.export.atom = (code) => {
        if (app.activeView.type != "2d") {
            alert(label[755]);
            return;
        }
        app.removeDiv(['widgetExportAtom']);
        let isValid = false;
        let ids = ['km', 'data50', 'data250', 'cp', 'ggs', 'ad', 'au', 'bu', 'ruian', 'ztm5', 'ztm10', 'ztm25', 'ztm50', 'ztm100', 'ztm250', 'mcr500', 'mcr1m', 'mcr2m', 'dmr5g', 'dmr4g', 'dmp1g', 'dmpok', 'zabaged-vyskopis', 'zabaged', 'geonames', 'ortofoto', 'lu', 'gn', 'hy', 'el-tin', 'el-grid', 'tn', 'oi'];
        ids.forEach(element => {
            if (code == element) isValid = true;
        });
        if (isValid == false) {
            alert(label[383]);
            return;
        }
        app.activeView.popup.visible = false;
        query(".panel").removeClass("in");
        let obsahExportAtom = "<div class='zadaniExportAtom panel-body'><span style='float: right; cursor: pointer; padding: 2px;' class='esri-icon-close bold' onclick='app.removeDiv([\"widgetExportAtom\"]);' title='" + label[325] + "'></span><span style='float: right; cursor: pointer; padding: 2px 10px 2px 2px;' class='esri-icon-dock-right bold hidden-xs' onclick='app.widgetReposition(widgetExportAtom);' title='" + label[324] + "'></span><span style='float: right; padding-right: 10px;' class='hidden-xs'> | </span><span style='float: right; cursor: pointer; padding: 2px 10px 2px 2px;' class='esri-icon-question bold hidden-xs' title='" + label[323] + "' id='atomTooltip'></span>" +
            "<span class='atom'>ATOM</span><a target='_blank' href='https://cuzk.gov.cz'>ČÚZK</a><br><span class='hidden' id='exportAtomKladySwitch' style='display: flow-root'><label class='switch' style='float: right;'><input type='checkbox' id='exportAtomKlady' onchange='app.export.kladyOnChange(this.checked,\"" + code + "\")'><span class='slider'></span></label> <label for='exportAtomKlady' style='float: right; margin: 0px 5px 5px 0px;'>" + label[346] + "</label></span><p style='margin-top: 15px;'>" + label[703] + "</p>" +
            "<span id='exportAtomSSDiv' class='hidden'></span>" +
            "<span id='exportAtomThemeDiv' class='hidden' onchange='app.export.kladyOnChangeTheme(this?.childNodes[1]?.value)'></span>" +
            "<b>" + label[670] + "</b><br><br>" +
            '<button id="exportAtomExecute" type="button" class="btn btn-primary btn-block" onclick="app.export.atomExecute(\'' + code + '\');" title="' + label[390] + '">' + label[390] + "<span class='esri-icon-search fLeft'></span></button>" +
            "<span id='atomContent'></span>" +
            "</div>";
        let styl = "position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%); background-color: white; box-shadow: 0px 1px 2px rgba(0,0,0,0.3); min-width: 230px; z-index: 2;";
        if (((localStorage.theme) && (localStorage.theme != "default")) && localStorage.theme == "dark") styl += "background-color: #4c4c4c; color: white;";

        let widgetExportAtom = document.createElement("DIV");
        widgetExportAtom.id = "widgetExportAtom";
        widgetExportAtom.className = "panel-collapse";
        widgetExportAtom.style = styl;
        widgetExportAtom.innerHTML = obsahExportAtom;

        app.mapView.ui.add({
            component: widgetExportAtom
        });

        new Tooltip({
            connectId: ["atomTooltip"],
            label: "<div style='width: 250px;'>" + label[737] + "</div>",
            showDelay: 50,
            hideDelay: 50,
            position: ["before", "after", "above", "below"]
        });
        if (code == "cp" || code == "au" || code == "bu" || code == "ad") {
            query("#exportAtomSSDiv").removeClass("hidden");
            document.getElementById("exportAtomSSDiv").innerHTML =
                "<b>" + label[698] + "</b>" +
                "<select class='form-control' id='exportAtomSS'>" +
                "<option value='all'>" + label[514] + "</option>" +
                "<option value='JTSK'>EPSG: 5514 (S-JTSK/Krovak)</option>" +
                "<option value='ETRS89'>EPSG: 4258 (ETRS89, geographic 2D)</option>" +
                "</select><br>";
        }
        if (code == "data250" || code == "data50" || code == "zabaged" || code == "geonames") {
            query("#exportAtomSSDiv").removeClass("hidden");
            document.getElementById("exportAtomSSDiv").innerHTML =
                "<b>" + label[698] + "</b>" +
                "<select class='form-control' id='exportAtomSS'>" +
                "<option value='all'>" + label[514] + "</option>" +
                "<option value='JTSK'>EPSG: 5514 (S-JTSK/Krovak)</option>" +
                "<option value='ETRS89'>EPSG: 3045 (ETRS89-TM33N)</option>" +
                "</select><br>";
        }
        if (code == "km") {
            query("#exportAtomThemeDiv").removeClass("hidden");
            document.getElementById("exportAtomThemeDiv").innerHTML =
                "<b>" + label[704] + ":</b>" +
                "<select class='form-control' id='exportAtomTema' cuzk=true>" +
                "<option value='GMPL-KU-VFK'>Geometrické plány - děleno podle katastrálních území (VFK)</option>" +
                "<option value='KM-KU-DGN'>Katastrální mapa ČR - děleno podle katastrálních území (DGN)</option>" +
                "<option value='KM-KU-DXF'>Katastrální mapa ČR - děleno podle katastrálních území (DXF)</option>" +
                "<option value='KM-KU-VFK'>Katastrální mapa ČR - děleno podle katastrálních území (VFK)</option>" +
                "<option value='KM-KU-SHP'>Katastrální mapa ČR - děleno podle katastrálních území (SHP)</option>" +
                "<option value='KM-KU-VKM'>Katastrální mapa ČR - děleno podle katastrálních území (VKM)</option>" +
                "<option value='UZSVM'>Nemovitosti evidované pro nedostatečně identifikovaného vlastníka</option>" +
                "<option value='UHDP'>Úhrnné hodnoty druhů pozemků</option>" +
                "</select><br>";
        } else if (code == "ruian") {
            query("#exportAtomThemeDiv").removeClass("hidden");
            document.getElementById("exportAtomThemeDiv").innerHTML =
                "<b>" + label[704] + ":</b>" +
                "<select class='form-control' id='exportAtomTema' cuzk=true>" +
                "<optgroup label='Současná data RUIAN'>" +
                "<option value='RUIAN-S-ZA-U'>Současná stavová data RÚIAN - základní datová sada - VFR</option>" +
                "<option value='RUIAN-S-K-Z'>Současná změnová data RÚIAN - kompletní datová sada - VFR</option>" +
                "<option value='RUIAN-S-K-U'>Současná stavová data RÚIAN - kompletní datová sada - VFR</option>" +
                "<option value='RUIAN-CSV-ADR-OB'>Data RÚIAN ve formátu CSV - adresy děleny po obcích</option>" +
                "<option value='RUIAN-CSV-ADR-ST'>Data RÚIAN ve formátu CSV - adresy pro stát</option>" +
                "<option value='RUIAN-CSV-HIE-ST'>Data RÚIAN ve formátu CSV - hierarchie prvků pro stát</option>" +
                "<option value='RUIAN-OBCE-SHP'>Data RÚIAN ve formátu SHP - obce</option>" +
                "<option value='RUIAN-STATY-SHP'>Data RÚIAN ve formátu SHP - stát</option>" +
                "<option value='RUIAN-SP-CIS-U'>RÚIAN speciální data - číselníky</option>" +
                "<option value='VO'>Volební okrsky</option>" +
                "</optgroup>" +
                "<optgroup label='Historická data RUIAN'>" +
                "<option value='RUIAN-H-ZA-Z'>Historická změnová data RÚIAN - základní datová sada - VFR</option>" +
                "<option value='RUIAN-H-ZA-U'>Historická stavová data RÚIAN - základní datová sada - VFR</option>" +
                "</optgroup>" +
                "</select><br>";
        } else if (code == "cp") {
            query("#exportAtomThemeDiv").removeClass("hidden");
            document.getElementById("exportAtomThemeDiv").innerHTML =
                "<b>" + label[704] + ":</b>" +
                "<select class='form-control' id='exportAtomTema'>" +
                "<option value='cp'>Katastrální parcely</option>" +
                "<option value='cpx'>Katastrální parcely - národní rozšíření</option>" +
                "</select><br>";
        } else if (code == "ztm5" || code == "ztm10" || code == "ztm25" || code == "ztm50" || code == "ztm100" || code == "ztm250") {
            query("#exportAtomThemeDiv").removeClass("hidden");
            document.getElementById("exportAtomThemeDiv").innerHTML =
                "<b>" + label[704] + ":</b>" +
                "<select class='form-control' id='exportAtomTema'>" +
                "<optgroup label='Souřadnicový systém: JTSK'></optgroup>" +
                "<option value='" + code + "-sjtsk-tiff'>Základní topografická mapa 1 : " + code.split("ztm")[1] + ' 000' + " (S-JTSK, TIFF)</option>" +
                "<option value='" + code + "-sjtsk-pdf'>Základní topografická mapa 1 : " + code.split("ztm")[1] + ' 000' + " (S-JTSK, PDF)</option>" +
                "<option value='" + code + "-sjtsk-shp'>Základní topografická mapa 1 : " + code.split("ztm")[1] + ' 000' + " (S-JTSK, SHP)</option>" +
                "<option value='" + code + "-sjtsk-dgn'>Základní topografická mapa 1 : " + code.split("ztm")[1] + ' 000' + " (S-JTSK, DGN)</option>" +
                "</optgroup>" +
                "<optgroup label='Souřadnicový systém: ETRS89-TMzn'></optgroup>" +
                "<option value='" + code + "-etrs89-tiff'>Základní topografická mapa 1 : " + code.split("ztm")[1] + ' 000' + " (ETRS89-TMzn, TIFF)</option>" +
                "<option value='" + code + "-etrs89-pdf'>Základní topografická mapa 1 : " + code.split("ztm")[1] + ' 000' + " (ETRS89-TMzn, PDF)</option>" +
                "</optgroup>" +
                "</select><br>";
        } else if (code == "dmpok") {
            query("#exportAtomThemeDiv").removeClass("hidden");
            document.getElementById("exportAtomThemeDiv").innerHTML =
                "<b>" + label[704] + ":</b>" +
                "<select class='form-control' id='exportAtomTema'>" +
                "<optgroup label='Souřadnicový systém: JTSK'></optgroup>" +
                "<option value='" + code + "-sjtsk-laz'>" + code.toUpperCase() + " (S-JTSK, LAZ)</option>" +
                "<option value='" + code + "-sjtsk-tiff'>" + code.toUpperCase() + " (S-JTSK, TIFF)</option>" +
                "</optgroup>" +
                "<optgroup label='Souřadnicový systém: ETRS89-TMzn'></optgroup>" +
                "<option value='" + code + "-etrs89-laz'>" + code.toUpperCase() + " (ETRS89-TMzn, LAZ)</option>" +
                "<option value='" + code + "-etrs89-tiff'>" + code.toUpperCase() + " (ETRS89-TMzn, TIFF)</option>" +
                "</optgroup>" +
                "</select><br>";
        } else if (code == "dmr5g" || code == "dmr4g" || code == "dmp1g") {
            query("#exportAtomThemeDiv").removeClass("hidden");
            document.getElementById("exportAtomThemeDiv").innerHTML =
                "<b>" + label[704] + ":</b>" +
                "<select class='form-control' id='exportAtomTema'>" +
                "<optgroup label='Souřadnicový systém: JTSK'></optgroup>" +
                "<option value='" + code + "-sjtsk'>" + code.toUpperCase() + " (S-JTSK, LAS)</option>" +
                "</optgroup>" +
                "<optgroup label='Souřadnicový systém: ETRS89-TMzn'></optgroup>" +
                "<option value='" + code + "-etrs89'>" + code.toUpperCase() + " (ETRS89-TMzn, LAS)</option>" +
                "</optgroup>" +
                "</select><br>";
        } else if (code == "zabaged" || code == "geonames") {
            query("#exportAtomThemeDiv").removeClass("hidden");
            document.getElementById("exportAtomThemeDiv").innerHTML =
                "<b>" + label[704] + ":</b>" +
                "<select class='form-control' id='exportAtomTema'>" +
                "<option value='" + code + "-fgdb'>" + code.toUpperCase() + " (FGDB - Feature class)</option>" +
                "<option value='" + code + "-gpkg'>" + code.toUpperCase() + " (Geopackage)</option>" +
                "</select><br>";
        } else if (code == "hy") {
            query("#exportAtomThemeDiv").removeClass("hidden");
            document.getElementById("exportAtomThemeDiv").innerHTML =
                "<b>" + label[704] + ":</b>" +
                "<select class='form-control' id='exportAtomTema'>" +
                "<option value='" + code + "-net'>INSPIRE - vodstvo - hydrografická síť</option>" +
                "<option value='" + code + "-p'>INSPIRE - vodstvo - fyzické vody</option>" +
                "</optgroup>" +
                "</select><br>";
        } else if (code == "tn") {
            query("#exportAtomThemeDiv").removeClass("hidden");
            document.getElementById("exportAtomThemeDiv").innerHTML =
                "<b>" + label[704] + ":</b>" +
                "<select class='form-control' id='exportAtomTema'>" +
                "<option value='" + code + "-air'>INSPIRE - Dopravní sítě - letecká doprava</option>" +
                "<option value='" + code + "-rail'>INSPIRE - Dopravní sítě - železniční doprava</option>" +
                "<option value='" + code + "-water'>INSPIRE - Dopravní sítě - vodní doprava</option>" +
                "<option value='" + code + "-road'>INSPIRE - Dopravní sítě - silniční doprava</option>" +
                "<option value='" + code + "-cable'>INSPIRE - Dopravní sítě - lanová dráha</option>" +
                "</optgroup>" +
                "</select><br>";
        } else if (code == "zabaged-vyskopis") {
            query("#exportAtomThemeDiv").removeClass("hidden");
            document.getElementById("exportAtomThemeDiv").innerHTML =
                "<b>" + label[704] + ":</b>" +
                "<select class='form-control' id='exportAtomTema'>" +
                "<option value='" + code + "'>ZABAGED® - výškopis (Shapefile)</option>" +
                "<option value='" + code + "-DGN'>ZABAGED® - výškopis (DGN)</option>" +
                "</optgroup>" +
                "</select><br>";
        } else if (code == "mcr500" || code == "mcr1m" || code == "mcr2m") {
            query("#exportAtomThemeDiv").removeClass("hidden");
            document.getElementById("exportAtomThemeDiv").innerHTML =
                "<b>" + label[704] + ":</b>" +
                "<select class='form-control' id='exportAtomTema'>" +
                "<option value='" + code + "'>" + code.toUpperCase() + " (TIFF)</option>" +
                "<option value='" + code + "-PDF'>" + code.toUpperCase() + " (PDF)</option>" +
                "</optgroup>" +
                "</select><br>";
        }
        let klad = app.export.kladyGetIds(code)
        if (klad) document.getElementById('exportAtomKladySwitch').classList.remove('hidden');
        if (((localStorage.theme) && localStorage.theme != "default") && localStorage.theme == "dark") query(".form-control").attr("style", { "background-color": "#4c4c4c", "color": "#fff" });
    };

    app.export.downloadAllAtom = () => {
        document.querySelectorAll(".exportAtomLink").forEach(e => {
            setTimeout(() => { e.click(); }, 100);
        });

        /* let links = [];
        urls.forEach(element => {
            links.push(element.href);
        });
       
        let promises = links.map(url => fetch(url));
        promiseUtils.eachAlways(promises).then(results => {
            console.log(results);
        }); */
    }

    app.downloadLink = (e, i) => {
        window.open(e, "_blank");
        /* if (e.indexOf("geoportal.cuzk.gov.cz") > -1) {
            let saveHtml = document.getElementById("atomContent").outerHTML;
            document.getElementById("exportAtomExecute").disabled = true;
            document.getElementById("atomContent").innerHTML = "<br>" + label[549] + "<span id='stav_exportAtom' class='esri-icon-loading-indicator'></span>";
            esriRequest('https://geoportal.cuzk.gov.cz/odt/test.html', {
                responseType: "text",
                cacheBust: true
            }).then(() => {
                document.getElementById("atomContent").innerHTML += "<br><div id='exportCountdown'></div>";
                setTimeout(() => {
                    window.open(e, "_blank");
                    document.getElementById("exportAtomExecute").disabled = false;
                    document.getElementById("atomContent").innerHTML = saveHtml;
                    if (i) document.getElementById(i).scrollIntoView();
                }, 2000)
            }).catch(() => {
                document.getElementById("exportAtomExecute").disabled = false;
                document.getElementById("atomContent").innerHTML = saveHtml;
                alert(label[736]);
            });
        } else {
            window.open(e, "_blank");
        } */
    }

    app.export.zoomTo = (e) => {
        let polygonRings = e.split(" ");
        if (polygonRings[0] == "") polygonRings.shift();
        app.mapView.goTo({
            target: new Polygon({
                rings: [[
                    [Number(polygonRings[1]), Number(polygonRings[0])],
                    [Number(polygonRings[3]), Number(polygonRings[2])],
                    [Number(polygonRings[5]), Number(polygonRings[4])],
                    [Number(polygonRings[7]), Number(polygonRings[6])],
                    [Number(polygonRings[9]), Number(polygonRings[8])]
                ]]
            })
        })
    }

    app.export.atomExecute = (code) => {
        document.getElementById("atomContent").innerHTML = '';
        document.getElementById("exportAtomExecute").disabled = true;
        document.getElementById("exportAtomExecute").innerHTML = label[549] + "<span id='stav_exportAtom' class='esri-icon-loading-indicator'></span>";
        if (document.getElementById("exportAtomTema")) code = document.getElementById("exportAtomTema").value;
        projection.load().then(() => {
            let extent = projection.project(app.activeView.extent, { wkid: 4258 });
            let url = "https://atom.cuzk.gov.cz/get.ashx?format=json&theme=" + code + "&bbox=" + extent.xmin + "," + extent.ymin + "," + extent.xmax + "," + extent.ymax;
            if ((document.getElementById("exportAtomSS")) && document.getElementById("exportAtomSS").value != "all") url += "&crs=" + document.getElementById("exportAtomSS").value;
            esriRequest(url, {
                responseType: "json"
            }).then((response) => {
                if (document.getElementById("atomContent")) {
                    let atomResult = response.data;
                    app.export.atomURLs = [];
                    document.getElementById("exportAtomExecute").disabled = false;
                    document.getElementById("exportAtomExecute").innerHTML = label[390] + "<span class='esri-icon-search fLeft'></span>";
                    if (!atomResult.entry) {
                        alert(label[705]);
                        return;
                    }
                    /* atomResult.entry.sort(function(a,b) {
                        var x = b.updated;
                        var y = a.updated;
                        return x < y ? -1 : x > y ? 1 : 0;
                    }); */
                    let exceeded = '';
                    if (atomResult.title.indexOf('quota exceeded') > -1) exceeded = label[706];
                    document.getElementById("atomContent").innerHTML += '<hr><div>' + label[700] + " " + atomResult.entry.length + exceeded + "</div>";
                    document.getElementById("atomContent").style.marginTop = '10px';
                    if ((document.getElementById("exportAtomTema")) && document.getElementById("exportAtomTema").attributes.cuzk) document.getElementById("atomContent").innerHTML += '<br><button class="btn btn-primary btn-block" onclick="app.export.downloadAllAtom();" title="' + label[701] + '">' + label[701] + "<span class='esri-icon-download fLeft'></span></button>";
                    function humanFileSize(B, i) { var e = i ? 1e3 : 1024; if (Math.abs(B) < e) return B + " B"; var a = i ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"] : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"], t = -1; do B /= e, ++t; while (Math.abs(B) >= e && t < a.length - 1); return B.toFixed(1) + " " + a[t] }

                    atomResult.entry.forEach((e, i) => {
                        if (e.link) {
                            let typ = label[78];
                            [["application/vnd.shp", "SHP"],
                            ["application/gml+xml", "GML"],
                            ["text/csv", "CSV"],
                            ["image/tiff", "TIFF"],
                            ["dgn", "DGN"],
                            ["image/vnd.dxf", "DXF"],
                            ["image/jpeg", "JPEG"],
                            ["text/plain", "TXT"],
                            ["vfk", "VFK"],
                            ["text/vkm", "VKM"],
                            ["text/vfk", "VFK"],
                            ["application/vnd.laszip", "LAZ"],
                            ["application/vnd.las", "LAS"],
                            ["application/pdf", "PDF"],
                            ["image/jp2", "JPEG2000"],
                            ["fgdb", "FGDB"],
                            ["application/geopackage+sqlite3", "Geopackage"]].forEach(f => {
                                if (f[0] == e.type) typ = f[1]
                            })
                            let timeSplit = e.updated.split("T");
                            timeSplit[1] = timeSplit[1].split(".")[0];
                            let d = new Date(timeSplit.join(' '))
                            const fDate = `${d.getDate()}. ${d.getMonth() + 1}. ${d.getFullYear()} ${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
                            let ss = "";
                            if ((document.getElementById("exportAtomSS")) && document.getElementById("exportAtomSS").value == "all") ss = ", <span style='word-break: no-break;'>" + e.category[0].label + "</span>";
                            document.getElementById("atomContent").innerHTML += '<div id="exportAtomRow_' + i + '" class="exportAtomRow"><a class="exportAtomLink" onclick="app.downloadLink(\'' + e.link[0].href.replace('http://', 'https://') + '\', this.parentNode.id)" href="javascript:void(0)" rel="noopener" title="' + label[26] + '"><span class="esri-icon-save"></span> ' + e.title + "</a><a onclick='app.export.zoomTo(\"" + e.polygon + "\")' href='javascript:void(0)' rel='noopener' title=\"" + label[20] + "\"><span class='esri-icon-zoom-in-magnifying-glass zoomTo'></span> " + label[20] + "</a><div><span class='exportAtomTime' title='" + label[46] + "dd-mm-rrrr hh-mm-ss'>" + label[702] + ": " + fDate + "</span><span class='exportAtomSize'>" + typ + ss + " - " + humanFileSize(e.length, true) + "</span></div></div>";
                        }
                    });
                }
            }).catch((err) => {
                console.log(err);
                document.getElementById("exportAtomExecute").disabled = false;
                document.getElementById("exportAtomExecute").innerHTML = label[390] + "<span class='esri-icon-search fLeft'></span>";
                document.getElementById("atomContent").innerHTML = '';
                alert(label[383]);
            });
        });
    }

    if (myUrlParams.atom != "") {
        app.export.atom(myUrlParams.atom);
    }

    if (myUrlParams.export != "") {
        if (myUrlParams.export.indexOf(",") > -1) {
            let split = myUrlParams.export.split(",");
            app.export.widget(split[0], split[1]);
        } else {
            app.export.widget(myUrlParams.export);
        }
    }
});