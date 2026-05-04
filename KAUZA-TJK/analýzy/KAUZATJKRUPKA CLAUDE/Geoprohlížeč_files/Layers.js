require([
    "esri/layers/WMSLayer",
    "esri/layers/WMTSLayer",
    "esri/layers/MapImageLayer",
    "esri/layers/TileLayer",
    "esri/layers/GroupLayer",
    "esri/layers/FeatureLayer",
    "esri/layers/ImageryLayer",
    "esri/layers/support/LabelClass",
    "esri/geometry/Point",
    'esri/geometry/SpatialReference',
    "esri/core/promiseUtils",
    "dojo/query"
], (WMSLayer, WMTSLayer, MapImageLayer, TileLayer, GroupLayer, FeatureLayer, ImageryLayer, LabelClass, Point, SpatialReference, promiseUtils, query) => {
    app.widgetProdukty = {};
    app.widgetProdukty.setBasemaps = (base) => {
        if (base != document.getElementById("selectBasemapPanel").value) document.getElementById("selectBasemapPanel").value = base;
        let bl = app.activeView.map.basemap.baseLayers;
        bl.removeAll();
        app.activeView.type == "3d" || base == "empty" ? query("#basemapInfoLabelDiv").addClass("hidden") : query("#basemapInfoLabelDiv").removeClass("hidden")
        if (app.activeView.spatialReference.wkid == 102067 || app.activeView.spatialReference.wkid == 5514) {
            if (app.activeView.type == "2d" && base == "zm") {
                query("#jakazakladnimapa").removeClass("hidden")
                app.ZMmeritko(app.mapView);
            } else {
                query("#jakazakladnimapa").addClass("hidden")
            }
            bl.addMany([app.basemaps_jtsk[base], app.basemaps_jtsk[5]]);
        } else if (app.activeView.spatialReference.wkid == 3857 || app.activeView.spatialReference.wkid == 102100) {
            bl.add(app.basemaps_merc[base]);
        } else {
            bl.add(app.basemaps_jiny[base]);
        }
    }

    query("#selectBasemapPanel").on("change", () => {
        app.widgetProdukty.setBasemaps(document.getElementById("selectBasemapPanel").value);
    });

    if (myUrlParams.b != "") {
        app.widgetProdukty.setBasemaps(myUrlParams.b);
    }

    app.widgetProdukty.done = () => {
        document.getElementById('odstranitvrstvy').style.display = 'block';
        if (app.activeView.widthBreakpoint == "medium" || app.activeView.widthBreakpoint == "large" || app.activeView.widthBreakpoint == "xlarge" || app.aktivni_produkt == 22523) {
            if (document.getElementById('panelLayerlist').classList.length == 2 && !document.getElementById('widgetExport') && !document.getElementById('widgetExportAtom') && myUrlParams.openwidget == "") document.getElementById('seznamVrstev').click();
            if (myUrlParams.openwidget != "") myUrlParams.openwidget = "";
        } else {
            query(".panel, .panel-collapse").removeClass("in");
        }
    }
    app.widgetProdukty.runP = false;
    app.widgetProdukty.f = {
        ['k']: (l, k) => {
            k.split(",").forEach(s => {
                l?.sublayers.forEach(e => {
                    if (e.id == Number(s)) e.visible = true
                });
            })
        },
        ['m']: (l, m) => {
            if (l.sublayers) {
                l.sublayers.forEach(e => {
                    e.id == m ? e.visible = true : e.visible = false
                });
            }
            l.on("layerview-create", () => {
                app.layerListWidget.operationalItems.items.forEach(e => {
                    if (e.layer.id == l.id) e.panel.open = true
                });
            });
        },
        ['ss']: (ss) => {
            let p = new Promise((resolve) => {
                if ((!ss) || document.getElementById('volbaSS').value == ss) {
                    resolve({ status: "OK" });
                } else {
                    let interval = setInterval(() => {
                        if ((app.widgetChangeSS) && app.widgetChangeSS.nastavSS) {
                            app.widgetChangeSS.nastavSS(ss).then(() => {
                                resolve({ status: "OK" });
                            });
                            clearInterval(interval);
                        }
                    }, 500);
                }
            });
            return p;
        },
        [1]: (l) => { if (myUrlParams.extentstring == "") app.activeView.goTo(l.fullExtent); },
        [2]: (l, o) => {
            let to = document.getElementById("timeortofoto");
            to.options.length = 0;
            if (l.sublayers) {
                let years = [];
                l.sublayers.forEach(e => {
                    let title = Number(e.title);
                    if (isNaN(title) == false) years.push(title);
                });
                years.sort((a, b) => { return b - a });
                years.forEach((rok) => {
                    let opt = document.createElement("OPTION");
                    opt.value = rok;
                    opt.innerHTML = rok;
                    to.appendChild(opt);
                });
                let aovalue = to.value;
                l.sublayers.forEach(e => {
                    if (e && aovalue) e.title == aovalue ? e.visible = true : e.visible = false
                });
                document.getElementById("timeortofotodiv").style.display = "block";
            }
        },
        [3]: (l) => {
            if (l.allSublayers) {
                let subarr = [];
                l.allSublayers.forEach(e => {
                    isNaN(e.title) == false ? subarr.push(Number(e.title)) : false
                });
                let lastY = subarr.sort().slice(subarr.length - 2, subarr.length);
                l.allSublayers.forEach(e => {
                    e.title == lastY[0].toString() || e.title == lastY[1].toString() ? e.visible = true : e.visible = false
                });
            }
        },
        [4]: () => {
            if (app.activeView.zoom <= 10 && myUrlParams.extentstring == "") app.activeView.goTo({ zoom: 10 });
        },
        [5]: () => {
            if (app.napoveda) app.napoveda.collapse();
            if ((app.activeView.type == "2d") && app.activeView.spatialReference.wkid == 102067 && myUrlParams.extentstring == "" && app.activeView.zoom <= 10) app.mapView.zoom <= 1 ? app.mapView.goTo({ target: new Point({ x: -697423, y: -1038046, spatialReference: new SpatialReference({ "wkid": 102067, "latestWkid": 5514 }) }), zoom: 10 }) : app.mapView.goTo({ zoom: 10 })
        },
        [6]: () => {
            let bi = document.getElementById('basemapInfo');
            if (!bi?.checked) bi.click();
        }
    };
    app.widgetProdukty.a = {
        [486]: () => {
            return new WMSLayer({
                url: protokol + "geoportal.cuzk.gov.cz/WMS_ZM10_PUB/WMService.aspx",
                imageFormat: "image/jpeg"
            })
        },
        [1059]: () => {
            return new WMSLayer({
                url: protokol + "geoportal.cuzk.gov.cz/WMS_ZM25_PUB/WMService.aspx",
                imageFormat: "image/jpeg"
            })
        },
        [487]: () => {
            return new WMSLayer({
                url: protokol + "geoportal.cuzk.gov.cz/WMS_ZM50_PUB/WMService.aspx",
                imageFormat: "image/jpeg"
            })
        },
        [33714]: () => {
            return new WMSLayer({
                url: protokol + "geoportal.cuzk.gov.cz/WMS_ZM100_PUB/WMService.aspx",
                imageFormat: "image/jpeg"
            })
        },
        [833]: () => {
            return new WMSLayer({
                url: protokol + "geoportal.cuzk.gov.cz/WMS_ZM200_PUB/WMService.aspx",
                imageFormat: "image/jpeg"
            })
        },
        [22575]: () => {
            return new MapImageLayer({
                url: protokol + "ags.cuzk.gov.cz/arcgis/rest/services/ZABAGED_POLOHOPIS/MapServer",
                dataName: "Zabaged",
                atom: "zabaged"
            })
        },
        [22574]: () => {
            return new MapImageLayer({
                url: protokol + "ags.cuzk.gov.cz/arcgis/rest/services/ZABAGED_VRSTEVNICE/MapServer",
                title: "ZABAGED - Výškopis",
                dataName: "Vrstevnice",
                atom: "zabaged-vyskopis"
            })
        },
        [22516]: () => {
            return new ImageryLayer({
                url: protokol + "ags.cuzk.gov.cz/arcgis2/rest/services/dmr4g/ImageServer",
                dataName: "DMR4G",
                popupEnabled: false,
                hidepopups: true,
                atom: "dmr4g"
            })
        },
        [22517]: () => {
            return new ImageryLayer({
                url: protokol + "ags.cuzk.gov.cz/arcgis2/rest/services/dmr5g/ImageServer",
                dataName: "DMR5G",
                popupEnabled: false,
                hidepopups: true,
                atom: "dmr5g"
            })
        },
        [22515]: () => {
            return new ImageryLayer({
                url: protokol + "ags.cuzk.gov.cz/arcgis2/rest/services/dmp1g/ImageServer",
                dataName: "DMP1G",
                popupEnabled: false,
                hidepopups: true,
                atom: "dmp1g"
            })
        },
        22518: () =>
            new ImageryLayer({
                url: 'https://ags.cuzk.gov.cz/arcgis2/rest/services/dmp_obrazova_korelace/ImageServer',
                //dataName: 'DMPOK',
                popupEnabled: false,
                hidepopups: true,
                atom: 'dmpok',
            }),
        [22523]: () => {
            return new WMSLayer({
                url: protokol + "geoportal.cuzk.gov.cz/WMS_ORTOFOTO_ARCHIV/WMService.aspx",
                imageFormat: "image/jpeg",
                fal: 2,
                wish: 63414,
                metaPopup: 13
            })
        },
        [27514]: () => {
            return new WMSLayer({
                url: protokol + "geoportal.cuzk.gov.cz/WMS_ORTOFOTO_CIR/service.svc/get",
                imageFormat: "image/jpeg",
                fal: 3,
                wish: 63416,
                metaPopup: 14
            })
        },
        [22519]: () => {
            return new WMSLayer({
                url: protokol + "services.cuzk.gov.cz/wms/local-ux-wms.asp",
                fal: 4
            })
        },
        [22514]: () => {
            return new WMSLayer({
                url: protokol + "services.cuzk.gov.cz/wms/local-km-wms.asp",
                atom: "km",
                subVis: { sublayers: ["Katastr nemovitostí", "Přehledky"], is: true },
                fal: 5
            })
        },
        [53682]: () => {
            return new MapImageLayer({
                url: protokol + "ags.cuzk.gov.cz/arcgis/rest/services/DATA50/MapServer",
                title: "DATA 50",
                dataName: "Data50",
                atom: "data50"
            })
        },
        [22520]: () => {
            return new MapImageLayer({
                url: protokol + "ags.cuzk.gov.cz/arcgis/rest/services/DATA250/MapServer",
                title: "DATA 250",
                dataName: "Data250",
                atom: "data250"
            })
        },
        [22521]: () => {
            return new MapImageLayer({
                url: protokol + "ags.cuzk.gov.cz/arcgis/rest/services/BodovaPole/MapServer",
                dataName: "DBP",
                title: "Bodová pole"
            })
        },
        [22522]: () => {
            return new MapImageLayer({
                url: protokol + "ags.cuzk.gov.cz/arcgis/rest/services/GEONAMES/Geonames/MapServer",
                fal: 4,
                dataName: "Geonames",
                atom: "geonames"
            })
        },
        [22524]: () => {
            return new MapImageLayer({
                url: protokol + "ags.cuzk.gov.cz/arcgis1/rest/services/ORTOFOTO/MapServer",
                title: "Ortofoto ČR",
                maxScale: 1,
                imageFormat: "jpg",
                dataName: "Ortofoto",
                atom: "ortofoto"
            })
        },
        [22528]: () => {
            return new WMSLayer({
                url: protokol + "services.cuzk.gov.cz/wms/inspire-cp-wms.asp",
                atom: "cp"
            })
        },
        [22533]: () => {
            return new WMSLayer({
                url: protokol + "geoportal.cuzk.gov.cz/WMS_INSPIRE_GN/service.svc/get",
                fal: 4,
                atom: "gn"
            })
        },
        [22532]: () => {
            return new WMSLayer({
                url: protokol + "geoportal.cuzk.gov.cz/WMS_INSPIRE_HY/service.svc/get",
                atom: "hy"
            })
        },
        [22534]: () => {
            return new WMSLayer({
                url: protokol + "geoportal.cuzk.gov.cz/WMS_INSPIRE_TN/service.svc/get",
                atom: "tn"
            })
        },
        [22555]: () => {
            return new WMSLayer({
                url: protokol + "geoportal.cuzk.gov.cz/WMS_GRID_ETRS89_GRS80/service.svc/get",
                atom: "ggs",
                ss: '4258'
            })
        },
        [22554]: () => {
            return new WMSLayer({
                url: protokol + "geoportal.cuzk.gov.cz/WMS_GRID_ETRS89_LAEA/service.svc/get",
                atom: "ggs",
                ss: '3035'
            })
        },
        [22529]: () => {
            return new WMSLayer({
                url: protokol + "services.cuzk.gov.cz/wms/inspire-ad-wms.asp",
                atom: "ad",
                subVis: { allSublayers: ["INSPIRE_Nadmorska_vyska", "Overview Map", "Thoroughfares", "Post Offices", "Municipalities", "Addresses", "Addresses Text with Address Numbers", "Addresses Text"], is: true }
            })
        },
        [22530]: () => {
            return new WMSLayer({
                url: protokol + "services.cuzk.gov.cz/wms/inspire-au-wms.asp",
                atom: "au",
                subVis: { allSublayers: ["Administrative Unit 1stOrder", "Administrative Unit 2ndOrder", "Administrative Unit 3rdOrder", "Administrative Unit 4thOrder", "NUTS1 Region", "NUTS3 Region"] }
            })
        },
        [22527]: () => {
            return new WMSLayer({
                url: protokol + "services.cuzk.gov.cz/wms/inspire-bu-wms.asp",
                atom: "bu"
            })
        },
        [22594]: () => {
            return new ImageryLayer({
                url: protokol + "ags.cuzk.gov.cz/arcgis2/rest/services/INSPIRE_Nadmorska_vyska/ImageServer",
                dataName: "INSPIRE_EL_GRID",
                popupEnabled: false,
                hidepopups: true,
                atom: "el-grid"
            })
        },
        [22595]: () => {
            return new MapImageLayer({
                url: protokol + "ags.cuzk.gov.cz/arcgis2/rest/services/INSPIRE_Nadmorska_vyska_TIN/MapServer",
                fal: 4,
                atom: "el-tin"
            })
        },
        [22531]: () => {
            return new WMSLayer({
                url: protokol + "geoportal.cuzk.gov.cz/WMS_INSPIRE_ORTOFOTO/service.svc/get",
                imageFormat: "image/jpeg",
                ss: '3045',
                atom: 'oi'
            })
        },
        [99]: () => {
            return new MapImageLayer({
                url: protokol + "ags.cuzk.gov.cz/arcgis/rest/services/zm/MapServer",
                title: "Základní mapy ČR"
            })
        },
        [98]: () => {
            return new MapImageLayer({
                url: protokol + "ags.cuzk.gov.cz/arcgis/rest/services/KladyMapovychListu/MapServer",
                title: "Klady mapových listů",
                subVis: { sublayers: [], is: true }
            })
        },
        [96]: () => {
            return new WMSLayer({
                url: protokol + "ags.cuzk.gov.cz/arcgis/services/ZABAGED_TOPO/MapServer/WmsServer",
                dataName: "Zabaged",
                subVis: { allSublayers: ["VRSTEVNICE"] }
            })
        },
        [95]: () => {
            return new WMSLayer({
                url: protokol + "ags.cuzk.gov.cz/arcgis/services/ZABAGED_NAD_ORTOFOTO/MapServer/WmsServer",
                dataName: "Zabaged",
                subVis: { allSublayers: ["VRSTEVNICE"] }
            })
        },
        [94]: () => {
            return new MapImageLayer({
                url: protokol + "ags.cuzk.gov.cz/arcgis/rest/services/Metadata/MapServer",
                title: "Metadata",
                opacity: 0.6,
                subVis: { sublayers: [], is: true }
            })
        },
        [93]: () => {
            return new WMSLayer({
                url: protokol + "geoportal.cuzk.gov.cz/WMS_PREHLEDKY/WMService.aspx"
            })
        },
        [92]: () => {
            return new WMSLayer({
                url: protokol + "geoportal.cuzk.gov.cz/WMS_ORTOFOTO_PUB/service.svc/get?",
                imageFormat: "image/jpeg"
            })
        },
        [91]: () => {
            return new WMSLayer({
                url: protokol + "geoportal.cuzk.gov.cz/WMS_INSPIRE_LU/WMService.aspx",
                atom: "lu"
            })
        },
        [90]: () => {
            return new MapImageLayer({
                url: protokol + "ags.cuzk.gov.cz/arcgis/rest/services/Site/GeografickaSitWGS84/MapServer",
                title: "Geografická síť WGS 84"
            })
        },
        [89]: () => {
            return new MapImageLayer({
                url: protokol + "ags.cuzk.gov.cz/arcgis/rest/services/Site/JTSK_1KM/MapServer",
                title: "Kilometrová síť JTSK"
            })
        },
        [88]: () => {
            return new MapImageLayer({
                url: protokol + "ags.cuzk.gov.cz/arcgis/rest/services/RUIAN/MapServer",
                title: "RUIAN",
                atom: "ruian"
            })
        },
        [87]: () => {
            return new MapImageLayer({
                url: protokol + "ags.cuzk.gov.cz/arcgis1/rest/services/ZTM/MCR500/MapServer",
                imageFormat: "jpg",
                dataName: "MCR500",
                atom: "mcr500"
            })
        },
        [86]: () => {
            return new MapImageLayer({
                url: protokol + "ags.cuzk.gov.cz/arcgis1/rest/services/ZTM/MCR1M/MapServer",
                imageFormat: "jpg",
                dataName: "MCR1M",
                atom: "mcr1m"
            })
        },
        [76]: () => {
            return new MapImageLayer({
                url: protokol + "ags.cuzk.gov.cz/arcgis1/rest/services/ZTM/MCR2M/MapServer",
                imageFormat: "jpg",
                atom: "mcr2m"
            })
        },
        [85]: () => {
            return new WMSLayer({
                url: protokol + "geoportal.cuzk.gov.cz/WMS_PREHLEDKY/service.svc/get",
                imageFormat: "image/jpeg",
                subVis: { sublayers: ["MČR 1:2 000 000"], is: true }
            })
        },
        [84]: () => {
            return new MapImageLayer({
                url: protokol + "ags.cuzk.gov.cz/arcgis/rest/services/GeomorfologickeJednotky/MapServer",
                title: "Geomorfologické jednotky",
                imageFormat: "jpg",
                dataName: "GeomorfologickeJednotky"
            })
        },
        [83]: () => {
            return new WMSLayer({
                url: protokol + "services.cuzk.gov.cz/wms/local-dg-wms.asp?",
                opacity: 0.6,
                subVis: { sublayers: ["DG.DruhyKatastralniMapy"], is: true }
            })
        },
        [82]: () => {
            return new FeatureLayer({
                url: protokol + "ags.cuzk.gov.cz/arcgis/rest/services/GEONAMES/Geonames/MapServer/9",
                id: "panorama_hora",
                labelsVisible: true,
                minScale: 120960,
                renderer: {
                    type: "simple",
                    symbol: {
                        type: "simple-marker",
                        style: "circle",
                        color: [0, 0, 0],
                        size: "4px",
                        outline: {
                            color: [255, 255, 255],
                            width: "0.5px"
                        }
                    }
                },
                labelingInfo: [new LabelClass({
                    labelExpressionInfo: {
                        expression: "$feature.JMENO"
                    },
                    labelPlacement: "above-center",
                    symbol: {
                        type: "label-3d",
                        symbolLayers: [{
                            type: "text",
                            material: { color: [220, 200, 160] },
                            halo: {
                                color: [0, 0, 0, 1],
                                size: 1
                            },
                            font: 'Verdana',
                            size: 14
                        }],
                        verticalOffset: {
                            screenLength: 30
                        },
                        callout: {
                            type: "line",
                            size: 0.5,
                            color: [0, 0, 0],
                            border: {
                                color: [255, 255, 255, 0.7]
                            }
                        }
                    }
                })]
            });
        },
        [81]: () => {
            return new MapImageLayer({
                url: protokol + "ags.cuzk.gov.cz/arcgis/rest/services/GEONAMES/HistorickaJmena/MapServer",
                title: "Historická jména"
            })
        },
        [80]: () => {
            return new WMTSLayer({
                url: protokol + "geoportal.cuzk.gov.cz/WMTS_ZM/WMTService.aspx",
                serviceMode: "KVP",
                activeLayer: {
                    id: "zm",
                    tileMatrixSetId: "jtsk:epsg:5514"
                }
            })
        },
        [79]: () => {
            return new WMTSLayer({
                url: protokol + "geoportal.cuzk.gov.cz/WMTS_ORTOFOTO/WMTService.aspx",
                serviceMode: "KVP",
                activeLayer: {
                    id: "orto",
                    tileMatrixSetId: "jtsk:epsg:5514"
                }
            })
        },
        [78]: () => {
            return new WMTSLayer({
                url: protokol + "geoportal.cuzk.gov.cz/WMTS_ZM_900913/WMTService.aspx",
                serviceMode: "KVP",
                activeLayer: {
                    id: "zm",
                    tileMatrixSetId: "googlemapscompatibleext2:epsg:3857"
                },
                ss: '102100'
            })
        },
        [77]: () => {
            return new WMTSLayer({
                url: protokol + "geoportal.cuzk.gov.cz/WMTS_ORTOFOTO_900913/WMTService.aspx",
                serviceMode: "KVP",
                activeLayer: {
                    id: "orto",
                    tileMatrixSetId: "googlemapscompatibleext2:epsg:3857"
                },
                ss: '102100'
            })
        },
        [72]: () => {
            return new WMTSLayer({
                url: protokol + "geoportal.cuzk.gov.cz/WMTS_ZABAGED/service.svc/get?",
                serviceMode: "KVP",
                activeLayer: {
                    id: "ZABAGED",
                    tileMatrixSetId: "jtsk:epsg:5514"
                }
            })
        },
        [71]: () => {
            return new MapImageLayer({
                url: protokol + "ags.cuzk.gov.cz/arcgis1/rest/services/ZTM/ZTM5/MapServer",
                imageFormat: "jpg",
                dataName: "ZTM5",
                atom: "ztm5",
                metaPopup: 22
            })
        },
        [70]: () => {
            return new MapImageLayer({
                url: protokol + "ags.cuzk.gov.cz/arcgis1/rest/services/ZTM/ZTM10/MapServer",
                imageFormat: "jpg",
                dataName: "ZTM10",
                atom: "ztm10",
                metaPopup: 23
            })
        },
        [69]: () => {
            return new MapImageLayer({
                url: protokol + "ags.cuzk.gov.cz/arcgis1/rest/services/ZTM/ZTM25/MapServer",
                imageFormat: "jpg",
                dataName: "ZTM25",
                atom: "ztm25",
                metaPopup: 24
            })
        },
        [68]: () => {
            return new MapImageLayer({
                url: protokol + "ags.cuzk.gov.cz/arcgis1/rest/services/ZTM/ZTM50/MapServer",
                imageFormat: "jpg",
                dataName: "ZTM50",
                atom: "ztm50",
                metaPopup: 25
            })
        },
        [67]: () => {
            return new MapImageLayer({
                url: protokol + "ags.cuzk.gov.cz/arcgis1/rest/services/ZTM/ZTM100/MapServer",
                imageFormat: "jpg",
                dataName: "ZTM100",
                atom: "ztm100",
                metaPopup: 26
            })
        },
        [66]: () => {
            return new MapImageLayer({
                url: protokol + "ags.cuzk.gov.cz/arcgis1/rest/services/ZTM/ZTM250/MapServer",
                imageFormat: "jpg",
                dataName: "ZTM250",
                atom: "ztm250",
                metaPopup: 27
            })
        },
        [65]: () => {
            return new MapImageLayer({
                url: protokol + "ags.cuzk.gov.cz/arcgis1/rest/services/ZTM/MapServer",
                maxScale: 1,
                imageFormat: "jpg"
            })
        },
        [22526]: () => {
            return new WMSLayer({
                url: protokol + "geoportal.cuzk.gov.cz/WMS_SM5V_PUB/service.svc/get",
                imageFormat: "image/jpeg",
                fal: 4
            })
        },
        [22525]: () => {
            return new WMSLayer({
                url: protokol + "geoportal.cuzk.gov.cz/WMS_SM5_PUB/WMService.aspx",
                imageFormat: "image/jpeg",
                fal: 4
            })
        }
    }

    app.widgetProdukty.useproduct = (myP, onlyP, meta, klad) => {
        app.widgetProdukty.runP = true;
        document.getElementById('nazevvrstevdiv').innerHTML = "";
        if (onlyP == true) {
            document.getElementById("timeortofotodiv").style.display = 'none';
            app.activeView.map.layers.toArray().forEach(e => {
                if (e.type != "graphics") app.activeView.map.remove(e);
            });
            app.widgetProdukty.setBasemaps("empty");
        }
        let v = app.widgetProdukty.a[myP]();
        v.load().then(l => {
            l.kod = myP;
            if (l.subVis) {
                o = Object.keys(l.subVis)[0];
                if (l[o]) {
                    l[o].forEach(e => {
                        l.subVis.is ? c = false : c = true
                        l.subVis[o].includes(e.title) ? e.visible = l.subVis.is : e.visible = c
                    })
                    if (l.subVis[o].length == 0 && !meta && !klad) alert(label[602])
                }
            }
            if (l.fal) app.widgetProdukty.f[l.fal](l)
            if (meta) app.widgetProdukty.f['m'](l, meta)
            if (klad) app.widgetProdukty.f['k'](l, klad)
            if (!onlyP) l.ss = null
            app.widgetProdukty.f['ss'](l.ss).then(() => {
                app.activeView.map.layers.add(l);
                app.widgetProdukty.runP = false;
            });
        }).catch((err) => {
            app.widgetProdukty.runP = false;
            alert(label[383] + "\n\n" + err);
        });
        app.aktivni_produkt = myP;
        app.aktivni_kompozice = null;
        app.widgetProdukty.done();
        if (!onlyP) app.aktivni_produkt = null;
    }

    if ((myUrlParams.produkt != "") && app.widgetProdukty.useproduct) {
        myUrlParams.b == "" ? app.widgetProdukty.useproduct(Number(myUrlParams.produkt), true) : app.widgetProdukty.useproduct(Number(myUrlParams.produkt))
    }

    app.widgetProdukty.k = {
        [12231]: () => {
            return {
                t: label[125],
                b: 'empty',
                p: [{ n: 65 }]
            }
        },
        [21094]: () => {
            return {
                t: 'ZABAGED®',
                b: 'empty',
                p: [{ n: 22575 }, { n: 22574 }]
            }
        },
        [553]: () => {
            return {
                t: 'ZABAGED® - ' + label[126],
                b: 'ortofoto',
                p: [{ n: 22574 }]
            }
        },
        [11272]: () => {
            return {
                t: label[127],
                b: 'zm',
                p: [{ n: 22516, op: 0.7 }]
            }
        },
        [11273]: () => {
            return {
                t: label[128],
                b: 'zm',
                p: [{ n: 22517, op: 0.7 }]
            }
        },
        [11271]: () => {
            return {
                t: label[129],
                b: 'zm',
                p: [{ n: 22515, op: 0.7 }]
            }
        },
        [12232]: () => {
            return {
                t: label[130],
                b: 'ortofoto',
                p: [{ n: 88, hp: true, subVis: { sublayers: ["VyssiUzemneSamospravnyCelek", "Okres", "ObecSRozsirenouPusobnosti", "ObecSPoverenymObecnimUradem", "Obec", "KatastralniUzemi"], is: true } }, { n: 22522, hp: true }],
                kal: 6
            }
        },
        [8491]: () => {
            return {
                t: label[131],
                b: 'empty',
                p: [{ n: 22523, fal: true }, { n: 22522, hp: true }]
            }
        },
        [502]: () => {
            return {
                t: 'SM5',
                b: 'zm',
                p: [{ n: 22526 }]
            }
        },
        [488]: () => {
            return {
                t: 'SM5',
                b: 'ortofoto',
                p: [{ n: 22526 }, { n: 88, iv: true, hp: true, subVis: { sublayers: ["VyssiUzemneSamospravnyCelek", "Okres", " ObecSRozsirenouPusobnosti", "ObecSPoverenymObecnimUradem", "Obec", "KatastralniUzemi"], is: true } }]
            }
        },
        [5717]: () => {
            return {
                t: label[136],
                b: 'ortofoto',
                p: [{ n: 22519 }]
            }
        },
        [485]: () => {
            return {
                t: label[137],
                b: 'ortofoto',
                p: [{ n: 22514, subVis: { sublayers: ["Katastr nemovitostí inverzní", "Přehledky"], is: true }, fal: true }]
            }
        },
        [503]: () => {
            return {
                t: label[138],
                b: 'zm',
                p: [{ n: 98, hp: true, subVis: { sublayers: ["Základní triangulační listy", "Čísla základních triangulačních listů", "Triangulační listy", "Čísla triangulačních listů"], is: true } }, { n: 88, hp: true, subVis: { sublayers: ["OchrannePasmoZnackyBoduZakladnihoBodovehoPole"], is: true } }, { n: 22521 }]
            }
        },
        [490]: () => {
            return {
                t: 'Geonames',
                b: 'ortofoto',
                p: [{ n: 88, hp: true, subVis: { sublayers: ["VyssiUzemneSamospravnyCelek", "Okres", " ObecSRozsirenouPusobnosti", "ObecSPoverenymObecnimUradem", "Obec", "KatastralniUzemi"], is: true } }, { n: 22522, subVis: { sublayers: ["Definiční body"] } }]
            }
        },
        [496]: () => {
            return {
                t: ' INSPIRE - ' + label[139] + ' - (CP)',
                b: 'ortofoto',
                p: [{ n: 22528 }]
            }
        },
        [604]: () => {
            return {
                t: ' INSPIRE - ' + label[140] + ' - (GN)',
                b: 'ortofoto',
                p: [{ n: 22533 }]
            }
        },
        [998]: () => {
            return {
                t: ' INSPIRE - ' + label[141] + ' - (HY)',
                b: 'ortofoto',
                p: [{ n: 22532 }, { n: 22533, hp: true }]
            }
        },
        [3823]: () => {
            return {
                t: ' INSPIRE - ' + label[142] + ' - (TN)',
                b: 'ortofoto',
                p: [{ n: 22534 }, { n: 22533, hp: true }]
            }
        },
        [8390]: () => {
            return {
                t: ' INSPIRE - GGS - Grid_ETRS89-GRS80',
                b: 'ortofoto',
                p: [{ n: 22555 }, { n: 22533, hp: true }],
                ss: '4258'
            }
        },
        [3903]: () => {
            return {
                t: ' INSPIRE - GGS - Grid_ETRS89-LAEA',
                b: 'ortofoto',
                p: [{ n: 22554 }, { n: 22533, hp: true }],
                ss: '3035'
            }
        },
        [4365]: () => {
            return {
                t: ' INSPIRE - ' + label[143] + ' - (AU)',
                b: 'ortofoto',
                p: [{ n: 22530 }]
            }
        },
        [4364]: () => {
            return {
                t: ' INSPIRE - ' + label[8] + ' - (AD)',
                b: 'ortofoto',
                p: [{ n: 22529 }]
            }
        },
        [13631]: () => {
            return {
                t: ' INSPIRE - ' + label[144] + ' - (BU)',
                b: 'ortofoto',
                p: [{ n: 22527 }]
            }
        },
        [13993]: () => {
            return {
                t: ' INSPIRE - ' + label[145] + ' - (EL GRID)',
                b: 'zm',
                p: [{ n: 22594, op: 0.7 }]
            }
        },
        [91]: () => {
            return {
                t: ' INSPIRE - ' + label[663],
                b: 'zm',
                p: [{ n: 91 }, { n: 22533, hp: true }],
            }
        },
        [13994]: () => {
            return {
                t: ' INSPIRE - ' + label[145] + ' - (EL TIN)',
                b: 'dmr',
                p: [{ n: 22595, op: 0.7, fal: true }],
            }
        },
        [11511]: () => {
            return {
                t: ' INSPIRE - ' + label[146] + ' - (OI)',
                b: 'empty',
                p: [{ n: 22531 }, { n: 22530 }, { n: 22533, hp: true }],
                ss: '3045'
            }
        },
        [65403]: () => {
            return {
                t: label[589],
                b: 'ortofoto',
                p: [{ n: 81 }]
            }
        },
        [1]: () => {
            return {
                t: 'ZTM',
                b: 'empty',
                p: [{ n: 65, fal: true }, { n: 71, iv: true }, { n: 70, iv: true }, { n: 69, iv: true }, { n: 68, iv: true }, { n: 67, iv: true }, { n: 66, iv: true }]
            }
        },
        [100]: () => {
            return {
                t: 'Turistické trasy',
                b: 'dmr',
                p: [{ n: 22575, subVis: { sublayers: ["Hranice správní jednotky a KÚ", "Turistická trasa", "Železniční trať", "Silnice, dálnice", "Pěšina", "Cesta", "Ulice", "Vodní tok", "Vodní plocha", "Lesní půda se stromy", "Lesní půda se stromy kategorizovaná (plocha)", "Budova jednotlivá nebo blok budov (plocha)"], is: true } }, { n: 22522, subVis: { sublayers: ["Řeky, velké vodní plochy", "Ostatní vodní toky a plochy", "Ostatní objekty vodstva", "Hraniční jména"], is: false }, hp: true }]
            }
        }
    }

    app.widgetProdukty.usekompozici = (k) => {
        document.getElementById("timeortofotodiv").style.display = 'none';
        app.activeView.map.layers.toArray().forEach(e => {
            if (e.type != "graphics") app.activeView.map.remove(e);
        });
        let lk = app.widgetProdukty.k[k]();
        document.getElementById('nazevvrstevdiv').innerHTML = label[124] + lk.t;
        app.widgetProdukty.setBasemaps(lk.b);
        let mk = lk.p.map(c => {
            let l = app.widgetProdukty.a[c.n]();
            if ((!isNaN(c.op))) l.opacity = c.op;
            if (!c.fal) l.fal = undefined;
            if (c.hp) l.hidepopups = c.hp;
            if (c.iv) l.visible = false;
            if (c.subVis) l.subVis = c.subVis;
            return l
        });
        let lastSS = app.activeView.spatialReference.wkid;
        app.widgetProdukty.f['ss'](lk.ss).then(() => {
            if (lk.kal) app.widgetProdukty.f[lk.kal]();
            if ((lk.ss) && Number(lk.ss) != lastSS) alert(label[754])
            let rl = mk.map(l => {
                return l.load().then(ll => {
                    if (l.fal) app.widgetProdukty.f[l.fal](ll)
                    if (ll.subVis) {
                        o = Object.keys(ll.subVis)[0];
                        if (ll[o]) {
                            ll[o].forEach(e => {
                                ll.subVis.is ? c = false : c = true
                                ll.subVis[o].includes(e.title) ? e.visible = ll.subVis.is : e.visible = c
                            })
                        }
                    }
                    return ll;
                }).catch((err) => {
                    alert(label[383] + "\n\n" + err)
                    return
                })
            })
            promiseUtils.eachAlways(rl).then(r => {
                r = r.map(lr => {
                    if (lr.value) return lr.value
                });
                r = r.filter(e => {
                    return e !== undefined
                });
                app.activeView.map.layers.addMany(r);
            });
            app.aktivni_kompozice = k;
            app.aktivni_produkt = null;
            document.getElementById('nazevvrstevdiv').style.display = 'block';
        });
        app.widgetProdukty.done();
    }

    if ((myUrlParams.kompozice != "") && app.widgetProdukty.usekompozici) app.widgetProdukty.usekompozici(Number(myUrlParams.kompozice))

    if (myUrlParams.m != "") {
        app.widgetProdukty.useproduct(94, false, myUrlParams.m);
        if (myUrlParams.b == "") app.widgetProdukty.setBasemaps("zm");
    };

    if (myUrlParams.klad != "") {
        if (app.widgetProdukty.runP == true) {
            let interval = setInterval(() => {
                if (app.widgetProdukty.runP == false) {
                    app.widgetProdukty.useproduct(98, false, undefined, myUrlParams.klad);
                    clearInterval(interval);
                }
            }, 500);
        } else {
            app.widgetProdukty.useproduct(98, false, undefined, myUrlParams.klad);
        }
    };

    Array.from(document.querySelectorAll('button[data-pCode]')).forEach(e => {
        let v = e.dataset.pcode.split(",")
        e.onclick = () => {
            app.widgetProdukty?.useproduct(v[0], eval(v[1]))
        }
    })
    Array.from(document.querySelectorAll('button[data-kCode]')).forEach(e => {
        e.onclick = () => {
            app.widgetProdukty?.usekompozici(e.dataset.kcode)
        }
    })
});