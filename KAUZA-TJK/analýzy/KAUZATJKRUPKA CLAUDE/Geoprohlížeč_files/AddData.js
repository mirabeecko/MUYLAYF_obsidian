//widget Přidat vrstvy

require([
    'dojo/query',
    "esri/config",
    "esri/request",
    "esri/layers/FeatureLayer",
    "esri/layers/ImageryLayer",
    "esri/layers/GroupLayer",
    "esri/layers/MapImageLayer",
    "esri/layers/TileLayer",
    "esri/layers/ElevationLayer",
    "esri/layers/WMSLayer",
    "esri/layers/WMTSLayer",
    "esri/layers/ogc/wfsUtils",
    "esri/layers/WFSLayer",
    "esri/layers/SceneLayer",
    "esri/layers/IntegratedMeshLayer",
    "esri/layers/VectorTileLayer",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleFillSymbol",
    'esri/geometry/SpatialReference',
    "esri/geometry/Polyline",
    "esri/geometry/Point",
    "esri/Graphic",
    "esri/renderers/SimpleRenderer",
    "esri/rest/geometryService",
    "esri/rest/support/ProjectParameters",
    "dojo/dom-construct"
], (query, esriConfig, esriRequest, FeatureLayer, ImageryLayer, GroupLayer, MapImageLayer, TileLayer, ElevationLayer, WMSLayer, WMTSLayer, wfsUtils, WFSLayer, SceneLayer, IntegratedMeshLayer, VectorTileLayer,
        SimpleLineSymbol, SimpleMarkerSymbol, SimpleFillSymbol, SpatialReference, Polyline, Point, Graphic, SimpleRenderer, geometryService, ProjectParameters, domConstruct) => {
        app.widgetAddData = {};
        app.userEsriLayersCount = 0;
        app.userOgcLayersCount = 0;
        app.userLocalLayersCount = 0;
        app.widgetAddData.onlyloadedlayerWMTS = null;

        app.widgetAddData.restList = (value) => {
            app.removeDiv(['widgetRest']);
            let styl = "position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%); padding: 10px; width: 25%; min-width: 300px; background-color: white; box-shadow: 0px 1px 2px rgba(0,0,0,0.3); max-height: 50%; overflow: auto;";
            if (localStorage.theme) {
                if (localStorage.theme != "default") {
                    if (localStorage.theme == "dark") {
                        styl += "background-color: #4c4c4c; color: white;";
                    } else if (localStorage.theme == "light") {
                        styl += "color: #333333;";
                    }
                }
            }
            let widgetRest = domConstruct.create("div", {
                id: "widgetRest",
                class: "panel-collapse",
                style: styl,
                innerHTML: label[549]
            });
            app.activeView.ui.add({
                component: widgetRest
            });            
            query(".panel, .panel-collapse").removeClass("in");
            if (value.indexOf("?") == -1) {
                value += "?f=json";
            }
            esriRequest(value, { 
                responseType: "json" 
            }).then((response) => {
                if (response.data) {
                    if (!response.data.services.length && !response.data.folders.length) {
                        app.activeView.ui.remove(widgetRest);
                        alert(label[383]);
                        return;
                    }
                    let url = response.url.replace("?f=json", "");
                    let widget = document.getElementById("widgetRest");
                    widget.innerHTML = '<span style="float: right; padding: 5px;" class="esri-icon-close bold pointer" onclick="app.widgetAddData.rest(true);" title="' + label[325] + '"></span>';
                    widget.innerHTML += "<strong style='font-size: 20px'>REST</strong><br>" + label[735] + ": <strong>" + response.data.currentVersion + "</strong>";
                    let splitUrl = url.split("/rest/services/")
                    if (splitUrl[1]) {
                        let splitFolders = splitUrl[1].split("/");
                        let core = splitUrl[0] + '/rest/services/';
                        widget.innerHTML += "<br><a onclick='app.widgetAddData.restList(\"" + core + "\")' class='pointer'>" + splitUrl[0] + "/rest/services/" + "</a>";
                        for (let i = 0; i < splitFolders.length; i++) {
                            widget.innerHTML += "<span class='esri-icon-collapse' style='margin: 10px;'></span><strong>" + splitFolders[i] + "</strong>";
                        }
                    }
                    widget.innerHTML += "<br><br><strong>" + label[733] + ":</strong>";
                    if (response.data.folders.length == 0) {
                        widget.innerHTML += "<br>" + label[588] + "<br>";
                    } else {
                        widget.innerHTML += "<span> (" + response.data.folders.length + ")</span><div style='margin-top: 5px;'></div>";
                        response.data.folders.forEach(e => {
                            widget.innerHTML += "<button class='btn btn-primary btn-block' onclick='app.widgetAddData.restList(\"" + url + "/" + e + "\")'>" + e + "<span class='esri-icon-collapse' style='float: right;'></span></button>";
                        });
                    }
                    widget.innerHTML += "<br><strong>" + label[734] + ":</strong>";
                    if (response.data.services.length == 0) {
                        widget.innerHTML += "<br>" + label[588];
                    } else {
                        widget.innerHTML += "<span> (" + response.data.services.length + ")</span><div style='margin-top: 5px;'></div>";
                        response.data.services.forEach(e => {
                            let name = "";
                            if (e.name.indexOf("/") > -1) {
                                let service = e.name.split("/");
                                name = service[service.length - 1];
                            } else {
                                name = e.name;
                            }
                            let disabled = ' disabled';
                            if (e.type.toLowerCase() == 'mapserver' || e.type.toLowerCase() == 'imageserver' || e.type.toLowerCase() == 'featureserver' || e.type.toLowerCase() == 'sceneserver' || e.type.toLowerCase() == 'vectortileserver') {
                                disabled = '';
                            }
                            widget.innerHTML += "<button class='btn btn-primary btn-block' onclick='app.widgetAddData.addEsriLayer(\"" + url + "/" + name + "/" + e.type + "\");'" + disabled + ">" + name + "<span style='font-size: 11px;'> (" + e.type + ")</span><span class='esri-icon-plus' style='float: right;'></span></button>";
                        });
                    }
                } else {
                    app.activeView.ui.remove(widgetRest);
                    alert(label[383]);
                }
            }).catch((err) => {
                app.activeView.ui.remove(widgetRest);
                alert(err);
            });
        }

        app.widgetAddData.rest = (close) => {
            if (close == true) {    
                if (document.getElementById("widgetRest")) {
                    app.activeView.ui.remove("widgetRest");
                    return;
                }
            }
            let value = document.getElementById("ESRIRestInput").value.toLowerCase();
            if (value == "") {
                alert(label[73]);
                return;
            }
            if (value.indexOf("/rest/services") == -1) {
                alert(label[71]);
                return;
            }
            if (value.indexOf("http://") == -1 && value.indexOf("https://") == -1) {
                alert(label[75]);
                return;
            }            
            if (value.indexOf("?") == -1) {
                value += "?f=json";
            } else {
                alert(label[383]);
                return;
            }
            app.widgetAddData.restList(value);
        }

        app.widgetAddData.addEsriLayer = (urlParam) => {
            if (urlParam) {
               var url = urlParam;
            } else {
               var url = document.getElementById("settingsTitleInput1").value;
            }
            var j = url.indexOf("/rest/services/");
            if (j < 0) {
                alert(label[71]);
            } else {
                var indexotazniku = url.indexOf("?");
                var zkraceneurl = url;
                if (indexotazniku > 0) {
                    zkraceneurl = url.slice(0, indexotazniku);
                }
                esriRequest(zkraceneurl + "?f=json", {
                    responseType: "json"
                }).then((response) => {
                    var typsluzby = "";
                    if (response.data.serviceDataType) {
                        if (response.data.serviceDataType.indexOf("ImageService") > -1) {
                            typsluzby = "ImageLayer";
                            if (response.data.cacheType) {
                                if (response.data.cacheType == "Elevation") {
                                    typsluzby = "LERCLayer";
                                }
                            }
                        }
                    }
                    if (response.data.type) {
                        if (response.data.type == "Feature Layer") {
                            typsluzby = "FeatureLayer";
                        }
                    }
                    if (response.data.type) {
                        if (response.data.type == "Group Layer") {
                            typsluzby = "GroupLayer";
                        }
                    }
                    if (response.data.type) {
                        if (response.data.type == "Scene") {
                            typsluzby = "SceneLayer";
                        }
                    }
                    if (response.data.type) {
                        if (response.data.type == "integrated-mesh") {
                            typsluzby = "IntegratedMesh";
                        }
                    }
                    if (response.data.type) {
                        if (response.data.type == "indexedVector") {
                            typsluzby = "VectorTileLayer";
                        }
                    }
                    if (response.data.mapName) {
                        typsluzby = "MapImageLayer";
                        if (response.data.tileInfo) {
                            typsluzby = "TileLayer";
                        }
                    }
                    if (typsluzby == "") {
                        if (zkraceneurl.indexOf("ImageServer") > -1) {
                            typsluzby = "ImageLayer";
                        }
                        if (zkraceneurl.indexOf("FeatureServer") > -1) {
                            typsluzby = "FeatureLayer";
                        }
                        if (zkraceneurl.indexOf("SceneServer") > -1) {
                            response.data?.layers[0]?.layerType == 'IntegratedMesh' ? typsluzby = 'IntegratedMesh' : typsluzby = "SceneLayer"
                        }
                        if (zkraceneurl.indexOf("MapServer") > -1) {
                            typsluzby = "MapImageLayer";
                            if (response.data.tileInfo) {
                                typsluzby = "TileLayer";
                            }
                        }
                    }
                    if (typsluzby == "") {
                        alert(label[72]);
                    } else {
                        var vrstva;
                        if (typsluzby == "ImageLayer") {
                            vrstva = new ImageryLayer({
                                url: url
                            });
                        }
                        if (typsluzby == "FeatureLayer") {
                            vrstva = new FeatureLayer({
                                url: url,
                                spatialReference: app.activeView.spatialReference,
                                outFields: "*"
                            });
                        }
                        if (typsluzby == "GroupLayer") {
                            var index = zkraceneurl.lastIndexOf("/");
                            var noveUrl = zkraceneurl.substring(0, index);
                            vrstva = new GroupLayer({
                                title: response.data.name,
                                visibilityMode: "independent"
                            });
                            if (response.data.subLayers) {
                                response.data.subLayers.forEach((subvrstva) => {
                                    if (subvrstva) {
                                        esriRequest(noveUrl + "/" + subvrstva.id + "?f=json", {
                                            responseType: "json"
                                        }).then((response) => {
                                            if (response.data.type) {
                                                if (response.data.type == "Feature Layer") {
                                                    var podvrstva = new FeatureLayer({
                                                        url: noveUrl + "/" + subvrstva.id,
                                                        spatialReference: app.activeView.spatialReference,
                                                        outFields: "*"
                                                    });
                                                    vrstva.add(podvrstva);
                                                } else {
                                                    alert(label[513]);
                                                }
                                            }
                                        }, (err) => {
                                            alert(label[513] + err);
                                        }).catch((err) => {
                                            alert(label[513] + err);
                                        });
                                    }
                                });
                            }
                        }
                        if (typsluzby == "TileLayer") {
                            vrstva = new TileLayer({
                                url: url
                            });
                        }
                        if (typsluzby == "LERCLayer") {
                            vrstva = new ElevationLayer({
                                url: url
                            });
                        }
                        if (typsluzby == "MapImageLayer") {
                            vrstva = new MapImageLayer({
                                url: url
                            });
                        }
                        if (typsluzby == "VectorTileLayer") {
                            vrstva = new VectorTileLayer({
                                url: url
                            });
                        }
                        if (typsluzby == "SceneLayer") {
                            vrstva = new SceneLayer({
                                url: url,
                                spatialReference: app.activeView.spatialReference
                            });
                        }
                        if (typsluzby == "IntegratedMesh") {
                            vrstva = new IntegratedMeshLayer({
                                url: url,
                                spatialReference: app.activeView.spatialReference
                            });
                        }
                        if (vrstva) {
                            app.userEsriLayersCount++;
                            vrstva.id = "userEsriLayer" + app.userEsriLayersCount + "-" + typsluzby;
                            var nazevSluzby = document.getElementById("volbaAGS_title").value;
                            if (nazevSluzby != "") {
                                vrstva.title = nazevSluzby;
                            }
                            vrstva.load().then((novaVrstva) => {
                                function ui () {                                    
                                    document.getElementById('settingsTitleInput1').value = '';
                                    if (app.activeView.widthBreakpoint == "medium" || app.activeView.widthBreakpoint == "large" || app.activeView.widthBreakpoint == "xlarge" || app.aktivni_kompozice == 8491) {
                                        if (document.getElementById('panelLayerlist').classList.length == 2) {
                                            document.getElementById('seznamVrstev').click();
                                        }
                                    } else {
                                        query(".panel, .panel-collapse").removeClass("in");
                                        if (document.getElementById('widgetRest')) {
                                            app.activeView.ui.remove('widgetRest');
                                        }
                                    }
                                    document.getElementById('odstranitvrstvy').style.display = 'block';
                                }
                                if (novaVrstva.type == "tile") {
                                    if (novaVrstva.spatialReference) {
                                        if (novaVrstva.spatialReference.wkid == app.activeView.spatialReference.wkid || novaVrstva.spatialReference.latestWkid == app.activeView.spatialReference.wkid) {
                                            app.activeView.map.add(novaVrstva);
                                            ui();
                                        } else {
                                            if (novaVrstva.spatialReference.latestWkid == null) {
                                                alert(label[535] + "\n\nEPSG: " + novaVrstva.spatialReference.wkid);
                                            } else {
                                                alert(label[535] + "\n\nEPSG: " + novaVrstva.spatialReference.wkid + " (" + novaVrstva.spatialReference.latestWkid + ")");
                                            }
                                        }
                                    }
                                } else {
                                    app.activeView.map.add(novaVrstva);
                                    ui();
                                }
                            }).catch((err) => {
                                alert(label[513] + err);
                            });
                        }
                    }
                }, (err) => {
                    alert(label[513] + err);
                }).catch((err) => {
                    alert(label[513] + err);
                });
            }
        };

        app.widgetAddData.loadOgcLayer = () => {
            var url = document.getElementById("settingsTitleInput2").value;
            document.getElementById("volbaWMS_layers").innerHTML = "";
            document.getElementById("volbaWMS_SS").innerHTML = "";
            document.getElementById('OGCLoad').disabled = true;
            document.getElementById('OGCLoad').innerHTML = label[84];
            document.getElementById('volbaWMS_layers').onchange = undefined;

            var mohudal = 1;
            if (!url) {
                mohudal = 0;
                alert(label[73]);
                query("#nactenoPridatVrstvu").addClass("hidden");
                document.getElementById('OGCLoad').disabled = false;
                document.getElementById('OGCLoad').innerHTML = "<span class='esri-icon-upload fLeft'></span>" + label[359];
            }
            if (mohudal == 1) {
                var pole = url.split("/");
                if (pole.length < 2) {
                    mohudal = 0;
                    alert(label[74]);
                    query("#nactenoPridatVrstvu").addClass("hidden");
                    document.getElementById('OGCLoad').disabled = false;
                    document.getElementById('OGCLoad').innerHTML = "<span class='esri-icon-upload fLeft'></span>" + label[359];
                }
            }
            if (mohudal == 1) {
                if (pole[0].indexOf("http") > -1 && pole[1] == "" && pole[2].length > 1) {
                    var iz = url.indexOf("//");
                    var ik = url.indexOf("?");
                    if (ik == -1) { ik = url.length - 1; }
                    var server = url.slice(iz + 2, ik);
                } else {
                    mohudal = 0;
                    alert(label[75]);
                    query("#nactenoPridatVrstvu").addClass("hidden");
                    document.getElementById('OGCLoad').disabled = false;
                    document.getElementById('OGCLoad').innerHTML = "<span class='esri-icon-upload fLeft'></span>" + label[359];
                }
            }
            if (mohudal == 1) {
                var jemezitrustedservers = 0;
                for (var i = 0; i < esriConfig.request.trustedServers.length; i++) {
                    if (esriConfig.request.trustedServers[i].host) {
                        if (esriConfig.request.trustedServers[i].host.indexOf(server) > -1) { jemezitrustedservers = 1; }
                    } else {
                        if (esriConfig.request.trustedServers[i].indexOf(server) > -1) { jemezitrustedservers = 1; }
                    }
                }

                if (jemezitrustedservers == 0) {
                    var mamvyjimku = 0;
                    //je třeba dotazy aby se mohl zobrazit dialog pro credentials 
                    if (url.toLowerCase().indexOf("geoservices.bayern.de") > -1) { mamvyjimku = 1; esriConfig.request.trustedServers.push(server); }
                    if (url.toLowerCase().indexOf("geoportal.cuzk.gov.cz") > -1 && url.toLowerCase().indexOf("_private") > -1) { mamvyjimku = 1; esriConfig.request.trustedServers.push(server); }

                    //u všech ostatních bez credentials
                    if (mamvyjimku == 0) { esriConfig.request.trustedServers.push({ host: server, withCredentials: false }); }
                }

                var vrstvawms;
                var podporovaness = [5514, 102067, 102100, 3857, 4326, 32633, 32634, 4258, 3034, 3035, 3045, 3046, 3835, 3836];
                if (document.getElementById("typ_sluzby").value == "wms") {
                    vrstvawms = new WMSLayer({
                        url: url
                    });
                }
                if (document.getElementById("typ_sluzby").value == "wmts") {
                    vrstvawms = new WMTSLayer({
                        url: url,
                        serviceMode: document.getElementById("serviceModeWTMS").value
                    });
                }
                if (document.getElementById("typ_sluzby").value == "wfs") {
                    wfsUtils.getCapabilities(url).then((capabilities) => {
                        if (capabilities.featureTypes.length != 0) {
                            let t = "";
                            capabilities.featureTypes.forEach((layer) => {
                                t += '<option value="' + layer.name + '"';
                                t += ">" + layer.title + "</option>";
                            });
                            document.getElementById("volbaWMS_layers").innerHTML = t;
                            t = "";
                            let crs = capabilities.featureTypes[0];
                            for (let i = 0; i < crs.supportedSpatialReferences.length; i++) {
                                if (crs.supportedSpatialReferences[i]) {
                                    t += "<option value=" + crs.supportedSpatialReferences[i];
                                    if (app.activeView.spatialReference.latestWkid == crs.supportedSpatialReferences[i] || app.activeView.spatialReference.wkid == crs.supportedSpatialReferences[i]) {
                                        t += " selected";
                                    }
                                    t += ">" + crs.supportedSpatialReferences[i];
                                    if (app.activeView.spatialReference.latestWkid == crs.supportedSpatialReferences[i] || app.activeView.spatialReference.wkid == crs.supportedSpatialReferences[i]) {
                                        t += " (" + label[76] + ")</option>";
                                    } else {
                                        t += "</option>";
                                    }
                                }
                            }
                            query("#pridatVrstvuSettings").addClass("hidden");
                            document.getElementById("volbaWMS_SS").innerHTML = t;
                            query("#nactenoPridatVrstvu").removeClass("hidden");
                            document.getElementById('OGCLoad').innerHTML = "<span class='esri-icon-upload fLeft'></span>" + label[359];
                            document.getElementById('OGCLoad').disabled = false;
                            document.getElementById('volbaWMS_layers').onchange = app.widgetAddData.refreshWFS;
                        }
                    }).catch((err) => {
                        document.getElementById('OGCLoad').innerHTML = "<span class='esri-icon-upload fLeft'></span>" + label[359];
                        console.log(err);
                        alert(label[513] + err.message);
                        document.getElementById('OGCLoad').disabled = false;
                        app.widgetAddData.edit();
                    });
                }
                if (vrstvawms) {
                    vrstvawms.load().then((nahranavrstva) => {
                        var t = "";
                        var pocetpodvrstev = 0;
                        var mamvicevrstev = false;
                        if (nahranavrstva.sublayers.toArray().length > 1 && document.getElementById("typ_sluzby").value == "wms") { mamvicevrstev = true; }
                        if (mamvicevrstev) { t += "<option value=all selected>" + label[514] + "</option>"; }
                        nahranavrstva.sublayers.forEach((sublayer1) => {
                            pocetpodvrstev++;
                            t += '<option value="' + sublayer1.id + '"';
                            if (pocetpodvrstev == 1 && mamvicevrstev == false) { t += " selected"; }
                            t += ">" + sublayer1.title + "</option>";
                        });
                        document.getElementById("volbaWMS_layers").innerHTML = t;
                        var t = "";
                        var mapwkid = app.activeView.spatialReference.wkid;
                        var mapwkid2 = -1;
                        if (mapwkid == 102100) { mapwkid2 = 3857; }
                        if (mapwkid == 102067) { mapwkid2 = 5514; }
                        if (document.getElementById("typ_sluzby").value == "wms") {
                            var jetamlatestwkid = false;
                            for (var i = 0; i < nahranavrstva.spatialReferences.length; i++) {
                                if (mapwkid2 == nahranavrstva.spatialReferences[i]) { jetamlatestwkid = true; }
                            }
                            for (var i = 0; i < nahranavrstva.spatialReferences.length; i++) {
                                t += "<option value=" + nahranavrstva.spatialReferences[i];
                                if (jetamlatestwkid = true && nahranavrstva.spatialReferences[i] == mapwkid2) { t += " selected"; }
                                if (jetamlatestwkid = false && nahranavrstva.spatialReferences[i] == mapwkid) { t += " selected"; }

                                t += ">EPSG:" + nahranavrstva.spatialReferences[i];
                                if (jetamlatestwkid = true && nahranavrstva.spatialReferences[i] == mapwkid2) { t += " (" + label[76] + ")"; }
                                if (jetamlatestwkid = false && nahranavrstva.spatialReferences[i] == mapwkid) { t += " (" + label[76] + ")"; }
                                if (jetamlatestwkid = true && nahranavrstva.spatialReferences[i] == mapwkid) { t += " (" + label[77] + ")"; }

                                var jepodporovana = false;
                                for (var j = 0; j < 14; j++) {
                                    if (nahranavrstva.spatialReferences[i] == podporovaness[j]) { jepodporovana = true; }
                                }
                                if (!jepodporovana) { t += " (" + label[78] + ")"; }
                                t += "</option>";
                            }
                            document.getElementById("volbaWMS_SS").innerHTML = t;
                        }
                        if (document.getElementById("typ_sluzby").value == "wmts") {
                            app.widgetAddData.onlyloadedlayerWMTS = nahranavrstva;
                            app.widgetAddData.updateseznamSSpodvrstevWMTS();
                        }
                        query("#pridatVrstvuSettings").addClass("hidden");
                        query("#nactenoPridatVrstvu").removeClass("hidden");
                        document.getElementById('OGCLoad').innerHTML = "<span class='esri-icon-upload fLeft'></span>" + label[359];
                        document.getElementById('OGCLoad').disabled = false;
                    }, (err) => {
                        document.getElementById('OGCLoad').innerHTML = "<span class='esri-icon-upload fLeft'></span>" + label[359];
                        console.log(err);
                        alert(label[513] + err.message);
                        document.getElementById('OGCLoad').disabled = false;
                    }).catch((err) => {
                        document.getElementById('OGCLoad').innerHTML = "<span class='esri-icon-upload fLeft'></span>" + label[359];
                        console.log(err);
                        alert(label[513] + err.message);
                        document.getElementById('OGCLoad').disabled = false;
                    });
                }
            }
        };

        app.widgetAddData.updateseznamSSpodvrstevWMTS = () => {
            if (app.widgetAddData.onlyloadedlayerWMTS) {
                var t = "";
                var mysublayer = app.widgetAddData.onlyloadedlayerWMTS.sublayers.find((sublayer) => {
                    return sublayer.id == document.getElementById("volbaWMS_layers").value;
                });
                if (mysublayer) {
                    var podporovaness = [5514, 102067, 102100, 3857, 4326, 32633, 32634, 4258, 3034, 3035, 3045, 3046, 3835, 3836];
                    app.widgetAddData.onlyloadedlayerWMTS.activeLayer = mysublayer;
                    var mapwkid = app.activeView.spatialReference.wkid;
                    var mapwkid2 = -1;
                    if (mapwkid == 102100) { mapwkid2 = 3857; }
                    if (mapwkid == 102067) { mapwkid2 = 5514; }

                    app.widgetAddData.onlyloadedlayerWMTS.activeLayer.tileMatrixSets.forEach((mymatrixset) => {
                        t += "<option value=" + mymatrixset.tileInfo.spatialReference.wkid;
                        if (mymatrixset.tileInfo.spatialReference.wkid == mapwkid || mymatrixset.tileInfo.spatialReference.wkid == mapwkid2) { t += " selected"; }
                        t += ">EPSG:" + mymatrixset.tileInfo.spatialReference.wkid;
                        if (mymatrixset.tileInfo.spatialReference.wkid == mapwkid || mymatrixset.tileInfo.spatialReference.wkid == mapwkid2) { t += " (" + label[76] + ")"; }
                        var jepodporovana = false;
                        for (var j = 0; j < 14; j++) {
                            if (mymatrixset.tileInfo.spatialReference.wkid == podporovaness[j]) { jepodporovana = true; }
                        }
                        if (!jepodporovana) { t += " (" + label[78] + ")"; }
                        t += "</option>";
                    });
                }
                document.getElementById("volbaWMS_SS").innerHTML = t;
            }
        };

        app.widgetAddData.edit = () => {
            query("#pridatVrstvuSettings").removeClass("hidden");
            query("#nactenoPridatVrstvu").addClass("hidden");
        }

        app.widgetAddData.refreshWFS = () => {
            if (document.getElementById("typ_sluzby").value == "wfs") {
                let url = document.getElementById('settingsTitleInput2').value;
                document.getElementById("volbaWMS_SS").innerHTML = '';
                document.getElementById("volbaWMS_SS").disabled = true;
                wfsUtils.getCapabilities(url).then((capabilities) => {
                    if (capabilities.featureTypes.length != 0) {
                        let t = "";
                        for (let f = 0; f < capabilities.featureTypes.length; f++) {
                            if (capabilities.featureTypes[f].name == document.getElementById("volbaWMS_layers").value) {
                                let crs = capabilities.featureTypes[f];
                                for (let i = 0; i < crs.supportedSpatialReferences.length; i++) {
                                    if (crs.supportedSpatialReferences[i]) {
                                        t += "<option value=" + crs.supportedSpatialReferences[i];
                                        if (app.activeView.spatialReference.latestWkid == crs.supportedSpatialReferences[i] || app.activeView.spatialReference.wkid == crs.supportedSpatialReferences[i]) {
                                            t += " selected";
                                        }
                                        t += ">" + crs.supportedSpatialReferences[i];
                                        if (app.activeView.spatialReference.latestWkid == crs.supportedSpatialReferences[i] || app.activeView.spatialReference.wkid == crs.supportedSpatialReferences[i]) {
                                            t += " (" + label[76] + ")</option>";
                                        } else {
                                            t += "</option>";
                                        }
                                    }
                                }
                                document.getElementById("volbaWMS_SS").innerHTML = t;
                                document.getElementById("volbaWMS_SS").disabled = false;
                            }
                        }
                    }
                }).catch((err) => {
                    console.log(err);
                    alert(label[513] + err.message);
                });
            }
        }

        app.widgetAddData.addOgcLayer = () => {
            document.getElementById("nactenoPridatVrstvuEdit").disabled = true;
            document.getElementById("OGCPridatButton2").disabled = true;
            document.getElementById("OGCPridatButton2").innerHTML = label[549];
            var url = document.getElementById("settingsTitleInput2").value;
            var mohudal = 1;
            if (!url) { mohudal = 0; alert(label[73]); }
            if (mohudal == 1) {
                var pole = url.split("/");
                if (pole.length < 2) { mohudal = 0; alert(label[74]); }
            }
            if (mohudal == 1) {
                if (pole[0].indexOf("http") > -1 && pole[1] == "" && pole[2].length > 1) {
                    var server = pole[0] + "//" + pole[2];
                } else {
                    mohudal = 0; alert(label[75]);
                }
            }
            if (mohudal == 1) {
                mohudal = 0;
                if (document.getElementById("volbaWMS_SS").value == app.activeView.spatialReference.wkid) { mohudal = 1; }
                if (app.activeView.spatialReference.latestWkid) {
                    if (document.getElementById("volbaWMS_SS").value == app.activeView.spatialReference.latestWkid) { mohudal = 1; }
                }
                if (mohudal == 0) {
                    alert(label[79]);
                }
            }
            if (mohudal == 1) {
                //už je mezi trustedServers z loadOGC
                var vrstvawms;
                if (document.getElementById("typ_sluzby").value == "wfs") {
                    vrstvawms = new WFSLayer({
                        url: url,
                        spatialReference: new SpatialReference({ wkid: document.getElementById("volbaWMS_SS").value }),
                        name: document.getElementById("volbaWMS_layers").value
                    });
                }
                if (document.getElementById("typ_sluzby").value == "wms") {
                    vrstvawms = new WMSLayer({
                        url: url,
                        spatialReference: new SpatialReference({ wkid: document.getElementById("volbaWMS_SS").value })
                    });
                }
                if (document.getElementById("typ_sluzby").value == "wmts") {
                    vrstvawms = new WMTSLayer({
                        url: url,
                        serviceMode: document.getElementById("serviceModeWTMS").value
                    });
                }
                if (vrstvawms) {
                    app.userOgcLayersCount++;
                    var vlastniNazevWMS = document.getElementById("volbaWMS_title").value;
                    if (vlastniNazevWMS) {
                        vrstvawms.title = vlastniNazevWMS;
                    }
                    vrstvawms.id = "userOgcLayer" + app.userOgcLayersCount;
                    vrstvawms.load().then((mywms) => {
                        if (document.getElementById("typ_sluzby").value == "wms") {
                            var hodnotadivu = document.getElementById("volbaWMS_layers").value;
                            mywms.sublayers.forEach((sublayer1) => {
                                if (sublayer1.id != hodnotadivu && hodnotadivu != "all") { sublayer1.visible = false; }
                            });
                        }
                        if (document.getElementById("typ_sluzby").value == "wmts") {
                            var mysublayer = mywms.sublayers.find((sublayer) => {
                                return sublayer.id == document.getElementById("volbaWMS_layers").value;
                            });
                            if (!mysublayer) { mysublayer = mywms.sublayers.getItemAt(0); }
                            if (mysublayer) {
                                mywms.activeLayer = mysublayer;
                                var findedmatrixset = mywms.activeLayer.tileMatrixSets.find((mymatrixset) => {
                                    return (mymatrixset.tileInfo.spatialReference.wkid == Number(document.getElementById("volbaWMS_SS").value));
                                });
                                if (!findedmatrixset) { findedmatrixset = mywms.activeLayer.tileMatrixSets.getItemAt(0); }
                                if (findedmatrixset) { mywms.activeLayer.tileMatrixSetId = findedmatrixset.id; }
                            }
                        }
                        app.activeView.map.layers.add(vrstvawms);
                        document.getElementById('odstranitvrstvy').style.display = 'block';
                        app.widgetAddData.edit();
                        if (app.activeView.widthBreakpoint == "medium" || app.activeView.widthBreakpoint == "large" || app.activeView.widthBreakpoint == "xlarge" || app.aktivni_kompozice == 8491) {
                            if (document.getElementById('panelLayerlist').classList.length == 2) {
                                document.getElementById('seznamVrstev').click();
                            }
                        } else {
                            query(".panel, .panel-collapse").removeClass("in");
                        }
                        query("#nactenoPridatVrstvu").addClass("hidden");
                        document.getElementById("nactenoPridatVrstvuEdit").disabled = false;
                        document.getElementById("OGCPridatButton2").disabled = false;
                        document.getElementById("OGCPridatButton2").innerHTML = "<span class='esri-icon-plus fLeft'></span>" + label[362];
                    }, (err) => {
                        console.log(err);
                        alert(label[513] + err.message);
                        document.getElementById("nactenoPridatVrstvuEdit").disabled = false;
                        document.getElementById("OGCPridatButton2").disabled = false;
                        document.getElementById("OGCPridatButton2").innerHTML = "<span class='esri-icon-plus fLeft'></span>" + label[362];
                    }).catch((err) => {
                        console.log(err);
                        alert(label[513] + err.message);
                        document.getElementById("nactenoPridatVrstvuEdit").disabled = false;
                        document.getElementById("OGCPridatButton2").disabled = false;
                        document.getElementById("OGCPridatButton2").innerHTML = "<span class='esri-icon-plus fLeft'></span>" + label[362];
                    });
                }
            } else {
                document.getElementById("nactenoPridatVrstvuEdit").disabled = false;
                document.getElementById("OGCPridatButton2").disabled = false;
                document.getElementById("OGCPridatButton2").innerHTML = "<span class='esri-icon-plus fLeft'></span>" + label[362];
            }
            return mohudal;
        };

        app.widgetAddData.generateFeatureCollection = (fileName) => {
            document.getElementById("lokalniDataSelect").disabled = true;
            query("#lokalniDataFile").addClass("hidden");
            document.getElementById("upload-status").style.marginTop = "10px";
            esriConfig.request.proxyUrl = "/proxy/";  //kvůli SHP a GPX importu
            filename = fileName.split(".");
            var name = filename[0].replace("c:\\fakepath\\", "");
            var type = filename[1];
            if (type == "json" || type == "geojson") {
                type = "geojson";
            } else if (type == "zip") {
                type = "shapefile";
            } else if (type == "gpx") {
                type = "gpx";
            }
            document.getElementById('upload-status').innerHTML = '<b>' + label[84] + '</b> ' + name;

            var params = {
                'name': name,
                'targetSR': app.activeView.spatialReference.clone(),
                'maxRecordCount': 4000
            };
            if (type == "gpx") {
                if (app.activeView.spatialReference.wkid == 102100) {
                    params.targetSR = { "wkid": 102100, "latestWkid": 3857 };
                } else {
                    params.targetSR = { "wkid": 4326, "latestWkid": 4326 };
                }
                params.reducePrecision = true;
                params.numberOfDigitsAfterDecimal = 8;
                params.returnZ = false;
                params.enforceInputFileSizeLimit = true;
                params.enforceOutputJsonSizeLimit = true;
            }

            var myContent = {
                'filetype': type,
                'publishParameters': JSON.stringify(params),
                'f': 'json'
            };

            esriRequest('https://www.arcgis.com/sharing/rest/content/features/generate', {
                query: myContent,
                method: "post",
                body: document.getElementById('lokalniDataFile'),
                useProxy: false,
                responseType: 'json'
            }).then((response) => {
                if (response.error) {
                    document.getElementById('upload-status').innerHTML = "<span style='color:rgb(200,0,0)'>" + response.error.message + "</span>";
                    document.getElementById("lokalniDataSelect").disabled = false;
                    document.getElementById("lokalniDataSelect").value = "nic";
                    document.getElementById("lokalniDataInput").value = null;
                    query("#lokalniDataFile").addClass("hidden");
                    return;
                }
                if (response.data.featureCollection.layers.length == 0) {
                    document.getElementById("upload-status").innerHTML = "";
                    document.getElementById("upload-status").style.marginTop = "";
                    document.getElementById("lokalniDataSelect").disabled = false;
                    document.getElementById("lokalniDataSelect").value = "nic";
                    document.getElementById("lokalniDataInput").value = null;
                    alert(label[383]);
                    return;
                }
                var sourceGraphics = [];
                var color = ["#cc0000", "#00cc33", "#0033cc", "#cccc00", "#cc0099", "#cc6600", "#6600cc", "#00cccc", "#6600cc", "#0099cc"]
                var indexColor;
                if (app.userLocalLayersCount < 10) {
                    indexColor = color[app.userLocalLayersCount];
                } else {
                    Math.floor((Math.random() * 9) + 1);
                    indexColor = color[Math.floor((Math.random() * 9) + 1)];
                }
                var featureCollection = response.data.featureCollection;
                var layers = featureCollection.layers.map((layer) => {
                    var renderer;
                    if (layer.layerDefinition.geometryType == "esriGeometryPolyline") {
                        renderer = new SimpleRenderer({
                            symbol: new SimpleLineSymbol({
                                width: "2px",
                                style: "solid",
                                color: indexColor
                            })
                        });
                    } else if (layer.layerDefinition.geometryType == "esriGeometryPolygon") {
                        renderer = new SimpleRenderer({
                            symbol: new SimpleFillSymbol({
                                style: "solid",
                                color: indexColor,
                                outline: {  // autocasts as new SimpleLineSymbol()
                                    color: [128, 128, 128, 0.5],
                                    width: "0.5px"
                                }
                            })
                        });
                    } else if (layer.layerDefinition.geometryType == "esriGeometryPoint") {
                        renderer = new SimpleRenderer({
                            symbol: new SimpleMarkerSymbol({
                                color: indexColor,
                                size: 8
                            })
                        });
                    } else {
                        query("#lokalniDataFile").addClass("hidden");
                        document.getElementById("upload-status").innerHTML = "";
                        document.getElementById("upload-status").style.marginTop = "";
                        document.getElementById("lokalniDataSelect").disabled = false;
                        document.getElementById("lokalniDataSelect").value = "nic";
                        document.getElementById("lokalniDataInput").value = null;
                        alert(label[80]);
                        return;
                    };
                    var graphics = layer.featureSet.features.map((feature) => {
                        var novyf = Graphic.fromJSON(feature);
                        return novyf;
                    });
                    var newfields = layer.layerDefinition.fields.map((field) => {
                        if (field.type == "esriFieldTypeString") { field.type = "string"; }
                        if (field.type == "esriFieldTypeQUID") { field.type = "quid"; }
                        if (field.type == "esriFieldTypeDate") { field.type = "date"; }
                        if (field.type == "esriFieldTypeDouble") { field.type = "double"; }
                        if (field.type == "esriFieldTypeBlob") { field.type = "blob"; }
                        if (field.type == "esriFieldTypeGeometry") { field.type = "geometry"; }
                        if (field.type == "esriFieldTypeGlobalId") { field.type = "global-id"; }
                        if (field.type == "esriFieldTypeInteger") { field.type = "integer"; }
                        if (field.type == "esriFieldTypeLong") { field.type = "long"; }
                        if (field.type == "esriFieldTypeOID") { field.type = "oid"; }
                        if (field.type == "esriFieldTypeRaster") { field.type = "raster"; }
                        if (field.type == "esriFieldTypeSingle") { field.type = "single"; }
                        if (field.type == "esriFieldTypeSmallInteger") { field.type = "small-integer"; }
                        if (field.type == "esriFieldTypeXML") { field.type = "xml"; }
                        return field;
                    });
                    if (type == "gpx") {
                        if (graphics.length > -1) {
                            var myspatialReference = graphics[0].geometry.spatialReference.clone();
                            app.userLocalLayersCount++;
                            let oid = undefined;
                            for (let i = 0; i < newfields.length; i++) {
                                if (newfields[i].type == "oid") {
                                    oid = newfields[i].name;
                                    break;
                                }
                            }
                            if (app.activeView.spatialReference.wkid == 4326 || app.activeView.spatialReference.wkid == 102100) {
                                var featureLayer = new FeatureLayer({
                                    fields: newfields,
                                    objectIdField: oid,
                                    source: graphics,
                                    spatialReference: myspatialReference,
                                    renderer: renderer,
                                    title: featureCollection.layers[0].layerDefinition.name + "_" + app.userLocalLayersCount,
                                    id: "userDataLayer" + app.userLocalLayersCount + "_gpx"
                                });
                                app.activeView.map.add(featureLayer);
                                app.activeView.goTo(graphics);
                                document.getElementById("upload-status").innerHTML = "";
                                document.getElementById("upload-status").style.marginTop = "";
                                if (app.activeView.widthBreakpoint == "medium" || app.activeView.widthBreakpoint == "large" || app.activeView.widthBreakpoint == "xlarge" || app.aktivni_kompozice == 8491) {
                                    if (document.getElementById('panelLayerlist').classList.length == 2) {
                                        document.getElementById('seznamVrstev').click();
                                    }
                                } else {
                                    query(".panel, .panel-collapse").removeClass("in");
                                }
                                document.getElementById('odstranitvrstvy').style.display = 'block';
                                document.getElementById("upload-status").style.marginTop = "";
                                document.getElementById("lokalniDataSelect").disabled = false;
                                document.getElementById("lokalniDataSelect").value = "nic";
                                document.getElementById("lokalniDataInput").value = null;
                                query("#lokalniDataFile").addClass("hidden");
                            } else {
                                //projekce
                                var mytransf = {};
                                document.getElementById("upload-status").innerHTML = "<b>" + label[82] + "</b>";
                                if (app.activeView.spatialReference.wkid == 102067) { mytransf.wkid = 1623; }
                                if (app.activeView.spatialReference.wkid == 3835 || app.activeView.spatialReference.wkid == 3836) { mytransf.wkid = 15998; }
                                if (app.activeView.spatialReference.wkid == 3034 || app.activeView.spatialReference.wkid == 3035 || app.activeView.spatialReference.wkid == 3045 || app.activeView.spatialReference.wkid == 3046 || app.activeView.spatialReference.wkid == 4258) { mytransf.wkid = 1149; }
                                var graphicsAttributtes = [];
                                graphics.forEach(grafika => {
                                    graphicsAttributtes.push(grafika.attributes);
                                });

                                var geomSer = 'http://ags.cuzk.gov.cz/arcgis/rest/services/Utilities/Geometry/GeometryServer';
                                var params = new ProjectParameters({
                                    geometries: graphics.map((feature) => {
                                        return feature.geometry;
                                    }),
                                    outSpatialReference: app.activeView.spatialReference.clone(),
                                    transformation: mytransf,
                                    transformForward: false
                                });
                                geometryService.project(geomSer, params).then((response) => {
                                    var geometryType = undefined;
                                    var transgraphics = [];
                                    for (var i = 0; i < response.length; i++) {
                                        var geometry = response[i];
                                        var geometryspr = new SpatialReference({
                                            wkid: geometry.spatialReference.wkid
                                        });
                                        geometry.attributes = graphicsAttributtes[i];
                                        if (geometry.spatialReference.latestWkid) { geometryspr.latestWkid = geometry.spatialReference.latestWkid; }
                                        if (geometry.type == "polyline") {
                                            geometryType = "polyline";
                                            var mline = new Polyline({
                                                paths: geometry.paths,
                                                spatialReference: geometryspr
                                            });
                                            var novyf = new Graphic({
                                                geometry: mline
                                            });
                                            novyf.attributes = {};
                                            if (graphicsAttributtes) {
                                                novyf.attributes = graphicsAttributtes[i];
                                            }
                                            novyf.attributes.ObjectID = i;
                                            transgraphics.push(novyf);
                                        } else if (geometry.type == "point") {
                                            geometryType = "point";
                                            if (geometry.x && geometry.y) {
                                                var point = new Point({
                                                    x: geometry.x,
                                                    y: geometry.y,
                                                    spatialReference: geometryspr
                                                });
                                            } else {
                                                var point = new Point({
                                                    latitude: geometry.latitude,
                                                    longitude: geometry.longitude,
                                                    spatialReference: geometryspr
                                                });
                                            }
                                            var novyf = new Graphic({
                                                geometry: point
                                            });
                                            novyf.attributes = {};
                                            if (graphicsAttributtes) {
                                                novyf.attributes = graphicsAttributtes[i];
                                            }
                                            novyf.attributes.ObjectID = i;
                                            transgraphics.push(novyf);
                                        } else {
                                            alert(label[383]);
                                            document.getElementById("upload-status").innerHTML = "";
                                            document.getElementById("upload-status").style.marginTop = "";
                                            document.getElementById("lokalniDataSelect").disabled = false;
                                            document.getElementById("lokalniDataSelect").value = "nic";
                                            document.getElementById("lokalniDataInput").value = null;
                                            query("#lokalniDataFile").addClass("hidden");
                                            return;
                                        }
                                    }
                                    if (transgraphics.length > -1) {
                                        var transspatialReference = new SpatialReference({
                                            wkid: transgraphics[0].geometry.spatialReference.wkid
                                        });
                                        if (transgraphics[0].geometry.spatialReference.latestWkid) { transspatialReference.latestWkid = transgraphics[0].geometry.spatialReference.latestWkid; }
                                        let oid = undefined;
                                        for (let i = 0; i < newfields.length; i++) {
                                            if (newfields[i].type == "oid") {
                                                oid = newfields[i].name;
                                                break;
                                            }
                                        }
                                        var featureLayer = new FeatureLayer({
                                            objectIdField: oid,
                                            geometryType: geometryType,
                                            displayFieldName: oid,
                                            fields: newfields,
                                            source: transgraphics,
                                            spatialReference: transspatialReference,
                                            renderer: renderer,
                                            title: featureCollection.layers[0].layerDefinition.name + "_" + app.userLocalLayersCount,
                                            id: "userDataLayer" + app.userLocalLayersCount + "_gpx"
                                        });
                                        app.activeView.map.add(featureLayer);
                                        app.activeView.goTo(transgraphics);
                                        document.getElementById("upload-status").innerHTML = "";
                                        document.getElementById("upload-status").style.marginTop = "";
                                        if (app.activeView.widthBreakpoint == "medium" || app.activeView.widthBreakpoint == "large" || app.activeView.widthBreakpoint == "xlarge" || app.aktivni_kompozice == 8491) {
                                            if (document.getElementById('panelLayerlist').classList.length == 2) {
                                                document.getElementById('seznamVrstev').click();
                                            }
                                        } else {
                                            query(".panel, .panel-collapse").removeClass("in");
                                        }
                                        document.getElementById('odstranitvrstvy').style.display = 'block';
                                        document.getElementById("upload-status").style.marginTop = "";
                                        document.getElementById("lokalniDataSelect").disabled = false;
                                        document.getElementById("lokalniDataSelect").value = "nic";
                                        document.getElementById("lokalniDataInput").value = null;
                                        query("#lokalniDataFile").addClass("hidden");
                                    } else {
                                        document.getElementById("upload-status").innerHTML = label[81];
                                        document.getElementById("upload-status").style.marginTop = "";
                                        document.getElementById("lokalniDataSelect").disabled = false;
                                        document.getElementById("lokalniDataSelect").value = "nic";
                                        document.getElementById("lokalniDataInput").value = null;
                                        query("#lokalniDataFile").addClass("hidden");
                                    }
                                }, (err) => {
                                    console.log(err);
                                    document.getElementById("upload-status").innerHTML = label[81];
                                    document.getElementById("upload-status").style.marginTop = "";
                                    document.getElementById("lokalniDataSelect").disabled = false;
                                    document.getElementById("lokalniDataSelect").value = "nic";
                                    document.getElementById("lokalniDataInput").value = null;
                                    query("#lokalniDataFile").addClass("hidden");
                                });
                            }
                        } else {
                            document.getElementById("upload-status").innerHTML = label[83];
                            document.getElementById("upload-status").style.marginTop = "";
                            document.getElementById("lokalniDataSelect").disabled = false;
                            document.getElementById("lokalniDataSelect").value = "nic";
                            document.getElementById("lokalniDataInput").value = null;
                            query("#lokalniDataFile").addClass("hidden");
                        }
                    } else {
                        var myspatialReference = new SpatialReference({ wkid: 102067, latestWkid: 5514 });
                        if (graphics.length > -1) {
                            if (graphics[0].geometry) {
                                if (graphics[0].geometry.spatialReference) {
                                    myspatialReference = graphics[0].geometry.spatialReference.clone();
                                }
                            }
                        }
                        sourceGraphics = sourceGraphics.concat(graphics);
                        let oid = undefined;
                        for (let i = 0; i < newfields.length; i++) {
                            if (newfields[i].type == "oid") {
                                oid = newfields[i].name;
                                break;
                            }
                        }
                        app.userLocalLayersCount++;
                        var featureLayer = new FeatureLayer({
                            objectIdField: oid,
                            fields: newfields,
                            source: graphics,
                            spatialReference: myspatialReference,
                            renderer: renderer,
                            title: layer.layerDefinition.name,
                            id: "userDataLayerShp" + app.userLocalLayersCount + "_" + type
                        });
                        return featureLayer;
                    }
                });
                app.activeView.map.addMany(layers);
                app.activeView.goTo(sourceGraphics);
                document.getElementById("upload-status").innerHTML = "";
                document.getElementById("upload-status").style.marginTop = "";
                if (app.activeView.widthBreakpoint == "medium" || app.activeView.widthBreakpoint == "large" || app.activeView.widthBreakpoint == "xlarge" || app.aktivni_kompozice == 8491) {
                    if (document.getElementById('panelLayerlist').classList.length == 2) {
                        document.getElementById('seznamVrstev').click();
                    }
                } else {
                    query(".panel, .panel-collapse").removeClass("in");
                }
                document.getElementById('odstranitvrstvy').style.display = 'block';
                document.getElementById("upload-status").style.marginTop = "";
                document.getElementById("lokalniDataSelect").disabled = false;
                document.getElementById("lokalniDataSelect").value = "nic";
                document.getElementById("lokalniDataInput").value = null;
                query("#lokalniDataFile").addClass("hidden");
            }, (error) => {
                document.getElementById('upload-status').innerHTML = "<span style='color:rgb(200,0,0)'>" + error.message + "</span>";
                document.getElementById("lokalniDataSelect").disabled = false;
                document.getElementById("lokalniDataSelect").value = "nic";
                document.getElementById("lokalniDataInput").value = null;
                query("#lokalniDataFile").addClass("hidden");
            });
        };

        //registrování událostí na tlačítkách 
        query("#ESRIPridatButton1").on("click", () => {
            app.widgetAddData.addEsriLayer();
        });
        query("#OGCLoad").on("click", () => {
            app.widgetAddData.onlyloadedlayerWMTS = null;
            app.widgetAddData.loadOgcLayer();
        });
        query("#OGCPridatButton2").on("click", () => {
            app.widgetAddData.addOgcLayer();
        });

        query("#volbaWMS_layers").on("change", () => {
            app.widgetAddData.updateseznamSSpodvrstevWMTS();

        });

        query("#lokalniDataSelect").on("change", () => {
            var typ = document.getElementById("lokalniDataSelect").value;
            if (typ == "nic") {
                query("#lokalniDataFile").addClass("hidden");
            } else {
                query("#lokalniDataFile").removeClass("hidden");
            }
        });

        query("#lokalniDataFile").on("change", () => {
            if (document.getElementById("lokalniDataInput").files.length > 0) {
                if (document.getElementById("lokalniDataSelect").value == "shapefile") {
                    if (document.getElementById("lokalniDataInput").files[0].type == 'application/x-zip-compressed') {
                        var fileName = document.getElementById("lokalniDataInput").value.toLowerCase();
                        app.widgetAddData.generateFeatureCollection(fileName);
                    } else {
                        document.getElementById("lokalniDataInput").value = null;
                        alert(label[586]);
                        return;
                    }
                } else if (document.getElementById("lokalniDataSelect").value == "geojson") {
                    if (document.getElementById("lokalniDataInput").files[0].type == 'application/json' || document.getElementById("lokalniDataInput").files[0].name.indexOf(".geojson") > -1) {
                        var fileName = document.getElementById("lokalniDataInput").value.toLowerCase();
                        app.widgetAddData.generateFeatureCollection(fileName);
                    } else {
                        document.getElementById("lokalniDataInput").value = null;
                        alert(label[586]);
                        return;
                    }
                } else if (document.getElementById("lokalniDataSelect").value == "gpx") {
                    if (document.getElementById("lokalniDataInput").files[0].name.indexOf(".gpx") > -1) {
                        var fileName = document.getElementById("lokalniDataInput").value.toLowerCase();
                        app.widgetAddData.generateFeatureCollection(fileName);
                    } else {
                        document.getElementById("lokalniDataInput").value = null;
                        alert(label[586]);
                        return;
                    }
                }
            }
        });

        query("#typ_sluzby").on("change", () => {
            if (document.getElementById("typ_sluzby").value == "wmts") {
                query("#serviceModeWTMSDiv").removeClass("hidden");
            } else {
                query("#serviceModeWTMSDiv").addClass("hidden");
            }
        });
    });
