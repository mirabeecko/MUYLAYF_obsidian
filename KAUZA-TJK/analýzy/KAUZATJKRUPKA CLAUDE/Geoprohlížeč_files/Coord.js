require(["esri/Graphic", "esri/layers/GraphicsLayer", "esri/request", "dojo/query"], (Graphic, GraphicsLayer, esriRequest, query) => {
    app.graphics_coord_layer = null;

    app.widgetCoord = {
        "2d": {
            active: false,
            defaultWgsFormat: true,
            defaultEtrsFormat: true,
            symbol: () => {
                return new Graphic(mapPoint, {
                    type: "text",
                    color: "#7A003C",
                    text: "\ue61d",
                    font: {
                        size: 25,
                        family: "calcite-web-icons"
                    },
                    haloColor: "white",
                    haloSize: "3px"
                });
            }
        }, 
        "3d": {
            active: false,
            defaultWgsFormat: true,
            defaultEtrsFormat: true,
            symbol: () => {
                return new Graphic(mapPoint, {
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
                });
            }
        },
        copy: (text) => {
            let input = document.createElement("INPUT");
            input.value = text.replace(/WGS 84: /g, '').replace(/°/g, '').replace(/'/g, '').replace(/"/g, ' ').replace(/B=/g, '').replace(/L=/g, '').replace(/hel=/g, '');
            document.body.appendChild(input);
            input.select();
            navigator.clipboard.writeText(input.value);
            input.remove();
            alert(label[170]);
        },
        changeLabelFormat: (id, view) => {
            let e = document.getElementById(id + '_' + view);
            if (!app.widgetCoord[view][id]) {
                e.innerHTML = "°";
                app.widgetCoord[view][id] = true;
            } else {
                e.innerHTML = "°'\"";
                app.widgetCoord[view][id] = false;
            }
        },
        openMenu: (id, view) => {
            let e = document.getElementById('choose_coordSSDiv_' + view)
            if (e.style.display == "none") {
                e.style.display = "block";
                document.getElementById(id).classList.add("rotate");
                if (app.activeView.spatialReference.wkid == 102067) {
                    document.getElementById('choose_coordSS_' + view).style.display = "block";
                    document.getElementById('choose_coord_nonJtsk_' + view).style.display = "none";
                } else {
                    document.getElementById('choose_coordSS_' + view).style.display = "none";
                    document.getElementById('choose_coord_nonJtsk_' + view).style.display = "block";
                    document.getElementById('choose_coord_nonJtsk_' + view).innerHTML = app.widgetCoord.labels[app.activeView.spatialReference.wkid].title;
                }
            } else {
                e.style.display = "none";
                document.getElementById(id).classList.remove("rotate");
            }
        },
        labels: {
            102067: {
                title: "S-JTSK/Krovak (m), Bpv (m)",
                row: (x, y, z) => {
                    let v = "Y=" + (-1 * x).toFixed(2) + "&nbsp;&nbsp;X=" + (-1 * y).toFixed(2);
                    if (z) v += "&nbsp;&nbsp;H=" + z + ' (DMR 5G)<span style="margin-right: 10px;"></span>';
                    return v;
                }
            },
            4326: {
                title: "WGS 84",
                row: (x, y, z, view) => {
                    if (app.widgetCoord[view].defaultWgsFormat) {
                        x = app.widgetCoord.degToD(x, 'LAT');
                        y = app.widgetCoord.degToD(y, 'LON');
                    } else {                        
                        x = app.widgetCoord.degToDMS(x, 'LAT');
                        y = app.widgetCoord.degToDMS(y, 'LON');
                    }
                    let v = '<a style="cursor: pointer;" onclick="app.widgetCoord.copy(this.innerText);">B=' + y + '&nbsp;&nbsp;L=' + x;
                    if (z) v += "&nbsp;&nbsp;h<sub>el</sub>=" + z;
                    v += "</a>"
                    return v;
                }
            },
            32633: {
                title: "WGS 84/UTM zone 33N",
                row: (x, y, z) => {
                    let v = "E=" + x.toFixed(2) + "&nbsp;&nbsp;N=" + y.toFixed(2);
                    if (z) v += "&nbsp;&nbsp;h<sub>el</sub>=" + z;
                    return v;
                }
            },
            32634: {
                title: "WGS 84/UTM zone 34N",
                row: (x, y, z) => {
                    let v = "E=" + x.toFixed(2) + "&nbsp;&nbsp;N=" + y.toFixed(2);
                    if (z) v += "&nbsp;&nbsp;h<sub>el</sub>=" + z;;
                    return v;
                }
            },
            102100: {
                title: "WGS 84/Pseudo-Mercator",
                row: (x, y, z) => {
                    let v = "X=" + x.toFixed(2) + "&nbsp;&nbsp;Y=" + y.toFixed(2);
                    if (z) v += "&nbsp;&nbsp;h<sub>el</sub>=" + z;
                    return v;
                }
            },
            4258: {
                title: "ETRS89, geographic 2D",
                row: (x, y, z, view) => {
                    if (app.widgetCoord[view].defaultEtrsFormat) {
                        x = app.widgetCoord.degToD(x, 'LAT');
                        y = app.widgetCoord.degToD(y, 'LON');
                    } else {                        
                        x = app.widgetCoord.degToDMS(x, 'LAT');
                        y = app.widgetCoord.degToDMS(y, 'LON');
                    }
                    let v = "B=" + x + "&nbsp;&nbsp;L=" + y;
                    if (z) v+= "&nbsp;&nbsp;h<sub>el</sub>=" + z;
                    return v;
                }
            },
            3045: {
                title: "ETRS89-TM33",
                row: (x, y, z) => {
                    let v = "N=" + x.toFixed(2) + "&nbsp;&nbsp;E=" + y.toFixed(2);
                    if (z) v += "&nbsp;&nbsp;h<sub>evrs</sub>=" + z;
                    return v;
                }
            },
            3046: {
                title: "ETRS89-TM34",
                row: (x, y, z) => {
                    let v = "N=" + x.toFixed(2) + "&nbsp;&nbsp;E=" + y.toFixed(2);
                    if (z) v += "&nbsp;&nbsp;h<sub>evrs</sub>=" + z;
                    return v;
                }
            },
            3034: {
                title: "ETRS89, LCC Europe",
                row: (x, y) => {
                    let v = "N=" + y.toFixed(2) + "&nbsp;&nbsp;E=" + x.toFixed(2);
                    return v;
                }
            },
            3035: {
                title: "ETRS89, LAEA Europe",
                row: (x, y) => {
                    let v = "Y=" + y.toFixed(2) + "&nbsp;&nbsp;X=" + x.toFixed(2);
                    return v;
                }
            },
            3835: {
                title: "Pulkovo 1942(83), GK zone 3",
                row: (x, y) => {
                    let v = "X=" + x.toFixed(2) + "&nbsp;&nbsp;Y=" + y.toFixed(2);
                    return v;
                }
            },
            3836: {
                title: "Pulkovo 1942(83), GK zone 4",
                row: (x, y) => {
                    let v = "X=" + x.toFixed(2) + "&nbsp;&nbsp;Y=" + y.toFixed(2);
                    return v;
                }
            }
        }
    };
    
    app.widgetCoord.degToDMS = (decDeg, decDir) => {
        var d = Math.abs(decDeg);
        var deg = Math.floor(d);
        d = d - deg;
        var min = Math.floor(d * 60);
        var secZakl = (d - min / 60) * 60 * 60;
        var sec = Math.round(secZakl * 10000) / 10000; // zaokrouhleni na 3 des. mista
        if (sec === 60) {
            min++;
            sec = 0;
        }
        if (min === 60) {
            deg++;
            min = 0;
        }
        var min_string = min < 10 ? "0" + min : min;
        var sec_string = sec < 10 ? "0" + sec : sec;
        return (decDir === 'LAT') ?
            deg + "° " + min_string + "' " + sec_string + '"' :
            deg + "° " + min_string + "' " + sec_string + '"';
    };

    app.widgetCoord.degToD = (decDeg, decDir) => {
        var deg = Math.round(decDeg * 100000000) / 100000000.0;
        return deg + "°";
    };

    app.widgetCoord.init = (view) => {
        let type = view.type;
        let wStyle = "background: white; padding: 5px; z-index: -1; box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);";
        if (((localStorage.theme) && (localStorage.theme != "default") && localStorage.theme == "dark")) wStyle = "background-color: #4c4c4c; color: #fff; padding: 5px; z-index: -1;";
    
        let classes = "panel-collapse";
        if ((myStorage.geoprohlizec) && myStorage.geoprohlizec["coordinate"] == false) {
            classes += " hidden";
            document.getElementById("settingscoordinate").checked = false;
        }
    
        let div = document.createElement("DIV");
        div.id = "widgetSouradnice_" + type;
        div.className = classes;
        div.style = wStyle;
        div.innerHTML = '<div id="choose_coordSSDiv_' + type + '" style="display: none;">' +
        '<span id="choose_coordSS_' + type + '">' +
        `<label class="switch coordChoose"><input type="checkbox" id="choose_coord_4326_${type}" class="inputChoose_coord${type}"><span class="slider"></span></label>WGS 84 (<span id="defaultWgsFormat_${type}">°</span>), elips. ${label[145].toLowerCase()}, elipsoid WGS 84 (m) (<a style="cursor: pointer;" onclick="app.widgetCoord.changeLabelFormat('defaultWgsFormat', '${app.activeView.type}');">${label[538]}</a>)<br />` +
        '<label class="switch coordChoose"><input type="checkbox" id="choose_coord_32633_' + type + '" class="inputChoose_coord' + type + '"><span class="slider"></span></label>WGS 84, UTM zone 33N (m), elips. ' + label[145].toLowerCase() + ', elipsoid WGS 84 (m)<br />' +
        '<label class="switch coordChoose"><input type="checkbox" id="choose_coord_32634_' + type + '" class="inputChoose_coord' + type + '"><span class="slider"></span></label>WGS 84, UTM zone 34N (m), elips. ' + label[145].toLowerCase() + ', elipsoid WGS 84 (m)<br />' +
        '<label class="switch coordChoose"><input type="checkbox" id="choose_coord_102100_' + type + '" class="inputChoose_coord' + type + '"><span class="slider"></span></label>WGS 84, Pseudo-Mercator (m), elips. ' + label[145].toLowerCase() + ', elipsoid WGS 84 (m)<br />' +
        `<label class="switch coordChoose"><input type="checkbox" id="choose_coord_4258_${type}" class="inputChoose_coord${type}" checked=true><span class="slider"></span></label>ETRS89 (<span id="defaultEtrsFormat_${type}">°</span>), elips. ${label[145].toLowerCase()}, elipsoid GRS-80 (m) (<a style="cursor: pointer;" onclick="app.widgetCoord.changeLabelFormat('defaultEtrsFormat', '${app.activeView.type}');">${label[538]}</a>)<br />` +
        '<label class="switch coordChoose"><input type="checkbox" id="choose_coord_3045_' + type + '" class="inputChoose_coord' + type + '" checked=true><span class="slider"></span></label>ETRS89-TM33 (m), EVRS ' + label[145].toLowerCase() + ' (m)<br />' +
        '<label class="switch coordChoose"><input type="checkbox" id="choose_coord_3046_' + type + '" class="inputChoose_coord' + type + '"><span class="slider"></span></label>ETRS89-TM34 (m), EVRS ' + label[145].toLowerCase() + ' (m)<br />' +
        '</span>' +
        'S-JTSK/Krovak (m), Bpv (m)<br /><span id="choose_coord_nonJtsk_' + type + '" style="display: none"></span>' +
        '<hr></div>' +
        `<span id="locateButton_${type}" class="esri-icon-map-pin bold" style="cursor: pointer; color: red; padding: 5px;" onclick="app.widgetCoord.toggle('${app.activeView.type}');"></span>` +
        `<span id="showmenu_${type}" class="esri-icon-up bold hidden-xs" style="cursor: pointer; padding: 5px; float: right; transition: transform 0.5s ease-out;" onclick="app.widgetCoord.openMenu(this.id, '${app.activeView.type}');"></span>` +
        '<table id="coordTable_' + type + '" style="display: inline-block; margin-bottom: -3px; margin-top: 5px; margin-left: 5px; margin-right: 5px;" class="hidden-xs">' +
        '<tr><td><div id="coord_4326_' + type + '" title="EPSG: 4326" class="coord_result_' + type + ' rowHover" style="display: none"></div></td></tr>' +
        '<tr><td><div id="coord_32633_' + type + '" title="EPSG: 32633" class="coord_result_' + type + ' rowHover" style="display: none"></div></td></tr>' +
        '<tr><td><div id="coord_32634_' + type + '"  title="EPSG: 32634"class="coord_result_' + type + ' rowHover" style="display: none"></div></td></tr>' +
        '<tr><td><div id="coord_102100_' + type + '" title="EPSG: 102100" class="coord_result_' + type + ' rowHover" style="display: none"></div></td></tr>' +
        '<tr><td><div id="coord_4258_' + type + '" title="EPSG: 4258" class="coord_result_' + type + ' rowHover" style="display: none"></div></td></tr>' +
        '<tr><td><div id="coord_3045_' + type + '" title="EPSG: 3045" class="coord_result_' + type + ' rowHover" style="display: none"></div></td></tr>' +
        '<tr><td><div id="coord_3046_' + type + '" title="EPSG: 3046" class="coord_result_' + type + ' rowHover" style="display: none"></div></td></tr>' +
        '<tr><td><div id="coord_3034_' + type + '" title="EPSG: 3034" class="coord_result_' + type + ' rowHover" style="display: none"></div></td></tr>' +
        '<tr><td><div id="coord_3035_' + type + '" title="EPSG: 3035" class="coord_result_' + type + ' rowHover" style="display: none"></div></td></tr>' +
        '<tr><td><div id="coord_3835_' + type + '" title="EPSG: 3835" class="coord_result_' + type + ' rowHover" style="display: none"></div></td></tr>' +
        '<tr><td><div id="coord_3836_' + type + '" title="EPSG: 3836" class="coord_result_' + type + ' rowHover" style="display: none"></div></td></tr>' +
        '<tr><td><div id="coord_102067_' + type + '" title="EPSG: 5514" class="coord_result_' + type + ' rowHover" style="display: none; margin-bottom: 10px;"></div></td></tr>' +
        `<tr><td><div id="coord_baseline_${type}" class="bold coordBase" onclick="app.widgetCoord.toggle('${app.activeView.type}');" title='${label[87]}'>${label[87]}</div></td></tr>` +
        '</table><span id="coordinateSdiletMisto_' + type + '"></span>'

        app.activeView.ui.add({
            component: div,
            position: "bottom-left"
        });
        if (((localStorage.theme) && (localStorage.theme != "default")) && localStorage.theme == "dark") query(".slider").addClass("slider-dark");
    }

    app.widgetCoord.transformation = (e, v) => {
        app.removeDiv(["widgetMojeMisto"]);
        let ss = app.activeView.spatialReference.wkid;
        if (!app.graphics_coord_layer) {
            app.graphics_coord_layer = new GraphicsLayer({ listMode: "hide", id: "vypisSouradnic" + v });
            app.activeView.map.layers.add(app.graphics_coord_layer);
        } else {
            let p = app.graphics_coord_layer.graphics.toArray();
            for (var i = p.length - 1; i >= 0; i--) {
                if (p[i].typ == "coordinate" + v) app.graphics_coord_layer.graphics.remove(p[i]);
            }
        }
        let inputs = document.getElementsByClassName('inputChoose_coord' + v);
        Array.from(inputs).forEach(e => {
            let el = document.getElementById("coord_" + e.id.replace("choose_coord_", "").split("_")[0] + "_" + v);
            if (e.checked) {
                el.innerHTML = label[549];
                el.style.display = "block";
            } else {
                el.style.display = "none";
            }
        });
        let symbol;
        if (v == "2d") {
            symbol = {
                type: "text",
                color: "#7A003C",
                text: "\ue61d",
                font: {
                    size: 25,
                    family: "calcite-web-icons"
                },
                haloColor: "white",
                haloSize: "3px"
            }
        } else if (v == "3d") {
            symbol = {
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
        let b = new Graphic({
            geometry: e.mapPoint,
            symbol: symbol
        });
        b.typ = "coordinate" + v;
        app.graphics_coord_layer.add(b);
        let x = e.mapPoint.x;
        let y = e.mapPoint.y;
        if (ss == 102067) {
            esriRequest("https://ags.cuzk.gov.cz/arcgis2/rest/services/dmr5g/ImageServer/identify?geometry={x:" + x + ",y:" + y + ",spatialReference:{wkid:5514}}&geometryType=esriGeometryPoint&returnGeometry=false&returnCatalogItems=false&f=pjson", {
                responseType: "json"
            }).then(r => {
                let z = Number(Number(r.data.value).toFixed(2));
                document.getElementById('coord_' + ss + "_" + v).innerHTML = "<b>" + app.widgetCoord.labels[ss].title + ": </b>" + app.widgetCoord.labels[ss].row(x, y, z);
                document.getElementById('coord_' + ss + "_" + v).style.display = "block";
                if (z == "NoData" || z == "NaN") z = 0;
                if (document.getElementById("coordinateSdiletMisto_" + v)) document.getElementById("coordinateSdiletMisto_" + v).innerHTML = "<hr><button class='btn btn-primary btn-block' onclick=app.mojeMisto.get(" + (-1 * x).toFixed(2) + "," + (-1 * y).toFixed(2) + ")><span class='esri-icon-share fLeft'></span>&nbsp;" + label[314] + "</button>";
                Array.from(inputs).forEach(e => {
                    if (e.checked) {
                        let inSS = Number(e.id.replace("choose_coord_", "").split("_")[0]);
                        sstransffce(5514, inSS, x, y, z).then((c) => {
                            if (c.z == 0) c.z = "Nezjištěno";
                            document.getElementById("coord_" + inSS + "_" + v).innerHTML = "<b>" + app.widgetCoord.labels[inSS].title + ": </b>" + app.widgetCoord.labels[inSS].row(c.x, c.y, c.z, v);
                        }).catch((err) => {
                            console.log(err)
                            document.getElementById("coord_" + inSS + "_" + v).innerHTML = "<b>" + app.widgetCoord.labels[inSS].title + ": </b>" + label[383];
                        });
                    }                    
                });
            }).catch(err => {
                console.log(err);
                Array.from(inputs).forEach(e => {
                    document.getElementById("coord_" + e.id.replace("choose_coord_", "").split("_")[0] + "_" + v).innerHTML = "<b>" + app.widgetCoord.labels[e.id.replace("choose_coord_", "").split("_")[0]].title + ": </b>" + label[383];
                });
                document.getElementById('coord_' + ss + "_" + v).style.display = "block";
                document.getElementById('coord_' + ss + "_" + v).innerHTML = "<b>" + app.widgetCoord.labels[ss].title + ": </b>" + label[383];
            });
        } else {
            Array.from(inputs).forEach(e => {
                document.getElementById("coord_" + e.id.replace("choose_coord_", "").split("_")[0] + "_" + v).style.display = "none";
            });
            if (ss == 3045 || ss == 3046 || ss == 4258) {
                let temp = x;
                x = y;
                y = temp;
            }
            document.getElementById("coord_" + ss + "_" + v).innerHTML = "<b>" + app.widgetCoord.labels[ss].title + ": </b>" + app.widgetCoord.labels[ss].row(x, y, undefined, v);
            document.getElementById('coord_' + ss + "_" + v).style.display = "block";
            document.getElementById('coord_' + 102067 + "_" + v).innerHTML = label[549];
            document.getElementById('coord_' + 102067 + "_" + v).style.display = "block";
            if (ss == 3034 || ss == 3035 ) {
                let temp = x;
                x = y;
                y = temp;
            }
            sstransffce(ss, 5514, x, y).then(r => {
                document.getElementById("coord_" + 102067 + "_" + v).innerHTML = "<b>" + app.widgetCoord.labels[102067].title + ": </b>" + app.widgetCoord.labels[102067].row(r.x, r.y, undefined, v);
            }, (err) => {
                console.log(err);
                document.getElementById("coord_" + 102067 + "_" + v).innerHTML = "<b>" + app.widgetCoord.labels[102067].title + ": </b>" + label[383];
            });
        }
    }

    app.widgetCoord.toggle = (type) => {
        let d = document.getElementsByClassName("coord_result_" + type);
        Array.from(d).forEach(e => {
            e.innerHTML = "";
            e.style.display = "none";            
        });
        if (!app.widgetCoord[type].active) {
            app.widgetCoord[type].active = true;          
            document.getElementById("widgetSouradnice_" + type).style.zIndex = 2;
            document.getElementById("locateButton_" + type).style.color = "green";
            document.getElementById("coord_baseline_" + type).title = label[37];
            app.activeView.cursor = "crosshair";
            app.enabledPopup = false;
            document.getElementById("coord_baseline_" + type).innerHTML = label[88];
            app.widgetCoord[type].handle = app.activeView.on("click", (event) => {
                query("#coordTable_" + type + ", #showmenu_" + type).removeClass("hidden-xs");
                if (app.activeView.widthBreakpoint == "xsmall" || app.activeView.widthBreakpoint == "small") query("#widgetSouradnice_" + type).addClass("widgetSouradniceMobile");  
                if (app.activeView.spatialReference.wkid == 102067) {
                    let i = document.getElementsByClassName("inputChoose_coord" + type);
                    Array.from(i).forEach(e => {
                        if (e.checked) {
                            document.getElementById(e.id.replace("choose_", "")).innerHTML = label[549];
                            document.getElementById(e.id.replace("choose_", "")).style.display = "block";
                        }            
                    });
                } else {
                    let i = document.getElementsByClassName("inputChoose_coord" + type);
                    Array.from(i).forEach(e => {
                        if (e.id.includes("102067")) {
                            document.getElementById("coord_102067_" + type).innerHTML = label[549];
                            document.getElementById("coord_102067_" + type).style.display = "block";
                        } else {
                            document.getElementById(e.id.replace("choose_", "")).style.display = "none";
                        }
                    });
                }
                app.widgetCoord.transformation(event, type);
            });
        } else {
            app.widgetCoord[type].active = false;
            query("#widgetSouradnice_" + type).removeClass("widgetSouradniceMobile");
            document.getElementById("widgetSouradnice_" + type).style.zIndex = -1;
            document.getElementById("locateButton_" + type).style.color = "red";
            if (app.activeView.widthBreakpoint == "xsmall" || app.activeView.widthBreakpoint == "small") query("#coordTable_" + type + ", #showmenu_" + type).addClass("hidden-xs");
            app.activeView.cursor = "default";
            app.enabledPopup = true;
            document.getElementById("coord_baseline_" + type).innerHTML = label[87];
            document.getElementById("coord_baseline_" + type).title = label[87];
            if (document.getElementById("coordinateSdiletMisto_" + type)) document.getElementById("coordinateSdiletMisto_" + type).innerHTML = "";
            app.widgetCoord[type].handle.remove();
            if (app.graphics_coord_layer?.graphics) {
                let p = app.graphics_coord_layer.graphics.toArray();
                for (var i = p.length - 1; i >= 0; i--) {
                    if (p[i].typ == "coordinate" + type) app.graphics_coord_layer.graphics.remove(p[i]);
                }
            }
        }
    }

    app.mapView.when(() => {
        app.widgetCoord.init(app.mapView);
    });
    app.sceneView.when(() => {
        app.widgetCoord.init(app.sceneView);
    });
});