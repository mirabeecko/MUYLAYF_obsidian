app.sdileni = {};
app.sdileni.aplikace = (apka) => {
    var ss = app.activeView.spatialReference.wkid;
    var extent = app.activeView.extent.xmin + "," + app.activeView.extent.ymin + "," + app.activeView.extent.xmax + "," + app.activeView.extent.ymax;
    if (apka == 1) {
        var analyzyVyskopisu = "https://ags.cuzk.gov.cz/av/?extent=" + extent;
        if (window.location.hash == "#en") {
            analyzyVyskopisu += "#en";
        }
        if (ss == 102067) {
            window.open(analyzyVyskopisu);
        } else {
            alert(label[5] + label[171]);
        }
    } else if (apka == 2) {
        var archivniMapy = "https://ags.cuzk.gov.cz/archiv/?extent=" + extent;
        if (window.location.hash == "#en") {
            archivniMapy += "#en";
        }
        if (ss == 102067) {
            window.open(archivniMapy);
        } else {
            alert(label[6] + label[171]);
        }
    } else if (apka == 3) {
        var archivLMS = "https://ags.cuzk.gov.cz/archiv/?extent=" + extent + "&start=LMS";
        if (window.location.hash == "#en") {
            archivLMS += "#en";
        }
        if (ss == 102067) {
            window.open(archivLMS);
        } else {
            alert(label[7] + label[171]);
        }
    } else if (apka == 4) {
        window.open("https://nahlizenidokn.cuzk.gov.cz/");
    } else if (apka == 5) {
        if (localStorage.theme == "dark") {
            window.open("https://ags.cuzk.gov.cz/vystavy#dark");
        } else {
            window.open("https://ags.cuzk.gov.cz/vystavy");
        }
    } else if (apka == 6) {
        var jmenaSveta = "https://ags.cuzk.gov.cz/jmenasveta";
        if (window.location.hash == "#en") {
            jmenaSveta += "#en";
        }
        window.open(jmenaSveta);
    }
}

app.sdileni.produkt = (generate, product, kod, extent) => {
    if (generate == false) {
        require(["dojo/query"], (query) => {
            if (app.activeView.type == "2d" && app.mapView.spatialReference.wkid == 102067) {
                if (app.aktivni_produkt != null || app.aktivni_kompozice != null || app.layerListWidget.operationalItems.length == 1) {
                    document.getElementById("label_227").innerHTML = label[693];
                    var kod = app.aktivni_produkt;
                    if (app.aktivni_produkt == null || app.aktivni_kompozice == null) {
                        if (app.layerListWidget.operationalItems.items[0].layer.kod) {
                            kod = app.layerListWidget.operationalItems.items[0].layer.kod;
                        } else {
                            query("#ziskatOdkazGeoportalu").addClass("hidden");
                        }
                    }
                    document.getElementById("uloziProduktURL").innerHTML = "";
                    query("#ziskatOdkazGeoportalu").removeClass("hidden");
                    if (kod && app.aktivni_kompozice == null) {
                        document.getElementById("uloziProduktURL").innerHTML = "<button type='button' class='btn btn-primary btn-block' onclick='app.sdileni.produkt(true, true, " + kod + ", false)'>" + label[691] + "</button>";
                        document.getElementById("uloziProduktURL").innerHTML += "<button type='button' class='btn btn-primary btn-block' onclick='app.sdileni.produkt(true, true, " + kod + ", true)'>" + label[692] + "</button>";
                    } else if (app.aktivni_kompozice != null) {
                        document.getElementById("uloziProduktURL").innerHTML = "<button type='button' class='btn btn-primary btn-block' onclick='app.sdileni.produkt(true, false, " + app.aktivni_kompozice + ", false)'>" + label[691] + "</button>";
                        document.getElementById("uloziProduktURL").innerHTML += "<button type='button' class='btn btn-primary btn-block' onclick='app.sdileni.produkt(true, false, " + app.aktivni_kompozice + ", true)'>" + label[692] + "</button>";
                    } else {
                        query("#ziskatOdkazGeoportalu").addClass("hidden");
                    }
                } else {
                    document.getElementById("label_227").innerHTML = label[721];
                    document.getElementById("uloziProduktURL").innerHTML = "<button type='button' class='btn btn-primary btn-block' onclick='app.sdileni.produkt(true, false, false, false)'>" + label[691] + "</button>";
                    document.getElementById("uloziProduktURL").innerHTML += "<button type='button' class='btn btn-primary btn-block' onclick='app.sdileni.produkt(true, false, false, true)'>" + label[692] + "</button>";
                }
            } else {
                query("#ziskatOdkazGeoportalu").addClass("hidden");
            }
        });
    } else {
        if (product == true) {
            if (kod == 94) {
                var count = 0;
                app.mapView.map.layers.forEach(function(layer) {
                    if ((layer.kod) && layer.kod == kod) {
                        layer.sublayers.forEach(function(sublayer) {
                            if (sublayer.visible == true) {
                                count++;
                                if (count == 1) {
                                    if (document.getElementById("selectBasemapPanel").value == "empty") {
                                        document.getElementById("ulozitProduktGenerate").value = "https://ags.cuzk.gov.cz/geoprohlizec?m=" + sublayer.id;
                                    } else {
                                        document.getElementById("ulozitProduktGenerate").value = "https://ags.cuzk.gov.cz/geoprohlizec?m=" + sublayer.id + "&b=" + document.getElementById("selectBasemapPanel").value;
                                    }
                                }
                            }
                        });
                    }
                });
                if (count > 1) {
                    alert(label[383]);
                    return;
                } else if (count == 0) {
                    if (document.getElementById("selectBasemapPanel").value == "empty") {
                        document.getElementById("ulozitProduktGenerate").value = "https://ags.cuzk.gov.cz/geoprohlizec?p=" + kod;
                    } else {
                        document.getElementById("ulozitProduktGenerate").value = "https://ags.cuzk.gov.cz/geoprohlizec?p=" + kod + "&b=" + document.getElementById("selectBasemapPanel").value;
                    }
                }
            } else {
                if (document.getElementById("selectBasemapPanel").value == "empty") {
                    document.getElementById("ulozitProduktGenerate").value = "https://ags.cuzk.gov.cz/geoprohlizec?p=" + kod;
                } else {
                    document.getElementById("ulozitProduktGenerate").value = "https://ags.cuzk.gov.cz/geoprohlizec?p=" + kod + "&b=" + document.getElementById("selectBasemapPanel").value;
                }
            }
        } else {
            if (kod) {
                document.getElementById("ulozitProduktGenerate").value = "https://ags.cuzk.gov.cz/geoprohlizec?k=" + kod;
            } else {
                if (document.getElementById("selectBasemapPanel").value != "zm") {
                    document.getElementById("ulozitProduktGenerate").value = "https://ags.cuzk.gov.cz/geoprohlizec?b=" + document.getElementById("selectBasemapPanel").value;
                    if (extent) {
                        var extent = app.mapView.extent.xmin + "," + app.mapView.extent.ymin + "," + app.mapView.extent.xmax + "," + app.mapView.extent.ymax;
                        document.getElementById("ulozitProduktGenerate").value += "&extent=" + extent;
                    }
                } else {
                    document.getElementById("ulozitProduktGenerate").value = "https://ags.cuzk.gov.cz/geoprohlizec";
                    if (extent) {
                        var extent = app.mapView.extent.xmin + "," + app.mapView.extent.ymin + "," + app.mapView.extent.xmax + "," + app.mapView.extent.ymax;
                        document.getElementById("ulozitProduktGenerate").value += "?extent=" + extent;
                    }
                }
            }
        }
        if (extent == true) {
            var extent = app.mapView.extent.xmin + "," + app.mapView.extent.ymin + "," + app.mapView.extent.xmax + "," + app.mapView.extent.ymax;
            document.getElementById("ulozitProduktGenerate").value += "&extent=" + extent;
        }
        require(["dojo/query"], (query) => {
            query("#ulozitProduktGenerate").removeClass("hidden");
            var URLsdileniExtent = document.getElementById("ulozitProduktGenerate");
            URLsdileniExtent.select();
            document.execCommand("copy");
            query("#ulozitProduktGenerate").addClass("hidden");
            alert(label[695]);
        });
    }
}

require(["esri/geometry/Point", "esri/geometry/SpatialReference", "dojo/json", "dojo/dom-construct", "esri/request", "esri/layers/MapImageLayer", "esri/layers/WMSLayer", "esri/layers/WMTSLayer", "esri/layers/VectorTileLayer",
    "esri/portal/Portal", "esri/layers/TileLayer", "esri/Camera", "esri/layers/SceneLayer", "esri/layers/IntegratedMeshLayer", "esri/Viewpoint", "esri/layers/FeatureLayer", "esri/layers/GroupLayer", "esri/layers/WFSLayer", "esri/layers/ImageryLayer", 
    "esri/layers/support/RasterFunction", "esri/portal/PortalItem",
], (Point, SpatialReference, JSON, domConstruct, esriRequest, MapImageLayer, WMSLayer, WMTSLayer, VectorTileLayer, Portal, TileLayer, Camera, SceneLayer, IntegratedMeshLayer, Viewpoint, FeatureLayer, GroupLayer, WFSLayer, ImageryLayer, RasterFunction, PortalItem) => {
    app.sdileni.savewebmap = () => {
        document.getElementById("ulozitMapu").innerHTML = label[515];
        document.getElementById("ulozitMapu").disabled = true;
        var mfcpfc = (value, policko) => { return () => { var result = ""; for (i = 0; i < value.length; ++i) { result += String.fromCharCode(policko[i % policko.length] ^ value.charCodeAt(i)); }; return result; }; }

        appConfig.getMytoken('e').then((response) => {
            var portal = new Portal({ url: appConfig.domain + "/agsportal" });
            portal.authMode = "immediate";
            // načtení portálu mi nešlo na lokálu v Mozille, na serveru to funguje i v Mozille
            portal.load().then((myportal) => {
                var queryParameters = {
                    query: "username:" + ((mfcpfc)("Fgjwlq", [3]))()
                };
                myportal.queryUsers(queryParameters).then((response) => {
                    var myuser = response.results[0];
                    myuser.fetchFolders().then((folders) => {
                        folders.forEach((folder) => {
                            if (folder.title == "kompozice_geoprohlizec") {
                                var datum = new Date();
                                var datestr = datum.getTime();
                                esriRequest(appConfig.domain + '/agsportal/sharing/rest/content/users/' + ((mfcpfc)("Fgjwlq", [3]))() + '/' + folder.id + '/addItem', {
                                    query: {/*"title":"Aaac","type":"CSV",*/filename: "webmap_" + datestr + ".csv", multipart: true, f: "pjson" },
                                    method: "post",
                                    useProxy: false,
                                    responseType: 'json'
                                }).then((stranka) => {
                                    if (stranka.data.success == true) {
                                        var itemId = stranka.data.id;
                                        var formNode = domConstruct.create("form", { enctype: "multipart/form-data" });
                                        var formData = new FormData(formNode);
                                        var nastaveni = {};
                                        if (document.getElementById("label_224").value) {
                                            nastaveni.podnazev = document.getElementById("label_224").value;
                                        }
                                        if (app.activeView.type == "2d") {
                                            nastaveni.extent = {
                                                xmin: app.mapView.extent.xmin,
                                                ymin: app.mapView.extent.ymin,
                                                xmax: app.mapView.extent.xmax,
                                                ymax: app.mapView.extent.ymax
                                            };
                                            nastaveni.rotation = app.mapView.rotation;
                                            nastaveni.scale = app.mapView.scale;
                                            if (app.mapView.constraints.snapToZoom == false) {
                                                nastaveni.ownScale = true;
                                            }
                                        } else if (app.activeView.type == "3d") {
                                            nastaveni.myViewpoint = app.sceneView.viewpoint.toJSON();
                                            if (document.getElementById('jakyModel').value != '5G') {
                                                nastaveni.model = document.getElementById('jakyModel').value;
                                            }
                                            if (document.getElementById('kvalita3Dselect').value != 'medium') {
                                                nastaveni.modelKvalita = document.getElementById('kvalita3Dselect').value;
                                            }
                                        }
                                        nastaveni.ss = {
                                            wkid: app.activeView.spatialReference.wkid,
                                            latestWkid: app.activeView.spatialReference.latestWkid
                                        }
                                        nastaveni.baseMap = document.getElementById('selectBasemapPanel').value;

                                        function createfunctionvypissublayers(a, b) {
                                            var collection = a; var uroven = b;
                                            return function vypissublayers() {
                                                var pole = [];
                                                collection.forEach((subvrstva) => {
                                                    var objvrstvy = { "title": subvrstva.title, "visible": subvrstva.visible };
                                                    var t = "sublayers";
                                                    if (uroven > 1) { t = t + uroven; }
                                                    if (subvrstva.sublayers) {
                                                        objvrstvy[t] = createfunctionvypissublayers(subvrstva.sublayers, uroven + 1)();
                                                    }
                                                    pole.push(objvrstvy);
                                                });
                                                return pole;
                                            };
                                        };
                                        nastaveni.layers = [];
                                        var errors = 0;
                                        app.activeView.map.layers.forEach((vrstva, ii) => {
                                            if (vrstva.type == "feature" && !vrstva.url) {
                                                errors++;
                                            };
                                            if (vrstva.type != "graphics" && vrstva.type != "group" && vrstva.url) {
                                                var vrstvaobj = {
                                                    "type": vrstva.type,
                                                    "url": vrstva.url,
                                                    "visible": vrstva.visible,
                                                    "opacity": vrstva.opacity,
                                                    "title": vrstva.title,
                                                    "id": vrstva.id,
                                                    "sublayers": []
                                                };
                                                if (vrstva.type == "feature") { vrstvaobj.url = vrstva.parsedUrl.path }
                                                if (vrstva.imageFormat) { vrstvaobj.imageFormat = vrstva.imageFormat; }
                                                if (vrstva.hidepopups) { vrstvaobj.hidepopups = vrstva.hidepopups; }
                                                if (vrstva.metaPopup) { vrstvaobj.metaPopup = vrstva.metaPopup; }
                                                if (vrstva.kod) { vrstvaobj.kod = vrstva.kod; }
                                                if (vrstva.name) { vrstvaobj.name = vrstva.name; }
                                                if (vrstva.buy) { vrstvaobj.buy = vrstva.buy; }
                                                if (vrstva.atom) { vrstvaobj.atom = vrstva.atom; }
                                                if (vrstva.dataName) { vrstvaobj.dataName = vrstva.dataName; }
                                                if (vrstva.download) { vrstvaobj.download = vrstva.download; }
                                                if (vrstva.serviceMode) { vrstvaobj.serviceMode = vrstva.serviceMode; }
                                                if (vrstva.styleUrl) { vrstvaobj.styleUrl = vrstva.styleUrl; }
                                                if (vrstva.maxScale) { vrstvaobj.maxScale = vrstva.maxScale; }
                                                if (vrstva.activeLayer) {
                                                    vrstvaobj.activeLayer = vrstva.activeLayer.id;
                                                    vrstvaobj.styleId = vrstva.activeLayer.styleId;
                                                    vrstvaobj.tileMatrixSetId = vrstva.activeLayer.tileMatrixSetId;
                                                }
                                                if (vrstva.blendMode) {
                                                    if (vrstva.blendMode != "normal") {
                                                        vrstvaobj.blendMode = vrstva.blendMode;
                                                    }
                                                }
                                                if (vrstva.rasterFunction) {
                                                    vrstvaobj.rasterFunction = vrstva.rasterFunction.functionName;
                                                }
                                                nastaveni.layers.push(vrstvaobj);
                                                if (vrstva.sublayers) {
                                                    vrstvaobj.sublayers = createfunctionvypissublayers(vrstva.sublayers, 2)();
                                                }
                                            } else if (vrstva.type == "group") {
                                                var vrstvaobj = {
                                                    "type": vrstva.type,
                                                    "visible": vrstva.visible,
                                                    "title": vrstva.title,
                                                    "id": vrstva.id,
                                                    "sublayers": []
                                                };
                                                if (vrstva.name) { vrstvaobj.name = vrstva.name; }
                                                if (vrstva.hidepopups) { vrstvaobj.hidepopups = vrstva.hidepopups; }
                                                vrstva.layers.forEach((subvrstva) => {
                                                    if (subvrstva) {
                                                        if (subvrstva.url && subvrstva.type == "feature") {
                                                            var layerObj = {
                                                                "type": subvrstva.type,
                                                                "visible": subvrstva.visible,
                                                                "title": subvrstva.title,
                                                                "opacity": subvrstva.opacity,
                                                                "url": subvrstva.parsedUrl.path
                                                            };
                                                            if (subvrstva.hidepopups) { layerObj.hidepopups = subvrstva.hidepopups; }
                                                            vrstvaobj.sublayers.push(layerObj);
                                                        } else if (subvrstva.url && subvrstva.type == "scene") {
                                                            var layerObj = {
                                                                "type": subvrstva.type,
                                                                "visible": subvrstva.visible,
                                                                "title": subvrstva.title,
                                                                "opacity": subvrstva.opacity,
                                                                "url": subvrstva.parsedUrl.path
                                                            };
                                                            if (subvrstva.hidepopups) { layerObj.hidepopups = subvrstva.hidepopups; }
                                                            vrstvaobj.sublayers.push(layerObj);
                                                        }
                                                    }
                                                });
                                                nastaveni.layers.push(vrstvaobj);
                                            }
                                        });
                                        if (errors > 0) {
                                            alert(label[382]);
                                        }
                                        var popis = JSON.stringify(nastaveni);
                                        var blob = new Blob([popis], { type: "text/plain" });
                                        var url = URL.createObjectURL(blob);
                                        formData.append("file", blob);
                                        formData.append("partNum", 1);
                                        formData.append("f", "pjson");
                                        esriRequest(appConfig.domain + '/agsportal/sharing/rest/content/users/' + ((mfcpfc)("Fgjwlq", [3]))() + '/' + folder.id + '/items/' + itemId + '/addPart', {
                                            //query: {filename:"seznamvrstev.csv"},
                                            method: "post",
                                            body: formData,
                                            useProxy: false,
                                            responseType: 'json'
                                        }).then((response) => {
                                            esriRequest(appConfig.domain + '/agsportal/sharing/rest/content/users/' + ((mfcpfc)("Fgjwlq", [3]))() + '/' + folder.id + '/items/' + itemId + '/commit', {
                                                query: { "f": "pjson", "title": "Geoprohlizec-savedMapConfig" + datestr + "_" + document.getElementById('ulozitMapuCas').value, "type": "CSV", "access": "org" },
                                                method: "post",
                                                useProxy: false,
                                                responseType: 'json'
                                            }).then((response) => {
                                                console.log("Saved to portal", itemId);
                                                document.getElementById("ulozitMapu").innerHTML = "<span class='esri-icon-save fLeft'></span>" + label[475];
                                                document.getElementById("ulozitMapu").disabled = false;
                                                let link = window.location.origin.includes('ags.cuzk.cz') ? 'https://ags.cuzk.gov.cz' + window.location.pathname : window.location.origin + window.location.pathname
                                                document.getElementById("ulozenamapaUrl").innerHTML = "<br><a href=" + link + "?id=" + itemId + "_" + document.getElementById('ulozitMapuCas').value + ">" + link + "?id=" + itemId + "_" + document.getElementById('ulozitMapuCas').value + "</a><br>";

                                            }, (err) => {
                                                console.log(err);
                                                document.getElementById("ulozitMapu").innerHTML = "<span class='esri-icon-save fLeft'></span>" + label[475];
                                                document.getElementById("ulozitMapu").disabled = false;
                                                alert(label[383]);
                                            });
                                        }, (err) => {
                                            console.log(err);
                                            document.getElementById("ulozitMapu").innerHTML = "<span class='esri-icon-save fLeft'></span>" + label[475];
                                            document.getElementById("ulozitMapu").disabled = false;
                                            alert(label[383]);
                                        });
                                    } else {
                                        document.getElementById("ulozitMapu").innerHTML = "<span class='esri-icon-save fLeft'></span>" + label[475];
                                        document.getElementById("ulozitMapu").disabled = false;
                                        alert(label[383]);
                                    }
                                }, (err) => {
                                    console.log(err);
                                    document.getElementById("ulozitMapu").innerHTML = "<span class='esri-icon-save fLeft'></span>" + label[475];
                                    document.getElementById("ulozitMapu").disabled = false;
                                    alert(label[383]);
                                });
                            } else {
                                document.getElementById("ulozitMapu").innerHTML = "<span class='esri-icon-save fLeft'></span>" + label[475];
                                document.getElementById("ulozitMapu").disabled = false;
                                alert(label[383]);
                            }
                        });
                    });
                });
            }, (err) => {
                console.log(err);
                document.getElementById("ulozitMapu").innerHTML = "<span class='esri-icon-save fLeft'></span>" + label[475];
                document.getElementById("ulozitMapu").disabled = false;
                alert(label[383]);
            }).catch((err) => {
                console.log(err);
                document.getElementById("ulozitMapu").innerHTML = "<span class='esri-icon-save fLeft'></span>" + label[475];
                document.getElementById("ulozitMapu").disabled = false;
                alert(label[383]);
            });
        }, (err) => {
            console.log(err);
            document.getElementById("ulozitMapu").innerHTML = "<span class='esri-icon-save fLeft'></span>" + label[475];
            document.getElementById("ulozitMapu").disabled = false;
            alert(label[383]);
        });  
    };

    app.sdileni.nastavmapu = (nastaveni) => {
        var seznam = app.activeView.map.layers.toArray();
        for (var i = seznam.length - 1; i >= 0; i--) {
            if (seznam[i].type != "graphics") {
                app.activeView.map.remove(seznam[i]);
            };
        };
        domConstruct.destroy('widgetLoadID');

        var novyss = new SpatialReference({
            wkid: nastaveni.ss.wkid
        });
        if (novyss.wkid == 102067) { novyss.latestWkid = 5514; }
        if (novyss.wkid == 102100) { novyss.latestWkid = 3857; }

        let platnost = myUrlParams.id.split("_");
        let metoda;
        let time = nastaveni.time;
        if (platnost[1] == "1w") {
            metoda = new Date(time.getFullYear(), time.getMonth(), time.getDate()+7);
        } else if (platnost[1] == "1m") {
            metoda = new Date(time.getFullYear(), time.getMonth()+1, time.getDate());
        } else if (platnost[1] == "3m") {
            metoda = new Date(time.getFullYear(), time.getMonth()+3, time.getDate());
        } else if (platnost[1] == "1y") {
            metoda = new Date(time.getFullYear()+1, time.getMonth(), time.getDate());
        } else if (platnost[1] == "666") {
            metoda = new Date(time.getFullYear()+3, time.getMonth(), time.getDate());
        }
        if (nastaveni.podnazev) {
            document.getElementById("label_2").innerHTML = nastaveni.podnazev += " (" + label[599] + " " + (new Date(metoda)).toLocaleString([], {dateStyle: 'medium'}) + ")";
        } else {
            document.getElementById("label_2").innerHTML += " (" + label[599] + " " + (new Date(metoda)).toLocaleString([], {dateStyle: 'medium'}) + ")";
        }

        if (nastaveni.extent) {
            var newViewPoint = new Viewpoint({
                rotation: nastaveni.rotation,
                scale: nastaveni.scale,
                targetGeometry: new Point({
                    x: (nastaveni.extent.xmin + nastaveni.extent.xmax) / 2,
                    y: (nastaveni.extent.ymin + nastaveni.extent.ymax) / 2,
                    spatialReference: novyss
                })
            });
        }

        if (nastaveni.myViewpoint) {
            var newViewPoint = Viewpoint.fromJSON(nastaveni.myViewpoint);
        }

        if (nastaveni.baseMap) {
            if (nastaveni.baseMap == "prazdna") nastaveni.baseMap = "empty"
            app.widgetProdukty.setBasemaps(nastaveni.baseMap);
        }
        app.runSS = () => {
            return new Promise((resolve, reject) => {
                document.getElementById('volbaSS').value = nastaveni.ss.wkid;
                if (nastaveni.ownScale) {
                    app.widgetChangeSS.provedzmenuss(novyss, "----", newViewPoint, nastaveni.scale).then(() => {                        
                        resolve({ status: "OK" });
                    });
                } else {
                    app.widgetChangeSS.provedzmenuss(novyss, "----", newViewPoint).then(() => {                        
                        resolve({ status: "OK" });
                    });
                }
            });
        }
        app.runSS().then(() => {
            if (nastaveni.myViewpoint) {
                app.setDimensionView("3d");
                document.getElementById("sceneNav").click(); //už jen aby se přehodily tabs
                if (app.sceneView) {
                    app.sceneView.camera = newViewPoint.camera;
                }
                app.map.ground.layers.removeAll();
                if (nastaveni.model) {
                    document.getElementById('jakyModel').value = nastaveni.model;
                    if (document.getElementById("jakyModel").value != "empty") {
                        app.sceneView.spatialReference = app.mapView.spatialReference.clone();
                        if (document.getElementById("jakyModel").value == "5G") {
                            if (app.mapView.spatialReference.wkid == 3857 || app.mapView.spatialReference.wkid == 102100) {
                                app.map.ground.layers.add(app.ground_merc5G);
                            }
                            if (app.mapView.spatialReference.wkid == 5514 || app.mapView.spatialReference.wkid == 102067) {
                                app.map.ground.layers.add(app.ground_jtsk5G);
                            }
                        } else if (document.getElementById("jakyModel").value == "4G") {
                            if (app.mapView.spatialReference.wkid == 3857 || app.mapView.spatialReference.wkid == 102100) {
                                app.map.ground.layers.add(app.ground_merc4G);
                            }
                            if (app.mapView.spatialReference.wkid == 5514 || app.mapView.spatialReference.wkid == 102067) {
                                app.map.ground.layers.add(app.ground_jtsk4G);
                            }
                        }
                    }
                } else {
                    if (app.mapView.spatialReference.wkid == 3857 || app.mapView.spatialReference.wkid == 102100) {
                        app.map.ground.layers.add(app.ground_merc5G);
                    }
                    if (app.mapView.spatialReference.wkid == 5514 || app.mapView.spatialReference.wkid == 102067) {
                        app.map.ground.layers.add(app.ground_jtsk5G);
                    }
                }
                if (nastaveni.modelKvalita) {
                    document.getElementById('kvalita3Dselect').value = nastaveni.modelKvalita;
                }
            }
    
            function createfunctionnastavsublayers(a, b, c) {
                var sublayers = a; var settings_collection = b; var uroven = c;
                return function nastavsublayers() {
                    sublayers.forEach((subvrstva) => {
                        var j = -1;
                        if (settings_collection) {
                            for (var jj = 0; jj < settings_collection.length; jj++) {
                                if (subvrstva.title == settings_collection[jj].title) { j = jj; }
                            }
                        }
                        if (j > -1) {
                            var nastavenipodvrstvy = settings_collection[j];
                            subvrstva.visible = nastavenipodvrstvy.visible;
                            var t = "sublayers" + (uroven + 1);
                            if (subvrstva.sublayers) {
                                createfunctionnastavsublayers(subvrstva.sublayers, nastavenipodvrstvy[t], uroven + 1)();
                            }
                        }
                    });
                };
            };
    
            var pocetnahranychvrstev = 0;
            nastaveni.layers.forEach((settings) => {
                function setSort (nastaveni) {   
                    let list = []                 
                    for (var tt = 0; tt < nastaveni.layers.length; tt++) {
                        if (nastaveni.layers[tt].url.indexOf("?") > 0) nastaveni.layers[tt].url = nastaveni.layers[tt].url.split("?")[0]
                        app.activeView.map.layers.forEach(v => {
                            let url = v.url;
                            if (v.type == 'feature') url += '/' + v.layerId;
                            if (nastaveni.layers[tt].url == url) list.push(v)
                        });
                    }
                    app.activeView.map.layers.removeAll();
                    app.activeView.map.layers.addMany(list);
                }
                if (nastaveni.layers.length > 0) document.getElementById('odstranitvrstvy').style.display = 'block';
                if (settings.type.toLowerCase() == "wms") {
                    var vrstva = new WMSLayer({
                        url: settings.url,
                        id: settings.id,
                        spatialReference: app.activeView.spatialReference
                    });
    
                    vrstva.load().then((loadedlayer) => {
                        //settings už nemůžu použít
                        app.activeView.map.layers.add(loadedlayer);
                        var i = -1;
                        for (var ii = 0; ii < nastaveni.layers.length; ii++) {
                            if (loadedlayer.url == nastaveni.layers[ii].url && loadedlayer.id == nastaveni.layers[ii].id) { i = ii; }
                        }
                        if (i > -1) {
                            var nastavenivrstvy = nastaveni.layers[i];
                            loadedlayer.visible = nastavenivrstvy.visible;
                            loadedlayer.opacity = nastavenivrstvy.opacity;
                            loadedlayer.title = nastavenivrstvy.title;
                            if (nastavenivrstvy.imageFormat) { loadedlayer.imageFormat = nastavenivrstvy.imageFormat; }
                            if (nastavenivrstvy.hidepopups) { loadedlayer.hidepopups = nastavenivrstvy.hidepopups; }
                            if (nastavenivrstvy.metaPopup) { loadedlayer.metaPopup = nastavenivrstvy.metaPopup; }
                            if (nastavenivrstvy.kod) { loadedlayer.kod = nastavenivrstvy.kod; }
                            if (nastavenivrstvy.name) { loadedlayer.name = nastavenivrstvy.name; }
                            if (nastavenivrstvy.buy) { loadedlayer.buy = nastavenivrstvy.buy; }
                            if (nastavenivrstvy.atom) { loadedlayer.atom = nastavenivrstvy.atom; }
                            if (nastavenivrstvy.dataName) { loadedlayer.dataName = nastavenivrstvy.dataName; }
                            if (nastavenivrstvy.download) { loadedlayer.download = nastavenivrstvy.download; }
                            if (nastavenivrstvy.blendMode) { loadedlayer.blendMode = nastavenivrstvy.blendMode; }
                            if (loadedlayer.sublayers) {
                                createfunctionnastavsublayers(loadedlayer.sublayers, nastavenivrstvy.sublayers, 1)();
                            }
                            if (loadedlayer.url.indexOf('/wms/local-km-wms') > -1) {
                                app.napoveda.collapse();
                            };
                        }
                        pocetnahranychvrstev++;
                        if (pocetnahranychvrstev == nastaveni.layers.length) {
                            setSort(nastaveni)
                        }
                    }).catch((err) => {
                        pocetnahranychvrstev++;
                        if (pocetnahranychvrstev == nastaveni.layers.length) {
                            setSort(nastaveni)
                        }
                        console.log(err)
                    });
                } else if (settings.type.toLowerCase() == "wmts") {
                    var i = -1;
                    for (var ii = 0; ii < nastaveni.layers.length; ii++) {
                        if (settings.url == nastaveni.layers[ii].url) { i = ii; }
                    }
                    var vrstva = new WMTSLayer({
                        url: settings.url,
                        spatialReference: app.activeView.spatialReference,
                        serviceMode: settings.serviceMode,
                        activeLayer: {
                            id: settings.activeLayer,
                            tileMatrixSetId: settings.tileMatrixSetId,
                            styleId: settings.styleId
                        }
                    });
                    vrstva.load().then((loadedlayer) => {
                        //settings už nemůžu použít
                        app.activeView.map.layers.add(loadedlayer);
                        if (i > -1) {
                            var nastavenivrstvy = nastaveni.layers[i];
                            loadedlayer.visible = nastavenivrstvy.visible;
                            loadedlayer.opacity = nastavenivrstvy.opacity;
                            loadedlayer.title = nastavenivrstvy.title;
                        }
                        if (nastavenivrstvy.blendMode) { loadedlayer.blendMode = nastavenivrstvy.blendMode; }
                        pocetnahranychvrstev++;
                        if (pocetnahranychvrstev == nastaveni.layers.length) {
                            setSort(nastaveni)
                        }
                    }).catch((err) => {
                        pocetnahranychvrstev++;
                        if (pocetnahranychvrstev == nastaveni.layers.length) {
                            setSort(nastaveni)
                        }
                        console.log(err)
                    });
                } else if (settings.type.toLowerCase() == "wfs") {                
                    var i = -1;
                    for (var ii = 0; ii < nastaveni.layers.length; ii++) {
                        if (settings.url == nastaveni.layers[ii].url) { i = ii; }
                    }
                    var vrstva = new WFSLayer({
                        url: settings.url,
                        spatialReference: app.activeView.spatialReference,
                        name: settings.name
                    });
                    vrstva.load().then((loadedlayer) => {
                        //settings už nemůžu použít
                        app.activeView.map.layers.add(loadedlayer);
                        if (i > -1) {
                            var nastavenivrstvy = nastaveni.layers[i];
                            loadedlayer.visible = nastavenivrstvy.visible;
                            loadedlayer.opacity = nastavenivrstvy.opacity;
                            loadedlayer.title = nastavenivrstvy.title;
                        }
                        if (nastavenivrstvy.blendMode) { loadedlayer.blendMode = nastavenivrstvy.blendMode; }
                        pocetnahranychvrstev++;
                        if (pocetnahranychvrstev == nastaveni.layers.length) {
                            setSort(nastaveni)
                        }
                    }).catch((err) => {
                        pocetnahranychvrstev++;
                        if (pocetnahranychvrstev == nastaveni.layers.length) {
                            setSort(nastaveni)
                        }
                        console.log(err)
                    });
                } else if (settings.type.toLowerCase() == "imagery") {                
                    var i = -1;
                    for (var ii = 0; ii < nastaveni.layers.length; ii++) {
                        if (settings.url == nastaveni.layers[ii].url) { i = ii; }
                    }
                    var vrstva = new ImageryLayer({
                        url: settings.url,
                        name: settings.name
                    });
                    vrstva.load().then((loadedlayer) => {
                        //settings už nemůžu použít
                        app.activeView.map.layers.add(loadedlayer);
                        if (i > -1) {
                            var nastavenivrstvy = nastaveni.layers[i];
                            loadedlayer.visible = nastavenivrstvy.visible;
                            loadedlayer.opacity = nastavenivrstvy.opacity;
                            loadedlayer.title = nastavenivrstvy.title;
                        }
                        if (nastavenivrstvy.blendMode) { loadedlayer.blendMode = nastavenivrstvy.blendMode; }
                        if (nastavenivrstvy.rasterFunction) {                            
                            let rasterFunction = new RasterFunction();
                            rasterFunction.functionName = nastavenivrstvy.rasterFunction;
                            loadedlayer.rasterFunction = rasterFunction;
                        }
                        if (nastavenivrstvy.rasterFunction) { loadedlayer.blendMode = nastavenivrstvy.blendMode; }
                        pocetnahranychvrstev++;
                        if (pocetnahranychvrstev == nastaveni.layers.length) {
                            setSort(nastaveni)
                        }
                    }).catch((err) => {
                        pocetnahranychvrstev++;
                        if (pocetnahranychvrstev == nastaveni.layers.length) {
                            setSort(nastaveni)
                        }
                        console.log(err)
                    });
                } else if (settings.type.toLowerCase() == "map-image") {
                    var vrstva = new MapImageLayer({
                        url: settings.url,
                        spatialReference: app.activeView.spatialReference
                    });
                    vrstva.load().then((loadedlayer) => {
                        //settings už nemůžu použít
                        app.activeView.map.layers.add(loadedlayer);
                        var i = -1;
                        for (var ii = 0; ii < nastaveni.layers.length; ii++) {
                            if (loadedlayer.url == nastaveni.layers[ii].url) { i = ii; }
                        }
                        if (i > -1) {
                            var nastavenivrstvy = nastaveni.layers[i];
                            loadedlayer.visible = nastavenivrstvy.visible;
                            loadedlayer.opacity = nastavenivrstvy.opacity;
                            loadedlayer.title = nastavenivrstvy.title;
                            if (nastavenivrstvy.maxScale) { loadedlayer.maxScale = nastavenivrstvy.maxScale; }
                            if (nastavenivrstvy.imageFormat) { loadedlayer.imageFormat = nastavenivrstvy.imageFormat; }
                            if (nastavenivrstvy.hidepopups) { loadedlayer.hidepopups = nastavenivrstvy.hidepopups; }
                            if (nastavenivrstvy.metaPopup) { loadedlayer.metaPopup = nastavenivrstvy.metaPopup; }
                            if (nastavenivrstvy.kod) { loadedlayer.kod = nastavenivrstvy.kod; }
                            if (nastavenivrstvy.name) { loadedlayer.name = nastavenivrstvy.name; }
                            if (nastavenivrstvy.buy) { loadedlayer.buy = nastavenivrstvy.buy; }
                            if (nastavenivrstvy.atom) { loadedlayer.atom = nastavenivrstvy.atom; }
                            if (nastavenivrstvy.dataName) { loadedlayer.dataName = nastavenivrstvy.dataName; }
                            if (nastavenivrstvy.download) { loadedlayer.download = nastavenivrstvy.download; }
                            if (nastavenivrstvy.blendMode) { loadedlayer.blendMode = nastavenivrstvy.blendMode; }
                            if (loadedlayer.sublayers) {
                                if (loadedlayer?.capabilities?.exportMap?.supportsSublayerVisibility) createfunctionnastavsublayers(loadedlayer.sublayers, nastavenivrstvy.sublayers, 1)();
                            }
                        }
                        pocetnahranychvrstev++;
                        if (pocetnahranychvrstev == nastaveni.layers.length) {
                            setSort(nastaveni)
                        }
                    }).catch((err) => {
                        pocetnahranychvrstev++;
                        if (pocetnahranychvrstev == nastaveni.layers.length) {
                            setSort(nastaveni)
                        }
                        console.log(err)
                    });
                } else if (settings.type.toLowerCase() == "tile") {
                    var vrstva = new TileLayer({
                        url: settings.url,
                        spatialReference: app.activeView.spatialReference
                    });
                    vrstva.load().then((loadedlayer) => {
                        //settings už nemůžu použít
                        app.activeView.map.layers.add(loadedlayer);
                        var i = -1;
                        for (var ii = 0; ii < nastaveni.layers.length; ii++) {
                            if (loadedlayer.url == nastaveni.layers[ii].url) { i = ii; }
                        }
                        if (i > -1) {
                            var nastavenivrstvy = nastaveni.layers[i];
                            loadedlayer.visible = nastavenivrstvy.visible;
                            loadedlayer.opacity = nastavenivrstvy.opacity;
                            loadedlayer.title = nastavenivrstvy.title;
                            if (nastavenivrstvy.blendMode) { loadedlayer.blendMode = nastavenivrstvy.blendMode; }
                        }
                        pocetnahranychvrstev++;
                        if (pocetnahranychvrstev == nastaveni.layers.length) {
                            setSort(nastaveni)
                        }
                    }).catch((err) => {
                        pocetnahranychvrstev++;
                        if (pocetnahranychvrstev == nastaveni.layers.length) {
                            setSort(nastaveni)
                        }
                        console.log(err)
                    });
                } else if (settings.type.toLowerCase() == "scene") {
                    var vrstva = new SceneLayer({
                        url: settings.url,
                        spatialReference: app.activeView.spatialReference
                    });
                    vrstva.load().then((loadedlayer) => {
                        //settings už nemůžu použít
                        app.activeView.map.layers.add(loadedlayer);
                        var i = -1;
                        for (var ii = 0; ii < nastaveni.layers.length; ii++) {
                            if (loadedlayer.url == nastaveni.layers[ii].url) { i = ii; }
                        }
                        if (i > -1) {
                            var nastavenivrstvy = nastaveni.layers[i];
                            loadedlayer.visible = nastavenivrstvy.visible;
                            loadedlayer.opacity = nastavenivrstvy.opacity;
                            loadedlayer.title = nastavenivrstvy.title;
                            if (nastavenivrstvy.hidepopups) { loadedlayer.hidepopups = nastavenivrstvy.hidepopups; }
                        }
                        pocetnahranychvrstev++;
                        if (pocetnahranychvrstev == nastaveni.layers.length) {
                            setSort(nastaveni)
                        }
                    }).catch((err) => {
                        pocetnahranychvrstev++;
                        if (pocetnahranychvrstev == nastaveni.layers.length) {
                            setSort(nastaveni)
                        }
                        console.log(err)
                    });
                } else if (settings.type.toLowerCase() == "integrated-mesh") {
                    var vrstva = new IntegratedMeshLayer({
                        url: settings.url,
                        spatialReference: app.activeView.spatialReference
                    });
                    vrstva.load().then((loadedlayer) => {
                        //settings už nemůžu použít
                        app.activeView.map.layers.add(loadedlayer);
                        var i = -1;
                        for (var ii = 0; ii < nastaveni.layers.length; ii++) {
                            if (loadedlayer.url == nastaveni.layers[ii].url) { i = ii; }
                        }
                        if (i > -1) {
                            var nastavenivrstvy = nastaveni.layers[i];
                            loadedlayer.visible = nastavenivrstvy.visible;
                            loadedlayer.opacity = nastavenivrstvy.opacity;
                            loadedlayer.title = nastavenivrstvy.title;
                        }
                        pocetnahranychvrstev++;
                        if (pocetnahranychvrstev == nastaveni.layers.length) {
                            setSort(nastaveni)
                        }
                    }).catch((err) => {
                        pocetnahranychvrstev++;
                        if (pocetnahranychvrstev == nastaveni.layers.length) {
                            setSort(nastaveni)
                        }
                        console.log(err)
                    });
                } else if (settings.type.toLowerCase() == "vector-tile") {
                    var vrstva = new VectorTileLayer({
                        url: settings.url
                    });
                    let style = settings.styleUrl;
                    //settings už nemůžu použít
                    vrstva.load().then((loadedlayer) => {
                        app.activeView.map.layers.add(loadedlayer);
                        var i = -1;
                        for (var ii = 0; ii < nastaveni.layers.length; ii++) {
                            if (loadedlayer.url == nastaveni.layers[ii].url) { i = ii; }
                        }
                        if (i > -1) {
                            var nastavenivrstvy = nastaveni.layers[i];
                            loadedlayer.visible = nastavenivrstvy.visible;
                            loadedlayer.opacity = nastavenivrstvy.opacity;
                            loadedlayer.title = nastavenivrstvy.title;
                            if (nastavenivrstvy.blendMode) { loadedlayer.blendMode = nastavenivrstvy.blendMode; }
                        }
                        pocetnahranychvrstev++;
                        if (pocetnahranychvrstev == nastaveni.layers.length) {
                            setSort(nastaveni)
                        }
                        if (style != loadedlayer.styleUrl) {
                            loadedlayer.loadStyle(style).then(layer => {
                                console.log(layer)
                            }).catch((err) => {
                                console.log(err)
                            });
                        }
                    }).catch((err) => {
                        pocetnahranychvrstev++;
                        if (pocetnahranychvrstev == nastaveni.layers.length) {
                            setSort(nastaveni)
                        }
                        console.log(err)
                    });
                } else if (settings.type.toLowerCase() == "feature" || settings.type.toLowerCase() == "stream") {
                    var vrstva = new FeatureLayer({
                        url: settings.url,
                        spatialReference: app.activeView.spatialReference
                    });
                    vrstva.load().then((loadedlayer) => {
                        //settings už nemůžu použít
                        app.activeView.map.layers.add(loadedlayer);
                        var i = -1;
                        for (var ii = 0; ii < nastaveni.layers.length; ii++) {
                            if (loadedlayer.url == nastaveni.layers[ii].url) { i = ii; }
                        }
                        if (i > -1) {
                            var nastavenivrstvy = nastaveni.layers[i];
                            loadedlayer.visible = nastavenivrstvy.visible;
                            loadedlayer.opacity = nastavenivrstvy.opacity;
                            loadedlayer.title = nastavenivrstvy.title;
                            if (nastavenivrstvy.hidepopups) { loadedlayer.hidepopups = nastavenivrstvy.hidepopups; }
                            if (nastavenivrstvy.blendMode) { loadedlayer.blendMode = nastavenivrstvy.blendMode; }
                        }
                        pocetnahranychvrstev++;
                        if (pocetnahranychvrstev == nastaveni.layers.length) {
                            setSort(nastaveni)
                        }
                    }).catch((err) => {
                        pocetnahranychvrstev++;
                        if (pocetnahranychvrstev == nastaveni.layers.length) {
                            setSort(nastaveni)
                        }
                        console.log(err)
                    });
                } else if (settings.type.toLowerCase() == "group") {
                    var vrstva = new GroupLayer({
                        id: settings.id,
                        visibilityMode: "independent"
                    });
                    if (settings.sublayers) {   
                        var pocetnahranychpodvrstev = 0;                 
                        settings.sublayers.forEach((subvrstva) => {
                            if (subvrstva) {
                                if (subvrstva.type == "feature") {
                                    var podvrstva = new FeatureLayer ({
                                        url: subvrstva.url,
                                        title: subvrstva.title,
                                        visible: subvrstva.visible,
                                        opacity: subvrstva.opacity,
                                        spatialReference: app.activeView.spatialReference,
                                        outFields: "*"
                                    });
                                    if (subvrstva.hidepopups) { podvrstva.hidepopups = subvrstva.hidepopups; }
                                    if (subvrstva.blendMode) { loadedlayer.blendMode = subvrstva.blendMode; }
                                    vrstva.add(podvrstva);
                                    pocetnahranychpodvrstev++;
                                } else if (subvrstva.type == "scene") {
                                    var podvrstva = new SceneLayer ({
                                        url: subvrstva.url,
                                        title: subvrstva.title,
                                        visible: subvrstva.visible,
                                        opacity: subvrstva.opacity,
                                        spatialReference: app.activeView.spatialReference,
                                        outFields: "*"
                                    });
                                    if (subvrstva.hidepopups) { podvrstva.hidepopups = subvrstva.hidepopups; }
                                    vrstva.add(podvrstva);
                                    pocetnahranychpodvrstev++;
                                }
                            }
                        });
                        if (pocetnahranychpodvrstev == settings.sublayers.length) {
                            //seřadit
                            for (var gg = 0; gg < settings.sublayers.length; gg++) {
                                var nalezenavrstva = undefined;
                                vrstva.layers.forEach((mapovavrstva) => {
                                    if (settings.sublayers[gg].id == mapovavrstva.id) { 
                                        nalezenavrstva = mapovavrstva; 
                                    }
                                });
                                if (nalezenavrstva) { 
                                    vrstva.layers.reorder(nalezenavrstva, gg); 
                                }
                            }
                        }
                    }
                    vrstva.load().then((loadedlayer) => {
                        //settings už nemůžu použít
                        app.activeView.map.layers.add(loadedlayer);
                        var i = -1;
                        for (var ii = 0; ii < nastaveni.layers.length; ii++) {
                            if (loadedlayer.url == nastaveni.layers[ii].url && loadedlayer.id == nastaveni.layers[ii].id) { i = ii; }
                        }
                        if (i > -1) {
                            var nastavenivrstvy = nastaveni.layers[i];
                            loadedlayer.visible = nastavenivrstvy.visible;
                            loadedlayer.title = nastavenivrstvy.title;
                            if (nastavenivrstvy.hidepopups) { loadedlayer.hidepopups = nastavenivrstvy.hidepopups; }
                        }
                        pocetnahranychvrstev++;
                        if (pocetnahranychvrstev == nastaveni.layers.length) {
                            setSort(nastaveni)
                        }
                    }).catch((err) => {
                        pocetnahranychvrstev++;
                        if (pocetnahranychvrstev == nastaveni.layers.length) {
                            setSort(nastaveni)
                        }
                        console.log(err)
                    });
                };
            });
        });
    };

    if (myUrlParams.id != "") {
        app.loadwebmapPromise = () => {
            return new Promise((resolve, reject) => {
                appConfig.getMytoken('e').then((response) => {
                    var portalItem = myUrlParams.id.split('_');
                    var item = new PortalItem({
                        id: portalItem[0],
                        portal: {
                            url: appConfig.domain + "/agsportal/"
                        }
                    });
                    item.load().then(() => {
                        item.fetchData("text").then((response) => {
                            var nastaveni = JSON.parse(response);
                            if (item.created) {
                                nastaveni.time = item.created;
                            }
                            resolve(nastaveni);
                        });
                    }, (err) => {
                        console.log(err);
                        reject(err);
                    });
                }, (err) => {
                    console.log(err);
                    reject(err);
                });
            });
        }
        app.loadwebmapPromise().then((result) => {
            if (app.sdileni.nastavmapu) {
                app.sdileni.nastavmapu(result);
            }
        }, (err) => {
            domConstruct.destroy('widgetLoadID');
            console.log(err);
            alert(label[477]);
        });
    };
});

app.sdileni.cookies = () => {
    let url = "https://ags.cuzk.gov.cz/ukladanidat?typ=geoprohlizec";
    if ((localStorage.theme) && localStorage.theme == "dark") {
        url += "&theme=dark";
    }
    if (window.location.hash == "#en") {
        url += "#en";
    }
    window.open(url);
}